import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const selectDomain = (state: any) => state.todo || initialState;

export const selectTodo = createSelector([selectDomain], (state) => state.todo);

export const selectTodos = createSelector(
  [selectDomain],
  (state) => state.todos
);
