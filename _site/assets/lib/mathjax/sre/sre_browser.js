// Copyright 2014-2021 Volker Sorge
// Copyright (c) 2016-2021 The MathJax Consortium
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
  return (a.raw = a);
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, b) {
  a.raw = b;
  return a;
};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.makeIterator = function (a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function (a) {
  for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
  return c;
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a;
      };
$jscomp.getGlobal = function (a) {
  a = [
    "object" == typeof globalThis && globalThis,
    a,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global
  ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) return a[b];
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function (a, b, c, d) {
  b &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, b, c, d)
      : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function (a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in c)) return;
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d &&
    null != b &&
    $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b });
};
$jscomp.polyfillIsolated = function (a, b, c, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in d)) return;
    d = d[g];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b &&
    (a
      ? $jscomp.defineProperty($jscomp.polyfills, e, {
          configurable: !0,
          writable: !0,
          value: b
        })
      : b !== c &&
        (($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(e)
          : $jscomp.POLYFILL_PREFIX + e),
        (e = $jscomp.propertyToPolyfillSymbol[e]),
        $jscomp.defineProperty(d, e, {
          configurable: !0,
          writable: !0,
          value: b
        })));
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill(
  "Symbol",
  function (a) {
    if (a) return a;
    var b = function (e, f) {
      this.$jscomp$symbol$id_ = e;
      $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: f
      });
    };
    b.prototype.toString = function () {
      return this.$jscomp$symbol$id_;
    };
    var c = 0,
      d = function (e) {
        if (this instanceof d)
          throw new TypeError("Symbol is not a constructor");
        return new b("jscomp_symbol_" + (e || "") + "_" + c++, e);
      };
    return d;
  },
  "es6",
  "es3"
);
$jscomp.initSymbolIterator = function () {};
$jscomp.polyfill(
  "Symbol.iterator",
  function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (
      var b =
          "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
            " "
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = $jscomp.global[b[c]];
      "function" === typeof d &&
        "function" != typeof d.prototype[a] &&
        $jscomp.defineProperty(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
          }
        });
    }
    return a;
  },
  "es6",
  "es3"
);
$jscomp.initSymbolAsyncIterator = function () {};
$jscomp.iteratorPrototype = function (a) {
  a = { next: a };
  a[Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function (a, b) {
  a instanceof String && (a += "");
  var c = 0,
    d = {
      next: function () {
        if (c < a.length) {
          var e = c++;
          return { value: b(e, a[e]), done: !1 };
        }
        d.next = function () {
          return { done: !0, value: void 0 };
        };
        return d.next();
      }
    };
  d[Symbol.iterator] = function () {
    return d;
  };
  return d;
};
$jscomp.polyfill(
  "Array.prototype.keys",
  function (a) {
    return a
      ? a
      : function () {
          return $jscomp.iteratorFromArray(this, function (b) {
            return b;
          });
        };
  },
  "es6",
  "es3"
);
$jscomp.owns = function (a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.assign =
  $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign
    ? Object.assign
    : function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
          var d = arguments[c];
          if (d) for (var e in d) $jscomp.owns(d, e) && (a[e] = d[e]);
        }
        return a;
      };
$jscomp.polyfill(
  "Object.assign",
  function (a) {
    return a || $jscomp.assign;
  },
  "es6",
  "es3"
);
$jscomp.findInternal = function (a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e];
    if (b.call(c, f, e, a)) return { i: e, v: f };
  }
  return { i: -1, v: void 0 };
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (a) {
    return a
      ? a
      : function (b, c) {
          return $jscomp.findInternal(this, b, c).v;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Array.from",
  function (a) {
    return a
      ? a
      : function (b, c, d) {
          c =
            null != c
              ? c
              : function (h) {
                  return h;
                };
          var e = [],
            f =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              b[Symbol.iterator];
          if ("function" == typeof f) {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done; )
              e.push(c.call(d, f.value, g++));
          } else
            for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
          return e;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Object.entries",
  function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) $jscomp.owns(b, d) && c.push([d, b[d]]);
          return c;
        };
  },
  "es8",
  "es3"
);
$jscomp.checkStringArgs = function (a, b, c) {
  if (null == a)
    throw new TypeError(
      "The 'this' value for String.prototype." +
        c +
        " must not be null or undefined"
    );
  if (b instanceof RegExp)
    throw new TypeError(
      "First argument to String.prototype." +
        c +
        " must not be a regular expression"
    );
  return a + "";
};
$jscomp.polyfill(
  "String.prototype.repeat",
  function (a) {
    return a
      ? a
      : function (b) {
          var c = $jscomp.checkStringArgs(this, null, "repeat");
          if (0 > b || 1342177279 < b)
            throw new RangeError("Invalid count value");
          b |= 0;
          for (var d = ""; b; ) if ((b & 1 && (d += c), (b >>>= 1))) c += c;
          return d;
        };
  },
  "es6",
  "es3"
);
var COMPILED = !0,
  goog = goog || {};
goog.global = this || self;
goog.exportPath_ = function (a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c ||
    "undefined" == typeof c.execScript ||
    c.execScript("var " + a[0]);
  for (var d; a.length && (d = a.shift()); )
    a.length || void 0 === b
      ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}))
      : (c[d] = b);
};
goog.define = function (a, b) {
  if (!COMPILED) {
    var c = goog.global.CLOSURE_UNCOMPILED_DEFINES,
      d = goog.global.CLOSURE_DEFINES;
    c && void 0 === c.nodeType && Object.prototype.hasOwnProperty.call(c, a)
      ? (b = c[a])
      : d &&
        void 0 === d.nodeType &&
        Object.prototype.hasOwnProperty.call(d, a) &&
        (b = d[a]);
  }
  return b;
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function (a) {
  if (goog.isInModuleLoader_())
    throw Error("goog.provide cannot be used within a module.");
  if (!COMPILED && goog.isProvided_(a))
    throw Error('Namespace "' + a + '" already declared.');
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function (a, b) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (
      var c = a;
      (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);

    )
      goog.implicitNamespaces_[c] = !0;
  }
  goog.exportPath_(a, b);
};
goog.getScriptNonce = function (a) {
  if (a && a != goog.global) return goog.getScriptNonce_(a.document);
  null === goog.cspNonce_ &&
    (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document));
  return goog.cspNonce_;
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.cspNonce_ = null;
goog.getScriptNonce_ = function (a) {
  return (a = a.querySelector && a.querySelector("script[nonce]")) &&
    (a = a.nonce || a.getAttribute("nonce")) &&
    goog.NONCE_PATTERN_.test(a)
    ? a
    : "";
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function (a) {
  if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_))
    throw Error("Invalid module identifier");
  if (!goog.isInGoogModuleLoader_())
    throw Error(
      "Module " +
        a +
        " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide."
    );
  if (goog.moduleLoaderState_.moduleName)
    throw Error("goog.module may only be called once per module.");
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a))
      throw Error('Namespace "' + a + '" already declared.');
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function (a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function (a) {
  if (!COMPILED) {
    if (a in goog.loadedModules_) return goog.loadedModules_[a].exports;
    if (!goog.implicitNamespaces_[a])
      return (a = goog.getObjectByName(a)), null != a ? a : null;
  }
  return null;
};
goog.ModuleType = { ES6: "es6", GOOG: "goog" };
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function () {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function () {
  return (
    !!goog.moduleLoaderState_ &&
    goog.moduleLoaderState_.type == goog.ModuleType.GOOG
  );
};
goog.isInEs6ModuleLoader_ = function () {
  if (
    goog.moduleLoaderState_ &&
    goog.moduleLoaderState_.type == goog.ModuleType.ES6
  )
    return !0;
  var a = goog.global.$jscomp;
  return a
    ? "function" != typeof a.getCurrentModulePath
      ? !1
      : !!a.getCurrentModulePath()
    : !1;
};
goog.module.declareLegacyNamespace = function () {
  if (!COMPILED && !goog.isInGoogModuleLoader_())
    throw Error(
      "goog.module.declareLegacyNamespace must be called from within a goog.module"
    );
  if (!COMPILED && !goog.moduleLoaderState_.moduleName)
    throw Error(
      "goog.module must be called prior to goog.module.declareLegacyNamespace."
    );
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.declareModuleId = function (a) {
  if (!COMPILED) {
    if (!goog.isInEs6ModuleLoader_())
      throw Error(
        "goog.declareModuleId may only be called from within an ES6 module"
      );
    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName)
      throw Error("goog.declareModuleId may only be called once per module.");
    if (a in goog.loadedModules_)
      throw Error('Module with namespace "' + a + '" already exists.');
  }
  if (goog.moduleLoaderState_) goog.moduleLoaderState_.moduleName = a;
  else {
    var b = goog.global.$jscomp;
    if (!b || "function" != typeof b.getCurrentModulePath)
      throw Error(
        'Module with namespace "' + a + '" has been loaded incorrectly.'
      );
    b = b.require(b.getCurrentModulePath());
    goog.loadedModules_[a] = {
      exports: b,
      type: goog.ModuleType.ES6,
      moduleId: a
    };
  }
};
goog.setTestOnly = function (a) {
  if (goog.DISALLOW_TEST_ONLY_CODE)
    throw (
      ((a = a || ""),
      Error(
        "Importing test-only code into non-debug environment" +
          (a ? ": " + a : ".")
      ))
    );
};
goog.forwardDeclare = function (a) {};
COMPILED ||
  ((goog.isProvided_ = function (a) {
    return (
      a in goog.loadedModules_ ||
      (!goog.implicitNamespaces_[a] && null != goog.getObjectByName(a))
    );
  }),
  (goog.implicitNamespaces_ = { "goog.module": !0 }));
goog.getObjectByName = function (a, b) {
  a = a.split(".");
  b = b || goog.global;
  for (var c = 0; c < a.length; c++)
    if (((b = b[a[c]]), null == b)) return null;
  return b;
};
goog.globalize = function (a, b) {
  b = b || goog.global;
  for (var c in a) b[c] = a[c];
};
goog.addDependency = function (a, b, c, d) {
  !COMPILED &&
    goog.DEPENDENCIES_ENABLED &&
    goog.debugLoader_.addDependency(a, b, c, d);
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function (a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function (a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(a);
    if (goog.isProvided_(a)) {
      if (goog.isInModuleLoader_()) return goog.module.getInternal_(a);
    } else if (goog.ENABLE_DEBUG_LOADER) {
      var b = goog.moduleLoaderState_;
      goog.moduleLoaderState_ = null;
      try {
        goog.debugLoader_.load_(a);
      } finally {
        goog.moduleLoaderState_ = b;
      }
    }
    return null;
  }
};
goog.requireType = function (a) {
  return {};
};
goog.basePath = "";
goog.nullFunction = function () {};
goog.abstractMethod = function () {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function (a) {
  a.instance_ = void 0;
  a.getInstance = function () {
    if (a.instance_) return a.instance_;
    goog.DEBUG &&
      (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return (a.instance_ = new a());
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRANSPILE_TO_LANGUAGE = "";
goog.TRANSPILER = "transpile.js";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function () {
  if (null == goog.hasBadLetScoping) {
    try {
      var a = !eval(
        '"use strict";let x = 1; function f() { return typeof x; };f() == "number";'
      );
    } catch (b) {
      a = !1;
    }
    goog.hasBadLetScoping = a;
  }
  return goog.hasBadLetScoping;
};
goog.workaroundSafari10EvalBug = function (a) {
  return "(function(){" + a + "\n;})();\n";
};
goog.loadModule = function (a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {
      moduleName: "",
      declareLegacyNamespace: !1,
      type: goog.ModuleType.GOOG
    };
    if (goog.isFunction(a)) var c = a.call(void 0, {});
    else if ("string" === typeof a)
      goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)),
        (c = goog.loadModuleFromSource_.call(void 0, a));
    else throw Error("Invalid module definition");
    var d = goog.moduleLoaderState_.moduleName;
    if ("string" === typeof d && d)
      goog.moduleLoaderState_.declareLegacyNamespace
        ? goog.constructNamespace_(d, c)
        : goog.SEAL_MODULE_EXPORTS &&
          Object.seal &&
          "object" == typeof c &&
          null != c &&
          Object.seal(c),
        (goog.loadedModules_[d] = {
          exports: c,
          type: goog.ModuleType.GOOG,
          moduleId: goog.moduleLoaderState_.moduleName
        });
    else throw Error('Invalid module name "' + d + '"');
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function (a) {
  eval(a);
  return {};
};
goog.normalizePath_ = function (a) {
  a = a.split("/");
  for (var b = 0; b < a.length; )
    "." == a[b]
      ? a.splice(b, 1)
      : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1]
      ? a.splice(--b, 2)
      : b++;
  return a.join("/");
};
goog.loadFileSync_ = function (a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC)
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  try {
    var b = new goog.global.XMLHttpRequest();
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.transpile_ = function (a, b, c) {
  var d = goog.global.$jscomp;
  d || (goog.global.$jscomp = d = {});
  var e = d.transpile;
  if (!e) {
    var f = goog.basePath + goog.TRANSPILER,
      g = goog.loadFileSync_(f);
    if (g) {
      (function () {
        (0, eval)(g + "\n//# sourceURL=" + f);
      }).call(goog.global);
      if (
        goog.global.$gwtExport &&
        goog.global.$gwtExport.$jscomp &&
        !goog.global.$gwtExport.$jscomp.transpile
      )
        throw Error(
          'The transpiler did not properly export the "transpile" method. $gwtExport: ' +
            JSON.stringify(goog.global.$gwtExport)
        );
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      d = goog.global.$jscomp;
      e = d.transpile;
    }
  }
  e ||
    (e = d.transpile =
      function (h, k) {
        goog.logToConsole_(
          k + " requires transpilation but no transpiler was found."
        );
        return h;
      });
  return e(a, b, c);
};
goog.typeOf = function (a) {
  var b = typeof a;
  if ("object" == b)
    if (a) {
      if (a instanceof Array) return "array";
      if (a instanceof Object) return b;
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) return "object";
      if (
        "[object Array]" == c ||
        ("number" == typeof a.length &&
          "undefined" != typeof a.splice &&
          "undefined" != typeof a.propertyIsEnumerable &&
          !a.propertyIsEnumerable("splice"))
      )
        return "array";
      if (
        "[object Function]" == c ||
        ("undefined" != typeof a.call &&
          "undefined" != typeof a.propertyIsEnumerable &&
          !a.propertyIsEnumerable("call"))
      )
        return "function";
    } else return "null";
  else if ("function" == b && "undefined" == typeof a.call) return "object";
  return b;
};
goog.isArray = function (a) {
  return Array.isArray(a);
};
goog.isArrayLike = function (a) {
  var b = goog.typeOf(a);
  return "array" == b || ("object" == b && "number" == typeof a.length);
};
goog.isDateLike = function (a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isFunction = function (a) {
  return "function" == goog.typeOf(a);
};
goog.isObject = function (a) {
  var b = typeof a;
  return ("object" == b && null != a) || "function" == b;
};
goog.getUid = function (a) {
  return (
    (Object.prototype.hasOwnProperty.call(a, goog.UID_PROPERTY_) &&
      a[goog.UID_PROPERTY_]) ||
    (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
  );
};
goog.hasUid = function (a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function (a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function (a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if ("function" === typeof a.clone) return a.clone();
    b = "array" == b ? [] : {};
    for (var c in a) b[c] = goog.cloneObject(a[c]);
    return b;
  }
  return a;
};
goog.bindNative_ = function (a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function (a, b, c) {
  if (!a) throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function () {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }
  return function () {
    return a.apply(b, arguments);
  };
};
goog.bind = function (a, b, c) {
  Function.prototype.bind &&
  -1 != Function.prototype.bind.toString().indexOf("native code")
    ? (goog.bind = goog.bindNative_)
    : (goog.bind = goog.bindJs_);
  return goog.bind.apply(null, arguments);
};
goog.partial = function (a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function () {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
};
goog.mixin = function (a, b) {
  for (var c in b) a[c] = b[c];
};
goog.now =
  (goog.TRUSTED_SITE && Date.now) ||
  function () {
    return +new Date();
  };
goog.globalEval = function (a) {
  if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
  else if (goog.global.eval) {
    if (null == goog.evalWorks_)
      try {
        goog.global.eval(""), (goog.evalWorks_ = !0);
      } catch (d) {
        goog.evalWorks_ = !1;
      }
    if (goog.evalWorks_) goog.global.eval(a);
    else {
      var b = goog.global.document,
        c = b.createElement("script");
      c.type = "text/javascript";
      c.defer = !1;
      c.appendChild(b.createTextNode(a));
      b.head.appendChild(c);
      b.head.removeChild(c);
    }
  } else throw Error("goog.globalEval not available");
};
goog.evalWorks_ = null;
goog.getCssName = function (a, b) {
  if ("." == String(a).charAt(0))
    throw Error(
      'className passed in goog.getCssName must not start with ".". You passed: ' +
        a
    );
  var c = function (e) {
      return goog.cssNameMapping_[e] || e;
    },
    d = function (e) {
      e = e.split("-");
      for (var f = [], g = 0; g < e.length; g++) f.push(c(e[g]));
      return f.join("-");
    };
  d = goog.cssNameMapping_
    ? "BY_WHOLE" == goog.cssNameMappingStyle_
      ? c
      : d
    : function (e) {
        return e;
      };
  a = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN
    ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a)
    : a;
};
goog.setCssNameMapping = function (a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED &&
  goog.global.CLOSURE_CSS_NAME_MAPPING &&
  (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function (a, b, c) {
  c && c.html && (a = a.replace(/</g, "&lt;"));
  b &&
    (a = a.replace(/\{\$([^}]+)}/g, function (d, e) {
      return null != b && e in b ? b[e] : d;
    }));
  return a;
};
goog.getMsgWithFallback = function (a, b) {
  return a;
};
goog.exportSymbol = function (a, b, c) {
  goog.exportPath_(a, b, c);
};
goog.exportProperty = function (a, b, c) {
  a[b] = c;
};
goog.inherits = function (a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.base = function (d, e, f) {
    for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
      g[h - 2] = arguments[h];
    return b.prototype[e].apply(d, g);
  };
};
goog.scope = function (a) {
  if (goog.isInModuleLoader_())
    throw Error("goog.scope is not supported within a module.");
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function (a, b) {
  var c = b.constructor,
    d = b.statics;
  (c && c != Object.prototype.constructor) ||
    (c = function () {
      throw Error("cannot instantiate an interface (no constructor defined).");
    });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d &&
    (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function (a, b) {
  return goog.defineClass.SEAL_CLASS_INSTANCES
    ? function () {
        var c = a.apply(this, arguments) || this;
        c[goog.UID_PROPERTY_] = c[goog.UID_PROPERTY_];
        return c;
      }
    : a;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ =
  "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
    " "
  );
goog.defineClass.applyProperties_ = function (a, b) {
  for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++)
    (c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d]),
      Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
};
!COMPILED &&
  goog.DEPENDENCIES_ENABLED &&
  ((goog.inHtmlDocument_ = function () {
    var a = goog.global.document;
    return null != a && "write" in a;
  }),
  (goog.isDocumentLoading_ = function () {
    var a = goog.global.document;
    return a.attachEvent
      ? "complete" != a.readyState
      : "loading" == a.readyState;
  }),
  (goog.findBasePath_ = function () {
    if (
      void 0 != goog.global.CLOSURE_BASE_PATH &&
      "string" === typeof goog.global.CLOSURE_BASE_PATH
    )
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
    else if (goog.inHtmlDocument_()) {
      var a = goog.global.document,
        b = a.currentScript;
      a = b ? [b] : a.getElementsByTagName("SCRIPT");
      for (b = a.length - 1; 0 <= b; --b) {
        var c = a[b].src,
          d = c.lastIndexOf("?");
        d = -1 == d ? c.length : d;
        if ("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break;
        }
      }
    }
  }),
  goog.findBasePath_(),
  (goog.Transpiler = function () {
    this.requiresTranspilation_ = null;
    this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE;
  }),
  (goog.Transpiler.prototype.createRequiresTranspilation_ = function () {
    function a(g, h) {
      e ? (d[g] = !0) : h() ? ((c = g), (d[g] = !1)) : (e = d[g] = !0);
    }
    function b(g) {
      try {
        return !!eval(g);
      } catch (h) {
        return !1;
      }
    }
    var c = "es3",
      d = { es3: !1 },
      e = !1,
      f =
        goog.global.navigator && goog.global.navigator.userAgent
          ? goog.global.navigator.userAgent
          : "";
    a("es5", function () {
      return b("[1,].length==1");
    });
    a("es6", function () {
      return f.match(/Edge\/(\d+)(\.\d)*/i)
        ? !1
        : b(
            '(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()'
          );
    });
    a("es7", function () {
      return b("2 ** 2 == 4");
    });
    a("es8", function () {
      return b("async () => 1, true");
    });
    a("es9", function () {
      return b("({...rest} = {}), true");
    });
    a("es_next", function () {
      return !1;
    });
    return { target: c, map: d };
  }),
  (goog.Transpiler.prototype.needsTranspile = function (a, b) {
    if ("always" == goog.TRANSPILE) return !0;
    if ("never" == goog.TRANSPILE) return !1;
    if (!this.requiresTranspilation_) {
      var c = this.createRequiresTranspilation_();
      this.requiresTranspilation_ = c.map;
      this.transpilationTarget_ = this.transpilationTarget_ || c.target;
    }
    if (a in this.requiresTranspilation_)
      return this.requiresTranspilation_[a]
        ? !0
        : !goog.inHtmlDocument_() ||
          "es6" != b ||
          "noModule" in goog.global.document.createElement("script")
        ? !1
        : !0;
    throw Error("Unknown language mode: " + a);
  }),
  (goog.Transpiler.prototype.transpile = function (a, b) {
    return goog.transpile_(a, b, this.transpilationTarget_);
  }),
  (goog.transpiler_ = new goog.Transpiler()),
  (goog.protectScriptTag_ = function (a) {
    return a.replace(/<\/(SCRIPT)/gi, "\\x3c/$1");
  }),
  (goog.DebugLoader_ = function () {
    this.dependencies_ = {};
    this.idToPath_ = {};
    this.written_ = {};
    this.loadingDeps_ = [];
    this.depsToLoad_ = [];
    this.paused_ = !1;
    this.factory_ = new goog.DependencyFactory(goog.transpiler_);
    this.deferredCallbacks_ = {};
    this.deferredQueue_ = [];
  }),
  (goog.DebugLoader_.prototype.bootstrap = function (a, b) {
    function c() {
      d && (goog.global.setTimeout(d, 0), (d = null));
    }
    var d = b;
    if (a.length) {
      b = [];
      for (var e = 0; e < a.length; e++) {
        var f = this.getPathFromDeps_(a[e]);
        if (!f) throw Error("Unregonized namespace: " + a[e]);
        b.push(this.dependencies_[f]);
      }
      f = goog.require;
      var g = 0;
      for (e = 0; e < a.length; e++)
        f(a[e]),
          b[e].onLoad(function () {
            ++g == a.length && c();
          });
    } else c();
  }),
  (goog.DebugLoader_.prototype.loadClosureDeps = function () {
    this.depsToLoad_.push(
      this.factory_.createDependency(
        goog.normalizePath_(goog.basePath + "deps.js"),
        "deps.js",
        [],
        [],
        {},
        !1
      )
    );
    this.loadDeps_();
  }),
  (goog.DebugLoader_.prototype.requested = function (a, b) {
    (a = this.getPathFromDeps_(a)) &&
      (b || this.areDepsLoaded_(this.dependencies_[a].requires)) &&
      (b = this.deferredCallbacks_[a]) &&
      (delete this.deferredCallbacks_[a], b());
  }),
  (goog.DebugLoader_.prototype.setDependencyFactory = function (a) {
    this.factory_ = a;
  }),
  (goog.DebugLoader_.prototype.load_ = function (a) {
    if (this.getPathFromDeps_(a)) {
      var b = this,
        c = [],
        d = function (e) {
          var f = b.getPathFromDeps_(e);
          if (!f) throw Error("Bad dependency path or symbol: " + e);
          if (!b.written_[f]) {
            b.written_[f] = !0;
            e = b.dependencies_[f];
            for (f = 0; f < e.requires.length; f++)
              goog.isProvided_(e.requires[f]) || d(e.requires[f]);
            c.push(e);
          }
        };
      d(a);
      a = !!this.depsToLoad_.length;
      this.depsToLoad_ = this.depsToLoad_.concat(c);
      this.paused_ || a || this.loadDeps_();
    } else
      throw (
        ((a = "goog.require could not find: " + a),
        goog.logToConsole_(a),
        Error(a))
      );
  }),
  (goog.DebugLoader_.prototype.loadDeps_ = function () {
    for (var a = this, b = this.paused_; this.depsToLoad_.length && !b; )
      (function () {
        var c = !1,
          d = a.depsToLoad_.shift(),
          e = !1;
        a.loading_(d);
        var f = {
          pause: function () {
            if (c) throw Error("Cannot call pause after the call to load.");
            b = !0;
          },
          resume: function () {
            c ? a.resume_() : (b = !1);
          },
          loaded: function () {
            if (e) throw Error("Double call to loaded.");
            e = !0;
            a.loaded_(d);
          },
          pending: function () {
            for (var g = [], h = 0; h < a.loadingDeps_.length; h++)
              g.push(a.loadingDeps_[h]);
            return g;
          },
          setModuleState: function (g) {
            goog.moduleLoaderState_ = {
              type: g,
              moduleName: "",
              declareLegacyNamespace: !1
            };
          },
          registerEs6ModuleExports: function (g, h, k) {
            k &&
              (goog.loadedModules_[k] = {
                exports: h,
                type: goog.ModuleType.ES6,
                moduleId: k || ""
              });
          },
          registerGoogModuleExports: function (g, h) {
            goog.loadedModules_[g] = {
              exports: h,
              type: goog.ModuleType.GOOG,
              moduleId: g
            };
          },
          clearModuleState: function () {
            goog.moduleLoaderState_ = null;
          },
          defer: function (g) {
            if (c)
              throw Error("Cannot register with defer after the call to load.");
            a.defer_(d, g);
          },
          areDepsLoaded: function () {
            return a.areDepsLoaded_(d.requires);
          }
        };
        try {
          d.load(f);
        } finally {
          c = !0;
        }
      })();
    b && this.pause_();
  }),
  (goog.DebugLoader_.prototype.pause_ = function () {
    this.paused_ = !0;
  }),
  (goog.DebugLoader_.prototype.resume_ = function () {
    this.paused_ && ((this.paused_ = !1), this.loadDeps_());
  }),
  (goog.DebugLoader_.prototype.loading_ = function (a) {
    this.loadingDeps_.push(a);
  }),
  (goog.DebugLoader_.prototype.loaded_ = function (a) {
    for (var b = 0; b < this.loadingDeps_.length; b++)
      if (this.loadingDeps_[b] == a) {
        this.loadingDeps_.splice(b, 1);
        break;
      }
    for (b = 0; b < this.deferredQueue_.length; b++)
      if (this.deferredQueue_[b] == a.path) {
        this.deferredQueue_.splice(b, 1);
        break;
      }
    if (
      this.loadingDeps_.length == this.deferredQueue_.length &&
      !this.depsToLoad_.length
    )
      for (; this.deferredQueue_.length; )
        this.requested(this.deferredQueue_.shift(), !0);
    a.loaded();
  }),
  (goog.DebugLoader_.prototype.areDepsLoaded_ = function (a) {
    for (var b = 0; b < a.length; b++) {
      var c = this.getPathFromDeps_(a[b]);
      if (!c || !(c in this.deferredCallbacks_ || goog.isProvided_(a[b])))
        return !1;
    }
    return !0;
  }),
  (goog.DebugLoader_.prototype.getPathFromDeps_ = function (a) {
    return a in this.idToPath_
      ? this.idToPath_[a]
      : a in this.dependencies_
      ? a
      : null;
  }),
  (goog.DebugLoader_.prototype.defer_ = function (a, b) {
    this.deferredCallbacks_[a.path] = b;
    this.deferredQueue_.push(a.path);
  }),
  (goog.LoadController = function () {}),
  (goog.LoadController.prototype.pause = function () {}),
  (goog.LoadController.prototype.resume = function () {}),
  (goog.LoadController.prototype.loaded = function () {}),
  (goog.LoadController.prototype.pending = function () {}),
  (goog.LoadController.prototype.registerEs6ModuleExports = function (
    a,
    b,
    c
  ) {}),
  (goog.LoadController.prototype.setModuleState = function (a) {}),
  (goog.LoadController.prototype.clearModuleState = function () {}),
  (goog.LoadController.prototype.defer = function (a) {}),
  (goog.LoadController.prototype.areDepsLoaded = function () {}),
  (goog.Dependency = function (a, b, c, d, e) {
    this.path = a;
    this.relativePath = b;
    this.provides = c;
    this.requires = d;
    this.loadFlags = e;
    this.loaded_ = !1;
    this.loadCallbacks_ = [];
  }),
  (goog.Dependency.prototype.getPathName = function () {
    var a = this.path,
      b = a.indexOf("://");
    0 <= b &&
      ((a = a.substring(b + 3)),
      (b = a.indexOf("/")),
      0 <= b && (a = a.substring(b + 1)));
    return a;
  }),
  (goog.Dependency.prototype.onLoad = function (a) {
    this.loaded_ ? a() : this.loadCallbacks_.push(a);
  }),
  (goog.Dependency.prototype.loaded = function () {
    this.loaded_ = !0;
    var a = this.loadCallbacks_;
    this.loadCallbacks_ = [];
    for (var b = 0; b < a.length; b++) a[b]();
  }),
  (goog.Dependency.defer_ = !1),
  (goog.Dependency.callbackMap_ = {}),
  (goog.Dependency.registerCallback_ = function (a) {
    var b = Math.random().toString(32);
    goog.Dependency.callbackMap_[b] = a;
    return b;
  }),
  (goog.Dependency.unregisterCallback_ = function (a) {
    delete goog.Dependency.callbackMap_[a];
  }),
  (goog.Dependency.callback_ = function (a, b) {
    if (a in goog.Dependency.callbackMap_) {
      for (
        var c = goog.Dependency.callbackMap_[a], d = [], e = 1;
        e < arguments.length;
        e++
      )
        d.push(arguments[e]);
      c.apply(void 0, d);
    } else
      throw Error(
        "Callback key " +
          a +
          " does not exist (was base.js loaded more than once?)."
      );
  }),
  (goog.Dependency.prototype.load = function (a) {
    if (goog.global.CLOSURE_IMPORT_SCRIPT)
      goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
    else if (goog.inHtmlDocument_()) {
      var b = goog.global.document;
      if (
        "complete" == b.readyState &&
        !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING
      ) {
        if (/\bdeps.js$/.test(this.path)) {
          a.loaded();
          return;
        }
        throw Error('Cannot write "' + this.path + '" after document load');
      }
      if (
        !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING &&
        goog.isDocumentLoading_()
      ) {
        var c = goog.Dependency.registerCallback_(function (f) {
            (goog.DebugLoader_.IS_OLD_IE_ && "complete" != f.readyState) ||
              (goog.Dependency.unregisterCallback_(c), a.loaded());
          }),
          d =
            !goog.DebugLoader_.IS_OLD_IE_ && goog.getScriptNonce()
              ? ' nonce="' + goog.getScriptNonce() + '"'
              : "";
        d =
          '<script src="' +
          this.path +
          '" ' +
          (goog.DebugLoader_.IS_OLD_IE_ ? "onreadystatechange" : "onload") +
          "=\"goog.Dependency.callback_('" +
          c +
          '\', this)" type="text/javascript" ' +
          (goog.Dependency.defer_ ? "defer" : "") +
          d +
          ">\x3c/script>";
        b.write(
          goog.TRUSTED_TYPES_POLICY_
            ? goog.TRUSTED_TYPES_POLICY_.createHTML(d)
            : d
        );
      } else {
        var e = b.createElement("script");
        e.defer = goog.Dependency.defer_;
        e.async = !1;
        e.type = "text/javascript";
        (d = goog.getScriptNonce()) && e.setAttribute("nonce", d);
        goog.DebugLoader_.IS_OLD_IE_
          ? (a.pause(),
            (e.onreadystatechange = function () {
              if ("loaded" == e.readyState || "complete" == e.readyState)
                a.loaded(), a.resume();
            }))
          : (e.onload = function () {
              e.onload = null;
              a.loaded();
            });
        e.src = goog.TRUSTED_TYPES_POLICY_
          ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path)
          : this.path;
        b.head.appendChild(e);
      }
    } else
      goog.logToConsole_(
        "Cannot use default debug loader outside of HTML documents."
      ),
        "deps.js" == this.relativePath
          ? (goog.logToConsole_(
              "Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."
            ),
            a.loaded())
          : a.pause();
  }),
  (goog.Es6ModuleDependency = function (a, b, c, d, e) {
    goog.Dependency.call(this, a, b, c, d, e);
  }),
  goog.inherits(goog.Es6ModuleDependency, goog.Dependency),
  (goog.Es6ModuleDependency.prototype.load = function (a) {
    function b(l, m) {
      l = m
        ? '<script type="module" crossorigin>' + m + "\x3c/script>"
        : '<script type="module" crossorigin src="' + l + '">\x3c/script>';
      d.write(
        goog.TRUSTED_TYPES_POLICY_
          ? goog.TRUSTED_TYPES_POLICY_.createHTML(l)
          : l
      );
    }
    function c(l, m) {
      var n = d.createElement("script");
      n.defer = !0;
      n.async = !1;
      n.type = "module";
      n.setAttribute("crossorigin", !0);
      var p = goog.getScriptNonce();
      p && n.setAttribute("nonce", p);
      m
        ? (n.textContent = goog.TRUSTED_TYPES_POLICY_
            ? goog.TRUSTED_TYPES_POLICY_.createScript(m)
            : m)
        : (n.src = goog.TRUSTED_TYPES_POLICY_
            ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(l)
            : l);
      d.head.appendChild(n);
    }
    if (goog.global.CLOSURE_IMPORT_SCRIPT)
      goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
    else if (goog.inHtmlDocument_()) {
      var d = goog.global.document,
        e = this;
      if (goog.isDocumentLoading_()) {
        var f = b;
        goog.Dependency.defer_ = !0;
      } else f = c;
      var g = goog.Dependency.registerCallback_(function () {
        goog.Dependency.unregisterCallback_(g);
        a.setModuleState(goog.ModuleType.ES6);
      });
      f(void 0, 'goog.Dependency.callback_("' + g + '")');
      f(this.path, void 0);
      var h = goog.Dependency.registerCallback_(function (l) {
        goog.Dependency.unregisterCallback_(h);
        a.registerEs6ModuleExports(
          e.path,
          l,
          goog.moduleLoaderState_.moduleName
        );
      });
      f(
        void 0,
        'import * as m from "' +
          this.path +
          '"; goog.Dependency.callback_("' +
          h +
          '", m)'
      );
      var k = goog.Dependency.registerCallback_(function () {
        goog.Dependency.unregisterCallback_(k);
        a.clearModuleState();
        a.loaded();
      });
      f(void 0, 'goog.Dependency.callback_("' + k + '")');
    } else
      goog.logToConsole_(
        "Cannot use default debug loader outside of HTML documents."
      ),
        a.pause();
  }),
  (goog.TransformedDependency = function (a, b, c, d, e) {
    goog.Dependency.call(this, a, b, c, d, e);
    this.contents_ = null;
    this.lazyFetch_ =
      !goog.inHtmlDocument_() ||
      !("noModule" in goog.global.document.createElement("script"));
  }),
  goog.inherits(goog.TransformedDependency, goog.Dependency),
  (goog.TransformedDependency.prototype.load = function (a) {
    function b() {
      e.contents_ = goog.loadFileSync_(e.path);
      e.contents_ &&
        ((e.contents_ = e.transform(e.contents_)),
        e.contents_ && (e.contents_ += "\n//# sourceURL=" + e.path));
    }
    function c() {
      e.lazyFetch_ && b();
      if (e.contents_) {
        f && a.setModuleState(goog.ModuleType.ES6);
        try {
          var m = e.contents_;
          e.contents_ = null;
          goog.globalEval(m);
          if (f) var n = goog.moduleLoaderState_.moduleName;
        } finally {
          f && a.clearModuleState();
        }
        f &&
          goog.global.$jscomp.require.ensure([e.getPathName()], function () {
            a.registerEs6ModuleExports(
              e.path,
              goog.global.$jscomp.require(e.getPathName()),
              n
            );
          });
        a.loaded();
      }
    }
    function d() {
      var m = goog.global.document,
        n = goog.Dependency.registerCallback_(function () {
          goog.Dependency.unregisterCallback_(n);
          c();
        }),
        p =
          '<script type="text/javascript">' +
          goog.protectScriptTag_('goog.Dependency.callback_("' + n + '");') +
          "\x3c/script>";
      m.write(
        goog.TRUSTED_TYPES_POLICY_
          ? goog.TRUSTED_TYPES_POLICY_.createHTML(p)
          : p
      );
    }
    var e = this;
    if (goog.global.CLOSURE_IMPORT_SCRIPT)
      b(),
        this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_)
          ? ((this.contents_ = null), a.loaded())
          : a.pause();
    else {
      var f = this.loadFlags.module == goog.ModuleType.ES6;
      this.lazyFetch_ || b();
      var g = 1 < a.pending().length,
        h = g && goog.DebugLoader_.IS_OLD_IE_;
      g = goog.Dependency.defer_ && (g || goog.isDocumentLoading_());
      if (h || g)
        a.defer(function () {
          c();
        });
      else {
        var k = goog.global.document;
        h = goog.inHtmlDocument_() && "ActiveXObject" in goog.global;
        if (f && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !h) {
          goog.Dependency.defer_ = !0;
          a.pause();
          var l = k.onreadystatechange;
          k.onreadystatechange = function () {
            "interactive" == k.readyState &&
              ((k.onreadystatechange = l), c(), a.resume());
            goog.isFunction(l) && l.apply(void 0, arguments);
          };
        } else
          !goog.DebugLoader_.IS_OLD_IE_ &&
          goog.inHtmlDocument_() &&
          goog.isDocumentLoading_()
            ? d()
            : c();
      }
    }
  }),
  (goog.TransformedDependency.prototype.transform = function (a) {}),
  (goog.TranspiledDependency = function (a, b, c, d, e, f) {
    goog.TransformedDependency.call(this, a, b, c, d, e);
    this.transpiler = f;
  }),
  goog.inherits(goog.TranspiledDependency, goog.TransformedDependency),
  (goog.TranspiledDependency.prototype.transform = function (a) {
    return this.transpiler.transpile(a, this.getPathName());
  }),
  (goog.PreTranspiledEs6ModuleDependency = function (a, b, c, d, e) {
    goog.TransformedDependency.call(this, a, b, c, d, e);
  }),
  goog.inherits(
    goog.PreTranspiledEs6ModuleDependency,
    goog.TransformedDependency
  ),
  (goog.PreTranspiledEs6ModuleDependency.prototype.transform = function (a) {
    return a;
  }),
  (goog.GoogModuleDependency = function (a, b, c, d, e, f, g) {
    goog.TransformedDependency.call(this, a, b, c, d, e);
    this.needsTranspile_ = f;
    this.transpiler_ = g;
  }),
  goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency),
  (goog.GoogModuleDependency.prototype.transform = function (a) {
    this.needsTranspile_ &&
      (a = this.transpiler_.transpile(a, this.getPathName()));
    return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON
      ? "goog.loadModule(" +
          goog.global.JSON.stringify(
            a + "\n//# sourceURL=" + this.path + "\n"
          ) +
          ");"
      : 'goog.loadModule(function(exports) {"use strict";' +
          a +
          "\n;return exports});\n//# sourceURL=" +
          this.path +
          "\n";
  }),
  (goog.DebugLoader_.IS_OLD_IE_ = !(
    goog.global.atob ||
    !goog.global.document ||
    !goog.global.document.all
  )),
  (goog.DebugLoader_.prototype.addDependency = function (a, b, c, d) {
    b = b || [];
    a = a.replace(/\\/g, "/");
    var e = goog.normalizePath_(goog.basePath + a);
    (d && "boolean" !== typeof d) ||
      (d = d ? { module: goog.ModuleType.GOOG } : {});
    c = this.factory_.createDependency(
      e,
      a,
      b,
      c,
      d,
      goog.transpiler_.needsTranspile(d.lang || "es3", d.module)
    );
    this.dependencies_[e] = c;
    for (c = 0; c < b.length; c++) this.idToPath_[b[c]] = e;
    this.idToPath_[a] = e;
  }),
  (goog.DependencyFactory = function (a) {
    this.transpiler = a;
  }),
  (goog.DependencyFactory.prototype.createDependency = function (
    a,
    b,
    c,
    d,
    e,
    f
  ) {
    return e.module == goog.ModuleType.GOOG
      ? new goog.GoogModuleDependency(a, b, c, d, e, f, this.transpiler)
      : f
      ? new goog.TranspiledDependency(a, b, c, d, e, this.transpiler)
      : e.module == goog.ModuleType.ES6
      ? "never" == goog.TRANSPILE && goog.ASSUME_ES_MODULES_TRANSPILED
        ? new goog.PreTranspiledEs6ModuleDependency(a, b, c, d, e)
        : new goog.Es6ModuleDependency(a, b, c, d, e)
      : new goog.Dependency(a, b, c, d, e);
  }),
  (goog.debugLoader_ = new goog.DebugLoader_()),
  (goog.loadClosureDeps = function () {
    goog.debugLoader_.loadClosureDeps();
  }),
  (goog.setDependencyFactory = function (a) {
    goog.debugLoader_.setDependencyFactory(a);
  }),
  (goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME
    ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base")
    : null),
  goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(),
  (goog.bootstrap = function (a, b) {
    goog.debugLoader_.bootstrap(a, b);
  }));
goog.TRUSTED_TYPES_POLICY_NAME = "";
goog.identity_ = function (a) {
  return a;
};
goog.createTrustedTypesPolicy = function (a) {
  var b = null,
    c = goog.global.trustedTypes;
  if (!c || !c.createPolicy) return b;
  try {
    b = c.createPolicy(a, {
      createHTML: goog.identity_,
      createScript: goog.identity_,
      createScriptURL: goog.identity_
    });
  } catch (d) {
    goog.logToConsole_(d.message);
  }
  return b;
};
var sre = { Variables: function () {} };
sre.Variables.VERSION = "3.3.3";
sre.Variables.LOCALES = "en de fr es hi it nemeth".split(" ");
sre.Variables.mathjaxVersion = "3.0.0";
sre.Variables.url =
  "https://cdn.jsdelivr.net/npm/speech-rule-engine@" +
  sre.Variables.VERSION +
  "/lib/mathmaps";
sre.Variables.WGXpath =
  "https://cdn.jsdelivr.net/npm/wicked-good-xpath@1.3.0/dist/wgxpath.install.js";
sre.SystemExternal = function () {};
sre.SystemExternal.require = function (a) {
  return "undefined" !== typeof process && "undefined" !== typeof require
    ? require(a)
    : null;
};
sre.SystemExternal.documentSupported = function () {
  return "undefined" != typeof document;
};
sre.SystemExternal.process = sre.SystemExternal.require("process");
sre.SystemExternal.xmldom = sre.SystemExternal.documentSupported()
  ? window
  : sre.SystemExternal.require("xmldom-sre");
sre.SystemExternal.document = sre.SystemExternal.documentSupported()
  ? document
  : new sre.SystemExternal.xmldom.DOMImplementation().createDocument("", "", 0);
sre.SystemExternal.xpath = sre.SystemExternal.documentSupported()
  ? document
  : (function () {
      var a = { document: {}, XPathResult: {} };
      sre.SystemExternal.require("wicked-good-xpath").install(a);
      a.document.XPathResult = a.XPathResult;
      return a.document;
    })();
sre.SystemExternal.mathmapsIePath =
  "https://cdn.jsdelivr.net/npm/sre-mathmaps-ie@" +
  sre.Variables.VERSION +
  "mathmaps_ie.js";
sre.SystemExternal.commander = sre.SystemExternal.documentSupported()
  ? null
  : sre.SystemExternal.require("commander");
sre.SystemExternal.fs = sre.SystemExternal.documentSupported()
  ? null
  : sre.SystemExternal.require("fs");
sre.SystemExternal.url = sre.Variables.url;
sre.SystemExternal.jsonPath = (function () {
  return (
    (sre.SystemExternal.process && "undefined" !== typeof global
      ? sre.SystemExternal.process.env.SRE_JSON_PATH ||
        global.SRE_JSON_PATH ||
        sre.SystemExternal.process.cwd()
      : sre.SystemExternal.url) + "/"
  );
})();
sre.SystemExternal.WGXpath = sre.Variables.WGXpath;
sre.SystemExternal.wgxpath = null;
sre.BrowserUtil = {};
sre.BrowserUtil.detectIE = function () {
  if (
    !(
      "undefined" !== typeof window &&
      "ActiveXObject" in window &&
      "clipboardData" in window
    )
  )
    return !1;
  sre.BrowserUtil.loadMapsForIE_();
  sre.BrowserUtil.loadWGXpath_();
  return !0;
};
sre.BrowserUtil.detectEdge = function () {
  if (
    !(
      "undefined" !== typeof window &&
      "MSGestureEvent" in window &&
      "chrome" in window &&
      null == window.chrome.loadTimes
    )
  )
    return !1;
  document.evaluate = null;
  sre.BrowserUtil.loadWGXpath_(!0);
  return !0;
};
sre.BrowserUtil.mapsForIE = null;
sre.BrowserUtil.loadWGXpath_ = function (a) {
  sre.BrowserUtil.loadScript(sre.SystemExternal.WGXpath);
  sre.BrowserUtil.installWGXpath_(a);
};
sre.BrowserUtil.installWGXpath_ = function (a, b) {
  var c = b || 1;
  "undefined" === typeof wgxpath && 10 > c
    ? setTimeout(function () {
        sre.BrowserUtil.installWGXpath_(a, c++);
      }, 200)
    : 10 <= c ||
      ((sre.SystemExternal.wgxpath = wgxpath),
      a
        ? sre.SystemExternal.wgxpath.install({ document: document })
        : sre.SystemExternal.wgxpath.install(),
      (sre.XpathUtil.xpathEvaluate = document.evaluate),
      (sre.XpathUtil.xpathResult = XPathResult),
      (sre.XpathUtil.createNSResolver = document.createNSResolver));
};
sre.BrowserUtil.loadMapsForIE_ = function () {
  sre.BrowserUtil.loadScript(sre.SystemExternal.mathmapsIePath);
};
sre.BrowserUtil.loadScript = function (a) {
  var b = sre.SystemExternal.document.createElement("script");
  b.type = "text/javascript";
  b.src = a;
  sre.SystemExternal.document.head
    ? sre.SystemExternal.document.head.appendChild(b)
    : sre.SystemExternal.document.body.appendChild(b);
};
sre.DynamicProperties = function (a, b) {
  this.properties_ = a;
  this.order_ = b || Object.keys(a);
};
sre.DynamicProperties.prototype.getProperties = function () {
  return this.properties_;
};
sre.DynamicProperties.prototype.getOrder = function () {
  return this.order_;
};
sre.DynamicProperties.prototype.getAxes = function () {
  return this.order_;
};
sre.DynamicProperties.prototype.getProperty = function (a) {
  return this.properties_[a];
};
sre.DynamicProperties.prototype.updateProperties = function (a) {
  this.properties_ = a;
};
sre.DynamicProperties.prototype.allProperties = function () {
  var a = [];
  this.order_.forEach(
    goog.bind(function (b) {
      a.push(this.getProperty(b).slice());
    }, this)
  );
  return a;
};
sre.DynamicProperties.prototype.toString = function () {
  var a = [];
  this.order_.forEach(
    goog.bind(function (b) {
      a.push(b + ": " + this.getProperty(b).toString());
    }, this)
  );
  return a.join("\n");
};
sre.DynamicCstr = function (a, b) {
  this.components_ = a;
  var c = {},
    d;
  for (d in a) {
    var e = a[d];
    c[d] = [e];
    sre.DynamicCstr.Values_.getInstance().add(d, e);
  }
  sre.DynamicProperties.call(this, c, b);
};
goog.inherits(sre.DynamicCstr, sre.DynamicProperties);
sre.DynamicCstr.prototype.getComponents = function () {
  return this.components_;
};
sre.DynamicCstr.prototype.getValue = function (a) {
  return this.components_[a];
};
sre.DynamicCstr.prototype.getValues = function () {
  var a = [];
  this.order_.forEach(
    goog.bind(function (b) {
      a.push(this.getValue(b));
    }, this)
  );
  return a;
};
sre.DynamicCstr.prototype.allProperties = function () {
  for (
    var a = sre.DynamicCstr.superClass_.allProperties.call(this), b = 0, c, d;
    (c = a[b]), (d = this.order_[b]);
    b++
  )
    (d = this.getValue(d)), -1 === c.indexOf(d) && c.unshift(d);
  return a;
};
sre.DynamicCstr.prototype.toString = function () {
  return this.getValues().join(".");
};
sre.DynamicCstr.prototype.equal = function (a) {
  var b = a.getAxes();
  if (this.order_.length !== b.length) return !1;
  for (var c = 0, d; (d = b[c]); c++) {
    var e = this.getValue(d);
    if (!e || a.getValue(d) !== e) return !1;
  }
  return !0;
};
sre.DynamicCstr.Axis = {
  DOMAIN: "domain",
  STYLE: "style",
  LOCALE: "locale",
  TOPIC: "topic",
  MODALITY: "modality"
};
sre.DynamicCstr.Values_ = function () {
  this.axisToValues = sre.DynamicCstr.Values_.makeAxisValueObject_();
};
goog.addSingletonGetter(sre.DynamicCstr.Values_);
sre.DynamicCstr.Values_.prototype.add = function (a, b) {
  this.axisToValues[a][b] = !0;
};
sre.DynamicCstr.Values_.prototype.get = function () {
  var a = {},
    b = sre.DynamicCstr.Values_.getInstance().axisToValues,
    c;
  for (c in b) a[c] = Object.keys(b[c]);
  return a;
};
sre.DynamicCstr.Values_.makeAxisValueObject_ = function () {
  var a = {},
    b;
  for (b in sre.DynamicCstr.Axis) a[sre.DynamicCstr.Axis[b]] = {};
  return a;
};
sre.DynamicCstr.getAxisValues = function () {
  return sre.DynamicCstr.Values_.getInstance().get();
};
sre.DynamicCstr.DEFAULT_ORDER = [
  sre.DynamicCstr.Axis.LOCALE,
  sre.DynamicCstr.Axis.MODALITY,
  sre.DynamicCstr.Axis.DOMAIN,
  sre.DynamicCstr.Axis.STYLE,
  sre.DynamicCstr.Axis.TOPIC
];
sre.DynamicCstr.DEFAULT_VALUE = "default";
sre.DynamicCstr.DEFAULT_VALUES = {};
sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE] = "en";
sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN] =
  sre.DynamicCstr.DEFAULT_VALUE;
sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE] =
  sre.DynamicCstr.DEFAULT_VALUE;
sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.TOPIC] =
  sre.DynamicCstr.DEFAULT_VALUE;
sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY] = "speech";
sre.DynamicCstr.Parser = function (a) {
  this.order_ = a;
};
sre.DynamicCstr.Parser.prototype.parse = function (a) {
  a = a.split(".");
  var b = {};
  if (a.length > this.order_.length)
    throw Error("Invalid dynamic constraint: " + b);
  for (var c = 0, d; (d = this.order_[c]), a.length; c++) {
    var e = a.shift();
    b[d] = e;
  }
  return new sre.DynamicCstr(b, this.order_.slice(0, c));
};
sre.DynamicCstr.Comparator = function () {};
sre.DynamicCstr.Comparator.prototype.getReference = function () {};
sre.DynamicCstr.Comparator.prototype.setReference = function (a, b) {};
sre.DynamicCstr.Comparator.prototype.match = function (a) {};
sre.DynamicCstr.Comparator.prototype.compare = function (a, b) {};
sre.DynamicCstr.DefaultComparator = function (a, b) {
  this.reference_ = a;
  this.fallback_ =
    b || new sre.DynamicProperties(a.getProperties(), a.getOrder());
  this.order_ = this.reference_.getOrder();
};
sre.DynamicCstr.DefaultComparator.prototype.getReference = function () {
  return this.reference_;
};
sre.DynamicCstr.DefaultComparator.prototype.setReference = function (a, b) {
  this.reference_ = a;
  this.fallback_ =
    b || new sre.DynamicProperties(a.getProperties(), a.getOrder());
  this.order_ = this.reference_.getOrder();
};
sre.DynamicCstr.DefaultComparator.prototype.match = function (a) {
  var b = a.getAxes();
  return (
    b.length === this.reference_.getAxes().length &&
    b.every(
      goog.bind(function (c) {
        var d = a.getValue(c);
        return (
          d === this.reference_.getValue(c) ||
          -1 !== this.fallback_.getProperty(c).indexOf(d)
        );
      }, this)
    )
  );
};
sre.DynamicCstr.DefaultComparator.prototype.compare = function (a, b) {
  for (var c = !1, d = 0, e; (e = this.order_[d]); d++) {
    var f = a.getValue(e),
      g = b.getValue(e);
    if (!c) {
      var h = this.reference_.getValue(e);
      if (h === f && h !== g) return -1;
      if (h === g && h !== f) return 1;
      if (h === f && h === g) continue;
      h !== f && h !== g && (c = !0);
    }
    e = this.fallback_.getProperty(e);
    f = e.indexOf(f);
    g = e.indexOf(g);
    if (f < g) return -1;
    if (g < f) return 1;
  }
  return 0;
};
sre.DynamicCstr.DefaultComparator.prototype.toString = function () {
  return this.reference_.toString() + "\n" + this.fallback_.toString();
};
sre.DynamicProperties.create = function (a) {
  for (
    var b = sre.DynamicCstr.DEFAULT_ORDER,
      c = {},
      d = Array.prototype.slice.call(arguments, 0),
      e = 0,
      f = d.length,
      g = b.length;
    e < f && e < g;
    e++
  )
    c[b[e]] = d[e];
  return new sre.DynamicProperties(c);
};
sre.DynamicCstr.create = function (a) {
  for (
    var b = sre.DynamicCstr.DEFAULT_ORDER,
      c = {},
      d = Array.prototype.slice.call(arguments, 0),
      e = 0,
      f = d.length,
      g = b.length;
    e < f && e < g;
    e++
  )
    c[b[e]] = d[e];
  return new sre.DynamicCstr(c);
};
sre.DynamicCstr.defaultCstr = function () {
  return sre.DynamicCstr.create.apply(
    null,
    sre.DynamicCstr.DEFAULT_ORDER.map(function (a) {
      return sre.DynamicCstr.DEFAULT_VALUES[a];
    })
  );
};
sre.DynamicCstr.validOrder = function (a) {
  var b = sre.DynamicCstr.DEFAULT_ORDER.slice();
  return a.every(function (c) {
    c = b.indexOf(c);
    return -1 !== c && b.splice(c, 1);
  });
};
sre.Engine = function () {
  this.evaluator = sre.Engine.defaultEvaluator;
  this.parser = this.defaultParser = new sre.DynamicCstr.Parser(
    sre.DynamicCstr.DEFAULT_ORDER
  );
  this.parsers = {};
  this.dynamicCstr = sre.DynamicCstr.defaultCstr();
  this.comparator = null;
  this.comparators = {};
  this.domain = "mathspeak";
  this.style = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE];
  this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];
  this.modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];
  this.walker = "Table";
  this.mode = sre.Engine.Mode.SYNC;
  this.speech = sre.Engine.Speech.NONE;
  this.structure = !1;
  this.ruleSets = [];
  this.markup = sre.Engine.Markup.NONE;
  this.isEdge = this.isIE = this.strict = !1;
  this.rate = "100";
  this.pprint = !1;
  this.setupTests_ = [];
  this.config = !1;
  this.prune = this.rules = "";
};
goog.addSingletonGetter(sre.Engine);
sre.Engine.personalityProps = {
  PITCH: "pitch",
  RATE: "rate",
  VOLUME: "volume",
  PAUSE: "pause",
  JOIN: "join"
};
sre.Engine.Mode = { SYNC: "sync", ASYNC: "async", HTTP: "http" };
sre.Engine.Speech = { NONE: "none", SHALLOW: "shallow", DEEP: "deep" };
sre.Engine.Markup = {
  NONE: "none",
  PUNCTUATION: "punctuation",
  SSML: "ssml",
  SSML_STEP: "ssml_step",
  ACSS: "acss",
  SABLE: "sable",
  VOICEXML: "voicexml"
};
sre.Engine.registerTest = function (a) {
  sre.Engine.getInstance().setupTests_.push(a);
};
sre.Engine.isReady = function () {
  return sre.Engine.getInstance().setupTests_.every(function (a) {
    return a();
  });
};
sre.Engine.prototype.setupBrowsers = function () {
  this.isIE = sre.BrowserUtil.detectIE();
  this.isEdge = sre.BrowserUtil.detectEdge();
};
sre.Engine.prototype.getAxisValues = function () {
  return sre.DynamicCstr.getAxisValues();
};
sre.Engine.defaultEvaluator = function (a, b) {
  return a;
};
sre.Engine.prototype.getRate = function () {
  var a = parseInt(this.rate, 10);
  return isNaN(a) ? 100 : a;
};
sre.Engine.Error = function (a) {
  Error.call(this);
  this.message = a || "";
  this.name = "SRE Error";
};
goog.inherits(sre.Engine.Error, Error);
sre.Engine.BINARY_FEATURES = ["strict", "structure", "pprint"];
sre.Engine.STRING_FEATURES =
  "markup style domain speech walker locale modality rate rules prune".split(
    " "
  );
sre.Engine.prototype.setDynamicCstr = function (a) {
  if (a)
    for (var b = Object.keys(a), c = 0; c < b.length; c++) {
      var d = b[c];
      -1 !== sre.DynamicCstr.DEFAULT_ORDER.indexOf(d) && (this[d] = a[d]);
    }
  sre.Engine.DOMAIN_TO_STYLES[this.domain] = this.style;
  a = [this.locale, this.modality, this.domain, this.style].join(".");
  b = sre.DynamicProperties.create(
    [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE]],
    [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]],
    [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]],
    [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE]]
  );
  c = this.comparators[this.domain];
  this.parser = (d = this.parsers[this.domain]) ? d : this.defaultParser;
  this.dynamicCstr = this.parser.parse(a);
  this.dynamicCstr.updateProperties(b.getProperties());
  this.comparator = c
    ? c()
    : new sre.DynamicCstr.DefaultComparator(this.dynamicCstr);
};
sre.Engine.DOMAIN_TO_STYLES = { mathspeak: "default", clearspeak: "default" };
sre.BaseUtil = {};
sre.BaseUtil.removeEmpty = function (a) {
  return a.filter(function (b) {
    return b;
  });
};
sre.BaseUtil.interleaveLists = function (a, b) {
  for (var c = []; a.length || b.length; )
    a.length && c.push(a.shift()), b.length && c.push(b.shift());
  return c;
};
sre.BaseUtil.setdifference = function (a, b) {
  return a
    ? b
      ? a.filter(function (c) {
          return 0 > b.indexOf(c);
        })
      : a
    : [];
};
sre.BaseUtil.union = function (a, b) {
  return a && b ? a.concat(sre.BaseUtil.setdifference(b, a)) : a || b || [];
};
sre.BaseUtil.makePath = function (a) {
  return a.match("/$") ? a : a + "/";
};
sre.Debugger = function () {
  this.isActive_ = !1;
  this.outputFunction_ = console.info;
  this.stream_ = null;
};
goog.addSingletonGetter(sre.Debugger);
sre.Debugger.prototype.init = function (a) {
  a && this.startDebugFile_(a);
  this.isActive_ = !0;
};
sre.Debugger.prototype.startDebugFile_ = function (a) {
  this.stream_ = sre.SystemExternal.fs.createWriteStream(a);
  this.outputFunction_ = goog.bind(function (b) {
    var c = Array.prototype.slice.call(arguments, 0);
    this.stream_.write(c.join(" "));
    this.stream_.write("\n");
  }, this);
  this.stream_.on(
    "error",
    goog.bind(function (b) {
      console.info("Invalid log file. Debug information sent to console.");
      this.outputFunction_ = console.info;
    }, this)
  );
  this.stream_.on("finish", function () {
    console.info("Finalizing debug file.");
  });
};
sre.Debugger.prototype.output_ = function (a) {
  this.outputFunction_.apply(
    console.info === this.outputFunction_ ? console : this.outputFunction_,
    ["Speech Rule Engine Debugger:"].concat(a)
  );
};
sre.Debugger.prototype.output = function (a) {
  this.isActive_ && this.output_(Array.prototype.slice.call(arguments, 0));
};
sre.Debugger.prototype.generateOutput = function (a) {
  this.isActive_ && this.output_(a.apply(a, []));
};
sre.Debugger.prototype.exit = function (a) {
  this.isActive_ &&
    this.stream_ &&
    this.stream_.end("", "", a || function () {});
};
sre.Grammar = function () {
  this.parameters_ = {};
  this.corrections_ = {};
  this.preprocessors_ = {};
  this.stateStack_ = [];
  this.currentFlags = {};
};
goog.addSingletonGetter(sre.Grammar);
sre.Grammar.ATTRIBUTE = "grammar";
sre.Grammar.prototype.clear = function () {
  this.parameters_ = {};
  this.stateStack_ = [];
};
sre.Grammar.prototype.setParameter = function (a, b) {
  var c = this.parameters_[a];
  b ? (this.parameters_[a] = b) : delete this.parameters_[a];
  return c;
};
sre.Grammar.prototype.getParameter = function (a) {
  return this.parameters_[a];
};
sre.Grammar.prototype.setCorrection = function (a, b) {
  this.corrections_[a] = b;
};
sre.Grammar.prototype.setPreprocessor = function (a, b) {
  this.preprocessors_[a] = b;
};
sre.Grammar.prototype.getCorrection = function (a) {
  return this.corrections_[a];
};
sre.Grammar.prototype.getState = function () {
  var a = [],
    b;
  for (b in this.parameters_) {
    var c = this.parameters_[b];
    a.push("string" === typeof c ? b + ":" + c : b);
  }
  return a.join(" ");
};
sre.Grammar.prototype.pushState = function (a) {
  for (var b in a) a[b] = this.setParameter(b, a[b]);
  this.stateStack_.push(a);
};
sre.Grammar.prototype.popState = function () {
  var a = this.stateStack_.pop(),
    b;
  for (b in a) this.setParameter(b, a[b]);
};
sre.Grammar.prototype.setAttribute = function (a) {
  if (a && a.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE) {
    var b = this.getState();
    b && a.setAttribute(sre.Grammar.ATTRIBUTE, b);
  }
};
sre.Grammar.prototype.preprocess = function (a) {
  return this.runProcessors_(a, this.preprocessors_);
};
sre.Grammar.prototype.correct = function (a) {
  return this.runProcessors_(a, this.corrections_);
};
sre.Grammar.prototype.runProcessors_ = function (a, b) {
  for (var c in this.parameters_) {
    var d = b[c];
    if (d) {
      var e = this.parameters_[c];
      a = !0 === e ? d(a) : d(a, e);
    }
  }
  return a;
};
sre.Grammar.translateString_ = function (a) {
  if (a.match(/:unit$/)) return sre.Grammar.translateUnit_(a);
  var b = sre.Engine.getInstance();
  b = b.evaluator(a, b.dynamicCstr);
  return null === b ? a : b;
};
sre.Grammar.translateUnit_ = function (a) {
  a = sre.Grammar.prepareUnit_(a);
  var b = sre.Engine.getInstance(),
    c = sre.Grammar.getInstance().getParameter("plural"),
    d = b.strict,
    e = b.locale + "." + b.modality + ".default";
  b.strict = !0;
  if (c) {
    var f = b.defaultParser.parse(e + ".plural");
    f = b.evaluator(a, f);
  }
  if (f) return (b.strict = d), f;
  f = b.defaultParser.parse(e + ".default");
  f = b.evaluator(a, f);
  b.strict = d;
  if (!f) return sre.Grammar.cleanUnit_(a);
  c && (f = sre.Messages.PLURAL(f));
  return f;
};
sre.Grammar.prepareUnit_ = function (a) {
  var b = a.match(/:unit$/);
  return b ? a.slice(0, b.index).replace(/\s+/g, " ") + a.slice(b.index) : a;
};
sre.Grammar.cleanUnit_ = function (a) {
  return a.match(/:unit$/) ? a.replace(/:unit$/, "") : a;
};
sre.Grammar.prototype.apply = function (a, b) {
  this.currentFlags = b || {};
  a =
    this.currentFlags.adjust || this.currentFlags.preprocess
      ? sre.Grammar.getInstance().preprocess(a)
      : a;
  if (this.parameters_.translate || this.currentFlags.translate)
    a = sre.Grammar.translateString_(a);
  a =
    this.currentFlags.adjust || this.currentFlags.correct
      ? sre.Grammar.getInstance().correct(a)
      : a;
  this.currentFlags = {};
  return a;
};
sre.Grammar.parseState = function (a) {
  var b = {};
  a = a.split(" ");
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c].split(":"),
      f = e[1];
    b[e[0]] = f ? f : !0;
  }
  return b;
};
sre.Grammar.parseInput = function (a) {
  var b = {};
  a = a.split(":");
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c].split("="),
      f = e[0].trim();
    e[1]
      ? (b[f] = e[1].trim())
      : f.match(/^!/)
      ? (b[f.slice(1)] = !1)
      : (b[f] = !0);
  }
  return b;
};
sre.Grammar.correctFont_ = function (a, b) {
  if (!b || !a) return a;
  b = sre.Messages.MS_FUNC.FONT_REGEXP(sre.Locale.localFont(b));
  return a.replace(b, "");
};
sre.Grammar.addAnnotation_ = function (a, b) {
  return a + ":" + b;
};
sre.Grammar.noTranslateText_ = function (a) {
  a.match(new RegExp("^[" + sre.Messages.REGEXP.TEXT + "]+$")) &&
    (sre.Grammar.getInstance().currentFlags.translate = !1);
  return a;
};
sre.Grammar.getInstance().setCorrection("ignoreFont", sre.Grammar.correctFont_);
sre.Grammar.getInstance().setPreprocessor(
  "annotation",
  sre.Grammar.addAnnotation_
);
sre.Grammar.getInstance().setPreprocessor(
  "noTranslateText",
  sre.Grammar.noTranslateText_
);
sre.Grammar.getInstance().setCorrection("ignoreCaps", sre.Grammar.correctFont_);
sre.XpathUtil = {};
sre.XpathUtil.xpathSupported = function () {
  return "undefined" == typeof XPathResult ? !1 : !0;
};
sre.XpathUtil.currentDocument = null;
sre.XpathUtil.xpathEvaluate = sre.XpathUtil.xpathSupported()
  ? document.evaluate
  : sre.SystemExternal.xpath.evaluate;
sre.XpathUtil.xpathResult = sre.XpathUtil.xpathSupported()
  ? XPathResult
  : sre.SystemExternal.xpath.XPathResult;
sre.XpathUtil.createNSResolver = sre.XpathUtil.xpathSupported()
  ? document.createNSResolver
  : sre.SystemExternal.xpath.createNSResolver;
sre.XpathUtil.nameSpaces_ = {
  xhtml: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  mml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};
sre.XpathUtil.resolveNameSpace = function (a) {
  return sre.XpathUtil.nameSpaces_[a] || null;
};
sre.XpathUtil.resolver_ = function () {
  this.lookupNamespaceURI = sre.XpathUtil.resolveNameSpace;
};
sre.XpathUtil.evaluateXpath_ = function (a, b, c) {
  var d = sre.Engine.getInstance();
  return d.mode !== sre.Engine.Mode.HTTP || d.isIE || d.isEdge
    ? sre.XpathUtil.xpathEvaluate(a, b, new sre.XpathUtil.resolver_(), c, null)
    : sre.XpathUtil.currentDocument.evaluate(
        a,
        b,
        sre.XpathUtil.resolveNameSpace,
        c,
        null
      );
};
sre.XpathUtil.evalXPath = function (a, b) {
  try {
    var c = sre.XpathUtil.evaluateXpath_(
      a,
      b,
      sre.XpathUtil.xpathResult.ORDERED_NODE_ITERATOR_TYPE
    );
  } catch (d) {
    return [];
  }
  a = [];
  for (b = c.iterateNext(); b; b = c.iterateNext()) a.push(b);
  return a;
};
sre.XpathUtil.getLeafNodes = function (a) {
  return sre.XpathUtil.evalXPath(".//*[count(*)=0]", a);
};
sre.XpathUtil.evaluateBoolean = function (a, b) {
  try {
    var c = sre.XpathUtil.evaluateXpath_(
      a,
      b,
      sre.XpathUtil.xpathResult.BOOLEAN_TYPE
    );
  } catch (d) {
    return !1;
  }
  return c.booleanValue;
};
sre.XpathUtil.evaluateString = function (a, b) {
  try {
    var c = sre.XpathUtil.evaluateXpath_(
      a,
      b,
      sre.XpathUtil.xpathResult.STRING_TYPE
    );
  } catch (d) {
    return "";
  }
  return c.stringValue;
};
sre.DomUtil = {};
sre.DomUtil.toArray = function (a) {
  for (var b = [], c = 0, d = a.length; c < d; c++) b.push(a[c]);
  return b;
};
sre.DomUtil.trimInput_ = function (a) {
  a = a.replace(/&nbsp;/g, "\u00a0");
  return a.replace(/>[ \f\n\r\t\v\u200b]+</g, "><").trim();
};
sre.DomUtil.XML_ENTITIES = {
  "&lt;": !0,
  "&gt;": !0,
  "&amp;": !0,
  "&quot;": !0,
  "&apos;": !0
};
sre.DomUtil.parseInput = function (a, b) {
  b = b || sre.Engine.Error;
  var c = new sre.SystemExternal.xmldom.DOMParser();
  a = sre.DomUtil.trimInput_(a);
  var d = !!a.match(/&(?!lt|gt|amp|quot|apos)\w+;/g);
  if (!a) throw new b("Empty input!");
  try {
    var e = c.parseFromString(a, d ? "text/html" : "text/xml");
    return sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP
      ? ((sre.XpathUtil.currentDocument = e),
        d ? e.body.childNodes[0] : e.documentElement)
      : e.documentElement;
  } catch (f) {
    throw new b("Illegal input: " + f.message);
  }
};
sre.DomUtil.NodeType = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
};
sre.DomUtil.replaceNode = function (a, b) {
  a.parentNode &&
    (a.parentNode.insertBefore(b, a), a.parentNode.removeChild(a));
};
sre.DomUtil.createElement = function (a) {
  return sre.SystemExternal.document.createElement(a);
};
sre.DomUtil.createElementNS = function (a, b) {
  return sre.SystemExternal.document.createElementNS(a, b);
};
sre.DomUtil.createTextNode = function (a) {
  return sre.SystemExternal.document.createTextNode(a);
};
sre.DomUtil.formatXml = function (a) {
  var b = "",
    c = /(>)(<)(\/*)/g;
  a = a.replace(c, "$1\r\n$2$3");
  var d = 0;
  a = a.split("\r\n");
  c = /(\.)*(<)(\/*)/g;
  for (
    a = a
      .map(function (h) {
        return h.replace(c, "$1\r\n$2$3").split("\r\n");
      })
      .reduce(function (h, k) {
        return h.concat(k);
      }, []);
    a.length;

  ) {
    var e = a.shift();
    if (e) {
      var f = 0;
      if (e.match(/^<\w[^>\/]*>[^>]+$/)) {
        var g = sre.DomUtil.matchingStartEnd_(e, a[0]);
        g[0]
          ? g[1]
            ? ((e += a.shift().slice(0, -g[1].length)),
              g[1].trim() && a.unshift(g[1]))
            : (e += a.shift())
          : (f = 1);
      } else
        e.match(/^<\/\w/)
          ? 0 != d && --d
          : e.match(/^<\w[^>]*[^\/]>.*$/)
          ? (f = 1)
          : e.match(/^<\w[^>]*\/>.+$/)
          ? ((g = e.indexOf(">") + 1),
            e.slice(g).trim() && a.unshift(),
            (e = e.slice(0, g)))
          : (f = 0);
      b += Array(d + 1).join("  ") + e + "\r\n";
      d += f;
    }
  }
  return b;
};
sre.DomUtil.matchingStartEnd_ = function (a, b) {
  if (!b) return [!1, ""];
  a = a.match(/^<([^> ]+).*>/);
  b = b.match(/^<\/([^>]+)>(.*)/);
  return a && b && a[1] === b[1] ? [!0, b[2]] : [!1, ""];
};
sre.DomUtil.dataAttribute = function (a) {
  a.match(/^data-/) && (a = a.substr(5));
  return a.replace(/-([a-z])/g, function (b, c) {
    return c.toUpperCase();
  });
};
sre.DomUtil.getDataAttribute = function (a, b) {
  return a.dataset
    ? a.dataset[sre.DomUtil.dataAttribute(b)]
    : a.getAttribute(b);
};
sre.DomUtil.querySelectorAllByAttr = function (a, b) {
  return a.querySelectorAll
    ? sre.DomUtil.toArray(a.querySelectorAll("[" + b + "]"))
    : sre.XpathUtil.evalXPath(".//*[@" + b + "]", a);
};
sre.DomUtil.querySelectorAllByAttrValue = function (a, b, c) {
  return a.querySelectorAll
    ? sre.DomUtil.toArray(a.querySelectorAll("[" + b + '="' + c + '"]'))
    : sre.XpathUtil.evalXPath(".//*[@" + b + '="' + c + '"]', a);
};
sre.DomUtil.querySelectorAll = function (a, b) {
  return a.querySelectorAll
    ? sre.DomUtil.toArray(a.querySelectorAll(b))
    : sre.XpathUtil.evalXPath(".//" + b, a);
};
sre.DomUtil.tagName = function (a) {
  return a.tagName.toUpperCase();
};
sre.Numbers = {};
sre.Numbers.identityTransformer_ = function (a) {
  return a.toString();
};
sre.Numbers.pluralTransformer_ = function (a, b) {
  return a.toString();
};
sre.Numbers.NUMBERS = {
  wordOrdinal: sre.Numbers.identityTransformer_,
  simpHardworkrdinal: sre.Numbers.identityTransformer_,
  numberToWords: sre.Numbers.identityTransformer_,
  numberToOrdinal: sre.Numbers.pluralTransformer_,
  vulgarSep: " ",
  numSep: " "
};
sre.Messages = {};
sre.Messages.MS = {
  START: "",
  FRAC_V: "",
  FRAC_B: "",
  FRAC_S: "",
  END: "",
  FRAC_OVER: "",
  TWICE: "",
  NEST_FRAC: "",
  ENDFRAC: "",
  SUPER: "",
  SUB: "",
  SUP: "",
  SUPERSCRIPT: "",
  SUBSCRIPT: "",
  BASELINE: "",
  BASE: "",
  NESTED: "",
  NEST_ROOT: "",
  STARTROOT: "",
  ENDROOT: "",
  ROOTINDEX: "",
  ROOT: "",
  INDEX: "",
  UNDER: "",
  UNDERSCRIPT: "",
  OVER: "",
  OVERSCRIPT: ""
};
sre.Messages.MS_FUNC = {
  FRAC_NEST_DEPTH: function (a) {
    return !1;
  },
  RADICAL_NEST_DEPTH: function (a) {
    return "";
  },
  COMBINE_ROOT_INDEX: function (a, b) {
    return a;
  }
};
sre.Messages.MS_ROOT_INDEX = {};
sre.Messages.FONT = {
  bold: "",
  "bold-fraktur": "",
  "bold-italic": "",
  "bold-script": "",
  caligraphic: "",
  "caligraphic-bold": "",
  "double-struck": "",
  "double-struck-italic": "",
  fraktur: "",
  italic: "",
  monospace: "",
  normal: "",
  oldstyle: "",
  "oldstyle-bold": "",
  script: "",
  "sans-serif": "",
  "sans-serif-italic": "",
  "sans-serif-bold": "",
  "sans-serif-bold-italic": "",
  unknown: ""
};
sre.Messages.EMBELLISH = {
  super: "",
  sub: "",
  circled: "",
  parenthesized: "",
  period: "",
  "negative-circled": "",
  "double-circled": "",
  "circled-sans-serif": "",
  "negative-circled-sans-serif": "",
  blackboard: "",
  comma: "",
  squared: "",
  "negative-squared": ""
};
sre.Messages.ROLE = {
  addition: "",
  multiplication: "",
  subtraction: "",
  division: "",
  equality: "",
  inequality: "",
  element: "",
  arrow: "",
  determinant: "",
  rowvector: "",
  binomial: "",
  squarematrix: "",
  "set empty": "",
  "set extended": "",
  "set singleton": "",
  "set collection": "",
  label: "",
  multiline: "",
  matrix: "",
  vector: "",
  cases: "",
  table: "",
  unknown: ""
};
sre.Messages.ENCLOSE = {
  longdiv: "",
  actuarial: "",
  radical: "",
  box: "",
  roundedbox: "",
  circle: "",
  left: "",
  right: "",
  top: "",
  bottom: "",
  updiagonalstrike: "",
  downdiagonalstrike: "",
  verticalstrike: "",
  horizontalstrike: "",
  madruwb: "",
  updiagonalarrow: "",
  phasorangle: "",
  unknown: ""
};
sre.Messages.NAVIGATE = { COLLAPSIBLE: "", EXPANDABLE: "", LEVEL: "" };
sre.Messages.REGEXP = {
  TEXT: "a-zA-Z",
  NUMBER: "",
  DECIMAL_MARK: "",
  DIGIT_GROUP: "",
  JOINER_SUBSUPER: " "
};
sre.Messages.PLURAL_UNIT = {};
sre.Messages.PLURAL = function (a) {
  return /.*s$/.test(a) ? a : a + "s";
};
sre.Messages.UNIT_TIMES = "";
sre.Messages.NUMBERS = sre.Numbers.NUMBERS;
sre.Messages.ALPHABETS = {
  latinSmall: [],
  latinCap: [],
  greekSmall: [],
  greekCap: []
};
sre.Messages.ALPHABET_PREFIXES = {
  capPrefix: { default: "" },
  smallPrefix: { default: "" },
  digitPrefix: { default: "" }
};
sre.Messages.identityTransformer_ = function (a) {
  return a.toString();
};
sre.Messages.ALPHABET_TRANSFORMERS = {
  digit: { default: sre.Messages.identityTransformer_ },
  letter: { default: sre.Messages.identityTransformer_ }
};
sre.Messages.ALPHABET_COMBINER = function (a, b, c) {
  return a;
};
sre.Span = function (a, b) {
  this.string = a;
  this.attributes = b;
};
sre.NumbersUtil = {};
sre.NumbersUtil.ordinalCounter = function (a, b) {
  var c = 0;
  return function () {
    return sre.Messages.NUMBERS.simpHardworkrdinal(++c) + " " + b;
  };
};
sre.NumbersUtil.convertVulgarFraction_ = function (a) {
  if (
    !a.childNodes ||
    !a.childNodes[0] ||
    !a.childNodes[0].childNodes ||
    2 > a.childNodes[0].childNodes.length ||
    a.childNodes[0].childNodes[0].tagName !== sre.SemanticAttr.Type.NUMBER ||
    a.childNodes[0].childNodes[0].getAttribute("role") !==
      sre.SemanticAttr.Role.INTEGER ||
    a.childNodes[0].childNodes[1].tagName !== sre.SemanticAttr.Type.NUMBER ||
    a.childNodes[0].childNodes[1].getAttribute("role") !==
      sre.SemanticAttr.Role.INTEGER
  )
    return { convertible: !1, content: a.textContent };
  var b = a.childNodes[0].childNodes[1].textContent;
  a = a.childNodes[0].childNodes[0].textContent;
  var c = Number(b),
    d = Number(a);
  return isNaN(c) || isNaN(d)
    ? {
        convertible: !1,
        content: a + " " + sre.Messages.MS.FRAC_OVER + " " + b
      }
    : { convertible: !0, enumerator: d, denominator: c };
};
sre.NumbersUtil.vulgarFraction = function (a) {
  var b = sre.NumbersUtil.convertVulgarFraction_(a);
  return b.convertible && b.enumerator && b.denominator
    ? [
        new sre.Span(sre.Messages.NUMBERS.numberToWords(b.enumerator), {
          extid: a.childNodes[0].childNodes[0].getAttribute("extid"),
          separator: ""
        }),
        new sre.Span(sre.Messages.NUMBERS.vulgarSep, { separator: "" }),
        new sre.Span(
          sre.Messages.NUMBERS.numberToOrdinal(
            b.denominator,
            1 !== b.enumerator
          ),
          { extid: a.childNodes[0].childNodes[1].getAttribute("extid") }
        )
      ]
    : [new sre.Span(b.content || "", { extid: a.getAttribute("extid") })];
};
sre.NumbersUtil.vulgarFractionSmall = function (a, b, c) {
  var d = sre.NumbersUtil.convertVulgarFraction_(a);
  return d.convertible
    ? ((a = d.enumerator),
      (d = d.denominator),
      0 < a && a < b && 0 < d && d < c)
    : !1;
};
sre.NumbersUtil.ordinalPosition = function (a) {
  var b = sre.DomUtil.toArray(a.parentNode.childNodes);
  return sre.Messages.NUMBERS.simpHardworkrdinal(b.indexOf(a) + 1).toString();
};
sre.SemanticUtil = function () {};
sre.SemanticUtil.objectsToKeys = function (a) {
  a = Array.prototype.slice.call(arguments, 0);
  var b = [];
  return b.concat.apply(b, a.map(Object.keys));
};
sre.SemanticUtil.objectsToValues = function (a) {
  a = Array.prototype.slice.call(arguments, 0);
  var b = [];
  a.forEach(function (c) {
    for (var d in c) b.push(c[d]);
  });
  return b;
};
sre.SemanticUtil.unicodeToNumber = function (a) {
  if (!a || 2 < a.length) return null;
  if (2 == a.length) {
    var b = a.charCodeAt(0);
    a = a.charCodeAt(1);
    return 55296 <= b && 56319 >= b && !isNaN(a)
      ? 1024 * (b - 55296) + (a - 56320) + 65536
      : null;
  }
  return a.charCodeAt(0);
};
sre.SemanticUtil.numberToUnicode = function (a) {
  return 65536 > a
    ? String.fromCharCode(a)
    : String.fromCharCode(
        (a - 65536) / 1024 + 55296,
        ((a - 65536) % 1024) + 56320
      );
};
sre.SemanticUtil.splitUnicode = function (a) {
  a = a.split("");
  for (var b = [], c = 0, d; (d = a[c]); c++)
    "\ud800" <= d && "\udbff" >= d && a[c + 1] ? b.push(d + a[++c]) : b.push(d);
  return b;
};
sre.SemanticUtil.LEAFTAGS = "MO MI MN MTEXT MS MSPACE".split(" ");
sre.SemanticUtil.IGNORETAGS =
  "MERROR MPHANTOM MALIGNGROUP MALIGNMARK MPRESCRIPTS ANNOTATION ANNOTATION-XML".split(
    " "
  );
sre.SemanticUtil.EMPTYTAGS =
  "MATH MROW MPADDED MACTION NONE MSTYLE SEMANTICS".split(" ");
sre.SemanticUtil.DISPLAYTAGS = ["MROOT", "MSQRT"];
sre.SemanticUtil.hasMathTag = function (a) {
  return !!a && "MATH" === sre.DomUtil.tagName(a);
};
sre.SemanticUtil.hasLeafTag = function (a) {
  return (
    !!a && -1 !== sre.SemanticUtil.LEAFTAGS.indexOf(sre.DomUtil.tagName(a))
  );
};
sre.SemanticUtil.hasIgnoreTag = function (a) {
  return (
    !!a && -1 !== sre.SemanticUtil.IGNORETAGS.indexOf(sre.DomUtil.tagName(a))
  );
};
sre.SemanticUtil.hasEmptyTag = function (a) {
  return (
    !!a && -1 !== sre.SemanticUtil.EMPTYTAGS.indexOf(sre.DomUtil.tagName(a))
  );
};
sre.SemanticUtil.hasDisplayTag = function (a) {
  return (
    !!a && -1 !== sre.SemanticUtil.DISPLAYTAGS.indexOf(sre.DomUtil.tagName(a))
  );
};
sre.SemanticUtil.isOrphanedGlyph = function (a) {
  return (
    !!a &&
    "MGLYPH" === sre.DomUtil.tagName(a) &&
    !sre.SemanticUtil.hasLeafTag(a.parentNode)
  );
};
sre.SemanticUtil.purgeNodes = function (a) {
  for (var b = [], c = 0, d; (d = a[c]); c++)
    if (d.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE) {
      var e = sre.DomUtil.tagName(d);
      -1 != sre.SemanticUtil.IGNORETAGS.indexOf(e) ||
        (-1 != sre.SemanticUtil.EMPTYTAGS.indexOf(e) &&
          0 == d.childNodes.length) ||
        b.push(d);
    }
  return b;
};
sre.SemanticUtil.isZeroLength = function (a) {
  return a
    ? -1 !==
      "negativeveryverythinmathspace negativeverythinmathspace negativethinmathspace negativemediummathspace negativethickmathspace negativeverythickmathspace negativeveryverythickmathspace"
        .split(" ")
        .indexOf(a)
      ? !0
      : (a = a.match(/[0-9\.]+/))
      ? 0 === parseFloat(a)
        ? !0
        : !1
      : !1
    : !1;
};
sre.SemanticUtil.directSpeechKeys = ["aria-label", "exact-speech", "alt"];
sre.SemanticUtil.addAttributes = function (a, b) {
  if (b.hasAttributes()) {
    b = b.attributes;
    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c].name;
      d.match(/^ext/) && ((a.attributes[d] = b[c].value), (a.nobreaking = !0));
      -1 !== sre.SemanticUtil.directSpeechKeys.indexOf(d) &&
        ((a.attributes["ext-speech"] = b[c].value), (a.nobreaking = !0));
      d.match(/texclass$/) && (a.attributes.texclass = b[c].value);
      "href" === d && ((a.attributes.href = b[c].value), (a.nobreaking = !0));
    }
  }
};
sre.SemanticUtil.getEmbellishedInner = function (a) {
  return a && a.embellished && 0 < a.childNodes.length
    ? sre.SemanticUtil.getEmbellishedInner(a.childNodes[0])
    : a;
};
sre.SemanticUtil.sliceNodes = function (a, b, c) {
  c && a.reverse();
  for (var d = [], e = 0, f; (f = a[e]); e++) {
    if (b(f))
      return c
        ? { head: a.slice(e + 1).reverse(), div: f, tail: d.reverse() }
        : { head: d, div: f, tail: a.slice(e + 1) };
    d.push(f);
  }
  return c
    ? { head: [], div: null, tail: d.reverse() }
    : { head: d, div: null, tail: [] };
};
sre.SemanticUtil.partitionNodes = function (a, b) {
  var c = [],
    d = [];
  do {
    var e = sre.SemanticUtil.sliceNodes(a, b);
    d.push(e.head);
    c.push(e.div);
    a = e.tail;
  } while (e.div);
  c.pop();
  return { rel: c, comp: d };
};
sre.SemanticAttr = function () {
  this.generalPunctuations =
    '!"#%&;?@\\\u00a1\u00a7\u00b6\u00bf\u2017\u2020\u2021\u2022\u2023\u2024\u2025\u2027\u2030\u2031\u2038\u203b\u203c\u203d\u203e\u2041\u2042\u2043\u2047\u2048\u2049\u204b\u204c\u204d\u204e\u204f\u2050\u2051\u2053\u2055\u2056\u2058\u2059\u205a\u205b\u205c\u205d\u205e\ufe10\ufe14\ufe15\ufe16\ufe30\ufe45\ufe46\ufe49\ufe4a\ufe4b\ufe4c\ufe54\ufe56\ufe57\ufe5f\ufe60\ufe61\ufe68\ufe6a\ufe6b\uff01\uff02\uff03\uff05\uff06\uff07\uff0a\uff0f\uff1b\uff1f\uff20\uff3c'.split(
      ""
    );
  this.colons = ["\ufe13", ":", "\uff1a", "\ufe55"];
  this.invisibleComma_ = sre.SemanticUtil.numberToUnicode(8291);
  this.commas = ["\uff0c", "\ufe50", ",", this.invisibleComma_];
  this.ellipses = "\u2026\u22ee\u22ef\u22f0\u22f1\ufe19".split("");
  this.fullStops = [".", "\ufe52", "\uff0e"];
  this.dashes = "\u2012\u2013\u2014\u2015\u301c\ufe31\ufe32\ufe58".split("");
  this.primes = "'\u2032\u2033\u2034\u2035\u2036\u2037\u2057\u02b9\u02ba".split(
    ""
  );
  this.degrees = ["\u00b0"];
  this.openClosePairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "\u2045": "\u2046",
    "\u2329": "\u232a",
    "\u2768": "\u2769",
    "\u276a": "\u276b",
    "\u276c": "\u276d",
    "\u276e": "\u276f",
    "\u2770": "\u2771",
    "\u2772": "\u2773",
    "\u2774": "\u2775",
    "\u27c5": "\u27c6",
    "\u27e6": "\u27e7",
    "\u27e8": "\u27e9",
    "\u27ea": "\u27eb",
    "\u27ec": "\u27ed",
    "\u27ee": "\u27ef",
    "\u2983": "\u2984",
    "\u2985": "\u2986",
    "\u2987": "\u2988",
    "\u2989": "\u298a",
    "\u298b": "\u298c",
    "\u298d": "\u298e",
    "\u298f": "\u2990",
    "\u2991": "\u2992",
    "\u2993": "\u2994",
    "\u2995": "\u2996",
    "\u2997": "\u2998",
    "\u29d8": "\u29d9",
    "\u29da": "\u29db",
    "\u29fc": "\u29fd",
    "\u2e22": "\u2e23",
    "\u2e24": "\u2e25",
    "\u2e26": "\u2e27",
    "\u2e28": "\u2e29",
    "\u3008": "\u3009",
    "\u300a": "\u300b",
    "\u300c": "\u300d",
    "\u300e": "\u300f",
    "\u3010": "\u3011",
    "\u3014": "\u3015",
    "\u3016": "\u3017",
    "\u3018": "\u3019",
    "\u301a": "\u301b",
    "\u301d": "\u301e",
    "\ufd3e": "\ufd3f",
    "\ufe17": "\ufe18",
    "\ufe59": "\ufe5a",
    "\ufe5b": "\ufe5c",
    "\ufe5d": "\ufe5e",
    "\uff08": "\uff09",
    "\uff3b": "\uff3d",
    "\uff5b": "\uff5d",
    "\uff5f": "\uff60",
    "\uff62": "\uff63",
    "\u2308": "\u2309",
    "\u230a": "\u230b",
    "\u230c": "\u230d",
    "\u230e": "\u230f",
    "\u231c": "\u231d",
    "\u231e": "\u231f",
    "\u239b": "\u239e",
    "\u239c": "\u239f",
    "\u239d": "\u23a0",
    "\u23a1": "\u23a4",
    "\u23a2": "\u23a5",
    "\u23a3": "\u23a6",
    "\u23a7": "\u23ab",
    "\u23a8": "\u23ac",
    "\u23a9": "\u23ad",
    "\u23b0": "\u23b1",
    "\u23b8": "\u23b9"
  };
  this.topBottomPairs = {
    "\u23b4": "\u23b5",
    "\u23dc": "\u23dd",
    "\u23de": "\u23df",
    "\u23e0": "\u23e1",
    "\ufe35": "\ufe36",
    "\ufe37": "\ufe38",
    "\ufe39": "\ufe3a",
    "\ufe3b": "\ufe3c",
    "\ufe3d": "\ufe3e",
    "\ufe3f": "\ufe40",
    "\ufe41": "\ufe42",
    "\ufe43": "\ufe44",
    "\ufe47": "\ufe48"
  };
  this.leftFences = sre.SemanticUtil.objectsToKeys(this.openClosePairs);
  this.rightFences = sre.SemanticUtil.objectsToValues(this.openClosePairs);
  this.rightFences.push("\u301f");
  this.topFences = sre.SemanticUtil.objectsToKeys(this.topBottomPairs);
  this.bottomFences = sre.SemanticUtil.objectsToValues(this.topBottomPairs);
  this.neutralFences =
    "|\u00a6\u2016\u2223\u23d0\u23b8\u23b9\u2225\u2758\u2980\u2af4\uff5c\uffe4".split(
      ""
    );
  this.allFences = this.neutralFences.concat(
    this.leftFences,
    this.rightFences,
    this.topFences,
    this.bottomFences
  );
  this.capitalLatin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  this.smallLatin = "abcdefghijklmnopqrstuvwxyz\u0131\u0237".split("");
  this.capitalLatinFullWidth =
    "\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a".split(
      ""
    );
  this.smallLatinFullWidth =
    "\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a".split(
      ""
    );
  this.capitalLatinBold =
    "\ud835\udc00 \ud835\udc01 \ud835\udc02 \ud835\udc03 \ud835\udc04 \ud835\udc05 \ud835\udc06 \ud835\udc07 \ud835\udc08 \ud835\udc09 \ud835\udc0a \ud835\udc0b \ud835\udc0c \ud835\udc0d \ud835\udc0e \ud835\udc0f \ud835\udc10 \ud835\udc11 \ud835\udc12 \ud835\udc13 \ud835\udc14 \ud835\udc15 \ud835\udc16 \ud835\udc17 \ud835\udc18 \ud835\udc19".split(
      " "
    );
  this.smallLatinBold =
    "\ud835\udc1a \ud835\udc1b \ud835\udc1c \ud835\udc1d \ud835\udc1e \ud835\udc1f \ud835\udc20 \ud835\udc21 \ud835\udc22 \ud835\udc23 \ud835\udc24 \ud835\udc25 \ud835\udc26 \ud835\udc27 \ud835\udc28 \ud835\udc29 \ud835\udc2a \ud835\udc2b \ud835\udc2c \ud835\udc2d \ud835\udc2e \ud835\udc2f \ud835\udc30 \ud835\udc31 \ud835\udc32 \ud835\udc33".split(
      " "
    );
  this.capitalLatinItalic =
    "\ud835\udc34 \ud835\udc35 \ud835\udc36 \ud835\udc37 \ud835\udc38 \ud835\udc39 \ud835\udc3a \ud835\udc3b \ud835\udc3c \ud835\udc3d \ud835\udc3e \ud835\udc3f \ud835\udc40 \ud835\udc41 \ud835\udc42 \ud835\udc43 \ud835\udc44 \ud835\udc45 \ud835\udc46 \ud835\udc47 \ud835\udc48 \ud835\udc49 \ud835\udc4a \ud835\udc4b \ud835\udc4c \ud835\udc4d".split(
      " "
    );
  this.smallLatinItalic =
    "\ud835\udc4e \ud835\udc4f \ud835\udc50 \ud835\udc51 \ud835\udc52 \ud835\udc53 \ud835\udc54 \u210e \ud835\udc56 \ud835\udc57 \ud835\udc58 \ud835\udc59 \ud835\udc5a \ud835\udc5b \ud835\udc5c \ud835\udc5d \ud835\udc5e \ud835\udc5f \ud835\udc60 \ud835\udc61 \ud835\udc62 \ud835\udc63 \ud835\udc64 \ud835\udc65 \ud835\udc66 \ud835\udc67 \ud835\udea4 \ud835\udea5".split(
      " "
    );
  this.capitalLatinBoldItalic =
    "\ud835\udc68 \ud835\udc69 \ud835\udc6a \ud835\udc6b \ud835\udc6c \ud835\udc6d \ud835\udc6e \ud835\udc6f \ud835\udc70 \ud835\udc71 \ud835\udc72 \ud835\udc73 \ud835\udc74 \ud835\udc75 \ud835\udc76 \ud835\udc77 \ud835\udc78 \ud835\udc79 \ud835\udc7a \ud835\udc7b \ud835\udc7c \ud835\udc7d \ud835\udc7e \ud835\udc7f \ud835\udc80 \ud835\udc81".split(
      " "
    );
  this.smallLatinBoldItalic =
    "\ud835\udc82 \ud835\udc83 \ud835\udc84 \ud835\udc85 \ud835\udc86 \ud835\udc87 \ud835\udc88 \ud835\udc89 \ud835\udc8a \ud835\udc8b \ud835\udc8c \ud835\udc8d \ud835\udc8e \ud835\udc8f \ud835\udc90 \ud835\udc91 \ud835\udc92 \ud835\udc93 \ud835\udc94 \ud835\udc95 \ud835\udc96 \ud835\udc97 \ud835\udc98 \ud835\udc99 \ud835\udc9a \ud835\udc9b".split(
      " "
    );
  this.capitalLatinScript =
    "\ud835\udc9c \u212c \ud835\udc9e \ud835\udc9f \u2130 \u2131 \ud835\udca2 \u210b \u2110 \ud835\udca5 \ud835\udca6 \u2112 \u2133 \ud835\udca9 \ud835\udcaa \ud835\udcab \ud835\udcac \u211b \ud835\udcae \ud835\udcaf \ud835\udcb0 \ud835\udcb1 \ud835\udcb2 \ud835\udcb3 \ud835\udcb4 \ud835\udcb5 \u2118".split(
      " "
    );
  this.smallLatinScript =
    "\ud835\udcb6 \ud835\udcb7 \ud835\udcb8 \ud835\udcb9 \u212f \ud835\udcbb \u210a \ud835\udcbd \ud835\udcbe \ud835\udcbf \ud835\udcc0 \ud835\udcc1 \ud835\udcc2 \ud835\udcc3 \u2134 \ud835\udcc5 \ud835\udcc6 \ud835\udcc7 \ud835\udcc8 \ud835\udcc9 \ud835\udcca \ud835\udccb \ud835\udccc \ud835\udccd \ud835\udcce \ud835\udccf \u2113".split(
      " "
    );
  this.capitalLatinBoldScript =
    "\ud835\udcd0 \ud835\udcd1 \ud835\udcd2 \ud835\udcd3 \ud835\udcd4 \ud835\udcd5 \ud835\udcd6 \ud835\udcd7 \ud835\udcd8 \ud835\udcd9 \ud835\udcda \ud835\udcdb \ud835\udcdc \ud835\udcdd \ud835\udcde \ud835\udcdf \ud835\udce0 \ud835\udce1 \ud835\udce2 \ud835\udce3 \ud835\udce4 \ud835\udce5 \ud835\udce6 \ud835\udce7 \ud835\udce8 \ud835\udce9".split(
      " "
    );
  this.smallLatinBoldScript =
    "\ud835\udcea \ud835\udceb \ud835\udcec \ud835\udced \ud835\udcee \ud835\udcef \ud835\udcf0 \ud835\udcf1 \ud835\udcf2 \ud835\udcf3 \ud835\udcf4 \ud835\udcf5 \ud835\udcf6 \ud835\udcf7 \ud835\udcf8 \ud835\udcf9 \ud835\udcfa \ud835\udcfb \ud835\udcfc \ud835\udcfd \ud835\udcfe \ud835\udcff \ud835\udd00 \ud835\udd01 \ud835\udd02 \ud835\udd03".split(
      " "
    );
  this.capitalLatinFraktur =
    "\ud835\udd04 \ud835\udd05 \u212d \ud835\udd07 \ud835\udd08 \ud835\udd09 \ud835\udd0a \u210c \u2111 \ud835\udd0d \ud835\udd0e \ud835\udd0f \ud835\udd10 \ud835\udd11 \ud835\udd12 \ud835\udd13 \ud835\udd14 \u211c \ud835\udd16 \ud835\udd17 \ud835\udd18 \ud835\udd19 \ud835\udd1a \ud835\udd1b \ud835\udd1c \u2128".split(
      " "
    );
  this.smallLatinFraktur =
    "\ud835\udd1e \ud835\udd1f \ud835\udd20 \ud835\udd21 \ud835\udd22 \ud835\udd23 \ud835\udd24 \ud835\udd25 \ud835\udd26 \ud835\udd27 \ud835\udd28 \ud835\udd29 \ud835\udd2a \ud835\udd2b \ud835\udd2c \ud835\udd2d \ud835\udd2e \ud835\udd2f \ud835\udd30 \ud835\udd31 \ud835\udd32 \ud835\udd33 \ud835\udd34 \ud835\udd35 \ud835\udd36 \ud835\udd37".split(
      " "
    );
  this.capitalLatinDoubleStruck =
    "\ud835\udd38 \ud835\udd39 \u2102 \ud835\udd3b \ud835\udd3c \ud835\udd3d \ud835\udd3e \u210d \ud835\udd40 \ud835\udd41 \ud835\udd42 \ud835\udd43 \ud835\udd44 \u2115 \ud835\udd46 \u2119 \u211a \u211d \ud835\udd4a \ud835\udd4b \ud835\udd4c \ud835\udd4d \ud835\udd4e \ud835\udd4f \ud835\udd50 \u2124".split(
      " "
    );
  this.smallLatinDoubleStruck =
    "\ud835\udd52 \ud835\udd53 \ud835\udd54 \ud835\udd55 \ud835\udd56 \ud835\udd57 \ud835\udd58 \ud835\udd59 \ud835\udd5a \ud835\udd5b \ud835\udd5c \ud835\udd5d \ud835\udd5e \ud835\udd5f \ud835\udd60 \ud835\udd61 \ud835\udd62 \ud835\udd63 \ud835\udd64 \ud835\udd65 \ud835\udd66 \ud835\udd67 \ud835\udd68 \ud835\udd69 \ud835\udd6a \ud835\udd6b".split(
      " "
    );
  this.capitalLatinBoldFraktur =
    "\ud835\udd6c \ud835\udd6d \ud835\udd6e \ud835\udd6f \ud835\udd70 \ud835\udd71 \ud835\udd72 \ud835\udd73 \ud835\udd74 \ud835\udd75 \ud835\udd76 \ud835\udd77 \ud835\udd78 \ud835\udd79 \ud835\udd7a \ud835\udd7b \ud835\udd7c \ud835\udd7d \ud835\udd7e \ud835\udd7f \ud835\udd80 \ud835\udd81 \ud835\udd82 \ud835\udd83 \ud835\udd84 \ud835\udd85".split(
      " "
    );
  this.smallLatinBoldFraktur =
    "\ud835\udd86 \ud835\udd87 \ud835\udd88 \ud835\udd89 \ud835\udd8a \ud835\udd8b \ud835\udd8c \ud835\udd8d \ud835\udd8e \ud835\udd8f \ud835\udd90 \ud835\udd91 \ud835\udd92 \ud835\udd93 \ud835\udd94 \ud835\udd95 \ud835\udd96 \ud835\udd97 \ud835\udd98 \ud835\udd99 \ud835\udd9a \ud835\udd9b \ud835\udd9c \ud835\udd9d \ud835\udd9e \ud835\udd9f".split(
      " "
    );
  this.capitalLatinSansSerif =
    "\ud835\udda0 \ud835\udda1 \ud835\udda2 \ud835\udda3 \ud835\udda4 \ud835\udda5 \ud835\udda6 \ud835\udda7 \ud835\udda8 \ud835\udda9 \ud835\uddaa \ud835\uddab \ud835\uddac \ud835\uddad \ud835\uddae \ud835\uddaf \ud835\uddb0 \ud835\uddb1 \ud835\uddb2 \ud835\uddb3 \ud835\uddb4 \ud835\uddb5 \ud835\uddb6 \ud835\uddb7 \ud835\uddb8 \ud835\uddb9".split(
      " "
    );
  this.smallLatinSansSerif =
    "\ud835\uddba \ud835\uddbb \ud835\uddbc \ud835\uddbd \ud835\uddbe \ud835\uddbf \ud835\uddc0 \ud835\uddc1 \ud835\uddc2 \ud835\uddc3 \ud835\uddc4 \ud835\uddc5 \ud835\uddc6 \ud835\uddc7 \ud835\uddc8 \ud835\uddc9 \ud835\uddca \ud835\uddcb \ud835\uddcc \ud835\uddcd \ud835\uddce \ud835\uddcf \ud835\uddd0 \ud835\uddd1 \ud835\uddd2 \ud835\uddd3".split(
      " "
    );
  this.capitalLatinSansSerifBold =
    "\ud835\uddd4 \ud835\uddd5 \ud835\uddd6 \ud835\uddd7 \ud835\uddd8 \ud835\uddd9 \ud835\uddda \ud835\udddb \ud835\udddc \ud835\udddd \ud835\uddde \ud835\udddf \ud835\udde0 \ud835\udde1 \ud835\udde2 \ud835\udde3 \ud835\udde4 \ud835\udde5 \ud835\udde6 \ud835\udde7 \ud835\udde8 \ud835\udde9 \ud835\uddea \ud835\uddeb \ud835\uddec \ud835\udded".split(
      " "
    );
  this.smallLatinSansSerifBold =
    "\ud835\uddee \ud835\uddef \ud835\uddf0 \ud835\uddf1 \ud835\uddf2 \ud835\uddf3 \ud835\uddf4 \ud835\uddf5 \ud835\uddf6 \ud835\uddf7 \ud835\uddf8 \ud835\uddf9 \ud835\uddfa \ud835\uddfb \ud835\uddfc \ud835\uddfd \ud835\uddfe \ud835\uddff \ud835\ude00 \ud835\ude01 \ud835\ude02 \ud835\ude03 \ud835\ude04 \ud835\ude05 \ud835\ude06 \ud835\ude07".split(
      " "
    );
  this.capitalLatinSansSerifItalic =
    "\ud835\ude08 \ud835\ude09 \ud835\ude0a \ud835\ude0b \ud835\ude0c \ud835\ude0d \ud835\ude0e \ud835\ude0f \ud835\ude10 \ud835\ude11 \ud835\ude12 \ud835\ude13 \ud835\ude14 \ud835\ude15 \ud835\ude16 \ud835\ude17 \ud835\ude18 \ud835\ude19 \ud835\ude1a \ud835\ude1b \ud835\ude1c \ud835\ude1d \ud835\ude1e \ud835\ude1f \ud835\ude20 \ud835\ude21".split(
      " "
    );
  this.smallLatinSansSerifItalic =
    "\ud835\ude22 \ud835\ude23 \ud835\ude24 \ud835\ude25 \ud835\ude26 \ud835\ude27 \ud835\ude28 \ud835\ude29 \ud835\ude2a \ud835\ude2b \ud835\ude2c \ud835\ude2d \ud835\ude2e \ud835\ude2f \ud835\ude30 \ud835\ude31 \ud835\ude32 \ud835\ude33 \ud835\ude34 \ud835\ude35 \ud835\ude36 \ud835\ude37 \ud835\ude38 \ud835\ude39 \ud835\ude3a \ud835\ude3b".split(
      " "
    );
  this.capitalLatinSansSerifBoldItalic =
    "\ud835\ude3c \ud835\ude3d \ud835\ude3e \ud835\ude3f \ud835\ude40 \ud835\ude41 \ud835\ude42 \ud835\ude43 \ud835\ude44 \ud835\ude45 \ud835\ude46 \ud835\ude47 \ud835\ude48 \ud835\ude49 \ud835\ude4a \ud835\ude4b \ud835\ude4c \ud835\ude4d \ud835\ude4e \ud835\ude4f \ud835\ude50 \ud835\ude51 \ud835\ude52 \ud835\ude53 \ud835\ude54 \ud835\ude55".split(
      " "
    );
  this.smallLatinSansSerifBoldItalic =
    "\ud835\ude56 \ud835\ude57 \ud835\ude58 \ud835\ude59 \ud835\ude5a \ud835\ude5b \ud835\ude5c \ud835\ude5d \ud835\ude5e \ud835\ude5f \ud835\ude60 \ud835\ude61 \ud835\ude62 \ud835\ude63 \ud835\ude64 \ud835\ude65 \ud835\ude66 \ud835\ude67 \ud835\ude68 \ud835\ude69 \ud835\ude6a \ud835\ude6b \ud835\ude6c \ud835\ude6d \ud835\ude6e \ud835\ude6f".split(
      " "
    );
  this.capitalLatinMonospace =
    "\ud835\ude70 \ud835\ude71 \ud835\ude72 \ud835\ude73 \ud835\ude74 \ud835\ude75 \ud835\ude76 \ud835\ude77 \ud835\ude78 \ud835\ude79 \ud835\ude7a \ud835\ude7b \ud835\ude7c \ud835\ude7d \ud835\ude7e \ud835\ude7f \ud835\ude80 \ud835\ude81 \ud835\ude82 \ud835\ude83 \ud835\ude84 \ud835\ude85 \ud835\ude86 \ud835\ude87 \ud835\ude88 \ud835\ude89".split(
      " "
    );
  this.smallLatinMonospace =
    "\ud835\ude8a \ud835\ude8b \ud835\ude8c \ud835\ude8d \ud835\ude8e \ud835\ude8f \ud835\ude90 \ud835\ude91 \ud835\ude92 \ud835\ude93 \ud835\ude94 \ud835\ude95 \ud835\ude96 \ud835\ude97 \ud835\ude98 \ud835\ude99 \ud835\ude9a \ud835\ude9b \ud835\ude9c \ud835\ude9d \ud835\ude9e \ud835\ude9f \ud835\udea0 \ud835\udea1 \ud835\udea2 \ud835\udea3".split(
      " "
    );
  this.latinDoubleStruckItalic = [
    "\u2145",
    "\u2146",
    "\u2147",
    "\u2148",
    "\u2149"
  ];
  this.capitalGreek =
    "\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9".split(
      ""
    );
  this.smallGreek =
    "\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9".split(
      ""
    );
  this.capitalGreekBold =
    "\ud835\udea8 \ud835\udea9 \ud835\udeaa \ud835\udeab \ud835\udeac \ud835\udead \ud835\udeae \ud835\udeaf \ud835\udeb0 \ud835\udeb1 \ud835\udeb2 \ud835\udeb3 \ud835\udeb4 \ud835\udeb5 \ud835\udeb6 \ud835\udeb7 \ud835\udeb8 \ud835\udeba \ud835\udebb \ud835\udebc \ud835\udebd \ud835\udebe \ud835\udebf \ud835\udec0".split(
      " "
    );
  this.smallGreekBold =
    "\ud835\udec2 \ud835\udec3 \ud835\udec4 \ud835\udec5 \ud835\udec6 \ud835\udec7 \ud835\udec8 \ud835\udec9 \ud835\udeca \ud835\udecb \ud835\udecc \ud835\udecd \ud835\udece \ud835\udecf \ud835\uded0 \ud835\uded1 \ud835\uded2 \ud835\uded3 \ud835\uded4 \ud835\uded5 \ud835\uded6 \ud835\uded7 \ud835\uded8 \ud835\uded9 \ud835\udeda".split(
      " "
    );
  this.capitalGreekItalic =
    "\ud835\udee2 \ud835\udee3 \ud835\udee4 \ud835\udee5 \ud835\udee6 \ud835\udee7 \ud835\udee8 \ud835\udee9 \ud835\udeea \ud835\udeeb \ud835\udeec \ud835\udeed \ud835\udeee \ud835\udeef \ud835\udef0 \ud835\udef1 \ud835\udef2 \ud835\udef4 \ud835\udef5 \ud835\udef6 \ud835\udef7 \ud835\udef8 \ud835\udef9 \ud835\udefa".split(
      " "
    );
  this.smallGreekItalic =
    "\ud835\udefc \ud835\udefd \ud835\udefe \ud835\udeff \ud835\udf00 \ud835\udf01 \ud835\udf02 \ud835\udf03 \ud835\udf04 \ud835\udf05 \ud835\udf06 \ud835\udf07 \ud835\udf08 \ud835\udf09 \ud835\udf0a \ud835\udf0b \ud835\udf0c \ud835\udf0d \ud835\udf0e \ud835\udf0f \ud835\udf10 \ud835\udf11 \ud835\udf12 \ud835\udf13 \ud835\udf14".split(
      " "
    );
  this.capitalGreekBoldItalic =
    "\ud835\udf1c \ud835\udf1d \ud835\udf1e \ud835\udf1f \ud835\udf20 \ud835\udf21 \ud835\udf22 \ud835\udf23 \ud835\udf24 \ud835\udf25 \ud835\udf26 \ud835\udf27 \ud835\udf28 \ud835\udf29 \ud835\udf2a \ud835\udf2b \ud835\udf2c \ud835\udf2e \ud835\udf2f \ud835\udf30 \ud835\udf31 \ud835\udf32 \ud835\udf33 \ud835\udf34".split(
      " "
    );
  this.smallGreekBoldItalic =
    "\ud835\udf36 \ud835\udf37 \ud835\udf38 \ud835\udf39 \ud835\udf3a \ud835\udf3b \ud835\udf3c \ud835\udf3d \ud835\udf3e \ud835\udf3f \ud835\udf40 \ud835\udf41 \ud835\udf42 \ud835\udf43 \ud835\udf44 \ud835\udf45 \ud835\udf46 \ud835\udf47 \ud835\udf48 \ud835\udf49 \ud835\udf4a \ud835\udf4b \ud835\udf4c \ud835\udf4d \ud835\udf4e".split(
      " "
    );
  this.capitalGreekSansSerifBold =
    "\ud835\udf56 \ud835\udf57 \ud835\udf58 \ud835\udf59 \ud835\udf5a \ud835\udf5b \ud835\udf5c \ud835\udf5d \ud835\udf5e \ud835\udf5f \ud835\udf60 \ud835\udf61 \ud835\udf62 \ud835\udf63 \ud835\udf64 \ud835\udf65 \ud835\udf66 \ud835\udf68 \ud835\udf69 \ud835\udf6a \ud835\udf6b \ud835\udf6c \ud835\udf6d \ud835\udf6e".split(
      " "
    );
  this.smallGreekSansSerifBold =
    "\ud835\udf70 \ud835\udf71 \ud835\udf72 \ud835\udf73 \ud835\udf74 \ud835\udf75 \ud835\udf76 \ud835\udf77 \ud835\udf78 \ud835\udf79 \ud835\udf7a \ud835\udf7b \ud835\udf7c \ud835\udf7d \ud835\udf7e \ud835\udf7f \ud835\udf80 \ud835\udf81 \ud835\udf82 \ud835\udf83 \ud835\udf84 \ud835\udf85 \ud835\udf86 \ud835\udf87 \ud835\udf88".split(
      " "
    );
  this.capitalGreekSansSerifBoldItalic =
    "\ud835\udf90 \ud835\udf91 \ud835\udf92 \ud835\udf93 \ud835\udf94 \ud835\udf95 \ud835\udf96 \ud835\udf97 \ud835\udf98 \ud835\udf99 \ud835\udf9a \ud835\udf9b \ud835\udf9c \ud835\udf9d \ud835\udf9e \ud835\udf9f \ud835\udfa0 \ud835\udfa2 \ud835\udfa3 \ud835\udfa4 \ud835\udfa5 \ud835\udfa6 \ud835\udfa7 \ud835\udfa8".split(
      " "
    );
  this.smallGreekSansSerifBoldItalic =
    "\ud835\udfaa \ud835\udfab \ud835\udfac \ud835\udfad \ud835\udfae \ud835\udfaf \ud835\udfb0 \ud835\udfb1 \ud835\udfb2 \ud835\udfb3 \ud835\udfb4 \ud835\udfb5 \ud835\udfb6 \ud835\udfb7 \ud835\udfb8 \ud835\udfb9 \ud835\udfba \ud835\udfbb \ud835\udfbc \ud835\udfbd \ud835\udfbe \ud835\udfbf \ud835\udfc0 \ud835\udfc1 \ud835\udfc2".split(
      " "
    );
  this.greekDoubleStruck = ["\u213c", "\u213d", "\u213e", "\u213f"];
  this.greekSpecial =
    "\u03d0\u03d1\u03d5\u03d6\u03d7\u03f0\u03f1\u03f5\u03f6\u03f4".split("");
  this.greekSpecialBold =
    "\ud835\udedc \ud835\udedd \ud835\udede \ud835\udedf \ud835\udee0 \ud835\udee1".split(
      " "
    );
  this.greekSpecialItalic =
    "\ud835\udf16 \ud835\udf17 \ud835\udf18 \ud835\udf19 \ud835\udf1a \ud835\udf1b".split(
      " "
    );
  this.greekSpecialSansSerifBold =
    "\ud835\udf8a \ud835\udf8b \ud835\udf8c \ud835\udf8d \ud835\udf8e \ud835\udf8f".split(
      " "
    );
  this.hebrewLetters = ["\u2135", "\u2136", "\u2137", "\u2138"];
  this.allLetters = this.capitalLatin.concat(
    this.smallLatin,
    this.capitalLatinFullWidth,
    this.smallLatinFullWidth,
    this.capitalLatinBold,
    this.smallLatinBold,
    this.capitalLatinItalic,
    this.capitalLatinBoldItalic,
    this.smallLatinBoldItalic,
    this.smallLatinItalic,
    this.capitalLatinScript,
    this.smallLatinScript,
    this.capitalLatinBoldScript,
    this.smallLatinBoldScript,
    this.capitalLatinFraktur,
    this.smallLatinFraktur,
    this.capitalLatinDoubleStruck,
    this.smallLatinDoubleStruck,
    this.capitalLatinBoldFraktur,
    this.smallLatinBoldFraktur,
    this.capitalLatinSansSerif,
    this.smallLatinSansSerif,
    this.capitalLatinSansSerifBold,
    this.smallLatinSansSerifBold,
    this.capitalLatinSansSerifItalic,
    this.smallLatinSansSerifItalic,
    this.capitalLatinSansSerifBoldItalic,
    this.smallLatinSansSerifBoldItalic,
    this.capitalLatinMonospace,
    this.smallLatinMonospace,
    this.latinDoubleStruckItalic,
    this.capitalGreek,
    this.smallGreek,
    this.capitalGreekBold,
    this.smallGreekBold,
    this.capitalGreekItalic,
    this.smallGreekItalic,
    this.capitalGreekBoldItalic,
    this.smallGreekBoldItalic,
    this.capitalGreekSansSerifBold,
    this.smallGreekSansSerifBold,
    this.greekDoubleStruck,
    this.greekSpecial,
    this.capitalGreekSansSerifBoldItalic,
    this.smallGreekSansSerifBoldItalic,
    this.greekSpecialBold,
    this.greekSpecialItalic,
    this.greekSpecialSansSerifBold,
    this.hebrewLetters
  );
  this.additions =
    "+\u00b1\u2213\u2214\u2227\u2228\u2229\u222a\u228c\u228d\u228e\u2293\u2294\u229d\u229e\u22a4\u22a5\u22ba\u22bb\u22bc\u22c4\u22ce\u22cf\u22d2\u22d3\u2a5e\u2295\u22d4".split(
      ""
    );
  this.invisiblePlus_ = sre.SemanticUtil.numberToUnicode(8292);
  this.additions.push(this.invisiblePlus_);
  this.multiplications =
    "\u2020\u2021\u2210\u2217\u2218\u2219\u2240\u229a\u229b\u22a0\u22a1\u22c5\u22c6\u22c7\u22c8\u22c9\u22ca\u22cb\u22cc\u25cb\u00b7*\u2297\u2299".split(
      ""
    );
  this.invisibleTimes_ = sre.SemanticUtil.numberToUnicode(8290);
  this.multiplications.push(this.invisibleTimes_);
  this.subtractions =
    "-\u2052\u207b\u208b\u2212\u2216\u2238\u2242\u2296\u229f\u2796\u2a29\u2a2a\u2a2b\u2a2c\u2a3a\u2a41\ufe63\uff0d\u2010\u2011".split(
      ""
    );
  this.divisions = "/\u00f7\u2044\u2215\u2298\u27cc\u29bc\u2a38".split("");
  this.functionApplication_ = sre.SemanticUtil.numberToUnicode(8289);
  this.equalities =
    "=~\u207c\u208c\u223c\u223d\u2243\u2245\u2248\u224a\u224b\u224c\u224d\u224e\u2251\u2252\u2253\u2254\u2255\u2256\u2257\u2258\u2259\u225a\u225b\u225c\u225d\u225e\u225f\u2261\u2263\u29e4\u2a66\u2a6e\u2a6f\u2a70\u2a71\u2a72\u2a73\u2a74\u2a75\u2a76\u2a77\u2a78\u22d5\u2a6d\u2a6a\u2a6b\u2a6c\ufe66\uff1d\u2a6c\u229c\u2237".split(
      ""
    );
  this.inequalities =
    "<>\u2241\u2242\u2244\u2246\u2247\u2249\u224f\u2250\u2260\u2262\u2264\u2265\u2266\u2267\u2268\u2269\u226a\u226b\u226c\u226d\u226e\u226f\u2270\u2271\u2272\u2273\u2274\u2275\u2276\u2277\u2278\u2279\u227a\u227b\u227c\u227d\u227e\u227f\u2280\u2281\u22d6\u22d7\u22d8\u22d9\u22da\u22db\u22dc\u22dd\u22de\u22df\u22e0\u22e1\u22e6\u22e7\u22e8\u22e9\u2a79\u2a7a\u2a7b\u2a7c\u2a7d\u2a7e\u2a7f\u2a80\u2a81\u2a82\u2a83\u2a84\u2a85\u2a86\u2a87\u2a88\u2a89\u2a8a\u2a8b\u2a8c\u2a8d\u2a8e\u2a8f\u2a90\u2a91\u2a92\u2a93\u2a94\u2a95\u2a96\u2a97\u2a98\u2a99\u2a9a\u2a9b\u2a9c\u2a9d\u2a9e\u2a9f\u2aa0\u2aa1\u2aa2\u2aa3\u2aa4\u2aa5\u2aa6\u2aa7\u2aa8\u2aa9\u2aaa\u2aab\u2aac\u2aad\u2aae\u2aaf\u2ab0\u2ab1\u2ab2\u2ab3\u2ab4\u2ab5\u2ab6\u2ab7\u2ab8\u2ab9\u2aba\u2abb\u2abc\u2af7\u2af8\u2af9\u2afa\u29c0\u29c1\ufe64\ufe65\uff1c\uff1e".split(
      ""
    );
  this.setRelations =
    "\u22e2\u22e3\u22e4\u22e5\u2282\u2283\u2284\u2285\u2286\u2287\u2288\u2289\u228a\u228b\u228f\u2290\u2291\u2292\u2abd\u2abe\u2abf\u2ac0\u2ac1\u2ac2\u2ac3\u2ac4\u2ac5\u2ac6\u2ac7\u2ac8\u2ac9\u2aca\u2acb\u2acc\u2acd\u2ace\u2acf\u2ad0\u2ad1\u2ad2\u2ad3\u2ad4\u2ad5\u2ad6\u2ad7\u2ad8\u22d0\u22d1\u22ea\u22eb\u22ec\u22ed\u22b2\u22b3\u22b4\u22b5".split(
      ""
    );
  this.elementRelations =
    "\u2208\u2209\u220a\u220b\u220c\u220d\u22f2\u22f3\u22f4\u22f5\u22f6\u22f7\u22f8\u22f9\u22fa\u22fb\u22fc\u22fd\u22fe\u22ff".split(
      ""
    );
  this.relations =
    "\u22a2\u22a3\u22a6\u22a7\u22a8\u22a9\u22aa\u22ab\u22ac\u22ad\u22ae\u22af\u2ade\u2adf\u2ae0\u2ae1\u2ae2\u2ae3\u2ae4\u2ae5\u2ae6\u2ae7\u2ae8\u2ae9\u2aea\u2aeb\u2aec\u2aed".split(
      ""
    );
  this.arrows =
    "\u2190\u2191\u2192\u2193\u2194\u2195\u2196\u2197\u2198\u2199\u219a\u219b\u219c\u219d\u219e\u219f\u21a0\u21a1\u21a2\u21a3\u21a4\u21a5\u21a6\u21a7\u21a8\u21a9\u21aa\u21ab\u21ac\u21ad\u21ae\u21af\u21b0\u21b1\u21b2\u21b3\u21b4\u21b5\u21b6\u21b7\u21b8\u21b9\u21ba\u21bb\u21c4\u21c5\u21c6\u21c7\u21c8\u21c9\u21ca\u21cd\u21ce\u21cf\u21d0\u21d1\u21d2\u21d3\u21d4\u21d5\u21d6\u21d7\u21d8\u21d9\u21da\u21db\u21dc\u21dd\u21de\u21df\u21e0\u21e1\u21e2\u21e3\u21e4\u21e5\u21e6\u21e7\u21e8\u21e9\u21ea\u21eb\u21ec\u21ed\u21ee\u21ef\u21f0\u21f1\u21f2\u21f3\u21f4\u21f5\u21f6\u21f7\u21f8\u21f9\u21fa\u21fb\u21fc\u21fd\u21fe\u21ff\u2301\u2303\u2304\u2324\u238b\u2794\u2798\u2799\u279a\u279b\u279c\u279d\u279e\u279f\u27a0\u27a1\u27a2\u27a3\u27a4\u27a5\u27a6\u27a7\u27a8\u27a9\u27aa\u27ab\u27ac\u27ad\u27ae\u27af\u27b1\u27b2\u27b3\u27b4\u27b5\u27b6\u27b7\u27b8\u27b9\u27ba\u27bb\u27bc\u27bd\u27be\u27f0\u27f1\u27f2\u27f3\u27f4\u27f5\u27f6\u27f7\u27f8\u27f9\u27fa\u27fb\u27fc\u27fd\u27fe\u27ff\u2900\u2901\u2902\u2903\u2904\u2905\u2906\u2907\u2908\u2909\u290a\u290b\u290c\u290d\u290e\u290f\u2910\u2911\u2912\u2913\u2914\u2915\u2916\u2917\u2918\u2919\u291a\u291b\u291c\u291d\u291e\u291f\u2920\u2921\u2922\u2923\u2924\u2925\u2926\u2927\u2928\u2929\u292a\u292d\u292e\u292f\u2930\u2931\u2932\u2933\u2934\u2935\u2936\u2937\u2938\u2939\u293a\u293b\u293c\u293d\u293e\u293f\u2940\u2941\u2942\u2943\u2944\u2945\u2946\u2947\u2948\u2949\u2970\u2971\u2972\u2973\u2974\u2975\u2976\u2977\u2978\u2979\u297a\u297b\u29b3\u29b4\u29bd\u29ea\u29ec\u29ed\u2a17\u2b00\u2b01\u2b02\u2b03\u2b04\u2b05\u2b06\u2b07\u2b08\u2b09\u2b0a\u2b0b\u2b0c\u2b0d\u2b0e\u2b0f\u2b10\u2b11\u2b30\u2b31\u2b32\u2b33\u2b34\u2b35\u2b36\u2b37\u2b38\u2b39\u2b3a\u2b3b\u2b3c\u2b3d\u2b3e\u2b3f\u2b40\u2b41\u2b42\u2b43\u2b44\u2b45\u2b46\u2b47\u2b48\u2b49\u2b4a\u2b4b\u2b4c\uffe9\uffea\uffeb\uffec\u21bc\u21bd\u21be\u21bf\u21c0\u21c1\u21c2\u21c3\u21cb\u21cc\u294a\u294b\u294c\u294d\u294e\u294f\u2950\u2951\u2952\u2953\u2954\u2955\u2956\u2957\u2958\u2959\u295a\u295b\u295c\u295d\u295e\u295f\u2960\u2961\u2962\u2963\u2964\u2965\u2966\u2967\u2968\u2969\u296a\u296b\u296c\u296d\u296e\u296f\u297c\u297d\u297e\u297f".split(
      ""
    );
  this.sumOps =
    "\u2140\u220f\u2210\u2211\u22c0\u22c1\u22c2\u22c3\u2a00\u2a01\u2a02\u2a03\u2a04\u2a05\u2a06\u2a07\u2a08\u2a09\u2a0a\u2a0b\u2afc\u2aff".split(
      ""
    );
  this.intOps =
    "\u222b\u222c\u222d\u222e\u222f\u2230\u2231\u2232\u2233\u2a0c\u2a0d\u2a0e\u2a0f\u2a10\u2a11\u2a12\u2a13\u2a14\u2a15\u2a16\u2a17\u2a18\u2a19\u2a1a\u2a1b\u2a1c".split(
      ""
    );
  this.geometryOps =
    "\u221f\u2220\u2221\u2222\u22be\u22bf\u25b3\u25b7\u25bd\u25c1".split("");
  this.prefixOps = "\u2200\u2203\u2206\u2207\u2202\u2201\u2204".split("");
  this.prefixOpsBold = [
    "\ud835\udec1",
    "\ud835\udedb",
    "\ud835\udfca",
    "\ud835\udfcb"
  ];
  this.prefixOpsItalic = ["\ud835\udefb", "\ud835\udf15"];
  this.prefixOpsSansSerifBold = ["\ud835\udf6f", "\ud835\udf89"];
  this.operatorBits =
    "\u2320\u2321\u23b6\u23aa\u23ae\u23af\u23b2\u23b3\u23b7".split("");
  this.digitsNormal = "0123456789".split("");
  this.digitsFullWidth =
    "\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19".split("");
  this.digitsBold =
    "\ud835\udfce \ud835\udfcf \ud835\udfd0 \ud835\udfd1 \ud835\udfd2 \ud835\udfd3 \ud835\udfd4 \ud835\udfd5 \ud835\udfd6 \ud835\udfd7".split(
      " "
    );
  this.digitsDoubleStruck =
    "\ud835\udfd8 \ud835\udfd9 \ud835\udfda \ud835\udfdb \ud835\udfdc \ud835\udfdd \ud835\udfde \ud835\udfdf \ud835\udfe0 \ud835\udfe1".split(
      " "
    );
  this.digitsSansSerif =
    "\ud835\udfe2 \ud835\udfe3 \ud835\udfe4 \ud835\udfe5 \ud835\udfe6 \ud835\udfe7 \ud835\udfe8 \ud835\udfe9 \ud835\udfea \ud835\udfeb".split(
      " "
    );
  this.digitsSansSerifBold =
    "\ud835\udfec \ud835\udfed \ud835\udfee \ud835\udfef \ud835\udff0 \ud835\udff1 \ud835\udff2 \ud835\udff3 \ud835\udff4 \ud835\udff5".split(
      " "
    );
  this.digitsMonospace =
    "\ud835\udff6 \ud835\udff7 \ud835\udff8 \ud835\udff9 \ud835\udffa \ud835\udffb \ud835\udffc \ud835\udffd \ud835\udffe \ud835\udfff".split(
      " "
    );
  this.digitsSuperscript =
    "\u00b2\u00b3\u00b9\u2070\u2074\u2075\u2076\u2077\u2078\u2079".split("");
  this.digitsSubscript =
    "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089".split("");
  this.fractions =
    "\u00bc\u00bd\u00be\u2150\u2151\u2152\u2153\u2154\u2155\u2156\u2157\u2158\u2159\u215a\u215b\u215c\u215d\u215e\u215f\u2189".split(
      ""
    );
  this.enclosedNumbers =
    "\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246a\u246b\u246c\u246d\u246e\u246f\u2470\u2471\u2472\u2473\u24ea\u24eb\u24ec\u24ed\u24ee\u24ef\u24f0\u24f1\u24f2\u24f3\u24f4\u24f5\u24f6\u24f7\u24f8\u24f9\u24fa\u24fb\u24fc\u24fd\u24fe\u24ff\u2776\u2777\u2778\u2779\u277a\u277b\u277c\u277d\u277e\u277f\u2780\u2781\u2782\u2783\u2784\u2785\u2786\u2787\u2788\u2789\u278a\u278b\u278c\u278d\u278e\u278f\u2790\u2791\u2792\u2793\u3248\u3249\u324a\u324b\u324c\u324d\u324e\u324f\u3251\u3252\u3253\u3254\u3255\u3256\u3257\u3258\u3259\u325a\u325b\u325c\u325d\u325e\u325f\u32b1\u32b2\u32b3\u32b4\u32b5\u32b6\u32b7\u32b8\u32b9\u32ba\u32bb\u32bc\u32bd\u32be\u32bf".split(
      ""
    );
  this.fencedNumbers =
    "\u2474\u2475\u2476\u2477\u2478\u2479\u247a\u247b\u247c\u247d\u247e\u247f\u2480\u2481\u2482\u2483\u2484\u2485\u2486\u2487".split(
      ""
    );
  this.punctuatedNumbers =
    "\u2488 \u2489 \u248a \u248b \u248c \u248d \u248e \u248f \u2490 \u2491 \u2492 \u2493 \u2494 \u2495 \u2496 \u2497 \u2498 \u2499 \u249a \u249b \ud83c\udd00 \ud83c\udd01 \ud83c\udd02 \ud83c\udd03 \ud83c\udd04 \ud83c\udd05 \ud83c\udd06 \ud83c\udd07 \ud83c\udd08 \ud83c\udd09 \ud83c\udd0a".split(
      " "
    );
  this.digits = this.digitsNormal.concat(
    this.digitsFullWidth,
    this.digitsBold,
    this.digitsDoubleStruck,
    this.digitsSansSerif,
    this.digitsSansSerifBold,
    this.digitsMonospace
  );
  this.numbers = this.fractions;
  this.otherNumbers = this.digitsSuperscript.concat(
    this.digitsSubscript,
    this.enclosedNumbers,
    this.fencedNumbers,
    this.punctuatedNumbers
  );
  this.allNumbers = this.digits.concat(this.numbers, this.otherNumbers);
  this.trigonometricFunctions =
    "cos;cot;csc;sec;sin;tan;arccos;arccot;arccsc;arcsec;arcsin;arctan;arc cos;arc cot;arc csc;arc sec;arc sin;arc tan".split(
      ";"
    );
  this.hyperbolicFunctions =
    "cosh coth csch sech sinh tanh arcosh arcoth arcsch arsech arsinh artanh arccosh arccoth arccsch arcsech arcsinh arctanh".split(
      " "
    );
  this.algebraicFunctions = "deg det dim hom ker Tr tr".split(" ");
  this.elementaryFunctions = "log ln lg exp expt gcd gcd arg im re Pr".split(
    " "
  );
  this.prefixFunctions = this.trigonometricFunctions.concat(
    this.hyperbolicFunctions,
    this.algebraicFunctions,
    this.elementaryFunctions
  );
  this.limitFunctions =
    "inf;lim;liminf;limsup;max;min;sup;injlim;projlim;inj lim;proj lim".split(
      ";"
    );
  this.infixFunctions = ["mod", "rem"];
  this.symbolSetToSemantic_ = [
    {
      set: this.generalPunctuations,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.UNKNOWN
    },
    {
      set: this.colons,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.COLON
    },
    {
      set: this.commas,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.COMMA
    },
    {
      set: this.ellipses,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.ELLIPSIS
    },
    {
      set: this.fullStops,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.FULLSTOP
    },
    {
      set: this.dashes,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.DASH
    },
    {
      set: this.primes,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.PRIME
    },
    {
      set: this.degrees,
      type: sre.SemanticAttr.Type.PUNCTUATION,
      role: sre.SemanticAttr.Role.DEGREE
    },
    {
      set: this.leftFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.OPEN
    },
    {
      set: this.rightFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.CLOSE
    },
    {
      set: this.topFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.TOP
    },
    {
      set: this.bottomFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.BOTTOM
    },
    {
      set: this.neutralFences,
      type: sre.SemanticAttr.Type.FENCE,
      role: sre.SemanticAttr.Role.NEUTRAL
    },
    {
      set: this.smallLatin,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.capitalLatin,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.smallLatinFullWidth,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.capitalLatinFullWidth,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.smallLatinBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.capitalLatinBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.smallLatinItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.capitalLatinItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.smallLatinBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDITALIC
    },
    {
      set: this.capitalLatinBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDITALIC
    },
    {
      set: this.smallLatinScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SCRIPT
    },
    {
      set: this.capitalLatinScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SCRIPT
    },
    {
      set: this.smallLatinBoldScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDSCRIPT
    },
    {
      set: this.capitalLatinBoldScript,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDSCRIPT
    },
    {
      set: this.smallLatinFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.FRAKTUR
    },
    {
      set: this.capitalLatinFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.FRAKTUR
    },
    {
      set: this.smallLatinDoubleStruck,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.capitalLatinDoubleStruck,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.smallLatinBoldFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDFRAKTUR
    },
    {
      set: this.capitalLatinBoldFraktur,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.BOLDFRAKTUR
    },
    {
      set: this.smallLatinSansSerif,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIF
    },
    {
      set: this.capitalLatinSansSerif,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIF
    },
    {
      set: this.smallLatinSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.capitalLatinSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.smallLatinSansSerifItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFITALIC
    },
    {
      set: this.capitalLatinSansSerifItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFITALIC
    },
    {
      set: this.smallLatinSansSerifBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLDITALIC
    },
    {
      set: this.capitalLatinSansSerifBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLDITALIC
    },
    {
      set: this.smallLatinMonospace,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.MONOSPACE
    },
    {
      set: this.capitalLatinMonospace,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.MONOSPACE
    },
    {
      set: this.latinDoubleStruckItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.LATINLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCKITALIC
    },
    {
      set: this.smallGreek,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.capitalGreek,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.smallGreekBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.capitalGreekBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.smallGreekItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.capitalGreekItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.smallGreekBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLDITALIC
    },
    {
      set: this.capitalGreekBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLDITALIC
    },
    {
      set: this.smallGreekSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.capitalGreekSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.capitalGreekSansSerifBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLDITALIC
    },
    {
      set: this.smallGreekSansSerifBoldItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLDITALIC
    },
    {
      set: this.greekDoubleStruck,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.greekSpecial,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.greekSpecialBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.greekSpecialItalic,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.greekSpecialSansSerifBold,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.GREEKLETTER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.hebrewLetters,
      type: sre.SemanticAttr.Type.IDENTIFIER,
      role: sre.SemanticAttr.Role.OTHERLETTER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.digitsNormal,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.digitsFullWidth,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.NORMAL
    },
    {
      set: this.digitsBold,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.digitsDoubleStruck,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.DOUBLESTRUCK
    },
    {
      set: this.digitsSansSerif,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.SANSSERIF
    },
    {
      set: this.digitsSansSerifBold,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.digitsMonospace,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.INTEGER,
      font: sre.SemanticAttr.Font.MONOSPACE
    },
    {
      set: this.numbers,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.FLOAT
    },
    {
      set: this.otherNumbers,
      type: sre.SemanticAttr.Type.NUMBER,
      role: sre.SemanticAttr.Role.OTHERNUMBER
    },
    {
      set: this.additions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.ADDITION
    },
    {
      set: this.multiplications,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.MULTIPLICATION
    },
    {
      set: this.subtractions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.SUBTRACTION
    },
    {
      set: this.divisions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.DIVISION
    },
    {
      set: this.prefixOps,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.PREFIXOP
    },
    {
      set: this.prefixOpsBold,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.PREFIXOP,
      font: sre.SemanticAttr.Font.BOLD
    },
    {
      set: this.prefixOpsItalic,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.PREFIXOP,
      font: sre.SemanticAttr.Font.ITALIC
    },
    {
      set: this.prefixOpsSansSerifBold,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.PREFIXOP,
      font: sre.SemanticAttr.Font.SANSSERIFBOLD
    },
    {
      set: this.equalities,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.EQUALITY
    },
    {
      set: this.inequalities,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.INEQUALITY
    },
    {
      set: this.setRelations,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.SET
    },
    {
      set: this.elementRelations,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.ELEMENT
    },
    {
      set: this.relations,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.UNKNOWN
    },
    {
      set: this.arrows,
      type: sre.SemanticAttr.Type.RELATION,
      role: sre.SemanticAttr.Role.ARROW
    },
    {
      set: this.sumOps,
      type: sre.SemanticAttr.Type.LARGEOP,
      role: sre.SemanticAttr.Role.SUM
    },
    {
      set: this.intOps,
      type: sre.SemanticAttr.Type.LARGEOP,
      role: sre.SemanticAttr.Role.INTEGRAL
    },
    {
      set: this.geometryOps,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.GEOMETRY
    },
    {
      set: this.limitFunctions,
      type: sre.SemanticAttr.Type.FUNCTION,
      role: sre.SemanticAttr.Role.LIMFUNC
    },
    {
      set: this.prefixFunctions,
      type: sre.SemanticAttr.Type.FUNCTION,
      role: sre.SemanticAttr.Role.PREFIXFUNC
    },
    {
      set: this.infixFunctions,
      type: sre.SemanticAttr.Type.OPERATOR,
      role: sre.SemanticAttr.Role.PREFIXFUNC
    }
  ];
  this.meaning_ = this.initMeaning_();
};
goog.addSingletonGetter(sre.SemanticAttr);
sre.SemanticAttr.Type = {
  PUNCTUATION: "punctuation",
  FENCE: "fence",
  NUMBER: "number",
  IDENTIFIER: "identifier",
  TEXT: "text",
  OPERATOR: "operator",
  RELATION: "relation",
  LARGEOP: "largeop",
  FUNCTION: "function",
  ACCENT: "accent",
  FENCED: "fenced",
  FRACTION: "fraction",
  PUNCTUATED: "punctuated",
  RELSEQ: "relseq",
  MULTIREL: "multirel",
  INFIXOP: "infixop",
  PREFIXOP: "prefixop",
  POSTFIXOP: "postfixop",
  APPL: "appl",
  INTEGRAL: "integral",
  BIGOP: "bigop",
  SQRT: "sqrt",
  ROOT: "root",
  LIMUPPER: "limupper",
  LIMLOWER: "limlower",
  LIMBOTH: "limboth",
  SUBSCRIPT: "subscript",
  SUPERSCRIPT: "superscript",
  UNDERSCORE: "underscore",
  OVERSCORE: "overscore",
  TENSOR: "tensor",
  TABLE: "table",
  MULTILINE: "multiline",
  MATRIX: "matrix",
  VECTOR: "vector",
  CASES: "cases",
  ROW: "row",
  LINE: "line",
  CELL: "cell",
  ENCLOSE: "enclose",
  INFERENCE: "inference",
  RULELABEL: "rulelabel",
  CONCLUSION: "conclusion",
  PREMISES: "premises",
  UNKNOWN: "unknown",
  EMPTY: "empty"
};
sre.SemanticAttr.Role = {
  COMMA: "comma",
  ELLIPSIS: "ellipsis",
  FULLSTOP: "fullstop",
  DASH: "dash",
  PRIME: "prime",
  DEGREE: "degree",
  VBAR: "vbar",
  COLON: "colon",
  OPENFENCE: "openfence",
  CLOSEFENCE: "closefence",
  APPLICATION: "application",
  DUMMY: "dummy",
  UNIT: "unit",
  LABEL: "label",
  OPEN: "open",
  CLOSE: "close",
  TOP: "top",
  BOTTOM: "bottom",
  NEUTRAL: "neutral",
  LATINLETTER: "latinletter",
  GREEKLETTER: "greekletter",
  OTHERLETTER: "otherletter",
  NUMBERSET: "numbersetletter",
  INTEGER: "integer",
  FLOAT: "float",
  OTHERNUMBER: "othernumber",
  MIXED: "mixed",
  MULTIACCENT: "multiaccent",
  OVERACCENT: "overaccent",
  UNDERACCENT: "underaccent",
  UNDEROVER: "underover",
  SUBSUP: "subsup",
  LEFTSUB: "leftsub",
  LEFTSUPER: "leftsuper",
  RIGHTSUB: "rightsub",
  RIGHTSUPER: "rightsuper",
  LEFTRIGHT: "leftright",
  ABOVEBELOW: "abovebelow",
  SETEMPTY: "set empty",
  SETEXT: "set extended",
  SETSINGLE: "set singleton",
  SETCOLLECT: "set collection",
  STRING: "string",
  SPACE: "space",
  SEQUENCE: "sequence",
  ENDPUNCT: "endpunct",
  STARTPUNCT: "startpunct",
  TEXT: "text",
  NEGATIVE: "negative",
  POSITIVE: "positive",
  NEGATION: "negation",
  MULTIOP: "multiop",
  PREFIXOP: "prefix operator",
  POSTFIXOP: "postfix operator",
  LIMFUNC: "limit function",
  INFIXFUNC: "infix function",
  PREFIXFUNC: "prefix function",
  POSTFIXFUNC: "postfix function",
  SIMPLEFUNC: "simple function",
  COMPFUNC: "composed function",
  SUM: "sum",
  INTEGRAL: "integral",
  GEOMETRY: "geometry",
  ADDITION: "addition",
  MULTIPLICATION: "multiplication",
  SUBTRACTION: "subtraction",
  IMPLICIT: "implicit",
  DIVISION: "division",
  VULGAR: "vulgar",
  EQUALITY: "equality",
  INEQUALITY: "inequality",
  ELEMENT: "element",
  ARROW: "arrow",
  SET: "set",
  DETERMINANT: "determinant",
  ROWVECTOR: "rowvector",
  BINOMIAL: "binomial",
  SQUAREMATRIX: "squarematrix",
  CYCLE: "cycle",
  MULTILINE: "multiline",
  MATRIX: "matrix",
  VECTOR: "vector",
  CASES: "cases",
  TABLE: "table",
  PROOF: "proof",
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  FINAL: "final",
  SINGLE: "single",
  HYP: "hyp",
  AXIOM: "axiom",
  UNKNOWN: "unknown"
};
sre.SemanticAttr.Font = {
  BOLD: "bold",
  BOLDFRAKTUR: "bold-fraktur",
  BOLDITALIC: "bold-italic",
  BOLDSCRIPT: "bold-script",
  CALIGRAPHIC: "caligraphic",
  CALIGRAPHICBOLD: "caligraphic-bold",
  DOUBLESTRUCK: "double-struck",
  DOUBLESTRUCKITALIC: "double-struck-italic",
  FRAKTUR: "fraktur",
  ITALIC: "italic",
  MONOSPACE: "monospace",
  NORMAL: "normal",
  OLDSTYLE: "oldstyle",
  OLDSTYLEBOLD: "oldstyle-bold",
  SCRIPT: "script",
  SANSSERIF: "sans-serif",
  SANSSERIFITALIC: "sans-serif-italic",
  SANSSERIFBOLD: "sans-serif-bold",
  SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
  UNKNOWN: "unknown"
};
sre.SemanticAttr.equal = function (a, b) {
  return a.type === b.type && a.role === b.role && a.font === b.font;
};
sre.SemanticAttr.prototype.lookupType = function (a) {
  return sre.SemanticAttr.Type.UNKNOWN;
};
sre.SemanticAttr.prototype.lookupRole = function (a) {
  return sre.SemanticAttr.Role.UNKNOWN;
};
sre.SemanticAttr.lookupMeaning = function (a) {
  return sre.SemanticAttr.getInstance().lookupMeaning_(a);
};
sre.SemanticAttr.invisibleTimes = function () {
  return sre.SemanticAttr.getInstance().invisibleTimes_;
};
sre.SemanticAttr.invisiblePlus = function () {
  return sre.SemanticAttr.getInstance().invisiblePlus_;
};
sre.SemanticAttr.invisibleComma = function () {
  return sre.SemanticAttr.getInstance().invisibleComma_;
};
sre.SemanticAttr.functionApplication = function () {
  return sre.SemanticAttr.getInstance().functionApplication_;
};
sre.SemanticAttr.isMatchingFenceRole = function (a, b) {
  return (
    (a == sre.SemanticAttr.Role.OPEN && b == sre.SemanticAttr.Role.CLOSE) ||
    (a == sre.SemanticAttr.Role.NEUTRAL &&
      b == sre.SemanticAttr.Role.NEUTRAL) ||
    (a == sre.SemanticAttr.Role.TOP && b == sre.SemanticAttr.Role.BOTTOM)
  );
};
sre.SemanticAttr.isMatchingFence = function (a, b) {
  return sre.SemanticAttr.getInstance().isMatchingFence_(a, b);
};
sre.SemanticAttr.isOpeningFence = function (a) {
  return a == sre.SemanticAttr.Role.OPEN || a == sre.SemanticAttr.Role.NEUTRAL;
};
sre.SemanticAttr.isClosingFence = function (a) {
  return a == sre.SemanticAttr.Role.CLOSE || a == sre.SemanticAttr.Role.NEUTRAL;
};
sre.SemanticAttr.isEmbellishedType = function (a) {
  return (
    a === sre.SemanticAttr.Type.OPERATOR ||
    a === sre.SemanticAttr.Type.RELATION ||
    a === sre.SemanticAttr.Type.FENCE ||
    a === sre.SemanticAttr.Type.PUNCTUATION
  );
};
sre.SemanticAttr.isCharacterD = function (a) {
  return (
    -1 !=
    "d \u2146 \uff44 \ud835\udc1d \ud835\udc51 \ud835\udcb9 \ud835\udced \ud835\udd21 \ud835\udd55 \ud835\udd89 \ud835\uddbd \ud835\uddf1 \ud835\ude25 \ud835\ude8d"
      .split(" ")
      .indexOf(a)
  );
};
sre.SemanticAttr.prototype.isMatchingFence_ = function (a, b) {
  return -1 != this.neutralFences.indexOf(a)
    ? a == b
    : this.openClosePairs[a] == b || this.topBottomPairs[a] == b;
};
sre.SemanticAttr.prototype.initMeaning_ = function () {
  for (var a = {}, b = 0, c; (c = this.symbolSetToSemantic_[b]); b++)
    c.set.forEach(function (d) {
      a[d] = {
        role: c.role || sre.SemanticAttr.Role.UNKNOWN,
        type: c.type || sre.SemanticAttr.Type.UNKNOWN,
        font: c.font || sre.SemanticAttr.Font.UNKNOWN
      };
    });
  return a;
};
sre.SemanticAttr.prototype.lookupMeaning_ = function (a) {
  return (
    this.meaning_[a] || {
      role: sre.SemanticAttr.Role.UNKNOWN,
      type: sre.SemanticAttr.Type.UNKNOWN,
      font: sre.SemanticAttr.Font.UNKNOWN
    }
  );
};
sre.SemanticNode = function (a) {
  this.id = a;
  this.mathml = [];
  this.parent = null;
  this.type = sre.SemanticAttr.Type.UNKNOWN;
  this.role = sre.SemanticAttr.Role.UNKNOWN;
  this.font = sre.SemanticAttr.Font.UNKNOWN;
  this.embellished = null;
  this.fencePointer = "";
  this.childNodes = [];
  this.textContent = "";
  this.mathmlTree = null;
  this.contentNodes = [];
  this.annotation = {};
  this.attributes = {};
  this.nobreaking = !1;
};
sre.SemanticNode.prototype.querySelectorAll = function (a) {
  for (var b = [], c = 0, d; (d = this.childNodes[c]); c++)
    b = b.concat(d.querySelectorAll(a));
  for (c = 0; (d = this.contentNodes[c]); c++)
    b = b.concat(d.querySelectorAll(a));
  a(this) && b.unshift(this);
  return b;
};
sre.SemanticNode.Attribute = {
  EMBELLISHED: "embellished",
  FENCEPOINTER: "fencepointer",
  FONT: "font",
  ID: "id",
  ANNOTATION: "annotation",
  ROLE: "role",
  TYPE: "type",
  CHILDREN: "children",
  CONTENT: "content",
  TEXT: "$t"
};
sre.SemanticNode.prototype.xml = function (a, b) {
  var c = function (e, f) {
      f = f.map(function (k) {
        return k.xml(a, b);
      });
      e = a.createElementNS("", e);
      for (var g = 0, h; (h = f[g]); g++) e.appendChild(h);
      return e;
    },
    d = a.createElementNS("", this.type);
  b || this.xmlAttributes_(d);
  d.textContent = this.textContent;
  0 < this.contentNodes.length &&
    d.appendChild(c(sre.SemanticNode.Attribute.CONTENT, this.contentNodes));
  0 < this.childNodes.length &&
    d.appendChild(c(sre.SemanticNode.Attribute.CHILDREN, this.childNodes));
  return d;
};
sre.SemanticNode.prototype.toString = function (a) {
  var b = new sre.SystemExternal.xmldom.XMLSerializer(),
    c = new sre.SystemExternal.xmldom.DOMParser().parseFromString(
      "<snode/>",
      "text/xml"
    );
  return b.serializeToString(this.xml(c, a));
};
sre.SemanticNode.prototype.xmlAttributes_ = function (a) {
  for (var b = this.allAttributes(), c = 0, d; (d = b[c]); c++)
    a.setAttribute(d[0], d[1]);
  this.addExternalAttributes_(a);
};
sre.SemanticNode.prototype.allAttributes = function () {
  var a = [];
  a.push([sre.SemanticNode.Attribute.ROLE, this.role]);
  this.font != sre.SemanticAttr.Font.UNKNOWN &&
    a.push([sre.SemanticNode.Attribute.FONT, this.font]);
  Object.keys(this.annotation).length &&
    a.push([sre.SemanticNode.Attribute.ANNOTATION, this.xmlAnnotation()]);
  this.embellished &&
    a.push([sre.SemanticNode.Attribute.EMBELLISHED, this.embellished]);
  this.fencePointer &&
    a.push([sre.SemanticNode.Attribute.FENCEPOINTER, this.fencePointer]);
  a.push([sre.SemanticNode.Attribute.ID, this.id]);
  return a;
};
sre.SemanticNode.prototype.addExternalAttributes_ = function (a) {
  for (var b in this.attributes) a.setAttribute(b, this.attributes[b]);
};
sre.SemanticNode.prototype.xmlAnnotation = function () {
  var a = [],
    b;
  for (b in this.annotation)
    this.annotation[b].forEach(function (c) {
      a.push(b + ":" + c);
    });
  return a.join(";");
};
sre.SemanticNode.prototype.toJson = function () {
  var a = {};
  a[sre.SemanticNode.Attribute.TYPE] = this.type;
  for (var b = this.allAttributes(), c = 0, d; (d = b[c]); c++)
    a[d[0]] = d[1].toString();
  this.textContent && (a[sre.SemanticNode.Attribute.TEXT] = this.textContent);
  this.childNodes.length &&
    (a[sre.SemanticNode.Attribute.CHILDREN] = this.childNodes.map(function (e) {
      return e.toJson();
    }));
  this.contentNodes.length &&
    (a[sre.SemanticNode.Attribute.CONTENT] = this.contentNodes.map(function (
      e
    ) {
      return e.toJson();
    }));
  return a;
};
sre.SemanticNode.prototype.updateContent = function (a, b) {
  b = b
    ? a
        .replace(/^[ \f\n\r\t\v\u200b]*/, "")
        .replace(/[ \f\n\r\t\v\u200b]*$/, "")
    : a.trim();
  a = a && !b ? a : b;
  this.textContent != a &&
    ((b = sre.SemanticAttr.lookupMeaning(a)),
    (this.textContent = a),
    (this.role = b.role),
    (this.type = b.type),
    (this.font = b.font));
};
sre.SemanticNode.prototype.addMathmlNodes = function (a) {
  for (var b = 0, c; (c = a[b]); b++)
    -1 == this.mathml.indexOf(c) && this.mathml.push(c);
};
sre.SemanticNode.prototype.removeMathmlNodes_ = function (a) {
  for (var b = this.mathml, c = 0, d; (d = a[c]); c++)
    (d = b.indexOf(d)), -1 != d && b.splice(d, 1);
  this.mathml = b;
};
sre.SemanticNode.prototype.appendChild = function (a) {
  this.childNodes.push(a);
  this.addMathmlNodes(a.mathml);
  a.parent = this;
};
sre.SemanticNode.prototype.replaceChild = function (a, b) {
  var c = this.childNodes.indexOf(a);
  if (-1 != c) {
    a.parent = null;
    b.parent = this;
    this.childNodes[c] = b;
    c = a.mathml.filter(function (e) {
      return -1 == b.mathml.indexOf(e);
    });
    var d = b.mathml.filter(function (e) {
      return -1 == a.mathml.indexOf(e);
    });
    this.removeMathmlNodes_(c);
    this.addMathmlNodes(d);
  }
};
sre.SemanticNode.prototype.appendContentNode = function (a) {
  a &&
    (this.contentNodes.push(a),
    this.addMathmlNodes(a.mathml),
    (a.parent = this));
};
sre.SemanticNode.prototype.removeContentNode = function (a) {
  a &&
    ((a = this.contentNodes.indexOf(a)),
    -1 != a && this.contentNodes.slice(a, 1));
};
sre.SemanticNode.prototype.equals = function (a) {
  if (
    !a ||
    this.type !== a.type ||
    this.role !== a.role ||
    this.textContent !== a.textContent ||
    this.childNodes.length !== a.childNodes.length ||
    this.contentNodes.length !== a.contentNodes.length
  )
    return !1;
  for (var b = 0, c, d; (c = this.childNodes[b]), (d = a.childNodes[b]); b++)
    if (!c.equals(d)) return !1;
  for (b = 0; (c = this.contentNodes[b]), (d = a.contentNodes[b]); b++)
    if (!c.equals(d)) return !1;
  return !0;
};
sre.SemanticNode.prototype.displayTree = function () {
  console.info(this.displayTree_(0));
};
sre.SemanticNode.prototype.displayTree_ = function (a) {
  a++;
  var b = Array(a).join("  "),
    c = "";
  c += "\n" + b + this.toString();
  c += "\n" + b + "MathmlTree:";
  c += "\n" + b + this.mathmlTreeString_();
  c += "\n" + b + "MathML:";
  for (var d = 0, e; (e = this.mathml[d]); d++) c += "\n" + b + e.toString();
  c += "\n" + b + "Begin Content";
  this.contentNodes.forEach(function (f) {
    c += f.displayTree_(a);
  });
  c += "\n" + b + "End Content";
  c += "\n" + b + "Begin Children";
  this.childNodes.forEach(function (f) {
    c += f.displayTree_(a);
  });
  return (c += "\n" + b + "End Children");
};
sre.SemanticNode.prototype.mathmlTreeString_ = function () {
  return this.mathmlTree ? this.mathmlTree.toString() : "EMPTY";
};
sre.SemanticNode.prototype.addAnnotation = function (a, b) {
  b && this.addAnnotation_(a, b);
};
sre.SemanticNode.prototype.addAnnotation_ = function (a, b) {
  var c = this.annotation[a];
  c ? c.push(b) : (this.annotation[a] = [b]);
};
sre.SemanticNode.prototype.getAnnotation = function (a) {
  return (a = this.annotation[a]) ? a : [];
};
sre.SemanticNode.prototype.hasAnnotation = function (a, b) {
  return (a = this.annotation[a]) ? -1 !== a.indexOf(b) : !1;
};
sre.SemanticNode.prototype.parseAnnotation = function (a) {
  a = a.split(";");
  for (var b = 0, c = a.length; b < c; b++) {
    var d = a[b].split(":");
    this.addAnnotation(d[0], d[1]);
  }
};
sre.SemanticNode.prototype.meaning = function () {
  return { type: this.type, role: this.role, font: this.font };
};
sre.SemanticNode.fromXml = function (a) {
  var b = parseInt(a.getAttribute("id"), 10);
  b = new sre.SemanticNode(b);
  b.type = a.tagName;
  sre.SemanticNode.setAttribute_(b, a, "role");
  sre.SemanticNode.setAttribute_(b, a, "font");
  sre.SemanticNode.setAttribute_(b, a, "embellished");
  sre.SemanticNode.setAttribute_(b, a, "fencepointer", "fencePointer");
  a.getAttribute("annotation") &&
    b.parseAnnotation(a.getAttribute("annotation"));
  sre.SemanticUtil.addAttributes(b, a);
  sre.SemanticNode.processChildren_(b, a);
  return b;
};
sre.SemanticNode.setAttribute_ = function (a, b, c, d) {
  d = d || c;
  (b = b.getAttribute(c)) && (a[d] = b);
};
sre.SemanticNode.processChildren_ = function (a, b) {
  b = $jscomp.makeIterator(sre.DomUtil.toArray(b.childNodes));
  for (var c = b.next(); !c.done; c = b.next())
    if (((c = c.value), c.nodeType === sre.DomUtil.NodeType.TEXT_NODE))
      a.textContent = c.textContent;
    else {
      var d = sre.DomUtil.toArray(c.childNodes).map(sre.SemanticNode.fromXml);
      d.forEach(function (e) {
        e.parent = a;
      });
      "CONTENT" === sre.DomUtil.tagName(c)
        ? (a.contentNodes = d)
        : (a.childNodes = d);
    }
};
sre.SemanticAnnotator = function (a, b, c) {
  this.domain = a;
  this.func = c;
  this.name = b;
  this.active = !1;
};
sre.SemanticAnnotator.prototype.annotate = function (a) {
  a.childNodes.forEach(goog.bind(this.annotate, this));
  a.addAnnotation(this.domain, this.func(a));
};
sre.SemanticVisitor = function (a, b, c, d) {
  this.domain = a;
  this.func = c;
  this.name = b;
  this.def = d || {};
  this.active = !1;
};
sre.SemanticVisitor.prototype.visit = function (a, b) {
  b = this.func(a, b);
  a.addAnnotation(this.domain, b[0]);
  for (var c = 0, d; (d = a.childNodes[c]); c++) b = this.visit(d, b[1]);
  return b;
};
sre.SemanticAnnotations = function () {
  this.annotators = {};
  this.visitors = {};
};
goog.addSingletonGetter(sre.SemanticAnnotations);
sre.SemanticAnnotations.prototype.register = function (a) {
  (a instanceof sre.SemanticAnnotator ? this.annotators : this.visitors)[
    a.domain + ":" + a.name
  ] = a;
};
sre.SemanticAnnotations.prototype.activate = function (a, b) {
  a = a + ":" + b;
  if ((a = this.annotators[a] || this.visitors[a])) a.active = !0;
};
sre.SemanticAnnotations.prototype.annotate = function (a) {
  for (
    var b = $jscomp.makeIterator(Object.keys(this.annotators)), c = b.next();
    !c.done;
    c = b.next()
  )
    (c = c.value), this.annotators[c].active && this.annotators[c].annotate(a);
  b = $jscomp.makeIterator(Object.keys(this.visitors));
  for (c = b.next(); !c.done; c = b.next())
    (c = c.value),
      this.visitors[c].active &&
        this.visitors[c].visit(a, Object.assign({}, this.visitors[c].def));
};
sre.SemanticOrdering = function () {
  this.comparators = [];
};
goog.addSingletonGetter(sre.SemanticOrdering);
sre.SemanticOrdering.prototype.add = function (a) {
  this.comparators.push(a);
};
sre.SemanticOrdering.prototype.apply = function (a, b) {
  for (var c = 0, d; (d = this.comparators[c]); c++)
    if (((d = d.compare(a, b)), 0 !== d)) return d;
  return 0;
};
sre.SemanticOrdering.prototype.sort = function (a) {
  a.sort(goog.bind(this.apply, this));
};
sre.SemanticOrdering.prototype.reduce = function (a) {
  if (1 >= a.length) return a;
  a = a.slice();
  this.sort(a);
  var b = [];
  do {
    var c = a.pop();
    b.push(c);
  } while (c && a.length && 0 === this.apply(a[a.length - 1], c));
  return b;
};
sre.SemanticComparator = function (a, b) {
  this.comparator = a;
  this.type = b || null;
  sre.SemanticOrdering.getInstance().add(this);
};
sre.SemanticComparator.prototype.compare = function (a, b) {
  return this.type && this.type === a.type && this.type === b.type
    ? this.comparator(a, b)
    : 0;
};
sre.SemanticOrdering.simpleFunction = function (a, b) {
  return a.role === sre.SemanticAttr.Role.SIMPLEFUNC
    ? 1
    : b.role === sre.SemanticAttr.Role.SIMPLEFUNC
    ? -1
    : 0;
};
new sre.SemanticComparator(
  sre.SemanticOrdering.simpleFunction,
  sre.SemanticAttr.Type.IDENTIFIER
);
sre.SemanticDefault = function () {
  this.map_ = {};
};
sre.SemanticDefault.prototype.add = function (a, b) {
  this.map_[sre.SemanticDefault.key_(a, b.font)] = b;
};
sre.SemanticDefault.prototype.addNode = function (a) {
  this.add(a.textContent, a.meaning());
};
sre.SemanticDefault.prototype.retrieve = function (a, b) {
  return this.map_[sre.SemanticDefault.key_(a, b)];
};
sre.SemanticDefault.prototype.retrieveNode = function (a) {
  return this.retrieve(a.textContent, a.font);
};
sre.SemanticDefault.key_ = function (a, b) {
  return b ? a + ":" + b : a;
};
sre.SemanticDefault.prototype.size = function () {
  return Object.keys(this.map_).length;
};
sre.SemanticCollator_ = function () {
  this.map_ = {};
};
sre.SemanticCollator_.prototype.add = function (a, b) {
  a = sre.SemanticDefault.key_(a, b.font);
  var c = this.map_[a];
  c ? c.push(b) : (this.map_[a] = [b]);
};
sre.SemanticCollator_.prototype.addNode = function (a) {
  this.add(a.textContent, a);
};
sre.SemanticCollator_.prototype.retrieve = function (a, b) {
  return this.map_[sre.SemanticDefault.key_(a, b)];
};
sre.SemanticCollator_.prototype.retrieveNode = function (a) {
  return this.retrieve(a.textContent, a.font);
};
sre.SemanticCollator_.prototype.copyCollator = goog.abstractMethod;
sre.SemanticCollator_.prototype.copy = function () {
  var a = this.copyCollator(),
    b;
  for (b in this.map_) a.map_[b] = this.map_[b];
  return a;
};
sre.SemanticCollator_.prototype.minimize = function () {
  for (var a in this.map_) 1 === this.map_[a].length && delete this.map_[a];
};
sre.SemanticCollator_.prototype.reduce = function () {
  for (var a in this.map_)
    1 !== this.map_[a].length &&
      (this.map_[a] = sre.SemanticOrdering.getInstance().reduce(this.map_[a]));
};
sre.SemanticCollator_.prototype.minimalCollator = function () {
  var a = this.copy(),
    b;
  for (b in a.map_) 1 === a.map_[b].length && delete a.map_[b];
  return a;
};
sre.SemanticCollator_.prototype.isMultiValued = function () {
  for (var a in this.map_) if (1 < this.map_[a].length) return !0;
  return !1;
};
sre.SemanticCollator_.prototype.isEmpty = function () {
  return !Object.keys(this.map_).length;
};
sre.SemanticNodeCollator = function () {
  sre.SemanticCollator_.call(this);
};
goog.inherits(sre.SemanticNodeCollator, sre.SemanticCollator_);
sre.SemanticNodeCollator.prototype.copyCollator = function () {
  return new sre.SemanticNodeCollator();
};
sre.SemanticNodeCollator.prototype.toString = function () {
  var a = [],
    b;
  for (b in this.map_) {
    for (
      var c = Array(b.length + 3).join(" "), d = this.map_[b], e = [], f = 0, g;
      (g = d[f]);
      f++
    )
      e.push(g.toString());
    a.push(b + ": " + e.join("\n" + c));
  }
  return a.join("\n");
};
sre.SemanticNodeCollator.prototype.collateMeaning = function () {
  var a = new sre.SemanticMeaningCollator(),
    b;
  for (b in this.map_)
    a.map_[b] = this.map_[b].map(function (c) {
      return c.meaning();
    });
  return a;
};
sre.SemanticMeaningCollator = function () {
  sre.SemanticCollator_.call(this);
};
goog.inherits(sre.SemanticMeaningCollator, sre.SemanticCollator_);
sre.SemanticMeaningCollator.prototype.copyCollator = function () {
  return new sre.SemanticMeaningCollator();
};
sre.SemanticMeaningCollator.prototype.add = function (a, b) {
  var c = this.retrieve(a, b.font);
  (c &&
    c.find(function (d) {
      return sre.SemanticAttr.equal(d, b);
    })) ||
    sre.SemanticMeaningCollator.superClass_.add.call(this, a, b);
};
sre.SemanticMeaningCollator.prototype.addNode = function (a) {
  this.add(a.textContent, a.meaning());
};
sre.SemanticMeaningCollator.prototype.toString = function () {
  var a = [],
    b;
  for (b in this.map_) {
    for (
      var c = Array(b.length + 3).join(" "), d = this.map_[b], e = [], f = 0, g;
      (g = d[f]);
      f++
    )
      e.push(
        "{type: " + g.type + ", role: " + g.role + ", font: " + g.font + "}"
      );
    a.push(b + ": " + e.join("\n" + c));
  }
  return a.join("\n");
};
sre.SemanticMeaningCollator.prototype.default = function () {
  var a = new sre.SemanticDefault(),
    b;
  for (b in this.map_)
    1 === this.map_[b].length && (a.map_[b] = this.map_[b][0]);
  return a;
};
sre.SemanticMeaningCollator.prototype.newDefault = function () {
  var a = this.default();
  this.reduce();
  var b = this.default();
  return a.size() !== b.size() ? b : null;
};
sre.SemanticNodeFactory = function () {
  this.idCounter_ = -1;
  this.leafMap = new sre.SemanticNodeCollator();
  this.defaultMap = new sre.SemanticDefault();
};
sre.SemanticNodeFactory.prototype.createNode_ = function (a) {
  "undefined" !== typeof a
    ? (this.idCounter_ = Math.max(this.idCounter_, a))
    : (a = ++this.idCounter_);
  return new sre.SemanticNode(a);
};
sre.SemanticNodeFactory.prototype.makeNode = function (a) {
  return this.createNode_(a);
};
sre.SemanticNodeFactory.prototype.makeUnprocessed = function (a) {
  var b = this.createNode_();
  b.mathml = [a];
  b.mathmlTree = a;
  return b;
};
sre.SemanticNodeFactory.prototype.makeEmptyNode = function () {
  var a = this.createNode_();
  a.type = sre.SemanticAttr.Type.EMPTY;
  return a;
};
sre.SemanticNodeFactory.prototype.makeContentNode = function (a) {
  var b = this.createNode_();
  b.updateContent(a);
  return b;
};
sre.SemanticNodeFactory.prototype.makeMultipleContentNodes = function (a, b) {
  for (var c = [], d = 0; d < a; d++) c.push(this.makeContentNode(b));
  return c;
};
sre.SemanticNodeFactory.prototype.makeLeafNode = function (a, b) {
  if (!a) return this.makeEmptyNode();
  a = this.makeContentNode(a);
  a.font = b || a.font;
  if ((b = this.defaultMap.retrieveNode(a)))
    (a.type = b.type), (a.role = b.role), (a.font = b.font);
  this.leafMap.addNode(a);
  return a;
};
sre.SemanticNodeFactory.prototype.makeBranchNode = function (a, b, c, d) {
  var e = this.createNode_();
  d && e.updateContent(d);
  e.type = a;
  e.childNodes = b;
  e.contentNodes = c;
  b.concat(c).forEach(function (f) {
    f.parent = e;
    e.addMathmlNodes(f.mathml);
  });
  return e;
};
sre.SemanticParser = function () {};
sre.SemanticParser.prototype.parse = function (a) {};
sre.SemanticParser.prototype.parseList = function (a) {};
sre.SemanticParser.prototype.getFactory = function () {};
sre.SemanticParser.prototype.setFactory = function (a) {};
sre.SemanticParser.prototype.getType = function () {};
sre.SemanticAbstractParser = function (a) {
  this.type_ = a;
  this.factory_ = new sre.SemanticNodeFactory();
};
sre.SemanticAbstractParser.prototype.getFactory = function () {
  return this.factory_;
};
sre.SemanticAbstractParser.prototype.setFactory = function (a) {
  this.factory_ = a;
};
sre.SemanticAbstractParser.prototype.getType = function () {
  return this.type_;
};
sre.SemanticAbstractParser.prototype.parse = goog.abstractMethod;
sre.SemanticAbstractParser.prototype.parseList = function (a) {
  for (var b = [], c = 0, d; (d = a[c]); c++) b.push(this.parse(d));
  return b;
};
sre.SemanticPred = {};
sre.SemanticPred.isAttribute = function (a, b) {
  return function (c) {
    c = c[a];
    a: switch (a) {
      case "role":
        var d = sre.SemanticAttr.Role[b];
        break a;
      case "font":
        d = sre.SemanticAttr.Font[b];
        break a;
      default:
        d = sre.SemanticAttr.Type[b];
    }
    return c === d;
  };
};
sre.SemanticPred.isAccent = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "FENCE")(a) ||
    sre.SemanticPred.isAttribute("type", "PUNCTUATION")(a) ||
    (sre.SemanticPred.isAttribute("type", "OPERATOR")(a) &&
      !a.textContent.match(/\u221e|\u1ab2/)) ||
    sre.SemanticPred.isAttribute("type", "RELATION")(a) ||
    (sre.SemanticPred.isAttribute("type", "IDENTIFIER")(a) &&
      sre.SemanticPred.isAttribute("role", "UNKNOWN")(a) &&
      !a.textContent.match(
        new RegExp(
          sre.SemanticAttr.getInstance().allLetters.join("|") + "|\u221e|\u1ab2"
        )
      ))
  );
};
sre.SemanticPred.isSimpleFunctionScope = function (a) {
  a = a.childNodes;
  if (0 === a.length) return !0;
  if (1 < a.length) return !1;
  a = a[0];
  return a.type !== sre.SemanticAttr.Type.INFIXOP ||
    (a.role === sre.SemanticAttr.Role.IMPLICIT &&
      !a.childNodes.some(sre.SemanticPred.isAttribute("type", "INFIXOP")))
    ? !0
    : !1;
};
sre.SemanticPred.isPrefixFunctionBoundary = function (a) {
  return (
    (sre.SemanticPred.isOperator(a) &&
      !sre.SemanticPred.isAttribute("role", "DIVISION")(a)) ||
    sre.SemanticPred.isAttribute("type", "APPL")(a) ||
    sre.SemanticPred.isGeneralFunctionBoundary(a)
  );
};
sre.SemanticPred.isBigOpBoundary = function (a) {
  return (
    sre.SemanticPred.isOperator(a) ||
    sre.SemanticPred.isGeneralFunctionBoundary(a)
  );
};
sre.SemanticPred.isIntegralDxBoundary = function (a, b) {
  return (
    !!b &&
    sre.SemanticPred.isAttribute("type", "IDENTIFIER")(b) &&
    sre.SemanticAttr.isCharacterD(a.textContent)
  );
};
sre.SemanticPred.isIntegralDxBoundarySingle = function (a) {
  if (sre.SemanticPred.isAttribute("type", "IDENTIFIER")(a)) {
    var b = a.textContent[0];
    return b && a.textContent[1] && sre.SemanticAttr.isCharacterD(b);
  }
  return !1;
};
sre.SemanticPred.isGeneralFunctionBoundary = function (a) {
  return sre.SemanticPred.isRelation(a) || sre.SemanticPred.isPunctuation(a);
};
sre.SemanticPred.isEmbellished = function (a) {
  return a.embellished
    ? a.embellished
    : sre.SemanticAttr.isEmbellishedType(a.type)
    ? a.type
    : null;
};
sre.SemanticPred.isOperator = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "OPERATOR")(a) ||
    sre.SemanticPred.isAttribute("embellished", "OPERATOR")(a)
  );
};
sre.SemanticPred.isRelation = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "RELATION")(a) ||
    sre.SemanticPred.isAttribute("embellished", "RELATION")(a)
  );
};
sre.SemanticPred.isPunctuation = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "PUNCTUATION")(a) ||
    sre.SemanticPred.isAttribute("embellished", "PUNCTUATION")(a)
  );
};
sre.SemanticPred.isFence = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "FENCE")(a) ||
    sre.SemanticPred.isAttribute("embellished", "FENCE")(a)
  );
};
sre.SemanticPred.isElligibleEmbellishedFence = function (a) {
  if (!a || !sre.SemanticPred.isFence(a)) return !1;
  if (!a.embellished) return !0;
  var b = function (c) {
    return c.embellished
      ? !(
          !sre.SemanticPred.isAttribute("type", "TENSOR")(c) ||
          (sre.SemanticPred.isAttribute("type", "EMPTY")(c.childNodes[1]) &&
            sre.SemanticPred.isAttribute("type", "EMPTY")(c.childNodes[2])) ||
          (sre.SemanticPred.isAttribute("type", "EMPTY")(c.childNodes[3]) &&
            sre.SemanticPred.isAttribute("type", "EMPTY")(c.childNodes[4]))
        ) ||
        (sre.SemanticPred.isAttribute("role", "CLOSE")(c) &&
          sre.SemanticPred.isAttribute("type", "TENSOR")(c)) ||
        (sre.SemanticPred.isAttribute("role", "OPEN")(c) &&
          (sre.SemanticPred.isAttribute("type", "SUBSCRIPT")(c) ||
            sre.SemanticPred.isAttribute("type", "SUPERSCRIPT")(c)))
        ? !1
        : b(c.childNodes[0])
      : !0;
  };
  return b(a);
};
sre.SemanticPred.isTabHardworkrMultiline = function (a) {
  return (
    !!a &&
    (sre.SemanticPred.isAttribute("type", "TABLE")(a) ||
      sre.SemanticPred.isAttribute("type", "MULTILINE")(a))
  );
};
sre.SemanticPred.tableIsMatrixOrVector = function (a) {
  return (
    !!a &&
    sre.SemanticPred.isFencedElement(a) &&
    sre.SemanticPred.isTabHardworkrMultiline(a.childNodes[0])
  );
};
sre.SemanticPred.isFencedElement = function (a) {
  return (
    !!a &&
    sre.SemanticPred.isAttribute("type", "FENCED")(a) &&
    (sre.SemanticPred.isAttribute("role", "LEFTRIGHT")(a) ||
      sre.SemanticPred.isAttribute("role", "NEUTRAL")(a)) &&
    1 === a.childNodes.length
  );
};
sre.SemanticPred.tableIsCases = function (a, b) {
  return (
    0 < b.length &&
    sre.SemanticPred.isAttribute("role", "OPENFENCE")(b[b.length - 1])
  );
};
sre.SemanticPred.tableIsMultiline = function (a) {
  return a.childNodes.every(function (b) {
    return 1 >= b.childNodes.length;
  });
};
sre.SemanticPred.isBinomial = function (a) {
  return 2 === a.childNodes.length;
};
sre.SemanticPred.isLimitBase = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "LARGEOP")(a) ||
    sre.SemanticPred.isAttribute("type", "LIMBOTH")(a) ||
    sre.SemanticPred.isAttribute("type", "LIMLOWER")(a) ||
    sre.SemanticPred.isAttribute("type", "LIMUPPER")(a) ||
    (sre.SemanticPred.isAttribute("type", "FUNCTION")(a) &&
      sre.SemanticPred.isAttribute("role", "LIMFUNC")(a)) ||
    ((sre.SemanticPred.isAttribute("type", "OVERSCORE")(a) ||
      sre.SemanticPred.isAttribute("type", "UNDERSCORE")(a)) &&
      sre.SemanticPred.isLimitBase(a.childNodes[0]))
  );
};
sre.SemanticPred.isSimpleFunctionHead = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.IDENTIFIER ||
    a.role === sre.SemanticAttr.Role.LATINLETTER ||
    a.role === sre.SemanticAttr.Role.GREEKLETTER ||
    a.role === sre.SemanticAttr.Role.OTHERLETTER
  );
};
sre.SemanticPred.singlePunctAtPosition = function (a, b, c) {
  return (
    1 === b.length &&
    (a[c].type === sre.SemanticAttr.Type.PUNCTUATION ||
      a[c].embellished === sre.SemanticAttr.Type.PUNCTUATION) &&
    a[c] === b[0]
  );
};
sre.SemanticPred.isSimpleFunction = function (a) {
  return (
    sre.SemanticPred.isAttribute("type", "IDENTIFIER")(a) &&
    sre.SemanticPred.isAttribute("role", "SIMPLEFUNC")(a)
  );
};
sre.SemanticPred.isLeftBrace = function (a) {
  var b = ["{", "\ufe5b", "\uff5b"];
  return !!a && -1 !== b.indexOf(a.textContent);
};
sre.SemanticPred.isRightBrace = function (a) {
  var b = ["}", "\ufe5c", "\uff5d"];
  return !!a && -1 !== b.indexOf(a.textContent);
};
sre.SemanticPred.isSetNode = function (a) {
  return (
    sre.SemanticPred.isLeftBrace(a.contentNodes[0]) &&
    sre.SemanticPred.isRightBrace(a.contentNodes[1])
  );
};
sre.SemanticPred.illegalSingleton_ = [
  sre.SemanticAttr.Type.PUNCTUATION,
  sre.SemanticAttr.Type.PUNCTUATED,
  sre.SemanticAttr.Type.RELSEQ,
  sre.SemanticAttr.Type.MULTIREL,
  sre.SemanticAttr.Type.TABLE,
  sre.SemanticAttr.Type.MULTILINE,
  sre.SemanticAttr.Type.CASES,
  sre.SemanticAttr.Type.INFERENCE
];
sre.SemanticPred.scriptedElement_ = [
  sre.SemanticAttr.Type.LIMUPPER,
  sre.SemanticAttr.Type.LIMLOWER,
  sre.SemanticAttr.Type.LIMBOTH,
  sre.SemanticAttr.Type.SUBSCRIPT,
  sre.SemanticAttr.Type.SUPERSCRIPT,
  sre.SemanticAttr.Type.UNDERSCORE,
  sre.SemanticAttr.Type.OVERSCORE,
  sre.SemanticAttr.Type.TENSOR
];
sre.SemanticPred.isSingletonSetContent = function (a) {
  var b = a.type;
  return -1 !== sre.SemanticPred.illegalSingleton_.indexOf(b) ||
    (b === sre.SemanticAttr.Type.INFIXOP &&
      a.role !== sre.SemanticAttr.Role.IMPLICIT)
    ? !1
    : b === sre.SemanticAttr.Type.FENCED
    ? a.role === sre.SemanticAttr.Role.LEFTRIGHT
      ? sre.SemanticPred.isSingletonSetContent(a.childNodes[0])
      : !0
    : -1 !== sre.SemanticPred.scriptedElement_.indexOf(b)
    ? sre.SemanticPred.isSingletonSetContent(a.childNodes[0])
    : !0;
};
sre.SemanticPred.isNumber = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.NUMBER &&
    (a.role === sre.SemanticAttr.Role.INTEGER ||
      a.role === sre.SemanticAttr.Role.FLOAT)
  );
};
sre.SemanticPred.isUnitCounter = function (a) {
  return (
    sre.SemanticPred.isNumber(a) ||
    a.role === sre.SemanticAttr.Role.VULGAR ||
    a.role === sre.SemanticAttr.Role.MIXED
  );
};
sre.SemanticPred.isPureUnit = function (a) {
  var b = a.childNodes;
  return (
    a.role === sre.SemanticAttr.Role.UNIT &&
    (!b.length || b[0].role === sre.SemanticAttr.Role.UNIT)
  );
};
sre.SemanticPred.isImplicit = function (a) {
  return (
    a.role === sre.SemanticAttr.Role.IMPLICIT ||
    (a.role === sre.SemanticAttr.Role.UNIT &&
      !!a.contentNodes.length &&
      a.contentNodes[0].textContent === sre.SemanticAttr.invisibleTimes())
  );
};
sre.SemanticPred.isImplicitOp = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.INFIXOP &&
    a.role === sre.SemanticAttr.Role.IMPLICIT
  );
};
sre.SemanticPred.compareNeutralFences = function (a, b) {
  return (
    a.role === sre.SemanticAttr.Role.NEUTRAL &&
    b.role === sre.SemanticAttr.Role.NEUTRAL &&
    sre.SemanticUtil.getEmbellishedInner(a).textContent ==
      sre.SemanticUtil.getEmbellishedInner(b).textContent
  );
};
sre.SemanticPred.elligibleLeftNeutral = function (a) {
  return a.role !== sre.SemanticAttr.Role.NEUTRAL
    ? !1
    : a.embellished
    ? a.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
      a.type === sre.SemanticAttr.Type.SUBSCRIPT ||
      (a.type === sre.SemanticAttr.Type.TENSOR &&
        (a.childNodes[3].type !== sre.SemanticAttr.Type.EMPTY ||
          a.childNodes[4].type !== sre.SemanticAttr.Type.EMPTY))
      ? !1
      : !0
    : !0;
};
sre.SemanticPred.elligibleRightNeutral = function (a) {
  return a.role !== sre.SemanticAttr.Role.NEUTRAL
    ? !1
    : a.embellished
    ? a.type !== sre.SemanticAttr.Type.TENSOR ||
      (a.childNodes[1].type === sre.SemanticAttr.Type.EMPTY &&
        a.childNodes[2].type === sre.SemanticAttr.Type.EMPTY)
      ? !0
      : !1
    : !0;
};
sre.SemanticHeuristics = function () {
  this.factory = null;
  this.heuristics = {};
  this.flags = {
    combine_juxtaposition: !0,
    convert_juxtaposition: !0,
    multioperator: !0
  };
  this.blacklist = {};
};
goog.addSingletonGetter(sre.SemanticHeuristics);
sre.SemanticHeuristics.add = function (a, b) {
  sre.SemanticHeuristics.getInstance().heuristics[a] = b;
  sre.SemanticHeuristics.getInstance().flags[a] ||
    (sre.SemanticHeuristics.getInstance().flags[a] = !1);
};
sre.SemanticHeuristics.run = function (a, b, c) {
  var d = sre.SemanticHeuristics.lookup(a);
  return d &&
    !sre.SemanticHeuristics.getInstance().blacklist[a] &&
    (sre.SemanticHeuristics.getInstance().flags[a] || d.applicable(b))
    ? d.apply(b)
    : c
    ? c(b)
    : b;
};
sre.SemanticHeuristics.runMulti = function (a, b, c) {
  var d = sre.SemanticHeuristics.lookup(a);
  return d && (sre.SemanticHeuristics.getInstance().flags[a] || d.applicable(b))
    ? d.apply(b)
    : c
    ? c(b)
    : b;
};
sre.SemanticHeuristics.lookup = function (a) {
  return sre.SemanticHeuristics.getInstance().heuristics[a];
};
sre.SemanticHeuristic = function () {};
sre.SemanticAbstractHeuristic = function (a) {
  this.apply = a.method;
  this.applicable =
    a.predicate ||
    function (b) {
      return !1;
    };
};
sre.SemanticTreeHeuristic = function (a) {
  sre.SemanticAbstractHeuristic.call(this, a);
};
goog.inherits(sre.SemanticTreeHeuristic, sre.SemanticAbstractHeuristic);
sre.SemanticMultiHeuristic = function (a) {
  sre.SemanticAbstractHeuristic.call(this, a);
};
goog.inherits(sre.SemanticMultiHeuristic, sre.SemanticAbstractHeuristic);
sre.SemanticHeuristics.add(
  "combine_juxtaposition",
  new sre.SemanticTreeHeuristic({
    method: function (a) {
      for (var b = a.childNodes.length - 1, c; (c = a.childNodes[b]); b--)
        sre.SemanticPred.isImplicitOp(c) &&
          !c.nobreaking &&
          (a.childNodes.splice.apply(a.childNodes, [b, 1].concat(c.childNodes)),
          a.contentNodes.splice.apply(
            a.contentNodes,
            [b, 0].concat(c.contentNodes)
          ),
          c.childNodes.concat(c.contentNodes).forEach(function (d) {
            d.parent = a;
          }),
          a.addMathmlNodes(c.mathml));
      return a;
    }
  })
);
sre.SemanticHeuristics.add(
  "propagateSimpleFunction",
  new sre.SemanticTreeHeuristic({
    predicate: function (a) {
      return "clearspeak" === sre.Engine.getInstance().domain;
    },
    method: function (a) {
      (a.type !== sre.SemanticAttr.Type.INFIXOP &&
        a.type !== sre.SemanticAttr.Type.FRACTION) ||
        !a.childNodes.every(sre.SemanticPred.isSimpleFunction) ||
        (a.role = sre.SemanticAttr.Role.COMPFUNC);
      return a;
    }
  })
);
sre.SemanticHeuristics.add(
  "simpleNamedFunction",
  new sre.SemanticTreeHeuristic({
    predicate: function (a) {
      return "clearspeak" === sre.Engine.getInstance().domain;
    },
    method: function (a) {
      var b = "fghFGH".split("");
      a.role !== sre.SemanticAttr.Role.UNIT &&
        -1 !== b.indexOf(a.textContent) &&
        (a.role = sre.SemanticAttr.Role.SIMPLEFUNC);
      return a;
    }
  })
);
sre.SemanticHeuristics.add(
  "propagateComposedFunction",
  new sre.SemanticTreeHeuristic({
    predicate: function (a) {
      return "clearspeak" === sre.Engine.getInstance().domain;
    },
    method: function (a) {
      a.type === sre.SemanticAttr.Type.FENCED &&
        a.childNodes[0].role === sre.SemanticAttr.Role.COMPFUNC &&
        (a.role = sre.SemanticAttr.Role.COMPFUNC);
      return a;
    }
  })
);
sre.SemanticHeuristics.add(
  "multioperator",
  new sre.SemanticTreeHeuristic({
    method: function (a) {
      if (
        !(a.role !== sre.SemanticAttr.Role.UNKNOWN || 1 >= a.textContent.length)
      ) {
        var b = sre.SemanticUtil.splitUnicode(a.textContent)
          .map(sre.SemanticAttr.lookupMeaning)
          .reduce(function (c, d) {
            return c &&
              d.role &&
              d.role !== sre.SemanticAttr.Role.UNKNOWN &&
              d.role !== c
              ? c === sre.SemanticAttr.Role.UNKNOWN
                ? d.role
                : null
              : c;
          }, sre.SemanticAttr.Role.UNKNOWN);
        b && (a.role = b);
      }
    }
  })
);
sre.SemanticHeuristics.add(
  "convert_juxtaposition",
  new sre.SemanticMultiHeuristic({
    method: function (a) {
      var b = sre.SemanticUtil.partitionNodes(a, function (f) {
        return (
          f.textContent === sre.SemanticAttr.invisibleTimes() &&
          f.type === sre.SemanticAttr.Type.OPERATOR
        );
      });
      b = b.rel.length ? sre.SemanticHeuristics.juxtapositionPrePost_(b) : b;
      a = b.comp[0];
      for (var c = 1, d, e; (d = b.comp[c]), (e = b.rel[c - 1]); c++)
        a.push(e), (a = a.concat(d));
      b = sre.SemanticUtil.partitionNodes(a, function (f) {
        return (
          f.textContent === sre.SemanticAttr.invisibleTimes() &&
          (f.type === sre.SemanticAttr.Type.OPERATOR ||
            f.type === sre.SemanticAttr.Type.INFIXOP)
        );
      });
      return b.rel.length
        ? sre.SemanticHeuristics.recurseJuxtaposition_(
            b.comp.shift(),
            b.rel,
            b.comp
          )
        : a;
    }
  })
);
sre.SemanticHeuristics.juxtapositionPrePost_ = function (a) {
  for (var b = [], c = [], d = a.comp.shift(), e = null; a.comp.length; ) {
    var f = [];
    if (d.length)
      e && b.push(e), c.push(d), (e = a.rel.shift()), (d = a.comp.shift());
    else {
      for (e && f.push(e); !d.length && a.comp.length; )
        (d = a.comp.shift()), f.push(a.rel.shift());
      e = sre.SemanticHeuristics.convertPrePost_(f, d, c);
    }
  }
  f.length || d.length
    ? (b.push(e), c.push(d))
    : (f.push(e), sre.SemanticHeuristics.convertPrePost_(f, d, c));
  return { rel: b, comp: c };
};
sre.SemanticHeuristics.convertPrePost_ = function (a, b, c) {
  var d = null;
  if (!a.length) return d;
  var e = (c = c[c.length - 1]) && c.length,
    f = b && b.length,
    g = sre.SemanticProcessor.getInstance();
  if (e && f) {
    if (
      b[0].type === sre.SemanticAttr.Type.INFIXOP &&
      b[0].role === sre.SemanticAttr.Role.IMPLICIT
    )
      return (d = a.pop()), c.push(g.postfixNode_(c.pop(), a)), d;
    d = a.shift();
    b.unshift(g.prefixNode_(b.shift(), a));
    return d;
  }
  if (e) return c.push(g.postfixNode_(c.pop(), a)), d;
  f && b.unshift(g.prefixNode_(b.shift(), a));
  return d;
};
sre.SemanticHeuristics.recurseJuxtaposition_ = function (a, b, c) {
  if (!b.length) return a;
  var d = a.pop(),
    e = b.shift(),
    f = c.shift();
  if (sre.SemanticPred.isImplicitOp(e)) {
    sre.Debugger.getInstance().output("Juxta Heuristic Case 2");
    var g = (d ? [d, e] : [e]).concat(f);
    return sre.SemanticHeuristics.recurseJuxtaposition_(a.concat(g), b, c);
  }
  if (!d)
    return (
      sre.Debugger.getInstance().output("Juxta Heuristic Case 3"),
      sre.SemanticHeuristics.recurseJuxtaposition_([e].concat(f), b, c)
    );
  g = f.shift();
  if (!g)
    return (
      sre.Debugger.getInstance().output("Juxta Heuristic Case 9"),
      (e = sre.SemanticHeuristics.getInstance().factory.makeBranchNode(
        sre.SemanticAttr.Type.INFIXOP,
        [d, b.shift()],
        [e],
        e.textContent
      )),
      (e.role = sre.SemanticAttr.Role.IMPLICIT),
      sre.SemanticHeuristics.run("combine_juxtaposition", e),
      b.unshift(e),
      sre.SemanticHeuristics.recurseJuxtaposition_(a, b, c)
    );
  if (sre.SemanticPred.isOperator(d) || sre.SemanticPred.isOperator(g))
    return (
      sre.Debugger.getInstance().output("Juxta Heuristic Case 4"),
      sre.SemanticHeuristics.recurseJuxtaposition_(
        a.concat([d, e, g]).concat(f),
        b,
        c
      )
    );
  var h = null;
  sre.SemanticPred.isImplicitOp(d) && sre.SemanticPred.isImplicitOp(g)
    ? (sre.Debugger.getInstance().output("Juxta Heuristic Case 5"),
      d.contentNodes.push(e),
      (d.contentNodes = d.contentNodes.concat(g.contentNodes)),
      d.childNodes.push(g),
      (d.childNodes = d.childNodes.concat(g.childNodes)),
      g.childNodes.forEach(function (k) {
        k.parentNode = d;
      }),
      (e.parentNode = d),
      d.addMathmlNodes(e.mathml),
      d.addMathmlNodes(g.mathml),
      (h = d))
    : sre.SemanticPred.isImplicitOp(d)
    ? (sre.Debugger.getInstance().output("Juxta Heuristic Case 6"),
      d.contentNodes.push(e),
      d.childNodes.push(g),
      (g.parentNode = d),
      (e.parentNode = d),
      d.addMathmlNodes(e.mathml),
      d.addMathmlNodes(g.mathml),
      (h = d))
    : sre.SemanticPred.isImplicitOp(g)
    ? (sre.Debugger.getInstance().output("Juxta Heuristic Case 7"),
      g.contentNodes.unshift(e),
      g.childNodes.unshift(d),
      (d.parentNode = g),
      (e.parentNode = g),
      g.addMathmlNodes(e.mathml),
      g.addMathmlNodes(d.mathml),
      (h = g))
    : (sre.Debugger.getInstance().output("Juxta Heuristic Case 8"),
      (h = sre.SemanticHeuristics.getInstance().factory.makeBranchNode(
        sre.SemanticAttr.Type.INFIXOP,
        [d, g],
        [e],
        e.textContent
      )),
      (h.role = sre.SemanticAttr.Role.IMPLICIT));
  a.push(h);
  return sre.SemanticHeuristics.recurseJuxtaposition_(a.concat(f), b, c);
};
sre.SemanticHeuristics.add(
  "simple2prefix",
  new sre.SemanticTreeHeuristic({
    predicate: function (a) {
      return (
        "braille" === sre.Engine.getInstance().modality &&
        a.type === sre.SemanticAttr.Type.IDENTIFIER
      );
    },
    method: function (a) {
      1 < a.textContent.length &&
        !a.textContent[0].match(/[A-Z]/) &&
        (a.role = sre.SemanticAttr.Role.PREFIXFUNC);
      return a;
    }
  })
);
sre.SemanticHeuristics.add(
  "detect_cycle",
  new sre.SemanticTreeHeuristic({
    predicate: function (a) {
      return (
        "braille" === sre.Engine.getInstance().modality &&
        a.type === sre.SemanticAttr.Type.FENCED &&
        a.childNodes[0].type === sre.SemanticAttr.Type.INFIXOP &&
        a.childNodes[0].role === sre.SemanticAttr.Role.IMPLICIT &&
        a.childNodes[0].childNodes.every(function (b) {
          return b.type === sre.SemanticAttr.Type.NUMBER;
        }) &&
        a.childNodes[0].contentNodes.every(function (b) {
          return b.role === sre.SemanticAttr.Role.SPACE;
        })
      );
    },
    method: function (a) {
      a.type = sre.SemanticAttr.Type.MATRIX;
      a.role = sre.SemanticAttr.Role.CYCLE;
      var b = a.childNodes[0];
      b.type = sre.SemanticAttr.Type.ROW;
      b.role = sre.SemanticAttr.Role.CYCLE;
      b.contentNodes = [];
      return a;
    }
  })
);
sre.SemanticProcessor = function () {
  this.factory_ = new sre.SemanticNodeFactory();
  this.heuristics = sre.SemanticHeuristics.getInstance();
  this.heuristics.factory = this.factory_;
  this.funcAppls = {};
};
goog.addSingletonGetter(sre.SemanticProcessor);
sre.SemanticProcessor.prototype.setNodeFactory = function (a) {
  this.factory_ = a;
  this.heuristics.factory = this.factory_;
};
sre.SemanticProcessor.prototype.getNodeFactory = function () {
  return this.factory_;
};
sre.SemanticProcessor.prototype.identifierNode = function (a, b, c) {
  if ("MathML-Unit" === c)
    (a.type = sre.SemanticAttr.Type.IDENTIFIER),
      (a.role = sre.SemanticAttr.Role.UNIT);
  else if (
    !b &&
    1 === a.textContent.length &&
    (a.role === sre.SemanticAttr.Role.INTEGER ||
      a.role === sre.SemanticAttr.Role.LATINLETTER ||
      a.role === sre.SemanticAttr.Role.GREEKLETTER) &&
    a.font === sre.SemanticAttr.Font.NORMAL
  )
    return (
      (a.font = sre.SemanticAttr.Font.ITALIC),
      sre.SemanticHeuristics.run("simpleNamedFunction", a)
    );
  a.type === sre.SemanticAttr.Type.UNKNOWN &&
    (a.type = sre.SemanticAttr.Type.IDENTIFIER);
  sre.SemanticProcessor.exprFont_(a);
  return sre.SemanticHeuristics.run("simpleNamedFunction", a);
};
sre.SemanticProcessor.prototype.implicitNode_ = function (a) {
  var b = sre.SemanticProcessor.getInstance().factory_.makeMultipleContentNodes(
    a.length - 1,
    sre.SemanticAttr.invisibleTimes()
  );
  sre.SemanticProcessor.matchSpaces_(a, b);
  var c = sre.SemanticProcessor.getInstance().infixNode_(a, b[0]);
  c.role = sre.SemanticAttr.Role.IMPLICIT;
  b.forEach(function (d) {
    d.parent = c;
  });
  c.contentNodes = b;
  return c;
};
sre.SemanticProcessor.matchSpaces_ = function (a, b) {
  for (var c = 0, d; (d = b[c]); c++) {
    var e = a[c].mathmlTree,
      f = a[c + 1].mathmlTree;
    e &&
      f &&
      (e = e.nextSibling) &&
      e !== f &&
      (f = sre.SemanticProcessor.getSpacer_(e)) &&
      (d.mathml.push(f),
      (d.mathmlTree = f),
      (d.role = sre.SemanticAttr.Role.SPACE));
  }
};
sre.SemanticProcessor.getSpacer_ = function (a) {
  if ("MSPACE" === sre.DomUtil.tagName(a)) return a;
  for (; sre.SemanticUtil.hasEmptyTag(a) && 1 === a.childNodes.length; )
    if (((a = a.childNodes[0]), "MSPACE" === sre.DomUtil.tagName(a))) return a;
  return null;
};
sre.SemanticProcessor.prototype.implicitNode = function (a) {
  a = sre.SemanticProcessor.getInstance().getMixedNumbers_(a);
  a = sre.SemanticProcessor.getInstance().combineUnits_(a);
  if (1 === a.length) return a[0];
  a = this.implicitNode_(a);
  return sre.SemanticHeuristics.run("combine_juxtaposition", a);
};
sre.SemanticProcessor.prototype.infixNode_ = function (a, b) {
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.INFIXOP,
    a,
    [b],
    sre.SemanticUtil.getEmbellishedInner(b).textContent
  );
  a.role = b.role;
  return sre.SemanticHeuristics.run("propagateSimpleFunction", a);
};
sre.SemanticProcessor.prototype.explicitMixed_ = function (a) {
  var b = sre.SemanticUtil.partitionNodes(a, function (h) {
    return h.textContent === sre.SemanticAttr.invisiblePlus();
  });
  if (!b.rel.length) return a;
  a = [];
  for (var c = 0, d; (d = b.rel[c]); c++) {
    var e = b.comp[c],
      f = b.comp[c + 1],
      g = e.length - 1;
    e[g] &&
    f[0] &&
    sre.SemanticPred.isAttribute("type", "NUMBER")(e[g]) &&
    !sre.SemanticPred.isAttribute("role", "MIXED")(e[g]) &&
    sre.SemanticPred.isAttribute("type", "FRACTION")(f[0])
      ? ((d = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
          sre.SemanticAttr.Type.NUMBER,
          [e[g], f[0]],
          []
        )),
        (d.role = sre.SemanticAttr.Role.MIXED),
        (a = a.concat(e.slice(0, g))),
        a.push(d),
        f.shift())
      : ((a = a.concat(e)), a.push(d));
  }
  return a.concat(b.comp[b.comp.length - 1]);
};
sre.SemanticProcessor.prototype.concatNode_ = function (a, b, c) {
  if (0 === b.length) return a;
  var d = b
    .map(function (e) {
      return sre.SemanticUtil.getEmbellishedInner(e).textContent;
    })
    .join(" ");
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(c, [a], b, d);
  1 < b.length && (a.role = sre.SemanticAttr.Role.MULTIOP);
  return a;
};
sre.SemanticProcessor.prototype.prefixNode_ = function (a, b) {
  b = sre.SemanticUtil.partitionNodes(
    b,
    sre.SemanticPred.isAttribute("role", "SUBTRACTION")
  );
  a = sre.SemanticProcessor.getInstance().concatNode_(
    a,
    b.comp.pop(),
    sre.SemanticAttr.Type.PREFIXOP
  );
  1 === a.contentNodes.length &&
    a.contentNodes[0].role === sre.SemanticAttr.Role.ADDITION &&
    "+" === a.contentNodes[0].textContent &&
    (a.role = sre.SemanticAttr.Role.POSITIVE);
  for (; 0 < b.rel.length; )
    (a = sre.SemanticProcessor.getInstance().concatNode_(
      a,
      [b.rel.pop()],
      sre.SemanticAttr.Type.PREFIXOP
    )),
      (a.role = sre.SemanticAttr.Role.NEGATIVE),
      (a = sre.SemanticProcessor.getInstance().concatNode_(
        a,
        b.comp.pop(),
        sre.SemanticAttr.Type.PREFIXOP
      ));
  return a;
};
sre.SemanticProcessor.prototype.postfixNode_ = function (a, b) {
  return b.length
    ? sre.SemanticProcessor.getInstance().concatNode_(
        a,
        b,
        sre.SemanticAttr.Type.POSTFIXOP
      )
    : a;
};
sre.SemanticProcessor.prototype.text = function (a, b) {
  sre.SemanticProcessor.exprFont_(a);
  a.type = sre.SemanticAttr.Type.TEXT;
  if ("MS" === b) return (a.role = sre.SemanticAttr.Role.STRING), a;
  if ("MSPACE" === b || a.textContent.match(/^\s*$/))
    a.role = sre.SemanticAttr.Role.SPACE;
  return a;
};
sre.SemanticProcessor.prototype.row = function (a) {
  a = a.filter(function (b) {
    return !sre.SemanticPred.isAttribute("type", "EMPTY")(b);
  });
  if (0 === a.length)
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  a = sre.SemanticProcessor.getInstance().getFencesInRow_(a);
  a = sre.SemanticProcessor.getInstance().tablesInRow(a);
  a = sre.SemanticProcessor.getInstance().getPunctuationInRow_(a);
  a = sre.SemanticProcessor.getInstance().getTextInRow_(a);
  a = sre.SemanticProcessor.getInstance().getFunctionsInRow_(a);
  return sre.SemanticProcessor.getInstance().relationsInRow_(a);
};
sre.SemanticProcessor.prototype.combineUnits_ = function (a) {
  var b = sre.SemanticUtil.partitionNodes(a, function (g) {
    return !sre.SemanticPred.isAttribute("role", "UNIT")(g);
  });
  if (a.length === b.rel.length) return b.rel;
  a = [];
  do {
    var c = b.comp.shift(),
      d = b.rel.shift(),
      e = null,
      f = a.pop();
    f &&
      (c.length && sre.SemanticPred.isUnitCounter(f)
        ? c.unshift(f)
        : a.push(f));
    1 === c.length && (e = c.pop());
    1 < c.length &&
      ((e = sre.SemanticProcessor.getInstance().implicitNode_(c)),
      (e.role = sre.SemanticAttr.Role.UNIT));
    e && a.push(e);
    d && a.push(d);
  } while (d);
  return a;
};
sre.SemanticProcessor.prototype.getMixedNumbers_ = function (a) {
  var b = sre.SemanticUtil.partitionNodes(a, function (g) {
    return (
      sre.SemanticPred.isAttribute("type", "FRACTION")(g) &&
      sre.SemanticPred.isAttribute("role", "VULGAR")(g)
    );
  });
  if (!b.rel.length) return a;
  a = [];
  for (var c = 0, d; (d = b.rel[c]); c++) {
    var e = b.comp[c],
      f = e.length - 1;
    e[f] &&
    sre.SemanticPred.isAttribute("type", "NUMBER")(e[f]) &&
    (sre.SemanticPred.isAttribute("role", "INTEGER")(e[f]) ||
      sre.SemanticPred.isAttribute("role", "FLOAT")(e[f]))
      ? ((d = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
          sre.SemanticAttr.Type.NUMBER,
          [e[f], d],
          []
        )),
        (d.role = sre.SemanticAttr.Role.MIXED),
        (a = a.concat(e.slice(0, f))),
        a.push(d))
      : ((a = a.concat(e)), a.push(d));
  }
  return a.concat(b.comp[b.comp.length - 1]);
};
sre.SemanticProcessor.prototype.getTextInRow_ = function (a) {
  if (1 >= a.length) return a;
  var b = sre.SemanticUtil.partitionNodes(
    a,
    sre.SemanticPred.isAttribute("type", "TEXT")
  );
  if (0 === b.rel.length) return a;
  a = [];
  var c = b.comp[0];
  0 < c.length && a.push(sre.SemanticProcessor.getInstance().row(c));
  for (var d = 0; (c = b.rel[d]); d++)
    a.push(c),
      (c = b.comp[d + 1]),
      0 < c.length && a.push(sre.SemanticProcessor.getInstance().row(c));
  return [sre.SemanticProcessor.getInstance().dummyNode_(a)];
};
sre.SemanticProcessor.prototype.relationsInRow_ = function (a) {
  var b = sre.SemanticUtil.partitionNodes(a, sre.SemanticPred.isRelation),
    c = b.rel[0];
  if (!c) return sre.SemanticProcessor.getInstance().operationsInRow_(a);
  if (1 === a.length) return a[0];
  a = b.comp.map(
    goog.bind(sre.SemanticProcessor.getInstance().operationsInRow_, this)
  );
  if (
    b.rel.some(function (d) {
      return !d.equals(c);
    })
  )
    return (
      (a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.MULTIREL,
        a,
        b.rel
      )),
      b.rel.every(function (d) {
        return d.role === c.role;
      }) && (a.role = c.role),
      a
    );
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.RELSEQ,
    a,
    b.rel,
    sre.SemanticUtil.getEmbellishedInner(c).textContent
  );
  a.role = c.role;
  return a;
};
sre.SemanticProcessor.prototype.operationsInRow_ = function (a) {
  if (0 === a.length)
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  a = this.explicitMixed_(a);
  if (1 === a.length) return a[0];
  for (var b = []; 0 < a.length && sre.SemanticPred.isOperator(a[0]); )
    b.push(a.shift());
  if (0 === a.length)
    return sre.SemanticProcessor.getInstance().prefixNode_(b.pop(), b);
  if (1 === a.length)
    return sre.SemanticProcessor.getInstance().prefixNode_(a[0], b);
  a = sre.SemanticHeuristics.runMulti("convert_juxtaposition", a);
  a = sre.SemanticUtil.sliceNodes(a, sre.SemanticPred.isOperator);
  b = sre.SemanticProcessor.getInstance().prefixNode_(
    sre.SemanticProcessor.getInstance().implicitNode(a.head),
    b
  );
  return a.div
    ? sre.SemanticProcessor.getInstance().operationsTree_(a.tail, b, a.div)
    : b;
};
sre.SemanticProcessor.prototype.operationsTree_ = function (a, b, c, d) {
  d = d || [];
  if (0 === a.length)
    return (
      d.unshift(c),
      b.type === sre.SemanticAttr.Type.INFIXOP
        ? ((d = sre.SemanticProcessor.getInstance().postfixNode_(
            b.childNodes.pop(),
            d
          )),
          b.appendChild(d),
          b)
        : sre.SemanticProcessor.getInstance().postfixNode_(b, d)
    );
  a = sre.SemanticUtil.sliceNodes(a, sre.SemanticPred.isOperator);
  if (0 === a.head.length)
    return (
      d.push(a.div),
      sre.SemanticProcessor.getInstance().operationsTree_(a.tail, b, c, d)
    );
  d = sre.SemanticProcessor.getInstance().prefixNode_(
    sre.SemanticProcessor.getInstance().implicitNode(a.head),
    d
  );
  b = sre.SemanticProcessor.getInstance().appendOperand_(b, c, d);
  return a.div
    ? sre.SemanticProcessor.getInstance().operationsTree_(a.tail, b, a.div, [])
    : b;
};
sre.SemanticProcessor.prototype.appendOperand_ = function (a, b, c) {
  if (a.type !== sre.SemanticAttr.Type.INFIXOP)
    return sre.SemanticProcessor.getInstance().infixNode_([a, c], b);
  var d = this.appendDivisionOp_(a, b, c);
  return d
    ? d
    : sre.SemanticProcessor.getInstance().appendExistingOperator_(a, b, c)
    ? a
    : b.role === sre.SemanticAttr.Role.MULTIPLICATION
    ? sre.SemanticProcessor.getInstance().appendMultiplicativeOp_(a, b, c)
    : sre.SemanticProcessor.getInstance().appendAdditiveOp_(a, b, c);
};
sre.SemanticProcessor.prototype.appendDivisionOp_ = function (a, b, c) {
  return b.role === sre.SemanticAttr.Role.DIVISION
    ? sre.SemanticPred.isImplicit(a)
      ? sre.SemanticProcessor.getInstance().infixNode_([a, c], b)
      : this.appendLastOperand_(a, b, c)
    : a.role === sre.SemanticAttr.Role.DIVISION
    ? this.infixNode_([a, c], b)
    : null;
};
sre.SemanticProcessor.prototype.appendLastOperand_ = function (a, b, c) {
  for (
    var d = a, e = a.childNodes[a.childNodes.length - 1];
    e &&
    e.type === sre.SemanticAttr.Type.INFIXOP &&
    !sre.SemanticPred.isImplicit(e);

  )
    (d = e), (e = d.childNodes[a.childNodes.length - 1]);
  b = sre.SemanticProcessor.getInstance().infixNode_(
    [d.childNodes.pop(), c],
    b
  );
  d.appendChild(b);
  return a;
};
sre.SemanticProcessor.prototype.appendMultiplicativeOp_ = function (a, b, c) {
  if (sre.SemanticPred.isImplicit(a))
    return sre.SemanticProcessor.getInstance().infixNode_([a, c], b);
  for (
    var d = a, e = a.childNodes[a.childNodes.length - 1];
    e &&
    e.type === sre.SemanticAttr.Type.INFIXOP &&
    !sre.SemanticPred.isImplicit(e);

  )
    (d = e), (e = d.childNodes[a.childNodes.length - 1]);
  b = sre.SemanticProcessor.getInstance().infixNode_(
    [d.childNodes.pop(), c],
    b
  );
  d.appendChild(b);
  return a;
};
sre.SemanticProcessor.prototype.appendAdditiveOp_ = function (a, b, c) {
  return sre.SemanticProcessor.getInstance().infixNode_([a, c], b);
};
sre.SemanticProcessor.prototype.appendExistingOperator_ = function (a, b, c) {
  return !a ||
    a.type !== sre.SemanticAttr.Type.INFIXOP ||
    sre.SemanticPred.isImplicit(a)
    ? !1
    : a.contentNodes[0].equals(b)
    ? (a.appendContentNode(b), a.appendChild(c), !0)
    : sre.SemanticProcessor.getInstance().appendExistingOperator_(
        a.childNodes[a.childNodes.length - 1],
        b,
        c
      );
};
sre.SemanticProcessor.prototype.getFencesInRow_ = function (a) {
  a = sre.SemanticUtil.partitionNodes(a, sre.SemanticPred.isFence);
  a = sre.SemanticProcessor.purgeFences_(a);
  var b = a.comp.shift();
  return sre.SemanticProcessor.getInstance().fences_(a.rel, a.comp, [], [b]);
};
sre.SemanticProcessor.prototype.fences_ = function (a, b, c, d) {
  if (0 === a.length && 0 === c.length) return d[0];
  var e = sre.SemanticPred.isAttribute("role", "OPEN");
  if (0 === a.length) {
    for (a = d.shift(); 0 < c.length; ) {
      if (e(c[0]))
        (b = c.shift()), sre.SemanticProcessor.fenceToPunct_(b), a.push(b);
      else {
        c = sre.SemanticUtil.sliceNodes(c, e);
        var f = c.head.length - 1,
          g = sre.SemanticProcessor.getInstance().neutralFences_(
            c.head,
            d.slice(0, f)
          );
        d = d.slice(f);
        a.push.apply(a, g);
        c.div && c.tail.unshift(c.div);
        c = c.tail;
      }
      a.push.apply(a, d.shift());
    }
    return a;
  }
  f = c[c.length - 1];
  g = a[0].role;
  if (
    g === sre.SemanticAttr.Role.OPEN ||
    !(
      g !== sre.SemanticAttr.Role.NEUTRAL ||
      (f && sre.SemanticPred.compareNeutralFences(a[0], f))
    )
  )
    return (
      c.push(a.shift()),
      (e = b.shift()) && d.push(e),
      sre.SemanticProcessor.getInstance().fences_(a, b, c, d)
    );
  if (
    f &&
    g === sre.SemanticAttr.Role.CLOSE &&
    f.role === sre.SemanticAttr.Role.OPEN
  )
    return (
      (e = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        c.pop(),
        a.shift(),
        d.pop()
      )),
      d.push(d.pop().concat([e], b.shift())),
      sre.SemanticProcessor.getInstance().fences_(a, b, c, d)
    );
  if (f && sre.SemanticPred.compareNeutralFences(a[0], f)) {
    if (
      !sre.SemanticPred.elligibleLeftNeutral(f) ||
      !sre.SemanticPred.elligibleRightNeutral(a[0])
    )
      return (
        c.push(a.shift()),
        (e = b.shift()) && d.push(e),
        sre.SemanticProcessor.getInstance().fences_(a, b, c, d)
      );
    e = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
      c.pop(),
      a.shift(),
      d.pop()
    );
    d.push(d.pop().concat([e], b.shift()));
    return sre.SemanticProcessor.getInstance().fences_(a, b, c, d);
  }
  if (
    f &&
    g === sre.SemanticAttr.Role.CLOSE &&
    f.role === sre.SemanticAttr.Role.NEUTRAL &&
    c.some(e)
  )
    return (
      (c = sre.SemanticUtil.sliceNodes(c, e, !0)),
      (e = d.pop()),
      (f = d.length - c.tail.length + 1),
      (g = sre.SemanticProcessor.getInstance().neutralFences_(
        c.tail,
        d.slice(f)
      )),
      (d = d.slice(0, f)),
      (e = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        c.div,
        a.shift(),
        d.pop().concat(g, e)
      )),
      d.push(d.pop().concat([e], b.shift())),
      sre.SemanticProcessor.getInstance().fences_(a, b, c.head, d)
    );
  e = a.shift();
  sre.SemanticProcessor.fenceToPunct_(e);
  d.push(d.pop().concat([e], b.shift()));
  return sre.SemanticProcessor.getInstance().fences_(a, b, c, d);
};
sre.SemanticProcessor.prototype.neutralFences_ = function (a, b) {
  if (0 === a.length) return a;
  if (1 === a.length) return sre.SemanticProcessor.fenceToPunct_(a[0]), a;
  var c = a.shift();
  if (!sre.SemanticPred.elligibleLeftNeutral(c)) {
    sre.SemanticProcessor.fenceToPunct_(c);
    var d = b.shift();
    d.unshift(c);
    return d.concat(sre.SemanticProcessor.getInstance().neutralFences_(a, b));
  }
  d = sre.SemanticUtil.sliceNodes(a, function (e) {
    return sre.SemanticPred.compareNeutralFences(e, c);
  });
  if (!d.div)
    return (
      sre.SemanticProcessor.fenceToPunct_(c),
      (d = b.shift()),
      d.unshift(c),
      d.concat(sre.SemanticProcessor.getInstance().neutralFences_(a, b))
    );
  if (!sre.SemanticPred.elligibleRightNeutral(d.div))
    return (
      sre.SemanticProcessor.fenceToPunct_(d.div),
      a.unshift(c),
      sre.SemanticProcessor.getInstance().neutralFences_(a, b)
    );
  b = sre.SemanticProcessor.getInstance().combineFencedContent_(
    c,
    d.div,
    d.head,
    b
  );
  return 0 < d.tail.length
    ? ((a = b.shift()),
      (d = sre.SemanticProcessor.getInstance().neutralFences_(d.tail, b)),
      a.concat(d))
    : b[0];
};
sre.SemanticProcessor.prototype.combineFencedContent_ = function (a, b, c, d) {
  if (0 === c.length)
    return (
      (a = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        a,
        b,
        d.shift()
      )),
      0 < d.length ? d[0].unshift(a) : (d = [[a]]),
      d
    );
  var e = d.shift(),
    f = c.length - 1,
    g = d.slice(0, f);
  d = d.slice(f);
  f = d.shift();
  c = sre.SemanticProcessor.getInstance().neutralFences_(c, g);
  e.push.apply(e, c);
  e.push.apply(e, f);
  a = sre.SemanticProcessor.getInstance().horizontalFencedNode_(a, b, e);
  0 < d.length ? d[0].unshift(a) : (d = [[a]]);
  return d;
};
sre.SemanticProcessor.FENCE_TO_PUNCT_ = {};
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.NEUTRAL] =
  sre.SemanticAttr.Role.VBAR;
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.OPEN] =
  sre.SemanticAttr.Role.OPENFENCE;
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.CLOSE] =
  sre.SemanticAttr.Role.CLOSEFENCE;
sre.SemanticProcessor.fenceToPunct_ = function (a) {
  var b = sre.SemanticProcessor.FENCE_TO_PUNCT_[a.role];
  if (b) {
    for (; a.embellished; )
      (a.embellished = sre.SemanticAttr.Type.PUNCTUATION),
        sre.SemanticPred.isAttribute("role", "SUBSUP")(a) ||
          sre.SemanticPred.isAttribute("role", "UNDEROVER")(a) ||
          (a.role = b),
        (a = a.childNodes[0]);
    a.type = sre.SemanticAttr.Type.PUNCTUATION;
    a.role = b;
  }
};
sre.SemanticProcessor.prototype.horizontalFencedNode_ = function (a, b, c) {
  c = sre.SemanticProcessor.getInstance().row(c);
  b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.FENCED,
    [c],
    [a, b]
  );
  a.role === sre.SemanticAttr.Role.OPEN
    ? (this.classifyHorizontalFence_(b),
      (b = sre.SemanticHeuristics.run("propagateComposedFunction", b)))
    : (b.role = a.role);
  b = sre.SemanticHeuristics.run("detect_cycle", b);
  return sre.SemanticProcessor.rewriteFencedNode_(b);
};
sre.SemanticProcessor.prototype.classifyHorizontalFence_ = function (a) {
  a.role = sre.SemanticAttr.Role.LEFTRIGHT;
  var b = a.childNodes;
  if (sre.SemanticPred.isSetNode(a) && !(1 < b.length))
    if (0 === b.length || b[0].type === sre.SemanticAttr.Type.EMPTY)
      a.role = sre.SemanticAttr.Role.SETEMPTY;
    else {
      var c = b[0].type;
      if (1 === b.length && sre.SemanticPred.isSingletonSetContent(b[0]))
        a.role = sre.SemanticAttr.Role.SETSINGLE;
      else {
        var d = b[0].role;
        c === sre.SemanticAttr.Type.PUNCTUATED &&
          d === sre.SemanticAttr.Role.SEQUENCE &&
          (b[0].contentNodes[0].role === sre.SemanticAttr.Role.COMMA
            ? (a.role = sre.SemanticAttr.Role.SETCOLLECT)
            : 1 !== b[0].contentNodes.length ||
              (b[0].contentNodes[0].role !== sre.SemanticAttr.Role.VBAR &&
                b[0].contentNodes[0].role !== sre.SemanticAttr.Role.COLON) ||
              ((a.role = sre.SemanticAttr.Role.SETEXT), this.setExtension_(a)));
      }
    }
};
sre.SemanticProcessor.prototype.setExtension_ = function (a) {
  (a = a.childNodes[0].childNodes[0]) &&
    a.type === sre.SemanticAttr.Type.INFIXOP &&
    1 === a.contentNodes.length &&
    a.contentNodes[0].role === sre.SemanticAttr.Role.ELEMENT &&
    (a.contentNodes[0].role = sre.SemanticAttr.Role.SETEXT);
};
sre.SemanticProcessor.prototype.getPunctuationInRow_ = function (a) {
  if (1 >= a.length) return a;
  var b = function (g) {
      g = g.type;
      return (
        "punctuation" === g ||
        "text" === g ||
        "operator" === g ||
        "relation" === g
      );
    },
    c = sre.SemanticUtil.partitionNodes(a, function (g) {
      if (!sre.SemanticPred.isPunctuation(g)) return !1;
      if (
        sre.SemanticPred.isPunctuation(g) &&
        !sre.SemanticPred.isAttribute("role", "ELLIPSIS")(g)
      )
        return !0;
      var h = a.indexOf(g);
      if (0 === h) return a[1] && b(a[1]) ? !1 : !0;
      g = a[h - 1];
      if (h === a.length - 1) return b(g) ? !1 : !0;
      h = a[h + 1];
      return b(g) && b(h) ? !1 : !0;
    });
  if (0 === c.rel.length) return a;
  var d = [],
    e = c.comp.shift();
  0 < e.length && d.push(sre.SemanticProcessor.getInstance().row(e));
  for (var f = 0; 0 < c.comp.length; )
    d.push(c.rel[f++]),
      (e = c.comp.shift()),
      0 < e.length && d.push(sre.SemanticProcessor.getInstance().row(e));
  return [sre.SemanticProcessor.getInstance().punctuatedNode_(d, c.rel)];
};
sre.SemanticProcessor.prototype.punctuatedNode_ = function (a, b) {
  var c = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.PUNCTUATED,
    a,
    b
  );
  if (b.length === a.length) {
    var d = b[0].role;
    if (
      d !== sre.SemanticAttr.Role.UNKNOWN &&
      b.every(function (e) {
        return e.role === d;
      })
    )
      return (c.role = d), c;
  }
  sre.SemanticPred.singlePunctAtPosition(a, b, 0)
    ? (c.role = sre.SemanticAttr.Role.STARTPUNCT)
    : sre.SemanticPred.singlePunctAtPosition(a, b, a.length - 1)
    ? (c.role = sre.SemanticAttr.Role.ENDPUNCT)
    : b.every(sre.SemanticPred.isAttribute("role", "DUMMY"))
    ? (c.role = sre.SemanticAttr.Role.TEXT)
    : b.every(sre.SemanticPred.isAttribute("role", "SPACE"))
    ? (c.role = sre.SemanticAttr.Role.SPACE)
    : (c.role = sre.SemanticAttr.Role.SEQUENCE);
  return c;
};
sre.SemanticProcessor.prototype.dummyNode_ = function (a) {
  var b = sre.SemanticProcessor.getInstance().factory_.makeMultipleContentNodes(
    a.length - 1,
    sre.SemanticAttr.invisibleComma()
  );
  b.forEach(function (c) {
    c.role = sre.SemanticAttr.Role.DUMMY;
  });
  return sre.SemanticProcessor.getInstance().punctuatedNode_(a, b);
};
sre.SemanticProcessor.MML_TO_LIMIT_ = {
  MSUB: { type: sre.SemanticAttr.Type.LIMLOWER, length: 1 },
  MUNDER: { type: sre.SemanticAttr.Type.LIMLOWER, length: 1 },
  MSUP: { type: sre.SemanticAttr.Type.LIMUPPER, length: 1 },
  MOVER: { type: sre.SemanticAttr.Type.LIMUPPER, length: 1 },
  MSUBSUP: { type: sre.SemanticAttr.Type.LIMBOTH, length: 2 },
  MUNDEROVER: { type: sre.SemanticAttr.Type.LIMBOTH, length: 2 }
};
sre.SemanticProcessor.MML_TO_BOUNDS_ = {
  MSUB: { type: sre.SemanticAttr.Type.SUBSCRIPT, length: 1, accent: !1 },
  MSUP: { type: sre.SemanticAttr.Type.SUPERSCRIPT, length: 1, accent: !1 },
  MSUBSUP: { type: sre.SemanticAttr.Type.SUBSCRIPT, length: 2, accent: !1 },
  MUNDER: { type: sre.SemanticAttr.Type.UNDERSCORE, length: 1, accent: !0 },
  MOVER: { type: sre.SemanticAttr.Type.OVERSCORE, length: 1, accent: !0 },
  MUNDEROVER: { type: sre.SemanticAttr.Type.UNDERSCORE, length: 2, accent: !0 }
};
sre.SemanticProcessor.prototype.accentRole_ = function (a, b) {
  if (!sre.SemanticPred.isAccent(a)) return !1;
  a.role =
    b === sre.SemanticAttr.Type.UNDERSCORE
      ? sre.SemanticAttr.Role.UNDERACCENT
      : sre.SemanticAttr.Role.OVERACCENT;
  return !0;
};
sre.SemanticProcessor.prototype.limitNode = function (a, b) {
  if (!b.length)
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  var c = b[0];
  if (!b[1]) return c;
  if (sre.SemanticPred.isLimitBase(c)) {
    var d = sre.SemanticProcessor.MML_TO_LIMIT_[a],
      e = d.length;
    var f = d.type;
    b = b.slice(0, d.length + 1);
    if (
      (1 === e && sre.SemanticPred.isAccent(b[1])) ||
      (2 === e &&
        sre.SemanticPred.isAccent(b[1]) &&
        sre.SemanticPred.isAccent(b[2]))
    )
      return (
        (d = sre.SemanticProcessor.MML_TO_BOUNDS_[a]),
        this.accentNode_(c, b, d.type, d.length, d.accent)
      );
    if (2 === e) {
      if (sre.SemanticPred.isAccent(b[1]))
        return (
          (c = this.accentNode_(
            c,
            [c, b[1]],
            {
              MSUBSUP: sre.SemanticAttr.Type.SUBSCRIPT,
              MUNDEROVER: sre.SemanticAttr.Type.UNDERSCORE
            }[a],
            1,
            !0
          )),
          b[2]
            ? this.makeLimitNode_(
                c,
                [c, b[2]],
                null,
                sre.SemanticAttr.Type.LIMUPPER
              )
            : c
        );
      if (b[2] && sre.SemanticPred.isAccent(b[2]))
        return (
          (c = this.accentNode_(
            c,
            [c, b[2]],
            {
              MSUBSUP: sre.SemanticAttr.Type.SUPERSCRIPT,
              MUNDEROVER: sre.SemanticAttr.Type.OVERSCORE
            }[a],
            1,
            !0
          )),
          this.makeLimitNode_(
            c,
            [c, b[1]],
            null,
            sre.SemanticAttr.Type.LIMLOWER
          )
        );
      b[e] || (f = sre.SemanticAttr.Type.LIMLOWER);
    }
    return this.makeLimitNode_(c, b, null, f);
  }
  d = sre.SemanticProcessor.MML_TO_BOUNDS_[a];
  return this.accentNode_(c, b, d.type, d.length, d.accent);
};
sre.SemanticProcessor.prototype.accentNode_ = function (a, b, c, d, e) {
  b = b.slice(0, d + 1);
  d = b[1];
  var f = b[2];
  if (!e && f) {
    var g = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.SUBSCRIPT,
      [a, d],
      []
    );
    g.role = sre.SemanticAttr.Role.SUBSUP;
    b = [g, f];
    c = sre.SemanticAttr.Type.SUPERSCRIPT;
  }
  e &&
    ((e = this.accentRole_(d, c)),
    f &&
      (this.accentRole_(f, sre.SemanticAttr.Type.OVERSCORE) && !e
        ? ((g = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
            sre.SemanticAttr.Type.OVERSCORE,
            [a, f],
            []
          )),
          (b = [g, d]),
          (c = sre.SemanticAttr.Type.UNDERSCORE))
        : ((g = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
            sre.SemanticAttr.Type.UNDERSCORE,
            [a, d],
            []
          )),
          (b = [g, f]),
          (c = sre.SemanticAttr.Type.OVERSCORE)),
      (g.role = sre.SemanticAttr.Role.UNDEROVER)));
  return this.makeLimitNode_(a, b, g, c);
};
sre.SemanticProcessor.prototype.makeLimitNode_ = function (a, b, c, d) {
  if (
    d === sre.SemanticAttr.Type.LIMUPPER &&
    a.type === sre.SemanticAttr.Type.LIMLOWER
  )
    return (
      a.childNodes.push(b[1]),
      (b[1].parent = a),
      (a.type = sre.SemanticAttr.Type.LIMBOTH),
      a
    );
  if (
    d === sre.SemanticAttr.Type.LIMLOWER &&
    a.type === sre.SemanticAttr.Type.LIMUPPER
  )
    return (
      a.childNodes.splice(1, -1, b[1]),
      (b[1].parent = a),
      (a.type = sre.SemanticAttr.Type.LIMBOTH),
      a
    );
  b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(d, b, []);
  d = sre.SemanticPred.isEmbellished(a);
  c && (c.embellished = d);
  b.embellished = d;
  b.role = a.role;
  return b;
};
sre.SemanticProcessor.prototype.getFunctionsInRow_ = function (a, b) {
  b = b || [];
  if (0 === a.length) return b;
  var c = a.shift(),
    d = sre.SemanticProcessor.classifyFunction_(c, a);
  if (!d)
    return (
      b.push(c), sre.SemanticProcessor.getInstance().getFunctionsInRow_(a, b)
    );
  a = sre.SemanticProcessor.getInstance().getFunctionsInRow_(a, []);
  a = sre.SemanticProcessor.getInstance().getFunctionArgs_(c, a, d);
  return b.concat(a);
};
sre.SemanticProcessor.CLASSIFY_FUNCTION_ = {};
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.INTEGRAL] =
  "integral";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.SUM] = "bigop";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.PREFIXFUNC] =
  "prefix";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.LIMFUNC] =
  "prefix";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.SIMPLEFUNC] =
  "prefix";
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.COMPFUNC] =
  "prefix";
sre.SemanticProcessor.classifyFunction_ = function (a, b) {
  if (
    a.type === sre.SemanticAttr.Type.APPL ||
    a.type === sre.SemanticAttr.Type.BIGOP ||
    a.type === sre.SemanticAttr.Type.INTEGRAL
  )
    return "";
  if (b[0] && b[0].textContent === sre.SemanticAttr.functionApplication()) {
    sre.SemanticProcessor.getInstance().funcAppls[a.id] = b.shift();
    b = sre.SemanticAttr.Role.SIMPLEFUNC;
    sre.SemanticHeuristics.run("simple2prefix", a);
    if (
      a.role === sre.SemanticAttr.Role.PREFIXFUNC ||
      a.role === sre.SemanticAttr.Role.LIMFUNC
    )
      b = a.role;
    sre.SemanticProcessor.propagateFunctionRole_(a, b);
    return "prefix";
  }
  return (b = sre.SemanticProcessor.CLASSIFY_FUNCTION_[a.role])
    ? b
    : sre.SemanticPred.isSimpleFunctionHead(a)
    ? "simple"
    : "";
};
sre.SemanticProcessor.propagateFunctionRole_ = function (a, b) {
  a &&
    a.type !== sre.Semantic.Type.INFIXOP &&
    (sre.SemanticPred.isAttribute("role", "SUBSUP")(a) ||
      sre.SemanticPred.isAttribute("role", "UNDEROVER")(a) ||
      (a.role = b),
    sre.SemanticProcessor.propagateFunctionRole_(a.childNodes[0], b));
};
sre.SemanticProcessor.prototype.getFunctionArgs_ = function (a, b, c) {
  switch (c) {
    case "integral":
      b = sre.SemanticProcessor.getInstance().getIntegralArgs_(b);
      if (!b.intvar && !b.integrand.length) return b.rest.unshift(a), b.rest;
      c = sre.SemanticProcessor.getInstance().row(b.integrand);
      a = sre.SemanticProcessor.getInstance().integralNode_(a, c, b.intvar);
      b.rest.unshift(a);
      return b.rest;
    case "prefix":
      if (b[0] && b[0].type === sre.SemanticAttr.Type.FENCED) {
        var d = b.shift();
        d.role !== sre.SemanticAttr.Role.NEUTRAL &&
          (d.role = sre.SemanticAttr.Role.LEFTRIGHT);
        a = sre.SemanticProcessor.getInstance().functionNode_(a, d);
        b.unshift(a);
        return b;
      }
      c = sre.SemanticUtil.sliceNodes(
        b,
        sre.SemanticPred.isPrefixFunctionBoundary
      );
      if (c.head.length)
        (d = sre.SemanticProcessor.getInstance().row(c.head)),
          c.div && c.tail.unshift(c.div);
      else {
        if (!c.div || !sre.SemanticPred.isAttribute("type", "APPL")(c.div))
          return b.unshift(a), b;
        d = c.div;
      }
      a = sre.SemanticProcessor.getInstance().functionNode_(a, d);
      c.tail.unshift(a);
      return c.tail;
    case "bigop":
      c = sre.SemanticUtil.sliceNodes(b, sre.SemanticPred.isBigOpBoundary);
      if (!c.head.length) return b.unshift(a), b;
      d = sre.SemanticProcessor.getInstance().row(c.head);
      a = sre.SemanticProcessor.getInstance().bigOpNode_(a, d);
      c.div && c.tail.unshift(c.div);
      c.tail.unshift(a);
      return c.tail;
    default:
      if (0 === b.length) return [a];
      c = b[0];
      if (
        c.type === sre.SemanticAttr.Type.FENCED &&
        c.role !== sre.SemanticAttr.Role.NEUTRAL &&
        sre.SemanticPred.isSimpleFunctionScope(c)
      )
        return (
          (c.role = sre.SemanticAttr.Role.LEFTRIGHT),
          sre.SemanticProcessor.propagateFunctionRole_(
            a,
            sre.SemanticAttr.Role.SIMPLEFUNC
          ),
          (a = sre.SemanticProcessor.getInstance().functionNode_(a, b.shift())),
          b.unshift(a),
          b
        );
      b.unshift(a);
      return b;
  }
};
sre.SemanticProcessor.prototype.getIntegralArgs_ = function (a, b) {
  b = b || [];
  if (0 === a.length) return { integrand: b, intvar: null, rest: a };
  var c = a[0];
  if (sre.SemanticPred.isGeneralFunctionBoundary(c))
    return { integrand: b, intvar: null, rest: a };
  if (sre.SemanticPred.isIntegralDxBoundarySingle(c))
    return (
      (c.role = sre.SemanticAttr.Role.INTEGRAL),
      { integrand: b, intvar: c, rest: a.slice(1) }
    );
  if (a[1] && sre.SemanticPred.isIntegralDxBoundary(c, a[1]))
    return (
      (c = sre.SemanticProcessor.getInstance().prefixNode_(a[1], [c])),
      (c.role = sre.SemanticAttr.Role.INTEGRAL),
      { integrand: b, intvar: c, rest: a.slice(2) }
    );
  b.push(a.shift());
  return sre.SemanticProcessor.getInstance().getIntegralArgs_(a, b);
};
sre.SemanticProcessor.prototype.functionNode_ = function (a, b) {
  var c = sre.SemanticProcessor.getInstance().factory_.makeContentNode(
      sre.SemanticAttr.functionApplication()
    ),
    d = this.funcAppls[a.id];
  d &&
    ((c.mathmlTree = d.mathmlTree),
    (c.mathml = d.mathml),
    (c.annotation = d.annotation),
    (c.attributes = d.attributes),
    delete this.funcAppls[a.id]);
  c.type = sre.SemanticAttr.Type.PUNCTUATION;
  c.role = sre.SemanticAttr.Role.APPLICATION;
  d = sre.SemanticProcessor.getFunctionOp_(a, function (e) {
    return (
      sre.SemanticPred.isAttribute("type", "FUNCTION")(e) ||
      (sre.SemanticPred.isAttribute("type", "IDENTIFIER")(e) &&
        sre.SemanticPred.isAttribute("role", "SIMPLEFUNC")(e))
    );
  });
  return sre.SemanticProcessor.getInstance().functionalNode_(
    sre.SemanticAttr.Type.APPL,
    [a, b],
    d,
    [c]
  );
};
sre.SemanticProcessor.prototype.bigOpNode_ = function (a, b) {
  var c = sre.SemanticProcessor.getFunctionOp_(
    a,
    sre.SemanticPred.isAttribute("type", "LARGEOP")
  );
  return sre.SemanticProcessor.getInstance().functionalNode_(
    sre.SemanticAttr.Type.BIGOP,
    [a, b],
    c,
    []
  );
};
sre.SemanticProcessor.prototype.integralNode_ = function (a, b, c) {
  b = b || sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  c = c || sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  var d = sre.SemanticProcessor.getFunctionOp_(
    a,
    sre.SemanticPred.isAttribute("type", "LARGEOP")
  );
  return sre.SemanticProcessor.getInstance().functionalNode_(
    sre.SemanticAttr.Type.INTEGRAL,
    [a, b, c],
    d,
    []
  );
};
sre.SemanticProcessor.prototype.functionalNode_ = function (a, b, c, d) {
  var e = b[0];
  if (c) {
    var f = c.parent;
    d.push(c);
  }
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(a, b, d);
  a.role = e.role;
  f && (c.parent = f);
  return a;
};
sre.SemanticProcessor.getFunctionOp_ = function (a, b) {
  if (b(a)) return a;
  for (var c = 0, d; (d = a.childNodes[c]); c++)
    if ((d = sre.SemanticProcessor.getFunctionOp_(d, b))) return d;
  return null;
};
sre.SemanticProcessor.prototype.tablesInRow = function (a) {
  a = sre.SemanticUtil.partitionNodes(
    a,
    sre.SemanticPred.tableIsMatrixOrVector
  );
  for (var b = [], c = 0, d; (d = a.rel[c]); c++)
    (b = b.concat(a.comp.shift())),
      b.push(sre.SemanticProcessor.tableToMatrixOrVector_(d));
  b = b.concat(a.comp.shift());
  a = sre.SemanticUtil.partitionNodes(
    b,
    sre.SemanticPred.isTabHardworkrMultiline
  );
  b = [];
  for (c = 0; (d = a.rel[c]); c++) {
    var e = a.comp.shift();
    sre.SemanticPred.tableIsCases(d, e) &&
      sre.SemanticProcessor.tableToCases_(d, e.pop());
    b = b.concat(e);
    b.push(d);
  }
  return b.concat(a.comp.shift());
};
sre.SemanticProcessor.tableToMatrixOrVector_ = function (a) {
  var b = a.childNodes[0];
  sre.SemanticPred.isAttribute("type", "MULTILINE")(b)
    ? sre.SemanticProcessor.tableToVector_(a)
    : sre.SemanticProcessor.tableToMatrix_(a);
  a.contentNodes.forEach(goog.bind(b.appendContentNode, b));
  a = 0;
  for (var c; (c = b.childNodes[a]); a++)
    sre.SemanticProcessor.assignRoleToRow_(
      c,
      sre.SemanticProcessor.getComponentRoles_(b)
    );
  b.parent = null;
  return b;
};
sre.SemanticProcessor.tableToVector_ = function (a) {
  var b = a.childNodes[0];
  b.type = sre.SemanticAttr.Type.VECTOR;
  1 === b.childNodes.length
    ? sre.SemanticProcessor.tableToSquare_(a)
    : sre.SemanticProcessor.binomialForm_(b);
};
sre.SemanticProcessor.binomialForm_ = function (a) {
  sre.SemanticPred.isBinomial(a) &&
    ((a.role = sre.SemanticAttr.Role.BINOMIAL),
    (a.childNodes[0].role = sre.SemanticAttr.Role.BINOMIAL),
    (a.childNodes[1].role = sre.SemanticAttr.Role.BINOMIAL));
};
sre.SemanticProcessor.tableToMatrix_ = function (a) {
  var b = a.childNodes[0];
  b.type = sre.SemanticAttr.Type.MATRIX;
  b.childNodes &&
  0 < b.childNodes.length &&
  b.childNodes[0].childNodes &&
  b.childNodes.length === b.childNodes[0].childNodes.length
    ? sre.SemanticProcessor.tableToSquare_(a)
    : b.childNodes &&
      1 === b.childNodes.length &&
      (b.role = sre.SemanticAttr.Role.ROWVECTOR);
};
sre.SemanticProcessor.tableToSquare_ = function (a) {
  var b = a.childNodes[0];
  sre.SemanticPred.isAttribute("role", "NEUTRAL")(a)
    ? (b.role = sre.SemanticAttr.Role.DETERMINANT)
    : (b.role = sre.SemanticAttr.Role.SQUAREMATRIX);
};
sre.SemanticProcessor.getComponentRoles_ = function (a) {
  var b = a.role;
  return b && b !== sre.SemanticAttr.Role.UNKNOWN
    ? b
    : sre.SemanticAttr.Role[a.type.toUpperCase()] ||
        sre.SemanticAttr.Role.UNKNOWN;
};
sre.SemanticProcessor.tableToCases_ = function (a, b) {
  for (var c = 0, d; (d = a.childNodes[c]); c++)
    sre.SemanticProcessor.assignRoleToRow_(d, sre.SemanticAttr.Role.CASES);
  a.type = sre.SemanticAttr.Type.CASES;
  a.appendContentNode(b);
  sre.SemanticPred.tableIsMultiline(a) &&
    sre.SemanticProcessor.binomialForm_(a);
  return a;
};
sre.SemanticProcessor.tableToMultiline = function (a) {
  if (sre.SemanticPred.tableIsMultiline(a)) {
    a.type = sre.SemanticAttr.Type.MULTILINE;
    for (var b = 0, c; (c = a.childNodes[b]); b++)
      sre.SemanticProcessor.rowToLine_(c, sre.SemanticAttr.Role.MULTILINE);
    1 === a.childNodes.length &&
      sre.SemanticPred.isFencedElement(a.childNodes[0].childNodes[0]) &&
      sre.SemanticProcessor.tableToMatrixOrVector_(
        sre.SemanticProcessor.rewriteFencedLine_(a)
      );
    sre.SemanticProcessor.binomialForm_(a);
    sre.SemanticProcessor.classifyMultiline(a);
  } else sre.SemanticProcessor.classifyTable(a);
};
sre.SemanticProcessor.rewriteFencedLine_ = function (a) {
  var b = a.childNodes[0],
    c = a.childNodes[0].childNodes[0],
    d = a.childNodes[0].childNodes[0].childNodes[0];
  c.parent = a.parent;
  a.parent = c;
  d.parent = b;
  c.childNodes = [a];
  b.childNodes = [d];
  return c;
};
sre.SemanticProcessor.rowToLine_ = function (a, b) {
  b = b || sre.SemanticAttr.Role.UNKNOWN;
  sre.SemanticPred.isAttribute("type", "ROW")(a) &&
    ((a.type = sre.SemanticAttr.Type.LINE),
    (a.role = b),
    1 === a.childNodes.length &&
      sre.SemanticPred.isAttribute("type", "CELL")(a.childNodes[0]) &&
      ((a.childNodes = a.childNodes[0].childNodes),
      a.childNodes.forEach(function (c) {
        c.parent = a;
      })));
};
sre.SemanticProcessor.assignRoleToRow_ = function (a, b) {
  if (sre.SemanticPred.isAttribute("type", "LINE")(a)) a.role = b;
  else if (sre.SemanticPred.isAttribute("type", "ROW")(a)) {
    a.role = b;
    var c = sre.SemanticPred.isAttribute("type", "CELL");
    a.childNodes.forEach(function (d) {
      c(d) && (d.role = b);
    });
  }
};
sre.SemanticProcessor.prototype.mfenced = function (a, b, c, d) {
  if (c && 0 < d.length) {
    var e = sre.SemanticProcessor.nextSeparatorFunction_(c),
      f = [d.shift()];
    d.forEach(
      goog.bind(function (g) {
        f.push(
          sre.SemanticProcessor.getInstance().factory_.makeContentNode(e())
        );
        f.push(g);
      }, this)
    );
    d = f;
  }
  if (a && b)
    return sre.SemanticProcessor.getInstance().horizontalFencedNode_(
      sre.SemanticProcessor.getInstance().factory_.makeContentNode(a),
      sre.SemanticProcessor.getInstance().factory_.makeContentNode(b),
      d
    );
  a &&
    d.unshift(sre.SemanticProcessor.getInstance().factory_.makeContentNode(a));
  b && d.push(sre.SemanticProcessor.getInstance().factory_.makeContentNode(b));
  return sre.SemanticProcessor.getInstance().row(d);
};
sre.SemanticProcessor.nextSeparatorFunction_ = function (a) {
  if (a) {
    if (a.match(/^\s+$/)) return null;
    var b = a
      .replace(/\s/g, "")
      .split("")
      .filter(function (c) {
        return c;
      });
  } else b = [","];
  return function () {
    return 1 < b.length ? b.shift() : b[0];
  };
};
sre.SemanticProcessor.number = function (a) {
  if (
    a.type === sre.SemanticAttr.Type.UNKNOWN ||
    a.type === sre.SemanticAttr.Type.IDENTIFIER
  )
    a.type = sre.SemanticAttr.Type.NUMBER;
  sre.SemanticProcessor.numberRole_(a);
  sre.SemanticProcessor.exprFont_(a);
};
sre.SemanticProcessor.numberRole_ = function (a) {
  if (a.role === sre.SemanticAttr.Role.UNKNOWN) {
    var b = sre.SemanticUtil.splitUnicode(a.textContent),
      c = b.map(sre.SemanticAttr.lookupMeaning);
    c.every(function (d) {
      return (
        (d.type === sre.SemanticAttr.Type.NUMBER &&
          d.role === sre.SemanticAttr.Role.INTEGER) ||
        (d.type === sre.SemanticAttr.Type.PUNCTUATION &&
          d.role === sre.SemanticAttr.Role.COMMA)
      );
    })
      ? ((a.role = sre.SemanticAttr.Role.INTEGER),
        "0" === b[0] && a.addAnnotation("general", "basenumber"))
      : c.every(function (d) {
          return (
            (d.type === sre.SemanticAttr.Type.NUMBER &&
              d.role === sre.SemanticAttr.Role.INTEGER) ||
            d.type === sre.SemanticAttr.Type.PUNCTUATION
          );
        })
      ? (a.role = sre.SemanticAttr.Role.FLOAT)
      : (a.role = sre.SemanticAttr.Role.OTHERNUMBER);
  }
};
sre.SemanticProcessor.exprFont_ = function (a) {
  if (a.font === sre.SemanticAttr.Font.UNKNOWN) {
    var b = sre.SemanticUtil.splitUnicode(a.textContent)
      .map(sre.SemanticAttr.lookupMeaning)
      .reduce(function (c, d) {
        return c &&
          d.font &&
          d.font !== sre.SemanticAttr.Font.UNKNOWN &&
          d.font !== c
          ? c === sre.SemanticAttr.Font.UNKNOWN
            ? d.font
            : null
          : c;
      }, sre.SemanticAttr.Font.UNKNOWN);
    b && (a.font = b);
  }
};
sre.SemanticProcessor.prototype.fractionLikeNode = function (a, b, c, d) {
  !d && sre.SemanticUtil.isZeroLength(c)
    ? ((d = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.LINE,
        [a],
        []
      )),
      (b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.LINE,
        [b],
        []
      )),
      (b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.MULTILINE,
        [d, b],
        []
      )),
      sre.SemanticProcessor.binomialForm_(b),
      sre.SemanticProcessor.classifyMultiline(b))
    : ((b = sre.SemanticProcessor.getInstance().fractionNode_(a, b)),
      d && b.addAnnotation("general", "bevelled"));
  return b;
};
sre.SemanticProcessor.prototype.fractionNode_ = function (a, b) {
  a = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.FRACTION,
    [a, b],
    []
  );
  a.role = a.childNodes.every(function (c) {
    return (
      sre.SemanticPred.isAttribute("type", "NUMBER")(c) &&
      sre.SemanticPred.isAttribute("role", "INTEGER")(c)
    );
  })
    ? sre.SemanticAttr.Role.VULGAR
    : a.childNodes.every(sre.SemanticPred.isPureUnit)
    ? sre.SemanticAttr.Role.UNIT
    : sre.SemanticAttr.Role.DIVISION;
  return sre.SemanticHeuristics.run("propagateSimpleFunction", a);
};
sre.SemanticProcessor.prototype.tensor = function (a, b, c, d, e) {
  b = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    sre.SemanticAttr.Type.TENSOR,
    [
      a,
      sre.SemanticProcessor.getInstance().scriptNode_(
        b,
        sre.SemanticAttr.Role.LEFTSUB
      ),
      sre.SemanticProcessor.getInstance().scriptNode_(
        c,
        sre.SemanticAttr.Role.LEFTSUPER
      ),
      sre.SemanticProcessor.getInstance().scriptNode_(
        d,
        sre.SemanticAttr.Role.RIGHTSUB
      ),
      sre.SemanticProcessor.getInstance().scriptNode_(
        e,
        sre.SemanticAttr.Role.RIGHTSUPER
      )
    ],
    []
  );
  b.role = a.role;
  b.embellished = sre.SemanticPred.isEmbellished(a);
  return b;
};
sre.SemanticProcessor.prototype.pseudoTensor = function (a, b, c) {
  var d = function (g) {
      return !sre.SemanticPred.isAttribute("type", "EMPTY")(g);
    },
    e = b.filter(d).length;
  d = c.filter(d).length;
  if (!e && !d) return a;
  var f = e ? (d ? "MSUBSUP" : "MSUB") : "MSUP";
  a = [a];
  e &&
    a.push(
      sre.SemanticProcessor.getInstance().scriptNode_(
        b,
        sre.SemanticAttr.Role.RIGHTSUB,
        !0
      )
    );
  d &&
    a.push(
      sre.SemanticProcessor.getInstance().scriptNode_(
        c,
        sre.SemanticAttr.Role.RIGHTSUPER,
        !0
      )
    );
  return sre.SemanticProcessor.getInstance().limitNode(f, a);
};
sre.SemanticProcessor.prototype.scriptNode_ = function (a, b, c) {
  switch (a.length) {
    case 0:
      a = sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
      break;
    case 1:
      a = a[0];
      if (c) return a;
      break;
    default:
      a = sre.SemanticProcessor.getInstance().dummyNode_(a);
  }
  a.role = b;
  return a;
};
sre.SemanticProcessor.purgeFences_ = function (a) {
  var b = a.rel;
  a = a.comp;
  for (var c = [], d = []; 0 < b.length; ) {
    var e = b.shift(),
      f = a.shift();
    sre.SemanticPred.isElligibleEmbellishedFence(e)
      ? (c.push(e), d.push(f))
      : (sre.SemanticProcessor.fenceToPunct_(e),
        f.push(e),
        (f = f.concat(a.shift())),
        a.unshift(f));
  }
  d.push(a.shift());
  return { rel: c, comp: d };
};
sre.SemanticProcessor.rewriteFencedNode_ = function (a) {
  var b = a.contentNodes[1],
    c = sre.SemanticProcessor.rewriteFence_(a, a.contentNodes[0]);
  a.contentNodes[0] = c.fence;
  c = sre.SemanticProcessor.rewriteFence_(c.node, b);
  a.contentNodes[1] = c.fence;
  a.contentNodes[0].parent = a;
  a.contentNodes[1].parent = a;
  c.node.parent = null;
  return c.node;
};
sre.SemanticProcessor.rewriteFence_ = function (a, b) {
  if (!b.embellished) return { node: a, fence: b };
  var c = b.childNodes[0],
    d = sre.SemanticProcessor.rewriteFence_(a, c);
  if (
    sre.SemanticPred.isAttribute("type", "SUPERSCRIPT")(b) ||
    sre.SemanticPred.isAttribute("type", "SUBSCRIPT")(b) ||
    sre.SemanticPred.isAttribute("type", "TENSOR")(b)
  )
    return (
      sre.SemanticPred.isAttribute("role", "SUBSUP")(b) || (b.role = a.role),
      c !== d.node && (b.replaceChild(c, d.node), (c.parent = a)),
      sre.SemanticProcessor.propagateFencePointer_(b, c),
      { node: b, fence: d.fence }
    );
  b.replaceChild(c, d.fence);
  b.mathmlTree &&
    -1 === b.mathml.indexOf(b.mathmlTree) &&
    b.mathml.push(b.mathmlTree);
  return { node: d.node, fence: b };
};
sre.SemanticProcessor.propagateFencePointer_ = function (a, b) {
  a.fencePointer = b.fencePointer || b.id.toString();
  a.embellished = null;
};
sre.SemanticProcessor.classifyMultiline = function (a) {
  for (
    var b = 0, c = a.childNodes.length, d;
    b < c && (!(d = a.childNodes[b]) || !d.childNodes.length);

  )
    b++;
  if (!(b >= c)) {
    var e = d.childNodes[0].role;
    e !== sre.SemanticAttr.Role.UNKNOWN &&
      a.childNodes.every(function (f) {
        f = f.childNodes[0];
        return (
          !f ||
          (f.role === e &&
            (sre.SemanticPred.isAttribute("type", "RELATION")(f) ||
              sre.SemanticPred.isAttribute("type", "RELSEQ")(f)))
        );
      }) &&
      (a.role = e);
  }
};
sre.SemanticProcessor.classifyTable = function (a) {
  var b = sre.SemanticProcessor.computeColumns_(a);
  sre.SemanticProcessor.classifyByColumns_(a, b, "EQUALITY") ||
    sre.SemanticProcessor.classifyByColumns_(a, b, "INEQUALITY", [
      "EQUALITY"
    ]) ||
    sre.SemanticProcessor.classifyByColumns_(a, b, "ARROW");
};
sre.SemanticProcessor.classifyByColumns_ = function (a, b, c, d) {
  d = function (g) {
    return sre.SemanticProcessor.isPureRelation_(g, c);
  };
  var e = function (g) {
      return (
        sre.SemanticProcessor.isEndRelation_(g, c) ||
        sre.SemanticProcessor.isPureRelation_(g, c)
      );
    },
    f = function (g) {
      return (
        sre.SemanticProcessor.isEndRelation_(g, c, !0) ||
        sre.SemanticProcessor.isPureRelation_(g, c)
      );
    };
  return (3 === b.length && sre.SemanticProcessor.testColumns_(b, 1, d)) ||
    (2 === b.length &&
      (sre.SemanticProcessor.testColumns_(b, 1, e) ||
        sre.SemanticProcessor.testColumns_(b, 0, f)))
    ? ((a.role = sre.SemanticAttr.Role[c]), !0)
    : !1;
};
sre.SemanticProcessor.isEndRelation_ = function (a, b, c) {
  c = c ? a.childNodes.length - 1 : 0;
  return (
    sre.SemanticPred.isAttribute("type", "RELSEQ")(a) &&
    sre.SemanticPred.isAttribute("role", b)(a) &&
    sre.SemanticPred.isAttribute("type", "EMPTY")(a.childNodes[c])
  );
};
sre.SemanticProcessor.isPureRelation_ = function (a, b) {
  return (
    sre.SemanticPred.isAttribute("type", "RELATION")(a) &&
    sre.SemanticPred.isAttribute("role", b)(a)
  );
};
sre.SemanticProcessor.computeColumns_ = function (a) {
  for (var b = [], c = 0, d; (d = a.childNodes[c]); c++)
    for (var e = 0, f; (f = d.childNodes[e]); e++)
      b[e] ? b[e].push(f) : (b[e] = [f]);
  return b;
};
sre.SemanticProcessor.testColumns_ = function (a, b, c) {
  return (a = a[b])
    ? a.some(function (d) {
        return d.childNodes.length && c(d.childNodes[0]);
      }) &&
        a.every(function (d) {
          return !d.childNodes.length || c(d.childNodes[0]);
        })
    : !1;
};
sre.SemanticProcessor.MATHJAX_FONTS = {
  "-tex-caligraphic": sre.SemanticAttr.Font.CALIGRAPHIC,
  "-tex-caligraphic-bold": sre.SemanticAttr.Font.CALIGRAPHICBOLD,
  "-tex-calligraphic": sre.SemanticAttr.Font.CALIGRAPHIC,
  "-tex-calligraphic-bold": sre.SemanticAttr.Font.CALIGRAPHICBOLD,
  "-tex-oldstyle": sre.SemanticAttr.Font.OLDSTYLE,
  "-tex-oldstyle-bold": sre.SemanticAttr.Font.OLDSTYLEBOLD,
  "-tex-mathit": sre.SemanticAttr.Font.ITALIC
};
sre.SemanticProcessor.prototype.font = function (a) {
  var b = sre.SemanticProcessor.MATHJAX_FONTS[a];
  return b ? b : a;
};
sre.SemanticProcessor.proof = function (a, b, c) {
  b = sre.SemanticProcessor.separateSemantics(b);
  return sre.SemanticProcessor.getInstance().proof(a, b, c);
};
sre.SemanticProcessor.prototype.proof = function (a, b, c) {
  b.inference || b.axiom || console.log("Noise");
  if (b.axiom)
    return (
      (b = this.cleanInference(a.childNodes)),
      (b = b.length
        ? this.factory_.makeBranchNode(
            sre.SemanticAttr.Type.INFERENCE,
            c(b),
            []
          )
        : this.factory_.makeEmptyNode()),
      (b.role = sre.SemanticAttr.Role.AXIOM),
      (b.mathmlTree = a),
      b
    );
  a = this.inference(a, b, c);
  b.proof &&
    ((a.role = sre.SemanticAttr.Role.PROOF),
    (a.childNodes[0].role = sre.SemanticAttr.Role.FINAL));
  return a;
};
sre.SemanticProcessor.prototype.inference = function (a, b, c) {
  if (b.inferenceRule)
    return (
      (c = this.getFormulas(a, [], c)),
      (c = this.factory_.makeBranchNode(
        sre.SemanticAttr.Type.INFERENCE,
        [c.conclusion, c.premises],
        []
      ))
    );
  var d = b.labelledRule,
    e = sre.DomUtil.toArray(a.childNodes);
  b = [];
  ("left" !== d && "both" !== d) ||
    b.push(this.getLabel(a, e, c, sre.SemanticAttr.Role.LEFT));
  ("right" !== d && "both" !== d) ||
    b.push(this.getLabel(a, e, c, sre.SemanticAttr.Role.RIGHT));
  c = this.getFormulas(a, e, c);
  c = this.factory_.makeBranchNode(
    sre.SemanticAttr.Type.INFERENCE,
    [c.conclusion, c.premises],
    b
  );
  c.mathmlTree = a;
  return c;
};
sre.SemanticProcessor.prototype.getLabel = function (a, b, c, d) {
  a = this.findNestedRow(b, "prooflabel", d);
  c = this.factory_.makeBranchNode(
    sre.SemanticAttr.Type.RULELABEL,
    c(sre.DomUtil.toArray(a.childNodes)),
    []
  );
  c.role = d;
  c.mathmlTree = a;
  return c;
};
sre.SemanticProcessor.prototype.getFormulas = function (a, b, c) {
  b = b.length ? this.findNestedRow(b, "inferenceRule") : a;
  var d = "up" === sre.SemanticProcessor.getSemantics(b).inferenceRule;
  a = d ? b.childNodes[0] : b.childNodes[1];
  b = (d ? b.childNodes[1] : b.childNodes[0]).childNodes[0].childNodes[0];
  var e = sre.DomUtil.toArray(b.childNodes[0].childNodes);
  d = [];
  var f = 1;
  e = $jscomp.makeIterator(e);
  for (var g = e.next(); !g.done; g = e.next())
    (g = g.value), f % 2 && d.push(g.childNodes[0]), f++;
  d = c(d);
  c = c(sre.DomUtil.toArray(a.childNodes[0].childNodes))[0];
  d = this.factory_.makeBranchNode(sre.SemanticAttr.Type.PREMISES, d, []);
  d.mathmlTree = b;
  c = this.factory_.makeBranchNode(sre.SemanticAttr.Type.CONCLUSION, [c], []);
  c.mathmlTree = a.childNodes[0].childNodes[0];
  return { conclusion: c, premises: d };
};
sre.SemanticProcessor.prototype.findNestedRow = function (a, b, c) {
  return this.findNestedRow_(a, b, 0, c);
};
sre.SemanticProcessor.prototype.findNestedRow_ = function (a, b, c, d) {
  if (3 < c) return null;
  for (var e = 0, f; (f = a[e]); e++) {
    var g = sre.DomUtil.tagName(f);
    if ("MSPACE" !== g) {
      if ("MROW" === g)
        return this.findNestedRow_(
          sre.DomUtil.toArray(f.childNodes),
          b,
          c + 1,
          d
        );
      if (sre.SemanticProcessor.findSemantics(f, b, d)) return f;
    }
  }
  return null;
};
sre.SemanticProcessor.prototype.cleanInference = function (a) {
  return sre.DomUtil.toArray(a).filter(function (b) {
    return "MSPACE" !== sre.DomUtil.tagName(b);
  });
};
sre.SemanticProcessor.findSemantics = function (a, b, c) {
  c = null == c ? null : c;
  return (a = sre.SemanticProcessor.getSemantics(a)) && a[b]
    ? null == c
      ? !0
      : a[b] === c
    : !1;
};
sre.SemanticProcessor.getSemantics = function (a) {
  return (a = a.getAttribute("semantics"))
    ? sre.SemanticProcessor.separateSemantics(a)
    : null;
};
sre.SemanticProcessor.removePrefix = function (a) {
  a = $jscomp.makeIterator(a.split("_"));
  a.next();
  return $jscomp.arrayFromIterator(a).join("_");
};
sre.SemanticProcessor.separateSemantics = function (a) {
  var b = {};
  a.split(";").forEach(function (c) {
    var d = $jscomp.makeIterator(c.split(":"));
    c = d.next().value;
    d = d.next().value;
    b[sre.SemanticProcessor.removePrefix(c)] = d;
  });
  return b;
};
sre.SemanticProcessor.prototype.operatorNode = function (a) {
  a.type === sre.SemanticAttr.Type.UNKNOWN &&
    (a.type = sre.SemanticAttr.Type.OPERATOR);
  return sre.SemanticHeuristics.run("multioperator", a);
};
sre.SemanticMathml = function () {
  sre.SemanticAbstractParser.call(this, "MathML");
  this.parseMap_ = {
    SEMANTICS: goog.bind(this.semantics_, this),
    MATH: goog.bind(this.rows_, this),
    MROW: goog.bind(this.rows_, this),
    MPADDED: goog.bind(this.rows_, this),
    MSTYLE: goog.bind(this.rows_, this),
    MFRAC: goog.bind(this.fraction_, this),
    MSUB: goog.bind(this.limits_, this),
    MSUP: goog.bind(this.limits_, this),
    MSUBSUP: goog.bind(this.limits_, this),
    MOVER: goog.bind(this.limits_, this),
    MUNDER: goog.bind(this.limits_, this),
    MUNDEROVER: goog.bind(this.limits_, this),
    MROOT: goog.bind(this.root_, this),
    MSQRT: goog.bind(this.sqrt_, this),
    MTABLE: goog.bind(this.table_, this),
    MLABELEDTR: goog.bind(this.tableLabeledRow_, this),
    MTR: goog.bind(this.tableRow_, this),
    MTD: goog.bind(this.tableCell_, this),
    MS: goog.bind(this.text_, this),
    MTEXT: goog.bind(this.text_, this),
    MSPACE: goog.bind(this.space_, this),
    "ANNOTATION-XML": goog.bind(this.text_, this),
    MI: goog.bind(this.identifier_, this),
    MN: goog.bind(this.number_, this),
    MO: goog.bind(this.operator_, this),
    MFENCED: goog.bind(this.fenced_, this),
    MENCLOSE: goog.bind(this.enclosed_, this),
    MMULTISCRIPTS: goog.bind(this.multiscripts_, this),
    ANNOTATION: goog.bind(this.empty_, this),
    NONE: goog.bind(this.empty_, this),
    MACTION: goog.bind(this.action_, this)
  };
  var a = {
    type: sre.SemanticAttr.Type.IDENTIFIER,
    role: sre.SemanticAttr.Role.NUMBERSET,
    font: sre.SemanticAttr.Font.DOUBLESTRUCK
  };
  "CHNPQRZ\u2102\u210d\u2115\u2119\u211a\u211d\u2124".split("").forEach(
    function (b) {
      this.getFactory().defaultMap.add(b, a);
    }.bind(this)
  );
};
goog.inherits(sre.SemanticMathml, sre.SemanticAbstractParser);
sre.SemanticMathml.prototype.parse = function (a) {
  sre.SemanticProcessor.getInstance().setNodeFactory(this.getFactory());
  var b = sre.DomUtil.toArray(a.childNodes),
    c = sre.DomUtil.tagName(a),
    d = this.parseMap_[c];
  b = (d ? d : goog.bind(this.dummy_, this))(a, b);
  sre.SemanticUtil.addAttributes(b, a);
  if (-1 !== ["MATH", "MROW", "MPADDED", "MSTYLE", "SEMANTICS"].indexOf(c))
    return b;
  b.mathml.unshift(a);
  b.mathmlTree = a;
  return b;
};
sre.SemanticMathml.prototype.semantics_ = function (a, b) {
  return b.length ? this.parse(b[0]) : this.getFactory().makeEmptyNode();
};
sre.SemanticMathml.prototype.rows_ = function (a, b) {
  var c = a.getAttribute("semantics");
  if (c && c.match("bspr_"))
    return sre.SemanticProcessor.proof(a, c, goog.bind(this.parseList, this));
  b = sre.SemanticUtil.purgeNodes(b);
  1 === b.length
    ? ((b = this.parse(b[0])),
      b.type !== sre.SemanticAttr.Type.EMPTY ||
        b.mathmlTree ||
        (b.mathmlTree = a))
    : (b = sre.SemanticProcessor.getInstance().row(this.parseList(b)));
  b.mathml.unshift(a);
  return b;
};
sre.SemanticMathml.prototype.fraction_ = function (a, b) {
  if (!b.length) return this.getFactory().makeEmptyNode();
  var c = this.parse(b[0]);
  b = b[1] ? this.parse(b[1]) : this.getFactory().makeEmptyNode();
  return sre.SemanticProcessor.getInstance().fractionLikeNode(
    c,
    b,
    a.getAttribute("linethickness"),
    "true" === a.getAttribute("bevelled")
  );
};
sre.SemanticMathml.prototype.limits_ = function (a, b) {
  return sre.SemanticProcessor.getInstance().limitNode(
    sre.DomUtil.tagName(a),
    this.parseList(b)
  );
};
sre.SemanticMathml.prototype.root_ = function (a, b) {
  return b[1]
    ? this.getFactory().makeBranchNode(
        sre.SemanticAttr.Type.ROOT,
        [this.parse(b[1]), this.parse(b[0])],
        []
      )
    : this.sqrt_(a, b);
};
sre.SemanticMathml.prototype.sqrt_ = function (a, b) {
  a = this.parseList(sre.SemanticUtil.purgeNodes(b));
  return this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.SQRT,
    [sre.SemanticProcessor.getInstance().row(a)],
    []
  );
};
sre.SemanticMathml.prototype.table_ = function (a, b) {
  var c = a.getAttribute("semantics");
  if (c && c.match("bspr_"))
    return sre.SemanticProcessor.proof(a, c, goog.bind(this.parseList, this));
  a = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.TABLE,
    this.parseList(b),
    []
  );
  sre.SemanticProcessor.tableToMultiline(a);
  return a;
};
sre.SemanticMathml.prototype.tableRow_ = function (a, b) {
  a = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.ROW,
    this.parseList(b),
    []
  );
  a.role = sre.SemanticAttr.Role.TABLE;
  return a;
};
sre.SemanticMathml.prototype.tableLabeledRow_ = function (a, b) {
  if (!b.length) return this.tableRow_(a, b);
  a = this.parse(b[0]);
  a.role = sre.SemanticAttr.Role.LABEL;
  b = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.ROW,
    this.parseList(b.slice(1)),
    [a]
  );
  b.role = sre.SemanticAttr.Role.TABLE;
  return b;
};
sre.SemanticMathml.prototype.tableCell_ = function (a, b) {
  a = this.parseList(sre.SemanticUtil.purgeNodes(b));
  a = a.length
    ? 1 === a.length && sre.SemanticPred.isAttribute("type", "EMPTY")(a[0])
      ? a
      : [sre.SemanticProcessor.getInstance().row(a)]
    : [];
  a = this.getFactory().makeBranchNode(sre.SemanticAttr.Type.CELL, a, []);
  a.role = sre.SemanticAttr.Role.TABLE;
  return a;
};
sre.SemanticMathml.prototype.space_ = function (a, b) {
  var c = a.getAttribute("width"),
    d = c && c.match(/[a-z]*$/);
  if (!d) return this.empty_(a, b);
  var e = d[0];
  c = parseFloat(c.slice(0, d.index));
  e = { cm: 0.4, pc: 0.5, em: 0.5, ex: 1, in: 0.15, pt: 5, mm: 5 }[e];
  if (!e || isNaN(c) || c < e) return this.empty_(a, b);
  b = this.getFactory().makeUnprocessed(a);
  return sre.SemanticProcessor.getInstance().text(b, sre.DomUtil.tagName(a));
};
sre.SemanticMathml.prototype.text_ = function (a, b) {
  b = this.leaf_(a, b);
  if (!a.textContent) return b;
  b.updateContent(a.textContent, !0);
  return sre.SemanticProcessor.getInstance().text(b, sre.DomUtil.tagName(a));
};
sre.SemanticMathml.prototype.identifier_ = function (a, b) {
  b = this.leaf_(a, b);
  return sre.SemanticProcessor.getInstance().identifierNode(
    b,
    sre.SemanticProcessor.getInstance().font(a.getAttribute("mathvariant")),
    a.getAttribute("class")
  );
};
sre.SemanticMathml.prototype.number_ = function (a, b) {
  a = this.leaf_(a, b);
  sre.SemanticProcessor.number(a);
  return a;
};
sre.SemanticMathml.prototype.operator_ = function (a, b) {
  a = this.leaf_(a, b);
  sre.SemanticProcessor.getInstance().operatorNode(a);
  return a;
};
sre.SemanticMathml.prototype.fenced_ = function (a, b) {
  b = this.parseList(sre.SemanticUtil.purgeNodes(b));
  var c = sre.SemanticMathml.getAttribute_(a, "separators", ","),
    d = sre.SemanticMathml.getAttribute_(a, "open", "(");
  a = sre.SemanticMathml.getAttribute_(a, "close", ")");
  a = sre.SemanticProcessor.getInstance().mfenced(d, a, c, b);
  return sre.SemanticProcessor.getInstance().tablesInRow([a])[0];
};
sre.SemanticMathml.prototype.enclosed_ = function (a, b) {
  b = this.parseList(sre.SemanticUtil.purgeNodes(b));
  b = this.getFactory().makeBranchNode(
    sre.SemanticAttr.Type.ENCLOSE,
    [sre.SemanticProcessor.getInstance().row(b)],
    []
  );
  b.role = a.getAttribute("notation") || sre.SemanticAttr.Role.UNKNOWN;
  return b;
};
sre.SemanticMathml.prototype.multiscripts_ = function (a, b) {
  if (!b.length) return this.getFactory().makeEmptyNode();
  a = this.parse(b.shift());
  if (!b.length) return a;
  for (
    var c = [], d = [], e = [], f = [], g = !1, h = 0, k = 0, l;
    (l = b[k]);
    k++
  )
    "MPRESCRIPTS" === sre.DomUtil.tagName(l)
      ? ((g = !0), (h = 0))
      : (g ? (h & 1 ? c.push(l) : d.push(l)) : h & 1 ? e.push(l) : f.push(l),
        h++);
  return sre.SemanticUtil.purgeNodes(c).length ||
    sre.SemanticUtil.purgeNodes(d).length
    ? sre.SemanticProcessor.getInstance().tensor(
        a,
        this.parseList(d),
        this.parseList(c),
        this.parseList(f),
        this.parseList(e)
      )
    : sre.SemanticProcessor.getInstance().pseudoTensor(
        a,
        this.parseList(f),
        this.parseList(e)
      );
};
sre.SemanticMathml.prototype.empty_ = function (a, b) {
  return this.getFactory().makeEmptyNode();
};
sre.SemanticMathml.prototype.action_ = function (a, b) {
  return 1 < b.length ? this.parse(b[1]) : this.getFactory().makeUnprocessed(a);
};
sre.SemanticMathml.prototype.dummy_ = function (a, b) {
  b = this.getFactory().makeUnprocessed(a);
  b.role = a.tagName;
  b.textContent = a.textContent;
  return b;
};
sre.SemanticMathml.prototype.leaf_ = function (a, b) {
  return 1 === b.length && b[0].nodeType !== sre.DomUtil.NodeType.TEXT_NODE
    ? ((a = this.getFactory().makeUnprocessed(a)),
      (a.role = b[0].tagName),
      sre.SemanticUtil.addAttributes(a, b[0]),
      a)
    : this.getFactory().makeLeafNode(
        a.textContent,
        sre.SemanticProcessor.getInstance().font(a.getAttribute("mathvariant"))
      );
};
sre.SemanticMathml.getAttribute_ = function (a, b, c) {
  if (!a.hasAttribute(b)) return c;
  a = a.getAttribute(b);
  return a.match(/^\s*$/) ? null : a;
};
sre.SemanticTree = function (a) {
  this.mathml = a;
  this.parser = new sre.SemanticMathml();
  this.root = this.parser.parse(a);
  this.collator = this.parser.getFactory().leafMap.collateMeaning();
  var b = this.collator.newDefault();
  b &&
    ((this.parser = new sre.SemanticMathml()),
    (this.parser.getFactory().defaultMap = b),
    (this.root = this.parser.parse(a)));
  sre.SemanticTree.unitVisitor_.visit(this.root, {});
  sre.SemanticAnnotations.getInstance().annotate(this.root);
};
sre.SemanticTree.unitVisitor_ = new sre.SemanticVisitor(
  "general",
  "unit",
  function (a, b) {
    a.type !== sre.SemanticAttr.Type.INFIXOP ||
      (a.role !== sre.SemanticAttr.Role.MULTIPLICATION &&
        a.role !== sre.SemanticAttr.Role.IMPLICIT) ||
      ((b = a.childNodes),
      b.length &&
        (sre.SemanticPred.isPureUnit(b[0]) ||
          sre.SemanticPred.isUnitCounter(b[0])) &&
        a.childNodes.slice(1).every(sre.SemanticPred.isPureUnit) &&
        (a.role = sre.SemanticAttr.Role.UNIT));
    return !1;
  }
);
sre.SemanticTree.empty = function () {
  var a = sre.DomUtil.parseInput("<math/>"),
    b = new sre.SemanticTree(a);
  b.mathml = a;
  return b;
};
sre.SemanticTree.fromNode = function (a, b) {
  var c = sre.SemanticTree.empty();
  c.root = a;
  b && (c.mathml = b);
  return c;
};
sre.SemanticTree.fromRoot = function (a, b) {
  for (; a.parent; ) a = a.parent;
  a = sre.SemanticTree.fromNode(a);
  b && (a.mathml = b);
  return a;
};
sre.SemanticTree.prototype.xml = function (a) {
  var b = sre.DomUtil.parseInput("<stree></stree>");
  a = this.root.xml(b.ownerDocument, a);
  b.appendChild(a);
  return b;
};
sre.SemanticTree.prototype.toString = function (a) {
  return new sre.SystemExternal.xmldom.XMLSerializer().serializeToString(
    this.xml(a)
  );
};
sre.SemanticTree.prototype.formatXml = function (a) {
  a = this.toString(a);
  return sre.DomUtil.formatXml(a);
};
sre.SemanticTree.prototype.displayTree = function () {
  this.root.displayTree();
};
sre.SemanticTree.prototype.replaceNode = function (a, b) {
  var c = a.parent;
  c ? c.replaceChild(a, b) : (this.root = b);
};
sre.SemanticTree.prototype.toJson = function () {
  var a = {};
  a.stree = this.root.toJson();
  return a;
};
sre.SemanticTree.fromXml = function (a) {
  var b = sre.SemanticTree.empty();
  a.childNodes[0] && (b.root = sre.SemanticNode.fromXml(a.childNodes[0]));
  return b;
};
sre.Semantic = {};
sre.Semantic.Font = sre.SemanticAttr.Font;
sre.Semantic.Role = sre.SemanticAttr.Role;
sre.Semantic.Type = sre.SemanticAttr.Type;
sre.Semantic.xmlTree = function (a) {
  return sre.Semantic.getTree(a).xml();
};
sre.Semantic.getTree = function (a) {
  return new sre.SemanticTree(a);
};
sre.Semantic.getTreeFromString = function (a) {
  a = sre.DomUtil.parseInput(a);
  return sre.Semantic.getTree(a);
};
sre.MathspeakUtil = {};
sre.MathspeakUtil.spaceoutText = function (a) {
  return Array.from(a.textContent).join(" ");
};
sre.MathspeakUtil.spaceoutNodes = function (a, b) {
  var c = Array.from(a.textContent),
    d = [],
    e = sre.SemanticProcessor.getInstance();
  a = a.ownerDocument;
  for (var f = 0, g; (g = c[f]); f++)
    (g = e.getNodeFactory().makeLeafNode(g, sre.Semantic.Font.UNKNOWN)),
      (g = e.identifierNode(g, sre.Semantic.Font.UNKNOWN, "")),
      b(g),
      d.push(g.xml(a));
  return d;
};
sre.MathspeakUtil.spaceoutNumber = function (a) {
  return sre.MathspeakUtil.spaceoutNodes(a, function (b) {
    b.textContent.match(/\W/) || (b.type = sre.Semantic.Type.NUMBER);
  });
};
sre.MathspeakUtil.spaceoutIdentifier = function (a) {
  return sre.MathspeakUtil.spaceoutNodes(a, function (b) {
    b.font = sre.Semantic.Font.UNKNOWN;
    b.type = sre.Semantic.Type.IDENTIFIER;
  });
};
sre.MathspeakUtil.nestingBarriers = [
  sre.Semantic.Type.CASES,
  sre.Semantic.Type.CELL,
  sre.Semantic.Type.INTEGRAL,
  sre.Semantic.Type.LINE,
  sre.Semantic.Type.MATRIX,
  sre.Semantic.Type.MULTILINE,
  sre.Semantic.Type.OVERSCORE,
  sre.Semantic.Type.ROOT,
  sre.Semantic.Type.ROW,
  sre.Semantic.Type.SQRT,
  sre.Semantic.Type.SUBSCRIPT,
  sre.Semantic.Type.SUPERSCRIPT,
  sre.Semantic.Type.TABLE,
  sre.Semantic.Type.UNDERSCORE,
  sre.Semantic.Type.VECTOR
];
sre.MathspeakUtil.nestingDepth = {};
sre.MathspeakUtil.resetNestingDepth = function (a) {
  sre.MathspeakUtil.nestingDepth = {};
  return [a];
};
sre.MathspeakUtil.getNestingDepth = function (a, b, c, d, e, f) {
  d = d || sre.MathspeakUtil.nestingBarriers;
  e = e || {};
  f =
    f ||
    function (h) {
      return !1;
    };
  var g = new sre.SystemExternal.xmldom.XMLSerializer().serializeToString(b);
  sre.MathspeakUtil.nestingDepth[a] || (sre.MathspeakUtil.nestingDepth[a] = {});
  if (sre.MathspeakUtil.nestingDepth[a][g])
    return sre.MathspeakUtil.nestingDepth[a][g];
  if (f(b) || 0 > c.indexOf(b.tagName)) return 0;
  b = sre.MathspeakUtil.computeNestingDepth_(
    b,
    c,
    sre.BaseUtil.setdifference(d, c),
    e,
    f,
    0
  );
  return (sre.MathspeakUtil.nestingDepth[a][g] = b);
};
sre.MathspeakUtil.containsAttr = function (a, b) {
  if (!a.attributes) return !1;
  a = sre.DomUtil.toArray(a.attributes);
  for (var c = 0, d; (d = a[c]); c++)
    if (b[d.nodeName] === d.nodeValue) return !0;
  return !1;
};
sre.MathspeakUtil.computeNestingDepth_ = function (a, b, c, d, e, f) {
  if (e(a) || -1 < c.indexOf(a.tagName) || sre.MathspeakUtil.containsAttr(a, d))
    return f;
  -1 < b.indexOf(a.tagName) && f++;
  if (!a.childNodes || 0 === a.childNodes.length) return f;
  a = sre.DomUtil.toArray(a.childNodes);
  return Math.max.apply(
    null,
    a.map(function (g) {
      return sre.MathspeakUtil.computeNestingDepth_(g, b, c, d, e, f);
    })
  );
};
sre.MathspeakUtil.fractionNestingDepth = function (a) {
  return sre.MathspeakUtil.getNestingDepth(
    "fraction",
    a,
    ["fraction"],
    sre.MathspeakUtil.nestingBarriers,
    {},
    sre.Messages.MS_FUNC.FRAC_NEST_DEPTH
  );
};
sre.MathspeakUtil.nestedFraction = function (a, b, c) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  a = Array.apply(null, Array(a)).map(function (d) {
    return b;
  });
  c && a.push(c);
  return a.join(sre.Messages.REGEXP.JOINER_FRAC);
};
sre.MathspeakUtil.openingFractionVerbose = function (a) {
  return sre.MathspeakUtil.nestedFraction(
    a,
    sre.Messages.MS.START,
    sre.Messages.MS.FRAC_V
  );
};
sre.MathspeakUtil.closingFractionVerbose = function (a) {
  return sre.MathspeakUtil.nestedFraction(
    a,
    sre.Messages.MS.END,
    sre.Messages.MS.FRAC_V
  );
};
sre.MathspeakUtil.overFractionVerbose = function (a) {
  return sre.MathspeakUtil.nestedFraction(a, sre.Messages.MS.FRAC_OVER);
};
sre.MathspeakUtil.openingFractionBrief = function (a) {
  return sre.MathspeakUtil.nestedFraction(
    a,
    sre.Messages.MS.START,
    sre.Messages.MS.FRAC_B
  );
};
sre.MathspeakUtil.closingFractionBrief = function (a) {
  return sre.MathspeakUtil.nestedFraction(
    a,
    sre.Messages.MS.END,
    sre.Messages.MS.FRAC_B
  );
};
sre.MathspeakUtil.openingFractionSbrief = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return 1 === a
    ? sre.Messages.MS.FRAC_S
    : sre.Messages.MS_FUNC.COMBINE_NESTED_FRACTION(
        sre.Messages.MS.NEST_FRAC,
        sre.Messages.MS_FUNC.RADICAL_NEST_DEPTH(a - 1),
        sre.Messages.MS.FRAC_S
      );
};
sre.MathspeakUtil.closingFractionSbrief = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return 1 === a
    ? sre.Messages.MS.ENDFRAC
    : sre.Messages.MS_FUNC.COMBINE_NESTED_FRACTION(
        sre.Messages.MS.NEST_FRAC,
        sre.Messages.MS_FUNC.RADICAL_NEST_DEPTH(a - 1),
        sre.Messages.MS.ENDFRAC
      );
};
sre.MathspeakUtil.overFractionSbrief = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return 1 === a
    ? sre.Messages.MS.FRAC_OVER
    : sre.Messages.MS_FUNC.COMBINE_NESTED_FRACTION(
        sre.Messages.MS.NEST_FRAC,
        sre.Messages.MS_FUNC.RADICAL_NEST_DEPTH(a - 1),
        sre.Messages.MS.FRAC_OVER
      );
};
sre.MathspeakUtil.isSmallVulgarFraction = function (a) {
  return sre.NumbersUtil.vulgarFractionSmall(a, 10, 100) ? [a] : [];
};
sre.MathspeakUtil.nestedSubSuper = function (a, b, c) {
  for (; a.parentNode; ) {
    var d = a.parentNode,
      e = d.parentNode;
    if (!e) break;
    var f = a.getAttribute && a.getAttribute("role");
    if (
      (e.tagName === sre.Semantic.Type.SUBSCRIPT && a === d.childNodes[1]) ||
      (e.tagName === sre.Semantic.Type.TENSOR &&
        f &&
        (f === sre.Semantic.Role.LEFTSUB || f === sre.Semantic.Role.RIGHTSUB))
    )
      b = c.sub + sre.Messages.REGEXP.JOINER_SUBSUPER + b;
    if (
      (e.tagName === sre.Semantic.Type.SUPERSCRIPT && a === d.childNodes[1]) ||
      (e.tagName === sre.Semantic.Type.TENSOR &&
        f &&
        (f === sre.Semantic.Role.LEFTSUPER ||
          f === sre.Semantic.Role.RIGHTSUPER))
    )
      b = c.sup + sre.Messages.REGEXP.JOINER_SUBSUPER + b;
    a = e;
  }
  return b.trim();
};
sre.MathspeakUtil.subscriptVerbose = function (a) {
  return sre.MathspeakUtil.nestedSubSuper(a, sre.Messages.MS.SUBSCRIPT, {
    sup: sre.Messages.MS.SUPER,
    sub: sre.Messages.MS.SUB
  });
};
sre.MathspeakUtil.subscriptBrief = function (a) {
  return sre.MathspeakUtil.nestedSubSuper(a, sre.Messages.MS.SUB, {
    sup: sre.Messages.MS.SUP,
    sub: sre.Messages.MS.SUB
  });
};
sre.MathspeakUtil.superscriptVerbose = function (a) {
  return sre.MathspeakUtil.nestedSubSuper(a, sre.Messages.MS.SUPERSCRIPT, {
    sup: sre.Messages.MS.SUPER,
    sub: sre.Messages.MS.SUB
  });
};
sre.MathspeakUtil.superscriptBrief = function (a) {
  return sre.MathspeakUtil.nestedSubSuper(a, sre.Messages.MS.SUP, {
    sup: sre.Messages.MS.SUP,
    sub: sre.Messages.MS.SUB
  });
};
sre.MathspeakUtil.baselineVerbose = function (a) {
  return (a = sre.MathspeakUtil.nestedSubSuper(a, "", {
    sup: sre.Messages.MS.SUPER,
    sub: sre.Messages.MS.SUB
  }))
    ? a
        .replace(
          new RegExp(sre.Messages.MS.SUB + "$"),
          sre.Messages.MS.SUBSCRIPT
        )
        .replace(
          new RegExp(sre.Messages.MS.SUPER + "$"),
          sre.Messages.MS.SUPERSCRIPT
        )
    : sre.Messages.MS.BASELINE;
};
sre.MathspeakUtil.baselineBrief = function (a) {
  return (
    sre.MathspeakUtil.nestedSubSuper(a, "", {
      sup: sre.Messages.MS.SUP,
      sub: sre.Messages.MS.SUB
    }) || sre.Messages.MS.BASE
  );
};
sre.MathspeakUtil.radicalNestingDepth = function (a) {
  return sre.MathspeakUtil.getNestingDepth(
    "radical",
    a,
    ["sqrt", "root"],
    sre.MathspeakUtil.nestingBarriers,
    {}
  );
};
sre.MathspeakUtil.nestedRadical = function (a, b, c) {
  var d = sre.MathspeakUtil.radicalNestingDepth(a);
  c = (a = sre.MathspeakUtil.getRootIndex(a))
    ? sre.Messages.MS_FUNC.COMBINE_ROOT_INDEX(c, a)
    : c;
  return 1 === d
    ? c
    : sre.Messages.MS_FUNC.COMBINE_NESTED_RADICAL(
        b,
        sre.Messages.MS_FUNC.RADICAL_NEST_DEPTH(d - 1),
        c
      );
};
sre.MathspeakUtil.getRootIndex = function (a) {
  a =
    "sqrt" === a.tagName
      ? "2"
      : sre.XpathUtil.evalXPath("children/*[1]", a)[0].textContent.trim();
  return sre.Messages.MS_ROOT_INDEX[a] || "";
};
sre.MathspeakUtil.openingRadicalVerbose = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NESTED,
    sre.Messages.MS.STARTROOT
  );
};
sre.MathspeakUtil.closingRadicalVerbose = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NESTED,
    sre.Messages.MS.ENDROOT
  );
};
sre.MathspeakUtil.indexRadicalVerbose = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NESTED,
    sre.Messages.MS.ROOTINDEX
  );
};
sre.MathspeakUtil.openingRadicalBrief = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NEST_ROOT,
    sre.Messages.MS.STARTROOT
  );
};
sre.MathspeakUtil.closingRadicalBrief = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NEST_ROOT,
    sre.Messages.MS.ENDROOT
  );
};
sre.MathspeakUtil.indexRadicalBrief = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NEST_ROOT,
    sre.Messages.MS.ROOTINDEX
  );
};
sre.MathspeakUtil.openingRadicalSbrief = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NEST_ROOT,
    sre.Messages.MS.ROOT
  );
};
sre.MathspeakUtil.indexRadicalSbrief = function (a) {
  return sre.MathspeakUtil.nestedRadical(
    a,
    sre.Messages.MS.NEST_ROOT,
    sre.Messages.MS.INDEX
  );
};
sre.MathspeakUtil.underscoreNestingDepth = function (a) {
  return sre.MathspeakUtil.getNestingDepth(
    "underscore",
    a,
    ["underscore"],
    sre.MathspeakUtil.nestingBarriers,
    {},
    function (b) {
      return (
        b.tagName &&
        b.tagName === sre.Semantic.Type.UNDERSCORE &&
        b.childNodes[0].childNodes[1].getAttribute("role") ===
          sre.Semantic.Role.UNDERACCENT
      );
    }
  );
};
sre.MathspeakUtil.nestedUnderscore = function (a) {
  a = sre.MathspeakUtil.underscoreNestingDepth(a);
  return Array(a).join(sre.Messages.MS.UNDER) + sre.Messages.MS.UNDERSCRIPT;
};
sre.MathspeakUtil.overscoreNestingDepth = function (a) {
  return sre.MathspeakUtil.getNestingDepth(
    "overscore",
    a,
    ["overscore"],
    sre.MathspeakUtil.nestingBarriers,
    {},
    function (b) {
      return (
        b.tagName &&
        b.tagName === sre.Semantic.Type.OVERSCORE &&
        b.childNodes[0].childNodes[1].getAttribute("role") ===
          sre.Semantic.Role.OVERACCENT
      );
    }
  );
};
sre.MathspeakUtil.nestedOverscore = function (a) {
  a = sre.MathspeakUtil.overscoreNestingDepth(a);
  return Array(a).join(sre.Messages.MS.OVER) + sre.Messages.MS.OVERSCRIPT;
};
sre.MathspeakUtil.determinantIsSimple = function (a) {
  if (
    a.tagName !== sre.Semantic.Type.MATRIX ||
    a.getAttribute("role") !== sre.Semantic.Role.DETERMINANT
  )
    return [];
  for (
    var b = sre.XpathUtil.evalXPath("children/row/children/cell/children/*", a),
      c = 0,
      d;
    (d = b[c]);
    c++
  )
    if (d.tagName !== sre.Semantic.Type.NUMBER) {
      if (
        d.tagName === sre.Semantic.Type.IDENTIFIER &&
        ((d = d.getAttribute("role")),
        d === sre.Semantic.Role.LATINLETTER ||
          d === sre.Semantic.Role.GREEKLETTER ||
          d === sre.Semantic.Role.OTHERLETTER)
      )
        continue;
      return [];
    }
  return [a];
};
sre.MathspeakUtil.generateBaselineConstraint = function () {
  var a = function (g) {
      return g.map(function (h) {
        return "ancestor::" + h;
      });
    },
    b = "not(" + a(["subscript", "superscript", "tensor"]).join(" or ") + ")",
    c = a(["relseq", "multrel"]);
  a = a(["fraction", "punctuation", "fenced", "sqrt", "root"]);
  for (var d = [], e = 0, f; (f = a[e]); e++)
    d = d.concat(
      c.map(function (g) {
        return f + "/" + g;
      })
    );
  c = "not(" + d.join(" | ") + ")";
  return [["ancestor::*/following-sibling::*", b, c].join(" and ")];
};
sre.MathspeakUtil.removeParens = function (a) {
  if (
    !a.childNodes.length ||
    !a.childNodes[0].childNodes.length ||
    !a.childNodes[0].childNodes[0].childNodes.length
  )
    return "";
  a = a.childNodes[0].childNodes[0].childNodes[0].textContent;
  return a.match(/^\(.+\)$/) ? a.slice(1, -1) : a;
};
sre.MathspeakUtil.componentString_ = {
  3: "CSFleftsuperscript",
  4: "CSFleftsubscript",
  2: "CSFbaseline",
  1: "CSFrightsubscript",
  0: "CSFrightsuperscript"
};
sre.MathspeakUtil.childNumber_ = { 4: 2, 3: 3, 2: 1, 1: 4, 0: 5 };
sre.MathspeakUtil.generateTensorRuleStrings_ = function (a) {
  var b = [],
    c = "",
    d = "";
  a = parseInt(a, 2);
  for (var e = 0; 5 > e; e++) {
    var f = "children/*[" + sre.MathspeakUtil.childNumber_[e] + "]";
    if (a & 1) {
      var g = sre.MathspeakUtil.componentString_[e % 5];
      c = "[t] " + g + "Verbose; [n] " + f + ";" + c;
      d = "[t] " + g + "Brief; [n] " + f + ";" + d;
    } else b.unshift("name(" + f + ')="empty"');
    a >>= 1;
  }
  b.push(c);
  b.push(d);
  return b;
};
sre.MathspeakUtil.generateTensorRules = function (a) {
  var b = goog.bind(a.defineRule, a);
  a = goog.bind(a.defineSpecialisedRule, a);
  for (
    var c =
        "11111 11110 11101 11100 10111 10110 10101 10100 01111 01110 01101 01100".split(
          " "
        ),
      d = 0,
      e;
    (e = c[d]);
    d++
  ) {
    var f = "tensor" + e;
    e = sre.MathspeakUtil.generateTensorRuleStrings_(e);
    var g = e.pop(),
      h = e.pop(),
      k = [f, "default", h, "self::tensor"].concat(e),
      l = [f, "brief", g, "self::tensor"].concat(e);
    b.apply(null, k);
    b.apply(null, l);
    a(f, "brief", "sbrief");
    k = sre.MathspeakUtil.componentString_[2];
    h += "; [t]" + k + "Verbose";
    g += "; [t]" + k + "Brief";
    f += "-baseline";
    k = [
      f,
      "default",
      h,
      "self::tensor",
      "((.//*[not(*)])[last()]/@id)!=(((.//ancestor::fraction|ancestor::root|ancestor::sqrt|ancestor::cell|ancestor::line|ancestor::stree)[1]//*[not(*)])[last()]/@id)"
    ].concat(e);
    l = [
      f,
      "brief",
      g,
      "self::tensor",
      "((.//*[not(*)])[last()]/@id)!=(((.//ancestor::fraction|ancestor::root|ancestor::sqrt|ancestor::cell|ancestor::line|ancestor::stree)[1]//*[not(*)])[last()]/@id)"
    ].concat(e);
    b.apply(null, k);
    b.apply(null, l);
    a(f, "brief", "sbrief");
  }
};
sre.Locale = {};
sre.Locale.nestingToString = function (a) {
  switch (a) {
    case 1:
      return sre.Messages.MS.ONCE || "";
    case 2:
      return sre.Messages.MS.TWICE;
    default:
      return a.toString();
  }
};
sre.Locale.vulgarNestingDepth = function (a) {
  return !!sre.MathspeakUtil.isSmallVulgarFraction(a).length;
};
sre.Locale.combinePostfixIndex = function (a, b) {
  return a === sre.Messages.MS.ROOTINDEX || a === sre.Messages.MS.INDEX
    ? a
    : a + " " + b;
};
sre.Locale.localFont = function (a) {
  var b = sre.Messages.FONT[a];
  void 0 === b && (b = a || "");
  return "string" === typeof b ? b : b[0];
};
sre.Grammar.getInstance().setCorrection("localFont", sre.Locale.localFont);
sre.Locale.localRole = function (a) {
  return sre.Messages.ROLE[a] || a;
};
sre.Grammar.getInstance().setCorrection("localRole", sre.Locale.localRole);
sre.Locale.localEnclose = function (a) {
  return sre.Messages.ENCLOSE[a] || a;
};
sre.Grammar.getInstance().setCorrection(
  "localEnclose",
  sre.Locale.localEnclose
);
sre.Locale.prefixCombiner = function (a, b, c) {
  a = c ? c + " " + a : a;
  return b ? b + " " + a : a;
};
sre.Locale.postfixCombiner = function (a, b, c) {
  a = c ? c + " " + a : a;
  return b ? a + " " + b : a;
};
sre.Numbers.de = {};
sre.Numbers.de.onesNumbers_ =
  " eins zwei drei vier f\u00fcnf sechs sieben acht neun zehn elf zw\u00f6lf dreizehn vierzehn f\u00fcnfzehn sechzehn siebzehn achtzehn neunzehn".split(
    " "
  );
sre.Numbers.de.tensNumbers_ =
  "  zwanzig drei\u00dfig vierzig f\u00fcnfzig sechzig siebzig achtzig neunzig".split(
    " "
  );
sre.Numbers.de.largeNumbers_ =
  " tausend million milliarde billion billiarde trillion trilliard quadrillion quadrilliard quintillion quintilliarde sextillion sextilliarde".split(
    " "
  );
sre.Numbers.de.onePrefix_ = function (a) {
  return a === sre.Numbers.de.onesNumbers_[1] ? "ein" : a;
};
sre.Numbers.de.hundredsToWords_ = function (a) {
  a %= 1e3;
  var b = sre.Numbers.de.onesNumbers_[Math.floor(a / 100)];
  var c = b ? sre.Numbers.de.onePrefix_(b) + "hundert" : "";
  if ((a %= 100))
    if (
      ((c += c ? sre.Numbers.de.NUMBERS.numSep : ""),
      (b = sre.Numbers.de.onesNumbers_[a]))
    )
      c += b;
    else {
      var d = sre.Numbers.de.tensNumbers_[Math.floor(a / 10)];
      b = sre.Numbers.de.onesNumbers_[a % 10];
      c += b ? sre.Numbers.de.onePrefix_(b) + "und" + d : d;
    }
  return c;
};
sre.Numbers.de.numberToWords = function (a) {
  if (a >= Math.pow(10, 36)) return a.toString();
  for (var b = 0, c = ""; 0 < a; ) {
    if (a % 1e3) {
      var d = sre.Numbers.de.hundredsToWords_(a % 1e3);
      c =
        sre.Numbers.de.onePrefix_(d) +
        (b ? sre.Numbers.de.largeNumbers_[b] : "") +
        c;
    }
    a = Math.floor(a / 1e3);
    b++;
  }
  return c.replace(/ein$/, "eins");
};
sre.Numbers.de.numberToOrdinal = function (a, b) {
  return 1 === a
    ? "eintel"
    : 2 === a
    ? b
      ? "halbe"
      : "halb"
    : sre.Numbers.de.wordOrdinal(a) + "l";
};
sre.Numbers.de.wordOrdinal = function (a) {
  return 1 === a
    ? "erste"
    : 3 === a
    ? "dritte"
    : 7 === a
    ? "siebte"
    : 8 === a
    ? "achte"
    : sre.Numbers.de.numberToWords(a) + (19 > a ? "te" : "ste");
};
sre.Numbers.de.simpHardworkrdinal = function (a) {
  return a.toString() + ".";
};
sre.Numbers.de.NUMBERS = {
  wordOrdinal: sre.Numbers.de.wordOrdinal,
  simpHardworkrdinal: sre.Numbers.de.simpHardworkrdinal,
  numberToWords: sre.Numbers.de.numberToWords,
  numberToOrdinal: sre.Numbers.de.numberToOrdinal,
  vulgarSep: " ",
  numSep: ""
};
var germanPrefixCombiner = function (a, b, c) {
    "s" === c &&
      ((b = b
        .split(" ")
        .map(function (d) {
          return d.replace(/s$/, "");
        })
        .join(" ")),
      (c = ""));
    a = c ? c + " " + a : a;
    return b ? b + " " + a : a;
  },
  germanPostfixCombiner = function (a, b, c) {
    a = c && "s" !== c ? c + " " + a : a;
    return b ? a + " " + b : a;
  };
sre.Locale.de = {
  MS: {
    START: "Anfang",
    FRAC_V: "Bruch",
    FRAC_B: "Bruch",
    FRAC_S: "Bruch",
    END: "Ende",
    FRAC_OVER: "durch",
    TWICE: "Twice",
    NEST_FRAC: "geschachtelt",
    ENDFRAC: "Ende Bruch",
    SUPER: "hoch",
    SUB: "Index",
    SUP: "hoch",
    SUPERSCRIPT: "hoch",
    SUBSCRIPT: "Index",
    BASELINE: "Grundlinie",
    BASE: "Grund",
    NESTED: "geschachtelte",
    NEST_ROOT: "geschachtelte",
    STARTROOT: "Anfang Wurzel",
    ENDROOT: "Ende Wurzel",
    ROOTINDEX: "Wurzelexponent",
    ROOT: "Wurzel",
    INDEX: "Exponent",
    UNDER: "Unter",
    UNDERSCRIPT: "Unterschrift",
    OVER: "\u00dcber",
    OVERSCRIPT: "\u00dcberschrift"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: function (a) {
      return 1 < a ? sre.Numbers.de.NUMBERS.numberToWords(a) + "fach" : "";
    },
    COMBINE_ROOT_INDEX: function (a, b) {
      return a.replace("Wurzel", b ? b + "wurzel" : "");
    },
    COMBINE_NESTED_FRACTION: function (a, b, c) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function (a, b, c) {
      a = c.match(/exponent$/) ? a + "r" : a;
      a = (b ? b + " " : "") + a;
      return c.match(/ /) ? c.replace(/ /, " " + a + " ") : a + " " + c;
    },
    FONT_REGEXP: function (a) {
      a = a
        .split(" ")
        .map(function (b) {
          return b.replace(/s$/, "(|s)");
        })
        .join(" ");
      return new RegExp("((^" + a + " )|( " + a + "$))");
    }
  },
  MS_ROOT_INDEX: { 2: "Quadrat", 3: "Kubik" },
  FONT: {
    bold: "fettes",
    "bold-fraktur": "fettes Fraktur",
    "bold-italic": "fettkursives",
    "bold-script": "fettes Schreibschrift",
    caligraphic: "kalligrafisches",
    "caligraphic-bold": "fettes kalligrafisches",
    "double-struck": ["mit Doppelstrich", germanPostfixCombiner],
    "double-struck-italic": ["kursiv mit Doppelstrich", germanPostfixCombiner],
    fraktur: "Fraktur",
    fullwidth: "vollbreites",
    italic: "kursives",
    monospace: "nichtproportionales",
    normal: "normales",
    oldstyle: "antiquiertes",
    "oldstyle-bold": "antiquiertes fettes",
    script: "Schreibschrift",
    "sans-serif": "serifenloses",
    "sans-serif-italic": "serifenloses kursives",
    "sans-serif-bold": "serifenloses fettes",
    "sans-serif-bold-italic": "serifenloses fettkursives",
    unknown: "unbekannt"
  },
  EMBELLISH: {
    super: "hoch",
    sub: "Index",
    circled: "eingekreistes",
    parenthesized: "eingeklammertes",
    period: ["Punkt", germanPostfixCombiner],
    "negative-circled": "schwarz eingekreistes",
    "double-circled": "doppelt eingekreistes",
    "circled-sans-serif": "eingekreistes serifenloses",
    "negative-circled-sans-serif": "schwarz eingekreistes serifenloses",
    comma: ["Komma", germanPostfixCombiner],
    squared: "umrahmtes",
    "negative-squared": "schwarz umrahmtes"
  },
  ROLE: {
    addition: "Addition",
    multiplication: "Multiplikation",
    subtraction: "Subtraktion",
    division: "Division",
    equality: "Gleichung",
    inequality: "Ungleichung",
    element: "Element",
    arrow: "Pfeil",
    determinant: "Determinante",
    rowvector: "Zeilenvektor",
    binomial: "Binomialkoeffizient",
    squarematrix: "quadratische Matrize",
    multiline: "mehrzeiligem Ausdruck",
    matrix: "Matrize",
    vector: "Vektor",
    cases: "Fallunterscheidung",
    table: "Tabelle",
    unknown: "unbekannt"
  },
  ENCLOSE: {
    longdiv: "langer Bruchstrich",
    actuarial: "Bilanzsumme",
    radical: "Quadratwurzel",
    box: "rechteckige Umrandung",
    roundedbox: "abgerundete rechteckige Umrandung",
    circle: "kreis\u00e4hnliche Umrandung",
    left: "senkrechte Linie links",
    right: "senkrechte Linie rechts",
    top: "waagerechte Linie oberhalb",
    bottom: "waagerechte Linie unterhalb",
    updiagonalstrike: "durchgestrichen",
    downdiagonalstrike: "durchgestrichen",
    verticalstrike: "senkrecht durchgestrichen",
    horizontalstrike: "durchgestrichen",
    madruwb: "arabisches Fakult\u00e4tssymbol",
    updiagonalarrow: "Pfeil von links unten nach rechts oben",
    phasorangle: "phasor angle",
    unknown: "langer Bruchstrich"
  },
  NAVIGATE: {
    COLLAPSIBLE: "kollabierbar",
    EXPANDABLE: "ausfaltbar",
    LEVEL: "Niveau"
  },
  REGEXP: {
    TEXT: "a-zA-Z\u00e4\u00f6\u00fc\u00c4\u00d6\u00dc\u00df",
    NUMBER: "((\\d{1,3})(?=(.| ))((.| )\\d{3})*(\\,\\d+)?)|^\\d*\\,\\d+|^\\d+",
    DECIMAL_MARK: ",",
    DIGIT_GROUP: "\\.",
    JOINER_SUBSUPER: " ",
    JOINER_FRAC: " "
  },
  SI: function (a, b) {
    return a + b.toLowerCase();
  },
  PLURAL: function (a) {
    return a;
  },
  NUMBERS: sre.Numbers.de.NUMBERS,
  ALPHABETS: {
    latinSmall: "abcdefghijklmnopqrstuvwxyz".split(""),
    latinCap: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    greekSmall:
      "nabla;alpha;beta;gamma;delta;epsilon;zeta;eta;theta;iota;kappa;lambda;my;ny;xi;omikron;pi;rho;abschlie\u00dfendes sigma;sigma;tau;ypsilon;phi;chi;psi;omega;partielle Ableitung;epsilon;theta;kappa;phi;rho;pi".split(
        ";"
      ),
    greekCap:
      "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda My Ny Xi Omikron Pi Rho Theta Sigma Tau Ypsilon Phi Chi Psi Omega".split(
        " "
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function (a) {
        return 0 === a ? "null" : sre.Numbers.de.numberToWords(a);
      },
      mathspeak: function (a) {
        return a.toString();
      },
      clearspeak: function (a) {
        return a.toString();
      }
    },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "gro\u00dfes" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "s" }
  },
  ALPHABET_COMBINER: germanPrefixCombiner
};
sre.Grammar.getInstance().setCorrection("correctOne", function (a) {
  return a.replace(/^eins$/, "ein");
});
sre.Grammar.getInstance().setCorrection("localFontNumber", function (a) {
  var b = sre.Messages.FONT[a];
  void 0 === b && (b = a || "");
  b = "string" === typeof b ? b : b[0];
  return b
    .split(" ")
    .map(function (c) {
      return c.replace(/s$/, "");
    })
    .join(" ");
});
sre.Grammar.getInstance().setCorrection("lowercase", function (a) {
  return a.toLowerCase();
});
sre.Grammar.getInstance().setCorrection("article", function (a) {
  return "dative" === sre.Grammar.getInstance().getParameter("case")
    ? { der: "dem", die: "der", das: "dem" }[a]
    : a;
});
sre.Grammar.getInstance().setCorrection("masculine", function (a) {
  return "dative" === sre.Grammar.getInstance().getParameter("case")
    ? a + "n"
    : a;
});
sre.Numbers.en = {};
sre.Numbers.en.onesNumbers_ =
  " one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
    " "
  );
sre.Numbers.en.tensNumbers_ =
  "  twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
sre.Numbers.en.largeNumbers_ =
  " thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion decillion".split(
    " "
  );
sre.Numbers.en.hundredsToWords_ = function (a) {
  a %= 1e3;
  var b = sre.Numbers.en.onesNumbers_[Math.floor(a / 100)]
    ? sre.Numbers.en.onesNumbers_[Math.floor(a / 100)] +
      sre.Numbers.en.NUMBERS.numSep +
      "hundred"
    : "";
  if ((a %= 100))
    (b += b ? sre.Numbers.en.NUMBERS.numSep : ""),
      (b +=
        sre.Numbers.en.onesNumbers_[a] ||
        sre.Numbers.en.tensNumbers_[Math.floor(a / 10)] +
          (a % 10
            ? sre.Numbers.en.NUMBERS.numSep +
              sre.Numbers.en.onesNumbers_[a % 10]
            : ""));
  return b;
};
sre.Numbers.en.numberToWords = function (a) {
  if (a >= Math.pow(10, 36)) return a.toString();
  for (var b = 0, c = ""; 0 < a; )
    a % 1e3 &&
      (c =
        sre.Numbers.en.hundredsToWords_(a % 1e3) +
        (b ? "-" + sre.Numbers.en.largeNumbers_[b] + "-" : "") +
        c),
      (a = Math.floor(a / 1e3)),
      b++;
  return c.replace(/-$/, "");
};
sre.Numbers.en.numberToOrdinal = function (a, b) {
  if (1 === a) return b ? "oneths" : "oneth";
  if (2 === a) return b ? "halves" : "half";
  a = sre.Numbers.en.wordOrdinal(a);
  return b ? a + "s" : a;
};
sre.Numbers.en.wordOrdinal = function (a) {
  a = sre.Numbers.en.numberToWords(a);
  return (a = a.match(/one$/)
    ? a.slice(0, -3) + "first"
    : a.match(/two$/)
    ? a.slice(0, -3) + "second"
    : a.match(/three$/)
    ? a.slice(0, -5) + "third"
    : a.match(/five$/)
    ? a.slice(0, -4) + "fifth"
    : a.match(/eight$/)
    ? a.slice(0, -5) + "eighth"
    : a.match(/nine$/)
    ? a.slice(0, -4) + "ninth"
    : a.match(/twelve$/)
    ? a.slice(0, -6) + "twelfth"
    : a.match(/ty$/)
    ? a.slice(0, -2) + "tieth"
    : a + "th");
};
sre.Numbers.en.simpHardworkrdinal = function (a) {
  var b = a % 100,
    c = a.toString();
  if (10 < b && 20 > b) return c + "th";
  switch (a % 10) {
    case 1:
      return c + "st";
    case 2:
      return c + "nd";
    case 3:
      return c + "rd";
    default:
      return c + "th";
  }
};
sre.Numbers.en.NUMBERS = {
  wordOrdinal: sre.Numbers.en.wordOrdinal,
  simpHardworkrdinal: sre.Numbers.en.simpHardworkrdinal,
  numberToWords: sre.Numbers.en.numberToWords,
  numberToOrdinal: sre.Numbers.en.numberToOrdinal,
  vulgarSep: " ",
  numSep: " "
};
sre.Locale.en = {
  MS: {
    START: "Start",
    FRAC_V: "Fraction",
    FRAC_B: "Frac",
    FRAC_S: "Frac",
    END: "End",
    FRAC_OVER: "Over",
    TWICE: "Twice",
    NEST_FRAC: "Nest",
    ENDFRAC: "EndFrac",
    SUPER: "Super",
    SUB: "Sub",
    SUP: "Sup",
    SUPERSCRIPT: "Superscript",
    SUBSCRIPT: "Subscript",
    BASELINE: "Baseline",
    BASE: "Base",
    NESTED: "Nested",
    NEST_ROOT: "Nest",
    STARTROOT: "StartRoot",
    ENDROOT: "EndRoot",
    ROOTINDEX: "RootIndex",
    ROOT: "Root",
    INDEX: "Index",
    UNDER: "Under",
    UNDERSCRIPT: "Underscript",
    OVER: "Over",
    OVERSCRIPT: "Overscript"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: function (a, b) {
      return a;
    },
    COMBINE_NESTED_FRACTION: function (a, b, c) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function (a, b, c) {
      return a + b + c;
    },
    FONT_REGEXP: function (a) {
      return new RegExp("^" + a.split(/ |-/).join("( |-)") + "( |-)");
    }
  },
  MS_ROOT_INDEX: {},
  FONT: {
    bold: "bold",
    "bold-fraktur": "bold fraktur",
    "bold-italic": "bold italic",
    "bold-script": "bold script",
    caligraphic: "calligraphic",
    "caligraphic-bold": "calligraphic bold",
    "double-struck": "double struck",
    "double-struck-italic": "double struck italic",
    fraktur: "fraktur",
    fullwidth: "fullwidth",
    italic: "italic",
    monospace: "monospace",
    normal: "normal",
    oldstyle: "oldstyle",
    "oldstyle-bold": "oldstyle bold",
    script: "script",
    "sans-serif": "sans serif",
    "sans-serif-italic": "sans serif italic",
    "sans-serif-bold": "sans serif bold",
    "sans-serif-bold-italic": "sans serif bold italic",
    unknown: "unknown"
  },
  EMBELLISH: {
    super: "super",
    sub: "sub",
    circled: "circled",
    parenthesized: "parenthesized",
    period: ["period", sre.Locale.postfixCombiner],
    "negative-circled": "black circled",
    "double-circled": "double circled",
    "circled-sans-serif": "circled sans serif",
    "negative-circled-sans-serif": "black circled sans serif",
    comma: ["comma", sre.Locale.postfixCombiner],
    squared: "squared",
    "negative-squared": "black squared"
  },
  ROLE: {
    addition: "addition",
    multiplication: "multiplication",
    subtraction: "subtraction",
    division: "division",
    equality: "equality",
    inequality: "inequality",
    element: "element",
    arrow: "arrow",
    determinant: "determinant",
    rowvector: "row vector",
    binomial: "binomial",
    squarematrix: "square matrix",
    multiline: "multiple lines",
    matrix: "matrix",
    vector: "vector",
    cases: "case statement",
    table: "table",
    unknown: "unknown"
  },
  ENCLOSE: {
    longdiv: "long division",
    actuarial: "actuarial symbol",
    radical: "square root",
    box: "box",
    roundedbox: "rounded box",
    circle: "circle",
    left: "left vertical-line",
    right: "right vertical-line",
    top: "overbar",
    bottom: "underbar",
    updiagonalstrike: "crossout",
    downdiagonalstrike: "crossout",
    verticalstrike: "vertical strikeout",
    horizontalstrike: "crossout",
    madruwb: "Arabic factorial symbol",
    updiagonalarrow: "diagonal arrow",
    phasorangle: "phasor angle",
    unknown: "long division"
  },
  NAVIGATE: {
    COLLAPSIBLE: "collapsible",
    EXPANDABLE: "expandable",
    LEVEL: "Level"
  },
  REGEXP: {
    TEXT: "a-zA-Z",
    NUMBER: "((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+",
    DECIMAL_MARK: "\\.",
    DIGIT_GROUP: ",",
    JOINER_SUBSUPER: " ",
    JOINER_FRAC: ""
  },
  SI: function (a, b) {
    a += b;
    return { megaohm: "megohm", kiloohm: "kilohm" }[a] || a;
  },
  PLURAL: function (a) {
    return /.*s$/.test(a) ? a : a + "s";
  },
  NUMBERS: sre.Numbers.en.NUMBERS,
  ALPHABETS: {
    latinSmall: "abcdefghijklmnopqrstuvwxyz".split(""),
    latinCap: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    greekSmall:
      "nabla;alpha;beta;gamma;delta;epsilon;zeta;eta;theta;iota;kappa;lamda;mu;nu;xi;omicron;pi;rho;final sigma;sigma;tau;upsilon;phi;chi;psi;omega;partial differential;epsilon;theta;kappa;phi;rho;pi".split(
        ";"
      ),
    greekCap:
      "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lamda Mu Nu Xi Omicron Pi Rho Theta Sigma Tau Upsilon Phi Chi Psi Omega".split(
        " "
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function (a) {
        return 0 === a ? "zero" : sre.Numbers.en.numberToWords(a);
      },
      mathspeak: function (a) {
        return a.toString();
      },
      clearspeak: function (a) {
        return a.toString();
      }
    },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "cap", mathspeak: "upper" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "" }
  },
  ALPHABET_COMBINER: sre.Locale.prefixCombiner
};
sre.Grammar.getInstance().setCorrection("noarticle", function (a) {
  return sre.Grammar.getInstance().getParameter("noArticle") ? "" : a;
});
sre.Numbers.es = {};
sre.Numbers.es.onesNumbers_ =
  " uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince diecis\u00e9is diecisiete dieciocho diecinueve veinte veintiuno veintid\u00f3s veintitr\u00e9s veinticuatro veinticinco veintis\u00e9is veintisiete veintiocho veintinueve".split(
    " "
  );
sre.Numbers.es.tensNumbers_ =
  "   treinta cuarenta cincuenta sesenta setenta ochenta noventa".split(" ");
sre.Numbers.es.hundredsNumbers_ =
  " cien doscientos trescientos cuatrocientos quinientos seiscientos setecientos ochocientos novecientos".split(
    " "
  );
sre.Numbers.es.largeNumbers_ =
  ";mil;mill\u00f3n;mil mill\u00f3nes;bill\u00f3n;mil bill\u00f3nes;trill\u00f3n;mil trill\u00f3nes;cuatrill\u00f3;mil cuatrill\u00f3es;quintill\u00f3n;mil quintill\u00f3nes;sextill\u00f3n;mil sextill\u00f3nes;septill\u00f3n;mil septill\u00f3nes;octill\u00f3n;mil octill\u00f3nes;nonill\u00f3n;mil nonill\u00f3nes;decill\u00f3n;mil decill\u00f3nes".split(
    ";"
  );
sre.Numbers.es.tensToWords_ = function (a) {
  var b = a % 100;
  if (30 > b) return sre.Numbers.es.onesNumbers_[b];
  a = sre.Numbers.es.tensNumbers_[Math.floor(b / 10)];
  b = sre.Numbers.es.onesNumbers_[b % 10];
  return a && b ? a + " y " + b : a || b;
};
sre.Numbers.es.hundredsToWords_ = function (a) {
  var b = a % 1e3;
  a = Math.floor(b / 100);
  var c = sre.Numbers.es.hundredsNumbers_[a];
  b = sre.Numbers.es.tensToWords_(b % 100);
  return 1 === a ? (b ? c + "to " + b : c) : c && b ? c + " " + b : c || b;
};
sre.Numbers.es.numberToWords = function (a) {
  if (a >= Math.pow(10, 36)) return a.toString();
  for (var b = 0, c = ""; 0 < a; ) {
    var d = a % 1e3;
    if (d) {
      var e = sre.Numbers.es.largeNumbers_[b],
        f = sre.Numbers.es.hundredsToWords_(d);
      b
        ? 1 === d
          ? ((e = e.match("/^mil( |$)/") ? e : "un " + e),
            (c = e + (c ? " " + c : "")))
          : ((e = e.replace(/\u00f3n$/, "ones")),
            (c =
              sre.Numbers.es.hundredsToWords_(d) +
              " " +
              e +
              (c ? " " + c : "")))
        : (c = f);
    }
    a = Math.floor(a / 1e3);
    b++;
  }
  return c;
};
sre.Numbers.es.onesOrdinals_ =
  "primera segunda tercera cuarta quinta sexta s\u00e9ptima octava novena d\u00e9cima und\u00e9cima duod\u00e9cima".split(
    " "
  );
sre.Numbers.es.tensOrdinals_ =
  "d\u00e9cima vig\u00e9sima trig\u00e9sima cuadrag\u00e9sima quincuag\u00e9sima sexag\u00e9sima septuag\u00e9sima octog\u00e9sima nonag\u00e9sima".split(
    " "
  );
sre.Numbers.es.hundredsOrdinals_ =
  "cent\u00e9sima ducent\u00e9sima tricent\u00e9sima cuadringent\u00e9sima quingent\u00e9sima sexcent\u00e9sima septingent\u00e9sima octingent\u00e9sima noningent\u00e9sima".split(
    " "
  );
sre.Numbers.es.numberToOrdinal = function (a, b) {
  if (1999 < a) return a.toString() + "a";
  if (12 >= a) return sre.Numbers.es.onesOrdinals_[a - 1];
  b = [];
  1e3 <= a && ((a -= 1e3), b.push("mil\u00e9sima"));
  if (!a) return b.join(" ");
  var c = Math.floor(a / 100);
  0 < c && (b.push(sre.Numbers.es.hundredsOrdinals_[c - 1]), (a %= 100));
  12 >= a
    ? b.push(sre.Numbers.es.onesOrdinals_[a - 1])
    : ((c = Math.floor(a / 10)),
      0 < c && (b.push(sre.Numbers.es.tensOrdinals_[c - 1]), (a %= 10)),
      0 < a && b.push(sre.Numbers.es.onesOrdinals_[a - 1]));
  return b.join(" ");
};
sre.Numbers.es.simpHardworkrdinal = function (a) {
  var b = sre.Grammar.getInstance().getParameter("gender");
  return a.toString() + ("female" === b ? "a" : "o");
};
sre.Numbers.es.NUMBERS = {
  simpHardworkrdinal: sre.Numbers.es.simpHardworkrdinal,
  numberToWords: sre.Numbers.es.numberToWords,
  numberToOrdinal: sre.Numbers.es.numberToOrdinal,
  vulgarSep: "-"
};
var sansserifCombiner = function (a, b, c) {
  a = "sans serif " + (c ? c + " " + a : a);
  return b ? a + " " + b : a;
};
sre.Locale.es = {
  MS: {
    START: "empezar",
    FRAC_V: "fracci\u00f3n",
    FRAC_B: "frac",
    FRAC_S: "frac",
    END: "finalizar",
    FRAC_OVER: "entre",
    TWICE: "",
    NEST_FRAC: "",
    ENDFRAC: "",
    SUPER: "super",
    SUB: "sub",
    SUP: "sup",
    SUPERSCRIPT: "super\u00edndice",
    SUBSCRIPT: "sub\u00edndice",
    BASELINE: "l\u00ednea base",
    BASE: "base",
    NESTED: "",
    NEST_ROOT: "",
    STARTROOT: "empezar ra\u00edz",
    ENDROOT: "finalizar ra\u00edz",
    ROOTINDEX: "\u00edndice de ra\u00edz",
    ROOT: "ra\u00edz",
    INDEX: "",
    UNDER: "bajo",
    UNDERSCRIPT: "bajo\u00edndice",
    OVER: "sobre",
    OVERSCRIPT: "sobre\u00edndice"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: function (a) {
      return !1;
    },
    RADICAL_NEST_DEPTH: function (a) {
      return "";
    },
    COMBINE_ROOT_INDEX: sre.Locale.combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function (a, b, c) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function (a, b, c) {
      return a + c;
    },
    FONT_REGEXP: function (a) {
      return RegExp("^" + a + " ");
    }
  },
  MS_ROOT_INDEX: {
    2: "cuadrada",
    3: "c\u00fabica",
    4: "a la cuarta",
    5: "a la quinta",
    6: "a la sexta",
    7: "a la s\u00e9ptima",
    8: "a la octava",
    9: "a la novena",
    10: "a la d\u00e9cima"
  },
  FONT: {
    bold: "negrita",
    "bold-fraktur": "negrita Fraktur",
    "bold-italic": "negrita cursiva",
    "bold-script": "negrita script",
    caligraphic: "caligr\u00e1fica",
    "caligraphic-bold": "caligr\u00e1fica negrita",
    "double-struck": "negrita de pizarra",
    "double-struck-italic": "negrita de pizarra cursiva",
    fraktur: "Fraktur",
    fullwidth: "ancho completo",
    italic: "cursiva",
    monospace: "monoespacio",
    normal: "normal",
    oldstyle: "estilo antiguo",
    "oldstyle-bold": "estilo antiguo negrita",
    script: "script",
    "sans-serif": "sans serif",
    "sans-serif-italic": "sans serif cursiva",
    "sans-serif-bold": "sans serif negrita",
    "sans-serif-bold-italic": "sans serif negrita cursiva",
    unknown: "desconocida"
  },
  ROLE: {
    addition: "adici\u00f3n",
    multiplication: "multiplicaci\u00f3n",
    subtraction: "resta",
    division: "divisi\u00f3n",
    equality: "igualdad",
    inequality: "desigualdad",
    element: "elemento",
    arrow: "flecha",
    determinant: "determinante",
    rowvector: "fila vector",
    binomial: "binomial",
    squarematrix: "matriz cuadrada",
    multiline: "l\u00edneas m\u00faltiples",
    matrix: "matriz",
    vector: "vector",
    cases: "declaraci\u00f3n de caso",
    table: "mesa",
    unknown: "desconocida"
  },
  ENCLOSE: {
    longdiv: "divisi\u00f3n larga",
    actuarial: "s\u00edmbolo actuarial",
    radical: "ra\u00edz cuadrada",
    box: "caja",
    roundedbox: "caja redondeada",
    circle: "c\u00edrculo",
    left: "barra vertical izquierda",
    right: "barra vertical derecha",
    top: "barra",
    bottom: "subbarra",
    updiagonalstrike: "tachadura",
    downdiagonalstrike: "tachadura",
    verticalstrike: "ponchado vertical",
    horizontalstrike: "cruce",
    madruwb: "s\u00edmbolo factorial \u00e1rabe",
    updiagonalarrow: "flecha diagonal",
    phasorangle: "\u00e1ngulo de fasores",
    unknown: "divisi\u00f3n larga"
  },
  EMBELLISH: {
    super: "super\u00edndice",
    sub: "sub\u00edndice",
    circled: ["en circulo", sre.Locale.postfixCombiner],
    parenthesized: ["entre par\u00e9ntesis", sre.Locale.postfixCombiner],
    period: ["punto", sre.Locale.postfixCombiner],
    "negative-circled": ["en circulo negro", sre.Locale.postfixCombiner],
    "double-circled": ["en doble circulo", sre.Locale.postfixCombiner],
    "circled-sans-serif": ["en circulo", sansserifCombiner],
    "negative-circled-sans-serif": ["en circulo negro", sansserifCombiner],
    comma: ["coma", sre.Locale.postfixCombiner],
    squared: ["en cuadrado", sre.Locale.postfixCombiner],
    "negative-squared": ["en cuadrado negro", sre.Locale.postfixCombiner]
  },
  NAVIGATE: {
    COLLAPSIBLE: "plegable",
    EXPANDABLE: "ampliable",
    LEVEL: "nivel"
  },
  REGEXP: {
    TEXT: "a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1\u00c1\u00c9\u00cd\u00d3\u00da\u00d1",
    NUMBER: "((\\d{1,3})(?=( ))(( )\\d{3})*(,\\d+)?)|^\\d*,\\d+|^\\d+",
    DECIMAL_MARK: ",",
    DIGIT_GROUP: "",
    JOINER_SUBSUPER: " ",
    JOINER_FRAC: " "
  },
  PLURAL: function (a) {
    return /.*(a|e|i|o|u)$/.test(a)
      ? a + "s"
      : /.*z$/.test(a)
      ? a.slice(0, -1) + "ces"
      : /.*c$/.test(a)
      ? a.slice(0, -1) + "ques"
      : /.*g$/.test(a)
      ? a + "ues"
      : /.*\u00f3n$/.test(a)
      ? a.slice(0, -2) + "ones"
      : a + "es";
  },
  SI: function (a, b) {
    b.match(/^metro/) &&
      (a = a
        .replace(/a$/, "\u00e1")
        .replace(/o$/, "\u00f3")
        .replace(/i$/, "\u00ed"));
    return a + b;
  },
  NUMBERS: sre.Numbers.es.NUMBERS,
  ALPHABETS: {
    latinSmall: "abcdefghijklmnopqrstuvwxyz".split(""),
    latinCap: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    greekSmall:
      "nabla;alfa;beta;gamma;delta;\u00e9psilon;zeta;eta;theta;iota;kappa;lambda;mi;ni;xi;\u00f3micron;pi;rho;sigma final;sigma;tau;\u00edpsilon;phi;ji;psi;omega;diferencial parcial;\u00e9psilon;theta;kappa;phi;rho;pi".split(
        ";"
      ),
    greekCap:
      "Alfa Beta Gamma Delta \u00c9psilon Zeta Eta Theta Iota Kappa Lambda Mi Ni Xi \u00d3micron Pi Rho Theta Sigma Tau \u00cdpsilon Phi Ji Psi Omega".split(
        " "
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function (a) {
        return 0 === a ? "cero" : sre.Numbers.es.numberToWords(a);
      },
      mathspeak: function (a) {
        return a.toString();
      },
      clearspeak: function (a) {
        return a.toString();
      }
    },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "may\u00fascula" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "" }
  },
  ALPHABET_COMBINER: sre.Locale.prefixCombiner,
  UNIT_TIMES: "por"
};
sre.Numbers.fr = {};
sre.Numbers.fr.SUB_ISO = "fr";
sre.Numbers.fr.onesNumbers_ =
  " un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf".split(
    " "
  );
sre.Numbers.fr.tensNumbers_ = {
  fr: "  vingt trente quarante cinquante soixante soixante-dix quatre-vingts quatre-vingt-dix".split(
    " "
  ),
  be: "  vingt trente quarante cinquante soixante septante quatre-vingts nonante".split(
    " "
  ),
  sw: "  vingt trente quarante cinquante soixante septante huitante nonante".split(
    " "
  )
};
sre.Numbers.fr.largeNumbers_ =
  ";mille;millions;milliards;billions;mille billions;trillions;mille trillions;quadrillions;mille quadrillions;quintillions;mille quintillions".split(
    ";"
  );
sre.Numbers.fr.hundredsToWords_ = function (a) {
  var b = a % 1e3;
  a = sre.Numbers.fr.onesNumbers_[Math.floor(b / 100)]
    ? sre.Numbers.fr.onesNumbers_[Math.floor(b / 100)] + "-cent"
    : "";
  if ((b %= 100)) {
    a += a ? "-" : "";
    var c = sre.Numbers.fr.onesNumbers_[b];
    if (c) a += c;
    else {
      var d =
        sre.Numbers.fr.tensNumbers_[sre.Numbers.fr.SUB_ISO][Math.floor(b / 10)];
      d.match(/\-dix$/)
        ? ((c = sre.Numbers.fr.onesNumbers_[(b % 10) + 10]),
          (a += d.replace(/\-dix$/, "") + "-" + c))
        : (a += d + (b % 10 ? "-" + sre.Numbers.fr.onesNumbers_[b % 10] : ""));
    }
  }
  return (b = a.match(/s\-\w+$/))
    ? a.replace(/s\-\w+$/, b[0].slice(1))
    : a.replace(/\-un$/, "-et-un");
};
sre.Numbers.fr.numberToWords = function (a) {
  if (a >= Math.pow(10, 36)) return a.toString();
  for (var b = 0, c = ""; 0 < a; ) {
    var d = a % 1e3;
    if (d) {
      var e = sre.Numbers.fr.largeNumbers_[b],
        f = sre.Numbers.fr.hundredsToWords_(d);
      e && e.match(/^mille /)
        ? ((d = e.replace(/^mille /, "")),
          (c = c.match(RegExp(d))
            ? f + (b ? "-mille-" : "") + c
            : c.match(RegExp(d.replace(/s$/, "")))
            ? f + (b ? "-mille-" : "") + c.replace(d.replace(/s$/, ""), d)
            : f + (b ? "-" + e + "-" : "") + c))
        : ((e = 1 === d && e ? e.replace(/s$/, "") : e),
          (c = f + (b ? "-" + e + "-" : "") + c));
    }
    a = Math.floor(a / 1e3);
    b++;
  }
  return c.replace(/-$/, "");
};
sre.Numbers.fr.SMALL_ORDINAL = {
  1: "uni\u00e8me",
  2: "demi",
  3: "tiers",
  4: "quart"
};
sre.Numbers.fr.numberToOrdinal = function (a, b) {
  var c = sre.Numbers.fr.SMALL_ORDINAL[a] || sre.Numbers.fr.wordOrdinal(a);
  return 3 === a ? c : b ? c + "s" : c;
};
sre.Numbers.fr.wordOrdinal = function (a) {
  if (1 === a) return "premi\u00e8re";
  a = sre.Numbers.fr.numberToWords(a);
  a.match(/^neuf$/)
    ? (a = a.slice(0, -1) + "v")
    : a.match(/cinq$/)
    ? (a += "u")
    : a.match(/trois$/) ||
      (!a.match(/e$/) && !a.match(/s$/)) ||
      (a = a.slice(0, -1));
  return a + "i\u00e8me";
};
sre.Numbers.fr.simpHardworkrdinal = function (a) {
  var b = sre.Grammar.getInstance().getParameter("gender");
  return 1 === a
    ? a.toString() + ("male" === b ? "er" : "re")
    : a.toString() + "e";
};
sre.Numbers.fr.NUMBERS = {
  wordOrdinal: sre.Numbers.fr.wordOrdinal,
  simpHardworkrdinal: sre.Numbers.fr.simpHardworkrdinal,
  numberToWords: sre.Numbers.fr.numberToWords,
  numberToOrdinal: sre.Numbers.fr.numberToOrdinal,
  vulgarSep: "-"
};
sre.Locale.fr = {
  MS: {
    START: "d\u00e9but",
    FRAC_V: "fraction",
    FRAC_B: "frac",
    FRAC_S: "frac",
    END: "fin",
    FRAC_OVER: "sur",
    ONCE: "1",
    TWICE: "2",
    NEST_FRAC: "imbriqu\u00e9e",
    ENDFRAC: "fin frac",
    SUPER: "sup",
    SUB: "sub",
    SUP: "sup",
    SUPERSCRIPT: "exposant",
    SUBSCRIPT: "indice",
    BASELINE: "position de base",
    BASE: "position de base",
    NESTED: "imbriqu\u00e9e",
    NEST_ROOT: "imbriqu\u00e9e",
    STARTROOT: "d\u00e9but racine",
    ENDROOT: "fin racine",
    ROOTINDEX: "indice du radical",
    ROOT: "racine",
    INDEX: "indice",
    UNDER: "sous",
    UNDERSCRIPT: "souscript",
    OVER: "sus",
    OVERSCRIPT: "suscript"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: function (a) {
      return !1;
    },
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: sre.Locale.combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function (a, b, c) {
      return c.replace(/ $/g, "") + b + a;
    },
    COMBINE_NESTED_RADICAL: function (a, b, c) {
      return c + " " + a;
    },
    FONT_REGEXP: function (a) {
      return RegExp(" (en |)" + a + "$");
    }
  },
  MS_ROOT_INDEX: { 2: "carr\u00e9e", 3: "cubique" },
  FONT: {
    bold: "en gras",
    "bold-fraktur": "en gothique gras",
    "bold-italic": "en italique gras",
    "bold-script": "de ronde en gras",
    caligraphic: "en calligraphique",
    "caligraphic-bold": "en calligraphique gras",
    "double-struck": "ajour\u00e9",
    "double-struck-italic": "ajour\u00e9 en italique",
    fraktur: "en gothique",
    fullwidth: "en pleine largeur",
    italic: "en italique",
    monospace: "en chasse fixe",
    normal: "en normal",
    oldstyle: "en ancien",
    "oldstyle-bold": "en ancien gras",
    script: "de ronde",
    "sans-serif": "sans empattement",
    "sans-serif-italic": "en italique sans empattement",
    "sans-serif-bold": "en gras sans empattement",
    "sans-serif-bold-italic": "en italique gras sans empattement",
    unknown: "inconnu"
  },
  EMBELLISH: {
    super: ["exposant", sre.Locale.prefixCombiner],
    sub: ["indice", sre.Locale.prefixCombiner],
    circled: "encercl\u00e9",
    parenthesized: "entre parenth\u00e8ses",
    period: "un point",
    "negative-circled": "encercl\u00e9 noir",
    "double-circled": "encercl\u00e9 double",
    "circled-sans-serif": "sans empattement encercl\u00e9",
    "negative-circled-sans-serif": "sans empattement encercl\u00e9 noir",
    comma: "virgule",
    squared: "encadr\u00e9",
    "negative-squared": "encadr\u00e9 inverse"
  },
  ROLE: {
    addition: "addition",
    multiplication: "multiplication",
    subtraction: "soustraction",
    division: "division",
    equality: "\u00e9galit\u00e9",
    inequality: "in\u00e9galit\u00e9",
    element: "\u00e9l\u00e9ment",
    arrow: "fl\u00e8che",
    determinant: "d\u00e9terminant",
    rowvector: "vecteur-rang\u00e9e",
    binomial: "binomial",
    squarematrix: "matrice carr\u00e9e",
    "set empty": "ensemble vide",
    "set extended": "extension",
    "set singleton": "singleton",
    "set collection": "collection",
    label: "\u00e9tiquette",
    multiline: "multi-ligne",
    matrix: "matrice",
    vector: "vecteur",
    cases: "d\u00e9claration de cas",
    table: "tableau",
    unknown: "inconnu"
  },
  ENCLOSE: {
    longdiv: "longue division",
    actuarial: "notation actuarielle",
    radical: "radical",
    box: "bo\u00eete",
    roundedbox: "bo\u00eete arrondie",
    circle: "cercle",
    left: "barre verticale gauche",
    right: "barre verticale droite",
    top: "trait suscrit",
    bottom: "trait souscrit",
    updiagonalstrike: "texte biff\u00e9 diagonal montant",
    downdiagonalstrike: "texte biff\u00e9 diagonal descendant",
    verticalstrike: "texte biff\u00e9 vertical",
    horizontalstrike: "texte biff\u00e9 horizontal",
    madruwb: "symbole factorielle arabe",
    updiagonalarrow: "fl\u00e8che diagonale montante",
    phasorangle: "angle de phase",
    unknown: "division longue"
  },
  NAVIGATE: {
    COLLAPSIBLE: "compressible",
    EXPANDABLE: "d\u00e9compressible",
    LEVEL: "niveau"
  },
  REGEXP: {
    TEXT: "a-zA-Z\u00e0\u00e2\u00e6\u00e7\u00e9\u00e8\u00ea\u00eb\u00ee\u00ef\u00f4\u0153\u00f9\u00fb\u00fc\u00ff\u00c0\u00c2\u00c6\u00c7\u00c9\u00c8\u00ca\u00cb\u00ce\u00cf\u00d4\u0152\u00d9\u00db\u00dc\u0178",
    NUMBER: "((\\d{1,3})(?=( ))(( )\\d{3})*(,\\d+)?)|^\\d*,\\d+|^\\d+",
    DECIMAL_MARK: ",",
    DIGIT_GROUP: "",
    JOINER_SUBSUPER: "-",
    JOINER_FRAC: " "
  },
  SI: function (a, b) {
    return a + b;
  },
  PLURAL: function (a) {
    return /.*s$/.test(a) ? a : a + "s";
  },
  NUMBERS: sre.Numbers.fr.NUMBERS,
  ALPHABETS: {
    latinSmall: "abcdefghijklmnopqrstuvwxyz".split(""),
    latinCap: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    greekSmall:
      "nabla;alpha;b\u00eata;gamma;delta;epsilon;z\u00eata;\u00eata;th\u00eata;iota;kappa;lambda;m\u00fb;n\u00fb;xi;omicron;pi;rh\u00f4;sigma final;sigma;tau;upsilon;phi;chi;psi;om\u00e9ga;d\u00e9riv\u00e9e partielle;epsilon;th\u00eata;kappa;phi;rh\u00f4;pi".split(
        ";"
      ),
    greekCap:
      "Alpha B\u00eata Gamma Delta Epsilon Z\u00eata \u00cata Th\u00eata Iota Kappa Lambda M\u00fb N\u00fb Xi Omicron Pi Rh\u00f4 Th\u00eata Sigma Tau Upsilon Phi Chi Psi Om\u00e9ga".split(
        " "
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function (a) {
        return 0 === a ? "zero" : sre.Numbers.fr.numberToWords(a);
      },
      mathspeak: function (a) {
        return a.toString();
      },
      clearspeak: function (a) {
        return a.toString();
      }
    },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "majuscule" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "" }
  },
  ALPHABET_COMBINER: function (a, b, c) {
    a = c ? a + " " + c : a;
    return b ? a + " " + b : a;
  }
};
sre.Numbers.hi = {};
sre.Numbers.hi.onesNumbers_ =
  " \u090f\u0915 \u0926\u094b \u0924\u0940\u0928 \u091a\u093e\u0930 \u092a\u093e\u0901\u091a \u091b\u0903 \u0938\u093e\u0924 \u0906\u0920 \u0928\u094c \u0926\u0938 \u0917\u094d\u092f\u093e\u0930\u0939 \u092c\u093e\u0930\u0939 \u0924\u0947\u0930\u0939 \u091a\u094c\u0926\u0939 \u092a\u0902\u0926\u094d\u0930\u0939 \u0938\u094b\u0932\u0939 \u0938\u0924\u094d\u0930\u0939 \u0905\u0920\u093e\u0930\u0939 \u0909\u0928\u094d\u0928\u0940\u0938 \u092c\u0940\u0938 \u0907\u0915\u094d\u0915\u0940\u0938 \u092c\u093e\u0908\u0938 \u0924\u0947\u0907\u0938 \u091a\u094c\u092c\u0940\u0938 \u092a\u091a\u094d\u091a\u0940\u0938 \u091b\u092c\u094d\u092c\u0940\u0938 \u0938\u0924\u093e\u0907\u0938 \u0905\u091f\u094d\u0920\u093e\u0907\u0938 \u0909\u0928\u0924\u0940\u0938 \u0924\u0940\u0938 \u0907\u0915\u0924\u0940\u0938 \u092c\u0924\u0940\u0938 \u0924\u0948\u0902\u0924\u0940\u0938 \u091a\u094c\u0902\u0924\u0940\u0938 \u092a\u0948\u0902\u0924\u0940\u0938 \u091b\u0924\u0940\u0938 \u0938\u0948\u0902\u0924\u0940\u0938 \u0905\u0921\u093c\u0924\u0940\u0938 \u0909\u0928\u0924\u093e\u0932\u0940\u0938 \u091a\u093e\u0932\u0940\u0938 \u0907\u0915\u0924\u093e\u0932\u0940\u0938 \u092c\u092f\u093e\u0932\u0940\u0938 \u0924\u0948\u0924\u093e\u0932\u0940\u0938 \u091a\u0935\u093e\u0932\u0940\u0938 \u092a\u0948\u0902\u0924\u093e\u0932\u0940\u0938 \u091b\u092f\u093e\u0932\u093f\u0938 \u0938\u0948\u0902\u0924\u093e\u0932\u0940\u0938 \u0905\u0921\u093c\u0924\u093e\u0932\u0940\u0938 \u0909\u0928\u091a\u093e\u0938 \u092a\u091a\u093e\u0938 \u0907\u0915\u094d\u092f\u093e\u0935\u0928 \u092c\u093e\u0935\u0928 \u0924\u093f\u0930\u092a\u0928 \u091a\u094c\u0935\u0928 \u092a\u091a\u092a\u0928 \u091b\u092a\u094d\u092a\u0928 \u0938\u0924\u093e\u0935\u0928 \u0905\u0920\u093e\u0935\u0928 \u0909\u0928\u0938\u0920 \u0938\u093e\u0920 \u0907\u0915\u0938\u0920 \u092c\u093e\u0938\u0920 \u0924\u093f\u0930\u0938\u0920 \u091a\u094c\u0902\u0938\u0920 \u092a\u0948\u0902\u0938\u0920 \u091b\u093f\u092f\u093e\u0938\u0920 \u0938\u0921\u093c\u0938\u0920 \u0905\u0921\u093c\u0938\u0920 \u0909\u0928\u0939\u0924\u0930 \u0938\u0924\u094d\u0924\u0930 \u0907\u0915\u0939\u0924\u0930 \u092c\u0939\u0924\u0930 \u0924\u093f\u0939\u0924\u0930 \u091a\u094c\u0939\u0924\u0930 \u092a\u091a\u0939\u0924\u0930 \u091b\u093f\u0939\u0924\u0930 \u0938\u0924\u0939\u0924\u0930 \u0905\u0920\u0939\u0924\u0930 \u0909\u0928\u094d\u0928\u093e\u0938\u0940 \u0905\u0938\u094d\u0938\u0940 \u0907\u0915\u094d\u092f\u093e\u0938\u0940 \u092c\u092f\u093e\u0938\u0940 \u0924\u093f\u0930\u093e\u0938\u0940 \u091a\u094c\u0930\u093e\u0938\u0940 \u092a\u091a\u093e\u0938\u0940 \u091b\u093f\u092f\u093e\u0938\u0940 \u0938\u0924\u093e\u0938\u0940 \u0905\u091f\u094d\u0920\u093e\u0938\u0940 \u0928\u0935\u093e\u0938\u0940 \u0928\u092c\u094d\u092c\u0947 \u0907\u0915\u094d\u092f\u093e\u0928\u0935\u0947 \u092c\u094d\u092f\u093e\u0928\u0935\u0947 \u0924\u093f\u0930\u093e\u0928\u0935\u0947 \u091a\u094c\u0930\u093e\u0928\u0935\u0947 \u092a\u091a\u093e\u0928\u0935\u0947 \u091b\u093f\u092f\u093e\u0928\u0935\u0947 \u0938\u0924\u093e\u0928\u0935\u0947 \u0905\u091f\u094d\u0920\u093e\u0928\u0935\u0947 \u0928\u093f\u0928\u094d\u092f\u093e\u0928\u0935\u0947".split(
    " "
  );
sre.Numbers.hi.hundred_ = "\u0938\u094c";
sre.Numbers.hi.largeNumbers_ =
  "\u0939\u091c\u093e\u0930 \u0932\u093e\u0916 \u0915\u0930\u094b\u0921\u093c \u0905\u0930\u092c \u0916\u0930\u092c \u0928\u0940\u0932 \u092a\u0926\u094d\u092e\u093e \u0936\u0902\u0916 \u092e\u0939\u093e\u0936\u0902\u0916 \u092e\u0939\u093e\u0909\u092a\u093e\u0927 \u091c\u0932\u094d\u0926 \u092a\u0930\u093e\u0930\u094d\u0927 \u0905\u0902\u0924 \u0936\u093f\u0937\u094d\u091f".split(
    " "
  );
sre.Numbers.hi.hundredsToWords_ = function (a) {
  a %= 1e3;
  var b =
    "" +
    (sre.Numbers.hi.onesNumbers_[Math.floor(a / 100)]
      ? sre.Numbers.hi.onesNumbers_[Math.floor(a / 100)] +
        sre.Numbers.hi.NUMBERS.numSep +
        sre.Numbers.hi.hundred_
      : "");
  if ((a %= 100))
    (b += b ? sre.Numbers.hi.NUMBERS.numSep : ""),
      (b += sre.Numbers.hi.onesNumbers_[a]);
  return b;
};
sre.Numbers.hi.numberToWords = function (a) {
  if (a >= Math.pow(10, 32)) return a.toString();
  var b = 0,
    c = "",
    d = sre.Numbers.hi.hundredsToWords_(a % 1e3);
  a = Math.floor(a / 1e3);
  if (!a) return d;
  for (; 0 < a; ) {
    var e = a % 100;
    e &&
      (c =
        sre.Numbers.hi.onesNumbers_[e] +
        sre.Numbers.hi.NUMBERS.numSep +
        sre.Numbers.hi.largeNumbers_[b] +
        (c ? sre.Numbers.hi.NUMBERS.numSep + c : ""));
    a = Math.floor(a / 100);
    b++;
  }
  return d ? c + sre.Numbers.hi.NUMBERS.numSep + d : c;
};
sre.Numbers.hi.smallDenominators_ =
  " \u090f\u0915\u093e\u0902\u0936 \u0926\u094d\u0935\u093f\u0924\u0940\u092f\u093e\u0902\u0936 \u0924\u0943\u0924\u0940\u092f\u093e\u0902\u0936 \u091a\u0924\u0941\u0930\u094d\u0925\u093e\u0902\u0936 \u092a\u0902\u091a\u092e\u093e\u0902\u0936 \u0937\u0937\u094d\u091f\u093e\u0902\u0936 \u0938\u092a\u094d\u0924\u092e\u093e\u0902\u0936 \u0905\u0937\u094d\u091f\u093e\u0902\u0936 \u0928\u0935\u092e\u093e\u0902\u0936 \u0926\u0936\u093e\u0902\u0936".split(
    " "
  );
sre.Numbers.hi.numberToOrdinal = function (a, b) {
  return 10 >= a
    ? sre.Numbers.hi.smallDenominators_[a]
    : sre.Numbers.hi.wordOrdinal(a) + " \u0905\u0902\u0936";
};
sre.Numbers.hi.ordinalsMasculine_ =
  " \u092a\u0939\u0932\u093e \u0926\u0942\u0938\u0930\u093e \u0924\u0940\u0938\u0930\u093e \u091a\u094c\u0925\u093e \u092a\u093e\u0902\u091a\u0935\u093e\u0901 \u091b\u0920\u093e \u0938\u093e\u0924\u0935\u093e\u0901 \u0906\u0920\u0935\u093e\u0901 \u0928\u094c\u0935\u093e\u0901".split(
    " "
  );
sre.Numbers.hi.ordinalsFeminine_ =
  " \u092a\u0939\u0932\u0940 \u0926\u0942\u0938\u0930\u0940 \u0924\u0940\u0938\u0930\u0940 \u091a\u094c\u0925\u0940 \u092a\u093e\u0901\u091a\u0935\u0940\u0902 \u091b\u0920\u0940 \u0938\u093e\u0924\u0935\u0940\u0902 \u0906\u0920\u0935\u0940\u0902 \u0928\u094c\u0935\u0940\u0902".split(
    " "
  );
sre.Numbers.hi.wordOrdinal = function (a) {
  var b = sre.Grammar.getInstance().getParameter("gender");
  return 0 >= a
    ? a.toString()
    : 10 > a
    ? "female" === b
      ? sre.Numbers.hi.ordinalsFeminine_[a]
      : sre.Numbers.hi.ordinalsMasculine_[a]
    : sre.Numbers.hi.numberToWords(a) +
      ("female" === b ? "\u0935\u0940\u0902" : "\u0935\u093e\u0901");
};
sre.Numbers.hi.simpleNumbers_ =
  "\u0966\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f".split("");
sre.Numbers.hi.simpleSmallOrdinalsMasculine_ =
  " \u0967\u0932\u093e \u0968\u0930\u093e \u0969\u0930\u093e \u096a\u0925\u093e \u096b\u0935\u093e\u0901 \u096c\u0920\u093e \u096d\u0935\u093e\u0901 \u096e\u0935\u093e\u0901 \u096f\u0935\u093e\u0901".split(
    " "
  );
sre.Numbers.hi.simpleSmallOrdinalsFeminine_ =
  " \u0967\u0932\u0940 \u0968\u0930\u0940 \u0969\u0930\u0940 \u096a\u0925\u0940 \u096b\u0935\u0940\u0902 \u096c\u0920\u0940 \u096d\u0935\u0940\u0902 \u096e\u0935\u0940\u0902 \u096f\u0935\u0940\u0902".split(
    " "
  );
sre.Numbers.hi.simpHardworkrdinal = function (a) {
  var b = sre.Grammar.getInstance().getParameter("gender");
  return 0 < a && 10 > a
    ? "female" === b
      ? sre.Numbers.hi.simpleSmallOrdinalsFeminine_[a]
      : sre.Numbers.hi.simpleSmallOrdinalsMasculine_[a]
    : a
        .toString()
        .split("")
        .map(function (c) {
          c = parseInt(c, 10);
          return isNaN(c) ? "" : sre.Numbers.hi.simpleNumbers_[c];
        })
        .join("") +
        ("female" === b ? "\u0935\u0940\u0902" : "\u0935\u093e\u0901");
};
sre.Numbers.hi.NUMBERS = {
  wordOrdinal: sre.Numbers.hi.wordOrdinal,
  simpHardworkrdinal: sre.Numbers.hi.simpHardworkrdinal,
  numberToWords: sre.Numbers.hi.numberToWords,
  numberToOrdinal: sre.Numbers.hi.numberToOrdinal,
  vulgarSep: " ",
  numSep: " "
};
sre.Locale.hi = {
  MS: {
    START: "\u0906\u0930\u0902\u092d",
    FRAC_V: "\u092d\u093f\u0928\u094d\u0928",
    FRAC_B: "\u092d\u093f\u0928\u094d\u0928",
    FRAC_S: "\u092d\u093f\u0928\u094d\u0928",
    END: "\u0905\u0902\u0924",
    FRAC_OVER: "\u0915\u0947 \u0939\u0930 \u092e\u0947\u0902",
    TWICE: "\u0926\u0941\u092c\u093e\u0930\u093e",
    NEST_FRAC: "\u0928\u0940\u095c\u093f\u0924 \u092d\u093f\u0928\u094d\u0928",
    ENDFRAC:
      "\u092d\u093f\u0928\u094d\u0928 \u0938\u092e\u093e\u092a\u094d\u0924",
    SUPER: "\u0909\u0930\u094d\u0927\u094d\u0935",
    SUB: "\u0905\u0927\u094b",
    SUP: "\u0909\u0930\u094d\u0927\u094d\u0935",
    SUPERSCRIPT: "\u0909\u0930\u094d\u0927\u094d\u0935\u093e\u0928\u094d\u0915",
    SUBSCRIPT: "\u092a\u093e\u0926\u093e\u0902\u0915",
    BASELINE: "\u0906\u0927\u093e\u0930 \u0930\u0947\u0916\u093e",
    BASE: "\u0906\u0927\u093e\u0930",
    NESTED: "\u0928\u0940\u095c\u093f\u0924",
    NEST_ROOT: "\u0928\u0940\u095c\u093f\u0924 \u092e\u0942\u0932",
    STARTROOT: "\u092e\u0942\u0932 \u0906\u0930\u0902\u092d",
    ENDROOT: "\u092e\u0942\u0932 \u0938\u092e\u093e\u092a\u094d\u0924",
    ROOTINDEX: "\u092e\u0942\u0932\u093e\u0902\u0915",
    ROOT: "\u092e\u0942\u0932",
    INDEX: "\u092e\u0942\u0932\u093e\u0902\u0915",
    UNDER: "\u0928\u093f\u091a\u0947",
    UNDERSCRIPT: "\u0928\u093f\u092e\u094d\u0928\u093e\u0902\u0915",
    OVER: "\u090a\u092a\u0930",
    OVERSCRIPT: "\u0909\u0930\u094d\u0927\u094d\u0935 \u0932\u093f\u092a\u093f"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: function (a, b) {
      return a;
    },
    COMBINE_NESTED_FRACTION: function (a, b, c) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function (a, b, c) {
      return a + b + c;
    },
    FONT_REGEXP: function (a) {
      return new RegExp("^" + a.split(/ |-/).join("( |-)") + "( |-)");
    }
  },
  MS_ROOT_INDEX: {},
  FONT: {
    bold: "\u092c\u094b\u0932\u094d\u0921",
    "bold-fraktur":
      "\u092c\u094b\u0932\u094d\u0921 \u092b\u093c\u094d\u0930\u0947\u0915\u094d\u091f\u0941\u0930",
    "bold-italic":
      "\u092c\u094b\u0932\u094d\u0921 \u0907\u091f\u0948\u0932\u093f\u0915",
    "bold-script":
      "\u092c\u094b\u0932\u094d\u0921 \u0938\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u091f",
    caligraphic: "caligraphic",
    "caligraphic-bold": "caligraphic-bold",
    "double-struck": "\u0921\u092c\u0932-\u0938\u094d\u091f\u094d\u0930\u0915",
    "double-struck-italic":
      "\u0921\u092c\u0932-\u0938\u094d\u091f\u094d\u0930\u0915 \u0907\u091f\u0948\u0932\u093f\u0915",
    fraktur: "\u092b\u093c\u094d\u0930\u093e\u0915\u094d\u091f\u0941\u0930",
    fullwidth: "\u092a\u0942\u0930\u094d\u0923\u0924\u093e",
    italic: "\u0907\u091f\u0948\u0932\u093f\u0915",
    monospace: "\u092e\u094b\u0928\u094b\u092a\u0947\u0938",
    normal: "\u0938\u093e\u092e\u093e\u0928\u094d\u092f",
    oldstyle: "oldstyle",
    "oldstyle-bold": "oldstyle-bold",
    script: "\u0932\u093f\u092a\u093f",
    "sans-serif": "\u0938\u0902\u0938-\u0938\u0947\u0930\u093f\u092b\u093c",
    "sans-serif-bold":
      "\u0938\u0902\u0938-\u0938\u0947\u0930\u093f\u092b\u093c \u092c\u094b\u0932\u094d\u0921",
    "sans-serif-italic":
      "\u0938\u0948\u0902\u0938-\u0938\u0947\u0930\u093f\u092b\u093c \u0907\u091f\u0948\u0932\u093f\u0915",
    "sans-serif-bold-italic":
      "\u0938\u0902\u0938-\u0938\u0947\u0930\u093f\u092b\u093c \u092c\u094b\u0932\u094d\u0921 \u0907\u091f\u0948\u0932\u093f\u0915",
    unknown: "unknown"
  },
  EMBELLISH: {
    super:
      "\u0938\u0941\u092a\u0930\u0938\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u091f",
    sub: "\u0938\u092c\u0938\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u091f",
    circled: "\u0938\u0930\u094d\u0915\u093f\u0932",
    parenthesized: "\u0915\u094b\u0937\u094d\u0920\u0915",
    period: [
      "\u092a\u0942\u0930\u094d\u0923 \u0935\u093f\u0930\u093e\u092e",
      sre.Locale.postfixCombiner
    ],
    "negative-circled":
      "\u0928\u0947\u0917\u0947\u091f\u093f\u0935 \u0938\u0930\u094d\u0915\u093f\u0932",
    "double-circled": "\u0921\u092c\u0932 \u0938\u0930\u094d\u0915\u093f\u0932",
    "circled-sans-serif":
      "\u0938\u0930\u094d\u0915\u093f\u0932 \u0938\u0948\u0902\u0938-\u0938\u0947\u0930\u093f\u092b\u093c",
    "negative-circled-sans-serif":
      "\u0928\u0947\u0917\u0947\u091f\u093f\u0935 \u0938\u0930\u094d\u0915\u093f\u0932 \u0938\u0948\u0902\u0938-\u0938\u0947\u0930\u093f\u092b\u093c",
    comma: [
      "\u0905\u0932\u094d\u092a \u0935\u093f\u0930\u093e\u092e",
      sre.Locale.postfixCombiner
    ],
    squared: "\u091a\u0941\u0915\u0924\u093e",
    "negative-squared":
      "\u0928\u0915\u093e\u0930\u093e\u0924\u094d\u092e\u0915 \u0935\u0930\u094d\u0917"
  },
  ROLE: {
    addition: "\u092f\u094b\u0917",
    multiplication: "\u0917\u0941\u0923\u0928",
    subtraction: "\u0935\u094d\u092f\u0935\u0915\u0932\u0928",
    division: "\u0935\u093f\u092d\u093e\u091c\u0928",
    equality: "\u0938\u092e\u0924\u093e",
    inequality: "\u0905\u0938\u092e\u0924\u093e",
    element: "\u0905\u0935\u092f\u0935",
    arrow: "\u0924\u0940\u0930",
    determinant: "\u0938\u093e\u0930\u0923\u093f\u0915",
    rowvector: "\u092a\u0902\u0915\u094d\u0924\u093f \u0938\u0926\u093f\u0936",
    binomial: "\u0926\u094d\u0935\u093f\u092a\u0926",
    squarematrix:
      "\u0935\u0930\u094d\u0917 \u0906\u0935\u094d\u092f\u0942\u0939",
    "set empty":
      "\u0930\u093f\u0915\u094d\u0924 \u0938\u092e\u0941\u091a\u094d\u091a\u092f",
    "set extended":
      "\u0938\u092e\u0941\u091a\u094d\u091a\u092f \u0935\u093f\u0938\u094d\u0924\u093e\u0930",
    "set singleton":
      "\u0935\u0930\u094d\u0917 \u0906\u0935\u094d\u092f\u0942\u0939",
    "set collection": "\u0938\u0902\u0917\u094d\u0930\u0939",
    label: "\u0938\u0942\u091a\u0915 \u092a\u0930\u094d\u091a\u093e",
    multiline: "\u092c\u0939\u0941 \u0930\u0947\u0916\u093e\u090f\u0902",
    matrix: "\u0906\u0935\u094d\u092f\u0942\u0939",
    vector: "\u0938\u0926\u093f\u0936",
    cases: "\u092b\u0932\u0928 \u0909\u092a\u0936\u0930\u094d\u0924",
    table: "\u0938\u093e\u0930\u0923\u0940",
    unknown: "\u0905\u091c\u094d\u091e\u093e\u0924"
  },
  ENCLOSE: {
    longdiv:
      "\u0935\u093f\u0938\u094d\u0924\u0943\u0924 \u0935\u093f\u092d\u093e\u091c\u0928",
    actuarial:
      "\u092c\u0940\u092e\u093e\u0902\u0915\u093f\u0915 \u092a\u094d\u0930\u0924\u093f\u0915",
    radical: "\u0935\u0930\u094d\u0917 \u092e\u0942\u0932",
    box: "\u0915\u094b\u0937\u094d\u0920",
    roundedbox: "\u092d\u094b\u0925\u0930\u093e \u0915\u094b\u0937\u094d\u0920",
    circle: "\u0935\u0930\u094d\u0924\u0941\u0932",
    left: "\u0935\u093e\u092e \u090a\u0930\u094d\u0927\u094d\u0935\u093e\u0927\u0930 \u0930\u0947\u0916\u093e",
    right:
      "\u0926\u0915\u094d\u0937\u093f\u0923 \u090a\u0930\u094d\u0927\u094d\u0935\u093e\u0927\u0930 \u0930\u0947\u0916\u093e",
    top: "\u0915\u094d\u0937\u0948\u0924\u093f\u091c \u090a\u0930\u094d\u0927\u094d\u0935\u0930\u0947\u0916\u093e",
    bottom:
      "\u0915\u094d\u0937\u0948\u0924\u093f\u091c \u092a\u093e\u0926\u0930\u0947\u0916\u093e",
    updiagonalstrike:
      "\u0909\u0930\u094d\u0927\u094d\u0935\u0917\u093e\u092e\u0940 \u0935\u093f\u0915\u0930\u094d\u0923 \u091b\u0947\u0926\u093f\u0915\u093e",
    downdiagonalstrike:
      "\u0905\u0927\u094b\u0917\u093e\u092e\u0940 \u0935\u093f\u0915\u0930\u094d\u0923 \u091b\u0947\u0926\u093f\u0915\u093e",
    verticalstrike:
      "\u090a\u0930\u094d\u0927\u094d\u0935\u093e\u0927\u0930 \u091b\u0947\u0926\u093f\u0915\u093e",
    horizontalstrike: "\u091b\u0947\u0926\u0928 \u0930\u0947\u0916\u093e",
    madruwb: "Arabic factorial symbol",
    updiagonalarrow:
      "\u0909\u0930\u094d\u0927\u094d\u0935\u0917\u093e\u092e\u0940 \u0935\u093f\u0915\u0930\u094d\u0923 \u0924\u0940\u0930",
    phasorangle: "\u092b\u0947\u091c\u0930 \u0915\u094b\u0923",
    unknown: "\u0932\u0902\u092c\u093e \u0935\u093f\u092d\u093e\u091c\u0928"
  },
  NAVIGATE: {
    COLLAPSIBLE: "\u0928\u093f\u092a\u093e\u0924\u0940\u092f",
    EXPANDABLE: "\u0935\u093f\u0938\u094d\u0924\u093e\u0930\u0928\u0940\u092f",
    LEVEL: "\u0938\u094d\u0924\u0930"
  },
  REGEXP: {
    TEXT: "a-zA-Z",
    NUMBER: "((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+",
    DECIMAL_MARK: "\\.",
    DIGIT_GROUP: ",",
    JOINER_SUBSUPER: " ",
    JOINER_FRAC: ""
  },
  SI: function (a, b) {
    return a + b;
  },
  PLURAL: function (a) {
    return a;
  },
  NUMBERS: sre.Numbers.hi.NUMBERS,
  ALPHABETS: {
    latinSmall:
      "\u090f \u092c\u0940 \u0938\u0940 \u0921\u0940 \u0908 \u090f\u092b \u091c\u0940 \u090f\u091a \u0906\u092f \u091c\u0947 \u0915\u0947 \u090f\u0932 \u090f\u092e \u090f\u0928 \u0913 \u092a\u0940 \u0915\u094d\u092f\u0942 \u0906\u0930 \u090f\u0938 \u091f\u0940 \u092f\u0942 \u0935\u0940 \u0921\u092c\u094d\u0932\u094d\u092f\u0942 \u090f\u0915\u094d\u0938 \u0935\u093e\u0908 \u091c\u0947\u0921".split(
        " "
      ),
    latinCap:
      "\u090f \u092c\u0940 \u0938\u0940 \u0921\u0940 \u0908 \u090f\u092b \u091c\u0940 \u090f\u091a \u0906\u092f \u091c\u0947 \u0915\u0947 \u090f\u0932 \u090f\u092e \u090f\u0928 \u0913 \u092a\u0940 \u0915\u094d\u092f\u0942 \u0906\u0930 \u090f\u0938 \u091f\u0940 \u092f\u0942 \u0935\u0940 \u0921\u092c\u094d\u0932\u094d\u092f\u0942 \u090f\u0915\u094d\u0938 \u0935\u093e\u0908 \u091c\u0947\u0921".split(
        " "
      ),
    greekSmall:
      "\u0928\u093e\u092c\u0932\u093e;\u0906\u0932\u094d\u092b\u093e;\u092c\u0940\u091f\u093e;\u0917\u093e\u092e\u093e;\u0921\u0947\u0932\u094d\u091f\u093e;\u090f\u092a\u094d\u0938\u093f\u0932\u0949\u0928;\u091c\u093c\u0947\u091f\u093e;\u090f\u091f\u093e;\u0925\u0940\u091f\u093e;\u0906\u092f\u094b\u091f\u093e;\u0915\u092a\u094d\u092a\u093e;\u0932\u0948\u092e\u094d\u092c\u094d\u0921\u093e;\u092e\u0941;\u0928\u0942;\u0917\u094d\u091c\u093e\u090f;\u0913\u092e\u093f\u0915\u094d\u0930\u0949\u0928;\u092a\u093e\u0907;\u0930\u094b;\u0905\u0902\u0924\u093f\u092e \u0938\u093f\u0917\u094d\u092e\u093e ;\u0938\u093f\u0917\u094d\u092e\u093e;\u091f\u093e\u0909;\u0905\u092a\u0938\u093f\u0932\u0902;\u092b\u093e\u0908;\u0915\u093e\u0908;\u0938\u093e\u0908;\u0913\u092e\u0947\u0917\u093e;\u0906\u0902\u0936\u093f\u0915 \u0905\u0935\u0915\u0932\u0928;\u0932\u094d\u092f\u0942\u0928\u0947\u091f \u090f\u092a\u094d\u0938\u093f\u0932\u0949\u0928 ;\u0925\u0940\u091f\u093e ;\u0915\u092a\u094d\u092a\u093e ;\u092b\u093e\u0908;\u0930\u094b ;\u092a\u094b\u092e\u0947\u0917\u093e".split(
        ";"
      ),
    greekCap:
      "\u0906\u0932\u094d\u092b\u093e \u092c\u0940\u091f\u093e \u0917\u093e\u092e\u093e \u0921\u0947\u0932\u094d\u091f\u093e \u090f\u092a\u094d\u0938\u093f\u0932\u0949\u0928 \u091c\u093c\u0947\u091f\u093e \u090f\u091f\u093e \u0925\u0940\u091f\u093e \u0906\u092f\u094b\u091f\u093e \u0915\u092a\u094d\u092a\u093e \u0932\u0948\u092e\u094d\u092c\u094d\u0921\u093e \u092e\u0941 \u0928\u0942 \u0917\u094d\u091c\u093e\u090f \u0913\u092e\u093f\u0915\u094d\u0930\u0949\u0928 \u092a\u093e\u0907 \u0930\u094b \u0925\u0940\u091f\u093e \u0938\u093f\u0917\u094d\u092e\u093e \u091f\u093e\u0909 \u0905\u092a\u0938\u093f\u0932\u0902 \u092b\u093e\u0908 \u0915\u093e\u0908 \u0938\u093e\u0908 \u0913\u092e\u0947\u0917\u093e".split(
        " "
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function (a) {
        return 0 === a
          ? "\u0936\u0942\u0928\u094d\u092f"
          : sre.Numbers.hi.numberToWords(a);
      },
      mathspeak: function (a) {
        return a.toString();
      },
      clearspeak: function (a) {
        return a.toString();
      }
    },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "\u0915\u0948\u092a\u093f\u091f\u0932" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "" }
  },
  ALPHABET_COMBINER: sre.Locale.prefixCombiner
};
sre.Numbers.it = {};
sre.Numbers.it.onesNumbers_ =
  " uno due tre quattro cinque sei sette otto nove dieci undici dodici tredici quattordici quindici sedici diciassette diciotto diciannove".split(
    " "
  );
sre.Numbers.it.tensNumbers_ =
  "  venti trenta quaranta cinquanta sessanta settanta ottanta novanta".split(
    " "
  );
sre.Numbers.it.largeNumbers_ =
  " mille milione miliardo bilione biliardo trilione triliardo quadrilione quadriliardo quntilione quintiliardo".split(
    " "
  );
sre.Numbers.it.hundredsToWords_ = function (a) {
  a %= 1e3;
  var b = sre.Numbers.it.onesNumbers_[Math.floor(a / 100)]
    ? sre.Numbers.it.onesNumbers_[Math.floor(a / 100)] +
      sre.Numbers.it.NUMBERS.numSep +
      "cento"
    : "";
  if ((a %= 100)) {
    b += b ? sre.Numbers.it.NUMBERS.numSep : "";
    var c = sre.Numbers.it.onesNumbers_[a];
    if (c) b += c;
    else {
      c = sre.Numbers.it.tensNumbers_[Math.floor(a / 10)];
      var d = a % 10;
      if (1 === d || 8 === d) c = c.slice(0, -1);
      b =
        b +
        c +
        (d
          ? sre.Numbers.it.NUMBERS.numSep + sre.Numbers.it.onesNumbers_[a % 10]
          : "");
    }
  }
  return b;
};
sre.Numbers.it.numberToWords = function (a) {
  if (a >= Math.pow(10, 36)) return a.toString();
  if (1 === a && sre.Grammar.getInstance().getParameter("fraction"))
    return "un";
  for (var b = 0, c = ""; 0 < a; )
    a % 1e3 &&
      (c =
        sre.Numbers.it.hundredsToWords_(a % 1e3) +
        (b ? "-" + sre.Numbers.it.largeNumbers_[b] + "-" : "") +
        c),
      (a = Math.floor(a / 1e3)),
      b++;
  return c.replace(/-$/, "");
};
sre.Numbers.it.numberToOrdinal = function (a, b) {
  if (2 === a) return b ? "mezzi" : "mezzo";
  a = sre.Numbers.it.wordOrdinal(a);
  if (!b) return a;
  b = a.match(/o$/) ? "i" : "e";
  return a.slice(0, -1) + b;
};
sre.Numbers.it.onesOrdinals_ =
  "zero primo secondo terzo quarto quinto sesto settimo ottavo nono decimo".split(
    " "
  );
sre.Numbers.it.wordOrdinal = function (a) {
  var b =
      "male" === sre.Grammar.getInstance().getParameter("gender") ? "o" : "a",
    c = sre.Numbers.it.onesOrdinals_[a];
  if (c) return c.slice(0, -1) + b;
  c = sre.Numbers.it.numberToWords(a);
  return c.slice(0, -1) + "esim" + b;
};
sre.Numbers.it.simpHardworkrdinal = function (a) {
  var b = sre.Grammar.getInstance().getParameter("gender");
  return a.toString() + ("male" === b ? "o" : "a");
};
sre.Numbers.it.NUMBERS = {
  wordOrdinal: sre.Numbers.it.wordOrdinal,
  simpHardworkrdinal: sre.Numbers.it.simpHardworkrdinal,
  numberToWords: sre.Numbers.it.numberToWords,
  numberToOrdinal: sre.Numbers.it.numberToOrdinal,
  vulgarSep: " ",
  numSep: ""
};
var italianPostfixCombiner = function (a, b, c) {
  a.match(/^[a-zA-Z]$/) && (b = b.replace("cerchiato", "cerchiata"));
  a = c ? a + " " + c : a;
  return b ? a + " " + b : a;
};
sre.Locale.it = {
  MS: {
    START: "inizio",
    FRAC_V: "frazione",
    FRAC_B: "frazione",
    FRAC_S: "frazione",
    END: "fine",
    FRAC_OVER: "fratto",
    ONCE: "una volta",
    TWICE: "due volte",
    NEST_FRAC: "annidamento",
    ENDFRAC: "fine frazione",
    SUPER: "super",
    SUB: "sub",
    SUP: "sup",
    SUPERSCRIPT: "apice",
    SUBSCRIPT: "pedice",
    BASELINE: "linea di base",
    BASE: "base",
    NESTED: "annidato",
    NEST_ROOT: "annidamento",
    STARTROOT: "inizio radice",
    ENDROOT: "fine radice",
    ROOTINDEX: "indice radice",
    ROOT: "radice",
    INDEX: "indice Radice",
    UNDER: "sotto",
    UNDERSCRIPT: "sottoscritto",
    OVER: "sopra",
    OVERSCRIPT: "soprascritto"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: function (a) {
      return !1;
    },
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: sre.Locale.combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function (a, b, c) {
      return c.replace(/ $/g, "") + b + a;
    },
    COMBINE_NESTED_RADICAL: function (a, b, c) {
      return c + " " + a;
    },
    FONT_REGEXP: function (a) {
      return RegExp(" (en |)" + a + "$");
    }
  },
  MS_ROOT_INDEX: { 2: "", 3: "" },
  FONT: {
    bold: "grassetto",
    "bold-fraktur": "grassetto gotico",
    "bold-italic": "grassetto italico",
    "bold-script": "grassetto script",
    caligraphic: "calligrafico",
    "caligraphic-bold": "grassetto calligrafico",
    "double-struck": "grassetto da lavagna",
    "double-struck-italic": "grassetto da lavagna italico",
    fraktur: "gotico",
    fullwidth: "fullwidth",
    italic: "italico",
    monospace: "monospazio",
    normal: "normale",
    oldstyle: "vecchio stile",
    "oldstyle-bold": "vecchio stile grassetto",
    script: "script",
    "sans-serif": "senza grazie",
    "sans-serif-italic": "senza grazie italico",
    "sans-serif-bold": "senza grazie grassetto",
    "sans-serif-bold-italic": "senza grazie grassetto italico",
    unknown: "sconosciuto"
  },
  EMBELLISH: {
    super: ["apice", sre.Locale.prefixCombiner],
    sub: ["pedice", sre.Locale.prefixCombiner],
    circled: ["cerchiato", italianPostfixCombiner],
    parenthesized: "tra parentesi",
    period: "punto",
    "negative-circled": ["cerchiato in negativo", italianPostfixCombiner],
    "double-circled": "doppio cerchiato",
    "circled-sans-serif": "cerchiato senza grazie",
    "negative-circled-sans-serif": "cerchiato in negativo senza grazie",
    comma: "virgola",
    squared: "dentro quadrato",
    "negative-squared": "dentro quadrato in negativo"
  },
  ROLE: {
    addition: "addizione",
    multiplication: "moltiplicazione",
    subtraction: "sottrazione",
    division: "divisione",
    equality: "uguaglianza",
    inequality: "disuguaglianza",
    element: "elemento",
    arrow: "freccia",
    determinant: "determinante",
    rowvector: "vettore riga",
    binomial: "binomiale",
    squarematrix: "matrice quadrata",
    "set empty": "insieme vuoto",
    "set extended": "estensione di insieme",
    "set singleton": "singoletto",
    "set collection": "collezione",
    label: "eitchetta",
    multiline: "linee multiple",
    matrix: "matrice",
    vector: "vettore",
    cases: "comando switch",
    table: "tavola",
    unknown: "sconosciuto"
  },
  ENCLOSE: {
    longdiv: "divisione lunga",
    actuarial: "simbolo attuario",
    radical: "radice quadrata",
    box: "riquadro",
    roundedbox: "riquadro arrotondato",
    circle: "cerchio",
    left: "linea verticale sinistra",
    right: "linea verticale destra",
    top: "barra sopra",
    bottom: "barra sotto",
    updiagonalstrike: "cancellatura",
    downdiagonalstrike: "cancellatura",
    verticalstrike: "cancellatura verticale",
    horizontalstrike: "cancellatura",
    madruwb: "simbolo fattoriale arabo",
    updiagonalarrow: "freccia diagonale",
    phasorangle: "angolo fasore",
    unknown: "divisione lunga"
  },
  NAVIGATE: {
    COLLAPSIBLE: "collassabile",
    EXPANDABLE: "espandibile",
    LEVEL: "livello"
  },
  REGEXP: {
    TEXT: "a-zA-Z\u00e0\u00e8\u00ec\u00f2\u00f9\u00e9\u00f3\u00c0",
    NUMBER: "((\\d{1,3})(?=(.| ))((.| )\\d{3})*(\\,\\d+)?)|^\\d*\\,\\d+|^\\d+",
    DECIMAL_MARK: ",",
    DIGIT_GROUP: "\\.",
    JOINER_SUBSUPER: " ",
    JOINER_FRAC: " "
  },
  PLURAL: function (a) {
    return a;
  },
  SI: function (a, b) {
    return a + b;
  },
  NUMBERS: sre.Numbers.it.NUMBERS,
  ALPHABETS: {
    latinSmall: "abcdefghijklmnopqrstuvwxyz".split(""),
    latinCap: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    greekSmall:
      "nabla;alfa;beta;gamma;delta;epsilon;zeta greca;eta;theta;iota;kappa greca;lambda;mu;nu;xi;omicron;pi greco;rho;sigma final;sigma;tau;upsilon;phi;chi;psi;omega;derivata parziale;epsilon;theta;kappa;phi;rho;pi".split(
        ";"
      ),
    greekCap:
      "Alfa;Beta;Gamma;Delta;Epsilon;Zeta greca;Eta;Theta;Iota;Kappa greca;Lambda;Mu;Nu;Xi;Omicron;Pi greca;Rho;Theta;Sigma;Tau;Upsilon;Phi;Chi;Psi;Omega".split(
        ";"
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function (a) {
        return 0 === a ? "zero" : sre.Numbers.it.numberToWords(a);
      },
      mathspeak: function (a) {
        return a.toString();
      },
      clearspeak: function (a) {
        return a.toString();
      }
    },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "maiuscola" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "" }
  },
  ALPHABET_COMBINER: function (a, b, c) {
    a = c ? a + " " + c : a;
    return b ? a + " " + b : a;
  }
};
sre.Numbers.nemeth = {};
sre.Numbers.nemeth.oneNumbers_ =
  "\u2834\u2802\u2806\u2812\u2832\u2822\u2816\u2836\u2826\u2814".split("");
sre.Numbers.nemeth.numberToWords = function (a) {
  return a
    .toString()
    .split("")
    .map(function (b) {
      return sre.Numbers.nemeth.oneNumbers_[parseInt(b, 10)];
    })
    .join("");
};
sre.Numbers.nemeth.NUMBERS = {
  numberToWords: sre.Numbers.nemeth.numberToWords,
  simpHardworkrdinal: sre.Numbers.nemeth.numberToWords,
  vulgarSep: ""
};
var simpleEnglish = function (a) {
    return a.match(
      RegExp("^" + sre.Locale.nemeth.ALPHABET_PREFIXES.languagePrefix.english)
    )
      ? a.slice(1)
      : a;
  },
  postfixCombiner = function (a, b, c) {
    a = simpleEnglish(a);
    return b ? a + b : a;
  },
  germanCombiner = function (a, b, c) {
    return b + simpleEnglish(a);
  },
  embellishCombiner = function (a, b, c) {
    a = simpleEnglish(a);
    return b + (c ? c : "") + a + "\u283b";
  },
  doubleEmbellishCombiner = function (a, b, c) {
    a = simpleEnglish(a);
    return b + (c ? c : "") + a + "\u283b\u283b";
  },
  parensCombiner = function (a, b, c) {
    a = simpleEnglish(a);
    return b + a + "\u283e";
  };
sre.Locale.nemeth = {
  MS: {
    FRACTION_REPEAT: "\u2820",
    FRACTION_START: "\u2839",
    FRAC_V: "\u2839",
    FRAC_B: "Frac",
    FRAC_S: "Frac",
    END: "\u2820",
    FRACTION_OVER: "\u280c",
    TWICE: "Twice",
    NEST_FRAC: "Nest",
    ENDFRAC: "\u283c",
    FRACTION_END: "\u283c",
    SUPER: "\u2818",
    SUB: "\u2830",
    SUP: "\u2818",
    SUPERSCRIPT: "\u2818",
    SUBSCRIPT: "\u2830",
    BASELINE: "\u2810",
    BASE: "\u2810",
    NESTED: "\u2828",
    NEST_ROOT: "Nest",
    STARTROOT: "\u281c",
    ENDROOT: "\u283b",
    ROOTINDEX: "\u2823",
    ROOT: "\u2828",
    INDEX: "\u2823",
    UNDER: "\u2829",
    UNDERSCRIPT: "\u2829",
    OVER: "\u2823",
    OVERSCRIPT: "\u2823"
  },
  MS_FUNC: {
    FRAC_NEST_DEPTH: function (a) {
      return !1;
    },
    RADICAL_NEST_DEPTH: function (a) {
      return "";
    },
    COMBINE_ROOT_INDEX: function (a, b) {
      return a;
    },
    FONT_REGEXP: function (a) {
      return RegExp("^" + a);
    }
  },
  MS_ROOT_INDEX: {},
  FONT: {
    bold: "\u2838",
    "bold-fraktur": ["\u2838\u2800\u2838", germanCombiner],
    "bold-italic": "\u2838\u2828",
    "bold-script": "\u2838\u2808",
    caligraphic: "\u2808",
    "caligraphic-bold": "\u2808\u2838",
    "double-struck": "\u2808",
    "double-struck-italic": "\u2838\u2828",
    fraktur: ["\u2838", germanCombiner],
    fullwidth: "",
    italic: "\u2828",
    monospace: "",
    normal: "",
    oldstyle: "",
    "oldstyle-bold": "\u2838",
    script: "\u2808",
    "sans-serif": "\u2820\u2828",
    "sans-serif-italic": "\u2820\u2828\u2828",
    "sans-serif-bold": "\u2820\u2828\u2838",
    "sans-serif-bold-italic": "\u2820\u2828\u2838\u2828",
    unknown: ""
  },
  EMBELLISH: {
    super: ["\u2818", germanCombiner],
    sub: ["\u2830", germanCombiner],
    circled: ["\u282b\u2809\u2838\u282b", embellishCombiner],
    parenthesized: ["\u2837", parensCombiner],
    period: ["\u2838\u2832", postfixCombiner],
    "negative-circled": ["\u282b\u2838\u2809\u2838\u282b", embellishCombiner],
    "double-circled": [
      "\u282b\u2809\u2838\u282b\u282b\u2809\u2838\u282b",
      doubleEmbellishCombiner
    ],
    "circled-sans-serif": [
      "\u282b\u2809\u2838\u282b\u2820\u2828",
      embellishCombiner
    ],
    "negative-circled-sans-serif": [
      "\u282b\u2838\u2809\u2838\u282b\u2820\u2828",
      embellishCombiner
    ],
    comma: ["\u2820", postfixCombiner],
    squared: ["\u282b\u2832\u2838\u282b", embellishCombiner],
    "negative-squared": ["\u282b\u2838\u2832\u2838\u282b", embellishCombiner]
  },
  ROLE: {
    addition: "addition",
    multiplication: "multiplication",
    subtraction: "subtraction",
    division: "division",
    equality: "equality",
    inequality: "inequality",
    element: "element",
    arrow: "arrow",
    determinant: "determinant",
    rowvector: "row vector",
    binomial: "binomial",
    squarematrix: "square matrix",
    multiline: "multiple lines",
    matrix: "matrix",
    vector: "vector",
    cases: "case statement",
    table: "table",
    unknown: "unknown"
  },
  ENCLOSE: {
    longdiv: "long division",
    actuarial: "actuarial symbol",
    radical: "square root",
    box: "\u2817",
    roundedbox: "rounded box",
    circle: "\u2809",
    left: "left vertical-line",
    right: "right vertical-line",
    top: "overbar",
    bottom: "underbar",
    updiagonalstrike: "crossout",
    downdiagonalstrike: "crossout",
    verticalstrike: "vertical strikeout",
    horizontalstrike: "crossout",
    madruwb: "Arabic factorial symbol",
    updiagonalarrow: "diagonal arrow",
    phasorangle: "\u282a",
    unknown: "long division"
  },
  REGEXP: {
    TEXT: "a-zA-Z",
    NUMBER: "((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+",
    DECIMAL_MARK: ".",
    DIGIT_GROUP: ",",
    JOINER_SUBSUPER: "",
    JOINER_FRAC: ""
  },
  NAVIGATE: {
    COLLAPSIBLE: "collapsible",
    EXPANDABLE: "expandable",
    LEVEL: "Level"
  },
  NUMBERS: sre.Numbers.nemeth.NUMBERS,
  ALPHABETS: {
    latinSmall:
      "\u2830\u2801 \u2830\u2803 \u2830\u2809 \u2830\u2819 \u2830\u2811 \u2830\u280b \u2830\u281b \u2830\u2813 \u2830\u280a \u2830\u281a \u2830\u2805 \u2830\u2807 \u2830\u280d \u2830\u281d \u2830\u2815 \u2830\u280f \u2830\u281f \u2830\u2817 \u2830\u280e \u2830\u281e \u2830\u2825 \u2830\u2827 \u2830\u283a \u2830\u282d \u2830\u283d \u2830\u2835".split(
        " "
      ),
    latinCap:
      "\u2830\u2820\u2801 \u2830\u2820\u2803 \u2830\u2820\u2809 \u2830\u2820\u2819 \u2830\u2820\u2811 \u2830\u2820\u280b \u2830\u2820\u281b \u2830\u2820\u2813 \u2830\u2820\u280a \u2830\u2820\u281a \u2830\u2820\u2805 \u2830\u2820\u2807 \u2830\u2820\u280d \u2830\u2820\u281d \u2830\u2820\u2815 \u2830\u2820\u280f \u2830\u2820\u281f \u2830\u2820\u2817 \u2830\u2820\u280e \u2830\u2820\u281e \u2830\u2820\u2825 \u2830\u2820\u2827 \u2830\u2820\u283a \u2830\u2820\u282d \u2830\u2820\u283d \u2830\u2820\u2835".split(
        " "
      ),
    greekSmall:
      "\u2828\u282b \u2828\u2801 \u2828\u2803 \u2828\u281b \u2828\u2819 \u2828\u2811 \u2828\u2835 \u2828\u2831 \u2828\u2839 \u2828\u280a \u2828\u2805 \u2828\u2807 \u2828\u280d \u2828\u281d \u2828\u282d \u2828\u2815 \u2828\u280f \u2828\u2817 \u2828\u2808\u280e \u2828\u280e \u2828\u281e \u2828\u2825 \u2828\u2808\u280b \u2828\u282f \u2828\u283d \u2828\u283a \u2808\u2819 \u2828\u2811 \u2828\u2808\u2839 \u2828\u2805 \u2828\u280b \u2828\u2817 \u2828\u280f".split(
        " "
      ),
    greekCap:
      "\u2828\u2820\u2801 \u2828\u2820\u2803 \u2828\u2820\u281b \u2828\u2820\u2819 \u2828\u2820\u2811 \u2828\u2820\u2835 \u2828\u2820\u2831 \u2828\u2820\u2839 \u2828\u2820\u280a \u2828\u2820\u2805 \u2828\u2820\u2807 \u2828\u2820\u280d \u2828\u2820\u281d \u2828\u2820\u282d \u2828\u2820\u2815 \u2828\u2820\u280f \u2828\u2820\u2817 \u2828\u2820\u2839 \u2828\u2820\u280e \u2828\u2820\u281e \u2828\u2820\u2825 \u2828\u2820\u280b \u2828\u2820\u282f \u2828\u2820\u283d \u2828\u2820\u283a".split(
        " "
      )
  },
  ALPHABET_TRANSFORMERS: {
    digit: { default: sre.Numbers.nemeth.numberToWords },
    letter: {
      default: function (a) {
        return a;
      }
    }
  },
  ALPHABET_PREFIXES: {
    capPrefix: { default: "" },
    smallPrefix: { default: "" },
    digitPrefix: { default: "\u283c" },
    languagePrefix: {
      greek: "\u2828",
      english: "\u2830",
      german: "\u2838",
      hebrew: "\u2820\u2820",
      number: "\u283c"
    }
  },
  ALPHABET_COMBINER: function (a, b, c) {
    return b ? b + c + a : simpleEnglish(a);
  }
};
sre.L10n = {};
sre.L10n.setLocale = function () {
  var a = sre.L10n.getLocale();
  if (a) for (var b in a) sre.Messages[b] = a[b];
};
sre.L10n.getLocale = function () {
  var a = sre.Engine.getInstance().locale;
  -1 === sre.Variables.LOCALES.indexOf(a) &&
    (console.error("Locale " + a + " does not exist! Using en instead."),
    (sre.Engine.getInstance().locale = "en"));
  return sre.Locale[sre.Engine.getInstance().locale] || sre.Locale.en;
};
sre.EnrichCase = function () {};
sre.EnrichCase.prototype.getMathml = function () {};
sre.AbstractEnrichCase = function (a) {
  this.semantic = a;
};
sre.AbstractEnrichCase.prototype.getMathml = goog.abstractMethod;
sre.EnrichCaseFactory = function () {};
sre.EnrichCaseFactory.cases = [];
sre.EnrichCaseFactory.getCase = function (a) {
  for (var b = 0, c; (c = sre.EnrichCaseFactory.cases[b]); b++)
    if (c.test(a)) return new c.constr(a);
  return null;
};
sre.SemanticSkeleton = function (a) {
  this.array = a = 0 === a ? a : a || [];
  this.levelsMap = this.parents = null;
};
sre.SemanticSkeleton.prototype.populate = function () {
  (this.parents && this.levelsMap) ||
    ((this.parents = {}),
    (this.levelsMap = {}),
    this.populate_(this.array, this.array, []));
};
sre.SemanticSkeleton.prototype.populate_ = function (a, b, c) {
  if (sre.SemanticSkeleton.simpleCollapseStructure(a))
    (this.levelsMap[a] = b), (this.parents[a] = a === c[0] ? c.slice(1) : c);
  else {
    b = sre.SemanticSkeleton.contentCollapseStructure(a) ? a.slice(1) : a;
    c = [b[0]].concat(c);
    for (var d = 0, e = b.length; d < e; d++) this.populate_(b[d], a, c);
  }
};
sre.SemanticSkeleton.prototype.toString = function () {
  return sre.SemanticSkeleton.makeSexp_(this.array);
};
sre.SemanticSkeleton.makeSexp_ = function (a) {
  return sre.SemanticSkeleton.simpleCollapseStructure(a)
    ? a.toString()
    : sre.SemanticSkeleton.contentCollapseStructure(a)
    ? "(c " + a.slice(1).map(sre.SemanticSkeleton.makeSexp_).join(" ") + ")"
    : "(" + a.map(sre.SemanticSkeleton.makeSexp_).join(" ") + ")";
};
sre.SemanticSkeleton.fromTree = function (a) {
  return sre.SemanticSkeleton.fromNode(a.root);
};
sre.SemanticSkeleton.fromNode = function (a) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromNode_(a));
};
sre.SemanticSkeleton.fromString = function (a) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromString_(a));
};
sre.SemanticSkeleton.fromString_ = function (a) {
  a = a.replace(/\(/g, "[");
  a = a.replace(/\)/g, "]");
  a = a.replace(/ /g, ",");
  a = a.replace(/c/g, '"c"');
  return JSON.parse(a);
};
sre.SemanticSkeleton.fromNode_ = function (a) {
  if (!a) return [];
  var b = a.contentNodes;
  if (b.length) {
    var c = b.map(sre.SemanticSkeleton.fromNode_);
    c.unshift("c");
  }
  var d = a.childNodes;
  if (!d.length) return b.length ? [a.id, c] : a.id;
  d = d.map(sre.SemanticSkeleton.fromNode_);
  b.length && d.unshift(c);
  d.unshift(a.id);
  return d;
};
sre.SemanticSkeleton.simpleCollapseStructure = function (a) {
  return "number" === typeof a;
};
sre.SemanticSkeleton.contentCollapseStructure = function (a) {
  return (
    !!a && !sre.SemanticSkeleton.simpleCollapseStructure(a) && "c" === a[0]
  );
};
sre.SemanticSkeleton.interleaveIds = function (a, b) {
  return sre.BaseUtil.interleaveLists(
    sre.SemanticSkeleton.collapsedLeafs(a),
    sre.SemanticSkeleton.collapsedLeafs(b)
  );
};
sre.SemanticSkeleton.collapsedLeafs = function (a) {
  var b = function (c) {
    return sre.SemanticSkeleton.simpleCollapseStructure(c)
      ? [c]
      : sre.SemanticSkeleton.contentCollapseStructure(c[1])
      ? c.slice(2)
      : c.slice(1);
  };
  return Array.prototype.slice.call(arguments, 0).reduce(function (c, d) {
    return c.concat(b(d));
  }, []);
};
sre.SemanticSkeleton.fromStructure = function (a, b) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.tree_(a, b.root));
};
sre.SemanticSkeleton.tree_ = function (a, b) {
  if (!b) return [];
  if (!b.childNodes.length) return b.id;
  var c = b.id,
    d = [c];
  c = sre.XpathUtil.evalXPath(
    ".//self::*[@" + sre.EnrichMathml.Attribute.ID + "=" + c + "]",
    a
  )[0];
  b = sre.SemanticSkeleton.combineContentChildren(
    b,
    b.contentNodes.map(function (f) {
      return f;
    }),
    b.childNodes.map(function (f) {
      return f;
    })
  );
  c && sre.SemanticSkeleton.addOwns_(c, b);
  c = 0;
  for (var e; (e = b[c]); c++) d.push(sre.SemanticSkeleton.tree_(a, e));
  return d;
};
sre.SemanticSkeleton.addOwns_ = function (a, b) {
  var c = a.getAttribute(sre.EnrichMathml.Attribute.COLLAPSED);
  b = c
    ? sre.SemanticSkeleton.realLeafs_(sre.SemanticSkeleton.fromString(c).array)
    : b.map(function (d) {
        return d.id;
      });
  a.setAttribute(sre.EnrichMathml.Attribute.OWNS, b.join(" "));
};
sre.SemanticSkeleton.realLeafs_ = function (a) {
  if (sre.SemanticSkeleton.simpleCollapseStructure(a)) return [a];
  if (sre.SemanticSkeleton.contentCollapseStructure(a)) return [];
  for (var b = [], c = 1; c < a.length; c++)
    b = b.concat(sre.SemanticSkeleton.realLeafs_(a[c]));
  return b;
};
sre.SemanticSkeleton.combineContentChildren = function (a, b, c) {
  switch (a.type) {
    case sre.Semantic.Type.RELSEQ:
    case sre.Semantic.Type.INFIXOP:
    case sre.Semantic.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(c, b);
    case sre.Semantic.Type.PREFIXOP:
      return b.concat(c);
    case sre.Semantic.Type.POSTFIXOP:
      return c.concat(b);
    case sre.Semantic.Type.FENCED:
      return c.unshift(b[0]), c.push(b[1]), c;
    case sre.Semantic.Type.APPL:
      return [c[0], b[0], c[1]];
    case sre.Semantic.Type.ROOT:
      return [c[1], c[0]];
    case sre.Semantic.Type.ROW:
    case sre.Semantic.Type.LINE:
      return b.length && c.unshift(b[0]), c;
    default:
      return c;
  }
};
sre.EnrichMathml = {};
sre.EnrichMathml.Error = function (a) {
  Error.call(this);
  this.message = a || "";
  this.name = "MathML Enrichment Error";
};
goog.inherits(sre.EnrichMathml.Error, Error);
sre.EnrichMathml.SETTINGS = { collapsed: !0, implicit: !0 };
sre.EnrichMathml.ATTRIBUTE_PREFIX_ = "data-semantic-";
sre.EnrichMathml.Attribute = {
  ADDED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "added",
  ALTERNATIVE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "alternative",
  CHILDREN: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "children",
  COLLAPSED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "collapsed",
  CONTENT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "content",
  EMBELLISHED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "embellished",
  FENCEPOINTER: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "fencepointer",
  FONT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "font",
  ID: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "id",
  ANNOTATION: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "annotation",
  OPERATOR: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "operator",
  OWNS: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "owns",
  PARENT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "parent",
  POSTFIX: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "postfix",
  PREFIX: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "prefix",
  ROLE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "role",
  SPEECH: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "speech",
  STRUCTURE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "structure",
  TYPE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + "type"
};
sre.EnrichMathml.enrich = function (a, b) {
  var c = a.cloneNode(!0);
  sre.EnrichMathml.walkTree(b.root);
  sre.Engine.getInstance().structure &&
    a.setAttribute(
      sre.EnrichMathml.Attribute.STRUCTURE,
      sre.SemanticSkeleton.fromStructure(a, b).toString()
    );
  sre.Debugger.getInstance().generateOutput(function () {
    sre.EnrichMathml.formattedOutput(c, a, b, !0);
    return [];
  });
  return a;
};
sre.EnrichMathml.walkTree = function (a) {
  var b = sre.EnrichCaseFactory.getCase(a);
  if (b) {
    var c = b.getMathml();
    return sre.EnrichMathml.ascendNewNode(c);
  }
  if (1 === a.mathml.length)
    return (
      sre.Debugger.getInstance().output("Walktree Case 0"),
      (c = a.mathml[0]),
      sre.EnrichMathml.setAttributes(c, a),
      a.childNodes.length &&
        (sre.Debugger.getInstance().output("Walktree Case 0.1"),
        a.childNodes.forEach(function (e) {
          e.type === sre.SemanticAttr.Type.EMPTY &&
            c.appendChild(sre.EnrichMathml.walkTree(e));
        })),
      sre.EnrichMathml.ascendNewNode(c)
    );
  b = a.contentNodes.map(sre.EnrichMathml.cloneContentNode);
  sre.EnrichMathml.setOperatorAttribute_(a, b);
  var d = a.childNodes.map(sre.EnrichMathml.walkTree);
  b = sre.SemanticSkeleton.combineContentChildren(a, b, d);
  c = a.mathmlTree;
  null === c
    ? (sre.Debugger.getInstance().output("Walktree Case 1"),
      (c = sre.EnrichMathml.introduceNewLayer(b, a)))
    : ((d = sre.EnrichMathml.attachedElement_(b)),
      sre.Debugger.getInstance().output("Walktree Case 2"),
      d
        ? (sre.Debugger.getInstance().output("Walktree Case 2.1"),
          (c = d.parentNode))
        : (sre.Debugger.getInstance().output("Walktree Case 2.2"),
          (c = sre.EnrichMathml.getInnerNode(c))));
  c = sre.EnrichMathml.rewriteMfenced(c);
  sre.EnrichMathml.mergeChildren_(c, b, a);
  sre.EnrichMathml.setAttributes(c, a);
  return sre.EnrichMathml.ascendNewNode(c);
};
sre.EnrichMathml.introduceNewLayer = function (a, b) {
  var c = sre.EnrichMathml.mathmlLca_(a),
    d = c.node,
    e = c.type;
  (e === sre.EnrichMathml.lcaType.VALID && sre.SemanticUtil.hasEmptyTag(d)) ||
    (sre.Debugger.getInstance().output("Walktree Case 1.1"),
    (d = sre.DomUtil.createElement("mrow")),
    e === sre.EnrichMathml.lcaType.PRUNED
      ? (sre.Debugger.getInstance().output("Walktree Case 1.1.0"),
        (d = sre.EnrichMathml.introduceLayerAboveLca(d, c.node, a)))
      : a[0] &&
        (sre.Debugger.getInstance().output("Walktree Case 1.1.1"),
        (c = sre.EnrichMathml.attachedElement_(a)),
        (a = sre.EnrichMathml.childrenSubset_(c.parentNode, a)),
        sre.DomUtil.replaceNode(c, d),
        a.forEach(function (f) {
          d.appendChild(f);
        })));
  b.mathmlTree || (b.mathmlTree = d);
  return d;
};
sre.EnrichMathml.introduceLayerAboveLca = function (a, b, c) {
  var d = sre.EnrichMathml.descendNode_(b);
  if (sre.SemanticUtil.hasMathTag(d)) {
    sre.Debugger.getInstance().output("Walktree Case 1.1.0.0");
    sre.EnrichMathml.moveSemanticAttributes_(d, a);
    sre.DomUtil.toArray(d.childNodes).forEach(function (f) {
      a.appendChild(f);
    });
    var e = a;
    a = d;
    d = e;
  }
  b = c.indexOf(b);
  c[b] = d;
  sre.DomUtil.replaceNode(d, a);
  a.appendChild(d);
  c.forEach(function (f) {
    a.appendChild(f);
  });
  return a;
};
sre.EnrichMathml.moveSemanticAttributes_ = function (a, b) {
  for (var c in sre.EnrichMathml.Attribute) {
    var d = sre.EnrichMathml.Attribute[c];
    a.hasAttribute(d) &&
      (b.setAttribute(d, a.getAttribute(d)), a.removeAttribute(d));
  }
};
sre.EnrichMathml.childrenSubset_ = function (a, b) {
  var c = sre.DomUtil.toArray(a.childNodes),
    d = Infinity,
    e = -Infinity;
  b.forEach(function (f) {
    f = c.indexOf(f);
    -1 !== f && ((d = Math.min(d, f)), (e = Math.max(e, f)));
  });
  return c.slice(d, e + 1);
};
sre.EnrichMathml.collateChildNodes_ = function (a, b, c) {
  var d = [];
  a = sre.DomUtil.toArray(a.childNodes);
  for (var e = !1; a.length; ) {
    var f = a.shift();
    if (f.hasAttribute(sre.EnrichMathml.Attribute.TYPE)) d.push(f);
    else {
      var g = sre.EnrichMathml.collectChildNodes_(f);
      0 !== g.length &&
        (1 === g.length
          ? d.push(f)
          : (e ? f.setAttribute("AuxiliaryImplicit", !0) : (e = !0),
            (a = g.concat(a))));
    }
  }
  a = [];
  for (
    c = c.childNodes.map(function (h) {
      return h.mathmlTree;
    });
    c.length;

  )
    if ((e = c.pop())) {
      if (-1 !== d.indexOf(e)) break;
      -1 !== b.indexOf(e) && a.unshift(e);
    }
  return d.concat(a);
};
sre.EnrichMathml.collectChildNodes_ = function (a) {
  var b = [];
  for (a = sre.DomUtil.toArray(a.childNodes); a.length; ) {
    var c = a.shift();
    c.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE &&
      (c.hasAttribute(sre.EnrichMathml.Attribute.TYPE)
        ? b.push(c)
        : (a = sre.DomUtil.toArray(c.childNodes).concat(a)));
  }
  return b;
};
sre.EnrichMathml.mergeChildren_ = function (a, b, c) {
  c =
    c.role === sre.SemanticAttr.Role.IMPLICIT &&
    sre.SemanticHeuristics.getInstance().flags.combine_juxtaposition
      ? sre.EnrichMathml.collateChildNodes_(a, b, c)
      : sre.DomUtil.toArray(a.childNodes);
  if (c.length)
    for (var d = 0; b.length; ) {
      var e = b[0];
      c[d] === e || sre.EnrichMathml.functionApplication_(c[d], e)
        ? (b.shift(), d++)
        : c[d] && -1 === b.indexOf(c[d])
        ? d++
        : (sre.EnrichMathml.isDescendant_(e, a) ||
            sre.EnrichMathml.insertNewChild_(a, c[d], e),
          b.shift());
    }
  else
    b.forEach(function (f) {
      a.appendChild(f);
    });
};
sre.EnrichMathml.insertNewChild_ = function (a, b, c) {
  if (b) {
    for (
      var d = sre.EnrichMathml.parentNode_(b);
      d &&
      d.firstChild === b &&
      !b.hasAttribute("AuxiliaryImplicit") &&
      d !== a;

    )
      (b = d), (d = sre.EnrichMathml.parentNode_(b));
    d && (d.insertBefore(c, b), b.removeAttribute("AuxiliaryImplicit"));
  } else a.insertBefore(c, null);
};
sre.EnrichMathml.isDescendant_ = function (a, b) {
  if (!a) return !1;
  do if (((a = a.parentNode), a === b)) return !0;
  while (a);
  return !1;
};
sre.EnrichMathml.functionApplication_ = function (a, b) {
  var c = sre.SemanticAttr.functionApplication();
  if (
    a &&
    b &&
    a.textContent &&
    b.textContent &&
    a.textContent === c &&
    b.textContent === c &&
    "true" === b.getAttribute(sre.EnrichMathml.Attribute.ADDED)
  ) {
    c = 0;
    for (var d; (d = a.attributes[c]); c++)
      b.hasAttribute(d.nodeName) || b.setAttribute(d.nodeName, d.nodeValue);
    sre.DomUtil.replaceNode(a, b);
    return !0;
  }
  return !1;
};
sre.EnrichMathml.lcaType = {
  VALID: "valid",
  INVALID: "invalid",
  PRUNED: "pruned"
};
sre.EnrichMathml.mathmlLca_ = function (a) {
  var b = sre.EnrichMathml.attachedElement_(a);
  if (!b) return { type: sre.EnrichMathml.lcaType.INVALID, node: null };
  var c = sre.EnrichMathml.attachedElement_(a.slice().reverse());
  if (b === c) return { type: sre.EnrichMathml.lcaType.VALID, node: b };
  b = sre.EnrichMathml.pathToRoot_(b);
  var d = sre.EnrichMathml.prunePath_(b, a);
  a = sre.EnrichMathml.pathToRoot_(c, function (f) {
    return -1 !== d.indexOf(f);
  });
  c = a[0];
  var e = d.indexOf(c);
  return -1 === e
    ? { type: sre.EnrichMathml.lcaType.INVALID, node: null }
    : {
        type:
          d.length !== b.length
            ? sre.EnrichMathml.lcaType.PRUNED
            : sre.EnrichMathml.validLca_(d[e + 1], a[1])
            ? sre.EnrichMathml.lcaType.VALID
            : sre.EnrichMathml.lcaType.INVALID,
        node: c
      };
};
sre.EnrichMathml.prunePath_ = function (a, b) {
  for (var c = 0; a[c] && -1 === b.indexOf(a[c]); ) c++;
  return a.slice(0, c + 1);
};
sre.EnrichMathml.attachedElement_ = function (a) {
  for (var b = 0, c = null; !c && b < a.length; )
    a[b].parentNode && (c = a[b]), b++;
  return c;
};
sre.EnrichMathml.pathToRoot_ = function (a, b) {
  b =
    b ||
    function (d) {
      return !1;
    };
  for (var c = [a]; !b(a) && !sre.SemanticUtil.hasMathTag(a) && a.parentNode; )
    (a = sre.EnrichMathml.parentNode_(a)), c.unshift(a);
  return c;
};
sre.EnrichMathml.validLca_ = function (a, b) {
  return !(!a || !b || a.previousSibling || b.nextSibling);
};
sre.EnrichMathml.ascendNewNode = function (a) {
  for (; !sre.SemanticUtil.hasMathTag(a) && sre.EnrichMathml.unitChild_(a); )
    a = sre.EnrichMathml.parentNode_(a);
  return a;
};
sre.EnrichMathml.descendNode_ = function (a) {
  var b = sre.DomUtil.toArray(a.childNodes);
  if (!b) return a;
  b = b.filter(function (c) {
    return (
      c.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE &&
      !sre.SemanticUtil.hasIgnoreTag(c)
    );
  });
  return 1 === b.length &&
    sre.SemanticUtil.hasEmptyTag(b[0]) &&
    !b[0].hasAttribute(sre.EnrichMathml.Attribute.TYPE)
    ? sre.EnrichMathml.descendNode_(b[0])
    : a;
};
sre.EnrichMathml.unitChild_ = function (a) {
  var b = sre.EnrichMathml.parentNode_(a);
  return b && sre.SemanticUtil.hasEmptyTag(b)
    ? sre.DomUtil.toArray(b.childNodes).every(function (c) {
        return c === a || sre.EnrichMathml.isIgnorable_(c);
      })
    : !1;
};
sre.EnrichMathml.isIgnorable_ = function (a) {
  if (
    a.nodeType !== sre.DomUtil.NodeType.ELEMENT_NODE ||
    !a ||
    sre.SemanticUtil.hasIgnoreTag(a)
  )
    return !0;
  var b = sre.DomUtil.toArray(a.childNodes);
  return (!sre.SemanticUtil.hasEmptyTag(a) && b.length) ||
    sre.SemanticUtil.hasDisplayTag(a) ||
    a.hasAttribute(sre.EnrichMathml.Attribute.TYPE) ||
    sre.SemanticUtil.isOrphanedGlyph(a)
    ? !1
    : sre.DomUtil.toArray(a.childNodes).every(sre.EnrichMathml.isIgnorable_);
};
sre.EnrichMathml.parentNode_ = function (a) {
  return a.parentNode;
};
sre.EnrichMathml.addCollapsedAttribute = function (a, b) {
  b = new sre.SemanticSkeleton(b);
  a.setAttribute(sre.EnrichMathml.Attribute.COLLAPSED, b.toString());
};
sre.EnrichMathml.cloneContentNode = function (a) {
  if (a.mathml.length) return sre.EnrichMathml.walkTree(a);
  var b = sre.EnrichMathml.SETTINGS.implicit
    ? sre.EnrichMathml.createInvisibHardworkperator_(a)
    : sre.DomUtil.createElement("mrow");
  a.mathml = [b];
  return b;
};
sre.EnrichMathml.makeIdList = function (a) {
  return a
    .map(function (b) {
      return b.id;
    })
    .join(",");
};
sre.EnrichMathml.setAttributes = function (a, b) {
  a.setAttribute(sre.EnrichMathml.Attribute.TYPE, b.type);
  for (var c = b.allAttributes(), d = 0, e; (e = c[d]); d++)
    a.setAttribute(sre.EnrichMathml.Attribute[e[0].toUpperCase()], e[1]);
  b.childNodes.length &&
    a.setAttribute(
      sre.EnrichMathml.Attribute.CHILDREN,
      sre.EnrichMathml.makeIdList(b.childNodes)
    );
  b.contentNodes.length &&
    a.setAttribute(
      sre.EnrichMathml.Attribute.CONTENT,
      sre.EnrichMathml.makeIdList(b.contentNodes)
    );
  b.parent && a.setAttribute(sre.EnrichMathml.Attribute.PARENT, b.parent.id);
  sre.EnrichMathml.setPostfix(a, b);
};
sre.EnrichMathml.setPostfix = function (a, b) {
  var c = [];
  "mglyph" === b.role && c.push("image");
  b.attributes.href && c.push("link");
  c.length && a.setAttribute(sre.EnrichMathml.Attribute.POSTFIX, c.join(" "));
};
sre.EnrichMathml.rewriteMfenced = function (a) {
  if ("MFENCED" !== sre.DomUtil.tagName(a)) return a;
  for (
    var b = sre.DomUtil.createElement("mrow"), c = 0, d;
    (d = a.attributes[c]);
    c++
  )
    -1 === ["open", "close", "separators"].indexOf(d.name) &&
      b.setAttribute(d.name, d.value);
  sre.DomUtil.toArray(a.childNodes).forEach(function (e) {
    b.appendChild(e);
  });
  sre.DomUtil.replaceNode(a, b);
  return b;
};
sre.EnrichMathml.createInvisibHardworkperator_ = function (a) {
  var b = sre.DomUtil.createElement("mo"),
    c = sre.DomUtil.createTextNode(a.textContent);
  b.appendChild(c);
  sre.EnrichMathml.setAttributes(b, a);
  b.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true");
  return b;
};
sre.EnrichMathml.setOperatorAttribute_ = function (a, b) {
  var c = a.type + (a.textContent ? "," + a.textContent : "");
  b.forEach(function (d) {
    sre.EnrichMathml.getInnerNode(d).setAttribute(
      sre.EnrichMathml.Attribute.OPERATOR,
      c
    );
  });
};
sre.EnrichMathml.getInnerNode = function (a) {
  var b = sre.DomUtil.toArray(a.childNodes);
  if (!b) return a;
  b = b.filter(function (g) {
    return !sre.EnrichMathml.isIgnorable_(g);
  });
  for (var c = [], d = 0, e; (e = b[d]); d++)
    if (sre.SemanticUtil.hasEmptyTag(e)) {
      var f = sre.EnrichMathml.getInnerNode(e);
      f && f !== e && c.push(f);
    } else c.push(e);
  return 1 === c.length ? c[0] : a;
};
sre.EnrichMathml.formattedOutput = function (a, b, c, d) {
  d = d || !1;
  sre.EnrichMathml.formattedOutput_(a, "Original MathML", d);
  sre.EnrichMathml.formattedOutput_(c, "Semantic Tree", d);
  sre.EnrichMathml.formattedOutput_(b, "Semantically enriched MathML", d);
};
sre.EnrichMathml.formattedOutput_ = function (a, b, c) {
  a = sre.DomUtil.formatXml(a.toString());
  c
    ? console.info(
        b +
          ":\n```html\n" +
          sre.EnrichMathml.removeAttributePrefix(a) +
          "\n```\n"
      )
    : console.info(a);
};
sre.EnrichMathml.removeAttributePrefix = function (a) {
  return a
    .toString()
    .replace(new RegExp(sre.EnrichMathml.ATTRIBUTE_PREFIX_, "g"), "");
};
sre.EnrichMathml.addPrefix = function (a) {
  var b = a.toUpperCase();
  return (
    sre.EnrichMathml.Attribute[b] || sre.EnrichMathml.ATTRIBUTE_PREFIX_ + a
  );
};
sre.EnrichMathml.collapsePunctuated = function (a, b) {
  var c = !!b;
  b = b || [];
  var d = a.parent,
    e = a.contentNodes.map(function (k) {
      return k.id;
    });
  e.unshift("c");
  e = [a.id, e];
  for (var f = 0, g; (g = a.childNodes[f]); f++) {
    var h = sre.EnrichMathml.walkTree(g);
    b.push(h);
    h = sre.EnrichMathml.getInnerNode(h);
    d && !c && h.setAttribute(sre.EnrichMathml.Attribute.PARENT, d.id);
    e.push(g.id);
  }
  return e;
};
sre.EnrichMathml.printNodeList__ = function (a, b) {
  console.info(a);
  sre.DomUtil.toArray(b).forEach(function (c) {
    console.info(c.toString());
  });
  console.info("<<<<<<<<<<<<<<<<<");
};
sre.CaseBinomial = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseBinomial, sre.AbstractEnrichCase);
sre.CaseBinomial.test = function (a) {
  return (
    !a.mathmlTree &&
    a.type === sre.SemanticAttr.Type.LINE &&
    a.role === sre.SemanticAttr.Role.BINOMIAL
  );
};
sre.CaseBinomial.prototype.getMathml = function () {
  if (!this.semantic.childNodes.length) return this.mml;
  this.mml = sre.EnrichMathml.walkTree(this.semantic.childNodes[0]);
  if (this.mml.hasAttribute(sre.EnrichMathml.Attribute.TYPE)) {
    var a = sre.DomUtil.createElement("mrow");
    a.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true");
    sre.DomUtil.replaceNode(this.mml, a);
    a.appendChild(this.mml);
    this.mml = a;
  }
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
sre.CaseDoubleScript = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseDoubleScript, sre.AbstractEnrichCase);
sre.CaseDoubleScript.test = function (a) {
  if (!a.mathmlTree || !a.childNodes.length) return !1;
  var b = sre.DomUtil.tagName(a.mathmlTree);
  a = a.childNodes[0].role;
  return (
    ("MSUBSUP" === b && a === sre.SemanticAttr.Role.SUBSUP) ||
    ("MUNDEROVER" === b && a === sre.SemanticAttr.Role.UNDEROVER)
  );
};
sre.CaseDoubleScript.prototype.getMathml = function () {
  var a = this.semantic.childNodes[0],
    b = a.childNodes[0],
    c = this.semantic.childNodes[1],
    d = a.childNodes[1],
    e = sre.EnrichMathml.walkTree(c),
    f = sre.EnrichMathml.walkTree(b),
    g = sre.EnrichMathml.walkTree(d);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  this.mml.setAttribute(
    sre.EnrichMathml.Attribute.CHILDREN,
    sre.EnrichMathml.makeIdList([b, d, c])
  );
  [f, g, e].forEach(
    goog.bind(function (h) {
      sre.EnrichMathml.getInnerNode(h).setAttribute(
        sre.EnrichMathml.Attribute.PARENT,
        this.mml.getAttribute(sre.EnrichMathml.Attribute.ID)
      );
    }, this)
  );
  this.mml.setAttribute(sre.EnrichMathml.Attribute.TYPE, a.role);
  sre.EnrichMathml.addCollapsedAttribute(this.mml, [
    this.semantic.id,
    [a.id, b.id, d.id],
    c.id
  ]);
  return this.mml;
};
sre.CaseMultiindex = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseMultiindex, sre.AbstractEnrichCase);
sre.CaseMultiindex.prototype.completeMultiscript = function (a, b) {
  var c = sre.DomUtil.toArray(this.mml.childNodes).slice(1),
    d = 0,
    e = goog.bind(function (f) {
      for (var g = 0, h; (h = f[g]); g++) {
        var k = c[d];
        if (
          k &&
          h ==
            sre.EnrichMathml.getInnerNode(k).getAttribute(
              sre.EnrichMathml.Attribute.ID
            )
        )
          sre.EnrichMathml.getInnerNode(k).setAttribute(
            sre.EnrichMathml.Attribute.PARENT,
            this.semantic.id
          ),
            d++;
        else {
          var l = this.semantic.querySelectorAll(function (m) {
            return m.id === h;
          });
          this.mml.insertBefore(
            sre.CaseMultiindex.createNone_(l[0]),
            k || null
          );
        }
      }
    }, this);
  e(a);
  c[d] && "MPRESCRIPTS" !== sre.DomUtil.tagName(c[d])
    ? this.mml.insertBefore(c[d], sre.DomUtil.createElement("mprescripts"))
    : d++;
  e(b);
};
sre.CaseMultiindex.createNone_ = function (a) {
  var b = sre.DomUtil.createElement("none");
  a && sre.EnrichMathml.setAttributes(b, a);
  b.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true");
  return b;
};
sre.CaseMultiindex.multiscriptIndex = function (a) {
  if (
    a.type === sre.SemanticAttr.Type.PUNCTUATED &&
    a.contentNodes[0].role === sre.SemanticAttr.Role.DUMMY
  )
    return sre.EnrichMathml.collapsePunctuated(a);
  sre.EnrichMathml.walkTree(a);
  return a.id;
};
sre.CaseMultiscripts = function (a) {
  sre.CaseMultiindex.call(this, a);
};
goog.inherits(sre.CaseMultiscripts, sre.CaseMultiindex);
sre.CaseMultiscripts.test = function (a) {
  return a.mathmlTree
    ? "MMULTISCRIPTS" === sre.DomUtil.tagName(a.mathmlTree) &&
        (a.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
          a.type === sre.SemanticAttr.Type.SUBSCRIPT)
    : !1;
};
sre.CaseMultiscripts.prototype.getMathml = function () {
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  if (
    this.semantic.childNodes[0] &&
    this.semantic.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP
  ) {
    var a = this.semantic.childNodes[0],
      b = a.childNodes[0],
      c = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]),
      d = sre.CaseMultiindex.multiscriptIndex(a.childNodes[1]),
      e = [this.semantic.id, [a.id, b.id, d], c];
    sre.EnrichMathml.addCollapsedAttribute(this.mml, e);
    this.mml.setAttribute(sre.EnrichMathml.Attribute.TYPE, a.role);
    this.completeMultiscript(sre.SemanticSkeleton.interleaveIds(d, c), []);
  } else
    (b = this.semantic.childNodes[0]),
      (c = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1])),
      (e = [this.semantic.id, b.id, c]),
      sre.EnrichMathml.addCollapsedAttribute(this.mml, e);
  a = sre.SemanticSkeleton.collapsedLeafs(d || [], c);
  c = sre.EnrichMathml.walkTree(b);
  sre.EnrichMathml.getInnerNode(c).setAttribute(
    sre.EnrichMathml.Attribute.PARENT,
    this.semantic.id
  );
  a.unshift(b.id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN, a.join(","));
  return this.mml;
};
sre.CaseEmbellished = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.ofenceMml = this.ofence = this.fencedMml = this.fenced = null;
  this.ofenceMap = {};
  this.cfenceMml = this.cfence = null;
  this.cfenceMap = {};
  this.parentCleanup = [];
};
goog.inherits(sre.CaseEmbellished, sre.AbstractEnrichCase);
sre.CaseEmbellished.test = function (a) {
  return !(
    !a.mathmlTree ||
    !a.fencePointer ||
    a.mathmlTree.getAttribute("data-semantic-type")
  );
};
sre.CaseEmbellished.prototype.getMathml = function () {
  this.getFenced_();
  this.fencedMml = sre.EnrichMathml.walkTree(this.fenced);
  this.getFencesMml_();
  this.fenced.type !== sre.SemanticAttr.Type.EMPTY ||
    this.fencedMml.parentNode ||
    (this.fencedMml.setAttribute(sre.EnrichMathml.Attribute.ADDED, "true"),
    this.cfenceMml.parentNode.insertBefore(this.fencedMml, this.cfenceMml));
  return this.rewrite_();
};
sre.CaseEmbellished.prototype.getFenced_ = function () {
  for (var a = this.semantic; a.type !== sre.SemanticAttr.Type.FENCED; )
    a = a.childNodes[0];
  this.fenced = a.childNodes[0];
  this.ofence = a.contentNodes[0];
  this.cfence = a.contentNodes[1];
  sre.CaseEmbellished.fencedMap_(this.ofence, this.ofenceMap);
  sre.CaseEmbellished.fencedMap_(this.cfence, this.cfenceMap);
};
sre.CaseEmbellished.fencedMap_ = function (a, b) {
  b[a.id] = a.mathmlTree;
  a.embellished && sre.CaseEmbellished.fencedMap_(a.childNodes[0], b);
};
sre.CaseEmbellished.prototype.getFencesMml_ = function () {
  for (
    var a = this.semantic,
      b = Object.keys(this.ofenceMap),
      c = Object.keys(this.cfenceMap);
    !((this.ofenceMml && this.cfenceMml) || a === this.fenced);

  )
    -1 === b.indexOf(a.fencePointer) ||
      this.ofenceMml ||
      (this.ofenceMml = a.mathmlTree),
      -1 === c.indexOf(a.fencePointer) ||
        this.cfenceMml ||
        (this.cfenceMml = a.mathmlTree),
      (a = a.childNodes[0]);
  this.ofenceMml || (this.ofenceMml = this.ofence.mathmlTree);
  this.cfenceMml || (this.cfenceMml = this.cfence.mathmlTree);
  this.ofenceMml &&
    (this.ofenceMml = sre.EnrichMathml.ascendNewNode(this.ofenceMml));
  this.cfenceMml &&
    (this.cfenceMml = sre.EnrichMathml.ascendNewNode(this.cfenceMml));
};
sre.CaseEmbellished.prototype.rewrite_ = function () {
  var a = this.semantic,
    b = null,
    c = this.introduceNewLayer_();
  for (
    sre.EnrichMathml.setAttributes(c, this.fenced.parent);
    a.type !== sre.SemanticAttr.Type.FENCED;

  ) {
    var d = a.mathmlTree,
      e = this.specialCase_(a, d);
    if (e) a = e;
    else {
      sre.EnrichMathml.setAttributes(d, a);
      e = [];
      for (var f = 1, g; (g = a.childNodes[f]); f++)
        e.push(sre.EnrichMathml.walkTree(g));
      a = a.childNodes[0];
    }
    e = sre.DomUtil.createElement("dummy");
    f = c.parentNode;
    g = d.childNodes[0];
    sre.DomUtil.replaceNode(d, e);
    sre.DomUtil.replaceNode(c, d);
    sre.DomUtil.replaceNode(d.childNodes[0], c);
    sre.DomUtil.replaceNode(e, g);
    d.parentNode = f;
    c = d.childNodes[0];
    b || (b = d);
  }
  sre.EnrichMathml.walkTree(this.ofence);
  sre.EnrichMathml.walkTree(this.cfence);
  this.cleanupParents_();
  return b || c;
};
sre.CaseEmbellished.prototype.specialCase_ = function (a, b) {
  var c = sre.DomUtil.tagName(b),
    d = null;
  if ("MSUBSUP" === c) {
    d = a.childNodes[0];
    var e = sre.CaseDoubleScript;
  } else
    "MMULTISCRIPTS" === c &&
      (a.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
      a.type === sre.SemanticAttr.Type.SUBSCRIPT
        ? (e = sre.CaseMultiscripts)
        : a.type === sre.SemanticAttr.Type.TENSOR && (e = sre.CaseTensor),
      (d =
        e &&
        a.childNodes[0] &&
        a.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP
          ? a.childNodes[0]
          : a));
  if (!d) return null;
  c = d.childNodes[0];
  b = sre.CaseEmbellished.makeEmptyNode_(c.id);
  d.childNodes[0] = b;
  b = new e(a).getMathml();
  d.childNodes[0] = c;
  this.parentCleanup.push(b);
  return d.childNodes[0];
};
sre.CaseEmbellished.makeEmptyNode_ = function (a) {
  var b = sre.DomUtil.createElement("mrow");
  a = new sre.SemanticNode(a);
  a.type = sre.SemanticAttr.Type.EMPTY;
  a.mathmlTree = b;
  return a;
};
sre.CaseEmbellished.prototype.introduceNewLayer_ = function () {
  var a = this.fullFence(this.ofenceMml),
    b = this.fullFence(this.cfenceMml),
    c = sre.DomUtil.createElement("mrow");
  sre.DomUtil.replaceNode(this.fencedMml, c);
  c.appendChild(this.fencedMml);
  c.insertBefore(a, this.fencedMml);
  c.appendChild(b);
  if (!c.parentNode) {
    for (a = sre.DomUtil.createElement("mrow"); 0 < c.childNodes.length; )
      a.appendChild(c.childNodes[0]);
    c.appendChild(a);
    c = a;
  }
  return c;
};
sre.CaseEmbellished.prototype.fullFence = function (a) {
  for (var b = this.fencedMml.parentNode; a.parentNode && a.parentNode !== b; )
    a = a.parentNode;
  return a;
};
sre.CaseEmbellished.prototype.cleanupParents_ = function () {
  this.parentCleanup.forEach(function (a) {
    var b = a.childNodes[1].getAttribute(sre.EnrichMathml.Attribute.PARENT);
    a.childNodes[0].setAttribute(sre.EnrichMathml.Attribute.PARENT, b);
  });
};
sre.CaseLimit = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseLimit, sre.AbstractEnrichCase);
sre.CaseLimit.test = function (a) {
  if (!a.mathmlTree || !a.childNodes.length) return !1;
  var b = sre.DomUtil.tagName(a.mathmlTree);
  a = a.type;
  return (
    ((a === sre.SemanticAttr.Type.LIMUPPER ||
      a === sre.SemanticAttr.Type.LIMLOWER) &&
      ("MSUBSUP" === b || "MUNDEROVER" === b)) ||
    (a === sre.SemanticAttr.Type.LIMBOTH &&
      ("MSUB" === b || "MUNDER" === b || "MSUP" === b || "MOVER" === b))
  );
};
sre.CaseLimit.prototype.getMathml = function () {
  var a = this.semantic.childNodes;
  this.semantic.type !== sre.SemanticAttr.Type.LIMBOTH &&
    3 <= this.mml.childNodes.length &&
    (this.mml = sre.EnrichMathml.introduceNewLayer([this.mml], this.semantic));
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  a[0].mathmlTree || (a[0].mathmlTree = this.semantic.mathmlTree);
  a.forEach(sre.CaseLimit.walkTree_);
  return this.mml;
};
sre.CaseLimit.walkTree_ = function (a) {
  a && sre.EnrichMathml.walkTree(a);
};
sre.CaseLine = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseLine, sre.AbstractEnrichCase);
sre.CaseLine.test = function (a) {
  return !!a.mathmlTree && a.type === sre.SemanticAttr.Type.LINE;
};
sre.CaseLine.prototype.getMathml = function () {
  this.semantic.contentNodes.length &&
    sre.EnrichMathml.walkTree(this.semantic.contentNodes[0]);
  this.semantic.childNodes.length &&
    sre.EnrichMathml.walkTree(this.semantic.childNodes[0]);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
sre.CaseProof = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseProof, sre.AbstractEnrichCase);
sre.CaseProof.test = function (a) {
  return (
    !!a.mathmlTree &&
    (a.type === sre.SemanticAttr.Type.INFERENCE ||
      a.type === sre.SemanticAttr.Type.PREMISES)
  );
};
sre.CaseProof.prototype.getMathml = function () {
  if (!this.semantic.childNodes.length) return this.mml;
  this.semantic.contentNodes.forEach(function (a) {
    sre.EnrichMathml.walkTree(a);
    sre.EnrichMathml.setAttributes(a.mathmlTree, a);
  });
  this.semantic.childNodes.forEach(function (a) {
    sre.EnrichMathml.walkTree(a);
  });
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  this.mml.getAttribute("data-semantic-id") ===
    this.mml.getAttribute("data-semantic-parent") &&
    this.mml.removeAttribute("data-semantic-parent");
  return this.mml;
};
sre.CaseTable = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
  this.inner = [];
};
goog.inherits(sre.CaseTable, sre.AbstractEnrichCase);
sre.CaseTable.test = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.MATRIX ||
    a.type === sre.SemanticAttr.Type.VECTOR ||
    a.type === sre.SemanticAttr.Type.CASES
  );
};
sre.CaseTable.prototype.getMathml = function () {
  var a = sre.EnrichMathml.cloneContentNode(this.semantic.contentNodes[0]),
    b = this.semantic.contentNodes[1]
      ? sre.EnrichMathml.cloneContentNode(this.semantic.contentNodes[1])
      : null;
  this.inner = this.semantic.childNodes.map(sre.EnrichMathml.walkTree);
  this.mml
    ? "MFENCED" === sre.DomUtil.tagName(this.mml)
      ? (this.mml.insertBefore(a, this.mml.childNodes[0] || null),
        b && this.mml.appendChild(b),
        (this.mml = sre.EnrichMathml.rewriteMfenced(this.mml)))
      : ((a = [a, this.mml]),
        b && a.push(b),
        (this.mml = sre.EnrichMathml.introduceNewLayer(a, this.semantic)))
    : (this.mml = sre.EnrichMathml.introduceNewLayer(
        [a, this.inner, b],
        this.semantic
      ));
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
sre.CaseTensor = function (a) {
  sre.CaseMultiindex.call(this, a);
};
goog.inherits(sre.CaseTensor, sre.CaseMultiindex);
sre.CaseTensor.test = function (a) {
  return !!a.mathmlTree && a.type === sre.SemanticAttr.Type.TENSOR;
};
sre.CaseTensor.prototype.getMathml = function () {
  sre.EnrichMathml.walkTree(this.semantic.childNodes[0]);
  var a = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]),
    b = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[2]),
    c = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[3]),
    d = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[4]);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  sre.EnrichMathml.addCollapsedAttribute(this.mml, [
    this.semantic.id,
    this.semantic.childNodes[0].id,
    a,
    b,
    c,
    d
  ]);
  var e = sre.SemanticSkeleton.collapsedLeafs(a, b, c, d);
  e.unshift(this.semantic.childNodes[0].id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN, e.join(","));
  this.completeMultiscript(
    sre.SemanticSkeleton.interleaveIds(c, d),
    sre.SemanticSkeleton.interleaveIds(a, b)
  );
  return this.mml;
};
sre.CaseText = function (a) {
  sre.AbstractEnrichCase.call(this, a);
  this.mml = a.mathmlTree;
};
goog.inherits(sre.CaseText, sre.AbstractEnrichCase);
sre.CaseText.test = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.PUNCTUATED &&
    (a.role === sre.SemanticAttr.Role.TEXT ||
      a.contentNodes.every(function (b) {
        return b.role === sre.SemanticAttr.Role.DUMMY;
      }))
  );
};
sre.CaseText.prototype.getMathml = function () {
  var a = [],
    b = sre.EnrichMathml.collapsePunctuated(this.semantic, a);
  this.mml = sre.EnrichMathml.introduceNewLayer(a, this.semantic);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  this.mml.removeAttribute(sre.EnrichMathml.Attribute.CONTENT);
  sre.EnrichMathml.addCollapsedAttribute(this.mml, b);
  return this.mml;
};
sre.EnrichCases = function () {};
sre.EnrichCaseFactory.cases.push(
  { test: sre.CaseLimit.test, constr: sre.CaseLimit },
  { test: sre.CaseEmbellished.test, constr: sre.CaseEmbellished },
  { test: sre.CaseDoubleScript.test, constr: sre.CaseDoubleScript },
  { test: sre.CaseTensor.test, constr: sre.CaseTensor },
  { test: sre.CaseMultiscripts.test, constr: sre.CaseMultiscripts },
  { test: sre.CaseLine.test, constr: sre.CaseLine },
  { test: sre.CaseBinomial.test, constr: sre.CaseBinomial },
  { test: sre.CaseProof.test, constr: sre.CaseProof },
  { test: sre.CaseTable.test, constr: sre.CaseTable },
  { test: sre.CaseText.test, constr: sre.CaseText }
);
sre.Enrich = {};
sre.Enrich.semanticMathmlNode = function (a) {
  a = a.cloneNode(!0);
  var b = sre.Semantic.getTree(a);
  return sre.EnrichMathml.enrich(a, b);
};
sre.Enrich.semanticMathmlSync = function (a) {
  a = sre.DomUtil.parseInput(a);
  return sre.Enrich.semanticMathmlNode(a);
};
sre.Enrich.semanticMathml = function (a, b) {
  if (sre.Engine.isReady()) {
    var c = sre.DomUtil.parseInput(a);
    b(sre.Enrich.semanticMathmlNode(c));
  } else
    setTimeout(function () {
      sre.Enrich.semanticMathml(a, b);
    }, 500);
};
sre.Enrich.testTranslation__ = function (a) {
  new sre.EnrichCases();
  sre.Debugger.getInstance().init();
  a = sre.Enrich.semanticMathmlSync(sre.Enrich.prepareMmlString(a)).toString();
  sre.EnrichMathml.removeAttributePrefix(a);
  sre.Debugger.getInstance().exit();
  return a;
};
sre.Enrich.prepareMmlString = function (a) {
  a.match(/^<math/) || (a = "<math>" + a);
  a.match(/\/math>$/) || (a += "</math>");
  return a;
};
sre.ColorPicker = function (a, b) {
  this.foreground = sre.ColorPicker.getChannelColor_(
    b,
    sre.ColorPicker.DEFAULT_FOREGROUND_
  );
  this.background = sre.ColorPicker.getChannelColor_(
    a,
    sre.ColorPicker.DEFAULT_BACKGROUND_
  );
};
sre.ColorPicker.DEFAULT_BACKGROUND_ = "blue";
sre.ColorPicker.DEFAULT_FOREGROUND_ = "black";
sre.ColorPicker.namedColors_ = {
  red: { red: 255, green: 0, blue: 0 },
  green: { red: 0, green: 255, blue: 0 },
  blue: { red: 0, green: 0, blue: 255 },
  yellow: { red: 255, green: 255, blue: 0 },
  cyan: { red: 0, green: 255, blue: 255 },
  magenta: { red: 255, green: 0, blue: 255 },
  white: { red: 255, green: 255, blue: 255 },
  black: { red: 0, green: 0, blue: 0 }
};
sre.ColorPicker.getChannelColor_ = function (a, b) {
  a = a || { color: b };
  var c = a.color ? sre.ColorPicker.namedColors_[a.color] : a;
  c || (c = sre.ColorPicker.namedColors_[b]);
  c.alpha = a.hasOwnProperty("alpha") ? a.alpha : 1;
  return sre.ColorPicker.normalizeColor_(c);
};
sre.ColorPicker.normalizeColor_ = function (a) {
  var b = function (c) {
    c = Math.max(c, 0);
    c = Math.min(255, c);
    return Math.round(c);
  };
  a.red = b(a.red);
  a.green = b(a.green);
  a.blue = b(a.blue);
  a.alpha = Math.max(a.alpha, 0);
  a.alpha = Math.min(1, a.alpha);
  return a;
};
sre.ColorPicker.prototype.rgba = function () {
  var a = function (b) {
    return "rgba(" + b.red + "," + b.green + "," + b.blue + "," + b.alpha + ")";
  };
  return { background: a(this.background), foreground: a(this.foreground) };
};
sre.ColorPicker.prototype.rgb = function () {
  var a = function (b) {
    return "rgb(" + b.red + "," + b.green + "," + b.blue + ")";
  };
  return {
    background: a(this.background),
    alphaback: this.background.alpha.toString(),
    foreground: a(this.foreground),
    alphafore: this.foreground.alpha.toString()
  };
};
sre.ColorPicker.prototype.hex = function () {
  var a = function (b) {
    return (
      "#" +
      sre.ColorPicker.toHex_(b.red) +
      sre.ColorPicker.toHex_(b.green) +
      sre.ColorPicker.toHex_(b.blue)
    );
  };
  return {
    background: a(this.background),
    alphaback: this.background.alpha.toString(),
    foreground: a(this.foreground),
    alphafore: this.foreground.alpha.toString()
  };
};
sre.ColorPicker.toHex_ = function (a) {
  a = a.toString(16);
  return 1 === a.length ? "0" + a : a;
};
sre.ContrastPicker = function () {
  this.hue = 10;
  this.sat = 100;
  this.incr = this.light = 50;
};
sre.ContrastPicker.prototype.generate = function () {
  return sre.ColorPicker.RGB2hex_(
    sre.ColorPicker.rgb2RGB_(
      sre.ColorPicker.hsl2rgb_(this.hue, this.sat, this.light)
    )
  );
};
sre.ContrastPicker.prototype.increment = function () {
  this.hue = (this.hue + this.incr) % 360;
};
sre.ColorPicker.hsl2rgb_ = function (a, b, c) {
  c = 1 < c ? c / 100 : c;
  var d = (1 - Math.abs(2 * c - 1)) * (1 < b ? b / 100 : b),
    e = d * (1 - Math.abs(((a / 60) % 2) - 1));
  c -= d / 2;
  var f = (b = 0),
    g = 0;
  0 <= a && 60 > a
    ? ((a = $jscomp.makeIterator([d, e, 0])),
      (b = a.next().value),
      (f = a.next().value),
      (g = a.next().value))
    : 60 <= a && 120 > a
    ? ((a = $jscomp.makeIterator([e, d, 0])),
      (b = a.next().value),
      (f = a.next().value),
      (g = a.next().value))
    : 120 <= a && 180 > a
    ? ((a = $jscomp.makeIterator([0, d, e])),
      (b = a.next().value),
      (f = a.next().value),
      (g = a.next().value))
    : 180 <= a && 240 > a
    ? ((a = $jscomp.makeIterator([0, e, d])),
      (b = a.next().value),
      (f = a.next().value),
      (g = a.next().value))
    : 240 <= a && 300 > a
    ? ((a = $jscomp.makeIterator([e, 0, d])),
      (b = a.next().value),
      (f = a.next().value),
      (g = a.next().value))
    : 300 <= a &&
      360 > a &&
      ((a = $jscomp.makeIterator([d, 0, e])),
      (b = a.next().value),
      (f = a.next().value),
      (g = a.next().value));
  return { red: b + c, green: f + c, blue: g + c };
};
sre.ColorPicker.rgb2RGB_ = function (a) {
  return {
    red: Math.round(255 * a.red),
    green: Math.round(255 * a.green),
    blue: Math.round(255 * a.blue)
  };
};
sre.ColorPicker.RGB2hex_ = function (a) {
  return "rgb(" + a.red + "," + a.green + "," + a.blue + ")";
};
sre.Highlighter = function () {};
sre.Highlighter.prototype.highlight = function (a) {};
sre.Highlighter.prototype.unhighlight = function () {};
sre.Highlighter.prototype.highlightAll = function (a) {};
sre.Highlighter.prototype.unhighlightAll = function () {};
sre.Highlighter.prototype.setColor = function (a) {};
sre.Highlighter.prototype.addEvents = function (a, b) {};
sre.AbstractHighlighter = function () {
  this.currentHighlights_ = [];
  this.color = null;
  this.mactionName = "";
};
sre.AbstractHighlighter.ATTR = "sre-highlight";
sre.AbstractHighlighter.prototype.highlight = function (a) {
  this.currentHighlights_.push(
    a.map(
      goog.bind(function (b) {
        var c = this.highlightNode(b);
        this.setHighlighted(b);
        return c;
      }, this)
    )
  );
};
sre.AbstractHighlighter.prototype.highlightNode = goog.abstractMethod;
sre.AbstractHighlighter.prototype.highlightAll = function (a) {
  a = this.getMactionNodes(a);
  for (var b = 0, c; (c = a[b]); b++) this.highlight([c]);
};
sre.AbstractHighlighter.prototype.unhighlight = function () {
  var a = this.currentHighlights_.pop();
  a &&
    a.forEach(
      goog.bind(function (b) {
        this.isHighlighted(b.node) &&
          (this.unhighlightNode(b), this.unsetHighlighted(b.node));
      }, this)
    );
};
sre.AbstractHighlighter.prototype.unhighlightNode = goog.abstractMethod;
sre.AbstractHighlighter.prototype.unhighlightAll = function () {
  for (; 0 < this.currentHighlights_.length; ) this.unhighlight();
};
sre.AbstractHighlighter.prototype.setColor = function (a) {
  this.color = a;
};
sre.AbstractHighlighter.prototype.colorString = function () {
  return this.color.rgba();
};
sre.AbstractHighlighter.prototype.addEvents = function (a, b) {
  a = this.getMactionNodes(a);
  for (var c = 0, d; (d = a[c]); c++)
    for (var e in b) d.addEventListener(e, b[e]);
};
sre.AbstractHighlighter.prototype.getMactionNodes = function (a) {
  return a.getElementsByClassName(this.mactionName);
};
sre.AbstractHighlighter.prototype.isMactionNode = function (a) {
  return (a = a.className || a.getAttribute("class"))
    ? a.match(new RegExp(this.mactionName))
    : !1;
};
sre.AbstractHighlighter.prototype.isHighlighted = function (a) {
  return a.hasAttribute(sre.AbstractHighlighter.ATTR);
};
sre.AbstractHighlighter.prototype.setHighlighted = function (a) {
  a.setAttribute(sre.AbstractHighlighter.ATTR, !0);
};
sre.AbstractHighlighter.prototype.unsetHighlighted = function (a) {
  a.removeAttribute(sre.AbstractHighlighter.ATTR);
};
sre.AbstractHighlighter.prototype.colorizeAll = function (a) {
  sre.XpathUtil.evalXPath(
    ".//*[@" + sre.EnrichMathml.Attribute.ID + "]",
    a
  ).forEach(
    goog.bind(function (b) {
      this.colorize(b);
    }, this)
  );
};
sre.AbstractHighlighter.prototype.uncolorizeAll = function (a) {
  sre.XpathUtil.evalXPath(
    ".//*[@" + sre.EnrichMathml.Attribute.ID + "]",
    a
  ).forEach(
    goog.bind(function (b) {
      this.uncolorize(b);
    }, this)
  );
};
sre.AbstractHighlighter.prototype.colorize = function (a) {
  var b = sre.EnrichMathml.addPrefix("foreground");
  a.hasAttribute(b) &&
    (a.setAttribute(b + "-old", a.style.color),
    (a.style.color = a.getAttribute(b)));
};
sre.AbstractHighlighter.prototype.uncolorize = function (a) {
  var b = sre.EnrichMathml.addPrefix("foreground") + "-old";
  a.hasAttribute(b) && (a.style.color = a.getAttribute(b));
};
sre.CssHighlighter = function () {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "mjx-maction";
};
goog.inherits(sre.CssHighlighter, sre.AbstractHighlighter);
sre.CssHighlighter.prototype.highlightNode = function (a) {
  var b = {
      node: a,
      background: a.style.backgroundColor,
      foreground: a.style.color
    },
    c = this.colorString();
  a.style.backgroundColor = c.background;
  a.style.color = c.foreground;
  return b;
};
sre.CssHighlighter.prototype.unhighlightNode = function (a) {
  a.node.style.backgroundColor = a.background;
  a.node.style.color = a.foreground;
};
sre.ChtmlHighlighter = function () {
  sre.CssHighlighter.call(this);
};
goog.inherits(sre.ChtmlHighlighter, sre.CssHighlighter);
sre.ChtmlHighlighter.prototype.isMactionNode = function (a) {
  return a.tagName.toUpperCase() === this.mactionName.toUpperCase();
};
sre.ChtmlHighlighter.prototype.getMactionNodes = function (a) {
  return a.getElementsByTagName(this.mactionName);
};
sre.HtmlHighlighter = function () {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.HtmlHighlighter, sre.AbstractHighlighter);
sre.HtmlHighlighter.prototype.setMode = function (a) {
  this.mode = a;
};
sre.HtmlHighlighter.prototype.highlightNode = function (a) {
  var b = { node: a, foreground: a.style.color, position: a.style.position },
    c = this.color.rgb();
  a.style.color = c.foreground;
  a.style.position = "relative";
  var d = a.bbox;
  if (d && d.w) {
    var e = sre.DomUtil.createElement("span"),
      f = parseFloat(a.style.paddingLeft || "0");
    e.style.backgroundColor = c.background;
    e.style.opacity = c.alphaback.toString();
    e.style.display = "inline-block";
    e.style.height = d.h + d.d + 0.1 + "em";
    e.style.verticalAlign = -d.d + "em";
    e.style.marginTop = e.style.marginBottom = "-0.05em";
    e.style.width = d.w + 0 + "em";
    e.style.marginLeft = f - 0 + "em";
    e.style.marginRight = -d.w - f + "em";
    a.parentNode.insertBefore(e, a);
    b.box = e;
  }
  return b;
};
sre.HtmlHighlighter.prototype.unhighlightNode = function (a) {
  var b = a.node;
  b.style.color = a.foreground;
  b.style.position = a.position;
  a.box && a.box.parentNode.removeChild(a.box);
};
sre.MmlCssHighlighter = function () {
  sre.CssHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.MmlCssHighlighter, sre.CssHighlighter);
sre.MmlCssHighlighter.prototype.getMactionNodes = function (a) {
  return a.getElementsByTagName(this.mactionName);
};
sre.MmlCssHighlighter.prototype.isMactionNode = function (a) {
  return a.tagName === this.mactionName;
};
sre.MmlHighlighter = function () {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.MmlHighlighter, sre.AbstractHighlighter);
sre.MmlHighlighter.prototype.highlightNode = function (a) {
  var b = a.getAttribute("style");
  b += ";background-color: " + this.colorString().background;
  b += ";color: " + this.colorString().foreground;
  a.setAttribute("style", b);
  return { node: a };
};
sre.MmlHighlighter.prototype.unhighlightNode = function (a) {
  var b = a.node.getAttribute("style");
  b = b.replace(";background-color: " + this.colorString().background, "");
  b = b.replace(";color: " + this.colorString().foreground, "");
  a.node.setAttribute("style", b);
};
sre.MmlHighlighter.prototype.colorString = function () {
  return this.color.rgba();
};
sre.MmlHighlighter.prototype.getMactionNodes = function (a) {
  return a.getElementsByTagName(this.mactionName);
};
sre.MmlHighlighter.prototype.isMactionNode = function (a) {
  return a.tagName === this.mactionName;
};
sre.SvgHighlighter = function () {
  sre.AbstractHighlighter.call(this);
  this.mactionName = "mjx-svg-maction";
};
goog.inherits(sre.SvgHighlighter, sre.AbstractHighlighter);
sre.SvgHighlighter.prototype.highlightNode = function (a) {
  if (this.isHighlighted(a))
    return {
      node: a.previousSibling || a,
      background: a.style.backgroundColor,
      foreground: a.style.color
    };
  if ("svg" === a.tagName) {
    var b = {
      node: a,
      background: a.style.backgroundColor,
      foreground: a.style.color
    };
    a.style.backgroundColor = this.colorString().background;
    a.style.color = this.colorString().foreground;
    return b;
  }
  b = sre.DomUtil.createElementNS("http://www.w3.org/2000/svg", "rect");
  if ("use" === a.nodeName) {
    var c = sre.DomUtil.createElementNS("http://www.w3.org/2000/svg", "g");
    a.parentNode.insertBefore(c, a);
    c.appendChild(a);
    var d = c.getBBox();
    c.parentNode.replaceChild(a, c);
  } else d = a.getBBox();
  b.setAttribute("x", d.x - 40);
  b.setAttribute("y", d.y - 40);
  b.setAttribute("width", d.width + 80);
  b.setAttribute("height", d.height + 80);
  (d = a.getAttribute("transform")) && b.setAttribute("transform", d);
  b.setAttribute("fill", this.colorString().background);
  b.setAttribute(sre.AbstractHighlighter.ATTR, !0);
  a.parentNode.insertBefore(b, a);
  b = { node: b, foreground: a.getAttribute("fill") };
  a.setAttribute("fill", this.colorString().foreground);
  return b;
};
sre.SvgHighlighter.prototype.setHighlighted = function (a) {
  "svg" === a.tagName &&
    sre.SvgHighlighter.superClass_.setHighlighted.call(this, a);
};
sre.SvgHighlighter.prototype.unhighlightNode = function (a) {
  "background" in a
    ? ((a.node.style.backgroundColor = a.background),
      (a.node.style.color = a.foreground))
    : (a.foreground
        ? a.node.nextSibling.setAttribute("fill", a.foreground)
        : a.node.nextSibling.removeAttribute("fill"),
      a.node.parentNode.removeChild(a.node));
};
sre.SvgHighlighter.prototype.isMactionNode = function (a) {
  a = a.className || a.getAttribute("class");
  return (a = void 0 !== a.baseVal ? a.baseVal : a)
    ? a.match(new RegExp(this.mactionName))
    : !1;
};
sre.SvgV3Highlighter = function () {
  sre.SvgHighlighter.call(this);
  this.mactionName = "maction";
};
goog.inherits(sre.SvgV3Highlighter, sre.SvgHighlighter);
sre.SvgV3Highlighter.prototype.highlightNode = function (a) {
  if (this.isHighlighted(a))
    return {
      node: a,
      background: this.colorString().background,
      foreground: this.colorString().foreground
    };
  if ("svg" === a.tagName || "MJX-CONTAINER" === a.tagName) {
    var b = {
      node: a,
      background: a.style.backgroundColor,
      foreground: a.style.color
    };
    a.style.backgroundColor = this.colorString().background;
    a.style.color = this.colorString().foreground;
    return b;
  }
  b = sre.DomUtil.createElementNS("http://www.w3.org/2000/svg", "rect");
  b.setAttribute("sre-highlighter-added", !0);
  var c = a.getBBox();
  b.setAttribute("x", c.x - 40);
  b.setAttribute("y", c.y - 40);
  b.setAttribute("width", c.width + 80);
  b.setAttribute("height", c.height + 80);
  (c = a.getAttribute("transform")) && b.setAttribute("transform", c);
  b.setAttribute("fill", this.colorString().background);
  a.setAttribute(sre.AbstractHighlighter.ATTR, !0);
  a.parentNode.insertBefore(b, a);
  b = { node: a, foreground: a.getAttribute("fill") };
  "rect" === a.nodeName
    ? ((c = new sre.ColorPicker({ alpha: 0, color: "black" })),
      a.setAttribute("fill", c.rgba().foreground))
    : a.setAttribute("fill", this.colorString().foreground);
  return b;
};
sre.SvgV3Highlighter.prototype.unhighlightNode = function (a) {
  var b = a.node.previousSibling;
  b && b.hasAttribute("sre-highlighter-added")
    ? (a.foreground
        ? a.node.setAttribute("fill", a.foreground)
        : a.node.removeAttribute("fill"),
      a.node.parentNode.removeChild(b))
    : ((a.node.style.backgroundColor = a.background),
      (a.node.style.color = a.foreground));
};
sre.SvgV3Highlighter.prototype.isMactionNode = function (a) {
  return a.getAttribute("data-mml-node") === this.mactionName;
};
sre.SvgV3Highlighter.prototype.getMactionNodes = function (a) {
  return sre.XpathUtil.evalXPath(
    './/*[@data-mml-node="' + this.mactionName + '"]',
    a
  );
};
sre.HighlighterFactory = {};
sre.HighlighterFactory.highlighter = function (a, b, c) {
  a = new sre.ColorPicker(a, b);
  c = new (sre.HighlighterFactory.highlighterMapping_[
    "NativeMML" === c.renderer && "Safari" === c.browser
      ? "MML-CSS"
      : "SVG" === c.renderer && "v3" === c.browser
      ? "SVG-V3"
      : c.renderer
  ] || sre.HighlighterFactory.highlighterMapping_.NativeMML)();
  c.setColor(a);
  return c;
};
sre.HighlighterFactory.addEvents = function (a, b, c) {
  (c = sre.HighlighterFactory.highlighterMapping_[c.renderer]) &&
    new c().addEvents(a, b);
};
sre.HighlighterFactory.highlighterMapping_ = {
  SVG: sre.SvgHighlighter,
  "SVG-V3": sre.SvgV3Highlighter,
  NativeMML: sre.MmlHighlighter,
  "HTML-CSS": sre.HtmlHighlighter,
  "MML-CSS": sre.MmlCssHighlighter,
  CommonHTML: sre.CssHighlighter,
  CHTML: sre.ChtmlHighlighter
};
sre.WalkerUtil = {};
sre.WalkerUtil.splitAttribute = function (a) {
  return a ? a.split(/,/) : [];
};
sre.WalkerUtil.getAttribute = function (a, b) {
  return sre.DomUtil.getDataAttribute(a, b);
};
sre.WalkerUtil.getSemanticRoot = function (a) {
  if (
    a.hasAttribute(sre.EnrichMathml.Attribute.TYPE) &&
    !a.hasAttribute(sre.EnrichMathml.Attribute.PARENT)
  )
    return a;
  for (
    var b = sre.DomUtil.querySelectorAllByAttr(
        a,
        sre.EnrichMathml.Attribute.TYPE
      ),
      c = 0,
      d;
    (d = b[c]);
    c++
  )
    if (!d.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) return d;
  return a;
};
sre.WalkerUtil.getBySemanticId = function (a, b) {
  return a.getAttribute(sre.EnrichMathml.Attribute.ID) === b
    ? a
    : sre.DomUtil.querySelectorAllByAttrValue(
        a,
        sre.EnrichMathml.Attribute.ID,
        b
      )[0];
};
sre.RebuildStree = function (a) {
  this.factory = new sre.SemanticNodeFactory();
  this.nodeDict = {};
  this.mathml = a;
  this.mmlRoot = sre.WalkerUtil.getSemanticRoot(a);
  this.streeRoot = this.assembleTree(this.mmlRoot);
  this.stree = sre.SemanticTree.fromNode(this.streeRoot, this.mathml);
  this.xml = this.stree.xml();
  sre.SemanticProcessor.getInstance().setNodeFactory(this.factory);
};
sre.RebuildStree.prototype.getTree = function () {
  return this.stree;
};
sre.RebuildStree.addAttributes = function (a, b, c) {
  c &&
    1 === b.childNodes.length &&
    b.childNodes[0].nodeType !== sre.DomUtil.NodeType.TEXT_NODE &&
    sre.SemanticUtil.addAttributes(a, b.childNodes[0]);
  sre.SemanticUtil.addAttributes(a, b);
};
sre.RebuildStree.prototype.assembleTree = function (a) {
  var b = this.makeNode(a),
    c = sre.WalkerUtil.splitAttribute(
      sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CHILDREN)
    ),
    d = sre.WalkerUtil.splitAttribute(
      sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CONTENT)
    );
  sre.RebuildStree.addAttributes(b, a, !(c.length || d.length));
  if (0 === d.length && 0 === c.length)
    return sre.RebuildStree.textContent(b, a), b;
  if (0 < d.length) {
    var e = sre.WalkerUtil.getBySemanticId(this.mathml, d[0]);
    e && sre.RebuildStree.textContent(b, e, !0);
  }
  e = function (f) {
    f = sre.WalkerUtil.getBySemanticId(this.mathml, f);
    f = this.assembleTree(f);
    f.parent = b;
    return f;
  };
  b.contentNodes = d.map(goog.bind(e, this));
  b.childNodes = c.map(goog.bind(e, this));
  return (a = sre.WalkerUtil.getAttribute(
    a,
    sre.EnrichMathml.Attribute.COLLAPSED
  ))
    ? this.postProcess(b, a)
    : b;
};
sre.RebuildStree.textContent = function (a, b, c) {
  !c && b.textContent
    ? (a.textContent = b.textContent)
    : ((b = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(b, sre.EnrichMathml.Attribute.OPERATOR)
      )),
      1 < b.length && (a.textContent = b[1]));
};
sre.RebuildStree.prototype.makeNode = function (a) {
  var b = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.TYPE),
    c = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ROLE),
    d = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.FONT),
    e =
      sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ANNOTATION) ||
      "",
    f = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ID),
    g = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.EMBELLISHED);
  a = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.FENCEPOINTER);
  f = this.createNode(parseInt(f, 10));
  f.type = b;
  f.role = c;
  f.font = d ? d : sre.SemanticAttr.Font.UNKNOWN;
  f.parseAnnotation(e);
  a && (f.fencePointer = a);
  g && (f.embellished = g);
  return f;
};
sre.RebuildStree.isPunctuated = function (a) {
  return (
    !sre.SemanticSkeleton.simpleCollapseStructure(a) &&
    a[1] &&
    sre.SemanticSkeleton.contentCollapseStructure(a[1])
  );
};
sre.RebuildStree.prototype.makePunctuation = function (a) {
  a = this.createNode(a);
  a.updateContent(sre.SemanticAttr.invisibleComma());
  a.role = sre.SemanticAttr.Role.DUMMY;
  return a;
};
sre.RebuildStree.prototype.makePunctuated = function (a, b, c) {
  var d = this.createNode(b[0]);
  d.type = sre.SemanticAttr.Type.PUNCTUATED;
  d.embellished = a.embellished;
  d.fencePointer = a.fencePointer;
  d.role = c;
  a = b.splice(1, 1)[0].slice(1);
  d.contentNodes = a.map(goog.bind(this.makePunctuation, this));
  this.collapsedChildren_(b);
};
sre.RebuildStree.prototype.makeEmpty = function (a, b, c) {
  b = this.createNode(b);
  b.type = sre.SemanticAttr.Type.EMPTY;
  b.embellished = a.embellished;
  b.fencePointer = a.fencePointer;
  b.role = c;
};
sre.RebuildStree.prototype.makeIndex = function (a, b, c) {
  sre.RebuildStree.isPunctuated(b)
    ? this.makePunctuated(a, b, c)
    : sre.SemanticSkeleton.simpleCollapseStructure(b) &&
      !this.nodeDict[b.toString()] &&
      this.makeEmpty(a, b, c);
};
sre.RebuildStree.prototype.postProcess = function (a, b) {
  b = sre.SemanticSkeleton.fromString(b).array;
  if (a.type === sre.SemanticAttr.Role.SUBSUP) {
    var c = this.createNode(b[1][0]);
    c.type = sre.SemanticAttr.Type.SUBSCRIPT;
    c.role = sre.SemanticAttr.Role.SUBSUP;
    a.type = sre.SemanticAttr.Type.SUPERSCRIPT;
    c.embellished = a.embellished;
    c.fencePointer = a.fencePointer;
    this.makeIndex(a, b[1][2], sre.SemanticAttr.Role.RIGHTSUB);
    this.makeIndex(a, b[2], sre.SemanticAttr.Role.RIGHTSUPER);
    this.collapsedChildren_(b);
    return a;
  }
  if (a.type === sre.SemanticAttr.Type.SUBSCRIPT)
    return (
      this.makeIndex(a, b[2], sre.SemanticAttr.Role.RIGHTSUB),
      this.collapsedChildren_(b),
      a
    );
  if (a.type === sre.SemanticAttr.Type.SUPERSCRIPT)
    return (
      this.makeIndex(a, b[2], sre.SemanticAttr.Role.RIGHTSUPER),
      this.collapsedChildren_(b),
      a
    );
  if (a.type === sre.SemanticAttr.Type.TENSOR)
    return (
      this.makeIndex(a, b[2], sre.SemanticAttr.Role.LEFTSUB),
      this.makeIndex(a, b[3], sre.SemanticAttr.Role.LEFTSUPER),
      this.makeIndex(a, b[4], sre.SemanticAttr.Role.RIGHTSUB),
      this.makeIndex(a, b[5], sre.SemanticAttr.Role.RIGHTSUPER),
      this.collapsedChildren_(b),
      a
    );
  if (a.type === sre.SemanticAttr.Type.PUNCTUATED)
    return (
      sre.RebuildStree.isPunctuated(b) &&
        ((b = b.splice(1, 1)[0].slice(1)),
        (a.contentNodes = b.map(goog.bind(this.makePunctuation, this)))),
      a
    );
  a.type === sre.SemanticAttr.Role.UNDEROVER &&
    ((c = this.createNode(b[1][0])),
    a.childNodes[1].role === sre.SemanticAttr.Role.OVERACCENT
      ? ((c.type = sre.SemanticAttr.Type.OVERSCORE),
        (a.type = sre.SemanticAttr.Type.UNDERSCORE))
      : ((c.type = sre.SemanticAttr.Type.UNDERSCORE),
        (a.type = sre.SemanticAttr.Type.OVERSCORE)),
    (c.role = sre.SemanticAttr.Role.UNDEROVER),
    (c.embellished = a.embellished),
    (c.fencePointer = a.fencePointer),
    this.collapsedChildren_(b));
  return a;
};
sre.RebuildStree.prototype.createNode = function (a) {
  var b = this.factory.makeNode(a);
  return (this.nodeDict[a.toString()] = b);
};
sre.RebuildStree.prototype.collapsedChildren_ = function (a) {
  var b = goog.bind(function (c) {
    var d = this.nodeDict[c[0]];
    d.childNodes = [];
    for (var e = 1, f = c.length; e < f; e++) {
      var g = c[e];
      d.childNodes.push(
        sre.SemanticSkeleton.simpleCollapseStructure(g)
          ? this.nodeDict[g]
          : b(g)
      );
    }
    return d;
  }, this);
  b(a);
};
sre.SpeechGenerator = function () {};
sre.SpeechGenerator.prototype.getSpeech = function (a, b) {};
sre.SpeechGenerator.prototype.getRebuilt = function () {};
sre.SpeechGenerator.prototype.setRebuilt = function (a) {};
sre.SpeechGenerator.prototype.setOptions = function (a) {};
sre.SpeechGenerator.prototype.getOptions = function () {};
sre.SpeechGenerator.prototype.start = function () {};
sre.SpeechGenerator.prototype.end = function () {};
sre.AudioUtil = {};
sre.AudioUtil.mergePause = function (a, b, c) {
  return a ? { pause: sre.AudioUtil.mergePause_(a.pause, b.pause, c) } : b;
};
sre.AudioUtil.mergePause_ = function (a, b, c) {
  return (
    c ||
    function (d, e) {
      return "number" === typeof d || "number" === typeof e
        ? d + e
        : "number" === typeof d
        ? e
        : "number" === typeof e
        ? d
        : [a, b].sort()[0];
    }
  ).call(null, a, b);
};
sre.AudioUtil.mergeMarkup = function (a, b) {
  delete a.open;
  b.close.forEach(function (d) {
    delete a[d];
  });
  b.open.forEach(function (d) {
    a[d] = b[d];
  });
  var c = Object.keys(a);
  a.open = c;
};
sre.AudioUtil.sortClose = function (a, b) {
  if (1 >= a.length) return a;
  for (var c = [], d = 0, e; (e = b[d]), a.length; d++)
    e.close &&
      e.close.length &&
      e.close.forEach(function (f) {
        var g = a.indexOf(f);
        -1 !== g && (c.unshift(f), a.splice(g, 1));
      });
  return c;
};
sre.AudioUtil.PersonalityRanges_ = {};
sre.AudioUtil.LastOpen_ = [];
sre.AudioUtil.personalityMarkup = function (a) {
  sre.AudioUtil.PersonalityRanges_ = {};
  sre.AudioUtil.LastOpen_ = [];
  for (var b = [], c = {}, d = 0, e; (e = a[d]); d++) {
    var f = null,
      g = e.descriptionSpan(),
      h = e.personality;
    e = h[sre.Engine.personalityProps.JOIN];
    delete h[sre.Engine.personalityProps.JOIN];
    "undefined" !== typeof h[sre.Engine.personalityProps.PAUSE] &&
      ((f = {}),
      (f[sre.Engine.personalityProps.PAUSE] =
        h[sre.Engine.personalityProps.PAUSE]),
      delete h[sre.Engine.personalityProps.PAUSE]);
    h = sre.AudioUtil.personalityDiff_(h, c);
    sre.AudioUtil.appendMarkup_(b, g, h, e, f, !0);
  }
  b = b.concat(sre.AudioUtil.finaliseMarkup_());
  return (b = sre.AudioUtil.simplifyMarkup_(b));
};
sre.AudioUtil.appendElement_ = function (a, b) {
  var c = a[a.length - 1];
  if (c)
    if (sre.AudioUtil.isSpanElement(b) && sre.AudioUtil.isSpanElement(c))
      if ("undefined" === typeof c.join) c.span = c.span.concat(b.span);
      else {
        a = c.span.pop();
        var d = b.span.shift();
        c.span.push(a + c.join + d);
        c.span = c.span.concat(b.span);
        c.join = b.join;
      }
    else
      sre.AudioUtil.isPauseElement(b) && sre.AudioUtil.isPauseElement(c)
        ? (c.pause = sre.AudioUtil.mergePause_(c.pause, b.pause))
        : a.push(b);
  else a.push(b);
};
sre.AudioUtil.simplifyMarkup_ = function (a) {
  for (var b = {}, c = [], d = 0, e; (e = a[d]); d++)
    if (sre.AudioUtil.isMarkupElement(e))
      if (!e.close || 1 !== e.close.length || e.open.length)
        sre.AudioUtil.copyValues_(e, b), c.push(e);
      else {
        var f = a[d + 1];
        if (!f || sre.AudioUtil.isSpanElement(f))
          sre.AudioUtil.copyValues_(e, b), c.push(e);
        else {
          var g = sre.AudioUtil.isPauseElement(f) ? f : null;
          g && (f = a[d + 2]);
          f &&
          sre.AudioUtil.isMarkupElement(f) &&
          f.open[0] === e.close[0] &&
          !f.close.length &&
          f[f.open[0]] === b[f.open[0]]
            ? g
              ? (sre.AudioUtil.appendElement_(c, g), (d += 2))
              : (d += 1)
            : (sre.AudioUtil.copyValues_(e, b), c.push(e));
        }
      }
    else sre.AudioUtil.appendElement_(c, e);
  return c;
};
sre.AudioUtil.copyValues_ = function (a, b) {
  a.rate && (b.rate = a.rate);
  a.pitch && (b.pitch = a.pitch);
  a.volume && (b.volume = a.volume);
};
sre.AudioUtil.finaliseMarkup_ = function () {
  for (var a = [], b = sre.AudioUtil.LastOpen_.length - 1; 0 <= b; b--) {
    var c = sre.AudioUtil.LastOpen_[b];
    if (c.length) {
      for (var d = { open: [], close: [] }, e = 0; e < c.length; e++) {
        var f = c[e];
        d.close.push(f);
        d[f] = 0;
      }
      a.push(d);
    }
  }
  return a;
};
sre.AudioUtil.isMarkupElement = function (a) {
  return "object" === typeof a && a.open;
};
sre.AudioUtil.isPauseElement = function (a) {
  return (
    "object" === typeof a &&
    1 === Object.keys(a).length &&
    Object.keys(a)[0] === sre.Engine.personalityProps.PAUSE
  );
};
sre.AudioUtil.isSpanElement = function (a) {
  var b = Object.keys(a);
  return (
    "object" === typeof a &&
    ((1 === b.length && "span" === b[0]) ||
      (2 === b.length &&
        (("span" === b[0] && "join" === b[1]) ||
          ("span" === b[1] && "join" === b[0]))))
  );
};
sre.AudioUtil.appendMarkup_ = function (a, b, c, d, e, f) {
  if (f) {
    if ((f = a[a.length - 1])) var g = f[sre.Engine.personalityProps.JOIN];
    if (f && !b.string && e && sre.AudioUtil.isPauseElement(f)) {
      var h = sre.Engine.personalityProps.PAUSE;
      f[h] = sre.AudioUtil.mergePause_(f[h], e[h]);
      e = null;
    }
    f &&
      b.string &&
      0 === Object.keys(c).length &&
      sre.AudioUtil.isSpanElement(f) &&
      ("undefined" !== typeof g &&
        ((h = f.span.pop()),
        (b = new sre.Span(h.string + g + b.string, h.attributes))),
      f.span.push(b),
      (b = new sre.Span("", {})),
      (f[sre.Engine.personalityProps.JOIN] = d));
  }
  0 !== Object.keys(c).length && a.push(c);
  b.string && a.push({ span: [b], join: d });
  e && a.push(e);
};
sre.AudioUtil.personalityDiff_ = function (a, b) {
  if (!b) return a;
  var c = {};
  for (h in sre.Engine.personalityProps) {
    var d = sre.Engine.personalityProps[h],
      e = a[d],
      f = b[d];
    if (!((!e && !f) || (e && f && e === f))) {
      var g = e || 0;
      sre.AudioUtil.isMarkupElement(c) || ((c.open = []), (c.close = []));
      e || c.close.push(d);
      f || c.open.push(d);
      f && e && (c.close.push(d), c.open.push(d));
      b[d] = g;
      c[d] = g;
      sre.AudioUtil.PersonalityRanges_[d]
        ? sre.AudioUtil.PersonalityRanges_[d].push(g)
        : (sre.AudioUtil.PersonalityRanges_[d] = [g]);
    }
  }
  if (sre.AudioUtil.isMarkupElement(c)) {
    for (a = c.close.slice(); 0 < a.length; ) {
      var h = sre.AudioUtil.LastOpen_.pop();
      d = sre.BaseUtil.setdifference(h, a);
      a = sre.BaseUtil.setdifference(a, h);
      h = d;
      if (0 === a.length) 0 !== h.length && sre.AudioUtil.LastOpen_.push(h);
      else if (0 !== h.length)
        for (
          c.close = c.close.concat(h), c.open = c.open.concat(h), d = 0;
          (e = h[d]);
          d++
        )
          c[e] = b[e];
    }
    sre.AudioUtil.LastOpen_.push(c.open);
  }
  return c;
};
sre.AudioRenderer = function () {};
sre.AudioRenderer.prototype.setSeparator = function (a) {};
sre.AudioRenderer.prototype.getSeparator = function () {};
sre.AudioRenderer.prototype.markup = function (a) {};
sre.AudioRenderer.prototype.error = function (a) {};
sre.AudioRenderer.prototype.merge = function (a) {};
sre.AudioRenderer.prototype.finalize = function (a) {};
sre.AbstractAudioRenderer = function () {
  this.separator_ = " ";
};
sre.AbstractAudioRenderer.prototype.setSeparator = function (a) {
  this.separator_ = a;
};
sre.AbstractAudioRenderer.prototype.getSeparator = function () {
  return "braille" === sre.Engine.getInstance().modality ? "" : this.separator_;
};
sre.AbstractAudioRenderer.prototype.markup = goog.abstractMethod;
sre.AbstractAudioRenderer.prototype.error = function (a) {
  return null;
};
sre.AbstractAudioRenderer.prototype.merge = function (a) {
  for (var b = "", c = a.length - 1, d = 0, e; (e = a[d]); d++)
    (b += e.string),
      d < c &&
        ((e = e.attributes.separator),
        (b += void 0 !== e ? e : this.getSeparator()));
  return b;
};
sre.AbstractAudioRenderer.prototype.finalize = function (a) {
  return a;
};
sre.AbstractAudioRenderer.prototype.pauseValue = function (a) {
  switch (a) {
    case "long":
      a = 750;
      break;
    case "medium":
      a = 500;
      break;
    case "short":
      a = 250;
      break;
    default:
      a = parseInt(a, 10);
  }
  return Math.floor(
    (a * parseInt(sre.Engine.getInstance().getRate(), 10)) / 100
  );
};
sre.MarkupRenderer = function () {
  sre.AbstractAudioRenderer.call(this);
  this.scaleFunction_ = null;
};
goog.inherits(sre.MarkupRenderer, sre.AbstractAudioRenderer);
sre.MarkupRenderer.prototype.setScaleFunction = function (a, b, c, d, e) {
  var f = e || 0;
  this.scaleFunction_ = function (g) {
    g = (g - a) / (b - a);
    return +(Math.round(c * (1 - g) + d * g + "e+" + f) + "e-" + f);
  };
};
sre.MarkupRenderer.prototype.applyScaleFunction = function (a) {
  return this.scaleFunction_ ? this.scaleFunction_(a) : a;
};
sre.MarkupRenderer.prototype.pause = goog.abstractMethod;
sre.MarkupRenderer.prototype.prosodyElement = goog.abstractMethod;
sre.AcssRenderer = function () {
  sre.MarkupRenderer.call(this);
};
goog.inherits(sre.AcssRenderer, sre.MarkupRenderer);
sre.AcssRenderer.prototype.markup = function (a) {
  this.setScaleFunction(-2, 2, 0, 10, 0);
  a = sre.AudioUtil.personalityMarkup(a);
  for (
    var b = [], c = { open: [] }, d = null, e = !1, f = 0, g;
    (g = a[f]);
    f++
  )
    if (sre.AudioUtil.isMarkupElement(g)) sre.AudioUtil.mergeMarkup(c, g);
    else if (sre.AudioUtil.isPauseElement(g))
      e && (d = sre.AudioUtil.mergePause(d, g, Math.max));
    else {
      g = '"' + this.merge(g.span) + '"';
      e = !0;
      d && (b.push(this.pause(d)), (d = null));
      var h = this.prosody_(c);
      b.push(h ? "(text (" + h + ") " + g + ")" : g);
    }
  return "(exp " + b.join(" ") + ")";
};
sre.AcssRenderer.prototype.error = function (a) {
  return '(error "' + sre.EventUtil.Move[a.toString()] + '")';
};
sre.AcssRenderer.prototype.prosody_ = function (a) {
  for (var b = a.open, c = [], d = 0, e; (e = b[d]); d++)
    c.push(this.prosodyElement(e, a[e]));
  return c.join(" ");
};
sre.AcssRenderer.prototype.prosodyElement = function (a, b) {
  b = this.applyScaleFunction(b);
  switch (a) {
    case sre.Engine.personalityProps.RATE:
      return "(richness . " + b + ")";
    case sre.Engine.personalityProps.PITCH:
      return "(average-pitch . " + b + ")";
    case sre.Engine.personalityProps.VOLUME:
      return "(stress . " + b + ")";
  }
  return "(value . " + b + ")";
};
sre.AcssRenderer.prototype.pause = function (a) {
  return (
    "(pause . " + this.pauseValue(a[sre.Engine.personalityProps.PAUSE]) + ")"
  );
};
sre.PunctuationRenderer = function () {
  sre.AbstractAudioRenderer.call(this);
};
goog.inherits(sre.PunctuationRenderer, sre.AbstractAudioRenderer);
sre.PunctuationRenderer.prototype.markup = function (a) {
  a = sre.AudioUtil.personalityMarkup(a);
  for (var b = "", c = null, d = !1, e = 0, f; (f = a[e]); e++)
    sre.AudioUtil.isMarkupElement(f) ||
      (sre.AudioUtil.isPauseElement(f)
        ? d && (c = sre.AudioUtil.mergePause(c, f, Math.max))
        : (c &&
            ((b += this.pause(c[sre.Engine.personalityProps.PAUSE])),
            (c = null)),
          (b += (d ? this.getSeparator() : "") + this.merge(f.span)),
          (d = !0)));
  return b;
};
sre.PunctuationRenderer.PAUSE_PUNCTUATION_ = {
  short: ",",
  medium: ";",
  long: "."
};
sre.PunctuationRenderer.prototype.pause = function (a) {
  return (
    sre.PunctuationRenderer.PAUSE_PUNCTUATION_[
      "number" === typeof a
        ? 250 >= a
          ? "short"
          : 500 >= a
          ? "medium"
          : "long"
        : a
    ] || ""
  );
};
sre.XmlRenderer = function () {
  sre.MarkupRenderer.call(this);
};
goog.inherits(sre.XmlRenderer, sre.MarkupRenderer);
sre.XmlRenderer.prototype.markup = function (a) {
  this.setScaleFunction(-2, 2, -100, 100, 2);
  a = sre.AudioUtil.personalityMarkup(a);
  for (var b = [], c = [], d = 0, e; (e = a[d]); d++)
    if (e.span) b.push(this.merge(e.span));
    else if (sre.AudioUtil.isPauseElement(e)) b.push(this.pause(e));
    else {
      if (e.close.length)
        for (var f = 0; f < e.close.length; f++) {
          var g = c.pop();
          if (-1 === e.close.indexOf(g))
            throw new sre.Engine.Error("Unknown closing markup element: " + g);
          b.push(this.closeTag(g));
        }
      e.open.length &&
        sre.AudioUtil.sortClose(e.open.slice(), a.slice(d + 1)).forEach(
          goog.bind(function (h) {
            b.push(this.prosodyElement(h, e[h]));
            c.push(h);
          }, this)
        );
    }
  return b.join(" ");
};
sre.XmlRenderer.prototype.closeTag = goog.abstractMethod;
sre.SableRenderer = function () {
  sre.XmlRenderer.call(this);
};
goog.inherits(sre.SableRenderer, sre.XmlRenderer);
sre.SableRenderer.prototype.finalize = function (a) {
  return (
    '<?xml version="1.0"?><!DOCTYPE SABLE PUBLIC "-//SABLE//DTD SABLE speech mark up//EN" "Sable.v0_2.dtd" []><SABLE>' +
    this.getSeparator() +
    a +
    this.getSeparator() +
    "</SABLE>"
  );
};
sre.SableRenderer.prototype.pause = function (a) {
  return (
    '<BREAK MSEC="' +
    this.pauseValue(a[sre.Engine.personalityProps.PAUSE]) +
    '"/>'
  );
};
sre.SableRenderer.prototype.prosodyElement = function (a, b) {
  b = this.applyScaleFunction(b);
  switch (a) {
    case sre.Engine.personalityProps.PITCH:
      return '<PITCH RANGE="' + b + '%">';
    case sre.Engine.personalityProps.RATE:
      return '<RATE SPEED="' + b + '%">';
    case sre.Engine.personalityProps.VOLUME:
      return '<VOLUME LEVEL="' + b + '%">';
    default:
      return "<" + a.toUpperCase() + ' VALUE="' + b + '">';
  }
};
sre.SableRenderer.prototype.closeTag = function (a) {
  return "</" + a.toUpperCase() + ">";
};
sre.SsmlRenderer = function () {
  sre.XmlRenderer.call(this);
};
goog.inherits(sre.SsmlRenderer, sre.XmlRenderer);
sre.SsmlRenderer.prototype.finalize = function (a) {
  return (
    '<?xml version="1.0"?><speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis"><prosody rate="' +
    sre.Engine.getInstance().getRate() +
    '%">' +
    this.getSeparator() +
    a +
    this.getSeparator() +
    "</prosody></speak>"
  );
};
sre.SsmlRenderer.prototype.pause = function (a) {
  return (
    '<break time="' +
    this.pauseValue(a[sre.Engine.personalityProps.PAUSE]) +
    'ms"/>'
  );
};
sre.SsmlRenderer.prototype.prosodyElement = function (a, b) {
  b = Math.floor(this.applyScaleFunction(b));
  b = 0 > b ? b.toString() : "+" + b.toString();
  return (
    "<prosody " +
    a.toLowerCase() +
    '="' +
    b +
    (a === sre.Engine.personalityProps.VOLUME ? ">" : '%">')
  );
};
sre.SsmlRenderer.prototype.closeTag = function (a) {
  return "</prosody>";
};
sre.SsmlStepRenderer = function () {
  sre.SsmlRenderer.call(this);
};
goog.inherits(sre.SsmlStepRenderer, sre.SsmlRenderer);
sre.SsmlStepRenderer.prototype.markup = function (a) {
  sre.SsmlStepRenderer.MARKS = {};
  return sre.SsmlStepRenderer.superClass_.markup.call(this, a);
};
sre.SsmlStepRenderer.CHARACTER_ATTR_ = "character";
sre.SsmlStepRenderer.MARKS = {};
sre.SsmlStepRenderer.prototype.merge = function (a) {
  for (var b = [], c = 0; c < a.length; c++) {
    var d = a[c],
      e = d.attributes.extid;
    e &&
      !sre.SsmlStepRenderer.MARKS[e] &&
      (b.push('<mark name="' + e + '"/>'),
      (sre.SsmlStepRenderer.MARKS[e] = !0));
    1 === d.string.length && d.string.match(/[a-zA-Z]/)
      ? b.push(
          '<say-as interpret-as="' +
            sre.SsmlStepRenderer.CHARACTER_ATTR_ +
            '">' +
            d.string +
            "</say-as>"
        )
      : b.push(d.string);
  }
  return b.join(this.getSeparator());
};
sre.StringRenderer = function () {
  sre.AbstractAudioRenderer.call(this);
};
goog.inherits(sre.StringRenderer, sre.AbstractAudioRenderer);
sre.StringRenderer.prototype.markup = function (a) {
  var b = "";
  a = sre.AudioUtil.personalityMarkup(a).filter(function (f) {
    return f.span;
  });
  if (!a.length) return b;
  for (var c = a.length - 1, d = 0, e; (e = a[d]); d++)
    e.span && (b += this.merge(e.span)),
      d >= c ||
        ((e = e.join),
        (b += "undefined" === typeof e ? this.getSeparator() : e));
  return b;
};
sre.AuralRendering = function () {};
goog.addSingletonGetter(sre.AuralRendering);
sre.AuralRendering.prototype.setSeparator = function (a) {
  var b = sre.AuralRendering.rendererMapping_[sre.Engine.getInstance().markup];
  b && b.setSeparator(a);
};
sre.AuralRendering.prototype.getSeparator = function () {
  var a = sre.AuralRendering.rendererMapping_[sre.Engine.getInstance().markup];
  return a ? a.getSeparator() : "";
};
sre.AuralRendering.prototype.markup = function (a) {
  var b = sre.AuralRendering.rendererMapping_[sre.Engine.getInstance().markup];
  return b ? b.markup(a) : "";
};
sre.AuralRendering.prototype.merge = function (a) {
  var b = a.map(function (d) {
      return { string: d, attributes: {} };
    }),
    c = sre.AuralRendering.rendererMapping_[sre.Engine.getInstance().markup];
  return c ? c.merge(b) : a.join();
};
sre.AuralRendering.prototype.finalize = function (a) {
  var b = sre.AuralRendering.rendererMapping_[sre.Engine.getInstance().markup];
  return b ? b.finalize(a) : a;
};
sre.AuralRendering.prototype.error = function (a) {
  var b = sre.AuralRendering.rendererMapping_[sre.Engine.getInstance().markup];
  return b ? b.error(a) : "";
};
sre.AuralRendering.registerRenderer = function (a, b) {
  sre.AuralRendering.rendererMapping_[a] = b;
};
sre.AuralRendering.ofType = function (a) {
  return (
    sre.AuralRendering.rendererMapping_[
      sre.Engine.getInstance().markup
    ] instanceof a
  );
};
sre.AuralRendering.rendererMapping_ = {};
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.NONE,
  new sre.StringRenderer()
);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.PUNCTUATION,
  new sre.PunctuationRenderer()
);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.ACSS,
  new sre.AcssRenderer()
);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.SABLE,
  new sre.SableRenderer()
);
sre.AuralRendering.xmlInstance = new sre.SsmlRenderer();
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.VOICEXML,
  sre.AuralRendering.xmlInstance
);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.SSML,
  sre.AuralRendering.xmlInstance
);
sre.AuralRendering.registerRenderer(
  sre.Engine.Markup.SSML_STEP,
  new sre.SsmlStepRenderer()
);
sre.AuditoryDescription = function (a) {
  this.context = a.context || "";
  this.text = a.text || "";
  this.userValue = a.userValue || "";
  this.annotation = a.annotation || "";
  this.attributes = a.attributes || {};
  this.personality = a.personality || {};
};
sre.AuditoryDescription.create = function (a, b) {
  a.text = sre.Grammar.getInstance().apply(a.text, b || {});
  return new sre.AuditoryDescription(a);
};
sre.AuditoryDescription.prototype.isEmpty = function () {
  return (
    0 == this.context.length &&
    0 == this.text.length &&
    0 == this.userValue.length &&
    0 == this.annotation.length
  );
};
sre.AuditoryDescription.prototype.clone = function () {
  if (this.personality) {
    var a = {};
    for (var b in this.personality) a[b] = this.personality[b];
  }
  if (this.attributes) {
    var c = {};
    for (b in this.attributes) c[b] = this.attributes[b];
  }
  return new sre.AuditoryDescription({
    context: this.context,
    text: this.text,
    userValue: this.userValue,
    annotation: this.annotation,
    personality: a,
    attributes: c
  });
};
sre.AuditoryDescription.prototype.toString = function () {
  return (
    'AuditoryDescription(context="' +
    this.context +
    '"  text="' +
    this.text +
    '"  userValue="' +
    this.userValue +
    '"  annotation="' +
    this.annotation +
    '")'
  );
};
sre.AuditoryDescription.prototype.descriptionString = function () {
  return this.context && this.text
    ? this.context + " " + this.text
    : this.context || this.text;
};
sre.AuditoryDescription.prototype.descriptionSpan = function () {
  return new sre.Span(this.descriptionString(), this.attributes);
};
sre.AuditoryDescription.prototype.equals = function (a) {
  return (
    this.context == a.context &&
    this.text == a.text &&
    this.userValue == a.userValue &&
    this.annotation == a.annotation
  );
};
sre.SpeechRule = function (a, b, c, d) {
  this.name = a;
  this.dynamicCstr = b;
  this.precondition = c;
  this.action = d;
  this.context = null;
};
sre.SpeechRule.prototype.toString = function () {
  return (
    this.name +
    " | " +
    this.dynamicCstr.toString() +
    " | " +
    this.precondition.toString() +
    " ==> " +
    this.action.toString()
  );
};
sre.SpeechRule.Type = {
  NODE: "NODE",
  MULTI: "MULTI",
  TEXT: "TEXT",
  PERSONALITY: "PERSONALITY"
};
sre.SpeechRule.Type.fromString = function (a) {
  switch (a) {
    case "[n]":
      return sre.SpeechRule.Type.NODE;
    case "[m]":
      return sre.SpeechRule.Type.MULTI;
    case "[t]":
      return sre.SpeechRule.Type.TEXT;
    case "[p]":
      return sre.SpeechRule.Type.PERSONALITY;
    default:
      throw "Parse error: " + a;
  }
};
sre.SpeechRule.Type.toString = function (a) {
  switch (a) {
    case sre.SpeechRule.Type.NODE:
      return "[n]";
    case sre.SpeechRule.Type.MULTI:
      return "[m]";
    case sre.SpeechRule.Type.TEXT:
      return "[t]";
    case sre.SpeechRule.Type.PERSONALITY:
      return "[p]";
    default:
      throw "Unknown type error: " + a;
  }
};
sre.SpeechRule.Component = function (a) {
  this.type = a.type;
  this.content = a.content;
  this.attributes = a.attributes;
  this.grammar = a.grammar;
};
sre.SpeechRule.Component.fromString = function (a) {
  var b = {};
  b.type = sre.SpeechRule.Type.fromString(a.substring(0, 3));
  a = a.slice(3).trim();
  if (!a) throw new sre.SpeechRule.OutputError("Missing content.");
  switch (b.type) {
    case sre.SpeechRule.Type.TEXT:
      if ('"' == a[0]) {
        var c = sre.SpeechRule.splitString_(a, "\\(")[0].trim();
        if ('"' != c.slice(-1))
          throw new sre.SpeechRule.OutputError("Invalid string syntax.");
        b.content = c;
        a = a.slice(c.length).trim();
        -1 == a.indexOf("(") && (a = "");
        break;
      }
    case sre.SpeechRule.Type.NODE:
    case sre.SpeechRule.Type.MULTI:
      (c = a.indexOf(" (")),
        -1 == c
          ? ((b.content = a.trim()), (a = ""))
          : ((b.content = a.substring(0, c).trim()), (a = a.slice(c).trim()));
  }
  a &&
    ((a = sre.SpeechRule.Component.attributesFromString(a)),
    a.grammar && ((b.grammar = a.grammar), delete a.grammar),
    Object.keys(a).length && (b.attributes = a));
  return (b = new sre.SpeechRule.Component(b));
};
sre.SpeechRule.Component.prototype.toString = function () {
  var a = "" + sre.SpeechRule.Type.toString(this.type);
  a += this.content ? " " + this.content : "";
  var b = this.attributesToString();
  return a + (b ? " " + b : "");
};
sre.SpeechRule.Component.grammarFromString = function (a) {
  return sre.Grammar.parseInput(a);
};
sre.SpeechRule.Component.prototype.grammarToString = function () {
  return this.getGrammar().join(":");
};
sre.SpeechRule.Component.prototype.getGrammar = function () {
  var a = [],
    b;
  for (b in this.grammar)
    !0 === this.grammar[b]
      ? a.push(b)
      : !1 === this.grammar[b]
      ? a.push("!" + b)
      : a.push(b + "=" + this.grammar[b]);
  return a;
};
sre.SpeechRule.Component.attributesFromString = function (a) {
  if ("(" != a[0] || ")" != a.slice(-1))
    throw new sre.SpeechRule.OutputError("Invalid attribute expression: " + a);
  var b = {};
  a = sre.SpeechRule.splitString_(a.slice(1, -1), ",");
  for (var c = 0, d = a.length; c < d; c++) {
    var e = a[c],
      f = e.indexOf(":");
    if (-1 == f) b[e.trim()] = "true";
    else {
      var g = e.substring(0, f).trim();
      e = e.slice(f + 1).trim();
      b[g] =
        "grammar" === g
          ? sre.SpeechRule.Component.grammarFromString(e)
          : (b[g] = e);
    }
  }
  return b;
};
sre.SpeechRule.Component.prototype.attributesToString = function () {
  var a = this.getAttributes(),
    b = this.grammarToString();
  b && a.push("grammar:" + b);
  return 0 < a.length ? "(" + a.join(", ") + ")" : "";
};
sre.SpeechRule.Component.prototype.getAttributes = function () {
  var a = [],
    b;
  for (b in this.attributes) {
    var c = this.attributes[b];
    "true" === c ? a.push(b) : a.push(b + ":" + c);
  }
  return a;
};
sre.SpeechRule.Action = function (a) {
  this.components = a;
};
sre.SpeechRule.Action.fromString = function (a) {
  a = sre.SpeechRule.splitString_(a, ";")
    .filter(function (f) {
      return f.match(/\S/);
    })
    .map(function (f) {
      return f.trim();
    });
  for (var b = [], c = 0, d = a.length; c < d; c++) {
    var e = sre.SpeechRule.Component.fromString(a[c]);
    e && b.push(e);
  }
  return new sre.SpeechRule.Action(b);
};
sre.SpeechRule.Action.prototype.toString = function () {
  return this.components
    .map(function (a) {
      return a.toString();
    })
    .join("; ");
};
sre.SpeechRule.Precondition = function (a, b) {
  this.query = a;
  this.constraints = b || [];
  this.priority = this.calculatePriority_();
};
sre.SpeechRule.Precondition.prototype.calculatePriority_ = function () {
  var a = sre.SpeechRule.Precondition.constraintValue_(
    this.query,
    sre.SpeechRule.Precondition.queryPriorities_
  );
  if (!a) return 0;
  var b = this.query.match(/^self::.+\[(.+)\]/)[1];
  b = sre.SpeechRule.Precondition.constraintValue_(
    b,
    sre.SpeechRule.Precondition.attributePriorities_
  );
  return 100 * a + 10 * b;
};
sre.SpeechRule.Precondition.queryPriorities_ = [
  /^self::\*\[.+\]$/,
  /^self::[\w-]+\[.+\]$/
];
sre.SpeechRule.Precondition.attributePriorities_ = [
  /^@[\w-]+$/,
  /^@[\w-]+!=".+"$/,
  /^not\(contains\(@[\w-]+,\s*".+"\)\)$/,
  /^contains\(@[\w-]+,".+"\)$/,
  /^@[\w-]+=".+"$/
];
sre.SpeechRule.Precondition.constraintValue_ = function (a, b) {
  for (var c = 0, d; (d = b[c]); c++) if (a.match(d)) return ++c;
  return 0;
};
sre.SpeechRule.Precondition.prototype.toString = function () {
  var a = this.constraints.join(", ");
  return this.query + ", " + a + " (" + this.priority + ")";
};
sre.SpeechRule.splitString_ = function (a, b) {
  for (var c = [], d = ""; "" != a; ) {
    var e = a.search(b);
    if (-1 == e) {
      if (0 != (a.match(/"/g) || []).length % 2)
        throw new sre.SpeechRule.OutputError(
          "Invalid string in expression: " + a
        );
      c.push(d + a);
      a = d = "";
    } else if (0 == (a.substring(0, e).match(/"/g) || []).length % 2)
      c.push(d + a.substring(0, e)), (d = ""), (a = a.substring(e + 1));
    else {
      var f = a.substring(e).search('"');
      if (-1 == f)
        throw new sre.SpeechRule.OutputError(
          "Invalid string in expression: " + a
        );
      d += a.substring(0, e + f + 1);
      a = a.substring(e + f + 1);
    }
  }
  d && c.push(d);
  return c;
};
sre.SpeechRule.OutputError = function (a) {
  sre.Engine.Error.call(this, a);
  this.name = "RuleError";
};
goog.inherits(sre.SpeechRule.OutputError, sre.Engine.Error);
sre.SpeechRuleFunctions = function () {};
sre.SpeechRuleFunctions.Store_ = function (a, b) {
  this.prefix_ = a;
  this.store_ = b;
};
sre.SpeechRuleFunctions.Store_.prototype.add = function (a, b) {
  this.checkCustomFunctionSyntax_(a) && (this.store_[a] = b);
};
sre.SpeechRuleFunctions.Store_.prototype.addStore = function (a) {
  for (var b = Object.keys(a.store_), c = 0, d; (d = b[c]); c++)
    this.add(d, a.store_[d]);
};
sre.SpeechRuleFunctions.Store_.prototype.lookup = function (a) {
  return this.store_[a];
};
sre.SpeechRuleFunctions.CustomQueries = function () {
  sre.SpeechRuleFunctions.Store_.call(this, "CQF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.CustomQueries,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.CustomStrings = function () {
  sre.SpeechRuleFunctions.Store_.call(this, "CSF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.CustomStrings,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.ContextFunctions = function () {
  sre.SpeechRuleFunctions.Store_.call(this, "CTF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.ContextFunctions,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.CustomGenerators = function () {
  sre.SpeechRuleFunctions.Store_.call(this, "CGF", {});
};
goog.inherits(
  sre.SpeechRuleFunctions.CustomGenerators,
  sre.SpeechRuleFunctions.Store_
);
sre.SpeechRuleFunctions.Store_.prototype.checkCustomFunctionSyntax_ = function (
  a
) {
  return a.match(new RegExp("^" + this.prefix_))
    ? !0
    : (console.error(
        "FunctionError: Invalid function name. Expected prefix " + this.prefix_
      ),
      !1);
};
sre.SpeechRuleContext = function () {
  this.customQueries = new sre.SpeechRuleFunctions.CustomQueries();
  this.customStrings = new sre.SpeechRuleFunctions.CustomStrings();
  this.contextFunctions = new sre.SpeechRuleFunctions.ContextFunctions();
  this.customGenerators = new sre.SpeechRuleFunctions.CustomGenerators();
};
sre.SpeechRuleContext.prototype.applyCustomQuery = function (a, b) {
  return (b = this.customQueries.lookup(b)) ? b(a) : null;
};
sre.SpeechRuleContext.prototype.applySelector = function (a, b) {
  return this.applyCustomQuery(a, b) || sre.XpathUtil.evalXPath(b, a);
};
sre.SpeechRuleContext.prototype.applyQuery = function (a, b) {
  a = this.applySelector(a, b);
  return 0 < a.length ? a[0] : null;
};
sre.SpeechRuleContext.prototype.applyConstraint = function (a, b) {
  return !!this.applyQuery(a, b) || sre.XpathUtil.evaluateBoolean(b, a);
};
sre.SpeechRuleContext.prototype.constructString = function (a, b) {
  if (!b) return "";
  if ('"' == b.charAt(0)) return b.slice(1, -1);
  var c = this.customStrings.lookup(b);
  return c ? c(a) : sre.XpathUtil.evaluateString(b, a);
};
sre.SpeechRuleContext.prototype.parse = function (a) {
  a = Array.isArray(a) ? a : Object.entries(a);
  for (var b = 0, c; (c = a[b]); b++) {
    var d = c[0].slice(0, 3);
    (d = {
      CQF: this.customQueries,
      CSF: this.customStrings,
      CTF: this.contextFunctions,
      CGF: this.customGenerators
    }[d])
      ? d.add(c[0], c[1])
      : console.error("FunctionError: Invalid function name " + c[0]);
  }
};
sre.SpeechRuleEvaluator = function () {};
sre.SpeechRuleEvaluator.prototype.evaluateDefault = goog.abstractMethod;
sre.SpeechRuleEvaluator.prototype.evaluateWhitespace = goog.abstractMethod;
sre.SpeechRuleEvaluator.prototype.evaluateString = goog.abstractMethod;
sre.SpeechRuleEvaluator.prototype.evaluateCustom = goog.abstractMethod;
sre.SpeechRuleEvaluator.prototype.evaluateCharacter = goog.abstractMethod;
sre.SpeechRuleStore = function () {};
sre.SpeechRuleStore.prototype.addRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.deleteRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.findRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.findAllRules = goog.abstractMethod;
sre.SpeechRuleStore.prototype.lookupRule = goog.abstractMethod;
sre.SpeechRuleStore.prototype.defineRule = goog.abstractMethod;
sre.TrieNode = function () {};
sre.TrieNode.prototype.getConstraint = function () {};
sre.TrieNode.prototype.getKind = function () {};
sre.TrieNode.prototype.applyTest = function (a) {};
sre.TrieNode.prototype.addChild = function (a) {};
sre.TrieNode.prototype.getChild = function (a) {};
sre.TrieNode.prototype.getChildren = function () {};
sre.TrieNode.prototype.findChildren = function (a) {};
sre.TrieNode.prototype.removeChild = function (a) {};
sre.TrieNode.Kind = {
  ROOT: "root",
  DYNAMIC: "dynamic",
  QUERY: "query",
  BOOLEAN: "boolean",
  STATIC: "static"
};
sre.AbstractTrieNode = function (a, b) {
  this.constraint = a;
  this.test = b;
  this.children_ = {};
  this.kind = sre.TrieNode.Kind.ROOT;
};
sre.AbstractTrieNode.prototype.getConstraint = function () {
  return this.constraint;
};
sre.AbstractTrieNode.prototype.getKind = function () {
  return this.kind;
};
sre.AbstractTrieNode.prototype.applyTest = function (a) {
  return this.test(a);
};
sre.AbstractTrieNode.prototype.addChild = function (a) {
  var b = a.getConstraint(),
    c = this.children_[b];
  this.children_[b] = a;
  return c;
};
sre.AbstractTrieNode.prototype.getChild = function (a) {
  return this.children_[a];
};
sre.AbstractTrieNode.prototype.getChildren = function () {
  var a = [],
    b;
  for (b in this.children_) a.push(this.children_[b]);
  return a;
};
sre.AbstractTrieNode.prototype.findChildren = function (a) {
  var b = [],
    c;
  for (c in this.children_) {
    var d = this.children_[c];
    d.applyTest(a) && b.push(d);
  }
  return b;
};
sre.AbstractTrieNode.prototype.removeChild = function (a) {
  delete this.children_[a];
};
sre.AbstractTrieNode.prototype.toString = function () {
  return this.constraint;
};
sre.StaticTrieNode = function (a, b) {
  sre.AbstractTrieNode.call(this, a, b);
  this.kind = sre.TrieNode.Kind.STATIC;
  this.rule_ = null;
};
goog.inherits(sre.StaticTrieNode, sre.AbstractTrieNode);
sre.StaticTrieNode.prototype.getRule = function () {
  return this.rule_;
};
sre.StaticTrieNode.prototype.setRule = function (a) {
  this.rule_ &&
    sre.Debugger.getInstance().output(
      "Replacing rule " + this.rule_ + " with " + a
    );
  this.rule_ = a;
};
sre.StaticTrieNode.prototype.toString = function () {
  return this.getRule()
    ? this.constraint + "\n==> " + this.getRule().action
    : this.constraint;
};
sre.TrieNodeFactory = {};
sre.TrieNodeFactory.getNode = function (a, b, c) {
  switch (a) {
    case sre.TrieNode.Kind.ROOT:
      return new sre.RootTrieNode();
    case sre.TrieNode.Kind.DYNAMIC:
      return new sre.DynamicTrieNode(b);
    case sre.TrieNode.Kind.QUERY:
      return new sre.QueryTrieNode(b, c);
    case sre.TrieNode.Kind.BOOLEAN:
      return new sre.BooleanTrieNode(b, c);
    default:
      return null;
  }
};
sre.RootTrieNode = function () {
  sre.AbstractTrieNode.call(this, "", function () {
    return !0;
  });
  this.kind = sre.TrieNode.Kind.ROOT;
};
goog.inherits(sre.RootTrieNode, sre.AbstractTrieNode);
sre.DynamicTrieNode = function (a) {
  sre.AbstractTrieNode.call(this, a, function (b) {
    return b === a;
  });
  this.kind = sre.TrieNode.Kind.DYNAMIC;
};
goog.inherits(sre.DynamicTrieNode, sre.AbstractTrieNode);
sre.TrieNodeFactory.constraintTest_ = function (a) {
  if (a.match(/^self::\*$/))
    return function (g) {
      return !0;
    };
  if (a.match(/^self::\w+$/)) {
    var b = a.slice(6).toUpperCase();
    return function (g) {
      return g.tagName && sre.DomUtil.tagName(g) === b;
    };
  }
  if (a.match(/^self::\w+:\w+$/)) {
    a = a.split(":");
    var c = sre.XpathUtil.resolveNameSpace(a[2]);
    if (!c) return null;
    b = a[3].toUpperCase();
    return function (g) {
      return (
        g.localName && g.localName.toUpperCase() === b && g.namespaceURI === c
      );
    };
  }
  if (a.match(/^@\w+$/)) {
    var d = a.slice(1);
    return function (g) {
      return g.hasAttribute && g.hasAttribute(d);
    };
  }
  if (a.match(/^@\w+="[\w\d ]+"$/)) {
    a = a.split("=");
    d = a[0].slice(1);
    var e = a[1].slice(1, -1);
    return function (g) {
      return g.hasAttribute && g.hasAttribute(d) && g.getAttribute(d) === e;
    };
  }
  if (a.match(/^@\w+!="[\w\d ]+"$/))
    return (
      (a = a.split("!=")),
      (d = a[0].slice(1)),
      (e = a[1].slice(1, -1)),
      function (g) {
        return !g.hasAttribute || !g.hasAttribute(d) || g.getAttribute(d) !== e;
      }
    );
  if (a.match(/^contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)$/))
    return (
      (a = a.split('"')),
      (e = a[1]),
      function (g) {
        return sre.Grammar.getInstance().getParameter(e);
      }
    );
  if (a.match(/^not\(\s*contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)\s*\)$/))
    return (
      (a = a.split('"')),
      (e = a[1]),
      function (g) {
        return !sre.Grammar.getInstance().getParameter(e);
      }
    );
  if (a.match(/^name\(\.\.\/\.\.\)="\w+"$/))
    return (
      (a = a.split('"')),
      (b = a[1].toUpperCase()),
      function (g) {
        return (
          g.parentNode &&
          g.parentNode.parentNode &&
          g.parentNode.parentNode.tagName &&
          sre.DomUtil.tagName(g.parentNode.parentNode) === b
        );
      }
    );
  if (a.match(/^count\(preceding-sibling::\*\)=\d+$/)) {
    a = a.split("=");
    var f = parseInt(a[1], 10);
    return function (g) {
      return g.parentNode && g.parentNode.childNodes[f] === g;
    };
  }
  return null;
};
sre.QueryTrieNode = function (a, b) {
  this.context_ = b;
  sre.StaticTrieNode.call(this, a, sre.TrieNodeFactory.constraintTest_(a));
  this.kind = sre.TrieNode.Kind.QUERY;
};
goog.inherits(sre.QueryTrieNode, sre.StaticTrieNode);
sre.QueryTrieNode.prototype.applyTest = function (a) {
  return this.test
    ? this.test(a)
    : this.context_.applyQuery(a, this.constraint) === a;
};
sre.BooleanTrieNode = function (a, b) {
  this.context_ = b;
  sre.StaticTrieNode.call(this, a, sre.TrieNodeFactory.constraintTest_(a));
  this.kind = sre.TrieNode.Kind.BOOLEAN;
};
goog.inherits(sre.BooleanTrieNode, sre.StaticTrieNode);
sre.BooleanTrieNode.prototype.applyTest = function (a) {
  return this.test
    ? this.test(a)
    : this.context_.applyConstraint(a, this.constraint);
};
sre.Trie = function (a) {
  this.store = a;
  this.root = sre.TrieNodeFactory.getNode(
    sre.TrieNode.Kind.ROOT,
    "",
    this.store.context
  );
};
sre.Trie.prototype.addRule = function (a) {
  for (
    var b = this.root,
      c = a.context,
      d = a.dynamicCstr.getValues(),
      e = 0,
      f = d.length;
    e < f;
    e++
  )
    b = this.addNode_(b, d[e], sre.TrieNode.Kind.DYNAMIC, c);
  b = this.addNode_(b, a.precondition.query, sre.TrieNode.Kind.QUERY, c);
  d = a.precondition.constraints;
  e = 0;
  for (f = d.length; e < f; e++)
    b = this.addNode_(b, d[e], sre.TrieNode.Kind.BOOLEAN, c);
  b.setRule(a);
};
sre.Trie.prototype.addNode_ = function (a, b, c, d) {
  var e = a.getChild(b);
  e || ((e = sre.TrieNodeFactory.getNode(c, b, d)), a.addChild(e));
  return e;
};
sre.Trie.prototype.lookupRules = function (a, b) {
  for (var c = [this.root], d = []; b.length; ) {
    for (var e = b.shift(), f = []; c.length; ) {
      var g = c.shift();
      g = g.getChildren();
      g.forEach(function (h) {
        (h.getKind() === sre.TrieNode.Kind.DYNAMIC &&
          -1 === e.indexOf(h.getConstraint())) ||
          f.push(h);
      });
    }
    c = f.slice();
  }
  for (; c.length; )
    (g = c.shift()),
      g.getRule && (b = g.getRule()) && d.push(b),
      (g = g.findChildren(a)),
      (c = c.concat(g));
  return d;
};
sre.Trie.prototype.hasSubtrie = function (a) {
  for (var b = this.root, c = 0, d = a.length; c < d; c++)
    if (((b = b.getChild(a[c])), !b)) return !1;
  return !0;
};
sre.Trie.prototype.toString = function () {
  return sre.Trie.printWithDepth_(this.root, 0, "");
};
sre.Trie.prototype.collectRules = function () {
  return sre.Trie.collectRules_(this.root);
};
sre.Trie.prototype.order = function () {
  return sre.Trie.order_(this.root);
};
sre.Trie.printWithDepth_ = function (a, b, c) {
  var d = Array(b + 2).join(b) + ": ";
  c += d + a.toString() + "\n";
  a = a.getChildren();
  d = 0;
  for (var e; (e = a[d]); d++) c = sre.Trie.printWithDepth_(e, b + 1, c);
  return c;
};
sre.Trie.order_ = function (a) {
  a = a.getChildren();
  if (!a.length) return 0;
  var b = Math.max.apply(null, a.map(sre.Trie.order_));
  return Math.max(a.length, b);
};
sre.Trie.collectRules_ = function (a) {
  var b = [];
  for (a = [a]; a.length; ) {
    var c = a.shift();
    if (
      c.getKind() === sre.TrieNode.Kind.QUERY ||
      c.getKind() === sre.TrieNode.Kind.BOOLEAN
    ) {
      var d = c.getRule();
      d && b.unshift(d);
    }
    a = a.concat(c.getChildren());
  }
  return b;
};
sre.Trie.prototype.enumerate = function (a) {
  return this.enumerate_(this.root, a);
};
sre.Trie.prototype.enumerate_ = function (a, b) {
  b = b || {};
  a = a.getChildren();
  for (var c = 0, d; (d = a[c]); c++)
    d.kind === sre.TrieNode.Kind.DYNAMIC &&
      (b[d.getConstraint()] = this.enumerate_(d, b[d.getConstraint()]));
  return b;
};
sre.Trie.prototype.byConstraint = function (a) {
  for (var b = this.root; a.length && b; ) {
    var c = a.shift();
    b = b.getChild(c);
  }
  return b || null;
};
sre.BaseRuleStore = function () {
  this.context = new sre.SpeechRuleContext();
  this.speechRules_ = [];
  this.trie = new sre.Trie(this);
  this.parseOrder = sre.DynamicCstr.DEFAULT_ORDER;
  this.parser = new sre.DynamicCstr.Parser(this.parseOrder);
  this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];
  this.modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];
  this.domain = "";
  this.initialized = !1;
  this.parseMethods = {
    Rule: goog.bind(this.defineRule, this),
    Generator: goog.bind(this.generateRules, this)
  };
  this.customTranscriptions = {};
};
sre.BaseRuleStore.prototype.lookupRule = function (a, b) {
  if (
    !a ||
    (a.nodeType != sre.DomUtil.NodeType.ELEMENT_NODE &&
      a.nodeType != sre.DomUtil.NodeType.TEXT_NODE)
  )
    return null;
  a = this.lookupRules(a, b);
  return 0 < a.length ? this.pickMostConstraint_(b, a) : null;
};
sre.BaseRuleStore.prototype.lookupRules = function (a, b) {
  return this.trie.lookupRules(a, b.allProperties());
};
sre.BaseRuleStore.prototype.defineRule = function (a, b, c, d, e) {
  try {
    var f = sre.SpeechRule.Action.fromString(c),
      g = Array.prototype.slice.call(arguments, 4),
      h = this.parsePrecondition(d, g),
      k = this.parseCstr(b);
    var l = new sre.SpeechRule(a, k, h, f);
  } catch (m) {
    if ("RuleError" == m.name)
      return console.error("Rule Error ", d, "(" + b + "):", m.message), null;
    throw m;
  }
  this.addRule(l);
  return l;
};
sre.BaseRuleStore.prototype.addRule = function (a) {
  a.context = this.context;
  this.trie.addRule(a);
  this.speechRules_.unshift(a);
};
sre.BaseRuleStore.prototype.deleteRule = function (a) {
  a = this.speechRules_.indexOf(a);
  -1 != a && this.speechRules_.splice(a, 1);
};
sre.BaseRuleStore.prototype.findRule = function (a) {
  for (var b = 0, c; (c = this.speechRules_[b]); b++) if (a(c)) return c;
  return null;
};
sre.BaseRuleStore.prototype.findAllRules = function (a) {
  return this.speechRules_.filter(a);
};
sre.BaseRuleStore.prototype.evaluateDefault = function (a) {
  a = a.textContent.slice(0);
  return a.match(/^\s+$/) ? this.evaluateWhitespace(a) : this.evaluateString(a);
};
sre.BaseRuleStore.prototype.evaluateString = goog.abstractMethod;
sre.BaseRuleStore.prototype.evaluateWhitespace = function (a) {
  return [];
};
sre.BaseRuleStore.prototype.evaluateCustom = function (a) {
  a = this.customTranscriptions[a];
  return void 0 !== a
    ? sre.AuditoryDescription.create({ text: a }, { adjust: !0, translate: !1 })
    : null;
};
sre.BaseRuleStore.prototype.evaluateCharacter = function (a) {
  return (
    this.evaluateCustom(a) ||
    sre.AuditoryDescription.create({ text: a }, { adjust: !0, translate: !0 })
  );
};
sre.BaseRuleStore.prototype.debugSpeechRule = function (a, b) {
  var c = a.precondition,
    d = a.context.applyQuery(b, c.query);
  sre.Debugger.getInstance().output(c.query, d ? d.toString() : d);
  c.constraints.forEach(
    goog.bind(function (e) {
      sre.Debugger.getInstance().output(e, a.context.applyConstraint(b, e));
    }, this)
  );
};
sre.BaseRuleStore.prototype.initialize = goog.abstractMethod;
sre.BaseRuleStore.prototype.removeDuplicates = function (a) {
  for (var b = this.speechRules_.length - 1, c; (c = this.speechRules_[b]); b--)
    c != a &&
      a.dynamicCstr.equal(c.dynamicCstr) &&
      sre.BaseRuleStore.comparePreconditions_(c, a) &&
      this.speechRules_.splice(b, 1);
};
sre.BaseRuleStore.prototype.pickMostConstraint_ = function (a, b) {
  var c = sre.Engine.getInstance().comparator;
  b.sort(function (d, e) {
    return (
      c.compare(d.dynamicCstr, e.dynamicCstr) ||
      sre.BaseRuleStore.priority_(d, e) ||
      e.precondition.constraints.length - d.precondition.constraints.length
    );
  });
  sre.Debugger.getInstance().generateOutput(
    goog.bind(function () {
      return b.map(function (d) {
        return d.name + "(" + d.dynamicCstr.toString() + ")";
      });
    }, this)
  );
  return b[0];
};
sre.BaseRuleStore.compareStaticConstraints_ = function (a, b) {
  if (a.length != b.length) return !1;
  for (var c = 0, d; (d = a[c]); c++) if (-1 == b.indexOf(d)) return !1;
  return !0;
};
sre.BaseRuleStore.comparePreconditions_ = function (a, b) {
  a = a.precondition;
  b = b.precondition;
  return a.query != b.query
    ? !1
    : sre.BaseRuleStore.compareStaticConstraints_(a.constraints, b.constraints);
};
sre.BaseRuleStore.priority_ = function (a, b) {
  a = a.precondition.priority;
  b = b.precondition.priority;
  return a === b ? 0 : a > b ? -1 : 1;
};
sre.BaseRuleStore.prototype.getSpeechRules = function () {
  return this.speechRules_;
};
sre.BaseRuleStore.prototype.setSpeechRules = function (a) {
  this.speechRules_ = a;
};
sre.BaseRuleStore.prototype.parseCstr = function (a) {
  return this.parser.parse(
    this.locale +
      "." +
      this.modality +
      (this.domain ? "." + this.domain : "") +
      "." +
      a
  );
};
sre.BaseRuleStore.prototype.parsePrecondition = function (a, b) {
  var c = this.parsePrecondition_(a);
  a = c[0];
  c = c.slice(1);
  b = $jscomp.makeIterator(b);
  for (var d = b.next(); !d.done; d = b.next())
    c = c.concat(this.parsePrecondition_(d.value));
  return new sre.SpeechRule.Precondition(a, c);
};
sre.BaseRuleStore.prototype.parsePrecondition_ = function (a) {
  var b = this.context.customGenerators.lookup(a);
  return b ? b() : [a];
};
sre.BaseRuleStore.prototype.parse = function (a) {
  this.modality = a.modality || this.modality;
  this.locale = a.locale || this.locale;
  this.domain = a.domain || this.domain;
  this.context.parse(a.functions || []);
  this.parseRules(a.rules || []);
};
sre.BaseRuleStore.prototype.parseRules = function (a) {
  for (var b = 0, c; (c = a[b]); b++) {
    var d = c[0],
      e = this.parseMethods[d];
    d && e && e.apply(this, c.slice(1));
  }
};
sre.BaseRuleStore.prototype.generateRules = function (a) {
  (a = this.context.customGenerators.lookup(a)) && a(this);
};
sre.BaseRuleStore.prototype.prune = function (a) {
  var b = a.pop();
  (a = this.trie.byConstraint(a)) && a.removeChild(b);
};
sre.MathStore = function () {
  sre.BaseRuleStore.call(this);
  this.annotators = [];
  this.parseMethods.Alias = goog.bind(this.defineRuleAlias, this);
  this.parseMethods.Aliases = goog.bind(this.defineRulesAlias, this);
  this.parseMethods.UniqueAlias = goog.bind(this.defineUniqueRuleAlias, this);
  this.parseMethods.SpecializedRule = goog.bind(
    this.defineSpecialisedRule,
    this
  );
};
goog.inherits(sre.MathStore, sre.BaseRuleStore);
sre.MathStore.prototype.initialize = function () {
  this.initialized ||
    (this.annotations(),
    this.setSpeechRules(this.trie.collectRules()),
    (this.initialized = !0));
};
sre.MathStore.prototype.annotations = function () {
  for (var a = 0, b; (b = this.annotators[a]); a++)
    sre.SemanticAnnotations.getInstance().activate(this.domain, b);
};
sre.MathStore.prototype.defineUniqueRuleAlias = function (a, b, c, d) {
  var e = this.parseCstr(b),
    f = this.findRule(
      goog.bind(function (g) {
        return g.name == a && e.equal(g.dynamicCstr);
      }, this)
    );
  if (!f)
    throw new sre.SpeechRule.OutputError(
      "Rule named " + a + " with style " + b + " does not exist."
    );
  this.addAlias_(f, c, Array.prototype.slice.call(arguments, 3));
};
sre.MathStore.prototype.defineRuleAlias = function (a, b, c) {
  var d = this.findRule(function (e) {
    return e.name == a;
  });
  if (!d)
    throw new sre.SpeechRule.OutputError(
      "Rule with named " + a + " does not exist."
    );
  this.addAlias_(d, b, Array.prototype.slice.call(arguments, 2));
};
sre.MathStore.prototype.defineRulesAlias = function (a, b, c) {
  var d = this.findAllRules(function (g) {
    return g.name == a;
  });
  if (0 == d.length)
    throw new sre.SpeechRule.OutputError(
      "Rule with name " + a + " does not exist."
    );
  var e = Array.prototype.slice.call(arguments, 2),
    f = [];
  d.forEach(
    goog.bind(function (g) {
      a: {
        var h = g.dynamicCstr.toString();
        for (var k = g.action.toString(), l = 0, m; (m = f[l]); l++)
          if (m.action === k && m.cstr === h) {
            h = !1;
            break a;
          }
        f.push({ cstr: h, action: k });
        h = !0;
      }
      h && this.addAlias_(g, b, e);
    }, this)
  );
};
sre.MathStore.prototype.addAlias_ = function (a, b, c) {
  b = this.parsePrecondition(b, c);
  b = new sre.SpeechRule(a.name, a.dynamicCstr, b, a.action);
  b.name = a.name;
  this.addRule(b);
};
sre.MathStore.prototype.defineSpecialisedRule = function (a, b, c, d) {
  var e = this.parseCstr(b),
    f = this.findRule(
      goog.bind(function (g) {
        return g.name == a && e.equal(g.dynamicCstr);
      }, this)
    );
  if (!f)
    throw new sre.SpeechRule.OutputError(
      "Rule named " + a + " with style " + b + " does not exist."
    );
  b = this.parseCstr(c);
  d = d ? sre.SpeechRule.Action.fromString(d) : f.action;
  f = new sre.SpeechRule(f.name, b, f.precondition, d);
  this.addRule(f);
};
sre.MathStore.prototype.evaluateString = function (a) {
  var b = [];
  if (a.match(/^\s+$/)) return b;
  var c = this.matchNumber_(a);
  if (c && c.length === a.length)
    return b.push(this.evaluateCharacter(c.number)), b;
  a = sre.BaseUtil.removeEmpty(a.replace(/\s/g, " ").split(" "));
  for (var d = 0; (c = a[d]); d++)
    if (1 == c.length) b.push(this.evaluateCharacter(c));
    else if (c.match(new RegExp("^[" + sre.Messages.REGEXP.TEXT + "]+$")))
      b.push(this.evaluateCharacter(c));
    else
      for (var e = c; e; ) {
        c = this.matchNumber_(e);
        var f = e.match(new RegExp("^[" + sre.Messages.REGEXP.TEXT + "]+"));
        c
          ? (b.push(this.evaluateCharacter(c.number)),
            (e = e.substring(c.length)))
          : f
          ? (b.push(this.evaluateCharacter(f[0])),
            (e = e.substring(f[0].length)))
          : ((c = Array.from(e)),
            b.push(this.evaluateCharacter(c[0])),
            (e = c.slice(1).join("")));
      }
  return b;
};
sre.MathStore.prototype.matchNumber_ = function (a) {
  var b = a.match(new RegExp("^" + sre.Messages.REGEXP.NUMBER)),
    c = a.match(new RegExp("^" + sre.Locale.en.REGEXP.NUMBER));
  if (!b && !c) return null;
  var d = c && c[0] === a;
  return (b && b[0] === a) || !d
    ? b
      ? { number: b[0], length: b[0].length }
      : null
    : {
        number: c[0]
          .replace(new RegExp(sre.Locale.en.REGEXP.DIGIT_GROUP, "g"), "X")
          .replace(
            new RegExp(sre.Locale.en.REGEXP.DECIMAL_MARK, "g"),
            sre.Messages.REGEXP.DECIMAL_MARK
          )
          .replace(/X/g, sre.Messages.REGEXP.DIGIT_GROUP.replace(/\\/g, "")),
        length: c[0].length
      };
};
sre.MathStore.prototype.parse = function (a) {
  sre.MathStore.superClass_.parse.call(this, a);
  this.annotators = a.annotators || [];
};
sre.BrailleStore = function () {
  sre.MathStore.call(this);
  this.modality = "braille";
  this.customTranscriptions = { "\u22ca": "\u2808\u2821\u2833" };
};
goog.inherits(sre.BrailleStore, sre.MathStore);
sre.BrailleStore.prototype.evaluateString = function (a) {
  var b = [];
  a = Array.from(a);
  for (var c = 0; c < a.length; c++) b.push(this.evaluateCharacter(a[c]));
  return b;
};
sre.BrailleStore.prototype.annotations = function () {
  for (var a = 0, b; (b = this.annotators[a]); a++)
    sre.SemanticAnnotations.getInstance().activate(this.locale, b);
};
sre.ClearspeakPreferences = function (a, b) {
  sre.DynamicCstr.call(this, a);
  this.preference = b;
};
goog.inherits(sre.ClearspeakPreferences, sre.DynamicCstr);
sre.ClearspeakPreferences.prototype.equal = function (a) {
  if (!sre.ClearspeakPreferences.superClass_.equal.call(this, a)) return !1;
  var b = Object.keys(this.preference);
  a = a.preference;
  if (b.length !== Object.keys(a).length) return !1;
  for (var c = 0, d; (d = b[c]); c++)
    if (this.preference[d] !== a[d]) return !1;
  return !0;
};
sre.ClearspeakPreferences.AUTO = "Auto";
sre.ClearspeakPreferences.PREFERENCES = new sre.DynamicProperties({
  AbsoluteValue: ["Auto", "AbsEnd", "Cardinality", "Determinant"],
  Bar: ["Auto", "Conjugate"],
  Caps: ["Auto", "SayCaps"],
  CombinationPermutation: ["Auto", "ChoosePermute"],
  Currency: ["Auto", "Position", "Prefix"],
  Ellipses: ["Auto", "AndSoOn"],
  Enclosed: ["Auto", "EndEnclose"],
  Exponent: ["Auto", "AfterPower", "Ordinal", "OrdinalPower", "Exponent"],
  Fraction:
    "Auto EndFrac FracOver General GeneralEndFrac Ordinal Over OverEndFrac Per".split(
      " "
    ),
  Functions: ["Auto", "None", "Reciprocal"],
  ImpliedTimes: ["Auto", "MoreImpliedTimes", "None"],
  Log: ["Auto", "LnAsNaturalLog"],
  Matrix:
    "Auto Combinatoric EndMatrix EndVector SilentColNum SpeakColNum Vector".split(
      " "
    ),
  MultiLineLabel: "Auto Case Constraint Equation Line None Row Step".split(" "),
  MultiLineOverview: ["Auto", "None"],
  MultiLinePausesBetweenColumns: ["Auto", "Long", "Short"],
  MultsymbolDot: ["Auto", "Dot"],
  MultsymbolX: ["Auto", "By", "Cross"],
  Paren: "Auto CoordPoint Interval Silent Speak SpeakNestingLevel".split(" "),
  Prime: ["Auto", "Angle", "Length"],
  Roots: ["Auto", "PosNegSqRoot", "PosNegSqRootEnd", "RootEnd"],
  SetMemberSymbol: ["Auto", "Belongs", "Element", "Member"],
  Sets: ["Auto", "SilentBracket", "woAll"],
  TriangleSymbol: ["Auto", "Delta"],
  Trig: ["Auto", "ArcTrig", "TrigInverse", "Reciprocal"],
  VerticalLine: ["Auto", "Divides", "Given", "SuchThat"]
});
sre.ClearspeakPreferences.comparator = function () {
  return new sre.ClearspeakPreferences.Comparator(
    sre.Engine.getInstance().dynamicCstr,
    sre.DynamicProperties.create(
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE]]
    )
  );
};
sre.ClearspeakPreferences.Comparator = function (a, b) {
  sre.DynamicCstr.DefaultComparator.call(this, a, b);
  this.preference = a.preference || {};
};
goog.inherits(
  sre.ClearspeakPreferences.Comparator,
  sre.DynamicCstr.DefaultComparator
);
sre.ClearspeakPreferences.Comparator.prototype.match = function (a) {
  if (!sre.ClearspeakPreferences.Comparator.superClass_.match.call(this, a))
    return !1;
  if (!a.preference) return !0;
  for (var b = Object.keys(a.preference), c = 0, d; (d = b[c]); c++)
    if (this.preference[d] !== a.preference[d]) return !1;
  return !0;
};
sre.ClearspeakPreferences.Comparator.prototype.compare = function (a, b) {
  var c = sre.ClearspeakPreferences.Comparator.superClass_.compare.call(
    this,
    a,
    b
  );
  if (0 !== c) return c;
  if (!a.preference && b.preference) return 1;
  if (a.preference && !b.preference) return -1;
  if (!a.preference && !b.preference) return 0;
  a = Object.keys(a.preference).length;
  b = Object.keys(b.preference).length;
  return a > b ? -1 : a < b ? 1 : 0;
};
sre.ClearspeakPreferences.Parser = function () {
  sre.DynamicCstr.Parser.call(this, [
    sre.DynamicCstr.Axis.LOCALE,
    sre.DynamicCstr.Axis.MODALITY,
    sre.DynamicCstr.Axis.DOMAIN,
    sre.DynamicCstr.Axis.STYLE
  ]);
};
goog.inherits(sre.ClearspeakPreferences.Parser, sre.DynamicCstr.Parser);
sre.ClearspeakPreferences.Parser.prototype.parse = function (a) {
  var b = sre.ClearspeakPreferences.Parser.superClass_.parse.call(this, a);
  a = b.getValue(sre.DynamicCstr.Axis.STYLE);
  var c = b.getValue(sre.DynamicCstr.Axis.LOCALE);
  b = b.getValue(sre.DynamicCstr.Axis.MODALITY);
  var d = {};
  a !== sre.DynamicCstr.DEFAULT_VALUE &&
    ((d = this.fromPreference(a)), (a = this.toPreference(d)));
  return new sre.ClearspeakPreferences(
    { locale: c, modality: b, domain: "clearspeak", style: a },
    d
  );
};
sre.ClearspeakPreferences.Parser.prototype.fromPreference = function (a) {
  return sre.ClearspeakPreferences.fromPreference(a);
};
sre.ClearspeakPreferences.fromPreference = function (a) {
  a = a.split(":");
  for (
    var b = {},
      c = sre.ClearspeakPreferences.PREFERENCES.getProperties(),
      d = Object.keys(c),
      e = 0,
      f;
    (f = a[e]);
    e++
  )
    if (((f = f.split("_")), -1 !== d.indexOf(f[0]))) {
      var g = f[1];
      g &&
        g !== sre.ClearspeakPreferences.AUTO &&
        -1 !== c[f[0]].indexOf(g) &&
        (b[f[0]] = f[1]);
    }
  return b;
};
sre.ClearspeakPreferences.Parser.prototype.toPreference = function (a) {
  return sre.ClearspeakPreferences.toPreference(a);
};
sre.ClearspeakPreferences.toPreference = function (a) {
  for (var b = Object.keys(a), c = [], d = 0; d < b.length; d++)
    c.push(b[d] + "_" + a[b[d]]);
  return c.length ? c.join(":") : sre.DynamicCstr.DEFAULT_VALUE;
};
sre.ClearspeakPreferences.getLocalePreferences = function (a) {
  a =
    a ||
    sre.MathCompoundStore.getInstance().enumerate(
      sre.SpeechRuleEngine.getInstance().enumerate()
    );
  return sre.ClearspeakPreferences.getLocalePreferences_(a);
};
sre.ClearspeakPreferences.getLocalePreferences_ = function (a) {
  var b = {},
    c;
  for (c in a)
    if (a[c].speech && a[c].speech.clearspeak) {
      var d = Object.keys(a[c].speech.clearspeak),
        e = (b[c] = {}),
        f;
      for (f in sre.ClearspeakPreferences.PREFERENCES.getProperties()) {
        var g = sre.ClearspeakPreferences.PREFERENCES.getProperties()[f],
          h = [f + "_Auto"];
        if (g) {
          g = $jscomp.makeIterator(g);
          for (var k = g.next(); !k.done; k = g.next())
            (k = k.value), -1 !== d.indexOf(f + "_" + k) && h.push(f + "_" + k);
        }
        e[f] = h;
      }
    }
  return b;
};
sre.ClearspeakPreferences.smartPreferences = function (a, b) {
  b = sre.ClearspeakPreferences.getLocalePreferences()[b];
  if (!b) return [];
  a = a.explorers;
  if (!a)
    return [
      {
        type: "radio",
        content: "Standard",
        id: "clearspeak-default",
        variable: "speechRules"
      }
    ];
  a = sre.ClearspeakPreferences.relevantPreferences(
    a.walker.getFocus().getSemanticPrimary()
  );
  var c = sre.Engine.DOMAIN_TO_STYLES.clearspeak;
  return [
    {
      type: "radio",
      content: "No Preferences",
      id: "clearspeak-default",
      variable: "speechRules"
    },
    {
      type: "radio",
      content: "Current Preferences",
      id: "clearspeak-" + c,
      variable: "speechRules"
    },
    { type: "rule" },
    { type: "label", content: "Preferences for " + a },
    { type: "rule" }
  ].concat(
    b[a].map(function (d) {
      d = d.split("_");
      return {
        type: "radio",
        content: d[1],
        id:
          "clearspeak-" +
          sre.ClearspeakPreferences.addPreference(c, d[0], d[1]),
        variable: "speechRules"
      };
    })
  );
};
sre.ClearspeakPreferences.relevantPreferences = function (a) {
  var b = sre.ClearspeakPreferences.SEMANTIC_MAPPING_[a.type];
  return b ? b[a.role] || b[""] || "ImpliedTimes" : "ImpliedTimes";
};
sre.ClearspeakPreferences.REVERSE_MAPPING_ = [
  [
    "AbsoluteValue",
    sre.SemanticAttr.Type.FENCED,
    sre.SemanticAttr.Role.NEUTRAL
  ],
  ["Bar", sre.SemanticAttr.Type.OVERSCORE, sre.SemanticAttr.Role.OVERACCENT],
  ["Caps", sre.SemanticAttr.Type.IDENTIFIER, sre.SemanticAttr.Role.LATINLETTER],
  [
    "CombinationPermutation",
    sre.SemanticAttr.Type.APPL,
    sre.SemanticAttr.Role.UNKNOWN
  ],
  [
    "Ellipses",
    sre.SemanticAttr.Type.PUNCTUATION,
    sre.SemanticAttr.Role.ELLIPSIS
  ],
  ["Exponent", sre.SemanticAttr.Type.SUPERSCRIPT, ""],
  ["Fraction", sre.SemanticAttr.Type.FRACTION, ""],
  ["Functions", sre.SemanticAttr.Type.APPL, sre.SemanticAttr.Role.SIMPLEFUNC],
  [
    "ImpliedTimes",
    sre.SemanticAttr.Type.OPERATOR,
    sre.SemanticAttr.Role.IMPLICIT
  ],
  ["Log", sre.SemanticAttr.Type.APPL, sre.SemanticAttr.Role.PREFIXFUNC],
  ["Matrix", sre.SemanticAttr.Type.MATRIX, ""],
  ["Matrix", sre.SemanticAttr.Type.VECTOR, ""],
  [
    "MultiLineLabel",
    sre.SemanticAttr.Type.MULTILINE,
    sre.SemanticAttr.Role.LABEL
  ],
  [
    "MultiLineOverview",
    sre.SemanticAttr.Type.MULTILINE,
    sre.SemanticAttr.Role.TABLE
  ],
  [
    "MultiLinePausesBetweenColumns",
    sre.SemanticAttr.Type.MULTILINE,
    sre.SemanticAttr.Role.TABLE
  ],
  ["MultiLineLabel", sre.SemanticAttr.Type.TABLE, sre.SemanticAttr.Role.LABEL],
  [
    "MultiLineOverview",
    sre.SemanticAttr.Type.TABLE,
    sre.SemanticAttr.Role.TABLE
  ],
  [
    "MultiLinePausesBetweenColumns",
    sre.SemanticAttr.Type.TABLE,
    sre.SemanticAttr.Role.TABLE
  ],
  ["MultiLineLabel", sre.SemanticAttr.Type.CASES, sre.SemanticAttr.Role.LABEL],
  [
    "MultiLineOverview",
    sre.SemanticAttr.Type.CASES,
    sre.SemanticAttr.Role.TABLE
  ],
  [
    "MultiLinePausesBetweenColumns",
    sre.SemanticAttr.Type.CASES,
    sre.SemanticAttr.Role.TABLE
  ],
  [
    "MultsymbolDot",
    sre.SemanticAttr.Type.OPERATOR,
    sre.SemanticAttr.Role.MULTIPLICATION
  ],
  [
    "MultsymbolX",
    sre.SemanticAttr.Type.OPERATOR,
    sre.SemanticAttr.Role.MULTIPLICATION
  ],
  ["Paren", sre.SemanticAttr.Type.FENCED, sre.SemanticAttr.Role.LEFTRIGHT],
  ["Prime", sre.SemanticAttr.Type.SUPERSCRIPT, sre.SemanticAttr.Role.PRIME],
  ["Roots", sre.SemanticAttr.Type.ROOT, ""],
  ["Roots", sre.SemanticAttr.Type.SQRT, ""],
  [
    "SetMemberSymbol",
    sre.SemanticAttr.Type.RELATION,
    sre.SemanticAttr.Role.ELEMENT
  ],
  ["Sets", sre.SemanticAttr.Type.FENCED, sre.SemanticAttr.Role.SETEXT],
  [
    "TriangleSymbol",
    sre.SemanticAttr.Type.IDENTIFIER,
    sre.SemanticAttr.Role.GREEKLETTER
  ],
  ["Trig", sre.SemanticAttr.Type.APPL, sre.SemanticAttr.Role.PREFIXFUNC],
  ["VerticalLine", sre.SemanticAttr.Type.PUNCTUATED, sre.SemanticAttr.Role.VBAR]
];
sre.ClearspeakPreferences.SEMANTIC_MAPPING_ = (function () {
  for (
    var a = {}, b = 0, c;
    (c = sre.ClearspeakPreferences.REVERSE_MAPPING_[b]);
    b++
  ) {
    var d = c[0],
      e = a[c[1]];
    e || ((e = {}), (a[c[1]] = e));
    e[c[2]] = d;
  }
  return a;
})();
sre.ClearspeakPreferences.findPreference = function (a, b) {
  return "default" === a
    ? sre.ClearspeakPreferences.AUTO
    : sre.ClearspeakPreferences.fromPreference(a)[b] ||
        sre.ClearspeakPreferences.AUTO;
};
sre.ClearspeakPreferences.addPreference = function (a, b, c) {
  if ("default" === a) return b + "_" + c;
  a = sre.ClearspeakPreferences.fromPreference(a);
  a[b] = c;
  return sre.ClearspeakPreferences.toPreference(a);
};
sre.Engine.getInstance().comparators.clearspeak =
  sre.ClearspeakPreferences.comparator;
sre.Engine.getInstance().parsers.clearspeak =
  new sre.ClearspeakPreferences.Parser();
sre.AlphabetGenerator = {};
sre.AlphabetGenerator.Font = {
  BOLD: "bold",
  BOLDFRAKTUR: "bold-fraktur",
  BOLDITALIC: "bold-italic",
  BOLDSCRIPT: "bold-script",
  DOUBLESTRUCK: "double-struck",
  FULLWIDTH: "fullwidth",
  FRAKTUR: "fraktur",
  ITALIC: "italic",
  MONOSPACE: "monospace",
  NORMAL: "normal",
  SCRIPT: "script",
  SANSSERIF: "sans-serif",
  SANSSERIFITALIC: "sans-serif-italic",
  SANSSERIFBOLD: "sans-serif-bold",
  SANSSERIFBOLDITALIC: "sans-serif-bold-italic"
};
sre.AlphabetGenerator.Embellish = {
  SUPER: "super",
  SUB: "sub",
  CIRCLED: "circled",
  PARENTHESIZED: "parenthesized",
  PERIOD: "period",
  NEGATIVECIRCLED: "negative-circled",
  DOUBLECIRCLED: "double-circled",
  CIRCLEDSANSSERIF: "circled-sans-serif",
  NEGATIVECIRCLEDSANSSERIF: "negative-circled-sans-serif",
  COMMA: "comma",
  SQUARED: "squared",
  NEGATIVESQUARED: "negative-squared"
};
sre.AlphabetGenerator.Base = {
  LATINCAP: "latinCap",
  LATINSMALL: "latinSmall",
  GREEKCAP: "greekCap",
  GREEKSMALL: "greekSmall",
  DIGIT: "digit"
};
sre.AlphabetGenerator.Domains_ = {
  small: ["default"],
  capital: ["default"],
  digit: ["default"]
};
sre.AlphabetGenerator.makeDomains_ = function () {
  var a = sre.Messages.ALPHABET_PREFIXES,
    b = sre.Messages.ALPHABET_TRANSFORMERS,
    c = function (d, e) {
      var f = {};
      Object.keys(d).forEach(function (g) {
        f[g] = !0;
      });
      Object.keys(e).forEach(function (g) {
        f[g] = !0;
      });
      return Object.keys(f);
    };
  sre.AlphabetGenerator.Domains_.small = c(a.smallPrefix, b.letter);
  sre.AlphabetGenerator.Domains_.capital = c(a.capPrefix, b.letter);
  sre.AlphabetGenerator.Domains_.digit = c(a.digitPrefix, b.digit);
};
sre.AlphabetGenerator.generate = function (a, b) {
  var c = sre.Engine.getInstance().locale;
  sre.Engine.getInstance().locale = a;
  sre.L10n.setLocale();
  b.addSymbolRules({ locale: a });
  sre.AlphabetGenerator.makeDomains_();
  a = sre.AlphabetGenerator.INTERVALS;
  for (var d = 0, e; (e = a[d]); d++) {
    var f = sre.AlphabetGenerator.makeInterval(e.interval, e.subst),
      g = f.map(function (h) {
        return sre.SemanticUtil.numberToUnicode(parseInt(h, 16));
      });
    "offset" in e
      ? sre.AlphabetGenerator.numberRules(
          b,
          f,
          g,
          e.font,
          e.category,
          e.offset || 0
        )
      : sre.AlphabetGenerator.alphabetRules(
          b,
          f,
          g,
          sre.Messages.ALPHABETS[e.base],
          e.font,
          e.category,
          !!e.capital
        );
  }
  sre.Engine.getInstance().locale = c;
  sre.L10n.setLocale();
};
sre.AlphabetGenerator.makeInterval = function (a, b) {
  var c = parseInt(a[0], 16);
  a = parseInt(a[1], 16);
  for (var d = []; c <= a; c++) {
    var e = c.toString(16).toUpperCase();
    e = 3 < e.length ? e : ("000" + e).slice(-4);
    !1 !== b[e] && ((e = b[e] || e), d.push(e));
  }
  return d;
};
sre.AlphabetGenerator.getFont = function (a) {
  a =
    "normal" === a || "fullwidth" === a
      ? ""
      : sre.Messages.FONT[a] || sre.Messages.EMBELLISH[a] || "";
  return "string" === typeof a
    ? { font: a, combiner: sre.Messages.ALPHABET_COMBINER }
    : { font: a[0], combiner: a[1] };
};
sre.AlphabetGenerator.alphabetRules = function (a, b, c, d, e, f, g) {
  e = sre.AlphabetGenerator.getFont(e);
  for (var h = 0, k, l, m; (k = b[h]), (l = c[h]), (m = d[h]); h++)
    sre.AlphabetGenerator.makeLetter(
      a,
      e.combiner,
      k,
      l,
      m,
      e.font,
      g
        ? sre.Messages.ALPHABET_PREFIXES.capPrefix
        : sre.Messages.ALPHABET_PREFIXES.smallPrefix,
      f,
      sre.Messages.ALPHABET_TRANSFORMERS.letter,
      g
        ? sre.AlphabetGenerator.Domains_.capital
        : sre.AlphabetGenerator.Domains_.small
    );
};
sre.AlphabetGenerator.numberRules = function (a, b, c, d, e, f) {
  d = sre.AlphabetGenerator.getFont(d);
  for (var g = 0, h, k; (h = b[g]), (k = c[g]); g++)
    sre.AlphabetGenerator.makeLetter(
      a,
      d.combiner,
      h,
      k,
      g + f,
      d.font,
      sre.Messages.ALPHABET_PREFIXES.digitPrefix,
      e,
      sre.Messages.ALPHABET_TRANSFORMERS.digit,
      sre.AlphabetGenerator.Domains_.digit
    );
};
sre.AlphabetGenerator.makeLetter = function (a, b, c, d, e, f, g, h, k, l) {
  for (var m = 0, n; (n = l[m]); m++) {
    var p = n in g ? g[n] : g["default"];
    a.defineRule(
      c.toString(),
      n,
      "default",
      h,
      d,
      b((n in k ? k[n] : k["default"])(e), f, p)
    );
  }
};
sre.AlphabetGenerator.INTERVALS = [
  {
    interval: ["1D400", "1D419"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D41A", "1D433"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D56C", "1D585"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.BOLDFRAKTUR
  },
  {
    interval: ["1D586", "1D59F"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.BOLDFRAKTUR
  },
  {
    interval: ["1D468", "1D481"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ["1D482", "1D49B"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ["1D4D0", "1D4E9"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.BOLDSCRIPT
  },
  {
    interval: ["1D4EA", "1D503"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.BOLDSCRIPT
  },
  {
    interval: ["1D538", "1D551"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {
      "1D53A": "2102",
      "1D53F": "210D",
      "1D545": "2115",
      "1D547": "2119",
      "1D548": "211A",
      "1D549": "211D",
      "1D551": "2124"
    },
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ["1D552", "1D56B"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ["1D504", "1D51D"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {
      "1D506": "212D",
      "1D50B": "210C",
      "1D50C": "2111",
      "1D515": "211C",
      "1D51D": "2128"
    },
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.FRAKTUR
  },
  {
    interval: ["1D51E", "1D537"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.FRAKTUR
  },
  {
    interval: ["FF21", "FF3A"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ["FF41", "FF5A"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ["1D434", "1D44D"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ["1D44E", "1D467"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: { "1D455": "210E" },
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ["1D670", "1D689"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ["1D68A", "1D6A3"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ["0041", "005A"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["0061", "007A"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["1D49C", "1D4B5"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {
      "1D49D": "212C",
      "1D4A0": "2130",
      "1D4A1": "2131",
      "1D4A3": "210B",
      "1D4A4": "2110",
      "1D4A7": "2112",
      "1D4A8": "2133",
      "1D4AD": "211B"
    },
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SCRIPT
  },
  {
    interval: ["1D4B6", "1D4CF"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: { "1D4BA": "212F", "1D4BC": "210A", "1D4C4": "2134" },
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SCRIPT
  },
  {
    interval: ["1D5A0", "1D5B9"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ["1D5BA", "1D5D3"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ["1D608", "1D621"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SANSSERIFITALIC
  },
  {
    interval: ["1D622", "1D63B"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SANSSERIFITALIC
  },
  {
    interval: ["1D5D4", "1D5ED"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D5EE", "1D607"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D63C", "1D655"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ["1D656", "1D66F"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ["0391", "03A9"],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: { "03A2": "03F4" },
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["03B0", "03D0"],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {
      "03B0": "2207",
      "03CA": "2202",
      "03CB": "03F5",
      "03CC": "03D1",
      "03CD": "03F0",
      "03CE": "03D5",
      "03CF": "03F1",
      "03D0": "03D6"
    },
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["1D6A8", "1D6C0"],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D6C1", "1D6E1"],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D6E2", "1D6FA"],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ["1D6FB", "1D71B"],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ["1D71C", "1D734"],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ["1D735", "1D755"],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ["1D756", "1D76E"],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D76F", "1D78F"],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D790", "1D7A8"],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: !0,
    category: "Lu",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ["1D7A9", "1D7C9"],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: !1,
    category: "Ll",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ["0030", "0039"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["2070", "2079"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: { 2071: "00B9", 2072: "00B2", 2073: "00B3" },
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.SUPER
  },
  {
    interval: ["2080", "2089"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.SUB
  },
  {
    interval: ["245F", "2473"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: { "245F": "24EA" },
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ["3251", "325F"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 21,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ["32B1", "32BF"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 36,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ["2474", "2487"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 1,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.PARENTHESIZED
  },
  {
    interval: ["2487", "249B"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: { 2487: "1F100" },
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.PERIOD
  },
  {
    interval: ["2775", "277F"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: { 2775: "24FF" },
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLED
  },
  {
    interval: ["24EB", "24F4"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 11,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLED
  },
  {
    interval: ["24F5", "24FE"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 1,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.DOUBLECIRCLED
  },
  {
    interval: ["277F", "2789"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: { "277F": "1F10B" },
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.CIRCLEDSANSSERIF
  },
  {
    interval: ["2789", "2793"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: { 2789: "1F10C" },
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLEDSANSSERIF
  },
  {
    interval: ["FF10", "FF19"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ["1D7CE", "1D7D7"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D7D8", "1D7E1"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ["1D7E2", "1D7EB"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ["1D7EC", "1D7F5"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D7F6", "1D7FF"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "Nd",
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ["1F101", "1F10A"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: "No",
    font: sre.AlphabetGenerator.Embellish.COMMA
  },
  {
    interval: ["24B6", "24CF"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ["24D0", "24E9"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ["1F110", "1F129"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.PARENTHESIZED
  },
  {
    interval: ["249C", "24B5"],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: !1,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.PARENTHESIZED
  },
  {
    interval: ["1F130", "1F149"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.SQUARED
  },
  {
    interval: ["1F170", "1F189"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.NEGATIVESQUARED
  },
  {
    interval: ["1F150", "1F169"],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: !0,
    category: "So",
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLED
  }
];
sre.MathSimpleStore = function () {
  sre.MathStore.call(this);
  this.category = "";
};
goog.inherits(sre.MathSimpleStore, sre.MathStore);
sre.MathSimpleStore.prototype.defineRulesFromMappings = function (a, b, c) {
  for (var d in c)
    for (var e in c[d]) this.defineRuleFromStrings(a, d, e, b, c[d][e]);
};
sre.MathSimpleStore.prototype.defineRuleFromStrings = function (a, b, c, d, e) {
  this.defineRule(
    a,
    b + "." + c,
    '[t] "' + e + '"',
    "self::text()",
    '"' === d ? "self::text() = '" + d + "'" : 'self::text() = "' + d + '"'
  );
};
sre.MathSimpleStore.prototype.lookupRule = function (a, b) {
  a = this.getSpeechRules().filter(function (c) {
    return sre.MathSimpleStore.testDynamicConstraints_(b, c);
  });
  return a.length
    ? a.sort(function (c, d) {
        return sre.Engine.getInstance().comparator.compare(
          c.dynamicCstr,
          d.dynamicCstr
        );
      })[0]
    : null;
};
sre.MathSimpleStore.testDynamicConstraints_ = function (a, b) {
  return sre.Engine.getInstance().strict
    ? b.dynamicCstr.equal(a)
    : sre.Engine.getInstance().comparator.match(b.dynamicCstr);
};
sre.MathCompoundStore = function () {
  this.subStores_ = {};
  this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];
  this.modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];
  this.siPrefixes = {};
};
goog.addSingletonGetter(sre.MathCompoundStore);
sre.MathCompoundStore.prototype.getSubStore_ = function (a) {
  var b = this.subStores_[a];
  if (b) return sre.Debugger.getInstance().output("Store exists! " + a), b;
  b = new sre.MathSimpleStore();
  return (this.subStores_[a] = b);
};
sre.MathCompoundStore.prototype.setupStore_ = function (a, b) {
  a.locale = this.locale;
  a.modality = this.modality;
  b && (a.category = b);
};
sre.MathCompoundStore.prototype.defineRules = function (a, b, c, d) {
  var e = this.getSubStore_(b);
  this.setupStore_(e, c);
  e.defineRulesFromMappings(a, b, d);
};
sre.MathCompoundStore.prototype.defineRule = function (a, b, c, d, e, f) {
  var g = this.getSubStore_(e);
  this.setupStore_(g, d);
  g.defineRuleFromStrings(a, b, c, e, f);
};
sre.MathCompoundStore.prototype.changeLocale_ = function (a) {
  if (!a.locale && !a.modality) return !1;
  this.locale = a.locale || this.locale;
  this.modality = a.modality || this.modality;
  return !0;
};
sre.MathCompoundStore.prototype.addSymbolRules = function (a) {
  if (!this.changeLocale_(a)) {
    var b = sre.MathSimpleStore.parseUnicode_(a.key);
    this.defineRules(a.key, b, a.category, a.mappings);
  }
};
sre.MathCompoundStore.prototype.addFunctionRules = function (a) {
  if (!this.changeLocale_(a)) {
    var b = a.names,
      c = a.mappings;
    a = a.category;
    for (var d = 0, e; (e = b[d]); d++) this.defineRules(e, e, a, c);
  }
};
sre.MathCompoundStore.prototype.addUnitRules = function (a) {
  this.changeLocale_(a) ||
    (a.si ? this.addSiUnitRules(a) : this.addUnitRules_(a));
};
sre.MathCompoundStore.prototype.addUnitRules_ = function (a) {
  var b = a.names;
  b &&
    (a.names = b.map(function (c) {
      return c + ":unit";
    }));
  this.addFunctionRules(a);
};
sre.MathCompoundStore.prototype.addSiUnitRules = function (a) {
  for (
    var b = $jscomp.makeIterator(Object.keys(this.siPrefixes)), c = b.next();
    !c.done;
    c = b.next()
  ) {
    var d = c.value;
    c = Object.assign({}, a);
    c.mappings = {};
    var e = this.siPrefixes[d];
    c.key = d + c.key;
    c.names = c.names.map(function (l) {
      return d + l;
    });
    for (
      var f = $jscomp.makeIterator(Object.keys(a.mappings)), g = f.next();
      !g.done;
      g = f.next()
    ) {
      g = g.value;
      c.mappings[g] = {};
      for (
        var h = $jscomp.makeIterator(Object.keys(a.mappings[g])), k = h.next();
        !k.done;
        k = h.next()
      )
        (k = k.value),
          (c.mappings[g][k] = sre.Locale[this.locale].SI(e, a.mappings[g][k]));
    }
    this.addUnitRules_(c);
  }
  this.addUnitRules_(a);
};
sre.MathCompoundStore.prototype.lookupRule = function (a, b) {
  return (a = this.subStores_[a]) ? a.lookupRule(null, b) : null;
};
sre.MathCompoundStore.prototype.lookupCategory = function (a) {
  return (a = this.subStores_[a]) ? a.category : "";
};
sre.MathCompoundStore.prototype.lookupString = function (a, b) {
  return (a = this.lookupRule(a, b))
    ? a.action.components
        .map(function (c) {
          return c.content.slice(1, -1);
        })
        .join(" ")
    : null;
};
sre.MathCompoundStore.prototype.enumerate = function (a) {
  a = a || {};
  for (var b in this.subStores_) a = this.subStores_[b].trie.enumerate(a);
  return a;
};
sre.MathSimpleStore.parseUnicode_ = function (a) {
  a = parseInt(a, 16);
  if (65536 > a) return String.fromCharCode(a);
  a -= 65536;
  return String.fromCharCode((a >> 10) + 55296, (a & 1023) + 56320);
};
sre.MathMap = function () {
  this.store = sre.MathCompoundStore.getInstance();
  this.loaded_ = [];
  this.addSymbols = {
    functions: goog.bind(this.store.addFunctionRules, this.store),
    symbols: goog.bind(this.store.addSymbolRules, this.store),
    units: goog.bind(this.store.addUnitRules, this.store),
    si: goog.bind(this.addSiPrefixes, this)
  };
};
goog.addSingletonGetter(sre.MathMap);
sre.MathMap.oldInst_ = sre.MathMap.getInstance;
sre.MathMap.prototype.addSiPrefixes = function (a) {
  this.store.siPrefixes = a;
};
sre.MathMap.getInstance = function () {
  var a = sre.MathMap.oldInst_();
  a.loadLocale();
  return a;
};
sre.MathMap.prototype.loadLocale = function () {
  var a = sre.Engine.getInstance().locale;
  -1 === this.loaded_.indexOf(a) &&
    ((sre.SpeechRuleEngine.getInstance().prune = !0),
    this.retrieveMaps(a),
    this.loaded_.push(a));
};
sre.MathMap.toFetch_ = 0;
sre.Engine.registerTest(function () {
  return sre.MathMap.getInstance() && !sre.MathMap.toFetch_;
});
sre.MathMap.prototype.retrieveFiles = function (a, b) {
  var c = sre.Engine.getInstance().mode === sre.Engine.Mode.ASYNC;
  c && (sre.Engine.getInstance().mode = sre.Engine.Mode.SYNC);
  switch (sre.Engine.getInstance().mode) {
    case sre.Engine.Mode.ASYNC:
      sre.MathMap.toFetch_++;
      sre.MathMap.fromFile_(a, function (d, e) {
        sre.MathMap.toFetch_--;
        d || b(e);
      });
      break;
    case sre.Engine.Mode.HTTP:
      sre.MathMap.toFetch_++;
      sre.MathMap.getJsonAjax_(a, b);
      break;
    default:
      (a = sre.MathMap.loadFile(a)), b(a);
  }
  c && (sre.Engine.getInstance().mode = sre.Engine.Mode.ASYNC);
};
sre.MathMap.prototype.parseMaps = function (a) {
  a = JSON.parse(a);
  this.addMaps(a);
};
sre.MathMap.prototype.addMaps = function (a, b) {
  for (var c = 0, d; (d = Object.keys(a)[c]); c++) {
    var e = d.split("/");
    (b && b !== e[0]) ||
      ("rules" !== e[1]
        ? a[d].forEach(this.addSymbols[e[1]])
        : sre.SpeechRuleEngine.getInstance().addStore(a[d]));
  }
};
sre.MathMap.prototype.retrieveMaps = function (a) {
  sre.AlphabetGenerator.generate(a, this.store);
  if (
    sre.Engine.getInstance().isIE &&
    sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP
  )
    this.getJsonIE_(a);
  else {
    a = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath) + a + ".js";
    var b = goog.bind(this.parseMaps, this);
    this.retrieveFiles(a, b);
  }
};
sre.MathMap.prototype.getJsonIE_ = function (a, b) {
  var c = b || 1;
  sre.BrowserUtil.mapsForIE
    ? this.addMaps(sre.BrowserUtil.mapsForIE, a)
    : 5 >= c &&
      setTimeout(
        goog.bind(function () {
          this.getJsonIE_(a, c++);
        }, this),
        300
      );
};
sre.MathMap.fromFile_ = function (a, b) {
  return sre.SystemExternal.fs.readFile(a, "utf8", b);
};
sre.MathMap.loadFile = function (a) {
  try {
    return sre.MathMap.readJSON_(a);
  } catch (b) {
    console.error("Unable to load file: " + a + "\n" + b);
  }
  return "{}";
};
sre.MathMap.readJSON_ = function (a) {
  return sre.SystemExternal.fs.readFileSync(a);
};
sre.MathMap.getJsonAjax_ = function (a, b) {
  var c = new XMLHttpRequest();
  c.onreadystatechange = function () {
    4 === c.readyState &&
      (sre.MathMap.toFetch_--, 200 === c.status && b(c.responseText));
  };
  c.open("GET", a, !0);
  c.send();
};
sre.NemethUtil = {};
sre.NemethUtil.openingFraction = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return (
    Array(a).join(sre.Messages.MS.FRACTION_REPEAT) +
    sre.Messages.MS.FRACTION_START
  );
};
sre.NemethUtil.closingFraction = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return (
    Array(a).join(sre.Messages.MS.FRACTION_REPEAT) +
    sre.Messages.MS.FRACTION_END
  );
};
sre.NemethUtil.overFraction = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return (
    Array(a).join(sre.Messages.MS.FRACTION_REPEAT) +
    sre.Messages.MS.FRACTION_OVER
  );
};
sre.NemethUtil.overBevelledFraction = function (a) {
  a = sre.MathspeakUtil.fractionNestingDepth(a);
  return (
    Array(a).join(sre.Messages.MS.FRACTION_REPEAT) +
    "\u2838" +
    sre.Messages.MS.FRACTION_OVER
  );
};
sre.NemethUtil.nestedRadical = function (a, b) {
  a = sre.NemethUtil.radicalNestingDepth(a);
  return 1 === a ? b : Array(a).join(sre.Messages.MS.NESTED) + b;
};
sre.NemethUtil.radicalNestingDepth = function (a, b) {
  b = b || 0;
  return a.parentNode
    ? sre.NemethUtil.radicalNestingDepth(
        a.parentNode,
        "root" === a.tagName || "sqrt" === a.tagName ? b + 1 : b
      )
    : b;
};
sre.NemethUtil.openingRadical = function (a) {
  return sre.NemethUtil.nestedRadical(a, sre.Messages.MS.STARTROOT);
};
sre.NemethUtil.closingRadical = function (a) {
  return sre.NemethUtil.nestedRadical(a, sre.Messages.MS.ENDROOT);
};
sre.NemethUtil.indexRadical = function (a) {
  return sre.NemethUtil.nestedRadical(a, sre.Messages.MS.ROOTINDEX);
};
sre.NemethUtil.enlargeFence = function (a) {
  if (1 === a.length) return "\u2820" + a;
  var b = a.split("");
  return b.every(function (c) {
    return "\u2833" === c;
  })
    ? "\u2820" + b.join("\u2820")
    : a.slice(0, 1) + "\u2820" + a.slice(1);
};
sre.Grammar.getInstance().setCorrection(
  "enlargeFence",
  sre.NemethUtil.enlargeFence
);
sre.NemethUtil.NUMBER_PROPAGATORS_ = [
  sre.SemanticAttr.Type.MULTIREL,
  sre.SemanticAttr.Type.RELSEQ,
  sre.SemanticAttr.Type.APPL,
  sre.SemanticAttr.Type.ROW,
  sre.SemanticAttr.Type.LINE
];
sre.NemethUtil.NUMBER_INHIBITORS_ = [
  sre.SemanticAttr.Type.SUBSCRIPT,
  sre.SemanticAttr.Type.SUPERSCRIPT,
  sre.SemanticAttr.Type.OVERSCORE,
  sre.SemanticAttr.Type.UNDERSCORE
];
sre.NemethUtil.checkParent_ = function (a, b) {
  a = a.parent;
  if (!a) return !1;
  var c = a.type;
  return -1 !== sre.NemethUtil.NUMBER_PROPAGATORS_.indexOf(c) ||
    (c === sre.SemanticAttr.Type.PREFIXOP &&
      a.role === sre.SemanticAttr.Role.NEGATIVE &&
      !b.script) ||
    (c === sre.SemanticAttr.Type.PREFIXOP &&
      a.role === sre.SemanticAttr.Role.GEOMETRY) ||
    (c === sre.SemanticAttr.Type.PUNCTUATED &&
      (!b.enclosed || a.role === sre.SemanticAttr.Role.TEXT))
    ? !0
    : !1;
};
sre.NemethUtil.propagateNumber = function (a, b) {
  if (!a.childNodes.length)
    return (
      sre.NemethUtil.checkParent_(a, b) &&
        ((b.number = !0), (b.script = !1), (b.enclosed = !1)),
      [
        b.number ? "number" : "",
        { number: !1, enclosed: b.enclosed, script: b.script }
      ]
    );
  -1 !== sre.NemethUtil.NUMBER_INHIBITORS_.indexOf(a.type) && (b.script = !0);
  if (a.type === sre.SemanticAttr.Type.FENCED)
    return (b.number = !1), (b.enclosed = !0), ["", b];
  sre.NemethUtil.checkParent_(a, b) && ((b.number = !0), (b.enclosed = !1));
  return ["", b];
};
sre.SemanticAnnotations.getInstance().register(
  new sre.SemanticVisitor("nemeth", "number", sre.NemethUtil.propagateNumber, {
    number: !0
  })
);
sre.NemethUtil.componentString_ = {
  2: "CSFbaseline",
  1: "CSFsubscript",
  0: "CSFsuperscript"
};
sre.NemethUtil.childNumber_ = { 4: 2, 3: 3, 2: 1, 1: 4, 0: 5 };
sre.NemethUtil.generateTensorRuleStrings_ = function (a) {
  var b = [],
    c = "";
  a = parseInt(a, 2);
  for (var d = 0; 5 > d; d++) {
    var e = "children/*[" + sre.NemethUtil.childNumber_[d] + "]";
    a & 1
      ? (c =
          "[t] " +
          sre.NemethUtil.componentString_[d % 3] +
          "Verbose; [n] " +
          e +
          ";" +
          c)
      : b.unshift("name(" + e + ')="empty"');
    a >>= 1;
  }
  b.push(c);
  return b;
};
sre.NemethUtil.generateTensorRules = function (a) {
  var b = goog.bind(a.defineRule, a);
  a = goog.bind(a.defineRulesAlias, a);
  for (
    var c =
        "11111 11110 11101 11100 10111 10110 10101 10100 01111 01110 01101 01100".split(
          " "
        ),
      d = 0,
      e;
    (e = c[d]);
    d++
  ) {
    var f = "tensor" + e;
    e = sre.NemethUtil.generateTensorRuleStrings_(e);
    var g = e.pop(),
      h = [f, "default", g, "self::tensor"].concat(e);
    b.apply(null, h);
    g += "; [t]" + sre.NemethUtil.componentString_[2] + "Verbose";
    f += "-baseline";
    h = [f, "default", g, "self::tensor", "following-sibling::*"].concat(e);
    b.apply(null, h);
    f = [
      f,
      "self::tensor",
      "not(following-sibling::*)",
      "ancestor::fraction|ancestor::punctuated|ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::relseq|ancestor::multirel|@embellished"
    ].concat(e);
    a.apply(null, f);
  }
};
sre.NemethUtil.relationIterator = function (a, b) {
  var c = a.slice(0),
    d = !0,
    e = 0 < a.length ? sre.XpathUtil.evalXPath("../../content/*", a[0]) : [];
  return function () {
    var f = e.shift(),
      g = c.shift(),
      h = c[0],
      k = b
        ? [sre.AuditoryDescription.create({ text: b }, { translate: !0 })]
        : [];
    if (!f) return k;
    var l = g
      ? sre.MathspeakUtil.nestedSubSuper(g, "", {
          sup: sre.Messages.MS.SUPER,
          sub: sre.Messages.MS.SUB
        })
      : "";
    g =
      (g && "EMPTY" !== sre.DomUtil.tagName(g)) ||
      (d && f.parentNode.parentNode && f.parentNode.parentNode.previousSibling)
        ? [sre.AuditoryDescription.create({ text: "\u2800" + l }, {})]
        : [];
    h =
      (h && "EMPTY" !== sre.DomUtil.tagName(h)) ||
      (!e.length &&
        f.parentNode.parentNode &&
        f.parentNode.parentNode.nextSibling)
        ? [sre.AuditoryDescription.create({ text: "\u2800" }, {})]
        : [];
    f = sre.SpeechRuleEngine.getInstance().evaluateNode(f);
    d = !1;
    return k.concat(g, f, h);
  };
};
sre.NemethUtil.implicitIterator = function (a, b) {
  var c = a.slice(0),
    d = 0 < a.length ? sre.XpathUtil.evalXPath("../../content/*", a[0]) : [];
  return function () {
    var e = c.shift(),
      f = c[0],
      g = d.shift(),
      h = b
        ? [sre.AuditoryDescription.create({ text: b }, { translate: !0 })]
        : [];
    if (!g) return h;
    e = e && "NUMBER" === sre.DomUtil.tagName(e);
    f = f && "NUMBER" === sre.DomUtil.tagName(f);
    return h.concat(
      e && f && g.getAttribute("role") === sre.SemanticAttr.Role.SPACE
        ? [sre.AuditoryDescription.create({ text: "\u2800" }, {})]
        : []
    );
  };
};
sre.StoreUtil = {};
sre.StoreUtil.nodeCounter = function (a, b) {
  var c = a.length,
    d = 0,
    e = b;
  b || (e = "");
  return function () {
    d < c && (d += 1);
    return e + " " + d;
  };
};
sre.StoreUtil.pauseSeparator = function (a, b) {
  a = parseFloat(b);
  var c = isNaN(a) ? b : a;
  return function () {
    return [
      sre.AuditoryDescription.create({ text: "", personality: { pause: c } })
    ];
  };
};
sre.StoreUtil.contentIterator = function (a, b) {
  var c = 0 < a.length ? sre.XpathUtil.evalXPath("../../content/*", a[0]) : [];
  return function () {
    var d = c.shift(),
      e = b
        ? [sre.AuditoryDescription.create({ text: b }, { translate: !0 })]
        : [];
    if (!d) return e;
    d = sre.SpeechRuleEngine.getInstance().evaluateNode(d);
    return e.concat(d);
  };
};
sre.PrefixRules = function () {
  sre.SpeechRules.getInstance().addStore("en.prefix.default", "", {
    CSFordinalPosition: sre.NumbersUtil.ordinalPosition
  });
};
sre.OtherRules = function () {
  sre.SpeechRules.getInstance().addStore("en.speech.chromevox", "", {
    CTFnodeCounter: sre.StoreUtil.nodeCounter,
    CTFcontentIterator: sre.StoreUtil.contentIterator
  });
  sre.SpeechRules.getInstance().addStore(
    "en.speech.emacspeak",
    "en.speech.chromevox",
    {
      CQFvulgarFractionSmall: sre.MathspeakUtil.isSmallVulgarFraction,
      CSFvulgarFraction: sre.NumbersUtil.vulgarFraction
    }
  );
};
sre.BrailleRules = function () {
  sre.SpeechRules.getInstance().addStore(
    "nemeth.braille.default",
    "en.speech.mathspeak",
    {
      CSFopenFraction: sre.NemethUtil.openingFraction,
      CSFcloseFraction: sre.NemethUtil.closingFraction,
      CSFoverFraction: sre.NemethUtil.overFraction,
      CSFoverBevFraction: sre.NemethUtil.overBevelledFraction,
      CSFopenRadical: sre.NemethUtil.openingRadical,
      CSFcloseRadical: sre.NemethUtil.closingRadical,
      CSFindexRadical: sre.NemethUtil.indexRadical,
      CSFsubscript: sre.MathspeakUtil.subscriptVerbose,
      CSFsuperscript: sre.MathspeakUtil.superscriptVerbose,
      CSFbaseline: sre.MathspeakUtil.baselineVerbose,
      CGFtensorRules: sre.NemethUtil.generateTensorRules,
      CTFrelationIterator: sre.NemethUtil.relationIterator,
      CTFimplicitIterator: sre.NemethUtil.implicitIterator
    }
  );
};
sre.ClearspeakUtil = {};
sre.ClearspeakUtil.numbersToAlpha = function (a) {
  return a.match(/\d+/)
    ? sre.Messages.NUMBERS.numberToWords(parseInt(a, 10))
    : a;
};
sre.Grammar.getInstance().setPreprocessor(
  "numbers2alpha",
  sre.ClearspeakUtil.numbersToAlpha
);
sre.ClearspeakUtil.nodeCounter = function (a, b) {
  b = b.split("-");
  var c = sre.StoreUtil.nodeCounter(a, b[0] || ""),
    d = b[1] || "",
    e = b[2] || "",
    f = !0;
  return function () {
    var g = c();
    return f ? ((f = !1), e + g + d) : g + d;
  };
};
sre.ClearspeakUtil.isSimpleExpression = function (a) {
  return (
    sre.ClearspeakUtil.isSimpleNumber_(a) ||
    sre.ClearspeakUtil.isSimpleLetters_(a) ||
    sre.ClearspeakUtil.isSimpleDegree_(a) ||
    sre.ClearspeakUtil.isSimpleNegative_(a) ||
    sre.ClearspeakUtil.isSimpleFunction_(a)
  );
};
sre.ClearspeakUtil.isSimpleFunction_ = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.APPL &&
    (a.childNodes[0].role === sre.SemanticAttr.Role.PREFIXFUNC ||
      a.childNodes[0].role === sre.SemanticAttr.Role.SIMPLEFUNC) &&
    (sre.ClearspeakUtil.isSimple_(a.childNodes[1]) ||
      (a.childNodes[1].type === sre.SemanticAttr.Type.FENCED &&
        sre.ClearspeakUtil.isSimple_(a.childNodes[1].childNodes[0])))
  );
};
sre.ClearspeakUtil.isSimpleNegative_ = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.PREFIXOP &&
    a.role === sre.SemanticAttr.Role.NEGATIVE &&
    sre.ClearspeakUtil.isSimple_(a.childNodes[0]) &&
    a.childNodes[0].type !== sre.SemanticAttr.Type.PREFIXOP &&
    a.childNodes[0].type !== sre.SemanticAttr.Type.APPL &&
    a.childNodes[0].type !== sre.SemanticAttr.Type.PUNCTUATED
  );
};
sre.ClearspeakUtil.isSimpleDegree_ = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.PUNCTUATED &&
    a.role === sre.SemanticAttr.Role.ENDPUNCT &&
    2 === a.childNodes.length &&
    a.childNodes[1].role === sre.SemanticAttr.Role.DEGREE &&
    (sre.ClearspeakUtil.isLetter_(a.childNodes[0]) ||
      sre.ClearspeakUtil.isNumber_(a.childNodes[0]) ||
      (a.childNodes[0].type === sre.SemanticAttr.Type.PREFIXOP &&
        a.childNodes[0].role === sre.SemanticAttr.Role.NEGATIVE &&
        (sre.ClearspeakUtil.isLetter_(a.childNodes[0].childNodes[0]) ||
          sre.ClearspeakUtil.isNumber_(a.childNodes[0].childNodes[0]))))
  );
};
sre.ClearspeakUtil.isSimpleLetters_ = function (a) {
  return (
    sre.ClearspeakUtil.isLetter_(a) ||
    (a.type === sre.SemanticAttr.Type.INFIXOP &&
      a.role === sre.SemanticAttr.Role.IMPLICIT &&
      ((2 === a.childNodes.length &&
        (sre.ClearspeakUtil.isLetter_(a.childNodes[0]) ||
          sre.ClearspeakUtil.isSimpleNumber_(a.childNodes[0])) &&
        sre.ClearspeakUtil.isLetter_(a.childNodes[1])) ||
        (3 === a.childNodes.length &&
          sre.ClearspeakUtil.isSimpleNumber_(a.childNodes[0]) &&
          sre.ClearspeakUtil.isLetter_(a.childNodes[1]) &&
          sre.ClearspeakUtil.isLetter_(a.childNodes[2]))))
  );
};
sre.ClearspeakUtil.isSimple_ = function (a) {
  return a.hasAnnotation("clearspeak", "simple");
};
sre.ClearspeakUtil.isLetter_ = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.IDENTIFIER &&
    (a.role === sre.SemanticAttr.Role.LATINLETTER ||
      a.role === sre.SemanticAttr.Role.GREEKLETTER ||
      a.role === sre.SemanticAttr.Role.OTHERLETTER ||
      a.role === sre.SemanticAttr.Role.SIMPLEFUNC)
  );
};
sre.ClearspeakUtil.isNumber_ = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.NUMBER &&
    (a.role === sre.SemanticAttr.Role.INTEGER ||
      a.role === sre.SemanticAttr.Role.FLOAT)
  );
};
sre.ClearspeakUtil.isSimpleNumber_ = function (a) {
  return (
    sre.ClearspeakUtil.isNumber_(a) || sre.ClearspeakUtil.isSimpleFraction_(a)
  );
};
sre.ClearspeakUtil.isSimpleFraction_ = function (a) {
  if (
    sre.ClearspeakUtil.hasPreference("Fraction_Over") ||
    sre.ClearspeakUtil.hasPreference("Fraction_FracOver") ||
    a.type !== sre.SemanticAttr.Type.FRACTION ||
    a.role !== sre.SemanticAttr.Role.VULGAR
  )
    return !1;
  if (sre.ClearspeakUtil.hasPreference("Fraction_Ordinal")) return !0;
  var b = parseInt(a.childNodes[0].textContent, 10);
  a = parseInt(a.childNodes[1].textContent, 10);
  return 0 < b && 20 > b && 0 < a && 11 > a;
};
sre.ClearspeakUtil.hasPreference = function (a) {
  return sre.Engine.getInstance().style === a;
};
sre.SemanticAnnotations.getInstance().register(
  new sre.SemanticAnnotator("clearspeak", "simple", function (a) {
    return sre.ClearspeakUtil.isSimpleExpression(a) ? "simple" : "";
  })
);
sre.ClearspeakUtil.simpleNode = function (a) {
  if (!a.hasAttribute("annotation")) return !1;
  a = a.getAttribute("annotation");
  return !!/clearspeak:simple$|clearspeak:simple;/.exec(a);
};
sre.ClearspeakUtil.simpleCell_ = function (a) {
  if (sre.ClearspeakUtil.simpleNode(a)) return !0;
  if (a.tagName !== sre.SemanticAttr.Type.SUBSCRIPT) return !1;
  a = a.childNodes[0].childNodes;
  var b = a[1];
  return (
    a[0].tagName === sre.SemanticAttr.Type.IDENTIFIER &&
    (sre.ClearspeakUtil.isInteger_(b) ||
      (b.tagName === sre.SemanticAttr.Type.INFIXOP &&
        b.hasAttribute("role") &&
        b.getAttribute("role") === sre.SemanticAttr.Role.IMPLICIT &&
        sre.ClearspeakUtil.allIndices_(b)))
  );
};
sre.ClearspeakUtil.isInteger_ = function (a) {
  return (
    a.tagName === sre.SemanticAttr.Type.NUMBER &&
    a.hasAttribute("role") &&
    a.getAttribute("role") === sre.SemanticAttr.Role.INTEGER
  );
};
sre.ClearspeakUtil.allIndices_ = function (a) {
  return sre.XpathUtil.evalXPath("children/*", a).every(function (b) {
    return (
      sre.ClearspeakUtil.isInteger_(b) ||
      b.tagName === sre.SemanticAttr.Type.IDENTIFIER
    );
  });
};
sre.ClearspeakUtil.allCellsSimple = function (a) {
  return sre.XpathUtil.evalXPath(
    a.tagName === sre.SemanticAttr.Type.MATRIX
      ? "children/row/children/cell/children/*"
      : "children/line/children/*",
    a
  ).every(sre.ClearspeakUtil.simpleCell_)
    ? [a]
    : [];
};
sre.ClearspeakUtil.isSmallVulgarFraction = function (a) {
  return sre.NumbersUtil.vulgarFractionSmall(a, 20, 11) ? [a] : [];
};
sre.ClearspeakUtil.isUnitExpression = function (a) {
  return (
    a.type === sre.SemanticAttr.Type.TEXT ||
    (a.type === sre.SemanticAttr.Type.PUNCTUATED &&
      a.role === sre.SemanticAttr.Role.TEXT &&
      sre.ClearspeakUtil.isNumber_(a.childNodes[0]) &&
      sre.ClearspeakUtil.allTextLastContent_(a.childNodes.slice(1))) ||
    (a.type === sre.SemanticAttr.Type.IDENTIFIER &&
      a.role === sre.SemanticAttr.Role.UNIT) ||
    (a.type === sre.SemanticAttr.Type.INFIXOP &&
      (a.role === sre.SemanticAttr.Role.IMPLICIT ||
        a.role === sre.SemanticAttr.Role.UNIT))
  );
};
sre.ClearspeakUtil.allTextLastContent_ = function (a) {
  for (var b = 0; b < a.length - 1; b++)
    if (a[b].type !== sre.SemanticAttr.Type.TEXT || "" !== a[b].textContent)
      return !1;
  return a[a.length - 1].type === sre.SemanticAttr.Type.TEXT;
};
sre.SemanticAnnotations.getInstance().register(
  new sre.SemanticAnnotator("clearspeak", "unit", function (a) {
    return sre.ClearspeakUtil.isUnitExpression(a) ? "unit" : "";
  })
);
sre.ClearspeakUtil.ordinalExponent = function (a) {
  var b = parseInt(a.textContent, 10);
  return isNaN(b)
    ? a.textContent
    : 10 < b
    ? sre.Messages.NUMBERS.simpHardworkrdinal(b)
    : sre.Messages.NUMBERS.wordOrdinal(b);
};
sre.ClearspeakUtil.isCapitalLetter = function (a) {
  return "Lu" ===
    sre.MathCompoundStore.getInstance().lookupCategory(a.textContent)
    ? [a]
    : [];
};
sre.ClearspeakUtil.NESTING_DEPTH = null;
sre.ClearspeakUtil.nestingDepth = function (a) {
  var b = 0,
    c = a.textContent,
    d = "open" === a.getAttribute("role") ? 0 : 1;
  for (a = a.parentNode; a; )
    a.tagName === sre.SemanticAttr.Type.FENCED &&
      a.childNodes[0].childNodes[d].textContent === c &&
      b++,
      (a = a.parentNode);
  sre.ClearspeakUtil.NESTING_DEPTH =
    1 < b ? sre.Messages.NUMBERS.wordOrdinal(b) : "";
  return sre.ClearspeakUtil.NESTING_DEPTH;
};
sre.ClearspeakUtil.matchingFences = function (a) {
  var b = a.previousSibling;
  if (b) var c = a;
  else (b = a), (c = a.nextSibling);
  return c
    ? sre.SemanticAttr.isMatchingFence(b.textContent, c.textContent)
      ? [a]
      : []
    : [];
};
sre.ClearspeakUtil.insertNesting = function (a, b) {
  if (!b || !a) return a;
  var c = a.match(/^(open|close) /);
  return c ? c[0] + b + " " + a.substring(c[0].length) : b + " " + a;
};
sre.Grammar.getInstance().setCorrection(
  "insertNesting",
  sre.ClearspeakUtil.insertNesting
);
sre.ClearspeakUtil.fencedArguments = function (a) {
  var b = sre.DomUtil.toArray(a.parentNode.childNodes),
    c = sre.XpathUtil.evalXPath("../../children/*", a);
  b = b.indexOf(a);
  return sre.ClearspeakUtil.fencedFactor_(c[b]) ||
    sre.ClearspeakUtil.fencedFactor_(c[b + 1])
    ? [a]
    : [];
};
sre.ClearspeakUtil.simpleArguments = function (a) {
  var b = sre.DomUtil.toArray(a.parentNode.childNodes),
    c = sre.XpathUtil.evalXPath("../../children/*", a);
  b = b.indexOf(a);
  return sre.ClearspeakUtil.simpleFactor_(c[b]) &&
    c[b + 1] &&
    (sre.ClearspeakUtil.simpleFactor_(c[b + 1]) ||
      c[b + 1].tagName === sre.SemanticAttr.Type.ROOT ||
      c[b + 1].tagName === sre.SemanticAttr.Type.SQRT ||
      (c[b + 1].tagName === sre.SemanticAttr.Type.SUPERSCRIPT &&
        c[b + 1].childNodes[0].childNodes[0] &&
        (c[b + 1].childNodes[0].childNodes[0].tagName ===
          sre.SemanticAttr.Type.NUMBER ||
          c[b + 1].childNodes[0].childNodes[0].tagName ===
            sre.SemanticAttr.Type.IDENTIFIER) &&
        ("2" === c[b + 1].childNodes[0].childNodes[1].textContent ||
          "3" === c[b + 1].childNodes[0].childNodes[1].textContent)))
    ? [a]
    : [];
};
sre.ClearspeakUtil.simpleFactor_ = function (a) {
  return (
    !!a &&
    (a.tagName === sre.SemanticAttr.Type.NUMBER ||
      a.tagName === sre.SemanticAttr.Type.IDENTIFIER ||
      a.tagName === sre.SemanticAttr.Type.FUNCTION ||
      a.tagName === sre.SemanticAttr.Type.APPL ||
      a.tagName === sre.SemanticAttr.Type.FRACTION)
  );
};
sre.ClearspeakUtil.fencedFactor_ = function (a) {
  return (
    a &&
    (a.tagName === sre.SemanticAttr.Type.FENCED ||
      (a.hasAttribute("role") &&
        a.getAttribute("role") === sre.SemanticAttr.Role.LEFTRIGHT) ||
      sre.ClearspeakUtil.layoutFactor_(a))
  );
};
sre.ClearspeakUtil.layoutFactor_ = function (a) {
  return (
    !!a &&
    (a.tagName === sre.SemanticAttr.Type.MATRIX ||
      a.tagName === sre.SemanticAttr.Type.VECTOR)
  );
};
sre.ClearspeakUtil.isHyperbolic = function (a) {
  if (a.tagName === sre.SemanticAttr.Type.APPL) {
    var b = sre.XpathUtil.evalXPath("children/*[1]", a)[0];
    if (
      b &&
      b.tagName === sre.SemanticAttr.Type.FUNCTION &&
      "Hyperbolic" ===
        sre.MathCompoundStore.getInstance().lookupCategory(b.textContent)
    )
      return [a];
  }
  return [];
};
sre.ClearspeakUtil.isLogarithmWithBase = function (a) {
  if (a.tagName === sre.SemanticAttr.Type.SUBSCRIPT) {
    var b = sre.XpathUtil.evalXPath("children/*[1]", a)[0];
    if (
      b &&
      b.tagName === sre.SemanticAttr.Type.FUNCTION &&
      "Logarithm" ===
        sre.MathCompoundStore.getInstance().lookupCategory(b.textContent)
    )
      return [a];
  }
  return [];
};
sre.ClearspeakUtil.wordOrdinal = function (a) {
  return sre.Messages.NUMBERS.wordOrdinal(parseInt(a.textContent, 10));
};
sre.ClearspeakUtil.firstCurrency = function (a) {
  var b = sre.XpathUtil.evalXPath("children/*[1]", a)[0];
  return b &&
    "currency" ===
      sre.MathCompoundStore.getInstance().lookupCategory(
        b.textContent + ":unit"
      )
    ? [a]
    : [];
};
sre.ClearspeakUtil.lastCurrency = function (a) {
  var b = sre.XpathUtil.evalXPath("children/*[last()]", a)[0];
  return b &&
    "currency" ===
      sre.MathCompoundStore.getInstance().lookupCategory(
        b.textContent + ":unit"
      )
    ? [a]
    : [];
};
sre.ClearspeakUtil.isLengthUnit = function (a) {
  var b = sre.XpathUtil.evalXPath("children/*[1]", a)[0];
  return b &&
    "length" ===
      sre.MathCompoundStore.getInstance().lookupCategory(
        b.textContent.trim() + ":unit"
      )
    ? [a]
    : [];
};
sre.SpeechRules = function () {
  this.store = {};
};
goog.addSingletonGetter(sre.SpeechRules);
sre.SpeechRules.prototype.addStore = function (a, b, c) {
  var d = {};
  b && Object.assign(d, this.store[b] || {});
  this.store[a] = Object.assign(d, c);
};
sre.SpeechRules.prototype.getStore = function (a, b, c) {
  return (
    this.store[[a, b, c].join(".")] ||
    this.store[
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE], b, c].join(
        "."
      )
    ] ||
    {}
  );
};
sre.ClearspeakRules = function () {
  sre.SpeechRules.getInstance().addStore("en.speech.clearspeak", "", {
    CTFpauseSeparator: sre.StoreUtil.pauseSeparator,
    CTFnodeCounter: sre.ClearspeakUtil.nodeCounter,
    CTFcontentIterator: sre.StoreUtil.contentIterator,
    CSFvulgarFraction: sre.NumbersUtil.vulgarFraction,
    CQFvulgarFractionSmall: sre.ClearspeakUtil.isSmallVulgarFraction,
    CQFcellsSimple: sre.ClearspeakUtil.allCellsSimple,
    CSFordinalExponent: sre.ClearspeakUtil.ordinalExponent,
    CSFwordOrdinal: sre.ClearspeakUtil.wordOrdinal,
    CQFisCapital: sre.ClearspeakUtil.isCapitalLetter,
    CQFmatchingFences: sre.ClearspeakUtil.matchingFences,
    CSFnestingDepth: sre.ClearspeakUtil.nestingDepth,
    CQFfencedArguments: sre.ClearspeakUtil.fencedArguments,
    CQFsimpleArguments: sre.ClearspeakUtil.simpleArguments,
    CQFisHyperbolic: sre.ClearspeakUtil.isHyperbolic,
    CQFisLogarithm: sre.ClearspeakUtil.isLogarithmWithBase,
    CQFspaceoutNumber: sre.MathspeakUtil.spaceoutNumber,
    CQFisLengthUnit: sre.ClearspeakUtil.isLengthUnit,
    CQFfirstCurrency: sre.ClearspeakUtil.firstCurrency,
    CQFlastCurrency: sre.ClearspeakUtil.lastCurrency
  });
  sre.SpeechRules.getInstance().addStore(
    "fr.speech.clearspeak",
    "en.speech.clearspeak",
    {}
  );
  sre.SpeechRules.getInstance().addStore(
    "de.speech.clearspeak",
    "en.speech.clearspeak",
    {}
  );
};
sre.MathspeakFrenchUtil = {};
sre.MathspeakFrenchUtil.smallRoot = function (a) {
  if (!a.childNodes || 0 === a.childNodes.length || !a.childNodes[0].childNodes)
    return [];
  var b = a.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(b)) return [];
  b = parseInt(b, 10);
  return 1 < b && 3 >= b ? [a] : [];
};
sre.MathspeakFrenchUtil.baselineVerbose = function (a) {
  return sre.MathspeakUtil.baselineVerbose(a).replace(/\-$/, "");
};
sre.MathspeakFrenchUtil.baselineBrief = function (a) {
  return sre.MathspeakUtil.baselineBrief(a).replace(/\-$/, "");
};
sre.MathspeakFrenchUtil.leftSuperscriptVerbose = function (a) {
  return sre.MathspeakUtil.superscriptVerbose(a).replace(
    /^exposant/,
    "exposant gauche"
  );
};
sre.MathspeakFrenchUtil.leftSubscriptVerbose = function (a) {
  return sre.MathspeakUtil.subscriptVerbose(a).replace(
    /^indice/,
    "indice gauche"
  );
};
sre.MathspeakFrenchUtil.leftSuperscriptBrief = function (a) {
  return sre.MathspeakUtil.superscriptBrief(a).replace(/^sup/, "sup gauche");
};
sre.MathspeakFrenchUtil.leftSubscriptBrief = function (a) {
  return sre.MathspeakUtil.subscriptBrief(a).replace(/^sub/, "sub gauche");
};
sre.MathspeakSpanishUtil = {};
sre.MathspeakSpanishUtil.ordinalCounter = function (a, b) {
  var c = 0;
  return function () {
    return sre.Messages.NUMBERS.numberToOrdinal(++c, !1) + " " + b;
  };
};
sre.MathspeakSpanishUtil.smallRoot = function (a) {
  if (!a.childNodes || 0 === a.childNodes.length || !a.childNodes[0].childNodes)
    return [];
  var b = a.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(b)) return [];
  b = parseInt(b, 10);
  return 1 < b && 10 >= b ? [a] : [];
};
sre.UnitUtil = {};
sre.UnitUtil.unitMultipliers = function (a, b) {
  var c = 0;
  return function () {
    var d = sre.AuditoryDescription.create(
      {
        text:
          sre.UnitUtil.rightMostUnit(a[c]) &&
          sre.UnitUtil.leftMostUnit(a[c + 1])
            ? sre.Messages.UNIT_TIMES
            : ""
      },
      {}
    );
    c++;
    return [d];
  };
};
sre.UnitUtil.SCRIPT_ELEMENTS = [
  sre.SemanticAttr.Type.SUPERSCRIPT,
  sre.SemanticAttr.Type.SUBSCRIPT,
  sre.SemanticAttr.Type.OVERSCORE,
  sre.SemanticAttr.Type.UNDERSCORE
];
sre.UnitUtil.rightMostUnit = function (a) {
  for (; a; ) {
    if ("unit" === a.getAttribute("role")) return !0;
    var b = a.tagName;
    a = sre.XpathUtil.evalXPath("children/*", a);
    a = -1 !== sre.UnitUtil.SCRIPT_ELEMENTS.indexOf(b) ? a[0] : a[a.length - 1];
  }
  return !1;
};
sre.UnitUtil.leftMostUnit = function (a) {
  for (; a; ) {
    if ("unit" === a.getAttribute("role")) return !0;
    a = sre.XpathUtil.evalXPath("children/*", a)[0];
  }
  return !1;
};
sre.UnitUtil.oneLeft = function (a) {
  for (; a; ) {
    if ("number" === a.tagName && "1" === a.textContent) return [a];
    if (
      "infixop" !== a.tagName ||
      ("multiplication" !== a.getAttribute("role") &&
        "implicit" !== a.getAttribute("role"))
    )
      break;
    a = sre.XpathUtil.evalXPath("children/*", a)[0];
  }
  return [];
};
sre.MathspeakRules = function () {
  sre.SpeechRules.getInstance().addStore("en.speech.mathspeak", "", {
    CQFspaceoutNumber: sre.MathspeakUtil.spaceoutNumber,
    CQFspaceoutIdentifier: sre.MathspeakUtil.spaceoutIdentifier,
    CSFspaceoutText: sre.MathspeakUtil.spaceoutText,
    CSFopenFracVerbose: sre.MathspeakUtil.openingFractionVerbose,
    CSFcloseFracVerbose: sre.MathspeakUtil.closingFractionVerbose,
    CSFoverFracVerbose: sre.MathspeakUtil.overFractionVerbose,
    CSFopenFracBrief: sre.MathspeakUtil.openingFractionBrief,
    CSFcloseFracBrief: sre.MathspeakUtil.closingFractionBrief,
    CSFopenFracSbrief: sre.MathspeakUtil.openingFractionSbrief,
    CSFcloseFracSbrief: sre.MathspeakUtil.closingFractionSbrief,
    CSFoverFracSbrief: sre.MathspeakUtil.overFractionSbrief,
    CSFvulgarFraction: sre.NumbersUtil.vulgarFraction,
    CQFvulgarFractionSmall: sre.MathspeakUtil.isSmallVulgarFraction,
    CSFopenRadicalVerbose: sre.MathspeakUtil.openingRadicalVerbose,
    CSFcloseRadicalVerbose: sre.MathspeakUtil.closingRadicalVerbose,
    CSFindexRadicalVerbose: sre.MathspeakUtil.indexRadicalVerbose,
    CSFopenRadicalBrief: sre.MathspeakUtil.openingRadicalBrief,
    CSFcloseRadicalBrief: sre.MathspeakUtil.closingRadicalBrief,
    CSFindexRadicalBrief: sre.MathspeakUtil.indexRadicalBrief,
    CSFopenRadicalSbrief: sre.MathspeakUtil.openingRadicalSbrief,
    CSFindexRadicalSbrief: sre.MathspeakUtil.indexRadicalSbrief,
    CSFsuperscriptVerbose: sre.MathspeakUtil.superscriptVerbose,
    CSFsuperscriptBrief: sre.MathspeakUtil.superscriptBrief,
    CSFsubscriptVerbose: sre.MathspeakUtil.subscriptVerbose,
    CSFsubscriptBrief: sre.MathspeakUtil.subscriptBrief,
    CSFbaselineVerbose: sre.MathspeakUtil.baselineVerbose,
    CSFbaselineBrief: sre.MathspeakUtil.baselineBrief,
    CSFleftsuperscriptVerbose: sre.MathspeakUtil.superscriptVerbose,
    CSFleftsubscriptVerbose: sre.MathspeakUtil.subscriptVerbose,
    CSFrightsuperscriptVerbose: sre.MathspeakUtil.superscriptVerbose,
    CSFrightsubscriptVerbose: sre.MathspeakUtil.subscriptVerbose,
    CSFleftsuperscriptBrief: sre.MathspeakUtil.superscriptBrief,
    CSFleftsubscriptBrief: sre.MathspeakUtil.subscriptBrief,
    CSFrightsuperscriptBrief: sre.MathspeakUtil.superscriptBrief,
    CSFrightsubscriptBrief: sre.MathspeakUtil.subscriptBrief,
    CSFunderscript: sre.MathspeakUtil.nestedUnderscore,
    CSFoverscript: sre.MathspeakUtil.nestedOverscore,
    CTFordinalCounter: sre.NumbersUtil.ordinalCounter,
    CTFcontentIterator: sre.StoreUtil.contentIterator,
    CQFdetIsSimple: sre.MathspeakUtil.determinantIsSimple,
    CSFRemoveParens: sre.MathspeakUtil.removeParens,
    CQFresetNesting: sre.MathspeakUtil.resetNestingDepth,
    CGFbaselineConstraint: sre.MathspeakUtil.generateBaselineConstraint,
    CGFtensorRules: sre.MathspeakUtil.generateTensorRules
  });
  sre.SpeechRules.getInstance().addStore(
    "es.speech.mathspeak",
    "en.speech.mathspeak",
    {
      CQFisSmallRoot: sre.MathspeakSpanishUtil.smallRoot,
      CTFordinalCounter: sre.MathspeakSpanishUtil.ordinalCounter,
      CTFunitMultipliers: sre.UnitUtil.unitMultipliers,
      CQFoneLeft: sre.UnitUtil.oneLeft
    }
  );
  sre.SpeechRules.getInstance().addStore(
    "fr.speech.mathspeak",
    "en.speech.mathspeak",
    {
      CQFisSmallRoot: sre.MathspeakFrenchUtil.smallRoot,
      CSFbaselineVerbose: sre.MathspeakFrenchUtil.baselineVerbose,
      CSFbaselineBrief: sre.MathspeakFrenchUtil.baselineBrief,
      CSFleftsuperscriptVerbose: sre.MathspeakFrenchUtil.leftSuperscriptVerbose,
      CSFleftsubscriptVerbose: sre.MathspeakFrenchUtil.leftSubscriptVerbose,
      CSFleftsuperscriptBrief: sre.MathspeakFrenchUtil.leftSuperscriptBrief,
      CSFleftsubscriptBrief: sre.MathspeakFrenchUtil.leftSubscriptBrief,
      CQFisLogarithm: sre.ClearspeakUtil.isLogarithmWithBase
    }
  );
};
sre.SpeechRuleStores = {};
sre.SpeechRuleStores.INIT_ = !1;
sre.SpeechRuleStores.init = function () {
  sre.SpeechRuleStores.INIT_ ||
    (sre.MathspeakRules(),
    sre.ClearspeakRules(),
    sre.PrefixRules(),
    sre.OtherRules(),
    sre.BrailleRules(),
    (sre.SpeechRuleStores.INIT_ = !0));
};
sre.SpeechRuleEngine = function () {
  this.activeStore_ = new sre.MathStore();
  this.ready_ = !0;
  this.evaluators_ = {};
  this.prune = !0;
  sre.Engine.registerTest(
    goog.bind(function (a) {
      return this.ready_;
    }, this)
  );
};
goog.addSingletonGetter(sre.SpeechRuleEngine);
sre.SpeechRuleEngine.prototype.storeFactory_ = function (a) {
  return new ({ braille: sre.BrailleStore, speech: sre.MathStore }[a] ||
    sre.MathStore)();
};
sre.SpeechRuleEngine.updateEvaluator = function (a) {
  for (; a && !a.evaluate; ) a = a.parentNode;
  a.evaluate && (sre.XpathUtil.currentDocument = a);
};
sre.SpeechRuleEngine.prototype.evaluateNode = function (a) {
  sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP &&
    sre.SpeechRuleEngine.updateEvaluator(a);
  var b = new Date().getTime();
  a = this.evaluateNode_(a);
  var c = new Date().getTime();
  sre.Debugger.getInstance().output("Time:", c - b);
  return a;
};
sre.SpeechRuleEngine.prototype.evaluateNode_ = function (a) {
  if (!a) return [];
  this.updateConstraint_();
  return this.evaluateTree_(a);
};
sre.SpeechRuleEngine.prototype.evaluateTree_ = function (a) {
  var b = sre.Engine.getInstance();
  sre.Debugger.getInstance().output(
    b.mode !== sre.Engine.Mode.HTTP ? a.toString() : a
  );
  sre.Grammar.getInstance().setAttribute(a);
  var c = this.activeStore_.lookupRule(a, b.dynamicCstr);
  if (!c) {
    if (b.strict) return [];
    var d = this.getEvaluator(b.locale, b.modality)(a);
    a.attributes && this.addPersonality_(d, {}, !1, a);
    return d;
  }
  sre.Debugger.getInstance().generateOutput(
    goog.bind(function () {
      return [
        "Apply Rule:",
        c.name,
        c.dynamicCstr.toString(),
        b.mode !== sre.Engine.Mode.HTTP ? a.toString() : a
      ];
    }, this)
  );
  var e = c.context || this.activeStore_.context,
    f = c.action.components;
  d = [];
  for (var g = 0, h; (h = f[g]); g++) {
    var k = [],
      l = h.content || "",
      m = h.attributes || {},
      n = !1;
    h.grammar && this.processGrammar(e, a, h.grammar);
    var p = null;
    if (m.engine) {
      p = sre.Engine.getInstance().dynamicCstr.getComponents();
      var r = sre.Grammar.parseInput(m.engine);
      sre.Engine.getInstance().setDynamicCstr(r);
    }
    switch (h.type) {
      case sre.SpeechRule.Type.NODE:
        (l = e.applyQuery(a, l)) && (k = this.evaluateTree_(l));
        break;
      case sre.SpeechRule.Type.MULTI:
        n = !0;
        l = e.applySelector(a, l);
        0 < l.length &&
          (k = this.evaluateNodeList_(
            e,
            l,
            m.sepFunc,
            e.constructString(a, m.separator),
            m.ctxtFunc,
            e.constructString(a, m.context)
          ));
        break;
      case sre.SpeechRule.Type.TEXT:
        var q = m.span;
        r = {};
        q &&
          ((q = sre.XpathUtil.evalXPath(q, a)),
          q.length && (r.extid = q[0].getAttribute("extid")));
        (l = e.constructString(a, l)) &&
          (k = Array.isArray(l)
            ? l.map(function (t) {
                return sre.AuditoryDescription.create(
                  { text: t.string, attributes: t.attributes },
                  { adjust: !0 }
                );
              })
            : [
                sre.AuditoryDescription.create(
                  { text: l, attributes: r },
                  { adjust: !0 }
                )
              ]);
        break;
      default:
        k = [sre.AuditoryDescription.create({ text: l })];
    }
    k[0] &&
      !n &&
      (m.context &&
        (k[0].context = e.constructString(a, m.context) + (k[0].context || "")),
      m.annotation && (k[0].annotation = m.annotation));
    h.grammar && sre.Grammar.getInstance().popState();
    d = d.concat(this.addPersonality_(k, m, n, a));
    p && sre.Engine.getInstance().setDynamicCstr(p);
  }
  return d;
};
sre.SpeechRuleEngine.prototype.evaluateNodeList_ = function (a, b, c, d, e, f) {
  if (b == []) return [];
  var g = d || "",
    h = f || "";
  d = (d = a.contextFunctions.lookup(e))
    ? d(b, h)
    : function () {
        return h;
      };
  a = (a = a.contextFunctions.lookup(c))
    ? a(b, g)
    : function () {
        return sre.AuditoryDescription.create({ text: g }, { translate: !0 });
      };
  c = [];
  for (e = 0; (f = b[e]); e++)
    (f = this.evaluateTree_(f)),
      0 < f.length &&
        ((f[0].context = d() + (f[0].context || "")),
        (c = c.concat(f)),
        e < b.length - 1 && ((f = a()), (c = c.concat(f))));
  return c;
};
sre.SpeechRuleEngine.prototype.addPersonality_ = function (a, b, c, d) {
  var e = {},
    f = null,
    g;
  for (g in sre.Engine.personalityProps) {
    var h = b[sre.Engine.personalityProps[g]];
    if ("undefined" !== typeof h) {
      var k = parseFloat(h);
      h = isNaN(k) ? ('"' == h.charAt(0) ? h.slice(1, -1) : h) : k;
      sre.Engine.personalityProps[g] === sre.Engine.personalityProps.PAUSE
        ? (f = h)
        : (e[sre.Engine.personalityProps[g]] = h);
    }
  }
  for (b = 0; (g = a[b]); b++)
    this.addRelativePersonality_(g, e), this.addExternalAttributes_(g, d);
  c &&
    a.length &&
    delete a[a.length - 1].personality[sre.Engine.personalityProps.JOIN];
  f &&
    a.length &&
    ((c = a[a.length - 1]),
    c.text || Object.keys(c.personality).length
      ? a.push(
          sre.AuditoryDescription.create({
            text: "",
            personality: { pause: f }
          })
        )
      : (c.personality[sre.Engine.personalityProps.PAUSE] = f));
  return a;
};
sre.SpeechRuleEngine.prototype.addExternalAttributes_ = function (a, b) {
  if (b.hasAttributes()) {
    b = b.attributes;
    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c].name;
      !a.attributes[d] && d.match(/^ext/) && (a.attributes[d] = b[c].value);
    }
  }
};
sre.SpeechRuleEngine.prototype.addRelativePersonality_ = function (a, b) {
  if (!a.personality) return (a.personality = b), a;
  var c = a.personality,
    d;
  for (d in b)
    c[d] =
      c[d] && "number" == typeof c[d] && "number" == typeof b[d]
        ? c[d] + b[d]
        : b[d];
  return a;
};
sre.SpeechRuleEngine.prototype.toString = function () {
  return this.activeStore_
    .findAllRules(function (a) {
      return !0;
    })
    .map(function (a) {
      return a.toString();
    })
    .join("\n");
};
sre.SpeechRuleEngine.debugSpeechRule = function (a, b) {
  var c = sre.SpeechRuleEngine.getInstance().activeStore_;
  c && c.debugSpeechRule(a, b);
};
sre.SpeechRuleEngine.debugNamedSpeechRule = function (a, b) {
  var c = sre.SpeechRuleEngine.getInstance().activeStore_;
  if (c)
    for (
      var d = c.findAllRules(function (g) {
          return g.name == a;
        }),
        e = 0,
        f;
      (f = d[e]);
      e++
    )
      sre.Debugger.getInstance().output(
        "Rule",
        a,
        "DynamicCstr:",
        f.dynamicCstr.toString(),
        "number",
        e
      ),
        c.debugSpeechRule(f, b);
};
sre.SpeechRuleEngine.prototype.runInSetting = function (a, b) {
  var c = sre.Engine.getInstance(),
    d = {},
    e;
  for (e in a) (d[e] = c[e]), (c[e] = a[e]);
  c.setDynamicCstr();
  a = b();
  for (e in d) c[e] = d[e];
  c.setDynamicCstr();
  return a;
};
sre.SpeechRuleEngine.prototype.addStore = function (a) {
  sre.SpeechRuleStores.init();
  a &&
    !a.functions &&
    (a.functions = sre.SpeechRules.getInstance().getStore(
      a.locale,
      a.modality,
      a.domain
    ));
  var b = this.storeFactory_(a.modality);
  b.parse(a);
  b.initialize();
  b.getSpeechRules().forEach(
    goog.bind(function (c) {
      this.activeStore_.trie.addRule(c);
    }, this)
  );
  this.addEvaluator(b);
  this.activeStore_.setSpeechRules(this.activeStore_.trie.collectRules());
};
sre.SpeechRuleEngine.prototype.updateEngine = function () {
  this.ready_ = !0;
  var a = sre.MathMap.getInstance();
  sre.Engine.isReady()
    ? (this.prune && ((this.prune = !1), this.adjustEngine()),
      (sre.Engine.getInstance().evaluator = goog.bind(
        a.store.lookupString,
        a.store
      )))
    : ((this.ready_ = !1), setTimeout(goog.bind(this.updateEngine, this), 250));
};
sre.SpeechRuleEngine.prototype.adjustEngine = function () {
  var a = sre.Engine.getInstance();
  if (a.prune) {
    var b = a.prune.split(".");
    this.activeStore_.prune(b);
  }
  a.rules &&
    ((b = sre.SystemExternal.jsonPath.replace(
      "/lib/mathmaps",
      "/src/mathmaps"
    )),
    sre.MathMap.getInstance().retrieveFiles(b + a.rules, function (c) {
      return sre.MathMap.getInstance().parseMaps(
        '{"' + a.rules + '":' + c + "}"
      );
    }));
  setTimeout(goog.bind(this.updateEngine, this), 100);
};
sre.SpeechRuleEngine.prototype.processGrammar = function (a, b, c) {
  var d = {},
    e;
  for (e in c) {
    var f = c[e];
    d[e] = "string" === typeof f ? a.constructString(b, f) : f;
  }
  sre.Grammar.getInstance().pushState(d);
};
sre.SpeechRuleEngine.prototype.updateConstraint_ = function () {
  var a = sre.Engine.getInstance().dynamicCstr,
    b = sre.Engine.getInstance().strict,
    c = this.activeStore_.trie,
    d = {},
    e = a.getValue(sre.DynamicCstr.Axis.LOCALE),
    f = a.getValue(sre.DynamicCstr.Axis.MODALITY),
    g = a.getValue(sre.DynamicCstr.Axis.DOMAIN);
  c.hasSubtrie([e, f, g]) ||
    ((g = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]),
    c.hasSubtrie([e, f, g]) ||
      ((f = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]),
      c.hasSubtrie([e, f, g]) ||
        (e = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE])));
  d[sre.DynamicCstr.Axis.LOCALE] = [e];
  d[sre.DynamicCstr.Axis.MODALITY] = [
    "summary" !== f
      ? f
      : sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]
  ];
  d[sre.DynamicCstr.Axis.DOMAIN] = [
    "speech" !== f
      ? sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]
      : g
  ];
  c = a.getOrder();
  for (e = 0; (f = c[e]); e++)
    if (!d[f]) {
      g = a.getValue(f);
      var h = this.makeSet_(g, a.preference),
        k = sre.DynamicCstr.DEFAULT_VALUES[f];
      b || g === k || h.push(k);
      d[f] = h;
    }
  a.updateProperties(d);
};
sre.SpeechRuleEngine.prototype.makeSet_ = function (a, b) {
  return b && Object.keys(b).length ? a.split(":") : [a];
};
sre.SpeechRuleEngine.prototype.addEvaluator = function (a) {
  var b = goog.bind(a.evaluateDefault, a),
    c = this.evaluators_[a.locale];
  c
    ? (c[a.modality] = b)
    : ((c = {}), (c[a.modality] = b), (this.evaluators_[a.locale] = c));
};
sre.SpeechRuleEngine.prototype.getEvaluator = function (a, b) {
  return (b = (a = this.evaluators_[a]) ? a[b] : null)
    ? b
    : goog.bind(this.activeStore_.evaluateDefault, this.activeStore_);
};
sre.SpeechRuleEngine.prototype.enumerate = function (a) {
  return this.activeStore_.trie.enumerate(a);
};
sre.SpeechGeneratorUtil = {};
sre.SpeechGeneratorUtil.computeSpeech = function (a) {
  return sre.SpeechRuleEngine.getInstance().evaluateNode(a);
};
sre.SpeechGeneratorUtil.recomputeSpeech = function (a) {
  a = sre.SemanticTree.fromNode(a);
  return sre.SpeechGeneratorUtil.computeSpeech(a.xml());
};
sre.SpeechGeneratorUtil.computeMarkup = function (a) {
  a = sre.SpeechGeneratorUtil.computeSpeech(a);
  return sre.AuralRendering.getInstance().markup(a);
};
sre.SpeechGeneratorUtil.recomputeMarkup = function (a) {
  a = sre.SpeechGeneratorUtil.recomputeSpeech(a);
  return sre.AuralRendering.getInstance().markup(a);
};
sre.SpeechGeneratorUtil.addSpeech = function (a, b, c) {
  b = (c = sre.DomUtil.querySelectorAllByAttrValue(c, "id", b.id.toString())[0])
    ? sre.AuralRendering.getInstance().markup(
        sre.SpeechGeneratorUtil.computeSpeech(c)
      )
    : sre.SpeechGeneratorUtil.recomputeMarkup(b);
  a.setAttribute(sre.EnrichMathml.Attribute.SPEECH, b);
};
sre.SpeechGeneratorUtil.addModality = function (a, b, c) {
  b = sre.SpeechGeneratorUtil.recomputeMarkup(b);
  a.setAttribute(c, b);
};
sre.SpeechGeneratorUtil.addPrefix = function (a, b) {
  (b = sre.SpeechGeneratorUtil.retrievePrefix(b)) &&
    a.setAttribute(sre.EnrichMathml.Attribute.PREFIX, b);
};
sre.SpeechGeneratorUtil.retrievePrefix = function (a) {
  a = sre.SpeechGeneratorUtil.computePrefix_(a);
  return sre.AuralRendering.getInstance().markup(a);
};
sre.SpeechGeneratorUtil.computePrefix_ = function (a) {
  var b = sre.SemanticTree.fromRoot(a);
  b = sre.XpathUtil.evalXPath('.//*[@id="' + a.id + '"]', b.xml());
  var c = b[0];
  1 < b.length && (c = sre.SpeechGeneratorUtil.nodeAtPosition_(a, b) || c);
  return c
    ? sre.SpeechRuleEngine.getInstance().runInSetting(
        {
          modality: "prefix",
          domain: "default",
          style: "default",
          strict: !0,
          speech: !0
        },
        function () {
          return sre.SpeechRuleEngine.getInstance().evaluateNode(c);
        }
      )
    : [];
};
sre.SpeechGeneratorUtil.nodeAtPosition_ = function (a, b) {
  var c = b[0];
  if (!a.parent) return c;
  for (var d = []; a; ) d.push(a.id), (a = a.parent);
  a = 0;
  for (var e; (e = b[a]); a++) {
    for (
      var f = e, g = d.slice();
      g.length &&
      g.shift().toString() === f.getAttribute("id") &&
      f.parentNode &&
      f.parentNode.parentNode;

    )
      f = f.parentNode.parentNode;
    if (!g.length) return e;
  }
  return c;
};
sre.SpeechGeneratorUtil.connectMactions = function (a, b, c) {
  b = sre.DomUtil.querySelectorAll(b, "maction");
  for (var d = 0, e; (e = b[d]); d++) {
    var f = e.getAttribute("id");
    if ((f = sre.DomUtil.querySelectorAllByAttrValue(a, "id", f)[0])) {
      var g = e.childNodes[1];
      e = g.getAttribute(sre.EnrichMathml.Attribute.ID);
      var h = sre.WalkerUtil.getBySemanticId(a, e);
      (h && "dummy" !== h.getAttribute(sre.EnrichMathml.Attribute.TYPE)) ||
        ((h = f.childNodes[0]),
        h.getAttribute("sre-highlighter-added") ||
          ((f = g.getAttribute(sre.EnrichMathml.Attribute.PARENT)) &&
            h.setAttribute(sre.EnrichMathml.Attribute.PARENT, f),
          h.setAttribute(sre.EnrichMathml.Attribute.TYPE, "dummy"),
          h.setAttribute(sre.EnrichMathml.Attribute.ID, e),
          sre.DomUtil.querySelectorAllByAttrValue(c, "id", e)[0].setAttribute(
            "alternative",
            e
          )));
    }
  }
};
sre.SpeechGeneratorUtil.connectAllMactions = function (a, b) {
  a = sre.DomUtil.querySelectorAll(a, "maction");
  for (var c = 0, d; (d = a[c]); c++)
    (d = d.childNodes[1].getAttribute(sre.EnrichMathml.Attribute.ID)),
      sre.DomUtil.querySelectorAllByAttrValue(b, "id", d)[0].setAttribute(
        "alternative",
        d
      );
};
sre.SpeechGeneratorUtil.retrieveSummary = function (a) {
  a = sre.SpeechGeneratorUtil.computeSummary_(a);
  return sre.AuralRendering.getInstance().markup(a);
};
sre.SpeechGeneratorUtil.computeSummary_ = function (a) {
  return a
    ? sre.SpeechRuleEngine.getInstance().runInSetting(
        { modality: "summary", strict: !1, speech: !0 },
        function () {
          return sre.SpeechRuleEngine.getInstance().evaluateNode(a);
        }
      )
    : [];
};
sre.AbstractSpeechGenerator = function () {
  this.rebuilt_ = null;
  this.options_ = {};
  this.modality = sre.EnrichMathml.addPrefix("speech");
};
sre.AbstractSpeechGenerator.prototype.getRebuilt = function () {
  return this.rebuilt_;
};
sre.AbstractSpeechGenerator.prototype.setRebuilt = function (a) {
  this.rebuilt_ = a;
};
sre.AbstractSpeechGenerator.prototype.setOptions = function (a) {
  this.options_ = a || {};
  this.modality = sre.EnrichMathml.addPrefix(
    this.options_.modality || "speech"
  );
};
sre.AbstractSpeechGenerator.prototype.getOptions = function () {
  return this.options_;
};
sre.AbstractSpeechGenerator.prototype.getSpeech = goog.abstractMethod;
sre.AbstractSpeechGenerator.prototype.start = function () {};
sre.AbstractSpeechGenerator.prototype.end = function () {};
sre.AbstractSpeechGenerator.prototype.generateSpeech = function (a, b) {
  this.rebuilt_ || (this.rebuilt_ = new sre.RebuildStree(b));
  sre.System.getInstance().setupEngine(this.options_);
  return sre.SpeechGeneratorUtil.computeMarkup(this.getRebuilt().xml);
};
sre.AdhocSpeechGenerator = function () {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.AdhocSpeechGenerator, sre.AbstractSpeechGenerator);
sre.AdhocSpeechGenerator.prototype.getSpeech = function (a, b) {
  b = this.generateSpeech(a, b);
  a.setAttribute(this.modality, b);
  return b;
};
sre.ColorGenerator = function () {
  sre.AbstractSpeechGenerator.call(this);
  this.modality = sre.EnrichMathml.addPrefix("foreground");
  this.contrast = new sre.ContrastPicker();
};
goog.inherits(sre.ColorGenerator, sre.AbstractSpeechGenerator);
sre.ColorGenerator.prototype.getSpeech = function (a, b) {
  return sre.WalkerUtil.getAttribute(a, this.modality);
};
sre.ColorGenerator.prototype.generateSpeech = function (a, b) {
  this.getRebuilt() || this.setRebuilt(new sre.RebuildStree(a));
  this.colorLeaves_(a);
  return sre.WalkerUtil.getAttribute(a, this.modality);
};
sre.ColorGenerator.prototype.colorLeaves_ = function (a) {
  var b = this,
    c = [];
  sre.ColorGenerator.visitStree_(this.getRebuilt().streeRoot, c, {});
  var d = {};
  c = $jscomp.makeIterator(c);
  for (
    var e = c.next();
    !e.done;
    d = { $jscomp$loop$prop$color$12: d.$jscomp$loop$prop$color$12 },
      e = c.next()
  ) {
    e = e.value;
    d.$jscomp$loop$prop$color$12 = this.contrast.generate();
    var f = !1;
    (f = Array.isArray(e)
      ? e
          .map(
            (function (g) {
              return function (h) {
                return b.colorLeave_(a, h, g.$jscomp$loop$prop$color$12);
              };
            })(d)
          )
          .reduce(function (g, h) {
            return g || h;
          }, !1)
      : this.colorLeave_(a, e, d.$jscomp$loop$prop$color$12)) &&
      this.contrast.increment();
  }
};
sre.ColorGenerator.prototype.colorLeave_ = function (a, b, c) {
  return (a = sre.WalkerUtil.getBySemanticId(a, b))
    ? (a.setAttribute(this.modality, c), !0)
    : !1;
};
sre.ColorGenerator.visitStree_ = function (a, b, c) {
  if (a.childNodes.length) {
    if (
      (a.contentNodes.length &&
        ("punctuated" === a.type &&
          a.contentNodes.forEach(function (h) {
            return (c[h.id] = !0);
          }),
        "implicit" !== a.role &&
          b.push(
            a.contentNodes.map(function (h) {
              return h.id;
            })
          )),
      a.childNodes.length)
    )
      if ("implicit" === a.role) {
        var d = [],
          e = [];
        a = $jscomp.makeIterator(a.childNodes);
        for (var f = a.next(); !f.done; f = a.next()) {
          var g = [];
          sre.ColorGenerator.visitStree_(f.value, g, c);
          2 >= g.length && d.push(g.shift());
          e = e.concat(g);
        }
        b.push(d);
        e.forEach(function (h) {
          return b.push(h);
        });
      } else
        a.childNodes.forEach(function (h) {
          return sre.ColorGenerator.visitStree_(h, b, c);
        });
  } else c[a.id] || b.push(a.id);
};
sre.DirectSpeechGenerator = function () {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.DirectSpeechGenerator, sre.AbstractSpeechGenerator);
sre.DirectSpeechGenerator.prototype.getSpeech = function (a, b) {
  return sre.WalkerUtil.getAttribute(a, this.modality);
};
sre.DummySpeechGenerator = function () {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.DummySpeechGenerator, sre.AbstractSpeechGenerator);
sre.DummySpeechGenerator.prototype.getSpeech = function (a, b) {
  return "";
};
sre.TreeSpeechGenerator = function () {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.TreeSpeechGenerator, sre.AbstractSpeechGenerator);
sre.TreeSpeechGenerator.prototype.getSpeech = function (a, b) {
  var c = this.generateSpeech(a, b);
  a.setAttribute(this.modality, c);
  var d = this.getRebuilt().nodeDict,
    e;
  for (e in d) {
    var f = d[e],
      g = sre.WalkerUtil.getBySemanticId(b, e),
      h = sre.WalkerUtil.getBySemanticId(a, e);
    g &&
      h &&
      (this.modality && this.modality !== sre.EnrichMathml.Attribute.SPEECH
        ? sre.SpeechGeneratorUtil.addModality(h, f, this.modality)
        : sre.SpeechGeneratorUtil.addSpeech(h, f, this.getRebuilt().xml),
      this.modality === sre.EnrichMathml.Attribute.SPEECH &&
        sre.SpeechGeneratorUtil.addPrefix(h, f));
  }
  return c;
};
sre.NodeSpeechGenerator = function () {
  sre.TreeSpeechGenerator.call(this);
};
goog.inherits(sre.NodeSpeechGenerator, sre.TreeSpeechGenerator);
sre.NodeSpeechGenerator.prototype.getSpeech = function (a, b) {
  var c = sre.WalkerUtil.getAttribute(a, this.modality);
  return c ? c : sre.NodeSpeechGenerator.superClass_.getSpeech.call(this, a, b);
};
sre.SummarySpeechGenerator = function () {
  sre.AbstractSpeechGenerator.call(this);
};
goog.inherits(sre.SummarySpeechGenerator, sre.AbstractSpeechGenerator);
sre.SummarySpeechGenerator.prototype.getSpeech = function (a, b) {
  sre.SpeechGeneratorUtil.connectAllMactions(b, this.getRebuilt().xml);
  return this.generateSpeech(a, b);
};
sre.SpeechGeneratorFactory = {};
sre.SpeechGeneratorFactory.generator = function (a) {
  return new (sre.SpeechGeneratorFactory.generatorMapping_[a] ||
    sre.SpeechGeneratorFactory.generatorMapping_.Direct)();
};
sre.SpeechGeneratorFactory.generatorMapping_ = {
  Adhoc: sre.AdhocSpeechGenerator,
  Color: sre.ColorGenerator,
  Direct: sre.DirectSpeechGenerator,
  Dummy: sre.DummySpeechGenerator,
  Node: sre.NodeSpeechGenerator,
  Summary: sre.SummarySpeechGenerator,
  Tree: sre.TreeSpeechGenerator
};
sre.EventUtil = {};
sre.EventUtil.KeyCode = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  TAB: 9,
  LESS: 188,
  GREATER: 190,
  DASH: 189,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};
sre.EventUtil.Move = (function () {
  var a = {},
    b;
  for (b in sre.EventUtil.KeyCode) a[sre.EventUtil.KeyCode[b]] = b;
  return a;
})();
sre.EventUtil.EventType = {
  CLICK: "click",
  DBLCLICK: "dblclick",
  MOUSEDOWN: "mousedown",
  MOUSEUP: "mouseup",
  MOUSEOVER: "mouseover",
  MOUSEOUT: "mouseout",
  MOUSEMOVE: "mousemove",
  SELECTSTART: "selectstart",
  KEYPRESS: "keypress",
  KEYDOWN: "keydown",
  KEYUP: "keyup",
  TOUCHSTART: "touchstart",
  TOUCHMOVE: "touchmove",
  TOUCHEND: "touchend",
  TOUCHCANCEL: "touchcancel"
};
sre.EventUtil.Event = function (a, b, c) {
  this.src = a;
  this.type = b;
  this.callback = c;
};
sre.EventUtil.Event.prototype.add = function () {
  this.src.addEventListener(this.type, this.callback);
};
sre.EventUtil.Event.prototype.remove = function () {
  this.src.removeEventListener(this.type, this.callback);
};
sre.Focus = function (a, b) {
  this.semanticNodes_ = a;
  this.semanticPrimary_ = b;
  this.domNodes_ = [];
  this.domPrimary_ = null;
  this.allNodes_ = [];
};
sre.Focus.prototype.getSemanticPrimary = function () {
  return this.semanticPrimary_;
};
sre.Focus.prototype.getSemanticNodes = function () {
  return this.semanticNodes_;
};
sre.Focus.prototype.getNodes = function () {
  return this.allNodes_;
};
sre.Focus.prototype.getDomNodes = function () {
  return this.domNodes_;
};
sre.Focus.prototype.getDomPrimary = function () {
  return this.domPrimary_;
};
sre.Focus.prototype.toString = function () {
  return "Primary:" + this.domPrimary_ + " Nodes:" + this.domNodes_;
};
sre.Focus.prototype.clone = function () {
  var a = new sre.Focus(this.semanticNodes_, this.semanticPrimary_);
  a.domNodes_ = this.domNodes_;
  a.domPrimary_ = this.domPrimary_;
  a.allNodes_ = this.allNodes_;
  return a;
};
sre.Focus.factory = function (a, b, c, d) {
  var e = function (h) {
      return sre.WalkerUtil.getBySemanticId(d, h);
    },
    f = c.nodeDict;
  c = e(a);
  e = b.map(e);
  var g = b.map(function (h) {
    return f[h];
  });
  a = new sre.Focus(g, f[a]);
  a.domNodes_ = e;
  a.domPrimary_ = c;
  a.allNodes_ = sre.Focus.generateAllVisibleNodes_(b, e, f, d);
  return a;
};
sre.Focus.generateAllVisibleNodes_ = function (a, b, c, d) {
  for (
    var e = function (m) {
        return sre.WalkerUtil.getBySemanticId(d, m);
      },
      f = [],
      g = 0,
      h = a.length;
    g < h;
    g++
  )
    if (b[g]) f.push(b[g]);
    else {
      var k = c[a[g]];
      if (k) {
        k = k.childNodes.map(function (m) {
          return m.id.toString();
        });
        var l = k.map(e);
        f = f.concat(sre.Focus.generateAllVisibleNodes_(k, l, c, d));
      }
    }
  return f;
};
sre.Levels = function () {
  this.level_ = [];
};
sre.Levels.prototype.push = function (a) {
  this.level_.push(a);
};
sre.Levels.prototype.pop = function () {
  return this.level_.pop();
};
sre.Levels.prototype.peek = function () {
  return this.level_[this.level_.length - 1] || null;
};
sre.Levels.prototype.indexOf = function (a) {
  var b = this.peek();
  return b ? b.indexOf(a) : null;
};
sre.Levels.prototype.find = function (a) {
  var b = this.peek();
  if (!b) return null;
  for (var c = 0, d = b.length; c < d; c++) if (a(b[c])) return b[c];
  return null;
};
sre.Levels.prototype.get = function (a) {
  var b = this.peek();
  return !b || 0 > a || a >= b.length ? null : b[a];
};
sre.Levels.prototype.depth = function () {
  return this.level_.length;
};
sre.Levels.prototype.clone = function () {
  var a = new sre.Levels();
  a.level_ = this.level_.slice(0);
  return a;
};
sre.Levels.prototype.toString = function () {
  for (var a = "", b = 0, c; (c = this.level_[b]); b++)
    a +=
      "\n" +
      c.map(function (d) {
        return d.toString();
      });
  return a;
};
sre.Walker = function () {};
sre.Walker.prototype.isActive = function () {};
sre.Walker.prototype.activate = function () {};
sre.Walker.prototype.deactivate = function () {};
sre.Walker.prototype.speech = function () {};
sre.Walker.prototype.getXml = function () {};
sre.Walker.prototype.getRebuilt = function () {};
sre.Walker.prototype.getFocus = function (a) {};
sre.Walker.prototype.setFocus = function (a) {};
sre.Walker.prototype.getDepth = function () {};
sre.Walker.prototype.move = function (a) {};
sre.Walker.prototype.update = function (a) {};
sre.Walker.move = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  REPEAT: "repeat",
  DEPTH: "depth",
  ENTER: "enter",
  EXPAND: "expand",
  HOME: "home",
  SUMMARY: "summary",
  DETAIL: "detail",
  ROW: "row",
  CELL: "cell"
};
sre.Walker.STATE_ = {};
sre.Walker.resetState = function (a) {
  delete sre.Walker.STATE_[a];
};
sre.Walker.setState = function (a, b) {
  sre.Walker.STATE_[a] = b;
};
sre.Walker.getState = function (a) {
  return sre.Walker.STATE_[a];
};
sre.AbstractWalker = function (a, b, c, d) {
  this.node = a;
  this.node.id
    ? (this.id = this.node.id)
    : this.node.hasAttribute(sre.AbstractWalker.SRE_ID_ATTR)
    ? (this.id = this.node.getAttribute(sre.AbstractWalker.SRE_ID_ATTR))
    : (this.node.setAttribute(
        sre.AbstractWalker.SRE_ID_ATTR,
        sre.AbstractWalker.ID_COUNTER
      ),
      (this.id = sre.AbstractWalker.ID_COUNTER++));
  this.generator = b;
  this.highlighter = c;
  this.rootNode = sre.WalkerUtil.getSemanticRoot(a);
  this.rootId = this.rootNode.getAttribute(sre.EnrichMathml.Attribute.ID);
  this.xmlString_ = d;
  this.focus_ = this.rebuilt_ = this.xml_ = null;
  this.keyMapping = {};
  this.keyMapping[sre.EventUtil.KeyCode.UP] = goog.bind(this.up, this);
  this.keyMapping[sre.EventUtil.KeyCode.DOWN] = goog.bind(this.down, this);
  this.keyMapping[sre.EventUtil.KeyCode.RIGHT] = goog.bind(this.right, this);
  this.keyMapping[sre.EventUtil.KeyCode.LEFT] = goog.bind(this.left, this);
  this.keyMapping[sre.EventUtil.KeyCode.TAB] = goog.bind(this.repeat, this);
  this.keyMapping[sre.EventUtil.KeyCode.DASH] = goog.bind(this.expand, this);
  this.keyMapping[sre.EventUtil.KeyCode.SPACE] = goog.bind(this.depth, this);
  this.keyMapping[sre.EventUtil.KeyCode.HOME] = goog.bind(this.home, this);
  this.keyMapping[sre.EventUtil.KeyCode.X] = goog.bind(this.summary, this);
  this.keyMapping[sre.EventUtil.KeyCode.Z] = goog.bind(this.detail, this);
  this.keyMapping[sre.EventUtil.KeyCode.V] = goog.bind(this.virtualize, this);
  this.keyMapping[sre.EventUtil.KeyCode.P] = goog.bind(this.previous, this);
  this.keyMapping[sre.EventUtil.KeyCode.U] = goog.bind(this.undo, this);
  this.keyMapping[sre.EventUtil.KeyCode.LESS] = goog.bind(
    this.previousRules,
    this
  );
  this.keyMapping[sre.EventUtil.KeyCode.GREATER] = goog.bind(
    this.nextRules,
    this
  );
  this.active_ = !1;
  this.moved = sre.Walker.move.ENTER;
  this.cursors = [];
};
sre.AbstractWalker.prototype.getXml = function () {
  this.xml_ || (this.xml_ = sre.DomUtil.parseInput(this.xmlString_));
  return this.xml_;
};
sre.AbstractWalker.prototype.getRebuilt = function () {
  this.rebuilt_ || (this.rebuilt_ = this.rebuildStree());
  return this.rebuilt_;
};
sre.AbstractWalker.ID_COUNTER = 0;
sre.AbstractWalker.SRE_ID_ATTR = "sre-explorer-id";
sre.AbstractWalker.prototype.isActive = function () {
  return this.active_;
};
sre.AbstractWalker.prototype.toggleActive_ = function () {
  this.active_ = !this.active_;
};
sre.AbstractWalker.prototype.activate = function () {
  this.isActive() || (this.generator.start(), this.toggleActive_());
};
sre.AbstractWalker.prototype.deactivate = function () {
  this.isActive() &&
    (sre.Walker.setState(this.id, this.primaryId()),
    this.generator.end(),
    this.toggleActive_());
};
sre.AbstractWalker.prototype.getFocus = function (a) {
  this.focus_ ||
    (this.focus_ = sre.Focus.factory(
      this.rootId,
      [this.rootId],
      this.getRebuilt(),
      this.node
    ));
  a && this.updateFocus();
  return this.focus_;
};
sre.AbstractWalker.prototype.setFocus = function (a) {
  this.focus_ = a;
};
sre.AbstractWalker.prototype.getDepth = function () {
  return this.levels.depth() - 1;
};
sre.AbstractWalker.prototype.isSpeech = function () {
  return this.generator.modality === sre.EnrichMathml.Attribute.SPEECH;
};
sre.AbstractWalker.prototype.speech = function () {
  var a = this.getFocus().getDomNodes();
  if (!a.length) return "";
  var b = this.specialMove();
  if (null !== b) return b;
  switch (this.moved) {
    case sre.Walker.move.DEPTH:
      return this.depth_();
    case sre.Walker.move.SUMMARY:
      return this.summary_();
    case sre.Walker.move.DETAIL:
      return this.detail_();
    default:
      b = [];
      for (
        var c = this.getFocus().getSemanticNodes(), d = 0, e = a.length;
        d < e;
        d++
      ) {
        var f = a[d],
          g = c[d];
        b.push(
          f
            ? this.generator.getSpeech(f, this.getXml())
            : sre.SpeechGeneratorUtil.recomputeMarkup(g)
        );
      }
      return this.mergePrefix_(b);
  }
};
sre.AbstractWalker.prototype.mergePrefix_ = function (a, b) {
  b = b || [];
  var c = this.isSpeech() ? this.prefix_() : "";
  c && a.unshift(c);
  (c = this.isSpeech() ? this.postfix_() : "") && a.push(c);
  c = sre.AuralRendering.getInstance();
  return c.finalize(c.merge(b.concat(a)));
};
sre.AbstractWalker.prototype.prefix_ = function () {
  var a = this.getFocus().getDomNodes(),
    b = this.getFocus().getSemanticNodes();
  return a[0]
    ? sre.WalkerUtil.getAttribute(a[0], sre.EnrichMathml.Attribute.PREFIX)
    : sre.SpeechGeneratorUtil.retrievePrefix(b[0]);
};
sre.AbstractWalker.prototype.postfix_ = function () {
  var a = this.getFocus().getDomNodes();
  return a[0]
    ? sre.WalkerUtil.getAttribute(a[0], sre.EnrichMathml.Attribute.POSTFIX)
    : "";
};
sre.AbstractWalker.prototype.move = function (a) {
  a = this.keyMapping[a];
  if (!a) return null;
  a = a();
  if (!a || a === this.getFocus()) return !1;
  this.setFocus(a);
  this.moved === sre.Walker.move.HOME && (this.levels = this.initLevels());
  return !0;
};
sre.AbstractWalker.prototype.up = function () {
  this.moved = sre.Walker.move.UP;
  return this.getFocus();
};
sre.AbstractWalker.prototype.down = function () {
  this.moved = sre.Walker.move.DOWN;
  return this.getFocus();
};
sre.AbstractWalker.prototype.left = function () {
  this.moved = sre.Walker.move.LEFT;
  return this.getFocus();
};
sre.AbstractWalker.prototype.right = function () {
  this.moved = sre.Walker.move.RIGHT;
  return this.getFocus();
};
sre.AbstractWalker.prototype.repeat = function () {
  this.moved = sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.depth = function () {
  this.moved = this.isSpeech() ? sre.Walker.move.DEPTH : sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.depth_ = function () {
  var a = sre.Grammar.getInstance().getParameter("depth");
  sre.Grammar.getInstance().setParameter("depth", !0);
  var b = this.getFocus().getDomPrimary();
  b =
    (this.expandable(b) && [sre.Messages.NAVIGATE.EXPANDABLE]) ||
    (this.collapsible(b) && [sre.Messages.NAVIGATE.COLLAPSIBLE]) ||
    [];
  var c = [
      sre.AuralRendering.getInstance().markup([
        new sre.AuditoryDescription({
          text: sre.Messages.NAVIGATE.LEVEL + " " + this.getDepth(),
          personality: {}
        })
      ])
    ],
    d = this.getFocus().getSemanticNodes();
  d = sre.SpeechGeneratorUtil.retrievePrefix(d[0]);
  var e = sre.AuralRendering.getInstance();
  d && c.push(d);
  sre.Grammar.getInstance().setParameter("depth", a);
  return e.finalize(e.merge(c.concat(b)));
};
sre.AbstractWalker.prototype.home = function () {
  this.moved = sre.Walker.move.HOME;
  return sre.Focus.factory(
    this.rootId,
    [this.rootId],
    this.getRebuilt(),
    this.node
  );
};
sre.AbstractWalker.prototype.getBySemanticId = function (a) {
  return sre.WalkerUtil.getBySemanticId(this.node, a);
};
sre.AbstractWalker.prototype.primaryId = function () {
  return this.getFocus().getSemanticPrimary().id.toString();
};
sre.AbstractWalker.prototype.expand = function () {
  var a = this.getFocus().getDomPrimary();
  a = this.actionable_(a);
  if (!a) return this.getFocus();
  this.moved = sre.Walker.move.EXPAND;
  a.dispatchEvent(new Event("click"));
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.actionable_ = function (a) {
  return a && a.parentNode && this.highlighter.isMactionNode(a.parentNode)
    ? a.parentNode
    : null;
};
sre.AbstractWalker.prototype.expandable = function (a) {
  return !!this.actionable_(a) && 0 === a.childNodes.length;
};
sre.AbstractWalker.prototype.collapsible = function (a) {
  return !!this.actionable_(a) && 0 < a.childNodes.length;
};
sre.AbstractWalker.prototype.restoreState = function () {
  if (this.highlighter) {
    var a = sre.Walker.getState(this.id);
    if (a) {
      var b = this.getRebuilt().nodeDict[a];
      for (a = []; b; ) a.push(b.id), (b = b.parent);
      for (a.pop(); 0 < a.length; ) {
        this.down();
        b = a.pop();
        b = this.findFocusOnLevel(b);
        if (!b) break;
        this.setFocus(b);
      }
      this.moved = sre.Walker.move.ENTER;
    }
  }
};
sre.AbstractWalker.prototype.updateFocus = function () {
  this.setFocus(
    sre.Focus.factory(
      this.getFocus().getSemanticPrimary().id.toString(),
      this.getFocus()
        .getSemanticNodes()
        .map(function (a) {
          return a.id;
        }),
      this.getRebuilt(),
      this.node
    )
  );
};
sre.AbstractWalker.prototype.findFocusOnLevel = goog.abstractMethod;
sre.AbstractWalker.prototype.initLevels = goog.abstractMethod;
sre.AbstractWalker.prototype.rebuildStree = function () {
  var a = new sre.RebuildStree(this.getXml());
  this.rootId = a.stree.root.id.toString();
  this.generator.setRebuilt(a);
  this.focus_ = sre.Focus.factory(this.rootId, [this.rootId], a, this.node);
  this.levels = this.initLevels();
  sre.SpeechGeneratorUtil.connectMactions(this.node, this.getXml(), a.xml);
  return a;
};
sre.AbstractWalker.prototype.previousLevel = function () {
  var a = this.getFocus().getDomPrimary();
  return a
    ? sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.PARENT)
    : this.getFocus().getSemanticPrimary().parent.id.toString();
};
sre.AbstractWalker.prototype.nextLevel = function () {
  var a = this.getFocus().getDomPrimary();
  if (a) {
    var b = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CHILDREN)
      ),
      c = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.CONTENT)
      ),
      d = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.TYPE);
    a = sre.WalkerUtil.getAttribute(a, sre.EnrichMathml.Attribute.ROLE);
    return this.combineContentChildren(d, a, c, b);
  }
  c = function (e) {
    return e.id.toString();
  };
  d = this.getRebuilt().nodeDict[this.primaryId()];
  b = d.childNodes.map(c);
  c = d.contentNodes.map(c);
  return 0 === b.length
    ? []
    : this.combineContentChildren(d.type, d.role, c, b);
};
sre.AbstractWalker.prototype.combineContentChildren = goog.abstractMethod;
sre.AbstractWalker.prototype.singletonFocus = function (a) {
  return this.focusFromId(a, [a]);
};
sre.AbstractWalker.prototype.focusFromId = function (a, b) {
  return sre.Focus.factory(a, b, this.getRebuilt(), this.node);
};
sre.AbstractWalker.prototype.summary = function () {
  this.moved = this.isSpeech()
    ? sre.Walker.move.SUMMARY
    : sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.summary_ = function () {
  var a = this.getFocus().getSemanticPrimary().id.toString();
  a =
    this.getRebuilt().xml.getAttribute("id") === a
      ? this.getRebuilt().xml
      : sre.DomUtil.querySelectorAllByAttrValue(
          this.getRebuilt().xml,
          "id",
          a
        )[0];
  a = sre.SpeechGeneratorUtil.retrieveSummary(a);
  return this.mergePrefix_([a]);
};
sre.AbstractWalker.prototype.detail = function () {
  this.moved = this.isSpeech()
    ? sre.Walker.move.DETAIL
    : sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.detail_ = function () {
  var a = this.getFocus().getSemanticPrimary().id.toString();
  a =
    this.getRebuilt().xml.getAttribute("id") === a
      ? this.getRebuilt().xml
      : sre.DomUtil.querySelectorAllByAttrValue(
          this.getRebuilt().xml,
          "id",
          a
        )[0];
  var b = a.getAttribute("alternative");
  a.removeAttribute("alternative");
  var c = sre.SpeechGeneratorUtil.computeMarkup(a);
  c = this.mergePrefix_([c]);
  a.setAttribute("alternative", b);
  return c;
};
sre.AbstractWalker.prototype.specialMove = function () {
  return null;
};
sre.AbstractWalker.prototype.virtualize = function (a) {
  this.cursors.push({
    focus: this.getFocus(),
    levels: this.levels,
    undo: a || !this.cursors.length
  });
  this.levels = this.levels.clone();
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.previous = function () {
  var a = this.cursors.pop();
  if (!a) return this.getFocus();
  this.levels = a.levels;
  return a.focus;
};
sre.AbstractWalker.prototype.undo = function () {
  do var a = this.cursors.pop();
  while (a && !a.undo);
  if (!a) return this.getFocus();
  this.levels = a.levels;
  return a.focus;
};
sre.AbstractWalker.prototype.update = function (a) {
  this.generator.setOptions(a);
  sre.System.getInstance().setupEngine(a);
  sre.SpeechGeneratorFactory.generator("Tree").getSpeech(
    this.node,
    this.getXml()
  );
};
sre.AbstractWalker.prototype.nextRules = function () {
  var a = this.generator.getOptions();
  if ("speech" !== a.modality) return this.getFocus();
  sre.Engine.DOMAIN_TO_STYLES[a.domain] = a.style;
  a.domain = "mathspeak" === a.domain ? "clearspeak" : "mathspeak";
  a.style = sre.Engine.DOMAIN_TO_STYLES[a.domain];
  this.update(a);
  this.moved = sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.nextStyle = function (a, b) {
  if ("mathspeak" === a) {
    a = ["default", "brief", "sbrief"];
    var c = a.indexOf(b);
    return -1 === c ? b : c >= a.length - 1 ? a[0] : a[c + 1];
  }
  if ("clearspeak" === a) {
    var d = sre.ClearspeakPreferences.getLocalePreferences().en;
    if (!d) return "default";
    a = sre.ClearspeakPreferences.relevantPreferences(
      this.getFocus().getSemanticPrimary()
    );
    c = sre.ClearspeakPreferences.findPreference(b, a);
    d = d[a].map(function (e) {
      return e.split("_")[1];
    });
    c = d.indexOf(c);
    return -1 === c
      ? b
      : sre.ClearspeakPreferences.addPreference(
          b,
          a,
          c >= d.length - 1 ? d[0] : d[c + 1]
        );
  }
  return b;
};
sre.AbstractWalker.prototype.previousRules = function () {
  var a = this.generator.getOptions();
  if ("speech" !== a.modality) return this.getFocus();
  a.style = this.nextStyle(a.domain, a.style);
  this.update(a);
  this.moved = sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};
sre.AbstractWalker.prototype.refocus = function () {
  for (var a = this.getFocus(); !a.getNodes().length; ) {
    var b = this.levels.peek(),
      c = this.up();
    if (!c) break;
    this.setFocus(c);
    a = this.getFocus(!0);
  }
  this.levels.push(b);
  this.setFocus(a);
};
sre.DummyWalker = function (a, b, c, d) {
  sre.AbstractWalker.call(this, a, b, c, d);
};
goog.inherits(sre.DummyWalker, sre.AbstractWalker);
sre.DummyWalker.prototype.up = function () {};
sre.DummyWalker.prototype.down = function () {};
sre.DummyWalker.prototype.left = function () {};
sre.DummyWalker.prototype.right = function () {};
sre.DummyWalker.prototype.repeat = function () {};
sre.DummyWalker.prototype.depth = function () {};
sre.DummyWalker.prototype.home = function () {};
sre.DummyWalker.prototype.getDepth = function () {
  return 0;
};
sre.DummyWalker.prototype.initLevels = function () {};
sre.SemanticWalker = function (a, b, c, d) {
  sre.AbstractWalker.call(this, a, b, c, d);
  this.levels = null;
  this.restoreState();
};
goog.inherits(sre.SemanticWalker, sre.AbstractWalker);
sre.SemanticWalker.prototype.initLevels = function () {
  var a = new sre.Levels();
  a.push([this.getFocus()]);
  return a;
};
sre.SemanticWalker.prototype.up = function () {
  sre.SemanticWalker.superClass_.up.call(this);
  var a = this.previousLevel();
  if (!a) return null;
  this.levels.pop();
  return this.levels.find(function (b) {
    return b.getSemanticNodes().some(function (c) {
      return c.id.toString() === a;
    });
  });
};
sre.SemanticWalker.prototype.down = function () {
  sre.SemanticWalker.superClass_.down.call(this);
  var a = this.nextLevel();
  if (0 === a.length) return null;
  this.levels.push(a);
  return a[0];
};
sre.SemanticWalker.prototype.combineContentChildren = function (a, b, c, d) {
  switch (a) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return this.makePairList(d, c);
    case sre.SemanticAttr.Type.PREFIXOP:
      return [this.focusFromId(d[0], c.concat(d))];
    case sre.SemanticAttr.Type.POSTFIXOP:
      return [this.focusFromId(d[0], d.concat(c))];
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      return [this.focusFromId(d[0], [c[0], d[0], c[1]])];
    case sre.SemanticAttr.Type.CASES:
      return [this.focusFromId(d[0], [c[0], d[0]])];
    case sre.SemanticAttr.Type.PUNCTUATED:
      return b === sre.SemanticAttr.Role.TEXT
        ? d.map(goog.bind(this.singletonFocus, this))
        : d.length === c.length
        ? c.map(goog.bind(this.singletonFocus, this))
        : this.combinePunctuations(d, c, [], []);
    case sre.SemanticAttr.Type.APPL:
      return [this.focusFromId(d[0], [d[0], c[0]]), this.singletonFocus(d[1])];
    case sre.SemanticAttr.Type.ROOT:
      return [this.singletonFocus(d[1]), this.singletonFocus(d[0])];
    default:
      return d.map(goog.bind(this.singletonFocus, this));
  }
};
sre.SemanticWalker.prototype.combinePunctuations = function (a, b, c, d) {
  if (0 === a.length) return d;
  var e = a.shift(),
    f = b.shift();
  if (e === f) return c.push(f), this.combinePunctuations(a, b, c, d);
  b.unshift(f);
  c.push(e);
  if (a.length === b.length) return d.push(this.focusFromId(e, c.concat(b))), d;
  d.push(this.focusFromId(e, c));
  return this.combinePunctuations(a, b, [], d);
};
sre.SemanticWalker.prototype.makePairList = function (a, b) {
  if (0 === a.length) return [];
  if (1 === a.length) return [this.singletonFocus(a[0])];
  for (
    var c = [this.singletonFocus(a.shift())], d = 0, e = a.length;
    d < e;
    d++
  )
    c.push(this.focusFromId(a[d], [b[d], a[d]]));
  return c;
};
sre.SemanticWalker.prototype.left = function () {
  sre.SemanticWalker.superClass_.left.call(this);
  var a = this.levels.indexOf(this.getFocus());
  return null === a ? null : (a = this.levels.get(a - 1)) ? a : null;
};
sre.SemanticWalker.prototype.right = function () {
  sre.SemanticWalker.superClass_.right.call(this);
  var a = this.levels.indexOf(this.getFocus());
  return null === a ? null : (a = this.levels.get(a + 1)) ? a : null;
};
sre.SemanticWalker.prototype.findFocusOnLevel = function (a) {
  return this.levels.find(function (b) {
    return b.getSemanticPrimary().id === a;
  });
};
sre.SyntaxWalker = function (a, b, c, d) {
  sre.AbstractWalker.call(this, a, b, c, d);
  this.levels = null;
  this.restoreState();
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);
sre.SyntaxWalker.prototype.initLevels = function () {
  var a = new sre.Levels();
  a.push([this.primaryId()]);
  return a;
};
sre.SyntaxWalker.prototype.up = function () {
  sre.SyntaxWalker.superClass_.up.call(this);
  var a = this.previousLevel();
  if (!a) return null;
  this.levels.pop();
  return this.singletonFocus(a);
};
sre.SyntaxWalker.prototype.down = function () {
  sre.SyntaxWalker.superClass_.down.call(this);
  var a = this.nextLevel();
  if (0 === a.length) return null;
  var b = this.singletonFocus(a[0]);
  b && this.levels.push(a);
  return b;
};
sre.SyntaxWalker.prototype.combineContentChildren = function (a, b, c, d) {
  switch (a) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(d, c);
    case sre.SemanticAttr.Type.PREFIXOP:
      return c.concat(d);
    case sre.SemanticAttr.Type.POSTFIXOP:
      return d.concat(c);
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      return d.unshift(c[0]), d.push(c[1]), d;
    case sre.SemanticAttr.Type.CASES:
      return d.unshift(c[0]), d;
    case sre.SemanticAttr.Type.PUNCTUATED:
      return b === sre.SemanticAttr.Role.TEXT
        ? sre.BaseUtil.interleaveLists(d, c)
        : d;
    case sre.SemanticAttr.Type.APPL:
      return [d[0], c[0], d[1]];
    case sre.SemanticAttr.Type.ROOT:
      return [d[1], d[0]];
    default:
      return d;
  }
};
sre.SyntaxWalker.prototype.left = function () {
  sre.SyntaxWalker.superClass_.left.call(this);
  var a = this.levels.indexOf(this.primaryId());
  return null === a
    ? null
    : (a = this.levels.get(a - 1))
    ? this.singletonFocus(a)
    : null;
};
sre.SyntaxWalker.prototype.right = function () {
  sre.SyntaxWalker.superClass_.right.call(this);
  var a = this.levels.indexOf(this.primaryId());
  return null === a
    ? null
    : (a = this.levels.get(a + 1))
    ? this.singletonFocus(a)
    : null;
};
sre.SyntaxWalker.prototype.findFocusOnLevel = function (a) {
  return this.singletonFocus(a.toString());
};
sre.TableWalker = function (a, b, c, d) {
  sre.SyntaxWalker.call(this, a, b, c, d);
  this.modifier = !1;
  this.keyMapping[sre.EventUtil.KeyCode["0"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["1"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["2"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["3"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["4"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["5"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["6"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["7"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["8"]] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode["9"]] = goog.bind(this.jumpCell, this);
  this.key_ = null;
  this.row_ = 0;
  this.firstJump = this.currentTable_ = null;
};
goog.inherits(sre.TableWalker, sre.SyntaxWalker);
sre.TableWalker.prototype.move = function (a) {
  this.key_ = a;
  a = sre.TableWalker.superClass_.move.call(this, a);
  this.modifier = !1;
  return a;
};
sre.TableWalker.prototype.up = function () {
  this.moved = sre.Walker.move.UP;
  return this.eligibleCell_()
    ? this.verticalMove_(!1)
    : sre.TableWalker.superClass_.up.call(this);
};
sre.TableWalker.prototype.down = function () {
  this.moved = sre.Walker.move.DOWN;
  return this.eligibleCell_()
    ? this.verticalMove_(!0)
    : sre.TableWalker.superClass_.down.call(this);
};
sre.TableWalker.ELIGIBLE_CELL_ROLES = [
  sre.SemanticAttr.Role.DETERMINANT,
  sre.SemanticAttr.Role.ROWVECTOR,
  sre.SemanticAttr.Role.BINOMIAL,
  sre.SemanticAttr.Role.SQUAREMATRIX,
  sre.SemanticAttr.Role.MULTILINE,
  sre.SemanticAttr.Role.MATRIX,
  sre.SemanticAttr.Role.VECTOR,
  sre.SemanticAttr.Role.CASES,
  sre.SemanticAttr.Role.TABLE
];
sre.TableWalker.ELIGIBLE_TABLE_TYPES = [
  sre.SemanticAttr.Type.MULTILINE,
  sre.SemanticAttr.Type.MATRIX,
  sre.SemanticAttr.Type.VECTOR,
  sre.SemanticAttr.Type.CASES,
  sre.SemanticAttr.Type.TABLE
];
sre.TableWalker.prototype.eligibleCell_ = function () {
  var a = this.getFocus().getSemanticPrimary();
  return (
    this.modifier &&
    a.type === sre.SemanticAttr.Type.CELL &&
    -1 !== sre.TableWalker.ELIGIBLE_CELL_ROLES.indexOf(a.role)
  );
};
sre.TableWalker.prototype.verticalMove_ = function (a) {
  var b = this.previousLevel();
  if (!b) return null;
  var c = this.getFocus(),
    d = this.levels.indexOf(this.primaryId()),
    e = this.levels.pop();
  b = this.levels.indexOf(b);
  a = this.levels.get(a ? b + 1 : b - 1);
  if (!a) return this.levels.push(e), null;
  this.setFocus(this.singletonFocus(a));
  a = this.nextLevel();
  if (!a[d]) return this.setFocus(c), this.levels.push(e), null;
  this.levels.push(a);
  return this.singletonFocus(a[d]);
};
sre.TableWalker.prototype.jumpCell = function () {
  if (!this.isInTable_() || null === this.key_) return this.getFocus();
  if (this.moved === sre.Walker.move.ROW) {
    this.moved = sre.Walker.move.CELL;
    var a = this.key_ - sre.EventUtil.KeyCode["0"];
    return this.isLegalJump_(this.row_, a)
      ? this.jumpCell_(this.row_, a)
      : this.getFocus();
  }
  a = this.key_ - sre.EventUtil.KeyCode["0"];
  if (a > this.currentTable_.childNodes.length) return this.getFocus();
  this.row_ = a;
  this.moved = sre.Walker.move.ROW;
  return this.getFocus().clone();
};
sre.TableWalker.prototype.jumpCell_ = function (a, b) {
  this.firstJump
    ? this.virtualize(!1)
    : ((this.firstJump = this.getFocus()), this.virtualize(!0));
  var c = this.currentTable_.id.toString();
  do var d = this.levels.pop();
  while (-1 === d.indexOf(c));
  this.levels.push(d);
  this.setFocus(this.singletonFocus(c));
  this.levels.push(this.nextLevel());
  a = this.currentTable_.childNodes[a - 1];
  this.setFocus(this.singletonFocus(a.id.toString()));
  this.levels.push(this.nextLevel());
  return this.singletonFocus(a.childNodes[b - 1].id.toString());
};
sre.TableWalker.prototype.isLegalJump_ = function (a, b) {
  var c = sre.DomUtil.querySelectorAllByAttrValue(
    this.getRebuilt().xml,
    "id",
    this.currentTable_.id.toString()
  )[0];
  if (!c || c.hasAttribute("alternative")) return !1;
  a = this.currentTable_.childNodes[a - 1];
  if (!a) return !1;
  c = sre.DomUtil.querySelectorAllByAttrValue(c, "id", a.id.toString())[0];
  return !c || c.hasAttribute("alternative")
    ? !1
    : !(!a || !a.childNodes[b - 1]);
};
sre.TableWalker.prototype.isInTable_ = function () {
  for (var a = this.getFocus().getSemanticPrimary(); a; ) {
    if (-1 !== sre.TableWalker.ELIGIBLE_TABLE_TYPES.indexOf(a.type))
      return (this.currentTable_ = a), !0;
    a = a.parent;
  }
  return !1;
};
sre.TableWalker.prototype.undo = function () {
  var a = sre.TableWalker.superClass_.undo.call(this);
  a === this.firstJump && (this.firstJump = null);
  return a;
};
sre.WalkerFactory = {};
sre.WalkerFactory.walker = function (a, b, c, d, e) {
  return new (sre.WalkerFactory.walkerMapping_[a.toLowerCase()] ||
    sre.WalkerFactory.walkerMapping_.dummy)(b, c, d, e);
};
sre.WalkerFactory.walkerMapping_ = {
  dummy: sre.DummyWalker,
  semantic: sre.SemanticWalker,
  syntax: sre.SyntaxWalker,
  table: sre.TableWalker
};
sre.ProcessorFactory = {};
sre.ProcessorFactory.PROCESSORS_ = {};
sre.ProcessorFactory.get_ = function (a) {
  var b = sre.ProcessorFactory.PROCESSORS_[a.toLowerCase()];
  if (!b) throw new sre.Engine.Error("Unknown processor " + a);
  return b;
};
sre.ProcessorFactory.process = function (a, b) {
  return sre.ProcessorFactory.get_(a).processor(b);
};
sre.ProcessorFactory.processOnly = function (a, b) {
  return sre.ProcessorFactory.get_(a).process(b);
};
sre.ProcessorFactory.print = function (a, b) {
  a = sre.ProcessorFactory.get_(a);
  return sre.Engine.getInstance().pprint ? a.pprint(b) : a.print(b);
};
sre.ProcessorFactory.output = function (a, b) {
  a = sre.ProcessorFactory.get_(a);
  b = a.processor(b);
  return sre.Engine.getInstance().pprint ? a.pprint(b) : a.print(b);
};
sre.ProcessorFactory.keypress = function (a, b) {
  a = sre.ProcessorFactory.get_(a);
  b = a.key ? a.key(b) : b;
  b = a.processor(b);
  return sre.Engine.getInstance().pprint ? a.pprint(b) : a.print(b);
};
sre.Processor = function (a, b) {
  this.name = a;
  this.process = b.processor;
  this.processor =
    ((this.postprocess =
      b.postprocessor ||
      function (c, d) {
        return c;
      }),
    function (c) {
      return this.postprocess(this.process(c), c);
    });
  this.print = b.print || sre.Processor.stringify_;
  this.pprint = b.pprint || this.print;
  sre.ProcessorFactory.PROCESSORS_[this.name] = this;
};
sre.KeyProcessor = function (a, b) {
  sre.Processor.call(this, a, b);
  this.key = b.key || sre.KeyProcessor.getKey_;
};
goog.inherits(sre.KeyProcessor, sre.Processor);
sre.KeyProcessor.getKey_ = function (a) {
  return "string" === typeof a ? sre.EventUtil.KeyCode[a.toUpperCase()] : a;
};
sre.Processor.LocalState_ = {
  walker: null,
  speechGenerator: null,
  highlighter: null
};
sre.Processor.stringify_ = function (a) {
  return a ? a.toString() : a;
};
new sre.Processor("semantic", {
  processor: function (a) {
    a = sre.DomUtil.parseInput(a);
    return sre.Semantic.xmlTree(a);
  },
  postprocessor: function (a, b) {
    var c = sre.Engine.getInstance().speech;
    if (c === sre.Engine.Speech.NONE) return a;
    var d = a.cloneNode(!0),
      e = sre.SpeechGeneratorUtil.computeMarkup(d);
    b = sre.AuralRendering.getInstance();
    if (c === sre.Engine.Speech.SHALLOW)
      return a.setAttribute("speech", b.finalize(e)), a;
    c = sre.XpathUtil.evalXPath(".//*[@id]", a);
    d = sre.XpathUtil.evalXPath(".//*[@id]", d);
    for (var f = 0, g; (g = c[f]), (e = d[f]); f++)
      (e = sre.SpeechGeneratorUtil.computeMarkup(e)),
        g.setAttribute("speech", b.finalize(e));
    return a;
  },
  pprint: function (a) {
    return sre.DomUtil.formatXml(a.toString());
  }
});
new sre.Processor("speech", {
  processor: function (a) {
    a = sre.DomUtil.parseInput(a);
    a = sre.Semantic.xmlTree(a);
    a = sre.SpeechGeneratorUtil.computeSpeech(a);
    var b = sre.AuralRendering.getInstance();
    return b.finalize(b.markup(a));
  },
  pprint: function (a) {
    a = a.toString();
    return sre.AuralRendering.ofType(sre.XmlRenderer)
      ? sre.DomUtil.formatXml(a)
      : a;
  }
});
new sre.Processor("json", {
  processor: function (a) {
    a = sre.DomUtil.parseInput(a, sre.Engine.Error);
    return sre.Semantic.getTree(a).toJson();
  },
  postprocessor: function (a, b) {
    var c = sre.Engine.getInstance().speech;
    if (c === sre.Engine.Speech.NONE) return a;
    b = sre.DomUtil.parseInput(b);
    var d = sre.Semantic.xmlTree(b);
    b = sre.SpeechGeneratorUtil.computeMarkup(d);
    var e = sre.AuralRendering.getInstance();
    if (c === sre.Engine.Speech.SHALLOW)
      return (a.stree.speech = e.finalize(b)), a;
    var f = function (g) {
      var h = sre.XpathUtil.evalXPath(".//*[@id=" + g.id + "]", d)[0];
      h = sre.SpeechGeneratorUtil.computeMarkup(h);
      g.speech = e.finalize(h);
      g.children && g.children.forEach(f);
    };
    f(a.stree);
    return a;
  },
  print: function (a) {
    return JSON.stringify(a);
  },
  pprint: function (a) {
    return JSON.stringify(a, null, 2);
  }
});
new sre.Processor("description", {
  processor: function (a) {
    a = sre.DomUtil.parseInput(a);
    a = sre.Semantic.xmlTree(a);
    return sre.SpeechGeneratorUtil.computeSpeech(a);
  },
  print: function (a) {
    return JSON.stringify(a);
  },
  pprint: function (a) {
    return JSON.stringify(a, null, 2);
  }
});
new sre.Processor("enriched", {
  processor: function (a) {
    return sre.Enrich.semanticMathmlSync(a);
  },
  postprocessor: function (a, b) {
    b = sre.WalkerUtil.getSemanticRoot(a);
    switch (sre.Engine.getInstance().speech) {
      case sre.Engine.Speech.SHALLOW:
        var c = sre.SpeechGeneratorFactory.generator("Adhoc");
        c.getSpeech(b, a);
        break;
      case sre.Engine.Speech.DEEP:
        (c = sre.SpeechGeneratorFactory.generator("Tree")), c.getSpeech(b, a);
    }
    return a;
  },
  pprint: function (a) {
    return sre.DomUtil.formatXml(a.toString());
  }
});
new sre.Processor("walker", {
  processor: function (a) {
    var b = sre.SpeechGeneratorFactory.generator("Node");
    sre.Processor.LocalState_.speechGenerator = b;
    sre.Processor.LocalState_.highlighter = sre.HighlighterFactory.highlighter(
      { color: "black" },
      { color: "white" },
      { renderer: "NativeMML" }
    );
    a = sre.ProcessorFactory.process("enriched", a);
    var c = sre.ProcessorFactory.print("enriched", a);
    sre.Processor.LocalState_.walker = sre.WalkerFactory.walker(
      sre.Engine.getInstance().walker,
      a,
      b,
      sre.Processor.LocalState_.highlighter,
      c
    );
    return sre.Processor.LocalState_.walker;
  },
  print: function (a) {
    return sre.Processor.LocalState_.walker.speech();
  }
});
new sre.KeyProcessor("move", {
  processor: function (a) {
    return sre.Processor.LocalState_.walker
      ? !1 === sre.Processor.LocalState_.walker.move(a)
        ? sre.AuralRendering.getInstance().error(a)
        : sre.Processor.LocalState_.walker.speech()
      : null;
  }
});
sre.System = function () {
  this.version = sre.Variables.VERSION;
  this.files_ = 0;
  sre.Engine.registerTest(function () {
    return !sre.System.getInstance().files_;
  });
};
goog.addSingletonGetter(sre.System);
sre.System.prototype.setupEngine = function (a) {
  var b = sre.Engine.getInstance();
  "default" !== a.domain ||
    ("speech" !== a.modality && a.modality && "speech" !== b.modality) ||
    (a.domain = "mathspeak");
  var c = function (d) {
    b[d] = a[d] || b[d];
  };
  c("mode");
  sre.System.prototype.configBlocks_(a);
  sre.Engine.BINARY_FEATURES.forEach(function (d) {
    "undefined" !== typeof a[d] && (b[d] = !!a[d]);
  });
  sre.Engine.STRING_FEATURES.forEach(c);
  a.json && (sre.SystemExternal.jsonPath = sre.BaseUtil.makePath(a.json));
  a.xpath && (sre.SystemExternal.WGXpath = a.xpath);
  b.setupBrowsers();
  b.setDynamicCstr();
  sre.L10n.setLocale();
  sre.SpeechRuleEngine.getInstance().updateEngine();
};
sre.System.prototype.configBlocks_ = function (a) {
  if (
    !sre.Engine.getInstance().config &&
    sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP
  ) {
    sre.Engine.getInstance().config = !0;
    for (
      var b = document.documentElement.querySelectorAll(
          'script[type="text/x-sre-config"]'
        ),
        c = 0,
        d = b.length;
      c < d;
      c++
    )
      try {
        var e = b[c].innerHTML,
          f = JSON.parse(e),
          g;
        for (g in f) a[g] = f[g];
      } catch (h) {
        sre.Debugger.getInstance().output("Illegal configuration ", e);
      }
  }
};
sre.System.setAsync = function () {
  sre.Engine.isReady() || setTimeout(sre.System.setAsync, 500);
  sre.System.getInstance().setupEngine({ mode: sre.Engine.Mode.ASYNC });
};
sre.System.prototype.engineSetup = function () {
  var a = ["mode"].concat(
      sre.Engine.STRING_FEATURES,
      sre.Engine.BINARY_FEATURES
    ),
    b = sre.Engine.getInstance(),
    c = {};
  a.forEach(function (d) {
    c[d] = b[d];
  });
  c.json = sre.SystemExternal.jsonPath;
  c.xpath = sre.SystemExternal.WGXpath;
  c.rules = b.ruleSets.slice();
  return c;
};
sre.System.prototype.engineReady = function () {
  return sre.Engine.isReady();
};
sre.System.prototype.toSpeech = function (a) {
  return sre.System.getInstance().processString("speech", a);
};
sre.System.prototype.toSemantic = function (a) {
  return sre.System.getInstance().processString("semantic", a);
};
sre.System.prototype.toJson = function (a) {
  return sre.System.getInstance().processString("json", a);
};
sre.System.prototype.toDescription = function (a) {
  return sre.System.getInstance().processString("description", a);
};
sre.System.prototype.toEnriched = function (a) {
  return sre.System.getInstance().processString("enriched", a);
};
sre.System.prototype.processString = function (a, b) {
  return sre.ProcessorFactory.process(a, b);
};
sre.System.prototype.fileToSpeech = function (a, b) {
  sre.System.getInstance().processFile("speech", a, b);
};
sre.System.prototype.fileToSemantic = function (a, b) {
  sre.System.getInstance().processFile("semantic", a, b);
};
sre.System.prototype.fileToJson = function (a, b) {
  sre.System.getInstance().processFile("json", a, b);
};
sre.System.prototype.fileToDescription = function (a, b) {
  sre.System.getInstance().processFile("description", a, b);
};
sre.System.prototype.fileToEnriched = function (a, b) {
  sre.System.getInstance().processFile("enriched", a, b);
};
sre.System.prototype.processFile = function (a, b, c) {
  sre.Engine.isReady()
    ? sre.Engine.getInstance().mode === sre.Engine.Mode.SYNC
      ? this.processFileSync_(a, b, c)
      : this.processFileAsync_(a, b, c)
    : setTimeout(
        goog.bind(function () {
          this.processFile(a, b, c);
        }, this),
        100
      );
};
sre.System.prototype.inputFileSync_ = function (a) {
  try {
    var b = sre.SystemExternal.fs.readFileSync(a, { encoding: "utf8" });
  } catch (c) {
    throw new sre.Engine.Error("Can not open file: " + a);
  }
  return b;
};
sre.System.prototype.processFileSync_ = function (a, b, c) {
  b = sre.System.getInstance().inputFileSync_(b);
  a = sre.ProcessorFactory.output(a, b);
  if (c)
    try {
      sre.SystemExternal.fs.writeFileSync(c, a);
    } catch (d) {
      throw new sre.Engine.Error("Can not write to file: " + c);
    }
  else console.info(a);
};
sre.System.prototype.inputFileAsync_ = function (a, b) {
  sre.SystemExternal.fs.readFile(
    a,
    { encoding: "utf8" },
    goog.bind(function (c, d) {
      if (c) throw new sre.Engine.Error("Can not open file: " + a);
      b(d);
    }, this)
  );
};
sre.System.prototype.processFileAsync_ = function (a, b, c) {
  this.files_++;
  sre.System.getInstance().inputFileAsync_(
    b,
    goog.bind(function (d) {
      d = sre.ProcessorFactory.output(a, d);
      c
        ? sre.SystemExternal.fs.writeFile(c, d, function (e) {
            if (e)
              throw (
                (this.files_--,
                new sre.Engine.Error("Can not write to file: " + c))
              );
          })
        : console.info(d);
      this.files_--;
    }, this)
  );
};
sre.System.prototype.walk = function (a) {
  return sre.ProcessorFactory.output("walker", a);
};
sre.System.prototype.move = function (a) {
  return sre.ProcessorFactory.keypress("move", a);
};
sre.System.prototype.exit = function (a) {
  var b = a || 0;
  b || sre.Engine.isReady()
    ? sre.SystemExternal.process.exit(b)
    : setTimeout(
        goog.bind(function () {
          this.exit(b);
        }, this),
        100
      );
};
sre.Browser = {};
sre.System.getInstance().setupEngine({
  mode: sre.Engine.Mode.HTTP,
  domain: "mathspeak",
  style: "default"
});
var SRE = sre.System.getInstance();
