import React, { useState } from "react";
import { Circle, Text } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import { Pos } from "../types";

interface NodeProps {
  setPos: (pos: Pos) => void;
  pos: Pos;
  text: string;
}
export const Node = ({ setPos, pos, text }: NodeProps) => {
  const [dragging, setDragging] = useState(false);
  const startDragging = () => setDragging(true);
  const endDragging = ({ target }: KonvaEventObject<DragEvent>) => {
    setDragging(false);
    setPos({ x: target.x(), y: target.y() });
  };
  const dragMove = ({ target }: KonvaEventObject<DragEvent>) => {
    const newPos: Pos = { x: target.x(), y: target.y() };
    setPos(newPos);
  };
  return (
    <>
      <Circle
        x={pos.x}
        y={pos.y}
        draggable
        onDragStart={startDragging}
        onDragMove={dragMove}
        onDragEnd={endDragging}
        radius={50}
        fill={dragging ? "yellow" : "green"}
        shadowBlur={10}
        stroke="black"
      />
      <Text
        text={text}
        fill={dragging ? "green" : "black"}
        align="center"
        width={50}
        x={pos.x - 50 / 2}
        y={pos.y}
      />
    </>
  );
};
