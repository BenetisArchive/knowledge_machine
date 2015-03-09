var React = require('react');
var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Link = Router.Link
    , Route = Router.Route
    , DefaultRoute = Router.DefaultRoute

var auth = require('./main/services/auth');
var Header = require('./main/components/header/menu');
var LogIn = require('./main/components/auth/login');
var Authentication = require('./main/components/authentication')

var App = React.createClass({
    getInitialState: function () {
        return {
            loggedIn: auth.isLoggedIn()
        };
    },
    onLogin: function() {
      this.setState({
          loggedIn: auth.isLoggedIn()
      })
    },
    render: function () {
        var loginOrDashboard = this.state.loggedIn
            ? <Dashboard />
            : <LogIn logIn={auth.logIn} onLogin={this.onLogin} />
            return (
            <div>
                {loginOrDashboard}
                <RouteHandler logIn={auth.logIn}/>
            </div>
        );
    }
});

var Dashboard = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                Dashboard
            </div>
        )
    }
});

var SignedIn = React.createClass({
    render: function () {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
});

var InviteUsers = require('./main/components/users/inviteUsers');
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
    <Route handler={App} >
        <Route name="logout" handler={LogOut}/>
        <Route name="login" handler={LogIn} />
        <Route handler={SignedIn}>
            <Route name="invite-users" handler={InviteUsers}/>
            <Route name="students" handler={InviteUsers}/>
        </Route>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('view'));
});