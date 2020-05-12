import React from 'react';
import { loadModules } from 'esri-loader';

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {
    activeParameter: 'PM25AQI',
    aqsid: '',
  };

  initMap() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/support/Field',
        'esri/layers/GeoJSONLayer',
        'esri/widgets/BasemapToggle',
        'esri/widgets/Home',
        'esri/widgets/Legend',
        'esri/widgets/Expand',
        'esri/widgets/Locate',
        'esri/widgets/Search',
      ],
      { css: true }
    ).then(
      ([
        ArcGISMap,
        MapView,
        Field,
        GeoJSONLayer,
        BasemapToggle,
        Home,
        Legend,
        Expand,
        Locate,
        Search,
      ]) => {
        const jsonObj = this.props.currentAQI;

        // this.setState({ activeParameter: this.props.AQParameter }); // callback function to re-render map here
        const aqParameter = this.props.AQParameter
          ? this.props.AQParameter
          : this.state.activeParameter;
        console.log('definitionExpression');

        let definitionExpression = aqParameter + '>= 0';

        const aqRenderer = {
          type: 'class-breaks',
          field: aqParameter,
          defaultSymbol: {
            type: 'simple-marker',
            size: 9,
            color: 'grey',
            outline: {
              color: 'rgb(255,255,255)',
            },
          },
          classBreakInfos: [
            {
              minValue: null,
              maxValue: null,
              label: '',
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
                outline: {
                  color: 'rgb(14, 128, 44)',
                },
              },
            },
            {
              minValue: 51,
              maxValue: 100,
              symbol: {
                type: 'simple-marker',
                color: 'rgb(239, 245, 66)',
                outline: {
                  color: 'rgb(121, 128, 1)',
                },
              },
            },
            {
              minValue: 101,
              maxValue: 150,
              symbol: {
                type: 'simple-marker',
                color: 'rgb(255, 126, 0)',
                outline: {
                  color: 'rgb(130, 91, 0, 1)',
                },
              },
            },
            {
              minValue: 151,
              maxValue: 200,
              symbol: {
                type: 'simple-marker',
                color: 'rgb(230, 0, 0)',
                outline: {
                  color: 'rgb(130, 20, 0, 1)',
                },
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
          popupEnabled: false,
          renderer: aqRenderer,
          fields: aqFields,
          definitionExpression: definitionExpression,
          outFields: ['*'],
          title: 'Air Quality Index',
        });

        const map = new ArcGISMap({
          basemap: 'dark-gray',
          // ground: 'world-elevation',
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

        const basemapToggle = new BasemapToggle({
          view: this.view,
          nextBasemap: 'hybrid',
        });
        const homeButton = new Home({
          view: this.view,
        });

        const legend = new Legend({
          view: this.view,
          container: document.createElement('div'),
          label: 'Air Quality Index',
        });

        const legendExpand = new Expand({
          expandIconClass: 'esri-icon-expand',
          view: this.view,
          content: legend.domNode,
        });

        const locate = new Locate({
          view: this.view,
        });

        const search = new Search({
          view: this.view,
          container: document.createElement('div'),
        });

        const searchExpand = new Expand({
          expandIconClass: 'esri-icon-search',
          view: this.view,
          content: search.domNode,
        });

        this.view.ui.add(basemapToggle, {
          position: 'top-right',
        });

        this.view.ui.add(homeButton, 'top-left');
        this.view.ui.add(legendExpand, 'top-right');
        this.view.ui.add(locate, 'top-left');
        this.view.ui.add(searchExpand, 'top-left');
      }
    );
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate(prevProps) {
    if (this.props.AQParameter !== prevProps.AQParameter) {
      this.initMap();
    }
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
