import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {
    aqsid: '330099991',
  };

  componentDidMount() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, FeatureLayer, Graphic, GraphicsLayer]) => {
      const jsonObj = this.props.currentAQI;

      const pointRenderer = {
        type: 'class-breaks',
        field: 'OzoneAQI',
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
              color: [255, 255, 255, 0.2],
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

      const aqLayer = new FeatureLayer({
        source: jsonObj,
        objectIdField: 'AQSID',
        outFields: ['*'],
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
        definitionExpression: 'OzoneAQI > -9999',
        geometryType: 'point',
      });

      const graphicsLayer = new GraphicsLayer();

      //   jsonObj.forEach((obj) => {
      //     const graphic = new Graphic({
      //       geometry: obj.geometry,
      //       symbol: {
      //         type: 'simple-marker',
      //         color: [255, 255, 255, 0],
      //         size: 9,
      //       },
      //       attributes: {

      //       },
      //       outline: {
      //         color: 'rgb(255,25,43)',
      //       },
      //       popupTemplate: graphicTemplate,
      //     });
      //     graphicsLayer.add(graphic);
      //   });

      const map = new ArcGISMap({
        basemap: 'dark-gray',
        layers: [aqLayer],
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
          // this.props.last48Hours(this.state.aqsid);
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
