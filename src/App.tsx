import styled from '@emotion/styled';
import { Delete } from '@mui/icons-material';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { addTodo, removeTodo, setTodoStatus } from './redux/todoSlice';

const BoxContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const App = () => {
  //React Hooks

  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  const [todoError, setTodoError] = useState(false);

  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  //check if description is empty before add
  const handleAddTodo = () => {
    if (todoDescription === '' || todoTitle === '') {
      setTodoError(true);
    } else {
      dispatch(addTodo(todoTitle, todoDescription));
      setTodoTitle('');
      setTodoDescription('');
      setTodoError(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography style={{ textAlign: 'center' }} variant="h3">
        Redux toolkit & MUI
      </Typography>
      <BoxContainer>
        <TextField
          variant="outlined"
          label="Titre"
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
          size="small"
        />
        <TextField
          variant="outlined"
          label="Description"
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
          size="small"
        />

        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Ajouter
        </Button>
      </BoxContainer>
      {todoError && (
        <Typography variant="body2" color="error">
          Titre et description sont obligatoires
        </Typography>
      )}

      <List>
        {todoList.map((todo) => (
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
                <Delete />
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
        ))}
      </List>
    </Container>
  );
};

export default App;
