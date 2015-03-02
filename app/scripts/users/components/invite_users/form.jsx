var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var Input = require('react-bootstrap').Input;

module.exports = React.createClass({
    render: function () {
        return (
            <form className="invitation_form form-horizontal col-xs-offset-1">
                <h1 className="form_header col-xs-offset-2">Users invitation</h1>
                <Input type="text" label="E-mail" addonAfter="@"
                    labelClassName="col-xs-2" wrapperClassName="col-xs-7" />
                <Input type="submit" label="" wrapperClassName="col-xs-offset-2 col-xs-7" />

            </form>
        );
    }
});