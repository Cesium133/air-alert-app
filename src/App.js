import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Sidepanel from './components/layout/Sidepanel';
import Map from './components/Map';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    airQualityMonitorData: [],
    loading: false,
  };

  componentDidMount() {
    this.getAQData();
  }

  getAQData = async () => {
    // const res = await axios.get('https://api.github.com/users');
    const res = await axios.get('data/sample_aq.json');
    this.setState({ airQualityMonitorData: res.data });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Sidepanel />
        <Map aqi={this.state.airQualityMonitorData} />
      </div>
    );
  }
}

export default App;
