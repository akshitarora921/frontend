import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/store";
import "../css/login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const signIn = () => {
    dispatch(setUser(userName));
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
        <form>
          <input
            type="text"
            value={userName}
            placeholder="Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="login__button" type="submit" onClick={signIn}>
            Signin
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
