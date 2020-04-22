import React from 'react';
import PropTypes from 'prop-types';
import TopNav, {
  TopNavBrand,
  TopNavTitle,
  TopNavList,
  TopNavLink,
  TopNavActionsList,
} from 'calcite-react/TopNav';

const Navbar = ({ title }) => {
  return (
    <TopNav>
      <TopNavTitle>{title}</TopNavTitle>
      <TopNavList>
        <TopNavLink>About</TopNavLink>
        <TopNavLink>Sign up for Alerts</TopNavLink>
        <TopNavLink>Contact Us</TopNavLink>
      </TopNavList>
    </TopNav>
  );
};

Navbar.defaultProps = {
  title: 'Air Alert: Monitor the quality of your air',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
