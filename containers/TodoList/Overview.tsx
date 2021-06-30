import { Grid, IconButton } from "@material-ui/core";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport
} from "@material-ui/data-grid";
import { Delete, Edit } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { todoPath } from "../../commons/localPath";
import { actions } from "./slice";
import TodoListWrapper from "./Wrapper";

export interface TodoType {
  id: number;
  title: string;
  detail: string;
}

type TodoListType = TodoType[];

const TodoListOverview: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoListType>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickDelete = () => {};
  const handleClickEdit = (todo: any) => {
    router.push(todoPath.edit.replace(":todoId", String(todo.id)));
    dispatch(actions.setTodo(todo));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    {
      field: "title",
      headerName: "Title",
      width: 130,
      renderCell: ({ row }: GridCellParams) => {
        return <span onClick={() => handleClickEdit(row)}>{row.title}</span>;
      },
    },
    { field: "detail", headerName: "Detail", flex: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: ({ row }: GridCellParams) => {
        return (
          <Grid container justify="flex-start" spacing={2}>
            <IconButton color="primary" onClick={() => handleClickEdit(row)}>
              <Edit />
            </IconButton>
            <IconButton color="secondary" onClick={handleClickDelete}>
              <Delete />
            </IconButton>
          </Grid>
        );
      },
    },
  ];

  useEffect(() => {
    let todoList: string | null = localStorage.getItem("todo-list");
    if (todoList) {
      const data: TodoType[] = JSON.parse(todoList);
      setTodoList(data);
    }
  }, []);

  return (
    <TodoListWrapper title="todo list">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={todoList}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <GridToolbarExport csvOptions={{ fileName: "todo-list" }} />
              </GridToolbarContainer>
            ),
          }}
        />
      </div>
    </TodoListWrapper>
  );
};

export default TodoListOverview;
