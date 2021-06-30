import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./containers/TodoList/slice";

export default configureStore({
  reducer: {
    todo: reducer,
  },
});
