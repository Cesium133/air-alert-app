import React from 'react';
import PropTypes from 'prop-types';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {};

  //   static propTypes = {
  //     getAQData: PropTypes.func.isRequired,
  //   };

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/GraphicsLayer',
        'esri/Graphic',
        'esri/layers/GeoJSONLayer',
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, GraphicsLayer, Graphic, GeoJSONLayer]) => {
      //   const point = {
      //     type: 'point', // autocasts as new Point()
      //     longitude: -78,
      //     latitude: 40,
      //   };
      //   const markerSymbol = {
      //     type: 'simple-marker',
      //     color: [0, 119, 40],
      //     outline: {
      //       color: [255, 255, 255],
      //       width: 2,
      //     },
      //   };

      //   const aqiGraphic = new Graphic({
      //     geometry: point,
      //     symbol: markerSymbol,
      //   });

      //   const layer = new GraphicsLayer({
      //     graphics: [aqiGraphic],
      //   });

      //   map.add(layer);

      const renderer = {
        type: 'simple',
        field: 'PM25',
        symbol: {
          type: 'simple-marker',
          color: 'red',
          outline: {
            color: 'white',
          },
        },
        visualVariables: [
          {
            type: 'color',
            field: 'PM25',
            stops: [
              { value: 30, color: 'yellow' },
              { value: 90, color: 'orange' },
            ],
          },
        ],
      };

      const template = {
        title: 'Air Quality Info:',
        content: '{SiteName} is {Status}',
      };

      const aqDataUrl =
        'https://raw.githubusercontent.com/Cesium133/air-alert-app/master/public/data/sample_aq.json';

      const geojsonLayer = new GeoJSONLayer({
        url: aqDataUrl,
        renderer: renderer,
        popupTemplate: template,
      });

      const map = new ArcGISMap({
        basemap: 'topo-vector',
        layers: [geojsonLayer],
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-78, 38],
        zoom: 7,
      });
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return <div className="webmap" ref={this.mapRef} />;
  }
}

export default Map;
