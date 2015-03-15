var React = require('react');

var Authentication = require('../authentication')

module.exports = React.createClass({
    mixins: [ Authentication ],
    render: function () {
        return (
            <div>
                Create tests
                Available tests
                Assign tests
            </div>
        );
    }
});