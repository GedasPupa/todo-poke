import React from "react";
import { ITodo } from "../app/App";
import { Todo } from "../todo/Todo";

interface Props {
  todos: ITodo[];
  deleteTodo: (name: string) => void;
  edit: (name: string, newPoke: ITodo) => void;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, deleteTodo, edit } = props;
  return (
    <>
      {todos.map((todo, i) => (
        <Todo
          key={todo.name + i}
          todo={todo}
          deleteTodo={deleteTodo}
          edit={edit}
        />
      ))}
    </>
  );
};
