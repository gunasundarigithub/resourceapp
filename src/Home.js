import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./authContext";
import Login from "./Components/Login";


const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/App" />
      ) : (
        <div>
          <h2>Resource Scheduler</h2>
          <Login />

        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;