import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';
import { Container, Box } from '@mui/material';

export default () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then(session => {
        console.log('Session:', session);
        setStatus(true);
      })
  }, []);

  return (
    <Container>
            <Box
                marginTop = "20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
             {status ? (
                    <div>
                    You are logged in.
                    <button onClick={logout}>Logout</button>
                    </div>
                ) : 'Please login below.'}
            </Box>
    </Container>
  );
};