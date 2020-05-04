import React from 'react';
import PropTypes from 'prop-types';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {
    aqsid: '330099991',
  };

  //   static propTypes = {
  //     getAQData: PropTypes.func.isRequired,
  //   };

  componentDidMount() {
    loadModules(
      ['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'],
      { css: true }
    ).then(([ArcGISMap, MapView, FeatureLayer]) => {
      const jsonObj = this.props.currentAQI;
      jsonObj.forEach((obj) => {
        obj.attributes.OzoneAQI = parseInt(obj.attributes.OzoneAQI);
        obj.attributes.PM10AQI = parseInt(obj.attributes.PM10AQI);
        obj.attributes.PM25AQI = parseInt(obj.attributes.PM25AQI);
        obj.attributes.NO2AQI = parseInt(obj.attributes.NO2AQI);
      });

      const pointRenderer = {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          size: 6,
          color: 'red',
          outline: {
            color: 'rgb(255,255,255)',
          },
        },
        visualVariables: [
          {
            type: 'color',
            field: 'PM25AQI',
            stops: [
              { value: -9999, color: [255, 255, 255, 0.2] },
              { value: 50, color: 'rgb(0, 228, 0)' },
              { value: 100, color: 'rgb(239, 245, 66)' },
              { value: 150, color: 'rgb(255, 126, 0)' },
              { value: 200, color: 'rgb(230, 0, 0)' },
              { value: 300, color: 'rgb(128,0,128)' },
            ],
          },
        ],
      };

      const graphicTemplate = {
        title: 'Air Quality Info:',
        content:
          'Last Updated: {ValidDate} {ValidTime} <br> AQSID: <strong>{AQSID}</strong> <br> Sitename:<strong>{SiteName}</strong> <br> PM2.5: <strong>{PM25AQI}</strong> <br> PM10: <strong>{PM10AQI}</strong> <br> Ozone: <strong>{OzoneAQI}</strong> <br> NO2: <strong>{NO2AQI}</strong>',
      };

      const aqLayer = new FeatureLayer({
        source: jsonObj,
        objectIdField: 'AQSID',
        fields: [
          { name: 'AQSID', type: 'oid' },
          { name: 'SiteName', type: 'string' },
          { name: 'Status', type: 'string' },
          { name: 'State', type: 'string' },
          { name: 'ValidDate', type: 'string' },
          { name: 'ValidTime', type: 'string' },
          { name: 'OzoneAQI', type: 'double' },
          { name: 'PM10AQI', type: 'double' },
          { name: 'PM25AQI', type: 'double' },
          { name: 'NO2AQI', type: 'double' },
        ],
        popupTemplate: graphicTemplate,
        renderer: pointRenderer,
        definitionExpression: 'PM25AQI > -9999',
      });

      const map = new ArcGISMap({
        basemap: 'dark-gray',
        layers: [aqLayer],
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-98, 38],
        zoom: 5,
        // popup: {
        //   dockEnabled: true,
        //   dockOptions: {
        //     position: 'top-right',
        //     breakpoint: false,
        //   },
        // },
      });

      this.view.on('click', (event) => {
        this.view.hitTest(event).then((response) => {
          console.log(response);
        });

        // this.props.last48Hours(this.state.aqsid);
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
