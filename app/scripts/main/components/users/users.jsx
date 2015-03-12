var React = require('react');
var users = require('../../services/users');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            users : []
        }
    },
    componentDidMount: function() {
        users.getUsers(function(result) {
            this.setState({
                users: result
            })
        }.bind(this))
    },
    render: function () {
        console.log(this.state.users);
        return (
            <div>
                {this.state.users}
            </div>
        );
    }
});