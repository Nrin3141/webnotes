import React, { PropsWithChildren, Dispatch, SetStateAction } from "react";
export interface ToolbarProps<T> {
  setMode: Dispatch<SetStateAction<keyof T>>;
  mode: keyof T;
  possibleModes: T;
}

export function Toolbar<T extends Record<string, string>>({
  possibleModes,
  setMode,
  mode,
  children,
}: PropsWithChildren<ToolbarProps<T>>) {
  return (
    <div className="toolbar">
      {children}
      {Object.keys(possibleModes).map((key) => {
        const i = key;
        return (
          <button
            className={`${mode === possibleModes[i] ? "litButton" : ""}`}
            onClick={() => setMode(possibleModes[i])}
          >
            {key} view
          </button>
        );
      })}
    </div>
  );
}

export interface HighlightButtonProps {
  highlight: boolean;
  toggleHighlighting: () => void;
}

export function HighlightButton({
  toggleHighlighting,
  highlight,
}: HighlightButtonProps) {
  return (
    <button
      onClick={toggleHighlighting}
      className={`${highlight === true ? "litButton" : ""}`}
    >
      Highlight
    </button>
  );
}
