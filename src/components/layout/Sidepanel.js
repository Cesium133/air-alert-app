import React, { Component } from 'react';
import Drawer from 'calcite-react/Drawer';
import Button from 'calcite-react/Button';
import ChevronsRightIcon from 'calcite-ui-icons-react/ChevronsRightIcon';
import SideNav, { SideNavTitle, SideNavLink } from 'calcite-react/SideNav';
import { CalciteH2 } from 'calcite-react/Elements';
import Radio from 'calcite-react/Radio';
import { FormControl, Fieldset, Legend } from 'calcite-react/Form';
import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';

// const Sidepanel = () => {
//   return <Drawer />;
// };

const Sidepanel = () => {
  class DrawerStory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        drawerDirection: 'right',
        parameter: 'pm25',
        active: false,
      };

      this.showDrawerClicked = this.showDrawerClicked.bind(this);
      this.hideDrawer = this.hideDrawer.bind(this);
    }
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
      this.setState({ parameter: event.target.value });

      console.log('Changed radio');
      console.log(event.target.name);
      console.log(event.target.value);
      console.log(event.target);
    };

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
              <FormControl onChange={this.changeAQParameter}>
                <Fieldset name="docRadioGroup">
                  <Legend>Select parameter to display:</Legend>
                  <Radio
                    // onChange={this.changeAQParameter}
                    defaultChecked={true}
                    name={'parameter'}
                    value={'pm25'}
                  >
                    PM2.5
                  </Radio>
                  <Radio
                    // onChange={this.changeAQParameter}
                    name={'parameter'}
                    value={'pm10'}
                  >
                    PM10
                  </Radio>
                  <Radio
                    // onChange={this.changeAQParameter}
                    name={'parameter'}
                    value={'ozone'}
                  >
                    Ozone
                  </Radio>
                  <Radio
                    // onChange={this.changeAQParameter}
                    name={'parameter'}
                    value={'no2'}
                  >
                    NO2
                  </Radio>
                </Fieldset>
              </FormControl>
              <Card style={{ maxWidth: '320px', margin: '20px' }}>
                <CardImage
                  src="https://images.photowall.com/products/42521/cloudy-blue-sky-horizon.jpg?h=699&q=85"
                  caption="Florida, January 1954"
                  alt="Bridge Club, 1954"
                />
                <CardContent>
                  <CardTitle>Card with Image</CardTitle>
                  <p>
                    Cards can have full-bleed images with optional captions.
                  </p>
                  <Button>View Examples</Button>
                </CardContent>
              </Card>
              <SideNavTitle>Agricultural</SideNavTitle>
              <SideNavLink>Transition</SideNavLink>
            </SideNav>
          </Drawer>
        </>
      );
    }
  }

  return <DrawerStory />;
};

export default Sidepanel;
