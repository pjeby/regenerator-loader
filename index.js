var regenerator = require('regenerator'),
    detectCompile = /\bfunction\s*\*|\basync\s+function\b/,
    detectRuntime = /\bregeneratorRuntime\b/;

module.exports = function (source, map) {

    this.cacheable && this.cacheable();

    if (detectCompile.test(source)) {
        var result = regenerator.compile(source);
        if (result.code !== source && detectRuntime.test(result.code))  {
            return "var regeneratorRuntime = require('regenerator-runtime/runtime');\n"
                   + result.code;
        }
    }
    
    this.async().apply(
        this, [null].concat(Array.prototype.slice.call(arguments))
    );

};

