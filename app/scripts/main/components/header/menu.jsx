var React = require('react');
var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , DropdownButton = ReactBootstrap.DropdownButton
    , MenuItem = ReactBootstrap.DropdownButton

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route
    , Navigation = Router.Navigation

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink

module.exports = React.createClass({
    mixins: [Navigation],
    handleSelect: function(e) {
        this.transitionTo(e)
    },
    render: function () {
        return (
            <div>
                <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleSelect}>
                    <NavItemLink eventKey="students" to="students">Students</NavItemLink>
                    <NavItemLink eventKey="login" to="login" title="Item">NavItem 2 content</NavItemLink>
                </Nav>
            </div>
        );
    }
});