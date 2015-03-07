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
                <RouteHandler/>
            </div>
        );
    }
});

var InviteUsersFormWrapper = require('./users/components/invite_users/form');
var LoginUsersFormWrapper = require('./users/components/login/form');

var routes = (
    <Route handler={App}>
            <Route name="invite-users" handler={InviteUsersFormWrapper}/>
            <Route name="login" handler={LoginUsersFormWrapper} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('view'));
});