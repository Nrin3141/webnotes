import React, { PropsWithChildren, Dispatch, SetStateAction } from "react";
export interface ToolbarProps<T> {
  setMode: Dispatch<SetStateAction<keyof T>>;
  mode: keyof T;
  highlight: boolean;
  toggleHighlighting: () => void;
  possibleModes: T;
}

export function Toolbar<T extends Record<string, string>>({
  possibleModes,
  setMode,
  mode,
  toggleHighlighting,
  highlight,
}: PropsWithChildren<ToolbarProps<T>>) {
  return (
    <div className="toolbar">
      <button
        onClick={toggleHighlighting}
        className={`${highlight === true ? "litButton" : ""}`}
      >
        Highlight
      </button>
      {Object.keys(possibleModes).map((key) => {
        const i = key;
        return (
          <button
            className={`${mode === possibleModes[i] ? "litButton" : ""}`}
            onClick={() => setMode(possibleModes[i])}
          >
            Toggle {key}
          </button>
        );
      })}
    </div>
  );
}
