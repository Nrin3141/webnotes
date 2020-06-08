import React, { useState, useEffect } from "react";
import unified from "unified";
import parse from "remark-parse";
import math from "remark-math";
import katex from "rehype-katex";
import remark2rehype from "remark-rehype";
import sanitize from "rehype-sanitize";
import stringify from "rehype-stringify";
import remark2react from "remark-react";

export const TextEditor = () => {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [parsedString, setParsedString] = useState("");
  const handleInput = (e: any) => {
    setText(e.target.value);
    const parsed = unified()
      .use(parse)
      .use(math)
      .use(remark2rehype)
      .use(katex)
      .use(remark2react)
      .processSync(e.target.value) as any;
    setParsed(parsed.result);
    setParsedString(
      unified()
        .use(parse)
        .use(math)
        .use(katex)
        .use(remark2rehype)
        .use(sanitize)
        .use(stringify)
        .processSync(e.target.value) as any
    );
  };

  useEffect(() => {
    console.log(parsed);
  }, [parsed]);
  return (
    <>
      <textarea
        className="textInput"
        spellCheck={false}
        onChange={handleInput}
        value={text}
      />
      <div className="renderedOutput">
        <div id="reactRemark">{parsed}</div>
        <div
          id="innerHTMLRemark"
          dangerouslySetInnerHTML={{ __html: parsedString }}
        ></div>
      </div>
    </>
  );
};
