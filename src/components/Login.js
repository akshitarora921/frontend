import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/store";
import "../css/login.css";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => dispatch(setUser(result.user)))
      .catch((err) => {
        return;
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg"
          alt="logo"
        />
        <div className="login__text">
          <h1>Sign in to whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
