import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Account } from './components/Accounts';
import Status from './components/Status';
import MFA from './components/MFA';
import Settings from './components/Settings'
// import ForgotPassword from './components/ForgotPassword'

export default () => {
  return (
    <Account>
      <SignUp/>
      <Status />
      <Login/>
      {/* <ForgotPassword /> */}
      <MFA/>
      <Settings />
    </Account>
  );

};

