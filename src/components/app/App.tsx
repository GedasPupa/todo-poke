import React, { useEffect, useState } from "react";
import axios from "axios";
import { PokeList } from "../poke-list/PokeList";
import { TodoList } from "../todo-list/TodoList";

export interface ITodo {
  name: string;
  url: string;
  perfect?: boolean;
  updateTime?: number;
}

export interface IPoke {
  name: string;
  url: string;
}
export type State = ITodo[];

export const App: React.FC = () => {
  const [pokes, setPokes] = useState<IPoke[]>([{ name: "", url: "" }]);
  const [poke, setPoke] = useState<IPoke>();

  const [todos, setTodos] = useState<State>([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
      .then((response) => {
        setPokes(response.data.results);
        setPoke(response.data.results[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  const getPoke = async (url: string) => {
    const data = await axios(url);
    setLastUpdate(Date.now());
    setTodos([
      ...todos,
      {
        name: data.data.name,
        url: data.data.forms[0].url,
        updateTime: lastUpdate,
        perfect: true,
      },
    ]);
    console.log("From async fetch", data.data.name);
  };

  const deleteTodo = (name: string) => {
    setTodos(todos.filter((t) => t.name !== name));
  };

  return (
    <div>
      <p>
        Select Poke for a new TODO:
        <PokeList
          pokes={pokes}
          handlePokeSelect={({ currentTarget }) => {
            // console.log(currentTarget.value);
            setPoke(pokes.filter((p) => p.name === currentTarget.value)[0]);
          }}
        />
      </p>
      <button onClick={() => getPoke(poke!.url)}>ADD new Poke</button>
      <table>
        <tbody>
          <tr>
            <th>Poke name</th>
            <th>Perfect</th>
            <th>Last Update</th>
            <th>Url</th>
            <th>Actions</th>
          </tr>
          <TodoList todos={todos} deleteTodo={deleteTodo} />
        </tbody>
      </table>
    </div>
  );
};