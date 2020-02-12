import React, {Component} from "react";
import auth0 from "auth0-js";

import {AUTH_CONFIG} from "../auth-variables";
import {AuthProvider} from "../authContext";

 const AUTH_CONFIG = {
  domain: "dev-8qn6wqpr.auth0.com",
  roleUrl: "https://rbac-tutorial-app/role",
  clientId: "taMHUr25QwK9L45m3uFudYB9GlZg6a0F",
  callbackUrl: "http://localhost:3000/callback"
};

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: "token id_token"
});

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: "visitor"
    },
    accessToken: ""
  };

  initiateLogin = () => {
  auth.authorize();
};

  logout = () => {
  this.setState({
    authenticated: false,
    user: {
      role: "visitor"
    },
    accessToken: ""
  });
};

 handleAuthentication = () => {
  auth.parseHash((error, authResult) => {
    if (error) {
      console.log(error);
      console.log(`Error ${error.error} occured`);
      return;
    }

    this.setSession(authResult.idTokenPayload);
  });
};

  setSession(data) {
  const user = {
    id: data.sub,
    email: data.email,
    role: data[AUTH_CONFIG.roleUrl]
  };
  this.setState({
    authenticated: true,
    accessToken: data.accessToken,
    user
  });
}

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;