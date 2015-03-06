"use strict";
var React = require('react');
var request = require('superagent');
var Input = require('react-bootstrap').Input;
var _ = require('lodash');
module.exports = React.createClass({
    onFormSubmit: function(data, callback) {
        request
            .post('/login')
            .send({data})
            .end(function(error, res){
                callback(JSON.parse(res.text));
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
            email: '',
            password: '',
            error: ''
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
                error: result.msg
            });
        }.bind(this));
    },
    render: function () {
        return (
            <form onSubmit={ this.handleSubmit } className="invitation_form form-horizontal col-xs-offset-1">
                <h1 className="form_header col-xs-offset-2">Login</h1>
                <Input type="text" name="email" label="E-mail" onChange={this.handleInputChange} labelClassName="col-xs-2" wrapperClassName="col-xs-7" />
                <Input type="password" name="password" label="Password" onChange={this.handleInputChange} labelClassName="col-xs-2" wrapperClassName="col-xs-7" />
                <Input type="static" wrapperClassName="col-xs-offset-2 col-xs-7" value={this.state.error} />
                <Input type="submit" value="Login" label="" wrapperClassName="col-xs-offset-2 col-xs-7" />
            </form>
        );
    }
});