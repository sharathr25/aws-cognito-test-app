import React, { useState } from 'react';
import Amplify, { Auth } from 'aws-amplify'
import './App.css';
import config from './aws-exports';

function App() {
  Amplify.configure(config);
  const [userName,setUserName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [loginMobileNumber, setLoginMobileNumber] = useState('');
  const [signUpMobileNumber, setSignUpMobileNumber] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');

  const handleSignin = async () => {
    console.log(loginEmail, loginMobileNumber, loginPassword);
    if(loginEmail.length !== 0) {
      try {
        const user = await Auth.signIn(loginEmail, loginPassword);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const user = await Auth.signIn(loginMobileNumber, loginPassword);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSignUp = async () => {
    console.log(signUpEmail, signUpMobileNumber, signUpPassword);
    try {
      const user = await Auth.signUp({
        username: userName,
        password: signUpPassword,
        attributes: {
          email: signUpEmail,
          phone_number: signUpMobileNumber
        }
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  const handleVerify = async () => {
    console.log(otp);
    try {
      const data = await Auth.confirmSignUp(userName, otp, { forceAliasCreation: true });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const sendOtpToEmail = () => {
    Auth.verifyCurrentUserAttribute("email")
      .then(() => {
        console.log('a verification code is sent');
      }).catch((e) => {
        console.log('failed with error', e);
      });
  }

  const verfiyEmail = () => {
    Auth.verifyCurrentUserAttributeSubmit("email", emailOtp)
      .then(() => {
        console.log('signUpEmail verified');
      }).catch(e => {
        console.log('failed with error', e);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <h3>Signup</h3>
        <div className="tableDiv">
          <table>
            <tbody>
            <tr>
              <td>Username</td>
              <td><input type="text" onChange={(e) => setUserName(e.target.value)} value={userName}/></td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td><input type="text" onChange={(e) => setSignUpMobileNumber(e.target.value)} value={signUpMobileNumber}/></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="email" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail}/></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}/></td>
            </tr>
            </tbody>
          </table>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      <div className="container">
        <h3>Phone Number Verification</h3>
        <div className="tableDiv">
          <table>
            <tbody>
            <tr>
              <td>OTP</td>
              <td><input type="text" onChange={(e) => setOtp(e.target.value)} value={otp}/></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div><button type="button" onClick={handleVerify}>Verify</button></div>
      </div>
      <div className="container">
        <h3>Login</h3>
        <h6>You can login with Email if it is verified or you can use Mobile number</h6>
        <div className="tableDiv">
        <table>
          <tbody>
          <tr>
            <td>Mobile number</td>
            <td><input type="text" onChange={(e) => setLoginMobileNumber(e.target.value)} value={loginMobileNumber}/></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input type="email" onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail}/></td>
          </tr>
          <tr>
          <td>Password</td>
            <td><input type="password" onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} /></td>
          </tr>
          </tbody>
        </table>
        <button type="button" onClick={handleSignin}>Sign In</button>
        </div>
      </div>  
      <div className="container">
        <h3>Email Verification</h3>
        <h6>After login only email can be verified</h6>
        <div>
        <button type="button" onClick={sendOtpToEmail}>send OTP to email</button></div>
        <div className="tableDiv">
          <table>
            <tbody>
              <tr>
                <td>OTP</td>
                <td><input type="text" onChange={(e) => setEmailOtp(e.target.value)} value={emailOtp}/></td>
              </tr>
            </tbody>
          </table>
          <button type="button" onClick={verfiyEmail}>Verify</button>
        </div>
      </div>
    </div>
  );
}

export default App;
