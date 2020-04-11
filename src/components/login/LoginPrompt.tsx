import React from 'react';
import {Button, TextField, Typography, CircularProgress } from '@material-ui/core';

class LoginPrompt extends React.Component<Props, { loggingIn: boolean, falseCredentials: boolean }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      loggingIn: false,
      falseCredentials: false,
    }
  }

  userRequestingLogIn = async () => {
    const { userLoggingIn } = this.props;

    this.setState({ loggingIn: true });
    this.setState({ falseCredentials: false });

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const userIsLoggedIn = await userLoggingIn(username, password);

    if (!userIsLoggedIn) {
      this.setState({ loggingIn: false });
      this.setState({ falseCredentials: true });
    }
  };

  keyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      this.userRequestingLogIn();
    }
  };

  render() {
    const { loggingIn, falseCredentials } = this.state;

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
          { falseCredentials && <Typography color="secondary">Benutzername und/oder Passwort falsch!</Typography> }
        </div>
    );
  }
}

type Props = {
  userLoggingIn: (username: string, password: string) => Promise<boolean>,
}

export default LoginPrompt;
