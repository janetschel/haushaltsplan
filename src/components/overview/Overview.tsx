import React from 'react';
import { Typography } from '@material-ui/core'
import Api from '../../api/Api';
import Task from './Task';

class Overview extends React.Component<Props, { tasks: [], error: boolean, authtoken: string, username: string }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      tasks: [],
      error: false,
      authtoken: '',
      username: '',
    };

    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount(): void {
    this.setUsername();
    this.performInitialFetch();
  }

  setUsername = async () => {
    const { username } = this.props;
    await this.setState({ username: username });
  };

  performInitialFetch = async () => {
    await this.setAuthToken();
    await this.getTasks();
  };

  setAuthToken = async () => {
    const { authtoken } = this.props;
    await this.setState({ authtoken: authtoken });
  };

  getTasks = async () => {
    const { authtoken } = this.state;

    try {
      const tasks = await (await Api.getDocuments(authtoken)).json();
      await this.setState({ tasks: tasks });
    } catch (error) {
      console.error(error);
      await this.setState({ error: true });
    }
  };

  render() {
    const { tasks, error, authtoken, username } = this.state;

    return(
        <div className="Overview">
          <div className="headingWrapper" >
            <Typography variant="h4" className="heading">Haushaltsplaner</Typography>
            <Typography variant="caption" className="loggedInUser">Eingeloggt als {username}</Typography>
          </div>
          { !error && tasks.map((currentTask, index) =>
              <Task
                  authtoken={authtoken}
                  key={index}
                  currentTask={currentTask}
                  getTasks={this.getTasks}
                  username={username}
              />
          )}
          { error && <Typography color="secondary">Ungültiger oder fehlender Authentifizierungs-Token.</Typography>}
        </div>
    );
  }
}

type Props = {
  authtoken: string,
  username: string,
}

export default Overview;
