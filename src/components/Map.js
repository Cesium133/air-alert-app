import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {
    activeParameter: 'PM2.5',
    aqsid: '330099991',
  };

  componentDidMount() {
    loadModules(
      ['esri/Map', 'esri/views/MapView', 'esri/layers/GeoJSONLayer'],
      { css: true }
    ).then(([ArcGISMap, MapView, GeoJSONLayer]) => {
      const jsonObj = this.props.currentAQI;

      this.setState({ activeParameter: this.props.AQParameter }); // callback function to re-render map here
      const aqParameter = this.props.AQParameter;
      console.log("'" + aqParameter + " > -9999'");

      const pointRenderer = {
        type: 'class-breaks',
        field: this.state.activeParameter,
        defaultSymbol: {
          type: 'simple-marker',
          size: 9,
          color: 'red',
          outline: {
            color: 'rgb(255,255,255)',
          },
        },
        classBreakInfos: [
          {
            minValue: -9999,
            maxValue: -1,
            symbol: {
              type: 'simple-marker',
              color: [255, 255, 255, 0],
              outline: {
                color: [255, 255, 255, 0],
              },
            },
          },
          {
            minValue: 0,
            maxValue: 50,
            symbol: {
              type: 'simple-marker',
              color: 'rgb(0, 228, 0)',
            },
          },
          {
            minValue: 51,
            maxValue: 100,
            symbol: {
              type: 'simple-marker',
              color: 'rgb(239, 245, 66)',
            },
          },
          {
            minValue: 101,
            maxValue: 150,
            symbol: {
              type: 'simple-marker',
              color: 'rgb(255, 126, 0)',
            },
          },
          {
            minValue: 151,
            maxValue: 200,
            symbol: {
              type: 'simple-marker',
              color: 'rgb(230, 0, 0)',
            },
          },
          {
            minValue: 201,
            maxValue: 300,
            symbol: {
              type: 'simple-marker',
              color: 'rgb(128,0,128)',
            },
          },
          {
            minValue: 301,
            maxValue: 600,
            symbol: {
              type: 'simple-marker',
              color: 'rgb(128, 0, 0)',
            },
          },
        ],
      };

      const graphicTemplate = {
        title: 'Air Quality Info:',
        content:
          'Last Updated: {ValidDate} {ValidTime} <br> AQSID: <strong>{AQSID}</strong> <br> Sitename:<strong>{SiteName}</strong> <br> PM2.5: <strong>{PM25AQI}</strong> <br> PM10: <strong>{PM10AQI}</strong> <br> Ozone: <strong>{OzoneAQI}</strong> <br> NO2: <strong>{NO2AQI}</strong>',
      };

      const blob = new Blob([JSON.stringify(jsonObj)], {
        type: 'application/json',
      });
      const aqURL = URL.createObjectURL(blob);

      const geoJsonLayer = new GeoJSONLayer({
        url: aqURL,
        popupTemplate: graphicTemplate,
        renderer: pointRenderer,
      });

      const map = new ArcGISMap({
        basemap: 'dark-gray',
        layers: [geoJsonLayer],
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-98, 38],
        zoom: 5,
      });

      this.view.on('click', (event) => {
        this.view.hitTest(event).then((response) => {
          console.log(response.results.length);
          console.log(response.results[0].graphic.attributes);
          // this.props.getLast48Hours(this.state.aqsid);
        });
      });
    });
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }

  render() {
    return <div className="webmap" ref={this.mapRef} />;
  }
}

export default Map;
