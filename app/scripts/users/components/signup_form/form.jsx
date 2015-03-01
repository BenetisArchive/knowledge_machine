var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var Alert = require('react-bootstrap').Alert;

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                Test
                <Alert/>
            </div>
        );
    }
});