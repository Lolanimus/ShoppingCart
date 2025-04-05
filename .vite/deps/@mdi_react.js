import {
  require_prop_types
} from "./chunk-QWOZHILC.js";
import {
  require_react
} from "./chunk-K2PNMST5.js";
import {
  __commonJS
} from "./chunk-5WRI5ZAA.js";

// ../node_modules/@mdi/react/Icon.js
var require_Icon = __commonJS({
  "../node_modules/@mdi/react/Icon.js"(exports, module) {
    module.exports = function(e) {
      var t = {};
      function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = { i: n, l: false, exports: {} };
        return e[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
      }
      return r.m = e, r.c = t, r.d = function(e2, t2, n) {
        r.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: n });
      }, r.r = function(e2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, r.t = function(e2, t2) {
        if (1 & t2 && (e2 = r(e2)), 8 & t2) return e2;
        if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule) return e2;
        var n = /* @__PURE__ */ Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2) for (var o in e2) r.d(n, o, (function(t3) {
          return e2[t3];
        }).bind(null, o));
        return n;
      }, r.n = function(e2) {
        var t2 = e2 && e2.__esModule ? function() {
          return e2.default;
        } : function() {
          return e2;
        };
        return r.d(t2, "a", t2), t2;
      }, r.o = function(e2, t2) {
        return Object.prototype.hasOwnProperty.call(e2, t2);
      }, r.p = "", r(r.s = 2);
    }([function(e, t) {
      e.exports = require_prop_types();
    }, function(e, t) {
      e.exports = require_react();
    }, function(e, t, r) {
      "use strict";
      r.r(t);
      var n = r(1), o = r(0), l = function() {
        return (l = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
          return e2;
        }).apply(this, arguments);
      }, i = function(e2, t2) {
        var r2 = {};
        for (var n2 in e2) Object.prototype.hasOwnProperty.call(e2, n2) && t2.indexOf(n2) < 0 && (r2[n2] = e2[n2]);
        if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
          var o2 = 0;
          for (n2 = Object.getOwnPropertySymbols(e2); o2 < n2.length; o2++) t2.indexOf(n2[o2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, n2[o2]) && (r2[n2[o2]] = e2[n2[o2]]);
        }
        return r2;
      }, a = 0, s = n.forwardRef(function(e2, t2) {
        var r2 = e2.title, o2 = void 0 === r2 ? null : r2, s2 = e2.description, c2 = void 0 === s2 ? null : s2, u2 = e2.size, p2 = void 0 === u2 ? null : u2, f2 = e2.color, d2 = void 0 === f2 ? "currentColor" : f2, y = e2.horizontal, v = void 0 === y ? null : y, b = e2.vertical, m = void 0 === b ? null : b, h = e2.rotate, g = void 0 === h ? null : h, O = e2.spin, w = void 0 === O ? null : O, j = e2.style, z = void 0 === j ? {} : j, E = e2.children, P = i(e2, ["title", "description", "size", "color", "horizontal", "vertical", "rotate", "spin", "style", "children"]);
        a++;
        var S, x = null !== w && w, _ = n.Children.map(E, function(e3) {
          var t3 = e3;
          true !== x && (x = true === (null === w ? t3.props.spin : w));
          var r3 = t3.props.size;
          "number" == typeof p2 && "number" == typeof t3.props.size && (r3 = t3.props.size / p2);
          var o3 = { size: r3, color: null === d2 ? t3.props.color : d2, horizontal: null === v ? t3.props.horizontal : v, vertical: null === m ? t3.props.vertical : m, rotate: null === g ? t3.props.rotate : g, spin: null === w ? t3.props.spin : w, inStack: true };
          return n.cloneElement(t3, o3);
        });
        null !== p2 && (z.width = "string" == typeof p2 ? p2 : 1.5 * p2 + "rem");
        var k, T = "stack_labelledby_" + a, q = "stack_describedby_" + a;
        if (o2) S = c2 ? T + " " + q : T;
        else if (k = "presentation", c2) throw new Error("title attribute required when description is set");
        return n.createElement("svg", l({ ref: t2, viewBox: "0 0 24 24", style: z, role: k, "aria-labelledby": S }, P), o2 && n.createElement("title", { id: T }, o2), c2 && n.createElement("desc", { id: q }, c2), x && n.createElement("style", null, "@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }", "@keyframes spin-inverse { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }"), _);
      });
      s.displayName = "Stack", s.propTypes = { size: o.oneOfType([o.number, o.string]), color: o.string, horizontal: o.bool, vertical: o.bool, rotate: o.number, spin: o.oneOfType([o.bool, o.number]), children: o.oneOfType([o.arrayOf(o.node), o.node]).isRequired, className: o.string, style: o.object }, s.defaultProps = { size: null, color: null, horizontal: null, vertical: null, rotate: null, spin: null };
      var c = s;
      r.d(t, "Icon", function() {
        return d;
      }), r.d(t, "Stack", function() {
        return c;
      });
      var u = function() {
        return (u = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
          return e2;
        }).apply(this, arguments);
      }, p = function(e2, t2) {
        var r2 = {};
        for (var n2 in e2) Object.prototype.hasOwnProperty.call(e2, n2) && t2.indexOf(n2) < 0 && (r2[n2] = e2[n2]);
        if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
          var o2 = 0;
          for (n2 = Object.getOwnPropertySymbols(e2); o2 < n2.length; o2++) t2.indexOf(n2[o2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, n2[o2]) && (r2[n2[o2]] = e2[n2[o2]]);
        }
        return r2;
      }, f = 0, d = n.forwardRef(function(e2, t2) {
        var r2 = e2.path, o2 = e2.id, l2 = void 0 === o2 ? ++f : o2, i2 = e2.title, a2 = void 0 === i2 ? null : i2, s2 = e2.description, c2 = void 0 === s2 ? null : s2, d2 = e2.size, y = void 0 === d2 ? null : d2, v = e2.color, b = void 0 === v ? "currentColor" : v, m = e2.horizontal, h = void 0 !== m && m, g = e2.vertical, O = void 0 !== g && g, w = e2.rotate, j = void 0 === w ? 0 : w, z = e2.spin, E = void 0 !== z && z, P = e2.style, S = void 0 === P ? {} : P, x = e2.inStack, _ = void 0 !== x && x, k = p(e2, ["path", "id", "title", "description", "size", "color", "horizontal", "vertical", "rotate", "spin", "style", "inStack"]), T = {}, q = [];
        null !== y && (_ ? q.push("scale(" + y + ")") : (S.width = "string" == typeof y ? y : 1.5 * y + "rem", S.height = S.width)), h && q.push("scaleX(-1)"), O && q.push("scaleY(-1)"), 0 !== j && q.push("rotate(" + j + "deg)"), null !== b && (T.fill = b);
        var M = n.createElement("path", u({ d: r2, style: T }, _ ? k : {})), C = M;
        q.length > 0 && (S.transform = q.join(" "), S.transformOrigin = "center", _ && (C = n.createElement("g", { style: S }, M, n.createElement("rect", { width: "24", height: "24", fill: "transparent" }))));
        var I, N = C, R = true === E || "number" != typeof E ? 2 : E, B = !_ && (h || O);
        if (R < 0 && (B = !B), E && (N = n.createElement("g", { style: { animation: "spin" + (B ? "-inverse" : "") + " linear " + Math.abs(R) + "s infinite", transformOrigin: "center" } }, C, !(h || O || 0 !== j) && n.createElement("rect", { width: "24", height: "24", fill: "transparent" }))), _) return N;
        var X, Y = "icon_labelledby_" + l2, A = "icon_describedby_" + l2;
        if (a2) I = c2 ? Y + " " + A : Y;
        else if (X = "presentation", c2) throw new Error("title attribute required when description is set");
        return n.createElement("svg", u({ ref: t2, viewBox: "0 0 24 24", style: S, role: X, "aria-labelledby": I }, k), a2 && n.createElement("title", { id: Y }, a2), c2 && n.createElement("desc", { id: A }, c2), !_ && E && (B ? n.createElement("style", null, "@keyframes spin-inverse { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }") : n.createElement("style", null, "@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }")), N);
      });
      d.displayName = "Icon", d.propTypes = { path: o.string.isRequired, size: o.oneOfType([o.number, o.string]), color: o.string, horizontal: o.bool, vertical: o.bool, rotate: o.number, spin: o.oneOfType([o.bool, o.number]), style: o.object, inStack: o.bool, className: o.string }, d.defaultProps = { size: null, color: "currentColor", horizontal: false, vertical: false, rotate: 0, spin: false };
      t.default = d;
    }]);
  }
});
export default require_Icon();
//# sourceMappingURL=@mdi_react.js.map
