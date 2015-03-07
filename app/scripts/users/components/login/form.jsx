"use strict";
var React = require('react');
var request = require('superagent');
var Input = require('react-bootstrap').Input;
var _ = require('lodash');
var auth = require('../../services/auth');
var Router = require('react-router');
var State = Router.State;
module.exports = React.createClass({
    render: function () {
        return (
            <Form onFormSubmit={auth.logIn} />
        );
    }
});
var Form = React.createClass({
    mixins: [ Router.Navigation, State],
    getInitialState: function() {
        return {
            email: 'test@a.lt',
            password: '123',
            msg: ''
        }
    },
    handleInputChange: function(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var email = this.state.email.trim();
        var password = this.state.password.trim();
        this.props.onFormSubmit({
            email: email,
            password: password
        }, function(result) {
            this.setState({
                msg: result.msg
            });
            if(result.type === 'success') {
                var nextPath = this.getQuery().nextPath;
                if (nextPath) {
                    this.transitionTo(nextPath);
                } else {
                    this.replaceWith('/');
                }
            }
        }.bind(this));
    },
    render: function () {
        return (
            <form onSubmit={ this.handleSubmit } className="invitation_form form-horizontal col-xs-offset-1">
                <h1 className="form_header col-xs-offset-2">Login</h1>
                <Input type="text" name="email" label="E-mail" value={this.state.email} onChange={this.handleInputChange} labelClassName="col-xs-2" wrapperClassName="col-xs-7" />
                <Input type="password" name="password" label="Password" value={this.state.password} onChange={this.handleInputChange} labelClassName="col-xs-2" wrapperClassName="col-xs-7" />
                <Input type="static" wrapperClassName="col-xs-offset-2 col-xs-7" value={this.state.msg} />
                <Input type="submit" value="Login" label="" wrapperClassName="col-xs-offset-2 col-xs-7" />
            </form>
        );
    }
});