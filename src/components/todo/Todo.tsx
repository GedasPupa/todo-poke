import React, { useEffect, useState } from "react";
import { ITodo } from "../app/App";
import { DateConverter } from "../date-converter/DateConverter";

interface Props {
  todo: ITodo;
  deleteTodo: (name: string) => void;
}

export const Todo: React.FC<Props> = (props) => {
  const { todo, deleteTodo } = props;
  const [editRowStyle, setStyle] = useState("editRow");
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.perfect === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.perfect]);

  const setStyleHandler = (): void => {
    if (editRowStyle === "editRow") {
      setStyle("");
    } else {
      setStyle("editRow");
    }
  };

  return (
    <>
      <tr>
        <td>{todo.name}</td>
        <td>{todo.perfect}</td>
        <td>{DateConverter(todo.updateTime!)}</td>
        <td>{todo.url}</td>
        <td>
          <button onClick={() => deleteTodo(todo.name)}>Delete</button>
          <button onClick={() => setStyleHandler()}>Edit</button>
        </td>
      </tr>
      <tr className={editRowStyle}>
        <td>
          <input
            type="text"
            //   value={}
            //   onChange={}
          />
        </td>
        <td>
          <input
            type="checkbox"
            name="isPerfect"
            checked={isChecked}
            // onChange={() => {}}
          />
          <label>Perfect?</label>
        </td>
        <td>
          <button>Submit</button>
        </td>
        <td>
          <input
            type="text"
            //   value={}
            //   onChange={}
          />
          <button>Submit</button>
        </td>
        <td></td>
      </tr>
    </>
  );
};
