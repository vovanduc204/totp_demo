import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import UserPool from '../UserPool';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'ap-southeast-1' });

async function checkRequiredAttributes() {
  const params = {
    UserPoolId: 'ap-southeast-1_MhYx0s6bg'
  };

  try {
    const userPoolDetails = await cognito.describeUserPool(params).promise();
    const requiredAttributes = userPoolDetails.UserPool.SchemaAttributes.filter(attribute => attribute.Required);

    if (requiredAttributes.length > 0) {
      console.log(`The following attributes are required: ${requiredAttributes.map(attr => attr.Name).join(', ')}`);
    } else {
      console.log('No required attributes found.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmit = event => {
      event.preventDefault();

      console.log(email + ' submitted ,' + password + ' submitted' );

      checkRequiredAttributes();
  
      UserPool.signUp(email, password, [], null, (err, data) => {
        if (err) console.error(err);
        console.log(data);
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
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={onSubmit}>
                    SignUp
                </Button>
            </Box>
        </Container>
      </div>
    );
  };