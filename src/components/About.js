import React from 'react';
import Accordion, {
  AccordionSection,
  AccordionTitle,
  AccordionContent,
} from 'calcite-react/Accordion';
import {
  CalciteP,
  CalciteH2,
  CalciteOl,
  CalciteLi,
  CalciteUl,
  CalciteA,
} from 'calcite-react/Elements';
import { NavLink } from 'react-router-dom';
import NavBar from './layout/Navbar';
import ArchitectureDiagram from '../assets/images/architecture.jpg';
import AirQualityColorTable from '../assets/images/airquality_index_color.png';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSectionIndexes: [],
    };
    this.onAccordionChange = this.onAccordionChange.bind(this);
  }

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

  render() {
    return (
      <div>
        <NavBar />
        <Accordion
          style={{ width: '88%', margin: '50px' }}
          onAccordionChange={this.onAccordionChange}
          activeSectionIndexes={this.state.activeSectionIndexes}
        >
          <AccordionSection>
            <AccordionTitle>What do the colors on the map mean?</AccordionTitle>
            <AccordionContent>
              <CalciteP
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                The colors on the map indicate air quality according to EPA
                standards. The higher the AQI index, the greater the air
                pollution and therefore, risk to health is. For each pollutant
                parameter, a level of 100 or below is generally considered safe.
                For more info, see the official EPA standards{' '}
                <a href="https://cfpub.epa.gov/airnow/index.cfm?action=aqibasics.aqi">
                  here
                </a>
                .
              </CalciteP>
              <img
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
                width={'80%'}
                src={AirQualityColorTable}
                alt=""
              />
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle>
              What are the different parameters Air Alert keeps track of, and
              what do they mean?
            </AccordionTitle>
            <AccordionContent>
              <CalciteP
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                Air Alert keeps track of the following parameters. The same AQI
                scale shown above can be used to interpret each parameter's
                individual AQI measurement.
              </CalciteP>
              <CalciteOl
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                <CalciteLi>
                  <strong>PM2.5:</strong> Particulate matter that is generally
                  less than 2.5 micrometers. These extremely small particles can
                  cause harm to our bodies by penetrating our lungs and entering
                  our bloodstream.
                </CalciteLi>
                <CalciteLi>
                  <strong>PM10:</strong> Particulate matter that is between 2.5
                  and 10 micrometers in diameter. PM10 particles are inhalable
                  and are produced by motor vehicles and industrial operations.
                </CalciteLi>
                <CalciteLi>
                  <strong>Ground-level Ozone:</strong> Created by chemical
                  reactions between oxides of nitrogen and volatile organic
                  compounds when sunlight and heat is present. Expect to find
                  higher values during summertime.
                </CalciteLi>
                <CalciteLi>
                  <strong>Nitrogen Dioxide (NO2):</strong> Released by motor
                  vehicles and burning of fossil fuels and is extremely harmful
                  to the environment and human health since it can contribute to
                  severe cases of respiratory illnesses.
                </CalciteLi>
              </CalciteOl>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle>How was Air Alert made?</AccordionTitle>
            <AccordionContent>
              <div
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                <CalciteP>
                  Air Alert uses air quality data from the{' '}
                  <CalciteA href="https://files.airnowtech.org/">
                    AirNow
                  </CalciteA>{' '}
                  website. Data for the last 48 hours is used to populate the
                  webmap and sidepanel. <br />
                </CalciteP>
                <CalciteP>
                  Python is used for data pre-processing, cleanup and database
                  needs. Here's how:
                </CalciteP>
                <CalciteOl>
                  <CalciteLi>
                    Make request to the AirNow API to read .dat files for last
                    48 hours
                  </CalciteLi>
                  <CalciteLi>
                    Write rows to csv (skip non-US rows and unnecessary columns)
                  </CalciteLi>
                  <CalciteLi>
                    Fill in blank AQI values with "-9999" (to avoid datatype
                    conflicts with Postgres)
                  </CalciteLi>
                  <CalciteLi>
                    Other data cleanup (remove quotes and special characters)
                  </CalciteLi>
                  <CalciteLi>
                    Connect to local Postgres db and insert rows from each csv
                  </CalciteLi>
                  <CalciteLi>
                    Garbage collection (delete local files after database write,
                    delete records from db that are older than 2 days)
                  </CalciteLi>
                </CalciteOl>
                <CalciteP>
                  This Python script runs every hour from AWS EC2 instance on
                  Task Scheduler and inserts rows to a local Postgres db.
                </CalciteP>
                <CalciteP>
                  When the user loads Air Alert's webmap, a Node.js script
                  running Express server makes a request to the Postgres
                  database for all the records from the last hour. This data is
                  shown on the webmap as point markers.
                </CalciteP>
                <CalciteP>
                  When the user clicks on a marker, the same Node script sends
                  the ID of the marker in an SQL query to the database and
                  returns all records for the past 48 hours for that monitor.
                  This data is then shown on the sidepanel of the app.
                </CalciteP>
                <img
                  style={{
                    width: '50%',
                    textAlign: 'left',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                  }}
                  src={ArchitectureDiagram}
                  alt=""
                />
              </div>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle>Where's the code?</AccordionTitle>
            <AccordionContent>
              <CalciteP
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                All the code used for Air Alert can be found on my GitHub page.
                See{' '}
                <CalciteA href="https://github.com/Cesium133/air-alert-app">
                  {' '}
                  this repo{' '}
                </CalciteA>{' '}
                for the frontend code used in this app, and
                <CalciteA href="https://github.com/Cesium133/air-alert-data-download">
                  {' '}
                  this one{' '}
                </CalciteA>{' '}
                for all the work on data processing done with Python.
              </CalciteP>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle>Acknowledgements</AccordionTitle>
            <AccordionContent>
              <CalciteP
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                Air Alert owes its final design and implementation to the
                following people:
              </CalciteP>
              <CalciteOl
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                <CalciteUl>
                  <em>Jon Nordling</em> (mentor) for helping with direction,
                  advice and deployment
                </CalciteUl>
                <CalciteUl>
                  {' '}
                  <em>Matt Millideo</em> for pointers on React
                </CalciteUl>
                <CalciteUl>
                  <em>Jonathan Resop</em> for direction and advice with Capstone
                  Project
                </CalciteUl>
                <CalciteUl>
                  <em>Emily Shroads</em> for Python and csv debugging
                </CalciteUl>
              </CalciteOl>
            </AccordionContent>
          </AccordionSection>

          <AccordionSection>
            <AccordionTitle>Got comments or questions?</AccordionTitle>
            <AccordionContent>
              <CalciteP
                style={{
                  width: '80%',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              >
                Head on over to the{' '}
                <CalciteA as={NavLink} to="/contact">
                  Contact
                </CalciteA>{' '}
                page.
              </CalciteP>
            </AccordionContent>
          </AccordionSection>
        </Accordion>
      </div>
    );
  }
}

export default About;
