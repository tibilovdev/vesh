import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';

const HatsPage = (props) => {
  console.log('dsfdsf', props);
  return (
    <div>
      <h1>HAtS Page</h1>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route exact path="/hats" component={HatsPage} />
    </div>
  );
}

export default App;
