import React, { useEffect, useState } from "react";
import { ITodo } from "../app/App";
import { DateConverter } from "../date-converter/DateConverter";

interface Props {
  todo: ITodo;
  deleteTodo: (name: string) => void;
  edit: (name: string, newPoke: ITodo) => void;
}

export const Todo: React.FC<Props> = (props) => {
  let { todo, deleteTodo, edit } = props;
  const [editRowStyle, setStyle] = useState<string>("editRow");
  const [isChecked, setChecked] = useState<boolean | undefined>(todo.perfect);
  const [inputName, SetName] = useState<string>(todo.name);
  const [todoNew, setTodo] = useState<ITodo>(todo);

  useEffect(() => {
    setTodo({
      name: inputName,
      perfect: todoNew.perfect,
      url: todoNew.url,
      updateTime: todoNew.updateTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputName]);

  const setStyleHandler = (): void => {
    if (editRowStyle === "editRow") {
      setStyle("");
    } else {
      setStyle("editRow");
    }
  };

  //   const changeCheck = (e: any) => {
  //     setChecked(e.target.checked);
  //     edit(todo.name, {
  //       name: todoNew.name,
  //       url: todoNew.url,
  //       perfect: isChecked,
  //       updateTime: todoNew.updateTime,
  //     });
  //   };

  return (
    <>
      <tr>
        <td>{todoNew.name}</td>
        <td>{isChecked ? "Perfect" : "Not bad"}</td>
        <td>{DateConverter(todoNew.updateTime!)}</td>
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
            value={inputName}
            onChange={(e) => SetName(e.target.value)}
          />
          <button
            onClick={() =>
              edit(todo.name, {
                name: inputName,
                url: todoNew.url,
                perfect: isChecked,
                updateTime: Date.now(),
              })
            }
          >
            Submit
          </button>
        </td>
        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setChecked(e.target.checked);
              edit(todo.name, {
                name: todoNew.name,
                url: todoNew.url,
                perfect: isChecked,
                updateTime: todoNew.updateTime,
              });
            }}
          />
          <label>Perfect?</label>
        </td>
        <td>
          <button
            onClick={(e) => {
              setTodo({
                name: inputName,
                url: todoNew.url,
                perfect: isChecked,
                updateTime: Date.now(),
              });
              edit(todo.name, {
                name: inputName,
                url: todoNew.url,
                perfect: isChecked,
                updateTime: Date.now(),
              });
            }}
          >
            Submit
          </button>
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
