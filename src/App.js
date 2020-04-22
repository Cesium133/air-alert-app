import React from 'react';
import Navbar from './components/layout/Navbar';
import Sidepanel from './components/layout/Sidepanel';
import Map from './components/Map';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidepanel />
      <Map />
    </div>
  );
}

export default App;
