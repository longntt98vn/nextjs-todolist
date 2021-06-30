import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateForm from "./CreateForm";
import { TodoType } from "./Overview";
import { selectTodo, selectTodos } from "./selector";
import { actions } from "./slice";

const EditForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { todoId } = router.query;
  const todo = useSelector(selectTodo);
  const todos = useSelector(selectTodos);

  useEffect(() => {
    if (!todo) {
      const currentTodo = todos.find(
        (ele: TodoType) => ele.id === Number(todoId)
      );
      dispatch(actions.setTodo(currentTodo));
    }
  });
  return <CreateForm data={todo} />;
};

export default EditForm;
