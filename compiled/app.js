var React = require('react');

var GameView = require('./game_view');

React.render(
    React.createElement(GameView, null),
    document.getElementById('view')
);