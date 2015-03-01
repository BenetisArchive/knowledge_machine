var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var Input = require('react-bootstrap').Input;

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Input type="text" label='Text' defaultValue="Enter text" />
            </div>
        );
    }
});