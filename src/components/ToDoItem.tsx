import { Clear } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ReactNode } from "react";

const ToDoItem = ({
  id,
  children,
  onDelete,
}: {
  id: string;
  children: ReactNode;
  onDelete: (idToDelete: string) => void;
}) => {
  return (
    <ListItem
      sx={{ border: "1px solid black" }}
      secondaryAction={
        <IconButton
          onClick={() => onDelete(id)}
          edge="end"
          aria-label={"delete item" + id}
        >
          <Clear />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        //checked={false}
        tabIndex={-1}
        disableRipple
        inputProps={{ "aria-labelledby": id }}
      />
      <ListItemButton
        sx={{ pl: 0.5, pr: 0.5 }}
        disableGutters
        onClick={() => {}}
        dense
      >
        <ListItemText id={id} primary={children} />
      </ListItemButton>
    </ListItem>
  );
};

export default ToDoItem;
