import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Sidepanel from './components/layout/Sidepanel';
import Map from './components/Map';
import axios from 'axios';
import './App.css';

import * as currentAQJson from './data/currentAQ.json';

class App extends Component {
  state = {
    currentAQData: [],
    past48HoursAQData: [],
    activeParameter: 'PM25AQI',
    loading: false,
  };

  componentDidMount() {
    this.getAQData();
  }

  getAQData = async () => {
    const res = await axios.get('http://localhost:3001/current');
    this.updateJsonWithCurrentAQI(res.data);
  };

  getMonitorAQData = async (aqsid) => {
    const res = await axios.get(`http://localhost:3001/monitor?id=${aqsid}`);
    this.setState({ past48HoursAQData: res.data });
    console.log(this.state.past48HoursAQData);
  };

  updateJsonWithCurrentAQI(data) {
    data.forEach((record) => {
      const ind = data.indexOf(record);
      currentAQJson.default[ind].attributes[
        'ValidDate'
      ] = record.validdate.slice(0, 10);
      currentAQJson.default[ind].attributes['ValidTime'] = record.validtime;
      currentAQJson.default[ind].attributes['OzoneAQI'] = parseInt(
        record.ozoneaqi
      );
      currentAQJson.default[ind].attributes['PM10AQI'] = parseInt(
        record.pm10aqi
      );
      currentAQJson.default[ind].attributes['PM25AQI'] = parseInt(
        record.pm25aqi
      );
      currentAQJson.default[ind].attributes['NO2AQI'] = parseInt(record.no2aqi);
    });

    this.setState({ currentAQData: currentAQJson.default });
  }

  changeParameter = (param) => {
    console.log('The parameter has been changed to', param);
    this.setState({ activeParameter: param });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Sidepanel
          changeParameter={this.changeParameter}
          last48HoursData={this.state.past48HoursAQData}
        />
        <Map
          getLast48Hours={this.getMonitorAQData}
          currentAQI={this.state.currentAQData}
          AQParameter={this.state.activeParameter}
        />
      </div>
    );
  }
}

export default App;
