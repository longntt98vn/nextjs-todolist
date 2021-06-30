import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../commons/commons";
import HomeWrapper from "../Home/Wrapper";
import { getTodos } from "./request";
import { selectTodo } from "./selector";
import SiderBar from "./SiderBar";
import { actions } from "./slice";

interface TodoListWrapperType {
  children: JSX.Element[] | JSX.Element;
  title: string;
}

const TodoListWrapper: React.FC<TodoListWrapperType> = ({
  children,
  title,
}) => {
  const todo = useSelector(selectTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    const settings = localStorage.getItem("settings");
    !settings?.includes("newestTodo") && setSettings({ newestTodo: 0 });
  }, []);

  useEffect(() => {
    dispatch(actions.setTodos(getTodos()));
  }, []);

  return (
    <HomeWrapper>
      <Container className="root-wrapper">
        <Grid container justify="space-around">
          <Grid item xs={3}>
            <SiderBar />
          </Grid>
          <Grid item xs={7}>
            <Grid container justify="center">
              <Typography variant="h4" gutterBottom>
                {title.toUpperCase()}
              </Typography>
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Container>
    </HomeWrapper>
  );
};

export default TodoListWrapper;
