import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Accounts";
import ChangePassword from "./ChangePassword";
import { Container} from '@mui/material';



export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true);
    });
  }, []);

  return (
    <div>
      {loggedIn && (
        <>
        <Container maxWidth="md">
            <h1>Settings</h1>

            <ChangePassword />
        </Container>
        </>
      )}
    </div>
  );
};
