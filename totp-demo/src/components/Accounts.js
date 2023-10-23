import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from '../UserPool'

const AccountContext = createContext();

const Account = (props) => {

  const getSession = async () =>
    await new Promise(( resolve, reject ) => {
      const user = UserPool.getCurrentUser();
      if (user) {
          user.getSession(async (err, session) => {
            if (err) {
              reject()
            } else {
              const attributes = await new Promise((resolve, reject) => {
                user.getUserAttributes((err, attributes) => {
                  if (err) {
                    reject(err)
                  } else {
                    const results = {}
  
                    for (let attribute of attributes) {
                      const { Name, Value } = attribute
                      results[Name] = Value
                    }
  
                    resolve(results);
                  }
                })
              })

              const AccessToken = session.accessToken.jwtToken;

              // console.log(AccessToken);
  
              const token = session.getIdToken().getJwtToken();

              resolve({
                user,
                // AccessToken,
                headers: {
                  // 'x-api-key': '906sOjzREy3cfokxh5XEf34mHgoB3jRt5cWcmDXF',
                  // Authorization: token,
                  // Accept: '*/*',
                  'AccessToken': AccessToken,
                  'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
                  'Access-Control-Allow-Credentials': true,
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                ...session,
                ...attributes,
              });

            }
          })
        } else {
          // reject()
        }
  });

    const authenticate = async (Username, Password) =>
        await new Promise((resolve, reject)=> {
        const user = new CognitoUser({
            Username : Username,
            Pool : UserPool
        });

        const authenticationDetail = new AuthenticationDetails({
            Username: Username,
            Password: Password 
        });

        user.authenticateUser(authenticationDetail, {
            onSuccess: (data) => {
                console.log('onSuccess:', data)
                resolve(data)
            },
        
            onFailure: (err) => {
                console.error('onFailure:', err)
                reject(err)
            },
            newPasswordRequired: (data) => {
                console.log('newPasswordRequired:', data)
                resolve(data)
            },
        });
    })

    const logout = () => {
        const user = UserPool.getCurrentUser()
        if (user) {
          user.signOut()
        }
    }
    

    return (
        <AccountContext.Provider
        value={{
            authenticate,
            getSession,
            logout
        }}
        >
            {props.children}
        </AccountContext.Provider>
      )
}

export { Account, AccountContext }