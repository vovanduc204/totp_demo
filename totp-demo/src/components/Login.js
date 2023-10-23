import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AccountContext } from './Accounts';
const QR = require('qrcode')

const speakeasy = require('speakeasy'); 

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: #1976d2;
  color: #ffffff;
  &:hover {
    background-color: #1565c0;
  }
`;



export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { authenticate } = useContext(AccountContext);
  
    const onSubmit = event => {
        event.preventDefault();
        
        authenticate(email, password)
        .then(data => {
          console.log('Logged in!', data);
        })
        .catch(err => {
          console.error('Failed to login!', err);
        })
    };

    const onQRCode = event => {
      event.preventDefault();
      console.log('onQRCode');

    };
    
    return (
      <div>
        <StyledContainer>
            <StyledForm onSubmit={onSubmit}>

                <Typography variant="h5" align="center">
                    Login
                </Typography>

                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <StyledButton type="submit" onClick={onSubmit} variant="contained">
                    Login
                </StyledButton>


                <StyledButton type="submit" onClick={onQRCode} variant="contained">
                    Demo Generate Code
                </StyledButton>
            </StyledForm>
        </StyledContainer>
      </div>
    );
  };