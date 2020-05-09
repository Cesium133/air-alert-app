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
      <TopNavTitle
        style={{
          margin: '10px',
          fontSize: '1.8em',
          textAlign: 'center',
          color: '#0d3069',
        }}
      >
        {title}
      </TopNavTitle>
      <TopNavList style={{ margin: { left: '100px' }, textAlign: 'center' }}>
        <TopNavLink>About</TopNavLink>
        <TopNavLink>Sign up for Alerts</TopNavLink>
        <TopNavLink>Contact Us</TopNavLink>
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
