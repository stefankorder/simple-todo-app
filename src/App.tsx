import { List } from "@mui/material";
import ToDoItem from "./components/ToDoItem";
import { useState } from "react";

const initialTodos = [
  { id: "1", text: "todo 1" },
  { id: "2", text: "todo 2" },
  { id: "3", text: "todo 3" },
  { id: "4", text: "todo 4" },
  { id: "5", text: "todo 5" },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleDelete = (idToDelete: string) => {
    setTodos((state) => state.filter(({ id }) => id !== idToDelete));
  };

  return (
    <List sx={{ width: 500, ml: "auto", mr: "auto" }}>
      {todos.map(({ id, text }) => {
        return (
          <ToDoItem onDelete={handleDelete} key={id} id={id}>
            {text}
          </ToDoItem>
        );
      })}
    </List>
  );
}

export default App;
