import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core';

class LoginPrompt extends React.Component<Props, {}> {

  userRequestingLogIn = () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (username.length === 0 || password.length === 0) {

      return;
    }

    const { userLoggingIn } = this.props;

    userLoggingIn(username, password);
  };

  keyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      this.userRequestingLogIn();
    }
  };

  render() {
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
          <Button className="loginButton" variant="outlined" onClick={this.userRequestingLogIn}>Einloggen!</Button>
        </div>
    );
  }
}

type Props = {
  userLoggingIn: (username: string, password: string) => void,
}

export default LoginPrompt;
