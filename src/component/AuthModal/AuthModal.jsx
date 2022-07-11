import { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Box, Button, FormControl, FormHelperText, Modal, TextField, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  py: 3,
  px: 4,
};

const AuthModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const client = useApolloClient();

  const clear = () => {
    setName('');
    setPassword('');
    setError('');
  };

  const handleSignup = async () => {
    try {
      const registerMutation = gql`
        mutation register($name: String, $password: String) {
          register(name: $name, password: $password) {
            id
            name
            token
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: registerMutation,
        variables: {
          name,
          password,
        },
      });

      localStorage.setItem('token', data.register.token);

      clear();
      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const loginQuery = gql`
        query login($name: String, $password: String) {
          login(name: $name, password: $password) {
            id
            name
            token
          }
        }
      `;
      const { data } = await client.query({
        query: loginQuery,
        variables: {
          name,
          password,
        },
      });

      localStorage.setItem('token', data.login.token);

      clear();
      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column" justifyContent="center" gap={3} sx={modalStyle}>
        <Typography variant="h4" textAlign="center">
          Authentication
        </Typography>
        <FormControl error={Boolean(error)} sx={{ width: '300px', margin: 'auto' }}>
          <TextField label="username" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 3 }} />
          <TextField label="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button onClick={handleSignup}>Sign up</Button>
          <Button onClick={handleLogin}>Log in</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
