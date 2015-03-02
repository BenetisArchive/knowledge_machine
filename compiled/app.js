var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var get = function (url, cb) {
    request.get(url)
        .set("Content-Type", "application/json")
        .end(cb);
};

var App = React.createClass({displayName: "App",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("ol", null, 
                    React.createElement("li", null, React.createElement(Link, {to: "home"}, "Home")), 
                    React.createElement("li", null, React.createElement(Link, {to: "invite-users"}, "Invite users")), 
                    React.createElement("li", null, React.createElement(Link, {to: "forgot-password"}, "Forgot Password"))
                ), 
                React.createElement(RouteHandler, null)
            )
        );
    }
});

var SignedIn = React.createClass({displayName: "SignedIn",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h2", null, "Signed In"), 
                React.createElement(RouteHandler, null)
            )
        );
    }
});

var Home = React.createClass({displayName: "Home",
    render: function () {
        return (
            React.createElement("h3", null, "Welcome home!")
        );
    }
});

var SignedOut = React.createClass({displayName: "SignedOut",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h2", null, "Signed Out"), 
                React.createElement(RouteHandler, null)
            )
        );
    }
});

var ForgotPassword = React.createClass({displayName: "ForgotPassword",
    getInitialState: function() {
        return {users: ''};
    },
    componentWillMount: function() {
        get("/users", function (res) {
            this.setState({users : res.text})
        }.bind(this));
    },
    render: function () {
        return (
            React.createElement("h3", null, this.state.users)
        );
    }
});

var InvitationForm = require('./users/components/invite_users/form');

var routes = (
    React.createElement(Route, {handler: App}, 
            React.createElement(Route, {name: "invite-users", handler: InvitationForm}), 
            React.createElement(Route, {name: "forgot-password", handler: ForgotPassword}), 
            React.createElement(Route, {name: "home", handler: Home})
    )
);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('view'));
});