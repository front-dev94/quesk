import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, Nav, NavbarBrand, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Container, Button, NavItem } from 'reactstrap';
import AskQuestion from 'components/Question/components/AskQuestion';
import { getUserInitials } from 'utils/helpers/userInitials';

import './style.scss';

const Header = ({user, history, logout}) => {
  const fullName = user ? user.firstName + ' ' + user.lastName : "";

  return (
    <div className="header-navigation d-flex align-items-center">
      <Container>
        <Navbar expand="md">
          <div className="header-logo-search d-flex align-items-center">
            <NavbarBrand href="/">
              <span>Quesk</span>
            </NavbarBrand>
            <div className="search">
              <input placeholder="Search..." className="form-control" />
              <span className="search-icon">
                <i className="fe fe-search"></i>
              </span>
            </div>
          </div>
          <Collapse navbar>
            {user ? <Nav className="ml-auto d-flex align-items-center" navbar>
              <NavItem>
                <AskQuestion />
              </NavItem>
              <UncontrolledDropdown nav inNavbar className="notifications-item">
                <DropdownToggle tag="button" nav caret className="header-user-notifications">
                  <i className="fe fe-bell"></i>
                  <span className="count">3</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => history.push("/profile/questions")}>
                    My questions
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle tag="div" nav caret className="header-user-navbar">
                  <span className="user-avatar">{ getUserInitials(fullName) }</span>
                  <span>{user.username}</span>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => history.push("/profile/my-questions")}>
                      My questions
                    </DropdownItem>
                    <DropdownItem onClick={() => history.push("/profile")}>
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={logout}>
                      <i className="fe fe-log-out"></i>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
              </UncontrolledDropdown>
            </Nav> : <Nav className="ml-auto d-flex align-items-center login-register-nav" navbar>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/sign-up">Register</Link>
              </NavItem>
            </Nav>}
          </Collapse>
        </Navbar>
      </Container>
    </div>
  )
};

export default Header;
