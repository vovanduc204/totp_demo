import React, { useState, useContext } from "react";
import { AccountContext } from "./Accounts";
import { TextField, Button, Container, Box } from '@mui/material';

export default () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        user.changePassword(password, newPassword, (err, result) => {
          if (err) console.error(err);
          console.log(result);
        });
      });
    });
  };

  return (
    <div>
      <Container maxWidth="md">
            <Box
                sx={{
                marginTop: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
                >
                <TextField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="New Password"
                    type="newPassword"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={onSubmit}>
                    Change Password
                </Button>
            </Box>
        </Container>
    </div>
  );
};
