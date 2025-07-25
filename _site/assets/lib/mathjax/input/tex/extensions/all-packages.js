!(function () {
  "use strict";
  var t = {
      7375: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AllPackages = void 0),
          r(2379),
          r(669),
          r(2577),
          r(6769),
          r(2133),
          r(2986),
          r(8243),
          r(6333),
          r(5774),
          r(7530),
          r(2286),
          r(2224),
          r(7888),
          r(4558),
          r(6359),
          r(2079),
          r(4272),
          r(3646),
          r(2082),
          r(1738),
          r(205),
          r(7078),
          r(2048),
          r(5634),
          r(1999),
          r(2996),
          r(1596),
          r(5941),
          r(1845),
          r(3762),
          r(7927),
          r(5376),
          r(8768),
          "undefined" != typeof MathJax &&
            MathJax.loader &&
            MathJax.loader.preLoad(
              "[tex]/action",
              "[tex]/ams",
              "[tex]/amscd",
              "[tex]/bbox",
              "[tex]/boldsymbol",
              "[tex]/braket",
              "[tex]/bussproofs",
              "[tex]/cancel",
              "[tex]/cases",
              "[tex]/centernot",
              "[tex]/color",
              "[tex]/colorv2",
              "[tex]/colortbl",
              "[tex]/empheq",
              "[tex]/enclose",
              "[tex]/extpfeil",
              "[tex]/gensymb",
              "[tex]/html",
              "[tex]/mathtools",
              "[tex]/mhchem",
              "[tex]/newcommand",
              "[tex]/noerrors",
              "[tex]/noundefined",
              "[tex]/physics",
              "[tex]/upgreek",
              "[tex]/unicode",
              "[tex]/verb",
              "[tex]/configmacros",
              "[tex]/tagformat",
              "[tex]/textcomp",
              "[tex]/textmacros",
              "[tex]/setoptions"
            ),
          (e.AllPackages = [
            "base",
            "action",
            "ams",
            "amscd",
            "bbox",
            "boldsymbol",
            "braket",
            "bussproofs",
            "cancel",
            "cases",
            "centernot",
            "color",
            "colortbl",
            "empheq",
            "enclose",
            "extpfeil",
            "gensymb",
            "html",
            "mathtools",
            "mhchem",
            "newcommand",
            "noerrors",
            "noundefined",
            "upgreek",
            "unicode",
            "verb",
            "configmacros",
            "tagformat",
            "textcomp",
            "textmacros"
          ]);
      },
      669: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ActionConfiguration = e.ActionMethods = void 0);
        var n = r(251),
          a = r(2193),
          o = r(5871),
          i = r(7360);
        (e.ActionMethods = {}),
          (e.ActionMethods.Macro = i.default.Macro),
          (e.ActionMethods.Toggle = function (t, e) {
            for (var r, n = []; "\\endtoggle" !== (r = t.GetArgument(e)); )
              n.push(new a.default(r, t.stack.env, t.configuration).mml());
            t.Push(t.create("node", "maction", n, { actiontype: "toggle" }));
          }),
          (e.ActionMethods.Mathtip = function (t, e) {
            var r = t.ParseArg(e),
              n = t.ParseArg(e);
            t.Push(
              t.create("node", "maction", [r, n], { actiontype: "tooltip" })
            );
          }),
          new o.CommandMap(
            "action-macros",
            {
              toggle: "Toggle",
              mathtip: "Mathtip",
              texttip: ["Macro", "\\mathtip{#1}{\\text{#2}}", 2]
            },
            e.ActionMethods
          ),
          (e.ActionConfiguration = n.Configuration.create("action", {
            handler: { macro: ["action-macros"] }
          }));
      },
      2577: function (t, e, r) {
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
        var i = r(251),
          s = r(7971),
          l = r(4680),
          c = r(8016);
        r(829);
        var u = r(5871),
          d = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return o(e, t), e;
          })(l.AbstractTags);
        e.AmsTags = d;
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
              "AMSmath-delimiter"
            ],
            environment: ["AMSmath-environment"]
          },
          items:
            ((a = {}),
            (a[s.MultlineItem.prototype.kind] = s.MultlineItem),
            (a[s.FlalignItem.prototype.kind] = s.FlalignItem),
            a),
          tags: { ams: d },
          init: function (t) {
            new u.CommandMap(c.NEW_OPS, {}, {}),
              t.append(
                i.Configuration.local({
                  handler: { macro: [c.NEW_OPS] },
                  priority: -1
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
            ams: { multlineWidth: "100%", multlineIndent: "1em" }
          }
        });
      },
      7971: function (t, e, r) {
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
        var i = r(2935),
          s = r(7398),
          l = r(4748),
          c = r(3402),
          u = r(6108),
          d = (function (t) {
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
                configurable: !0
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
                  throw new c.default(
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
                      u.TexConstant.Align.LEFT
                    ),
                    l.default.getAttribute(
                      l.default.getChildren(this.table[e])[0],
                      "columnalign"
                    ) ||
                      l.default.setAttribute(
                        l.default.getChildren(this.table[e])[0],
                        "columnalign",
                        u.TexConstant.Align.RIGHT
                      );
                  var n = this.factory.configuration.tags.getTag();
                  if (n) {
                    r =
                      this.arraydef.side === u.TexConstant.Align.LEFT
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
        e.MultlineItem = d;
        var p = (function (t) {
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
              configurable: !0
            }),
            (e.prototype.EndEntry = function () {
              t.prototype.EndEntry.call(this);
              var e = this.getProperty("xalignat");
              if (e && this.row.length > e)
                throw new c.default(
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
                  c = o(
                    { width: 0 },
                    "right" === s ? { lspace: "-1width" } : {}
                  ),
                  u = this.create(
                    "node",
                    "mpadded",
                    l.default.getChildren(i),
                    c
                  );
                i.setChildren([u]);
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
        e.FlalignItem = p;
      },
      829: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(8016),
          a = r(5871),
          o = r(6108),
          i = r(4945),
          s = r(7398),
          l = r(2955),
          c = r(1230);
        new a.CharacterMap("AMSmath-mathchar0mo", i.default.mathchar0mo, {
          iiiint: ["\u2a0c", { texClass: l.TEXCLASS.OP }]
        }),
          new a.CommandMap(
            "AMSmath-macros",
            {
              mathring: ["Accent", "02DA"],
              nobreakspace: "Tilde",
              negmedspace: ["Spacer", c.MATHSPACE.negativemediummathspace],
              negthickspace: ["Spacer", c.MATHSPACE.negativethickmathspace],
              idotsint: ["MultiIntegral", "\\int\\cdots\\int"],
              dddot: ["Accent", "20DB"],
              ddddot: ["Accent", "20DC"],
              sideset: [
                "Macro",
                "\\mathop{\\mathop{\\rlap{\\phantom{#3}}}\\nolimits#1\\!\\mathop{#3}\\nolimits#2}",
                3
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
                "\\mathop{\\underline{\\mmlToken{mi}{lim}}}"
              ],
              varlimsup: ["Macro", "\\mathop{\\overline{\\mmlToken{mi}{lim}}}"],
              varinjlim: [
                "Macro",
                "\\mathop{\\underrightarrow{\\mmlToken{mi}{lim}}}"
              ],
              varprojlim: [
                "Macro",
                "\\mathop{\\underleftarrow{\\mmlToken{mi}{lim}}}"
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
              xleftarrow: ["xArrow", 8592, 10, 5]
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
                s.default.cols(0, c.MATHSPACE.thickmathspace),
                ".5em"
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
                "D"
              ],
              gathered: [
                "AmsEqnArray",
                null,
                null,
                null,
                "c",
                null,
                ".5em",
                "D"
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
                "auto auto fit"
              ],
              "flalign*": [
                "FlalignArray",
                null,
                !1,
                !1,
                !0,
                "rlc",
                "auto auto fit"
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
                1
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
                1
              ],
              matrix: ["Array", null, null, null, "c"],
              pmatrix: ["Array", null, "(", ")", "c"],
              bmatrix: ["Array", null, "[", "]", "c"],
              Bmatrix: ["Array", null, "\\{", "\\}", "c"],
              vmatrix: ["Array", null, "\\vert", "\\vert", "c"],
              Vmatrix: ["Array", null, "\\Vert", "\\Vert", "c"],
              cases: ["Array", null, "\\{", ".", "ll", null, ".2em", "T"]
            },
            n.AmsMethods
          ),
          new a.DelimiterMap("AMSmath-delimiter", i.default.delimiter, {
            "\\lvert": ["|", { texClass: l.TEXCLASS.OPEN }],
            "\\rvert": ["|", { texClass: l.TEXCLASS.CLOSE }],
            "\\lVert": ["\u2016", { texClass: l.TEXCLASS.OPEN }],
            "\\rVert": ["\u2016", { texClass: l.TEXCLASS.CLOSE }]
          }),
          new a.CharacterMap("AMSsymbols-mathchar0mi", i.default.mathchar0mi, {
            digamma: "\u03dd",
            varkappa: "\u03f0",
            varGamma: ["\u0393", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varDelta: ["\u0394", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varTheta: ["\u0398", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varLambda: [
              "\u039b",
              { mathvariant: o.TexConstant.Variant.ITALIC }
            ],
            varXi: ["\u039e", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varPi: ["\u03a0", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varSigma: ["\u03a3", { mathvariant: o.TexConstant.Variant.ITALIC }],
            varUpsilon: [
              "\u03a5",
              { mathvariant: o.TexConstant.Variant.ITALIC }
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
            maltese: "\u2720"
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
            nLeftrightarrow: "\u21ce"
          }),
          new a.DelimiterMap("AMSsymbols-delimiter", i.default.delimiter, {
            "\\ulcorner": "\u231c",
            "\\urcorner": "\u231d",
            "\\llcorner": "\u231e",
            "\\lrcorner": "\u231f"
          }),
          new a.CommandMap(
            "AMSsymbols-macros",
            {
              implies: ["Macro", "\\;\\Longrightarrow\\;"],
              impliedby: ["Macro", "\\;\\Longleftarrow\\;"]
            },
            n.AmsMethods
          );
      },
      8016: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NEW_OPS = e.AmsMethods = void 0);
        var n = r(7398),
          a = r(4748),
          o = r(6108),
          i = r(2193),
          s = r(3402),
          l = r(4924),
          c = r(7360),
          u = r(2955);
        (e.AmsMethods = {}),
          (e.AmsMethods.AmsEqnArray = function (t, e, r, a, o, i, s) {
            var l = t.GetBrackets("\\begin{" + e.getName() + "}"),
              u = c.default.EqnArray(t, e, r, a, o, i, s);
            return n.default.setArrayAlign(u, l);
          }),
          (e.AmsMethods.AlignAt = function (t, r, a, o) {
            var i,
              l,
              c = r.getName(),
              u = "",
              d = [];
            if (
              (o || (l = t.GetBrackets("\\begin{" + c + "}")),
              (i = t.GetArgument("\\begin{" + c + "}")).match(/[^0-9]/))
            )
              throw new s.default(
                "PositiveIntegerArg",
                "Argument to %1 must me a positive integer",
                "\\begin{" + c + "}"
              );
            for (var p = parseInt(i, 10); p > 0; )
              (u += "rl"), d.push("0em 0em"), p--;
            var m = d.join(" ");
            if (o) return e.AmsMethods.EqnArray(t, r, a, o, u, m);
            var f = e.AmsMethods.EqnArray(t, r, a, o, u, m);
            return n.default.setArrayAlign(f, l);
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
                "data-width-includes-label": !0
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
              c = e.AmsMethods.FlalignArray(t, r, n, a, !1, i, l, !0);
            return c.setProperty("xalignat", 2 * parseInt(o)), c;
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
            var c = t.itemFactory.create(
              "flalign",
              e.getName(),
              r,
              a,
              o,
              t.stack
            );
            return (
              (c.arraydef = {
                width: "100%",
                displaystyle: !0,
                columnalign: i,
                columnspacing: "0em",
                columnwidth: s,
                rowspacing: "3pt",
                side: t.options.tagSide,
                minlabelspacing: l ? "0" : t.options.tagIndent,
                "data-width-includes-label": !0
              }),
              c.setProperty("zeroWidthLabel", l),
              c
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
                    "\\mathop{\\rm " + i + "}" + a
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
                lspace: n.default.Em(o / 18)
              },
              c = t.GetBrackets(e),
              d = t.ParseArg(e),
              p = t.create("node", "mspace", [], { depth: ".25em" }),
              m = t.create(
                "token",
                "mo",
                { stretchy: !0, texClass: u.TEXCLASS.REL },
                String.fromCodePoint(r)
              );
            m = t.create("node", "mstyle", [m], { scriptlevel: 0 });
            var f = t.create("node", "munderover", [m]),
              h = t.create("node", "mpadded", [d, p], l);
            if (
              (a.default.setAttribute(h, "voffset", "-.2em"),
              a.default.setAttribute(h, "height", "-.2em"),
              a.default.setChild(f, f.over, h),
              c)
            ) {
              var g = new i.default(c, t.stack.env, t.configuration).mml(),
                v = t.create("node", "mspace", [], { height: ".75em" });
              (h = t.create("node", "mpadded", [g, v], l)),
                a.default.setAttribute(h, "voffset", ".15em"),
                a.default.setAttribute(h, "depth", "-.15em"),
                a.default.setChild(f, f.under, h);
            }
            a.default.setProperty(f, "subsupOK", !0), t.Push(f);
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
              c = t.GetArgument(e),
              u = {
                l: o.TexConstant.Align.LEFT,
                r: o.TexConstant.Align.RIGHT,
                "": ""
              },
              d = new i.default(
                "\\strut\\textstyle{" + l + "}",
                t.stack.env,
                t.configuration
              ).mml(),
              p = new i.default(
                "\\strut\\textstyle{" + c + "}",
                t.stack.env,
                t.configuration
              ).mml(),
              m = t.create("node", "mfrac", [d, p]);
            if (null == (r = u[r]))
              throw new s.default(
                "IllegalAlign",
                "Illegal alignment specified in %1",
                t.currentCS
              );
            r && a.default.setProperties(m, { numalign: r, denomalign: r }),
              t.Push(m);
          }),
          (e.AmsMethods.Genfrac = function (t, e, r, o, i, l) {
            null == r && (r = t.GetDelimiterArg(e)),
              null == o && (o = t.GetDelimiterArg(e)),
              null == i && (i = t.GetArgument(e)),
              null == l && (l = n.default.trimSpaces(t.GetArgument(e)));
            var c = t.ParseArg(e),
              u = t.ParseArg(e),
              d = t.create("node", "mfrac", [c, u]);
            if (
              ("" !== i && a.default.setAttribute(d, "linethickness", i),
              (r || o) &&
                (a.default.setProperty(d, "withDelims", !0),
                (d = n.default.fixedFence(t.configuration, r, d, o))),
              "" !== l)
            ) {
              var p = parseInt(l, 10),
                m = ["D", "T", "S", "SS"][p];
              if (null == m)
                throw new s.default(
                  "BadMathStyleFor",
                  "Bad math style for %1",
                  t.currentCS
                );
              (d = t.create("node", "mstyle", [d])),
                "D" === m
                  ? a.default.setProperties(d, {
                      displaystyle: !0,
                      scriptlevel: 0
                    })
                  : a.default.setProperties(d, {
                      displaystyle: !1,
                      scriptlevel: p - 1
                    });
            }
            t.Push(d);
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
          (e.AmsMethods.HandleNoTag = c.default.HandleNoTag),
          (e.AmsMethods.HandleRef = c.default.HandleRef),
          (e.AmsMethods.Macro = c.default.Macro),
          (e.AmsMethods.Accent = c.default.Accent),
          (e.AmsMethods.Tilde = c.default.Tilde),
          (e.AmsMethods.Array = c.default.Array),
          (e.AmsMethods.Spacer = c.default.Spacer),
          (e.AmsMethods.NamedOp = c.default.NamedOp),
          (e.AmsMethods.EqnArray = c.default.EqnArray),
          (e.AmsMethods.Equation = c.default.Equation);
      },
      6769: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AmsCdConfiguration = void 0);
        var n = r(251);
        r(8704),
          (e.AmsCdConfiguration = n.Configuration.create("amscd", {
            handler: {
              character: ["amscd_special"],
              macro: ["amscd_macros"],
              environment: ["amscd_environment"]
            },
            options: {
              amscd: {
                colspace: "5pt",
                rowspace: "5pt",
                harrowsize: "2.75em",
                varrowsize: "1.75em",
                hideHorizontalLabels: !1
              }
            }
          }));
      },
      8704: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(5871),
          a = r(4945),
          o = r(8834);
        new n.EnvironmentMap(
          "amscd_environment",
          a.default.environment,
          { CD: "CD" },
          o.default
        ),
          new n.CommandMap(
            "amscd_macros",
            {
              minCDarrowwidth: "minCDarrowwidth",
              minCDarrowheight: "minCDarrowheight"
            },
            o.default
          ),
          new n.MacroMap("amscd_special", { "@": "arrow" }, o.default);
      },
      8834: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(2193),
          a = r(2379),
          o = r(2955),
          i = r(4748),
          s = {
            CD: function (t, e) {
              t.Push(e);
              var r = t.itemFactory.create("array"),
                n = t.configuration.options.amscd;
              return (
                r.setProperties({
                  minw: t.stack.env.CD_minw || n.harrowsize,
                  minh: t.stack.env.CD_minh || n.varrowsize
                }),
                (r.arraydef = {
                  columnalign: "center",
                  columnspacing: n.colspace,
                  rowspacing: n.rowspace,
                  displaystyle: !0
                }),
                r
              );
            },
            arrow: function (t, e) {
              var r = t.string.charAt(t.i);
              if (!r.match(/[><VA.|=]/)) return a.Other(t, e);
              t.i++;
              var l = t.stack.Top();
              (l.isKind("array") && !l.Size()) ||
                (s.cell(t, e), (l = t.stack.Top()));
              for (
                var c,
                  u = l,
                  d = u.table.length % 2 == 1,
                  p = (u.row.length + (d ? 0 : 1)) % 2;
                p;

              )
                s.cell(t, e), p--;
              var m = { minsize: u.getProperty("minw"), stretchy: !0 },
                f = {
                  minsize: u.getProperty("minh"),
                  stretchy: !0,
                  symmetric: !0,
                  lspace: 0,
                  rspace: 0
                };
              if ("." === r);
              else if ("|" === r) c = t.create("token", "mo", f, "\u2225");
              else if ("=" === r) c = t.create("token", "mo", m, "=");
              else {
                var h = {
                    ">": "\u2192",
                    "<": "\u2190",
                    V: "\u2193",
                    A: "\u2191"
                  }[r],
                  g = t.GetUpTo(e + r, r),
                  v = t.GetUpTo(e + r, r);
                if (">" === r || "<" === r) {
                  if (
                    ((c = t.create("token", "mo", m, h)),
                    g || (g = "\\kern " + u.getProperty("minw")),
                    g || v)
                  ) {
                    var y = { width: ".67em", lspace: ".33em" };
                    if (((c = t.create("node", "munderover", [c])), g)) {
                      var x = new n.default(
                          g,
                          t.stack.env,
                          t.configuration
                        ).mml(),
                        b = t.create("node", "mpadded", [x], y);
                      i.default.setAttribute(b, "voffset", ".1em"),
                        i.default.setChild(c, c.over, b);
                    }
                    if (v) {
                      var _ = new n.default(
                        v,
                        t.stack.env,
                        t.configuration
                      ).mml();
                      i.default.setChild(
                        c,
                        c.under,
                        t.create("node", "mpadded", [_], y)
                      );
                    }
                    t.configuration.options.amscd.hideHorizontalLabels &&
                      (c = t.create("node", "mpadded", c, {
                        depth: 0,
                        height: ".67em"
                      }));
                  }
                } else {
                  var M = t.create("token", "mo", f, h);
                  (c = M),
                    (g || v) &&
                      ((c = t.create("node", "mrow")),
                      g &&
                        i.default.appendChildren(c, [
                          new n.default(
                            "\\scriptstyle\\llap{" + g + "}",
                            t.stack.env,
                            t.configuration
                          ).mml()
                        ]),
                      (M.texClass = o.TEXCLASS.ORD),
                      i.default.appendChildren(c, [M]),
                      v &&
                        i.default.appendChildren(c, [
                          new n.default(
                            "\\scriptstyle\\rlap{" + v + "}",
                            t.stack.env,
                            t.configuration
                          ).mml()
                        ]));
                }
              }
              c && t.Push(c), s.cell(t, e);
            },
            cell: function (t, e) {
              var r = t.stack.Top();
              (r.table || []).length % 2 == 0 &&
                0 === (r.row || []).length &&
                t.Push(
                  t.create("node", "mpadded", [], {
                    height: "8.5pt",
                    depth: "2pt"
                  })
                ),
                t.Push(
                  t.itemFactory
                    .create("cell")
                    .setProperties({ isEntry: !0, name: e })
                );
            },
            minCDarrowwidth: function (t, e) {
              t.stack.env.CD_minw = t.GetDimen(e);
            },
            minCDarrowheight: function (t, e) {
              t.stack.env.CD_minh = t.GetDimen(e);
            }
          };
        e.default = s;
      },
      5275: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AutoloadConfiguration = void 0);
        var o = r(251),
          i = r(5871),
          s = r(4924),
          l = r(2778),
          c = r(4629),
          u = r(5074);
        function d(t, e, r, o) {
          var i, s, u, d;
          if (c.Package.packages.has(t.options.require.prefix + r)) {
            var f = t.options.autoload[r],
              h = n(2 === f.length && Array.isArray(f[0]) ? f : [f, []], 2),
              g = h[0],
              v = h[1];
            try {
              for (var y = a(g), x = y.next(); !x.done; x = y.next()) {
                var b = x.value;
                p.remove(b);
              }
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                x && !x.done && (s = y.return) && s.call(y);
              } finally {
                if (i) throw i.error;
              }
            }
            try {
              for (var _ = a(v), M = _.next(); !M.done; M = _.next()) {
                var w = M.value;
                m.remove(w);
              }
            } catch (t) {
              u = { error: t };
            } finally {
              try {
                M && !M.done && (d = _.return) && d.call(_);
              } finally {
                if (u) throw u.error;
              }
            }
            (t.string =
              (o ? e + " " : "\\begin{" + e.slice(1) + "}") +
              t.string.slice(t.i)),
              (t.i = 0);
          }
          l.RequireLoad(t, r);
        }
        var p = new i.CommandMap("autoload-macros", {}, {}),
          m = new i.CommandMap("autoload-environments", {}, {});
        e.AutoloadConfiguration = o.Configuration.create("autoload", {
          handler: {
            macro: ["autoload-macros"],
            environment: ["autoload-environments"]
          },
          options: {
            autoload: u.expandable({
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
                "Ketbra"
              ],
              bussproofs: [[], ["prooftree"]],
              cancel: ["cancel", "bcancel", "xcancel", "cancelto"],
              color: [
                "color",
                "definecolor",
                "textcolor",
                "colorbox",
                "fcolorbox"
              ],
              enclose: ["enclose"],
              extpfeil: [
                "xtwoheadrightarrow",
                "xtwoheadleftarrow",
                "xmapsto",
                "xlongequal",
                "xtofrom",
                "Newextarrow"
              ],
              html: ["href", "class", "style", "cssId"],
              mhchem: ["ce", "pu"],
              newcommand: [
                "newcommand",
                "renewcommand",
                "newenvironment",
                "renewenvironment",
                "def",
                "let"
              ],
              unicode: ["unicode"],
              verb: ["verb"]
            })
          },
          config: function (t, e) {
            var r,
              o,
              i,
              c,
              u,
              f,
              h = e.parseOptions,
              g = h.handlers.get("macro"),
              v = h.handlers.get("environment"),
              y = h.options.autoload;
            h.packageData.set("autoload", { Autoload: d });
            try {
              for (
                var x = a(Object.keys(y)), b = x.next();
                !b.done;
                b = x.next()
              ) {
                var _ = b.value,
                  M = y[_],
                  w = n(2 === M.length && Array.isArray(M[0]) ? M : [M, []], 2),
                  A = w[0],
                  C = w[1];
                try {
                  for (
                    var P = ((i = void 0), a(A)), S = P.next();
                    !S.done;
                    S = P.next()
                  ) {
                    var k = S.value;
                    (g.lookup(k) && "color" !== k) ||
                      p.add(k, new s.Macro(k, d, [_, !0]));
                  }
                } catch (t) {
                  i = { error: t };
                } finally {
                  try {
                    S && !S.done && (c = P.return) && c.call(P);
                  } finally {
                    if (i) throw i.error;
                  }
                }
                try {
                  for (
                    var O = ((u = void 0), a(C)), q = O.next();
                    !q.done;
                    q = O.next()
                  ) {
                    var T = q.value;
                    v.lookup(T) || m.add(T, new s.Macro(T, d, [_, !1]));
                  }
                } catch (t) {
                  u = { error: t };
                } finally {
                  try {
                    q && !q.done && (f = O.return) && f.call(O);
                  } finally {
                    if (u) throw u.error;
                  }
                }
              }
            } catch (t) {
              r = { error: t };
            } finally {
              try {
                b && !b.done && (o = x.return) && o.call(x);
              } finally {
                if (r) throw r.error;
              }
            }
            h.packageData.get("require") || l.RequireConfiguration.config(t, e);
          },
          init: function (t) {
            t.options.require ||
              u.defaultOptions(t.options, l.RequireConfiguration.options);
          },
          priority: 10
        });
      },
      2133: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BboxConfiguration = e.BboxMethods = void 0);
        var n = r(251),
          a = r(5871),
          o = r(3402);
        (e.BboxMethods = {}),
          (e.BboxMethods.BBox = function (t, e) {
            for (
              var r,
                n,
                a,
                l = t.GetBrackets(e, ""),
                c = t.ParseArg(e),
                u = l.split(/,/),
                d = 0,
                p = u.length;
              d < p;
              d++
            ) {
              var m = u[d].trim(),
                f = m.match(/^(\.\d+|\d+(\.\d*)?)(pt|em|ex|mu|px|in|cm|mm)$/);
              if (f) {
                if (r)
                  throw new o.default(
                    "MultipleBBoxProperty",
                    "%1 specified twice in %2",
                    "Padding",
                    e
                  );
                var h = s(f[1] + f[3]);
                h &&
                  (r = {
                    height: "+" + h,
                    depth: "+" + h,
                    lspace: h,
                    width: "+" + 2 * parseInt(f[1], 10) + f[3]
                  });
              } else if (
                m.match(/^([a-z0-9]+|\#[0-9a-f]{6}|\#[0-9a-f]{3})$/i)
              ) {
                if (n)
                  throw new o.default(
                    "MultipleBBoxProperty",
                    "%1 specified twice in %2",
                    "Background",
                    e
                  );
                n = m;
              } else if (m.match(/^[-a-z]+:/i)) {
                if (a)
                  throw new o.default(
                    "MultipleBBoxProperty",
                    "%1 specified twice in %2",
                    "Style",
                    e
                  );
                a = i(m);
              } else if ("" !== m)
                throw new o.default(
                  "InvalidBBoxProperty",
                  '"%1" doesn\'t look like a color, a padding dimension, or a style',
                  m
                );
            }
            r && (c = t.create("node", "mpadded", [c], r)),
              (n || a) &&
                ((r = {}),
                n && Object.assign(r, { mathbackground: n }),
                a && Object.assign(r, { style: a }),
                (c = t.create("node", "mstyle", [c], r))),
              t.Push(c);
          });
        var i = function (t) {
            return t;
          },
          s = function (t) {
            return t;
          };
        new a.CommandMap("bbox", { bbox: "BBox" }, e.BboxMethods),
          (e.BboxConfiguration = n.Configuration.create("bbox", {
            handler: { macro: ["bbox"] }
          }));
      },
      2986: function (t, e, r) {
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
                }
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BoldsymbolConfiguration =
            e.rewriteBoldTokens =
            e.createBoldToken =
            e.BoldsymbolMethods =
              void 0);
        var a = r(251),
          o = r(4748),
          i = r(6108),
          s = r(5871),
          l = r(2348),
          c = {};
        function u(t, e, r, n) {
          var a = l.NodeFactory.createToken(t, e, r, n);
          return (
            "mtext" !== e &&
              t.configuration.parser.stack.env.boldsymbol &&
              (o.default.setProperty(a, "fixBold", !0),
              t.configuration.addNode("fixBold", a)),
            a
          );
        }
        function d(t) {
          var e, r;
          try {
            for (
              var a = n(t.data.getList("fixBold")), s = a.next();
              !s.done;
              s = a.next()
            ) {
              var l = s.value;
              if (o.default.getProperty(l, "fixBold")) {
                var u = o.default.getAttribute(l, "mathvariant");
                null == u
                  ? o.default.setAttribute(
                      l,
                      "mathvariant",
                      i.TexConstant.Variant.BOLD
                    )
                  : o.default.setAttribute(l, "mathvariant", c[u] || u),
                  o.default.removeProperties(l, "fixBold");
              }
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (r = a.return) && r.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
        }
        (c[i.TexConstant.Variant.NORMAL] = i.TexConstant.Variant.BOLD),
          (c[i.TexConstant.Variant.ITALIC] = i.TexConstant.Variant.BOLDITALIC),
          (c[i.TexConstant.Variant.FRAKTUR] =
            i.TexConstant.Variant.BOLDFRAKTUR),
          (c[i.TexConstant.Variant.SCRIPT] = i.TexConstant.Variant.BOLDSCRIPT),
          (c[i.TexConstant.Variant.SANSSERIF] =
            i.TexConstant.Variant.BOLDSANSSERIF),
          (c["-tex-calligraphic"] = "-tex-bold-calligraphic"),
          (c["-tex-oldstyle"] = "-tex-bold-oldstyle"),
          (c["-tex-mathit"] = i.TexConstant.Variant.BOLDITALIC),
          (e.BoldsymbolMethods = {}),
          (e.BoldsymbolMethods.Boldsymbol = function (t, e) {
            var r = t.stack.env.boldsymbol;
            t.stack.env.boldsymbol = !0;
            var n = t.ParseArg(e);
            (t.stack.env.boldsymbol = r), t.Push(n);
          }),
          new s.CommandMap(
            "boldsymbol",
            { boldsymbol: "Boldsymbol" },
            e.BoldsymbolMethods
          ),
          (e.createBoldToken = u),
          (e.rewriteBoldTokens = d),
          (e.BoldsymbolConfiguration = a.Configuration.create("boldsymbol", {
            handler: { macro: ["boldsymbol"] },
            nodes: { token: u },
            postprocessors: [d]
          }));
      },
      8243: function (t, e, r) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BraketConfiguration = void 0);
        var a = r(251),
          o = r(3519);
        r(3299),
          (e.BraketConfiguration = a.Configuration.create("braket", {
            handler: {
              character: ["Braket-characters"],
              macro: ["Braket-macros"]
            },
            items:
              ((n = {}), (n[o.BraketItem.prototype.kind] = o.BraketItem), n)
          }));
      },
      3519: function (t, e, r) {
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
          (e.BraketItem = void 0);
        var o = r(1076),
          i = r(2955),
          s = r(7398),
          l = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "braket";
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isOpen", {
                get: function () {
                  return !0;
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.checkItem = function (e) {
                return e.isKind("close")
                  ? [[this.factory.create("mml", this.toMml())], !0]
                  : e.isKind("mml")
                  ? (this.Push(e.toMml()),
                    this.getProperty("single")
                      ? [[this.toMml()], !0]
                      : o.BaseItem.fail)
                  : t.prototype.checkItem.call(this, e);
              }),
              (e.prototype.toMml = function () {
                var e = t.prototype.toMml.call(this),
                  r = this.getProperty("open"),
                  n = this.getProperty("close");
                if (this.getProperty("stretchy"))
                  return s.default.fenced(this.factory.configuration, r, e, n);
                var a = {
                    fence: !0,
                    stretchy: !1,
                    symmetric: !0,
                    texClass: i.TEXCLASS.OPEN
                  },
                  o = this.create("token", "mo", a, r);
                a.texClass = i.TEXCLASS.CLOSE;
                var l = this.create("token", "mo", a, n);
                return this.create("node", "mrow", [o, e, l], {
                  open: r,
                  close: n,
                  texClass: i.TEXCLASS.INNER
                });
              }),
              e
            );
          })(o.BaseItem);
        e.BraketItem = l;
      },
      3299: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(5871),
          a = r(1277);
        new n.CommandMap(
          "Braket-macros",
          {
            bra: ["Macro", "{\\langle {#1} \\vert}", 1],
            ket: ["Macro", "{\\vert {#1} \\rangle}", 1],
            braket: ["Braket", "\u27e8", "\u27e9", !1, 1 / 0],
            set: ["Braket", "{", "}", !1, 1],
            Bra: ["Macro", "{\\left\\langle {#1} \\right\\vert}", 1],
            Ket: ["Macro", "{\\left\\vert {#1} \\right\\rangle}", 1],
            Braket: ["Braket", "\u27e8", "\u27e9", !0, 1 / 0],
            Set: ["Braket", "{", "}", !0, 1],
            ketbra: ["Macro", "{\\vert {#1} \\rangle\\langle {#2} \\vert}", 2],
            Ketbra: [
              "Macro",
              "{\\left\\vert {#1} \\right\\rangle\\left\\langle {#2} \\right\\vert}",
              2
            ],
            "|": "Bar"
          },
          a.default
        ),
          new n.MacroMap("Braket-characters", { "|": "Bar" }, a.default);
      },
      1277: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(7360),
          a = r(2955),
          o = r(3402),
          i = {};
        (i.Macro = n.default.Macro),
          (i.Braket = function (t, e, r, n, a, i) {
            var s = t.GetNext();
            if ("" === s)
              throw new o.default(
                "MissingArgFor",
                "Missing argument for %1",
                t.currentCS
              );
            var l = !0;
            "{" === s && (t.i++, (l = !1)),
              t.Push(
                t.itemFactory
                  .create("braket")
                  .setProperties({
                    barmax: i,
                    barcount: 0,
                    open: r,
                    close: n,
                    stretchy: a,
                    single: l
                  })
              );
          }),
          (i.Bar = function (t, e) {
            var r = "|" === e ? "|" : "\u2225",
              n = t.stack.Top();
            if (
              "braket" !== n.kind ||
              n.getProperty("barcount") >= n.getProperty("barmax")
            ) {
              var o = t.create(
                "token",
                "mo",
                { texClass: a.TEXCLASS.ORD, stretchy: !1 },
                r
              );
              t.Push(o);
            } else {
              if (
                ("|" === r && "|" === t.GetNext() && (t.i++, (r = "\u2225")),
                n.getProperty("stretchy"))
              ) {
                var i = t.create("node", "TeXAtom", [], {
                  texClass: a.TEXCLASS.CLOSE
                });
                t.Push(i),
                  n.setProperty("barcount", n.getProperty("barcount") + 1),
                  (i = t.create(
                    "token",
                    "mo",
                    { stretchy: !0, braketbar: !0 },
                    r
                  )),
                  t.Push(i),
                  (i = t.create("node", "TeXAtom", [], {
                    texClass: a.TEXCLASS.OPEN
                  })),
                  t.Push(i);
              } else {
                var s = t.create(
                  "token",
                  "mo",
                  { stretchy: !1, braketbar: !0 },
                  r
                );
                t.Push(s);
              }
            }
          }),
          (e.default = i);
      },
      6333: function (t, e, r) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BussproofsConfiguration = void 0);
        var a = r(251),
          o = r(7854),
          i = r(378);
        r(1116),
          (e.BussproofsConfiguration = a.Configuration.create("bussproofs", {
            handler: {
              macro: ["Bussproofs-macros"],
              environment: ["Bussproofs-environments"]
            },
            items:
              ((n = {}),
              (n[o.ProofTreeItem.prototype.kind] = o.ProofTreeItem),
              n),
            preprocessors: [[i.saveDocument, 1]],
            postprocessors: [
              [i.clearDocument, 3],
              [i.makeBsprAttributes, 2],
              [i.balanceRules, 1]
            ]
          }));
      },
      7854: function (t, e, r) {
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
          (e.ProofTreeItem = void 0);
        var o = r(3402),
          i = r(1076),
          s = r(8935),
          l = r(378),
          c = (function (t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (
                (e.leftLabel = null),
                (e.rigthLabel = null),
                (e.innerStack = new s.default(e.factory, {}, !0)),
                e
              );
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "proofTree";
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.checkItem = function (t) {
                if (t.isKind("end") && "prooftree" === t.getName()) {
                  var e = this.toMml();
                  return (
                    l.setProperty(e, "proof", !0),
                    [[this.factory.create("mml", e), t], !0]
                  );
                }
                if (t.isKind("stop"))
                  throw new o.default(
                    "EnvMissingEnd",
                    "Missing \\end{%1}",
                    this.getName()
                  );
                return this.innerStack.Push(t), i.BaseItem.fail;
              }),
              (e.prototype.toMml = function () {
                var e = t.prototype.toMml.call(this),
                  r = this.innerStack.Top();
                if (r.isKind("start") && !r.Size()) return e;
                this.innerStack.Push(this.factory.create("stop"));
                var n = this.innerStack.Top().toMml();
                return this.create("node", "mrow", [n, e], {});
              }),
              e
            );
          })(i.BaseItem);
        e.ProofTreeItem = c;
      },
      1116: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(2827),
          a = r(4945),
          o = r(5871);
        new o.CommandMap(
          "Bussproofs-macros",
          {
            AxiomC: "Axiom",
            UnaryInfC: ["Inference", 1],
            BinaryInfC: ["Inference", 2],
            TrinaryInfC: ["Inference", 3],
            QuaternaryInfC: ["Inference", 4],
            QuinaryInfC: ["Inference", 5],
            RightLabel: ["Label", "right"],
            LeftLabel: ["Label", "left"],
            AXC: "Axiom",
            UIC: ["Inference", 1],
            BIC: ["Inference", 2],
            TIC: ["Inference", 3],
            RL: ["Label", "right"],
            LL: ["Label", "left"],
            noLine: ["SetLine", "none", !1],
            singleLine: ["SetLine", "solid", !1],
            solidLine: ["SetLine", "solid", !1],
            dashedLine: ["SetLine", "dashed", !1],
            alwaysNoLine: ["SetLine", "none", !0],
            alwaysSingleLine: ["SetLine", "solid", !0],
            alwaysSolidLine: ["SetLine", "solid", !0],
            alwaysDashedLine: ["SetLine", "dashed", !0],
            rootAtTop: ["RootAtTop", !0],
            alwaysRootAtTop: ["RootAtTop", !0],
            rootAtBottom: ["RootAtTop", !1],
            alwaysRootAtBottom: ["RootAtTop", !1],
            fCenter: "FCenter",
            Axiom: "AxiomF",
            UnaryInf: ["InferenceF", 1],
            BinaryInf: ["InferenceF", 2],
            TrinaryInf: ["InferenceF", 3],
            QuaternaryInf: ["InferenceF", 4],
            QuinaryInf: ["InferenceF", 5]
          },
          n.default
        ),
          new o.EnvironmentMap(
            "Bussproofs-environments",
            a.default.environment,
            { prooftree: ["Prooftree", null, !1] },
            n.default
          );
      },
      2827: function (t, e, r) {
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
        var o = r(3402),
          i = r(2193),
          s = r(7398),
          l = r(378),
          c = {
            Prooftree: function (t, e) {
              return (
                t.Push(e),
                t.itemFactory
                  .create("proofTree")
                  .setProperties({
                    name: e.getName(),
                    line: "solid",
                    currentLine: "solid",
                    rootAtTop: !1
                  })
              );
            },
            Axiom: function (t, e) {
              var r = t.stack.Top();
              if ("proofTree" !== r.kind)
                throw new o.default(
                  "IllegalProofCommand",
                  "Proof commands only allowed in prooftree environment."
                );
              var n = u(t, t.GetArgument(e));
              l.setProperty(n, "axiom", !0), r.Push(n);
            }
          },
          u = function (t, e) {
            var r = s.default.internalMath(t, s.default.trimSpaces(e), 0);
            if (!r[0].childNodes[0].childNodes.length)
              return t.create("node", "mrow", []);
            var o = t.create("node", "mspace", [], { width: ".5ex" }),
              i = t.create("node", "mspace", [], { width: ".5ex" });
            return t.create("node", "mrow", a(a([o], n(r)), [i]));
          };
        function d(t, e, r, n, a, o, i) {
          var s,
            c,
            u,
            d,
            p = t.create("node", "mtr", [t.create("node", "mtd", [e], {})], {}),
            m = t.create("node", "mtr", [t.create("node", "mtd", r, {})], {}),
            f = t.create("node", "mtable", i ? [m, p] : [p, m], {
              align: "top 2",
              rowlines: o,
              framespacing: "0 0"
            });
          if (
            (l.setProperty(f, "inferenceRule", i ? "up" : "down"),
            n &&
              ((s = t.create("node", "mpadded", [n], {
                height: "+.5em",
                width: "+.5em",
                voffset: "-.15em"
              })),
              l.setProperty(s, "prooflabel", "left")),
            a &&
              ((c = t.create("node", "mpadded", [a], {
                height: "+.5em",
                width: "+.5em",
                voffset: "-.15em"
              })),
              l.setProperty(c, "prooflabel", "right")),
            n && a)
          )
            (u = [s, f, c]), (d = "both");
          else if (n) (u = [s, f]), (d = "left");
          else {
            if (!a) return f;
            (u = [f, c]), (d = "right");
          }
          return (
            (f = t.create("node", "mrow", u)),
            l.setProperty(f, "labelledRule", d),
            f
          );
        }
        function p(t, e) {
          if ("$" !== t.GetNext())
            throw new o.default(
              "IllegalUseOfCommand",
              "Use of %1 does not match it's definition.",
              e
            );
          t.i++;
          var r = t.GetUpTo(e, "$");
          if (-1 === r.indexOf("\\fCenter"))
            throw new o.default(
              "IllegalUseOfCommand",
              "Missing \\fCenter in %1.",
              e
            );
          var a = n(r.split("\\fCenter"), 2),
            s = a[0],
            c = a[1],
            u = new i.default(s, t.stack.env, t.configuration).mml(),
            d = new i.default(c, t.stack.env, t.configuration).mml(),
            p = new i.default("\\fCenter", t.stack.env, t.configuration).mml(),
            m = t.create("node", "mtd", [u], {}),
            f = t.create("node", "mtd", [p], {}),
            h = t.create("node", "mtd", [d], {}),
            g = t.create("node", "mtr", [m, f, h], {}),
            v = t.create("node", "mtable", [g], {
              columnspacing: ".5ex",
              columnalign: "center 2"
            });
          return (
            l.setProperty(v, "sequent", !0),
            t.configuration.addNode("sequent", g),
            v
          );
        }
        (c.Inference = function (t, e, r) {
          var n = t.stack.Top();
          if ("proofTree" !== n.kind)
            throw new o.default(
              "IllegalProofCommand",
              "Proof commands only allowed in prooftree environment."
            );
          if (n.Size() < r)
            throw new o.default("BadProofTree", "Proof tree badly specified.");
          var a = n.getProperty("rootAtTop"),
            i = 1 !== r || n.Peek()[0].childNodes.length ? r : 0,
            s = [];
          do {
            s.length && s.unshift(t.create("node", "mtd", [], {})),
              s.unshift(
                t.create("node", "mtd", [n.Pop()], {
                  rowalign: a ? "top" : "bottom"
                })
              ),
              r--;
          } while (r > 0);
          var c = t.create("node", "mtr", s, {}),
            p = t.create("node", "mtable", [c], { framespacing: "0 0" }),
            m = u(t, t.GetArgument(e)),
            f = n.getProperty("currentLine");
          f !== n.getProperty("line") &&
            n.setProperty("currentLine", n.getProperty("line"));
          var h = d(
            t,
            p,
            [m],
            n.getProperty("left"),
            n.getProperty("right"),
            f,
            a
          );
          n.setProperty("left", null),
            n.setProperty("right", null),
            l.setProperty(h, "inference", i),
            t.configuration.addNode("inference", h),
            n.Push(h);
        }),
          (c.Label = function (t, e, r) {
            var n = t.stack.Top();
            if ("proofTree" !== n.kind)
              throw new o.default(
                "IllegalProofCommand",
                "Proof commands only allowed in prooftree environment."
              );
            var a = s.default.internalMath(t, t.GetArgument(e), 0),
              i = a.length > 1 ? t.create("node", "mrow", a, {}) : a[0];
            n.setProperty(r, i);
          }),
          (c.SetLine = function (t, e, r, n) {
            var a = t.stack.Top();
            if ("proofTree" !== a.kind)
              throw new o.default(
                "IllegalProofCommand",
                "Proof commands only allowed in prooftree environment."
              );
            a.setProperty("currentLine", r), n && a.setProperty("line", r);
          }),
          (c.RootAtTop = function (t, e, r) {
            var n = t.stack.Top();
            if ("proofTree" !== n.kind)
              throw new o.default(
                "IllegalProofCommand",
                "Proof commands only allowed in prooftree environment."
              );
            n.setProperty("rootAtTop", r);
          }),
          (c.AxiomF = function (t, e) {
            var r = t.stack.Top();
            if ("proofTree" !== r.kind)
              throw new o.default(
                "IllegalProofCommand",
                "Proof commands only allowed in prooftree environment."
              );
            var n = p(t, e);
            l.setProperty(n, "axiom", !0), r.Push(n);
          }),
          (c.FCenter = function (t, e) {}),
          (c.InferenceF = function (t, e, r) {
            var n = t.stack.Top();
            if ("proofTree" !== n.kind)
              throw new o.default(
                "IllegalProofCommand",
                "Proof commands only allowed in prooftree environment."
              );
            if (n.Size() < r)
              throw new o.default(
                "BadProofTree",
                "Proof tree badly specified."
              );
            var a = n.getProperty("rootAtTop"),
              i = 1 !== r || n.Peek()[0].childNodes.length ? r : 0,
              s = [];
            do {
              s.length && s.unshift(t.create("node", "mtd", [], {})),
                s.unshift(
                  t.create("node", "mtd", [n.Pop()], {
                    rowalign: a ? "top" : "bottom"
                  })
                ),
                r--;
            } while (r > 0);
            var c = t.create("node", "mtr", s, {}),
              u = t.create("node", "mtable", [c], { framespacing: "0 0" }),
              m = p(t, e),
              f = n.getProperty("currentLine");
            f !== n.getProperty("line") &&
              n.setProperty("currentLine", n.getProperty("line"));
            var h = d(
              t,
              u,
              [m],
              n.getProperty("left"),
              n.getProperty("right"),
              f,
              a
            );
            n.setProperty("left", null),
              n.setProperty("right", null),
              l.setProperty(h, "inference", i),
              t.configuration.addNode("inference", h),
              n.Push(h);
          }),
          (e.default = c);
      },
      378: function (t, e, r) {
        var n,
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.clearDocument =
            e.saveDocument =
            e.makeBsprAttributes =
            e.removeProperty =
            e.getProperty =
            e.setProperty =
            e.balanceRules =
              void 0);
        var i = r(4748),
          s = r(7398),
          l = null,
          c = null,
          u = function (t) {
            return (c.root = t), l.outputJax.getBBox(c, l).w;
          },
          d = function (t) {
            for (var e = 0; t && !i.default.isType(t, "mtable"); ) {
              if (i.default.isType(t, "text")) return null;
              i.default.isType(t, "mrow")
                ? ((t = t.childNodes[0]), (e = 0))
                : ((t = t.parent.childNodes[e]), e++);
            }
            return t;
          },
          p = function (t, e) {
            return t.childNodes["up" === e ? 1 : 0].childNodes[0].childNodes[0]
              .childNodes[0].childNodes[0];
          },
          m = function (t, e) {
            return t.childNodes[e].childNodes[0].childNodes[0];
          },
          f = function (t) {
            return m(t, 0);
          },
          h = function (t) {
            return m(t, t.childNodes.length - 1);
          },
          g = function (t, e) {
            return t.childNodes["up" === e ? 0 : 1].childNodes[0].childNodes[0]
              .childNodes[0];
          },
          v = function (t) {
            for (; t && !i.default.isType(t, "mtd"); ) t = t.parent;
            return t;
          },
          y = function (t) {
            return t.parent.childNodes[t.parent.childNodes.indexOf(t) + 1];
          },
          x = function (t) {
            for (; t && null == e.getProperty(t, "inference"); ) t = t.parent;
            return t;
          },
          b = function (t, e, r) {
            void 0 === r && (r = !1);
            var n = 0;
            if (t === e) return n;
            if (t !== e.parent) {
              var a = t.childNodes,
                o = r ? a.length - 1 : 0;
              i.default.isType(a[o], "mspace") && (n += u(a[o])),
                (t = e.parent);
            }
            if (t === e) return n;
            var s = t.childNodes,
              l = r ? s.length - 1 : 0;
            return s[l] !== e && (n += u(s[l])), n;
          },
          _ = function (t, r) {
            void 0 === r && (r = !1);
            var n = d(t),
              a = g(n, e.getProperty(n, "inferenceRule"));
            return b(t, n, r) + (u(n) - u(a)) / 2;
          },
          M = function (t, r, n, a) {
            if (
              (void 0 === a && (a = !1),
              e.getProperty(r, "inferenceRule") ||
                e.getProperty(r, "labelledRule"))
            ) {
              var o = t.nodeFactory.create("node", "mrow");
              r.parent.replaceChild(o, r), o.setChildren([r]), w(r, o), (r = o);
            }
            var l = a ? r.childNodes.length - 1 : 0,
              c = r.childNodes[l];
            i.default.isType(c, "mspace")
              ? i.default.setAttribute(
                  c,
                  "width",
                  s.default.Em(
                    s.default.dimen2em(i.default.getAttribute(c, "width")) + n
                  )
                )
              : ((c = t.nodeFactory.create("node", "mspace", [], {
                  width: s.default.Em(n)
                })),
                a
                  ? r.appendChild(c)
                  : ((c.parent = r), r.childNodes.unshift(c)));
          },
          w = function (t, r) {
            ["inference", "proof", "maxAdjust", "labelledRule"].forEach(
              function (n) {
                var a = e.getProperty(t, n);
                null != a && (e.setProperty(r, n, a), e.removeProperty(t, n));
              }
            );
          },
          A = function (t, r, n, a, o) {
            var i = t.nodeFactory.create("node", "mspace", [], {
              width: s.default.Em(o)
            });
            if ("left" === a) {
              var l = r.childNodes[n].childNodes[0];
              (i.parent = l), l.childNodes.unshift(i);
            } else r.childNodes[n].appendChild(i);
            e.setProperty(r.parent, "sequentAdjust_" + a, o);
          },
          C = function (t, r) {
            for (var n = r.pop(); r.length; ) {
              var o = r.pop(),
                i = a(P(n, o), 2),
                s = i[0],
                l = i[1];
              e.getProperty(n.parent, "axiom") &&
                (A(t, s < 0 ? n : o, 0, "left", Math.abs(s)),
                A(t, l < 0 ? n : o, 2, "right", Math.abs(l))),
                (n = o);
            }
          },
          P = function (t, e) {
            var r = u(t.childNodes[2]),
              n = u(e.childNodes[2]);
            return [u(t.childNodes[0]) - u(e.childNodes[0]), r - n];
          };
        e.balanceRules = function (t) {
          var r, n;
          c = new t.document.options.MathItem("", null, t.math.display);
          var a = t.data;
          !(function (t) {
            var r = t.nodeLists.sequent;
            if (r)
              for (var n = r.length - 1, a = void 0; (a = r[n]); n--)
                if (e.getProperty(a, "sequentProcessed"))
                  e.removeProperty(a, "sequentProcessed");
                else {
                  var o = [],
                    i = x(a);
                  if (1 === e.getProperty(i, "inference")) {
                    for (o.push(a); 1 === e.getProperty(i, "inference"); ) {
                      i = d(i);
                      var s = f(p(i, e.getProperty(i, "inferenceRule"))),
                        l = e.getProperty(s, "inferenceRule")
                          ? g(s, e.getProperty(s, "inferenceRule"))
                          : s;
                      e.getProperty(l, "sequent") &&
                        ((a = l.childNodes[0]),
                        o.push(a),
                        e.setProperty(a, "sequentProcessed", !0)),
                        (i = s);
                    }
                    C(t, o);
                  }
                }
          })(a);
          var i = a.nodeLists.inference || [];
          try {
            for (var s = o(i), l = s.next(); !l.done; l = s.next()) {
              var u = l.value,
                m = e.getProperty(u, "proof"),
                w = d(u),
                A = p(w, e.getProperty(w, "inferenceRule")),
                P = f(A);
              if (e.getProperty(P, "inference")) {
                var S = _(P);
                if (S) {
                  M(a, P, -S);
                  var k = b(u, w, !1);
                  M(a, u, S - k);
                }
              }
              var O = h(A);
              if (null != e.getProperty(O, "inference")) {
                var q = _(O, !0);
                M(a, O, -q, !0);
                var T = b(u, w, !0),
                  E = e.getProperty(u, "maxAdjust");
                null != E && (q = Math.max(q, E));
                var I = void 0;
                if (!m && (I = v(u))) {
                  var N = y(I);
                  if (N) {
                    var B = a.nodeFactory.create("node", "mspace", [], {
                      width: q - T + "em"
                    });
                    N.appendChild(B), u.removeProperty("maxAdjust");
                  } else {
                    var G = x(I);
                    G &&
                      ((q = e.getProperty(G, "maxAdjust")
                        ? Math.max(e.getProperty(G, "maxAdjust"), q)
                        : q),
                      e.setProperty(G, "maxAdjust", q));
                  }
                } else
                  M(a, e.getProperty(u, "proof") ? u : u.parent, q - T, !0);
              }
            }
          } catch (t) {
            r = { error: t };
          } finally {
            try {
              l && !l.done && (n = s.return) && n.call(s);
            } finally {
              if (r) throw r.error;
            }
          }
        };
        var S = "bspr_",
          k = (((n = {}).bspr_maxAdjust = !0), n);
        e.setProperty = function (t, e, r) {
          i.default.setProperty(t, S + e, r);
        };
        e.getProperty = function (t, e) {
          return i.default.getProperty(t, S + e);
        };
        e.removeProperty = function (t, e) {
          t.removeProperty(S + e);
        };
        e.makeBsprAttributes = function (t) {
          t.data.root.walkTree(function (t, e) {
            var r = [];
            t.getPropertyNames().forEach(function (e) {
              !k[e] &&
                e.match(RegExp("^bspr_")) &&
                r.push(e + ":" + t.getProperty(e));
            }),
              r.length && i.default.setAttribute(t, "semantics", r.join(";"));
          });
        };
        e.saveDocument = function (t) {
          if (!("getBBox" in (l = t.document).outputJax))
            throw Error(
              "The bussproofs extension requires an output jax with a getBBox() method"
            );
        };
        e.clearDocument = function (t) {
          l = null;
        };
      },
      5774: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.CancelConfiguration = e.CancelMethods = void 0);
        var n = r(251),
          a = r(6108),
          o = r(5871),
          i = r(7398),
          s = r(4272);
        (e.CancelMethods = {}),
          (e.CancelMethods.Cancel = function (t, e, r) {
            var n = t.GetBrackets(e, ""),
              a = t.ParseArg(e),
              o = i.default.keyvalOptions(n, s.ENCLOSE_OPTIONS);
            (o.notation = r), t.Push(t.create("node", "menclose", [a], o));
          }),
          (e.CancelMethods.CancelTo = function (t, e) {
            var r = t.GetBrackets(e, ""),
              n = t.ParseArg(e),
              o = t.ParseArg(e),
              l = i.default.keyvalOptions(r, s.ENCLOSE_OPTIONS);
            (l.notation = [
              a.TexConstant.Notation.UPDIAGONALSTRIKE,
              a.TexConstant.Notation.UPDIAGONALARROW,
              a.TexConstant.Notation.NORTHEASTARROW
            ].join(" ")),
              (n = t.create("node", "mpadded", [n], {
                depth: "-.1em",
                height: "+.1em",
                voffset: ".1em"
              })),
              t.Push(
                t.create("node", "msup", [
                  t.create("node", "menclose", [o], l),
                  n
                ])
              );
          }),
          new o.CommandMap(
            "cancel",
            {
              cancel: ["Cancel", a.TexConstant.Notation.UPDIAGONALSTRIKE],
              bcancel: ["Cancel", a.TexConstant.Notation.DOWNDIAGONALSTRIKE],
              xcancel: [
                "Cancel",
                a.TexConstant.Notation.UPDIAGONALSTRIKE +
                  " " +
                  a.TexConstant.Notation.DOWNDIAGONALSTRIKE
              ],
              cancelto: "CancelTo"
            },
            e.CancelMethods
          ),
          (e.CancelConfiguration = n.Configuration.create("cancel", {
            handler: { macro: ["cancel"] }
          }));
      },
      7530: function (t, e, r) {
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
          (e.CasesConfiguration =
            e.CasesMethods =
            e.CasesTags =
            e.CasesBeginItem =
              void 0);
        var i = r(251),
          s = r(5871),
          l = r(7398),
          c = r(7360),
          u = r(3402),
          d = r(2935),
          p = r(2577),
          m = r(9301),
          f = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              o(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "cases-begin";
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.checkItem = function (e) {
                return e.isKind("end") &&
                  e.getName() === this.getName() &&
                  this.getProperty("end")
                  ? (this.setProperty("end", !1), [[], !0])
                  : t.prototype.checkItem.call(this, e);
              }),
              e
            );
          })(d.BeginItem);
        e.CasesBeginItem = f;
        var h = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.subcounter = 0), e;
          }
          return (
            o(e, t),
            (e.prototype.start = function (e, r, n) {
              (this.subcounter = 0), t.prototype.start.call(this, e, r, n);
            }),
            (e.prototype.autoTag = function () {
              null == this.currentTag.tag &&
                ("subnumcases" === this.currentTag.env
                  ? (0 === this.subcounter && this.counter++,
                    this.subcounter++,
                    this.tag(
                      this.formatNumber(this.counter, this.subcounter),
                      !1
                    ))
                  : ((0 !== this.subcounter &&
                      "numcases-left" === this.currentTag.env) ||
                      this.counter++,
                    this.tag(this.formatNumber(this.counter), !1)));
            }),
            (e.prototype.formatNumber = function (t, e) {
              return (
                void 0 === e && (e = null),
                t.toString() + (null === e ? "" : String.fromCharCode(96 + e))
              );
            }),
            e
          );
        })(p.AmsTags);
        (e.CasesTags = h),
          (e.CasesMethods = {
            NumCases: function (t, e) {
              if (t.stack.env.closing === e.getName()) {
                delete t.stack.env.closing,
                  t.Push(
                    t.itemFactory.create("end").setProperty("name", e.getName())
                  );
                var r = t.stack.Top(),
                  n = r.Last,
                  a = l.default.copyNode(n, t),
                  o = r.getProperty("left");
                return (
                  m.EmpheqUtil.left(
                    n,
                    a,
                    o + "\\empheqlbrace\\,",
                    t,
                    "numcases-left"
                  ),
                  t.Push(
                    t.itemFactory.create("end").setProperty("name", e.getName())
                  ),
                  null
                );
              }
              o = t.GetArgument("\\begin{" + e.getName() + "}");
              e.setProperty("left", o);
              var i = c.default.EqnArray(t, e, !0, !0, "ll");
              return (
                (i.arraydef.displaystyle = !1),
                (i.arraydef.rowspacing = ".2em"),
                i.setProperty("numCases", !0),
                t.Push(e),
                i
              );
            },
            Entry: function (t, e) {
              if (!t.stack.Top().getProperty("numCases"))
                return c.default.Entry(t, e);
              t.Push(
                t.itemFactory
                  .create("cell")
                  .setProperties({ isEntry: !0, name: e })
              );
              for (var r = t.string, n = 0, a = t.i, o = r.length; a < o; ) {
                var i = r.charAt(a);
                if ("{" === i) n++, a++;
                else if ("}" === i) {
                  if (0 === n) break;
                  n--, a++;
                } else {
                  if ("&" === i && 0 === n)
                    throw new u.default(
                      "ExtraCasesAlignTab",
                      "Extra alignment tab in text for numcase environment"
                    );
                  if ("\\" === i && 0 === n) {
                    var s = (r.slice(a + 1).match(/^[a-z]+|./i) || [])[0];
                    if (
                      "\\" === s ||
                      "cr" === s ||
                      "end" === s ||
                      "label" === s
                    )
                      break;
                    a += s.length;
                  } else a++;
                }
              }
              var d = r.substr(t.i, a - t.i).replace(/^\s*/, "");
              t.PushAll(l.default.internalMath(t, d, 0)), (t.i = a);
            }
          }),
          new s.EnvironmentMap(
            "cases-env",
            m.EmpheqUtil.environment,
            {
              numcases: ["NumCases", "cases"],
              subnumcases: ["NumCases", "cases"]
            },
            e.CasesMethods
          ),
          new s.MacroMap("cases-macros", { "&": "Entry" }, e.CasesMethods),
          (e.CasesConfiguration = i.Configuration.create("cases", {
            handler: {
              environment: ["cases-env"],
              character: ["cases-macros"]
            },
            items: ((a = {}), (a[f.prototype.kind] = f), a),
            tags: { cases: h }
          }));
      },
      2286: function (t, e, r) {
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
                }
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.CenternotConfiguration = e.filterCenterOver = void 0);
        var a = r(251),
          o = r(2193),
          i = r(4748),
          s = r(5871),
          l = r(7360);
        function c(t) {
          var e,
            r,
            a = t.data;
          try {
            for (
              var o = n(a.getList("centerOver")), s = o.next();
              !s.done;
              s = o.next()
            ) {
              var l = s.value,
                c = i.default.getTexClass(l.childNodes[0].childNodes[0]);
              null !== c &&
                i.default.setProperties(
                  l.parent.parent.parent.parent.parent.parent,
                  { texClass: c }
                );
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
        }
        new s.CommandMap(
          "centernot",
          {
            centerOver: "CenterOver",
            centernot: ["Macro", "\\centerOver{#1}{{\u29f8}}", 1]
          },
          {
            CenterOver: function (t, e) {
              var r = "{" + t.GetArgument(e) + "}",
                n = t.ParseArg(e),
                a = new o.default(r, t.stack.env, t.configuration).mml(),
                i = t.create("node", "TeXAtom", [
                  new o.default(r, t.stack.env, t.configuration).mml(),
                  t.create(
                    "node",
                    "mpadded",
                    [
                      t.create("node", "mpadded", [n], {
                        width: 0,
                        lspace: "-.5width"
                      }),
                      t.create("node", "mphantom", [a])
                    ],
                    { width: 0, lspace: "-.5width" }
                  )
                ]);
              t.configuration.addNode("centerOver", a), t.Push(i);
            },
            Macro: l.default.Macro
          }
        ),
          (e.filterCenterOver = c),
          (e.CenternotConfiguration = a.Configuration.create("centernot", {
            handler: { macro: ["centernot"] },
            postprocessors: [c]
          }));
      },
      2224: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ColorConfiguration = void 0);
        var n = r(5871),
          a = r(251),
          o = r(6162),
          i = r(6358);
        new n.CommandMap(
          "color",
          {
            color: "Color",
            textcolor: "TextColor",
            definecolor: "DefineColor",
            colorbox: "ColorBox",
            fcolorbox: "FColorBox"
          },
          o.ColorMethods
        );
        e.ColorConfiguration = a.Configuration.create("color", {
          handler: { macro: ["color"] },
          options: { color: { padding: "5px", borderWidth: "2px" } },
          config: function (t, e) {
            e.parseOptions.packageData.set("color", {
              model: new i.ColorModel()
            });
          }
        });
      },
      2059: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.COLORS = void 0),
          (e.COLORS = new Map([
            ["Apricot", "#FBB982"],
            ["Aquamarine", "#00B5BE"],
            ["Bittersweet", "#C04F17"],
            ["Black", "#221E1F"],
            ["Blue", "#2D2F92"],
            ["BlueGreen", "#00B3B8"],
            ["BlueViolet", "#473992"],
            ["BrickRed", "#B6321C"],
            ["Brown", "#792500"],
            ["BurntOrange", "#F7921D"],
            ["CadetBlue", "#74729A"],
            ["CarnationPink", "#F282B4"],
            ["Cerulean", "#00A2E3"],
            ["CornflowerBlue", "#41B0E4"],
            ["Cyan", "#00AEEF"],
            ["Dandelion", "#FDBC42"],
            ["DarkOrchid", "#A4538A"],
            ["Emerald", "#00A99D"],
            ["ForestGreen", "#009B55"],
            ["Fuchsia", "#8C368C"],
            ["Goldenrod", "#FFDF42"],
            ["Gray", "#949698"],
            ["Green", "#00A64F"],
            ["GreenYellow", "#DFE674"],
            ["JungleGreen", "#00A99A"],
            ["Lavender", "#F49EC4"],
            ["LimeGreen", "#8DC73E"],
            ["Magenta", "#EC008C"],
            ["Mahogany", "#A9341F"],
            ["Maroon", "#AF3235"],
            ["Melon", "#F89E7B"],
            ["MidnightBlue", "#006795"],
            ["Mulberry", "#A93C93"],
            ["NavyBlue", "#006EB8"],
            ["OliveGreen", "#3C8031"],
            ["Orange", "#F58137"],
            ["OrangeRed", "#ED135A"],
            ["Orchid", "#AF72B0"],
            ["Peach", "#F7965A"],
            ["Periwinkle", "#7977B8"],
            ["PineGreen", "#008B72"],
            ["Plum", "#92268F"],
            ["ProcessBlue", "#00B0F0"],
            ["Purple", "#99479B"],
            ["RawSienna", "#974006"],
            ["Red", "#ED1B23"],
            ["RedOrange", "#F26035"],
            ["RedViolet", "#A1246B"],
            ["Rhodamine", "#EF559F"],
            ["RoyalBlue", "#0071BC"],
            ["RoyalPurple", "#613F99"],
            ["RubineRed", "#ED017D"],
            ["Salmon", "#F69289"],
            ["SeaGreen", "#3FBC9D"],
            ["Sepia", "#671800"],
            ["SkyBlue", "#46C5DD"],
            ["SpringGreen", "#C6DC67"],
            ["Tan", "#DA9D76"],
            ["TealBlue", "#00AEB3"],
            ["Thistle", "#D883B7"],
            ["Turquoise", "#00B4CE"],
            ["Violet", "#58429B"],
            ["VioletRed", "#EF58A0"],
            ["White", "#FFFFFF"],
            ["WildStrawberry", "#EE2967"],
            ["Yellow", "#FFF200"],
            ["YellowGreen", "#98CC70"],
            ["YellowOrange", "#FAA21A"]
          ]));
      },
      6162: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ColorMethods = void 0);
        var n = r(4748),
          a = r(7398);
        function o(t) {
          var e = "+" + t,
            r = t.replace(/^.*?([a-z]*)$/, "$1");
          return {
            width: "+" + 2 * parseFloat(e) + r,
            height: e,
            depth: e,
            lspace: t
          };
        }
        (e.ColorMethods = {}),
          (e.ColorMethods.Color = function (t, e) {
            var r = t.GetBrackets(e, ""),
              n = t.GetArgument(e),
              a = t.configuration.packageData.get("color").model.getColor(r, n),
              o = t.itemFactory
                .create("style")
                .setProperties({ styles: { mathcolor: a } });
            (t.stack.env.color = a), t.Push(o);
          }),
          (e.ColorMethods.TextColor = function (t, e) {
            var r = t.GetBrackets(e, ""),
              n = t.GetArgument(e),
              a = t.configuration.packageData.get("color").model.getColor(r, n),
              o = t.stack.env.color;
            t.stack.env.color = a;
            var i = t.ParseArg(e);
            o ? (t.stack.env.color = o) : delete t.stack.env.color;
            var s = t.create("node", "mstyle", [i], { mathcolor: a });
            t.Push(s);
          }),
          (e.ColorMethods.DefineColor = function (t, e) {
            var r = t.GetArgument(e),
              n = t.GetArgument(e),
              a = t.GetArgument(e);
            t.configuration.packageData.get("color").model.defineColor(n, r, a);
          }),
          (e.ColorMethods.ColorBox = function (t, e) {
            var r = t.GetArgument(e),
              i = a.default.internalMath(t, t.GetArgument(e)),
              s = t.configuration.packageData.get("color").model,
              l = t.create("node", "mpadded", i, {
                mathbackground: s.getColor("named", r)
              });
            n.default.setProperties(l, o(t.options.color.padding)), t.Push(l);
          }),
          (e.ColorMethods.FColorBox = function (t, e) {
            var r = t.GetArgument(e),
              i = t.GetArgument(e),
              s = a.default.internalMath(t, t.GetArgument(e)),
              l = t.options.color,
              c = t.configuration.packageData.get("color").model,
              u = t.create("node", "mpadded", s, {
                mathbackground: c.getColor("named", i),
                style:
                  "border: " +
                  l.borderWidth +
                  " solid " +
                  c.getColor("named", r)
              });
            n.default.setProperties(u, o(l.padding)), t.Push(u);
          });
      },
      6358: function (t, e, r) {
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
                }
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ColorModel = void 0);
        var a = r(3402),
          o = r(2059),
          i = new Map(),
          s = (function () {
            function t() {
              this.userColors = new Map();
            }
            return (
              (t.prototype.normalizeColor = function (t, e) {
                if (!t || "named" === t) return e;
                if (i.has(t)) return i.get(t)(e);
                throw new a.default(
                  "UndefinedColorModel",
                  "Color model '%1' not defined",
                  t
                );
              }),
              (t.prototype.getColor = function (t, e) {
                return t && "named" !== t
                  ? this.normalizeColor(t, e)
                  : this.getColorByName(e);
              }),
              (t.prototype.getColorByName = function (t) {
                return this.userColors.has(t)
                  ? this.userColors.get(t)
                  : o.COLORS.has(t)
                  ? o.COLORS.get(t)
                  : t;
              }),
              (t.prototype.defineColor = function (t, e, r) {
                var n = this.normalizeColor(t, r);
                this.userColors.set(e, n);
              }),
              t
            );
          })();
        (e.ColorModel = s),
          i.set("rgb", function (t) {
            var e,
              r,
              o = t.trim().split(/\s*,\s*/),
              i = "#";
            if (3 !== o.length)
              throw new a.default(
                "ModelArg1",
                "Color values for the %1 model require 3 numbers",
                "rgb"
              );
            try {
              for (var s = n(o), l = s.next(); !l.done; l = s.next()) {
                var c = l.value;
                if (!c.match(/^(\d+(\.\d*)?|\.\d+)$/))
                  throw new a.default(
                    "InvalidDecimalNumber",
                    "Invalid decimal number"
                  );
                var u = parseFloat(c);
                if (u < 0 || u > 1)
                  throw new a.default(
                    "ModelArg2",
                    "Color values for the %1 model must be between %2 and %3",
                    "rgb",
                    "0",
                    "1"
                  );
                var d = Math.floor(255 * u).toString(16);
                d.length < 2 && (d = "0" + d), (i += d);
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                l && !l.done && (r = s.return) && r.call(s);
              } finally {
                if (e) throw e.error;
              }
            }
            return i;
          }),
          i.set("RGB", function (t) {
            var e,
              r,
              o = t.trim().split(/\s*,\s*/),
              i = "#";
            if (3 !== o.length)
              throw new a.default(
                "ModelArg1",
                "Color values for the %1 model require 3 numbers",
                "RGB"
              );
            try {
              for (var s = n(o), l = s.next(); !l.done; l = s.next()) {
                var c = l.value;
                if (!c.match(/^\d+$/))
                  throw new a.default("InvalidNumber", "Invalid number");
                var u = parseInt(c);
                if (u > 255)
                  throw new a.default(
                    "ModelArg2",
                    "Color values for the %1 model must be between %2 and %3",
                    "RGB",
                    "0",
                    "255"
                  );
                var d = u.toString(16);
                d.length < 2 && (d = "0" + d), (i += d);
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                l && !l.done && (r = s.return) && r.call(s);
              } finally {
                if (e) throw e.error;
              }
            }
            return i;
          }),
          i.set("gray", function (t) {
            if (!t.match(/^\s*(\d+(\.\d*)?|\.\d+)\s*$/))
              throw new a.default(
                "InvalidDecimalNumber",
                "Invalid decimal number"
              );
            var e = parseFloat(t);
            if (e < 0 || e > 1)
              throw new a.default(
                "ModelArg2",
                "Color values for the %1 model must be between %2 and %3",
                "gray",
                "0",
                "1"
              );
            var r = Math.floor(255 * e).toString(16);
            return r.length < 2 && (r = "0" + r), "#" + r + r + r;
          });
      },
      4558: function (t, e, r) {
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
          (e.ColortblConfiguration = e.ColorArrayItem = void 0);
        var o = r(2935),
          i = r(251),
          s = r(5871),
          l = r(3402),
          c = (function (t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (
                (e.color = { cell: "", row: "", col: [] }), (e.hasColor = !1), e
              );
            }
            return (
              a(e, t),
              (e.prototype.EndEntry = function () {
                t.prototype.EndEntry.call(this);
                var e = this.row[this.row.length - 1],
                  r =
                    this.color.cell ||
                    this.color.row ||
                    this.color.col[this.row.length - 1];
                r &&
                  (e.attributes.set("mathbackground", r),
                  (this.color.cell = ""),
                  (this.hasColor = !0));
              }),
              (e.prototype.EndRow = function () {
                t.prototype.EndRow.call(this), (this.color.row = "");
              }),
              (e.prototype.createMml = function () {
                var e = t.prototype.createMml.call(this),
                  r = e.isKind("mrow") ? e.childNodes[1] : e;
                return (
                  r.isKind("menclose") && (r = r.childNodes[0].childNodes[0]),
                  this.hasColor &&
                    "none" === r.attributes.get("frame") &&
                    r.attributes.set("frame", ""),
                  e
                );
              }),
              e
            );
          })(o.ArrayItem);
        (e.ColorArrayItem = c),
          new s.CommandMap(
            "colortbl",
            {
              cellcolor: ["TableColor", "cell"],
              rowcolor: ["TableColor", "row"],
              columncolor: ["TableColor", "col"]
            },
            {
              TableColor: function (t, e, r) {
                var n = t.configuration.packageData.get("color").model,
                  a = t.GetBrackets(e, ""),
                  o = n.getColor(a, t.GetArgument(e)),
                  i = t.stack.Top();
                if (!(i instanceof c))
                  throw new l.default(
                    "UnsupportedTableColor",
                    "Unsupported use of %1",
                    t.currentCS
                  );
                if ("col" === r) {
                  if (i.table.length)
                    throw new l.default(
                      "ColumnColorNotTop",
                      "%1 must be in the top row",
                      e
                    );
                  (i.color.col[i.row.length] = o),
                    t.GetBrackets(e, "") && t.GetBrackets(e, "");
                } else if (
                  ((i.color[r] = o), "row" === r && (i.Size() || i.row.length))
                )
                  throw new l.default(
                    "RowColorNotFirst",
                    "%1 must be at the beginning of a row",
                    e
                  );
              }
            }
          );
        e.ColortblConfiguration = i.Configuration.create("colortbl", {
          handler: { macro: ["colortbl"] },
          items: { array: c },
          priority: 10,
          config: [
            function (t, e) {
              e.parseOptions.packageData.has("color") ||
                i.ConfigurationHandler.get("color").config(t, e);
            },
            10
          ]
        });
      },
      7888: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ColorConfiguration = e.ColorV2Methods = void 0);
        var n = r(5871),
          a = r(251);
        (e.ColorV2Methods = {
          Color: function (t, e) {
            var r = t.GetArgument(e),
              n = t.stack.env.color;
            t.stack.env.color = r;
            var a = t.ParseArg(e);
            n ? (t.stack.env.color = n) : delete t.stack.env.color;
            var o = t.create("node", "mstyle", [a], { mathcolor: r });
            t.Push(o);
          }
        }),
          new n.CommandMap("colorv2", { color: "Color" }, e.ColorV2Methods),
          (e.ColorConfiguration = a.Configuration.create("colorv2", {
            handler: { macro: ["colorv2"] }
          }));
      },
      6359: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ConfigMacrosConfiguration = void 0);
        var o = r(251),
          i = r(5074),
          s = r(5871),
          l = r(4945),
          c = r(4924),
          u = r(1107),
          d = r(1205),
          p = "configmacros-map",
          m = "configmacros-env-map";
        e.ConfigMacrosConfiguration = o.Configuration.create("configmacros", {
          init: function (t) {
            new s.CommandMap(p, {}, {}),
              new s.EnvironmentMap(m, l.default.environment, {}, {}),
              t.append(
                o.Configuration.local({
                  handler: { macro: [p], environment: [m] },
                  priority: 3
                })
              );
          },
          config: function (t, e) {
            !(function (t) {
              var e,
                r,
                n = t.parseOptions.handlers.retrieve(p),
                o = t.parseOptions.options.macros;
              try {
                for (
                  var i = a(Object.keys(o)), s = i.next();
                  !s.done;
                  s = i.next()
                ) {
                  var l = s.value,
                    d = "string" == typeof o[l] ? [o[l]] : o[l],
                    m = Array.isArray(d[2])
                      ? new c.Macro(
                          l,
                          u.default.MacroWithTemplate,
                          d.slice(0, 2).concat(d[2])
                        )
                      : new c.Macro(l, u.default.Macro, d);
                  n.add(l, m);
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
                  n = t.parseOptions.handlers.retrieve(m),
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
                      new c.Macro(l, u.default.BeginEnv, [!0].concat(o[l]))
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
            ((n = {}), (n[d.BeginEnvItem.prototype.kind] = d.BeginEnvItem), n),
          options: { macros: i.expandable({}), environments: i.expandable({}) }
        });
      },
      2079: function (t, e, r) {
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
          (e.EmpheqConfiguration =
            e.EmpheqMethods =
            e.EmpheqBeginItem =
              void 0);
        var s = r(251),
          l = r(5871),
          c = r(7398),
          u = r(3402),
          d = r(2935),
          p = r(9301),
          m = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              o(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "empheq-begin";
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.checkItem = function (e) {
                return (
                  e.isKind("end") &&
                    e.getName() === this.getName() &&
                    this.setProperty("end", !1),
                  t.prototype.checkItem.call(this, e)
                );
              }),
              e
            );
          })(d.BeginItem);
        (e.EmpheqBeginItem = m),
          (e.EmpheqMethods = {
            Empheq: function (t, e) {
              if (t.stack.env.closing === e.getName()) {
                delete t.stack.env.closing,
                  t.Push(
                    t.itemFactory
                      .create("end")
                      .setProperty("name", t.stack.global.empheq)
                  ),
                  (t.stack.global.empheq = "");
                var r = t.stack.Top();
                p.EmpheqUtil.adjustTable(r, t),
                  t.Push(
                    t.itemFactory.create("end").setProperty("name", "empheq")
                  );
              } else {
                c.default.checkEqnEnv(t), delete t.stack.global.eqnenv;
                var n = t.GetBrackets("\\begin{" + e.getName() + "}") || "",
                  a = i(
                    (t.GetArgument("\\begin{" + e.getName() + "}") || "").split(
                      /=/
                    ),
                    2
                  ),
                  o = a[0],
                  s = a[1];
                if (!p.EmpheqUtil.checkEnv(o))
                  throw new u.default(
                    "UnknownEnv",
                    'Unknown environment "%1"',
                    o
                  );
                n &&
                  e.setProperties(
                    p.EmpheqUtil.splitOptions(n, { left: 1, right: 1 })
                  ),
                  (t.stack.global.empheq = o),
                  (t.string =
                    "\\begin{" +
                    o +
                    "}" +
                    (s ? "{" + s + "}" : "") +
                    t.string.slice(t.i)),
                  (t.i = 0),
                  t.Push(e);
              }
            },
            EmpheqMO: function (t, e, r) {
              t.Push(t.create("token", "mo", {}, r));
            },
            EmpheqDelim: function (t, e) {
              var r = t.GetDelimiter(e);
              t.Push(
                t.create("token", "mo", { stretchy: !0, symmetric: !0 }, r)
              );
            }
          }),
          new l.EnvironmentMap(
            "empheq-env",
            p.EmpheqUtil.environment,
            { empheq: ["Empheq", "empheq"] },
            e.EmpheqMethods
          ),
          new l.CommandMap(
            "empheq-macros",
            {
              empheqlbrace: ["EmpheqMO", "{"],
              empheqrbrace: ["EmpheqMO", "}"],
              empheqlbrack: ["EmpheqMO", "["],
              empheqrbrack: ["EmpheqMO", "]"],
              empheqlangle: ["EmpheqMO", "\u27e8"],
              empheqrangle: ["EmpheqMO", "\u27e9"],
              empheqlparen: ["EmpheqMO", "("],
              empheqrparen: ["EmpheqMO", ")"],
              empheqlvert: ["EmpheqMO", "|"],
              empheqrvert: ["EmpheqMO", "|"],
              empheqlVert: ["EmpheqMO", "\u2016"],
              empheqrVert: ["EmpheqMO", "\u2016"],
              empheqlfloor: ["EmpheqMO", "\u230a"],
              empheqrfloor: ["EmpheqMO", "\u230b"],
              empheqlceil: ["EmpheqMO", "\u2308"],
              empheqrceil: ["EmpheqMO", "\u2309"],
              empheqbiglbrace: ["EmpheqMO", "{"],
              empheqbigrbrace: ["EmpheqMO", "}"],
              empheqbiglbrack: ["EmpheqMO", "["],
              empheqbigrbrack: ["EmpheqMO", "]"],
              empheqbiglangle: ["EmpheqMO", "\u27e8"],
              empheqbigrangle: ["EmpheqMO", "\u27e9"],
              empheqbiglparen: ["EmpheqMO", "("],
              empheqbigrparen: ["EmpheqMO", ")"],
              empheqbiglvert: ["EmpheqMO", "|"],
              empheqbigrvert: ["EmpheqMO", "|"],
              empheqbiglVert: ["EmpheqMO", "\u2016"],
              empheqbigrVert: ["EmpheqMO", "\u2016"],
              empheqbiglfloor: ["EmpheqMO", "\u230a"],
              empheqbigrfloor: ["EmpheqMO", "\u230b"],
              empheqbiglceil: ["EmpheqMO", "\u2308"],
              empheqbigrceil: ["EmpheqMO", "\u2309"],
              empheql: "EmpheqDelim",
              empheqr: "EmpheqDelim",
              empheqbigl: "EmpheqDelim",
              empheqbigr: "EmpheqDelim"
            },
            e.EmpheqMethods
          ),
          (e.EmpheqConfiguration = s.Configuration.create("empheq", {
            handler: { macro: ["empheq-macros"], environment: ["empheq-env"] },
            items: ((a = {}), (a[m.prototype.kind] = m), a)
          }));
      },
      9301: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.EmpheqUtil = void 0);
        var i = r(7398),
          s = r(2193);
        e.EmpheqUtil = {
          environment: function (t, e, r, o) {
            var i = o[0],
              s = t.itemFactory
                .create(i + "-begin")
                .setProperties({ name: e, end: i });
            t.Push(r.apply(void 0, a([t, s], n(o.slice(1)))));
          },
          splitOptions: function (t, e) {
            return (
              void 0 === e && (e = null), i.default.keyvalOptions(t, e, !0)
            );
          },
          columnCount: function (t) {
            var e,
              r,
              n = 0;
            try {
              for (
                var a = o(t.childNodes), i = a.next();
                !i.done;
                i = a.next()
              ) {
                var s = i.value,
                  l = s.childNodes.length - (s.isKind("mlabeledtr") ? 1 : 0);
                l > n && (n = l);
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                i && !i.done && (r = a.return) && r.call(a);
              } finally {
                if (e) throw e.error;
              }
            }
            return n;
          },
          cellBlock: function (t, e, r, n) {
            var a,
              i,
              l = r.create("node", "mpadded", [], {
                height: 0,
                depth: 0,
                voffset: "-1height"
              }),
              c = new s.default(t, r.stack.env, r.configuration),
              u = c.mml();
            n &&
              c.configuration.tags.label &&
              ((c.configuration.tags.currentTag.env = n),
              c.configuration.tags.getTag(!0));
            try {
              for (
                var d = o(u.isInferred ? u.childNodes : [u]), p = d.next();
                !p.done;
                p = d.next()
              ) {
                var m = p.value;
                l.appendChild(m);
              }
            } catch (t) {
              a = { error: t };
            } finally {
              try {
                p && !p.done && (i = d.return) && i.call(d);
              } finally {
                if (a) throw a.error;
              }
            }
            return (
              l.appendChild(
                r.create("node", "mphantom", [
                  r.create("node", "mpadded", [e], { width: 0 })
                ])
              ),
              l
            );
          },
          topRowTable: function (t, e) {
            var r = i.default.copyNode(t, e);
            return (
              r.setChildren(r.childNodes.slice(0, 1)),
              r.attributes.set("align", "baseline 1"),
              t.factory.create("mphantom", {}, [
                e.create("node", "mpadded", [r], { width: 0 })
              ])
            );
          },
          rowspanCell: function (t, e, r, n, a) {
            t.appendChild(
              n.create(
                "node",
                "mpadded",
                [
                  this.cellBlock(e, i.default.copyNode(r, n), n, a),
                  this.topRowTable(r, n)
                ],
                { height: 0, depth: 0, voffset: "height" }
              )
            );
          },
          left: function (t, e, r, n, a) {
            var i, s, l;
            void 0 === a && (a = ""),
              t.attributes.set(
                "columnalign",
                "right " + (t.attributes.get("columnalign") || "")
              ),
              t.attributes.set(
                "columnspacing",
                "0em " + (t.attributes.get("columnspacing") || "")
              );
            try {
              for (
                var c = o(t.childNodes.slice(0).reverse()), u = c.next();
                !u.done;
                u = c.next()
              ) {
                var d = u.value;
                (l = n.create("node", "mtd")),
                  d.childNodes.unshift(l),
                  d.replaceChild(l, l),
                  d.isKind("mlabeledtr") &&
                    ((d.childNodes[0] = d.childNodes[1]),
                    (d.childNodes[1] = l));
              }
            } catch (t) {
              i = { error: t };
            } finally {
              try {
                u && !u.done && (s = c.return) && s.call(c);
              } finally {
                if (i) throw i.error;
              }
            }
            this.rowspanCell(l, r, e, n, a);
          },
          right: function (t, r, n, a, o) {
            void 0 === o && (o = ""),
              0 === t.childNodes.length &&
                t.appendChild(a.create("node", "mtr"));
            for (
              var i = e.EmpheqUtil.columnCount(t), s = t.childNodes[0];
              s.childNodes.length < i;

            )
              s.appendChild(a.create("node", "mtd"));
            var l = s.appendChild(a.create("node", "mtd"));
            e.EmpheqUtil.rowspanCell(l, n, r, a, o),
              t.attributes.set(
                "columnalign",
                (t.attributes.get("columnalign") || "")
                  .split(/ /)
                  .slice(0, i)
                  .join(" ") + " left"
              ),
              t.attributes.set(
                "columnspacing",
                (t.attributes.get("columnspacing") || "")
                  .split(/ /)
                  .slice(0, i - 1)
                  .join(" ") + " 0em"
              );
          },
          adjustTable: function (t, e) {
            var r = t.getProperty("left"),
              n = t.getProperty("right");
            if (r || n) {
              var a = t.Last,
                o = i.default.copyNode(a, e);
              r && this.left(a, o, r, e), n && this.right(a, o, n, e);
            }
          },
          allowEnv: {
            equation: !0,
            align: !0,
            gather: !0,
            flalign: !0,
            alignat: !0,
            multline: !0
          },
          checkEnv: function (t) {
            return this.allowEnv.hasOwnProperty(t.replace(/\*$/, "")) || !1;
          }
        };
      },
      4272: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.EncloseConfiguration =
            e.EncloseMethods =
            e.ENCLOSE_OPTIONS =
              void 0);
        var n = r(251),
          a = r(5871),
          o = r(7398);
        (e.ENCLOSE_OPTIONS = {
          "data-arrowhead": 1,
          color: 1,
          mathcolor: 1,
          background: 1,
          mathbackground: 1,
          "data-padding": 1,
          "data-thickness": 1
        }),
          (e.EncloseMethods = {}),
          (e.EncloseMethods.Enclose = function (t, r) {
            var n = t.GetArgument(r).replace(/,/g, " "),
              a = t.GetBrackets(r, ""),
              i = t.ParseArg(r),
              s = o.default.keyvalOptions(a, e.ENCLOSE_OPTIONS);
            (s.notation = n), t.Push(t.create("node", "menclose", [i], s));
          }),
          new a.CommandMap("enclose", { enclose: "Enclose" }, e.EncloseMethods),
          (e.EncloseConfiguration = n.Configuration.create("enclose", {
            handler: { macro: ["enclose"] }
          }));
      },
      3646: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ExtpfeilConfiguration = e.ExtpfeilMethods = void 0);
        var n = r(251),
          a = r(5871),
          o = r(8016),
          i = r(4406),
          s = r(2048),
          l = r(3402);
        (e.ExtpfeilMethods = {}),
          (e.ExtpfeilMethods.xArrow = o.AmsMethods.xArrow),
          (e.ExtpfeilMethods.NewExtArrow = function (t, r) {
            var n = t.GetArgument(r),
              a = t.GetArgument(r),
              o = t.GetArgument(r);
            if (!n.match(/^\\([a-z]+|.)$/i))
              throw new l.default(
                "NewextarrowArg1",
                "First argument to %1 must be a control sequence name",
                r
              );
            if (!a.match(/^(\d+),(\d+)$/))
              throw new l.default(
                "NewextarrowArg2",
                "Second argument to %1 must be two integers separated by a comma",
                r
              );
            if (!o.match(/^(\d+|0x[0-9A-F]+)$/i))
              throw new l.default(
                "NewextarrowArg3",
                "Third argument to %1 must be a unicode character number",
                r
              );
            n = n.substr(1);
            var s = a.split(",");
            i.default.addMacro(t, n, e.ExtpfeilMethods.xArrow, [
              parseInt(o),
              parseInt(s[0]),
              parseInt(s[1])
            ]);
          }),
          new a.CommandMap(
            "extpfeil",
            {
              xtwoheadrightarrow: ["xArrow", 8608, 12, 16],
              xtwoheadleftarrow: ["xArrow", 8606, 17, 13],
              xmapsto: ["xArrow", 8614, 6, 7],
              xlongequal: ["xArrow", 61, 7, 7],
              xtofrom: ["xArrow", 8644, 12, 12],
              Newextarrow: "NewExtArrow"
            },
            e.ExtpfeilMethods
          );
        e.ExtpfeilConfiguration = n.Configuration.create("extpfeil", {
          handler: { macro: ["extpfeil"] },
          init: function (t) {
            s.NewcommandConfiguration.init(t);
          }
        });
      },
      2082: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.GensymbConfiguration = void 0);
        var n = r(251),
          a = r(6108);
        new (r(5871).CharacterMap)(
          "gensymb-symbols",
          function (t, e) {
            var r = e.attributes || {};
            (r.mathvariant = a.TexConstant.Variant.NORMAL),
              (r.class = "MathML-Unit");
            var n = t.create("token", "mi", r, e.char);
            t.Push(n);
          },
          {
            ohm: "\u2126",
            degree: "\xb0",
            celsius: "\u2103",
            perthousand: "\u2030",
            micro: "\xb5"
          }
        ),
          (e.GensymbConfiguration = n.Configuration.create("gensymb", {
            handler: { macro: ["gensymb-symbols"] }
          }));
      },
      1738: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.HtmlConfiguration = void 0);
        var n = r(251),
          a = r(5871),
          o = r(6248);
        new a.CommandMap(
          "html_macros",
          { href: "Href", class: "Class", style: "Style", cssId: "Id" },
          o.default
        ),
          (e.HtmlConfiguration = n.Configuration.create("html", {
            handler: { macro: ["html_macros"] }
          }));
      },
      6248: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(4748),
          a = {
            Href: function (t, e) {
              var r = t.GetArgument(e),
                a = o(t, e);
              n.default.setAttribute(a, "href", r), t.Push(a);
            },
            Class: function (t, e) {
              var r = t.GetArgument(e),
                a = o(t, e),
                i = n.default.getAttribute(a, "class");
              i && (r = i + " " + r),
                n.default.setAttribute(a, "class", r),
                t.Push(a);
            },
            Style: function (t, e) {
              var r = t.GetArgument(e),
                a = o(t, e),
                i = n.default.getAttribute(a, "style");
              i &&
                (";" !== r.charAt(r.length - 1) && (r += ";"),
                (r = i + " " + r)),
                n.default.setAttribute(a, "style", r),
                t.Push(a);
            },
            Id: function (t, e) {
              var r = t.GetArgument(e),
                a = o(t, e);
              n.default.setAttribute(a, "id", r), t.Push(a);
            }
          },
          o = function (t, e) {
            var r = t.ParseArg(e);
            if (!n.default.isInferred(r)) return r;
            var a = n.default.getChildren(r);
            if (1 === a.length) return a[0];
            var o = t.create("node", "mrow");
            return (
              n.default.copyChildren(r, o), n.default.copyAttributes(r, o), o
            );
          };
        e.default = a;
      },
      205: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MathtoolsConfiguration =
            e.fixPrescripts =
            e.PAIREDDELIMS =
              void 0);
        var o = r(251),
          i = r(5871),
          s = r(4748),
          l = r(5074);
        r(8926);
        var c = r(5262),
          u = r(3298),
          d = r(144);
        function p(t) {
          var e,
            r,
            n,
            o,
            i,
            l,
            c = t.data;
          try {
            for (
              var u = a(c.getList("mmultiscripts")), d = u.next();
              !d.done;
              d = u.next()
            ) {
              var p = d.value;
              if (p.getProperty("fixPrescript")) {
                var m = s.default.getChildren(p),
                  f = 0;
                try {
                  for (
                    var h = ((n = void 0), a([1, 2])), g = h.next();
                    !g.done;
                    g = h.next()
                  ) {
                    m[(x = g.value)] ||
                      (s.default.setChild(
                        p,
                        x,
                        c.nodeFactory.create("node", "none")
                      ),
                      f++);
                  }
                } catch (t) {
                  n = { error: t };
                } finally {
                  try {
                    g && !g.done && (o = h.return) && o.call(h);
                  } finally {
                    if (n) throw n.error;
                  }
                }
                try {
                  for (
                    var v = ((i = void 0), a([4, 5])), y = v.next();
                    !y.done;
                    y = v.next()
                  ) {
                    var x = y.value;
                    s.default.isType(m[x], "mrow") &&
                      0 === s.default.getChildren(m[x]).length &&
                      s.default.setChild(
                        p,
                        x,
                        c.nodeFactory.create("node", "none")
                      );
                  }
                } catch (t) {
                  i = { error: t };
                } finally {
                  try {
                    y && !y.done && (l = v.return) && l.call(v);
                  } finally {
                    if (i) throw i.error;
                  }
                }
                2 === f && m.splice(1, 2);
              }
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              d && !d.done && (r = u.return) && r.call(u);
            } finally {
              if (e) throw e.error;
            }
          }
        }
        (e.PAIREDDELIMS = "mathtools-paired-delims"),
          (e.fixPrescripts = p),
          (e.MathtoolsConfiguration = o.Configuration.create("mathtools", {
            handler: {
              macro: ["mathtools-macros", "mathtools-delimiters"],
              environment: ["mathtools-environments"],
              delimiter: ["mathtools-delimiters"],
              character: ["mathtools-characters"]
            },
            items:
              ((n = {}),
              (n[d.MultlinedItem.prototype.kind] = d.MultlinedItem),
              n),
            init: function (t) {
              new i.CommandMap(e.PAIREDDELIMS, {}, {}),
                t.append(
                  o.Configuration.local({
                    handler: { macro: [e.PAIREDDELIMS] },
                    priority: -5
                  })
                );
            },
            config: function (t, e) {
              var r,
                n,
                o = e.parseOptions,
                i = o.options.mathtools.pairedDelimiters;
              try {
                for (
                  var s = a(Object.keys(i)), l = s.next();
                  !l.done;
                  l = s.next()
                ) {
                  var d = l.value;
                  c.MathtoolsUtil.addPairedDelims(o, d, i[d]);
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  l && !l.done && (n = s.return) && n.call(s);
                } finally {
                  if (r) throw r.error;
                }
              }
              u.MathtoolsTagFormat(t, e);
            },
            postprocessors: [[p, -6]],
            options: {
              mathtools: {
                multlinegap: "1em",
                "multlined-pos": "c",
                "firstline-afterskip": "",
                "lastline-preskip": "",
                "smallmatrix-align": "c",
                shortvdotsadjustabove: ".2em",
                shortvdotsadjustbelow: ".2em",
                centercolon: !1,
                "centercolon-offset": ".04em",
                "thincolon-dx": "-.04em",
                "thincolon-dw": "-.08em",
                "use-unicode": !1,
                "prescript-sub-format": "",
                "prescript-sup-format": "",
                "prescript-arg-format": "",
                "allow-mathtoolsset": !0,
                pairedDelimiters: l.expandable({}),
                tagforms: l.expandable({})
              }
            }
          }));
      },
      144: function (t, e, r) {
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
          (e.MultlinedItem = void 0);
        var o = r(7971),
          i = r(4748),
          s = r(6108),
          l = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "multlined";
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.EndTable = function () {
                if (
                  ((this.Size() || this.row.length) &&
                    (this.EndEntry(), this.EndRow()),
                  this.table.length > 1)
                ) {
                  var e = this.factory.configuration.options.mathtools,
                    r = e.multlinegap,
                    n = e["firstline-afterskip"] || r,
                    a = e["lastline-preskip"] || r,
                    o = i.default.getChildren(this.table[0])[0];
                  i.default.getAttribute(o, "columnalign") !==
                    s.TexConstant.Align.RIGHT &&
                    o.appendChild(
                      this.create("node", "mspace", [], { width: n })
                    );
                  var l = i.default.getChildren(
                    this.table[this.table.length - 1]
                  )[0];
                  if (
                    i.default.getAttribute(l, "columnalign") !==
                    s.TexConstant.Align.LEFT
                  ) {
                    var c = i.default.getChildren(l)[0];
                    c.childNodes.unshift(null);
                    var u = this.create("node", "mspace", [], { width: a });
                    i.default.setChild(c, 0, u);
                  }
                }
                t.prototype.EndTable.call(this);
              }),
              e
            );
          })(o.MultlineItem);
        e.MultlinedItem = l;
      },
      8926: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(4945),
          a = r(5871),
          o = r(6108),
          i = r(2178);
        new a.CommandMap(
          "mathtools-macros",
          {
            shoveleft: ["HandleShove", o.TexConstant.Align.LEFT],
            shoveright: ["HandleShove", o.TexConstant.Align.RIGHT],
            xleftrightarrow: ["xArrow", 8596, 10, 10],
            xLeftarrow: ["xArrow", 8656, 12, 7],
            xRightarrow: ["xArrow", 8658, 7, 12],
            xLeftrightarrow: ["xArrow", 8660, 12, 12],
            xhookleftarrow: ["xArrow", 8617, 10, 5],
            xhookrightarrow: ["xArrow", 8618, 5, 10],
            xmapsto: ["xArrow", 8614, 10, 10],
            xrightharpoondown: ["xArrow", 8641, 5, 10],
            xleftharpoondown: ["xArrow", 8637, 10, 5],
            xrightleftharpoons: ["xArrow", 8652, 10, 10],
            xrightharpoonup: ["xArrow", 8640, 5, 10],
            xleftharpoonup: ["xArrow", 8636, 10, 5],
            xleftrightharpoons: ["xArrow", 8651, 10, 10],
            mathllap: ["MathLap", "l", !1],
            mathrlap: ["MathLap", "r", !1],
            mathclap: ["MathLap", "c", !1],
            clap: ["MtLap", "c"],
            textllap: ["MtLap", "l"],
            textrlap: ["MtLap", "r"],
            textclap: ["MtLap", "c"],
            cramped: "Cramped",
            crampedllap: ["MathLap", "l", !0],
            crampedrlap: ["MathLap", "r", !0],
            crampedclap: ["MathLap", "c", !0],
            crampedsubstack: [
              "Macro",
              "\\begin{crampedsubarray}{c}#1\\end{crampedsubarray}",
              1
            ],
            mathmbox: "MathMBox",
            mathmakebox: "MathMakeBox",
            overbracket: "UnderOverBracket",
            underbracket: "UnderOverBracket",
            refeq: "HandleRef",
            MoveEqLeft: ["Macro", "\\hspace{#1em}&\\hspace{-#1em}", 1, "2"],
            Aboxed: "Aboxed",
            ArrowBetweenLines: "ArrowBetweenLines",
            vdotswithin: "VDotsWithin",
            shortvdotswithin: "ShortVDotsWithin",
            MTFlushSpaceAbove: "FlushSpaceAbove",
            MTFlushSpaceBelow: "FlushSpaceBelow",
            DeclarePairedDelimiters: "DeclarePairedDelimiters",
            DeclarePairedDelimitersX: "DeclarePairedDelimitersX",
            DeclarePairedDelimitersXPP: "DeclarePairedDelimitersXPP",
            centercolon: ["CenterColon", !0, !0],
            ordinarycolon: ["CenterColon", !1],
            MTThinColon: ["CenterColon", !0, !0, !0],
            coloneqq: ["Relation", ":=", "\u2254"],
            Coloneqq: ["Relation", "::=", "\u2a74"],
            coloneq: ["Relation", ":-"],
            Coloneq: ["Relation", "::-"],
            eqqcolon: ["Relation", "=:", "\u2255"],
            Eqqcolon: ["Relation", "=::"],
            eqcolon: ["Relation", "-:", "\u2239"],
            Eqcolon: ["Relation", "-::"],
            colonapprox: ["Relation", ":\\approx"],
            Colonapprox: ["Relation", "::\\approx"],
            colonsim: ["Relation", ":\\sim"],
            Colonsim: ["Relation", "::\\sim"],
            dblcolon: ["Relation", "::", "\u2237"],
            nuparrow: ["NArrow", "\u2191", ".06em"],
            ndownarrow: ["NArrow", "\u2193", ".25em"],
            bigtimes: [
              "Macro",
              "\\mathop{\\Large\\kern-.1em\\boldsymbol{\\times}\\kern-.1em}"
            ],
            splitfrac: ["SplitFrac", !1],
            splitdfrac: ["SplitFrac", !0],
            xmathstrut: "XMathStrut",
            prescript: "Prescript",
            newtagform: ["NewTagForm", !1],
            renewtagform: ["NewTagForm", !0],
            usetagform: "UseTagForm",
            adjustlimits: [
              "MacroWithTemplate",
              "\\mathop{{#1}\\vphantom{{#3}}}_{{#2}\\vphantom{{#4}}}\\mathop{{#3}\\vphantom{{#1}}}_{{#4}\\vphantom{{#2}}}",
              4,
              ,
              "_",
              ,
              "_"
            ],
            mathtoolsset: "SetOptions"
          },
          i.MathtoolsMethods
        ),
          new a.EnvironmentMap(
            "mathtools-environments",
            n.default.environment,
            {
              dcases: ["Array", null, "\\{", "", "ll", null, ".2em", "D"],
              rcases: ["Array", null, "", "\\}", "ll", null, ".2em"],
              drcases: ["Array", null, "", "\\}", "ll", null, ".2em", "D"],
              "dcases*": ["Cases", null, "{", "", "D"],
              "rcases*": ["Cases", null, "", "}"],
              "drcases*": ["Cases", null, "", "}", "D"],
              "cases*": ["Cases", null, "{", ""],
              "matrix*": ["MtMatrix", null, null, null],
              "pmatrix*": ["MtMatrix", null, "(", ")"],
              "bmatrix*": ["MtMatrix", null, "[", "]"],
              "Bmatrix*": ["MtMatrix", null, "\\{", "\\}"],
              "vmatrix*": ["MtMatrix", null, "\\vert", "\\vert"],
              "Vmatrix*": ["MtMatrix", null, "\\Vert", "\\Vert"],
              "smallmatrix*": ["MtSmallMatrix", null, null, null],
              psmallmatrix: ["MtSmallMatrix", null, "(", ")", "c"],
              "psmallmatrix*": ["MtSmallMatrix", null, "(", ")"],
              bsmallmatrix: ["MtSmallMatrix", null, "[", "]", "c"],
              "bsmallmatrix*": ["MtSmallMatrix", null, "[", "]"],
              Bsmallmatrix: ["MtSmallMatrix", null, "\\{", "\\}", "c"],
              "Bsmallmatrix*": ["MtSmallMatrix", null, "\\{", "\\}"],
              vsmallmatrix: ["MtSmallMatrix", null, "\\vert", "\\vert", "c"],
              "vsmallmatrix*": ["MtSmallMatrix", null, "\\vert", "\\vert"],
              Vsmallmatrix: ["MtSmallMatrix", null, "\\Vert", "\\Vert", "c"],
              "Vsmallmatrix*": ["MtSmallMatrix", null, "\\Vert", "\\Vert"],
              crampedsubarray: [
                "Array",
                null,
                null,
                null,
                null,
                "0em",
                "0.1em",
                "S'",
                1
              ],
              multlined: "MtMultlined",
              spreadlines: ["SpreadLines", !0],
              lgathered: [
                "AmsEqnArray",
                null,
                null,
                null,
                "l",
                null,
                ".5em",
                "D"
              ],
              rgathered: [
                "AmsEqnArray",
                null,
                null,
                null,
                "r",
                null,
                ".5em",
                "D"
              ]
            },
            i.MathtoolsMethods
          ),
          new a.DelimiterMap("mathtools-delimiters", n.default.delimiter, {
            "\\lparen": "(",
            "\\rparen": ")"
          }),
          new a.CommandMap(
            "mathtools-characters",
            { ":": ["CenterColon", !0] },
            i.MathtoolsMethods
          );
      },
      2178: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MathtoolsMethods = void 0);
        var i = r(7398),
          s = r(8016),
          l = r(7360),
          c = r(2193),
          u = r(3402),
          d = r(4748),
          p = r(2955),
          m = r(1230),
          f = r(5074),
          h = r(4406),
          g = r(1107),
          v = r(5262);
        e.MathtoolsMethods = {
          MtMatrix: function (t, r, n, a) {
            var o = t.GetBrackets("\\begin{" + r.getName() + "}", "c");
            return e.MathtoolsMethods.Array(t, r, n, a, o);
          },
          MtSmallMatrix: function (t, r, n, a, o) {
            return (
              o ||
                (o = t.GetBrackets(
                  "\\begin{" + r.getName() + "}",
                  t.options.mathtools["smallmatrix-align"]
                )),
              e.MathtoolsMethods.Array(
                t,
                r,
                n,
                a,
                o,
                i.default.Em(1 / 3),
                ".2em",
                "S",
                1
              )
            );
          },
          MtMultlined: function (t, e) {
            var r,
              n = "\\begin{" + e.getName() + "}",
              o = t.GetBrackets(n, t.options.mathtools["multlined-pos"] || "c"),
              s = o ? t.GetBrackets(n, "") : "";
            o &&
              !o.match(/^[cbt]$/) &&
              ((s = (r = a([o, s], 2))[0]), (o = r[1])),
              t.Push(e);
            var l = t.itemFactory.create("multlined", t, e);
            return (
              (l.arraydef = {
                displaystyle: !0,
                rowspacing: ".5em",
                width: s || "auto",
                columnwidth: "100%"
              }),
              i.default.setArrayAlign(l, o || "c")
            );
          },
          HandleShove: function (t, e, r) {
            var n = t.stack.Top();
            if ("multline" !== n.kind && "multlined" !== n.kind)
              throw new u.default(
                "CommandInMultlined",
                "%1 can only appear within the multline or multlined environments",
                e
              );
            if (n.Size())
              throw new u.default(
                "CommandAtTheBeginingOfLine",
                "%1 must come at the beginning of the line",
                e
              );
            n.setProperty("shove", r);
            var a = t.GetBrackets(e),
              o = t.ParseArg(e);
            if (a) {
              var i = t.create("node", "mrow", []),
                s = t.create("node", "mspace", [], { width: a });
              "left" === r
                ? (i.appendChild(s), i.appendChild(o))
                : (i.appendChild(o), i.appendChild(s)),
                (o = i);
            }
            t.Push(o);
          },
          SpreadLines: function (t, e) {
            var r, n;
            if (t.stack.env.closing === e.getName()) {
              delete t.stack.env.closing;
              var a = t.stack.Pop(),
                i = a.toMml(),
                s = a.getProperty("spread");
              if (i.isInferred)
                try {
                  for (
                    var l = o(d.default.getChildren(i)), c = l.next();
                    !c.done;
                    c = l.next()
                  ) {
                    var u = c.value;
                    v.MathtoolsUtil.spreadLines(u, s);
                  }
                } catch (t) {
                  r = { error: t };
                } finally {
                  try {
                    c && !c.done && (n = l.return) && n.call(l);
                  } finally {
                    if (r) throw r.error;
                  }
                }
              else v.MathtoolsUtil.spreadLines(i, s);
              t.Push(i);
            } else {
              s = t.GetDimen("\\begin{" + e.getName() + "}");
              e.setProperty("spread", s), t.Push(e);
            }
          },
          Cases: function (t, e, r, n, a) {
            var o = t.itemFactory
              .create("array")
              .setProperty("casesEnv", e.getName());
            return (
              (o.arraydef = {
                rowspacing: ".2em",
                columnspacing: "1em",
                columnalign: "left"
              }),
              "D" === a && (o.arraydef.displaystyle = !0),
              o.setProperties({ open: r, close: n }),
              t.Push(e),
              o
            );
          },
          MathLap: function (t, e, r, a) {
            var o = t.GetBrackets(e, "").trim(),
              i = t.create(
                "node",
                "mstyle",
                [
                  t.create(
                    "node",
                    "mpadded",
                    [t.ParseArg(e)],
                    n(
                      { width: 0 },
                      "r" === r
                        ? {}
                        : { lspace: "l" === r ? "-1width" : "-.5width" }
                    )
                  )
                ],
                { "data-cramped": a }
              );
            v.MathtoolsUtil.setDisplayLevel(i, o),
              t.Push(t.create("node", "TeXAtom", [i]));
          },
          Cramped: function (t, e) {
            var r = t.GetBrackets(e, "").trim(),
              n = t.ParseArg(e),
              a = t.create("node", "mstyle", [n], { "data-cramped": !0 });
            v.MathtoolsUtil.setDisplayLevel(a, r), t.Push(a);
          },
          MtLap: function (t, e, r) {
            var n = i.default.internalMath(t, t.GetArgument(e), 0),
              a = t.create("node", "mpadded", n, { width: 0 });
            "r" !== r &&
              d.default.setAttribute(
                a,
                "lspace",
                "l" === r ? "-1width" : "-.5width"
              ),
              t.Push(a);
          },
          MathMakeBox: function (t, e) {
            var r = t.GetBrackets(e),
              n = t.GetBrackets(e, "c"),
              a = t.create("node", "mpadded", [t.ParseArg(e)]);
            r && d.default.setAttribute(a, "width", r);
            var o = f.lookup(n, { c: "center", r: "right" }, "");
            o && d.default.setAttribute(a, "data-align", o), t.Push(a);
          },
          MathMBox: function (t, e) {
            t.Push(t.create("node", "mrow", [t.ParseArg(e)]));
          },
          UnderOverBracket: function (t, e) {
            var r,
              n = m.length2em(t.GetBrackets(e, ".1em"), 0.1),
              o = t.GetBrackets(e, ".2em"),
              s = t.GetArgument(e),
              l = a(
                "o" === e.charAt(1)
                  ? ["over", "accent", "bottom", "height"]
                  : ["under", "accentunder", "top", "depth"],
                4
              ),
              u = l[0],
              p = l[1],
              f = l[2],
              h = l[3],
              g = m.em(n),
              v = m.em(2 * n),
              y = new c.default(s, t.stack.env, t.configuration).mml(),
              x = new c.default(s, t.stack.env, t.configuration).mml(),
              b = t.create(
                "node",
                "mpadded",
                [
                  t.create(
                    "node",
                    "mpadded",
                    [t.create("node", "mphantom", [x])],
                    {
                      style: "border: " + g + " solid; border-" + f + ": none",
                      width: "-" + v,
                      height: o,
                      depth: 0
                    }
                  )
                ],
                (((r = { width: "+" + v })[h] = "+" + g), r)
              ),
              _ = i.default.underOver(t, y, b, u, !0),
              M = d.default.getChildAt(d.default.getChildAt(_, 0), 0);
            d.default.setAttribute(M, p, !0), t.Push(_);
          },
          Aboxed: function (t, e) {
            var r = v.MathtoolsUtil.checkAlignment(t, e);
            r.row.length % 2 == 1 && r.row.push(t.create("node", "mtd", []));
            var n = t.GetArgument(e),
              a = t.string.substr(t.i);
            (t.string = n + "&&\\endAboxed"), (t.i = 0);
            var o = t.GetUpTo(e, "&"),
              s = t.GetUpTo(e, "&");
            t.GetUpTo(e, "\\endAboxed");
            var l = i.default.substituteArgs(
              t,
              [o, s],
              "\\rlap{\\boxed{#1{}#2}}\\kern.267em\\phantom{#1}&\\phantom{{}#2}\\kern.267em"
            );
            (t.string = l + a), (t.i = 0);
          },
          ArrowBetweenLines: function (t, e) {
            var r = v.MathtoolsUtil.checkAlignment(t, e);
            if (r.Size() || r.row.length)
              throw new u.default(
                "BetweenLines",
                "%1 must be on a row by itself",
                e
              );
            var n = t.GetStar(),
              a = t.GetBrackets(e, "\\Updownarrow");
            n && (r.EndEntry(), r.EndEntry());
            var o = n ? "\\quad" + a : a + "\\quad",
              i = new c.default(o, t.stack.env, t.configuration).mml();
            t.Push(i), r.EndEntry(), r.EndRow();
          },
          VDotsWithin: function (t, e) {
            var r = t.stack.Top(),
              a = r.getProperty("flushspaceabove") === r.table.length,
              o = "\\mmlToken{mi}{}" + t.GetArgument(e) + "\\mmlToken{mi}{}",
              i = new c.default(o, t.stack.env, t.configuration).mml(),
              s = t.create(
                "node",
                "mpadded",
                [
                  t.create(
                    "node",
                    "mpadded",
                    [t.create("node", "mo", [t.create("text", "\u22ee")])],
                    n(
                      { width: 0, lspace: "-.5width" },
                      a ? { height: "-.6em", voffset: "-.18em" } : {}
                    )
                  ),
                  t.create("node", "mphantom", [i])
                ],
                { lspace: ".5width" }
              );
            t.Push(s);
          },
          ShortVDotsWithin: function (t, r) {
            var n = t.stack.Top(),
              a = t.GetStar();
            e.MathtoolsMethods.FlushSpaceAbove(t, "\\MTFlushSpaceAbove"),
              !a && n.EndEntry(),
              e.MathtoolsMethods.VDotsWithin(t, "\\vdotswithin"),
              a && n.EndEntry(),
              e.MathtoolsMethods.FlushSpaceBelow(t, "\\MTFlushSpaceBelow");
          },
          FlushSpaceAbove: function (t, e) {
            var r = v.MathtoolsUtil.checkAlignment(t, e);
            r.setProperty("flushspaceabove", r.table.length),
              r.addRowSpacing("-" + t.options.mathtools.shortvdotsadjustabove);
          },
          FlushSpaceBelow: function (t, e) {
            var r = v.MathtoolsUtil.checkAlignment(t, e);
            r.Size() && r.EndEntry(),
              r.EndRow(),
              r.addRowSpacing("-" + t.options.mathtools.shortvdotsadjustbelow);
          },
          PairedDelimiters: function (t, e, r, n, o, s, l, c) {
            void 0 === o && (o = "#1"),
              void 0 === s && (s = 1),
              void 0 === l && (l = ""),
              void 0 === c && (c = "");
            var u = t.GetStar(),
              d = u ? "" : t.GetBrackets(e),
              p = a(
                u ? ["\\left", "\\right"] : d ? [d + "l", d + "r"] : ["", ""],
                2
              ),
              m = p[0],
              f = p[1],
              h = u ? "\\middle" : d || "";
            if (s) {
              for (var g = [], v = g.length; v < s; v++)
                g.push(t.GetArgument(e));
              o = i.default.substituteArgs(t, g, o);
            }
            (o = o.replace(/\\delimsize/g, h)),
              (t.string = [l, m, r, o, f, n, c, t.string.substr(t.i)].reduce(
                function (e, r) {
                  return i.default.addArgs(t, e, r);
                },
                ""
              )),
              (t.i = 0),
              i.default.checkMaxMacros(t);
          },
          DeclarePairedDelimiters: function (t, e) {
            var r = h.default.GetCsNameArgument(t, e),
              n = t.GetArgument(e),
              a = t.GetArgument(e);
            v.MathtoolsUtil.addPairedDelims(t.configuration, r, [n, a]);
          },
          DeclarePairedDelimitersX: function (t, e) {
            var r = h.default.GetCsNameArgument(t, e),
              n = h.default.GetArgCount(t, e),
              a = t.GetArgument(e),
              o = t.GetArgument(e),
              i = t.GetArgument(e);
            v.MathtoolsUtil.addPairedDelims(t.configuration, r, [a, o, i, n]);
          },
          DeclarePairedDelimitersXPP: function (t, e) {
            var r = h.default.GetCsNameArgument(t, e),
              n = h.default.GetArgCount(t, e),
              a = t.GetArgument(e),
              o = t.GetArgument(e),
              i = t.GetArgument(e),
              s = t.GetArgument(e),
              l = t.GetArgument(e);
            v.MathtoolsUtil.addPairedDelims(t.configuration, r, [
              o,
              i,
              l,
              n,
              a,
              s
            ]);
          },
          CenterColon: function (t, e, r, a, o) {
            void 0 === a && (a = !1), void 0 === o && (o = !1);
            var i = t.options.mathtools,
              s = t.create("token", "mo", {}, ":");
            if (r && (i.centercolon || a)) {
              var l = i["centercolon-offset"];
              s = t.create(
                "node",
                "mpadded",
                [s],
                n(
                  { voffset: l, height: "+" + l, depth: "-" + l },
                  o
                    ? { width: i["thincolon-dw"], lspace: i["thincolon-dx"] }
                    : {}
                )
              );
            }
            t.Push(s);
          },
          Relation: function (t, e, r, n) {
            t.options.mathtools["use-unicode"] && n
              ? t.Push(t.create("token", "mo", { texClass: p.TEXCLASS.REL }, n))
              : ((r =
                  "\\mathrel{" +
                  r
                    .replace(/:/g, "\\MTThinColon")
                    .replace(/-/g, "\\mathrel{-}") +
                  "}"),
                (t.string = i.default.addArgs(t, r, t.string.substr(t.i))),
                (t.i = 0));
          },
          NArrow: function (t, e, r, n) {
            t.Push(
              t.create(
                "node",
                "TeXAtom",
                [
                  t.create("token", "mtext", {}, r),
                  t.create(
                    "node",
                    "mpadded",
                    [
                      t.create(
                        "node",
                        "mpadded",
                        [
                          t.create(
                            "node",
                            "menclose",
                            [
                              t.create("node", "mspace", [], {
                                height: ".2em",
                                depth: 0,
                                width: ".4em"
                              })
                            ],
                            {
                              notation: "updiagonalstrike",
                              "data-thickness": ".05em",
                              "data-padding": 0
                            }
                          )
                        ],
                        { width: 0, lspace: "-.5width", voffset: n }
                      ),
                      t.create("node", "mphantom", [
                        t.create("token", "mtext", {}, r)
                      ])
                    ],
                    { width: 0, lspace: "-.5width" }
                  )
                ],
                { texClass: p.TEXCLASS.REL }
              )
            );
          },
          SplitFrac: function (t, e, r) {
            var n = t.ParseArg(e),
              a = t.ParseArg(e);
            t.Push(
              t.create(
                "node",
                "mstyle",
                [
                  t.create(
                    "node",
                    "mfrac",
                    [
                      t.create(
                        "node",
                        "mstyle",
                        [
                          n,
                          t.create("token", "mi"),
                          t.create("token", "mspace", { width: "1em" })
                        ],
                        { scriptlevel: 0 }
                      ),
                      t.create(
                        "node",
                        "mstyle",
                        [
                          t.create("token", "mspace", { width: "1em" }),
                          t.create("token", "mi"),
                          a
                        ],
                        { scriptlevel: 0 }
                      )
                    ],
                    { linethickness: 0, numalign: "left", denomalign: "right" }
                  )
                ],
                { displaystyle: r, scriptlevel: 0 }
              )
            );
          },
          XMathStrut: function (t, e) {
            var r = t.GetBrackets(e),
              n = t.GetArgument(e);
            (n = v.MathtoolsUtil.plusOrMinus(e, n)),
              (r = v.MathtoolsUtil.plusOrMinus(e, r || n)),
              t.Push(
                t.create(
                  "node",
                  "TeXAtom",
                  [
                    t.create(
                      "node",
                      "mpadded",
                      [
                        t.create("node", "mphantom", [
                          t.create("token", "mo", { stretchy: !1 }, "(")
                        ])
                      ],
                      { width: 0, height: n + "height", depth: r + "depth" }
                    )
                  ],
                  { texClass: p.TEXCLASS.ORD }
                )
              );
          },
          Prescript: function (t, e) {
            var r = v.MathtoolsUtil.getScript(t, e, "sup"),
              n = v.MathtoolsUtil.getScript(t, e, "sub"),
              a = v.MathtoolsUtil.getScript(t, e, "arg");
            if (d.default.isType(r, "none") && d.default.isType(n, "none"))
              t.Push(a);
            else {
              var o = t.create("node", "mmultiscripts", [a]);
              d.default.getChildren(o).push(null, null),
                d.default.appendChildren(o, [
                  t.create("node", "mprescripts"),
                  n,
                  r
                ]),
                o.setProperty("fixPrescript", !0),
                t.Push(o);
            }
          },
          NewTagForm: function (t, e, r) {
            void 0 === r && (r = !1);
            var n = t.tags;
            if (!("mtFormats" in n))
              throw new u.default(
                "TagsNotMT",
                "%1 can only be used with ams or mathtools tags",
                e
              );
            var a = t.GetArgument(e).trim();
            if (!a)
              throw new u.default(
                "InvalidTagFormID",
                "Tag form name can't be empty"
              );
            var o = t.GetBrackets(e, ""),
              i = t.GetArgument(e),
              s = t.GetArgument(e);
            if (!r && n.mtFormats.has(a))
              throw new u.default(
                "DuplicateTagForm",
                "Duplicate tag form: %1",
                a
              );
            n.mtFormats.set(a, [i, s, o]);
          },
          UseTagForm: function (t, e) {
            var r = t.tags;
            if (!("mtFormats" in r))
              throw new u.default(
                "TagsNotMT",
                "%1 can only be used with ams or mathtools tags",
                e
              );
            var n = t.GetArgument(e).trim();
            if (n) {
              if (!r.mtFormats.has(n))
                throw new u.default(
                  "UndefinedTagForm",
                  "Undefined tag form: %1",
                  n
                );
              r.mtCurrent = r.mtFormats.get(n);
            } else r.mtCurrent = null;
          },
          SetOptions: function (t, e) {
            var r,
              n,
              a = t.options.mathtools;
            if (!a["allow-mathtoolsset"])
              throw new u.default("ForbiddenMathtoolsSet", "%1 is disabled", e);
            var s = {};
            Object.keys(a).forEach(function (t) {
              "pariedDelimiters" !== t &&
                "tagforms" !== t &&
                "allow-mathtoolsset" !== t &&
                (s[t] = 1);
            });
            var l = t.GetArgument(e),
              c = i.default.keyvalOptions(l, s, !0);
            try {
              for (
                var d = o(Object.keys(c)), p = d.next();
                !p.done;
                p = d.next()
              ) {
                var m = p.value;
                a[m] = c[m];
              }
            } catch (t) {
              r = { error: t };
            } finally {
              try {
                p && !p.done && (n = d.return) && n.call(d);
              } finally {
                if (r) throw r.error;
              }
            }
          },
          Array: l.default.Array,
          Macro: l.default.Macro,
          xArrow: s.AmsMethods.xArrow,
          HandleRef: s.AmsMethods.HandleRef,
          AmsEqnArray: s.AmsMethods.AmsEqnArray,
          MacroWithTemplate: g.default.MacroWithTemplate
        };
      },
      3298: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
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
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MathtoolsTagFormat = void 0);
        var s = r(3402),
          l = r(4680),
          c = 0;
        e.MathtoolsTagFormat = function (t, e) {
          var r = e.parseOptions.options.tags;
          "base" !== r &&
            t.tags.hasOwnProperty(r) &&
            l.TagsFactory.add(r, t.tags[r]);
          var n = (function (t) {
              function r() {
                var r,
                  n,
                  a = t.call(this) || this;
                (a.mtFormats = new Map()), (a.mtCurrent = null);
                var i = e.parseOptions.options.mathtools.tagforms;
                try {
                  for (
                    var l = o(Object.keys(i)), c = l.next();
                    !c.done;
                    c = l.next()
                  ) {
                    var u = c.value;
                    if (!Array.isArray(i[u]) || 3 !== i[u].length)
                      throw new s.default(
                        "InvalidTagFormDef",
                        'The tag form definition for "%1" should be an array fo three strings',
                        u
                      );
                    a.mtFormats.set(u, i[u]);
                  }
                } catch (t) {
                  r = { error: t };
                } finally {
                  try {
                    c && !c.done && (n = l.return) && n.call(l);
                  } finally {
                    if (r) throw r.error;
                  }
                }
                return a;
              }
              return (
                a(r, t),
                (r.prototype.formatTag = function (e) {
                  if (this.mtCurrent) {
                    var r = i(this.mtCurrent, 3),
                      n = r[0],
                      a = r[1],
                      o = r[2];
                    return o ? "" + n + o + "{" + e + "}" + a : "" + n + e + a;
                  }
                  return t.prototype.formatTag.call(this, e);
                }),
                r
              );
            })(l.TagsFactory.create(e.parseOptions.options.tags).constructor),
            u = "MathtoolsTags-" + ++c;
          l.TagsFactory.add(u, n), (e.parseOptions.options.tags = u);
        };
      },
      5262: function (t, e, r) {
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
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MathtoolsUtil = void 0);
        var a = r(2935),
          o = r(7398),
          i = r(2193),
          s = r(3402),
          l = r(4924),
          c = r(5074),
          u = r(2178),
          d = r(205);
        e.MathtoolsUtil = {
          setDisplayLevel: function (t, e) {
            if (e) {
              var r = n(
                  c.lookup(
                    e,
                    {
                      "\\displaystyle": [!0, 0],
                      "\\textstyle": [!1, 0],
                      "\\scriptstyle": [!1, 1],
                      "\\scriptscriptstyle": [!1, 2]
                    },
                    [null, null]
                  ),
                  2
                ),
                a = r[0],
                o = r[1];
              null !== a &&
                (t.attributes.set("displaystyle", a),
                t.attributes.set("scriptlevel", o));
            }
          },
          checkAlignment: function (t, e) {
            var r = t.stack.Top();
            if (r.kind !== a.EqnArrayItem.prototype.kind)
              throw new s.default(
                "NotInAlignment",
                "%1 can only be used in aligment environments",
                e
              );
            return r;
          },
          addPairedDelims: function (t, e, r) {
            t.handlers
              .retrieve(d.PAIREDDELIMS)
              .add(e, new l.Macro(e, u.MathtoolsMethods.PairedDelimiters, r));
          },
          spreadLines: function (t, e) {
            if (t.isKind("mtable")) {
              var r = t.attributes.get("rowspacing");
              if (r) {
                var n = o.default.dimen2em(e);
                r = r
                  .split(/ /)
                  .map(function (t) {
                    return o.default.Em(Math.max(0, o.default.dimen2em(t) + n));
                  })
                  .join(" ");
              } else r = e;
              t.attributes.set("rowspacing", r);
            }
          },
          plusOrMinus: function (t, e) {
            if (!(e = e.trim()).match(/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/))
              throw new s.default(
                "NotANumber",
                "Argument to %1 is not a number",
                t
              );
            return e.match(/^[-+]/) ? e : "+" + e;
          },
          getScript: function (t, e, r) {
            var n = o.default.trimSpaces(t.GetArgument(e));
            if ("" === n) return t.create("node", "none");
            var a = t.options.mathtools["prescript-" + r + "-format"];
            return (
              a && (n = a + "{" + n + "}"),
              new i.default(n, t.stack.env, t.configuration).mml()
            );
          }
        };
      },
      7078: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MhchemConfiguration = void 0);
        var n = r(251),
          a = r(5871),
          o = r(3402),
          i = r(7360),
          s = r(8016),
          l = r(4652),
          c = {};
        (c.Macro = i.default.Macro),
          (c.xArrow = s.AmsMethods.xArrow),
          (c.Machine = function (t, e, r) {
            try {
              var n = t.GetArgument(e),
                a = l.mhchemParser.toTex(n, r);
              (t.string = a + t.string.substr(t.i)), (t.i = 0);
            } catch (t) {
              throw new o.default(t[0], t[1], t.slice(2));
            }
          }),
          new a.CommandMap(
            "mhchem",
            {
              ce: ["Machine", "ce"],
              pu: ["Machine", "pu"],
              longrightleftharpoons: [
                "Macro",
                "\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"
              ],
              longRightleftharpoons: [
                "Macro",
                "\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\smash{\\leftharpoondown}}"
              ],
              longLeftrightharpoons: [
                "Macro",
                "\\stackrel{\\textstyle\\vphantom{{-}}{\\rightharpoonup}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"
              ],
              longleftrightarrows: [
                "Macro",
                "\\stackrel{\\longrightarrow}{\\smash{\\longleftarrow}\\Rule{0px}{.25em}{0px}}"
              ],
              tripledash: [
                "Macro",
                "\\vphantom{-}\\raise2mu{\\kern2mu\\tiny\\text{-}\\kern1mu\\text{-}\\kern1mu\\text{-}\\kern2mu}"
              ],
              xleftrightarrow: ["xArrow", 8596, 6, 6],
              xrightleftharpoons: ["xArrow", 8652, 5, 7],
              xRightleftharpoons: ["xArrow", 8652, 5, 7],
              xLeftrightharpoons: ["xArrow", 8652, 5, 7]
            },
            c
          ),
          (e.MhchemConfiguration = n.Configuration.create("mhchem", {
            handler: { macro: ["mhchem"] }
          }));
      },
      2048: function (t, e, r) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NewcommandConfiguration = void 0);
        var a = r(251),
          o = r(1205),
          i = r(4406);
        r(9297);
        var s = r(4945),
          l = r(5871);
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
                    environment: [i.default.NEW_ENVIRONMENT]
                  },
                  priority: -1
                })
              );
          }
        });
      },
      1205: function (t, e, r) {
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
        var o = r(3402),
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
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isOpen", {
                get: function () {
                  return !0;
                },
                enumerable: !1,
                configurable: !0
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
          })(r(1076).BaseItem);
        e.BeginEnvItem = i;
      },
      9297: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(1107);
        new (r(5871).CommandMap)(
          "Newcommand-macros",
          {
            newcommand: "NewCommand",
            renewcommand: "NewCommand",
            newenvironment: "NewEnvironment",
            renewenvironment: "NewEnvironment",
            def: "MacroDef",
            let: "Let"
          },
          n.default
        );
      },
      1107: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(3402),
          a = r(5871),
          o = r(7360),
          i = r(7398),
          s = r(4406),
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
                c = t.GetArgument(e);
              s.default.addEnvironment(t, r, l.BeginEnv, [!0, o, c, n, a]);
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
                var c = o.get("delimiter").lookup("\\" + e);
                if (c)
                  return void s.default.addDelimiter(
                    t,
                    "\\" + r,
                    c.char,
                    c.attributes
                  );
                var u = o.get("macro").applicable(e);
                if (!u) return;
                if (u instanceof a.MacroMap) {
                  var d = u.lookup(e);
                  return void s.default.addMacro(
                    t,
                    r,
                    d.func,
                    d.args,
                    d.symbol
                  );
                }
                c = u.lookup(e);
                var p = s.default.disassembleSymbol(r, c);
                s.default.addMacro(
                  t,
                  r,
                  function (t, e) {
                    for (var r = [], n = 2; n < arguments.length; n++)
                      r[n - 2] = arguments[n];
                    var a = s.default.assembleSymbol(r);
                    return u.parser(t, a);
                  },
                  p
                );
              }
            },
            MacroWithTemplate: function (t, e, r, a) {
              for (var o = [], l = 4; l < arguments.length; l++)
                o[l - 4] = arguments[l];
              var c = parseInt(a, 10);
              if (c) {
                var u = [];
                if ((t.GetNext(), o[0] && !s.default.MatchParam(t, o[0])))
                  throw new n.default(
                    "MismatchUseDef",
                    "Use of %1 doesn't match its definition",
                    e
                  );
                for (var d = 0; d < c; d++)
                  u.push(s.default.GetParameter(t, e, o[d + 1]));
                r = i.default.substituteArgs(t, u, r);
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
                  var c = t.GetBrackets("\\begin{" + e.getName() + "}");
                  l.push(null == c ? o : c);
                }
                for (var u = l.length; u < a; u++)
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
            }
          };
        (l.Macro = o.default.Macro), (e.default = l);
      },
      4406: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n,
          a = r(7398),
          o = r(3402),
          i = r(4924);
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
                    var c = t.string.substr(t.i).match(/[a-z]+|./i);
                    c && ((t.i += c[0].length), (i = t.i - a));
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
      5634: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NoErrorsConfiguration = void 0);
        var n = r(251);
        e.NoErrorsConfiguration = n.Configuration.create("noerrors", {
          nodes: {
            error: function (t, e, r, n) {
              var a = t.create("token", "mtext", {}, n.replace(/\n/g, " "));
              return t.create("node", "merror", [a], {
                "data-mjx-error": e,
                title: e
              });
            }
          }
        });
      },
      1999: function (t, e, r) {
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
                }
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NoUndefinedConfiguration = void 0);
        var a = r(251);
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
                  var l = n(["color", "background", "size"]), c = l.next();
                  !c.done;
                  c = l.next()
                ) {
                  var u = c.value;
                  i[u] && (s["math" + u] = i[u]);
                }
              } catch (t) {
                r = { error: t };
              } finally {
                try {
                  c && !c.done && (a = l.return) && a.call(l);
                } finally {
                  if (r) throw r.error;
                }
              }
              t.Push(t.create("node", "mtext", [], s, o));
            }
          },
          options: { noundefined: { color: "red", background: "", size: "" } },
          priority: 3
        });
      },
      2996: function (t, e, r) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.PhysicsConfiguration = void 0);
        var a = r(251),
          o = r(4855);
        r(3842),
          (e.PhysicsConfiguration = a.Configuration.create("physics", {
            handler: {
              macro: [
                "Physics-automatic-bracing-macros",
                "Physics-vector-macros",
                "Physics-vector-chars",
                "Physics-derivative-macros",
                "Physics-expressions-macros",
                "Physics-quick-quad-macros",
                "Physics-bra-ket-macros",
                "Physics-matrix-macros"
              ],
              character: ["Physics-characters"],
              environment: ["Physics-aux-envs"]
            },
            items: ((n = {}), (n[o.AutoOpen.prototype.kind] = o.AutoOpen), n),
            options: { physics: { italicdiff: !1, arrowdel: !1 } }
          }));
      },
      4855: function (t, e, r) {
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
          (e.AutoOpen = void 0);
        var o = r(1076),
          i = r(7398),
          s = r(2193),
          l = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "kind", {
                get: function () {
                  return "auto open";
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isOpen", {
                get: function () {
                  return !0;
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.toMml = function () {
                var e = this.factory.configuration.parser,
                  r = this.getProperty("right");
                if (this.getProperty("smash")) {
                  var n = t.prototype.toMml.call(this),
                    a = e.create("node", "mpadded", [n], {
                      height: 0,
                      depth: 0
                    });
                  this.Clear(), this.Push(e.create("node", "TeXAtom", [a]));
                }
                r &&
                  this.Push(
                    new s.default(r, e.stack.env, e.configuration).mml()
                  );
                var o = t.prototype.toMml.call(this);
                return i.default.fenced(
                  this.factory.configuration,
                  this.getProperty("open"),
                  o,
                  this.getProperty("close"),
                  this.getProperty("big")
                );
              }),
              (e.prototype.checkItem = function (e) {
                var r = e.getProperty("autoclose");
                return r && r === this.getProperty("close")
                  ? this.getProperty("ignore")
                    ? (this.Clear(), [[], !0])
                    : [[this.toMml()], !0]
                  : t.prototype.checkItem.call(this, e);
              }),
              e
            );
          })(o.BaseItem);
        e.AutoOpen = l;
      },
      3842: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(5871),
          a = r(2458),
          o = r(6108),
          i = r(4945),
          s = r(2955);
        new n.CommandMap(
          "Physics-automatic-bracing-macros",
          {
            quantity: "Quantity",
            qty: "Quantity",
            pqty: ["Quantity", "(", ")", !0],
            bqty: ["Quantity", "[", "]", !0],
            vqty: ["Quantity", "|", "|", !0],
            Bqty: ["Quantity", "\\{", "\\}", !0],
            absolutevalue: ["Quantity", "|", "|", !0],
            abs: ["Quantity", "|", "|", !0],
            norm: ["Quantity", "\\|", "\\|", !0],
            evaluated: "Eval",
            eval: "Eval",
            order: [
              "Quantity",
              "(",
              ")",
              !0,
              "O",
              o.TexConstant.Variant.CALLIGRAPHIC
            ],
            commutator: "Commutator",
            comm: "Commutator",
            anticommutator: ["Commutator", "\\{", "\\}"],
            acomm: ["Commutator", "\\{", "\\}"],
            poissonbracket: ["Commutator", "\\{", "\\}"],
            pb: ["Commutator", "\\{", "\\}"]
          },
          a.default
        ),
          new n.CharacterMap("Physics-vector-chars", i.default.mathchar0mi, {
            dotproduct: ["\u22c5", { mathvariant: o.TexConstant.Variant.BOLD }],
            vdot: ["\u22c5", { mathvariant: o.TexConstant.Variant.BOLD }],
            crossproduct: "\xd7",
            cross: "\xd7",
            cp: "\xd7",
            gradientnabla: [
              "\u2207",
              { mathvariant: o.TexConstant.Variant.BOLD }
            ],
            real: ["\u211c", { mathvariant: o.TexConstant.Variant.NORMAL }],
            imaginary: ["\u2111", { mathvariant: o.TexConstant.Variant.NORMAL }]
          }),
          new n.CommandMap(
            "Physics-vector-macros",
            {
              vnabla: "Vnabla",
              vectorbold: "VectorBold",
              vb: "VectorBold",
              vectorarrow: ["StarMacro", 1, "\\vec{\\vb", "{#1}}"],
              va: ["StarMacro", 1, "\\vec{\\vb", "{#1}}"],
              vectorunit: ["StarMacro", 1, "\\hat{\\vb", "{#1}}"],
              vu: ["StarMacro", 1, "\\hat{\\vb", "{#1}}"],
              gradient: ["OperatorApplication", "\\vnabla", "(", "["],
              grad: ["OperatorApplication", "\\vnabla", "(", "["],
              divergence: ["VectorOperator", "\\vnabla\\vdot", "(", "["],
              div: ["VectorOperator", "\\vnabla\\vdot", "(", "["],
              curl: ["VectorOperator", "\\vnabla\\crossproduct", "(", "["],
              laplacian: ["OperatorApplication", "\\nabla^2", "(", "["]
            },
            a.default
          ),
          new n.CommandMap(
            "Physics-expressions-macros",
            {
              sin: "Expression",
              sinh: "Expression",
              arcsin: "Expression",
              asin: "Expression",
              cos: "Expression",
              cosh: "Expression",
              arccos: "Expression",
              acos: "Expression",
              tan: "Expression",
              tanh: "Expression",
              arctan: "Expression",
              atan: "Expression",
              csc: "Expression",
              csch: "Expression",
              arccsc: "Expression",
              acsc: "Expression",
              sec: "Expression",
              sech: "Expression",
              arcsec: "Expression",
              asec: "Expression",
              cot: "Expression",
              coth: "Expression",
              arccot: "Expression",
              acot: "Expression",
              exp: ["Expression", !1],
              log: "Expression",
              ln: "Expression",
              det: ["Expression", !1],
              Pr: ["Expression", !1],
              tr: ["Expression", !1],
              trace: ["Expression", !1, "tr"],
              Tr: ["Expression", !1],
              Trace: ["Expression", !1, "Tr"],
              rank: "NamedFn",
              erf: ["Expression", !1],
              Residue: ["Macro", "\\mathrm{Res}"],
              Res: ["OperatorApplication", "\\Residue", "(", "[", "{"],
              principalvalue: ["OperatorApplication", "{\\cal P}"],
              pv: ["OperatorApplication", "{\\cal P}"],
              PV: ["OperatorApplication", "{\\rm P.V.}"],
              Re: ["OperatorApplication", "\\mathrm{Re}", "{"],
              Im: ["OperatorApplication", "\\mathrm{Im}", "{"],
              sine: ["NamedFn", "sin"],
              hypsine: ["NamedFn", "sinh"],
              arcsine: ["NamedFn", "arcsin"],
              asine: ["NamedFn", "asin"],
              cosine: ["NamedFn", "cos"],
              hypcosine: ["NamedFn", "cosh"],
              arccosine: ["NamedFn", "arccos"],
              acosine: ["NamedFn", "acos"],
              tangent: ["NamedFn", "tan"],
              hyptangent: ["NamedFn", "tanh"],
              arctangent: ["NamedFn", "arctan"],
              atangent: ["NamedFn", "atan"],
              cosecant: ["NamedFn", "csc"],
              hypcosecant: ["NamedFn", "csch"],
              arccosecant: ["NamedFn", "arccsc"],
              acosecant: ["NamedFn", "acsc"],
              secant: ["NamedFn", "sec"],
              hypsecant: ["NamedFn", "sech"],
              arcsecant: ["NamedFn", "arcsec"],
              asecant: ["NamedFn", "asec"],
              cotangent: ["NamedFn", "cot"],
              hypcotangent: ["NamedFn", "coth"],
              arccotangent: ["NamedFn", "arccot"],
              acotangent: ["NamedFn", "acot"],
              exponential: ["NamedFn", "exp"],
              logarithm: ["NamedFn", "log"],
              naturallogarithm: ["NamedFn", "ln"],
              determinant: ["NamedFn", "det"],
              Probability: ["NamedFn", "Pr"]
            },
            a.default
          ),
          new n.CommandMap(
            "Physics-quick-quad-macros",
            {
              qqtext: "Qqtext",
              qq: "Qqtext",
              qcomma: ["Macro", "\\qqtext*{,}"],
              qc: ["Macro", "\\qqtext*{,}"],
              qcc: ["Qqtext", "c.c."],
              qif: ["Qqtext", "if"],
              qthen: ["Qqtext", "then"],
              qelse: ["Qqtext", "else"],
              qotherwise: ["Qqtext", "otherwise"],
              qunless: ["Qqtext", "unless"],
              qgiven: ["Qqtext", "given"],
              qusing: ["Qqtext", "using"],
              qassume: ["Qqtext", "assume"],
              qsince: ["Qqtext", "since"],
              qlet: ["Qqtext", "let"],
              qfor: ["Qqtext", "for"],
              qall: ["Qqtext", "all"],
              qeven: ["Qqtext", "even"],
              qodd: ["Qqtext", "odd"],
              qinteger: ["Qqtext", "integer"],
              qand: ["Qqtext", "and"],
              qor: ["Qqtext", "or"],
              qas: ["Qqtext", "as"],
              qin: ["Qqtext", "in"]
            },
            a.default
          ),
          new n.CommandMap(
            "Physics-derivative-macros",
            {
              diffd: "DiffD",
              flatfrac: ["Macro", "\\left.#1\\middle/#2\\right.", 2],
              differential: ["Differential", "\\diffd"],
              dd: ["Differential", "\\diffd"],
              variation: ["Differential", "\\delta"],
              var: ["Differential", "\\delta"],
              derivative: ["Derivative", 2, "\\diffd"],
              dv: ["Derivative", 2, "\\diffd"],
              partialderivative: ["Derivative", 3, "\\partial"],
              pderivative: ["Derivative", 3, "\\partial"],
              pdv: ["Derivative", 3, "\\partial"],
              functionalderivative: ["Derivative", 2, "\\delta"],
              fderivative: ["Derivative", 2, "\\delta"],
              fdv: ["Derivative", 2, "\\delta"]
            },
            a.default
          ),
          new n.CommandMap(
            "Physics-bra-ket-macros",
            {
              bra: "Bra",
              ket: "Ket",
              innerproduct: "BraKet",
              ip: "BraKet",
              braket: "BraKet",
              outerproduct: "KetBra",
              dyad: "KetBra",
              ketbra: "KetBra",
              op: "KetBra",
              expectationvalue: "Expectation",
              expval: "Expectation",
              ev: "Expectation",
              matrixelement: "MatrixElement",
              matrixel: "MatrixElement",
              mel: "MatrixElement"
            },
            a.default
          ),
          new n.CommandMap(
            "Physics-matrix-macros",
            {
              matrixquantity: "MatrixQuantity",
              mqty: "MatrixQuantity",
              pmqty: ["Macro", "\\mqty(#1)", 1],
              Pmqty: ["Macro", "\\mqty*(#1)", 1],
              bmqty: ["Macro", "\\mqty[#1]", 1],
              vmqty: ["Macro", "\\mqty|#1|", 1],
              smallmatrixquantity: ["MatrixQuantity", !0],
              smqty: ["MatrixQuantity", !0],
              spmqty: ["Macro", "\\smqty(#1)", 1],
              sPmqty: ["Macro", "\\smqty*(#1)", 1],
              sbmqty: ["Macro", "\\smqty[#1]", 1],
              svmqty: ["Macro", "\\smqty|#1|", 1],
              matrixdeterminant: ["Macro", "\\vmqty{#1}", 1],
              mdet: ["Macro", "\\vmqty{#1}", 1],
              smdet: ["Macro", "\\svmqty{#1}", 1],
              identitymatrix: "IdentityMatrix",
              imat: "IdentityMatrix",
              xmatrix: "XMatrix",
              xmat: "XMatrix",
              zeromatrix: ["Macro", "\\xmat{0}{#1}{#2}", 2],
              zmat: ["Macro", "\\xmat{0}{#1}{#2}", 2],
              paulimatrix: "PauliMatrix",
              pmat: "PauliMatrix",
              diagonalmatrix: "DiagonalMatrix",
              dmat: "DiagonalMatrix",
              antidiagonalmatrix: ["DiagonalMatrix", !0],
              admat: ["DiagonalMatrix", !0]
            },
            a.default
          ),
          new n.EnvironmentMap(
            "Physics-aux-envs",
            i.default.environment,
            {
              smallmatrix: [
                "Array",
                null,
                null,
                null,
                "c",
                "0.333em",
                ".2em",
                "S",
                1
              ]
            },
            a.default
          ),
          new n.MacroMap(
            "Physics-characters",
            {
              "|": ["AutoClose", s.TEXCLASS.ORD],
              ")": "AutoClose",
              "]": "AutoClose"
            },
            a.default
          );
      },
      2458: function (t, e, r) {
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
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var a = r(7360),
          o = r(2193),
          i = r(3402),
          s = r(2955),
          l = r(7398),
          c = r(4748),
          u = r(2348),
          d = {},
          p = { "(": ")", "[": "]", "{": "}", "|": "|" },
          m = /^(b|B)i(g{1,2})$/;
        (d.Quantity = function (t, e, r, n, a, u, d) {
          void 0 === r && (r = "("),
            void 0 === n && (n = ")"),
            void 0 === a && (a = !1),
            void 0 === u && (u = ""),
            void 0 === d && (d = "");
          var f = !!a && t.GetStar(),
            h = t.GetNext(),
            g = t.i,
            v = null;
          if ("\\" === h) {
            if ((t.i++, !(v = t.GetCS()).match(m))) {
              var y = t.create("node", "mrow");
              return (
                t.Push(l.default.fenced(t.configuration, r, y, n)),
                void (t.i = g)
              );
            }
            h = t.GetNext();
          }
          var x = p[h];
          if (a && "{" !== h)
            throw new i.default(
              "MissingArgFor",
              "Missing argument for %1",
              t.currentCS
            );
          if (!x) {
            y = t.create("node", "mrow");
            return (
              t.Push(l.default.fenced(t.configuration, r, y, n)), void (t.i = g)
            );
          }
          if (u) {
            var b = t.create("token", "mi", { texClass: s.TEXCLASS.OP }, u);
            d && c.default.setAttribute(b, "mathvariant", d),
              t.Push(t.itemFactory.create("fn", b));
          }
          if ("{" === h) {
            var _ = t.GetArgument(e);
            return (
              (h = a ? r : "\\{"),
              (x = a ? n : "\\}"),
              (_ = f
                ? h + " " + _ + " " + x
                : v
                ? "\\" + v + "l" + h + " " + _ + " \\" + v + "r" + x
                : "\\left" + h + " " + _ + " \\right" + x),
              void t.Push(new o.default(_, t.stack.env, t.configuration).mml())
            );
          }
          a && ((h = r), (x = n)),
            t.i++,
            t.Push(
              t.itemFactory
                .create("auto open")
                .setProperties({ open: h, close: x, big: v })
            );
        }),
          (d.Eval = function (t, e) {
            var r = t.GetStar(),
              n = t.GetNext();
            if ("{" !== n) {
              if ("(" === n || "[" === n)
                return (
                  t.i++,
                  void t.Push(
                    t.itemFactory
                      .create("auto open")
                      .setProperties({
                        open: n,
                        close: "|",
                        smash: r,
                        right: "\\vphantom{\\int}"
                      })
                  )
                );
              throw new i.default(
                "MissingArgFor",
                "Missing argument for %1",
                t.currentCS
              );
            }
            var a = t.GetArgument(e),
              o =
                "\\left. " +
                (r ? "\\smash{" + a + "}" : a) +
                " \\vphantom{\\int}\\right|";
            t.string = t.string.slice(0, t.i) + o + t.string.slice(t.i);
          }),
          (d.Commutator = function (t, e, r, n) {
            void 0 === r && (r = "["), void 0 === n && (n = "]");
            var a = t.GetStar(),
              s = t.GetNext(),
              l = null;
            if ("\\" === s) {
              if ((t.i++, !(l = t.GetCS()).match(m)))
                throw new i.default(
                  "MissingArgFor",
                  "Missing argument for %1",
                  t.currentCS
                );
              s = t.GetNext();
            }
            if ("{" !== s)
              throw new i.default(
                "MissingArgFor",
                "Missing argument for %1",
                t.currentCS
              );
            var c = t.GetArgument(e) + "," + t.GetArgument(e);
            (c = a
              ? r + " " + c + " " + n
              : l
              ? "\\" + l + "l" + r + " " + c + " \\" + l + "r" + n
              : "\\left" + r + " " + c + " \\right" + n),
              t.Push(new o.default(c, t.stack.env, t.configuration).mml());
          });
        var f = [65, 90],
          h = [97, 122],
          g = [913, 937],
          v = [945, 969],
          y = [48, 57];
        function x(t, e) {
          return t >= e[0] && t <= e[1];
        }
        function b(t, e, r, n) {
          var a = t.configuration.parser,
            o = u.NodeFactory.createToken(t, e, r, n),
            i = n.codePointAt(0);
          return (
            1 === n.length &&
              !a.stack.env.font &&
              a.stack.env.vectorFont &&
              (x(i, f) ||
                x(i, h) ||
                x(i, g) ||
                x(i, y) ||
                (x(i, v) && a.stack.env.vectorStar) ||
                c.default.getAttribute(o, "accent")) &&
              c.default.setAttribute(o, "mathvariant", a.stack.env.vectorFont),
            o
          );
        }
        (d.VectorBold = function (t, e) {
          var r = t.GetStar(),
            n = t.GetArgument(e),
            a = t.configuration.nodeFactory.get("token"),
            i = t.stack.env.font;
          delete t.stack.env.font,
            t.configuration.nodeFactory.set("token", b),
            (t.stack.env.vectorFont = r ? "bold-italic" : "bold"),
            (t.stack.env.vectorStar = r);
          var s = new o.default(n, t.stack.env, t.configuration).mml();
          i && (t.stack.env.font = i),
            delete t.stack.env.vectorFont,
            delete t.stack.env.vectorStar,
            t.configuration.nodeFactory.set("token", a),
            t.Push(s);
        }),
          (d.StarMacro = function (t, e, r) {
            for (var n = [], a = 3; a < arguments.length; a++)
              n[a - 3] = arguments[a];
            var o = t.GetStar(),
              i = [];
            if (r) for (var s = i.length; s < r; s++) i.push(t.GetArgument(e));
            var c = n.join(o ? "*" : "");
            (c = l.default.substituteArgs(t, i, c)),
              (t.string = l.default.addArgs(t, c, t.string.slice(t.i))),
              (t.i = 0),
              l.default.checkMaxMacros(t);
          });
        var _ = function (t, e, r, n, a) {
          var i = new o.default(n, t.stack.env, t.configuration).mml();
          t.Push(t.itemFactory.create(e, i));
          var s = t.GetNext(),
            l = p[s];
          if (l) {
            var c = -1 !== a.indexOf(s);
            if ("{" === s) {
              var u =
                (c ? "\\left\\{" : "") +
                " " +
                t.GetArgument(r) +
                " " +
                (c ? "\\right\\}" : "");
              return (t.string = u + t.string.slice(t.i)), void (t.i = 0);
            }
            c &&
              (t.i++,
              t.Push(
                t.itemFactory
                  .create("auto open")
                  .setProperties({ open: s, close: l })
              ));
          }
        };
        function M(t, e, r) {
          var a = n(t, 3),
            o = a[0],
            i = a[1],
            s = a[2];
          return e && r
            ? "\\left\\langle{" +
                o +
                "}\\middle\\vert{" +
                i +
                "}\\middle\\vert{" +
                s +
                "}\\right\\rangle"
            : e
            ? "\\langle{" + o + "}\\vert{" + i + "}\\vert{" + s + "}\\rangle"
            : "\\left\\langle{" +
              o +
              "}\\right\\vert{" +
              i +
              "}\\left\\vert{" +
              s +
              "}\\right\\rangle";
        }
        (d.OperatorApplication = function (t, e, r) {
          for (var n = [], a = 3; a < arguments.length; a++)
            n[a - 3] = arguments[a];
          _(t, "fn", e, r, n);
        }),
          (d.VectorOperator = function (t, e, r) {
            for (var n = [], a = 3; a < arguments.length; a++)
              n[a - 3] = arguments[a];
            _(t, "mml", e, r, n);
          }),
          (d.Expression = function (t, e, r, n) {
            void 0 === r && (r = !0),
              void 0 === n && (n = ""),
              (n = n || e.slice(1));
            var a = r ? t.GetBrackets(e) : null,
              i = t.create("token", "mi", { texClass: s.TEXCLASS.OP }, n);
            if (a) {
              var l = new o.default(a, t.stack.env, t.configuration).mml();
              i = t.create("node", "msup", [i, l]);
            }
            t.Push(t.itemFactory.create("fn", i)),
              "(" === t.GetNext() &&
                (t.i++,
                t.Push(
                  t.itemFactory
                    .create("auto open")
                    .setProperties({ open: "(", close: ")" })
                ));
          }),
          (d.Qqtext = function (t, e, r) {
            var n =
              (t.GetStar() ? "" : "\\quad") +
              "\\text{" +
              (r || t.GetArgument(e)) +
              "}\\quad ";
            t.string = t.string.slice(0, t.i) + n + t.string.slice(t.i);
          }),
          (d.Differential = function (t, e, r) {
            var n = t.GetBrackets(e),
              a = null != n ? "^{" + n + "}" : " ",
              i = "(" === t.GetNext(),
              l = "{" === t.GetNext(),
              c = r + a;
            if (i || l)
              if (l) {
                c += t.GetArgument(e);
                u = new o.default(c, t.stack.env, t.configuration).mml();
                t.Push(
                  t.create("node", "TeXAtom", [u], { texClass: s.TEXCLASS.OP })
                );
              } else
                t.Push(new o.default(c, t.stack.env, t.configuration).mml()),
                  t.i++,
                  t.Push(
                    t.itemFactory
                      .create("auto open")
                      .setProperties({ open: "(", close: ")" })
                  );
            else {
              c += t.GetArgument(e, !0) || "";
              var u = new o.default(c, t.stack.env, t.configuration).mml();
              t.Push(u);
            }
          }),
          (d.Derivative = function (t, e, r, n) {
            var a = t.GetStar(),
              i = t.GetBrackets(e),
              s = 1,
              l = [];
            for (l.push(t.GetArgument(e)); "{" === t.GetNext() && s < r; )
              l.push(t.GetArgument(e)), s++;
            var c = !1,
              u = " ",
              d = " ";
            r > 2 && l.length > 2
              ? ((u = "^{" + (l.length - 1) + "}"), (c = !0))
              : null != i &&
                (r > 2 && l.length > 1 && (c = !0), (d = u = "^{" + i + "}"));
            for (
              var p = a ? "\\flatfrac" : "\\frac",
                m = l.length > 1 ? l[0] : "",
                f = l.length > 1 ? l[1] : l[0],
                h = "",
                g = 2,
                v = void 0;
              (v = l[g]);
              g++
            )
              h += n + " " + v;
            var y =
              p + "{" + n + u + m + "}{" + n + " " + f + d + " " + h + "}";
            t.Push(new o.default(y, t.stack.env, t.configuration).mml()),
              "(" === t.GetNext() &&
                (t.i++,
                t.Push(
                  t.itemFactory
                    .create("auto open")
                    .setProperties({ open: "(", close: ")", ignore: c })
                ));
          }),
          (d.Bra = function (t, e) {
            var r = t.GetStar(),
              n = t.GetArgument(e),
              a = "",
              i = !1,
              s = !1;
            if ("\\" === t.GetNext()) {
              var l = t.i;
              t.i++;
              var c = t.GetCS(),
                u = t.lookup("macro", c);
              u && "ket" === u.symbol
                ? ((i = !0),
                  (l = t.i),
                  (s = t.GetStar()),
                  "{" === t.GetNext()
                    ? (a = t.GetArgument(c, !0))
                    : ((t.i = l), (s = !1)))
                : (t.i = l);
            }
            var d = "";
            (d = i
              ? r || s
                ? "\\langle{" + n + "}\\vert{" + a + "}\\rangle"
                : "\\left\\langle{" +
                  n +
                  "}\\middle\\vert{" +
                  a +
                  "}\\right\\rangle"
              : r || s
              ? "\\langle{" + n + "}\\vert"
              : "\\left\\langle{" + n + "}\\right\\vert{" + a + "}"),
              t.Push(new o.default(d, t.stack.env, t.configuration).mml());
          }),
          (d.Ket = function (t, e) {
            var r = t.GetStar(),
              n = t.GetArgument(e),
              a = r
                ? "\\vert{" + n + "}\\rangle"
                : "\\left\\vert{" + n + "}\\right\\rangle";
            t.Push(new o.default(a, t.stack.env, t.configuration).mml());
          }),
          (d.BraKet = function (t, e) {
            var r = t.GetStar(),
              n = t.GetArgument(e),
              a = null;
            "{" === t.GetNext() && (a = t.GetArgument(e, !0));
            var i = "";
            (i =
              null == a
                ? r
                  ? "\\langle{" + n + "}\\vert{" + n + "}\\rangle"
                  : "\\left\\langle{" +
                    n +
                    "}\\middle\\vert{" +
                    n +
                    "}\\right\\rangle"
                : r
                ? "\\langle{" + n + "}\\vert{" + a + "}\\rangle"
                : "\\left\\langle{" +
                  n +
                  "}\\middle\\vert{" +
                  a +
                  "}\\right\\rangle"),
              t.Push(new o.default(i, t.stack.env, t.configuration).mml());
          }),
          (d.KetBra = function (t, e) {
            var r = t.GetStar(),
              n = t.GetArgument(e),
              a = null;
            "{" === t.GetNext() && (a = t.GetArgument(e, !0));
            var i = "";
            (i =
              null == a
                ? r
                  ? "\\vert{" + n + "}\\rangle\\!\\langle{" + n + "}\\vert"
                  : "\\left\\vert{" +
                    n +
                    "}\\middle\\rangle\\!\\middle\\langle{" +
                    n +
                    "}\\right\\vert"
                : r
                ? "\\vert{" + n + "}\\rangle\\!\\langle{" + a + "}\\vert"
                : "\\left\\vert{" +
                  n +
                  "}\\middle\\rangle\\!\\middle\\langle{" +
                  a +
                  "}\\right\\vert"),
              t.Push(new o.default(i, t.stack.env, t.configuration).mml());
          }),
          (d.Expectation = function (t, e) {
            var r = t.GetStar(),
              n = r && t.GetStar(),
              a = t.GetArgument(e),
              i = null;
            "{" === t.GetNext() && (i = t.GetArgument(e, !0));
            var s =
              a && i
                ? M([i, a, i], r, n)
                : r
                ? "\\langle {" + a + "} \\rangle"
                : "\\left\\langle {" + a + "} \\right\\rangle";
            t.Push(new o.default(s, t.stack.env, t.configuration).mml());
          }),
          (d.MatrixElement = function (t, e) {
            var r = t.GetStar(),
              n = r && t.GetStar(),
              a = M(
                [t.GetArgument(e), t.GetArgument(e), t.GetArgument(e)],
                r,
                n
              );
            t.Push(new o.default(a, t.stack.env, t.configuration).mml());
          }),
          (d.MatrixQuantity = function (t, e, r) {
            var n = t.GetStar(),
              a = r ? "smallmatrix" : "array",
              i = "",
              s = "",
              l = "";
            switch (t.GetNext()) {
              case "{":
                i = t.GetArgument(e);
                break;
              case "(":
                t.i++,
                  (s = n ? "\\lgroup" : "("),
                  (l = n ? "\\rgroup" : ")"),
                  (i = t.GetUpTo(e, ")"));
                break;
              case "[":
                t.i++, (s = "["), (l = "]"), (i = t.GetUpTo(e, "]"));
                break;
              case "|":
                t.i++, (s = "|"), (l = "|"), (i = t.GetUpTo(e, "|"));
                break;
              default:
                (s = "("), (l = ")");
            }
            var c =
              (s ? "\\left" : "") +
              s +
              "\\begin{" +
              a +
              "}{} " +
              i +
              "\\end{" +
              a +
              "}" +
              (s ? "\\right" : "") +
              l;
            t.Push(new o.default(c, t.stack.env, t.configuration).mml());
          }),
          (d.IdentityMatrix = function (t, e) {
            var r = t.GetArgument(e),
              n = parseInt(r, 10);
            if (isNaN(n))
              throw new i.default("InvalidNumber", "Invalid number");
            if (n <= 1)
              return (t.string = "1" + t.string.slice(t.i)), void (t.i = 0);
            for (var a = Array(n).fill("0"), o = [], s = 0; s < n; s++) {
              var l = a.slice();
              (l[s] = "1"), o.push(l.join(" & "));
            }
            (t.string = o.join("\\\\ ") + t.string.slice(t.i)), (t.i = 0);
          }),
          (d.XMatrix = function (t, e) {
            var r = t.GetStar(),
              n = t.GetArgument(e),
              a = t.GetArgument(e),
              o = t.GetArgument(e),
              s = parseInt(a, 10),
              l = parseInt(o, 10);
            if (
              isNaN(s) ||
              isNaN(l) ||
              l.toString() !== o ||
              s.toString() !== a
            )
              throw new i.default("InvalidNumber", "Invalid number");
            if (((s = s < 1 ? 1 : s), (l = l < 1 ? 1 : l), !r)) {
              var c = Array(l).fill(n).join(" & "),
                u = Array(s).fill(c).join("\\\\ ");
              return (t.string = u + t.string.slice(t.i)), void (t.i = 0);
            }
            var d = "";
            if (1 === s && 1 === l) d = n;
            else if (1 === s) {
              c = [];
              for (var p = 1; p <= l; p++) c.push(n + "_{" + p + "}");
              d = c.join(" & ");
            } else if (1 === l) {
              for (c = [], p = 1; p <= s; p++) c.push(n + "_{" + p + "}");
              d = c.join("\\\\ ");
            } else {
              var m = [];
              for (p = 1; p <= s; p++) {
                c = [];
                for (var f = 1; f <= l; f++)
                  c.push(n + "_{{" + p + "}{" + f + "}}");
                m.push(c.join(" & "));
              }
              d = m.join("\\\\ ");
            }
            (t.string = d + t.string.slice(t.i)), (t.i = 0);
          }),
          (d.PauliMatrix = function (t, e) {
            var r = t.GetArgument(e),
              n = r.slice(1);
            switch (r[0]) {
              case "0":
                n += " 1 & 0\\\\ 0 & 1";
                break;
              case "1":
              case "x":
                n += " 0 & 1\\\\ 1 & 0";
                break;
              case "2":
              case "y":
                n += " 0 & -i\\\\ i & 0";
                break;
              case "3":
              case "z":
                n += " 1 & 0\\\\ 0 & -1";
            }
            (t.string = n + t.string.slice(t.i)), (t.i = 0);
          }),
          (d.DiagonalMatrix = function (t, e, r) {
            if ("{" === t.GetNext()) {
              var n = t.i;
              t.GetArgument(e);
              var a = t.i;
              t.i = n + 1;
              for (var o = [], i = "", s = t.i; s < a; ) {
                try {
                  i = t.GetUpTo(e, ",");
                } catch (e) {
                  (t.i = a), o.push(t.string.slice(s, a - 1));
                  break;
                }
                if (t.i >= a) {
                  o.push(t.string.slice(s, a));
                  break;
                }
                (s = t.i), o.push(i);
              }
              (t.string =
                (function (t, e) {
                  for (var r = t.length, n = [], a = 0; a < r; a++)
                    n.push(
                      Array(e ? r - a : a + 1).join("&") +
                        "\\mqty{" +
                        t[a] +
                        "}"
                    );
                  return n.join("\\\\ ");
                })(o, r) + t.string.slice(a)),
                (t.i = 0);
            }
          }),
          (d.AutoClose = function (t, e, r) {
            var n = t.create("token", "mo", { stretchy: !1 }, e),
              a = t.itemFactory
                .create("mml", n)
                .setProperties({ autoclose: e });
            t.Push(a);
          }),
          (d.Vnabla = function (t, e) {
            var r = t.options.physics.arrowdel
              ? "\\vec{\\gradientnabla}"
              : "{\\gradientnabla}";
            return t.Push(new o.default(r, t.stack.env, t.configuration).mml());
          }),
          (d.DiffD = function (t, e) {
            var r = t.options.physics.italicdiff ? "d" : "{\\rm d}";
            return t.Push(new o.default(r, t.stack.env, t.configuration).mml());
          }),
          (d.Macro = a.default.Macro),
          (d.NamedFn = a.default.NamedFn),
          (d.Array = a.default.Array),
          (e.default = d);
      },
      2778: function (t, e, r) {
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
                  }
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
        var i = r(251),
          s = r(5871),
          l = r(3402),
          c = r(8955),
          u = r(4629),
          d = r(4282),
          p = r(8149),
          m = r(5074),
          f = c.MathJax.config;
        function h(t, e) {
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
                    l.substr(0, o.length) === o && h(t, l);
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
              })(t, d.CONFIG.dependencies[e]);
            var l = i.ConfigurationHandler.get(s);
            if (l) {
              var c = f[e] || {};
              l.options &&
                1 === Object.keys(l.options).length &&
                l.options[s] &&
                (((r = {})[s] = c), (c = r)),
                t.configuration.add(s, t, c);
              var u = t.parseOptions.packageData.get("require").configured;
              l.preprocessors.length &&
                !u.has(s) &&
                (u.set(s, !0), p.mathjax.retryAfter(Promise.resolve()));
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
          u.Package.packages.has(a)
            ? h(t.configuration.packageData.get("require").jax, a)
            : p.mathjax.retryAfter(d.Loader.load(a));
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
            }
          }),
          (e.options = {
            require: {
              allow: m.expandable({
                base: !1,
                "all-packages": !1,
                autoload: !1,
                configmacros: !1,
                tagformat: !1,
                setoptions: !1
              }),
              defaultAllow: !0,
              prefix: "tex"
            }
          }),
          new s.CommandMap("require", { require: "Require" }, e.RequireMethods),
          (e.RequireConfiguration = i.Configuration.create("require", {
            handler: { macro: ["require"] },
            config: function (t, e) {
              e.parseOptions.packageData.set("require", {
                jax: e,
                required: o([], a(e.options.packages)),
                configured: new Map()
              });
              var r = e.parseOptions.options.require,
                n = r.prefix;
              if (n.match(/[^_a-zA-Z0-9]/))
                throw Error("Illegal characters used in \\require prefix");
              d.CONFIG.paths[n] ||
                (d.CONFIG.paths[n] = "[mathjax]/input/tex/extensions"),
                (r.prefix = "[" + n + "]/");
            },
            options: e.options
          }));
      },
      1596: function (t, e, r) {
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
                }
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.SetOptionsConfiguration = e.SetOptionsUtil = void 0);
        var a = r(251),
          o = r(5871),
          i = r(3402),
          s = r(7398),
          l = r(4924),
          c = r(7360),
          u = r(5074);
        e.SetOptionsUtil = {
          filterPackage: function (t, e) {
            if ("tex" !== e && !a.ConfigurationHandler.get(e))
              throw new i.default(
                "NotAPackage",
                "Not a defined package: %1",
                e
              );
            var r = t.options.setoptions,
              n = r.allowOptions[e];
            if ((void 0 === n && !r.allowPackageDefault) || !1 === n)
              throw new i.default(
                "PackageNotSettable",
                'Options can\'t be set for package "%1"',
                e
              );
            return !0;
          },
          filterOption: function (t, e, r) {
            var n,
              a = t.options.setoptions,
              o = a.allowOptions[e] || {},
              s = o.hasOwnProperty(r) && !u.isObject(o[r]) ? o[r] : null;
            if (!1 === s || (null === s && !a.allowOptionsDefault))
              throw new i.default(
                "OptionNotSettable",
                'Option "%1" is not allowed to be set',
                r
              );
            if (
              !(null === (n = "tex" === e ? t.options : t.options[e]) ||
              void 0 === n
                ? void 0
                : n.hasOwnProperty(r))
            )
              throw "tex" === e
                ? new i.default(
                    "InvalidTexOption",
                    'Invalid TeX option "%1"',
                    r
                  )
                : new i.default(
                    "InvalidOptionKey",
                    'Invalid option "%1" for package "%2"',
                    r,
                    e
                  );
            return !0;
          },
          filterValue: function (t, e, r, n) {
            return n;
          }
        };
        var d = new o.CommandMap(
          "setoptions",
          { setOptions: "SetOptions" },
          {
            SetOptions: function (t, e) {
              var r,
                a,
                o = t.GetBrackets(e) || "tex",
                i = s.default.keyvalOptions(t.GetArgument(e)),
                l = t.options.setoptions;
              if (l.filterPackage(t, o))
                try {
                  for (
                    var c = n(Object.keys(i)), u = c.next();
                    !u.done;
                    u = c.next()
                  ) {
                    var d = u.value;
                    l.filterOption(t, o, d) &&
                      (("tex" === o ? t.options : t.options[o])[d] =
                        l.filterValue(t, o, d, i[d]));
                  }
                } catch (t) {
                  r = { error: t };
                } finally {
                  try {
                    u && !u.done && (a = c.return) && a.call(c);
                  } finally {
                    if (r) throw r.error;
                  }
                }
            }
          }
        );
        e.SetOptionsConfiguration = a.Configuration.create("setoptions", {
          handler: { macro: ["setoptions"] },
          config: function (t, e) {
            var r = e.parseOptions.handlers.get("macro").lookup("require");
            r &&
              (d.add("Require", new l.Macro("Require", r._func)),
              d.add(
                "require",
                new l.Macro("require", c.default.Macro, [
                  "\\Require{#2}\\setOptions[#2]{#1}",
                  2,
                  ""
                ])
              ));
          },
          priority: 3,
          options: {
            setoptions: {
              filterPackage: e.SetOptionsUtil.filterPackage,
              filterOption: e.SetOptionsUtil.filterOption,
              filterValue: e.SetOptionsUtil.filterValue,
              allowPackageDefault: !0,
              allowOptionsDefault: !0,
              allowOptions: u.expandable({
                tex: {
                  FindTeX: !1,
                  formatError: !1,
                  package: !1,
                  baseURL: !1,
                  tags: !1,
                  maxBuffer: !1,
                  maxMaxros: !1,
                  macros: !1,
                  environments: !1
                },
                setoptions: !1,
                autoload: !1,
                require: !1,
                configmacros: !1,
                tagformat: !1
              })
            }
          }
        });
      },
      5941: function (t, e, r) {
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
          (e.TagFormatConfiguration = e.tagformatConfig = void 0);
        var o = r(251),
          i = r(4680),
          s = 0;
        function l(t, e) {
          var r = e.parseOptions.options.tags;
          "base" !== r &&
            t.tags.hasOwnProperty(r) &&
            i.TagsFactory.add(r, t.tags[r]);
          var n = (function (t) {
              function r() {
                return (null !== t && t.apply(this, arguments)) || this;
              }
              return (
                a(r, t),
                (r.prototype.formatNumber = function (t) {
                  return e.parseOptions.options.tagformat.number(t);
                }),
                (r.prototype.formatTag = function (t) {
                  return e.parseOptions.options.tagformat.tag(t);
                }),
                (r.prototype.formatId = function (t) {
                  return e.parseOptions.options.tagformat.id(t);
                }),
                (r.prototype.formatUrl = function (t, r) {
                  return e.parseOptions.options.tagformat.url(t, r);
                }),
                r
              );
            })(i.TagsFactory.create(e.parseOptions.options.tags).constructor),
            o = "configTags-" + ++s;
          i.TagsFactory.add(o, n), (e.parseOptions.options.tags = o);
        }
        (e.tagformatConfig = l),
          (e.TagFormatConfiguration = o.Configuration.create("tagformat", {
            config: [l, 10],
            options: {
              tagformat: {
                number: function (t) {
                  return t.toString();
                },
                tag: function (t) {
                  return "(" + t + ")";
                },
                id: function (t) {
                  return "mjx-eqn:" + t.replace(/\s/g, "_");
                },
                url: function (t, e) {
                  return e + "#" + encodeURIComponent(t);
                }
              }
            }
          }));
      },
      1845: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TextcompConfiguration = void 0);
        var n = r(251);
        r(6832),
          (e.TextcompConfiguration = n.Configuration.create("textcomp", {
            handler: { macro: ["textcomp-macros"] }
          }));
      },
      6832: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(5871),
          a = r(6108),
          o = r(4807),
          i = r(7398),
          s = r(787);
        new n.CommandMap(
          "textcomp-macros",
          {
            textasciicircum: ["Insert", "^"],
            textasciitilde: ["Insert", "~"],
            textasteriskcentered: ["Insert", "*"],
            textbackslash: ["Insert", "\\"],
            textbar: ["Insert", "|"],
            textbraceleft: ["Insert", "{"],
            textbraceright: ["Insert", "}"],
            textbullet: ["Insert", "\u2022"],
            textdagger: ["Insert", "\u2020"],
            textdaggerdbl: ["Insert", "\u2021"],
            textellipsis: ["Insert", "\u2026"],
            textemdash: ["Insert", "\u2014"],
            textendash: ["Insert", "\u2013"],
            textexclamdown: ["Insert", "\xa1"],
            textgreater: ["Insert", ">"],
            textless: ["Insert", "<"],
            textordfeminine: ["Insert", "\xaa"],
            textordmasculine: ["Insert", "\xba"],
            textparagraph: ["Insert", "\xb6"],
            textperiodcentered: ["Insert", "\xb7"],
            textquestiondown: ["Insert", "\xbf"],
            textquotedblleft: ["Insert", "\u201c"],
            textquotedblright: ["Insert", "\u201d"],
            textquoteleft: ["Insert", "\u2018"],
            textquoteright: ["Insert", "\u2019"],
            textsection: ["Insert", "\xa7"],
            textunderscore: ["Insert", "_"],
            textvisiblespace: ["Insert", "\u2423"],
            textacutedbl: ["Insert", "\u02dd"],
            textasciiacute: ["Insert", "\xb4"],
            textasciibreve: ["Insert", "\u02d8"],
            textasciicaron: ["Insert", "\u02c7"],
            textasciidieresis: ["Insert", "\xa8"],
            textasciimacron: ["Insert", "\xaf"],
            textgravedbl: ["Insert", "\u02f5"],
            texttildelow: ["Insert", "\u02f7"],
            textbaht: ["Insert", "\u0e3f"],
            textcent: ["Insert", "\xa2"],
            textcolonmonetary: ["Insert", "\u20a1"],
            textcurrency: ["Insert", "\xa4"],
            textdollar: ["Insert", "$"],
            textdong: ["Insert", "\u20ab"],
            texteuro: ["Insert", "\u20ac"],
            textflorin: ["Insert", "\u0192"],
            textguarani: ["Insert", "\u20b2"],
            textlira: ["Insert", "\u20a4"],
            textnaira: ["Insert", "\u20a6"],
            textpeso: ["Insert", "\u20b1"],
            textsterling: ["Insert", "\xa3"],
            textwon: ["Insert", "\u20a9"],
            textyen: ["Insert", "\xa5"],
            textcircledP: ["Insert", "\u2117"],
            textcompwordmark: ["Insert", "\u200c"],
            textcopyleft: ["Insert", "\ud83c\udd2f"],
            textcopyright: ["Insert", "\xa9"],
            textregistered: ["Insert", "\xae"],
            textservicemark: ["Insert", "\u2120"],
            texttrademark: ["Insert", "\u2122"],
            textbardbl: ["Insert", "\u2016"],
            textbigcircle: ["Insert", "\u25ef"],
            textblank: ["Insert", "\u2422"],
            textbrokenbar: ["Insert", "\xa6"],
            textdiscount: ["Insert", "\u2052"],
            textestimated: ["Insert", "\u212e"],
            textinterrobang: ["Insert", "\u203d"],
            textinterrobangdown: ["Insert", "\u2e18"],
            textmusicalnote: ["Insert", "\u266a"],
            textnumero: ["Insert", "\u2116"],
            textopenbullet: ["Insert", "\u25e6"],
            textpertenthousand: ["Insert", "\u2031"],
            textperthousand: ["Insert", "\u2030"],
            textrecipe: ["Insert", "\u211e"],
            textreferencemark: ["Insert", "\u203b"],
            textlangle: ["Insert", "\u2329"],
            textrangle: ["Insert", "\u232a"],
            textlbrackdbl: ["Insert", "\u27e6"],
            textrbrackdbl: ["Insert", "\u27e7"],
            textlquill: ["Insert", "\u2045"],
            textrquill: ["Insert", "\u2046"],
            textcelsius: ["Insert", "\u2103"],
            textdegree: ["Insert", "\xb0"],
            textdiv: ["Insert", "\xf7"],
            textdownarrow: ["Insert", "\u2193"],
            textfractionsolidus: ["Insert", "\u2044"],
            textleftarrow: ["Insert", "\u2190"],
            textlnot: ["Insert", "\xac"],
            textmho: ["Insert", "\u2127"],
            textminus: ["Insert", "\u2212"],
            textmu: ["Insert", "\xb5"],
            textohm: ["Insert", "\u2126"],
            textonehalf: ["Insert", "\xbd"],
            textonequarter: ["Insert", "\xbc"],
            textonesuperior: ["Insert", "\xb9"],
            textpm: ["Insert", "\xb1"],
            textrightarrow: ["Insert", "\u2192"],
            textsurd: ["Insert", "\u221a"],
            textthreequarters: ["Insert", "\xbe"],
            textthreesuperior: ["Insert", "\xb3"],
            texttimes: ["Insert", "\xd7"],
            texttwosuperior: ["Insert", "\xb2"],
            textuparrow: ["Insert", "\u2191"],
            textborn: ["Insert", "*"],
            textdied: ["Insert", "\u2020"],
            textdivorced: ["Insert", "\u26ae"],
            textmarried: ["Insert", "\u26ad"],
            textcentoldstyle: [
              "Insert",
              "\xa2",
              a.TexConstant.Variant.OLDSTYLE
            ],
            textdollaroldstyle: ["Insert", "$", a.TexConstant.Variant.OLDSTYLE],
            textzerooldstyle: ["Insert", "0", a.TexConstant.Variant.OLDSTYLE],
            textoneoldstyle: ["Insert", "1", a.TexConstant.Variant.OLDSTYLE],
            texttwooldstyle: ["Insert", "2", a.TexConstant.Variant.OLDSTYLE],
            textthreeoldstyle: ["Insert", "3", a.TexConstant.Variant.OLDSTYLE],
            textfouroldstyle: ["Insert", "4", a.TexConstant.Variant.OLDSTYLE],
            textfiveoldstyle: ["Insert", "5", a.TexConstant.Variant.OLDSTYLE],
            textsixoldstyle: ["Insert", "6", a.TexConstant.Variant.OLDSTYLE],
            textsevenoldstyle: ["Insert", "7", a.TexConstant.Variant.OLDSTYLE],
            texteightoldstyle: ["Insert", "8", a.TexConstant.Variant.OLDSTYLE],
            textnineoldstyle: ["Insert", "9", a.TexConstant.Variant.OLDSTYLE]
          },
          {
            Insert: function (t, e, r, n) {
              if (t instanceof s.TextParser) {
                if (!n) return void o.TextMacrosMethods.Insert(t, e, r);
                t.saveText();
              }
              t.Push(i.default.internalText(t, r, n ? { mathvariant: n } : {}));
            }
          }
        );
      },
      3762: function (t, e, r) {
        var n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TextMacrosConfiguration = e.TextBaseConfiguration = void 0);
        var a = r(251),
          o = r(5278),
          i = r(4680),
          s = r(2935),
          l = r(787),
          c = r(4807);
        function u(t, e, r, n) {
          var a = t.configuration.packageData.get("textmacros");
          return (
            t instanceof l.TextParser || (a.texParser = t),
            [
              new l.TextParser(
                e,
                n ? { mathvariant: n } : {},
                a.parseOptions,
                r
              ).mml()
            ]
          );
        }
        r(5557),
          (e.TextBaseConfiguration = a.Configuration.create("text-base", {
            parser: "text",
            handler: {
              character: ["command", "text-special"],
              macro: ["text-macros"]
            },
            fallback: {
              character: function (t, e) {
                t.text += e;
              },
              macro: function (t, e) {
                var r = t.texParser,
                  n = r.lookup("macro", e);
                n &&
                  n._func !== c.TextMacrosMethods.Macro &&
                  t.Error(
                    "MathMacro",
                    "%1 is only supported in math mode",
                    "\\" + e
                  ),
                  r.parse("macro", [t, e]);
              }
            },
            items:
              ((n = {}),
              (n[s.StartItem.prototype.kind] = s.StartItem),
              (n[s.StopItem.prototype.kind] = s.StopItem),
              (n[s.MmlItem.prototype.kind] = s.MmlItem),
              (n[s.StyleItem.prototype.kind] = s.StyleItem),
              n)
          })),
          (e.TextMacrosConfiguration = a.Configuration.create("textmacros", {
            config: function (t, e) {
              var r = new a.ParserConfiguration(
                e.parseOptions.options.textmacros.packages,
                ["tex", "text"]
              );
              r.init();
              var n = new o.default(r, []);
              (n.options = e.parseOptions.options),
                r.config(e),
                i.TagsFactory.addTags(r.tags),
                (n.tags = i.TagsFactory.getDefault()),
                (n.tags.configuration = n),
                (n.packageData = e.parseOptions.packageData),
                n.packageData.set("textmacros", {
                  parseOptions: n,
                  jax: e,
                  texParser: null
                }),
                (n.options.internalMath = u);
            },
            preprocessors: [
              function (t) {
                var e = t.data.packageData.get("textmacros");
                e.parseOptions.nodeFactory.setMmlFactory(e.jax.mmlFactory);
              }
            ],
            options: { textmacros: { packages: ["text-base"] } }
          }));
      },
      5557: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = r(5871),
          a = r(6108),
          o = r(4807),
          i = r(1230);
        new n.MacroMap(
          "text-special",
          {
            $: "Math",
            "%": "Comment",
            "^": "MathModeOnly",
            _: "MathModeOnly",
            "&": "Misplaced",
            "#": "Misplaced",
            "~": "Tilde",
            " ": "Space",
            "\t": "Space",
            "\r": "Space",
            "\n": "Space",
            "\xa0": "Tilde",
            "{": "OpenBrace",
            "}": "CloseBrace",
            "`": "OpenQuote",
            "'": "CloseQuote"
          },
          o.TextMacrosMethods
        ),
          new n.CommandMap(
            "text-macros",
            {
              "(": "Math",
              $: "SelfQuote",
              _: "SelfQuote",
              "%": "SelfQuote",
              "{": "SelfQuote",
              "}": "SelfQuote",
              " ": "SelfQuote",
              "&": "SelfQuote",
              "#": "SelfQuote",
              "\\": "SelfQuote",
              "'": ["Accent", "\xb4"],
              "\u2019": ["Accent", "\xb4"],
              "`": ["Accent", "`"],
              "\u2018": ["Accent", "`"],
              "^": ["Accent", "^"],
              '"': ["Accent", "\xa8"],
              "~": ["Accent", "~"],
              "=": ["Accent", "\xaf"],
              ".": ["Accent", "\u02d9"],
              u: ["Accent", "\u02d8"],
              v: ["Accent", "\u02c7"],
              emph: "Emph",
              rm: ["SetFont", a.TexConstant.Variant.NORMAL],
              mit: ["SetFont", a.TexConstant.Variant.ITALIC],
              oldstyle: ["SetFont", a.TexConstant.Variant.OLDSTYLE],
              cal: ["SetFont", a.TexConstant.Variant.CALLIGRAPHIC],
              it: ["SetFont", "-tex-mathit"],
              bf: ["SetFont", a.TexConstant.Variant.BOLD],
              bbFont: ["SetFont", a.TexConstant.Variant.DOUBLESTRUCK],
              scr: ["SetFont", a.TexConstant.Variant.SCRIPT],
              frak: ["SetFont", a.TexConstant.Variant.FRAKTUR],
              sf: ["SetFont", a.TexConstant.Variant.SANSSERIF],
              tt: ["SetFont", a.TexConstant.Variant.MONOSPACE],
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
              Bbb: ["Macro", "{\\bbFont #1}", 1],
              textrm: ["Macro", "{\\rm #1}", 1],
              textit: ["Macro", "{\\it #1}", 1],
              textbf: ["Macro", "{\\bf #1}", 1],
              textsf: ["Macro", "{\\sf #1}", 1],
              texttt: ["Macro", "{\\tt #1}", 1],
              dagger: ["Insert", "\u2020"],
              ddagger: ["Insert", "\u2021"],
              S: ["Insert", "\xa7"],
              ",": ["Spacer", i.MATHSPACE.thinmathspace],
              ":": ["Spacer", i.MATHSPACE.mediummathspace],
              ">": ["Spacer", i.MATHSPACE.mediummathspace],
              ";": ["Spacer", i.MATHSPACE.thickmathspace],
              "!": ["Spacer", i.MATHSPACE.negativethinmathspace],
              enspace: ["Spacer", 0.5],
              quad: ["Spacer", 1],
              qquad: ["Spacer", 2],
              thinspace: ["Spacer", i.MATHSPACE.thinmathspace],
              negthinspace: ["Spacer", i.MATHSPACE.negativethinmathspace],
              hskip: "Hskip",
              hspace: "Hskip",
              kern: "Hskip",
              mskip: "Hskip",
              mspace: "Hskip",
              mkern: "Hskip",
              rule: "rule",
              Rule: ["Rule"],
              Space: ["Rule", "blank"],
              color: "CheckAutoload",
              textcolor: "CheckAutoload",
              colorbox: "CheckAutoload",
              fcolorbox: "CheckAutoload",
              href: "CheckAutoload",
              style: "CheckAutoload",
              class: "CheckAutoload",
              cssId: "CheckAutoload",
              unicode: "CheckAutoload",
              ref: ["HandleRef", !1],
              eqref: ["HandleRef", !0]
            },
            o.TextMacrosMethods
          );
      },
      4807: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TextMacrosMethods = void 0);
        var n = r(2193),
          a = r(3832),
          o = r(7360);
        e.TextMacrosMethods = {
          Comment: function (t, e) {
            for (; t.i < t.string.length && "\n" !== t.string.charAt(t.i); )
              t.i++;
            t.i++;
          },
          Math: function (t, e) {
            t.saveText();
            for (var r, a, o = t.i, i = 0; (a = t.GetNext()); )
              switch (((r = t.i++), a)) {
                case "\\":
                  ")" === t.GetCS() && (a = "\\(");
                case "$":
                  if (0 === i && e === a) {
                    var s = t.texParser.configuration,
                      l = new n.default(
                        t.string.substr(o, r - o),
                        t.stack.env,
                        s
                      ).mml();
                    return void t.PushMath(l);
                  }
                  break;
                case "{":
                  i++;
                  break;
                case "}":
                  0 === i &&
                    t.Error(
                      "ExtraCloseMissingOpen",
                      "Extra close brace or missing open brace"
                    ),
                    i--;
              }
            t.Error(
              "MathNotTerminated",
              "Math-mode is not properly terminated"
            );
          },
          MathModeOnly: function (t, e) {
            t.Error("MathModeOnly", "'%1' allowed only in math mode", e);
          },
          Misplaced: function (t, e) {
            t.Error("Misplaced", "'%1' can not be used here", e);
          },
          OpenBrace: function (t, e) {
            var r = t.stack.env;
            t.envStack.push(r), (t.stack.env = Object.assign({}, r));
          },
          CloseBrace: function (t, e) {
            t.envStack.length
              ? (t.saveText(), (t.stack.env = t.envStack.pop()))
              : t.Error(
                  "ExtraCloseMissingOpen",
                  "Extra close brace or missing open brace"
                );
          },
          OpenQuote: function (t, e) {
            t.string.charAt(t.i) === e
              ? ((t.text += "\u201c"), t.i++)
              : (t.text += "\u2018");
          },
          CloseQuote: function (t, e) {
            t.string.charAt(t.i) === e
              ? ((t.text += "\u201d"), t.i++)
              : (t.text += "\u2019");
          },
          Tilde: function (t, e) {
            t.text += "\xa0";
          },
          Space: function (t, e) {
            for (t.text += " "; t.GetNext().match(/\s/); ) t.i++;
          },
          SelfQuote: function (t, e) {
            t.text += e.substr(1);
          },
          Insert: function (t, e, r) {
            t.text += r;
          },
          Accent: function (t, e, r) {
            var n = t.ParseArg(e),
              a = t.create("token", "mo", {}, r);
            t.addAttributes(a), t.Push(t.create("node", "mover", [n, a]));
          },
          Emph: function (t, e) {
            var r =
              "-tex-mathit" === t.stack.env.mathvariant
                ? "normal"
                : "-tex-mathit";
            t.Push(t.ParseTextArg(e, { mathvariant: r }));
          },
          SetFont: function (t, e, r) {
            t.saveText(), (t.stack.env.mathvariant = r);
          },
          SetSize: function (t, e, r) {
            t.saveText(), (t.stack.env.mathsize = r);
          },
          CheckAutoload: function (t, e) {
            var r = t.configuration.packageData.get("autoload"),
              n = t.texParser;
            e = e.slice(1);
            var o = n.lookup("macro", e);
            if (!o || (r && o._func === r.Autoload)) {
              if ((n.parse("macro", [n, e]), !o)) return;
              a.retryAfter(Promise.resolve());
            }
            n.parse("macro", [t, e]);
          },
          Macro: o.default.Macro,
          Spacer: o.default.Spacer,
          Hskip: o.default.Hskip,
          rule: o.default.rule,
          Rule: o.default.Rule,
          HandleRef: o.default.HandleRef
        };
      },
      787: function (t, e, r) {
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
                  }
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
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
            },
          s =
            (this && this.__spreadArray) ||
            function (t, e) {
              for (var r = 0, n = e.length, a = t.length; r < n; r++, a++)
                t[a] = e[r];
              return t;
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TextParser = void 0);
        var l = r(2193),
          c = r(3402),
          u = r(7398),
          d = r(2955),
          p = r(4748),
          m = r(2935),
          f = (function (t) {
            function e(e, r, n, a) {
              var o = t.call(this, e, r, n) || this;
              return (o.level = a), o;
            }
            return (
              a(e, t),
              Object.defineProperty(e.prototype, "texParser", {
                get: function () {
                  return this.configuration.packageData.get("textmacros")
                    .texParser;
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "tags", {
                get: function () {
                  return this.texParser.tags;
                },
                enumerable: !1,
                configurable: !0
              }),
              (e.prototype.mml = function () {
                return null != this.level
                  ? this.create("node", "mstyle", this.nodes, {
                      displaystyle: !1,
                      scriptlevel: this.level
                    })
                  : 1 === this.nodes.length
                  ? this.nodes[0]
                  : this.create("node", "mrow", this.nodes);
              }),
              (e.prototype.Parse = function () {
                (this.text = ""),
                  (this.nodes = []),
                  (this.envStack = []),
                  t.prototype.Parse.call(this);
              }),
              (e.prototype.saveText = function () {
                if (this.text) {
                  var t = this.stack.env.mathvariant,
                    e = u.default.internalText(
                      this,
                      this.text,
                      t ? { mathvariant: t } : {}
                    );
                  (this.text = ""), this.Push(e);
                }
              }),
              (e.prototype.Push = function (e) {
                if ((this.text && this.saveText(), e instanceof m.StopItem))
                  return t.prototype.Push.call(this, e);
                e instanceof m.StyleItem
                  ? (this.stack.env.mathcolor = this.stack.env.color)
                  : e instanceof d.AbstractMmlNode &&
                    (this.addAttributes(e), this.nodes.push(e));
              }),
              (e.prototype.PushMath = function (t) {
                var e,
                  r,
                  n = this.stack.env;
                try {
                  for (
                    var a = o(["mathsize", "mathcolor"]), i = a.next();
                    !i.done;
                    i = a.next()
                  ) {
                    var s = i.value;
                    n[s] &&
                      !t.attributes.getExplicit(s) &&
                      (t.isToken ||
                        t.isKind("mstyle") ||
                        (t = this.create("node", "mstyle", [t])),
                      p.default.setAttribute(t, s, n[s]));
                  }
                } catch (t) {
                  e = { error: t };
                } finally {
                  try {
                    i && !i.done && (r = a.return) && r.call(a);
                  } finally {
                    if (e) throw e.error;
                  }
                }
                t.isInferred && (t = this.create("node", "mrow", t.childNodes)),
                  this.nodes.push(t);
              }),
              (e.prototype.addAttributes = function (t) {
                var e,
                  r,
                  n = this.stack.env;
                if (t.isToken)
                  try {
                    for (
                      var a = o(["mathsize", "mathcolor", "mathvariant"]),
                        i = a.next();
                      !i.done;
                      i = a.next()
                    ) {
                      var s = i.value;
                      n[s] &&
                        !t.attributes.getExplicit(s) &&
                        p.default.setAttribute(t, s, n[s]);
                    }
                  } catch (t) {
                    e = { error: t };
                  } finally {
                    try {
                      i && !i.done && (r = a.return) && r.call(a);
                    } finally {
                      if (e) throw e.error;
                    }
                  }
              }),
              (e.prototype.ParseTextArg = function (t, r) {
                return new e(
                  this.GetArgument(t),
                  (r = Object.assign(Object.assign({}, this.stack.env), r)),
                  this.configuration
                ).mml();
              }),
              (e.prototype.ParseArg = function (t) {
                return new e(
                  this.GetArgument(t),
                  this.stack.env,
                  this.configuration
                ).mml();
              }),
              (e.prototype.Error = function (t, e) {
                for (var r = [], n = 2; n < arguments.length; n++)
                  r[n - 2] = arguments[n];
                throw new (c.default.bind.apply(
                  c.default,
                  s([void 0, t, e], i(r))
                ))();
              }),
              e
            );
          })(l.default);
        e.TextParser = f;
      },
      5376: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.UnicodeConfiguration = e.UnicodeMethods = void 0);
        var n = r(251),
          a = r(3402),
          o = r(5871),
          i = r(7398),
          s = r(4748),
          l = r(992);
        e.UnicodeMethods = {};
        var c = {};
        (e.UnicodeMethods.Unicode = function (t, e) {
          var r = t.GetBrackets(e),
            n = null,
            o = null;
          r &&
            (r
              .replace(/ /g, "")
              .match(/^(\d+(\.\d*)?|\.\d+),(\d+(\.\d*)?|\.\d+)$/)
              ? ((n = r.replace(/ /g, "").split(/,/)), (o = t.GetBrackets(e)))
              : (o = r));
          var u = i.default.trimSpaces(t.GetArgument(e)).replace(/^0x/, "x");
          if (!u.match(/^(x[0-9A-Fa-f]+|[0-9]+)$/))
            throw new a.default(
              "BadUnicode",
              "Argument to \\unicode must be a number"
            );
          var d = parseInt(u.match(/^x/) ? "0" + u : u);
          c[d] ? o || (o = c[d][2]) : (c[d] = [800, 200, o, d]),
            n &&
              ((c[d][0] = Math.floor(1e3 * parseFloat(n[0]))),
              (c[d][1] = Math.floor(1e3 * parseFloat(n[1]))));
          var p = t.stack.env.font,
            m = {};
          o
            ? ((c[d][2] = m.fontfamily = o.replace(/'/g, "'")),
              p &&
                (p.match(/bold/) && (m.fontweight = "bold"),
                p.match(/italic|-mathit/) && (m.fontstyle = "italic")))
            : p && (m.mathvariant = p);
          var f = t.create("token", "mtext", m, l.numeric(u));
          s.default.setProperty(f, "unicode", !0), t.Push(f);
        }),
          new o.CommandMap("unicode", { unicode: "Unicode" }, e.UnicodeMethods),
          (e.UnicodeConfiguration = n.Configuration.create("unicode", {
            handler: { macro: ["unicode"] }
          }));
      },
      7927: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.UpgreekConfiguration = void 0);
        var n = r(251),
          a = r(5871),
          o = r(6108);
        new a.CharacterMap(
          "upgreek",
          function (t, e) {
            var r = e.attributes || {};
            r.mathvariant = o.TexConstant.Variant.NORMAL;
            var n = t.create("token", "mi", r, e.char);
            t.Push(n);
          },
          {
            upalpha: "\u03b1",
            upbeta: "\u03b2",
            upgamma: "\u03b3",
            updelta: "\u03b4",
            upepsilon: "\u03f5",
            upzeta: "\u03b6",
            upeta: "\u03b7",
            uptheta: "\u03b8",
            upiota: "\u03b9",
            upkappa: "\u03ba",
            uplambda: "\u03bb",
            upmu: "\u03bc",
            upnu: "\u03bd",
            upxi: "\u03be",
            upomicron: "\u03bf",
            uppi: "\u03c0",
            uprho: "\u03c1",
            upsigma: "\u03c3",
            uptau: "\u03c4",
            upupsilon: "\u03c5",
            upphi: "\u03d5",
            upchi: "\u03c7",
            uppsi: "\u03c8",
            upomega: "\u03c9",
            upvarepsilon: "\u03b5",
            upvartheta: "\u03d1",
            upvarpi: "\u03d6",
            upvarrho: "\u03f1",
            upvarsigma: "\u03c2",
            upvarphi: "\u03c6",
            Upgamma: "\u0393",
            Updelta: "\u0394",
            Uptheta: "\u0398",
            Uplambda: "\u039b",
            Upxi: "\u039e",
            Uppi: "\u03a0",
            Upsigma: "\u03a3",
            Upupsilon: "\u03a5",
            Upphi: "\u03a6",
            Uppsi: "\u03a8",
            Upomega: "\u03a9"
          }
        ),
          (e.UpgreekConfiguration = n.Configuration.create("upgreek", {
            handler: { macro: ["upgreek"] }
          }));
      },
      8768: function (t, e, r) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.VerbConfiguration = e.VerbMethods = void 0);
        var n = r(251),
          a = r(6108),
          o = r(5871),
          i = r(3402);
        (e.VerbMethods = {}),
          (e.VerbMethods.Verb = function (t, e) {
            var r = t.GetNext(),
              n = ++t.i;
            if ("" === r)
              throw new i.default(
                "MissingArgFor",
                "Missing argument for %1",
                e
              );
            for (; t.i < t.string.length && t.string.charAt(t.i) !== r; ) t.i++;
            if (t.i === t.string.length)
              throw new i.default(
                "NoClosingDelim",
                "Can't find closing delimiter for %1",
                t.currentCS
              );
            var o = t.string.slice(n, t.i).replace(/ /g, "\xa0");
            t.i++,
              t.Push(
                t.create(
                  "token",
                  "mtext",
                  { mathvariant: a.TexConstant.Variant.MONOSPACE },
                  o
                )
              );
          }),
          new o.CommandMap("verb", { verb: "Verb" }, e.VerbMethods),
          (e.VerbConfiguration = n.Configuration.create("verb", {
            handler: { macro: ["verb"] }
          }));
      },
      8955: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.isObject = MathJax._.components.global.isObject),
          (e.combineConfig = MathJax._.components.global.combineConfig),
          (e.combineDefaults = MathJax._.components.global.combineDefaults),
          (e.combineWithMathJax =
            MathJax._.components.global.combineWithMathJax),
          (e.MathJax = MathJax._.components.global.MathJax);
      },
      2955: function (t, e) {
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
      8149: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.mathjax = MathJax._.mathjax.mathjax);
      },
      992: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.options = MathJax._.util.Entities.options),
          (e.entities = MathJax._.util.Entities.entities),
          (e.add = MathJax._.util.Entities.add),
          (e.remove = MathJax._.util.Entities.remove),
          (e.translate = MathJax._.util.Entities.translate),
          (e.numeric = MathJax._.util.Entities.numeric);
      },
      5074: function (t, e) {
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
      3832: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.handleRetriesFor = MathJax._.util.Retries.handleRetriesFor),
          (e.retryAfter = MathJax._.util.Retries.retryAfter);
      },
      1230: function (t, e) {
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
      251: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Configuration = MathJax._.input.tex.Configuration.Configuration),
          (e.ConfigurationHandler =
            MathJax._.input.tex.Configuration.ConfigurationHandler),
          (e.ParserConfiguration =
            MathJax._.input.tex.Configuration.ParserConfiguration);
      },
      2348: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NodeFactory = MathJax._.input.tex.NodeFactory.NodeFactory);
      },
      4748: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.NodeUtil.default);
      },
      4945: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.ParseMethods.default);
      },
      5278: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.ParseOptions.default);
      },
      7398: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.ParseUtil.default);
      },
      8935: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.Stack.default);
      },
      1076: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MmlStack = MathJax._.input.tex.StackItem.MmlStack),
          (e.BaseItem = MathJax._.input.tex.StackItem.BaseItem);
      },
      4924: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Symbol = MathJax._.input.tex.Symbol.Symbol),
          (e.Macro = MathJax._.input.tex.Symbol.Macro);
      },
      5871: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.AbstractSymbolMap =
            MathJax._.input.tex.SymbolMap.AbstractSymbolMap),
          (e.RegExpMap = MathJax._.input.tex.SymbolMap.RegExpMap),
          (e.AbstractParseMap = MathJax._.input.tex.SymbolMap.AbstractParseMap),
          (e.CharacterMap = MathJax._.input.tex.SymbolMap.CharacterMap),
          (e.DelimiterMap = MathJax._.input.tex.SymbolMap.DelimiterMap),
          (e.MacroMap = MathJax._.input.tex.SymbolMap.MacroMap),
          (e.CommandMap = MathJax._.input.tex.SymbolMap.CommandMap),
          (e.EnvironmentMap = MathJax._.input.tex.SymbolMap.EnvironmentMap);
      },
      4680: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Label = MathJax._.input.tex.Tags.Label),
          (e.TagInfo = MathJax._.input.tex.Tags.TagInfo),
          (e.AbstractTags = MathJax._.input.tex.Tags.AbstractTags),
          (e.NoTags = MathJax._.input.tex.Tags.NoTags),
          (e.AllTags = MathJax._.input.tex.Tags.AllTags),
          (e.TagsFactory = MathJax._.input.tex.Tags.TagsFactory);
      },
      6108: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.TexConstant = MathJax._.input.tex.TexConstants.TexConstant);
      },
      3402: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.TexError.default);
      },
      2193: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.TexParser.default);
      },
      2379: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Other = MathJax._.input.tex.base.BaseConfiguration.Other),
          (e.BaseTags = MathJax._.input.tex.base.BaseConfiguration.BaseTags),
          (e.BaseConfiguration =
            MathJax._.input.tex.base.BaseConfiguration.BaseConfiguration);
      },
      2935: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.StartItem = MathJax._.input.tex.base.BaseItems.StartItem),
          (e.StopItem = MathJax._.input.tex.base.BaseItems.StopItem),
          (e.OpenItem = MathJax._.input.tex.base.BaseItems.OpenItem),
          (e.CloseItem = MathJax._.input.tex.base.BaseItems.CloseItem),
          (e.PrimeItem = MathJax._.input.tex.base.BaseItems.PrimeItem),
          (e.SubsupItem = MathJax._.input.tex.base.BaseItems.SubsupItem),
          (e.OverItem = MathJax._.input.tex.base.BaseItems.OverItem),
          (e.LeftItem = MathJax._.input.tex.base.BaseItems.LeftItem),
          (e.Middle = MathJax._.input.tex.base.BaseItems.Middle),
          (e.RightItem = MathJax._.input.tex.base.BaseItems.RightItem),
          (e.BeginItem = MathJax._.input.tex.base.BaseItems.BeginItem),
          (e.EndItem = MathJax._.input.tex.base.BaseItems.EndItem),
          (e.StyleItem = MathJax._.input.tex.base.BaseItems.StyleItem),
          (e.PositionItem = MathJax._.input.tex.base.BaseItems.PositionItem),
          (e.CellItem = MathJax._.input.tex.base.BaseItems.CellItem),
          (e.MmlItem = MathJax._.input.tex.base.BaseItems.MmlItem),
          (e.FnItem = MathJax._.input.tex.base.BaseItems.FnItem),
          (e.NotItem = MathJax._.input.tex.base.BaseItems.NotItem),
          (e.NonscriptItem = MathJax._.input.tex.base.BaseItems.NonscriptItem),
          (e.DotsItem = MathJax._.input.tex.base.BaseItems.DotsItem),
          (e.ArrayItem = MathJax._.input.tex.base.BaseItems.ArrayItem),
          (e.EqnArrayItem = MathJax._.input.tex.base.BaseItems.EqnArrayItem),
          (e.EquationItem = MathJax._.input.tex.base.BaseItems.EquationItem);
      },
      7360: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = MathJax._.input.tex.base.BaseMethods.default);
      },
      4282: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.PathFilters = MathJax._.components.loader.PathFilters),
          (e.Loader = MathJax._.components.loader.Loader),
          (e.MathJax = MathJax._.components.loader.MathJax),
          (e.CONFIG = MathJax._.components.loader.CONFIG);
      },
      4629: function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.PackageError = MathJax._.components.package.PackageError),
          (e.Package = MathJax._.components.package.Package);
      },
      4652: function (t, e) {
        /*!
         *************************************************************************
         *
         *  mhchemParser.ts
         *  4.1.0
         *
         *  Parser for the \ce command and \pu command for MathJax and Co.
         *
         *  mhchem's \ce is a tool for writing beautiful chemical equations easily.
         *  mhchem's \pu is a tool for writing physical units easily.
         *
         *  ----------------------------------------------------------------------
         *
         *  Copyright (c) 2015-2021 Martin Hensel
         *
         *  Licensed under the Apache License, Version 2.0 (the "License");
         *  you may not use this file except in compliance with the License.
         *  You may obtain a copy of the License at
         *
         *      http://www.apache.org/licenses/LICENSE-2.0
         *
         *  Unless required by applicable law or agreed to in writing, software
         *  distributed under the License is distributed on an "AS IS" BASIS,
         *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         *  See the License for the specific language governing permissions and
         *  limitations under the License.
         *
         *  ----------------------------------------------------------------------
         *
         *  https://github.com/mhchem/mhchemParser
         *
         */
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.mhchemParser = void 0);
        var r = (function () {
          function t() {}
          return (
            (t.toTex = function (t, e) {
              return o.go(a.go(t, e), "tex" !== e);
            }),
            t
          );
        })();
        function n(t) {
          var e,
            r,
            n = {};
          for (e in t)
            for (r in t[e]) {
              var a = r.split("|");
              t[e][r].stateArray = a;
              for (var o = 0; o < a.length; o++) n[a[o]] = [];
            }
          for (e in t)
            for (r in t[e])
              for (a = t[e][r].stateArray || [], o = 0; o < a.length; o++) {
                var i = t[e][r];
                i.action_ = [].concat(i.action_);
                for (var s = 0; s < i.action_.length; s++)
                  "string" == typeof i.action_[s] &&
                    (i.action_[s] = { type_: i.action_[s] });
                for (var l = e.split("|"), c = 0; c < l.length; c++)
                  if ("*" === a[o]) {
                    var u = void 0;
                    for (u in n) n[u].push({ pattern: l[c], task: i });
                  } else n[a[o]].push({ pattern: l[c], task: i });
              }
          return n;
        }
        e.mhchemParser = r;
        var a = {
            go: function (t, e) {
              if (!t) return [];
              void 0 === e && (e = "ce");
              var r,
                n = "0",
                o = {};
              (o.parenthesisLevel = 0),
                (t = (t = (t = t.replace(/\n/g, " ")).replace(
                  /[\u2212\u2013\u2014\u2010]/g,
                  "-"
                )).replace(/[\u2026]/g, "..."));
              for (var i = 10, s = []; ; ) {
                r !== t ? ((i = 10), (r = t)) : i--;
                var l = a.stateMachines[e],
                  c = l.transitions[n] || l.transitions["*"];
                t: for (var u = 0; u < c.length; u++) {
                  var d = a.patterns.match_(c[u].pattern, t);
                  if (d) {
                    for (var p = c[u].task, m = 0; m < p.action_.length; m++) {
                      var f = void 0;
                      if (l.actions[p.action_[m].type_])
                        f = l.actions[p.action_[m].type_](
                          o,
                          d.match_,
                          p.action_[m].option
                        );
                      else {
                        if (!a.actions[p.action_[m].type_])
                          throw [
                            "MhchemBugA",
                            "mhchem bug A. Please report. (" +
                              p.action_[m].type_ +
                              ")"
                          ];
                        f = a.actions[p.action_[m].type_](
                          o,
                          d.match_,
                          p.action_[m].option
                        );
                      }
                      a.concatArray(s, f);
                    }
                    if (((n = p.nextState || n), !(t.length > 0))) return s;
                    if ((p.revisit || (t = d.remainder), !p.toContinue))
                      break t;
                  }
                }
                if (i <= 0)
                  throw ["MhchemBugU", "mhchem bug U. Please report."];
              }
            },
            concatArray: function (t, e) {
              if (e)
                if (Array.isArray(e))
                  for (var r = 0; r < e.length; r++) t.push(e[r]);
                else t.push(e);
            },
            patterns: {
              patterns: {
                empty: /^$/,
                else: /^./,
                else2: /^./,
                space: /^\s/,
                "space A": /^\s(?=[A-Z\\$])/,
                space$: /^\s$/,
                "a-z": /^[a-z]/,
                x: /^x/,
                x$: /^x$/,
                i$: /^i$/,
                letters:
                  /^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))))+/,
                "\\greek":
                  /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))/,
                "one lowercase latin letter $": /^(?:([a-z])(?:$|[^a-zA-Z]))$/,
                "$one lowercase latin letter$ $":
                  /^\$(?:([a-z])(?:$|[^a-zA-Z]))\$$/,
                "one lowercase greek letter $":
                  /^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\s*\$?)(?:\s+|\{\}|(?![a-zA-Z]))$/,
                digits: /^[0-9]+/,
                "-9.,9": /^[+\-]?(?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))/,
                "-9.,9 no missing 0": /^[+\-]?[0-9]+(?:[.,][0-9]+)?/,
                "(-)(9.,9)(e)(99)": function (t) {
                  var e = t.match(
                    /^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))?(\((?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))\))?(?:(?:([eE])|\s*(\*|x|\\times|\u00D7)\s*10\^)([+\-]?[0-9]+|\{[+\-]?[0-9]+\}))?/
                  );
                  return e && e[0]
                    ? { match_: e.slice(1), remainder: t.substr(e[0].length) }
                    : null;
                },
                "(-)(9)^(-9)":
                  /^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+)?)\^([+\-]?[0-9]+|\{[+\-]?[0-9]+\})/,
                "state of aggregation $": function (t) {
                  var e = a.patterns.findObserveGroups(
                    t,
                    "",
                    /^\([a-z]{1,3}(?=[\),])/,
                    ")",
                    ""
                  );
                  if (e && e.remainder.match(/^($|[\s,;\)\]\}])/)) return e;
                  var r = t.match(/^(?:\((?:\\ca\s?)?\$[amothc]\$\))/);
                  return r
                    ? { match_: r[0], remainder: t.substr(r[0].length) }
                    : null;
                },
                "_{(state of aggregation)}$": /^_\{(\([a-z]{1,3}\))\}/,
                "{[(": /^(?:\\\{|\[|\()/,
                ")]}": /^(?:\)|\]|\\\})/,
                ", ": /^[,;]\s*/,
                ",": /^[,;]/,
                ".": /^[.]/,
                ". __* ": /^([.\u22C5\u00B7\u2022]|[*])\s*/,
                "...": /^\.\.\.(?=$|[^.])/,
                "^{(...)}": function (t) {
                  return a.patterns.findObserveGroups(t, "^{", "", "", "}");
                },
                "^($...$)": function (t) {
                  return a.patterns.findObserveGroups(t, "^", "$", "$", "");
                },
                "^a": /^\^([0-9]+|[^\\_])/,
                "^\\x{}{}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "^",
                    /^\\[a-zA-Z]+\{/,
                    "}",
                    "",
                    "",
                    "{",
                    "}",
                    "",
                    !0
                  );
                },
                "^\\x{}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "^",
                    /^\\[a-zA-Z]+\{/,
                    "}",
                    ""
                  );
                },
                "^\\x": /^\^(\\[a-zA-Z]+)\s*/,
                "^(-1)": /^\^(-?\d+)/,
                "'": /^'/,
                "_{(...)}": function (t) {
                  return a.patterns.findObserveGroups(t, "_{", "", "", "}");
                },
                "_($...$)": function (t) {
                  return a.patterns.findObserveGroups(t, "_", "$", "$", "");
                },
                _9: /^_([+\-]?[0-9]+|[^\\])/,
                "_\\x{}{}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "_",
                    /^\\[a-zA-Z]+\{/,
                    "}",
                    "",
                    "",
                    "{",
                    "}",
                    "",
                    !0
                  );
                },
                "_\\x{}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "_",
                    /^\\[a-zA-Z]+\{/,
                    "}",
                    ""
                  );
                },
                "_\\x": /^_(\\[a-zA-Z]+)\s*/,
                "^_": /^(?:\^(?=_)|\_(?=\^)|[\^_]$)/,
                "{}": /^\{\}/,
                "{...}": function (t) {
                  return a.patterns.findObserveGroups(t, "", "{", "}", "");
                },
                "{(...)}": function (t) {
                  return a.patterns.findObserveGroups(t, "{", "", "", "}");
                },
                "$...$": function (t) {
                  return a.patterns.findObserveGroups(t, "", "$", "$", "");
                },
                "${(...)}$__$(...)$": function (t) {
                  return (
                    a.patterns.findObserveGroups(t, "${", "", "", "}$") ||
                    a.patterns.findObserveGroups(t, "$", "", "", "$")
                  );
                },
                "=<>": /^[=<>]/,
                "#": /^[#\u2261]/,
                "+": /^\+/,
                "-$": /^-(?=[\s_},;\]/]|$|\([a-z]+\))/,
                "-9": /^-(?=[0-9])/,
                "- orbital overlap": /^-(?=(?:[spd]|sp)(?:$|[\s,;\)\]\}]))/,
                "-": /^-/,
                "pm-operator": /^(?:\\pm|\$\\pm\$|\+-|\+\/-)/,
                operator:
                  /^(?:\+|(?:[\-=<>]|<<|>>|\\approx|\$\\approx\$)(?=\s|$|-?[0-9]))/,
                arrowUpDown: /^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;\)\]\}])/,
                "\\bond{(...)}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "\\bond{",
                    "",
                    "",
                    "}"
                  );
                },
                "->": /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/,
                CMT: /^[CMT](?=\[)/,
                "[(...)]": function (t) {
                  return a.patterns.findObserveGroups(t, "[", "", "", "]");
                },
                "1st-level escape": /^(&|\\\\|\\hline)\s*/,
                "\\,": /^(?:\\[,\ ;:])/,
                "\\x{}{}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "",
                    /^\\[a-zA-Z]+\{/,
                    "}",
                    "",
                    "",
                    "{",
                    "}",
                    "",
                    !0
                  );
                },
                "\\x{}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "",
                    /^\\[a-zA-Z]+\{/,
                    "}",
                    ""
                  );
                },
                "\\ca": /^\\ca(?:\s+|(?![a-zA-Z]))/,
                "\\x": /^(?:\\[a-zA-Z]+\s*|\\[_&{}%])/,
                orbital: /^(?:[0-9]{1,2}[spdfgh]|[0-9]{0,2}sp)(?=$|[^a-zA-Z])/,
                others: /^[\/~|]/,
                "\\frac{(...)}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "\\frac{",
                    "",
                    "",
                    "}",
                    "{",
                    "",
                    "",
                    "}"
                  );
                },
                "\\overset{(...)}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "\\overset{",
                    "",
                    "",
                    "}",
                    "{",
                    "",
                    "",
                    "}"
                  );
                },
                "\\underset{(...)}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "\\underset{",
                    "",
                    "",
                    "}",
                    "{",
                    "",
                    "",
                    "}"
                  );
                },
                "\\underbrace{(...)}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "\\underbrace{",
                    "",
                    "",
                    "}_",
                    "{",
                    "",
                    "",
                    "}"
                  );
                },
                "\\color{(...)}": function (t) {
                  return a.patterns.findObserveGroups(
                    t,
                    "\\color{",
                    "",
                    "",
                    "}"
                  );
                },
                "\\color{(...)}{(...)}": function (t) {
                  return (
                    a.patterns.findObserveGroups(
                      t,
                      "\\color{",
                      "",
                      "",
                      "}",
                      "{",
                      "",
                      "",
                      "}"
                    ) ||
                    a.patterns.findObserveGroups(
                      t,
                      "\\color",
                      "\\",
                      "",
                      /^(?=\{)/,
                      "{",
                      "",
                      "",
                      "}"
                    )
                  );
                },
                "\\ce{(...)}": function (t) {
                  return a.patterns.findObserveGroups(t, "\\ce{", "", "", "}");
                },
                "\\pu{(...)}": function (t) {
                  return a.patterns.findObserveGroups(t, "\\pu{", "", "", "}");
                },
                oxidation$: /^(?:[+-][IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,
                "d-oxidation$": /^(?:[+-]?\s?[IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,
                "roman numeral": /^[IVX]+/,
                "1/2$":
                  /^[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+(?:\$[a-z]\$|[a-z])?$/,
                amount: function (t) {
                  var e;
                  if (
                    (e = t.match(
                      /^(?:(?:(?:\([+\-]?[0-9]+\/[0-9]+\)|[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+|[+\-]?[0-9]+[.,][0-9]+|[+\-]?\.[0-9]+|[+\-]?[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[+\-]?[a-z](?=\s*[A-Z])|\+(?!\s))/
                    ))
                  )
                    return { match_: e[0], remainder: t.substr(e[0].length) };
                  var r = a.patterns.findObserveGroups(t, "", "$", "$", "");
                  return r &&
                    (e = r.match_.match(
                      /^\$(?:\(?[+\-]?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?|\+|-)\$$/
                    ))
                    ? { match_: e[0], remainder: t.substr(e[0].length) }
                    : null;
                },
                amount2: function (t) {
                  return this.amount(t);
                },
                "(KV letters),": /^(?:[A-Z][a-z]{0,2}|i)(?=,)/,
                formula$: function (t) {
                  if (t.match(/^\([a-z]+\)$/)) return null;
                  var e = t.match(
                    /^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/
                  );
                  return e
                    ? { match_: e[0], remainder: t.substr(e[0].length) }
                    : null;
                },
                uprightEntities: /^(?:pH|pOH|pC|pK|iPr|iBu)(?=$|[^a-zA-Z])/,
                "/": /^\s*(\/)\s*/,
                "//": /^\s*(\/\/)\s*/,
                "*": /^\s*[*.]\s*/
              },
              findObserveGroups: function (t, e, r, n, a, o, i, s, l, c) {
                var u = function (t, e) {
                    if ("string" == typeof e)
                      return 0 !== t.indexOf(e) ? null : e;
                    var r = t.match(e);
                    return r ? r[0] : null;
                  },
                  d = u(t, e);
                if (null === d) return null;
                if (((t = t.substr(d.length)), null === (d = u(t, r))))
                  return null;
                var p = (function (t, e, r) {
                  for (var n = 0; e < t.length; ) {
                    var a = t.charAt(e),
                      o = u(t.substr(e), r);
                    if (null !== o && 0 === n)
                      return { endMatchBegin: e, endMatchEnd: e + o.length };
                    if ("{" === a) n++;
                    else if ("}" === a) {
                      if (0 === n)
                        throw [
                          "ExtraCloseMissingOpen",
                          "Extra close brace or missing open brace"
                        ];
                      n--;
                    }
                    e++;
                  }
                  return null;
                })(t, d.length, n || a);
                if (null === p) return null;
                var m = t.substring(0, n ? p.endMatchEnd : p.endMatchBegin);
                if (o || i) {
                  var f = this.findObserveGroups(
                    t.substr(p.endMatchEnd),
                    o,
                    i,
                    s,
                    l
                  );
                  if (null === f) return null;
                  var h = [m, f.match_];
                  return { match_: c ? h.join("") : h, remainder: f.remainder };
                }
                return { match_: m, remainder: t.substr(p.endMatchEnd) };
              },
              match_: function (t, e) {
                var r = a.patterns.patterns[t];
                if (void 0 === r)
                  throw [
                    "MhchemBugP",
                    "mhchem bug P. Please report. (" + t + ")"
                  ];
                if ("function" == typeof r) return a.patterns.patterns[t](e);
                var n = e.match(r);
                return n
                  ? n.length > 2
                    ? { match_: n.slice(1), remainder: e.substr(n[0].length) }
                    : { match_: n[1] || n[0], remainder: e.substr(n[0].length) }
                  : null;
              }
            },
            actions: {
              "a=": function (t, e) {
                t.a = (t.a || "") + e;
              },
              "b=": function (t, e) {
                t.b = (t.b || "") + e;
              },
              "p=": function (t, e) {
                t.p = (t.p || "") + e;
              },
              "o=": function (t, e) {
                t.o = (t.o || "") + e;
              },
              "q=": function (t, e) {
                t.q = (t.q || "") + e;
              },
              "d=": function (t, e) {
                t.d = (t.d || "") + e;
              },
              "rm=": function (t, e) {
                t.rm = (t.rm || "") + e;
              },
              "text=": function (t, e) {
                t.text_ = (t.text_ || "") + e;
              },
              insert: function (t, e, r) {
                return { type_: r };
              },
              "insert+p1": function (t, e, r) {
                return { type_: r, p1: e };
              },
              "insert+p1+p2": function (t, e, r) {
                return { type_: r, p1: e[0], p2: e[1] };
              },
              copy: function (t, e) {
                return e;
              },
              write: function (t, e, r) {
                return r;
              },
              rm: function (t, e) {
                return { type_: "rm", p1: e };
              },
              text: function (t, e) {
                return a.go(e, "text");
              },
              "tex-math": function (t, e) {
                return a.go(e, "tex-math");
              },
              "tex-math tight": function (t, e) {
                return a.go(e, "tex-math tight");
              },
              bond: function (t, e, r) {
                return { type_: "bond", kind_: r || e };
              },
              "color0-output": function (t, e) {
                return { type_: "color0", color: e };
              },
              ce: function (t, e) {
                return a.go(e, "ce");
              },
              pu: function (t, e) {
                return a.go(e, "pu");
              },
              "1/2": function (t, e) {
                var r = [];
                e.match(/^[+\-]/) &&
                  (r.push(e.substr(0, 1)), (e = e.substr(1)));
                var n = e.match(
                  /^([0-9]+|\$[a-z]\$|[a-z])\/([0-9]+)(\$[a-z]\$|[a-z])?$/
                );
                return (
                  (n[1] = n[1].replace(/\$/g, "")),
                  r.push({ type_: "frac", p1: n[1], p2: n[2] }),
                  n[3] &&
                    ((n[3] = n[3].replace(/\$/g, "")),
                    r.push({ type_: "tex-math", p1: n[3] })),
                  r
                );
              },
              "9,9": function (t, e) {
                return a.go(e, "9,9");
              }
            },
            stateMachines: {
              tex: {
                transitions: n({
                  empty: { 0: { action_: "copy" } },
                  "\\ce{(...)}": {
                    0: {
                      action_: [
                        { type_: "write", option: "{" },
                        "ce",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "\\pu{(...)}": {
                    0: {
                      action_: [
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  else: { 0: { action_: "copy" } }
                }),
                actions: {}
              },
              ce: {
                transitions: n({
                  empty: { "*": { action_: "output" } },
                  else: {
                    "0|1|2": {
                      action_: "beginsWithBond=false",
                      revisit: !0,
                      toContinue: !0
                    }
                  },
                  oxidation$: { 0: { action_: "oxidation-output" } },
                  CMT: {
                    r: { action_: "rdt=", nextState: "rt" },
                    rd: { action_: "rqt=", nextState: "rdt" }
                  },
                  arrowUpDown: {
                    "0|1|2|as": {
                      action_: ["sb=false", "output", "operator"],
                      nextState: "1"
                    }
                  },
                  uprightEntities: {
                    "0|1|2": { action_: ["o=", "output"], nextState: "1" }
                  },
                  orbital: { "0|1|2|3": { action_: "o=", nextState: "o" } },
                  "->": {
                    "0|1|2|3": { action_: "r=", nextState: "r" },
                    "a|as": { action_: ["output", "r="], nextState: "r" },
                    "*": { action_: ["output", "r="], nextState: "r" }
                  },
                  "+": {
                    o: { action_: "d= kv", nextState: "d" },
                    "d|D": { action_: "d=", nextState: "d" },
                    q: { action_: "d=", nextState: "qd" },
                    "qd|qD": { action_: "d=", nextState: "qd" },
                    dq: { action_: ["output", "d="], nextState: "d" },
                    3: {
                      action_: ["sb=false", "output", "operator"],
                      nextState: "0"
                    }
                  },
                  amount: { "0|2": { action_: "a=", nextState: "a" } },
                  "pm-operator": {
                    "0|1|2|a|as": {
                      action_: [
                        "sb=false",
                        "output",
                        { type_: "operator", option: "\\pm" }
                      ],
                      nextState: "0"
                    }
                  },
                  operator: {
                    "0|1|2|a|as": {
                      action_: ["sb=false", "output", "operator"],
                      nextState: "0"
                    }
                  },
                  "-$": {
                    "o|q": {
                      action_: ["charge or bond", "output"],
                      nextState: "qd"
                    },
                    d: { action_: "d=", nextState: "d" },
                    D: {
                      action_: ["output", { type_: "bond", option: "-" }],
                      nextState: "3"
                    },
                    q: { action_: "d=", nextState: "qd" },
                    qd: { action_: "d=", nextState: "qd" },
                    "qD|dq": {
                      action_: ["output", { type_: "bond", option: "-" }],
                      nextState: "3"
                    }
                  },
                  "-9": {
                    "3|o": {
                      action_: [
                        "output",
                        { type_: "insert", option: "hyphen" }
                      ],
                      nextState: "3"
                    }
                  },
                  "- orbital overlap": {
                    o: {
                      action_: [
                        "output",
                        { type_: "insert", option: "hyphen" }
                      ],
                      nextState: "2"
                    },
                    d: {
                      action_: [
                        "output",
                        { type_: "insert", option: "hyphen" }
                      ],
                      nextState: "2"
                    }
                  },
                  "-": {
                    "0|1|2": {
                      action_: [
                        { type_: "output", option: 1 },
                        "beginsWithBond=true",
                        { type_: "bond", option: "-" }
                      ],
                      nextState: "3"
                    },
                    3: { action_: { type_: "bond", option: "-" } },
                    a: {
                      action_: [
                        "output",
                        { type_: "insert", option: "hyphen" }
                      ],
                      nextState: "2"
                    },
                    as: {
                      action_: [
                        { type_: "output", option: 2 },
                        { type_: "bond", option: "-" }
                      ],
                      nextState: "3"
                    },
                    b: { action_: "b=" },
                    o: {
                      action_: { type_: "- after o/d", option: !1 },
                      nextState: "2"
                    },
                    q: {
                      action_: { type_: "- after o/d", option: !1 },
                      nextState: "2"
                    },
                    "d|qd|dq": {
                      action_: { type_: "- after o/d", option: !0 },
                      nextState: "2"
                    },
                    "D|qD|p": {
                      action_: ["output", { type_: "bond", option: "-" }],
                      nextState: "3"
                    }
                  },
                  amount2: { "1|3": { action_: "a=", nextState: "a" } },
                  letters: {
                    "0|1|2|3|a|as|b|p|bp|o": { action_: "o=", nextState: "o" },
                    "q|dq": { action_: ["output", "o="], nextState: "o" },
                    "d|D|qd|qD": { action_: "o after d", nextState: "o" }
                  },
                  digits: {
                    o: { action_: "q=", nextState: "q" },
                    "d|D": { action_: "q=", nextState: "dq" },
                    q: { action_: ["output", "o="], nextState: "o" },
                    a: { action_: "o=", nextState: "o" }
                  },
                  "space A": { "b|p|bp": { action_: [] } },
                  space: {
                    a: { action_: [], nextState: "as" },
                    0: { action_: "sb=false" },
                    "1|2": { action_: "sb=true" },
                    "r|rt|rd|rdt|rdq": { action_: "output", nextState: "0" },
                    "*": { action_: ["output", "sb=true"], nextState: "1" }
                  },
                  "1st-level escape": {
                    "1|2": {
                      action_: [
                        "output",
                        { type_: "insert+p1", option: "1st-level escape" }
                      ]
                    },
                    "*": {
                      action_: [
                        "output",
                        { type_: "insert+p1", option: "1st-level escape" }
                      ],
                      nextState: "0"
                    }
                  },
                  "[(...)]": {
                    "r|rt": { action_: "rd=", nextState: "rd" },
                    "rd|rdt": { action_: "rq=", nextState: "rdq" }
                  },
                  "...": {
                    "o|d|D|dq|qd|qD": {
                      action_: ["output", { type_: "bond", option: "..." }],
                      nextState: "3"
                    },
                    "*": {
                      action_: [
                        { type_: "output", option: 1 },
                        { type_: "insert", option: "ellipsis" }
                      ],
                      nextState: "1"
                    }
                  },
                  ". __* ": {
                    "*": {
                      action_: [
                        "output",
                        { type_: "insert", option: "addition compound" }
                      ],
                      nextState: "1"
                    }
                  },
                  "state of aggregation $": {
                    "*": {
                      action_: ["output", "state of aggregation"],
                      nextState: "1"
                    }
                  },
                  "{[(": {
                    "a|as|o": {
                      action_: ["o=", "output", "parenthesisLevel++"],
                      nextState: "2"
                    },
                    "0|1|2|3": {
                      action_: ["o=", "output", "parenthesisLevel++"],
                      nextState: "2"
                    },
                    "*": {
                      action_: ["output", "o=", "output", "parenthesisLevel++"],
                      nextState: "2"
                    }
                  },
                  ")]}": {
                    "0|1|2|3|b|p|bp|o": {
                      action_: ["o=", "parenthesisLevel--"],
                      nextState: "o"
                    },
                    "a|as|d|D|q|qd|qD|dq": {
                      action_: ["output", "o=", "parenthesisLevel--"],
                      nextState: "o"
                    }
                  },
                  ", ": {
                    "*": { action_: ["output", "comma"], nextState: "0" }
                  },
                  "^_": { "*": { action_: [] } },
                  "^{(...)}|^($...$)": {
                    "0|1|2|as": { action_: "b=", nextState: "b" },
                    p: { action_: "b=", nextState: "bp" },
                    "3|o": { action_: "d= kv", nextState: "D" },
                    q: { action_: "d=", nextState: "qD" },
                    "d|D|qd|qD|dq": {
                      action_: ["output", "d="],
                      nextState: "D"
                    }
                  },
                  "^a|^\\x{}{}|^\\x{}|^\\x|'": {
                    "0|1|2|as": { action_: "b=", nextState: "b" },
                    p: { action_: "b=", nextState: "bp" },
                    "3|o": { action_: "d= kv", nextState: "d" },
                    q: { action_: "d=", nextState: "qd" },
                    "d|qd|D|qD": { action_: "d=" },
                    dq: { action_: ["output", "d="], nextState: "d" }
                  },
                  "_{(state of aggregation)}$": {
                    "d|D|q|qd|qD|dq": {
                      action_: ["output", "q="],
                      nextState: "q"
                    }
                  },
                  "_{(...)}|_($...$)|_9|_\\x{}{}|_\\x{}|_\\x": {
                    "0|1|2|as": { action_: "p=", nextState: "p" },
                    b: { action_: "p=", nextState: "bp" },
                    "3|o": { action_: "q=", nextState: "q" },
                    "d|D": { action_: "q=", nextState: "dq" },
                    "q|qd|qD|dq": { action_: ["output", "q="], nextState: "q" }
                  },
                  "=<>": {
                    "0|1|2|3|a|as|o|q|d|D|qd|qD|dq": {
                      action_: [{ type_: "output", option: 2 }, "bond"],
                      nextState: "3"
                    }
                  },
                  "#": {
                    "0|1|2|3|a|as|o": {
                      action_: [
                        { type_: "output", option: 2 },
                        { type_: "bond", option: "#" }
                      ],
                      nextState: "3"
                    }
                  },
                  "{}": {
                    "*": {
                      action_: { type_: "output", option: 1 },
                      nextState: "1"
                    }
                  },
                  "{...}": {
                    "0|1|2|3|a|as|b|p|bp": { action_: "o=", nextState: "o" },
                    "o|d|D|q|qd|qD|dq": {
                      action_: ["output", "o="],
                      nextState: "o"
                    }
                  },
                  "$...$": {
                    a: { action_: "a=" },
                    "0|1|2|3|as|b|p|bp|o": { action_: "o=", nextState: "o" },
                    "as|o": { action_: "o=" },
                    "q|d|D|qd|qD|dq": {
                      action_: ["output", "o="],
                      nextState: "o"
                    }
                  },
                  "\\bond{(...)}": {
                    "*": {
                      action_: [{ type_: "output", option: 2 }, "bond"],
                      nextState: "3"
                    }
                  },
                  "\\frac{(...)}": {
                    "*": {
                      action_: [{ type_: "output", option: 1 }, "frac-output"],
                      nextState: "3"
                    }
                  },
                  "\\overset{(...)}": {
                    "*": {
                      action_: [
                        { type_: "output", option: 2 },
                        "overset-output"
                      ],
                      nextState: "3"
                    }
                  },
                  "\\underset{(...)}": {
                    "*": {
                      action_: [
                        { type_: "output", option: 2 },
                        "underset-output"
                      ],
                      nextState: "3"
                    }
                  },
                  "\\underbrace{(...)}": {
                    "*": {
                      action_: [
                        { type_: "output", option: 2 },
                        "underbrace-output"
                      ],
                      nextState: "3"
                    }
                  },
                  "\\color{(...)}{(...)}": {
                    "*": {
                      action_: [{ type_: "output", option: 2 }, "color-output"],
                      nextState: "3"
                    }
                  },
                  "\\color{(...)}": {
                    "*": {
                      action_: [{ type_: "output", option: 2 }, "color0-output"]
                    }
                  },
                  "\\ce{(...)}": {
                    "*": {
                      action_: [{ type_: "output", option: 2 }, "ce"],
                      nextState: "3"
                    }
                  },
                  "\\,": {
                    "*": {
                      action_: [{ type_: "output", option: 1 }, "copy"],
                      nextState: "1"
                    }
                  },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        "output",
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ],
                      nextState: "3"
                    }
                  },
                  "\\x{}{}|\\x{}|\\x": {
                    "0|1|2|3|a|as|b|p|bp|o|c0": {
                      action_: ["o=", "output"],
                      nextState: "3"
                    },
                    "*": { action_: ["output", "o=", "output"], nextState: "3" }
                  },
                  others: {
                    "*": {
                      action_: [{ type_: "output", option: 1 }, "copy"],
                      nextState: "3"
                    }
                  },
                  else2: {
                    a: { action_: "a to o", nextState: "o", revisit: !0 },
                    as: {
                      action_: ["output", "sb=true"],
                      nextState: "1",
                      revisit: !0
                    },
                    "r|rt|rd|rdt|rdq": {
                      action_: ["output"],
                      nextState: "0",
                      revisit: !0
                    },
                    "*": { action_: ["output", "copy"], nextState: "3" }
                  }
                }),
                actions: {
                  "o after d": function (t, e) {
                    var r;
                    if ((t.d || "").match(/^[0-9]+$/)) {
                      var n = t.d;
                      (t.d = void 0), (r = this.output(t)), (t.b = n);
                    } else r = this.output(t);
                    return a.actions["o="](t, e), r;
                  },
                  "d= kv": function (t, e) {
                    (t.d = e), (t.dType = "kv");
                  },
                  "charge or bond": function (t, e) {
                    if (t.beginsWithBond) {
                      var r = [];
                      return (
                        a.concatArray(r, this.output(t)),
                        a.concatArray(r, a.actions.bond(t, e, "-")),
                        r
                      );
                    }
                    t.d = e;
                  },
                  "- after o/d": function (t, e, r) {
                    var n = a.patterns.match_("orbital", t.o || ""),
                      o = a.patterns.match_(
                        "one lowercase greek letter $",
                        t.o || ""
                      ),
                      i = a.patterns.match_(
                        "one lowercase latin letter $",
                        t.o || ""
                      ),
                      s = a.patterns.match_(
                        "$one lowercase latin letter$ $",
                        t.o || ""
                      ),
                      l =
                        "-" === e && ((n && "" === n.remainder) || o || i || s);
                    !l ||
                      t.a ||
                      t.b ||
                      t.p ||
                      t.d ||
                      t.q ||
                      n ||
                      !i ||
                      (t.o = "$" + t.o + "$");
                    var c = [];
                    return (
                      l
                        ? (a.concatArray(c, this.output(t)),
                          c.push({ type_: "hyphen" }))
                        : ((n = a.patterns.match_("digits", t.d || "")),
                          r && n && "" === n.remainder
                            ? (a.concatArray(c, a.actions["d="](t, e)),
                              a.concatArray(c, this.output(t)))
                            : (a.concatArray(c, this.output(t)),
                              a.concatArray(c, a.actions.bond(t, e, "-")))),
                      c
                    );
                  },
                  "a to o": function (t) {
                    (t.o = t.a), (t.a = void 0);
                  },
                  "sb=true": function (t) {
                    t.sb = !0;
                  },
                  "sb=false": function (t) {
                    t.sb = !1;
                  },
                  "beginsWithBond=true": function (t) {
                    t.beginsWithBond = !0;
                  },
                  "beginsWithBond=false": function (t) {
                    t.beginsWithBond = !1;
                  },
                  "parenthesisLevel++": function (t) {
                    t.parenthesisLevel++;
                  },
                  "parenthesisLevel--": function (t) {
                    t.parenthesisLevel--;
                  },
                  "state of aggregation": function (t, e) {
                    return { type_: "state of aggregation", p1: a.go(e, "o") };
                  },
                  comma: function (t, e) {
                    var r = e.replace(/\s*$/, "");
                    return r !== e && 0 === t.parenthesisLevel
                      ? { type_: "comma enumeration L", p1: r }
                      : { type_: "comma enumeration M", p1: r };
                  },
                  output: function (t, e, r) {
                    var n;
                    if (t.r) {
                      var o = void 0;
                      o =
                        "M" === t.rdt
                          ? a.go(t.rd, "tex-math")
                          : "T" === t.rdt
                          ? [{ type_: "text", p1: t.rd || "" }]
                          : a.go(t.rd, "ce");
                      var i = void 0;
                      (i =
                        "M" === t.rqt
                          ? a.go(t.rq, "tex-math")
                          : "T" === t.rqt
                          ? [{ type_: "text", p1: t.rq || "" }]
                          : a.go(t.rq, "ce")),
                        (n = { type_: "arrow", r: t.r, rd: o, rq: i });
                    } else
                      (n = []),
                        (t.a || t.b || t.p || t.o || t.q || t.d || r) &&
                          (t.sb && n.push({ type_: "entitySkip" }),
                          t.o || t.q || t.d || t.b || t.p || 2 === r
                            ? t.o || t.q || t.d || (!t.b && !t.p)
                              ? t.o &&
                                "kv" === t.dType &&
                                a.patterns.match_("d-oxidation$", t.d || "")
                                ? (t.dType = "oxidation")
                                : t.o &&
                                  "kv" === t.dType &&
                                  !t.q &&
                                  (t.dType = void 0)
                              : ((t.o = t.a),
                                (t.d = t.b),
                                (t.q = t.p),
                                (t.a = t.b = t.p = void 0))
                            : ((t.o = t.a), (t.a = void 0)),
                          n.push({
                            type_: "chemfive",
                            a: a.go(t.a, "a"),
                            b: a.go(t.b, "bd"),
                            p: a.go(t.p, "pq"),
                            o: a.go(t.o, "o"),
                            q: a.go(t.q, "pq"),
                            d: a.go(
                              t.d,
                              "oxidation" === t.dType ? "oxidation" : "bd"
                            ),
                            dType: t.dType
                          }));
                    for (var s in t)
                      "parenthesisLevel" !== s &&
                        "beginsWithBond" !== s &&
                        delete t[s];
                    return n;
                  },
                  "oxidation-output": function (t, e) {
                    var r = ["{"];
                    return (
                      a.concatArray(r, a.go(e, "oxidation")), r.push("}"), r
                    );
                  },
                  "frac-output": function (t, e) {
                    return {
                      type_: "frac-ce",
                      p1: a.go(e[0], "ce"),
                      p2: a.go(e[1], "ce")
                    };
                  },
                  "overset-output": function (t, e) {
                    return {
                      type_: "overset",
                      p1: a.go(e[0], "ce"),
                      p2: a.go(e[1], "ce")
                    };
                  },
                  "underset-output": function (t, e) {
                    return {
                      type_: "underset",
                      p1: a.go(e[0], "ce"),
                      p2: a.go(e[1], "ce")
                    };
                  },
                  "underbrace-output": function (t, e) {
                    return {
                      type_: "underbrace",
                      p1: a.go(e[0], "ce"),
                      p2: a.go(e[1], "ce")
                    };
                  },
                  "color-output": function (t, e) {
                    return {
                      type_: "color",
                      color1: e[0],
                      color2: a.go(e[1], "ce")
                    };
                  },
                  "r=": function (t, e) {
                    t.r = e;
                  },
                  "rdt=": function (t, e) {
                    t.rdt = e;
                  },
                  "rd=": function (t, e) {
                    t.rd = e;
                  },
                  "rqt=": function (t, e) {
                    t.rqt = e;
                  },
                  "rq=": function (t, e) {
                    t.rq = e;
                  },
                  operator: function (t, e, r) {
                    return { type_: "operator", kind_: r || e };
                  }
                }
              },
              a: {
                transitions: n({
                  empty: { "*": { action_: [] } },
                  "1/2$": { 0: { action_: "1/2" } },
                  else: { 0: { action_: [], nextState: "1", revisit: !0 } },
                  "${(...)}$__$(...)$": {
                    "*": { action_: "tex-math tight", nextState: "1" }
                  },
                  ",": {
                    "*": {
                      action_: { type_: "insert", option: "commaDecimal" }
                    }
                  },
                  else2: { "*": { action_: "copy" } }
                }),
                actions: {}
              },
              o: {
                transitions: n({
                  empty: { "*": { action_: [] } },
                  "1/2$": { 0: { action_: "1/2" } },
                  else: { 0: { action_: [], nextState: "1", revisit: !0 } },
                  letters: { "*": { action_: "rm" } },
                  "\\ca": {
                    "*": { action_: { type_: "insert", option: "circa" } }
                  },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } },
                  "${(...)}$__$(...)$": { "*": { action_: "tex-math" } },
                  "{(...)}": {
                    "*": {
                      action_: [
                        { type_: "write", option: "{" },
                        "text",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  else2: { "*": { action_: "copy" } }
                }),
                actions: {}
              },
              text: {
                transitions: n({
                  empty: { "*": { action_: "output" } },
                  "{...}": { "*": { action_: "text=" } },
                  "${(...)}$__$(...)$": { "*": { action_: "tex-math" } },
                  "\\greek": { "*": { action_: ["output", "rm"] } },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        "output",
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "\\,|\\x{}{}|\\x{}|\\x": {
                    "*": { action_: ["output", "copy"] }
                  },
                  else: { "*": { action_: "text=" } }
                }),
                actions: {
                  output: function (t) {
                    if (t.text_) {
                      var e = { type_: "text", p1: t.text_ };
                      for (var r in t) delete t[r];
                      return e;
                    }
                  }
                }
              },
              pq: {
                transitions: n({
                  empty: { "*": { action_: [] } },
                  "state of aggregation $": {
                    "*": { action_: "state of aggregation" }
                  },
                  i$: { 0: { action_: [], nextState: "!f", revisit: !0 } },
                  "(KV letters),": { 0: { action_: "rm", nextState: "0" } },
                  formula$: { 0: { action_: [], nextState: "f", revisit: !0 } },
                  "1/2$": { 0: { action_: "1/2" } },
                  else: { 0: { action_: [], nextState: "!f", revisit: !0 } },
                  "${(...)}$__$(...)$": { "*": { action_: "tex-math" } },
                  "{(...)}": { "*": { action_: "text" } },
                  "a-z": { f: { action_: "tex-math" } },
                  letters: { "*": { action_: "rm" } },
                  "-9.,9": { "*": { action_: "9,9" } },
                  ",": {
                    "*": {
                      action_: {
                        type_: "insert+p1",
                        option: "comma enumeration S"
                      }
                    }
                  },
                  "\\color{(...)}{(...)}": { "*": { action_: "color-output" } },
                  "\\color{(...)}": { "*": { action_: "color0-output" } },
                  "\\ce{(...)}": { "*": { action_: "ce" } },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } },
                  else2: { "*": { action_: "copy" } }
                }),
                actions: {
                  "state of aggregation": function (t, e) {
                    return {
                      type_: "state of aggregation subscript",
                      p1: a.go(e, "o")
                    };
                  },
                  "color-output": function (t, e) {
                    return {
                      type_: "color",
                      color1: e[0],
                      color2: a.go(e[1], "pq")
                    };
                  }
                }
              },
              bd: {
                transitions: n({
                  empty: { "*": { action_: [] } },
                  x$: { 0: { action_: [], nextState: "!f", revisit: !0 } },
                  formula$: { 0: { action_: [], nextState: "f", revisit: !0 } },
                  else: { 0: { action_: [], nextState: "!f", revisit: !0 } },
                  "-9.,9 no missing 0": { "*": { action_: "9,9" } },
                  ".": {
                    "*": {
                      action_: { type_: "insert", option: "electron dot" }
                    }
                  },
                  "a-z": { f: { action_: "tex-math" } },
                  x: { "*": { action_: { type_: "insert", option: "KV x" } } },
                  letters: { "*": { action_: "rm" } },
                  "'": {
                    "*": { action_: { type_: "insert", option: "prime" } }
                  },
                  "${(...)}$__$(...)$": { "*": { action_: "tex-math" } },
                  "{(...)}": { "*": { action_: "text" } },
                  "\\color{(...)}{(...)}": { "*": { action_: "color-output" } },
                  "\\color{(...)}": { "*": { action_: "color0-output" } },
                  "\\ce{(...)}": { "*": { action_: "ce" } },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } },
                  else2: { "*": { action_: "copy" } }
                }),
                actions: {
                  "color-output": function (t, e) {
                    return {
                      type_: "color",
                      color1: e[0],
                      color2: a.go(e[1], "bd")
                    };
                  }
                }
              },
              oxidation: {
                transitions: n({
                  empty: { "*": { action_: [] } },
                  "roman numeral": { "*": { action_: "roman-numeral" } },
                  "${(...)}$__$(...)$": { "*": { action_: "tex-math" } },
                  else: { "*": { action_: "copy" } }
                }),
                actions: {
                  "roman-numeral": function (t, e) {
                    return { type_: "roman numeral", p1: e };
                  }
                }
              },
              "tex-math": {
                transitions: n({
                  empty: { "*": { action_: "output" } },
                  "\\ce{(...)}": { "*": { action_: ["output", "ce"] } },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        "output",
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "{...}|\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "o=" } },
                  else: { "*": { action_: "o=" } }
                }),
                actions: {
                  output: function (t) {
                    if (t.o) {
                      var e = { type_: "tex-math", p1: t.o };
                      for (var r in t) delete t[r];
                      return e;
                    }
                  }
                }
              },
              "tex-math tight": {
                transitions: n({
                  empty: { "*": { action_: "output" } },
                  "\\ce{(...)}": { "*": { action_: ["output", "ce"] } },
                  "\\pu{(...)}": {
                    "*": {
                      action_: [
                        "output",
                        { type_: "write", option: "{" },
                        "pu",
                        { type_: "write", option: "}" }
                      ]
                    }
                  },
                  "{...}|\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "o=" } },
                  "-|+": { "*": { action_: "tight operator" } },
                  else: { "*": { action_: "o=" } }
                }),
                actions: {
                  "tight operator": function (t, e) {
                    t.o = (t.o || "") + "{" + e + "}";
                  },
                  output: function (t) {
                    if (t.o) {
                      var e = { type_: "tex-math", p1: t.o };
                      for (var r in t) delete t[r];
                      return e;
                    }
                  }
                }
              },
              "9,9": {
                transitions: n({
                  empty: { "*": { action_: [] } },
                  ",": { "*": { action_: "comma" } },
                  else: { "*": { action_: "copy" } }
                }),
                actions: {
                  comma: function () {
                    return { type_: "commaDecimal" };
                  }
                }
              },
              pu: {
                transitions: n({
                  empty: { "*": { action_: "output" } },
                  space$: { "*": { action_: ["output", "space"] } },
                  "{[(|)]}": { "0|a": { action_: "copy" } },
                  "(-)(9)^(-9)": { 0: { action_: "number^", nextState: "a" } },
                  "(-)(9.,9)(e)(99)": {
                    0: { action_: "enumber", nextState: "a" }
                  },
                  space: { "0|a": { action_: [] } },
                  "pm-operator": {
                    "0|a": {
                      action_: { type_: "operator", option: "\\pm" },
                      nextState: "0"
                    }
                  },
                  operator: { "0|a": { action_: "copy", nextState: "0" } },
                  "//": { d: { action_: "o=", nextState: "/" } },
                  "/": { d: { action_: "o=", nextState: "/" } },
                  "{...}|else": {
                    "0|d": { action_: "d=", nextState: "d" },
                    a: { action_: ["space", "d="], nextState: "d" },
                    "/|q": { action_: "q=", nextState: "q" }
                  }
                }),
                actions: {
                  enumber: function (t, e) {
                    var r = [];
                    return (
                      "+-" === e[0] || "+/-" === e[0]
                        ? r.push("\\pm ")
                        : e[0] && r.push(e[0]),
                      e[1] &&
                        (a.concatArray(r, a.go(e[1], "pu-9,9")),
                        e[2] &&
                          (e[2].match(/[,.]/)
                            ? a.concatArray(r, a.go(e[2], "pu-9,9"))
                            : r.push(e[2])),
                        (e[3] || e[4]) &&
                          ("e" === e[3] || "*" === e[4]
                            ? r.push({ type_: "cdot" })
                            : r.push({ type_: "times" }))),
                      e[5] && r.push("10^{" + e[5] + "}"),
                      r
                    );
                  },
                  "number^": function (t, e) {
                    var r = [];
                    return (
                      "+-" === e[0] || "+/-" === e[0]
                        ? r.push("\\pm ")
                        : e[0] && r.push(e[0]),
                      a.concatArray(r, a.go(e[1], "pu-9,9")),
                      r.push("^{" + e[2] + "}"),
                      r
                    );
                  },
                  operator: function (t, e, r) {
                    return { type_: "operator", kind_: r || e };
                  },
                  space: function () {
                    return { type_: "pu-space-1" };
                  },
                  output: function (t) {
                    var e,
                      r = a.patterns.match_("{(...)}", t.d || "");
                    r && "" === r.remainder && (t.d = r.match_);
                    var n = a.patterns.match_("{(...)}", t.q || "");
                    if (
                      (n && "" === n.remainder && (t.q = n.match_),
                      t.d &&
                        ((t.d = t.d.replace(
                          /\u00B0C|\^oC|\^{o}C/g,
                          "{}^{\\circ}C"
                        )),
                        (t.d = t.d.replace(
                          /\u00B0F|\^oF|\^{o}F/g,
                          "{}^{\\circ}F"
                        ))),
                      t.q)
                    ) {
                      (t.q = t.q.replace(
                        /\u00B0C|\^oC|\^{o}C/g,
                        "{}^{\\circ}C"
                      )),
                        (t.q = t.q.replace(
                          /\u00B0F|\^oF|\^{o}F/g,
                          "{}^{\\circ}F"
                        ));
                      var o = { d: a.go(t.d, "pu"), q: a.go(t.q, "pu") };
                      "//" === t.o
                        ? (e = { type_: "pu-frac", p1: o.d, p2: o.q })
                        : ((e = o.d),
                          o.d.length > 1 || o.q.length > 1
                            ? e.push({ type_: " / " })
                            : e.push({ type_: "/" }),
                          a.concatArray(e, o.q));
                    } else e = a.go(t.d, "pu-2");
                    for (var i in t) delete t[i];
                    return e;
                  }
                }
              },
              "pu-2": {
                transitions: n({
                  empty: { "*": { action_: "output" } },
                  "*": { "*": { action_: ["output", "cdot"], nextState: "0" } },
                  "\\x": { "*": { action_: "rm=" } },
                  space: {
                    "*": { action_: ["output", "space"], nextState: "0" }
                  },
                  "^{(...)}|^(-1)": { 1: { action_: "^(-1)" } },
                  "-9.,9": {
                    0: { action_: "rm=", nextState: "0" },
                    1: { action_: "^(-1)", nextState: "0" }
                  },
                  "{...}|else": { "*": { action_: "rm=", nextState: "1" } }
                }),
                actions: {
                  cdot: function () {
                    return { type_: "tight cdot" };
                  },
                  "^(-1)": function (t, e) {
                    t.rm += "^{" + e + "}";
                  },
                  space: function () {
                    return { type_: "pu-space-2" };
                  },
                  output: function (t) {
                    var e = [];
                    if (t.rm) {
                      var r = a.patterns.match_("{(...)}", t.rm || "");
                      e =
                        r && "" === r.remainder
                          ? a.go(r.match_, "pu")
                          : { type_: "rm", p1: t.rm };
                    }
                    for (var n in t) delete t[n];
                    return e;
                  }
                }
              },
              "pu-9,9": {
                transitions: n({
                  empty: {
                    0: { action_: "output-0" },
                    o: { action_: "output-o" }
                  },
                  ",": {
                    0: { action_: ["output-0", "comma"], nextState: "o" }
                  },
                  ".": { 0: { action_: ["output-0", "copy"], nextState: "o" } },
                  else: { "*": { action_: "text=" } }
                }),
                actions: {
                  comma: function () {
                    return { type_: "commaDecimal" };
                  },
                  "output-0": function (t) {
                    var e = [];
                    if (((t.text_ = t.text_ || ""), t.text_.length > 4)) {
                      var r = t.text_.length % 3;
                      0 === r && (r = 3);
                      for (var n = t.text_.length - 3; n > 0; n -= 3)
                        e.push(t.text_.substr(n, 3)),
                          e.push({ type_: "1000 separator" });
                      e.push(t.text_.substr(0, r)), e.reverse();
                    } else e.push(t.text_);
                    for (var a in t) delete t[a];
                    return e;
                  },
                  "output-o": function (t) {
                    var e = [];
                    if (((t.text_ = t.text_ || ""), t.text_.length > 4)) {
                      var r = t.text_.length - 3,
                        n = void 0;
                      for (n = 0; n < r; n += 3)
                        e.push(t.text_.substr(n, 3)),
                          e.push({ type_: "1000 separator" });
                      e.push(t.text_.substr(n));
                    } else e.push(t.text_);
                    for (var a in t) delete t[a];
                    return e;
                  }
                }
              }
            }
          },
          o = {
            go: function (t, e) {
              if (!t) return "";
              for (var r = "", n = !1, a = 0; a < t.length; a++) {
                var i = t[a];
                "string" == typeof i
                  ? (r += i)
                  : ((r += o._go2(i)),
                    "1st-level escape" === i.type_ && (n = !0));
              }
              return e && !n && r && (r = "{" + r + "}"), r;
            },
            _goInner: function (t) {
              return o.go(t, !1);
            },
            _go2: function (t) {
              var e;
              switch (t.type_) {
                case "chemfive":
                  e = "";
                  var r = {
                    a: o._goInner(t.a),
                    b: o._goInner(t.b),
                    p: o._goInner(t.p),
                    o: o._goInner(t.o),
                    q: o._goInner(t.q),
                    d: o._goInner(t.d)
                  };
                  r.a &&
                    (r.a.match(/^[+\-]/) && (r.a = "{" + r.a + "}"),
                    (e += r.a + "\\,")),
                    (r.b || r.p) &&
                      ((e += "{\\vphantom{X}}"),
                      (e +=
                        "^{\\hphantom{" +
                        (r.b || "") +
                        "}}_{\\hphantom{" +
                        (r.p || "") +
                        "}}"),
                      (e += "{\\vphantom{X}}"),
                      (e +=
                        "^{\\smash[t]{\\vphantom{2}}\\llap{" +
                        (r.b || "") +
                        "}}"),
                      (e +=
                        "_{\\vphantom{2}\\llap{\\smash[t]{" +
                        (r.p || "") +
                        "}}}")),
                    r.o &&
                      (r.o.match(/^[+\-]/) && (r.o = "{" + r.o + "}"),
                      (e += r.o)),
                    "kv" === t.dType
                      ? ((r.d || r.q) && (e += "{\\vphantom{X}}"),
                        r.d && (e += "^{" + r.d + "}"),
                        r.q && (e += "_{\\smash[t]{" + r.q + "}}"))
                      : "oxidation" === t.dType
                      ? (r.d &&
                          ((e += "{\\vphantom{X}}"), (e += "^{" + r.d + "}")),
                        r.q &&
                          ((e += "{\\vphantom{X}}"),
                          (e += "_{\\smash[t]{" + r.q + "}}")))
                      : (r.q &&
                          ((e += "{\\vphantom{X}}"),
                          (e += "_{\\smash[t]{" + r.q + "}}")),
                        r.d &&
                          ((e += "{\\vphantom{X}}"), (e += "^{" + r.d + "}")));
                  break;
                case "rm":
                  e = "\\mathrm{" + t.p1 + "}";
                  break;
                case "text":
                  t.p1.match(/[\^_]/)
                    ? ((t.p1 = t.p1
                        .replace(" ", "~")
                        .replace("-", "\\text{-}")),
                      (e = "\\mathrm{" + t.p1 + "}"))
                    : (e = "\\text{" + t.p1 + "}");
                  break;
                case "roman numeral":
                  e = "\\mathrm{" + t.p1 + "}";
                  break;
                case "state of aggregation":
                  e = "\\mskip2mu " + o._goInner(t.p1);
                  break;
                case "state of aggregation subscript":
                  e = "\\mskip1mu " + o._goInner(t.p1);
                  break;
                case "bond":
                  if (!(e = o._getBond(t.kind_)))
                    throw [
                      "MhchemErrorBond",
                      "mhchem Error. Unknown bond type (" + t.kind_ + ")"
                    ];
                  break;
                case "frac":
                  var n = "\\frac{" + t.p1 + "}{" + t.p2 + "}";
                  e =
                    "\\mathchoice{\\textstyle" +
                    n +
                    "}{" +
                    n +
                    "}{" +
                    n +
                    "}{" +
                    n +
                    "}";
                  break;
                case "pu-frac":
                  var a =
                    "\\frac{" +
                    o._goInner(t.p1) +
                    "}{" +
                    o._goInner(t.p2) +
                    "}";
                  e =
                    "\\mathchoice{\\textstyle" +
                    a +
                    "}{" +
                    a +
                    "}{" +
                    a +
                    "}{" +
                    a +
                    "}";
                  break;
                case "tex-math":
                  e = t.p1 + " ";
                  break;
                case "frac-ce":
                  e =
                    "\\frac{" +
                    o._goInner(t.p1) +
                    "}{" +
                    o._goInner(t.p2) +
                    "}";
                  break;
                case "overset":
                  e =
                    "\\overset{" +
                    o._goInner(t.p1) +
                    "}{" +
                    o._goInner(t.p2) +
                    "}";
                  break;
                case "underset":
                  e =
                    "\\underset{" +
                    o._goInner(t.p1) +
                    "}{" +
                    o._goInner(t.p2) +
                    "}";
                  break;
                case "underbrace":
                  e =
                    "\\underbrace{" +
                    o._goInner(t.p1) +
                    "}_{" +
                    o._goInner(t.p2) +
                    "}";
                  break;
                case "color":
                  e =
                    "{\\color{" + t.color1 + "}{" + o._goInner(t.color2) + "}}";
                  break;
                case "color0":
                  e = "\\color{" + t.color + "}";
                  break;
                case "arrow":
                  var i = { rd: o._goInner(t.rd), rq: o._goInner(t.rq) },
                    s = o._getArrow(t.r);
                  i.rd || i.rq
                    ? "<=>" === t.r ||
                      "<=>>" === t.r ||
                      "<<=>" === t.r ||
                      "<--\x3e" === t.r
                      ? ((s = "\\long" + s),
                        i.rd && (s = "\\overset{" + i.rd + "}{" + s + "}"),
                        i.rq &&
                          (s =
                            "<--\x3e" === t.r
                              ? "\\underset{\\lower2mu{" +
                                i.rq +
                                "}}{" +
                                s +
                                "}"
                              : "\\underset{\\lower6mu{" +
                                i.rq +
                                "}}{" +
                                s +
                                "}"),
                        (s = " {}\\mathrel{" + s + "}{} "))
                      : (i.rq && (s += "[{" + i.rq + "}]"),
                        (s =
                          " {}\\mathrel{\\x" +
                          (s += "{" + i.rd + "}") +
                          "}{} "))
                    : (s = " {}\\mathrel{\\long" + s + "}{} "),
                    (e = s);
                  break;
                case "operator":
                  e = o._getOperator(t.kind_);
                  break;
                case "1st-level escape":
                  e = t.p1 + " ";
                  break;
                case "space":
                  e = " ";
                  break;
                case "entitySkip":
                case "pu-space-1":
                  e = "~";
                  break;
                case "pu-space-2":
                  e = "\\mkern3mu ";
                  break;
                case "1000 separator":
                  e = "\\mkern2mu ";
                  break;
                case "commaDecimal":
                  e = "{,}";
                  break;
                case "comma enumeration L":
                  e = "{" + t.p1 + "}\\mkern6mu ";
                  break;
                case "comma enumeration M":
                  e = "{" + t.p1 + "}\\mkern3mu ";
                  break;
                case "comma enumeration S":
                  e = "{" + t.p1 + "}\\mkern1mu ";
                  break;
                case "hyphen":
                  e = "\\text{-}";
                  break;
                case "addition compound":
                  e = "\\,{\\cdot}\\,";
                  break;
                case "electron dot":
                  e = "\\mkern1mu \\bullet\\mkern1mu ";
                  break;
                case "KV x":
                  e = "{\\times}";
                  break;
                case "prime":
                  e = "\\prime ";
                  break;
                case "cdot":
                  e = "\\cdot ";
                  break;
                case "tight cdot":
                  e = "\\mkern1mu{\\cdot}\\mkern1mu ";
                  break;
                case "times":
                  e = "\\times ";
                  break;
                case "circa":
                  e = "{\\sim}";
                  break;
                case "^":
                  e = "uparrow";
                  break;
                case "v":
                  e = "downarrow";
                  break;
                case "ellipsis":
                  e = "\\ldots ";
                  break;
                case "/":
                  e = "/";
                  break;
                case " / ":
                  e = "\\,/\\,";
                  break;
                default:
                  throw ["MhchemBugT", "mhchem bug T. Please report."];
              }
              return e;
            },
            _getArrow: function (t) {
              switch (t) {
                case "->":
                case "\u2192":
                case "\u27f6":
                  return "rightarrow";
                case "<-":
                  return "leftarrow";
                case "<->":
                  return "leftrightarrow";
                case "<--\x3e":
                  return "leftrightarrows";
                case "<=>":
                case "\u21cc":
                  return "rightleftharpoons";
                case "<=>>":
                  return "Rightleftharpoons";
                case "<<=>":
                  return "Leftrightharpoons";
                default:
                  throw ["MhchemBugT", "mhchem bug T. Please report."];
              }
            },
            _getBond: function (t) {
              switch (t) {
                case "-":
                case "1":
                  return "{-}";
                case "=":
                case "2":
                  return "{=}";
                case "#":
                case "3":
                  return "{\\equiv}";
                case "~":
                  return "{\\tripledash}";
                case "~-":
                  return "{\\rlap{\\lower.1em{-}}\\raise.1em{\\tripledash}}";
                case "~=":
                case "~--":
                  return "{\\rlap{\\lower.2em{-}}\\rlap{\\raise.2em{\\tripledash}}-}";
                case "-~-":
                  return "{\\rlap{\\lower.2em{-}}\\rlap{\\raise.2em{-}}\\tripledash}";
                case "...":
                  return "{{\\cdot}{\\cdot}{\\cdot}}";
                case "....":
                  return "{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}";
                case "->":
                  return "{\\rightarrow}";
                case "<-":
                  return "{\\leftarrow}";
                case "<":
                  return "{<}";
                case ">":
                  return "{>}";
                default:
                  throw ["MhchemBugT", "mhchem bug T. Please report."];
              }
            },
            _getOperator: function (t) {
              switch (t) {
                case "+":
                  return " {}+{} ";
                case "-":
                  return " {}-{} ";
                case "=":
                  return " {}={} ";
                case "<":
                  return " {}<{} ";
                case ">":
                  return " {}>{} ";
                case "<<":
                  return " {}\\ll{} ";
                case ">>":
                  return " {}\\gg{} ";
                case "\\pm":
                  return " {}\\pm{} ";
                case "\\approx":
                case "$\\approx$":
                  return " {}\\approx{} ";
                case "v":
                case "(v)":
                  return " \\downarrow{} ";
                case "^":
                case "(^)":
                  return " \\uparrow{} ";
                default:
                  throw ["MhchemBugT", "mhchem bug T. Please report."];
              }
            }
          };
      }
    },
    e = {};
  function r(n) {
    var a = e[n];
    if (void 0 !== a) return a.exports;
    var o = (e[n] = { exports: {} });
    return t[n].call(o.exports, o, o.exports, r), o.exports;
  }
  !(function () {
    var t = r(8955),
      e = r(7375),
      n = r(5275),
      a = r(2778);
    (0, t.combineWithMathJax)({
      _: {
        input: {
          tex: {
            AllPackages: e,
            autoload: { AutoloadConfiguration: n },
            require: { RequireConfiguration: a }
          }
        }
      }
    });
    var o,
      i = r(5074);
    function s(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    if (
      (MathJax.loader &&
        MathJax.loader.preLoad("[tex]/autoload", "[tex]/require"),
      MathJax.startup)
    ) {
      MathJax.config.tex || (MathJax.config.tex = {});
      var l = MathJax.config.tex.packages;
      (MathJax.config.tex.packages = ["autoload", "require"].concat(
        (function (t) {
          if (Array.isArray(t)) return s(t);
        })((o = e.AllPackages)) ||
          (function (t) {
            if (
              ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
              null != t["@@iterator"]
            )
              return Array.from(t);
          })(o) ||
          (function (t, e) {
            if (t) {
              if ("string" == typeof t) return s(t, e);
              var r = Object.prototype.toString.call(t).slice(8, -1);
              return (
                "Object" === r && t.constructor && (r = t.constructor.name),
                "Map" === r || "Set" === r
                  ? Array.from(t)
                  : "Arguments" === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? s(t, e)
                  : void 0
              );
            }
          })(o) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
      )),
        l && (0, i.insert)(MathJax.config.tex, { packages: l });
    }
  })();
})();
