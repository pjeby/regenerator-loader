# Regenerator Loader for Webpack

This is a simple loader that lets you use Facebook's [Regenerator](http://facebook.github.io/regenerator/) with [Webpack](http://webpack.github.io/), so that you can use [Co](https://github.com/visionmedia/co) or other generator-based libraries in the browser.

To use it, install it in your project's local `node_modules`, then simply add `regenerator!` to the start of the `require()` string for any module that uses generators.  Or, to avoid cluttering up your code with prefixes, use Webpack's standard configuration methods to specify `regenerator` as a  preloader, postloader, or normal loader for whatever modules you want.

The simplest method of all, however, is just to specify it as a post-loader for your *entire project*, since modules without generator functions will not be affected.  regenerator-loader uses a simple regular expression test to bypass such modules, so no time is wasted parsing or compiling them.)

(Note: because Regenerator itself does not yet officially support source maps, no source map will exist for modules containing async or generator functions.  Source maps are passed through unchanged for other modules, though, so you can still use regenerator-loader as a project-wide post-loader.)

### The Regenerator Runtime

To save space, only one copy of the Regenerator runtime is included in your project by default.  Instead of including the runtime in each module, a  `require()` statement is added to the beginning of those modules that actually include generator functions, to ensure that the runtime will be initialized before any generator functions are defined or used.

### What's New in 3.0

Due to changes in Regenerator, regenerator-loader 3.0 now requires the `regenerator-runtime` package to operate without deprecation warnings.  Generated modules will now `require('regenerator-runtime/runtime')` instead of requiring `regenerator/runtime`.

### What's New In 2.0

Due to changes in Regenerator, regenerator-loader 2.0 no longer distinguishes between a development and minimized Regenerator runtime (since Regenerator doesn't any more, either).

(This change is considered breaking because if you were previously relying on the distinction between runtimes, or for whatever reason are expecting the generated requires to still reference `regenerator/runtime/min`, you'll need to change your build setup.  If you have no idea what I'm talking about, then you aren't relying on it and you can just go ahead and upgrade.)

The only other change is that now regenerator-loader implements its own, slightly more strict check for whether a module contains generator or async functions, as the current version of Regenerator has occasional false positives.  A module will *only* be processed by Regenerator if it contains a `function *` or `async function` somewhere, even if it's in a comment.  (And the resulting processed code will only be used if the generated code references the Regenerator runtime; otherwise, the unprocessed original source  is used.)
