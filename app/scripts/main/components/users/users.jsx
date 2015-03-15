var React = require('react');

var ReactBootstrap = require('react-bootstrap')
    , Table = ReactBootstrap.Table

var users = require('../../services/users');
var _ = require('lodash')

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
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>email</th>
                        <th>registered</th>
                    </tr>
                </thead>
                <UserRows users={this.state.users}/>
            </Table>
        );
    }
});

var UserRows = React.createClass({
    render: function() {
        var userRows = this.props.users.map(function(user) {
            return (
                <TR key={user.id}>
                    <TD>{user.email}</TD>
                    <TD>{user.registered}</TD>
                </TR>
            )
        })
        return (
            <tbody>
                {userRows}
            </tbody>
        )
    }
})

var TR = React.createClass({
    render: function() {
        return (
            <tr>
                {this.props.children}
            </tr>
        )
    }
})

var TD = React.createClass({
    render: function() {
        return (
            <td>
                {this.props.children}
            </td>
        )
    }
})
