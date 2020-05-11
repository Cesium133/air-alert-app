import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Sidepanel from './components/layout/Sidepanel';
import Map from './components/Map';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import About from './components/About';

// import * as currentAQJson from './data/currentAQ.json';
import * as currentAQJson from './data/geoJsonTemplate.json';

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
    const res = await axios.get(
      'https://app.kevincheriyan.com/node/server/api/current'
    );
    // const res = await axios.get('http://localhost/node/server/api/current')
    this.updateJsonWithCurrentAQI(res.data);
  };

  getMonitorAQData = async (aqsid) => {

    const res = await axios.get(
      `https://app.kevincheriyan.com/node/server/api/monitor?id=${aqsid}`
    );
    // const res = await axios.get(`http://localhost/node/server/api/monitor?id=${aqsid}`);
    this.setState({ past48HoursAQData: res.data });
  };

  updateJsonWithCurrentAQI(data) {
    data.forEach((record) => {
      const ind = data.indexOf(record);
      if (currentAQJson.features[ind].properties['AQSID'] === record.aqsid) {
        currentAQJson.default.features[ind].properties['ValidTime'] =
          record.validtime;
        currentAQJson.default.features[ind].properties[
          'ValidDate'
        ] = record.validdate.slice(0, 10);
        currentAQJson.default.features[ind].properties['ValidTime'] =
          record.validtime;

        currentAQJson.default.features[ind].properties['OzoneAQI'] = parseInt(
          record.ozoneaqi
        );
        currentAQJson.default.features[ind].properties['PM10AQI'] = parseInt(
          record.pm10aqi
        );
        currentAQJson.default.features[ind].properties['PM25AQI'] = parseInt(
          record.pm25aqi
        );
        currentAQJson.default.features[ind].properties['NO2AQI'] = parseInt(
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
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route exact path="/">
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
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
