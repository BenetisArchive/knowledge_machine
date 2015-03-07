"use strict";
var React = require('react');
var Input = require('react-bootstrap').Input;
var _ = require('lodash');
var Authentication = require('../authentication');
var users = require('../../services/invite-users');

//TODO: add new button to clear form
module.exports = React.createClass({
    mixins: [ Authentication ],
    getInitialState: function() {
        return {
            email: 'test@a.com',
            role: '1',
            error: ''
        }
    },
    handleInputChange: function(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    },
    isInputValid: function(input) {
        var inputsToValidate = ['email'];

        function isEmailValid(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        var inputValidation = {
            email: isEmailValid(this.state.email)
        };

        return _.indexOf(inputsToValidate, input) === -1
                ? true //Input does not need to be validated
                : inputValidation[input];
    },
    //get validation state for bootstrap inputs
    getInputValidationState: function(isValid) {
            return isValid ? 'success' : 'error';
    },
    //get email validation state, success / error
    getEmailValidationState: function() {
        return this.getInputValidationState(this.isInputValid('email'))
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
    handleSubmit: function(e) {
        e.preventDefault();
        var email = this.state.email.trim();
        var role = this.state.role.trim();
        users.inviteUsers({
            email: email,
            role: role
        }, function(result) {
            this.setState({
                error: result.msg
            });
        }.bind(this));
    },
    render: function () {
        return (
            <form onSubmit={ this.handleSubmit } className="invitation_form form-horizontal col-xs-offset-1">
                <h1 className="form_header col-xs-offset-2">Users invitation</h1>
                <Input type="text" name ="email" label="E-mail" value={this.state.email} onChange={this.handleInputChange} labelClassName="col-xs-2" wrapperClassName="col-xs-7" bsStyle={this.getEmailValidationState()} hasFeedback />
                <Input type="select" name ="role" label='User role' defaultValue="1" onChange={this.handleInputChange} labelClassName="col-xs-2" wrapperClassName="col-xs-7" >
                    <option value="1">Student</option>
                    <option value="2">Lecturer</option>
                    <option value="3">Administrator</option>
                </Input>
                <Input type="static" wrapperClassName="col-xs-offset-2 col-xs-7" value={this.state.error} />
                <Input type="submit" label="" wrapperClassName="col-xs-offset-2 col-xs-7" disabled={ this.formHasErrors() }/>
            </form>
        );
    }
});