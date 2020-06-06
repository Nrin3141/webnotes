import React, { useState } from "react";
import { Line } from "react-konva";
import { Node } from "./Node";
import { Pos } from "../types";

const initialNodes = [
  { id: v4(), pos: { x: 100, y: 200 }, text: "Hello" },
  { id: v4(), pos: { x: 200, y: 100 }, text: "World" },
];

interface NodeData {
  id: string;
  pos: Pos;
  text: string;
  connections: [];
}
export const NodeSystem = () => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const setNode = (i: number, newPos: Pos) => {
    setNodes((old: NodeData[]): NodeData[] => {
      return old.map((node, index) =>
        index === i ? { ...node, pos: newPos } : node
      );
    });
  };
  return (
    <>
      {nodes.map(({ pos, text }, index) => {
        return (
          <Node
            setPos={(newPos: Pos) => setNode(index, newPos)}
            pos={pos}
            text={text}
          />
        );
      })}
      <Line
        points={[pos[0].x, pos[0].y, pos[1].x, pos[1].y]}
        stroke="black"
        fill="black"
      />
    </>
  );
};
