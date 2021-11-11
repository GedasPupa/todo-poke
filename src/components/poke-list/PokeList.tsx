import React from "react";
import { IPoke } from "../app/App";

interface Props {
  pokes: IPoke[];
  handlePokeSelect: React.ReactEventHandler<HTMLSelectElement>;
}

export const PokeList: React.FC<Props> = (props) => {
  const { pokes, handlePokeSelect } = props;
  return (
    <select onChange={handlePokeSelect}>
      {pokes.map((todo, idx) => (
        <option key={idx} value={todo.name}>
          {todo.name}
        </option>
      ))}
    </select>
  );
};
