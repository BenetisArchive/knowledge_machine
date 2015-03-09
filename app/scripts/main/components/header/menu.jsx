var React = require('react');
var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , DropdownButton = ReactBootstrap.DropdownButton
    , MenuItem = ReactBootstrap.MenuItem

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route
    , Navigation = Router.Navigation

var Authentication = require('../authentication')

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink

module.exports = React.createClass({
    mixins: [Navigation, Authentication],
    handleSelect: function(e) {
        this.transitionTo(e)
    },
    render: function () {
        return (
            <div>
                <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleSelect}>
                    <NavItemLink eventKey="students" to="students">Students</NavItemLink>
                    <NavItemLink eventKey="login" to="login" title="Item">NavItem 2 content</NavItemLink>
                    <DropdownButton eventKey={4} title="Other" navItem={true}>
                        <MenuItem eventKey="/students">Action</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="/logout">Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </div>
        );
    }
});