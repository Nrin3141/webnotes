import React, { useRef } from "react";
import { Layer, Stage } from "react-konva";
import { NodeSystem } from "./NodeSystem";
import { KonvaEventObject } from "konva/types/Node";

const Canvas = () => {
  const stageRef = useRef();
  const zoom = (e: KonvaEventObject<WheelEvent>) => {
    console.log("ZOOOM!");
    e.evt.preventDefault();
    const scaleBy = 1.01;
    const oldScale = stageRef.current.scaleX();
    const mousePointTo = {
      x:
        stageRef.current.getPointerPosition().x / oldScale -
        stageRef.current.x() / oldScale,
      y:
        stageRef.current.getPointerPosition().y / oldScale -
        stageRef.current.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stageRef.current.scale({ x: newScale, y: newScale });

    const newPos = {
      x:
        -(mousePointTo.x - stageRef.current.getPointerPosition().x / newScale) *
        newScale,
      y:
        -(mousePointTo.y - stageRef.current.getPointerPosition().y / newScale) *
        newScale,
    };
    stageRef.current.position(newPos);
    stageRef.current.batchDraw();
  };

  return (
    <Stage width={700} height={700} ref={stageRef} onWheel={zoom}>
      <Layer>
        <NodeSystem />
      </Layer>
    </Stage>
  );
};

export default Canvas;
