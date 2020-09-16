import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useSelector } from "react-redux";

// bem naming convention
function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <h1>Home Screen</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
