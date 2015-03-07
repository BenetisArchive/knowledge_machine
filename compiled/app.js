var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;
var auth = require('./users/services/auth');

var get = function (url, cb) {
    request.get(url)
        .set("Content-Type", "application/json")
        .end(cb);
};

var App = React.createClass({displayName: "App",
    getInitialState: function() {
        return {
            loggedIn : auth.isLoggedIn()
        }
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("ol", null, 
                    React.createElement("li", null, React.createElement(Link, {to: "login"}, "Login")), 
                    React.createElement("li", null, React.createElement(Link, {to: "invite-users"}, "Invite users"))
                ), 
                React.createElement(RouteHandler, null)
            )
        );
    }
});

var InviteUsersFormWrapper = require('./users/components/invite_users/form');
var LoginUsersFormWrapper = require('./users/components/login/form');

var routes = (
    React.createElement(Route, {handler: App}, 
            React.createElement(Route, {name: "invite-users", handler: InviteUsersFormWrapper}), 
            React.createElement(Route, {name: "login", handler: LoginUsersFormWrapper})
    )
);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('view'));
});