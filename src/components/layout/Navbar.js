import React from 'react';
import PropTypes from 'prop-types';
import TopNav, {
  TopNavBrand,
  TopNavTitle,
  TopNavList,
  TopNavLink,
  TopNavActionsList,
} from 'calcite-react/TopNav';
import { NavLink } from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <TopNav>
      <TopNavTitle
        style={{
          margin: '10px',
          fontSize: '1.8em',
          textAlign: 'center',
          color: '#0d3069',
        }}
        as={NavLink}
        to="/"
      >
        {title}
      </TopNavTitle>
      <TopNavList style={{ margin: { left: '100px' }, textAlign: 'center' }}>
        <TopNavLink exact as={NavLink} to="/">
          Home
        </TopNavLink>
        <TopNavLink as={NavLink} to="/about">
          About
        </TopNavLink>
        <TopNavLink as={NavLink} to="/contact">
          Contact Us
        </TopNavLink>
      </TopNavList>
    </TopNav>
  );
};

Navbar.defaultProps = {
  title: 'Air Alert',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
