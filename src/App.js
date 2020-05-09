import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Sidepanel from './components/layout/Sidepanel';
import Map from './components/Map';
import axios from 'axios';
import './App.css';

// import * as currentAQJson from './data/currentAQ.json';
import * as currentAQJson from './data/geoJsonTemplate.json';

class App extends Component {
  state = {
    currentAQData: [],
    past48HoursAQData: [],
    activeParameter: 'PM25AQI',
    loading: false,
    sidepanelOpen: false,
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
    this.setState({ past48HoursAQData: res.data, sidepanelOpen: true });
    console.log(this.state.sidepanelOpen);
  };

  updateJsonWithCurrentAQI(data) {
    data.forEach((record) => {
      const ind = data.indexOf(record);
      if (currentAQJson.features[ind].properties['AQSID'] === record.aqsid) {
        currentAQJson.features[ind].properties['ValidTime'] = record.validtime;
        currentAQJson.features[ind].properties[
          'ValidDate'
        ] = record.validdate.slice(0, 10);
        currentAQJson.features[ind].properties['ValidTime'] = record.validtime;
        currentAQJson.features[ind].properties['OzoneAQI'] = parseInt(
          record.ozoneaqi
        );
        currentAQJson.features[ind].properties['PM10AQI'] = parseInt(
          record.pm10aqi
        );
        currentAQJson.features[ind].properties['PM25AQI'] = parseInt(
          record.pm25aqi
        );
        currentAQJson.features[ind].properties['NO2AQI'] = parseInt(
          record.no2aqi
        );
      } else {
        console.log(
          "Didn't match:",
          ind,
          currentAQJson.features[ind].properties['AQSID'],
          record.aqsid,
          record.sitename
        );
      }
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
          sidepanelState={this.state.sidepanelOpen}
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
