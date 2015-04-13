'use strict';

var regenerator = require('regenerator'),
    recast = require('recast');

var detectCompile = /\bfunction\s*\*|\basync\s+function\b/
  , detectRuntime = /\bregeneratorRuntime\b/;

var SourceMapGenerator = require('source-map').SourceMapGenerator;
var SourceMapConsumer = require('source-map').SourceMapConsumer;

// borrowed technique from https://github.com/sindresorhus/gulp-regenerator/blob/master/index.js
function compile(source, filename) {
    var ast = regenerator.transform(recast.parse(source, {
        sourceFileName: filename
    }));

    return recast.print(ast, {
        sourceMapName: filename
    });
}

function applyMap(outgoing, incoming) {
    var g = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(outgoing));
    g.applySourceMap(new SourceMapConsumer(incoming));
    return JSON.parse(g.toString());
}

module.exports = function (source, map) {

    this.cacheable && this.cacheable();

    if (!detectCompile.test(source)) {
        this.callback(null, source, map);
        return;
    }

    var result = compile(source, this.resourcePath);

    if (detectRuntime.test(result.code)) {
        result.code = "var regeneratorRuntime = require('regenerator/runtime');\n" + result.code;
    }

    if (this.sourceMap && map != null) {
        if (result.map == null) { result.map = map; }
        else { result.map = applyMap(result.map, map); }
    }

    this.callback(null, result.code, result.map);

};

