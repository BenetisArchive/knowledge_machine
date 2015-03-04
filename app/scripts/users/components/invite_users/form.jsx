var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;
var request = require('superagent');
var Input = require('react-bootstrap').Input;

module.exports = React.createClass({
    onFormSubmit: function(data, callback) {
        request
            .post('/invite-users')
            .send({data})
            .end(function(error, res){
                console.log(res.text);
            });
    },
    render: function () {
        return (
            <Form onFormSubmit={this.onFormSubmit}/>
        );
    }
});

var Form = React.createClass({
    getInitialState: function() {
        return {
            email: 'test@a'
        }
    },
    isEmailValid: function() {
        return validateEmail(this.state.email) ? 'success' : 'error';

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
    changeEmail: function(e) {
        this.setState({
            email: e.target.value
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var email = this.state.email.trim();
        this.props.onFormSubmit({
            email: email
        });
    },
    render: function () {
        return (
            <form onSubmit={ this.handleSubmit } className="invitation_form form-horizontal col-xs-offset-1">
                <h1 className="form_header col-xs-offset-2">Users invitation</h1>
                <Input type="text" label="E-mail" value={this.state.email} onChange={this.changeEmail} labelClassName="col-xs-2" wrapperClassName="col-xs-7" bsStyle={this.isEmailValid()} hasFeedback />
                <Input type="submit" label="" wrapperClassName="col-xs-offset-2 col-xs-7" />
            </form>
        );
    }
});