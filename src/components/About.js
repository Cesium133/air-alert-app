import React from 'react';
import Accordion, {
  AccordionSection,
  AccordionTitle,
  AccordionContent,
} from 'calcite-react/Accordion';
import { CalciteP, CalciteH2 } from 'calcite-react/Elements';
import NavBar from './layout/Navbar';
import AirQualityColorTable from '../assets/images/airquality_index_color.png';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSectionIndexes: [0],
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
          style={{ width: '92%', margin: '50px' }}
          onAccordionChange={this.onAccordionChange}
          activeSectionIndexes={this.state.activeSectionIndexes}
        >
          <AccordionSection>
            <AccordionTitle>What do the colors on the map mean?</AccordionTitle>
            <AccordionContent>
              <CalciteP>Include more complete picture here</CalciteP>
              <img width={'300px'} src={AirQualityColorTable} alt="" />
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle>
              What are some sources of air pollution?
            </AccordionTitle>
            <AccordionContent>
              <CalciteP></CalciteP>
              <img width={'300px'} src={AirQualityColorTable} alt="" />
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle>About the App</AccordionTitle>
            <AccordionContent>
              <CalciteP>How was this application made?</CalciteP>
            </AccordionContent>
          </AccordionSection>

          <AccordionSection>
            <AccordionTitle>Acknowledgements</AccordionTitle>
            <AccordionContent>
              <CalciteP>Accordion Content 3</CalciteP>
            </AccordionContent>
          </AccordionSection>

          <AccordionSection>
            <AccordionTitle>Contact</AccordionTitle>
            <AccordionContent>
              <CalciteP>Accordion Content 3</CalciteP>
            </AccordionContent>
          </AccordionSection>
        </Accordion>
      </div>
    );
  }
}

export default About;
