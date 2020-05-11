import React, { Component } from 'react';
import Button from 'calcite-react/Button';
import SideNav, { SideNavTitle, SideNavLink } from 'calcite-react/SideNav';
import { CalciteH2 } from 'calcite-react/Elements';

import AccordionComponent from './Accordion';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeParameter: 'PM25AQI',
  };

  changeParameter = (param) => {
    this.setState({ activeParameter: param });
    this.props.changeParameter(param);
  };

  componentDidUpdate() {
    // if (this.props.sidepanelState == true) {
    //   // this.setState({ active: true });
    //   console.log(this.props.sidepanelState);
    // }
  }

  render() {
    return (
      <>
        <div
          style={{
            float: 'left',
            width: '22%',
            maxHeight: '600px',
            marginRight: '5px',
            marginTop: '5px',
            overflow: 'auto',
          }}
        >
          <SideNav className="">
            {/* <CalciteH2 name="avenir-bold" style={{ margin: '10px' }}>
              {'Sidepanel'}
            </CalciteH2> */}
            <AccordionComponent
              changeParameter={this.changeParameter}
              last48HoursData={this.props.last48HoursData}
            />
          </SideNav>
        </div>
      </>
    );
  }
}

export default SidePanel;
