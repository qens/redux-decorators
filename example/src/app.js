import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";

const MainNav = () => <Navbar collapseOnSelect>
    <Navbar.Header>
        <Navbar.Brand>
            <a href="#">Redux via decorators example App</a>
        </Navbar.Brand>
        <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
        <Nav>
            <NavItem eventKey={1} componentClass="span">
                <Link to="/">Home</Link>
            </NavItem>
            <NavItem eventKey={2} componentClass="span">
                <Link to="/about">About</Link>
            </NavItem>
        </Nav>
    </Navbar.Collapse>
</Navbar>;

export default () => <div>
    <MainNav />
    <h1>Hello world!</h1>
    {/*<Switch>*/}
        {/*<Route exact path="/" component={Home} />*/}
    {/*</Switch>*/}
</div>;