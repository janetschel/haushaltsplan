import React from 'react';
import Overview from "./overview/Overview";

class App extends React.Component<{}, { tasks: [] }> {
  render() {
    return(
      <div className="App">
        <Overview />
      </div>
    );
  }
}

export default App;
