import React from 'react';
import Api from "../api/Api";

function App() {
  const performHealthCheck = async () =>  {
    const response = await Api.healthCheck();
    console.log(response);
    console.log(await response.text());
    console.log(Api.healthCheck());
  };

  performHealthCheck();

  return (
    <div className="App">
      <p>Check console for healthcheck</p>
    </div>
  );
}

export default App;
