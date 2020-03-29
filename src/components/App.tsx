import React from 'react';

function App() {

  const test = async () => {
    const response = await fetch('https://haushaltsplan-backend.herokuapp.com/healthcheck', {
      method: 'GET',
      mode: "no-cors",
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    console.log(response);
  };

  test();

  return (
    <div className="App">
      <p>Testing</p>
    </div>
  );
}

export default App;
