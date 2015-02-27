var React = require('react');
var Router = require('react-router');
var GameView = require('./game_view');
var request = require('superagent');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var get = function (url, cb) {
    request.get(url)
        .set("Content-Type", "application/json")
        .end(cb);
};


var App = React.createClass({
    render: function () {
        return (
            <div>
                <ol>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="signin">Sign in</Link></li>
                    <li><Link to="forgot-password">Forgot Password</Link></li>
                </ol>
                <RouteHandler/>
            </div>
        );
    }
});

var SignedIn = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Signed In</h2>
                <RouteHandler/>
            </div>
        );
    }
});

var Home = React.createClass({
    render: function () {
        return (
            <h3>Welcome home!</h3>
        );
    }
});

var SignedOut = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Signed Out</h2>
                <RouteHandler/>
            </div>
        );
    }
});

var SignIn = React.createClass({
    render: function () {
        return (
            <h3>Please sign in.</h3>
        );
    }
});

var ForgotPassword = React.createClass({
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
            <h3>{this.state.users}</h3>
        );
    }
});

var routes = (
    <Route handler={App}>
            <Route name="signin" handler={SignIn}/>
            <Route name="forgot-password" handler={ForgotPassword}/>
            <Route name="home" handler={Home}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('view'));
});