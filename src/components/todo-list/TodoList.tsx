import React from "react";
import { ITodo } from "../app/App";
import { Todo } from "../todo/Todo";

interface Props {
  todos: ITodo[];
  deleteTodo: (name: string) => void;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, deleteTodo } = props;
  return (
    <>
      {todos.map((todo) => {
        return <Todo todo={todo} deleteTodo={deleteTodo} />;
      })}
    </>
  );
};
