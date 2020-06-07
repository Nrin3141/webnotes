import React, { useState } from "react";
import unified from "unified";
import english from "retext-english";
import markdown from "remark-parse";
import math from "remark-math";
import remark2rehype from "remark-rehype";
import katex from "rehype-katex";
import stringify from "rehype-stringify";
import sanitize from "rehype-sanitize";

const processor = unified()
  .use(english)
  .use(markdown)
  .use(math)
  .use(remark2rehype)
  .use(katex)
  .use(sanitize)
  .use(stringify);

function parse(value: string) {
  return processor.runSync(processor.parse(value));
}

export const TextEditor = () => {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<any>();

  const handleInput = (e: any) => {
    setText(e.target.value);
    setParsed(parse(e.target.value));
  };

  return (
    <>
      <textarea
        className="textInput"
        spellCheck={false}
        onInput={handleInput}
        value={text}
      />
      <div
        className="renderedOutput"
        dangerouslySetInnerHTML={{ __html: parsed }}
      ></div>
    </>
  );
};
