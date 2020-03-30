import React from 'react';
import Api from "../api/Api";
import './App.css'
import {Typography} from "@material-ui/core";

class App extends React.Component<{}, { message: string }> {
  constructor({props}: { props: any }) {
    super(props);

    this.state = {
      message: '',
    }
  }

  performHealthCheck = async () => {
    const response = await (await Api.healthCheck()).text();
    this.setState({ message: response });
  };

  render() {
    const { message } = this.state;
    this.performHealthCheck();

    return(
      <div className="App">
        <Typography>Health check: {message}</Typography>
        <Typography>Site under developement.. Please stay tuned</Typography>
      </div>
    );
  }
}

export default App;
