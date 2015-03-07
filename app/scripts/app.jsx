var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;
var auth = require('./users/services/auth');

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
                </ol>
                <RouteHandler logIn={auth.logIn} />
            </div>
        );
    }
});

var InviteUsers = require('./users/components/users/inviteUsers');
var LogIn = require('./users/components/auth/login');

var routes = (
    <Route handler={App}>
            <Route name="invite-users" handler={InviteUsers}/>
            <Route name="login" handler={LogIn} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('view'));
});