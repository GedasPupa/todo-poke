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
  const [editRowStyle, setStyle] = useState<string>("none");
  const [inputName, setName] = useState<string>(todo.name);
  const [isChecked, setChecked] = useState<boolean | undefined>(todo.perfect);
  const [inputUrl, setUrl] = useState<string>(todo.url);
  const [todoNew, setTodo] = useState<ITodo>(todo);

  useEffect(() => {
    setTodo({
      name: inputName,
      perfect: todoNew.perfect,
      url: inputUrl,
      updateTime: todoNew.updateTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputName, inputUrl]);

  const setStyleHandler = (): void => {
    if (editRowStyle === "none") {
      setStyle("");
    } else {
      setStyle("none");
    }
  };

  return (
    <>
      <tr>
        <td>{todoNew.name}</td>
        <td>{isChecked ? "Caught" : "Will be"}</td>
        <td>{DateConverter(todoNew.updateTime!)}</td>
        <td>{todoNew.url}</td>
        <td>
          <button onClick={() => deleteTodo(todoNew.name)}>Delete</button>
          <button onClick={() => setStyleHandler()}>Edit</button>
        </td>
      </tr>
      <tr className={editRowStyle}>
        <td>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
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
          <label>Caught</label>
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
            Update
          </button>
        </td>
        <td>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={() =>
              edit(todo.name, {
                name: todoNew.name,
                url: inputUrl,
                perfect: isChecked,
                updateTime: Date.now(),
              })
            }
          >
            Update
          </button>
        </td>
        <td></td>
      </tr>
    </>
  );
};
