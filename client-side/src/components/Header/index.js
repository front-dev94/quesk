import React from 'react';
import { Collapse, Navbar, Nav, NavbarBrand, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Container, Button, NavItem } from 'reactstrap';

import {ReactComponent as LogoutIcon} from 'assets/images/logout.svg';
import {ReactComponent as ProfileIcon} from "assets/images/profile-icon.svg";

import './style.scss';

const Header = ({user, history, logout}) => (
  <div className="header-navigation d-flex align-items-center">
    <Container>
      <Navbar expand="md">
        <div className="header-logo-search d-flex align-items-center">
          <NavbarBrand href="/">
            <span>Quesk</span>
          </NavbarBrand>
          <div className="search">
            <input placeholder="Search..." class="form-control" />
            <span className="search-icon">
              <i className="fe fe-search"></i>
            </span>
          </div>
        </div>
        <Collapse navbar>
          <Nav className="ml-auto d-flex align-items-center" navbar>
            <NavItem>
              <Button type="primary" className="my-questions-btn">My questions</Button>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="notifications-item">
              <DropdownToggle tag="button" nav caret className="header-user-notifications">
                <i class="fe fe-bell"></i>
                <span class="count">3</span>
              </DropdownToggle>
              <DropdownMenu right>
                  
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle tag="div" nav caret className="header-user-navbar">
                <span className="user-avatar">{ "sejdalija.agic".match(/\b(\w)/g).join('').toUpperCase() }</span>
                <span>Sejdalija</span>
              </DropdownToggle>
              <DropdownMenu right>
                  <DropdownItem onClick={() => history.push("/page/profile")}>
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={logout}>
                    <i className="fe fe-log-out"></i>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  </div>
);

export default Header;
