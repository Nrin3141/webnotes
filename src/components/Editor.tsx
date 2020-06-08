import React, { useState } from "react";
import unified from "unified";
import markdown from "remark-parse";
import math from "remark-math";
import katex from "rehype-katex";
import remark2rehype from "remark-rehype";
// import rehype2react from "rehype-react";
import stringify from "rehype-stringify";
import all from "./highlight";
import english from "retext-english";

export const TextEditor = () => {
  const [highlighting, setHighlighting] = useState(false);
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState("");
  const [highlights, setHighlights] = useState<any>([]);
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

  return (
    <>
      <div className="editor">
        {highlighting && (
          <div className="draw">{highlights.map((node: any) => node)}</div>
        )}
        <textarea spellCheck={false} onChange={handleInput} value={text} />
      </div>
      {/* <div className="renderedOutput">{parsed}</div> */}
      <div
        className="renderedOutput"
        dangerouslySetInnerHTML={{ __html: parsed }}
      ></div>
    </>
  );
};
