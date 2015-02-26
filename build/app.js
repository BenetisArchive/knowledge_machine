(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./compiled/app.js":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var GameView = require('./game_view');

React.render(
    React.createElement(GameView, null),
    document.getElementById('view')
);


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./game_view":"/Users/zygis/Documents/studies/komp_tinklai_ir_it_technologijos/knowledge_machine/compiled/game_view/index.js"}],"/Users/zygis/Documents/studies/komp_tinklai_ir_it_technologijos/knowledge_machine/compiled/game_view/components/view.js":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

module.exports = React.createClass({displayName: "exports",
    render: function() {
        return (
            React.createElement("div", null, 
                "O gal ir ne"
            )
        );
    }
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/zygis/Documents/studies/komp_tinklai_ir_it_technologijos/knowledge_machine/compiled/game_view/index.js":[function(require,module,exports){
module.exports = require('./components/view');


},{"./components/view":"/Users/zygis/Documents/studies/komp_tinklai_ir_it_technologijos/knowledge_machine/compiled/game_view/components/view.js"}]},{},["./compiled/app.js"]);
