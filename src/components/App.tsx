import React from 'react';
import Api from "../api/Api";

function App() {
  const performHealthCheck = async () =>  {
    const response = await (await Api.healthCheck()).text();
    console.log(response);
  };

  performHealthCheck();

  return (
    <div className="App">
      <p>Check console for healthcheck</p>
    </div>
  );
}

export default App;
