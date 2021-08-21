import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { NodeSystem } from "./NodeSystem";
import { KonvaEventObject } from "konva/types/Node";
import { ContextMenu } from "./ContextMenu";
import { Toolbar } from "./Toolbar";
import { TextEditor } from "./Editor";

const defaultMenu = {
  show: false,
  pos: { top: 0, left: 0 },
  selectedShape: null,
};

export const Canvas = () => {
  const [menu, setMenu] = useState(defaultMenu);
  const stageRef: any = useRef();
  const zoom = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.04;
    const s = stageRef.current;
    const oldScale = s.scaleX();
    const mousePointTo = {
      x: s.getPointerPosition().x / oldScale - s.x() / oldScale,
      y: s.getPointerPosition().y / oldScale - s.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    s.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - s.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - s.getPointerPosition().y / newScale) * newScale,
    };
    s.position(newPos);
    s.batchDraw();
  };

  const triggerMenu = (e: any) => {
    e.evt.preventDefault();
    if (e.target === stageRef.current) {
      setMenu(defaultMenu);
      return;
    }
    const selectedShape = e.target;
    const containerRect = stageRef.current.container().getBoundingClientRect();
    const pos = {
      top: containerRect.top + stageRef.current.getPointerPosition().y + 4,
      left: containerRect.left + stageRef.current.getPointerPosition().x + 4,
    };

    setMenu({ show: true, pos, selectedShape });
  };

  const handleClick = (e: any) => {
    if (menu.show && e.type === "click" && e.evt.which === 1) {
      setMenu(defaultMenu);
    }
  };

  const menuRef: any = useRef();
  return (
    <>
      {menu.show && (
        <ContextMenu
          menuRef={menuRef}
          top={menu.pos.top}
          left={menu.pos.left}
        />
      )}

      <Stage
        style={{ backgroundColor: "white" }}
        draggable
        width={700}
        height={700}
        ref={stageRef}
        onWheel={zoom}
        onClick={handleClick}
        onContextMenu={triggerMenu}
      >
        <Layer>
          <NodeSystem />
        </Layer>
      </Stage>
    </>
  );
};

const modes = {
  textEditor: "textEditor",
  textNodes: "textNodes",
};
type Modes = typeof modes;

const defaultMode = modes.textEditor as keyof Modes;

interface SwitchProps {
  mode: keyof Modes;
}

const Switch = ({ mode }: SwitchProps) => {
  switch (mode) {
    case modes.textEditor:
      return <TextEditor />;
    case modes.textNodes:
      return <Canvas />;
    default:
      return <></>;
  }
};

const Controller = () => {
  const [mode, setMode] = useState(defaultMode);

  return (
    <>
      <Toolbar<Modes> mode={mode} setMode={setMode} possibleModes={modes} />
      <Switch mode={mode} />
    </>
  );
};

export default Controller;
