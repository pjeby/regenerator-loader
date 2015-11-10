var regenerator = require('regenerator'),
    detectCompile = /\bfunction\s*\*|\basync\s+function\b/,
    detectRuntime = /\bregeneratorRuntime\b/;

module.exports = function (source, map) {

    this.cacheable && this.cacheable();

    var result = source;
    if (detectCompile.test(source)) {
        result = regenerator.compile(source).code;
    }

    if (detectRuntime.test(result))  {
        return "var regneratorRuntime = require('regenerator/runtime');\n"
               + result;
    }

    this.async().apply(
        this, [null].concat(Array.prototype.slice.call(arguments))
    );

};

