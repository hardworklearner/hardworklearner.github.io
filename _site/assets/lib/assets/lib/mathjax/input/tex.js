!(function () {
  "use strict";
  var t = {
      7205: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__assign) ||
            function () {
              return (o =
                Object.assign ||
                function (t) {
                  for (var e, r = 1, n = arguments.length; r < n; r++)
                    for (var a in (e = arguments[r]))
                      Object.prototype.hasOwnProperty.call(e, a) &&
                        (t[a] = e[a]);
                  return t;
                }).apply(this, arguments);
            },
          i =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.TeX = void 0);
        var s = r(3309),
          l = r(9077),
          u = r(2982),
          c = r(199),
          f = r(8321),
          h = r(810),
          d = r(3466),
          p = r(6394),
          m = r(7251),
          g = r(6552);
        r(3606);
        var y = (function (t) {
          function e(r) {
            void 0 === r && (r = {});
            var n = this,
              a = i(l.separateOptions(r, e.OPTIONS, u.FindTeX.OPTIONS), 3),
              o = a[0],
              s = a[1],
              f = a[2];
            (n = t.call(this, s) || this).findTeX =
              n.options.FindTeX || new u.FindTeX(f);
            var h = n.options.packages,
              d = (n.configuration = e.configure(h)),
              g = (n._parseOptions = new p.default(d, [
                n.options,
                m.TagsFactory.OPTIONS,
              ]));
            return (
              l.userOptions(g.options, o),
              d.config(n),
              e.tags(g, d),
              n.postFilters.add(c.default.cleanSubSup, -6),
              n.postFilters.add(c.default.setInherited, -5),
              n.postFilters.add(c.default.moveLimits, -4),
              n.postFilters.add(c.default.cleanStretchy, -3),
              n.postFilters.add(c.default.cleanAttributes, -2),
              n.postFilters.add(c.default.combineRelations, -1),
              n
            );
          }
          return (
            a(e, t),
            (e.configure = function (t) {
              var e = new g.ParserConfiguration(t, ["tex"]);
              return e.init(), e;
            }),
            (e.tags = function (t, e) {
              m.TagsFactory.addTags(e.tags),
                m.TagsFactory.setDefault(t.options.tags),
                (t.tags = m.TagsFactory.getDefault()),
                (t.tags.configuration = t);
            }),
            (e.prototype.setMmlFactory = function (e) {
              t.prototype.setMmlFactory.call(this, e),
                this._parseOptions.nodeFactory.setMmlFactory(e);
            }),
            Object.defineProperty(e.prototype, "parseOptions", {
              get: function () {
                return this._parseOptions;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.reset = function (t) {
              void 0 === t && (t = 0), this.parseOptions.tags.reset(t);
            }),
            (e.prototype.compile = function (t, e) {
              this.parseOptions.clear(),
                this.executeFilters(this.preFilters, t, e, this.parseOptions);
              var r,
                n,
                a = t.display;
              (this.latex = t.math), this.parseOptions.tags.startEquation(t);
              try {
                var o = new h.default(
                  this.latex,
                  { display: a, isInner: !1 },
                  this.parseOptions
                );
                (r = o.mml()), (n = o.stack.global);
              } catch (t) {
                if (!(t instanceof d.default)) throw t;
                (this.parseOptions.error = !0),
                  (r = this.options.formatError(this, t));
              }
              return (
                (r = this.parseOptions.nodeFactory.create("node", "math", [r])),
                (null == n ? void 0 : n.indentalign) &&
                  f.default.setAttribute(r, "indentalign", n.indentalign),
                a && f.default.setAttribute(r, "display", "block"),
                this.parseOptions.tags.finishEquation(t),
                (this.parseOptions.root = r),
                this.executeFilters(this.postFilters, t, e, this.parseOptions),
                (this.mathNode = this.parseOptions.root),
                this.mathNode
              );
            }),
            (e.prototype.findMath = function (t) {
              return this.findTeX.findMath(t);
            }),
            (e.prototype.formatError = function (t) {
              var e = t.message.replace(/\n.*/, "");
              return this.parseOptions.nodeFactory.create(
                "error",
                e,
                t.id,
                this.latex
              );
            }),
            (e.NAME = "TeX"),
            (e.OPTIONS = o(o({}, s.AbstractInputJax.OPTIONS), {
              FindTeX: null,
              packages: ["base"],
              digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
              maxBuffer: 5120,
              formatError: function (t, e) {
                return t.formatError(e);
              },
            })),
            e
          );
        })(s.AbstractInputJax);
        e.TeX = y;
      },
      6552: function (t, e, r) {
        var n =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ParserConfiguration =
            e.ConfigurationHandler =
            e.Configuration =
              void 0);
        var o,
          i = r(9077),
          s = r(2910),
          l = r(6898),
          u = r(4297),
          c = r(7251),
          f = (function () {
            function t(t, e, r, n, a, o, i, s, l, u, c, f, h) {
              void 0 === e && (e = {}),
                void 0 === r && (r = {}),
                void 0 === n && (n = {}),
                void 0 === a && (a = {}),
                void 0 === o && (o = {}),
                void 0 === i && (i = {}),
                void 0 === s && (s = []),
                void 0 === l && (l = []),
                void 0 === u && (u = null),
                void 0 === c && (c = null),
                (this.name = t),
                (this.handler = e),
                (this.fallback = r),
                (this.items = n),
                (this.tags = a),
                (this.options = o),
                (this.nodes = i),
                (this.preprocessors = s),
                (this.postprocessors = l),
                (this.initMethod = u),
                (this.configMethod = c),
                (this.priority = f),
                (this.parser = h),
                (this.handler = Object.assign(
                  { character: [], delimiter: [], macro: [], environment: [] },
                  e
                ));
            }
            return (
              (t.makeProcessor = function (t, e) {
                return Array.isArray(t) ? t : [t, e];
              }),
              (t._create = function (e, r) {
                var n = this;
                void 0 === r && (r = {});
                var a = r.priority || u.PrioritizedList.DEFAULTPRIORITY,
                  o = r.init ? this.makeProcessor(r.init, a) : null,
                  i = r.config ? this.makeProcessor(r.config, a) : null,
                  s = (r.preprocessors || []).map(function (t) {
                    return n.makeProcessor(t, a);
                  }),
                  l = (r.postprocessors || []).map(function (t) {
                    return n.makeProcessor(t, a);
                  }),
                  c = r.parser || "tex";
                return new t(
                  e,
                  r.handler || {},
                  r.fallback || {},
                  r.items || {},
                  r.tags || {},
                  r.options || {},
                  r.nodes || {},
                  s,
                  l,
                  o,
                  i,
                  a,
                  c
                );
              }),
              (t.create = function (e, r) {
                void 0 === r && (r = {});
                var n = t._create(e, r);
                return o.set(e, n), n;
              }),
              (t.local = function (e) {
                return void 0 === e && (e = {}), t._create("", e);
              }),
              Object.defineProperty(t.prototype, "init", {
                get: function () {
                  return this.initMethod ? this.initMethod[0] : null;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "config", {
                get: function () {
                  return this.configMethod ? this.configMethod[0] : null;
                },
                enumerable: !1,
                configurable: !0,
              }),
              t
            );
          })();
        (e.Configuration = f),
          (function (t) {
            var e = new Map();
            (t.set = function (t, r) {
              e.set(t, r);
            }),
              (t.get = function (t) {
                return e.get(t);
              }),
              (t.keys = function () {
                return e.keys();
              });
          })((o = e.ConfigurationHandler || (e.ConfigurationHandler = {})));
        var h = (function () {
          function t(t, e) {
            var r, a, o, i;
            void 0 === e && (e = ["tex"]),
              (this.initMethod = new l.FunctionList()),
              (this.configMethod = new l.FunctionList()),
              (this.configurations = new u.PrioritizedList()),
              (this.parsers = []),
              (this.handlers = new s.SubHandlers()),
              (this.items = {}),
              (this.tags = {}),
              (this.options = {}),
              (this.nodes = {}),
              (this.parsers = e);
            try {
              for (
                var c = n(t.slice().reverse()), f = c.next();
                !f.done;
                f = c.next()
              ) {
                var h = f.value;
                this.addPackage(h);
              }
            } catch (t) {
              r = { error: t };
            } finally {
              try {
                f && !f.done && (a = c.return) && a.call(c);
              } finally {
                if (r) throw r.error;
              }
            }
            try {
              for (
                var d = n(this.configurations), p = d.next();
                !p.done;
                p = d.next()
              ) {
                var m = p.value,
                  g = m.item,
                  y = m.priority;
                this.append(g, y);
              }
            } catch (t) {
              o = { error: t };
            } finally {
              try {
                p && !p.done && (i = d.return) && i.call(d);
              } finally {
                if (o) throw o.error;
              }
            }
          }
          return (
            (t.prototype.init = function () {
              this.initMethod.execute(this);
            }),
            (t.prototype.config = function (t) {
              var e, r;
              this.configMethod.execute(this, t);
              try {
                for (
                  var a = n(this.configurations), o = a.next();
                  !o.done;
                  o = a.next()
                ) {
                  var i = o.value;
                  this.addFilters(t, i.item);
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  o && !o.done && (r = a.return) && r.call(a);
                } finally {
                  if (e) throw e.error;
                }
              }
            }),
            (t.prototype.addPackage = function (t) {
              var e = "string" == typeof t ? t : t[0],
                r = this.getPackage(e);
              r &&
                this.configurations.add(
                  r,
                  "string" == typeof t ? r.priority : t[1]
                );
            }),
            (t.prototype.add = function (t, e, r) {
              var a, o;
              void 0 === r && (r = {});
              var s = this.getPackage(t);
              this.append(s),
                this.configurations.add(s, s.priority),
                this.init();
              var l = e.parseOptions;
              l.nodeFactory.setCreators(s.nodes);
              try {
                for (
                  var u = n(Object.keys(s.items)), f = u.next();
                  !f.done;
                  f = u.next()
                ) {
                  var h = f.value;
                  l.itemFactory.setNodeClass(h, s.items[h]);
                }
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  f && !f.done && (o = u.return) && o.call(u);
                } finally {
                  if (a) throw a.error;
                }
              }
              c.TagsFactory.addTags(s.tags),
                i.defaultOptions(l.options, s.options),
                i.userOptions(l.options, r),
                this.addFilters(e, s),
                s.config && s.config(this, e);
            }),
            (t.prototype.getPackage = function (t) {
              var e = o.get(t);
              if (e && this.parsers.indexOf(e.parser) < 0)
                throw Error(
                  "Package " + t + " doesn't target the proper parser"
                );
              return e;
            }),
            (t.prototype.append = function (t, e) {
              (e = e || t.priority),
                t.initMethod &&
                  this.initMethod.add(t.initMethod[0], t.initMethod[1]),
                t.configMethod &&
                  this.configMethod.add(t.configMethod[0], t.configMethod[1]),
                this.handlers.add(t.handler, t.fallback, e),
                Object.assign(this.items, t.items),
                Object.assign(this.tags, t.tags),
                i.defaultOptions(this.options, t.options),
                Object.assign(this.nodes, t.nodes);
            }),
            (t.prototype.addFilters = function (t, e) {
              var r, o, i, s;
              try {
                for (
                  var l = n(e.preprocessors), u = l.next();
                  !u.done;
                  u = l.next()
                ) {
                  var c = a(u.value, 2),
                    f = c[0],
                    h = c[1];
                  t.preFilters.add(f, h);
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  u && !u.done && (o = l.return) && o.call(l);
                } finally {
                  if (r) throw r.error;
                }
              }
              try {
                for (
                  var d = n(e.postprocessors), p = d.next();
                  !p.done;
                  p = d.next()
                ) {
                  var m = a(p.value, 2),
                    g = m[0];
                  h = m[1];
                  t.postFilters.add(g, h);
                }
              } catch (t) {
                i = { error: t };
              } finally {
                try {
                  p && !p.done && (s = d.return) && s.call(d);
                } finally {
                  if (i) throw i.error;
                }
              }
            }),
            t
          );
        })();
        e.ParserConfiguration = h;
      },
      199: function (t, e, r) {
        var n =
          (this && this.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              r = e && t[e],
              n = 0;
            if (r) return r.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && n >= t.length && (t = void 0),
                    { value: t && t[n++], done: !t }
                  );
                },
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var a,
          o = r(8921),
          i = r(8321);
        !(function (t) {
          (t.cleanStretchy = function (t) {
            var e,
              r,
              a = t.data;
            try {
              for (
                var o = n(a.getList("fixStretchy")), s = o.next();
                !s.done;
                s = o.next()
              ) {
                var l = s.value;
                if (i.default.getProperty(l, "fixStretchy")) {
                  var u = i.default.getForm(l);
                  u &&
                    u[3] &&
                    u[3].stretchy &&
                    i.default.setAttribute(l, "stretchy", !1);
                  var c = l.parent;
                  if (!(i.default.getTexClass(l) || (u && u[2]))) {
                    var f = a.nodeFactory.create("node", "TeXAtom", [l]);
                    c.replaceChild(f, l), f.inheritAttributesFrom(l);
                  }
                  i.default.removeProperties(l, "fixStretchy");
                }
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                s && !s.done && (r = o.return) && r.call(o);
              } finally {
                if (e) throw e.error;
              }
            }
          }),
            (t.cleanAttributes = function (t) {
              t.data.root.walkTree(function (t, e) {
                var r,
                  a,
                  o = t.attributes;
                if (o)
                  try {
                    for (
                      var i = n(o.getExplicitNames()), s = i.next();
                      !s.done;
                      s = i.next()
                    ) {
                      var l = s.value;
                      o.attributes[l] === t.attributes.getInherited(l) &&
                        delete o.attributes[l];
                    }
                  } catch (t) {
                    r = { error: t };
                  } finally {
                    try {
                      s && !s.done && (a = i.return) && a.call(i);
                    } finally {
                      if (r) throw r.error;
                    }
                  }
              }, {});
            }),
            (t.combineRelations = function (t) {
              var a,
                s,
                l,
                u,
                c = [];
              try {
                for (
                  var f = n(t.data.getList("mo")), h = f.next();
                  !h.done;
                  h = f.next()
                ) {
                  var d = h.value;
                  if (
                    !d.getProperty("relationsCombined") &&
                    d.parent &&
                    (!d.parent || i.default.isType(d.parent, "mrow")) &&
                    i.default.getTexClass(d) === o.TEXCLASS.REL
                  ) {
                    for (
                      var p = d.parent,
                        m = void 0,
                        g = p.childNodes,
                        y = g.indexOf(d) + 1,
                        v = i.default.getProperty(d, "variantForm");
                      y < g.length &&
                      (m = g[y]) &&
                      i.default.isType(m, "mo") &&
                      i.default.getTexClass(m) === o.TEXCLASS.REL;

                    ) {
                      if (
                        v !== i.default.getProperty(m, "variantForm") ||
                        !r(d, m)
                      ) {
                        null == d.attributes.getExplicit("rspace") &&
                          i.default.setAttribute(d, "rspace", "0pt"),
                          null == m.attributes.getExplicit("lspace") &&
                            i.default.setAttribute(m, "lspace", "0pt");
                        break;
                      }
                      i.default.appendChildren(d, i.default.getChildren(m)),
                        e(["stretchy", "rspace"], d, m);
                      try {
                        for (
                          var b = ((l = void 0), n(m.getPropertyNames())),
                            x = b.next();
                          !x.done;
                          x = b.next()
                        ) {
                          var A = x.value;
                          d.setProperty(A, m.getProperty(A));
                        }
                      } catch (t) {
                        l = { error: t };
                      } finally {
                        try {
                          x && !x.done && (u = b.return) && u.call(b);
                        } finally {
                          if (l) throw l.error;
                        }
                      }
                      g.splice(y, 1),
                        c.push(m),
                        (m.parent = null),
                        m.setProperty("relationsCombined", !0);
                    }
                    d.attributes.setInherited("form", d.getForms()[0]);
                  }
                }
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  h && !h.done && (s = f.return) && s.call(f);
                } finally {
                  if (a) throw a.error;
                }
              }
              t.data.removeFromList("mo", c);
            });
          var e = function (t, e, r) {
              var n = e.attributes,
                a = r.attributes;
              t.forEach(function (t) {
                var e = a.getExplicit(t);
                null != e && n.set(t, e);
              });
            },
            r = function (t, e) {
              var r,
                a,
                o = function (t, e) {
                  return t.getExplicitNames().filter(function (r) {
                    return (
                      r !== e && ("stretchy" !== r || t.getExplicit("stretchy"))
                    );
                  });
                },
                i = t.attributes,
                s = e.attributes,
                l = o(i, "lspace"),
                u = o(s, "rspace");
              if (l.length !== u.length) return !1;
              try {
                for (var c = n(l), f = c.next(); !f.done; f = c.next()) {
                  var h = f.value;
                  if (i.getExplicit(h) !== s.getExplicit(h)) return !1;
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  f && !f.done && (a = c.return) && a.call(c);
                } finally {
                  if (r) throw r.error;
                }
              }
              return !0;
            },
            a = function (t, e, r) {
              var a,
                o,
                s = [];
              try {
                for (
                  var l = n(t.getList("m" + e + r)), u = l.next();
                  !u.done;
                  u = l.next()
                ) {
                  var c = u.value,
                    f = c.childNodes;
                  if (!f[c[e]] || !f[c[r]]) {
                    var h = c.parent,
                      d = f[c[e]]
                        ? t.nodeFactory.create("node", "m" + e, [
                            f[c.base],
                            f[c[e]],
                          ])
                        : t.nodeFactory.create("node", "m" + r, [
                            f[c.base],
                            f[c[r]],
                          ]);
                    i.default.copyAttributes(c, d),
                      h ? h.replaceChild(d, c) : (t.root = d),
                      s.push(c);
                  }
                }
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  u && !u.done && (o = l.return) && o.call(l);
                } finally {
                  if (a) throw a.error;
                }
              }
              t.removeFromList("m" + e + r, s);
            };
          t.cleanSubSup = function (t) {
            var e = t.data;
            e.error || (a(e, "sub", "sup"), a(e, "under", "over"));
          };
          var s = function (t, e, r) {
            var a,
              o,
              s = [];
            try {
              for (
                var l = n(t.getList(e)), u = l.next();
                !u.done;
                u = l.next()
              ) {
                var c = u.value;
                if (!c.attributes.get("displaystyle")) {
                  var f = c.childNodes[c.base],
                    h = f.coreMO();
                  if (
                    f.getProperty("movablelimits") &&
                    !h.attributes.getExplicit("movablelimits")
                  ) {
                    var d = t.nodeFactory.create("node", r, c.childNodes);
                    i.default.copyAttributes(c, d),
                      c.parent ? c.parent.replaceChild(d, c) : (t.root = d),
                      s.push(c);
                  }
                }
              }
            } catch (t) {
              a = { error: t };
            } finally {
              try {
                u && !u.done && (o = l.return) && o.call(l);
              } finally {
                if (a) throw a.error;
              }
            }
            t.removeFromList(e, s);
          };
          (t.moveLimits = function (t) {
            var e = t.data;
            s(e, "munderover", "msubsup"),
              s(e, "munder", "msub"),
              s(e, "mover", "msup");
          }),
            (t.setInherited = function (t) {
              t.data.root.setInheritedAttributes({}, t.math.display, 0, !1);
            });
        })(a || (a = {})),
          (e.default = a);
      },
      2982: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.FindTeX = void 0);
        var i = r(9649),
          s = r(6720),
          l = r(4769),
          u = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return r.getPatterns(), r;
            }
            return (
              a(e, t),
              (e.prototype.getPatterns = function () {
                var t = this,
                  e = this.options,
                  r = [],
                  n = [],
                  a = [];
                (this.end = {}), (this.env = this.sub = 0);
                var o = 1;
                e.inlineMath.forEach(function (e) {
                  return t.addPattern(r, e, !1);
                }),
                  e.displayMath.forEach(function (e) {
                    return t.addPattern(r, e, !0);
                  }),
                  r.length && n.push(r.sort(s.sortLength).join("|")),
                  e.processEnvironments &&
                    (n.push("\\\\begin\\s*\\{([^}]*)\\}"), (this.env = o), o++),
                  e.processEscapes && a.push("\\\\([\\\\$])"),
                  e.processRefs && a.push("(\\\\(?:eq)?ref\\s*\\{[^}]*\\})"),
                  a.length && (n.push("(" + a.join("|") + ")"), (this.sub = o)),
                  (this.start = new RegExp(n.join("|"), "g")),
                  (this.hasPatterns = n.length > 0);
              }),
              (e.prototype.addPattern = function (t, e, r) {
                var n = o(e, 2),
                  a = n[0],
                  i = n[1];
                t.push(s.quotePattern(a)),
                  (this.end[a] = [i, r, this.endPattern(i)]);
              }),
              (e.prototype.endPattern = function (t, e) {
                return new RegExp(
                  (e || s.quotePattern(t)) + "|\\\\(?:[a-zA-Z]|.)|[{}]",
                  "g"
                );
              }),
              (e.prototype.findEnd = function (t, e, r, n) {
                for (
                  var a,
                    i = o(n, 3),
                    s = i[0],
                    u = i[1],
                    c = i[2],
                    f = (c.lastIndex = r.index + r[0].length),
                    h = 0;
                  (a = c.exec(t));

                ) {
                  if ((a[1] || a[0]) === s && 0 === h)
                    return l.protoItem(
                      r[0],
                      t.substr(f, a.index - f),
                      a[0],
                      e,
                      r.index,
                      a.index + a[0].length,
                      u
                    );
                  "{" === a[0] ? h++ : "}" === a[0] && h && h--;
                }
                return null;
              }),
              (e.prototype.findMathInString = function (t, e, r) {
                var n, a;
                for (this.start.lastIndex = 0; (n = this.start.exec(r)); ) {
                  if (void 0 !== n[this.env] && this.env) {
                    var o =
                      "\\\\end\\s*(\\{" + s.quotePattern(n[this.env]) + "\\})";
                    (a = this.findEnd(r, e, n, [
                      "{" + n[this.env] + "}",
                      !0,
                      this.endPattern(null, o),
                    ])) &&
                      ((a.math = a.open + a.math + a.close),
                      (a.open = a.close = ""));
                  } else if (void 0 !== n[this.sub] && this.sub) {
                    var i = n[this.sub];
                    o = n.index + n[this.sub].length;
                    a =
                      2 === i.length
                        ? l.protoItem("", i.substr(1), "", e, n.index, o)
                        : l.protoItem("", i, "", e, n.index, o, !1);
                  } else a = this.findEnd(r, e, n, this.end[n[0]]);
                  a && (t.push(a), (this.start.lastIndex = a.end.n));
                }
              }),
              (e.prototype.findMath = function (t) {
                var e = [];
                if (this.hasPatterns)
                  for (var r = 0, n = t.length; r < n; r++)
                    this.findMathInString(e, r, t[r]);
                return e;
              }),
              (e.OPTIONS = {
                inlineMath: [["\\(", "\\)"]],
                displayMath: [
                  ["$$", "$$"],
                  ["\\[", "\\]"],
                ],
                processEscapes: !0,
                processEnvironments: !0,
                processRefs: !0,
              }),
              e
            );
          })(i.AbstractFindMath);
        e.FindTeX = u;
      },
      2910: function (t, e, r) {
        var n =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.SubHandlers = e.SubHandler = e.MapHandler = void 0);
        var o,
          i = r(4297),
          s = r(6898);
        !(function (t) {
          var e = new Map();
          (t.register = function (t) {
            e.set(t.name, t);
          }),
            (t.getMap = function (t) {
              return e.get(t);
            });
        })((o = e.MapHandler || (e.MapHandler = {})));
        var l = (function () {
          function t() {
            (this._configuration = new i.PrioritizedList()),
              (this._fallback = new s.FunctionList());
          }
          return (
            (t.prototype.add = function (t, e, r) {
              var a, s;
              void 0 === r && (r = i.PrioritizedList.DEFAULTPRIORITY);
              try {
                for (
                  var l = n(t.slice().reverse()), u = l.next();
                  !u.done;
                  u = l.next()
                ) {
                  var c = u.value,
                    f = o.getMap(c);
                  if (!f)
                    return void this.warn(
                      "Configuration " + c + " not found! Omitted."
                    );
                  this._configuration.add(f, r);
                }
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  u && !u.done && (s = l.return) && s.call(l);
                } finally {
                  if (a) throw a.error;
                }
              }
              e && this._fallback.add(e, r);
            }),
            (t.prototype.parse = function (t) {
              var e, r;
              try {
                for (
                  var o = n(this._configuration), i = o.next();
                  !i.done;
                  i = o.next()
                ) {
                  var s = i.value.item.parse(t);
                  if (s) return s;
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  i && !i.done && (r = o.return) && r.call(o);
                } finally {
                  if (e) throw e.error;
                }
              }
              var l = a(t, 2),
                u = l[0],
                c = l[1];
              Array.from(this._fallback)[0].item(u, c);
            }),
            (t.prototype.lookup = function (t) {
              var e = this.applicable(t);
              return e ? e.lookup(t) : null;
            }),
            (t.prototype.contains = function (t) {
              return !!this.applicable(t);
            }),
            (t.prototype.toString = function () {
              var t,
                e,
                r = [];
              try {
                for (
                  var a = n(this._configuration), o = a.next();
                  !o.done;
                  o = a.next()
                ) {
                  var i = o.value.item;
                  r.push(i.name);
                }
              } catch (e) {
                t = { error: e };
              } finally {
                try {
                  o && !o.done && (e = a.return) && e.call(a);
                } finally {
                  if (t) throw t.error;
                }
              }
              return r.join(", ");
            }),
            (t.prototype.applicable = function (t) {
              var e, r;
              try {
                for (
                  var a = n(this._configuration), o = a.next();
                  !o.done;
                  o = a.next()
                ) {
                  var i = o.value.item;
                  if (i.contains(t)) return i;
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  o && !o.done && (r = a.return) && r.call(a);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype.retrieve = function (t) {
              var e, r;
              try {
                for (
                  var a = n(this._configuration), o = a.next();
                  !o.done;
                  o = a.next()
                ) {
                  var i = o.value.item;
                  if (i.name === t) return i;
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  o && !o.done && (r = a.return) && r.call(a);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype.warn = function (t) {
              console.log("TexParser Warning: " + t);
            }),
            t
          );
        })();
        e.SubHandler = l;
        var u = (function () {
          function t() {
            this.map = new Map();
          }
          return (
            (t.prototype.add = function (t, e, r) {
              var a, o;
              void 0 === r && (r = i.PrioritizedList.DEFAULTPRIORITY);
              try {
                for (
                  var s = n(Object.keys(t)), u = s.next();
                  !u.done;
                  u = s.next()
                ) {
                  var c = u.value,
                    f = this.get(c);
                  f || ((f = new l()), this.set(c, f)), f.add(t[c], e[c], r);
                }
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  u && !u.done && (o = s.return) && o.call(s);
                } finally {
                  if (a) throw a.error;
                }
              }
            }),
            (t.prototype.set = function (t, e) {
              this.map.set(t, e);
            }),
            (t.prototype.get = function (t) {
              return this.map.get(t);
            }),
            (t.prototype.retrieve = function (t) {
              var e, r;
              try {
                for (
                  var a = n(this.map.values()), o = a.next();
                  !o.done;
                  o = a.next()
                ) {
                  var i = o.value.retrieve(t);
                  if (i) return i;
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  o && !o.done && (r = a.return) && r.call(a);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype.keys = function () {
              return this.map.keys();
            }),
            t
          );
        })();
        e.SubHandlers = u;
      },
      8644: function (t, e, r) {
        var n =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          a =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeFactory = void 0);
        var o = r(8321),
          i = (function () {
            function t() {
              (this.mmlFactory = null),
                (this.factory = {
                  node: t.createNode,
                  token: t.createToken,
                  text: t.createText,
                  error: t.createError,
                });
            }
            return (
              (t.createNode = function (t, e, r, n, a) {
                void 0 === r && (r = []), void 0 === n && (n = {});
                var i = t.mmlFactory.create(e);
                return (
                  i.setChildren(r),
                  a && i.appendChild(a),
                  o.default.setProperties(i, n),
                  i
                );
              }),
              (t.createToken = function (t, e, r, n) {
                void 0 === r && (r = {}), void 0 === n && (n = "");
                var a = t.create("text", n);
                return t.create("node", e, [], r, a);
              }),
              (t.createText = function (t, e) {
                return null == e
                  ? null
                  : t.mmlFactory.create("text").setText(e);
              }),
              (t.createError = function (t, e) {
                var r = t.create("text", e),
                  n = t.create("node", "mtext", [], {}, r);
                return t.create("node", "merror", [n], { "data-mjx-error": e });
              }),
              (t.prototype.setMmlFactory = function (t) {
                this.mmlFactory = t;
              }),
              (t.prototype.set = function (t, e) {
                this.factory[t] = e;
              }),
              (t.prototype.setCreators = function (t) {
                for (var e in t) this.set(e, t[e]);
              }),
              (t.prototype.create = function (t) {
                for (var e = [], r = 1; r < arguments.length; r++)
                  e[r - 1] = arguments[r];
                var o = this.factory[t] || this.factory.node,
                  i = o.apply(void 0, a([this, e[0]], n(e.slice(1))));
                return "node" === t && this.configuration.addNode(e[0], i), i;
              }),
              (t.prototype.get = function (t) {
                return this.factory[t];
              }),
              t
            );
          })();
        e.NodeFactory = i;
      },
      8321: function (t, e, r) {
        var n =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          o =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i,
          s = r(8921),
          l = r(9946);
        !(function (t) {
          var e = new Map([
            ["autoOP", !0],
            ["fnOP", !0],
            ["movesupsub", !0],
            ["subsupOK", !0],
            ["texprimestyle", !0],
            ["useHeight", !0],
            ["variantForm", !0],
            ["withDelims", !0],
            ["mathaccent", !0],
            ["open", !0],
            ["close", !0],
          ]);
          function r(t, r) {
            var a, o;
            try {
              for (
                var i = n(Object.keys(r)), s = i.next();
                !s.done;
                s = i.next()
              ) {
                var l = s.value,
                  u = r[l];
                "texClass" === l
                  ? ((t.texClass = u), t.setProperty(l, u))
                  : "movablelimits" === l
                  ? (t.setProperty("movablelimits", u),
                    (t.isKind("mo") || t.isKind("mstyle")) &&
                      t.attributes.set("movablelimits", u))
                  : "inferred" === l ||
                    (e.has(l) ? t.setProperty(l, u) : t.attributes.set(l, u));
              }
            } catch (t) {
              a = { error: t };
            } finally {
              try {
                s && !s.done && (o = i.return) && o.call(i);
              } finally {
                if (a) throw a.error;
              }
            }
          }
          function i(t, e, r) {
            (t.childNodes[e] = r), r && (r.parent = t);
          }
          function u(t, e) {
            return t.isKind(e);
          }
          (t.createEntity = function (t) {
            return String.fromCodePoint(parseInt(t, 16));
          }),
            (t.getChildren = function (t) {
              return t.childNodes;
            }),
            (t.getText = function (t) {
              return t.getText();
            }),
            (t.appendChildren = function (t, e) {
              var r, a;
              try {
                for (var o = n(e), i = o.next(); !i.done; i = o.next()) {
                  var s = i.value;
                  t.appendChild(s);
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  i && !i.done && (a = o.return) && a.call(o);
                } finally {
                  if (r) throw r.error;
                }
              }
            }),
            (t.setAttribute = function (t, e, r) {
              t.attributes.set(e, r);
            }),
            (t.setProperty = function (t, e, r) {
              t.setProperty(e, r);
            }),
            (t.setProperties = r),
            (t.getProperty = function (t, e) {
              return t.getProperty(e);
            }),
            (t.getAttribute = function (t, e) {
              return t.attributes.get(e);
            }),
            (t.removeProperties = function (t) {
              for (var e = [], r = 1; r < arguments.length; r++)
                e[r - 1] = arguments[r];
              t.removeProperty.apply(t, o([], a(e)));
            }),
            (t.getChildAt = function (t, e) {
              return t.childNodes[e];
            }),
            (t.setChild = i),
            (t.copyChildren = function (t, e) {
              for (var r = t.childNodes, n = 0; n < r.length; n++)
                i(e, n, r[n]);
            }),
            (t.copyAttributes = function (t, e) {
              (e.attributes = t.attributes), r(e, t.getAllProperties());
            }),
            (t.isType = u),
            (t.isEmbellished = function (t) {
              return t.isEmbellished;
            }),
            (t.getTexClass = function (t) {
              return t.texClass;
            }),
            (t.getCoreMO = function (t) {
              return t.coreMO();
            }),
            (t.isNode = function (t) {
              return (
                t instanceof s.AbstractMmlNode ||
                t instanceof s.AbstractMmlEmptyNode
              );
            }),
            (t.isInferred = function (t) {
              return t.isInferred;
            }),
            (t.getForm = function (t) {
              var e, r;
              if (!u(t, "mo")) return null;
              var a = t,
                o = a.getForms();
              try {
                for (var i = n(o), s = i.next(); !s.done; s = i.next()) {
                  var c = s.value,
                    f = l.MmlMo.OPTABLE[c][a.getText()];
                  if (f) return f;
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  s && !s.done && (r = i.return) && r.call(i);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            });
        })(i || (i = {})),
          (e.default = i);
      },
      4708: function (t, e, r) {
        var n =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          a =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var o,
          i = r(8321),
          s = r(7007),
          l = r(7702);
        !(function (t) {
          (t.variable = function (t, e) {
            var r = l.default.getFontDef(t);
            t.stack.env.multiLetterIdentifiers &&
              "" !== t.stack.env.font &&
              ((e = t.string.substr(t.i - 1).match(/^[a-z]+/i)[0]),
              (t.i += e.length - 1),
              r.mathvariant === s.TexConstant.Variant.NORMAL &&
                (r.autoOP = !1));
            var n = t.create("token", "mi", r, e);
            t.Push(n);
          }),
            (t.digit = function (t, e) {
              var r,
                n = t.configuration.options.digits,
                a = t.string.slice(t.i - 1).match(n),
                o = l.default.getFontDef(t);
              a
                ? ((r = t.create("token", "mn", o, a[0].replace(/[{}]/g, ""))),
                  (t.i += a[0].length - 1))
                : (r = t.create("token", "mo", o, e)),
                t.Push(r);
            }),
            (t.controlSequence = function (t, e) {
              var r = t.GetCS();
              t.parse("macro", [t, r]);
            }),
            (t.mathchar0mi = function (t, e) {
              var r = e.attributes || {
                  mathvariant: s.TexConstant.Variant.ITALIC,
                },
                n = t.create("token", "mi", r, e.char);
              t.Push(n);
            }),
            (t.mathchar0mo = function (t, e) {
              var r = e.attributes || {};
              r.stretchy = !1;
              var n = t.create("token", "mo", r, e.char);
              i.default.setProperty(n, "fixStretchy", !0),
                t.configuration.addNode("fixStretchy", n),
                t.Push(n);
            }),
            (t.mathchar7 = function (t, e) {
              var r = e.attributes || {
                mathvariant: s.TexConstant.Variant.NORMAL,
              };
              t.stack.env.font && (r.mathvariant = t.stack.env.font);
              var n = t.create("token", "mi", r, e.char);
              t.Push(n);
            }),
            (t.delimiter = function (t, e) {
              var r = e.attributes || {};
              r = Object.assign({ fence: !1, stretchy: !1 }, r);
              var n = t.create("token", "mo", r, e.char);
              t.Push(n);
            }),
            (t.environment = function (t, e, r, o) {
              var i = o[0],
                s = t.itemFactory
                  .create("begin")
                  .setProperties({ name: e, end: i });
              (s = r.apply(void 0, a([t, s], n(o.slice(1))))), t.Push(s);
            });
        })(o || (o = {})),
          (e.default = o);
      },
      6394: function (t, e, r) {
        var n =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          a =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            },
          o =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i = r(3239),
          s = r(8644),
          l = r(8321),
          u = r(9077),
          c = (function () {
            function t(t, e) {
              void 0 === e && (e = []),
                (this.options = {}),
                (this.packageData = new Map()),
                (this.parsers = []),
                (this.root = null),
                (this.nodeLists = {}),
                (this.error = !1),
                (this.handlers = t.handlers),
                (this.nodeFactory = new s.NodeFactory()),
                (this.nodeFactory.configuration = this),
                this.nodeFactory.setCreators(t.nodes),
                (this.itemFactory = new i.default(t.items)),
                (this.itemFactory.configuration = this),
                u.defaultOptions.apply(void 0, a([this.options], n(e))),
                u.defaultOptions(this.options, t.options);
            }
            return (
              (t.prototype.pushParser = function (t) {
                this.parsers.unshift(t);
              }),
              (t.prototype.popParser = function () {
                this.parsers.shift();
              }),
              Object.defineProperty(t.prototype, "parser", {
                get: function () {
                  return this.parsers[0];
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.clear = function () {
                (this.parsers = []),
                  (this.root = null),
                  (this.nodeLists = {}),
                  (this.error = !1),
                  this.tags.resetTag();
              }),
              (t.prototype.addNode = function (t, e) {
                var r = this.nodeLists[t];
                if (
                  (r || (r = this.nodeLists[t] = []), r.push(e), e.kind !== t)
                ) {
                  var n = l.default.getProperty(e, "in-lists") || "",
                    a = (n ? n.split(/,/) : []).concat(t).join(",");
                  l.default.setProperty(e, "in-lists", a);
                }
              }),
              (t.prototype.getList = function (t) {
                var e,
                  r,
                  n = this.nodeLists[t] || [],
                  a = [];
                try {
                  for (var i = o(n), s = i.next(); !s.done; s = i.next()) {
                    var l = s.value;
                    this.inTree(l) && a.push(l);
                  }
                } catch (t) {
                  e = { error: t };
                } finally {
                  try {
                    s && !s.done && (r = i.return) && r.call(i);
                  } finally {
                    if (e) throw e.error;
                  }
                }
                return (this.nodeLists[t] = a), a;
              }),
              (t.prototype.removeFromList = function (t, e) {
                var r,
                  n,
                  a = this.nodeLists[t] || [];
                try {
                  for (var i = o(e), s = i.next(); !s.done; s = i.next()) {
                    var l = s.value,
                      u = a.indexOf(l);
                    u >= 0 && a.splice(u, 1);
                  }
                } catch (t) {
                  r = { error: t };
                } finally {
                  try {
                    s && !s.done && (n = i.return) && n.call(i);
                  } finally {
                    if (r) throw r.error;
                  }
                }
              }),
              (t.prototype.inTree = function (t) {
                for (; t && t !== this.root; ) t = t.parent;
                return !!t;
              }),
              t
            );
          })();
        e.default = c;
      },
      7702: function (t, e, r) {
        var n =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          a =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var o,
          i = r(8921),
          s = r(8321),
          l = r(810),
          u = r(3466),
          c = r(9029);
        !(function (t) {
          var e = 7.2,
            r = {
              em: function (t) {
                return t;
              },
              ex: function (t) {
                return 0.43 * t;
              },
              pt: function (t) {
                return t / 10;
              },
              pc: function (t) {
                return 1.2 * t;
              },
              px: function (t) {
                return (t * e) / 72;
              },
              in: function (t) {
                return t * e;
              },
              cm: function (t) {
                return (t * e) / 2.54;
              },
              mm: function (t) {
                return (t * e) / 25.4;
              },
              mu: function (t) {
                return t / 18;
              },
            },
            o = "([-+]?([.,]\\d+|\\d+([.,]\\d*)?))",
            f = "(pt|em|ex|mu|px|mm|cm|in|pc)",
            h = RegExp("^\\s*" + o + "\\s*" + f + "\\s*$"),
            d = RegExp("^\\s*" + o + "\\s*" + f + " ?");
          function p(t, e) {
            void 0 === e && (e = !1);
            var a = t.match(e ? d : h);
            return a
              ? (function (t) {
                  var e = n(t, 3),
                    a = e[0],
                    o = e[1],
                    i = e[2];
                  if ("mu" !== o) return [a, o, i];
                  return [m(r[o](parseFloat(a || "1"))).slice(0, -2), "em", i];
                })([a[1].replace(/,/, "."), a[4], a[0].length])
              : [null, null, 0];
          }
          function m(t) {
            return Math.abs(t) < 6e-4
              ? "0em"
              : t.toFixed(3).replace(/\.?0+$/, "") + "em";
          }
          function g(t, e, r) {
            ("{" !== e && "}" !== e) || (e = "\\" + e);
            var n = "{\\bigg" + r + " " + e + "}",
              a = "{\\big" + r + " " + e + "}";
            return new l.default("\\mathchoice" + n + a + a + a, {}, t).mml();
          }
          function y(t, e, r) {
            e = e
              .replace(/^\s+/, c.entities.nbsp)
              .replace(/\s+$/, c.entities.nbsp);
            var n = t.create("text", e);
            return t.create("node", "mtext", [], r, n);
          }
          function v(t, e, r) {
            if (
              (r.match(/^[a-z]/i) &&
                e.match(/(^|[^\\])(\\\\)*\\[a-z]+$/i) &&
                (e += " "),
              e.length + r.length > t.configuration.options.maxBuffer)
            )
              throw new u.default(
                "MaxBufferSize",
                "MathJax internal buffer size exceeded; is there a recursive macro call?"
              );
            return e + r;
          }
          function b(t, e) {
            for (; e > 0; ) (t = t.trim().slice(1, -1)), e--;
            return t.trim();
          }
          function x(t, e) {
            for (
              var r = t.length, n = 0, a = "", o = 0, i = 0, s = !0, l = !1;
              o < r;

            ) {
              var c = t[o++];
              switch (c) {
                case " ":
                  break;
                case "{":
                  s ? i++ : ((l = !1), i > n && (i = n)), n++;
                  break;
                case "}":
                  n && n--, (s || l) && (i--, (l = !0)), (s = !1);
                  break;
                default:
                  if (!n && -1 !== e.indexOf(c))
                    return [l ? "true" : b(a, i), c, t.slice(o)];
                  (s = !1), (l = !1);
              }
              a += c;
            }
            if (n)
              throw new u.default(
                "ExtraOpenMissingClose",
                "Extra open brace or missing close brace"
              );
            return [l ? "true" : b(a, i), "", t.slice(o)];
          }
          (t.matchDimen = p),
            (t.dimen2em = function (t) {
              var e = n(p(t), 2),
                a = e[0],
                o = e[1],
                i = parseFloat(a || "1"),
                s = r[o];
              return s ? s(i) : 0;
            }),
            (t.Em = m),
            (t.cols = function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              return t
                .map(function (t) {
                  return m(t);
                })
                .join(" ");
            }),
            (t.fenced = function (t, e, r, n, a, o) {
              void 0 === a && (a = ""), void 0 === o && (o = "");
              var u,
                c = t.nodeFactory,
                f = c.create("node", "mrow", [], {
                  open: e,
                  close: n,
                  texClass: i.TEXCLASS.INNER,
                });
              if (a)
                u = new l.default(
                  "\\" + a + "l" + e,
                  t.parser.stack.env,
                  t
                ).mml();
              else {
                var h = c.create("text", e);
                u = c.create(
                  "node",
                  "mo",
                  [],
                  {
                    fence: !0,
                    stretchy: !0,
                    symmetric: !0,
                    texClass: i.TEXCLASS.OPEN,
                  },
                  h
                );
              }
              if ((s.default.appendChildren(f, [u, r]), a))
                u = new l.default(
                  "\\" + a + "r" + n,
                  t.parser.stack.env,
                  t
                ).mml();
              else {
                var d = c.create("text", n);
                u = c.create(
                  "node",
                  "mo",
                  [],
                  {
                    fence: !0,
                    stretchy: !0,
                    symmetric: !0,
                    texClass: i.TEXCLASS.CLOSE,
                  },
                  d
                );
              }
              return (
                o && u.attributes.set("mathcolor", o),
                s.default.appendChildren(f, [u]),
                f
              );
            }),
            (t.fixedFence = function (t, e, r, n) {
              var a = t.nodeFactory.create("node", "mrow", [], {
                open: e,
                close: n,
                texClass: i.TEXCLASS.ORD,
              });
              return (
                e && s.default.appendChildren(a, [g(t, e, "l")]),
                s.default.isType(r, "mrow")
                  ? s.default.appendChildren(a, s.default.getChildren(r))
                  : s.default.appendChildren(a, [r]),
                n && s.default.appendChildren(a, [g(t, n, "r")]),
                a
              );
            }),
            (t.mathPalette = g),
            (t.fixInitialMO = function (t, e) {
              for (var r = 0, n = e.length; r < n; r++) {
                var a = e[r];
                if (
                  a &&
                  !s.default.isType(a, "mspace") &&
                  (!s.default.isType(a, "TeXAtom") ||
                    (s.default.getChildren(a)[0] &&
                      s.default.getChildren(s.default.getChildren(a)[0])
                        .length))
                ) {
                  if (
                    s.default.isEmbellished(a) ||
                    (s.default.isType(a, "TeXAtom") &&
                      s.default.getTexClass(a) === i.TEXCLASS.REL)
                  ) {
                    var o = t.nodeFactory.create("node", "mi");
                    e.unshift(o);
                  }
                  break;
                }
              }
            }),
            (t.internalMath = function (t, e, r, n) {
              if (t.configuration.options.internalMath)
                return t.configuration.options.internalMath(t, e, r, n);
              var a,
                o,
                i = n || t.stack.env.font,
                s = i ? { mathvariant: i } : {},
                c = [],
                f = 0,
                h = 0,
                d = "",
                p = 0;
              if (e.match(/\\?[${}\\]|\\\(|\\(eq)?ref\s*\{/)) {
                for (; f < e.length; )
                  if ("$" === (a = e.charAt(f++)))
                    "$" === d && 0 === p
                      ? ((o = t.create("node", "TeXAtom", [
                          new l.default(
                            e.slice(h, f - 1),
                            {},
                            t.configuration
                          ).mml(),
                        ])),
                        c.push(o),
                        (d = ""),
                        (h = f))
                      : "" === d &&
                        (h < f - 1 && c.push(y(t, e.slice(h, f - 1), s)),
                        (d = "$"),
                        (h = f));
                  else if ("{" === a && "" !== d) p++;
                  else if ("}" === a)
                    if ("}" === d && 0 === p) {
                      var m = new l.default(
                        e.slice(h, f),
                        {},
                        t.configuration
                      ).mml();
                      (o = t.create("node", "TeXAtom", [m], s)),
                        c.push(o),
                        (d = ""),
                        (h = f);
                    } else "" !== d && p && p--;
                  else if ("\\" === a)
                    if ("" === d && e.substr(f).match(/^(eq)?ref\s*\{/)) {
                      var g = RegExp["$&"].length;
                      h < f - 1 && c.push(y(t, e.slice(h, f - 1), s)),
                        (d = "}"),
                        (h = f - 1),
                        (f += g);
                    } else
                      "(" === (a = e.charAt(f++)) && "" === d
                        ? (h < f - 2 && c.push(y(t, e.slice(h, f - 2), s)),
                          (d = ")"),
                          (h = f))
                        : ")" === a && ")" === d && 0 === p
                        ? ((o = t.create("node", "TeXAtom", [
                            new l.default(
                              e.slice(h, f - 2),
                              {},
                              t.configuration
                            ).mml(),
                          ])),
                          c.push(o),
                          (d = ""),
                          (h = f))
                        : a.match(/[${}\\]/) &&
                          "" === d &&
                          (f--, (e = e.substr(0, f - 1) + e.substr(f)));
                if ("" !== d)
                  throw new u.default(
                    "MathNotTerminated",
                    "Math not terminated in text box"
                  );
              }
              return (
                h < e.length && c.push(y(t, e.slice(h), s)),
                null != r
                  ? (c = [
                      t.create("node", "mstyle", c, {
                        displaystyle: !1,
                        scriptlevel: r,
                      }),
                    ])
                  : c.length > 1 && (c = [t.create("node", "mrow", c)]),
                c
              );
            }),
            (t.internalText = y),
            (t.underOver = function (e, r, n, a, o) {
              if (
                (t.checkMovableLimits(r),
                s.default.isType(r, "munderover") && s.default.isEmbellished(r))
              ) {
                s.default.setProperties(s.default.getCoreMO(r), {
                  lspace: 0,
                  rspace: 0,
                });
                var l = e.create("node", "mo", [], { rspace: 0 });
                r = e.create("node", "mrow", [l, r]);
              }
              var u = e.create("node", "munderover", [r]);
              s.default.setChild(u, "over" === a ? u.over : u.under, n);
              var c = u;
              return (
                o &&
                  (c = e.create("node", "TeXAtom", [u], {
                    texClass: i.TEXCLASS.OP,
                    movesupsub: !0,
                  })),
                s.default.setProperty(c, "subsupOK", !0),
                c
              );
            }),
            (t.checkMovableLimits = function (t) {
              var e = s.default.isType(t, "mo") ? s.default.getForm(t) : null;
              (s.default.getProperty(t, "movablelimits") ||
                (e && e[3] && e[3].movablelimits)) &&
                s.default.setProperties(t, { movablelimits: !1 });
            }),
            (t.trimSpaces = function (t) {
              if ("string" != typeof t) return t;
              var e = t.trim();
              return e.match(/\\$/) && t.match(/ $/) && (e += " "), e;
            }),
            (t.setArrayAlign = function (e, r) {
              return (
                "t" === (r = t.trimSpaces(r || ""))
                  ? (e.arraydef.align = "baseline 1")
                  : "b" === r
                  ? (e.arraydef.align = "baseline -1")
                  : "c" === r
                  ? (e.arraydef.align = "axis")
                  : r && (e.arraydef.align = r),
                e
              );
            }),
            (t.substituteArgs = function (t, e, r) {
              for (var n = "", a = "", o = 0; o < r.length; ) {
                var i = r.charAt(o++);
                if ("\\" === i) n += i + r.charAt(o++);
                else if ("#" === i)
                  if ("#" === (i = r.charAt(o++))) n += i;
                  else {
                    if (!i.match(/[1-9]/) || parseInt(i, 10) > e.length)
                      throw new u.default(
                        "IllegalMacroParam",
                        "Illegal macro parameter reference"
                      );
                    (a = v(t, v(t, a, n), e[parseInt(i, 10) - 1])), (n = "");
                  }
                else n += i;
              }
              return v(t, a, n);
            }),
            (t.addArgs = v),
            (t.checkMaxMacros = function (t, e) {
              if (
                (void 0 === e && (e = !0),
                !(++t.macroCount <= t.configuration.options.maxMacros))
              )
                throw e
                  ? new u.default(
                      "MaxMacroSub1",
                      "MathJax maximum macro substitution count exceeded; is here a recursive macro call?"
                    )
                  : new u.default(
                      "MaxMacroSub2",
                      "MathJax maximum substitution count exceeded; is there a recursive latex environment?"
                    );
            }),
            (t.checkEqnEnv = function (t) {
              if (t.stack.global.eqnenv)
                throw new u.default(
                  "ErroneousNestingEq",
                  "Erroneous nesting of equation structures"
                );
              t.stack.global.eqnenv = !0;
            }),
            (t.copyNode = function (t, e) {
              var r = t.copy(),
                n = e.configuration;
              return (
                r.walkTree(function (t) {
                  var e, r;
                  n.addNode(t.kind, t);
                  var o = (t.getProperty("in-lists") || "").split(/,/);
                  try {
                    for (var i = a(o), s = i.next(); !s.done; s = i.next()) {
                      var l = s.value;
                      n.addNode(l, t);
                    }
                  } catch (t) {
                    e = { error: t };
                  } finally {
                    try {
                      s && !s.done && (r = i.return) && r.call(i);
                    } finally {
                      if (e) throw e.error;
                    }
                  }
                }),
                r
              );
            }),
            (t.MmlFilterAttribute = function (t, e, r) {
              return r;
            }),
            (t.getFontDef = function (t) {
              var e = t.stack.env.font;
              return e ? { mathvariant: e } : {};
            }),
            (t.keyvalOptions = function (t, e, r) {
              var o, i;
              void 0 === e && (e = null), void 0 === r && (r = !1);
              var s = (function (t) {
                var e,
                  r,
                  a,
                  o,
                  i,
                  s = {},
                  l = t;
                for (; l; )
                  (o = (e = n(x(l, ["=", ","]), 3))[0]),
                    (a = e[1]),
                    (l = e[2]),
                    "=" === a
                      ? ((i = (r = n(x(l, [","]), 3))[0]),
                        (a = r[1]),
                        (l = r[2]),
                        (i = "false" === i || "true" === i ? JSON.parse(i) : i),
                        (s[o] = i))
                      : o && (s[o] = !0);
                return s;
              })(t);
              if (e)
                try {
                  for (
                    var l = a(Object.keys(s)), c = l.next();
                    !c.done;
                    c = l.next()
                  ) {
                    var f = c.value;
                    if (!e.hasOwnProperty(f)) {
                      if (r)
                        throw new u.default(
                          "InvalidOption",
                          "Invalid option: %1",
                          f
                        );
                      delete s[f];
                    }
                  }
                } catch (t) {
                  o = { error: t };
                } finally {
                  try {
                    c && !c.done && (i = l.return) && i.call(l);
                  } finally {
                    if (o) throw o.error;
                  }
                }
              return s;
            });
        })(o || (o = {})),
          (e.default = o);
      },
      9874: function (t, e, r) {
        var n =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          o =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i = r(8321),
          s = (function () {
            function t(t, e, r) {
              (this._factory = t),
                (this._env = e),
                (this.global = {}),
                (this.stack = []),
                (this.global = { isInner: r }),
                (this.stack = [this._factory.create("start", this.global)]),
                e && (this.stack[0].env = e),
                (this.env = this.stack[0].env);
            }
            return (
              Object.defineProperty(t.prototype, "env", {
                get: function () {
                  return this._env;
                },
                set: function (t) {
                  this._env = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.Push = function () {
                for (var t, e, r = [], s = 0; s < arguments.length; s++)
                  r[s] = arguments[s];
                try {
                  for (var l = n(r), u = l.next(); !u.done; u = l.next()) {
                    var c = u.value;
                    if (c) {
                      var f = i.default.isNode(c)
                        ? this._factory.create("mml", c)
                        : c;
                      f.global = this.global;
                      var h = a(
                          this.stack.length
                            ? this.Top().checkItem(f)
                            : [null, !0],
                          2
                        ),
                        d = h[0],
                        p = h[1];
                      p &&
                        (d
                          ? (this.Pop(), this.Push.apply(this, o([], a(d))))
                          : (this.stack.push(f),
                            f.env
                              ? (f.copyEnv && Object.assign(f.env, this.env),
                                (this.env = f.env))
                              : (f.env = this.env)));
                    }
                  }
                } catch (e) {
                  t = { error: e };
                } finally {
                  try {
                    u && !u.done && (e = l.return) && e.call(l);
                  } finally {
                    if (t) throw t.error;
                  }
                }
              }),
              (t.prototype.Pop = function () {
                var t = this.stack.pop();
                return (
                  t.isOpen || delete t.env,
                  (this.env = this.stack.length ? this.Top().env : {}),
                  t
                );
              }),
              (t.prototype.Top = function (t) {
                return (
                  void 0 === t && (t = 1),
                  this.stack.length < t
                    ? null
                    : this.stack[this.stack.length - t]
                );
              }),
              (t.prototype.Prev = function (t) {
                var e = this.Top();
                return t ? e.First : e.Pop();
              }),
              (t.prototype.toString = function () {
                return "stack[\n  " + this.stack.join("\n  ") + "\n]";
              }),
              t
            );
          })();
        e.default = s;
      },
      7044: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          i =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            },
          s =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BaseItem = e.MmlStack = void 0);
        var l = r(3466),
          u = (function () {
            function t(t) {
              this._nodes = t;
            }
            return (
              Object.defineProperty(t.prototype, "nodes", {
                get: function () {
                  return this._nodes;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.Push = function () {
                for (var t, e = [], r = 0; r < arguments.length; r++)
                  e[r] = arguments[r];
                (t = this._nodes).push.apply(t, i([], o(e)));
              }),
              (t.prototype.Pop = function () {
                return this._nodes.pop();
              }),
              Object.defineProperty(t.prototype, "First", {
                get: function () {
                  return this._nodes[this.Size() - 1];
                },
                set: function (t) {
                  this._nodes[this.Size() - 1] = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "Last", {
                get: function () {
                  return this._nodes[0];
                },
                set: function (t) {
                  this._nodes[0] = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.Peek = function (t) {
                return null == t && (t = 1), this._nodes.slice(this.Size() - t);
              }),
              (t.prototype.Size = function () {
                return this._nodes.length;
              }),
              (t.prototype.Clear = function () {
                this._nodes = [];
              }),
              (t.prototype.toMml = function (t, e) {
                return (
                  void 0 === t && (t = !0),
                  1 !== this._nodes.length || e
                    ? this.create(
                        "node",
                        t ? "inferredMrow" : "mrow",
                        this._nodes,
                        {}
                      )
                    : this.First
                );
              }),
              (t.prototype.create = function (t) {
                for (var e, r = [], n = 1; n < arguments.length; n++)
                  r[n - 1] = arguments[n];
                return (e =
                  this.factory.configuration.nodeFactory).create.apply(
                  e,
                  i([t], o(r))
                );
              }),
              t
            );
          })();
        e.MmlStack = u;
        var c = (function (t) {
          function e(e) {
            for (var r = [], n = 1; n < arguments.length; n++)
              r[n - 1] = arguments[n];
            var a = t.call(this, r) || this;
            return (
              (a.factory = e),
              (a.global = {}),
              (a._properties = {}),
              a.isOpen && (a._env = {}),
              a
            );
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "base";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "env", {
              get: function () {
                return this._env;
              },
              set: function (t) {
                this._env = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "copyEnv", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.getProperty = function (t) {
              return this._properties[t];
            }),
            (e.prototype.setProperty = function (t, e) {
              return (this._properties[t] = e), this;
            }),
            Object.defineProperty(e.prototype, "isOpen", {
              get: function () {
                return !1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isFinal", {
              get: function () {
                return !1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.isKind = function (t) {
              return t === this.kind;
            }),
            (e.prototype.checkItem = function (t) {
              if (
                (t.isKind("over") &&
                  this.isOpen &&
                  (t.setProperty("num", this.toMml(!1)), this.Clear()),
                t.isKind("cell") && this.isOpen)
              ) {
                if (t.getProperty("linebreak")) return e.fail;
                throw new l.default("Misplaced", "Misplaced %1", t.getName());
              }
              if (t.isClose && this.getErrors(t.kind)) {
                var r = o(this.getErrors(t.kind), 2),
                  n = r[0],
                  a = r[1];
                throw new l.default(n, a, t.getName());
              }
              return t.isFinal ? (this.Push(t.First), e.fail) : e.success;
            }),
            (e.prototype.clearEnv = function () {
              var t, e;
              try {
                for (
                  var r = s(Object.keys(this.env)), n = r.next();
                  !n.done;
                  n = r.next()
                ) {
                  var a = n.value;
                  delete this.env[a];
                }
              } catch (e) {
                t = { error: e };
              } finally {
                try {
                  n && !n.done && (e = r.return) && e.call(r);
                } finally {
                  if (t) throw t.error;
                }
              }
            }),
            (e.prototype.setProperties = function (t) {
              return Object.assign(this._properties, t), this;
            }),
            (e.prototype.getName = function () {
              return this.getProperty("name");
            }),
            (e.prototype.toString = function () {
              return this.kind + "[" + this.nodes.join("; ") + "]";
            }),
            (e.prototype.getErrors = function (t) {
              return (this.constructor.errors || {})[t] || e.errors[t];
            }),
            (e.fail = [null, !1]),
            (e.success = [null, !0]),
            (e.errors = {
              end: [
                "MissingBeginExtraEnd",
                "Missing \\begin{%1} or extra \\end{%1}",
              ],
              close: [
                "ExtraCloseMissingOpen",
                "Extra close brace or missing open brace",
              ],
              right: [
                "MissingLeftExtraRight",
                "Missing \\left or extra \\right",
              ],
              middle: ["ExtraMiddle", "Extra \\middle"],
            }),
            e
          );
        })(u);
        e.BaseItem = c;
      },
      3239: function (t, e, r) {
        var n,
          a,
          o =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i = r(7044),
          s = r(752),
          l = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return o(e, t), e;
          })(i.BaseItem),
          u = (function (t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (e.defaultKind = "dummy"), (e.configuration = null), e;
            }
            return (
              o(e, t),
              (e.DefaultStackItems = (((a = {})[l.prototype.kind] = l), a)),
              e
            );
          })(s.AbstractFactory);
        e.default = u;
      },
      4237: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Macro = e.Symbol = void 0);
        var r = (function () {
          function t(t, e, r) {
            (this._symbol = t), (this._char = e), (this._attributes = r);
          }
          return (
            Object.defineProperty(t.prototype, "symbol", {
              get: function () {
                return this._symbol;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "char", {
              get: function () {
                return this._char;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "attributes", {
              get: function () {
                return this._attributes;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })();
        e.Symbol = r;
        var n = (function () {
          function t(t, e, r) {
            void 0 === r && (r = []),
              (this._symbol = t),
              (this._func = e),
              (this._args = r);
          }
          return (
            Object.defineProperty(t.prototype, "symbol", {
              get: function () {
                return this._symbol;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "func", {
              get: function () {
                return this._func;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "args", {
              get: function () {
                return this._args;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })();
        e.Macro = n;
      },
      7628: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          i =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          s =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.EnvironmentMap =
            e.CommandMap =
            e.MacroMap =
            e.DelimiterMap =
            e.CharacterMap =
            e.AbstractParseMap =
            e.RegExpMap =
            e.AbstractSymbolMap =
              void 0);
        var l = r(4237),
          u = r(2910),
          c = (function () {
            function t(t, e) {
              (this._name = t), (this._parser = e), u.MapHandler.register(this);
            }
            return (
              Object.defineProperty(t.prototype, "name", {
                get: function () {
                  return this._name;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.parserFor = function (t) {
                return this.contains(t) ? this.parser : null;
              }),
              (t.prototype.parse = function (t) {
                var e = o(t, 2),
                  r = e[0],
                  n = e[1],
                  a = this.parserFor(n),
                  i = this.lookup(n);
                return a && i ? a(r, i) || !0 : null;
              }),
              Object.defineProperty(t.prototype, "parser", {
                get: function () {
                  return this._parser;
                },
                set: function (t) {
                  this._parser = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              t
            );
          })();
        e.AbstractSymbolMap = c;
        var f = (function (t) {
          function e(e, r, n) {
            var a = t.call(this, e, r) || this;
            return (a._regExp = n), a;
          }
          return (
            a(e, t),
            (e.prototype.contains = function (t) {
              return this._regExp.test(t);
            }),
            (e.prototype.lookup = function (t) {
              return this.contains(t) ? t : null;
            }),
            e
          );
        })(c);
        e.RegExpMap = f;
        var h = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.map = new Map()), e;
          }
          return (
            a(e, t),
            (e.prototype.lookup = function (t) {
              return this.map.get(t);
            }),
            (e.prototype.contains = function (t) {
              return this.map.has(t);
            }),
            (e.prototype.add = function (t, e) {
              this.map.set(t, e);
            }),
            (e.prototype.remove = function (t) {
              this.map.delete(t);
            }),
            e
          );
        })(c);
        e.AbstractParseMap = h;
        var d = (function (t) {
          function e(e, r, n) {
            var a,
              s,
              u = t.call(this, e, r) || this;
            try {
              for (
                var c = i(Object.keys(n)), f = c.next();
                !f.done;
                f = c.next()
              ) {
                var h = f.value,
                  d = n[h],
                  p = o("string" == typeof d ? [d, null] : d, 2),
                  m = p[0],
                  g = p[1],
                  y = new l.Symbol(h, m, g);
                u.add(h, y);
              }
            } catch (t) {
              a = { error: t };
            } finally {
              try {
                f && !f.done && (s = c.return) && s.call(c);
              } finally {
                if (a) throw a.error;
              }
            }
            return u;
          }
          return a(e, t), e;
        })(h);
        e.CharacterMap = d;
        var p = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            (e.prototype.parse = function (e) {
              var r = o(e, 2),
                n = r[0],
                a = r[1];
              return t.prototype.parse.call(this, [n, "\\" + a]);
            }),
            e
          );
        })(d);
        e.DelimiterMap = p;
        var m = (function (t) {
          function e(e, r, n) {
            var a,
              s,
              u = t.call(this, e, null) || this;
            try {
              for (
                var c = i(Object.keys(r)), f = c.next();
                !f.done;
                f = c.next()
              ) {
                var h = f.value,
                  d = r[h],
                  p = o("string" == typeof d ? [d] : d),
                  m = p[0],
                  g = p.slice(1),
                  y = new l.Macro(h, n[m], g);
                u.add(h, y);
              }
            } catch (t) {
              a = { error: t };
            } finally {
              try {
                f && !f.done && (s = c.return) && s.call(c);
              } finally {
                if (a) throw a.error;
              }
            }
            return u;
          }
          return (
            a(e, t),
            (e.prototype.parserFor = function (t) {
              var e = this.lookup(t);
              return e ? e.func : null;
            }),
            (e.prototype.parse = function (t) {
              var e = o(t, 2),
                r = e[0],
                n = e[1],
                a = this.lookup(n),
                i = this.parserFor(n);
              return a && i
                ? i.apply(void 0, s([r, a.symbol], o(a.args))) || !0
                : null;
            }),
            e
          );
        })(h);
        e.MacroMap = m;
        var g = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            (e.prototype.parse = function (t) {
              var e = o(t, 2),
                r = e[0],
                n = e[1],
                a = this.lookup(n),
                i = this.parserFor(n);
              if (!a || !i) return null;
              if (!i) return null;
              var l = r.currentCS;
              r.currentCS = "\\" + n;
              var u = i.apply(void 0, s([r, "\\" + a.symbol], o(a.args)));
              return (r.currentCS = l), u || !0;
            }),
            e
          );
        })(m);
        e.CommandMap = g;
        var y = (function (t) {
          function e(e, r, n, a) {
            var o = t.call(this, e, n, a) || this;
            return (o.parser = r), o;
          }
          return (
            a(e, t),
            (e.prototype.parse = function (t) {
              var e = o(t, 2),
                r = e[0],
                n = e[1],
                a = this.lookup(n),
                i = this.parserFor(n);
              return a && i ? (this.parser(r, a.symbol, i, a.args), !0) : null;
            }),
            e
          );
        })(m);
        e.EnvironmentMap = y;
      },
      7251: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TagsFactory =
            e.AllTags =
            e.NoTags =
            e.AbstractTags =
            e.TagInfo =
            e.Label =
              void 0);
        var i = r(810),
          s = function (t, e) {
            void 0 === t && (t = "???"),
              void 0 === e && (e = ""),
              (this.tag = t),
              (this.id = e);
          };
        e.Label = s;
        var l = function (t, e, r, n, a, o, i, s) {
          void 0 === t && (t = ""),
            void 0 === e && (e = !1),
            void 0 === r && (r = !1),
            void 0 === n && (n = null),
            void 0 === a && (a = ""),
            void 0 === o && (o = ""),
            void 0 === i && (i = !1),
            void 0 === s && (s = ""),
            (this.env = t),
            (this.taggable = e),
            (this.defaultTags = r),
            (this.tag = n),
            (this.tagId = a),
            (this.tagFormat = o),
            (this.noTag = i),
            (this.labelId = s);
        };
        e.TagInfo = l;
        var u = (function () {
          function t() {
            (this.counter = 0),
              (this.allCounter = 0),
              (this.configuration = null),
              (this.ids = {}),
              (this.allIds = {}),
              (this.labels = {}),
              (this.allLabels = {}),
              (this.redo = !1),
              (this.refUpdate = !1),
              (this.currentTag = new l()),
              (this.history = []),
              (this.stack = []),
              (this.enTag = function (t, e) {
                var r = this.configuration.nodeFactory,
                  n = r.create("node", "mtd", [t]),
                  a = r.create("node", "mlabeledtr", [e, n]);
                return r.create("node", "mtable", [a], {
                  side: this.configuration.options.tagSide,
                  minlabelspacing: this.configuration.options.tagIndent,
                  displaystyle: !0,
                });
              });
          }
          return (
            (t.prototype.start = function (t, e, r) {
              this.currentTag && this.stack.push(this.currentTag),
                (this.currentTag = new l(t, e, r));
            }),
            Object.defineProperty(t.prototype, "env", {
              get: function () {
                return this.currentTag.env;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.end = function () {
              this.history.push(this.currentTag),
                (this.currentTag = this.stack.pop());
            }),
            (t.prototype.tag = function (t, e) {
              (this.currentTag.tag = t),
                (this.currentTag.tagFormat = e ? t : this.formatTag(t)),
                (this.currentTag.noTag = !1);
            }),
            (t.prototype.notag = function () {
              this.tag("", !0), (this.currentTag.noTag = !0);
            }),
            Object.defineProperty(t.prototype, "noTag", {
              get: function () {
                return this.currentTag.noTag;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "label", {
              get: function () {
                return this.currentTag.labelId;
              },
              set: function (t) {
                this.currentTag.labelId = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.formatUrl = function (t, e) {
              return e + "#" + encodeURIComponent(t);
            }),
            (t.prototype.formatTag = function (t) {
              return "(" + t + ")";
            }),
            (t.prototype.formatId = function (t) {
              return "mjx-eqn:" + t.replace(/\s/g, "_");
            }),
            (t.prototype.formatNumber = function (t) {
              return t.toString();
            }),
            (t.prototype.autoTag = function () {
              null == this.currentTag.tag &&
                (this.counter++, this.tag(this.formatNumber(this.counter), !1));
            }),
            (t.prototype.clearTag = function () {
              (this.label = ""),
                this.tag(null, !0),
                (this.currentTag.tagId = "");
            }),
            (t.prototype.getTag = function (t) {
              if ((void 0 === t && (t = !1), t))
                return this.autoTag(), this.makeTag();
              var e = this.currentTag;
              return e.taggable &&
                !e.noTag &&
                (e.defaultTags && this.autoTag(), e.tag)
                ? this.makeTag()
                : null;
            }),
            (t.prototype.resetTag = function () {
              (this.history = []),
                (this.redo = !1),
                (this.refUpdate = !1),
                this.clearTag();
            }),
            (t.prototype.reset = function (t) {
              void 0 === t && (t = 0),
                this.resetTag(),
                (this.counter = this.allCounter = t),
                (this.allLabels = {}),
                (this.allIds = {});
            }),
            (t.prototype.startEquation = function (t) {
              (this.history = []),
                (this.stack = []),
                this.clearTag(),
                (this.currentTag = new l("", void 0, void 0)),
                (this.labels = {}),
                (this.ids = {}),
                (this.counter = this.allCounter),
                (this.redo = !1);
              var e = t.inputData.recompile;
              e && ((this.refUpdate = !0), (this.counter = e.counter));
            }),
            (t.prototype.finishEquation = function (t) {
              this.redo &&
                (t.inputData.recompile = {
                  state: t.state(),
                  counter: this.allCounter,
                }),
                this.refUpdate || (this.allCounter = this.counter),
                Object.assign(this.allIds, this.ids),
                Object.assign(this.allLabels, this.labels);
            }),
            (t.prototype.finalize = function (t, e) {
              if (
                !e.display ||
                this.currentTag.env ||
                null == this.currentTag.tag
              )
                return t;
              var r = this.makeTag();
              return this.enTag(t, r);
            }),
            (t.prototype.makeId = function () {
              this.currentTag.tagId = this.formatId(
                (this.configuration.options.useLabelIds && this.label) ||
                  this.currentTag.tag
              );
            }),
            (t.prototype.makeTag = function () {
              this.makeId(),
                this.label &&
                  (this.labels[this.label] = new s(
                    this.currentTag.tag,
                    this.currentTag.tagId
                  ));
              var t = new i.default(
                "\\text{" + this.currentTag.tagFormat + "}",
                {},
                this.configuration
              ).mml();
              return this.configuration.nodeFactory.create("node", "mtd", [t], {
                id: this.currentTag.tagId,
              });
            }),
            t
          );
        })();
        e.AbstractTags = u;
        var c = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            (e.prototype.autoTag = function () {}),
            (e.prototype.getTag = function () {
              return this.currentTag.tag ? t.prototype.getTag.call(this) : null;
            }),
            e
          );
        })(u);
        e.NoTags = c;
        var f = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            (e.prototype.finalize = function (t, e) {
              if (
                !e.display ||
                this.history.find(function (t) {
                  return t.taggable;
                })
              )
                return t;
              var r = this.getTag(!0);
              return this.enTag(t, r);
            }),
            e
          );
        })(u);
        (e.AllTags = f),
          (function (t) {
            var e = new Map([
                ["none", c],
                ["all", f],
              ]),
              r = "none";
            (t.OPTIONS = {
              tags: r,
              tagSide: "right",
              tagIndent: "0.8em",
              useLabelIds: !0,
              ignoreDuplicateLabels: !1,
            }),
              (t.add = function (t, r) {
                e.set(t, r);
              }),
              (t.addTags = function (e) {
                var r, n;
                try {
                  for (
                    var a = o(Object.keys(e)), i = a.next();
                    !i.done;
                    i = a.next()
                  ) {
                    var s = i.value;
                    t.add(s, e[s]);
                  }
                } catch (t) {
                  r = { error: t };
                } finally {
                  try {
                    i && !i.done && (n = a.return) && n.call(a);
                  } finally {
                    if (r) throw r.error;
                  }
                }
              }),
              (t.create = function (t) {
                var n = e.get(t) || e.get(r);
                if (!n) throw Error("Unknown tags class");
                return new n();
              }),
              (t.setDefault = function (t) {
                r = t;
              }),
              (t.getDefault = function () {
                return t.create(r);
              });
          })(e.TagsFactory || (e.TagsFactory = {}));
      },
      7007: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TexConstant = void 0),
          (function (t) {
            (t.Variant = {
              NORMAL: "normal",
              BOLD: "bold",
              ITALIC: "italic",
              BOLDITALIC: "bold-italic",
              DOUBLESTRUCK: "double-struck",
              FRAKTUR: "fraktur",
              BOLDFRAKTUR: "bold-fraktur",
              SCRIPT: "script",
              BOLDSCRIPT: "bold-script",
              SANSSERIF: "sans-serif",
              BOLDSANSSERIF: "bold-sans-serif",
              SANSSERIFITALIC: "sans-serif-italic",
              SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
              MONOSPACE: "monospace",
              INITIAL: "inital",
              TAILED: "tailed",
              LOOPED: "looped",
              STRETCHED: "stretched",
              CALLIGRAPHIC: "-tex-calligraphic",
              BOLDCALLIGRAPHIC: "-tex-bold-calligraphic",
              OLDSTYLE: "-tex-oldstyle",
              BOLDOLDSTYLE: "-tex-bold-oldstyle",
              MATHITALIC: "-tex-mathit",
            }),
              (t.Form = {
                PREFIX: "prefix",
                INFIX: "infix",
                POSTFIX: "postfix",
              }),
              (t.LineBreak = {
                AUTO: "auto",
                NEWLINE: "newline",
                NOBREAK: "nobreak",
                GOODBREAK: "goodbreak",
                BADBREAK: "badbreak",
              }),
              (t.LineBreakStyle = {
                BEFORE: "before",
                AFTER: "after",
                DUPLICATE: "duplicate",
                INFIXLINBREAKSTYLE: "infixlinebreakstyle",
              }),
              (t.IndentAlign = {
                LEFT: "left",
                CENTER: "center",
                RIGHT: "right",
                AUTO: "auto",
                ID: "id",
                INDENTALIGN: "indentalign",
              }),
              (t.IndentShift = { INDENTSHIFT: "indentshift" }),
              (t.LineThickness = {
                THIN: "thin",
                MEDIUM: "medium",
                THICK: "thick",
              }),
              (t.Notation = {
                LONGDIV: "longdiv",
                ACTUARIAL: "actuarial",
                PHASORANGLE: "phasorangle",
                RADICAL: "radical",
                BOX: "box",
                ROUNDEDBOX: "roundedbox",
                CIRCLE: "circle",
                LEFT: "left",
                RIGHT: "right",
                TOP: "top",
                BOTTOM: "bottom",
                UPDIAGONALSTRIKE: "updiagonalstrike",
                DOWNDIAGONALSTRIKE: "downdiagonalstrike",
                VERTICALSTRIKE: "verticalstrike",
                HORIZONTALSTRIKE: "horizontalstrike",
                NORTHEASTARROW: "northeastarrow",
                MADRUWB: "madruwb",
                UPDIAGONALARROW: "updiagonalarrow",
              }),
              (t.Align = {
                TOP: "top",
                BOTTOM: "bottom",
                CENTER: "center",
                BASELINE: "baseline",
                AXIS: "axis",
                LEFT: "left",
                RIGHT: "right",
              }),
              (t.Lines = { NONE: "none", SOLID: "solid", DASHED: "dashed" }),
              (t.Side = {
                LEFT: "left",
                RIGHT: "right",
                LEFTOVERLAP: "leftoverlap",
                RIGHTOVERLAP: "rightoverlap",
              }),
              (t.Width = { AUTO: "auto", FIT: "fit" }),
              (t.Actiontype = {
                TOGGLE: "toggle",
                STATUSLINE: "statusline",
                TOOLTIP: "tooltip",
                INPUT: "input",
              }),
              (t.Overflow = {
                LINBREAK: "linebreak",
                SCROLL: "scroll",
                ELIDE: "elide",
                TRUNCATE: "truncate",
                SCALE: "scale",
              }),
              (t.Unit = {
                EM: "em",
                EX: "ex",
                PX: "px",
                IN: "in",
                CM: "cm",
                MM: "mm",
                PT: "pt",
                PC: "pc",
              });
          })(e.TexConstant || (e.TexConstant = {}));
      },
      3466: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = (function () {
          function t(e, r) {
            for (var n = [], a = 2; a < arguments.length; a++)
              n[a - 2] = arguments[a];
            (this.id = e), (this.message = t.processString(r, n));
          }
          return (
            (t.processString = function (e, r) {
              for (
                var n = e.split(t.pattern), a = 1, o = n.length;
                a < o;
                a += 2
              ) {
                var i = n[a].charAt(0);
                if (i >= "0" && i <= "9")
                  (n[a] = r[parseInt(n[a], 10) - 1]),
                    "number" == typeof n[a] && (n[a] = n[a].toString());
                else if ("{" === i) {
                  if ((i = n[a].substr(1)) >= "0" && i <= "9")
                    (n[a] =
                      r[parseInt(n[a].substr(1, n[a].length - 2), 10) - 1]),
                      "number" == typeof n[a] && (n[a] = n[a].toString());
                  else
                    n[a].match(/^\{([a-z]+):%(\d+)\|(.*)\}$/) &&
                      (n[a] = "%" + n[a]);
                }
                null == n[a] && (n[a] = "???");
              }
              return n.join("");
            }),
            (t.pattern =
              /%(\d+|\{\d+\}|\{[a-z]+:\%\d+(?:\|(?:%\{\d+\}|%.|[^\}])*)+\}|.)/g),
            t
          );
        })();
        e.default = r;
      },
      810: function (t, e, r) {
        var n =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          o =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i = r(7702),
          s = r(9874),
          l = r(3466),
          u = r(8921),
          c = (function () {
            function t(t, e, r) {
              var a, o;
              (this._string = t),
                (this.configuration = r),
                (this.macroCount = 0),
                (this.i = 0),
                (this.currentCS = "");
              var i,
                l = e.hasOwnProperty("isInner"),
                u = e.isInner;
              if ((delete e.isInner, e)) {
                i = {};
                try {
                  for (
                    var c = n(Object.keys(e)), f = c.next();
                    !f.done;
                    f = c.next()
                  ) {
                    var h = f.value;
                    i[h] = e[h];
                  }
                } catch (t) {
                  a = { error: t };
                } finally {
                  try {
                    f && !f.done && (o = c.return) && o.call(c);
                  } finally {
                    if (a) throw a.error;
                  }
                }
              }
              this.configuration.pushParser(this),
                (this.stack = new s.default(this.itemFactory, i, !l || u)),
                this.Parse(),
                this.Push(this.itemFactory.create("stop"));
            }
            return (
              Object.defineProperty(t.prototype, "options", {
                get: function () {
                  return this.configuration.options;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "itemFactory", {
                get: function () {
                  return this.configuration.itemFactory;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "tags", {
                get: function () {
                  return this.configuration.tags;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "string", {
                get: function () {
                  return this._string;
                },
                set: function (t) {
                  this._string = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.parse = function (t, e) {
                return this.configuration.handlers.get(t).parse(e);
              }),
              (t.prototype.lookup = function (t, e) {
                return this.configuration.handlers.get(t).lookup(e);
              }),
              (t.prototype.contains = function (t, e) {
                return this.configuration.handlers.get(t).contains(e);
              }),
              (t.prototype.toString = function () {
                var t,
                  e,
                  r = "";
                try {
                  for (
                    var a = n(Array.from(this.configuration.handlers.keys())),
                      o = a.next();
                    !o.done;
                    o = a.next()
                  ) {
                    var i = o.value;
                    r += i + ": " + this.configuration.handlers.get(i) + "\n";
                  }
                } catch (e) {
                  t = { error: e };
                } finally {
                  try {
                    o && !o.done && (e = a.return) && e.call(a);
                  } finally {
                    if (t) throw t.error;
                  }
                }
                return r;
              }),
              (t.prototype.Parse = function () {
                for (var t; this.i < this.string.length; )
                  (t = this.getCodePoint()),
                    (this.i += t.length),
                    this.parse("character", [this, t]);
              }),
              (t.prototype.Push = function (t) {
                t instanceof u.AbstractMmlNode && t.isInferred
                  ? this.PushAll(t.childNodes)
                  : this.stack.Push(t);
              }),
              (t.prototype.PushAll = function (t) {
                var e, r;
                try {
                  for (var a = n(t), o = a.next(); !o.done; o = a.next()) {
                    var i = o.value;
                    this.stack.Push(i);
                  }
                } catch (t) {
                  e = { error: t };
                } finally {
                  try {
                    o && !o.done && (r = a.return) && r.call(a);
                  } finally {
                    if (e) throw e.error;
                  }
                }
              }),
              (t.prototype.mml = function () {
                if (!this.stack.Top().isKind("mml")) return null;
                var t = this.stack.Top().First;
                return this.configuration.popParser(), t;
              }),
              (t.prototype.convertDelimiter = function (t) {
                var e = this.lookup("delimiter", t);
                return e ? e.char : null;
              }),
              (t.prototype.getCodePoint = function () {
                var t = this.string.codePointAt(this.i);
                return void 0 === t ? "" : String.fromCodePoint(t);
              }),
              (t.prototype.nextIsSpace = function () {
                return !!this.string.charAt(this.i).match(/\s/);
              }),
              (t.prototype.GetNext = function () {
                for (; this.nextIsSpace(); ) this.i++;
                return this.getCodePoint();
              }),
              (t.prototype.GetCS = function () {
                var t = this.string
                  .slice(this.i)
                  .match(/^(([a-z]+) ?|[\uD800-\uDBFF].|.)/i);
                return t
                  ? ((this.i += t[0].length), t[2] || t[1])
                  : (this.i++, " ");
              }),
              (t.prototype.GetArgument = function (t, e) {
                switch (this.GetNext()) {
                  case "":
                    if (!e)
                      throw new l.default(
                        "MissingArgFor",
                        "Missing argument for %1",
                        this.currentCS
                      );
                    return null;
                  case "}":
                    if (!e)
                      throw new l.default(
                        "ExtraCloseMissingOpen",
                        "Extra close brace or missing open brace"
                      );
                    return null;
                  case "\\":
                    return this.i++, "\\" + this.GetCS();
                  case "{":
                    for (var r = ++this.i, n = 1; this.i < this.string.length; )
                      switch (this.string.charAt(this.i++)) {
                        case "\\":
                          this.i++;
                          break;
                        case "{":
                          n++;
                          break;
                        case "}":
                          if (0 == --n) return this.string.slice(r, this.i - 1);
                      }
                    throw new l.default(
                      "MissingCloseBrace",
                      "Missing close brace"
                    );
                }
                var a = this.getCodePoint();
                return (this.i += a.length), a;
              }),
              (t.prototype.GetBrackets = function (t, e) {
                if ("[" !== this.GetNext()) return e;
                for (var r = ++this.i, n = 0; this.i < this.string.length; )
                  switch (this.string.charAt(this.i++)) {
                    case "{":
                      n++;
                      break;
                    case "\\":
                      this.i++;
                      break;
                    case "}":
                      if (n-- <= 0)
                        throw new l.default(
                          "ExtraCloseLooking",
                          "Extra close brace while looking for %1",
                          "']'"
                        );
                      break;
                    case "]":
                      if (0 === n) return this.string.slice(r, this.i - 1);
                  }
                throw new l.default(
                  "MissingCloseBracket",
                  "Could not find closing ']' for argument to %1",
                  this.currentCS
                );
              }),
              (t.prototype.GetDelimiter = function (t, e) {
                var r = this.GetNext();
                if (
                  ((this.i += r.length),
                  this.i <= this.string.length &&
                    ("\\" === r
                      ? (r += this.GetCS())
                      : "{" === r &&
                        e &&
                        (this.i--, (r = this.GetArgument(t).trim())),
                    this.contains("delimiter", r)))
                )
                  return this.convertDelimiter(r);
                throw new l.default(
                  "MissingOrUnrecognizedDelim",
                  "Missing or unrecognized delimiter for %1",
                  this.currentCS
                );
              }),
              (t.prototype.GetDimen = function (t) {
                if ("{" === this.GetNext()) {
                  var e = this.GetArgument(t),
                    r = a(i.default.matchDimen(e), 2),
                    n = r[0],
                    o = r[1];
                  if (n) return n + o;
                } else {
                  e = this.string.slice(this.i);
                  var s = a(i.default.matchDimen(e, !0), 3),
                    u = ((n = s[0]), (o = s[1]), s[2]);
                  if (n) return (this.i += u), n + o;
                }
                throw new l.default(
                  "MissingDimOrUnits",
                  "Missing dimension or its units for %1",
                  this.currentCS
                );
              }),
              (t.prototype.GetUpTo = function (t, e) {
                for (; this.nextIsSpace(); ) this.i++;
                for (var r = this.i, n = 0; this.i < this.string.length; ) {
                  var a = this.i,
                    o = this.GetNext();
                  switch (((this.i += o.length), o)) {
                    case "\\":
                      o += this.GetCS();
                      break;
                    case "{":
                      n++;
                      break;
                    case "}":
                      if (0 === n)
                        throw new l.default(
                          "ExtraCloseLooking",
                          "Extra close brace while looking for %1",
                          e
                        );
                      n--;
                  }
                  if (0 === n && o === e) return this.string.slice(r, a);
                }
                throw new l.default(
                  "TokenNotFoundForCommand",
                  "Could not find %1 for %2",
                  e,
                  this.currentCS
                );
              }),
              (t.prototype.ParseArg = function (e) {
                return new t(
                  this.GetArgument(e),
                  this.stack.env,
                  this.configuration
                ).mml();
              }),
              (t.prototype.ParseUpTo = function (e, r) {
                return new t(
                  this.GetUpTo(e, r),
                  this.stack.env,
                  this.configuration
                ).mml();
              }),
              (t.prototype.GetDelimiterArg = function (t) {
                var e = i.default.trimSpaces(this.GetArgument(t));
                if ("" === e) return null;
                if (this.contains("delimiter", e)) return e;
                throw new l.default(
                  "MissingOrUnrecognizedDelim",
                  "Missing or unrecognized delimiter for %1",
                  this.currentCS
                );
              }),
              (t.prototype.GetStar = function () {
                var t = "*" === this.GetNext();
                return t && this.i++, t;
              }),
              (t.prototype.create = function (t) {
                for (var e, r = [], n = 1; n < arguments.length; n++)
                  r[n - 1] = arguments[n];
                return (e = this.configuration.nodeFactory).create.apply(
                  e,
                  o([t], a(r))
                );
              }),
              t
            );
          })();
        e.default = c;
      },
      3946: function (t, e, r) {
        var n,
          a,
          o =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AmsConfiguration = e.AmsTags = void 0);
        var i = r(6552),
          s = r(3632),
          l = r(7251),
          u = r(2684);
        r(8285);
        var c = r(7628),
          f = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return o(e, t), e;
          })(l.AbstractTags);
        e.AmsTags = f;
        e.AmsConfiguration = i.Configuration.create("ams", {
          handler: {
            delimiter: ["AMSsymbols-delimiter", "AMSmath-delimiter"],
            macro: [
              "AMSsymbols-mathchar0mi",
              "AMSsymbols-mathchar0mo",
              "AMSsymbols-delimiter",
              "AMSsymbols-macros",
              "AMSmath-mathchar0mo",
              "AMSmath-macros",
              "AMSmath-delimiter",
            ],
            environment: ["AMSmath-environment"],
          },
          items:
            ((a = {}),
            (a[s.MultlineItem.prototype.kind] = s.MultlineItem),
            (a[s.FlalignItem.prototype.kind] = s.FlalignItem),
            a),
          tags: { ams: f },
          init: function (t) {
            new c.CommandMap(u.NEW_OPS, {}, {}),
              t.append(
                i.Configuration.local({
                  handler: { macro: [u.NEW_OPS] },
                  priority: -1,
                })
              );
          },
          config: function (t, e) {
            e.parseOptions.options.multlineWidth &&
              (e.parseOptions.options.ams.multlineWidth =
                e.parseOptions.options.multlineWidth),
              delete e.parseOptions.options.multlineWidth;
          },
          options: {
            multlineWidth: "",
            ams: { multlineWidth: "100%", multlineIndent: "1em" },
          },
        });
      },
      3632: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__assign) ||
            function () {
              return (o =
                Object.assign ||
                function (t) {
                  for (var e, r = 1, n = arguments.length; r < n; r++)
                    for (var a in (e = arguments[r]))
                      Object.prototype.hasOwnProperty.call(e, a) &&
                        (t[a] = e[a]);
                  return t;
                }).apply(this, arguments);
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.FlalignItem = e.MultlineItem = void 0);
        var i = r(8389),
          s = r(7702),
          l = r(8321),
          u = r(3466),
          c = r(7007),
          f = (function (t) {
            function e(e) {
              for (var r = [], n = 1; n < arguments.length; n++)
                r[n - 1] = arguments[n];
              var a = t.call(this, e) || this;
              return (
                a.factory.configuration.tags.start("multline", !0, r[0]), a
              );
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "multline";
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.EndEntry = function () {
                this.table.length &&
                  s.default.fixInitialMO(
                    this.factory.configuration,
                    this.nodes
                  );
                var t = this.getProperty("shove"),
                  e = this.create(
                    "node",
                    "mtd",
                    this.nodes,
                    t ? { columnalign: t } : {}
                  );
                this.setProperty("shove", null), this.row.push(e), this.Clear();
              }),
              (e.prototype.EndRow = function () {
                if (1 !== this.row.length)
                  throw new u.default(
                    "MultlineRowsOneCol",
                    "The rows within the %1 environment must have exactly one column",
                    "multline"
                  );
                var t = this.create("node", "mtr", this.row);
                this.table.push(t), (this.row = []);
              }),
              (e.prototype.EndTable = function () {
                if ((t.prototype.EndTable.call(this), this.table.length)) {
                  var e = this.table.length - 1,
                    r = -1;
                  l.default.getAttribute(
                    l.default.getChildren(this.table[0])[0],
                    "columnalign"
                  ) ||
                    l.default.setAttribute(
                      l.default.getChildren(this.table[0])[0],
                      "columnalign",
                      c.TexConstant.Align.LEFT
                    ),
                    l.default.getAttribute(
                      l.default.getChildren(this.table[e])[0],
                      "columnalign"
                    ) ||
                      l.default.setAttribute(
                        l.default.getChildren(this.table[e])[0],
                        "columnalign",
                        c.TexConstant.Align.RIGHT
                      );
                  var n = this.factory.configuration.tags.getTag();
                  if (n) {
                    r =
                      this.arraydef.side === c.TexConstant.Align.LEFT
                        ? 0
                        : this.table.length - 1;
                    var a = this.table[r],
                      o = this.create(
                        "node",
                        "mlabeledtr",
                        [n].concat(l.default.getChildren(a))
                      );
                    l.default.copyAttributes(a, o), (this.table[r] = o);
                  }
                }
                this.factory.configuration.tags.end();
              }),
              e
            );
          })(i.ArrayItem);
        e.MultlineItem = f;
        var h = (function (t) {
          function e(e, r, n, a, o) {
            var i = t.call(this, e) || this;
            return (
              (i.name = r),
              (i.numbered = n),
              (i.padded = a),
              (i.center = o),
              i.factory.configuration.tags.start(r, n, n),
              i
            );
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "flalign";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.EndEntry = function () {
              t.prototype.EndEntry.call(this);
              var e = this.getProperty("xalignat");
              if (e && this.row.length > e)
                throw new u.default(
                  "XalignOverflow",
                  "Extra %1 in row of %2",
                  "&",
                  this.name
                );
            }),
            (e.prototype.EndRow = function () {
              for (
                var e, r = this.row, n = this.getProperty("xalignat");
                r.length < n;

              )
                r.push(this.create("node", "mtd"));
              for (
                this.row = [],
                  this.padded && this.row.push(this.create("node", "mtd"));
                (e = r.shift());

              )
                this.row.push(e),
                  (e = r.shift()) && this.row.push(e),
                  (r.length || this.padded) &&
                    this.row.push(this.create("node", "mtd"));
              this.row.length > this.maxrow && (this.maxrow = this.row.length),
                t.prototype.EndRow.call(this);
              var a = this.table[this.table.length - 1];
              if (
                this.getProperty("zeroWidthLabel") &&
                a.isKind("mlabeledtr")
              ) {
                var i = l.default.getChildren(a)[0],
                  s = this.factory.configuration.options.tagSide,
                  u = o(
                    { width: 0 },
                    "right" === s ? { lspace: "-1width" } : {}
                  ),
                  c = this.create(
                    "node",
                    "mpadded",
                    l.default.getChildren(i),
                    u
                  );
                i.setChildren([c]);
              }
            }),
            (e.prototype.EndTable = function () {
              (t.prototype.EndTable.call(this), this.center) &&
                this.maxrow <= 2 &&
                (delete this.arraydef.width, delete this.global.indentalign);
            }),
            e
          );
        })(i.EqnArrayItem);
        e.FlalignItem = h;
      },
      8285: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(2684),
          a = r(7628),
          o = r(7007),
          i = r(4708),
          s = r(7702),
          l = r(8921),
          u = r(6914);
        new a.CharacterMap("AMSmath-mathchar0mo", i.default.mathchar0mo, {
          iiiint: ["\u2a0c", { texClass: l.TEXCLASS.OP }],
        }),
          new a.CommandMap(
            "AMSmath-macros",
            {
              mathring: ["Accent", "02DA"],
              nobreakspace: "Tilde",
              negmedspace: ["Spacer", u.MATHSPACE.negativemediummathspace],
              negthickspace: ["Spacer", u.MATHSPACE.negativethickmathspace],
              idotsint: ["MultiIntegral", "\\int\\cdots\\int"],
              dddot: ["Accent", "20DB"],
              ddddot: ["Accent", "20DC"],
              sideset: [
                "Macro",
                "\\mathop{\\mathop{\\rlap{\\phantom{#3}}}\\nolimits#1\\!\\mathop{#3}\\nolimits#2}",
                3,
              ],
              boxed: ["Macro", "\\fbox{$\\displaystyle{#1}$}", 1],
              tag: "HandleTag",
              notag: "HandleNoTag",
              eqref: ["HandleRef", !0],
              substack: ["Macro", "\\begin{subarray}{c}#1\\end{subarray}", 1],
              injlim: ["NamedOp", "inj&thinsp;lim"],
              projlim: ["NamedOp", "proj&thinsp;lim"],
              varliminf: [
                "Macro",
                "\\mathop{\\underline{\\mmlToken{mi}{lim}}}",
              ],
              varlimsup: ["Macro", "\\mathop{\\overline{\\mmlToken{mi}{lim}}}"],
              varinjlim: [
                "Macro",
                "\\mathop{\\underrightarrow{\\mmlToken{mi}{lim}}}",
              ],
              varprojlim: [
                "Macro",
                "\\mathop{\\underleftarrow{\\mmlToken{mi}{lim}}}",
              ],
              DeclareMathOperator: "HandleDeclareOp",
              operatorname: "HandHardworkperatorName",
              SkipLimits: "SkipLimits",
              genfrac: "Genfrac",
              frac: ["Genfrac", "", "", "", ""],
              tfrac: ["Genfrac", "", "", "", "1"],
              dfrac: ["Genfrac", "", "", "", "0"],
              binom: ["Genfrac", "(", ")", "0", ""],
              tbinom: ["Genfrac", "(", ")", "0", "1"],
              dbinom: ["Genfrac", "(", ")", "0", "0"],
              cfrac: "CFrac",
              shoveleft: ["HandleShove", o.TexConstant.Align.LEFT],
              shoveright: ["HandleShove", o.TexConstant.Align.RIGHT],
              xrightarrow: ["xArrow", 8594, 5, 10],
              xleftarrow: ["xArrow", 8592, 10, 5],
            },
            n.AmsMethods
          ),
          new a.EnvironmentMap(
            "AMSmath-environment",
            i.default.environment,
            {
              "equation*": ["Equation", null, !1],
              "eqnarray*": [
                "EqnArray",
                null,
                !1,
                !0,
                "rcl",
                s.default.cols(0, u.MATHSPACE.thickmathspace),
                ".5em",
              ],
              align: ["EqnArray", null, !0, !0, "rl", s.default.cols(0, 2)],
              "align*": ["EqnArray", null, !1, !0, "rl", s.default.cols(0, 2)],
              multline: ["Multline", null, !0],
              "multline*": ["Multline", null, !1],
              split: ["EqnArray", null, !1, !1, "rl", s.default.cols(0)],
              gather: ["EqnArray", null, !0, !0, "c"],
              "gather*": ["EqnArray", null, !1, !0, "c"],
              alignat: ["AlignAt", null, !0, !0],
              "alignat*": ["AlignAt", null, !1, !0],
              alignedat: ["AlignAt", null, !1, !1],
              aligned: [
                "AmsEqnArray",
                null,
                null,
                null,
                "rl",
                s.default.cols(0, 2),
                ".5em",
                "D",
              ],
              gathered: [
                "AmsEqnArray",
                null,
                null,
                null,
                "c",
                null,
                ".5em",
                "D",
              ],
              xalignat: ["XalignAt", null, !0, !0],
              "xalignat*": ["XalignAt", null, !1, !0],
              xxalignat: ["XalignAt", null, !1, !1],
              flalign: [
                "FlalignArray",
                null,
                !0,
                !1,
                !0,
                "rlc",
                "auto auto fit",
              ],
              "flalign*": [
                "FlalignArray",
                null,
                !1,
                !1,
                !0,
                "rlc",
                "auto auto fit",
              ],
              subarray: [
                "Array",
                null,
                null,
                null,
                null,
                s.default.cols(0),
                "0.1em",
                "S",
                1,
              ],
              smallmatrix: [
                "Array",
                null,
                null,
                null,
                "c",
                s.default.cols(1 / 3),
                ".2em",
                "S",
                1,
              ],
              matrix: ["Array", null, null, null, "c"],
              pmatrix: ["Array", null, "(", ")", "c"],
              bmatrix: ["Array", null, "[", "]", "c"],
              Bmatrix: ["Array", null, "\\{", "\\}", "c"],
              vmatrix: ["Array", null, "\\vert", "\\vert", "c"],
              Vmatrix: ["Array", null, "\\Vert", "\\Vert", "c"],
              cases: ["Array", null, "\\{", ".", "ll", null, ".2em", "T"],
            },
            n.AmsMethods
          ),
          new a.DelimiterMap("AMSmath-delimiter", i.default.delimiter, {
            "\\lvert": ["|", { texClass: l.TEXCLASS.OPEN }],
            "\\rvert": ["|", { texClass: l.TEXCLASS.CLOSE }],
            "\\lVert": ["\u2016", { texClass: l.TEXCLASS.OPEN }],
            "\\rVert": ["\u2016", { texClass: l.TEXCLASS.CLOSE }],
          }),
          new a.CharacterMap("AMSsymbols-mathchar0mi", i.default.mathchar0mi, {
            digamma: "\u03dd",
            varkappa: "\u03f0",
            varGamma: ["\u0393", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varDelta: ["\u0394", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varTheta: ["\u0398", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varLambda: [
              "\u039b",
              { mathvariant: o.TexConstant.Variant.ITALIC },
            ],
            varXi: ["\u039e", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varPi: ["\u03a0", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varSigma: ["\u03a3", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varUpsilon: [
              "\u03a5",
              { mathvariant: o.TexConstant.Variant.ITALIC },
            ],
            varPhi: ["\u03a6", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varPsi: ["\u03a8", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varOmega: ["\u03a9", { mathvariant: o.TexConstant.Variant.ITALIC }],
            beth: "\u2136",
            gimel: "\u2137",
            daleth: "\u2138",
            backprime: ["\u2035", { variantForm: !0 }],
            hslash: "\u210f",
            varnothing: ["\u2205", { variantForm: !0 }],
            blacktriangle: "\u25b4",
            triangledown: ["\u25bd", { variantForm: !0 }],
            blacktriangledown: "\u25be",
            square: "\u25fb",
            Box: "\u25fb",
            blacksquare: "\u25fc",
            lozenge: "\u25ca",
            Diamond: "\u25ca",
            blacklozenge: "\u29eb",
            circledS: ["\u24c8", { mathvariant: o.TexConstant.Variant.NORMAL }],
            bigstar: "\u2605",
            sphericalangle: "\u2222",
            measuredangle: "\u2221",
            nexists: "\u2204",
            complement: "\u2201",
            mho: "\u2127",
            eth: ["\xf0", { mathvariant: o.TexConstant.Variant.NORMAL }],
            Finv: "\u2132",
            diagup: "\u2571",
            Game: "\u2141",
            diagdown: "\u2572",
            Bbbk: ["k", { mathvariant: o.TexConstant.Variant.DOUBLESTRUCK }],
            yen: "\xa5",
            circledR: "\xae",
            checkmark: "\u2713",
            maltese: "\u2720",
          }),
          new a.CharacterMap("AMSsymbols-mathchar0mo", i.default.mathchar0mo, {
            dotplus: "\u2214",
            ltimes: "\u22c9",
            smallsetminus: ["\u2216", { variantForm: !0 }],
            rtimes: "\u22ca",
            Cap: "\u22d2",
            doublecap: "\u22d2",
            leftthreetimes: "\u22cb",
            Cup: "\u22d3",
            doublecup: "\u22d3",
            rightthreetimes: "\u22cc",
            barwedge: "\u22bc",
            curlywedge: "\u22cf",
            veebar: "\u22bb",
            curlyvee: "\u22ce",
            doublebarwedge: "\u2a5e",
            boxminus: "\u229f",
            circleddash: "\u229d",
            boxtimes: "\u22a0",
            circledast: "\u229b",
            boxdot: "\u22a1",
            circledcirc: "\u229a",
            boxplus: "\u229e",
            centerdot: ["\u22c5", { variantForm: !0 }],
            divideontimes: "\u22c7",
            intercal: "\u22ba",
            leqq: "\u2266",
            geqq: "\u2267",
            leqslant: "\u2a7d",
            geqslant: "\u2a7e",
            eqslantless: "\u2a95",
            eqslantgtr: "\u2a96",
            lesssim: "\u2272",
            gtrsim: "\u2273",
            lessapprox: "\u2a85",
            gtrapprox: "\u2a86",
            approxeq: "\u224a",
            lessdot: "\u22d6",
            gtrdot: "\u22d7",
            lll: "\u22d8",
            llless: "\u22d8",
            ggg: "\u22d9",
            gggtr: "\u22d9",
            lessgtr: "\u2276",
            gtrless: "\u2277",
            lesseqgtr: "\u22da",
            gtreqless: "\u22db",
            lesseqqgtr: "\u2a8b",
            gtreqqless: "\u2a8c",
            doteqdot: "\u2251",
            Doteq: "\u2251",
            eqcirc: "\u2256",
            risingdotseq: "\u2253",
            circeq: "\u2257",
            fallingdotseq: "\u2252",
            triangleq: "\u225c",
            backsim: "\u223d",
            thicksim: ["\u223c", { variantForm: !0 }],
            backsimeq: "\u22cd",
            thickapprox: ["\u2248", { variantForm: !0 }],
            subseteqq: "\u2ac5",
            supseteqq: "\u2ac6",
            Subset: "\u22d0",
            Supset: "\u22d1",
            sqsubset: "\u228f",
            sqsupset: "\u2290",
            preccurlyeq: "\u227c",
            succcurlyeq: "\u227d",
            curlyeqprec: "\u22de",
            curlyeqsucc: "\u22df",
            precsim: "\u227e",
            succsim: "\u227f",
            precapprox: "\u2ab7",
            succapprox: "\u2ab8",
            vartriangleleft: "\u22b2",
            lhd: "\u22b2",
            vartriangleright: "\u22b3",
            rhd: "\u22b3",
            trianglelefteq: "\u22b4",
            unlhd: "\u22b4",
            trianglerighteq: "\u22b5",
            unrhd: "\u22b5",
            vDash: ["\u22a8", { variantForm: !0 }],
            Vdash: "\u22a9",
            Vvdash: "\u22aa",
            smallsmile: ["\u2323", { variantForm: !0 }],
            shortmid: ["\u2223", { variantForm: !0 }],
            smallfrown: ["\u2322", { variantForm: !0 }],
            shortparallel: ["\u2225", { variantForm: !0 }],
            bumpeq: "\u224f",
            between: "\u226c",
            Bumpeq: "\u224e",
            pitchfork: "\u22d4",
            varpropto: ["\u221d", { variantForm: !0 }],
            backepsilon: "\u220d",
            blacktriangleleft: "\u25c2",
            blacktriangleright: "\u25b8",
            therefore: "\u2234",
            because: "\u2235",
            eqsim: "\u2242",
            vartriangle: ["\u25b3", { variantForm: !0 }],
            Join: "\u22c8",
            nless: "\u226e",
            ngtr: "\u226f",
            nleq: "\u2270",
            ngeq: "\u2271",
            nleqslant: ["\u2a87", { variantForm: !0 }],
            ngeqslant: ["\u2a88", { variantForm: !0 }],
            nleqq: ["\u2270", { variantForm: !0 }],
            ngeqq: ["\u2271", { variantForm: !0 }],
            lneq: "\u2a87",
            gneq: "\u2a88",
            lneqq: "\u2268",
            gneqq: "\u2269",
            lvertneqq: ["\u2268", { variantForm: !0 }],
            gvertneqq: ["\u2269", { variantForm: !0 }],
            lnsim: "\u22e6",
            gnsim: "\u22e7",
            lnapprox: "\u2a89",
            gnapprox: "\u2a8a",
            nprec: "\u2280",
            nsucc: "\u2281",
            npreceq: ["\u22e0", { variantForm: !0 }],
            nsucceq: ["\u22e1", { variantForm: !0 }],
            precneqq: "\u2ab5",
            succneqq: "\u2ab6",
            precnsim: "\u22e8",
            succnsim: "\u22e9",
            precnapprox: "\u2ab9",
            succnapprox: "\u2aba",
            nsim: "\u2241",
            ncong: "\u2247",
            nshortmid: ["\u2224", { variantForm: !0 }],
            nshortparallel: ["\u2226", { variantForm: !0 }],
            nmid: "\u2224",
            nparallel: "\u2226",
            nvdash: "\u22ac",
            nvDash: "\u22ad",
            nVdash: "\u22ae",
            nVDash: "\u22af",
            ntriangleleft: "\u22ea",
            ntriangleright: "\u22eb",
            ntrianglelefteq: "\u22ec",
            ntrianglerighteq: "\u22ed",
            nsubseteq: "\u2288",
            nsupseteq: "\u2289",
            nsubseteqq: ["\u2288", { variantForm: !0 }],
            nsupseteqq: ["\u2289", { variantForm: !0 }],
            subsetneq: "\u228a",
            supsetneq: "\u228b",
            varsubsetneq: ["\u228a", { variantForm: !0 }],
            varsupsetneq: ["\u228b", { variantForm: !0 }],
            subsetneqq: "\u2acb",
            supsetneqq: "\u2acc",
            varsubsetneqq: ["\u2acb", { variantForm: !0 }],
            varsupsetneqq: ["\u2acc", { variantForm: !0 }],
            leftleftarrows: "\u21c7",
            rightrightarrows: "\u21c9",
            leftrightarrows: "\u21c6",
            rightleftarrows: "\u21c4",
            Lleftarrow: "\u21da",
            Rrightarrow: "\u21db",
            twoheadleftarrow: "\u219e",
            twoheadrightarrow: "\u21a0",
            leftarrowtail: "\u21a2",
            rightarrowtail: "\u21a3",
            looparrowleft: "\u21ab",
            looparrowright: "\u21ac",
            leftrightharpoons: "\u21cb",
            rightleftharpoons: ["\u21cc", { variantForm: !0 }],
            curvearrowleft: "\u21b6",
            curvearrowright: "\u21b7",
            circlearrowleft: "\u21ba",
            circlearrowright: "\u21bb",
            Lsh: "\u21b0",
            Rsh: "\u21b1",
            upuparrows: "\u21c8",
            downdownarrows: "\u21ca",
            upharpoonleft: "\u21bf",
            upharpoonright: "\u21be",
            downharpoonleft: "\u21c3",
            restriction: "\u21be",
            multimap: "\u22b8",
            downharpoonright: "\u21c2",
            leftrightsquigarrow: "\u21ad",
            rightsquigarrow: "\u21dd",
            leadsto: "\u21dd",
            dashrightarrow: "\u21e2",
            dashleftarrow: "\u21e0",
            nleftarrow: "\u219a",
            nrightarrow: "\u219b",
            nLeftarrow: "\u21cd",
            nRightarrow: "\u21cf",
            nleftrightarrow: "\u21ae",
            nLeftrightarrow: "\u21ce",
          }),
          new a.DelimiterMap("AMSsymbols-delimiter", i.default.delimiter, {
            "\\ulcorner": "\u231c",
            "\\urcorner": "\u231d",
            "\\llcorner": "\u231e",
            "\\lrcorner": "\u231f",
          }),
          new a.CommandMap(
            "AMSsymbols-macros",
            {
              implies: ["Macro", "\\;\\Longrightarrow\\;"],
              impliedby: ["Macro", "\\;\\Longleftarrow\\;"],
            },
            n.AmsMethods
          );
      },
      2684: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NEW_OPS = e.AmsMethods = void 0);
        var n = r(7702),
          a = r(8321),
          o = r(7007),
          i = r(810),
          s = r(3466),
          l = r(4237),
          u = r(724),
          c = r(8921);
        (e.AmsMethods = {}),
          (e.AmsMethods.AmsEqnArray = function (t, e, r, a, o, i, s) {
            var l = t.GetBrackets("\\begin{" + e.getName() + "}"),
              c = u.default.EqnArray(t, e, r, a, o, i, s);
            return n.default.setArrayAlign(c, l);
          }),
          (e.AmsMethods.AlignAt = function (t, r, a, o) {
            var i,
              l,
              u = r.getName(),
              c = "",
              f = [];
            if (
              (o || (l = t.GetBrackets("\\begin{" + u + "}")),
              (i = t.GetArgument("\\begin{" + u + "}")).match(/[^0-9]/))
            )
              throw new s.default(
                "PositiveIntegerArg",
                "Argument to %1 must me a positive integer",
                "\\begin{" + u + "}"
              );
            for (var h = parseInt(i, 10); h > 0; )
              (c += "rl"), f.push("0em 0em"), h--;
            var d = f.join(" ");
            if (o) return e.AmsMethods.EqnArray(t, r, a, o, c, d);
            var p = e.AmsMethods.EqnArray(t, r, a, o, c, d);
            return n.default.setArrayAlign(p, l);
          }),
          (e.AmsMethods.Multline = function (t, e, r) {
            t.Push(e), n.default.checkEqnEnv(t);
            var a = t.itemFactory.create("multline", r, t.stack);
            return (
              (a.arraydef = {
                displaystyle: !0,
                rowspacing: ".5em",
                columnspacing: "100%",
                width: t.options.ams.multlineWidth,
                side: t.options.tagSide,
                minlabelspacing: t.options.tagIndent,
                framespacing: t.options.ams.multlineIndent + " 0",
                frame: "",
                "data-width-includes-label": !0,
              }),
              a
            );
          }),
          (e.AmsMethods.XalignAt = function (t, r, n, a) {
            var o = t.GetArgument("\\begin{" + r.getName() + "}");
            if (o.match(/[^0-9]/))
              throw new s.default(
                "PositiveIntegerArg",
                "Argument to %1 must me a positive integer",
                "\\begin{" + r.getName() + "}"
              );
            var i = a ? "crl" : "rlc",
              l = a ? "fit auto auto" : "auto auto fit",
              u = e.AmsMethods.FlalignArray(t, r, n, a, !1, i, l, !0);
            return u.setProperty("xalignat", 2 * parseInt(o)), u;
          }),
          (e.AmsMethods.FlalignArray = function (t, e, r, a, o, i, s, l) {
            void 0 === l && (l = !1),
              t.Push(e),
              n.default.checkEqnEnv(t),
              (i = i
                .split("")
                .join(" ")
                .replace(/r/g, "right")
                .replace(/l/g, "left")
                .replace(/c/g, "center"));
            var u = t.itemFactory.create(
              "flalign",
              e.getName(),
              r,
              a,
              o,
              t.stack
            );
            return (
              (u.arraydef = {
                width: "100%",
                displaystyle: !0,
                columnalign: i,
                columnspacing: "0em",
                columnwidth: s,
                rowspacing: "3pt",
                side: t.options.tagSide,
                minlabelspacing: l ? "0" : t.options.tagIndent,
                "data-width-includes-label": !0,
              }),
              u.setProperty("zeroWidthLabel", l),
              u
            );
          }),
          (e.NEW_OPS = "ams-declare-ops"),
          (e.AmsMethods.HandleDeclareOp = function (t, r) {
            var a = t.GetStar() ? "" : "\\nolimits\\SkipLimits",
              o = n.default.trimSpaces(t.GetArgument(r));
            "\\" === o.charAt(0) && (o = o.substr(1));
            var i = t.GetArgument(r);
            i.match(/\\text/) ||
              (i = i.replace(/\*/g, "\\text{*}").replace(/-/g, "\\text{-}")),
              t.configuration.handlers
                .retrieve(e.NEW_OPS)
                .add(
                  o,
                  new l.Macro(o, e.AmsMethods.Macro, [
                    "\\mathop{\\rm " + i + "}" + a,
                  ])
                );
          }),
          (e.AmsMethods.HandHardworkperatorName = function (t, e) {
            var r = t.GetStar() ? "" : "\\nolimits\\SkipLimits",
              a = n.default.trimSpaces(t.GetArgument(e));
            a.match(/\\text/) ||
              (a = a.replace(/\*/g, "\\text{*}").replace(/-/g, "\\text{-}")),
              (t.string =
                "\\mathop{\\rm " + a + "}" + r + " " + t.string.slice(t.i)),
              (t.i = 0);
          }),
          (e.AmsMethods.SkipLimits = function (t, e) {
            var r = t.GetNext(),
              n = t.i;
            "\\" === r && ++t.i && "limits" !== t.GetCS() && (t.i = n);
          }),
          (e.AmsMethods.MultiIntegral = function (t, e, r) {
            var n = t.GetNext();
            if ("\\" === n) {
              var a = t.i;
              (n = t.GetArgument(e)),
                (t.i = a),
                "\\limits" === n &&
                  (r =
                    "\\idotsint" === e
                      ? "\\!\\!\\mathop{\\,\\," + r + "}"
                      : "\\!\\!\\!\\mathop{\\,\\,\\," + r + "}");
            }
            (t.string = r + " " + t.string.slice(t.i)), (t.i = 0);
          }),
          (e.AmsMethods.xArrow = function (t, e, r, o, s) {
            var l = {
                width: "+" + n.default.Em((o + s) / 18),
                lspace: n.default.Em(o / 18),
              },
              u = t.GetBrackets(e),
              f = t.ParseArg(e),
              h = t.create("node", "mspace", [], { depth: ".25em" }),
              d = t.create(
                "token",
                "mo",
                { stretchy: !0, texClass: c.TEXCLASS.REL },
                String.fromCodePoint(r)
              );
            d = t.create("node", "mstyle", [d], { scriptlevel: 0 });
            var p = t.create("node", "munderover", [d]),
              m = t.create("node", "mpadded", [f, h], l);
            if (
              (a.default.setAttribute(m, "voffset", "-.2em"),
              a.default.setAttribute(m, "height", "-.2em"),
              a.default.setChild(p, p.over, m),
              u)
            ) {
              var g = new i.default(u, t.stack.env, t.configuration).mml(),
                y = t.create("node", "mspace", [], { height: ".75em" });
              (m = t.create("node", "mpadded", [g, y], l)),
                a.default.setAttribute(m, "voffset", ".15em"),
                a.default.setAttribute(m, "depth", "-.15em"),
                a.default.setChild(p, p.under, m);
            }
            a.default.setProperty(p, "subsupOK", !0), t.Push(p);
          }),
          (e.AmsMethods.HandleShove = function (t, e, r) {
            var n = t.stack.Top();
            if ("multline" !== n.kind)
              throw new s.default(
                "CommandOnlyAllowedInEnv",
                "%1 only allowed in %2 environment",
                t.currentCS,
                "multline"
              );
            if (n.Size())
              throw new s.default(
                "CommandAtTheBeginingOfLine",
                "%1 must come at the beginning of the line",
                t.currentCS
              );
            n.setProperty("shove", r);
          }),
          (e.AmsMethods.CFrac = function (t, e) {
            var r = n.default.trimSpaces(t.GetBrackets(e, "")),
              l = t.GetArgument(e),
              u = t.GetArgument(e),
              c = {
                l: o.TexConstant.Align.LEFT,
                r: o.TexConstant.Align.RIGHT,
                "": "",
              },
              f = new i.default(
                "\\strut\\textstyle{" + l + "}",
                t.stack.env,
                t.configuration
              ).mml(),
              h = new i.default(
                "\\strut\\textstyle{" + u + "}",
                t.stack.env,
                t.configuration
              ).mml(),
              d = t.create("node", "mfrac", [f, h]);
            if (null == (r = c[r]))
              throw new s.default(
                "IllegalAlign",
                "Illegal alignment specified in %1",
                t.currentCS
              );
            r && a.default.setProperties(d, { numalign: r, denomalign: r }),
              t.Push(d);
          }),
          (e.AmsMethods.Genfrac = function (t, e, r, o, i, l) {
            null == r && (r = t.GetDelimiterArg(e)),
              null == o && (o = t.GetDelimiterArg(e)),
              null == i && (i = t.GetArgument(e)),
              null == l && (l = n.default.trimSpaces(t.GetArgument(e)));
            var u = t.ParseArg(e),
              c = t.ParseArg(e),
              f = t.create("node", "mfrac", [u, c]);
            if (
              ("" !== i && a.default.setAttribute(f, "linethickness", i),
              (r || o) &&
                (a.default.setProperty(f, "withDelims", !0),
                (f = n.default.fixedFence(t.configuration, r, f, o))),
              "" !== l)
            ) {
              var h = parseInt(l, 10),
                d = ["D", "T", "S", "SS"][h];
              if (null == d)
                throw new s.default(
                  "BadMathStyleFor",
                  "Bad math style for %1",
                  t.currentCS
                );
              (f = t.create("node", "mstyle", [f])),
                "D" === d
                  ? a.default.setProperties(f, {
                      displaystyle: !0,
                      scriptlevel: 0,
                    })
                  : a.default.setProperties(f, {
                      displaystyle: !1,
                      scriptlevel: h - 1,
                    });
            }
            t.Push(f);
          }),
          (e.AmsMethods.HandleTag = function (t, e) {
            if (!t.tags.currentTag.taggable && t.tags.env)
              throw new s.default(
                "CommandNotAllowedInEnv",
                "%1 not allowed in %2 environment",
                t.currentCS,
                t.tags.env
              );
            if (t.tags.currentTag.tag)
              throw new s.default(
                "MultipleCommand",
                "Multiple %1",
                t.currentCS
              );
            var r = t.GetStar(),
              a = n.default.trimSpaces(t.GetArgument(e));
            t.tags.tag(a, r);
          }),
          (e.AmsMethods.HandleNoTag = u.default.HandleNoTag),
          (e.AmsMethods.HandleRef = u.default.HandleRef),
          (e.AmsMethods.Macro = u.default.Macro),
          (e.AmsMethods.Accent = u.default.Accent),
          (e.AmsMethods.Tilde = u.default.Tilde),
          (e.AmsMethods.Array = u.default.Array),
          (e.AmsMethods.Spacer = u.default.Spacer),
          (e.AmsMethods.NamedOp = u.default.NamedOp),
          (e.AmsMethods.EqnArray = u.default.EqnArray),
          (e.AmsMethods.Equation = u.default.Equation);
      },
      1451: function (t, e, r) {
        var n =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          a =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AutoloadConfiguration = void 0);
        var o = r(6552),
          i = r(7628),
          s = r(4237),
          l = r(4303),
          u = r(1993),
          c = r(9077);
        function f(t, e, r, o) {
          var i, s, c, f;
          if (u.Package.packages.has(t.options.require.prefix + r)) {
            var p = t.options.autoload[r],
              m = n(2 === p.length && Array.isArray(p[0]) ? p : [p, []], 2),
              g = m[0],
              y = m[1];
            try {
              for (var v = a(g), b = v.next(); !b.done; b = v.next()) {
                var x = b.value;
                h.remove(x);
              }
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                b && !b.done && (s = v.return) && s.call(v);
              } finally {
                if (i) throw i.error;
              }
            }
            try {
              for (var A = a(y), M = A.next(); !M.done; M = A.next()) {
                var w = M.value;
                d.remove(w);
              }
            } catch (t) {
              c = { error: t };
            } finally {
              try {
                M && !M.done && (f = A.return) && f.call(A);
              } finally {
                if (c) throw c.error;
              }
            }
            (t.string =
              (o ? e + " " : "\\begin{" + e.slice(1) + "}") +
              t.string.slice(t.i)),
              (t.i = 0);
          }
          l.RequireLoad(t, r);
        }
        var h = new i.CommandMap("autoload-macros", {}, {}),
          d = new i.CommandMap("autoload-environments", {}, {});
        e.AutoloadConfiguration = o.Configuration.create("autoload", {
          handler: {
            macro: ["autoload-macros"],
            environment: ["autoload-environments"],
          },
          options: {
            autoload: c.expandable({
              action: ["toggle", "mathtip", "texttip"],
              amscd: [[], ["CD"]],
              bbox: ["bbox"],
              boldsymbol: ["boldsymbol"],
              braket: [
                "bra",
                "ket",
                "braket",
                "set",
                "Bra",
                "Ket",
                "Braket",
                "Set",
                "ketbra",
                "Ketbra",
              ],
              bussproofs: [[], ["prooftree"]],
              cancel: ["cancel", "bcancel", "xcancel", "cancelto"],
              color: [
                "color",
                "definecolor",
                "textcolor",
                "colorbox",
                "fcolorbox",
              ],
              enclose: ["enclose"],
              extpfeil: [
                "xtwoheadrightarrow",
                "xtwoheadleftarrow",
                "xmapsto",
                "xlongequal",
                "xtofrom",
                "Newextarrow",
              ],
              html: ["href", "class", "style", "cssId"],
              mhchem: ["ce", "pu"],
              newcommand: [
                "newcommand",
                "renewcommand",
                "newenvironment",
                "renewenvironment",
                "def",
                "let",
              ],
              unicode: ["unicode"],
              verb: ["verb"],
            }),
          },
          config: function (t, e) {
            var r,
              o,
              i,
              u,
              c,
              p,
              m = e.parseOptions,
              g = m.handlers.get("macro"),
              y = m.handlers.get("environment"),
              v = m.options.autoload;
            m.packageData.set("autoload", { Autoload: f });
            try {
              for (
                var b = a(Object.keys(v)), x = b.next();
                !x.done;
                x = b.next()
              ) {
                var A = x.value,
                  M = v[A],
                  w = n(2 === M.length && Array.isArray(M[0]) ? M : [M, []], 2),
                  T = w[0],
                  S = w[1];
                try {
                  for (
                    var C = ((i = void 0), a(T)), O = C.next();
                    !O.done;
                    O = C.next()
                  ) {
                    var P = O.value;
                    (g.lookup(P) && "color" !== P) ||
                      h.add(P, new s.Macro(P, f, [A, !0]));
                  }
                } catch (t) {
                  i = { error: t };
                } finally {
                  try {
                    O && !O.done && (u = C.return) && u.call(C);
                  } finally {
                    if (i) throw i.error;
                  }
                }
                try {
                  for (
                    var E = ((c = void 0), a(S)), k = E.next();
                    !k.done;
                    k = E.next()
                  ) {
                    var I = k.value;
                    y.lookup(I) || d.add(I, new s.Macro(I, f, [A, !1]));
                  }
                } catch (t) {
                  c = { error: t };
                } finally {
                  try {
                    k && !k.done && (p = E.return) && p.call(E);
                  } finally {
                    if (c) throw c.error;
                  }
                }
              }
            } catch (t) {
              r = { error: t };
            } finally {
              try {
                x && !x.done && (o = b.return) && o.call(b);
              } finally {
                if (r) throw r.error;
              }
            }
            m.packageData.get("require") || l.RequireConfiguration.config(t, e);
          },
          init: function (t) {
            t.options.require ||
              c.defaultOptions(t.options, l.RequireConfiguration.options);
          },
          priority: 10,
        });
      },
      3606: function (t, e, r) {
        var n,
          a,
          o =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          i =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BaseConfiguration = e.BaseTags = e.Other = void 0);
        var s = r(6552),
          l = r(2910),
          u = r(3466),
          c = r(8321),
          f = r(7628),
          h = r(8389),
          d = r(7251);
        r(4962);
        var p = r(3857);
        function m(t, e) {
          var r = t.stack.env.font ? { mathvariant: t.stack.env.font } : {},
            n = l.MapHandler.getMap("remap").lookup(e),
            a = p.getRange(e),
            o = a ? a[3] : "mo",
            i = t.create("token", o, r, n ? n.char : e);
          "mo" === o &&
            (c.default.setProperty(i, "fixStretchy", !0),
            t.configuration.addNode("fixStretchy", i)),
            t.Push(i);
        }
        new f.CharacterMap("remap", null, {
          "-": "\u2212",
          "*": "\u2217",
          "`": "\u2018",
        }),
          (e.Other = m);
        var g = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return o(e, t), e;
        })(d.AbstractTags);
        (e.BaseTags = g),
          (e.BaseConfiguration = s.Configuration.create("base", {
            handler: {
              character: ["command", "special", "letter", "digit"],
              delimiter: ["delimiter"],
              macro: [
                "delimiter",
                "macros",
                "mathchar0mi",
                "mathchar0mo",
                "mathchar7",
              ],
              environment: ["environment"],
            },
            fallback: {
              character: m,
              macro: function (t, e) {
                throw new u.default(
                  "UndefinedControlSequence",
                  "Undefined control sequence %1",
                  "\\" + e
                );
              },
              environment: function (t, e) {
                throw new u.default(
                  "UnknownEnv",
                  "Unknown environment '%1'",
                  e
                );
              },
            },
            items:
              ((a = {}),
              (a[h.StartItem.prototype.kind] = h.StartItem),
              (a[h.StopItem.prototype.kind] = h.StopItem),
              (a[h.OpenItem.prototype.kind] = h.OpenItem),
              (a[h.CloseItem.prototype.kind] = h.CloseItem),
              (a[h.PrimeItem.prototype.kind] = h.PrimeItem),
              (a[h.SubsupItem.prototype.kind] = h.SubsupItem),
              (a[h.OverItem.prototype.kind] = h.OverItem),
              (a[h.LeftItem.prototype.kind] = h.LeftItem),
              (a[h.Middle.prototype.kind] = h.Middle),
              (a[h.RightItem.prototype.kind] = h.RightItem),
              (a[h.BeginItem.prototype.kind] = h.BeginItem),
              (a[h.EndItem.prototype.kind] = h.EndItem),
              (a[h.StyleItem.prototype.kind] = h.StyleItem),
              (a[h.PositionItem.prototype.kind] = h.PositionItem),
              (a[h.CellItem.prototype.kind] = h.CellItem),
              (a[h.MmlItem.prototype.kind] = h.MmlItem),
              (a[h.FnItem.prototype.kind] = h.FnItem),
              (a[h.NotItem.prototype.kind] = h.NotItem),
              (a[h.NonscriptItem.prototype.kind] = h.NonscriptItem),
              (a[h.DotsItem.prototype.kind] = h.DotsItem),
              (a[h.ArrayItem.prototype.kind] = h.ArrayItem),
              (a[h.EqnArrayItem.prototype.kind] = h.EqnArrayItem),
              (a[h.EquationItem.prototype.kind] = h.EquationItem),
              a),
            options: {
              maxMacros: 1e3,
              baseURL:
                "undefined" == typeof document ||
                0 === document.getElementsByTagName("base").length
                  ? ""
                  : String(document.location).replace(/#.*$/, ""),
            },
            tags: { base: g },
            postprocessors: [
              [
                function (t) {
                  var e,
                    r,
                    n = t.data;
                  try {
                    for (
                      var a = i(n.getList("nonscript")), o = a.next();
                      !o.done;
                      o = a.next()
                    ) {
                      var s = o.value;
                      if (s.attributes.get("scriptlevel") > 0) {
                        var l = s.parent;
                        if (
                          (l.childNodes.splice(l.childIndex(s), 1),
                          n.removeFromList(s.kind, [s]),
                          s.isKind("mrow"))
                        ) {
                          var u = s.childNodes[0];
                          n.removeFromList("mstyle", [u]),
                            n.removeFromList(
                              "mspace",
                              u.childNodes[0].childNodes
                            );
                        }
                      } else
                        s.isKind("mrow") &&
                          (s.parent.replaceChild(s.childNodes[0], s),
                          n.removeFromList("mrow", [s]));
                    }
                  } catch (t) {
                    e = { error: t };
                  } finally {
                    try {
                      o && !o.done && (r = a.return) && r.call(a);
                    } finally {
                      if (e) throw e.error;
                    }
                  }
                },
                -4,
              ],
            ],
          }));
      },
      8389: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            }),
          o =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          i =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.EquationItem =
            e.EqnArrayItem =
            e.ArrayItem =
            e.DotsItem =
            e.NonscriptItem =
            e.NotItem =
            e.FnItem =
            e.MmlItem =
            e.CellItem =
            e.PositionItem =
            e.StyleItem =
            e.EndItem =
            e.BeginItem =
            e.RightItem =
            e.Middle =
            e.LeftItem =
            e.OverItem =
            e.SubsupItem =
            e.PrimeItem =
            e.CloseItem =
            e.OpenItem =
            e.StopItem =
            e.StartItem =
              void 0);
        var s = r(2910),
          l = r(9029),
          u = r(8921),
          c = r(3466),
          f = r(7702),
          h = r(8321),
          d = r(7044),
          p = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.global = r), n;
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "start";
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "isOpen", {
                get: function () {
                  return !0;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.checkItem = function (e) {
                if (e.isKind("stop")) {
                  var r = this.toMml();
                  return (
                    this.global.isInner ||
                      (r = this.factory.configuration.tags.finalize(
                        r,
                        this.env
                      )),
                    [[this.factory.create("mml", r)], !0]
                  );
                }
                return t.prototype.checkItem.call(this, e);
              }),
              e
            );
          })(d.BaseItem);
        e.StartItem = p;
        var m = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "stop";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.StopItem = m;
        var g = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "open";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isOpen", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isKind("close")) {
                var r = this.toMml(),
                  n = this.create("node", "TeXAtom", [r]);
                return [[this.factory.create("mml", n)], !0];
              }
              return t.prototype.checkItem.call(this, e);
            }),
            (e.errors = Object.assign(Object.create(d.BaseItem.errors), {
              stop: [
                "ExtraOpenMissingClose",
                "Extra open brace or missing close brace",
              ],
            })),
            e
          );
        })(d.BaseItem);
        e.OpenItem = g;
        var y = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "close";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.CloseItem = y;
        var v = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "prime";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (t) {
              var e = o(this.Peek(2), 2),
                r = e[0],
                n = e[1];
              return !h.default.isType(r, "msubsup") ||
                h.default.isType(r, "msup")
                ? [[this.create("node", "msup", [r, n]), t], !0]
                : (h.default.setChild(r, r.sup, n), [[r, t], !0]);
            }),
            e
          );
        })(d.BaseItem);
        e.PrimeItem = v;
        var b = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "subsup";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isKind("open") || e.isKind("left"))
                return d.BaseItem.success;
              var r = this.First,
                n = this.getProperty("position");
              if (e.isKind("mml")) {
                if (this.getProperty("primes"))
                  if (2 !== n)
                    h.default.setChild(r, 2, this.getProperty("primes"));
                  else {
                    h.default.setProperty(
                      this.getProperty("primes"),
                      "variantForm",
                      !0
                    );
                    var a = this.create("node", "mrow", [
                      this.getProperty("primes"),
                      e.First,
                    ]);
                    e.First = a;
                  }
                return (
                  h.default.setChild(r, n, e.First),
                  null != this.getProperty("movesupsub") &&
                    h.default.setProperty(
                      r,
                      "movesupsub",
                      this.getProperty("movesupsub")
                    ),
                  [[this.factory.create("mml", r)], !0]
                );
              }
              if (t.prototype.checkItem.call(this, e)[1]) {
                var s = this.getErrors(["", "sub", "sup"][n]);
                throw new (c.default.bind.apply(
                  c.default,
                  i([void 0, s[0], s[1]], o(s.splice(2)))
                ))();
              }
              return null;
            }),
            (e.errors = Object.assign(Object.create(d.BaseItem.errors), {
              stop: [
                "MissingScript",
                "Missing superscript or subscript argument",
              ],
              sup: ["MissingOpenForSup", "Missing open brace for superscript"],
              sub: ["MissingOpenForSub", "Missing open brace for subscript"],
            })),
            e
          );
        })(d.BaseItem);
        e.SubsupItem = b;
        var x = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return r.setProperty("name", "\\over"), r;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "over";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isKind("over"))
                throw new c.default(
                  "AmbiguousUseOf",
                  "Ambiguous use of %1",
                  e.getName()
                );
              if (e.isClose) {
                var r = this.create("node", "mfrac", [
                  this.getProperty("num"),
                  this.toMml(!1),
                ]);
                return (
                  null != this.getProperty("thickness") &&
                    h.default.setAttribute(
                      r,
                      "linethickness",
                      this.getProperty("thickness")
                    ),
                  (this.getProperty("open") || this.getProperty("close")) &&
                    (h.default.setProperty(r, "withDelims", !0),
                    (r = f.default.fixedFence(
                      this.factory.configuration,
                      this.getProperty("open"),
                      r,
                      this.getProperty("close")
                    ))),
                  [[this.factory.create("mml", r), e], !0]
                );
              }
              return t.prototype.checkItem.call(this, e);
            }),
            (e.prototype.toString = function () {
              return (
                "over[" +
                this.getProperty("num") +
                " / " +
                this.nodes.join("; ") +
                "]"
              );
            }),
            e
          );
        })(d.BaseItem);
        e.OverItem = x;
        var A = (function (t) {
          function e(e, r) {
            var n = t.call(this, e) || this;
            return n.setProperty("delim", r), n;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "left";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isOpen", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isKind("right"))
                return [
                  [
                    this.factory.create(
                      "mml",
                      f.default.fenced(
                        this.factory.configuration,
                        this.getProperty("delim"),
                        this.toMml(),
                        e.getProperty("delim"),
                        "",
                        e.getProperty("color")
                      )
                    ),
                  ],
                  !0,
                ];
              if (e.isKind("middle")) {
                var r = { stretchy: !0 };
                return (
                  e.getProperty("color") &&
                    (r.mathcolor = e.getProperty("color")),
                  this.Push(
                    this.create("node", "TeXAtom", [], {
                      texClass: u.TEXCLASS.CLOSE,
                    }),
                    this.create("token", "mo", r, e.getProperty("delim")),
                    this.create("node", "TeXAtom", [], {
                      texClass: u.TEXCLASS.OPEN,
                    })
                  ),
                  (this.env = {}),
                  [[this], !0]
                );
              }
              return t.prototype.checkItem.call(this, e);
            }),
            (e.errors = Object.assign(Object.create(d.BaseItem.errors), {
              stop: [
                "ExtraLeftMissingRight",
                "Extra \\left or missing \\right",
              ],
            })),
            e
          );
        })(d.BaseItem);
        e.LeftItem = A;
        var M = (function (t) {
          function e(e, r, n) {
            var a = t.call(this, e) || this;
            return a.setProperty("delim", r), n && a.setProperty("color", n), a;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "middle";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.Middle = M;
        var w = (function (t) {
          function e(e, r, n) {
            var a = t.call(this, e) || this;
            return a.setProperty("delim", r), n && a.setProperty("color", n), a;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "right";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.RightItem = w;
        var T = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "begin";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isOpen", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isKind("end")) {
                if (e.getName() !== this.getName())
                  throw new c.default(
                    "EnvBadEnd",
                    "\\begin{%1} ended with \\end{%2}",
                    this.getName(),
                    e.getName()
                  );
                return this.getProperty("end")
                  ? d.BaseItem.fail
                  : [[this.factory.create("mml", this.toMml())], !0];
              }
              if (e.isKind("stop"))
                throw new c.default(
                  "EnvMissingEnd",
                  "Missing \\end{%1}",
                  this.getName()
                );
              return t.prototype.checkItem.call(this, e);
            }),
            e
          );
        })(d.BaseItem);
        e.BeginItem = T;
        var S = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "end";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.EndItem = S;
        var C = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "style";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (!e.isClose) return t.prototype.checkItem.call(this, e);
              var r = this.create(
                "node",
                "mstyle",
                this.nodes,
                this.getProperty("styles")
              );
              return [[this.factory.create("mml", r), e], !0];
            }),
            e
          );
        })(d.BaseItem);
        e.StyleItem = C;
        var O = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "position";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isClose)
                throw new c.default(
                  "MissingBoxFor",
                  "Missing box for %1",
                  this.getName()
                );
              if (e.isFinal) {
                var r = e.toMml();
                switch (this.getProperty("move")) {
                  case "vertical":
                    return (
                      (r = this.create("node", "mpadded", [r], {
                        height: this.getProperty("dh"),
                        depth: this.getProperty("dd"),
                        voffset: this.getProperty("dh"),
                      })),
                      [[this.factory.create("mml", r)], !0]
                    );
                  case "horizontal":
                    return [
                      [
                        this.factory.create("mml", this.getProperty("left")),
                        e,
                        this.factory.create("mml", this.getProperty("right")),
                      ],
                      !0,
                    ];
                }
              }
              return t.prototype.checkItem.call(this, e);
            }),
            e
          );
        })(d.BaseItem);
        e.PositionItem = O;
        var P = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "cell";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isClose", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.CellItem = P;
        var E = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "isFinal", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "mml";
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(d.BaseItem);
        e.MmlItem = E;
        var k = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "fn";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              var r = this.First;
              if (r) {
                if (e.isOpen) return d.BaseItem.success;
                if (!e.isKind("fn")) {
                  var n = e.First;
                  if (!e.isKind("mml") || !n) return [[r, e], !0];
                  if (
                    (h.default.isType(n, "mstyle") &&
                      n.childNodes.length &&
                      h.default.isType(
                        n.childNodes[0].childNodes[0],
                        "mspace"
                      )) ||
                    h.default.isType(n, "mspace")
                  )
                    return [[r, e], !0];
                  h.default.isEmbellished(n) && (n = h.default.getCoreMO(n));
                  var a = h.default.getForm(n);
                  if (null != a && [0, 0, 1, 1, 0, 1, 1, 0, 0, 0][a[2]])
                    return [[r, e], !0];
                }
                var o = this.create(
                  "token",
                  "mo",
                  { texClass: u.TEXCLASS.NONE },
                  l.entities.ApplyFunction
                );
                return [[r, o, e], !0];
              }
              return t.prototype.checkItem.apply(this, arguments);
            }),
            e
          );
        })(d.BaseItem);
        e.FnItem = k;
        var I = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.remap = s.MapHandler.getMap("not_remap")), e;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "not";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (t) {
              var e, r, n;
              if (t.isKind("open") || t.isKind("left"))
                return d.BaseItem.success;
              if (
                t.isKind("mml") &&
                (h.default.isType(t.First, "mo") ||
                  h.default.isType(t.First, "mi") ||
                  h.default.isType(t.First, "mtext")) &&
                ((e = t.First),
                1 === (r = h.default.getText(e)).length &&
                  !h.default.getProperty(e, "movesupsub") &&
                  1 === h.default.getChildren(e).length)
              )
                return (
                  this.remap.contains(r)
                    ? ((n = this.create("text", this.remap.lookup(r).char)),
                      h.default.setChild(e, 0, n))
                    : ((n = this.create("text", "\u0338")),
                      h.default.appendChildren(e, [n])),
                  [[t], !0]
                );
              n = this.create("text", "\u29f8");
              var a = this.create("node", "mtext", [], {}, n),
                o = this.create("node", "mpadded", [a], { width: 0 });
              return [
                [
                  (e = this.create("node", "TeXAtom", [o], {
                    texClass: u.TEXCLASS.REL,
                  })),
                  t,
                ],
                !0,
              ];
            }),
            e
          );
        })(d.BaseItem);
        e.NotItem = I;
        var _ = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "nonscript";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (t) {
              if (t.isKind("mml") && 1 === t.Size()) {
                var e = t.First;
                if (
                  (e.isKind("mstyle") &&
                    e.notParent &&
                    (e = h.default.getChildren(h.default.getChildren(e)[0])[0]),
                  e.isKind("mspace"))
                ) {
                  if (e !== t.First) {
                    var r = this.create("node", "mrow", [t.Pop()]);
                    t.Push(r);
                  }
                  this.factory.configuration.addNode("nonscript", t.First);
                }
              }
              return [[t], !0];
            }),
            e
          );
        })(d.BaseItem);
        e.NonscriptItem = _;
        var L = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "dots";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (t) {
              if (t.isKind("open") || t.isKind("left"))
                return d.BaseItem.success;
              var e = this.getProperty("ldots"),
                r = t.First;
              if (t.isKind("mml") && h.default.isEmbellished(r)) {
                var n = h.default.getTexClass(h.default.getCoreMO(r));
                (n !== u.TEXCLASS.BIN && n !== u.TEXCLASS.REL) ||
                  (e = this.getProperty("cdots"));
              }
              return [[e, t], !0];
            }),
            e
          );
        })(d.BaseItem);
        e.DotsItem = L;
        var N = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e.table = []),
              (e.row = []),
              (e.frame = []),
              (e.hfill = []),
              (e.arraydef = {}),
              (e.dashed = !1),
              e
            );
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "array";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isOpen", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "copyEnv", {
              get: function () {
                return !1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isClose && !e.isKind("over")) {
                if (e.getProperty("isEntry"))
                  return this.EndEntry(), this.clearEnv(), d.BaseItem.fail;
                if (e.getProperty("isCR"))
                  return (
                    this.EndEntry(),
                    this.EndRow(),
                    this.clearEnv(),
                    d.BaseItem.fail
                  );
                this.EndTable(), this.clearEnv();
                var r = this.factory.create("mml", this.createMml());
                if (this.getProperty("requireClose")) {
                  if (e.isKind("close")) return [[r], !0];
                  throw new c.default(
                    "MissingCloseBrace",
                    "Missing close brace"
                  );
                }
                return [[r, e], !0];
              }
              return t.prototype.checkItem.call(this, e);
            }),
            (e.prototype.createMml = function () {
              var t = this.arraydef.scriptlevel;
              delete this.arraydef.scriptlevel;
              var e = this.create("node", "mtable", this.table, this.arraydef);
              return (
                t && e.setProperty("scriptlevel", t),
                4 === this.frame.length
                  ? h.default.setAttribute(
                      e,
                      "frame",
                      this.dashed ? "dashed" : "solid"
                    )
                  : this.frame.length &&
                    (this.arraydef.rowlines &&
                      (this.arraydef.rowlines = this.arraydef.rowlines.replace(
                        /none( none)+$/,
                        "none"
                      )),
                    h.default.setAttribute(e, "frame", ""),
                    (e = this.create("node", "menclose", [e], {
                      notation: this.frame.join(" "),
                    })),
                    ("none" === (this.arraydef.columnlines || "none") &&
                      "none" === (this.arraydef.rowlines || "none")) ||
                      h.default.setAttribute(e, "data-padding", 0)),
                (this.getProperty("open") || this.getProperty("close")) &&
                  (e = f.default.fenced(
                    this.factory.configuration,
                    this.getProperty("open"),
                    e,
                    this.getProperty("close")
                  )),
                e
              );
            }),
            (e.prototype.EndEntry = function () {
              var t = this.create("node", "mtd", this.nodes);
              this.hfill.length &&
                (0 === this.hfill[0] &&
                  h.default.setAttribute(t, "columnalign", "right"),
                this.hfill[this.hfill.length - 1] === this.Size() &&
                  h.default.setAttribute(
                    t,
                    "columnalign",
                    h.default.getAttribute(t, "columnalign") ? "center" : "left"
                  )),
                this.row.push(t),
                this.Clear(),
                (this.hfill = []);
            }),
            (e.prototype.EndRow = function () {
              var t;
              this.getProperty("isNumbered") && 3 === this.row.length
                ? (this.row.unshift(this.row.pop()),
                  (t = this.create("node", "mlabeledtr", this.row)))
                : (t = this.create("node", "mtr", this.row)),
                this.table.push(t),
                (this.row = []);
            }),
            (e.prototype.EndTable = function () {
              (this.Size() || this.row.length) &&
                (this.EndEntry(), this.EndRow()),
                this.checkLines();
            }),
            (e.prototype.checkLines = function () {
              if (this.arraydef.rowlines) {
                var t = this.arraydef.rowlines.split(/ /);
                t.length === this.table.length
                  ? (this.frame.push("bottom"),
                    t.pop(),
                    (this.arraydef.rowlines = t.join(" ")))
                  : t.length < this.table.length - 1 &&
                    (this.arraydef.rowlines += " none");
              }
              if (this.getProperty("rowspacing")) {
                for (
                  var e = this.arraydef.rowspacing.split(/ /);
                  e.length < this.table.length;

                )
                  e.push(this.getProperty("rowspacing") + "em");
                this.arraydef.rowspacing = e.join(" ");
              }
            }),
            (e.prototype.addRowSpacing = function (t) {
              if (this.arraydef.rowspacing) {
                var e = this.arraydef.rowspacing.split(/ /);
                if (!this.getProperty("rowspacing")) {
                  var r = f.default.dimen2em(e[0]);
                  this.setProperty("rowspacing", r);
                }
                for (
                  var n = this.getProperty("rowspacing");
                  e.length < this.table.length;

                )
                  e.push(f.default.Em(n));
                (e[this.table.length - 1] = f.default.Em(
                  Math.max(0, n + f.default.dimen2em(t))
                )),
                  (this.arraydef.rowspacing = e.join(" "));
              }
            }),
            e
          );
        })(d.BaseItem);
        e.ArrayItem = N;
        var F = (function (t) {
          function e(e) {
            for (var r = [], n = 1; n < arguments.length; n++)
              r[n - 1] = arguments[n];
            var a = t.call(this, e) || this;
            return (
              (a.maxrow = 0),
              a.factory.configuration.tags.start(r[0], r[2], r[1]),
              a
            );
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "eqnarray";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.EndEntry = function () {
              this.row.length &&
                f.default.fixInitialMO(this.factory.configuration, this.nodes);
              var t = this.create("node", "mtd", this.nodes);
              this.row.push(t), this.Clear();
            }),
            (e.prototype.EndRow = function () {
              this.row.length > this.maxrow && (this.maxrow = this.row.length);
              var t = "mtr",
                e = this.factory.configuration.tags.getTag();
              e && ((this.row = [e].concat(this.row)), (t = "mlabeledtr")),
                this.factory.configuration.tags.clearTag();
              var r = this.create("node", t, this.row);
              this.table.push(r), (this.row = []);
            }),
            (e.prototype.EndTable = function () {
              t.prototype.EndTable.call(this),
                this.factory.configuration.tags.end(),
                this.extendArray("columnalign", this.maxrow),
                this.extendArray("columnwidth", this.maxrow),
                this.extendArray("columnspacing", this.maxrow - 1);
            }),
            (e.prototype.extendArray = function (t, e) {
              if (this.arraydef[t]) {
                var r = this.arraydef[t].split(/ /),
                  n = i([], o(r));
                if (n.length > 1) {
                  for (; n.length < e; ) n.push.apply(n, i([], o(r)));
                  this.arraydef[t] = n.slice(0, e).join(" ");
                }
              }
            }),
            e
          );
        })(N);
        e.EqnArrayItem = F;
        var R = (function (t) {
          function e(e) {
            for (var r = [], n = 1; n < arguments.length; n++)
              r[n - 1] = arguments[n];
            var a = t.call(this, e) || this;
            return a.factory.configuration.tags.start("equation", !0, r[0]), a;
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "kind", {
              get: function () {
                return "equation";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "isOpen", {
              get: function () {
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.checkItem = function (e) {
              if (e.isKind("end")) {
                var r = this.toMml(),
                  n = this.factory.configuration.tags.getTag();
                return (
                  this.factory.configuration.tags.end(),
                  [[n ? this.factory.configuration.tags.enTag(r, n) : r, e], !0]
                );
              }
              if (e.isKind("stop"))
                throw new c.default(
                  "EnvMissingEnd",
                  "Missing \\end{%1}",
                  this.getName()
                );
              return t.prototype.checkItem.call(this, e);
            }),
            e
          );
        })(d.BaseItem);
        e.EquationItem = R;
      },
      4962: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(7628),
          a = r(7007),
          o = r(724),
          i = r(4708),
          s = r(7702),
          l = r(8921),
          u = r(6914);
        new n.RegExpMap("letter", i.default.variable, /[a-z]/i),
          new n.RegExpMap("digit", i.default.digit, /[0-9.,]/),
          new n.RegExpMap("command", i.default.controlSequence, /^\\/),
          new n.MacroMap(
            "special",
            {
              "{": "Open",
              "}": "Close",
              "~": "Tilde",
              "^": "Superscript",
              _: "Subscript",
              " ": "Space",
              "\t": "Space",
              "\r": "Space",
              "\n": "Space",
              "'": "Prime",
              "%": "Comment",
              "&": "Entry",
              "#": "Hash",
              "\xa0": "Space",
              "\u2019": "Prime",
            },
            o.default
          ),
          new n.CharacterMap("mathchar0mi", i.default.mathchar0mi, {
            alpha: "\u03b1",
            beta: "\u03b2",
            gamma: "\u03b3",
            delta: "\u03b4",
            epsilon: "\u03f5",
            zeta: "\u03b6",
            eta: "\u03b7",
            theta: "\u03b8",
            iota: "\u03b9",
            kappa: "\u03ba",
            lambda: "\u03bb",
            mu: "\u03bc",
            nu: "\u03bd",
            xi: "\u03be",
            omicron: "\u03bf",
            pi: "\u03c0",
            rho: "\u03c1",
            sigma: "\u03c3",
            tau: "\u03c4",
            upsilon: "\u03c5",
            phi: "\u03d5",
            chi: "\u03c7",
            psi: "\u03c8",
            omega: "\u03c9",
            varepsilon: "\u03b5",
            vartheta: "\u03d1",
            varpi: "\u03d6",
            varrho: "\u03f1",
            varsigma: "\u03c2",
            varphi: "\u03c6",
            S: ["\xa7", { mathvariant: a.TexConstant.Variant.NORMAL }],
            aleph: ["\u2135", { mathvariant: a.TexConstant.Variant.NORMAL }],
            hbar: ["\u210f", { variantForm: !0 }],
            imath: "\u0131",
            jmath: "\u0237",
            ell: "\u2113",
            wp: ["\u2118", { mathvariant: a.TexConstant.Variant.NORMAL }],
            Re: ["\u211c", { mathvariant: a.TexConstant.Variant.NORMAL }],
            Im: ["\u2111", { mathvariant: a.TexConstant.Variant.NORMAL }],
            partial: ["\u2202", { mathvariant: a.TexConstant.Variant.ITALIC }],
            infty: ["\u221e", { mathvariant: a.TexConstant.Variant.NORMAL }],
            prime: ["\u2032", { variantForm: !0 }],
            emptyset: ["\u2205", { mathvariant: a.TexConstant.Variant.NORMAL }],
            nabla: ["\u2207", { mathvariant: a.TexConstant.Variant.NORMAL }],
            top: ["\u22a4", { mathvariant: a.TexConstant.Variant.NORMAL }],
            bot: ["\u22a5", { mathvariant: a.TexConstant.Variant.NORMAL }],
            angle: ["\u2220", { mathvariant: a.TexConstant.Variant.NORMAL }],
            triangle: ["\u25b3", { mathvariant: a.TexConstant.Variant.NORMAL }],
            backslash: [
              "\u2216",
              { mathvariant: a.TexConstant.Variant.NORMAL },
            ],
            forall: ["\u2200", { mathvariant: a.TexConstant.Variant.NORMAL }],
            exists: ["\u2203", { mathvariant: a.TexConstant.Variant.NORMAL }],
            neg: ["\xac", { mathvariant: a.TexConstant.Variant.NORMAL }],
            lnot: ["\xac", { mathvariant: a.TexConstant.Variant.NORMAL }],
            flat: ["\u266d", { mathvariant: a.TexConstant.Variant.NORMAL }],
            natural: ["\u266e", { mathvariant: a.TexConstant.Variant.NORMAL }],
            sharp: ["\u266f", { mathvariant: a.TexConstant.Variant.NORMAL }],
            clubsuit: ["\u2663", { mathvariant: a.TexConstant.Variant.NORMAL }],
            diamondsuit: [
              "\u2662",
              { mathvariant: a.TexConstant.Variant.NORMAL },
            ],
            heartsuit: [
              "\u2661",
              { mathvariant: a.TexConstant.Variant.NORMAL },
            ],
            spadesuit: [
              "\u2660",
              { mathvariant: a.TexConstant.Variant.NORMAL },
            ],
          }),
          new n.CharacterMap("mathchar0mo", i.default.mathchar0mo, {
            surd: "\u221a",
            coprod: ["\u2210", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigvee: ["\u22c1", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigwedge: ["\u22c0", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            biguplus: ["\u2a04", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigcap: ["\u22c2", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigcup: ["\u22c3", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            int: ["\u222b", { texClass: l.TEXCLASS.OP }],
            intop: [
              "\u222b",
              { texClass: l.TEXCLASS.OP, movesupsub: !0, movablelimits: !0 },
            ],
            iint: ["\u222c", { texClass: l.TEXCLASS.OP }],
            iiint: ["\u222d", { texClass: l.TEXCLASS.OP }],
            prod: ["\u220f", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            sum: ["\u2211", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigotimes: ["\u2a02", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigoplus: ["\u2a01", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            bigodot: ["\u2a00", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            oint: ["\u222e", { texClass: l.TEXCLASS.OP }],
            bigsqcup: ["\u2a06", { texClass: l.TEXCLASS.OP, movesupsub: !0 }],
            smallint: ["\u222b", { largeop: !1 }],
            triangleleft: "\u25c3",
            triangleright: "\u25b9",
            bigtriangleup: "\u25b3",
            bigtriangledown: "\u25bd",
            wedge: "\u2227",
            land: "\u2227",
            vee: "\u2228",
            lor: "\u2228",
            cap: "\u2229",
            cup: "\u222a",
            ddagger: "\u2021",
            dagger: "\u2020",
            sqcap: "\u2293",
            sqcup: "\u2294",
            uplus: "\u228e",
            amalg: "\u2a3f",
            diamond: "\u22c4",
            bullet: "\u2219",
            wr: "\u2240",
            div: "\xf7",
            divsymbol: "\xf7",
            odot: ["\u2299", { largeop: !1 }],
            oslash: ["\u2298", { largeop: !1 }],
            otimes: ["\u2297", { largeop: !1 }],
            ominus: ["\u2296", { largeop: !1 }],
            oplus: ["\u2295", { largeop: !1 }],
            mp: "\u2213",
            pm: "\xb1",
            circ: "\u2218",
            bigcirc: "\u25ef",
            setminus: "\u2216",
            cdot: "\u22c5",
            ast: "\u2217",
            times: "\xd7",
            star: "\u22c6",
            propto: "\u221d",
            sqsubseteq: "\u2291",
            sqsupseteq: "\u2292",
            parallel: "\u2225",
            mid: "\u2223",
            dashv: "\u22a3",
            vdash: "\u22a2",
            leq: "\u2264",
            le: "\u2264",
            geq: "\u2265",
            ge: "\u2265",
            lt: "<",
            gt: ">",
            succ: "\u227b",
            prec: "\u227a",
            approx: "\u2248",
            succeq: "\u2ab0",
            preceq: "\u2aaf",
            supset: "\u2283",
            subset: "\u2282",
            supseteq: "\u2287",
            subseteq: "\u2286",
            in: "\u2208",
            ni: "\u220b",
            notin: "\u2209",
            owns: "\u220b",
            gg: "\u226b",
            ll: "\u226a",
            sim: "\u223c",
            simeq: "\u2243",
            perp: "\u22a5",
            equiv: "\u2261",
            asymp: "\u224d",
            smile: "\u2323",
            frown: "\u2322",
            ne: "\u2260",
            neq: "\u2260",
            cong: "\u2245",
            doteq: "\u2250",
            bowtie: "\u22c8",
            models: "\u22a8",
            notChar: "\u29f8",
            Leftrightarrow: "\u21d4",
            Leftarrow: "\u21d0",
            Rightarrow: "\u21d2",
            leftrightarrow: "\u2194",
            leftarrow: "\u2190",
            gets: "\u2190",
            rightarrow: "\u2192",
            to: ["\u2192", { accent: !1 }],
            mapsto: "\u21a6",
            leftharpoonup: "\u21bc",
            leftharpoondown: "\u21bd",
            rightharpoonup: "\u21c0",
            rightharpoondown: "\u21c1",
            nearrow: "\u2197",
            searrow: "\u2198",
            nwarrow: "\u2196",
            swarrow: "\u2199",
            rightleftharpoons: "\u21cc",
            hookrightarrow: "\u21aa",
            hookleftarrow: "\u21a9",
            longleftarrow: "\u27f5",
            Longleftarrow: "\u27f8",
            longrightarrow: "\u27f6",
            Longrightarrow: "\u27f9",
            Longleftrightarrow: "\u27fa",
            longleftrightarrow: "\u27f7",
            longmapsto: "\u27fc",
            ldots: "\u2026",
            cdots: "\u22ef",
            vdots: "\u22ee",
            ddots: "\u22f1",
            dotsc: "\u2026",
            dotsb: "\u22ef",
            dotsm: "\u22ef",
            dotsi: "\u22ef",
            dotso: "\u2026",
            ldotp: [".", { texClass: l.TEXCLASS.PUNCT }],
            cdotp: ["\u22c5", { texClass: l.TEXCLASS.PUNCT }],
            colon: [":", { texClass: l.TEXCLASS.PUNCT }],
          }),
          new n.CharacterMap("mathchar7", i.default.mathchar7, {
            Gamma: "\u0393",
            Delta: "\u0394",
            Theta: "\u0398",
            Lambda: "\u039b",
            Xi: "\u039e",
            Pi: "\u03a0",
            Sigma: "\u03a3",
            Upsilon: "\u03a5",
            Phi: "\u03a6",
            Psi: "\u03a8",
            Omega: "\u03a9",
            _: "_",
            "#": "#",
            $: "$",
            "%": "%",
            "&": "&",
            And: "&",
          }),
          new n.DelimiterMap("delimiter", i.default.delimiter, {
            "(": "(",
            ")": ")",
            "[": "[",
            "]": "]",
            "<": "\u27e8",
            ">": "\u27e9",
            "\\lt": "\u27e8",
            "\\gt": "\u27e9",
            "/": "/",
            "|": ["|", { texClass: l.TEXCLASS.ORD }],
            ".": "",
            "\\\\": "\\",
            "\\lmoustache": "\u23b0",
            "\\rmoustache": "\u23b1",
            "\\lgroup": "\u27ee",
            "\\rgroup": "\u27ef",
            "\\arrowvert": "\u23d0",
            "\\Arrowvert": "\u2016",
            "\\bracevert": "\u23aa",
            "\\Vert": ["\u2016", { texClass: l.TEXCLASS.ORD }],
            "\\|": ["\u2016", { texClass: l.TEXCLASS.ORD }],
            "\\vert": ["|", { texClass: l.TEXCLASS.ORD }],
            "\\uparrow": "\u2191",
            "\\downarrow": "\u2193",
            "\\updownarrow": "\u2195",
            "\\Uparrow": "\u21d1",
            "\\Downarrow": "\u21d3",
            "\\Updownarrow": "\u21d5",
            "\\backslash": "\\",
            "\\rangle": "\u27e9",
            "\\langle": "\u27e8",
            "\\rbrace": "}",
            "\\lbrace": "{",
            "\\}": "}",
            "\\{": "{",
            "\\rceil": "\u2309",
            "\\lceil": "\u2308",
            "\\rfloor": "\u230b",
            "\\lfloor": "\u230a",
            "\\lbrack": "[",
            "\\rbrack": "]",
          }),
          new n.CommandMap(
            "macros",
            {
              displaystyle: ["SetStyle", "D", !0, 0],
              textstyle: ["SetStyle", "T", !1, 0],
              scriptstyle: ["SetStyle", "S", !1, 1],
              scriptscriptstyle: ["SetStyle", "SS", !1, 2],
              rm: ["SetFont", a.TexConstant.Variant.NORMAL],
              mit: ["SetFont", a.TexConstant.Variant.ITALIC],
              oldstyle: ["SetFont", a.TexConstant.Variant.OLDSTYLE],
              cal: ["SetFont", a.TexConstant.Variant.CALLIGRAPHIC],
              it: ["SetFont", a.TexConstant.Variant.MATHITALIC],
              bf: ["SetFont", a.TexConstant.Variant.BOLD],
              bbFont: ["SetFont", a.TexConstant.Variant.DOUBLESTRUCK],
              scr: ["SetFont", a.TexConstant.Variant.SCRIPT],
              frak: ["SetFont", a.TexConstant.Variant.FRAKTUR],
              sf: ["SetFont", a.TexConstant.Variant.SANSSERIF],
              tt: ["SetFont", a.TexConstant.Variant.MONOSPACE],
              mathrm: ["MathFont", a.TexConstant.Variant.NORMAL],
              mathup: ["MathFont", a.TexConstant.Variant.NORMAL],
              mathnormal: ["MathFont", ""],
              mathbf: ["MathFont", a.TexConstant.Variant.BOLD],
              mathbfup: ["MathFont", a.TexConstant.Variant.BOLD],
              mathit: ["MathFont", a.TexConstant.Variant.MATHITALIC],
              mathbfit: ["MathFont", a.TexConstant.Variant.BOLDITALIC],
              mathbb: ["MathFont", a.TexConstant.Variant.DOUBLESTRUCK],
              Bbb: ["MathFont", a.TexConstant.Variant.DOUBLESTRUCK],
              mathfrak: ["MathFont", a.TexConstant.Variant.FRAKTUR],
              mathbffrak: ["MathFont", a.TexConstant.Variant.BOLDFRAKTUR],
              mathscr: ["MathFont", a.TexConstant.Variant.SCRIPT],
              mathbfscr: ["MathFont", a.TexConstant.Variant.BOLDSCRIPT],
              mathsf: ["MathFont", a.TexConstant.Variant.SANSSERIF],
              mathsfup: ["MathFont", a.TexConstant.Variant.SANSSERIF],
              mathbfsf: ["MathFont", a.TexConstant.Variant.BOLDSANSSERIF],
              mathbfsfup: ["MathFont", a.TexConstant.Variant.BOLDSANSSERIF],
              mathsfit: ["MathFont", a.TexConstant.Variant.SANSSERIFITALIC],
              mathbfsfit: [
                "MathFont",
                a.TexConstant.Variant.SANSSERIFBOLDITALIC,
              ],
              mathtt: ["MathFont", a.TexConstant.Variant.MONOSPACE],
              mathcal: ["MathFont", a.TexConstant.Variant.CALLIGRAPHIC],
              mathbfcal: ["MathFont", a.TexConstant.Variant.BOLDCALLIGRAPHIC],
              symrm: ["MathFont", a.TexConstant.Variant.NORMAL],
              symup: ["MathFont", a.TexConstant.Variant.NORMAL],
              symnormal: ["MathFont", ""],
              symbf: ["MathFont", a.TexConstant.Variant.BOLD],
              symbfup: ["MathFont", a.TexConstant.Variant.BOLD],
              symit: ["MathFont", a.TexConstant.Variant.ITALIC],
              symbfit: ["MathFont", a.TexConstant.Variant.BOLDITALIC],
              symbb: ["MathFont", a.TexConstant.Variant.DOUBLESTRUCK],
              symfrak: ["MathFont", a.TexConstant.Variant.FRAKTUR],
              symbffrak: ["MathFont", a.TexConstant.Variant.BOLDFRAKTUR],
              symscr: ["MathFont", a.TexConstant.Variant.SCRIPT],
              symbfscr: ["MathFont", a.TexConstant.Variant.BOLDSCRIPT],
              symsf: ["MathFont", a.TexConstant.Variant.SANSSERIF],
              symsfup: ["MathFont", a.TexConstant.Variant.SANSSERIF],
              symbfsf: ["MathFont", a.TexConstant.Variant.BOLDSANSSERIF],
              symbfsfup: ["MathFont", a.TexConstant.Variant.BOLDSANSSERIF],
              symsfit: ["MathFont", a.TexConstant.Variant.SANSSERIFITALIC],
              symbfsfit: [
                "MathFont",
                a.TexConstant.Variant.SANSSERIFBOLDITALIC,
              ],
              symtt: ["MathFont", a.TexConstant.Variant.MONOSPACE],
              symcal: ["MathFont", a.TexConstant.Variant.CALLIGRAPHIC],
              symbfcal: ["MathFont", a.TexConstant.Variant.BOLDCALLIGRAPHIC],
              textrm: ["HBox", null, a.TexConstant.Variant.NORMAL],
              textup: ["HBox", null, a.TexConstant.Variant.NORMAL],
              textnormal: ["HBox"],
              textit: ["HBox", null, a.TexConstant.Variant.ITALIC],
              textbf: ["HBox", null, a.TexConstant.Variant.BOLD],
              textsf: ["HBox", null, a.TexConstant.Variant.SANSSERIF],
              texttt: ["HBox", null, a.TexConstant.Variant.MONOSPACE],
              tiny: ["SetSize", 0.5],
              Tiny: ["SetSize", 0.6],
              scriptsize: ["SetSize", 0.7],
              small: ["SetSize", 0.85],
              normalsize: ["SetSize", 1],
              large: ["SetSize", 1.2],
              Large: ["SetSize", 1.44],
              LARGE: ["SetSize", 1.73],
              huge: ["SetSize", 2.07],
              Huge: ["SetSize", 2.49],
              arcsin: "NamedFn",
              arccos: "NamedFn",
              arctan: "NamedFn",
              arg: "NamedFn",
              cos: "NamedFn",
              cosh: "NamedFn",
              cot: "NamedFn",
              coth: "NamedFn",
              csc: "NamedFn",
              deg: "NamedFn",
              det: "NamedOp",
              dim: "NamedFn",
              exp: "NamedFn",
              gcd: "NamedOp",
              hom: "NamedFn",
              inf: "NamedOp",
              ker: "NamedFn",
              lg: "NamedFn",
              lim: "NamedOp",
              liminf: ["NamedOp", "lim&thinsp;inf"],
              limsup: ["NamedOp", "lim&thinsp;sup"],
              ln: "NamedFn",
              log: "NamedFn",
              max: "NamedOp",
              min: "NamedOp",
              Pr: "NamedOp",
              sec: "NamedFn",
              sin: "NamedFn",
              sinh: "NamedFn",
              sup: "NamedOp",
              tan: "NamedFn",
              tanh: "NamedFn",
              limits: ["Limits", 1],
              nolimits: ["Limits", 0],
              overline: ["UnderOver", "2015"],
              underline: ["UnderOver", "2015"],
              overbrace: ["UnderOver", "23DE", 1],
              underbrace: ["UnderOver", "23DF", 1],
              overparen: ["UnderOver", "23DC"],
              underparen: ["UnderOver", "23DD"],
              overrightarrow: ["UnderOver", "2192"],
              underrightarrow: ["UnderOver", "2192"],
              overleftarrow: ["UnderOver", "2190"],
              underleftarrow: ["UnderOver", "2190"],
              overleftrightarrow: ["UnderOver", "2194"],
              underleftrightarrow: ["UnderOver", "2194"],
              overset: "Overset",
              underset: "Underset",
              overunderset: "Overunderset",
              stackrel: ["Macro", "\\mathrel{\\mathop{#2}\\limits^{#1}}", 2],
              stackbin: ["Macro", "\\mathbin{\\mathop{#2}\\limits^{#1}}", 2],
              over: "Over",
              overwithdelims: "Over",
              atop: "Over",
              atopwithdelims: "Over",
              above: "Over",
              abovewithdelims: "Over",
              brace: ["Over", "{", "}"],
              brack: ["Over", "[", "]"],
              choose: ["Over", "(", ")"],
              frac: "Frac",
              sqrt: "Sqrt",
              root: "Root",
              uproot: ["MoveRoot", "upRoot"],
              leftroot: ["MoveRoot", "leftRoot"],
              left: "LeftRight",
              right: "LeftRight",
              middle: "LeftRight",
              llap: "Lap",
              rlap: "Lap",
              raise: "RaiseLower",
              lower: "RaiseLower",
              moveleft: "MoveLeftRight",
              moveright: "MoveLeftRight",
              ",": ["Spacer", u.MATHSPACE.thinmathspace],
              ":": ["Spacer", u.MATHSPACE.mediummathspace],
              ">": ["Spacer", u.MATHSPACE.mediummathspace],
              ";": ["Spacer", u.MATHSPACE.thickmathspace],
              "!": ["Spacer", u.MATHSPACE.negativethinmathspace],
              enspace: ["Spacer", 0.5],
              quad: ["Spacer", 1],
              qquad: ["Spacer", 2],
              thinspace: ["Spacer", u.MATHSPACE.thinmathspace],
              negthinspace: ["Spacer", u.MATHSPACE.negativethinmathspace],
              hskip: "Hskip",
              hspace: "Hskip",
              kern: "Hskip",
              mskip: "Hskip",
              mspace: "Hskip",
              mkern: "Hskip",
              rule: "rule",
              Rule: ["Rule"],
              Space: ["Rule", "blank"],
              nonscript: "Nonscript",
              big: ["MakeBig", l.TEXCLASS.ORD, 0.85],
              Big: ["MakeBig", l.TEXCLASS.ORD, 1.15],
              bigg: ["MakeBig", l.TEXCLASS.ORD, 1.45],
              Bigg: ["MakeBig", l.TEXCLASS.ORD, 1.75],
              bigl: ["MakeBig", l.TEXCLASS.OPEN, 0.85],
              Bigl: ["MakeBig", l.TEXCLASS.OPEN, 1.15],
              biggl: ["MakeBig", l.TEXCLASS.OPEN, 1.45],
              Biggl: ["MakeBig", l.TEXCLASS.OPEN, 1.75],
              bigr: ["MakeBig", l.TEXCLASS.CLOSE, 0.85],
              Bigr: ["MakeBig", l.TEXCLASS.CLOSE, 1.15],
              biggr: ["MakeBig", l.TEXCLASS.CLOSE, 1.45],
              Biggr: ["MakeBig", l.TEXCLASS.CLOSE, 1.75],
              bigm: ["MakeBig", l.TEXCLASS.REL, 0.85],
              Bigm: ["MakeBig", l.TEXCLASS.REL, 1.15],
              biggm: ["MakeBig", l.TEXCLASS.REL, 1.45],
              Biggm: ["MakeBig", l.TEXCLASS.REL, 1.75],
              mathord: ["TeXAtom", l.TEXCLASS.ORD],
              mathop: ["TeXAtom", l.TEXCLASS.OP],
              mathopen: ["TeXAtom", l.TEXCLASS.OPEN],
              mathclose: ["TeXAtom", l.TEXCLASS.CLOSE],
              mathbin: ["TeXAtom", l.TEXCLASS.BIN],
              mathrel: ["TeXAtom", l.TEXCLASS.REL],
              mathpunct: ["TeXAtom", l.TEXCLASS.PUNCT],
              mathinner: ["TeXAtom", l.TEXCLASS.INNER],
              vcenter: ["TeXAtom", l.TEXCLASS.VCENTER],
              buildrel: "BuildRel",
              hbox: ["HBox", 0],
              text: "HBox",
              mbox: ["HBox", 0],
              fbox: "FBox",
              boxed: ["Macro", "\\fbox{$\\displaystyle{#1}$}", 1],
              framebox: "FrameBox",
              strut: "Strut",
              mathstrut: ["Macro", "\\vphantom{(}"],
              phantom: "Phantom",
              vphantom: ["Phantom", 1, 0],
              hphantom: ["Phantom", 0, 1],
              smash: "Smash",
              acute: ["Accent", "00B4"],
              grave: ["Accent", "0060"],
              ddot: ["Accent", "00A8"],
              tilde: ["Accent", "007E"],
              bar: ["Accent", "00AF"],
              breve: ["Accent", "02D8"],
              check: ["Accent", "02C7"],
              hat: ["Accent", "005E"],
              vec: ["Accent", "2192"],
              dot: ["Accent", "02D9"],
              widetilde: ["Accent", "007E", 1],
              widehat: ["Accent", "005E", 1],
              matrix: "Matrix",
              array: "Matrix",
              pmatrix: ["Matrix", "(", ")"],
              cases: ["Matrix", "{", "", "left left", null, ".1em", null, !0],
              eqalign: [
                "Matrix",
                null,
                null,
                "right left",
                u.em(u.MATHSPACE.thickmathspace),
                ".5em",
                "D",
              ],
              displaylines: ["Matrix", null, null, "center", null, ".5em", "D"],
              cr: "Cr",
              "\\": "CrLaTeX",
              newline: ["CrLaTeX", !0],
              hline: ["HLine", "solid"],
              hdashline: ["HLine", "dashed"],
              eqalignno: [
                "Matrix",
                null,
                null,
                "right left",
                u.em(u.MATHSPACE.thickmathspace),
                ".5em",
                "D",
                null,
                "right",
              ],
              leqalignno: [
                "Matrix",
                null,
                null,
                "right left",
                u.em(u.MATHSPACE.thickmathspace),
                ".5em",
                "D",
                null,
                "left",
              ],
              hfill: "HFill",
              hfil: "HFill",
              hfilll: "HFill",
              bmod: [
                "Macro",
                '\\mmlToken{mo}[lspace="thickmathspace" rspace="thickmathspace"]{mod}',
              ],
              pmod: ["Macro", "\\pod{\\mmlToken{mi}{mod}\\kern 6mu #1}", 1],
              mod: [
                "Macro",
                "\\mathchoice{\\kern18mu}{\\kern12mu}{\\kern12mu}{\\kern12mu}\\mmlToken{mi}{mod}\\,\\,#1",
                1,
              ],
              pod: [
                "Macro",
                "\\mathchoice{\\kern18mu}{\\kern8mu}{\\kern8mu}{\\kern8mu}(#1)",
                1,
              ],
              iff: ["Macro", "\\;\\Longleftrightarrow\\;"],
              skew: ["Macro", "{{#2{#3\\mkern#1mu}\\mkern-#1mu}{}}", 3],
              pmb: ["Macro", "\\rlap{#1}\\kern1px{#1}", 1],
              TeX: ["Macro", "T\\kern-.14em\\lower.5ex{E}\\kern-.115em X"],
              LaTeX: [
                "Macro",
                "L\\kern-.325em\\raise.21em{\\scriptstyle{A}}\\kern-.17em\\TeX",
              ],
              " ": ["Macro", "\\text{ }"],
              not: "Not",
              dots: "Dots",
              space: "Tilde",
              "\xa0": "Tilde",
              begin: "BeginEnd",
              end: "BeginEnd",
              label: "HandleLabel",
              ref: "HandleRef",
              nonumber: "HandleNoTag",
              mathchoice: "MathChoice",
              mmlToken: "MmlToken",
            },
            o.default
          ),
          new n.EnvironmentMap(
            "environment",
            i.default.environment,
            {
              array: ["AlignedArray"],
              equation: ["Equation", null, !0],
              eqnarray: [
                "EqnArray",
                null,
                !0,
                !0,
                "rcl",
                s.default.cols(0, u.MATHSPACE.thickmathspace),
                ".5em",
              ],
            },
            o.default
          ),
          new n.CharacterMap("not_remap", null, {
            "\u2190": "\u219a",
            "\u2192": "\u219b",
            "\u2194": "\u21ae",
            "\u21d0": "\u21cd",
            "\u21d2": "\u21cf",
            "\u21d4": "\u21ce",
            "\u2208": "\u2209",
            "\u220b": "\u220c",
            "\u2223": "\u2224",
            "\u2225": "\u2226",
            "\u223c": "\u2241",
            "~": "\u2241",
            "\u2243": "\u2244",
            "\u2245": "\u2247",
            "\u2248": "\u2249",
            "\u224d": "\u226d",
            "=": "\u2260",
            "\u2261": "\u2262",
            "<": "\u226e",
            ">": "\u226f",
            "\u2264": "\u2270",
            "\u2265": "\u2271",
            "\u2272": "\u2274",
            "\u2273": "\u2275",
            "\u2276": "\u2278",
            "\u2277": "\u2279",
            "\u227a": "\u2280",
            "\u227b": "\u2281",
            "\u2282": "\u2284",
            "\u2283": "\u2285",
            "\u2286": "\u2288",
            "\u2287": "\u2289",
            "\u22a2": "\u22ac",
            "\u22a8": "\u22ad",
            "\u22a9": "\u22ae",
            "\u22ab": "\u22af",
            "\u227c": "\u22e0",
            "\u227d": "\u22e1",
            "\u2291": "\u22e2",
            "\u2292": "\u22e3",
            "\u22b2": "\u22ea",
            "\u22b3": "\u22eb",
            "\u22b4": "\u22ec",
            "\u22b5": "\u22ed",
            "\u2203": "\u2204",
          });
      },
      724: function (t, e, r) {
        var n =
            (this && this.__assign) ||
            function () {
              return (n =
                Object.assign ||
                function (t) {
                  for (var e, r = 1, n = arguments.length; r < n; r++)
                    for (var a in (e = arguments[r]))
                      Object.prototype.hasOwnProperty.call(e, a) &&
                        (t[a] = e[a]);
                  return t;
                }).apply(this, arguments);
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var o = r(8389),
          i = r(8321),
          s = r(3466),
          l = r(810),
          u = r(7007),
          c = r(7702),
          f = r(8921),
          h = r(7251),
          d = r(6914),
          p = r(9029),
          m = r(9077),
          g = {},
          y = {
            fontfamily: 1,
            fontsize: 1,
            fontweight: 1,
            fontstyle: 1,
            color: 1,
            background: 1,
            id: 1,
            class: 1,
            href: 1,
            style: 1,
          };
        function v(t, e) {
          var r = t.stack.env,
            n = r.inRoot;
          r.inRoot = !0;
          var a = new l.default(e, r, t.configuration),
            o = a.mml(),
            i = a.stack.global;
          if (i.leftRoot || i.upRoot) {
            var s = {};
            i.leftRoot && (s.width = i.leftRoot),
              i.upRoot && ((s.voffset = i.upRoot), (s.height = i.upRoot)),
              (o = t.create("node", "mpadded", [o], s));
          }
          return (r.inRoot = n), o;
        }
        (g.Open = function (t, e) {
          t.Push(t.itemFactory.create("open"));
        }),
          (g.Close = function (t, e) {
            t.Push(t.itemFactory.create("close"));
          }),
          (g.Tilde = function (t, e) {
            t.Push(t.create("token", "mtext", {}, p.entities.nbsp));
          }),
          (g.Space = function (t, e) {}),
          (g.Superscript = function (t, e) {
            var r, n, o;
            t.GetNext().match(/\d/) &&
              (t.string =
                t.string.substr(0, t.i + 1) + " " + t.string.substr(t.i + 1));
            var l = t.stack.Top();
            l.isKind("prime")
              ? ((o = (r = a(l.Peek(2), 2))[0]), (n = r[1]), t.stack.Pop())
              : (o = t.stack.Prev()) || (o = t.create("token", "mi", {}, ""));
            var u = i.default.getProperty(o, "movesupsub"),
              c = i.default.isType(o, "msubsup") ? o.sup : o.over;
            if (
              (i.default.isType(o, "msubsup") &&
                !i.default.isType(o, "msup") &&
                i.default.getChildAt(o, o.sup)) ||
              (i.default.isType(o, "munderover") &&
                !i.default.isType(o, "mover") &&
                i.default.getChildAt(o, o.over) &&
                !i.default.getProperty(o, "subsupOK"))
            )
              throw new s.default(
                "DoubleExponent",
                "Double exponent: use braces to clarify"
              );
            (i.default.isType(o, "msubsup") && !i.default.isType(o, "msup")) ||
              (u
                ? ((!i.default.isType(o, "munderover") ||
                    i.default.isType(o, "mover") ||
                    i.default.getChildAt(o, o.over)) &&
                    (o = t.create("node", "munderover", [o], {
                      movesupsub: !0,
                    })),
                  (c = o.over))
                : (c = (o = t.create("node", "msubsup", [o])).sup)),
              t.Push(
                t.itemFactory
                  .create("subsup", o)
                  .setProperties({ position: c, primes: n, movesupsub: u })
              );
          }),
          (g.Subscript = function (t, e) {
            var r, n, o;
            t.GetNext().match(/\d/) &&
              (t.string =
                t.string.substr(0, t.i + 1) + " " + t.string.substr(t.i + 1));
            var l = t.stack.Top();
            l.isKind("prime")
              ? ((o = (r = a(l.Peek(2), 2))[0]), (n = r[1]), t.stack.Pop())
              : (o = t.stack.Prev()) || (o = t.create("token", "mi", {}, ""));
            var u = i.default.getProperty(o, "movesupsub"),
              c = i.default.isType(o, "msubsup") ? o.sub : o.under;
            if (
              (i.default.isType(o, "msubsup") &&
                !i.default.isType(o, "msup") &&
                i.default.getChildAt(o, o.sub)) ||
              (i.default.isType(o, "munderover") &&
                !i.default.isType(o, "mover") &&
                i.default.getChildAt(o, o.under) &&
                !i.default.getProperty(o, "subsupOK"))
            )
              throw new s.default(
                "DoubleSubscripts",
                "Double subscripts: use braces to clarify"
              );
            (i.default.isType(o, "msubsup") && !i.default.isType(o, "msup")) ||
              (u
                ? ((!i.default.isType(o, "munderover") ||
                    i.default.isType(o, "mover") ||
                    i.default.getChildAt(o, o.under)) &&
                    (o = t.create("node", "munderover", [o], {
                      movesupsub: !0,
                    })),
                  (c = o.under))
                : (c = (o = t.create("node", "msubsup", [o])).sub)),
              t.Push(
                t.itemFactory
                  .create("subsup", o)
                  .setProperties({ position: c, primes: n, movesupsub: u })
              );
          }),
          (g.Prime = function (t, e) {
            var r = t.stack.Prev();
            if (
              (r || (r = t.create("node", "mi")),
              i.default.isType(r, "msubsup") &&
                !i.default.isType(r, "msup") &&
                i.default.getChildAt(r, r.sup))
            )
              throw new s.default(
                "DoubleExponentPrime",
                "Prime causes double exponent: use braces to clarify"
              );
            var n = "";
            t.i--;
            do {
              (n += p.entities.prime), t.i++, (e = t.GetNext());
            } while ("'" === e || e === p.entities.rsquo);
            n = ["", "\u2032", "\u2033", "\u2034", "\u2057"][n.length] || n;
            var a = t.create("token", "mo", { variantForm: !0 }, n);
            t.Push(t.itemFactory.create("prime", r, a));
          }),
          (g.Comment = function (t, e) {
            for (; t.i < t.string.length && "\n" !== t.string.charAt(t.i); )
              t.i++;
          }),
          (g.Hash = function (t, e) {
            throw new s.default(
              "CantUseHash1",
              "You can't use 'macro parameter character #' in math mode"
            );
          }),
          (g.MathFont = function (t, e, r) {
            var a = t.GetArgument(e),
              o = new l.default(
                a,
                n(n({}, t.stack.env), { font: r, multiLetterIdentifiers: !0 }),
                t.configuration
              ).mml();
            t.Push(t.create("node", "TeXAtom", [o]));
          }),
          (g.SetFont = function (t, e, r) {
            t.stack.env.font = r;
          }),
          (g.SetStyle = function (t, e, r, n, a) {
            (t.stack.env.style = r),
              (t.stack.env.level = a),
              t.Push(
                t.itemFactory
                  .create("style")
                  .setProperty("styles", { displaystyle: n, scriptlevel: a })
              );
          }),
          (g.SetSize = function (t, e, r) {
            (t.stack.env.size = r),
              t.Push(
                t.itemFactory
                  .create("style")
                  .setProperty("styles", { mathsize: d.em(r) })
              );
          }),
          (g.Spacer = function (t, e, r) {
            var n = t.create("node", "mspace", [], { width: d.em(r) }),
              a = t.create("node", "mstyle", [n], { scriptlevel: 0 });
            t.Push(a);
          }),
          (g.LeftRight = function (t, e) {
            var r = e.substr(1);
            t.Push(
              t.itemFactory.create(r, t.GetDelimiter(e), t.stack.env.color)
            );
          }),
          (g.NamedFn = function (t, e, r) {
            r || (r = e.substr(1));
            var n = t.create("token", "mi", { texClass: f.TEXCLASS.OP }, r);
            t.Push(t.itemFactory.create("fn", n));
          }),
          (g.NamedOp = function (t, e, r) {
            r || (r = e.substr(1)), (r = r.replace(/&thinsp;/, "\u2006"));
            var n = t.create(
              "token",
              "mo",
              {
                movablelimits: !0,
                movesupsub: !0,
                form: u.TexConstant.Form.PREFIX,
                texClass: f.TEXCLASS.OP,
              },
              r
            );
            t.Push(n);
          }),
          (g.Limits = function (t, e, r) {
            var n = t.stack.Prev(!0);
            if (
              !n ||
              (i.default.getTexClass(i.default.getCoreMO(n)) !==
                f.TEXCLASS.OP &&
                null == i.default.getProperty(n, "movesupsub"))
            )
              throw new s.default(
                "MisplacedLimits",
                "%1 is allowed only on operators",
                t.currentCS
              );
            var a,
              o = t.stack.Top();
            i.default.isType(n, "munderover") && !r
              ? ((a = t.create("node", "msubsup")),
                i.default.copyChildren(n, a),
                (n = o.Last = a))
              : i.default.isType(n, "msubsup") &&
                r &&
                ((a = t.create("node", "munderover")),
                i.default.copyChildren(n, a),
                (n = o.Last = a)),
              i.default.setProperty(n, "movesupsub", !!r),
              i.default.setProperties(i.default.getCoreMO(n), {
                movablelimits: !1,
              }),
              (i.default.getAttribute(n, "movablelimits") ||
                i.default.getProperty(n, "movablelimits")) &&
                i.default.setProperties(n, { movablelimits: !1 });
          }),
          (g.Over = function (t, e, r, n) {
            var a = t.itemFactory
              .create("over")
              .setProperty("name", t.currentCS);
            r || n
              ? (a.setProperty("open", r), a.setProperty("close", n))
              : e.match(/withdelims$/) &&
                (a.setProperty("open", t.GetDelimiter(e)),
                a.setProperty("close", t.GetDelimiter(e))),
              e.match(/^\\above/)
                ? a.setProperty("thickness", t.GetDimen(e))
                : (e.match(/^\\atop/) || r || n) &&
                  a.setProperty("thickness", 0),
              t.Push(a);
          }),
          (g.Frac = function (t, e) {
            var r = t.ParseArg(e),
              n = t.ParseArg(e),
              a = t.create("node", "mfrac", [r, n]);
            t.Push(a);
          }),
          (g.Sqrt = function (t, e) {
            var r = t.GetBrackets(e),
              n = t.GetArgument(e);
            "\\frac" === n &&
              (n += "{" + t.GetArgument(n) + "}{" + t.GetArgument(n) + "}");
            var a = new l.default(n, t.stack.env, t.configuration).mml();
            (a = r
              ? t.create("node", "mroot", [a, v(t, r)])
              : t.create("node", "msqrt", [a])),
              t.Push(a);
          }),
          (g.Root = function (t, e) {
            var r = t.GetUpTo(e, "\\of"),
              n = t.ParseArg(e),
              a = t.create("node", "mroot", [n, v(t, r)]);
            t.Push(a);
          }),
          (g.MoveRoot = function (t, e, r) {
            if (!t.stack.env.inRoot)
              throw new s.default(
                "MisplacedMoveRoot",
                "%1 can appear only within a root",
                t.currentCS
              );
            if (t.stack.global[r])
              throw new s.default(
                "MultipleMoveRoot",
                "Multiple use of %1",
                t.currentCS
              );
            var n = t.GetArgument(e);
            if (!n.match(/-?[0-9]+/))
              throw new s.default(
                "IntegerArg",
                "The argument to %1 must be an integer",
                t.currentCS
              );
            "-" !== (n = parseInt(n, 10) / 15 + "em").substr(0, 1) &&
              (n = "+" + n),
              (t.stack.global[r] = n);
          }),
          (g.Accent = function (t, e, r, a) {
            var o = t.ParseArg(e),
              s = n(n({}, c.default.getFontDef(t)), {
                accent: !0,
                mathaccent: !0,
              }),
              l = i.default.createEntity(r),
              u = t.create("token", "mo", s, l);
            i.default.setAttribute(u, "stretchy", !!a);
            var f = i.default.isEmbellished(o) ? i.default.getCoreMO(o) : o;
            i.default.isType(f, "mo") &&
              i.default.setProperties(f, { movablelimits: !1 });
            var h = t.create("node", "munderover");
            i.default.setChild(h, 0, o),
              i.default.setChild(h, 1, null),
              i.default.setChild(h, 2, u);
            var d = t.create("node", "TeXAtom", [h]);
            t.Push(d);
          }),
          (g.UnderOver = function (t, e, r, n) {
            var a = i.default.createEntity(r),
              o = t.create("token", "mo", { stretchy: !0, accent: !0 }, a),
              s = "o" === e.charAt(1) ? "over" : "under",
              l = t.ParseArg(e);
            t.Push(c.default.underOver(t, l, o, s, n));
          }),
          (g.Overset = function (t, e) {
            var r = t.ParseArg(e),
              n = t.ParseArg(e);
            c.default.checkMovableLimits(n);
            var a = t.create("node", "mover", [n, r]);
            t.Push(a);
          }),
          (g.Underset = function (t, e) {
            var r = t.ParseArg(e),
              n = t.ParseArg(e);
            c.default.checkMovableLimits(n);
            var a = t.create("node", "munder", [n, r]);
            t.Push(a);
          }),
          (g.Overunderset = function (t, e) {
            var r = t.ParseArg(e),
              n = t.ParseArg(e),
              a = t.ParseArg(e);
            c.default.checkMovableLimits(a);
            var o = t.create("node", "munderover", [a, n, r]);
            t.Push(o);
          }),
          (g.TeXAtom = function (t, e, r) {
            var n,
              a,
              o,
              i = { texClass: r };
            if (r === f.TEXCLASS.OP) {
              i.movesupsub = i.movablelimits = !0;
              var s = t.GetArgument(e),
                c = s.match(/^\s*\\rm\s+([a-zA-Z0-9 ]+)$/);
              c
                ? ((i.mathvariant = u.TexConstant.Variant.NORMAL),
                  (a = t.create("token", "mi", i, c[1])))
                : ((o = new l.default(s, t.stack.env, t.configuration).mml()),
                  (a = t.create("node", "TeXAtom", [o], i))),
                (n = t.itemFactory.create("fn", a));
            } else
              (o = t.ParseArg(e)), (n = t.create("node", "TeXAtom", [o], i));
            t.Push(n);
          }),
          (g.MmlToken = function (t, e) {
            var r,
              n = t.GetArgument(e),
              a = t.GetBrackets(e, "").replace(/^\s+/, ""),
              o = t.GetArgument(e),
              l = {};
            try {
              r = t.create("node", n);
            } catch (t) {
              r = null;
            }
            if (!r || !r.isToken)
              throw new s.default(
                "NotMathMLToken",
                "%1 is not a token element",
                n
              );
            for (; "" !== a; ) {
              var u = a.match(
                /^([a-z]+)\s*=\s*('[^']*'|"[^"]*"|[^ ,]*)\s*,?\s*/i
              );
              if (!u)
                throw new s.default(
                  "InvalidMathMLAttr",
                  "Invalid MathML attribute: %1",
                  a
                );
              if (!r.attributes.hasDefault(u[1]) && !y[u[1]])
                throw new s.default(
                  "UnknownAttrForElement",
                  "%1 is not a recognized attribute for %2",
                  u[1],
                  n
                );
              var f = c.default.MmlFilterAttribute(
                t,
                u[1],
                u[2].replace(/^(['"])(.*)\1$/, "$2")
              );
              f &&
                ("true" === f.toLowerCase()
                  ? (f = !0)
                  : "false" === f.toLowerCase() && (f = !1),
                (l[u[1]] = f)),
                (a = a.substr(u[0].length));
            }
            var h = t.create("text", o);
            r.appendChild(h), i.default.setProperties(r, l), t.Push(r);
          }),
          (g.Strut = function (t, e) {
            var r = t.create("node", "mrow"),
              n = t.create("node", "mpadded", [r], {
                height: "8.6pt",
                depth: "3pt",
                width: 0,
              });
            t.Push(n);
          }),
          (g.Phantom = function (t, e, r, n) {
            var a = t.create("node", "mphantom", [t.ParseArg(e)]);
            (r || n) &&
              ((a = t.create("node", "mpadded", [a])),
              n &&
                (i.default.setAttribute(a, "height", 0),
                i.default.setAttribute(a, "depth", 0)),
              r && i.default.setAttribute(a, "width", 0));
            var o = t.create("node", "TeXAtom", [a]);
            t.Push(o);
          }),
          (g.Smash = function (t, e) {
            var r = c.default.trimSpaces(t.GetBrackets(e, "")),
              n = t.create("node", "mpadded", [t.ParseArg(e)]);
            switch (r) {
              case "b":
                i.default.setAttribute(n, "depth", 0);
                break;
              case "t":
                i.default.setAttribute(n, "height", 0);
                break;
              default:
                i.default.setAttribute(n, "height", 0),
                  i.default.setAttribute(n, "depth", 0);
            }
            var a = t.create("node", "TeXAtom", [n]);
            t.Push(a);
          }),
          (g.Lap = function (t, e) {
            var r = t.create("node", "mpadded", [t.ParseArg(e)], { width: 0 });
            "\\llap" === e && i.default.setAttribute(r, "lspace", "-1width");
            var n = t.create("node", "TeXAtom", [r]);
            t.Push(n);
          }),
          (g.RaiseLower = function (t, e) {
            var r = t.GetDimen(e),
              n = t.itemFactory
                .create("position")
                .setProperties({ name: t.currentCS, move: "vertical" });
            "-" === r.charAt(0) &&
              ((r = r.slice(1)),
              (e = "raise" === e.substr(1) ? "\\lower" : "\\raise")),
              "\\lower" === e
                ? (n.setProperty("dh", "-" + r), n.setProperty("dd", "+" + r))
                : (n.setProperty("dh", "+" + r), n.setProperty("dd", "-" + r)),
              t.Push(n);
          }),
          (g.MoveLeftRight = function (t, e) {
            var r = t.GetDimen(e),
              n = "-" === r.charAt(0) ? r.slice(1) : "-" + r;
            if ("\\moveleft" === e) {
              var a = r;
              (r = n), (n = a);
            }
            t.Push(
              t.itemFactory
                .create("position")
                .setProperties({
                  name: t.currentCS,
                  move: "horizontal",
                  left: t.create("node", "mspace", [], { width: r }),
                  right: t.create("node", "mspace", [], { width: n }),
                })
            );
          }),
          (g.Hskip = function (t, e) {
            var r = t.create("node", "mspace", [], { width: t.GetDimen(e) });
            t.Push(r);
          }),
          (g.Nonscript = function (t, e) {
            t.Push(t.itemFactory.create("nonscript"));
          }),
          (g.Rule = function (t, e, r) {
            var n = {
              width: t.GetDimen(e),
              height: t.GetDimen(e),
              depth: t.GetDimen(e),
            };
            "blank" !== r && (n.mathbackground = t.stack.env.color || "black");
            var a = t.create("node", "mspace", [], n);
            t.Push(a);
          }),
          (g.rule = function (t, e) {
            var r = t.GetBrackets(e),
              n = t.GetDimen(e),
              a = t.GetDimen(e),
              o = t.create("node", "mspace", [], {
                width: n,
                height: a,
                mathbackground: t.stack.env.color || "black",
              });
            r &&
              ((o = t.create("node", "mpadded", [o], { voffset: r })),
              r.match(/^\-/)
                ? (i.default.setAttribute(o, "height", r),
                  i.default.setAttribute(o, "depth", "+" + r.substr(1)))
                : i.default.setAttribute(o, "height", "+" + r)),
              t.Push(o);
          }),
          (g.MakeBig = function (t, e, r, n) {
            var a =
                String((n *= 1.411764705882353)).replace(/(\.\d\d\d).+/, "$1") +
                "em",
              o = t.GetDelimiter(e, !0),
              i = t.create(
                "token",
                "mo",
                {
                  minsize: a,
                  maxsize: a,
                  fence: !0,
                  stretchy: !0,
                  symmetric: !0,
                },
                o
              ),
              s = t.create("node", "TeXAtom", [i], { texClass: r });
            t.Push(s);
          }),
          (g.BuildRel = function (t, e) {
            var r = t.ParseUpTo(e, "\\over"),
              n = t.ParseArg(e),
              a = t.create("node", "munderover");
            i.default.setChild(a, 0, n),
              i.default.setChild(a, 1, null),
              i.default.setChild(a, 2, r);
            var o = t.create("node", "TeXAtom", [a], {
              texClass: f.TEXCLASS.REL,
            });
            t.Push(o);
          }),
          (g.HBox = function (t, e, r, n) {
            t.PushAll(c.default.internalMath(t, t.GetArgument(e), r, n));
          }),
          (g.FBox = function (t, e) {
            var r = c.default.internalMath(t, t.GetArgument(e)),
              n = t.create("node", "menclose", r, { notation: "box" });
            t.Push(n);
          }),
          (g.FrameBox = function (t, e) {
            var r = t.GetBrackets(e),
              n = t.GetBrackets(e) || "c",
              a = c.default.internalMath(t, t.GetArgument(e));
            r &&
              (a = [
                t.create("node", "mpadded", a, {
                  width: r,
                  "data-align": m.lookup(
                    n,
                    { l: "left", r: "right" },
                    "center"
                  ),
                }),
              ]);
            var o = t.create(
              "node",
              "TeXAtom",
              [t.create("node", "menclose", a, { notation: "box" })],
              { texClass: f.TEXCLASS.ORD }
            );
            t.Push(o);
          }),
          (g.Not = function (t, e) {
            t.Push(t.itemFactory.create("not"));
          }),
          (g.Dots = function (t, e) {
            var r = i.default.createEntity("2026"),
              n = i.default.createEntity("22EF"),
              a = t.create("token", "mo", { stretchy: !1 }, r),
              o = t.create("token", "mo", { stretchy: !1 }, n);
            t.Push(
              t.itemFactory.create("dots").setProperties({ ldots: a, cdots: o })
            );
          }),
          (g.Matrix = function (t, e, r, n, a, o, i, l, u, c) {
            var f = t.GetNext();
            if ("" === f)
              throw new s.default(
                "MissingArgFor",
                "Missing argument for %1",
                t.currentCS
              );
            "{" === f
              ? t.i++
              : ((t.string = f + "}" + t.string.slice(t.i + 1)), (t.i = 0));
            var h = t.itemFactory
              .create("array")
              .setProperty("requireClose", !0);
            (h.arraydef = {
              rowspacing: i || "4pt",
              columnspacing: o || "1em",
            }),
              u && h.setProperty("isCases", !0),
              c && (h.setProperty("isNumbered", !0), (h.arraydef.side = c)),
              (r || n) && (h.setProperty("open", r), h.setProperty("close", n)),
              "D" === l && (h.arraydef.displaystyle = !0),
              null != a && (h.arraydef.columnalign = a),
              t.Push(h);
          }),
          (g.Entry = function (t, e) {
            t.Push(
              t.itemFactory
                .create("cell")
                .setProperties({ isEntry: !0, name: e })
            );
            var r = t.stack.Top(),
              n = r.getProperty("casesEnv");
            if (r.getProperty("isCases") || n) {
              for (
                var a = t.string,
                  o = 0,
                  i = -1,
                  l = t.i,
                  u = a.length,
                  f = n
                    ? new RegExp(
                        "^\\\\end\\s*\\{" + n.replace(/\*/, "\\*") + "\\}"
                      )
                    : null;
                l < u;

              ) {
                var h = a.charAt(l);
                if ("{" === h) o++, l++;
                else if ("}" === h)
                  0 === o
                    ? (u = 0)
                    : (0 === --o && i < 0 && (i = l - t.i), l++);
                else {
                  if ("&" === h && 0 === o)
                    throw new s.default(
                      "ExtraAlignTab",
                      "Extra alignment tab in \\cases text"
                    );
                  if ("\\" === h) {
                    var d = a.substr(l);
                    d.match(/^((\\cr)[^a-zA-Z]|\\\\)/) || (f && d.match(f))
                      ? (u = 0)
                      : (l += 2);
                  } else l++;
                }
              }
              var p = a.substr(t.i, l - t.i);
              if (
                !p.match(/^\s*\\text[^a-zA-Z]/) ||
                i !== p.replace(/\s+$/, "").length - 1
              ) {
                var m = c.default.internalMath(t, c.default.trimSpaces(p), 0);
                t.PushAll(m), (t.i = l);
              }
            }
          }),
          (g.Cr = function (t, e) {
            t.Push(
              t.itemFactory.create("cell").setProperties({ isCR: !0, name: e })
            );
          }),
          (g.CrLaTeX = function (t, e, r) {
            var n;
            if (
              (void 0 === r && (r = !1),
              !r &&
                ("*" === t.string.charAt(t.i) && t.i++,
                "[" === t.string.charAt(t.i)))
            ) {
              var i = t.GetBrackets(e, ""),
                l = a(c.default.matchDimen(i), 2),
                f = l[0],
                h = l[1];
              if (i && !f)
                throw new s.default(
                  "BracketMustBeDimension",
                  "Bracket argument to %1 must be a dimension",
                  t.currentCS
                );
              n = f + h;
            }
            t.Push(
              t.itemFactory
                .create("cell")
                .setProperties({ isCR: !0, name: e, linebreak: !0 })
            );
            var d,
              p = t.stack.Top();
            p instanceof o.ArrayItem
              ? n && p.addRowSpacing(n)
              : (n &&
                  ((d = t.create("node", "mspace", [], { depth: n })),
                  t.Push(d)),
                (d = t.create("node", "mspace", [], {
                  linebreak: u.TexConstant.LineBreak.NEWLINE,
                })),
                t.Push(d));
          }),
          (g.HLine = function (t, e, r) {
            null == r && (r = "solid");
            var n = t.stack.Top();
            if (!(n instanceof o.ArrayItem) || n.Size())
              throw new s.default("Misplaced", "Misplaced %1", t.currentCS);
            if (n.table.length) {
              for (
                var a = n.arraydef.rowlines
                  ? n.arraydef.rowlines.split(/ /)
                  : [];
                a.length < n.table.length;

              )
                a.push("none");
              (a[n.table.length - 1] = r), (n.arraydef.rowlines = a.join(" "));
            } else n.frame.push("top");
          }),
          (g.HFill = function (t, e) {
            var r = t.stack.Top();
            if (!(r instanceof o.ArrayItem))
              throw new s.default(
                "UnsupportedHFill",
                "Unsupported use of %1",
                t.currentCS
              );
            r.hfill.push(r.Size());
          }),
          (g.BeginEnd = function (t, e) {
            var r = t.GetArgument(e);
            if (r.match(/\\/i))
              throw new s.default(
                "InvalidEnv",
                "Invalid environment name '%1'",
                r
              );
            var n = t.configuration.handlers.get("environment").lookup(r);
            if (n && "\\end" === e) {
              if (!n.args[0]) {
                var a = t.itemFactory.create("end").setProperty("name", r);
                return void t.Push(a);
              }
              t.stack.env.closing = r;
            }
            c.default.checkMaxMacros(t, !1), t.parse("environment", [t, r]);
          }),
          (g.Array = function (t, e, r, n, a, o, i, s, l) {
            a || (a = t.GetArgument("\\begin{" + e.getName() + "}"));
            var u = ("c" + a)
              .replace(/[^clr|:]/g, "")
              .replace(/[^|:]([|:])+/g, "$1");
            a = (a = a
              .replace(/[^clr]/g, "")
              .split("")
              .join(" "))
              .replace(/l/g, "left")
              .replace(/r/g, "right")
              .replace(/c/g, "center");
            var c = t.itemFactory.create("array");
            return (
              (c.arraydef = {
                columnalign: a,
                columnspacing: o || "1em",
                rowspacing: i || "4pt",
              }),
              u.match(/[|:]/) &&
                (u.charAt(0).match(/[|:]/) &&
                  (c.frame.push("left"), (c.dashed = ":" === u.charAt(0))),
                u.charAt(u.length - 1).match(/[|:]/) && c.frame.push("right"),
                (u = u.substr(1, u.length - 2)),
                (c.arraydef.columnlines = u
                  .split("")
                  .join(" ")
                  .replace(/[^|: ]/g, "none")
                  .replace(/\|/g, "solid")
                  .replace(/:/g, "dashed"))),
              r && c.setProperty("open", t.convertDelimiter(r)),
              n && c.setProperty("close", t.convertDelimiter(n)),
              "'" === (s || "").charAt(1) &&
                ((c.arraydef["data-cramped"] = !0), (s = s.charAt(0))),
              "D" === s
                ? (c.arraydef.displaystyle = !0)
                : s && (c.arraydef.displaystyle = !1),
              "S" === s && (c.arraydef.scriptlevel = 1),
              l && (c.arraydef.useHeight = !1),
              t.Push(e),
              c
            );
          }),
          (g.AlignedArray = function (t, e) {
            var r = t.GetBrackets("\\begin{" + e.getName() + "}"),
              n = g.Array(t, e);
            return c.default.setArrayAlign(n, r);
          }),
          (g.Equation = function (t, e, r) {
            return (
              t.Push(e),
              c.default.checkEqnEnv(t),
              t.itemFactory
                .create("equation", r)
                .setProperty("name", e.getName())
            );
          }),
          (g.EqnArray = function (t, e, r, n, a, o) {
            t.Push(e),
              n && c.default.checkEqnEnv(t),
              (a = (a = a
                .replace(/[^clr]/g, "")
                .split("")
                .join(" "))
                .replace(/l/g, "left")
                .replace(/r/g, "right")
                .replace(/c/g, "center"));
            var i = t.itemFactory.create(
              "eqnarray",
              e.getName(),
              r,
              n,
              t.stack.global
            );
            return (
              (i.arraydef = {
                displaystyle: !0,
                columnalign: a,
                columnspacing: o || "1em",
                rowspacing: "3pt",
                side: t.options.tagSide,
                minlabelspacing: t.options.tagIndent,
              }),
              i
            );
          }),
          (g.HandleNoTag = function (t, e) {
            t.tags.notag();
          }),
          (g.HandleLabel = function (t, e) {
            var r = t.GetArgument(e);
            if ("" !== r && !t.tags.refUpdate) {
              if (t.tags.label)
                throw new s.default(
                  "MultipleCommand",
                  "Multiple %1",
                  t.currentCS
                );
              if (
                ((t.tags.label = r),
                (t.tags.allLabels[r] || t.tags.labels[r]) &&
                  !t.options.ignoreDuplicateLabels)
              )
                throw new s.default(
                  "MultipleLabel",
                  "Label '%1' multiply defined",
                  r
                );
              t.tags.labels[r] = new h.Label();
            }
          }),
          (g.HandleRef = function (t, e, r) {
            var n = t.GetArgument(e),
              a = t.tags.allLabels[n] || t.tags.labels[n];
            a || (t.tags.refUpdate || (t.tags.redo = !0), (a = new h.Label()));
            var o = a.tag;
            r && (o = t.tags.formatTag(o));
            var i = t.create("node", "mrow", c.default.internalMath(t, o), {
              href: t.tags.formatUrl(a.id, t.options.baseURL),
              class: "MathJax_ref",
            });
            t.Push(i);
          }),
          (g.Macro = function (t, e, r, n, a) {
            if (n) {
              var o = [];
              if (null != a) {
                var i = t.GetBrackets(e);
                o.push(null == i ? a : i);
              }
              for (var s = o.length; s < n; s++) o.push(t.GetArgument(e));
              r = c.default.substituteArgs(t, o, r);
            }
            (t.string = c.default.addArgs(t, r, t.string.slice(t.i))),
              (t.i = 0),
              c.default.checkMaxMacros(t);
          }),
          (g.MathChoice = function (t, e) {
            var r = t.ParseArg(e),
              n = t.ParseArg(e),
              a = t.ParseArg(e),
              o = t.ParseArg(e);
            t.Push(t.create("node", "MathChoice", [r, n, a, o]));
          }),
          (e.default = g);
      },
      3274: function (t, e, r) {
        var n,
          a =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ConfigMacrosConfiguration = void 0);
        var o = r(6552),
          i = r(9077),
          s = r(7628),
          l = r(4708),
          u = r(4237),
          c = r(8562),
          f = r(6706),
          h = "configmacros-map",
          d = "configmacros-env-map";
        e.ConfigMacrosConfiguration = o.Configuration.create("configmacros", {
          init: function (t) {
            new s.CommandMap(h, {}, {}),
              new s.EnvironmentMap(d, l.default.environment, {}, {}),
              t.append(
                o.Configuration.local({
                  handler: { macro: [h], environment: [d] },
                  priority: 3,
                })
              );
          },
          config: function (t, e) {
            !(function (t) {
              var e,
                r,
                n = t.parseOptions.handlers.retrieve(h),
                o = t.parseOptions.options.macros;
              try {
                for (
                  var i = a(Object.keys(o)), s = i.next();
                  !s.done;
                  s = i.next()
                ) {
                  var l = s.value,
                    f = "string" == typeof o[l] ? [o[l]] : o[l],
                    d = Array.isArray(f[2])
                      ? new u.Macro(
                          l,
                          c.default.MacroWithTemplate,
                          f.slice(0, 2).concat(f[2])
                        )
                      : new u.Macro(l, c.default.Macro, f);
                  n.add(l, d);
                }
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  s && !s.done && (r = i.return) && r.call(i);
                } finally {
                  if (e) throw e.error;
                }
              }
            })(e),
              (function (t) {
                var e,
                  r,
                  n = t.parseOptions.handlers.retrieve(d),
                  o = t.parseOptions.options.environments;
                try {
                  for (
                    var i = a(Object.keys(o)), s = i.next();
                    !s.done;
                    s = i.next()
                  ) {
                    var l = s.value;
                    n.add(
                      l,
                      new u.Macro(l, c.default.BeginEnv, [!0].concat(o[l]))
                    );
                  }
                } catch (t) {
                  e = { error: t };
                } finally {
                  try {
                    s && !s.done && (r = i.return) && r.call(i);
                  } finally {
                    if (e) throw e.error;
                  }
                }
              })(e);
          },
          items:
            ((n = {}), (n[f.BeginEnvItem.prototype.kind] = f.BeginEnvItem), n),
          options: { macros: i.expandable({}), environments: i.expandable({}) },
        });
      },
      2200: function (t, e, r) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NewcommandConfiguration = void 0);
        var a = r(6552),
          o = r(6706),
          i = r(5282);
        r(6823);
        var s = r(4708),
          l = r(7628);
        e.NewcommandConfiguration = a.Configuration.create("newcommand", {
          handler: { macro: ["Newcommand-macros"] },
          items:
            ((n = {}), (n[o.BeginEnvItem.prototype.kind] = o.BeginEnvItem), n),
          options: { maxMacros: 1e3 },
          init: function (t) {
            new l.DelimiterMap(
              i.default.NEW_DELIMITER,
              s.default.delimiter,
              {}
            ),
              new l.CommandMap(i.default.NEW_COMMAND, {}, {}),
              new l.EnvironmentMap(
                i.default.NEW_ENVIRONMENT,
                s.default.environment,
                {},
                {}
              ),
              t.append(
                a.Configuration.local({
                  handler: {
                    character: [],
                    delimiter: [i.default.NEW_DELIMITER],
                    macro: [i.default.NEW_DELIMITER, i.default.NEW_COMMAND],
                    environment: [i.default.NEW_ENVIRONMENT],
                  },
                  priority: -1,
                })
              );
          },
        });
      },
      6706: function (t, e, r) {
        var n,
          a =
            (this && this.__extends) ||
            ((n = function (t, e) {
              return (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                })(t, e);
            }),
            function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Class extends value " +
                    String(e) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BeginEnvItem = void 0);
        var o = r(3466),
          i = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "beginEnv";
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "isOpen", {
                get: function () {
                  return !0;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.checkItem = function (e) {
                if (e.isKind("end")) {
                  if (e.getName() !== this.getName())
                    throw new o.default(
                      "EnvBadEnd",
                      "\\begin{%1} ended with \\end{%2}",
                      this.getName(),
                      e.getName()
                    );
                  return [[this.factory.create("mml", this.toMml())], !0];
                }
                if (e.isKind("stop"))
                  throw new o.default(
                    "EnvMissingEnd",
                    "Missing \\end{%1}",
                    this.getName()
                  );
                return t.prototype.checkItem.call(this, e);
              }),
              e
            );
          })(r(7044).BaseItem);
        e.BeginEnvItem = i;
      },
      6823: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(8562);
        new (r(7628).CommandMap)(
          "Newcommand-macros",
          {
            newcommand: "NewCommand",
            renewcommand: "NewCommand",
            newenvironment: "NewEnvironment",
            renewenvironment: "NewEnvironment",
            def: "MacroDef",
            let: "Let",
          },
          n.default
        );
      },
      8562: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(3466),
          a = r(7628),
          o = r(724),
          i = r(7702),
          s = r(5282),
          l = {
            NewCommand: function (t, e) {
              var r = s.default.GetCsNameArgument(t, e),
                n = s.default.GetArgCount(t, e),
                a = t.GetBrackets(e),
                o = t.GetArgument(e);
              s.default.addMacro(t, r, l.Macro, [o, n, a]);
            },
            NewEnvironment: function (t, e) {
              var r = i.default.trimSpaces(t.GetArgument(e)),
                n = s.default.GetArgCount(t, e),
                a = t.GetBrackets(e),
                o = t.GetArgument(e),
                u = t.GetArgument(e);
              s.default.addEnvironment(t, r, l.BeginEnv, [!0, o, u, n, a]);
            },
            MacroDef: function (t, e) {
              var r = s.default.GetCSname(t, e),
                n = s.default.GetTemplate(t, e, "\\" + r),
                a = t.GetArgument(e);
              n instanceof Array
                ? s.default.addMacro(t, r, l.MacroWithTemplate, [a].concat(n))
                : s.default.addMacro(t, r, l.Macro, [a, n]);
            },
            Let: function (t, e) {
              var r = s.default.GetCSname(t, e),
                n = t.GetNext();
              "=" === n && (t.i++, (n = t.GetNext()));
              var o = t.configuration.handlers;
              if ("\\" !== n) {
                t.i++;
                var i = o.get("delimiter").lookup(n);
                i
                  ? s.default.addDelimiter(t, "\\" + r, i.char, i.attributes)
                  : s.default.addMacro(t, r, l.Macro, [n]);
              } else {
                e = s.default.GetCSname(t, e);
                var u = o.get("delimiter").lookup("\\" + e);
                if (u)
                  return void s.default.addDelimiter(
                    t,
                    "\\" + r,
                    u.char,
                    u.attributes
                  );
                var c = o.get("macro").applicable(e);
                if (!c) return;
                if (c instanceof a.MacroMap) {
                  var f = c.lookup(e);
                  return void s.default.addMacro(
                    t,
                    r,
                    f.func,
                    f.args,
                    f.symbol
                  );
                }
                u = c.lookup(e);
                var h = s.default.disassembleSymbol(r, u);
                s.default.addMacro(
                  t,
                  r,
                  function (t, e) {
                    for (var r = [], n = 2; n < arguments.length; n++)
                      r[n - 2] = arguments[n];
                    var a = s.default.assembleSymbol(r);
                    return c.parser(t, a);
                  },
                  h
                );
              }
            },
            MacroWithTemplate: function (t, e, r, a) {
              for (var o = [], l = 4; l < arguments.length; l++)
                o[l - 4] = arguments[l];
              var u = parseInt(a, 10);
              if (u) {
                var c = [];
                if ((t.GetNext(), o[0] && !s.default.MatchParam(t, o[0])))
                  throw new n.default(
                    "MismatchUseDef",
                    "Use of %1 doesn't match its definition",
                    e
                  );
                for (var f = 0; f < u; f++)
                  c.push(s.default.GetParameter(t, e, o[f + 1]));
                r = i.default.substituteArgs(t, c, r);
              }
              (t.string = i.default.addArgs(t, r, t.string.slice(t.i))),
                (t.i = 0),
                i.default.checkMaxMacros(t);
            },
            BeginEnv: function (t, e, r, n, a, o) {
              if (e.getProperty("end") && t.stack.env.closing === e.getName()) {
                delete t.stack.env.closing;
                var s = t.string.slice(t.i);
                return (
                  (t.string = n),
                  (t.i = 0),
                  t.Parse(),
                  (t.string = s),
                  (t.i = 0),
                  t.itemFactory.create("end").setProperty("name", e.getName())
                );
              }
              if (a) {
                var l = [];
                if (null != o) {
                  var u = t.GetBrackets("\\begin{" + e.getName() + "}");
                  l.push(null == u ? o : u);
                }
                for (var c = l.length; c < a; c++)
                  l.push(t.GetArgument("\\begin{" + e.getName() + "}"));
                (r = i.default.substituteArgs(t, l, r)),
                  (n = i.default.substituteArgs(t, [], n));
              }
              return (
                (t.string = i.default.addArgs(t, r, t.string.slice(t.i))),
                (t.i = 0),
                t.itemFactory
                  .create("beginEnv")
                  .setProperty("name", e.getName())
              );
            },
          };
        (l.Macro = o.default.Macro), (e.default = l);
      },
      5282: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n,
          a = r(7702),
          o = r(3466),
          i = r(4237);
        !(function (t) {
          function e(t, e) {
            return t.string.substr(t.i, e.length) !== e ||
              (e.match(/\\[a-z]+$/i) &&
                t.string.charAt(t.i + e.length).match(/[a-z]/i))
              ? 0
              : ((t.i += e.length), 1);
          }
          (t.disassembleSymbol = function (t, e) {
            var r = [t, e.char];
            if (e.attributes)
              for (var n in e.attributes) r.push(n), r.push(e.attributes[n]);
            return r;
          }),
            (t.assembleSymbol = function (t) {
              for (var e = t[0], r = t[1], n = {}, a = 2; a < t.length; a += 2)
                n[t[a]] = t[a + 1];
              return new i.Symbol(e, r, n);
            }),
            (t.GetCSname = function (t, e) {
              if ("\\" !== t.GetNext())
                throw new o.default(
                  "MissingCS",
                  "%1 must be followed by a control sequence",
                  e
                );
              return a.default.trimSpaces(t.GetArgument(e)).substr(1);
            }),
            (t.GetCsNameArgument = function (t, e) {
              var r = a.default.trimSpaces(t.GetArgument(e));
              if (
                ("\\" === r.charAt(0) && (r = r.substr(1)),
                !r.match(/^(.|[a-z]+)$/i))
              )
                throw new o.default(
                  "IllegalControlSequenceName",
                  "Illegal control sequence name for %1",
                  e
                );
              return r;
            }),
            (t.GetArgCount = function (t, e) {
              var r = t.GetBrackets(e);
              if (r && !(r = a.default.trimSpaces(r)).match(/^[0-9]+$/))
                throw new o.default(
                  "IllegalParamNumber",
                  "Illegal number of parameters specified in %1",
                  e
                );
              return r;
            }),
            (t.GetTemplate = function (t, e, r) {
              for (
                var n = t.GetNext(), a = [], i = 0, s = t.i;
                t.i < t.string.length;

              ) {
                if ("#" === (n = t.GetNext())) {
                  if (
                    (s !== t.i && (a[i] = t.string.substr(s, t.i - s)),
                    !(n = t.string.charAt(++t.i)).match(/^[1-9]$/))
                  )
                    throw new o.default(
                      "CantUseHash2",
                      "Illegal use of # in template for %1",
                      r
                    );
                  if (parseInt(n) !== ++i)
                    throw new o.default(
                      "SequentialParam",
                      "Parameters for %1 must be numbered sequentially",
                      r
                    );
                  s = t.i + 1;
                } else if ("{" === n)
                  return (
                    s !== t.i && (a[i] = t.string.substr(s, t.i - s)),
                    a.length > 0 ? [i.toString()].concat(a) : i
                  );
                t.i++;
              }
              throw new o.default(
                "MissingReplacementString",
                "Missing replacement string for definition of %1",
                e
              );
            }),
            (t.GetParameter = function (t, r, n) {
              if (null == n) return t.GetArgument(r);
              for (var a = t.i, i = 0, s = 0; t.i < t.string.length; ) {
                var l = t.string.charAt(t.i);
                if ("{" === l)
                  t.i === a && (s = 1), t.GetArgument(r), (i = t.i - a);
                else {
                  if (e(t, n))
                    return s && (a++, (i -= 2)), t.string.substr(a, i);
                  if ("\\" === l) {
                    t.i++, i++, (s = 0);
                    var u = t.string.substr(t.i).match(/[a-z]+|./i);
                    u && ((t.i += u[0].length), (i = t.i - a));
                  } else t.i++, i++, (s = 0);
                }
              }
              throw new o.default(
                "RunawayArgument",
                "Runaway argument for %1?",
                r
              );
            }),
            (t.MatchParam = e),
            (t.addDelimiter = function (e, r, n, a) {
              e.configuration.handlers
                .retrieve(t.NEW_DELIMITER)
                .add(r, new i.Symbol(r, n, a));
            }),
            (t.addMacro = function (e, r, n, a, o) {
              void 0 === o && (o = ""),
                e.configuration.handlers
                  .retrieve(t.NEW_COMMAND)
                  .add(r, new i.Macro(o || r, n, a));
            }),
            (t.addEnvironment = function (e, r, n, a) {
              e.configuration.handlers
                .retrieve(t.NEW_ENVIRONMENT)
                .add(r, new i.Macro(r, n, a));
            }),
            (t.NEW_DELIMITER = "new-Delimiter"),
            (t.NEW_COMMAND = "new-Command"),
            (t.NEW_ENVIRONMENT = "new-Environment");
        })(n || (n = {})),
          (e.default = n);
      },
      8405: function (t, e, r) {
        var n =
          (this && this.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              r = e && t[e],
              n = 0;
            if (r) return r.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && n >= t.length && (t = void 0),
                    { value: t && t[n++], done: !t }
                  );
                },
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NoUndefinedConfiguration = void 0);
        var a = r(6552);
        e.NoUndefinedConfiguration = a.Configuration.create("noundefined", {
          fallback: {
            macro: function (t, e) {
              var r,
                a,
                o = t.create("text", "\\" + e),
                i = t.options.noundefined || {},
                s = {};
              try {
                for (
                  var l = n(["color", "background", "size"]), u = l.next();
                  !u.done;
                  u = l.next()
                ) {
                  var c = u.value;
                  i[c] && (s["math" + c] = i[c]);
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  u && !u.done && (a = l.return) && a.call(l);
                } finally {
                  if (r) throw r.error;
                }
              }
              t.Push(t.create("node", "mtext", [], s, o));
            },
          },
          options: { noundefined: { color: "red", background: "", size: "" } },
          priority: 3,
        });
      },
      4303: function (t, e, r) {
        var n =
            (this && this.__values) ||
            function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                r = e && t[e],
                n = 0;
              if (r) return r.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && n >= t.length && (t = void 0),
                      { value: t && t[n++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            },
          a =
            (this && this.__read) ||
            function (t, e) {
              var r = "function" == typeof Symbol && t[Symbol.iterator];
              if (!r) return t;
              var n,
                a,
                o = r.call(t),
                i = [];
              try {
                for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                  i.push(n.value);
              } catch (t) {
                a = { error: t };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i;
            },
          o =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.RequireConfiguration =
            e.options =
            e.RequireMethods =
            e.RequireLoad =
              void 0);
        var i = r(6552),
          s = r(7628),
          l = r(3466),
          u = r(8723),
          c = r(1993),
          f = r(847),
          h = r(3184),
          d = r(9077),
          p = u.MathJax.config;
        function m(t, e) {
          var r,
            a = t.parseOptions.options.require,
            o = t.parseOptions.packageData.get("require").required,
            s = e.substr(a.prefix.length);
          if (o.indexOf(s) < 0) {
            o.push(s),
              (function (t, e) {
                var r, a;
                void 0 === e && (e = []);
                var o = t.parseOptions.options.require.prefix;
                try {
                  for (var i = n(e), s = i.next(); !s.done; s = i.next()) {
                    var l = s.value;
                    l.substr(0, o.length) === o && m(t, l);
                  }
                } catch (t) {
                  r = { error: t };
                } finally {
                  try {
                    s && !s.done && (a = i.return) && a.call(i);
                  } finally {
                    if (r) throw r.error;
                  }
                }
              })(t, f.CONFIG.dependencies[e]);
            var l = i.ConfigurationHandler.get(s);
            if (l) {
              var u = p[e] || {};
              l.options &&
                1 === Object.keys(l.options).length &&
                l.options[s] &&
                (((r = {})[s] = u), (u = r)),
                t.configuration.add(s, t, u);
              var c = t.parseOptions.packageData.get("require").configured;
              l.preprocessors.length &&
                !c.has(s) &&
                (c.set(s, !0), h.mathjax.retryAfter(Promise.resolve()));
            }
          }
        }
        function g(t, e) {
          var r = t.options.require,
            n = r.allow,
            a = ("[" === e.substr(0, 1) ? "" : r.prefix) + e;
          if (
            !(n.hasOwnProperty(a)
              ? n[a]
              : n.hasOwnProperty(e)
              ? n[e]
              : r.defaultAllow)
          )
            throw new l.default(
              "BadRequire",
              'Extension "%1" is not allowed to be loaded',
              a
            );
          c.Package.packages.has(a)
            ? m(t.configuration.packageData.get("require").jax, a)
            : h.mathjax.retryAfter(f.Loader.load(a));
        }
        (e.RequireLoad = g),
          (e.RequireMethods = {
            Require: function (t, e) {
              var r = t.GetArgument(e);
              if (r.match(/[^_a-zA-Z0-9]/) || "" === r)
                throw new l.default(
                  "BadPackageName",
                  "Argument for %1 is not a valid package name",
                  e
                );
              g(t, r);
            },
          }),
          (e.options = {
            require: {
              allow: d.expandable({
                base: !1,
                "all-packages": !1,
                autoload: !1,
                configmacros: !1,
                tagformat: !1,
                setoptions: !1,
              }),
              defaultAllow: !0,
              prefix: "tex",
            },
          }),
          new s.CommandMap("require", { require: "Require" }, e.RequireMethods),
          (e.RequireConfiguration = i.Configuration.create("require", {
            handler: { macro: ["require"] },
            config: function (t, e) {
              e.parseOptions.packageData.set("require", {
                jax: e,
                required: o([], a(e.options.packages)),
                configured: new Map(),
              });
              var r = e.parseOptions.options.require,
                n = r.prefix;
              if (n.match(/[^_a-zA-Z0-9]/))
                throw Error("Illegal characters used in \\require prefix");
              f.CONFIG.paths[n] ||
                (f.CONFIG.paths[n] = "[mathjax]/input/tex/extensions"),
                (r.prefix = "[" + n + "]/");
            },
            options: e.options,
          }));
      },
      8723: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.isObject = MathJax._.components.global.isObject),
          (e.combineConfig = MathJax._.components.global.combineConfig),
          (e.combineDefaults = MathJax._.components.global.combineDefaults),
          (e.combineWithMathJax =
            MathJax._.components.global.combineWithMathJax),
          (e.MathJax = MathJax._.components.global.MathJax);
      },
      9649: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AbstractFindMath = MathJax._.core.FindMath.AbstractFindMath);
      },
      3309: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AbstractInputJax = MathJax._.core.InputJax.AbstractInputJax);
      },
      4769: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.protoItem = MathJax._.core.MathItem.protoItem),
          (e.AbstractMathItem = MathJax._.core.MathItem.AbstractMathItem),
          (e.STATE = MathJax._.core.MathItem.STATE),
          (e.newState = MathJax._.core.MathItem.newState);
      },
      8921: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TEXCLASS = MathJax._.core.MmlTree.MmlNode.TEXCLASS),
          (e.TEXCLASSNAMES = MathJax._.core.MmlTree.MmlNode.TEXCLASSNAMES),
          (e.indentAttributes =
            MathJax._.core.MmlTree.MmlNode.indentAttributes),
          (e.AbstractMmlNode = MathJax._.core.MmlTree.MmlNode.AbstractMmlNode),
          (e.AbstractMmlTokenNode =
            MathJax._.core.MmlTree.MmlNode.AbstractMmlTokenNode),
          (e.AbstractMmlLayoutNode =
            MathJax._.core.MmlTree.MmlNode.AbstractMmlLayoutNode),
          (e.AbstractMmlBaseNode =
            MathJax._.core.MmlTree.MmlNode.AbstractMmlBaseNode),
          (e.AbstractMmlEmptyNode =
            MathJax._.core.MmlTree.MmlNode.AbstractMmlEmptyNode),
          (e.TextNode = MathJax._.core.MmlTree.MmlNode.TextNode),
          (e.XMLNode = MathJax._.core.MmlTree.MmlNode.XMLNode);
      },
      9946: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MmlMo = MathJax._.core.MmlTree.MmlNodes.mo.MmlMo);
      },
      3857: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.OPDEF = MathJax._.core.MmlTree.OperatorDictionary.OPDEF),
          (e.MO = MathJax._.core.MmlTree.OperatorDictionary.MO),
          (e.RANGES = MathJax._.core.MmlTree.OperatorDictionary.RANGES),
          (e.getRange = MathJax._.core.MmlTree.OperatorDictionary.getRange),
          (e.MMLSPACING = MathJax._.core.MmlTree.OperatorDictionary.MMLSPACING),
          (e.OPTABLE = MathJax._.core.MmlTree.OperatorDictionary.OPTABLE);
      },
      752: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AbstractFactory = MathJax._.core.Tree.Factory.AbstractFactory);
      },
      3184: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.mathjax = MathJax._.mathjax.mathjax);
      },
      9029: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.options = MathJax._.util.Entities.options),
          (e.entities = MathJax._.util.Entities.entities),
          (e.add = MathJax._.util.Entities.add),
          (e.remove = MathJax._.util.Entities.remove),
          (e.translate = MathJax._.util.Entities.translate),
          (e.numeric = MathJax._.util.Entities.numeric);
      },
      6898: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.FunctionList = MathJax._.util.FunctionList.FunctionList);
      },
      9077: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.isObject = MathJax._.util.Options.isObject),
          (e.APPEND = MathJax._.util.Options.APPEND),
          (e.REMOVE = MathJax._.util.Options.REMOVE),
          (e.OPTIONS = MathJax._.util.Options.OPTIONS),
          (e.Expandable = MathJax._.util.Options.Expandable),
          (e.expandable = MathJax._.util.Options.expandable),
          (e.makeArray = MathJax._.util.Options.makeArray),
          (e.keys = MathJax._.util.Options.keys),
          (e.copy = MathJax._.util.Options.copy),
          (e.insert = MathJax._.util.Options.insert),
          (e.defaultOptions = MathJax._.util.Options.defaultOptions),
          (e.userOptions = MathJax._.util.Options.userOptions),
          (e.selectOptions = MathJax._.util.Options.selectOptions),
          (e.selectOptionsFromKeys =
            MathJax._.util.Options.selectOptionsFromKeys),
          (e.separateOptions = MathJax._.util.Options.separateOptions),
          (e.lookup = MathJax._.util.Options.lookup);
      },
      4297: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.PrioritizedList = MathJax._.util.PrioritizedList.PrioritizedList);
      },
      6914: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BIGDIMEN = MathJax._.util.lengths.BIGDIMEN),
          (e.UNITS = MathJax._.util.lengths.UNITS),
          (e.RELUNITS = MathJax._.util.lengths.RELUNITS),
          (e.MATHSPACE = MathJax._.util.lengths.MATHSPACE),
          (e.length2em = MathJax._.util.lengths.length2em),
          (e.percent = MathJax._.util.lengths.percent),
          (e.em = MathJax._.util.lengths.em),
          (e.emRounded = MathJax._.util.lengths.emRounded),
          (e.px = MathJax._.util.lengths.px);
      },
      6720: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.sortLength = MathJax._.util.string.sortLength),
          (e.quotePattern = MathJax._.util.string.quotePattern),
          (e.unicodeChars = MathJax._.util.string.unicodeChars),
          (e.unicodeString = MathJax._.util.string.unicodeString),
          (e.isPercent = MathJax._.util.string.isPercent),
          (e.split = MathJax._.util.string.split);
      },
      847: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.PathFilters = MathJax._.components.loader.PathFilters),
          (e.Loader = MathJax._.components.loader.Loader),
          (e.MathJax = MathJax._.components.loader.MathJax),
          (e.CONFIG = MathJax._.components.loader.CONFIG);
      },
      1993: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.PackageError = MathJax._.components.package.PackageError),
          (e.Package = MathJax._.components.package.Package);
      },
    },
    e = {};
  function r(n) {
    var a = e[n];
    if (void 0 !== a) return a.exports;
    var o = (e[n] = { exports: {} });
    return t[n].call(o.exports, o, o.exports, r), o.exports;
  }
  !(function () {
    var t = r(8723),
      e = r(7205),
      n = r(6552),
      a = r(199),
      o = r(2982),
      i = r(2910),
      s = r(8644),
      l = r(8321),
      u = r(4708),
      c = r(6394),
      f = r(7702),
      h = r(9874),
      d = r(7044),
      p = r(3239),
      m = r(4237),
      g = r(7628),
      y = r(7251),
      v = r(7007),
      b = r(3466),
      x = r(810),
      A = r(3946),
      M = r(3632),
      w = r(2684),
      T = r(1451),
      S = r(3606),
      C = r(8389),
      O = r(724),
      P = r(3274),
      E = r(2200),
      k = r(6706),
      I = r(8562),
      _ = r(5282),
      L = r(8405),
      N = r(4303);
    (0, t.combineWithMathJax)({
      _: {
        input: {
          tex_ts: e,
          tex: {
            Configuration: n,
            FilterUtil: a,
            FindTeX: o,
            MapHandler: i,
            NodeFactory: s,
            NodeUtil: l,
            ParseMethods: u,
            ParseOptions: c,
            ParseUtil: f,
            Stack: h,
            StackItem: d,
            StackItemFactory: p,
            Symbol: m,
            SymbolMap: g,
            Tags: y,
            TexConstants: v,
            TexError: b,
            TexParser: x,
            ams: { AmsConfiguration: A, AmsItems: M, AmsMethods: w },
            autoload: { AutoloadConfiguration: T },
            base: { BaseConfiguration: S, BaseItems: C, BaseMethods: O },
            configmacros: { ConfigMacrosConfiguration: P },
            newcommand: {
              NewcommandConfiguration: E,
              NewcommandItems: k,
              NewcommandMethods: I,
              NewcommandUtil: _,
            },
            noundefined: { NoUndefinedConfiguration: L },
            require: { RequireConfiguration: N },
          },
        },
      },
    });
    var F = r(9077);
    r(847).Loader.preLoad(
      "input/tex-base",
      "[tex]/ams",
      "[tex]/newcommand",
      "[tex]/noundefined",
      "[tex]/require",
      "[tex]/autoload",
      "[tex]/configmacros"
    ),
      (function (t) {
        if (MathJax.startup) {
          MathJax.startup.registerConstructor("tex", e.TeX),
            MathJax.startup.useInput("tex"),
            MathJax.config.tex || (MathJax.config.tex = {});
          var r = MathJax.config.tex.packages;
          (MathJax.config.tex.packages = t),
            r && (0, F.insert)(MathJax.config.tex, { packages: r });
        }
      })([
        "base",
        "ams",
        "newcommand",
        "noundefined",
        "require",
        "autoload",
        "configmacros",
      ]);
  })();
})();
