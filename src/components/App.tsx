import React from 'react';
import Api from "../api/Api";

function App() {

  const test = async () => {
    const response = await Api.healthCheck();
    console.log(response);
    console.log(response.text());

    const res = await Api.healthCheck().then(result => result);
    console.log(res);
    console.log(res.text());
  };

  test();

  return (
    <div className="App">
      <p>Testing</p>
    </div>
  );
}

export default App;
