import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {
    activeParameter: 'PM25AQI',
    aqsid: '330099991',
  };

  componentDidMount() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/support/Field',
        'esri/layers/GeoJSONLayer',
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, Field, GeoJSONLayer]) => {
      const jsonObj = this.props.currentAQI;

      // this.setState({ activeParameter: this.props.AQParameter }); // callback function to re-render map here
      const aqParameter = this.props.AQParameter;
      console.log("'" + aqParameter + " > -9999'");

      const aqRenderer = {
        type: 'class-breaks',
        field: 'PM25AQI', //this.state.activeParameter,
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

      const aqFields = [
        new Field({
          name: 'AQSID',
          type: 'string',
        }),
        new Field({
          name: 'SiteName',
          type: 'string',
        }),
        new Field({
          name: 'Status',
          type: 'string',
        }),
        new Field({
          name: 'State',
          type: 'string',
        }),
        new Field({
          name: 'ValidDate',
          type: 'string',
        }),
        new Field({
          name: 'ValidTime',
          type: 'string',
        }),
        new Field({
          name: 'OzoneAQI',
          type: 'double',
        }),
        new Field({
          name: 'PM10AQI',
          type: 'double',
        }),
        new Field({
          name: 'PM25AQI',
          type: 'double',
        }),
        new Field({
          name: 'NO2AQI',
          type: 'double',
        }),
      ];

      const aqTemplate = {
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
        popupTemplate: aqTemplate,
        renderer: aqRenderer,
        fields: aqFields,
        definitionExpression: 'PM25AQI > -9999',
        outFields: ['*'],
        // objectIdField: 'AQSID',
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
          if (response.results.length) {
            console.log(response.results[0].graphic.attributes.AQSID);
            this.setState({
              aqsid: response.results[0].graphic.attributes.AQSID,
            });
            this.props.getLast48Hours(this.state.aqsid);
            // console.log(this.state.aqsid);
          }
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
