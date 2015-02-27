(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./compiled/app.js":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var Router = (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null);

//
//var GameView = require('./game_view');
//
//React.render(
//    <GameView />,
//    document.getElementById('view')
//)

var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

var App = React.createClass({displayName: "App",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("ol", null, 
                    React.createElement("li", null, React.createElement(Link, {to: "home"}, "Home")), 
                    React.createElement("li", null, React.createElement(Link, {to: "signin"}, "Sign in")), 
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

var SignIn = React.createClass({displayName: "SignIn",
    render: function () {
        return (
            React.createElement("h3", null, "Please sign in.")
        );
    }
});

var ForgotPassword = React.createClass({displayName: "ForgotPassword",
    render: function () {
        return (
            React.createElement("h3", null, "Forgot your password")
        );
    }
});

var routes = (
    React.createElement(Route, {handler: App}, 
        React.createElement(Route, {handler: SignedOut}, 
            React.createElement(Route, {name: "signin", handler: SignIn}), 
            React.createElement(Route, {name: "forgot-password", handler: ForgotPassword})
        ), 
        React.createElement(Route, {handler: SignedIn}, 
            React.createElement(Route, {name: "home", handler: Home})
        )
    )
);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('view'));
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["./compiled/app.js"]);
