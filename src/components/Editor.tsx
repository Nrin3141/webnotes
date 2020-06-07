import React, { useState } from "react";
import marked from "marked";
import DOMPurify from "dompurify";

export const TextEditor = () => {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState("");

  const handleInput = (e: any) => {
    setText(e.target.value);
    const dirty = marked(e.target.value);
    const clean = DOMPurify.sanitize(dirty);
    setParsed(clean);
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
