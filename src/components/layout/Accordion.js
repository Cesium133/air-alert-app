import React from 'react';
import Accordion, {
  AccordionSection,
  AccordionTitle,
  AccordionContent,
} from 'calcite-react/Accordion';
import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';
import Button from 'calcite-react/Button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CalciteP, CalciteH1 } from 'calcite-react/Elements';
import TextTooltip from 'calcite-react/Tooltip';
import AirQualityColorTable from '../../assets/images/airquality_index_color.png';

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onAccordionChange = this.onAccordionChange.bind(this);
  }
  state = {
    activeSectionIndexes: [2],
    parameter: 'PM25AQI',
    sitename: '',
    stateus: '',
    aqsid: '',
  };

  onAccordionChange(evt, index) {
    this.state.activeSectionIndexes.includes(index)
      ? this.setState({
          activeSectionIndexes: this.state.activeSectionIndexes.filter(
            (item) => index !== item
          ),
        })
      : this.setState({
          activeSectionIndexes: [...this.state.activeSectionIndexes, index],
        });
  }

  changeAQParameter = (event) => {
    this.setState({ parameter: event.target.value }, () => {
      this.props.changeParameter(this.state.parameter);
    });
  };

  renderCardTitle() {
    let title;
    console.log(this.state.parameter);
    if (this.state.parameter === 'PM25AQI') {
      title = 'EPA PM2.5';
    } else if (this.state.parameter === 'PM10AQI') {
      title = 'EPA PM10';
    } else if (this.state.parameter === 'Ozone') {
      title = 'EPA Ozone';
    } else {
      title = 'EPA NO2';
    }
    return title;
  }

  renderCardColor() {
    let color = 'white';
    if (this.props.last48HoursData.length) {
      const aqi = parseInt(
        this.props.last48HoursData[this.props.last48HoursData.length - 1][
          this.state.parameter.toLowerCase()
        ]
      );
      if (aqi >= 0) {
        if (aqi < 51) {
          color = 'rgb(0, 228, 0)';
        } else if (aqi < 101) {
          color = 'rgb(239, 245, 66)';
        } else if (aqi < 151) {
          color = 'rgb(255, 126, 0)';
        } else if (aqi < 201) {
          color = 'rgb(230, 0, 0)';
        } else if (aqi < 301) {
          color = 'rgb(128,0,128)';
        } else if (aqi < 600) {
          color = 'rgb(128, 0, 0)';
        } else {
          color = 'rgb(255,255,255)';
        }
      }
    }
    return color;
  }

  renderTooltip(payload) {
    // console.log(payload[0]);
    return 'HJIJIO';
  }

  componentDidMount() {
    // console.log(
    //   this.props.last48HoursData.length ? this.state.parameter.toLowerCase() : 0
    // );
  }

  render() {
    return (
      <Accordion
        onAccordionChange={this.onAccordionChange}
        activeSectionIndexes={this.state.activeSectionIndexes}
      >
        <AccordionSection>
          <AccordionTitle>Air Quality Index</AccordionTitle>
          <AccordionContent>
            <CalciteP style={{ textAlign: 'justify' }}>
              To understand what the marker colors represent, see the below
              chart, or visit the{' '}
              <a href="https://www.airnow.gov/aqi/aqi-basics/">AirNow</a>{' '}
              website.
            </CalciteP>
            <img src={AirQualityColorTable} alt="" />
          </AccordionContent>
        </AccordionSection>
        <AccordionSection>
          <AccordionTitle>Air Quality Index Parameter</AccordionTitle>
          <AccordionContent>
            <div>
              <CalciteP style={{ textAlign: 'center' }}>
                Select a parameter to render
              </CalciteP>
              <input
                type="radio"
                name="parameter"
                value="PM25AQI"
                id=""
                defaultChecked={true}
                onChange={this.changeAQParameter}
              />
              <TextTooltip
                title="PM2.5 is particulate matter that is generally less than 2.5 micrometers. These extremely small 
                particles can cause harm to our bodies by penetrating our lungs and entering our bloodstream."
                placement="right"
              >
                {'PM2.5'}
              </TextTooltip>

              <br />
              <input
                type="radio"
                name="parameter"
                value="PM10AQI"
                id=""
                onChange={this.changeAQParameter}
              />
              <TextTooltip
                title="PM10 is particulate matter that is between 2.5 and 10 micrometers in diameter. PM10 particles are
                inhalable and are produced by motor vehicles and industrial operations."
                placement="right"
              >
                {'PM10'}
              </TextTooltip>
              <br />
              <input
                type="radio"
                name="parameter"
                value="OzoneAQI"
                id=""
                onChange={this.changeAQParameter}
              />
              <TextTooltip
                title="Ground-level ozone is created by chemical reactions between oxides of nitrogen and volatile organic
                compounds when sunlight and heat is present. Expect to find higher values during summertime."
                placement="right"
              >
                {'Ozone'}
              </TextTooltip>
              <br />
              <input
                type="radio"
                name="parameter"
                value="NO2AQI"
                id=""
                onChange={this.changeAQParameter}
              />
              <TextTooltip
                title="Nitrogen Dioxide is released by motor vehicles and burning of fossil fuels and is extremely harmful
                to the environment and human health since it can contribute to severe cases of respiratory illnesses. "
                placement="right"
              >
                {'NO2'}
              </TextTooltip>
              <CalciteP style={{ margin: '10px', textAlign: 'center' }}>
                Hover over the parameter text above to learn more.
              </CalciteP>
            </div>

            {/* <Card style={{ maxWidth: '320px', margin: '10px' }}>
              <CardImage
                src="https://images.photowall.com/products/42521/cloudy-blue-sky-horizon.jpg?h=699&q=85"
                caption="Florida, January 1954"
                alt="Bridge Club, 1954"
              />
              <CardContent>
                <CardTitle>Sources of Air Pollution</CardTitle>
                <p>
                  Air Pollution can originate from natural and man-made sources,
                  although human origins contribute much more.
                </p>
                <Button>Learn More</Button>
              </CardContent>
            </Card> */}
          </AccordionContent>
        </AccordionSection>
        <AccordionSection>
          <AccordionTitle>Site Data</AccordionTitle>
          <AccordionContent>
            <div
              style={{
                background: this.renderCardColor(),
                textAlign: 'center',
              }}
            >
              <CalciteP>
                {this.props.last48HoursData.length
                  ? this.renderCardTitle()
                  : null}
              </CalciteP>
              <CalciteH1 style={{ fontWeight: 'bold' }}>
                {this.props.last48HoursData.length
                  ? this.props.last48HoursData[
                      this.props.last48HoursData.length - 1
                    ][this.state.parameter.toLowerCase()]
                  : ''}
              </CalciteH1>
              <CalciteP>
                {this.props.last48HoursData.length
                  ? this.props.last48HoursData[0].sitename
                  : ''}
              </CalciteP>
              <CalciteP>
                {this.props.last48HoursData.length
                  ? 'State: ' + this.props.last48HoursData[0].stateus
                  : ''}
              </CalciteP>
              <CalciteP style={{ fontSize: '0.8em' }}>
                {this.props.last48HoursData.length
                  ? 'Last updated: ' +
                    this.props.last48HoursData[
                      this.props.last48HoursData.length - 1
                    ].validdate.slice(0, 10) +
                    ' ' +
                    this.props.last48HoursData[0].validtime.slice(0, 5)
                  : ''}
              </CalciteP>
              <div
                style={{
                  width: '85%',
                  height: 200,
                  // background: 'pink',
                  margin: '5px',
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    width={250}
                    height={100}
                    data={this.props.last48HoursData}
                    margin={{ top: 10, right: 30, bottom: 10, left: 10 }}
                  >
                    <Line
                      type="monotone"
                      dataKey={this.state.parameter.toLowerCase()}
                      stroke="#8884d8"
                      dot={false}
                    />
                    <XAxis dataKey="ValidTime" name="Time" />
                    <YAxis
                      dataKey={
                        this.props.last48HoursData.length
                          ? this.state.parameter.toLowerCase()
                          : null
                      }
                      type="number"
                      domain={[0, 'dataMax']}
                    />
                    {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 15" /> */}
                    <Tooltip content={this.renderTooltip} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </AccordionContent>
        </AccordionSection>
      </Accordion>
    );
  }
}

export default AccordionComponent;
