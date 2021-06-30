import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { getFromSettings, setSettings } from "../../commons/commons";
import { TodoType } from "./Overview";
import TodoListWrapper from "./Wrapper";

interface CreateFormType {
  data?: TodoType;
}

const CreateForm: React.FC<CreateFormType> = ({ data = {} }) => {
  const formRef = useRef<any>();

  const [formData, setFormData] = useState<any>(data);

  const submitForm = (e: any) => {
    formRef.current.reset();
    e.preventDefault();
    const newestTodo: number = getFromSettings("newestTodo") || 0;
    const newTodo = { ...formData, id: newestTodo };
    addTodo(newTodo);
    setSettings({ newestTodo: newestTodo + 1 });
    setFormData({});
  };

  const addTodo = (newData: object) => {
    const todoList = localStorage.getItem("todo-list");
    let list = todoList ? JSON.parse(todoList) : [];
    list = [...list, newData];
    localStorage.setItem("todo-list", JSON.stringify(list));
  };

  const onChange = (e: any) => {
    const currentData: any = { ...formData };
    currentData[e.target.name] = e.target.value;
    setFormData(currentData);
  };

  const inputProps: object = {
    onChange: onChange,
    required: true,
    style: {
      width: "100%",
    },
  };

  useEffect(() => {
    if (data?.title) {
      setFormData(data);
    }
  }, [data]);

  return (
    <TodoListWrapper title={formData?.title ? formData.title : "create todo"}>
      <form ref={formRef} onSubmit={submitForm}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={formData?.title}
              name="title"
              label="Title"
              {...inputProps}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="detail"
              label="Detail"
              value={formData?.detail}
              {...inputProps}
              multiline
              rows={4}
            />
          </Grid>
          <Grid container item xs={12} justify="center" spacing={2}>
            <Grid item xs={3}>
              <Button variant="contained" type="submit" color="primary">
                {data ? "UPDATE" : "SUBMIT"}
              </Button>
            </Grid>
            {!data && (
              <Grid item xs={3}>
                <Button variant="contained" type="reset" color="default">
                  RESET
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </TodoListWrapper>
  );
};

export default CreateForm;
