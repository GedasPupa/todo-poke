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
  const [newTime, setNewTime] = useState<number>(Date.now());
  const [todoNew, setTodo] = useState<ITodo>(todo);

  useEffect(() => {
    setTodo({
      name: inputName,
      perfect: isChecked,
      url: inputUrl,
      updateTime: newTime,
    });
    setNewTime(Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputName, inputUrl, isChecked]);

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
        <td className="btns">
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
        </td>
        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
          <label>Caught</label>
        </td>
        <td></td>
        <td>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setUrl(e.target.value)}
          />
        </td>
        <td className="btns">
          <button
            onClick={() => {
              edit(todo.name, {
                name: inputName,
                url: inputUrl,
                perfect: isChecked,
                updateTime: newTime,
              });
            }}
          >
            Update!
          </button>
        </td>
      </tr>
    </>
  );
};
