import React from 'react';
import Api from "../api/Api";

function App() {

  const test = () => {
    console.log("before getDataFromMongoDB");
    Api.getDataFromMongoDb();
    console.log("after getDataFromMongoDB");
  };

  test();

  return (
    <div className="App">
      <p>Lask test to check if selfdeploy works</p>
    </div>
  );
}

export default App;
