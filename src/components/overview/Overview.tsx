import React from 'react';
import Api from "../../api/Api";

class Overview extends React.Component<{}, {}> {
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
    console.log(tasks);
    this.setState({ tasks: tasks });
  };

  render() {
    return(
        <div className="overview">
          Overview
        </div>
    );
  }
}

export default Overview;
