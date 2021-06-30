export const getTodos = () => {
  const todos = localStorage.getItem("todo-list");
  return todos ? JSON.parse(todos) : {};
};
