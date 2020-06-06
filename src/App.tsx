import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { TextEditor } from "./components/Editor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas />
        <TextEditor />
      </header>
    </div>
  );
}

export default App;
