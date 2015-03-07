var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;
var auth = require('./main/services/auth');
var Header = require('./main/components/header/menu');

var App = React.createClass({
    getInitialState: function() {
        return {
            loggedIn : auth.isLoggedIn()
        }
    },
    render: function () {
        return (
            <div>
                <ol>
                    <li><Link to="login">Login</Link></li>
                    <li><Link to="invite-users">Invite users</Link></li>
                    <li><Link to="logout">Log out</Link></li>
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
                <RouteHandler />
            </div>
        );
    }
});

var SignedOut = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Signed Out</h2>
                <RouteHandler logIn={auth.logIn}/>
            </div>
        );
    }
});

var InviteUsers = require('./main/components/users/inviteUsers');
var LogIn = require('./main/components/auth/login');
var LogOut = React.createClass({
   componentDidMount: function() {
        auth.logOut(function(result){
        });
   },
    render: function() {
        return (
            <div>You are logged out</div>
        );
    }
});

var routes = (
    <Route handler={App}>
            <Route handler={SignedIn}>
                <Route name="invite-users" handler={InviteUsers}/>
                <Route name="logout" handler={LogOut}/>
            </Route>
            <Route handler={SignedOut}>
                <Route name="login" handler={LogIn} />
            </Route>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('view'));
});