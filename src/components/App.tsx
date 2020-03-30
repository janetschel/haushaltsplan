import React from 'react';
import Api from "../api/Api";
import './App.css'
import {Typography} from "@material-ui/core";

class App extends React.Component<{}, {}> {
  componentDidMount(): void {
    this.performHealthCheck();
  }

  performHealthCheck = async () => {
    const response = await (await Api.healthCheck()).text();
    console.log(response);
  };

  render() {
    return(
      <div className="App">
        <Typography>Check console for health check</Typography>
        <Typography>Site under developement.. Please stay tuned</Typography>
      </div>
    );
  }
}

export default App;
