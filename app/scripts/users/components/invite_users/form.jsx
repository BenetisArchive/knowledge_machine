"use strict"
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;
var request = require('superagent');
var Input = require('react-bootstrap').Input;
var _ = require('lodash');
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
    isInputValid: function(input) {
        function isEmailValid(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        var inputValidation = {
            email: isEmailValid(this.state.email)
        };

        return inputValidation[input];
    },
    //get validation state for bootstrap inputs
    getInputValidationState: function(isValid) {
            return isValid ? 'success' : 'error';
    },
    //get email validation state, success / error
    getEmailValidation: function() {
        return this.getInputValidationState(this.isInputValid('email'))
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
    formHasErrors : function() {
        var inputErrors = _.map(this.state, function(inputValue, input) {
            return this.isInputValid(input)
        }.bind(this));

        var formIsValid = _.reduce(inputErrors, function(inputs, input) {
            return inputs && input;
        });

        return !formIsValid;
    },
    render: function () {
        return (
            <form onSubmit={ this.handleSubmit } className="invitation_form form-horizontal col-xs-offset-1">
                <h1 className="form_header col-xs-offset-2">Users invitation</h1>
                <Input type="text" label="E-mail" value={this.state.email} onChange={this.changeEmail} labelClassName="col-xs-2" wrapperClassName="col-xs-7" bsStyle={this.getEmailValidation()} hasFeedback />
                <Input type="submit" label="" wrapperClassName="col-xs-offset-2 col-xs-7" disabled={ this.formHasErrors() }/>
            </form>
        );
    }
});