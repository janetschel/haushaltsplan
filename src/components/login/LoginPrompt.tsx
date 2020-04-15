import React from 'react';
import {Button, TextField, Typography, CircularProgress } from '@material-ui/core';

class LoginPrompt extends React.Component<Props, { loggingIn: boolean, flaseCredentials: boolean, }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      loggingIn: false,
      flaseCredentials: false,
    }
  }

  userRequestingLogIn = async () => {
    const { userLoggingIn, loginExpired } = this.props;

    this.setState({ loggingIn: true });
    this.setState({ flaseCredentials: false });

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const response = await userLoggingIn(username, password);

    if (response === 'falseCredentials') {
      this.setState({ loggingIn: false });
      this.setState({ flaseCredentials: true });
    } else if (response === 'loginExpired') {
      loginExpired();
    }
  };

  keyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      this.userRequestingLogIn();
    }
  };

  render() {
    const { loggingIn, flaseCredentials } = this.state;

    return (
        <div className="LoginPrompt">
          <Typography variant="h4">Haushaltsplaner - Login</Typography>
          <TextField className="username" id="username" variant="outlined" label="Benutzername" />
          <TextField
              className="password"
              id="password"
              variant="outlined"
              label="Passwort"
              type="password"
              onKeyDown={this.keyPressed}
          />
          <br />
          <Button className="loginButton" variant="outlined" onClick={this.userRequestingLogIn}>Einloggen</Button>
          <br />
          { loggingIn && <CircularProgress className="waitingForLoginResponse"/> }
          { flaseCredentials && <Typography color="secondary">Benutzername und/oder Passwort falsch!</Typography> }
        </div>
    );
  }
}

type Props = {
  userLoggingIn: (username: string, password: string) => Promise<string>,
  loginExpired: () => void,
}

export default LoginPrompt;
