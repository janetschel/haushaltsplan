import React from 'react';
import Api from "../api/Api";

function App() {

  const test = async () => {
    const response = await Api.getDocuments();
    console.log(response);
  };

  test();

  return (
    <div className="App">
      <p>Lask test to check if selfdeploy works</p>
    </div>
  );
}

export default App;
