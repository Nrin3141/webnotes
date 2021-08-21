import React, { useState, useEffect } from "react";
import unified from "unified";
import markdown from "remark-parse";
import math from "remark-math";
import katex from "rehype-katex";
import remark2rehype from "remark-rehype";
// import rehype2react from "rehype-react";
import stringify from "rehype-stringify";
import all from "./highlight";
import english from "retext-english";
import { HighlightButton, Toolbar } from "./Toolbar";

const modes = {
  split: "split",
  editor: "editor",
  rendered: "rendered",
};

type Modes = typeof modes;
const defaultMode = modes.split as keyof Modes;

const initialText = `# My header has arrived!

## It is here where the great stories are written. 

### And it is here where I am building my legacy as an epic writer! 

#### Only here in the strange world of words. 

I honestly think that this thing does not make much sense. But I like this thing nonetheless. 

I honestly think that this thing does not make much sense. Because I like this thing. As long as everything is green the text is good and easy to read.

The longer a sentence gets the harder it will be to read and comprehend it and the highlighting will show that. 
Sentences can be hard in different ways - by being long or by using exuberant words that are hard to fathom.
When a text gets difficult it will show that in the way of being colored flabbergastingly different colors.

When it becomes even more difficult and people can not really follow it anymore it will be a deep red, trying to make you stop this awful business of writing poorly readable text! `;

export const TextEditor = () => {
  const [highlighting, setHighlighting] = useState(true);
  const [mode, setMode] = useState(defaultMode);
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState("");
  const [highlights, setHighlights] = useState<any>([]);
  const toggleHighlighting = () => {
    setHighlighting((old) => !old);
  };
  const handleInput = (e: any) => {
    setText(e.target.value);
    unified()
      .use(markdown)
      .use(math)
      .use(remark2rehype)
      .use(katex)
      .use(stringify)
      .process(e.target.value)
      .then(
        function (file) {
          setParsed(String(file));
        },
        function (err) {
          console.error(String(err));
        }
      );

    const processor = unified().use(english).use(stringify);
    const tree = processor.runSync(processor.parse(e.target.value));
    setHighlights(all(tree, []));

    // console.log(parsed);
    // setParsed(parsed);
  };
  useEffect(() => {
    handleInput({ target: { value: initialText } });
  }, []);
  const getClassnames = (selected: keyof Modes, mode: keyof Modes) => {
    return `${mode} ${
      selected === modes.split
        ? "splitMode"
        : selected === modes[mode]
        ? "fullMode"
        : "hiddenMode"
    }`;
  };
  return (
    <>
      <Toolbar<Modes> possibleModes={modes} mode={mode} setMode={setMode}>
        <HighlightButton
          highlight={highlighting}
          toggleHighlighting={toggleHighlighting}
        />
      </Toolbar>
      <div className="editor-container">
        <div className={getClassnames(mode, modes.editor as keyof Modes)}>
          {highlighting && (
            <div className="draw">{highlights.map((node: any) => node)}</div>
          )}
          <textarea spellCheck={false} onChange={handleInput} value={text} />
        </div>
        <div
          className={getClassnames(mode, modes.rendered as keyof Modes)}
          dangerouslySetInnerHTML={{ __html: parsed }}
        ></div>
      </div>
    </>
  );
};
