import React from 'react';
import { Typography } from '@material-ui/core'
import Api from '../../api/Api';
import Task from './Task';

class Overview extends React.Component<Props, { tasks: [], error: boolean, authtoken: string}> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      tasks: [],
      error: false,
      authtoken: '',
    }
  }

  componentDidMount(): void {
    this.performInitialFetch();
  }

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
    const { tasks, error, authtoken } = this.state;

    return(
        <div className="Overview">
          <Typography variant="h4" className="heading">Haushaltsplaner</Typography>
          { !error && tasks.map((currentTask, index) =>
              <Task authtoken={authtoken} key={index} currentTask={currentTask} />
          )}
          { error && <Typography color="secondary">Ungültiger oder fehlender Authentifizierungs-Token.</Typography>}
        </div>
    );
  }
}

type Props = {
  authtoken: string,
}

export default Overview;
