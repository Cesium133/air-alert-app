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
} from 'recharts';
import { CalciteP } from 'calcite-react/Elements/Elements-styled';
import TextTooltip from 'calcite-react/Tooltip';
import AirQualityColorTable from '../../assets/images/airquality_index_color.png';

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onAccordionChange = this.onAccordionChange.bind(this);
  }
  state = {
    activeSectionIndexes: [],
    parameter: 'PM25AQI',
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

  componentDidUpdate() {
    // console.log(this.props.last48HoursData[0]);
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
            <CalciteP>
              To understand what the marker colors mean, see the below chart.
            </CalciteP>
            <img src={AirQualityColorTable} alt="" />
          </AccordionContent>
        </AccordionSection>
        <AccordionSection>
          <AccordionTitle>Air Quality Index Parameter</AccordionTitle>
          <AccordionContent>
            <div>
              <CalciteP>Select a parameter to render</CalciteP>
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
              <TextTooltip title="PM10 text here.">{'PM10'}</TextTooltip>
              <br />
              <input
                type="radio"
                name="parameter"
                value="OzoneAQI"
                id=""
                onChange={this.changeAQParameter}
              />
              <TextTooltip title="Ozone text here.">{'Ozone'}</TextTooltip>
              <br />
              <input
                type="radio"
                name="parameter"
                value="NO2AQI"
                id=""
                onChange={this.changeAQParameter}
              />
              <TextTooltip title="NO2 text here">{'NO2'}</TextTooltip>
              <CalciteP style={{ margin: '10px' }}>
                Hover over the parameter text to learn more.
              </CalciteP>
            </div>

            {/* <Card style={{ maxWidth: '320px', margin: '20px' }}>
              <CardImage
                src="https://images.photowall.com/products/42521/cloudy-blue-sky-horizon.jpg?h=699&q=85"
                caption="Florida, January 1954"
                alt="Bridge Club, 1954"
              />
              <CardContent>
                <CardTitle>Card with Image</CardTitle>
                <p>Cards can have full-bleed images with optional captions.</p>
                <Button>View Examples</Button>
              </CardContent>
            </Card> */}
          </AccordionContent>
        </AccordionSection>
        <AccordionSection>
          <AccordionTitle>Site Data</AccordionTitle>
          <AccordionContent>
            <div>
              <CalciteP>Site Name:</CalciteP>
              <CalciteP>State:</CalciteP>
              <CalciteP>Last Updated:</CalciteP>
              <LineChart
                width={350}
                height={200}
                data={this.props.last48HoursData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="pm25aqi" stroke="#8884d8" />
                <XAxis dataKey="ValidTime" />
                <YAxis dataKey="pm25aqi" />
                {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 15" /> */}
                <Tooltip />
              </LineChart>
            </div>
          </AccordionContent>
        </AccordionSection>
      </Accordion>
    );
  }
}

export default AccordionComponent;
