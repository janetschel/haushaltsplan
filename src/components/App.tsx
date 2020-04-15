import React from 'react';
import Overview from './overview/Overview';
import LoginPrompt from './login/LoginPrompt';
import LoginExpired from './login/LoginExpired';
import './App.css';
import Api from "../api/Api";

class App extends React.Component<{}, { tasks: [], userIsLoggedIn: boolean,
  authtoken: string, username: string, loginExpired:boolean }> {
  constructor({props}: { props: any }) {
    super(props);

    // Used to wake up backend from sleep on deployment
    this.wakeup();

    this.state = {
      tasks: [],
      userIsLoggedIn: false,
      authtoken: '',
      username: '',
      loginExpired: false,
    };

    this.userLoggingIn = this.userLoggingIn.bind(this);
    this.loginExpired = this.loginExpired.bind(this);
  }

  wakeup = async () => {
    const response = await (await Api.healthCheck()).text();
    console.log(response);
  };

  userLoggingIn = async (username: string, password: string) => {
    const base64String = btoa(`${username}:${password}`);
    const validInformation = await (await Api.login(base64String)).text() === 'true';

    if (!validInformation) {
      await this.setState({ userIsLoggedIn: false });
      return 'falseCredentials';
    }

    let response: any;
    try {
      response = await Api.getAuthToken(base64String);
    } catch (error) {
      await this.setState({ userIsLoggedIn: false });
      return 'loginExpired';
    }

    const authtoken = await response!.text();
    await this.setState({ username: username });
    await this.setState({ authtoken: authtoken });
    await this.setState({ userIsLoggedIn: true });

    return 'true';
  };

  loginExpired = async () => {
    await this.setState({ userIsLoggedIn: false });
    await this.setState({ loginExpired: true });
    await this.delay(15000);
    await this.setState({ loginExpired: false });
  };

  delay = (ms: number) => {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  render() {
    const { userIsLoggedIn, loginExpired, authtoken, username } = this.state;

    return(
      <div className="App">
        { loginExpired ? <LoginExpired /> : (userIsLoggedIn ?
            <Overview loginExpired={this.loginExpired} authtoken={authtoken} username={username}/> :
            <LoginPrompt loginExpired={this.loginExpired} userLoggingIn={this.userLoggingIn} />)
        }
      </div>
    );
  }
}

export default App;
