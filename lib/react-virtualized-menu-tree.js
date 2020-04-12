/*!
 * react-virtualized-menu-tree.js v1.0.0
 * (c) 2019-2020 daxiong
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['react-virtualized-menu-tree'] = factory());
}(this, (function () { 'use strict';

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var objectWithoutProperties = _objectWithoutProperties;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  var n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113;var z=n?Symbol.for("react.memo"):60115,aa=n?Symbol.for("react.lazy"):60116;var A="function"===typeof Symbol&&Symbol.iterator;
  function B(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var C={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D={};
  function E(a,b,c){this.props=a;this.context=b;this.refs=D;this.updater=c||C;}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(B(85));this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,c){this.props=a;this.context=b;this.refs=D;this.updater=c||C;}var H=G.prototype=new F;
  H.constructor=G;objectAssign(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
  function M(a,b,c){var e,d={},g=null,l=null;if(null!=b)for(e in void 0!==b.ref&&(l=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var k=Array(f),m=0;m<f;m++)k[m]=arguments[m+2];d.children=k;}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return {$$typeof:p,type:a,key:g,ref:l,props:d,_owner:J.current}}
  function ba(a,b){return {$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function N(a){return "object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,c,e){if(P.length){var d=P.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return {result:a,keyPrefix:b,func:c,context:e,count:0}}
  function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a);}
  function S(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0;}}if(g)return c(e,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var l=0;l<a.length;l++){d=a[l];var f=b+T(d,l);g+=S(d,f,c,e);}else if(null===a||"object"!==typeof a?f=null:(f=A&&a[A]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),l=
  0;!(d=a.next()).done;)d=d.value,f=b+T(d,l++),g+=S(d,f,c,e);else if("object"===d)throw c=""+a,Error(B(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function U(a,b,c){return null==a?0:S(a,"",b,c)}function T(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ca(a,b){a.func.call(a.context,b,a.count++);}
  function da(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,e,c,function(a){return a}):null!=a&&(N(a)&&(a=ba(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+c)),e.push(a));}function V(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(O,"$&/")+"/");b=Q(b,g,e,d);U(a,da,b);R(b);}function W(){var a=I.current;if(null===a)throw Error(B(321));return a}
  var X={Children:{map:function(a,b,c){if(null==a)return a;var e=[];V(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=Q(null,null,b,c);U(a,ca,b);R(b);},count:function(a){return U(a,function(){return null},null)},toArray:function(a){var b=[];V(a,b,null,function(a){return a});return b},only:function(a){if(!N(a))throw Error(B(143));return a}},createRef:function(){return {current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
  _currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:x,render:a}},lazy:function(a){return {$$typeof:aa,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return {$$typeof:z,type:a,compare:void 0===b?null:b}},useCallback:function(a,b){return W().useCallback(a,b)},useContext:function(a,b){return W().useContext(a,b)},useEffect:function(a,b){return W().useEffect(a,b)},useImperativeHandle:function(a,
  b,c){return W().useImperativeHandle(a,b,c)},useDebugValue:function(){},useLayoutEffect:function(a,b){return W().useLayoutEffect(a,b)},useMemo:function(a,b){return W().useMemo(a,b)},useReducer:function(a,b,c){return W().useReducer(a,b,c)},useRef:function(a){return W().useRef(a)},useState:function(a){return W().useState(a)},Fragment:r,Profiler:u,StrictMode:t,Suspense:y,createElement:M,cloneElement:function(a,b,c){if(null===a||void 0===a)throw Error(B(267,a));var e=objectAssign({},a.props),d=a.key,g=a.ref,l=a._owner;
  if(null!=b){void 0!==b.ref&&(g=b.ref,l=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(k in b)K.call(b,k)&&!L.hasOwnProperty(k)&&(e[k]=void 0===b[k]&&void 0!==f?f[k]:b[k]);}var k=arguments.length-2;if(1===k)e.children=c;else if(1<k){f=Array(k);for(var m=0;m<k;m++)f[m]=arguments[m+2];e.children=f;}return {$$typeof:p,type:a.type,key:d,ref:g,props:e,_owner:l}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.12.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:I,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:objectAssign}},Y={default:X},Z=Y&&X||Y;var react_production_min=Z.default||Z;

  var react = createCommonjsModule(function (module) {

  {
    module.exports = react_production_min;
  }
  });
  var react_1 = react.Component;
  var react_2 = react.createRef;
  var react_3 = react.PureComponent;
  var react_4 = react.createElement;

  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var objectWithoutPropertiesLoose$1 = _objectWithoutPropertiesLoose$1;

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized$1 = _assertThisInitialized$1;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  var _extends_1$1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
  });

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose$1(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized$2(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function areInputsEqual(newInputs, lastInputs) {
      if (newInputs.length !== lastInputs.length) {
          return false;
      }
      for (var i = 0; i < newInputs.length; i++) {
          if (newInputs[i] !== lastInputs[i]) {
              return false;
          }
      }
      return true;
  }

  function memoizeOne(resultFn, isEqual) {
      if (isEqual === void 0) { isEqual = areInputsEqual; }
      var lastThis;
      var lastArgs = [];
      var lastResult;
      var calledOnce = false;
      function memoized() {
          var newArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              newArgs[_i] = arguments[_i];
          }
          if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
              return lastResult;
          }
          lastResult = resultFn.apply(this, newArgs);
          calledOnce = true;
          lastThis = this;
          lastArgs = newArgs;
          return lastResult;
      }
      return memoized;
  }

  // Animation frame based implementation of setTimeout.
  // Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js
  var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
  var now = hasNativePerformanceNow ? function () {
    return performance.now();
  } : function () {
    return Date.now();
  };
  function cancelTimeout(timeoutID) {
    cancelAnimationFrame(timeoutID.id);
  }
  function requestTimeout(callback, delay) {
    var start = now();

    function tick() {
      if (now() - start >= delay) {
        callback.call(null);
      } else {
        timeoutID.id = requestAnimationFrame(tick);
      }
    }

    var timeoutID = {
      id: requestAnimationFrame(tick)
    };
    return timeoutID;
  }
  var cachedRTLResult = null; // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
  // Chrome does not seem to adhere; its scrollLeft values are positive (measured relative to the left).
  // Safari's elastic bounce makes detecting this even more complicated wrt potential false positives.
  // The safest way to check this is to intentionally set a negative offset,
  // and then verify that the subsequent "scroll" event matches the negative offset.
  // If it does not match, then we can assume a non-standard RTL scroll implementation.

  function getRTLOffsetType(recalculate) {
    if (recalculate === void 0) {
      recalculate = false;
    }

    if (cachedRTLResult === null || recalculate) {
      var outerDiv = document.createElement('div');
      var outerStyle = outerDiv.style;
      outerStyle.width = '50px';
      outerStyle.height = '50px';
      outerStyle.overflow = 'scroll';
      outerStyle.direction = 'rtl';
      var innerDiv = document.createElement('div');
      var innerStyle = innerDiv.style;
      innerStyle.width = '100px';
      innerStyle.height = '100px';
      outerDiv.appendChild(innerDiv);
      document.body.appendChild(outerDiv);

      if (outerDiv.scrollLeft > 0) {
        cachedRTLResult = 'positive-descending';
      } else {
        outerDiv.scrollLeft = 1;

        if (outerDiv.scrollLeft === 0) {
          cachedRTLResult = 'negative';
        } else {
          cachedRTLResult = 'positive-ascending';
        }
      }

      document.body.removeChild(outerDiv);
      return cachedRTLResult;
    }

    return cachedRTLResult;
  }

  var IS_SCROLLING_DEBOUNCE_INTERVAL$1 = 150;

  var defaultItemKey$1 = function defaultItemKey(index, data) {
    return index;
  }; // In DEV mode, this Set helps us only log a warning once per component instance.

  function createListComponent(_ref) {
    var _class, _temp;

    var getItemOffset = _ref.getItemOffset,
        getEstimatedTotalSize = _ref.getEstimatedTotalSize,
        getItemSize = _ref.getItemSize,
        getOffsetForIndexAndAlignment = _ref.getOffsetForIndexAndAlignment,
        getStartIndexForOffset = _ref.getStartIndexForOffset,
        getStopIndexForStartIndex = _ref.getStopIndexForStartIndex,
        initInstanceProps = _ref.initInstanceProps,
        shouldResetStyleCacheOnItemSizeChange = _ref.shouldResetStyleCacheOnItemSizeChange,
        validateProps = _ref.validateProps;
    return _temp = _class =
    /*#__PURE__*/
    function (_PureComponent) {
      _inheritsLoose$1(List, _PureComponent);

      // Always use explicit constructor for React components.
      // It produces less code after transpilation. (#26)
      // eslint-disable-next-line no-useless-constructor
      function List(props) {
        var _this;

        _this = _PureComponent.call(this, props) || this;
        _this._instanceProps = initInstanceProps(_this.props, _assertThisInitialized$2(_assertThisInitialized$2(_this)));
        _this._outerRef = void 0;
        _this._resetIsScrollingTimeoutId = null;
        _this.state = {
          instance: _assertThisInitialized$2(_assertThisInitialized$2(_this)),
          isScrolling: false,
          scrollDirection: 'forward',
          scrollOffset: typeof _this.props.initialScrollOffset === 'number' ? _this.props.initialScrollOffset : 0,
          scrollUpdateWasRequested: false
        };
        _this._callOnItemsRendered = void 0;
        _this._callOnItemsRendered = memoizeOne(function (overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
          return _this.props.onItemsRendered({
            overscanStartIndex: overscanStartIndex,
            overscanStopIndex: overscanStopIndex,
            visibleStartIndex: visibleStartIndex,
            visibleStopIndex: visibleStopIndex
          });
        });
        _this._callOnScroll = void 0;
        _this._callOnScroll = memoizeOne(function (scrollDirection, scrollOffset, scrollUpdateWasRequested) {
          return _this.props.onScroll({
            scrollDirection: scrollDirection,
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: scrollUpdateWasRequested
          });
        });
        _this._getItemStyle = void 0;

        _this._getItemStyle = function (index) {
          var _this$props = _this.props,
              direction = _this$props.direction,
              itemSize = _this$props.itemSize,
              layout = _this$props.layout;

          var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);

          var style;

          if (itemStyleCache.hasOwnProperty(index)) {
            style = itemStyleCache[index];
          } else {
            var _style;

            var _offset = getItemOffset(_this.props, index, _this._instanceProps);

            var size = getItemSize(_this.props, index, _this._instanceProps); // TODO Deprecate direction "horizontal"

            var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
            itemStyleCache[index] = style = (_style = {
              position: 'absolute'
            }, _style[direction === 'rtl' ? 'right' : 'left'] = isHorizontal ? _offset : 0, _style.top = !isHorizontal ? _offset : 0, _style.height = !isHorizontal ? size : '100%', _style.width = isHorizontal ? size : '100%', _style);
          }

          return style;
        };

        _this._getItemStyleCache = void 0;
        _this._getItemStyleCache = memoizeOne(function (_, __, ___) {
          return {};
        });

        _this._onScrollHorizontal = function (event) {
          var _event$currentTarget = event.currentTarget,
              clientWidth = _event$currentTarget.clientWidth,
              scrollLeft = _event$currentTarget.scrollLeft,
              scrollWidth = _event$currentTarget.scrollWidth;

          _this.setState(function (prevState) {
            if (prevState.scrollOffset === scrollLeft) {
              // Scroll position may have been updated by cDM/cDU,
              // In which case we don't need to trigger another render,
              // And we don't want to update state.isScrolling.
              return null;
            }

            var direction = _this.props.direction;
            var scrollOffset = scrollLeft;

            if (direction === 'rtl') {
              // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
              // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
              // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
              // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
              switch (getRTLOffsetType()) {
                case 'negative':
                  scrollOffset = -scrollLeft;
                  break;

                case 'positive-descending':
                  scrollOffset = scrollWidth - clientWidth - scrollLeft;
                  break;
              }
            } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


            scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
            return {
              isScrolling: true,
              scrollDirection: prevState.scrollOffset < scrollLeft ? 'forward' : 'backward',
              scrollOffset: scrollOffset,
              scrollUpdateWasRequested: false
            };
          }, _this._resetIsScrollingDebounced);
        };

        _this._onScrollVertical = function (event) {
          var _event$currentTarget2 = event.currentTarget,
              clientHeight = _event$currentTarget2.clientHeight,
              scrollHeight = _event$currentTarget2.scrollHeight,
              scrollTop = _event$currentTarget2.scrollTop;

          _this.setState(function (prevState) {
            if (prevState.scrollOffset === scrollTop) {
              // Scroll position may have been updated by cDM/cDU,
              // In which case we don't need to trigger another render,
              // And we don't want to update state.isScrolling.
              return null;
            } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


            var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
            return {
              isScrolling: true,
              scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
              scrollOffset: scrollOffset,
              scrollUpdateWasRequested: false
            };
          }, _this._resetIsScrollingDebounced);
        };

        _this._outerRefSetter = function (ref) {
          var outerRef = _this.props.outerRef;
          _this._outerRef = ref;

          if (typeof outerRef === 'function') {
            outerRef(ref);
          } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
            outerRef.current = ref;
          }
        };

        _this._resetIsScrollingDebounced = function () {
          if (_this._resetIsScrollingTimeoutId !== null) {
            cancelTimeout(_this._resetIsScrollingTimeoutId);
          }

          _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL$1);
        };

        _this._resetIsScrolling = function () {
          _this._resetIsScrollingTimeoutId = null;

          _this.setState({
            isScrolling: false
          }, function () {
            // Clear style cache after state update has been committed.
            // This way we don't break pure sCU for items that don't use isScrolling param.
            _this._getItemStyleCache(-1, null);
          });
        };

        return _this;
      }

      List.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
        validateSharedProps$1(nextProps, prevState);
        validateProps(nextProps);
        return null;
      };

      var _proto = List.prototype;

      _proto.scrollTo = function scrollTo(scrollOffset) {
        scrollOffset = Math.max(0, scrollOffset);
        this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollOffset) {
            return null;
          }

          return {
            scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: true
          };
        }, this._resetIsScrollingDebounced);
      };

      _proto.scrollToItem = function scrollToItem(index, align) {
        if (align === void 0) {
          align = 'auto';
        }

        var itemCount = this.props.itemCount;
        var scrollOffset = this.state.scrollOffset;
        index = Math.max(0, Math.min(index, itemCount - 1));
        this.scrollTo(getOffsetForIndexAndAlignment(this.props, index, align, scrollOffset, this._instanceProps));
      };

      _proto.componentDidMount = function componentDidMount() {
        var _this$props2 = this.props,
            direction = _this$props2.direction,
            initialScrollOffset = _this$props2.initialScrollOffset,
            layout = _this$props2.layout;

        if (typeof initialScrollOffset === 'number' && this._outerRef != null) {
          var outerRef = this._outerRef; // TODO Deprecate direction "horizontal"

          if (direction === 'horizontal' || layout === 'horizontal') {
            outerRef.scrollLeft = initialScrollOffset;
          } else {
            outerRef.scrollTop = initialScrollOffset;
          }
        }

        this._callPropsCallbacks();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        var _this$props3 = this.props,
            direction = _this$props3.direction,
            layout = _this$props3.layout;
        var _this$state = this.state,
            scrollOffset = _this$state.scrollOffset,
            scrollUpdateWasRequested = _this$state.scrollUpdateWasRequested;

        if (scrollUpdateWasRequested && this._outerRef != null) {
          var outerRef = this._outerRef; // TODO Deprecate direction "horizontal"

          if (direction === 'horizontal' || layout === 'horizontal') {
            if (direction === 'rtl') {
              // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
              // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
              // So we need to determine which browser behavior we're dealing with, and mimic it.
              switch (getRTLOffsetType()) {
                case 'negative':
                  outerRef.scrollLeft = -scrollOffset;
                  break;

                case 'positive-ascending':
                  outerRef.scrollLeft = scrollOffset;
                  break;

                default:
                  var clientWidth = outerRef.clientWidth,
                      scrollWidth = outerRef.scrollWidth;
                  outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                  break;
              }
            } else {
              outerRef.scrollLeft = scrollOffset;
            }
          } else {
            outerRef.scrollTop = scrollOffset;
          }
        }

        this._callPropsCallbacks();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(this._resetIsScrollingTimeoutId);
        }
      };

      _proto.render = function render() {
        var _this$props4 = this.props,
            children = _this$props4.children,
            className = _this$props4.className,
            direction = _this$props4.direction,
            height = _this$props4.height,
            innerRef = _this$props4.innerRef,
            innerElementType = _this$props4.innerElementType,
            innerTagName = _this$props4.innerTagName,
            itemCount = _this$props4.itemCount,
            itemData = _this$props4.itemData,
            _this$props4$itemKey = _this$props4.itemKey,
            itemKey = _this$props4$itemKey === void 0 ? defaultItemKey$1 : _this$props4$itemKey,
            layout = _this$props4.layout,
            outerElementType = _this$props4.outerElementType,
            outerTagName = _this$props4.outerTagName,
            style = _this$props4.style,
            useIsScrolling = _this$props4.useIsScrolling,
            width = _this$props4.width;
        var isScrolling = this.state.isScrolling; // TODO Deprecate direction "horizontal"

        var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
        var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;

        var _this$_getRangeToRend = this._getRangeToRender(),
            startIndex = _this$_getRangeToRend[0],
            stopIndex = _this$_getRangeToRend[1];

        var items = [];

        if (itemCount > 0) {
          for (var _index = startIndex; _index <= stopIndex; _index++) {
            items.push(react_4(children, {
              data: itemData,
              key: itemKey(_index, itemData),
              index: _index,
              isScrolling: useIsScrolling ? isScrolling : undefined,
              style: this._getItemStyle(_index)
            }));
          }
        } // Read this value AFTER items have been created,
        // So their actual sizes (if variable) are taken into consideration.


        var estimatedTotalSize = getEstimatedTotalSize(this.props, this._instanceProps);
        return react_4(outerElementType || outerTagName || 'div', {
          className: className,
          onScroll: onScroll,
          ref: this._outerRefSetter,
          style: _extends({
            position: 'relative',
            height: height,
            width: width,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform',
            direction: direction
          }, style)
        }, react_4(innerElementType || innerTagName || 'div', {
          children: items,
          ref: innerRef,
          style: {
            height: isHorizontal ? '100%' : estimatedTotalSize,
            pointerEvents: isScrolling ? 'none' : undefined,
            width: isHorizontal ? estimatedTotalSize : '100%'
          }
        }));
      };

      _proto._callPropsCallbacks = function _callPropsCallbacks() {
        if (typeof this.props.onItemsRendered === 'function') {
          var itemCount = this.props.itemCount;

          if (itemCount > 0) {
            var _this$_getRangeToRend2 = this._getRangeToRender(),
                _overscanStartIndex = _this$_getRangeToRend2[0],
                _overscanStopIndex = _this$_getRangeToRend2[1],
                _visibleStartIndex = _this$_getRangeToRend2[2],
                _visibleStopIndex = _this$_getRangeToRend2[3];

            this._callOnItemsRendered(_overscanStartIndex, _overscanStopIndex, _visibleStartIndex, _visibleStopIndex);
          }
        }

        if (typeof this.props.onScroll === 'function') {
          var _this$state2 = this.state,
              _scrollDirection = _this$state2.scrollDirection,
              _scrollOffset = _this$state2.scrollOffset,
              _scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;

          this._callOnScroll(_scrollDirection, _scrollOffset, _scrollUpdateWasRequested);
        }
      }; // Lazily create and cache item styles while scrolling,
      // So that pure component sCU will prevent re-renders.
      // We maintain this cache, and pass a style prop rather than index,
      // So that List can clear cached styles and force item re-render if necessary.


      _proto._getRangeToRender = function _getRangeToRender() {
        var _this$props5 = this.props,
            itemCount = _this$props5.itemCount,
            overscanCount = _this$props5.overscanCount;
        var _this$state3 = this.state,
            isScrolling = _this$state3.isScrolling,
            scrollDirection = _this$state3.scrollDirection,
            scrollOffset = _this$state3.scrollOffset;

        if (itemCount === 0) {
          return [0, 0, 0, 0];
        }

        var startIndex = getStartIndexForOffset(this.props, scrollOffset, this._instanceProps);
        var stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
        // If there isn't at least one extra item, tab loops back around.

        var overscanBackward = !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1;
        var overscanForward = !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1;
        return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
      };

      return List;
    }(react_3), _class.defaultProps = {
      direction: 'ltr',
      itemData: undefined,
      layout: 'vertical',
      overscanCount: 2,
      useIsScrolling: false
    }, _temp;
  } // NOTE: I considered further wrapping individual items with a pure ListItem component.
  // This would avoid ever calling the render function for the same index more than once,
  // But it would also add the overhead of a lot of components/fibers.
  // I assume people already do this (render function returning a class component),
  // So my doing it would just unnecessarily double the wrappers.

  var validateSharedProps$1 = function validateSharedProps(_ref2, _ref3) {
    var children = _ref2.children,
        direction = _ref2.direction,
        height = _ref2.height,
        layout = _ref2.layout,
        innerTagName = _ref2.innerTagName,
        outerTagName = _ref2.outerTagName,
        width = _ref2.width;
    var instance = _ref3.instance;
  };

  var FixedSizeList =
  /*#__PURE__*/
  createListComponent({
    getItemOffset: function getItemOffset(_ref, index) {
      var itemSize = _ref.itemSize;
      return index * itemSize;
    },
    getItemSize: function getItemSize(_ref2, index) {
      var itemSize = _ref2.itemSize;
      return itemSize;
    },
    getEstimatedTotalSize: function getEstimatedTotalSize(_ref3) {
      var itemCount = _ref3.itemCount,
          itemSize = _ref3.itemSize;
      return itemSize * itemCount;
    },
    getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(_ref4, index, align, scrollOffset) {
      var direction = _ref4.direction,
          height = _ref4.height,
          itemCount = _ref4.itemCount,
          itemSize = _ref4.itemSize,
          layout = _ref4.layout,
          width = _ref4.width;
      // TODO Deprecate direction "horizontal"
      var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
      var size = isHorizontal ? width : height;
      var lastItemOffset = Math.max(0, itemCount * itemSize - size);
      var maxOffset = Math.min(lastItemOffset, index * itemSize);
      var minOffset = Math.max(0, index * itemSize - size + itemSize);

      if (align === 'smart') {
        if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
          align = 'auto';
        } else {
          align = 'center';
        }
      }

      switch (align) {
        case 'start':
          return maxOffset;

        case 'end':
          return minOffset;

        case 'center':
          {
            // "Centered" offset is usually the average of the min and max.
            // But near the edges of the list, this doesn't hold true.
            var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

            if (middleOffset < Math.ceil(size / 2)) {
              return 0; // near the beginning
            } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
              return lastItemOffset; // near the end
            } else {
              return middleOffset;
            }
          }

        case 'auto':
        default:
          if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
            return scrollOffset;
          } else if (scrollOffset < minOffset) {
            return minOffset;
          } else {
            return maxOffset;
          }

      }
    },
    getStartIndexForOffset: function getStartIndexForOffset(_ref5, offset) {
      var itemCount = _ref5.itemCount,
          itemSize = _ref5.itemSize;
      return Math.max(0, Math.min(itemCount - 1, Math.floor(offset / itemSize)));
    },
    getStopIndexForStartIndex: function getStopIndexForStartIndex(_ref6, startIndex, scrollOffset) {
      var direction = _ref6.direction,
          height = _ref6.height,
          itemCount = _ref6.itemCount,
          itemSize = _ref6.itemSize,
          layout = _ref6.layout,
          width = _ref6.width;
      // TODO Deprecate direction "horizontal"
      var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
      var offset = startIndex * itemSize;
      var size = isHorizontal ? width : height;
      var numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
      return Math.max(0, Math.min(itemCount - 1, startIndex + numVisibleItems - 1 // -1 is because stop index is inclusive
      ));
    },
    initInstanceProps: function initInstanceProps(props) {// Noop
    },
    shouldResetStyleCacheOnItemSizeChange: true,
    validateProps: function validateProps(_ref7) {
      var itemSize = _ref7.itemSize;
    }
  });

  // tslint:disable:no-bitwise naming-convention
  var Row = function Row(_ref) {
    var index = _ref.index,
        _ref$data = _ref.data,
        Node = _ref$data.component,
        treeData = _ref$data.treeData,
        order = _ref$data.order,
        records = _ref$data.records,
        style = _ref.style,
        isScrolling = _ref.isScrolling;
    return react_4(Node, Object.assign({}, records[order[index]], {
      style: style,
      isScrolling: isScrolling,
      treeData: treeData
    }));
  };

  var computeTree = function computeTree(_temp, _ref, _ref2) {
    var _ref3 = _temp === void 0 ? {} : _temp,
        _ref3$refreshNodes = _ref3.refreshNodes,
        refreshNodes = _ref3$refreshNodes === void 0 ? false : _ref3$refreshNodes,
        _ref3$useDefaultOpenn = _ref3.useDefaultOpenness,
        useDefaultOpenness = _ref3$useDefaultOpenn === void 0 ? false : _ref3$useDefaultOpenn;

    var treeWalker = _ref.treeWalker;
    var prevRecords = _ref2.records,
        recomputeTree = _ref2.recomputeTree;
    var order = [];

    var records = _extends_1$1({}, prevRecords);

    var iter = treeWalker(refreshNodes);

    if (useDefaultOpenness) {
      for (var id in records) {
        records[id].isOpen = records[id].data.isOpenByDefault;
      }
    }

    var isPreviousOpened = false;

    while (true) {
      var _iter$next = iter.next(isPreviousOpened),
          done = _iter$next.done,
          value = _iter$next.value;

      if (done || !value) {
        break;
      }

      var _id = void 0;

      if (typeof value === 'string' || typeof value === 'symbol') {
        _id = value;

        if (useDefaultOpenness) {
          records[_id].isOpen = records[_id].data.isOpenByDefault;
        }
      } else {
        (function () {
          _id = value.id;
          var isOpenByDefault = value.isOpenByDefault;
          var record = records[_id];

          if (!record) {
            record = {
              data: value,
              isOpen: isOpenByDefault,
              toggle: function toggle() {
                try {
                  record.isOpen = !record.isOpen;
                  return Promise.resolve(recomputeTree({
                    refreshNodes: record.isOpen
                  })).then(function () {});
                } catch (e) {
                  return Promise.reject(e);
                }
              }
            };
            records[_id] = record;
          } else {
            record.data = value;

            if (useDefaultOpenness) {
              record.isOpen = isOpenByDefault;
            }
          }
        })();
      }

      order.push(_id);
      isPreviousOpened = records[_id].isOpen;
    }

    return {
      order: order,
      records: records
    };
  };

  var FixedSizeTree =
  /*#__PURE__*/
  function (_React$PureComponent) {
    inheritsLoose(FixedSizeTree, _React$PureComponent);

    FixedSizeTree.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
      var component = props.children,
          treeData = props.itemData,
          treeWalker = props.treeWalker;
      var oldTreeWalker = state.treeWalker,
          order = state.order;
      return _extends_1$1({
        component: component,
        treeData: treeData
      }, treeWalker !== oldTreeWalker || !order ? computeTree({
        refreshNodes: true
      }, props, state) : null);
    };

    function FixedSizeTree(props, context) {
      var _this;

      _this = _React$PureComponent.call(this, props, context) || this;
      _this.list = react_2();
      _this.state = {
        component: props.children,
        recomputeTree: _this.recomputeTree.bind(assertThisInitialized$1(_this)),
        records: {},
        treeWalker: props.treeWalker
      };
      return _this;
    }

    var _proto = FixedSizeTree.prototype;

    _proto.recomputeTree = function recomputeTree(options) {
      try {
        var _this3 = this;

        return Promise.resolve(new Promise(function (resolve) {
          _this3.setState(function (prevState) {
            return computeTree(options, _this3.props, prevState);
          }, resolve);
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _proto.scrollTo = function scrollTo(scrollOffset) {
      var _this$list$current;

      (_this$list$current = this.list.current) == null ? void 0 : _this$list$current.scrollTo(scrollOffset);
    };

    _proto.scrollToItem = function scrollToItem(id, align) {
      var _this$list$current2;

      (_this$list$current2 = this.list.current) == null ? void 0 : _this$list$current2.scrollToItem(this.state.order.indexOf(id) || 0, align);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          treeWalker = _this$props.treeWalker,
          rowComponent = _this$props.rowComponent,
          rest = objectWithoutPropertiesLoose$1(_this$props, ["children", "treeWalker", "rowComponent"]);

      return react_4(FixedSizeList, Object.assign({}, rest, {
        itemData: this.state,
        itemCount: this.state.order.length,
        ref: this.list
      }), rowComponent);
    };

    return FixedSizeTree;
  }(react_3);

  FixedSizeTree.defaultProps = {
    rowComponent: Row
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var Node =
  /*#__PURE__*/
  function (_Component) {
    inherits(Node, _Component);

    function Node() {
      classCallCheck(this, Node);

      return possibleConstructorReturn(this, getPrototypeOf(Node).apply(this, arguments));
    }

    createClass(Node, [{
      key: "handleClick",
      value: function handleClick(e, node) {
        e.stopPropagation();
        e.preventDefault();
        this.props.data && this.props.data.nodeCallback(e, node);
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
            data = _this$props.data,
            isOpen = _this$props.isOpen,
            style = _this$props.style,
            toggle = _this$props.toggle,
            activeNode = _this$props.activeNode,
            toggleUpIcon = _this$props.toggleUpIcon,
            toggleDownIcon = _this$props.toggleDownIcon;
        var id = data.id,
            isLeaf = data.isLeaf,
            name = data.name,
            nestingLevel = data.nestingLevel;
        var iconUp = toggleUpIcon ||
        /*#__PURE__*/
        react.createElement("span", {
          className: 'node-toggle-icon'
        }, "+");
        var iconDown = toggleDownIcon ||
        /*#__PURE__*/
        react.createElement("span", {
          className: 'node-toggle-icon'
        }, "-");
        return (
          /*#__PURE__*/
          react.createElement("div", {
            style: _objectSpread({}, style),
            className: id === activeNode ? isLeaf ? 'node-wrapper active-node-wrapper' : 'active-not-leaf-node-wrapper' : 'node-wrapper'
          },
          /*#__PURE__*/
          react.createElement("div", {
            style: {
              alignItems: 'baseline',
              display: 'flex',
              justifyContent: 'space-between'
            }
          },
          /*#__PURE__*/
          react.createElement("div", {
            style: {
              paddingTop: "".concat((style.height - 25) / 2, "px"),
              paddingLeft: nestingLevel * style.height + (isLeaf ? 8 : 0)
            },
            className: 'node-name',
            onClick: function onClick(e) {
              return _this.handleClick(e, data);
            }
          }, name), !isLeaf &&
          /*#__PURE__*/
          react.createElement("div", {
            onClick: toggle
          }, isOpen ? iconDown : iconUp)))
        );
      }
    }]);

    return Node;
  }(react_1);

  var VirtualizedMenuTree =
  /*#__PURE__*/
  function (_Component) {
    inherits(VirtualizedMenuTree, _Component);

    function VirtualizedMenuTree(props) {
      var _this;

      classCallCheck(this, VirtualizedMenuTree);

      _this = possibleConstructorReturn(this, getPrototypeOf(VirtualizedMenuTree).call(this, props));

      defineProperty(assertThisInitialized(_this), "nodeCallback", function (e, params) {
        var clickNodeCallback = _this.props.clickNodeCallback;

        _this.setState({
          activeNode: params && params.id || ''
        });

        clickNodeCallback && clickNodeCallback(e, params);
      });

      _this.state = {
        activeNode: ''
      };

      _this.row = function (props) {
        var _this$props = _this.props,
            toggleUpIcon = _this$props.toggleUpIcon,
            toggleDownIcon = _this$props.toggleDownIcon;
        var index = props.index,
            data = props.data,
            style = props.style,
            isScrolling = props.isScrolling;
        var Node = data.component,
            treeData = data.treeData,
            order = data.order,
            records = data.records;
        return (
          /*#__PURE__*/
          react.createElement(Node, _extends_1({}, records[order[index]], {
            style: style,
            activeNode: _this.state.activeNode,
            isScrolling: isScrolling,
            treeData: treeData,
            toggleUpIcon: toggleUpIcon,
            toggleDownIcon: toggleDownIcon
          }))
        );
      };

      return _this;
    }

    createClass(VirtualizedMenuTree, [{
      key: "treeFunction",
      value: function treeFunction(tree) {
        var _marked =
        /*#__PURE__*/
        regenerator.mark(treeWalker);

        var that = this;
        var isOpenByDefault = this.props.isOpenByDefault;
        var isOpen = typeof isOpenByDefault !== 'undefined' ? Boolean(isOpenByDefault) : true;

        function treeWalker(refresh) {
          var stack, _stack$pop, node, nestingLevel, nodeCallback, isOpened, i;

          return regenerator.wrap(function treeWalker$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  stack = []; // Remember all the necessary data of the first node in the stack.

                  stack.push({
                    nestingLevel: 0,
                    node: tree,
                    nodeCallback: that.nodeCallback
                  }); // Walk through the tree until we have no nodes available.

                case 2:
                  if (!(stack.length !== 0)) {
                    _context.next = 10;
                    break;
                  }

                  _stack$pop = stack.pop(), node = _stack$pop.node, nestingLevel = _stack$pop.nestingLevel, nodeCallback = _stack$pop.nodeCallback; // Here we are sending the information about the node to the Tree component
                  // and receive an information about the openness state from it. The
                  // `refresh` parameter tells us if the full update of the tree is requested;
                  // basing on it we decide to return the full node data or only the node
                  // id to update the nodes order.

                  _context.next = 6;
                  return refresh ? {
                    id: node.id,
                    isLeaf: node.children ? node.children.length === 0 : true,
                    isOpenByDefault: isOpen,
                    name: node.name,
                    nestingLevel: nestingLevel,
                    nodeCallback: nodeCallback
                  } : node.id;

                case 6:
                  isOpened = _context.sent;

                  // Basing on the node openness state we are deciding if we need to render
                  // the child nodes (if they exist).
                  if (node.children && node.children.length !== 0 && isOpened) {
                    // Since it is a stack structure, we need to put nodes we want to render
                    // first to the end of the stack.
                    for (i = node.children.length - 1; i >= 0; i--) {
                      stack.push({
                        nestingLevel: nestingLevel + 1,
                        node: node.children[i],
                        nodeCallback: nodeCallback
                      });
                    }
                  }

                  _context.next = 2;
                  break;

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _marked);
        }

        return treeWalker;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            treeData = _this$props2.treeData,
            height = _this$props2.height,
            width = _this$props2.width,
            itemSize = _this$props2.itemSize,
            treeWalker = _this$props2.treeWalker,
            other = objectWithoutProperties(_this$props2, ["treeData", "height", "width", "itemSize", "treeWalker"]);

        return (
          /*#__PURE__*/
          react.createElement(FixedSizeTree, _extends_1({
            treeWalker: treeWalker || this.treeFunction(treeData),
            itemSize: itemSize ? itemSize : 30,
            height: height ? height : 500,
            rowComponent: this.row,
            width: width ? width : '100%'
          }, other), Node)
        );
      }
    }]);

    return VirtualizedMenuTree;
  }(react_1);

  return VirtualizedMenuTree;

})));
