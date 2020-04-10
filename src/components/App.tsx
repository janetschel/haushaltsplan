import React from 'react';
import Overview from './overview/Overview';
import LoginPrompt from './login/LoginPrompt';
import './App.css';
import Api from "../api/Api";

class App extends React.Component<{}, { tasks: [], userIsLoggedIn: boolean, authtoken: string, username: string }> {
  constructor({props}: { props: any }) {
    super(props);

    // Used to wake up backend from sleep on deployment
    this.wakeup();

    this.state = {
      tasks: [],
      userIsLoggedIn: false,
      authtoken: '',
      username: '',
    };

    this.userLoggingIn = this.userLoggingIn.bind(this);
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
      return false;
    }

    const authtoken = await(await Api.getAuthToken(base64String)).text();
    await this.setState({ username: username });
    await this.setState({ authtoken: authtoken });
    await this.setState({ userIsLoggedIn: true });
    return true;
  };

  render() {
    const { userIsLoggedIn, authtoken, username } = this.state;

    return(
      <div className="App">
        { userIsLoggedIn ?
            <Overview authtoken={authtoken} username={username}/> :
            <LoginPrompt userLoggingIn={this.userLoggingIn} />
        }
      </div>
    );
  }
}

export default App;
