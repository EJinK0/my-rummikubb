import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axioswrapper from './utils/axios';

function App() {
  const [myApiResult, setMyApiResult] = useState('');

  const apiCall = () => {
    const payload = {
        id: 'e380f6f9-b1a2-4b1f-83aa-82bd870dabd2',
        name: 'kim',
        email: 'kim@bb.bb'
      };

      console.log('react url?', process.env.REACT_APP_API_URL);
    axioswrapper('POST', `${process.env.REACT_APP_API_URL}/users`, payload)
    .then((response) => {
        console.log('call success', response);
        setMyApiResult(JSON.stringify(response));
    })
    .catch((error) => {
        console.log('call fail', error);
    });
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          heyyyyyyyyyyyyyy2222<br/>
          this is dev server
        </p>
        <button onClick={apiCall}>api 호출하기</button>
        {myApiResult}
      </header>
    </div>
  );
}

export default App;
