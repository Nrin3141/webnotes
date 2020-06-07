import React from "react";
import "./contextMenu.css";

export const ContextMenu = ({ menuRef, top, left }: any) => {
  console.log(top, left);
  return (
    <nav
      style={{ zIndex: 100, position: "absolute", top, left }}
      id="context-menu"
      ref={menuRef}
      className="context-menu"
    >
      <ul className="context-menu__items">
        <li className="context-menu__item">
          <button className="context-menu__link" data-action="View">
            <i className="fa fa-eye"></i> View Task
          </button>
        </li>
        <li className="context-menu__item">
          <button
            className="context-menu__link"
            onClick={(e) => {
              return e;
            }}
            data-action="Edit"
          >
            <i className="fa fa-edit"></i> Edit Task
          </button>
        </li>
        <li className="context-menu__item">
          <button className="context-menu__link" data-action="Delete">
            <i className="fa fa-times"></i> Delete Task
          </button>
        </li>
      </ul>
    </nav>
  );
};
