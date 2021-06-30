import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  todo: null,
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    ...initialState,
  },
  reducers: {
    setTodo: (state, action: PayloadAction<any>) => {
      state.todo = action.payload;
    },
    setTodos: (state, action: PayloadAction<any>) => {
      state.todos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer, actions } = todoSlice;
