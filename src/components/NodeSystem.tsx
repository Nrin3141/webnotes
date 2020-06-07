import React, { useState } from "react";
import { Line } from "react-konva";
import { Node } from "./Node";
import { Pos } from "../types";
import { v4 } from "uuid";

const initialNodes = [
  { id: v4(), pos: { x: 100, y: 200 }, text: "Hello", connections: [1] },
  { id: v4(), pos: { x: 200, y: 100 }, text: "World", connections: [0] },
  { id: v4(), pos: { x: 200, y: 100 }, text: "World", connections: [2, 3, 4] },
  { id: v4(), pos: { x: 200, y: 100 }, text: "World", connections: [2, 4] },
  { id: v4(), pos: { x: 200, y: 100 }, text: "World", connections: [1, 3, 4] },
];

interface NodeData {
  id: string;
  pos: Pos;
  text: string;
  connections: number[];
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
      {nodes.map(({ pos, connections }) => (
        <>
          {connections.map((connection) => (
            <Line
              points={[
                nodes[connection].pos.x,
                nodes[connection].pos.y,
                pos.x,
                pos.y,
              ]}
              stroke="black"
              fill="black"
            />
          ))}
        </>
      ))}
      {nodes.map(({ pos, text }, index) => (
        <Node
          setPos={(newPos: Pos) => setNode(index, newPos)}
          pos={pos}
          text={text + index}
        />
      ))}
    </>
  );
};
