import React from 'react';
import { Container, Box } from '@mui/material';
import { Button } from '@mui/material';
import { AccountContext } from './Accounts';
import { useState, useContext } from 'react';
import axios from 'axios';
var cors = require("cors");

export default () => {

    const { getSession } = useContext(AccountContext);

    // const [userCode, setUserCode] = useState('');

    // const [enabled, setEnabled] = useState(false);

    const [image, setImage] = useState('');

    const API =  'https://v53pr9z7vl.execute-api.ap-southeast-1.amazonaws.com/devv2/mfa';

    const accessTokenCs = 'eyJraWQiOiJGQSs5dVZYK0loSjl5bXFuMm45anJONm5iQVdrR2FoOG9SMzRDZTVpSEg0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiOTZhOTU0Yy05MGUxLTcwNzktODEzMC0xNjM0NjhhNTBjNGMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfM25GRERvUnV6IiwiY2xpZW50X2lkIjoiNnZqaHRjNHRvcG5lY2ptdWVkNWlva2VqaXEiLCJvcmlnaW5fanRpIjoiNWEzZTNmNTMtY2U3OC00MzgxLThjYjUtNjJkYWFiNjU5YWRmIiwiZXZlbnRfaWQiOiJmZTgzYzE2YS1iZjUyLTQzMjQtYTgxOS1mYTExMGM5MzdiYmIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk3NzAxMjAzLCJleHAiOjE2OTgwNDc0MTIsImlhdCI6MTY5ODA0MzgxMiwianRpIjoiOTEzZDBjMTYtMzM3Yy00ZTg2LThjMjEtMmRiNDZlODA4YzM5IiwidXNlcm5hbWUiOiJiOTZhOTU0Yy05MGUxLTcwNzktODEzMC0xNjM0NjhhNTBjNGMifQ.QAGyU5aHDp5L091W2ynBeUY7c2wtOOAOUXR8-3b64tfEhLwKAcgSq3YlIz9OTAzPQUh5W7ciYISSfbaTx_CLkakjbaCGzwk3c6_kFF3uXVneqorhO5c_uECxYjvEKjinmoQU-XY2JYREU8WI9W4Bzne2ljU9VV64zqquqU3D-MkP6A80y6bomJeW-Bv8zcISjQeLVGhHaEvLEioaqvJhlJWKd7FDbYLB2kLnrC7UNFPJWSKW5vM5WESqm_OeB0AY5jQfM7PJ3DCwcnRDir3Y8CJ8bWAqpsq3AFI-L19D1NVey9v7_IZugY9fQds6OvfMoqQDRx_j7DBO6woqlauh7Q';


    const hearder = {
        'Access-Control-Request-Headers': '*',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'AccessToken': accessTokenCs,
        'Access-Control-Allow-Credentials': true
    };


    
    const getQRCode = async () => {
        try{
            const response = await axios.get(API, {headers : hearder});

            console.log('Response:', response);

        } catch (error) {

            console.error('Error:', error);
        }
    }





        // getSession().then(({ accessToken, headers }) => {
            // if (typeof accessToken !== 'string') {
            //   accessToken = accessToken.jwtToken
            // }
      
            // const uri = `${API}?AccessToken=${accessToken}`;
           

            // console.log("headers.AccessToken :  "+ headers.AccessToken);

            // console.log("AccessToken: " + accessToken );
      
            // fetch(uri, {
            //   headers,
            // })
            //   .then((data) => data.json())
            //   .then(setImage)
            //   .catch(console.error)
        // })
    // }
    
    

    return (
        <div>
            <Container maxWidth="md">
                <Box
                    sx={{
                    marginTop: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    Multi-factor Authentication
                    <img src={image} />
                    <Button variant="contained" onClick={getQRCode}>Enable MFA</Button>
                </Box>
            </Container>
        </div>
    ) 
}