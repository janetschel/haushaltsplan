import React from 'react';
import Api from "../api/Api";

function App() {
  const performHealthCheck = async () =>  {
    const response = await Api.getDocuments();
    const json = await response.json();
    console.log(json);
  };

  performHealthCheck();

  return (
    <div className="App">
      <p>Check console for healthcheck</p>
    </div>
  );
}

export default App;
