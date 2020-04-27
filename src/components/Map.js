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
        'esri/geometry/Point',
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, GraphicsLayer, Graphic, Point]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-88, 40],
        zoom: 5,
      });

      const pointGraphic = new Graphic({
        // geometry: point,
        symbol: markerSymbol,
      });

      this.props.aqi.forEach((element) => {
        const point = new Point({
          longitude: element.lng,
          latitude: element.lat,
        });
        pointGraphic.geometry = point;
      });

      //   const point = new Point({
      //     x: -76, //this.props.aqi.lng,
      //     y: 38, //this.props.aqi.lat,
      //   });

      var markerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      };

      this.view.graphics.add(pointGraphic);

      console.log(this.props.aqi);
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
