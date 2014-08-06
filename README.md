# Regenerator Loader for Webpack

This is a simple loader that lets you use Facebook's [Regenerator](http://facebook.github.io/regenerator/) with [Webpack](http://webpack.github.io/), so that you can use [Co](https://github.com/visionmedia/co) or other generator-based libraries in the browser.

To use it, install it in your project's local `node_modules`, then simply add `regenerator!` to the start of the `require()` string for any module that uses generators.  Or, to avoid cluttering up your code with prefixes, use Webpack's standard configuration methods to specify `regenerator` as a  preloader, postloader, or normal loader for whatever modules you want.

The simplest method of all, however, is just to specify it as a post-loader for your *entire project*, since modules without generator functions will not be affected.  (The Regenerator module uses a simple regular expression test to bypass such modules, so no time is wasted parsing or compiling them.)

### Source Maps and Debug Support

Because Facebook's Regenerator module doesn't fully support source maps yet, any modules that contain generator functions will not have a source map.  (However, since only those modules that actually contain generator functions will be affected, it should still be safe to use this loader for *all* modules in your project.  The other modules will retain their source maps, if applicable.)

To save space, only one copy of the *minimized* Regenerator runtime is included in your project by default.  Instead of including the runtime in each module, a `require('regenerator/runtime/min')` prefix is added to the beginning of those modules that actually include generator functions, to ensure that the runtime will be initialized before any generator functions are defined or used.

Therefore, if you need to use the development version of the Regenerator runtime, you should configure Webpack to alias all references to `regenerator/runtime/min` with `regenerator/runtime/dev`, so that your project will use the un-minimized version instead.

