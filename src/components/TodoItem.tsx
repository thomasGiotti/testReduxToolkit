import { Delete } from '@mui/icons-material';
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../models/todo';
import { AppDispatch } from '../redux/store';
import { removeTodo, setTodoStatus } from '../redux/todoSlice';

type Props = {
  todo: Todo;
};

const TodoItem = (props: Props) => {
  const { todo } = props;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ListItem key={todo.id}>
      <ListItemText
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {todo.title}
        </Typography>
        <Typography variant="subtitle2">{todo.description}</Typography>
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            dispatch(removeTodo(todo.id));
          }}
        >
          <Delete color="error" />
        </IconButton>
        <Checkbox
          edge="end"
          value={todo.completed}
          onChange={() => {
            dispatch(
              setTodoStatus({ completed: !todo.completed, id: todo.id })
            );
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
