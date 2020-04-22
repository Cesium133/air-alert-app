import React, { Component } from 'react';
import Drawer from 'calcite-react/Drawer';
import Button from 'calcite-react/Button';
import SideNav, { SideNavTitle, SideNavLink } from 'calcite-react/SideNav';

// const Sidepanel = () => {
//   return <Drawer />;
// };

const Sidepanel = () => {
  class DrawerStory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        drawerDirection: 'right',
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

    render() {
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => this.showDrawerClicked('right')}
              style={{ float: 'right' }}
            >
              Select Layer
            </Button>
          </div>
          <Drawer
            active={this.state.active}
            right={this.state.drawerDirection === 'right'}
            onRequestClose={this.hideDrawer}
          >
            <SideNav>
              <SideNavTitle>Sidenav Group</SideNavTitle>
              <nav>
                <SideNavLink>Agricultural</SideNavLink>
                <SideNavLink>Transition</SideNavLink>
                <SideNavLink>Perpetual</SideNavLink>
                <SideNavLink>Cultural</SideNavLink>
              </nav>
            </SideNav>
          </Drawer>
        </>
      );
    }
  }

  return <DrawerStory />;
};

export default Sidepanel;
