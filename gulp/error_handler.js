var notify = require('gulp-notify');

module.exports = function (source) {
    "use strict";
    notify.onError({
        title: "Compiler error",
        message: "Error: <%= error.message %>"
    }).apply(this, Array.prototype.slice.call(arguments));
    this.emit('end');
};