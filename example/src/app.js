import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {WithoutPage} from "./without";

const MainNav = () => <Navbar collapseOnSelect>
    <Navbar.Header>
        <Navbar.Brand>
            <a href="#">Redux via decorators example App</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
        <Nav>
            <NavItem eventKey={1} componentClass="span">
                <Link to="/">Home</Link>
            </NavItem>
            <NavItem eventKey={2} componentClass="span">
                <Link to="/without">Without redux-via-decorators</Link>
            </NavItem>
            <NavItem eventKey={3} componentClass="span">
                <Link to="/with">With redux-via-decorators</Link>
            </NavItem>
        </Nav>
    </Navbar.Collapse>
</Navbar>;

export default () => <div>
    <MainNav/>
    {/*<h1>Hello world!</h1>*/}
    <Switch>
        <Route exact path="/without" component={WithoutPage}/>
    </Switch>
</div>;