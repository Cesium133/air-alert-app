import React from 'react';
import Accordion, {
  AccordionSection,
  AccordionTitle,
  AccordionContent,
} from 'calcite-react/Accordion';

class AccordionExample extends React.Component {
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
      <Accordion
        onAccordionChange={this.onAccordionChange}
        activeSectionIndexes={this.state.activeSectionIndexes}
      >
        <AccordionSection>
          <AccordionTitle>Accordion Title 1</AccordionTitle>
          <AccordionContent></AccordionContent>
        </AccordionSection>
        <AccordionSection>
          <AccordionTitle>Accordion Title 2</AccordionTitle>
          <AccordionContent></AccordionContent>
        </AccordionSection>
        <AccordionSection>
          <AccordionTitle>Accordion Title 3</AccordionTitle>
          <AccordionContent></AccordionContent>
        </AccordionSection>
      </Accordion>
    );
  }
}

export default AccordionExample;
