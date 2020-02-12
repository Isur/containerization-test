import React, { useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [state, setState] = React.useState("wait...");
  
  useEffect(() => {
    handleClick();
  }, [])

  function handleClick() {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api");
      setState(res.data.rows[0].integer);
    }
    getData();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}> CLICK ME </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React - {state}
        </a>
      </header>
    </div>
  );
}

export default App;
