import React from 'react';
import Api from "../api/Api";

function App() {

  const test = async () => {
    const response = await Api.healthCheck();
    console.log(response)
  };

  test();

  return (
    <div className="App">
      <p>Testing</p>
    </div>
  );
}

export default App;
