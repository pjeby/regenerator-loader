var regenerator = require('regenerator');

module.exports = function (source, map) {
    this.cacheable && this.cacheable();
    var result = regenerator(source);
    if (result !== source) {
        // Ensure that regenerator runtime is included and initialized,
        // and drop source map, since Regenerator doesn't support it (yet)       
        return "require('regenerator/runtime/min');\n"+result;
    }
    // No change; pass through original source and map, if any, via async mode
    this.async().apply(
        this, [null].concat(Array.prototype.slice.call(arguments))
    );
};

