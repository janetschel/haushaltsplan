import React from 'react';
import { Typography } from '@material-ui/core'
import Api from '../../api/Api';
import Task from './Task';

class Overview extends React.Component<{}, { tasks: [] }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      tasks: [],
    }
  }

  componentDidMount(): void {
    this.getTasks();
  }

  getTasks = async () => {
    const tasks = await (await Api.getDocuments()).json();
    await this.setState({ tasks: tasks });
    console.log(tasks);
  };

  render() {
    const { tasks } = this.state;

    return(
        <div className="Overview">
          <Typography variant="h4" className="heading">Haushaltsplaner</Typography>
          { tasks.map((currentTask, index) => <Task key={index} currentTask={currentTask} />) }
        </div>
    );
  }
}

export default Overview;
