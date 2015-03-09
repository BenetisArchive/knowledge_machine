var React = require('react');
var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Link = Router.Link
    , Route = Router.Route
    , DefaultRoute = Router.DefaultRoute
    , Navigation = Router.Navigation
    , State = Router.State

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
    componentDidMount: function() {
        auth.onChange = this.onChange;
    },
    onChange: function() {
      this.setState({
          loggedIn: auth.isLoggedIn()
      })
    },
    render: function () {
        var loginOrDashboard = this.state.loggedIn
            ? <Dashboard />
            : <LogIn logIn={auth.logIn} onChange={this.onChange} />
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

var InviteUsers = require('./main/components/users/inviteUsers');
var LogOut = require('./main/components/auth/logout')

var routes = (
    <Route handler={App} >
        <Route name="logout" handler={LogOut}/>
        <Route name="login" handler={LogIn} />
        <Route name="invite-users" handler={InviteUsers}/>
        <Route name="students" handler={InviteUsers}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('view'));
});