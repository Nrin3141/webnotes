import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";

export const TextEditor = () => {
  const [editor, setEditor] = useState<Quill>();
  const [text, setText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let Inline = Quill.import("blots/inline");
    class GrammarlyInline extends Inline {}
    GrammarlyInline.tagName = "G";
    GrammarlyInline.blotName = "grammarly-inline";
    GrammarlyInline.className = "gr_";
    Quill.register(GrammarlyInline);

    const container = editorRef.current as Element;
    setEditor(new Quill(container));
  }, []);

  const saveText = () => {
    if (editor) {
      setText(editor.getText());
    }
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <>
      <button onClick={saveText}>Save text</button>
      <div className="text-editor-container" ref={editorRef}></div>
    </>
  );
};
