import { Box, Button, Container, Grid2, List, TextField } from "@mui/material";
import ToDoItem from "./components/ToDoItem";
import { FormEvent, useEffect, useState } from "react";

const initialTodos = [
  {
    id: "1",
    timestamp: new Date().toDateString(),
    text: "todo 1",
    checked: false,
    editModeEnabled: false,
  },
  {
    id: "2",
    timestamp: new Date().toDateString(),
    text: "todo 2",
    checked: false,
    editModeEnabled: false,
  },
  {
    id: "3",
    timestamp: new Date().toDateString(),
    text: "todo 3",
    checked: false,
    editModeEnabled: false,
  },
  {
    id: "4",
    timestamp: new Date().toDateString(),
    text: "todo 4",
    checked: false,
    editModeEnabled: false,
  },
  {
    id: "5",
    timestamp: new Date().toDateString(),
    text: "todo 5",
    checked: false,
    editModeEnabled: false,
  },
];

function App() {
  const [todos, setTodos] = useState<typeof initialTodos>(() => {
    if (localStorage) {
      const todos = localStorage.getItem("todos");
      return todos ? JSON.parse(todos) : initialTodos;
    }

    return initialTodos;
  });

  const handleDelete = (idToDelete: string) => {
    setTodos((state) => state.filter(({ id }) => id !== idToDelete));
  };

  const handleToggle = (idToToggle: string) => {
    setTodos((state) =>
      state.map((todo) =>
        todo.id === idToToggle ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleEditMode = (idToHandleEditMode: string) => {
    setTodos((state) =>
      state.map((todo) =>
        todo.id === idToHandleEditMode
          ? { ...todo, editModeEnabled: !todo.editModeEnabled }
          : todo
      )
    );
  };

  const handleEditTodo = (idToEdit: string, newText: string) => {
    setTodos((state) =>
      state.map((todo) =>
        todo.id === idToEdit ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData);

    const { text } = formValues;

    setTodos((state) => [
      ...state,
      {
        id: String(state.length + 1),
        timestamp: new Date().toDateString(),
        checked: false,
        editModeEnabled: false,
        text: text as string,
      },
    ]);
  };

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ background: "lightblue" }} component="header">
        simple-todo-app
      </Box>
      <Container
        sx={{ background: "lightgreen" }}
        maxWidth="xl"
        component="main"
      >
        <Grid2 container>
          <Grid2
            sx={{ ml: "auto", mr: "auto" }}
            size={{ xs: 12, md: 6 }}
            spacing={1}
            component="form"
            onSubmit={handleSubmit}
            display={"flex"}
            flexDirection={"column"}
            gap={1}
          >
            <TextField
              label="Todo"
              size="small"
              fullWidth
              multiline
              name="text"
              variant="filled"
              minRows={10}
            />
            <Button
              variant="contained"
              size="small"
              type="submit"
              disableElevation
            >
              New Todo
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }} component={List}>
            {todos.map(({ id, text, timestamp, checked, editModeEnabled }) => {
              return (
                <ToDoItem
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onEditMode={handleEditMode}
                  onEditTodo={handleEditTodo}
                  key={id}
                  id={id}
                  checked={checked}
                  editModeEnabled={editModeEnabled}
                  timestamp={timestamp}
                >
                  {text}
                </ToDoItem>
              );
            })}
          </Grid2>
        </Grid2>
      </Container>
      <Box sx={{ background: "lightblue" }} component="footer">
        hier kommt der footer hin
      </Box>
    </Box>
  );
}

export default App;
