var React = require('react');
var Router = require('react-router')
    , Navigation = Router.Navigation
    , State = Router.State

var auth = require('../../services/auth');

module.exports = React.createClass({
    mixins: [ Navigation, State ],
    componentDidMount: function() {
        auth.logOut(function(result){
            this.replaceWith('/')
            auth.onChange(); //TODO:Why does this work?
        }.bind(this));

    },
    render: function() {
        return (
            <div>You are logged out</div>
        );
    }
});