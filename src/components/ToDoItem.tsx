import { Clear } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { ReactNode } from "react";

const ToDoItem = ({
  id,
  children,
  timestamp,
  checked,
  editModeEnabled,
  onDelete,
  onToggle,
  onEditMode,
  onEditTodo,
}: {
  id: string;
  children: ReactNode;
  timestamp: string;
  checked: boolean;
  editModeEnabled: boolean;
  onDelete: (idToDelete: string) => void;
  onToggle: (idToToggle: string) => void;
  onEditMode: (idToHandleEditMode: string) => void;
  onEditTodo: (idToEdit: string, newText: string) => void;
}) => {
  return (
    <ListItem
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
        checked={checked}
        tabIndex={-1}
        disableRipple
        inputProps={{ "aria-labelledby": id }}
        onChange={() => onToggle(id)}
      />
      {editModeEnabled ? (
        <TextField
          size="small"
          variant="standard"
          autoFocus
          fullWidth
          value={children}
          onBlur={() => onEditMode(id)}
          onChange={(event) => onEditTodo(id, String(event.target.value))}
        />
      ) : (
        <ListItemButton
          sx={{ pl: 0.5, pr: 0.5 }}
          disableGutters
          onClick={() => onEditMode(id)}
          dense
        >
          <ListItemText id={id} primary={children} secondary={timestamp} />
        </ListItemButton>
      )}
    </ListItem>
  );
};

export default ToDoItem;
