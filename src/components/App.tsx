import React from 'react';
import Overview from './overview/Overview';
import LoginPrompt from './login/LoginPrompt';

import './App.css';
import Api from "../api/Api";

class App extends React.Component<{}, { tasks: [], userIsLoggedIn: boolean, authtoken: string }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      tasks: [],
      userIsLoggedIn: false,
      authtoken: '',
    };

    this.userLoggingIn = this.userLoggingIn.bind(this);
  }

  userLoggingIn = async (username: string, password: string) => {
    const base64String = btoa(`${username}:${password}`);
    const validInformation = await (await Api.login(base64String)).text() === 'true';

    if (!validInformation) {
      await this.setState({ userIsLoggedIn: false });
      return;
    }

    const authtoken = await(await Api.getAuthToken(base64String)).text();
    await this.setState({ authtoken: authtoken });
    await this.setState({ userIsLoggedIn: true });
  };

  render() {
    const { userIsLoggedIn, authtoken } = this.state;

    return(
      <div className="App">
        { userIsLoggedIn ? <Overview authtoken={authtoken}/> : <LoginPrompt userLoggingIn={this.userLoggingIn} /> }
      </div>
    );
  }
}

export default App;
