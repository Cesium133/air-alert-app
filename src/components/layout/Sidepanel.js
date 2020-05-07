import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'calcite-react/Drawer';
import Button from 'calcite-react/Button';
import ChevronsRightIcon from 'calcite-ui-icons-react/ChevronsRightIcon';
import SideNav, { SideNavTitle, SideNavLink } from 'calcite-react/SideNav';
import { CalciteH2 } from 'calcite-react/Elements';
import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.showDrawerClicked = this.showDrawerClicked.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);
  }

  state = {
    drawerDirection: 'right',
    parameter: 'PM25AQI',
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

  changeAQParameter = (event) => {
    this.setState({ parameter: event.target.value }, () =>
      this.props.changeParameter(this.state.parameter)
    );
  };

  componentDidUpdate() {
    console.log('HERE');
    console.log(this.props.last48HoursData);
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
            <CalciteH2 name="avenir-bold"> Welcome to Air Alert</CalciteH2>
            <div>
              <h3>Select a parameter to render</h3>
              <input
                type="radio"
                name="parameter"
                value="PM25AQI"
                id=""
                defaultChecked={true}
                onChange={this.changeAQParameter}
              />
              {'PM2.5'}
              <br />
              <input
                type="radio"
                name="parameter"
                value="PM10AQI"
                id=""
                onChange={this.changeAQParameter}
              />
              {'PM10'}
              <br />
              <input
                type="radio"
                name="parameter"
                value="OzoneAQI"
                id=""
                onChange={this.changeAQParameter}
              />
              {'Ozone'}
              <br />
              <input
                type="radio"
                name="parameter"
                value="NO2AQI"
                id=""
                onChange={this.changeAQParameter}
              />
              {'NO2'}
            </div>
            {/* <p>Past 48 hours of data</p> */}
            <div>
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
          </SideNav>
        </Drawer>
      </>
    );
  }
}

export default SidePanel;
