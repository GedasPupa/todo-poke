import axios from "axios";
import React, { useReducer } from "react";

type Actions =
  | { type: "add"; text: string }
  | { type: "remove"; idx: number }
  | { type: "addPoke"; text: string; poke?: string | Promise<Response> };

interface ITodo {
  text: string | Promise<Response>;
  complete: boolean;
  poke?: string | Promise<Response>;
}

type State = ITodo[];

const fetchPoke = async () => {
  const poke = await axios("https://pokeapi.co/api/v2/pokemon/ditto");
  console.log("From async fetch", poke.data.name);
  return poke.data.name;
};

const TodoReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "add":
      return [...state, { text: action.text, complete: false }];
    case "remove":
      return state.filter((_, i) => action.idx !== i);
    case "addPoke":
      return [
        ...state,
        {
          text: "New poke",
          complete: false,
          poke: fetchPoke(),
        },
      ];
    default:
      return state;
  }
};

export const Reducer: React.FC = () => {
  const [todos, dispatch] = useReducer(TodoReducer, []);

  return (
    <div>
      {JSON.stringify(todos)}
      {todos.map((i, id) => (
        <div key={id}>
          <p>Poke id - {id}</p>
          <p>{JSON.stringify(i.poke)}</p>
          <p>{JSON.stringify(i.text)}</p>

          <button
            onClick={() => {
              dispatch({ type: "remove", idx: id });
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <br />
      <button
        onClick={() => {
          dispatch({ type: "add", text: "...." });
        }}
      >
        ADD
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "addPoke",
            text: "JJJJJJJJ",
          });
        }}
      >
        ADD POKE
      </button>
    </div>
  );
};
