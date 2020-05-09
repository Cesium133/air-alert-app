import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'calcite-react/Drawer';
import Button from 'calcite-react/Button';
import ChevronsRightIcon from 'calcite-ui-icons-react/ChevronsRightIcon';
import SideNav, { SideNavTitle, SideNavLink } from 'calcite-react/SideNav';
import { CalciteH2 } from 'calcite-react/Elements';

import AccordionComponent from './Accordion';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.showDrawerClicked = this.showDrawerClicked.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);
  }

  state = {
    drawerDirection: 'right',
    activeParameter: 'PM25AQI',
    active: false,
  };

  showDrawerClicked(drawerDirection) {
    this.setState({
      drawerDirection,
      active: true,
    });
  }

  hideDrawer() {
    this.setState({
      active: false,
    });
  }

  changeParameter = (param) => {
    this.setState({ activeParameter: param, active: false });
    this.props.changeParameter(param);
  };

  componentDidUpdate() {
    if (this.props.sidepanelState == true) {
      // this.setState({ active: true });
      console.log(this.props.sidepanelState);
    }
  }

  render() {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={() => this.showDrawerClicked('right')}
            //   style={{ float: 'right' }}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
        <Drawer
          active={this.state.active}
          drawerWidth={380}
          right={this.state.drawerDirection === 'right'}
          onRequestClose={this.hideDrawer}
        >
          <SideNav className="">
            <CalciteH2 name="avenir-bold" style={{ margin: '10px' }}>
              {'Welcome to Air Alert'}
            </CalciteH2>
            <AccordionComponent
              changeParameter={this.changeParameter}
              last48HoursData={this.props.last48HoursData}
            />
          </SideNav>
        </Drawer>
      </>
    );
  }
}

export default SidePanel;
