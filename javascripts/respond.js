function enumerate(e, t, n, r, i) {
    function s(e) {
        return e.split("\\").join("\\\\").split("\n").join("\\n").split("'").join("\\'").split('"').join('\\"')
    }
    if (!e)
        return "{falsy}";
    var o, u;
    t===!0 && (t = 10), t < 1 && (t=!1), i || (i = 0);
    var a = "";
    t && (a = "    ");
    var f = e.___originalKeys || e;
    for (u in f) {
        if (u === "___originalKeys" ||!n&&!f.hasOwnProperty(u) || r&&!!r[u])
            continue;
        (o || (o = [])).push("    " + (u.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ? u : '"' + u + '"') + ": " + function() {
            try {
                return typeof e[u] == "string" ? '"' + s(e[u]) + '"' : typeof e[u] == "number" ? e[u] : typeof e[u] == "function" ? e[u].toString().split("\n").join("\n" + a) : t ? enumerate(e[u], t - 1, n, r, undefined, i + 1).split("\n").join("\n" + a) : e[u]
            } catch (o) {
                return o
            }
        }())
    }
    return o ? " {\n" + o.join(",\n") + "\n}" : "{}"
}
function bench(e, t, n) {
    isNaN(t) || (n = t, t = null), t || (t = arguments.callee.blankFunction || (arguments.callee.blankFunction = function() {})), n || (n = 50);
    var r = 10, i = 100, s = new Date * 2, o = new Date * 1;
    for (var u = 0; new Date * 1 - o < n && r < i; u++)
        e();
    var a = new Date * 1, f = new Date * 1;
    for (var l = 0; new Date * 1 - o < s && l < u; l++)
        t();
    var c = new Date * 1, h = (a - o - (c - f)) / u * 1e6, p = (a - o) / u * 1e6, d = (c - f) / u * 1e6;
    return arguments.callee.output = "Per iteration:\n  Corrected: " + h / 1e3 + "µs\n  Uncorrected: " + p / 1e3 + "µs\n  Control and Iteration: " + d / 1e3 + "µs", h
}
function cons() {
    var me = arguments.callee, consDiv = me.consDiv;
    if (consDiv)
        return me.show();
    consDiv = me.consDiv = document.createElement("div"), consDiv.style.cssText = "position:absolute; z-index:100000; left:0px; top:0px; width:100%; height:100%; pointer-events:none;", consDiv.innerHTML = '<span style="white-space:pre-wrap; position:absolute; padding:10px; left:20px; top:20px; right:20px; bottom:40px; overflow:auto; background:rgba(0,0,0,0.7); color:white;"><span style="position:absolute; bottom:0; left:0;"></span></span>'
    ;
    var span = consDiv.lastChild.firstChild, input = document.createElement("input");
    input.style.cssText = "position:absolute; left:10px; bottom:10px; right:10px; z-index:100001;", input.onkeypress = function(e) {
        if (e.which === 13) {
            var value = this.value, ret;
            try {
                ret = eval(value)
            } catch (e) {
                ret = e + ""
            }
            span.innerHTML = span.innerHTML + "\n\n" + '<span style="color:gray;">' + escape(value) + "</span>\n" + escape(ret)
        }
    }, input.ontouchstart = input.onmousedown = function(e) {
        cancelHide()
    };
    var escape = me.escape = function(e) {
        return (e + "").split("<").join("&lt;").split(">").join("&gt;")
    }, clear = me.clear = function() {
        return span.innerHTML = "", "done"
    }, exit = me.exit = function() {
        consDiv.parentNode && consDiv.parentNode.removeChild(consDiv), input.parentNode && input.parentNode.removeChild(input), me._hideTimeout = null
    }, hide = me.hide = exit, show = me.show = function() {
        var e=!consDiv.parentNode;
        return document.body.appendChild(consDiv), document.body.appendChild(input), e
    }, peek = me.peek = function() {
        show() && scheduleHide()
    }, log = me.log = function() {
        var e = Array.prototype.join.call(arguments, " ");
        peek(), span.innerHTML = span.innerHTML + "\n\n" + escape(e)
    }, scheduleHide = function() {
        me._hideTimeout || (me._hideTimeout = setTimeout(exit, 2e3))
    }, cancelHide = function() {
        clearTimeout(me._hideTimeout)
    }
}
var B, Browser = B = function() {
    var e, t = navigator.userAgent.toLowerCase(), n = ((t.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1] || "").split(".");
    for (var r = 0; r < n.length; r++)
        n[r] = parseInt(n[r], 10);
    var i = 0;
    for (r = 0; r < n.length; r++)
        i += Math.pow(10, 3 * (0 - r)) * n[r];
    n = i;
    var s = {
        safari: /webkit/.test(t) ? n: NaN,
        chrome: /chrome/.test(t) ? n: NaN,
        opera: /opera/.test(t) ? n: NaN,
        msie: /msie \d+\.\d+|trident\/\d+\.\d.+; rv:\d+\.\d+[;\)]/
        .test(t) ? n: NaN,
        mozilla: /mozilla/.test(t)&&!/(compatible|webkit|trident)/.test(t) ? n: NaN,
        mobileSafari: /apple.*mobile.*safari/.test(t) ? n: NaN,
        iPad: !!/ipad/.test(t) && (!!/applewebkit/.test(t) && parseFloat(t.substring(t.indexOf("os ") + "os ".length, t.indexOf(" like mac os x")).split("_").join(".")) ||!0),
        iPhone: !!/iphone/.test(t) && (!!/applewebkit/.test(t) && parseFloat(t.substring(t.indexOf("os ") + "os ".length, t.indexOf(" like mac os x")).split("_").join(".")) ||!0),
        android: !!/android/.test(t),
        silk: !!/silk/.test(t),
        windows: !!/(windows)/.test(t),
        mac: !!/(macintosh)/.test(t)||!!/(mac os x)/.test(t)
    };
    s.snowLeopard=!!/mac os x 10_6/.test(t)&&!/like mac os x 10_6/.test(t), s.lion=!!/mac os x 10_7/.test(t)&&!/like mac os x 10_7/.test(t), s.mountainLion=!!/mac os x 10_8/.test(t)&&!/like mac os x 10_8/.test(t), s.mobile = s.iPad || s.iPhone || s.android, s.onlyiOS = (s.iPad || s.iPhone) && (e = t.match(/os \d+(\_\d+(\_\d+(\_\d+(\_\d+)*)*)*)*/)) && (e = e && e[0]) && (e = parseFloat(e.substring(3).replace(/_/, ".").replace(/_/g, ""))), s.desktop=!s.mobile, s.iPhone = s.iPhone || s.android, s.iOS = s.mobile, s.iPhone5 = s.iPhone && window.devicePixelRatio === 2 && window.screen.availHeight === 548, s.iPhone4 = s.iPhone && window.devicePixelRatio === 2, s.iPhone3 = s.iPhone&&!s.iPhone4, s.standalone = navigator.standalone, s.rightToLeft=!!window.RIGHT_TO_LEFT, s.leftToRight=!s.rightToLeft, s.silk && (s.mobile=!0, s.android=!0, s.mac=!1, s.desktop=!1, s.safari = NaN), s._origKeys = {};
    for (r in s)
        s._origKeys[r] = s[r];
    return s.uA = t, s.version = n, s
}();
B.s = function() {
    var e = function() {
        var e = B.safari, t = B.opera, n = B.mozilla, r = B.msie, i = B.chrome;
        if (i)
            return parseInt(B.uA.substring(B.uA.indexOf
            ("chrome/") + "chrome/".length), 10);
        if (e || t) {
            var s = navigator.userAgent, o = s.indexOf("Version/") + 8, u;
            return o === 7?!0 : (e = s.substring(o, (s.indexOf(" ", o) + 1 || Infinity) - 1), u = e.indexOf(".") + 1, e = e.substring(0, u || e.length) + (u ? e.substring(u).split(".").join("") : ""), parseFloat(e))
        }
        var a = 2e-7;
        if (n >= 4)
            return Math.floor(n);
        if (n >= 1.009002 - a)
            return 3.6;
        if (n >= 1.009001 - a)
            return 3.5;
        if (n >= 1.009 - a)
            return 3;
        if (n >= 1.008001 - a)
            return 2;
        if (n >= 1.008 - a)
            return 1.5;
        if (n)
            return 1;
        if (r >= 5)
            return Math.floor(r);
        if (r)
            return 5
    }(), t = {};
    for (var n in B._origKeys)
        B._origKeys.hasOwnProperty(n) && (t[n] = B[n] ? e : B[n]);
    return t.version = e, t
}(), B.addBodyClassNames = function() {
    var e = document.body, t = e.className, n, r;
    for (var i in B._origKeys) {
        if (!B.hasOwnProperty(i) || i === "_origKeys" ||!B[i])
            continue;
        t += " " + i
    }
    B.s.version && (n = "v" + B.s.version.toString().split(".").join("-"), t += " " + n), r = "v" + Math.floor(B.s.version), n !== r && (t += " " + r), window.devicePixelRatio === 2 && (t += " doubleres"), document.body.className = t;
    try {
        e.parentNode.className = e.className
    } finally {}
}, Function.prototype.base = function() {}, cons(), function() {
    var e = function(e, t) {
        if (!e ||!t)
            return !1;
        var n = e.className;
        return n.length > 0 && (n == t || (new RegExp("(^|\\s)" + t + "(\\s|$)")).test(n))
    }, t = function(t, n) {
        if (!t ||!n)
            return;
        e(t, n) || (t.className += (t.className ? " " : "") + n)
    }, n = function(e, t) {
        if (!e ||!t)
            return;
        e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
    }, r = function(e) {
        return t(this[0], e), this
    }, i = function(e) {
        return n(this[0], e), this
    }, s = function(e, t) {
        return t ? this.addClass(e) : this.removeClass(e)
    };
    window.$ || (window.$ = function(e) {
        var t = [e
        ];
        return t.addClass = r, t.removeClass = i, t.setClass = s, t
    })
}(), Core = {
    _runningCoreGuid: 0,
    objects: [],
    _argPasser: [],
    _argPassers: [],
    _argPasserCount: 0,
    emptyArray: [],
    ie8EmptyArray: B.msie <= 8 ? []: undefined,
    noOp: function() {},
    SUPER_KEYS: "__SUPER_KEYS__"
}, Core.guidFor = function(e) {
    if (!e)
        return e;
    var t = typeof e;
    return t === "function" || t === "object" || t === "xml" ? e.hasOwnProperty("coreGuid") && e.coreGuid || (e.coreGuid=++Core._runningCoreGuid) : e
}, Core.getPathFrom = function(e, t) {
    return Core.Object.prototype.resolvePropertyPath.call(e, "." + t)
}, (Core.cloneFunction = function(e) {
    var t = e.clonedFrom;
    if (t)
        return t.clone();
    var n = function() {
        var e = arguments.callee.clonedFrom, t = e.base, n;
        return e.base = arguments.callee.base, n = arguments.callee.clonedFrom.apply(this, arguments), e.base = t, n
    };
    for (var r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
    return n.clonedFrom = e, n.toString = arguments.callee._cloneFunction_toString, n
})._cloneFunction_toString = function() {
    return "Clone of " + this.clonedFrom.toString()
}, Core.cloneHash = function(e, t) {
    var n = arguments[arguments.length - 1] === YES, r = t instanceof Object ? t: {}, i, s;
    if (!n)
        for (i in e)
            e.hasOwnProperty(i) && (r[i] = e[i]);
    else 
        for (i in e)
            e.hasOwnProperty(i) && (s = e[i], s instanceof Array ? s = s.concat([]) : s instanceof Object && (s = Core.cloneHash(s, YES)), r[i] = s);
    return r
}, Array.prototype.remove = function(e) {
    var t = 0, n = this, r = 0, i = n.length, s;
    for (; t < i - r; t++)
        n[t] === e && (r++, t--), r && (n[s = t + 1] = n[s + r]);
    return n.length -= r, n
}, Array.prototype.indexOf = function(e) {
    if (!e)
        return - 1;
    for (var t = 0, n; n = this[t]; t++)
        if (n === e)
            return t;
    return - 1
}, Array.prototype.insertAtIndex = function(e, t) {
    if (isNaN(t))
        return;
    if (t === 0)
        return this.unshift(e
        );
    for (var n = this.length; n > t; n--)
        this[n] = this[n - 1];
    return this[t] = e, this
}, Array.prototype.contains = function(e) {
    for (var t = this.length - 1; t >= 0; t--)
        if (this[t] === e)
            return !0;
    return !1
}, String.prototype.w = function() {
    return this.split(/\s+/)
}, String.prototype.fmt = function() {
    if (this.search("%@") < 0 && this.search("%{"))
        return this + "";
    var e = arguments[0], t = this.toString(), n;
    if (typeof e == "object") {
        for (n in e)
            e.hasOwnProperty(n) && (t = t.split("%{" + n + "}").join(e[n]));
        return t
    }
    var r = Array.prototype.slice.call(arguments);
    for (var i = 0, s; i < r.length; i += 1)
        this.indexOf("%@" + (i + 1)) >= 0 ? t = t.replace("%@" + (i + 1), r[i]) : t = t.replace("%@", r[i]);
    return t
}, String.prototype.loc = function() {
    Core.Locale.currentLocale || Core.Locale.createCurrentLocale();
    var e = Core.Locale.currentLocale, t = e.locString(this.toString()), n = Array.prototype.slice.call(arguments);
    return t && (t = String.prototype.fmt.apply(t, n)), t
}, Function.prototype.observes = Function.prototype.runsOn = function() {
    var e=!this._listens, t = this._listens || (this._listens = []);
    e && (t.length = 0);
    for (var n = 0, r, i, s = arguments.length; n < s; n++)
        r = arguments[n], (i = r.lastIndexOf(".")) > 0 && i === r.indexOf(".") && (r = "window." + r), t.push(r);
    return this
}, Function.prototype.property = function() {
    this.isProperty=!0;
    var e=!this._dependentKeys;
    if (!arguments.length)
        return this._dependentKeys && delete this._dependentKeys, this;
    var t = this._dependentKeys || (this._dependentKeys = []);
    e && (t.length = 0);
    for (var n = 0, r = arguments.length; n < r; n++)
        t.push(arguments[n]);
    return this
}, Core.processSuperKeys = function(e, t) {
    if (!e ||!t)
        return;
    var n, r, i, s, o;
    if (!(n = e[t]) || n[0] !== Core.SUPER_KEYS)
        return n;
    (e[t] = n = n.concat([])).shift();
    if (!
    (r = e.base) ||!(i = r[t]))
        return n;
    for (s = i.length - 1; o = i[s]; s--)
        n.unshift(o);
    return n
}, YES=!0, NO=!1, require("core/utils"), Core.ObjectPrototypeMembers = {
    className: "Object",
    isCoreObject: YES,
    isDestroyed: NO,
    init: function() {
        this.hasOwnProperty("coreGuid") || (this.coreGuid=++Core._runningCoreGuid), Core.objects[this.coreGuid] = this
    },
    destroy: function() {
        if (this.isDestroyed) {
            Core.warn("%@ has already been destroyed".fmt(this));
            return 
        }
        this.trigger("destroy"), this.isDestroyed = YES
    },
    mixin: function(t) {
        if (!arguments.length)
            return this;
        var n = arguments.length, r = this._type, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b;
        for (i = 0; i < n; i++) {
            if (!(u = arguments[i]))
                continue;
            c=!!u.isMixin;
            for (l in u) {
                if (!u.hasOwnProperty(l) || l === "isMixin")
                    continue;
                m = l.substring(0, 7) === "static_"&&!!r, g = l, m && (l = l.substring(7)), v = m ? r : this, a = v[l], f = u[g];
                if (h = v[l + "Override"])
                    if (h instanceof Function || (h = v[h])instanceof Function)
                        f = h.call(v, f, a, l);
                if (p = v._overrideSuffixes)
                    for (s = 0; d = p[s]; s++)
                        l.slice( - d.length) === d && (h = v["*" + d + "Override"]) && (h instanceof Function || (h = v[h])instanceof Function) && (f = h.call(v, f, a, l));
                if (f === a)
                    continue;
                y = a instanceof Function, b = f instanceof Function, y && b && (c && (f = Core.cloneFunction(f)), f.base = a, m || (a._listens && v.unlisten(a), a._dependentKeys && v.deregisterDependentKey(l, a))), b&&!f.isClass && (f._mixinName = g, v._symbolicatedName&&!f.displayName && (f.displayName = v._symbolicatedName + "#" + g)), !m && b && (f._listens && v.listen(f), f._dependentKeys && v.registerDependentKey(l, f)), v[l] = f
            }
        }
        return this
    },
    _overrideSuffixes: ["Override"],
    "*OverrideOverride": function(e, t, n) {
        if (typeof n != "string" || n.charAt(0) !== "*")
            return e;
        var r = n.substring(1).slice(0, - 8
        ), i = this._overrideSuffixes;
        if (i)
            for (var s = 0, o; o = i[s]; s++)
                if (r === o)
                    return e;
        return this.ensureOwn("_overrideSuffixes").push(r), e
    },
    ensureOwn: function(t) {
        var n = this[t], r;
        if (this.hasOwnProperty(t))
            return n;
        if (!n || typeof n == "number" || typeof n == "string")
            return n;
        if (n instanceof Function)
            return this[t] = Core.cloneFunction(n);
        if (n instanceof Array)
            return this[t] = [].concat(n);
        if (n instanceof Element)
            return this[t] = n.cloneNode(!0);
        if (n instanceof Object)
            return this[t] = Core.cloneHash(n)
    },
    trigger: function(t) {
        if (this.isDestroyed)
            return;
        var n = this["__" + t + "Listeners__"], r = arguments.length > 1, i = undefined, s, o;
        if (!n)
            return;
        if (r) {
            o = Core._argPasserCount++, s = Core._argPassers[o] || (Core._argPassers[o] = []);
            for (var u = 1, a = arguments.length; u < a; u++)
                s.push(arguments[u])
        }
        s || (s = Core.ie8EmptyArray);
        if (n)
            for (var f = 0, l = n.length, c; f < l; f++)(c = n[f]) 
                && c.apply(this, s);
        return r && (Core._argPasserCount--, s.length = 0), i
    },
    listen: function(t, n) {
        if (!t)
            return;
        if (!n) {
            if (typeof t == "string")
                return;
            n = t;
            var r = n._listens;
            if (r) {
                r[0] === Core.SUPER_KEYS && (r = Core.processSuperKeys(n, "_listens"));
                for (var i = 0; t = r[i]; i++)
                    this.listen(t, n)
                }
            return 
        }
        var s = "__" + t + "Listeners__";
        if (!this.hasOwnProperty(s))
            if (!this[s])
                this[s] = [];
            else {
                for (var o = [], u = 0, a = this[s].length; u < a; u++)
                    o.push(this[s][u]);
                    this[s] = o
            }
        this[s].push(n)
    },
    unlisten: function(t, n) {
        if (!t)
            return;
        if (!n) {
            n = t;
            var r = n._listens;
            if (r)
                for (var i = 0; t = r[i]; i++)
                    this.unlisten(t, n);
            return 
        }
        var s = "__" + t + "Listeners__";
        if (!this[s])
            return;
        if (!this.hasOwnProperty(s)) {
            for (var o = [], u = 0, a = this[s].length; u < a; u++)
                o.push(this[s][u]);
            this[s] = o
        }
        for (var f = 0, l = this[s], c = l.length; f < c; f++)
            l[f] === n && (l[f] = undefined)
    },
    clearTrigger
    : function(e) {
        var t = this["__" + e + "Listeners__"];
        if (!t)
            return;
        t.length = 0
    },
    toString: function() {
        return "[" + this.className + (this.coreGuid ? ":" + this.coreGuid : "") + "]"
    },
    get: function(t) {
        var n = this[t];
        return n instanceof Function && n.isProperty && (n = n.call(this, t)), n
    },
    set: function(t, n) {
        var r = this[t], i;
        return r instanceof Function && r.isProperty ? (i = this["set" + t.charAt(0).toUpperCase() + t.substring(1)], i ? i.call(this, n) : r.call(this, t, n)) : this[t] = n, this.trigger(t, t), n
    },
    setIfChanged: function(t, n) {
        var r = this[t];
        return this[t] = n, n !== r ? (this.trigger(t, t), !0) : !1
    },
    suspendTriggers: function() {
        if (this._suspendedTrigger)
            return;
        this._suspendedTrigger = this.trigger, this.trigger = this._cacheTriggerCallFor
    },
    discardSuspendedTriggers: function() {
        this._triggerCache && (this._triggerCache.length = 0);
        if (this._triggerCacheHash)
            for (var e in this._triggerCacheHash)
                this._triggerCacheHash.hasOwnProperty(e) && delete this._triggerCacheHash[e]
    },
    resumeTriggers: function() {
        if (!this._suspendedTrigger)
            return;
        this.trigger = this._suspendedTrigger, this._suspendedTrigger = null;
        var e, t = this._triggerCache, n = this._tmpTrgCopy || (this._tmpTrgCopy = []);
        n.length = 0;
        for (var r = 0, i = t.length; r < i; r++)
            n[r] = t[r];
        this._triggerCache.length = 0;
        for (r in this._triggerCacheHash)
            this._triggerCacheHash.hasOwnProperty(r) && delete this._triggerCacheHash[r];
        for (r = 0; e = n[r]; r++)
            this.trigger(e, e)
    },
    _cacheTriggerCallFor: function(e) {
        if (arguments[2])
            return this._suspendedTrigger.apply(this, arguments);
        var t = this._triggerCache || (this._triggerCache = []), n = this._triggerCacheHash || (this._triggerCacheHash = {});
        if (n[e] === (n[e] = YES))
            return;
        t.push(e)
    },
    registerDependentKey: function(e, t, n
    ) {
        if (!e)
            return;
        var r;
        if (!n) {
            n = t;
            if (!n)
                return;
            t = e;
            if (r = n._dependentKeys) {
                r[0] === Core.SUPER_KEYS && (r = Core.processSuperKeys(n, "_dependentKeys"));
                for (var i = 0; e = r[i]; i++)
                    this.registerDependentKey(e, t, n)
                }
            return 
        }
        this.listen(e, n._triggerProvider || (n._triggerProvider = function() {
            this.trigger(t, t)
        }))
    },
    deregisterDependentKey: function(e, t, n) {
        if (!e)
            return;
        var r;
        if (!n) {
            n = t;
            if (!n)
                return;
            t = e;
            if (r = n._dependentKeys)
                for (var i = 0; e = r[i]; i++)
                    this.deregisterDependentKey(e, t, n);
            return 
        }
        var s = n._triggerProvider;
        if (!s)
            return;
        this.unlisten(e, s)
    },
    concatenate: function(e, t, n) {
        return typeof e != "string"||!!t && typeof t != "string" ? t ? t.concat(e) : e : (t || "") + e
    }
}, require("core/object_members"), Core.Object = function(e) {
    if (e === "__noinit__")
        return;
    this._isCreating=!0, this.mixin.apply(this, arguments), delete this._isCreating, this.init()
}, Core.Object.prototype = Core.ObjectPrototypeMembers, Core.Object.prototype.mixin.call(Core.Object, {
    isClass: !0,
    create: function() {
        var t = new this ("__noinit__");
        return t._isCreating=!0, t.mixin.apply(t, arguments), delete t._isCreating, t.init(), t
    },
    extend: function() {
        var t = function(e) {
            if (e === "__noinit__")
                return;
            this._isCreating=!0, this.mixin.apply(this, arguments), delete this._isCreating, this.init()
        };
        for (var n in this)
            this.hasOwnProperty(n) && (t[n] = this[n]);
        var r = new this ("__noinit__");
        return r._type = t, r._symbolicatedName = null, r.mixin.apply(r, arguments), t.prototype = r, t.superclass = this, t
    },
    reopen: function() {
        return this.prototype.mixin.apply(this.prototype, arguments), this
    }
}), require("core/object"), Core.Object.reopen({
    resolvePropertyPath: function(t) {
        if (!t)
            return this;
        var n = t.indexOf("."), r, i=!1, s, o;
        if (n===-1
        )
            return this.get(t);
        r = this, n ? r = window : t = t.substring(1);
        while (n!==-1) {
            n = t.indexOf("."), i = n===-1, o = t.substring(0, i ? t.length : n), r = r.get instanceof Function ? r.get(o) : r[o];
            if (!r || i)
                return r;
            t = t.substring(n + 1)
        }
    },
    getPath: function(t) {
        return this.resolvePropertyPath("." + t)
    },
    init: function() {
        var e = this._eavesdrops;
        typeof e == "string" && (e = [e]);
        for (var t = 0, n; e && (n = e[t]); t++)
            this.eavesdropObjectAtPath(n);
        this._hasEavesdroppedInitialObjects = YES, arguments.callee.base.apply(this, arguments), this.trigger("init")
    },
    eavesdropObjectAtPath: function(e) {
        var t = this.resolvePropertyPath(e);
        if (t && t.addEavesdropper)
            t.addEavesdropper(this, e);
        else {
            var n = this._IGNORE_OBSERVATION_WARNINGS_FOR_PATHS;
            if (n && n[e.split(".").join("#")])
                return;
            Core.debug && Core.debug("Can't observe properties on object", t, "at path", e, "from ", this)
        }
    },
    listen: function(t, n) {
        if (t instanceof Function)
            return arguments.callee.base.apply(this, arguments);
        var r = t.lastIndexOf(".");
        if (r===-1)
            return arguments.callee.base.apply(this, arguments);
        var i = t.substring(0, r), s = this.ensureOwn("_eavesdrops") || (this._eavesdrops = []);
        for (var o = 0, u; u = s[o]; o++)
            if (u === i)
                return arguments.callee.base.apply(this, arguments);
        return s.push(t.substring(0, r)), this._hasEavesdroppedInitialObjects && this.eavesdropObjectAtPath(i), arguments.callee.base.apply(this, arguments)
    },
    addEavesdropper: function(e, t) {
        if (!e)
            return;
        var n = this._eavesdroppers || (this._eavesdroppers = []);
        for (var r = 0, i; i = n[r]; r++)
            if (i === e)
                return;
        n.push(e), (this._eavesdropperPaths || (this._eavesdropperPaths = [])).push(t)
    },
    removeEavesdropper: function(e) {
        if (!e)
            return;
        var t = this._eavesdroppers;
        if (!t)
            return;
        for (var n = 0, r; r =
        t[n]; n++) {
            if (r !== e)
                continue;
            t.splice(n, 1), this._eavesdropperPaths.splice(n, 1);
            return 
        }
    },
    trigger: function() {
        var t = arguments.callee.base.apply(this, arguments), n = arguments[0], r = this._eavesdroppers, i = this._eavesdropperPaths, s = 0, o, u;
        if (n.indexOf(".") + 1)
            return t;
        for (; r && (o = r[s]) && (u = i[s]); s++)
            arguments[0] = u + "." + n, o.trigger.apply(o, arguments);
        return t
    },
    "*BindingOverride": function(e, t, n) {
        if (typeof e != "string")
            return e;
        n = n.slice(0, - 7);
        var r = e.substring(0, 5) === "hard:";
        r && (e = e.substring(5));
        var i = e.indexOf(":"), s = e.substring(0, i);
        e = e.substring(i + 1);
        var o = e.lastIndexOf("."), u = e.substring(0, o), a = e.substring(o + 1), f = NO, l = r ? "set": "setIfChanged";
        return s !== "from" && this.listen(this[n + "BindingTo"] = function() {
            if (f)
                return;
            f = YES;
            var e = this.resolvePropertyPath(u), t = this[n], r;
            t instanceof Function && t.isProperty && (t = this.get(n));
            if (r = this[n + "OutgoingTransform"])
                t = r.call(this, t);
            e && e[l](a, t, YES), f = NO
        }.observes(n)), s !== "to" && this.listen(this[n + "BindingFrom"] = function() {
            if (f)
                return;
            f = YES;
            var t = this.resolvePropertyPath(e), r;
            if (r = this[n + "IncomingTransform"])
                t = r.call(this, t);
            this[l](n, t, YES), f = NO
        }.observes(e, "init")), e
    },
    destroy: function() {
        var e = this._eavesdrops || this.constructor.prototype._eavesdrops || [];
        for (var t = 0, n; n = e[t]; t += 1)
            n = this.resolvePropertyPath(n), n && n.removeEavesdropper(this);
        return this._eavesdroppers = [], this._eavesdropperPaths = [], arguments.callee.base.apply(this, arguments)
    }
}), Core.NOT = function(e) {
    return !e
}, require("core/external_observability"), Core.Namespace = Core.Object.extend({
    isNamespace: YES,
    shouldAutoSymbolicate: NO,
    shouldWriteClassNames: NO,
    static_instances: [],
    ownerNamespace: window,
    define
    : function(e, t) {
        typeof e == "string" && (e = {
            key: e
        }), e.name && (e.key = e.name, delete e.name), (this._metadataByKey || (this._metadataByKey = {}))[e.key] = e, (this._metadataByGuid || (this._metadataByGuid = {}))[Core.guidFor(t)] = e;
        var n = this.set.call(this, e.key, t);
        return t && this.symbolicateItem(e.key), n
    },
    symbolicate: function() {
        if (this._hasSymbolicated === (this._hasSymbolicated = YES))
            return;
        for (var e in this) {
            if (!this.hasOwnProperty(e))
                continue;
            this.symbolicateItem(e)
        }
    },
    handleAutoSymbolication: function() {
        if (!this.shouldAutoSymbolicate)
            return;
        this.symbolicate()
    }.observes("Core.finalizeCore"),
    symbolicateItem: function(t) {
        var n = this[t], r, i, s;
        if (!n)
            return;
        if (!n.isMixin&&!n.isCoreObject&&!n.isClass)
            return;
        i = this.get("selfName") + "." + t, n.isClass && (n = n.prototype, n._symbolicatedName = i, this.shouldWriteClassNames&&!n.hasOwnProperty("className") && (n.className = i));
        for (r in n) {
            if (!n.hasOwnProperty(r))
                continue;
            (s = n[r])instanceof Function&&!s.isClass&&!s.displayName && (s.displayName = i + "#" + r)
        }
    },
    selfName: function() {
        if (this._selfName)
            return this._selfName;
        var t = this.ownerNamespace, n;
        for (var r in t)(!t.hasOwnProperty || t.hasOwnProperty(r)
            ) && t[r] === this && (n = r);
        return n || (n = this.toString()), t.isNamespace && (n = t.get("selfName") + "." + n), this._selfPath = n
    }.property(),
    trackInstances: function() {
        Core.Namespace.instances.push(this)
    }.observes("init"),
    contentsToString: function(e) {
        var t = this.get("selfName");
        t += "\n";
        if (!this._metadataByKey)
            return t;
        var n, r, i, s;
        for (n in this._metadataByKey) {
            t += "  " + n + "\n";
            if (e)
                if (s = this[n])
                    if (s = s.isClass ? s.prototype : s.isMixin || s.isCoreObject ? s : null)
                        for (r in s)
                            s.hasOwnProperty(r) && (i = s[r])instanceof Function&&!
                            i.isClass && (t += "    " + (i.displayName || i.name || i) + "\n")
        }
        return t
    },
    static_projectContentsToString: function(e) {
        for (var t = 0, n = "", r = Core.Namespace.instances, i; i = r[t]; t++)
            n += this.instances[t].contentsToString(e);
        return n
    },
    static_symbolicateAll: function() {
        for (var e = 0, t; t = this.instances[e]; e++)
            t.symbolicate()
    }
}), Core.Namespace.create(Core, {
    init: function() {
        Core = this, arguments.callee.base.apply(this, arguments)
    }
}), require("core/namespace"), Core.Animator = Anim = Core.Namespace.create({
    fps: 60,
    tasks: [],
    speedMultiplier: 1,
    frameCount: 0,
    isActive: !1,
    isInFrame: !1,
    extraStatus: {},
    enableOldIE: !0,
    _frameTimeNoiseLevelingWindowSize: 30,
    _frameNoiseLevelerLog: [],
    _movingAverageFrameTime: function() {
        for (var e = 0, t = Anim._frameNoiseLevelerLog, n = 0, r = t.length; e < r; e++)
            n += t[e];
        return Math.round(10 * n / (r || 1)) / 10
    },
    initialSetup: function() {
        this.stop(), this.useRAF = this.IS_MOBILE && window.requestAnimationFrame && window.cancelRequestAnimationFrame, this.lock16 = this.IS_MOBILE&&!this.useRAF
    }.observes("init"),
    nextFrame: function(t, n) {
        Anim.isInFrame=!0;
        var r, i = Anim._frameNoiseLevelerLog, s = Anim._frameTimeNoiseLevelingWindowSize, o, u;
        o = Anim._lastFrameTime===-1 ? (new Date).valueOf() : Anim._lastFrameTime, Anim._lastFrameTime = (new Date).valueOf(), u = o = Anim._lastFrameTime - o, Anim.now = Anim._lastFrameTime, Anim.firstActiveFrame && (o = 0), o >= 300 && o >= (r = Math.max(Anim._movingAverageFrameTime(), 60)) * 5 ? i.unshift(r / 2) : i.unshift(o), i.length <= s || (i.length = s), Anim.frameTime = o;
        if (!Anim.shouldSkipFrame ||!Anim.shouldSkipFrame()) {
            Anim.trigger("preframe");
            for (var a = 0, f; f = Anim.tasks[a]; a++)
                f.running&&!f.paused && f.elapse(Math.min(o, 3e4) * Anim.speedMultiplier);
            for (a = 0
            ; f = Anim.tasks[a]; a++)
                f.running || (f._inTasks=!1, Anim.tasks.splice(a--, 1));
            Anim.trigger("frame"), Anim.trigger("nextFrame"), Anim.__nextFrameListeners__ && (Anim.__nextFrameListeners__.length = 0), Anim.isActive=!!Anim.tasks.length, Anim.frameCount++
        }
        Anim.frameRate = Math.round(1e5 / u) / 100, Anim.computeTime = (new Date).valueOf() - Anim.now;
        var l = Math.round(1e3 / Anim.fps);
        Anim.timeoutWaitTime = Math.max(0, l - Anim.computeTime), Anim.clearNextTimeout(), !n && Anim.isActive ? Anim.useRAF ? Anim._timeout = window.requestAnimationFrame(Anim.nextFrame, document.body) : Anim._timeout = setTimeout(Anim.nextFrame, Anim.lock16 ? 16 : Anim.timeoutWaitTime) : Anim.stop(), Anim.firstActiveFrame && (Anim.firstActiveFrame=!1), Anim.isInFrame=!1
    },
    start: function() {
        if (this.isActive || this.isInFrame)
            return;
        this.firstActiveFrame=!0, this.isActive=!0, this._lastFrameTime =- 1, this.frameTime = 1e3 / this.fps, this.frameRate = 1e3 / this.frameTime, this.computeTime = 0, this.trigger("start"), this.nextFrame()
    },
    stop: function() {
        this.isActive=!1, this.frameTime = Infinity, this.frameRate = 0, this.computeTime = NaN, this.timeoutWaitTime = NaN, this.clearNextTimeout(), this.trigger("stop")
    },
    clearNextTimeout: function() {
        if (!this._timeout)
            return;
        this.useRAF ? window.cancelRequestAnimationFrame(this._timeout) : clearTimeout(this._timeout), this._timeout = 0
    },
    handleTask: function(e) {
        if (!e || e.isDestroyed)
            return;
        if (!e._inTasks) {
            if (e.name)
                for (var t = 0, n = Anim.tasks, r; r = n[t]; t++)
                    r.name === e.name && r.stop();
            Anim.tasks.push(e)
        }
        e._inTasks=!0, Anim.start()
    },
    tellStop: function() {
        arguments._isArgs_=!0, this.performMethodOn("stop", arguments)
    },
    tellFinish: function() {
        arguments._isArgs_=!0, this.performMethodOn("finish"
        , arguments)
    },
    performMethodOn: function(e, t) {
        var n = 1, r = arguments;
        t && t._isArgs_ && (n = 0, r = t);
        for (var i = n, s, o = r.length; i < o; i++)(s = r[i]) 
            && s[e] && s[e]()
    },
    IS_OLD_IE: navigator.userAgent.indexOf("MSIE ")!==-1 && parseInt((navigator.userAgent + "").substring(navigator.userAgent.indexOf("MSIE ") + "MSIE ".length, 2), 10) <= 8,
    IS_MOBILE: !!(/ipad/.test(navigator.userAgent.toLowerCase()) || /iphone/.test(navigator.userAgent.toLowerCase()) || /ipod/.test(navigator.userAgent.toLowerCase()) || /android/.test(navigator.userAgent.toLowerCase())),
    getOpacity: function(e) {
        if (!e)
            return - 1;
        var t;
        return (t = e.anim$opacity || e.getAttribute("anim$opacity")) && (t = parseFloat(t)) || t === 0 ? t : (t = e.style.opacity || Core.getStyle(e, "opacity")) && (t = parseFloat(t)) || t === 0 ? t : 1
    },
    setOpacity: function(e, t) {
        return e ? (t = Math.max(0, Math.min(1, t)), t > .9999 || isNaN(t) ? this.removeOpacity(e) : (e.anim$opacity = t, e.style.opacity = t, t)) : - 1
    },
    removeOpacity: function(e) {
        return e ? (e.anim$opacity = 1, e.style.opacity = "", 1) : - 1
    },
    encodeColor: function(e, t, n) {
        if (typeof e == "object" && typeof e.r == "number" && typeof e.g == "number" && typeof e.b == "number")
            t = e.g, n = e.b, e = e.r;
        else if (typeof e == "object")
            t = e[1], n = e[2], e = e[0];
        else if (typeof e == "string") {
            if (e.charAt(0) == "#" && e.length === 7)
                return e;
            e = Anim.decodeColor(e), t = e[1], n = e[2], e = e[0]
        }
        return e = Math.round(Math.max(0, Math.min(255, e))).toString(16), e.length == 1 && (e = "0" + e), t = Math.round(Math.max(0, Math.min(255, t))).toString(16), t.length == 1 && (t = "0" + t), n = Math.round(Math.max(0, Math.min(255, n))).toString(16), n.length == 1 && (n = "0" + n), ("#" + e + t + n).toUpperCase()
    },
    decodeColor: function(e) {
        Anim.colors && Anim.colors[e] && (e = Anim.colors[e]);
        var t, n, r, i;
        if ((t = typeof 
        e) == "number" || t == "object")
            return undefined;
        e = e.replace(/\s+/g, "");
        if (e.charAt(0) == "#")
            e.length == 4 && (e = "#" + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2) + e.charAt(3) + e.charAt(3)), n = parseInt(e.substring(1, 3), 16), r = parseInt(e.substring(3, 5), 16), i = parseInt(e.substring(5, 7), 16);
        else {
            var s;
            if (e.indexOf("rgba(")!=-1)
                s = 5;
            else {
                if (e.indexOf("rgb(")==-1)
                    return undefined;
                s = 4
            }
            e = e.substring(s, e.length - 1).split(","), n = parseInt(e[0], 10), r = parseInt(e[1], 10), i = parseInt(e[2], 10)
        }
        return [n, r, i]
    },
    colors: {
        red: "#ff0000",
        "orange red": "#ff4500",
        orange: "#ff7f00",
        yellow: "#ffff00",
        green: "#00ff00",
        "forest green": "#228b22",
        cyan: "#00ffff",
        "light sea green": "#20b2aa",
        blue: "#0000ff",
        "cornflower blue": "#6495ed",
        "medium blue": "#3232cd",
        purple: "#a020f0",
        "hot pink": "#ff69b4",
        magenta: "#ff00ff",
        white: "#ffffff",
        "light gray": "#d3d3d3",
        gray: "#bebebe",
        "dark gray": "#a9a9a9",
        "dim gray": "#696969",
        black: "#000000"
    },
    perf: function(e) {
        var t;
        Anim.perfPop = t = window.open("", "Animator", "height=" + (window.screen.availHeight - 19) + ",width=500,top=0,left=0");
        if (!t) {
            window.console && console.log && console.log("No popup available for performance monitor.");
            return 
        }
        t.document.body.innerHTML = '<div style="position:absolute; left:0px; top:0px; width:100%; height:100%; overflow:auto"><div style="position:absolute; left:10px; top:10px; right:10px;"></div></div>', t.document.body.style.background = "black", Anim.perfPop.updater || (Anim.perfPop.updater = Anim.perfPop.setInterval(function() {
            (function() {
                try {
                    this.document.body.firstChild.firstChild.innerHTML = '<span style="font-family:helvetica,arial,sans-serif; font-size:12px; color:#CCCCCC;"><big>Performance Monitor</big><br>' +
                    Core.strToHtml(this.opener.Anim.status()) + "</span>"
                } catch (e) {
                    (!this.opener || this.opener == this.window) && this.close()
                }
            }).call(Anim.perfPop)
        }, e || 250)), window.focus()
    },
    bogDown: function() {
        Anim.listen("frame", function() {
            var e = 5;
            for (var t = 0; t < 1e6; t++)
                e = Math.sin(e)
        })
    },
    status: function() {
        var e = "";
        return e += "\nActive: " + Anim.isActive, e += "\n", e += "\nTarget FPS: " + Anim.fps, e += "\nActual FPS: " + Anim.frameRate, e += "\n", e += "\nFrame Time: " + Anim.frameTime + " ms", e += "\nCompute Time: " + Anim.computeTime + " ms", e += "\nTimeout Wait Time: " + Anim.timeoutWaitTime + " ms", e += "\n", e += "\nSpeed Multiplier: " + Anim.speedMultiplier, e += "\n", e += "\nExtra Status: ", e += "\n" + window.enumerate ? window.enumerate(Anim.extraStatus) : Anim.extraStatus, e += "\n", e += "\n" + Anim.tasks.length + " Task" + (Anim.tasks.length == 1 ? "" : "s") + ":", e += "\n" + Anim.tasks.join("\n"), e
    }
}), Anim.Task = Core.Object.extend({
    className: "Anim.Task",
    running: !1,
    paused: !1,
    speedMultiplier: 1,
    frameCount: 0,
    elapsedTime: 0,
    ticked: !1,
    tickCount: 0,
    start: function() {
        return this.running ? this : (this.running=!0, this.elapsedTime = this.frameCount = this.tickCount = 0, this.trigger("start"), Anim.handleTask(this), this)
    },
    stop: function() {
        return this.running ? (this.running=!1, this.trigger("stop"), this) : this
    },
    elapse: function(t, n) {
        if (this.isDestroyed)
            return this.running=!1, this;
        if (!n && this.shouldSkipFrame && this.shouldSkipFrame())
            return this;
        this._forcedZeroes && (t = 0, this._forcedZeroes--), t*=this.speedMultiplier, this.trigger("preframe"), this.elapsedTime += t;
        if (!this.ticked)
            this.trigger("pretick"), this.run instanceof Function && this.run(t), this.tickCount++, this.trigger("tick");
        else 
            for (var r = this.ticked===!0 ? 1e3 /
            Anim.fps : this.ticked, i = 1 + Math.floor(this.elapsedTime / r), s = i - this.tickCount, o = 0; o < s; o++)
                this.trigger("pretick"), this.run instanceof Function && this.run(r, o < s - 1), this.running && this.trigger("tick"), this.tickCount++;
        return this.running && (this.trigger("frame"), this.trigger("frame" + this.frameCount)), this.trigger("postFrame"), this.clearTrigger("postFrame"), this.frameCount++, this
    },
    destroy: function() {
        return arguments.callee.base && arguments.callee.base.apply(this, arguments), this.isDestroyed=!0, this
    }
}), Anim.Task.go = function() {
    var e = this.create.apply(this, arguments);
    return e.start(), e
}, Anim.tweens = {
    make: function(e) {
        var t = [];
        for (var n = 1, r = arguments.length; n < r; n++)
            t.push(arguments[n]);
        return function() {
            var n = t;
            n.l = n.length;
            var r = Anim.tweens[e] || Anim.tweens.LINEAR;
            return function(e) {
                return n[n.l] = e, r.apply(this, n)
            }
        }()
    },
    compound: function() {
        var e = arguments.length, t = arguments[e - 1];
        for (var n = 0, r; n < e - 1 && (r = arguments[n]); n++)
            typeof r == "string" ? t = Anim.tweens[r].call(this, t) : t = r.call(this, t);
        return t
    },
    concat: function(e) {
        var t = arguments.length, n = Math.floor((t - 2) / 2), r = arguments[t - 1], i, s = 0, o = 0, u = 0, a, f, l;
        for (i = 0; i < n; i++)
            s += arguments[2 * i + 2];
        for (i = 0; i < n; i++) {
            o += arguments[2 * i + 2] / s;
            if (r < o)
                return a = (r - u) / (o - u), l = arguments[2 * i + 1], typeof l == "string" && (l = Anim.tweens[l]), f = l.call(this, a), e!==!1 ? u + f * (o - u) : f;
            u = o
        }
    },
    LINEAR: function(e) {
        return e
    },
    BOUNCE: function(e) {
        var t;
        e = 1 - e;
        for (var n = 0, r = 1; 1; n += r, r/=2)
            if (e >= (7 - 4 * n) / 11) {
                t = r * r - Math.pow((11 - 6 * n - 11 * e) / 4, 2);
                break
            }
        return 1 - t
    },
    SINE_IN_OUT: function(e) {
        return .5 - .5 * Math.cos(Math.PI * e)
    },
    multiSineInOut: function(e, t) {
        var n = e%1;
        e = Math.floor(e);
        for (var r = 0; r < e; r++)
            t = .5 - .5 * Math.cos
            (Math.PI * t);
        return n && (t = (1 - n) * t + n * (.5 - .5 * Math.cos(Math.PI * t))), t
    },
    QUADRATIC_IN: function(e) {
        return e * e
    },
    QUADRATIC_OUT: function(e) {
        return 1 - (e = 1 - e) * e
    },
    WEBKIT_EASE: function(e) {
        return Anim.tweens.cubicBezier(.25, .1, .25, 1, e)
    },
    WEBKIT_LINEAR: function(e) {
        return e
    },
    WEBKIT_EASE_IN: function(e) {
        return Anim.tweens.cubicBezier(.42, 0, 1, 1, e)
    },
    WEBKIT_EASE_OUT: function(e) {
        return Anim.tweens.cubicBezier(0, 0, .58, 1, e)
    },
    WEBKIT_EASE_IN_OUT: function(e) {
        return Anim.tweens.cubicBezier(.42, 0, .58, 1, e)
    },
    cubicBezier: function(e, t, n, r, i) {
        var s = 5, o = 3 * e, u = 3 * (n - e) - o, a = 1 - o - u, f = 3 * t, l = 3 * (r - t) - f, c = 1 - f - l, h = 1 / (200 * s), p, d, v, m, g, y;
        for (v = i, y = 0; y < 8; y++) {
            m = ((a * v + u) * v + o) * v - i;
            if (Math.abs(m) < h)
                return ((c * v + l) * v + f) * v;
            g = (3 * a * v + 2 * u) * v + o;
            if (Math.abs(g) < 1e-6)
                break;
            v -= m / g
        }
        p = 0, d = 1, v = i;
        if (v < p)
            return ((c * p + l) * p + f) * p;
        if (v > d)
            return ((c * d + l) * d + f) * d;
        while (p < d) {
            m = ((a * v + u) * v + o) * v;
            if (Math.abs(m - i) < h)
                return ((c * v + l) * v + f) * v;
            i > m ? p = v : d = v, v = (d - p) * .5 + p
        }
        return ((c * v + l) * v + f) * v
    },
    linearInterpolation: function(e, t) {
        var n = e._length_ || (e._length = e.length), r = t * n / n * (n - 1), i = Math.floor(r), s = e[i], o = r - i;
        if (o === 0)
            return s;
        var u = e[Math.ceil(r)];
        return s * (1 - o) + u * o
    }
}, Anim.Animation = Core.Animation = Anim.Task.extend({
    className: "Anim.Animation",
    isAnimation: !0,
    init: function() {
        arguments.callee.base.call(this), this.hasOwnProperty("animateOldIE") || (this.animateOldIE = Anim.enableOldIE), Anim.IS_OLD_IE&&!this.animateOldIE && (this.disabled=!0);
        var e, t, n, r, i, s = this._type.prototype.freevars;
        typeof this.freevars == "string" && (this.freevars = this.freevars.split(/\s+/)), this.freevars&&!this.freevars.length && (this.freevars = [this.freevars]);
        if (this.freevars && s && this.freevars === s) {
            i = [];
            for (
            t = 0; t < (r || (r = this.freevars.length)); t++)
                i.push(this.freevars[t]);
            this.freevars = i
        }
        this.freevars && this.speed === undefined && this.duration === undefined&&!this.signal && (this.duration = 0);
        for (t =- 1, r=!!this.freevars && this.freevars.length; t < r; t++)
            e = t===-1 ? this : this.freevars[t], typeof e == "string" && (this[e].key = e, this.freevars[t] = e = this[e]), e = this.makeFreevarFromHash(e), e !== this && (this.freevars[t] = e, e.key && (this[e.key] = e))
    },
    makeFreevarFromHash: function(e) {
        if (e._isFreevar)
            return e;
        var t = Anim.Animation.defaultFreevar, n, r, i, s, o, u, a, f = e === this ? this: {};
        for (i in e) {
            if (!e.hasOwnProperty(i))
                continue;
            f !== e && (f[i] = e[i])
        }
        if (f === this)
            for (i in t)
                f[i] === undefined && (f[i] = t[i]);
        else 
            for (i in t)
                f.hasOwnProperty(i) || (f[i] = t[i]);
        if (f.signal)
            f.tween = undefined, n = this._returnExtendedFreevar(f, Anim.Animation._signalFreevar), n._unsignaledCurrent = n.from;
        else if (f.inertia) {
            f.tween = undefined, n = this._returnExtendedFreevar(f, Anim.Animation._inertiaFreevar), n._undampedCurrent = n.from, n.inertia!==!0 || (n.inertia = Anim.Animation._inertiaFreevar.prototype.inertia), r = [];
            for (i = 0; i < f.inertia - 1; i++)
                r[i] = n._undampedCurrent;
            n.inertiaChain = r
        } else 
            n = this._returnExtendedFreevar(f, Anim.Animation._tweenFreevar), n._untweenedCurrent = f.from, typeof n.speed == "number" && (n.duration = undefined);
        return n._isFreevar=!0, n.freevarRun(0), n
    },
    _returnExtendedFreevar: function(e, t) {
        if (e === this) {
            for (var n in t.prototype)
                this[n] === undefined && (this[n] = t.prototype[n]);
            return this
        }
        return new t(e)
    },
    addFreevar: function(e) {
        if (!e)
            return;
        return e.key && this[e.key]?!1 : (e = this.makeFreevarFromHash(e), e.key && (this[e.key] = e), (this.freevars || (this.freevars = [])).push(e)
        , this)
    },
    removeFreevar: function(e) {
        typeof e == "string" && (e = this[e]);
        if (!e ||!e._isFreevar)
            return null;
        if (!this.freevars ||!this.freevars.length)
            return null;
        e.key && (this[e.key] = undefined);
        for (var t = 0; t < this.freevars.length; t++)
            this.freevars[t] === e && this.freevars.splice(t--, 1);
        return e
    },
    allFreevarsDo: function(e, t) {
        var n, r, i = arguments.callee.args || (arguments.callee.args = []);
        i.length = 0;
        for (var s = 1, o = arguments.length; s < o; s++)
            i.push(arguments[s]);
        this[e].apply(this, i);
        if (!(n = this.freevars))
            return this;
        for (s = 0; r = n[s]; s++)
            r[e].apply(r, i);
        return this
    },
    forceAll: function(e) {
        return this.allFreevarsDo("force", e), this
    },
    resetAll: function() {
        return this.allFreevarsDo("reset"), this
    },
    reverseAll: function(e) {
        return this.allFreevarsDo("reverse"), this
    },
    run: function(t, n) {
        var r=!0, i = 1, s = Infinity, o;
        for (var u =- 1, a=!!this.freevars && this.freevars.length || 0; u < a; u++)
            o = this.freevars && this.freevars[u] || this, o.freevarRun(t) || (r=!1), o.progress < i && (i = o.progress), o.tweenedProgress < s && (s = o.tweenedProgress);
        this.freevars && (this.progress = i, this.tweenedProgress = s), n || this.update(), r && this.listen("postFrame", this._finishNaturally)
    },
    start: function() {
        if (this.running)
            return this;
        this.disabled && this.allFreevarsDo("zeroOutDuration");
        if (Anim._hasSC) {
            var e = SC.RunLoop.isRunLoopInProgress();
            e || SC.RunLoop.begin()
        }
        var t = arguments.callee.base.apply(this, arguments);
        return Anim.isActive && (this.update(), this.trigger("tick"), this.trigger("frame")), !e && Anim._hasSC && SC.RunLoop.end(), t
    },
    finish: function(e, t) {
        if (!this.running)
            return this;
        e || (this.allFreevarsDo("force"), t || (this.update(), this.trigger("tick"), this.trigger("frame")));
        var n = this
        .stop();
        return this.trigger("finish"), this.repeat > 0 && (this.repeat--, this.reverseOnRepeat ? this.reverse() : this.reset(), this.start()), n
    },
    _finishNaturally: function() {
        this.finish(!0)
    },
    update: function() {},
    toString: function() {
        var e = arguments.callee.base.apply(this, arguments);
        return e = e.substring(0, e.length - 1) + (this.name ? " " + this.name : "") + (this.running ? " running" : "") + (this.freevars || this.inertia ? "" : " " + this.from + "-to-" + this.to + " " + this.duration + "ms " + Math.round(this.progress * 100) + "%") + "]", e
    },
    destroy: function() {
        var e = arguments.callee.base.apply(this, arguments);
        return this.update = this.run = this.finish = Core.noOp, e
    },
    recycle: function() {
        this.allFreevarsDo("reset"), this.tickCount = this.frameCount = this.elapsedTime = this._forcedZeroes = 0
    }
}), Anim.Animation.defaultFreevar = {
    tween: Anim.tweens.WEBKIT_EASE,
    discreteness: 0
}, Anim.Animation._tweenFreevar = function() {
    var e = function(e) {
        for (var t in e)
            e.hasOwnProperty(t) && (this[t] = e[t])
    };
    return e.prototype = {
        from: 0,
        to: 1,
        duration: 1e3,
        importants: undefined,
        isAlmostFinished: function(e) {
            return Math.abs(this.to - this.current) < e
        },
        reverse: function() {
            var e = this.to;
            return this.to = this.from, this.from = e, this.freevarRun(0), this
        },
        reset: function() {
            return this._untweenedCurrent = this.from, this.freevarRun(0), this
        },
        redirectTo: function(e) {
            return e === this.to ? this : (this.from = this.current, this.to = e, this._untweenedCurrent = this.from, this.freevarRun(0), this)
        },
        redirectFrom: function(e) {
            return this.from = this._untweenedCurrent = e, this.freevarRun(0), this
        },
        zeroOutDuration: function() {
            return !this.duration || (this.duration = 0), !this.speed || (this.speed = Infinity), this
        },
        force: function(e) {
            return typeof 
            e == "number" && (this.to = e), this._untweenedCurrent = this.to, this.freevarRun(0), this
        },
        freevarRun: function(t) {
            if (this.duration === 0 || this.speed === Infinity)
                this._untweenedCurrent = this.to;
            var n = this, r = n._untweenedCurrent < n.to, i = n.isFinished = n._untweenedCurrent === n.to, s = n.importants ? n.importants[n._impSpot || 0] || undefined: undefined, o = s !== undefined ? n._untweenedCurrent < s: undefined, u, a;
            if (n.to === n.from)
                return n.current = n._untweenedCurrent = n.to, n.isFinished=!0;
            if (!i) {
                a = n.speed || 1e3 / n.duration * Math.abs(n.to - n.from), u = Math.abs(a * t / 1e3), r ? n._untweenedCurrent += u : n._untweenedCurrent -= u;
                if (o===!0 && n._untweenedCurrent > s || o===!1 && n._untweenedCurrent < s)
                    n._untweenedCurrent = s, n._impSpot = (n._impSpot || 0) + 1;
                if (n.isFinished = r && n._untweenedCurrent >= n.to ||!r && n._untweenedCurrent <= n.to)
                    n._untweenedCurrent = n.to
            }
            return n.from !== undefined && n.to !== undefined ? (n.progress = (n._untweenedCurrent - n.from) / (n.to - n.from), n.tween instanceof Function && n.from != n.to && (n.from === 0 && n.to === 1 ? n.current = n.tweenedProgress = n.tween.call(this, n._untweenedCurrent) : n.current = (n.tweenedProgress = n.tween.call(this, n.progress)) * (n.to - n.from) + n.from)) : n.current = n._untweenedCurrent, n.discreteness && Math.abs(n.to / n.discreteness)%1 < 1e-8 && (n.current = Math.round(n.current / n.discreteness) * n.discreteness), n.isFinished
        }
    }, e._freevarPrototype = e, e
}(), Anim.Animation._inertiaFreevar = function() {
    var e = function(e) {
        for (var t in e)
            e.hasOwnProperty(t) && (this[t] = e[t])
    };
    return e.prototype = {
        from: 0,
        to: 1,
        speed: 1,
        inertia: 3,
        headStart: .01,
        isAlmostFinished: function(e) {
            return Math.abs(this.to - this.current) < e
        },
        reverse: function() {
            var e = this.to;
            return this.to = this.from, this
            .from = e, this
        },
        reset: function() {
            var e = this.to;
            return this.force(this.from), this.to = e, this
        },
        redirectTo: function(e) {
            return this.from = this.current, this.to = e, this
        },
        redirectFrom: function(e) {
            var t = e - this.current;
            this.from = e, this._undampedCurrent += t;
            for (var n = 0, r = this.inertiaChain.length; n < r; n++)
                this.inertiaChain[n] += t;
            return this.freevarRun(0), this
        },
        zeroOutDuration: function() {
            return this.speed = Infinity, this
        },
        force: function(e) {
            typeof e == "number" && (this.to = e), this._undampedCurrent = this.current = this.to;
            for (var t = 0, n = this.inertiaChain.length; t < n; t++)
                this.inertiaChain[t] = this.to;
            return this
        },
        freevarRun: function(t) {
            this.speed === Infinity && this.force();
            var n, r = this, i, s, o = r.speed, u = r.inertiaChain, a, f, l;
            for (n = 0; n < r.inertia; n++) {
                n === 0 ? (i = r._undampedCurrent, s = r.to) : n === 1 ? (i = u[0], s = r._undampedCurrent) : (i = u[n - 1], s = u[n - 2]);
                if (i === s)
                    continue;
                a = i < s, f = t / 1e3 * o * Math.abs(s + r.headStart * (2 * a - 1) - i), a ? i += f : i -= f;
                if (l = a && i >= s ||!a && i <= s)
                    i = s;
                n === 0 ? r._undampedCurrent = i : u[n - 1] = i
            }
            return r.current = i, r.discreteness && Math.abs(r.to / r.discreteness)%1 < 1e-8 && (r.current = Math.round(r.current / r.discreteness) * r.discreteness), r.isFinished = r.to === r.current, r.progress = NaN, r.isFinished
        }
    }, e._freevarPrototype = e, e
}(), Anim.Animation._signalFreevar = function() {
    var e = function(e) {
        for (var t in e)
            e.hasOwnProperty(t) && (this[t] = e[t])
    };
    return e.prototype = {
        speed: 1,
        from: 0,
        signal: function(e) {
            return .5 + .5 * Math.sin(e * Math.PI * 2)
        },
        persistent: !0,
        isAlmostFinished: function(e) {
            return !this.persistent
        },
        reverse: function() {
            return this.speed =- this.speed, this
        },
        reset: function() {
            return this._unsignaledCurrent = this.from, this
        },
        redirectTo: function() {
            return this
        },
        force: function() {
            return this
        },
        advance: function(e) {
            this._unsignaledCurrent += e
        },
        zeroOutDuration: function() {
            return this
        },
        freevarRun: function(t) {
            return this._unsignaledCurrent += t / 1e3 * this.speed, this.current = this.signal(this._unsignaledCurrent), this.discreteness && (this.current = Math.round(this.current / this.discreteness) * this.discreteness), this.isFinished=!this.persistent, this.progress = NaN, this.isFinished
        }
    }, e._freevarPrototype = e, e
}(), Anim.Fader = Anim.Animation.extend({
    className: "Anim.Fader",
    update: function() {
        Anim.setOpacity(this.element, this.current)
    },
    init: function() {
        this.from === undefined && (this._untweenedCurrent = this.from = Anim.getOpacity(this.element)), arguments.callee.base.apply(this, arguments)
    },
    _removeOnFinish: function() {
        if (!this.REMOVE_ON_FINISH)
            return;
        this.element.parentNode && this.element.parentNode.removeChild(this.element)
    }.observes("finish"),
    saveSelf: function() {
        var e = this.element._animFader;
        e && e.stop(), this.element._animFader = this
    }.observes("start"),
    killSelf: function() {
        this.element._animFader = undefined
    }.observes("stop")
}), Anim.DisplayNoneAtZero = {
    isMixin: !0,
    setDisplayNone: function() {
        this.to === 0 && (this.element.style.display = "none")
    }.observes("finish"),
    removeDisplayNone: function() {
        this.element.style.display = ""
    }.observes("start")
}, function() {
    var e = window.location.toString(), t = window.location.toString().indexOf("nogpu")!==-1, n=!t && window.location.toString().indexOf("gpu")!==-1;
    Core.maxGPUTextureSize = B.android ? 2048 : B.iOS >= 9 ? 1536 : B.iOS ? 1024 : 1950, Core.useGPU=!!B.iOS, Core.useGPUForBigs = B.safari || B.chrome || B.iOS, Core.useGPU = (Core.useGPU || n)&&!t, Core.useGPUForBigs = (Core.useGPUForBigs ||
    n)&&!t
}(), require("utilities/gpu_prefs"), Core.GPUFriendliness = {
    isMixin: YES,
    maxLayerSize: {
        width: Core.maxGPUTextureSize,
        height: Core.maxGPUTextureSize
    },
    rootHTML: '<div><div class="container"></div></div>',
    containerElement: "layer.firstChild",
    isGPUFriendly: NO,
    layout: {
        originX: .5,
        originY: .5,
        translateX: 0,
        translateY: 0,
        scale: 1,
        top: 0,
        left: 0,
        width: 0,
        height: 0
    },
    _ensureLayout: function() {
        this.ensureOwn("layout")
    }.observes("init"),
    updateToGPUFriendliness: function() {
        var e = this.isGPUFriendly;
        if (!this.layer || this._igf_ === (this._igf_ = e))
            return;
        e ? this.becomeGPUFriendly() : this.returnToFullRes()
    }.observes("isGPUFriendly"),
    becomeGPUFriendlyIfNeeded: function() {
        this.isGPUFriendly&&!this._hasBecomeGPUFriendly && this.becomeGPUFriendly()
    }.observes("layout"),
    becomeGPUFriendly: function() {
        if (!this.layout ||!this.layout.width ||!this.layout.height)
            return NO;
        this._hasBecomeGPUFriendly = YES;
        var e = this.layer, t = this.container, n = this.layout, r = Core.innerSizeInOuter(n, this.maxLayerSize), i = Math.min(1, r.width / n.width);
        e.style.overflow = t.style.overflow = "hidden", e.style.width = Math.round(Math.min(r.width, n.width)) + "px", e.style.height = Math.round(Math.min(r.height, n.height)) + "px", e.style.webkitTransformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.webkitTransform = "scale(" + i + ")";
        var s = n.translateX - n.originX * (n.scale - 1) * n.width, o = n.translateY - n.originY * (n.scale - 1) * n.height;
        return e.style.webkitTransform = "translateX(" + s + "px) translateY(" + o + "px) scale3d(" + n.scale / i + "," + n.scale / i + ",1)", YES
    },
    returnToFullRes: function() {
        var e = this.layer, t = this.container;
        e.style.overflow = t.style.overflow = "", e.style.width = Math.round(this.layout.width
        ) + "px", e.style.height = Math.round(this.layout.height) + "px", e.style.webkitTransform = t.style.webkitTransform = "", e.style.webkitTransformOrigin = t.style.webkitTransformOrigin = ""
    },
    updateToLayout: function() {
        var e = this.layer, t = this.container, n = this.layout, r = Math.round;
        if (!e ||!t)
            return;
        e = e.style, t = t.style;
        if (!n.width ||!n.height)
            return;
        var i, s;
        if (this.isGPUFriendly) {
            i = Core.innerSizeInOuter(n, this.maxLayerSize), s = Math.min(1, i.width / this.layout.width), e.width = r(Math.min(i.width, n.width)) + "px", e.height = r(Math.min(i.height, n.height)) + "px", t.webkitTransform = "scale(" + s + ")";
            var o = n.translateX - n.originX * (n.scale - 1) * n.width, u = n.translateY - n.originY * (n.scale - 1) * n.height;
            e.webkitTransform = "translateX(" + o + "px) translateY(" + u + "px) scale3d(" + n.scale / s + "," + n.scale / s + ",1)"
        } else 
            e.width = r(n.width) + "px", e.height = r(n.height) + "px";
        t.width = r(n.width) + "px", t.height = r(n.height) + "px", e.left = r(n.left) + "px", e.top = r(n.top) + "px", t.left === "0px" || (t.left = "0px"), t.top === "0px" || (t.top = "0px")
    }.observes("layout")
}, Core.PinchZoomability = {
    isMixin: YES,
    hasPinchZoomability: YES,
    allowZoom: YES,
    enableOwnerSwipability: NO,
    zoomState: null,
    defendAgainstAbnormallyFastFlicks: NO,
    defaultZoomState: {
        zoom: 1,
        y: 0,
        x: 0
    },
    neverLockXAxis: NO,
    neverLockYAxis: NO,
    maximumZoom: 6,
    speedFractionPerTick: .989,
    speedAsymptoteBoost: .01,
    shouldSnapToTop: NO,
    shouldSnapToLeft: NO,
    touchIgnoreTest: function() {
        return NO
    },
    resetZoom: function(e) {
        this.computeBoundedZoomHash(this.defaultZoomState, this.zoomState || (this.zoomState = {})), e || this.trigger("zoomState")
    },
    _initZoom: function() {
        this.resetZoom(YES)
    }.observes("init"),
    touchStart: function(e) {
        if (!e ||!this.allowZoom || this.touchIgnoreTest
        (e))
            return;
        if (e.touches.length > 2)
            return;
        var t = this._getScaleGestureInfo(e);
        if (!t)
            return;
        this.enableOwnerSwipability && this.owner.isCommittingSwipe && this.owner.forceFinishCurrentSwipeCommittal(), this.determineAxisLock(e), Core.cloneHash(t, this._initialGestureInfo || (this._initialGestureInfo = {})), Core.cloneHash(this._candidateZoom || this.zoomState, this._initialZoomInfo || (this._initialZoomInfo = {})), Anim.tellStop(this._pinchZoomAnimation), this._isZoomReadyForMove = YES
    },
    touchEnd: function(e) {
        if (e && e.touches.length > 2 ||!this.allowZoom)
            return;
        if (!e ||!e.touches ||!e.touches.length)
            this._candidateZoom = null;
        var t = this._initialGestureInfo;
        if (!t)
            return;
        e.touches.length ? this.touchStart(e) : (this._isZoomReadyForMove = NO, this.setIfChanged("isZoomTouching", NO), t.separation = t.centerX = t.centerY = NaN, this.animateAfterTouch(), this.cleanUpAfterTouch(), this.enableOwnerSwipability && (this.owner.swipeTouchDidEnd(), this._isSwiping = NO, this._hasForfeitedRightSwipe = NO, this._hasForfeitedLeftSwipe = NO, this._wasSwipeRejected = NO)), this._previousTouchDate = NaN
    },
    touchMove: function(e) {
        if (!this._isZoomReadyForMove ||!this.allowZoom)
            return;
        e.preventDefault();
        var t = this._getScaleGestureInfo(e);
        if (!t)
            return;
        var n = this.zoomContainerSize, r = this.zoomContentSize, i = this._initialGestureInfo, s = this._initialZoomInfo, o = i.separation === 0 ? 1: t.separation / i.separation || 1, u = Math.min(this.maximumZoom, Math.max(.025, s.zoom * o)), a = u / s.zoom, f = t.centerX - i.centerX + (a - 1) * (s.x + n.width / 2 - i.centerX), l = t.centerY - i.centerY + (a - 1) * (s.y + n.height / 2 - i.centerY), c = this._candidateZoom || (this._candidateZoom = {}), h, p, d, v, m;
        this.enableOwnerSwipability && (e.touches.length === 1 ?
        (d = this.computeBoundedZoomHash(this.zoomState, this._boundedTestHashRecycler || (this._boundedTestHashRecycler = {})), v = this.zoomState.zoom * r.width <= n.width, m = this.zoomState.zoom === 1, h = this.getRightBoundaryX(), !this._isSwiping && (h === this.zoomState.x || v && d.x === this.zoomState.x || m)&&!this._hasForfeitedLeftSwipe && t.centerX < i.centerX && (this._isSwiping = "left", this._isXAxisLocked = YES, this.shouldLockVerticalDragOnSwipe && (this._isYAxisLocked = YES)), v && h < this.zoomState.x - 2 && (this._hasForfeitedLeftSwipe = YES), this._isSwiping === "left" && (!d && (t.centerX > i.centerX || this._wasSwipeRejected) && (this._isSwiping = NO, this._hasForfeitedLeftSwipe = YES, this._isXAxisLocked = NO, this.shouldLockVerticalDragOnSwipe && (this._isYAxisLocked = NO)), this._hasForfeitedLeftSwipe || this.owner.swipeToOffset(t.centerX - i.centerX) && (this._wasSwipeRejected = YES)), p = this.getLeftBoundaryX(), !this._isSwiping && (p === this.zoomState.x || v && d.x === this.zoomState.x || m)&&!this._hasForfeitedRightSwipe && t.centerX > i.centerX && (this._isSwiping = "right", this._isXAxisLocked = YES, this.shouldLockVerticalDragOnSwipe && (this._isYAxisLocked = YES)), v && p > this.zoomState.x + 2 && (this._hasForfeitedRightSwipe = YES), this._isSwiping === "right" && (!d && (t.centerX < i.centerX || this._wasSwipeRejected) && (this._isSwiping = NO, this._hasForfeitedRightSwipe = YES, this._isXAxisLocked = NO, this.shouldLockVerticalDragOnSwipe && (this._isYAxisLocked = NO)), this._hasForfeitedRightSwipe || this.owner.swipeToOffset(t.centerX - i.centerX) && (this._wasSwipeRejected = YES))) : this.owner.cancelSwipe()), c.zoom = u, c.x = s.x+!this._isXAxisLocked * f, c.y = s.y+!this._isYAxisLocked * l, this.computeCompromiseZoomHash(c, this.
        zoomState), e.touches.length === 1 ? (this._ppTouchDate = this._previousTouchDate, this._previousTouchDate = new Date * 1, this._isXAxisLocked || (this._ppTouchX = this._previousTouchX, this._previousTouchX = t.centerX), this._isYAxisLocked || (this._ppTouchY = this._previousTouchY, this._previousTouchY = t.centerY)) : this._previousTouchDate = NaN, this.setIfChanged("isZoomTouching", YES), this.trigger("zoomState")
    },
    touchCancel: function(e) {
        return this.touchEnd.apply(this, arguments)
    },
    determineAxisLock: function(e) {
        var t = this.zoomContainerSize, n = this.zoomContentSize, r = this.zoomState, i = this.computeBoundedZoomHash(r, this._axisLockBoundTester || (this._axisLockBoundTester = {}));
        this._isXAxisLocked = NO, this._isYAxisLocked = NO;
        if (!t ||!n ||!i ||!e ||!e.touches || e.touches.length > 1)
            return;
        i.x === r.x && n.width * r.zoom <= t.width && (this._isXAxisLocked=!this.neverLockXAxis), i.y === r.y && n.height * r.zoom <= t.height && (this._isYAxisLocked=!this.neverLockYAxis)
    },
    cleanUpAfterTouch: function() {
        this._isYAxisLocked = this._isXAxisLocked = NO, this._ppTouchY = this._ppTouchX = this._ppTouchDate = this._previousTouchY = this._previousTouchX = this._previousTouchDate = NaN
    },
    _getScaleGestureInfo: function(e) {
        if (!e.touches.length)
            return null;
        var t = this._gsgiVessel || (this._gsgiVessel = {}), n, r, i, s, o, u, a, f, l;
        return n = e.touches[0], r = e.touches[1] || n, i = n.clientX, s = n.clientY, o = r.clientX, u = r.clientY, a = o - i, f = u - s, l = Math.sqrt(f * f + a * a), t.separation = l, t.centerX = (o + i) / 2, t.centerY = (u + s) / 2, t
    },
    animateAfterTouch: function() {
        var e = this.zoomState;
        if (!e ||!this.allowZoom)
            return;
        Anim.tellStop(this._pinchZoomAnimation), e.zoom >= 1 && this._ppTouchDate && this._previousTouchDate ? this._pinchZoomAnimation =
        this.InertiaAnimation.go({
            owner: this
        }) : this._pinchZoomAnimation = this.SnapBackAnimation.go({
            owner: this
        })
    },
    computeBoundedZoomHash: function(e, t) {
        Core.cloneHash(e, t || (t = {}));
        var n = this.zoomContentSize, r = this.zoomContainerSize, i;
        if (!n ||!r)
            return;
        return e.zoom < 1 && (t.zoom = 1), i = n.width / 2 * t.zoom - r.width / 2, n.width * t.zoom < r.width ? t.x = this.shouldSnapToLeft ? i : 0 : t.x<-i ? t.x =- i : t.x > i && (t.x = i), i = n.height / 2 * t.zoom - r.height / 2, n.height * t.zoom < r.height ? t.y = this.shouldSnapToTop ? i : 0 : t.y<-i ? t.y =- i : t.y > i && (t.y = i), t
    },
    getLeftBoundaryX: function() {
        return this.zoomContentSize.width / 2 * this.zoomState.zoom - this.zoomContainerSize.width / 2
    },
    getRightBoundaryX: function() {
        return - (this.zoomContentSize.width / 2 * this.zoomState.zoom - this.zoomContainerSize.width / 2)
    },
    computeCompromiseZoomHash: function(e, t, n) {
        return this.computeBoundedZoomHash(e, t || (t = {})), n && Core.cloneHash(t, n), t.zoom = (e.zoom + t.zoom) / 2, t.x = (e.x + t.x) / 2, t.y = (e.y + t.y) / 2, t
    },
    areZoomHashesEqual: function(e, t) {
        return e.zoom === t.zoom && e.x === t.x && e.y === t.y
    },
    SnapBackAnimation: Anim.Animation.extend({
        duration: 350,
        saveStartState: function() {
            this.owner.computeBoundedZoomHash(this.owner.zoomState, this.toZoom = {}), Core.cloneHash(this.owner.zoomState, this.fromZoom || (this.fromZoom = {}))
        }.observes("start"),
        update: function() {
            var e = this.current, t = 1 - e, n = this.fromZoom, r = this.owner.zoomState, i = this.toZoom;
            r.zoom = i.zoom * e + t * n.zoom, r.x = i.x * e + t * n.x, r.y = i.y * e + t * n.y, this.owner.trigger("zoomState")
        },
        killSelfAndIsZoomHappening: function() {
            this.owner._pinchZoomAnimation = null, this.owner.setIfChanged("isZoomHappening", NO)
        }.observes("finish")
    }),
    InertiaAnimation: Anim.Task.extend({
        ticked: 2,
        computeInitialSpeed
        : function() {
            var e = this.owner, t = (e._previousTouchDate - e._ppTouchDate) / (this.ticked || 16) || Infinity, n, r;
            this.x = {
                name: "x",
                speed: (e._previousTouchX - e._ppTouchX || 0) / t,
                current: e.zoomState.x
            }, this.y = {
                name: "y",
                speed: (e._previousTouchY - e._ppTouchY || 0) / t,
                current: e.zoomState.y
            }, this.owner.defendAgainstAbnormallyFastFlicks && this.owner._zoomHappeningStartTime >= new Date * 1 - 500 && (r = 5 * (this.owner.zoomContainerSize.width / 2 + this.owner.zoomContainerSize.height / 2) / 896, n = Math.sqrt(this.x.speed * this.x.speed + this.y.speed * this.y.speed), n > r && (this.x.speed*=r / n, this.y.speed*=r / n))
        }.observes("start"),
        killSelfAndIsZoomHappening: function() {
            this.owner._pinchZoomAnimation = null, this.owner.setIfChanged("isZoomHappening", NO)
        }.observes("finish"),
        run: function(e, t) {
            var n = this.owner.computeBoundedZoomHash(this.owner.zoomState, this._closestBound || (this._closestBound = {}));
            this.runComponent(this.x, e, n.x), this.runComponent(this.y, e, n.y), isNaN(this.x.current) || (this.owner.zoomState.x = this.x.current), isNaN(this.y.current) || (this.owner.zoomState.y = this.y.current), Math.abs(this.x.speed || 0) < .001 && Math.abs(this.y.speed || 0) < .001 && (this.trigger("finish"), this.stop()), t || this.owner.trigger("zoomState")
        },
        runComponent: function(e, t, n) {
            if (e.turnedAround)
                return;
            var r=!isNaN(e.bound);
            r || e.current !== n && (e.bound = n, e.behindBound = e.current < n, e.aheadOfBound=!e.behindBound, r = YES), r && (e.speed += (e.behindBound ? 1 : - 1) * Math.abs(e.bound - e.current) / 50 * t / 16, !e.turnedAround && (e.behindBound && e.speed > 0 ||!e.behindBound && e.speed < 0) && (e.turnedAround = YES), e.turnedAround && (e.speed = Infinity, e.snapBackAnim = Anim.Animation.go({
                owner: this,
                stopper: function() {
                    if (!
                    e.snapBackAnim)
                        return;
                    e.snapBackAnim = null, e.speed = 0, this.stop()
                }.observes(".owner.stop", "stop"),
                inertia: 4,
                speed: 20,
                headStart: 1,
                from: e.current,
                to: e.bound,
                update: function() {
                    e.current = this.current
                }
            })));
            var i = e.speed > 0, s = i ? 1: - 1;
            if (e.speed) {
                e.speed += s * this.owner.speedAsymptoteBoost, e.speed*=this.owner.speedFractionPerTick, e.speed -= s * this.owner.speedAsymptoteBoost;
                if (i && e.speed <= 0 ||!i && e.speed >= 0)
                    e.speed = 0
            }
            e.snapBackAnim || (e.current += e.speed)
        }
    }),
    bumpIsZoomHappening: function() {
        if (!this.isZoomTouching)
            return;
        this.setIfChanged("isZoomHappening", YES)
    }.observes("isZoomTouching"),
    prepareForFastFlickDefense: function() {
        if (!this.defendAgainstAbnormallyFastFlicks)
            return;
        this._zoomHappeningStartTime = new Date * 1
    }.observes("isZoomHappening")
}, Core.RequestDelegate = {
    isRequestDelegate: YES,
    isMixin: YES,
    requestWillSend: function(e) {},
    requestDelayForResponse: function(e, t) {
        return null
    },
    requestDidRecieveResponse: function(e, t) {},
    requestShouldPauseHandlingOfReceivedResponse: function(e, t) {
        return !1
    },
    requestShouldPauseSendingOfRequest: function(e) {
        return !1
    },
    requestDidPauseExecution: function(e) {},
    requestCancelled: function(e) {}
}, Core.FadeShowHide = {
    isMixin: YES,
    disableFade: NO,
    duration: 350,
    shouldShow: YES,
    showHideAnimationExample: Anim.Fader,
    _watchShouldShow: function() {
        if (!this.layer || this._lastShouldShow === (this._lastShouldShow = this.shouldShow))
            return;
        this.isRenderingLayer && (this.initiallyAppended = this.shouldShow), this[this.shouldShow ? "show": "hide"](this.isRenderingLayer), !this.shouldShow && this.isRenderingLayer && (this.layer.style.opacity = 0)
    }.observes("shouldShow", "render"),
    show: function(e) {
        if (this.isShowing === YES)
            return;
        this.set("isShowing", YES), Anim.tellStop(this._showHider);
        var t = this.showDuration || this.duration;
        if (isNaN(t) || this.disableFade)
            e = YES;
        if (e)
            return this.append();
        this._showHider = this.showHideAnimationExample.go({
            owner: this,
            element: this.layer,
            to: 1,
            duration: t,
            append: function() {
                this.owner.append()
            }.observes("start")
        })
    },
    hide: function(e) {
        if (this.isShowing === NO)
            return;
        this.set("isShowing", NO), Anim.tellStop(this._showHider);
        var t = this.hideDuration || this.duration;
        if (isNaN(t) || this.disableFade)
            e = YES;
        if (e)
            return this.remove();
        this._showHider = this.showHideAnimationExample.go({
            owner: this,
            element: this.layer,
            to: 0,
            duration: t,
            remove: function() {
                this.owner.remove()
            }.observes("finish")
        })
    },
    finishTransition: function() {
        Anim.tellFinish(this._showHider)
    }
}, Core.WaitSupport = {
    isMixin: YES,
    hasWaitSupport: YES,
    shouldFireWithoutReqs: NO,
    numReqs: 0,
    _waitSupport_reqsCompleted: 0,
    _waitSupport_initWarning: function() {},
    forceWaitCompletion: function() {
        this._waitSupport_allReqsDidComplete()
    },
    preinit: function() {},
    init: function() {
        this.preinit();
        var e = this.shouldFireWithoutReqs;
        e && this.openReq(), arguments.callee.base.apply(this, arguments);
        var t = this._waitSupport_subclass_init;
        t && t.apply(this), e && this.closeReq()
    },
    initOverride: function(e, t, n) {
        return e.base = this._waitSupport_subclass_init || this._waitSupport_initWarning, this._waitSupport_subclass_init = e, t
    },
    openReq: function() {
        this.numReqs++
    },
    closeReq: function() {
        var e = this._waitSupport_reqsCompleted, t = this.numReqs;
        if (e === t)
            return;
        this._waitSupport_reqsCompleted = e += 1, e === t && this._waitSupport_allReqsDidComplete()
    },
    _waitSupport_allReqsDidComplete: function() {
        if (this._didComplete === (this
        ._didComplete = YES))
            return;
        this.trigger("waitDidComplete")
    }
}, Core.KeyCodes = {
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    ESCAPE: 27,
    SPACE: 32
}, Core.KeyActions = {}, function() {
    var e = Core.KeyCodes, t = Core.KeyActions;
    t[e.ARROW_LEFT] = "ArrowLeft", t[e.ARROW_RIGHT] = "ArrowRight", t[e.ESCAPE] = "Escape", t[e.SPACE] = "Space"
}(), Core.KeyEventRootResponder = Core.Object.extend({
    eventKeys: "keydown keyup keypress".w(),
    responder: null,
    registerKeyEventHandlers: function() {
        var e = this, t = this.eventKeys, n = function(t) {
            e.handleKeyEvent.call(e, t)
        };
        for (var r = 0, i; i = t[r]; r += 1)
            Core.addEvent(document, i, n)
    }.observes("init"),
    handleKeyEvent: function(e) {
        var t = this.get("responder"), n, r = e.type.toLowerCase(), i = e.keyCode, s = Core.KeyActions[i];
        if (!t)
            return;
        n = t[r + "For" + s];
        if (n instanceof Function) {
            n.call(t, e);
            return 
        }
        n = t[r], n instanceof Function && n.call(t, e)
    }
}), Core.KeyEventRootResponder.responder = Core.KeyEventRootResponder, Core.mixin({
    setupKeyEventRootResponder: function() {
        var e = Core.KeyEventRootResponder.responder;
        Core.set("keyEventRootResponder", e.create())
    }.observes("finalizeCore")
}), Core.define("Locale", Core.Object.extend({
    strings: {},
    locString: function(e) {
        var t = this.strings[e];
        return t || e
    },
    static_locales: {},
    static_localeClassFor: function(e) {
        var t, n = this.locales[e];
        return n || (this.locales[e] = n = Core.Locale.extend()), n
    },
    static_createCurrentLocale: function() {
        var e = String.preferredLanguage || navigator.language, t = this.localeClassFor(e);
        return e !== this.currentLanguage && (this.currentLanguage = e, this.currentLocale = t.create()), this.currentLocale
    },
    static_addStrings: function(e) {
        return this.prototype.strings = e, this
    }
})), Core.stringsFor = function(e, t) {
    var n =
    Core.Locale.localeClassFor(e);
    return n.addStrings(t), this
}, (window.SC || (SC = {})).stringsFor = function() {
    return Core.stringsFor.apply(Core, arguments)
}, Core.Array = {
    forEach: function(e, t, n) {
        if (!e)
            return;
        n = n || e;
        for (var r = 0, i = e.length; r < i; r += 1)
            t.call(n, e[r], r)
    }
}, Core.mixin({
    _b64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    enbase64: function(e) {
        if (window.btoa)
            try {
                return btoa(e)
        } finally {}
        if (!e)
            return e;
        var t = Core._b64, n = 0, r = 0, i = "", s = Core._tmpArr || (Core._tmpArr = []), o = "", u = e.length, a = String.fromCharCode, f, l, c, h, p, d, v, m, g, y;
        s.length = 0, e = e.toString().replace(/\r\n/g, "\n");
        for (g = 0; g < u; g++)(y = e.charCodeAt(g)
            ) < 128 ? o += a(y) : y > 127 && y < 2048 ? (o += a(y>>6 | 192), o += a(y & 63 | 128)) : (o += a(y>>12 | 224), o += a(y>>6 & 63 | 128), o += a(y & 63 | 128));
        e = o;
        do 
            f = e.charCodeAt(n++), l = e.charCodeAt(n++), c = e.charCodeAt(n++), m = f<<16 | l<<8 | c, h = m>>18 & 63, p = m>>12 & 63, d = m>>6 & 63, v = m & 63, s[r++] = t.charAt(h) + t.charAt(p) + t.charAt(d) + t.charAt(v);
        while (n < e.length);
        i = s.join("");
        switch (e.length%3) {
        case 1:
            i = i.slice(0, - 2) + "==";
            break;
        case 2:
            i = i.slice(0, - 1) + "="
        }
        return i
    },
    debase64: function(e) {
        if (window.atob)
            try {
                return atob(e)
        } finally {}
        var t = Core._b64, n = "", r = 0, i, s, o, u, a, f, l;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (r < e.length)
            u = t.indexOf(e.charAt(r++)), a = t.indexOf(e.charAt(r++)), f = t.indexOf(e.charAt(r++)), l = t.indexOf(e.charAt(r++)), i = u<<2 | a>>4, s = (a & 15)<<4 | f>>2, o = (f & 3)<<6 | l, n += String.fromCharCode(i), f !== 64 && (n += String.fromCharCode(s)), l !== 64 && (n += String.fromCharCode(o));
        var c = 0, h = "", p, d, v;
        while (c < n.length)
            p = n.charCodeAt(c), p < 128 ? (h += String.fromCharCode(p), c++) : p > 191 && p < 224 ? (d = n.charCodeAt(c + 1), h += String.fromCharCode((p & 31)<<6 | d & 63),
            c += 2) : (d = n.charCodeAt(c + 1), v = n.charCodeAt(c + 2), h += String.fromCharCode((p & 15)<<12 | (d & 63)<<6 | v & 63), c += 3);
        return h
    }
}), Core.define("bodyOverflowArbitrator", Core.Object.create({
    requestHidden: function(e, t) {
        this._makeRequest(e, - 1 - 9*!!t)
    },
    requestVisible: function(e, t) {
        this._makeRequest(e, 1 + 9*!!t)
    },
    withdrawRequest: function(e) {
        if (!e)
            return;
        var t = Core.guidFor(e);
        this._requests[t] && (delete this._requests[t], this.setOverflow())
    },
    setOverflow: function() {
        var e = this._decideOverflow();
        e !== undefined && (document.body.style.overflow = e ? "auto" : "hidden")
    },
    _makeRequest: function(e, t) {
        if (!e)
            return;
        var n = Core.guidFor(e);
        if (this._requests[n] === (this._requests[n] = t))
            return;
        this.setOverflow()
    },
    _requests: {},
    _decideOverflow: function() {
        var e, t, n, r, i = this._requests, s;
        for (var o in i)(s = i[o]) 
            < 0 && (e = YES), s<-1 && (n = YES), s > 0 && (t = YES), s > 1 && (r = YES);
        return r ? YES : t && n ? NO : t ? YES : e ? NO : YES
    }
})), Core.mixin({
    strToHtml: function(e) {
        return e.split("\n").join("<BR>").split("  ").join(" &nbsp;")
    },
    toCamel: function(e, t) {
        e || (e = "");
        for (var n = 0, r = e.length; n < r; n++) {
            if (e.charAt(n) !== "-" || n == r - 1)
                continue;
            e = e.substring(0, n) + e.charAt(n + 1).toUpperCase() + e.substring(n + 2), r--
        }
        return t ? e.charAt(0).toUpperCase() + e.substring(1) : e
    },
    toDashed: function(e, t) {
        e || (e = "");
        for (var n = 0, r = e.length; n < r; n++) {
            var i = e.charAt(n);
            if (i.toLowerCase() === i || n == r - 1)
                continue;
            e = e.substring(0, n) + "-" + e.charAt(n).toLowerCase() + e.substring(n + 1), r++
        }
        return t && e.charAt(0) === "-" ? e.substring(1) : e
    },
    getStyle: function(e, t) {
        if (e.currentStyle)
            return e.currentStyle[Core.toCamel(t)];
        if (e.initialStyle)
            return e.initialStyle.getPropertyValue(t);
        var n;
        if ((n = document.defaultView) && (n = n.getComputedStyle
        ))
            return (e.initialStyle = n(e, null)).getPropertyValue(t)
    },
    addEvent: function(el, name, func, capture) {
        if (el.addEventListener)
            return el.addEventListener(name, func, !!capture);
        if (el.attachEvent)
            return el.attachEvent("on" + name, function() {
                return func.apply(el, arguments)
            });
        var old = el["on" + name], listener = old ? function() {
            typeof old == "string" ? eval(old) : old.apply(this, arguments), func.apply(this, arguments)
        }
        : func;
        return el["on" + name] = listener
    },
    stopPropagatingEvent: function(e) {
        e.cancelBubble=!0, e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault()
    },
    positionOfElement: function(e) {
        var t = 0, n = 0, r = e;
        do 
            t += r.offsetTop || 0, n += r.offsetLeft || 0, r = r.offsetParent;
        while (r);
        var i = e._posHash || (e._posHash = {});
        return i.left = n, i.top = t, i
    },
    hideIOSAddressBar: function(e) {
        clearTimeout(Core._hideIOSABTimeout);
        if (!B.iOS)
            return;
        if (Core.scrollTop() >= 10)
            return;
        e ? Core._hideIOSABTimeout = setTimeout(Core._hideIOSAddressBar, e) : Core._hideIOSAddressBar()
    },
    _hideIOSAddressBar: function() {
        Core.scrollTop(0)
    },
    scrollTop: function(e) {
        var t = document.body, n = document.documentElement;
        if (!t ||!n)
            return;
        return isNaN(e) ? t.scrollTop || n.scrollTop : (window.scrollTo(t.scrollLeft || n.scrollLeft || 0, e), e)
    },
    lastScrollTop: 0,
    _saveScrollTop: function() {
        Core.setIfChanged("lastScrollTop", Core.scrollTop())
    }.observes("Core.windowScroll")
}), Core.addEventToElement = Core.addEvent, Core.mixin({
    emptyObject: {},
    emptyArray: [],
    emptyFunction: function() {},
    emptyImageSrc: "data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw=="
}), Core.ErrorCatcher = Core.Object.extend({
    _isAttached: NO,
    attach: function() {
        if (this._isAttached === (this._isAttached =
        YES))
            return;
        this._attachToFunctionPrototype()
    },
    detach: function() {
        if (this._isAttached === (this._isAttached = NO))
            return;
        this._detachFromFunctionPrototype()
    },
    _attachToFunctionPrototype: function() {
        var e = this, t = this._nativeCall = Function.prototype.call, n = this._nativeApply = Function.prototype.apply, r = t, i = n, s, o;
        t.call = t, t.apply = n, n.call = t, n.apply = n, t.displayName = "call", n.displayName = "apply";
        var u = function(t) {
            var n = Function.prototype, u = r, a = i, f = e;
            return function() {
                var e = n, r;
                e.call = u, e.apply = a;
                try {
                    r = t.apply(this, arguments)
                } catch (i) {
                    throw f._isAttached&&!f._isHandlingException && (f.shouldIgnoreException(i) || f._handleException(i), e.call = s, e.apply = o), i
                }
                return f._isAttached && (e.call = s, e.apply = o), r
            }
        };
        Function.prototype.call = s = u(t), Function.prototype.apply = o = u(n)
    },
    _detachFromFunctionPrototype: function() {
        Function.prototype.call = this._nativeCall, Function.prototype.apply = this._nativeApply
    },
    handleException: function(e) {},
    _handleException: function(e) {
        var t;
        this._isHandlingException = YES;
        try {
            this.handleException(e)
        } catch (n) {
            t = n
        }
        this._isHandlingException = NO;
        if (t)
            throw t
    },
    shouldIgnoreException: function(e) {}
}), require("utilities/error_catcher/error_catcher"), Core.ErrorCatcher.reopen({
    NO_USER_DIALOG: YES,
    MAX_RECENT_LOG_MESSAGES_SIZE: 4800,
    shouldIgnoreException: function(e) {
        var t = e.toString();
        return t.indexOf("GM.")!==-1 ? YES : NO
    },
    handleException: function(e) {
        var t = this.buildHashForException(e);
        this.sendHashToFeedbackWS(t)
    },
    buildHashForException: function(e) {
        var t = undefined, n = {}, r = window.BUILD_INFO;
        return n.error = e ? e.message ? e.message : e.toString() : "Unknown", e || (e = Core.emptyObject), n.file = e.fileName || e.sourceURL || "Unknown"
        , n.line = e.lineNumber || e.line || "Unknown", n.time = (new Date).toString() + " (" + Math.floor(new Date) + ")", n.userAgent = navigator.userAgent + "", r && (n.buildInfo = window.enumerate(r)), t && (n.symbolicationFailed = t.toString()), e.stack && (n.stack = e.stack.toString()), window.RELATIVE_URLS && this.NO_USER_DIALOG && (delete n.file, delete n.line, delete n.stack, delete n.buildInfo), this.NO_USER_DIALOG && (delete n.windowLocation, delete n.exceptionInfo, delete n.recentLogMessages), this.computeLogTextForHash(n), n
    },
    computeLogTextForHash: function(e) {
        var t = "";
        for (var n in e)
            t += this._upperCasifyCamel(n) + "\n" + e[n] + "\n\n";
        return e.text = t, t
    },
    _upperCasifyCamel: function(e) {
        var t = "";
        for (var n = 0, r = e.length, i, s, o = YES; n < r; n++)
            s = (i = e[n]).toUpperCase(), i === s && (n === 0 && (o = NO), o && (t += " ")), t += s;
        return t
    },
    sendHashToFeedbackWS: function(e) {
        var t = {
            appName: window.APP_NAME,
            errorTitle: e.error,
            errorType: "exception",
            origin: "client"
        };
        Core.cloneHash(e, t), delete t.text, Core.Request.send({
            type: "POST",
            url: "https://feedbackws.icloud.com/reportError",
            body: t,
            logSuccess: function() {}.observes("success"),
            logFailure: function() {}.observes("error")
        })
    }
}), function() {
    var e = /[&<>\"\'\/]/g, t = function(e) {
        switch (e) {
        case"&":
            return "&amp;";
        case"<":
            return "&lt;";
        case">":
            return "&gt;";
        case'"':
            return "&quot;";
        case"'":
            return "&#39;";
        case"/":
            return "&#47;"
        }
    };
    Core.escapeHTML = function(n) {
        return n ? n.replace(e, t) : n
    }
}(), Core.JSONProcessor = Core.Object.extend({
    processJSONObject: function(e, t, n, r, i, s) {
        n || (n = ""), s || (s = []), r = (r || 0) + 1, i || (i = e);
        if (!e ||!t)
            return;
        s.push(e);
        var o, u, a, f, l, c, h = arguments.callee._scratchArrays || (arguments.callee._scratchArrays = []), p = h[r] || (h[r] = []), d, v, m
        , g, y, b, w, E, S, x, T, N = " > ", C = N.length, k, L, A, O;
        for (v in t)
            v.indexOf("_ensureExists_")!=-1 && (e.hasOwnProperty(v.substring(14)) || (e[v.substring(14)] = t[v]));
        for (v in t) {
            if (!t.hasOwnProperty(v))
                continue;
            p.length = 0, m = undefined;
            if (v === "*")
                for (m in e)
                    p.push(m);
            else 
                e.hasOwnProperty(v) && p.push(v), v.slice( - 1 - "_jsontransform".length, - 1) === "_jsontransform" && (T = v.slice(0, - 1 - "_jsontransform".length), e.hasOwnProperty(T) && p.push(T));
            u = t[v];
            for (d = 0; m = p[d]; d++) {
                o = e[m], x = u instanceof Function;
                if (typeof u == "string" || x) {
                    x ? (A = u, O = m) : (k = u.indexOf(N), k!==-1 ? (L = u.substring(0, k), O = u.substring(k + C), v === "*" && (O = m + O), A = this[L]) : (L = u, O = v, A = this[L])), e[O] = A.call(this, e[m], e, i, s, m, O);
                    continue
                }
                a = o instanceof Array, f = u instanceof Array, l = o instanceof Object, c = u instanceof Object;
                if (!l ||!c || a !== f)
                    continue;
                if (!a)
                    this.processJSONObject(o, u, n + "." + m, r, i, s);
                else {
                    b = u[0], w = n + "." + m + ".";
                    for (g = 0; y = o[g]; g++)
                        this.processJSONObject(y, b, w + g, r, i, s)
                    }
            }
        }
        s.length--;
        return 
    },
    copy: function(e) {
        return e
    },
    remove: function() {
        return undefined
    },
    toLowerCase: function(e) {
        return (e || "").toString().toLowerCase()
    },
    parseInt: parseInt,
    parseFloat: parseFloat
}), Core.mixin({
    innerSizeInOuter: function(e, t, n, r, i) {
        var s = this._innerSizeOuterRet || (this._innerSizeOuterRet = {}), o, u, a;
        return isNaN(e) && (i = n, r = t.height, n = t.width, t = e.height, e = e.width), o = e / t, u = n / r, a = i ? o < u : o > u, s.width = a ? n : r * o, s.height = a ? n / o : r, s
    }
}), Core.mixin({
    LogLevel: {
        NONE: 1e3,
        ERROR: 2,
        WARN: 1,
        DEBUG: 0
    },
    LogPrefixes: {
        debug: "",
        warn: "Warning: ",
        error: "Error: "
    },
    logLevel: 0,
    _debugs: [],
    _warns: [],
    _errors: [],
    _logs: [],
    debug: function() {
        Core._log(Core.LogLevel.DEBUG, "debug", arguments)
    },
    warn: function() {
        Core._log(Core
        .LogLevel.WARN, "warn", arguments)
    },
    error: function() {
        Core._log(Core.LogLevel.ERROR, "error", arguments)
    },
    maybeDebug: function(e) {
        if (!e)
            return;
        var t = Core._argPasser;
        t.length = 0;
        for (var n = 1; n < arguments.length; n++)
            t.push(arguments[n]);
        Core.debug.apply(this, t)
    },
    _log: function(e, t, n) {
        for (var r = 0, i = "", s = n.length, o; (o = n[r]) || r < s; r++)
            i += (r === 0 ? "" : " ") + o;
        this["_" + t + "s"].push(i), this._logs.push((Core.LogPrefixes[t] || "") + i);
        if (this.logLevel > e)
            return;
        var u = window.console;
        u && (u = u[t]) && u.apply ? u.apply(console, n) : u && u(i)
    },
    stringifyRecordedLogMessages: function(e) {
        e || (e = Infinity);
        var t = this._logs, n = t.length - 1, r = 0, i = [];
        while (r <= e && n >= 0)
            r += t[n].length, i.push(t[n]), n--;
        return i.join("\n")
    }
}), Core.mixin({
    mousePosition: {},
    setUpMouseEvents: function() {
        Core.addEvent(document, "mousemove", function(e) {
            if (!e)
                return;
            var t = NO, n = Core.mousePosition;
            !isNaN(e.clientX) && n.x !== (n.x = e.clientX) && (t = YES), !isNaN(e.clientY) && n.y !== (n.y = e.clientY) && (t = YES), t && Core.trigger("mousePosition")
        })
    }.observes("finalizeCore")
}), Core._relativeUrl_cachedCurrentUrl = function() {
    var e = BUILD_INFO.currentUrl.split("/"), t, n = e.length;
    for (t = 0; t < e.length; t++)
        e[t] == ".." && (e.splice(t, 1), e.splice(t - 1, 1), t--, t--);
    return e.join("/")
}(), Core.relativeUrl = function(e) {
    var t = Core._relativeUrl_cachedCurrentUrl.split("/"), n = e.split("/");
    while (n.length >= 1 && t.length >= 1 && t[0] === n[0])
        t.shift(), n.shift();
    var r = "";
    t.pop();
    for (var i = 0, s = t.length; i < s; i++)
        r += "../";
    return r += n.join("/"), r
}, require("mixins/request_delegate"), Core.define("Request", Core.Object.extend(Core.RequestDelegate, {
    className: "Request",
    forceAjaxSender: NO,
    debugDelay: 0,
    url: "",
    type: "GET",
    body: null,
    contentType
    : "text/plain",
    isAsync: YES,
    requestId: null,
    headers: {},
    autoJSONParse: YES,
    ajaxSenderFrames: {},
    delegate: null,
    static_trace: !1,
    static_responseQueue: [],
    static_requestDelegate: null,
    static__PauseToken: Core.Object.extend({
        request: null,
        resumeAction: null,
        resume: function() {
            this.resumeAction.call(this)
        }
    }),
    delegateValue: function() {
        return this.delegate || Core.Request.requestDelegate || this
    }.property(),
    isCancelled: function() {
        return !!this._isCancelled
    }.property(),
    enforceAPI: function() {
        this.url || Core.error("Core.Requests require URLs.")
    }.observes("init"),
    send: function() {
        if (this.get("isCancelled"))
            return;
        var e = this, t = arguments;
        if (!this.debugDelay)
            return this._send.apply(this, t);
        setTimeout(function() {
            e._send.apply(e, t)
        }, this.debugDelay)
    },
    cancel: function() {
        this._isCancelled=!0;
        var e = this.get("delegateValue");
        e.requestCancelled(this)
    },
    _send: function() {
        if (this.get("isCancelled"))
            return;
        var e = this.get("delegateValue");
        if (e.requestShouldPauseSendingOfRequest(this)) {
            this._pauseExecution(Core.Request._PauseToken.create({
                request: this,
                resumeAction: function() {
                    this.request._completeSend()
                }
            })), Core.warn("%@: Sending %@ request to %@ has been paused.".fmt(this, this.type, this.url));
            return 
        }
        this._completeSend()
    },
    _completeSend: function() {
        var e = this.get("delegateValue");
        e.requestWillSend(this), this.trigger("willSend");
        var t = Core.Request.responseQueue.shift();
        if (t) {
            var n = t.responseObject;
            n && (t.responseObject = JSON.parse(JSON.stringify(n))), this.didReceiveResponse(t);
            return 
        }
        if (this.forceAjaxSender || this.isCrossDomain && B.msie <= 9)
            return this.sendWithAjaxSender.apply(this, arguments);
        var r = new XMLHttpRequest, i = this.headers
        , s = this.body ? this.body instanceof Object && JSON.stringify(this.body) || this.body: null, o;
        r.open(this.type, this.url, this.isAsync), r.owner = this, r.onreadystatechange = this._readyStateChangeFunction, r.withCredentials = YES;
        for (o in i)
            i.hasOwnProperty(o) && r.setRequestHeader(o, i[o]);
        return r.send(s), this._transport = r, this
    },
    sendWithAjaxSender: function() {
        var e = this.ajaxSenderFrames, t = e[this.origin] || (e[this.origin] = Core.AjaxSenderFrame.create({
            origin: this.origin
        }));
        t.sendRequest(this)
    },
    _readyStateChangeFunction: function() {
        if (this.readyState !== 4)
            return;
        this.owner.didReceiveResponse(this)
    },
    hasPausedExecution: function() {
        return !!this._pauseToken
    }.property(),
    resumeExecution: function() {
        if (!this.get("hasPausedExecution"))
            return;
        var e = this._pauseToken;
        this._pauseToken = null, Core.warn("%@: Resuming execution.".fmt(this)), e.resume()
    },
    _pauseExecution: function(e) {
        this._pauseToken = e, this.get("delegateValue").requestDidPauseExecution(this)
    },
    didReceiveResponse: function(e) {
        this._xhr = e;
        var t = this.get("delegateValue"), n = t.requestDelayForResponse(this, e);
        if (!n)
            return this._handleReceivedResponse(e);
        var r = this;
        setTimeout(function() {
            r._handleReceivedResponse(e)
        }, n)
    },
    _handleReceivedResponse: function(e) {
        if (this.get("isCancelled")) {
            Core.Request.trace && Core.warn("%@: Request has been cancelled. Unable to handle received response".fmt(this));
            return 
        }
        if (this.autoJSONParse&&!e.responseObject)
            try {
                var t = e.responseText;
                t && (e.responseObject = JSON.parse(t))
        } catch (n) {
            Core.debug("Could not parse the responseText as JSON for " + this + ": ", n)
        }
        var r = this.get("delegateValue");
        r.requestDidRecieveResponse(this, e);
        if (r.requestShouldPauseHandlingOfReceivedResponse
        (this, e)) {
            this._pauseExecution(Core.Request._PauseToken.create({
                request: this,
                response: e,
                resumeAction: function() {
                    this.request._finalizeHandlingOfReceivedResponse(this.response)
                }
            })), Core.warn("%@: Handling of received response has been paused.".fmt(this));
            return 
        }
        this._finalizeHandlingOfReceivedResponse(e)
    },
    _finalizeHandlingOfReceivedResponse: function(e) {
        e.status !== 200 ? (this.set("resolution", "error"), this.trigger("error" + e.status, e), this._stoppedError || this.trigger("error", e)) : (this.set("resolution", "success"), this.trigger("success", e))
    },
    _computeOriginAndDecideCrossDomain: function() {
        var e = location, t = e.protocol + "//" + e.host, n = this.url, r = n.indexOf("://"), i = r!==-1 ? n.substring(0, n.indexOf("/", r + 3)): t;
        this.set("origin", i), this.set("isCrossDomain", t !== i), !this.isAsync && this.isCrossDomain && Core.warn("Warning: A cross-domain, synchronous request was just created.", "Though possible with browsers that support CORS, the request will", "be asynchronous in MSIE <= 9 due to reliance on the postmessage API", "to communicate with the ajax_sender iframe.")
    }.observes("init"),
    stopError: function() {
        this._stoppedError = YES
    },
    _decideRequestId: function() {
        this.requestId || this.set("requestId", this.toString().slice(1, - 1))
    }.observes("init"),
    _writeContentTypeHeader: function() {
        if (!this.contentType)
            return;
        var e = this.ensureOwn("headers");
        if (e["Content-Type"])
            return;
        e["Content-Type"] = this.contentType
    }.observes("init"),
    toString: function() {
        return "[Core.Request: %@]".fmt(this.coreGuid)
    }
})), Core.Request.send = function() {
    var e = this.create.apply(this, arguments);
    return e.send(), e
}, Core.define("AjaxSenderFrame", Core.Object.
extend({
    isReady: NO,
    path: "/ajax_sender.html",
    origin: null,
    prepareScaffolding: function() {
        this._inflightRequests = {};
        var e = document.createElement("iframe"), t = this;
        e.setAttribute("frameBorder", 0), e.setAttribute("width", 0), e.setAttribute("height", 0), e.style.cssText = "position:absolute; left:-10000px; top:-10000px; visibility:hidden; z-index:-1;", e.id = "AjaxSenderFrame" + this.coreGuid, e.onload = e.onreadystatechange = function() {
            if (this.readyState && this.readyState !== "loaded" && this.readyState !== "complete")
                return;
            this.onreadystatechange = null, t.setIfChanged("isReady", YES)
        }, e.setAttribute("src", this.origin + this.path), document.body.appendChild(e), this.set("frame", e), Core.addEvent(window, "message", function(e) {
            t._didReceiveResponseMessage(e)
        })
    }.observes("init"),
    _didReceiveResponseMessage: function(e) {
        if (e.origin !== this.origin)
            return;
        var t = JSON.parse(e.data), n = t.requestId, r = this._inflightRequests[n];
        if (!r) {
            Core.debug("AjaxSenderFrame (" + this.origin + "): Received a response from iframe, but can't find a request to which to pass it.");
            return 
        }
        r.didReceiveResponse(t)
    },
    sendRequest: function(e) {
        if (!e)
            return;
        if (e.origin !== this.origin)
            return Core.warn("Can't use AjaxSenderFrame for " + this.origin + " to send request to " + e.origin + ".");
        this.isReady ? this._sendRequest(e) : (this._pendingReqs || (this._pendingReqs = [])).push(e)
    },
    flushPendingReqs: function() {
        if (!this.isReady)
            return;
        for (var e = 0, t = this._pendingReqs, n; n = t && t[e]; e++)
            this._sendRequest(n);
        t.length = 0
    }.observes("isReady"),
    _sendRequest: function(e) {
        try {
            this.frame.contentWindow.postMessage(JSON.stringify({
                requestId: e.requestId,
                url: e.url,
                type: e.type,
                headers: e.headers
                ,
                body: e.body,
                isAsynchronous: YES
            }), this.origin), this._inflightRequests[e.requestId] = e
        } catch (t) {
            Core.warn("AjaxSenderFrame (" + this.origin + "): Error while attempting to postMessage into the iframe. ", t)
        }
    },
    logMe: function() {
        Core.debug("Setting up cross-domain AjaxSenderFrame for origin " + this.origin)
    }.observes("init")
})), Core.Request.reopen({
    _json2CodeStatus: window.JSON2CodeStatus = {
        isRequired: !(window.JSON && JSON.stringify && JSON.parse),
        isReceived: NO,
        isRequested: NO,
        queue: null,
        ensureRequested: function() {
            if (this.isRequested === (this.isRequested = YES))
                return;
            Core.debug("Appending script tag for the JSON2 code.");
            var e = this.script = document.createElement("script");
            e.setAttribute("type", "text/javascript"), e.setAttribute("src", "/applications/journal/16CProject51/quark/16CProject51/en-us/resources/json2"), document.body.appendChild(e)
        },
        didReceive: function() {
            Core.debug("JSON2 code is obtained. Launching any queued requests.");
            var e, t, n = this.queue;
            this.isReceived = YES;
            for (e = 0; t = n[e]; e++)
                t.send()
        }
    },
    send: function() {
        var e = this._json2CodeStatus;
        if (e.isRequired&&!e.isReceived) {
            (e.queue || (e.queue = [])).push(this), e.ensureRequested();
            return 
        }
        arguments.callee.base.apply(this, arguments)
    }
}), Core.define("View", Core.Object.extend({
    className: "View",
    isView: YES,
    tagName: "div",
    ariaRole: undefined,
    ariaLabel: undefined,
    tabIndex: undefined,
    classNames: "view".w(),
    classNamesOverride: "concatenate",
    initiallyAppended: YES,
    isAppended: NO,
    isAppendedInWindow: NO,
    CACHE_LAYER_EXAMPLE_IMMEDIATELY: !!B.mobile,
    DO_NOT_CACHE_LAYER_EXAMPLES: NO,
    static__htmlSpawner: function() {
        var e = document.createElement("div");
        return e.elementFromHTML = B.msie ?
        function(e) {
            return this.innerHTML = e, this.firstChild.cloneNode(!0)
        } : function(e) {
            return this.innerHTML = e, this.firstChild
        }, e
    }(),
    init: function() {
        arguments.callee.base.apply(this, arguments);
        var e, t, n, r, i, s, o = this.CACHE_LAYER_EXAMPLE_IMMEDIATELY;
        (r = this.rootHTML) ? (s = this._rootHTMLUniqueAncestor || this, o&&!s._rootHTMLExample && (s._rootHTMLExample = Core.View._htmlSpawner.elementFromHTML(r)), (i = s._rootHTMLExample) && i!==!0 && (t = this.layer = i.cloneNode(!0)), t || (t = this.layer = Core.View._htmlSpawner.elementFromHTML(r)), s && i===!0 && (i = s._rootHTMLExample = t.cloneNode(!0)), s&&!i && (i = s._rootHTMLExample=!0)) : t = this.layer = document.createElement(this.tagName), this.set("isRenderingLayer", YES), this.layer.id = "View" + this.coreGuid;
        if (e = this.classNames && this.classNames.join(" "))
            t.className += (t.className ? " " : "") + e;
        this._resolveInitialElements(), this.ariaRole && this.layer.setAttribute("role", this.ariaRole), this.render(t), this._initializeChildViews(), this._initializeEventListeners(), this.trigger("render"), this.set("isRenderingLayer", NO)
    },
    updateToTabIndex: function() {
        if (!this.layer)
            return;
        var e = this.tabIndex;
        e || e === 0 ? this.layer.setAttribute("tabindex", this.tabIndex) : this.layer.removeAttribute("tabindex")
    }.observes("tabIndex", "render"),
    updateToAriaLabel: function() {
        if (!this.layer)
            return;
        var e = Core.escapeHTML(this.ariaLabel);
        e && this.layer.setAttribute("aria-label", e)
    }.observes("ariaLabel", "render"),
    applyBackgroundColor: function() {
        if (!this.layer)
            return;
        var e = this.backgroundColor;
        e && (this.layer.style.backgroundColor = e || "")
    }.observes("backgroundColor", "render"),
    "*ViewOverride": function(e, t, n) {
        if (!e ||!e.isClass)
            return e
            ;
        var r = this.ensureOwn("initialChildViews") || (this.initialChildViews = []);
        return r.push(n), e
    },
    "*ElementOverride": function(e, t, n) {
        e === null && this.initialElements && this.initialElements.remove(t);
        if (typeof e != "string")
            return e;
        var r = this.ensureOwn("initialElements") || (this.initialElements = []), i = n.slice(0, - 7);
        return r.remove(i), r.push(i), e
    },
    rootHTMLOverride: function(e, t, n) {
        return this._isCreating ? this._rootHTMLUniqueAncestor = undefined : (this._rootHTMLUniqueAncestor = this._type, this._type._rootHTMLExample = undefined), e
    },
    _resolveInitialElements: function() {
        for (var e = 0, t = this.initialElements, n; n = t && t[e]; e++)
            this[n] = this.getPath(this[n + "Element"])
    },
    _initializeChildViews: function() {
        for (var e = 0, t, n = this.initialChildViews, r; n && (r = n[e]); e++)(t = this[r]) 
            && t.isClass && (t = this[r] = t.create({
                owner: this
            })) && t.initiallyAppended && t.appendTo(this)
    },
    stopPropagatingEvent: function(e) {
        Core.stopPropagatingEvent(e)
    },
    _initializeEventListeners: function() {
        var e = this, t = this.layer, n = Core.View, r = null, i = Core.addEvent;
        !this.layerFocused || i(t, "focus", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.layerFocused(t)
        }), B.mobile ? (!this.touchStart || i(t, "touchstart", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.touchStart(t || window.event)
        }, !1), !this.touchEnd || i(t, "touchend", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.touchEnd(t || window.event)
        }, !1), !this.touchMove || i(t, "touchmove", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.touchMove(t || window.event)
        }, !1), !this.touchCancel || i(t, "touchcancel", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.touchCancel(t || window.event)
        }, !1))
        : (!this.mouseEntered || i(t, "mouseover", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.mouseEntered(t || window.event)
        }), !this.mouseExited || i(t, "mouseout", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.mouseExited(t || window.event)
        }), !this.mouseClick || i(t, "click", function(t) {
            var r;
            if (!(r = n._mouseDownOn) || r === e)
                return e.mouseClick(t || window.event)
        }), !this.mouseMove || i(t, "mousemove", function(t) {
            var r;
            if (!n._mouseDownOn)
                return e.mouseMove(t || window.event)
        }), !this.mouseDown || i(t, "mousedown", function(t) {
            if (n._mouseDownOn)
                return;
            n._mouseDownOn = e, $(document.body).addClass("mouse-down");
            var i, s = Core.getStyle(e.layer, "cursor");
            s && $(document.body).addClass(n._forcedCursor = "cursor-" + s), document.onmouseup = r, e.mouseMove && (document.onmousemove = e._boundMove || (e._boundMove = function(t) {
                return e.mouseMove(t)
            }));
            if (e.mouseDown)
                return e.mouseDown(t)
        }), r = function(t) {
            n.allowFutureMouseDown();
            if (e.mouseUp)
                return e.mouseUp(t || window.event)
        })
    },
    static_allowFutureMouseDown: function() {
        $(document.body).removeClass("mouse-down").removeClass(this._forcedCursor), this._mouseDownOn = null, this._forcedCursor = null, document.onmouseup = null, document.onmousemove = null
    },
    render: function(e) {},
    append: function(e) {
        return this.appendTo(e || this._previousParent || this.owner || document.body)
    },
    appendTo: function(e) {
        if (!e)
            return this;
        !e.isView || (e = e[this.appendInto] || e.container || e.layer);
        var t = this._parent;
        return t && t !== e && (this.remove(), t = null), t || (this.trigger("willAppend"), e.appendChild(this.layer)), this._previousParent = this._parent = e, this.setIfChanged("isAppended", YES), this
    },
    remove: function() {
        if (!this.layer)
            return this
            ;
        this.layer.parentNode && (this.trigger("willRemove"), this.layer.parentNode.removeChild(this.layer));
        var e = this._parent;
        return this._parent = null, e && this.setIfChanged("isAppended", NO), this
    },
    killSelectionAndDragInIE: B.msie ? function() {
        this.layer.onselectstart = this.layer.ondragstart = this._NO_RETURNER
    }.observes("render"): undefined,
    _updateToIsAppended: function() {
        if (this._appendRemove_lastIsAppended === (this._appendRemove_lastIsAppended = this.isAppended))
            return;
        this.isAppended ? this.append() : this.remove()
    }.observes("isAppended"),
    computeAppendednessInWindow: function() {
        var e = this.owner;
        window.appendedness = (window.appendedness || 0) + 1, this.setIfChanged("isAppendedInWindow", e ? e.isAppendedInWindow && this.isAppended : this._parent === document.body)
    }.observes(".owner.isAppendedInWindow", "isAppended"),
    _view_finalCleanup: function() {
        this.remove()
    }.observes("destroy"),
    _NO_RETURNER: function() {
        return NO
    }
})), require("views/_view"), Core.mixin({
    announce: function(e) {
        if (!this._screenreaderAnnouncerView)
            return;
        this._screenreaderAnnouncerView.announce(e)
    },
    ScreenreaderAnnouncerView: Core.View.extend({
        classNames: "screenreader-announcer".w(),
        _IGNORE_OBSERVATION_WARNINGS_FOR_PATHS: {
            "#owner": YES
        },
        makeMeAnAnnouncer: function() {
            this.layer.setAttribute("aria-live", "polite")
        }.observes("render"),
        announce: function(e) {
            if (!this.layer)
                return;
            this._lastAnnouncedText === (this._lastAnnouncedText = e) && (this.layer.innerText = ""), this.layer.innerText = e || ""
        }
    }),
    _createAnnouncer: function() {
        this._screenreaderAnnouncerView = Core.ScreenreaderAnnouncerView.create().appendTo(document.body)
    }.observes("finalizeCore")
}), Core.textMeasurer = Core.View.
create({
    rootHTML: '<div class="text-measurer"></div>',
    _IGNORE_OBSERVATION_WARNINGS_FOR_PATHS: {
        "#owner": YES
    },
    canUseCanvas: NO,
    _vessel: {},
    contextCache: {},
    init: function() {
        var e = this._canvas = document.createElement("canvas"), t = this._context = e.getContext && e.getContext("2d");
        e.width = e.height = 1, this.canUseCanvas=!!(e && t && t.fillText && t.measureText), arguments.callee.base.apply(this, arguments)
    },
    attachOnLoad: function() {
        this.appendTo(document.body)
    }.observes("Core.finalizeCore"),
    metricsForString: function(e, t, n) {
        if (!this.layer)
            return;
        var r = this.layer, i = this._vessel;
        return r.innerHTML = e, r.style.cssText = t ? "font:" + t + ";" : "", n ? r.style.maxWidth = n + "px" : r.style.maxWidth = "", i.width = r.offsetWidth, i.height = r.offsetHeight, i
    },
    widthForString: function(e, t, n) {
        if (n ||!this.canUseCanvas || e.indexOf("<")!==-1)
            return this.metricsForString(e, t, 0).width;
        var r = this.contextCache[t] || (this.contextCache[t] = this._contextForFontString(t));
        return r.measureText(e).width
    },
    _contextForFontString: function(e) {
        var t = document.createElement("canvas"), n = t.getContext("2d");
        return t.width = t.height = 1, n.font = e, n
    }
}), Core.metricsForString = function() {
    return Core.textMeasurer.metricsForString.apply(Core.textMeasurer, arguments)
}, Core.widthForString = function() {
    return Core.textMeasurer.widthForString.apply(Core.textMeasurer, arguments)
}, Core.mixin({
    compareVersions: function(e, t) {
        e = Core.parseVersion(e), t = Core.parseVersion(t);
        var n, r, i, s = Math.max(e.length, t.length);
        for (n = 0; n < s; n++) {
            r = e[n] || 0, i = t[n] || 0, r < 0 && i < 0 && (r =- r, i =- i);
            if (r < i)
                return - 1;
            if (r > i)
                return 1
        }
        return 0
    },
    parseVersion: function(e) {
        e || (e = "0"), e = e.split("b");
        var t = e[1];
        e = e[0].split(".");
        for (
        var n = 0, r, i; r = e[n]; n++)
            r == (i = parseInt(r, 10)) && (e[n] = i);
        return t && (e = e.concat([ - t])), e
    }
}), Core.mixin({
    setUpWindowScrollTracking: function() {
        return Core.addEvent(window, "scroll", function() {
            Core._windowDidScroll()
        }), arguments.callee
    }(),
    _windowDidScroll: function() {
        this.trigger("windowScroll")
    }
}), Core.mixin({
    minWindowWidth: 0,
    windowZoom: 1,
    _lastWindowZoom: 1,
    setUpWindowSizeTracking: function() {
        this.windowSize = {}, this.actualWindowSize = {}, window.windowResizeTimes = [];
        var e = this, t = this._windowDidResize, n = this._windowDidResize = function() {
            var r = new Date * 1, i = t.apply(e, arguments);
            return window.windowResizeTimes.push(new Date * 1 - r), i
        };
        Core.addEvent(window, "resize", n, !0), B.iOS && Core.addEvent(window, "orientationchange", n, !0), B.iOS >= 7 && setInterval(n, 500), (this._windowDidResize(!0) === 1 || B.mobile) && Core.listen("windowDidLoad", n)
    },
    _windowDidResize: function(e) {
        var t = this.windowSize, n = window, r = document, i, s, o;
        if (!r.body ||!r.documentElement)
            return 1;
        var u = window.orientation, a = n.innerWidth || r.documentElement.clientWidth || r.body.clientWidth, f = n.innerHeight || r.documentElement.clientHeight || r.body.clientHeight, l = B.standalone;
        if (s = Core.windowSizeOverride)!isNaN(s.width) && (a = s.width), !isNaN(s.height) && (f = s.height), !isNaN(s.orientation) && (u = s.orientation), s.hasOwnProperty("standalone") && (l = s.standalone);
        B.desktop && (Core.minWindowWidth && a < Core.minWindowWidth ? (o = a, a = Core.minWindowWidth, Core.bodyOverflowArbitrator.requestVisible(this, !0)) : Core.bodyOverflowArbitrator.withdrawRequest(this)), B.onlyiOS ? (B.iPad && u%180 === 0 && window.innerWidth > window.innerHeight && (u = 90), B.iOS < 7 ? u%180 ? B.iPad ? (t.width = 1024, t.height = Math.max
        (f, 644), B.iOS < 7 && f <= 768 && (this._tallestLandscape > t.height || (this._tallestLandscape = t.height), t.height = this._tallestLandscape)) : B.iPhone && (t.width = Math.max(a, 480), t.height = Math.max(f, 268), B.iOS < 7 && (this._widestLandscape > t.width || (this._widestLandscape = t.width), t.width = this._widestLandscape), B.iOS < 7 && f <= (l ? 320 : 268) && (this._tallestLandscape > t.height || (this._tallestLandscape = t.height), t.height = this._tallestLandscape)) : (B.iPad ? (t.height = Math.max(f, 900), t.width = 768) : B.iPhone && (t.height = Math.max(f, B.iPhone5 ? 504 : 416), t.width = 320), B.iOS < 7 && (this._tallestPortrait > t.height || (this._tallestPortrait = t.height), t.height = this._tallestPortrait)) : (t.width = a, t.height = f), this._lastOrientation !== (this._lastOrientation = u) && e!==!0 && (p = YES), this.windowOrientation = u, this.windowZoom = t.width / a, this._originalMaxGPUTextureSize || (this._originalMaxGPUTextureSize = this.maxGPUTextureSize), this.maxGPUTextureSize = this._originalMaxGPUTextureSize / this.windowZoom) : (t.width = a, t.height = f);
        var c = NO, h, p;
        c = c||!!o, c = c || this._lastWindowWidth !== (this._lastWindowWidth = t.width), c = c || this._lastWindowHeight !== (this._lastWindowHeight = t.height), c = c || (h = this._lastWindowZoom !== (this._lastWindowZoom = this.windowZoom));
        if (!c || e===!0)
            return;
        Core.hideIOSAddressBar(100), this.actualWindowSize.width = o || this.windowSize.width, this.actualWindowSize.height = this.windowSize.height;
        if (B.msie <= 8) {
            if ((i = Core._ie8WSFreebies) >= 3)
                return clearTimeout(this._ie8WindowSizeTimeout), this._ie8WindowSizeTimeout = setTimeout(function() {
                    Core.trigger("windowSize")
                }, 10);
            Core._ie8WSFreebies = (i || 0) + 1
        }
        h && this.trigger("windowZoom"), this.trigger("windowSize")
    }.observes
    ("minWindowWidth"),
    maintainOrientationClassesOnBody: function() {
        if (!B.mobile)
            return;
        var e = Core.windowOrientation%180, t = e ? "landscape": "portrait", n = e ? "portrait": "landscape";
        $(document.body).addClass(t), $(document.body).removeClass(n)
    }.observes("windowSize")
}), Core.setUpWindowSizeTracking(), Core.ButtonView = Core.View.extend(Core.ButtonnessMixin = {
    isMixin: YES,
    className: "ButtonView",
    ariaRole: "button",
    classNames: "button".w(),
    useHoverOnMobile: NO,
    actionDelay: 10,
    isPurelyDecorative: NO,
    allowsScrolling: NO,
    isEnabled: YES,
    isActive: NO,
    isOver: NO,
    isDown: NO,
    allowEventPropogation: !0,
    action: function() {},
    init: function() {
        if (!this.isPurelyDecorative)
            return arguments.callee.base.apply(this, arguments);
        for (var e = 0, t = this._buttonnessKeys, n; n = t[e]; e++)
            this[n] = undefined;
        return this.ariaRole === "button" && (this.ariaRole = undefined), arguments.callee.base.apply(this, arguments)
    },
    touchStart: function(e) {
        return this.mouseDown(e)
    },
    touchEnd: function(e) {
        var t = this.mouseUp(e);
        return this.mouseExited(), t
    },
    touchMove: function(e) {
        this.allowsScrolling ? this.touchCancel(e) : this.stopPropagatingEvent(e)
    },
    touchCancel: function(e) {
        return this.mouseExited(), this.mouseUp(e)
    },
    mouseEntered: function() {
        if (!this.isEnabled)
            return;
        this.setIfChanged("isOver", YES)
    },
    mouseExited: function() {
        this.setIfChanged("isOver", NO)
    },
    mouseDown: function(e) {
        this.allowEventPropogation || this.stopPropagatingEvent(e);
        if (!this.isEnabled)
            return;
        this.mouseEntered(), this.setIfChanged("isDown", YES)
    },
    mouseUp: function(e) {
        this.allowEventPropogation || this.stopPropagatingEvent(e);
        var t = this, n = t.actionDelay;
        t.isEnabled && t.isActive && (n ? setTimeout(function() {
            t.performActions(e
            )
        }, n) : this.performActions(e)), t.setIfChanged("isDown", NO)
    },
    mouseClick: function(e) {
        this.allowEventPropogation || this.stopPropagatingEvent(e)
    },
    _buttonnessKeys: "touchStart touchEnd touchMove touchCancel mouseEntered mouseExited mouseDown mouseUp".w(),
    performActions: function(e) {
        this.action(e), this.trigger("action", e)
    },
    chooseTabIndex: function() {
        if (this.isPurelyDecorative)
            return;
        isNaN(this.tabIndex) && this.setIfChanged("tabIndex", !this.isPurelyDecorative && this.isEnabled ? 0 : - 1)
    }.observes("render", "isPurelyDecorative", "isEnabled"),
    setActive: function() {
        this.setIfChanged("isActive", this.isDown && this.isOver)
    }.observes("isDown", "isOver"),
    classActive: function() {
        if (!this.layer || this._lIA === (this._lIA=!!this.isActive))
            return;
        $(this.layer)[this.isActive ? "addClass": "removeClass"]("active")
    }.observes("isActive", "render"),
    classOver: function() {
        if (!this.layer || this._lIO === (this._lIO=!!this.isOver) || B.mobile&&!this.useHoverOnMobile)
            return;
        $(this.layer)[this.isOver ? "addClass": "removeClass"]("hover")
    }.observes("isOver", "render"),
    classSelected: function() {
        if (!this.layer || this._lIS === (this._lIS=!!this.isSelected))
            return;
        $(this.layer)[this.isSelected ? "addClass": "removeClass"]("sel")
    }.observes("isSelected", "render"),
    classDisabled: function() {
        if (!this.layer || this._lIE === (this._lIE=!!this.isEnabled))
            return;
        $(this.layer)[this.isEnabled ? "removeClass": "addClass"]("disabled")
    }.observes("isEnabled", "render")
}), Core.define("TransitionerView", Core.View.extend({
    transitioners: null,
    allowInterruption: NO,
    transitioningOverflow: "hidden",
    steadyStateOverflow: "visible",
    _immediateTransition: Core.Object.extend({
        start: function()
        {
            var e = this.frView, t = this.toView;
            e && e.remove(), t && t.append(this.owner), this.owner.didFinishTransition()
        }
    }),
    finishTransitioning: function() {
        var e;
        (e = this.transitioner) && e.finish(), (e = this.transitioner) && e.finish()
    },
    transitionToCurrentView: function() {
        if (this._isRestoringPreviousViewAfterCancel)
            return;
        var e = this.transitioner;
        if (e) {
            if (!this.allowInterruption) {
                this._pendingTransitionView = this.currentView, this.currentView = this.previousView, e.__speedFactor__ = 3, e.duration/=e.__speedFactor__, e._restoreDuration || e.listen("finish", e._restoreDuration = function() {
                    this.duration*=this.__speedFactor__, this.__speedFactor__ = 1
                });
                return 
            }
            e.finish()
        }
        this._pendingTransitionView = null;
        var t = this.currentView, n = this.previousView, r = t && t.typeInteger || 0, i = n && n.typeInteger || 0, s = this.transitioners, o = s && s[r], u = o && o[i] || this.defaultTransition || this._immediateTransition, a = this._transitionerInstances;
        e = a[Core.guidFor(u)] || (a[u.coreGuid] = u.create({
            owner: this
        })), this.setIfChanged("previousView", t), this.trigger("willRunTransition", n, t, e), n && n.trigger("willEnterTransition", n, t, e), t && t.trigger("willEnterTransition", n, t, e), t && t.setIfChanged("isShowing", YES), n && n.trigger("didEnterTransition", n, t, e), t && t.trigger("didEnterTransition", n, t, e), this.trigger("didRunTransition", n, t, e), e.frView = n, e.toView = t, this.set("transitioner", e), e.start()
    }.observes("currentView"),
    didFinishTransition: function() {
        var e = this.transitioner;
        this.set("transitioner", null);
        if (!e)
            return;
        var t = e.frView, n = e.toView;
        this.trigger("willFinishRunningTransition", t, n, e), t && t.trigger("willFinishTransition", t, n, e), n && n.trigger("willFinishTransition", t, n, e), t && t
        .setIfChanged("isShowing", NO), t && t.trigger("didFinishTransition", t, n, e), n && n.trigger("didFinishTransition", t, n, e), this.trigger("didFinishRunningTransition", t, n, e);
        var r = this._pendingTransitionView, i = this;
        r && setTimeout(function() {
            i.setIfChanged("currentView", r)
        }, 0)
    },
    didCancelTransition: function() {
        var e = this.transitioner;
        this.set("transitioner", null);
        var t = e.frView, n = e.toView;
        t && t.trigger("didCancelTransition", t, n, e), n && (n.setIfChanged("isShowing", NO), n.trigger("didCancelTransition", t, n, e)), this.trigger("didCancelRunningTransition", t, n, e), this._isRestoringPreviousViewAfterCancel = YES, this.setIfChanged("currentView", t), this.setIfChanged("previousView", t), this._isRestoringPreviousViewAfterCancel = NO;
        var r = this._pendingTransitionView, i = this;
        r && setTimeout(function() {
            i.setIfChanged("currentView", r)
        }, 0)
    },
    hideScrollbars: function() {
        this.layer.style.overflow = this.transitioningOverflow
    }.observes("willRunTransition"),
    unhideScrollbars: function() {
        this.layer.style.overflow = this.steadyStateOverflow
    }.observes("didFinishRunningTransition", "render"),
    _transitionerInstances: function() {
        this._transitionerInstances = {}
    }.observes("init")
})), function() {
    var e, t, n, r, i, s, o, u, a;
    Core.transitionBank = {
        liftTo: (t = (e = Anim.Animation.extend({
            duration: 700,
            tween: Anim.tweens.make("compound", "WEBKIT_EASE", "SINE_IN_OUT"),
            shadowHeight: 300,
            shouldUseShadow: YES,
            provideDelayAfterFinish: function() {
                var e = this;
                setTimeout(function() {
                    e.trigger("delayAfterFinish")
                }, 0)
            }.observes("finish"),
            _dropHeight: function() {
                return Core.windowSize.height + this.shadowHeight
            },
            start: function() {
                return this._forcedZeroes = 3, arguments.callee.base.apply(this
                , arguments)
            },
            update: function() {
                var e = this.slideView.layer.style, t = this._shadow && this._shadow.style, n;
                !this.disableGPU && Core.useGPUForBigs && Core.windowSize.width <= Core.maxGPUTextureSize ? (n = "0px", e.top === n || (e.top = n), t && (t.top === n || (t.top = n)), e.webkitTransform = "translate3d(0," + this.current + "px,0)", t && (t.webkitTransform = "translate3d(0," + (this.current - this.shadowHeight) + "px,0)")) : (e.top = Math.round(this.current) + "px", t && (t.top = Math.round(this.current - this.shadowHeight) + "px")), e.position === "fixed" || (e.position = "fixed"), t.position === "fixed" || (t.position = "fixed")
            },
            cleanUpFixedness: function() {
                if (this.get("_shouldFromViewPersist"))
                    return;
                this.slideView.layer.style.position = ""
            }.observes("finish"),
            cleanUpGPULayer: function() {
                if (this.get("_shouldFromViewPersist"))
                    return;
                this.slideView.layer.style.webkitTransform = "", this._shadow && (this._shadow.style.webkitTransform = "")
            }.observes("finish"),
            appendToWhenBegin: function() {
                this.toView && this.toView.append(this.owner)
            }.observes("start"),
            removeFrWhenDone: function() {
                this.frView&&!this.get("_shouldFromViewPersist") && this.frView.remove()
            }.observes("finish"),
            _shouldFromViewPersist: function() {
                var e = this.frView;
                return e ? e.getPath("shouldPersistAfterTransitionTo." + this.getPath("toView.typeInteger")) || e.getPath("shouldPersistAfterTransitionTo._default") : NO
            }.property(),
            tellWorkspaceDone: function() {
                this.owner.didFinishTransition()
            }.observes("delayAfterFinish"),
            addShadow: function() {
                if (!this.shouldUseShadow)
                    return;
                var e;
                (e = this._shadow) || (this._shadow = e = document.createElement("div"), e.className = "top-shadow", e.style.cssText = "z-index:500; position:absolute; left:0px; top:0px; width:100%; height:" +
                this.shadowHeight + "px;"), this.owner.layer.appendChild(e)
            }.observes("start"),
            removeShadow: function() {
                if (!this.shouldUseShadow)
                    return;
                var e = this._shadow;
                e && e.parentNode && e.parentNode.removeChild(e)
            }.observes("finish"),
            ensureCorrectZOrdering: function() {
                var e = this._runningZ || (this._runningZ = 10);
                this.sitView && (this.sitView.layer.style.zIndex = e), this.slideView && (this.slideView.layer.style.zIndex = e + 1), this._runningZ += 2
            }.observes("start")
        })).extend({
            to: 0,
            shouldRestoreOpacityAfterIOSPositionHack: YES,
            start: function() {
                return this.slideView = this.toView, this.sitView = this.frView, this.redirectFrom(this._dropHeight()), this.redirectTo(0), this.reset(), arguments.callee.base.apply(this, arguments)
            },
            pokeIOSToFixItsFixedness1: B.iOS ? function() {
                this.slideView.layer.style.opacity = 0, this._shadow && (this._shadow.style.opacity = 0)
            }.observes("start"): null,
            pokeIOSToFixItsFixedness2: B.iOS ? function() {
                this.slideView.layer.style.position = "absolute", this._shadow && (this._shadow.style.position = "absolute")
            }.observes("frame0"): null,
            pokeIOSToFixItsFixedness3: B.iOS ? function() {
                if (!this.shouldRestoreOpacityAfterIOSPositionHack)
                    return;
                this.slideView.layer.style.opacity = "", this._shadow && (this._shadow.style.opacity = "")
            }.observes("frame1"): null,
            trigger: function(e) {
                return e === "finish" && this.trigger("willFinish"), arguments.callee.base.apply(this, arguments)
            },
            rememberScrollOnSitView: function() {
                this.sitView.__lastLiftDropScrollTop__ = Core.lastScrollTop
            }.observes("willFinish"),
            scrollTopOnFinish: function() {
                if (this.get("_shouldFromViewPersist"))
                    return;
                Core.scrollTop(0)
            }.observes("delayAfterFinish")
        })).extend({}),
        dropFrom: (n = e.extend
        ({
            from: 0,
            start: function() {
                return this.slideView = this.frView, this.sitView = this.toView, this.redirectFrom(0), this.redirectTo(this._dropHeight()), this.reset(), arguments.callee.base.apply(this, arguments)
            },
            restoreScrollToSitViewPrevious: function() {
                Core.scrollTop(this.sitView.__lastLiftDropScrollTop__ || 0)
            }.observes("frame1")
        })).extend({}),
        xFadeTo: t.extend({
            duration: 350,
            shouldUseShadow: NO,
            shouldRestoreOpacityAfterIOSPositionHack: NO,
            update: function() {
                if (!this.slideView)
                    return;
                var e = this.slideView.layer.style;
                !this.disableGPU && Core.useGPUForBigs && Core.windowSize.width <= Core.maxGPUTextureSize ? e.webkitTransform === "translate3d(0,0,0)" || (e.webkitTransform = "translate3d(0,0,0)") : e.webkitTransform === "" || (e.webkitTransform = ""), e.opacity = this.progress, e.position === "fixed" || (e.position = "fixed")
            }
        }),
        xFadeFrom: n.extend({
            duration: 350,
            shouldUseShadow: NO,
            shouldRestoreOpacityAfterIOSPositionHack: NO,
            update: function() {
                if (!this.slideView)
                    return;
                var e = this.slideView.layer.style;
                !this.disableGPU && Core.useGPUForBigs && Core.windowSize.width <= Core.maxGPUTextureSize ? e.webkitTransform === "translate3d(0,0,0)" || (e.webkitTransform = "translate3d(0,0,0)") : e.webkitTransform === "" || (e.webkitTransform = ""), e.opacity = 1 - this.progress, e.position === "fixed" || (e.position = "fixed")
            }
        }),
        slideRight: s = (i = Anim.Animation.extend({
            duration: 350,
            disableGPU: NO,
            start: function() {
                return this._originalDuration || (this._originalDuration = this.duration), this.duration = this._originalDuration, this.useGPU=!this.disableGPU && Core.useGPUForBigs && Core.windowSize.width <= Core.maxGPUTextureSize, !(B.s.chrome >= 19)&&!(B.s.mozilla >= 14)&&!(B.msie >= 9) && Core.useGPUForBigs &&
                Core.windowSize.width > Core.maxGPUTextureSize && (this.duration = 0), B.msie <= 8 && (this.duration = 0), this.recycle(), this._forcedZeroes = 3 + 5 * (!!B.safari&&!!B.windows), this._lastElapsedTime && this.duration && (this.duration = (this.duration * .75 + this._lastElapsedTime * .25) * .8 + .2 * this._originalDuration), this.redirectFrom(0), this.redirectTo(1), arguments.callee.base.apply(this, arguments)
            },
            updateDurationForNextTime: function() {
                this._lastElapsedTime = this.elapsedTime, this._lastElapsedTime < 100 && (this._lastElapsedTime = this._originalDuration)
            }.observes("finish"),
            appendToWhenBegin: function() {
                this.toView && this.toView.append(this.owner)
            }.observes("start"),
            removeFrWhenDone: function() {
                this.to === 1 && this.frView && this.frView.remove()
            }.observes("finish"),
            tellWorkspaceDone: function() {
                this.to === 1 && this.owner.didFinishTransition()
            }.observes("finish"),
            removeToWhenCanceled: function() {
                this.to === 0 && this.toView && this.toView.remove()
            }.observes("finish"),
            tellWorkspaceCanceled: function() {
                this.to === 0 && this.owner.didCancelTransition()
            }.observes("finish"),
            update: function() {
                var e = Core.windowSize.width, t = this.direction, n = this.current, r = this.frView, i = this.toView;
                this.useGPU ? (r && (r.layer.style.webkitTransform = "translate3d(" + n * e * t + "px,0,0)"), i && (i.layer.style.webkitTransform = "translate3d(" + (n * e * t - t * e) + "px,0,0)")) : (r && (r.layer.style.marginLeft = Math.round(n * e * t) + "px"), i && (i.layer.style.marginLeft = Math.round(n * e * t - t * e) + "px"))
            },
            cleanUp: function() {
                var e = this.frView, t = this.toView;
                e && (e.layer.style.marginLeft = ""), t && (t.layer.style.marginLeft = ""), e && (e.layer.style.webkitTransform = ""), t&&!this.owner.preserveUpSlideGPULayers && (t.layer.style
                .webkitTransform = "")
            }.observes("finish")
        })).extend({
            direction: 1.05
        }),
        slideLeft: o = i.extend({
            direction: - 1.05
        }),
        xFadeSlideRight: B.msie <= 8 ? s: (u = i.extend({
            update: function() {
                arguments.callee.base.apply(this, arguments);
                var e = this.frView, t = this.toView, n = this.current;
                e && (e.layer.style.opacity = 1 - n), t && (t.layer.style.opacity = n)
            },
            fixOpacities: function() {
                var e = this.frView, t = this.toView;
                e && (e.layer.style.opacity = ""), t && (t.layer.style.opacity = "")
            }.observes("finish")
        })).extend({
            direction: .2
        }),
        xFadeSlideLeft: B.msie <= 8 ? o: u.extend({
            direction: - 0.2
        })
    }
}(), Core.define("WorkspaceView", Core.TransitionerView.extend({
    classNames: "workspace full-width full-height".w(),
    _IGNORE_OBSERVATION_WARNINGS_FOR_PATHS: {
        "#owner": YES
    },
    makeViewsArray: function() {
        var e = this._nowShowingMap;
        if (!e)
            return;
        for (var t = 0, n = e.length; t < n; t++)
            e[t] = this[e[t]];
        this.set("isNSMapReady", YES)
    }.observes("render"),
    "*ViewOverride": function(e, t, n) {
        return (this.ensureOwn("_nowShowingMap") || (this._nowShowingMap = [])).push(n), arguments.callee.base.apply(this, arguments)
    },
    setCurrentViewFromNowShowing: function() {
        if (!this.isNSMapReady)
            return;
        this.setIfChanged("currentView", this._nowShowingMap[this.nowShowing])
    }.observes("nowShowing"),
    setClassName: function() {
        var e = this._lastClassNS, t = this.nowShowing;
        if (this._lastClassNS === (this._lastClassNS = t))
            return;
        window._removeRHTMLSpinner && window._removeRHTMLSpinner();
        if (!this.tabNames)
            return;
        $(this.layer).removeClass(this.tabNames[e]), $(this.layer).addClass(this.tabNames[t])
    }.observes("currentView"),
    setExplicitIOSLayerSize: B.iOS ? function() {
        this.layer.style.width = Core.windowSize.width + "px", this.layer.style.height =
        Core.windowSize.height + "px"
    }.observes("Core.windowSize", "render"): null,
    nowShowingZeroPlaceholderView: null
})), Core.addEvent(window, "load", function() {
    if (window.shouldAbortCore)
        return;
    Core.trigger("finalizeCore"), Core.trigger("windowDidLoad"), window.main instanceof Function && window.main()
}), require("utilities/error_catcher/error_handling"), function() {
    var e = NO;
    e || (Core.errorCatcher = Core.ErrorCatcher.create(), Core.errorCatcher.attach())
}(), CoreImage = Core.Namespace.create({}), CoreImage.InitialStateController = Core.Object.extend({
    params: null,
    paramKeys: [],
    baseUrl: null,
    semicolonDelimitedKeys: Core.emptyArray,
    paramsBase64Encoded: NO,
    discoverInitiallyKnownWindowLocation: function() {
        var e = window.location.toString();
        e.indexOf("%")!==-1 && window.decodeURIComponent && (e = window.decodeURIComponent(e)), this.initiallyKnownWindowLocation = e, this.trigger("didDiscoverInitiallyKnownWindowLocation")
    }.observes("init"),
    generateParams: function() {
        try {
            var e = this.initiallyKnownWindowLocation, t = e.indexOf("#") + 1, n = e.indexOf("?") + 1;
            if (!t && n) {
                window.location = e.substring(0, n - 1) + "#" + e.substring(n), Core.debug("About to redirect. Replacing '?' with '#'.");
                return 
            }
            var r = t ? e.substring(t): "", i = r.match(/\=(|\=)$/), s = r.indexOf("=") + 1;
            r && (!s || i) && r.indexOf(";")===-1 ? (r = Core.debase64(r), this.paramsBase64Encoded = YES) : this.paramsBase64Encoded = NO;
            var o = {}, u = {}, a = [], f = this.semicolonDelimitedKeys, l, c, h, p, d, v, m, g = function(e, t) {
                u[e] = t, !isNaN(p = parseFloat(t)) && p == t && (t = p);
                if (m = this["paramTransform_" + e])
                    t = m.call(this, t, o);
                o[e] = t, a.push(e)
            };
            if (r.indexOf("&")===-1 && r.indexOf(";")!==-1) {
                l = r.split(";");
                for (v = 0; (h = l[v]) !== undefined && (c = f[v]
                ); v++)
                    g.call(this, c, h)
                } else {
                l = r.split("&");
                for (v = 0; d = l[v]; v++) {
                    s = d.indexOf("=") + 1;
                    if (!s)
                        continue;
                    h = d.substring(s), c = d.substring(0, s - 1), g.call(this, c, h)
                }
            }
            this._unmodifiedParams = u, this.set("params", o), this.set("paramKeys", a)
        } catch (y) {
            this.trigger("paramsParseDidErr"), this.set("params", {}), this.set("paramKeys", [])
        }
    }.observes("init"),
    retrieveBaseUrl: function() {
        var e = window.location.toString();
        this.set("baseUrl", e.substring(0, (e.indexOf("#") + 1 || Infinity) - 1) + "#")
    }.observes("init")
}), CoreImage.SlideshowController = Core.Object.extend({
    isPlaying: NO,
    delay: 3e3,
    itemSet: null,
    currentItem: null,
    selectNext: function() {
        if (!this.itemSet)
            return;
        if (!this.currentItem)
            return this.set("currentItem", this.itemSet[0]);
        this.set("currentItem", this.itemSet[(this.itemSet.indexOf(this.currentItem) + 1)%this.itemSet.length]), this.isPlaying && this.scheduleNext()
    },
    selectPrevious: function() {
        if (!this.itemSet)
            return;
        if (!this.currentItem)
            return this.set("currentItem", this.itemSet[this.itemSet.length - 1]);
        this.set("currentItem", this.itemSet[(this.itemSet.indexOf(this.currentItem) - 1 + this.itemSet.length)%this.itemSet.length]), this.isPlaying && this.scheduleNext()
    },
    toggleShow: function() {
        this.isPlaying ? this.stopShow() : this.startShow()
    },
    stopShow: function() {
        this.setIfChanged("isPlaying", NO), clearTimeout(this._timeout), this._timeout = undefined
    }.observes("CoreImage.exitedFullScreenMode"),
    startShow: function() {
        this.setIfChanged("isPlaying", YES), this.scheduleNext(.15)
    },
    announcePlaying: function() {
        Core.debug(this.isPlaying ? "Started Slideshow" : "Stopped Slideshow");
        var e = "_Accessibility.SlideshowStarted", t = "_Accessibility.SlideshowPaused"
        , n = e.loc(), r = t.loc();
        if (e === n || t === r)
            return;
        Core.announce(this.isPlaying ? n : r)
    }.observes("isPlaying"),
    scheduleNext: function(e) {
        var t = this;
        clearTimeout(this._timeout), this._timeout = setTimeout(function() {
            t.selectNext(), t.isLoading ? Core.debug("Slideshow playing. Item not ready. Waiting for item.") : (Core.debug("Slideshow playing. Selected next item. Item is ready already. Scheduling next selectNext()."), t.scheduleNext())
        }, e ? e * this.delay : this.delay)
    },
    itemDidLoad: function() {
        if (this.isLoading)
            return;
        if (!this.isPlaying)
            return;
        Core.debug("Slideshow playing. Item finished loading. Scheduling next selectNext()."), this.scheduleNext()
    }.observes("isLoading")
}), CoreImage.ImageViewDelegate = {
    isMixin: YES,
    isImageViewDelegate: YES,
    imageViewShouldEstablishCurrentAndPreferredReps: function(e) {
        return YES
    },
    imageViewShouldAutomaticallyEstablishCurrentAndPreferredReps: function(e) {
        return YES
    },
    imageViewGetEstablishedCurrentRep: function(e) {
        return null
    },
    imageViewGetEstablishedPreferredRep: function(e) {
        return null
    },
    imageViewShouldLoadImageForRep: function(e, t) {
        return YES
    },
    imageViewShouldImmediatelyStartLoadingImageForRep: function(e, t) {
        return YES
    },
    imageViewWillPrepareImageLoadForRep: function(e, t) {},
    imageViewDidPrepareImageLoadForRep: function(e, t) {},
    imageViewImageValidToLoadForRep: function(e, t) {
        return YES
    },
    imageViewSuccessfullyLoadedImageForRep: function(e, t) {},
    imageViewFailedToLoadImageForRep: function(e, t) {},
    imageViewImageLoadAbortedForRep: function(e, t) {},
    imageViewDidUnloadImageForRep: function(e, t) {}
}, require("mixins/image_view_delegate"), CoreImage.define("AbstractImageView", Core.View.extend(Core.WaitSupport, CoreImage
.ImageViewDelegate, {
    classNames: "image-view".w(),
    reps: undefined,
    downerGroup: undefined,
    importance: 0,
    importanceAdjust: 0,
    shouldHoldOff: NO,
    isOff: NO,
    progressivityThreshold: 1536,
    shouldEnforceThreshold: YES,
    sizePreferenceBias: window.devicePixelRatio || 1,
    zIndex: NaN,
    height: NaN,
    width: NaN,
    left: 0,
    top: 0,
    preferredRep: null,
    currentRep: null,
    currentSrc: null,
    isLoading: NO,
    aspectRatio: NaN,
    loadednesses: null,
    numReqs: 1,
    isInitting: YES,
    maximumRepSize: Infinity,
    delegate: null,
    delegateValue: function() {
        var e = this.delegate;
        return e && e.isImageViewDelegate ? e : this
    }.property(),
    init: function() {
        arguments.callee.base.apply(this, arguments), this.isInitting = NO
    },
    fixMaximumRepSize: function() {
        var e = Infinity, t = this.maximumRepSize || Infinity, n, r;
        for (n in this.reps)
            r = parseInt(n, 10), r < e && (e = r);
        e > t && (t = e), this.maximumRepSize = t
    }.observes("maximumRepSize", "reps"),
    _processReps: function() {
        if (this._lastReps === this.reps)
            return;
        this._lastReps = this.reps;
        var e = this.reps, t = this.sizes || (this.sizes = []), n = NO, r = NO, i = NO, s = this.progressivityThreshold / 2 + 10, o = this.progressivityThreshold / 3, u = NaN, a = Infinity, f = this.maximumRepSize, l, c, h, p, d, v, m, g, y =- Infinity;
        t.length = 0;
        if (!e) {
            this.loadednesses = null;
            return 
        }
        v = this.loadednesses = {}, g = this.loadees = {}, this.unloadObservers = {};
        for (l in e) {
            if (isNaN(p = parseInt(l, 10)))
                continue;
            y < p && (y = p);
            if (p > f)
                continue;
            t.push(p), typeof (h = e[l]) == "string" && (h = e[l] = {
                url: h
            }), h._key = l;
            if (d = CoreImage.imageLoader.imageForSRC(h.url))
                v[l] = d;
            (m = CoreImage.imageLoader.loadeeForSRC(h.url)) && this.takeLoadeeForRepKey(m, l), p <= s && (n = YES), p >= this.progressivityThreshold && (r = YES)
        }
        i = r && n, t.sort();
        if (this.shouldEnforceThreshold = this.shouldEnforceThreshold &&
        i)
            for (l = 0; p = t[l]; l++) {
                if (p > s)
                    continue;
                    (u = Math.abs(p - o)) < a && (this._preferredSubThresholdSize = p, a = u)
            }
        this.biggestRepSizeInRepSet = y, this.trigger("sizes")
    }.observes("init", "reps"),
    takeLoadeeForRepKey: function(e, t) {
        this.loadees[t] = e;
        var n = this, r = this.unloadObservers[t];
        if (r)
            return;
        r = this.unloadObservers[t] = function() {
            n.handleRepUnload(t)
        }, e.listen("didUnload", r)
    },
    _initialLayout: function() {
        this.setLayout(this.left, this.top, this.width, this.height, this.zIndex, YES)
    }.observes("render"),
    setLayout: function(e, t, n, r, i, s) {
        var o=!1, u = this.aspectRatio;
        u && (isNaN(n) && (n = r * u), isNaN(r) && (r = n / u)), !isNaN(t) && (!s ||!(this.top = NaN)) && this.setIfChanged("top", Math.round(t)), !isNaN(e) && (!s ||!(this.left = NaN)) && this.setIfChanged("left", Math.round(e)), !isNaN(n) && (!s ||!(this.width = NaN)) && (o = this.setIfChanged("width", Math.round(n)) || o), !isNaN(r) && (!s ||!(this.height = NaN)) && (o = this.setIfChanged("height", Math.round(r)) || o), !isNaN(i) && (!s ||!(this.zIndex = NaN)) && this.setIfChanged("zIndex", Math.round(i)), o && this.trigger("sizeDidChange")
    },
    setSize: function(e, t, n) {
        this.setLayout(NaN, NaN, e, t, NaN, n)
    },
    discoverBiggestRepSize: function() {
        var e = this.sizes, t, n, r =- Infinity;
        for (t = 0; n = e[t]; t++)
            r < n && (r = n);
        this.setIfChanged("biggestRepSize", r)
    }.observes("sizes"),
    provideBiggestRepBit: function() {
        parseInt(this.getPath("currentRep._key"), 10) === this.biggestRepSize && this.setIfChanged("hasSuccessfullyLoadedBiggestRep", YES)
    }.observes("currentRep"),
    provideBiggestRepSizeInRepSetBit: function() {
        parseInt(this.getPath("currentRep._key"), 10) === this.biggestRepSizeInRepSet && this.setIfChanged("hasSuccessfullyLoadedBiggestRepInRepSet", YES)
    }.observes
    ("currentRep"),
    sizeBiasForCurrentAndPreferredReps: function() {
        return (this.ignoreHeightInRepDecision ? this.width : Math.max(this.width, this.height)) * this.sizePreferenceBias
    },
    _establishCurrentAndPreferredReps: function() {
        if (!this.layer || this.shouldHoldOff || this.isOff)
            return;
        if (!this.reps) {
            this._setCurrentAndPreferredRep(null, null);
            return 
        }
        var e = this.get("delegateValue");
        if (!e.imageViewShouldEstablishCurrentAndPreferredReps(this))
            return;
        if (!e.imageViewShouldAutomaticallyEstablishCurrentAndPreferredReps(this)) {
            var t = e.imageViewGetEstablishedCurrentRep(this), n = e.imageViewGetEstablishedPreferredRep(this);
            this._setCurrentAndPreferredRep(t, n);
            return 
        }
        var r = this.sizeBiasForCurrentAndPreferredReps();
        if (!r)
            return;
        var i = this.sizes, s = this.reps, o = this.loadednesses, u = this.loadees, a = Infinity, f = 0, l = Infinity, c = 0, h = this.maximumRepSize, p, d, v, m, g, y, b, w;
        for (v = 0; (g = i[v]) && (m = s[g]); v++) {
            if (g > h)
                continue;
            g <= r && g > f && (f = g), g >= r && g < a && (a = g);
            if (!(y = o[g] || (o[g] = CoreImage.imageLoader.imageForSRC(m.url))) || y.isRequest && y.loaded===!1)
                continue;
            g <= r && g > c && (c = g), g >= r && g < l && (l = g), g < this.progressivityThreshold && (this._isThresholdSatisfied = YES)
        }
        a === Infinity && (a = 0), l === Infinity && (l = 0), d = a || f || 0, p = l || c || 0, !this.shouldEnforceThreshold || d < this.progressivityThreshold || this._isThresholdSatisfied ||!this._preferredSubThresholdSize || (d = this._preferredSubThresholdSize), this._setCurrentAndPreferredRep(s[p], s[d])
    }.observes("sizes", "sizeDidChange", "assetRequestDidComplete", "shouldHoldOff", "maximumRepSize"),
    _setCurrentAndPreferredRep: function(e, t) {
        this.setIfChanged("currentRep", e), this.setIfChanged("preferredRep", t)
    },
    _requestPreferredRepIfNeeded
    : function() {
        if (!this.preferredRep)
            return;
        var e = this.preferredRep, t = parseInt(e._key, 10), n = this, r = this.loadednesses[t], i = this.get("delegateValue");
        if (r && (!r.isRequest || r.loaded)) {
            this.set("loaded", !0), this.set("done", !0), i.imageViewSuccessfullyLoadedImageForRep(this, e), this.trigger("assetRequestDidComplete");
            return 
        }
        if (!i.imageViewShouldLoadImageForRep(this, e))
            return;
        var s = i.imageViewShouldImmediatelyStartLoadingImageForRep(this, e);
        i.imageViewWillPrepareImageLoadForRep(this, e), this._imageRequest = (this.CustomImageRequestClass || CoreImage.ImageRequest).create(this.getCustomOptionsForRequests(e), CoreImage.ImageRequestDelegate, {
            owner: this,
            saveTo: this.loadednesses,
            saveKey: t,
            group: this.downerGroup,
            importanceBinding: ".owner.importance",
            importanceAdjustBinding: ".owner.importanceAdjust",
            loadedBinding: "to:.owner.loaded",
            erredBinding: "to:.owner.erred",
            doneBinding: "to:.owner.done",
            rep: e,
            url: e.url,
            urls: e.urls,
            additionalUrls: e.additionalUrls,
            size: t,
            shouldIgnoreForLoading: !s,
            delegateValue: this,
            saveLoadeeToOwner: function() {
                if (!this.loadee)
                    return;
                this.owner.takeLoadeeForRepKey(this.loadee, this.saveKey)
            }.observes("loadee"),
            onabort: function() {
                var e = this;
                setTimeout(function() {
                    e.owner._imageRequest = null, e.owner.set("preferredRep", null), i.imageViewImageLoadAbortedForRep(e.owner, e.rep), e.owner.trigger("assetRequestDidAbort")
                }, 0)
            },
            onload: function() {
                var e = this;
                setTimeout(function() {
                    e.owner._imageRequest = null, e.rep.url = e.url, i.imageViewSuccessfullyLoadedImageForRep(e.owner, e.rep), e.owner.trigger("assetRequestDidComplete")
                }, 0)
            },
            onerror: function() {
                var e = this;
                setTimeout(function() {
                    e.owner._imageRequest = null
                    , e.owner.sizes.remove(e.size), delete e.owner.reps[e.size], i.imageViewFailedToLoadImageForRep(e.owner, e.rep), e.owner.trigger("sizes"), e.owner.trigger("assetRequestDidComplete")
                }, 0)
            }
        }), i.imageViewDidPrepareImageLoadForRep(this, e), this.trigger("isLoadingImage")
    }.observes("preferredRep"),
    imageRequestValid: function(e) {
        var t = this.get("delegateValue");
        return t.imageViewImageValidToLoadForRep(this, e.rep)
    },
    pauseLoadingImageIfNeeded: function() {
        var e = this._imageRequest;
        e && e.setIfChanged("shouldIgnoreForLoading", YES)
    },
    resumeLoadingImageIfNeeded: function() {
        var e = this._imageRequest;
        e && e.set("shouldIgnoreForLoading", NO)
    },
    abortImageLoad: function() {
        var e = this._imageRequest;
        e && e.abort()
    },
    isLoadingImage: function() {
        return !!this._imageRequest
    }.property(),
    isLoadingImagePaused: function() {
        var e = this._imageRequest;
        return !!e && e.get("shouldIgnoreForLoading")
    }.property(),
    reestablishingRepsIfNeeded: function() {
        if (this.get("isLoadingImage"))
            return;
        this._establishCurrentAndPreferredReps()
    },
    hasImageForRep: function(e) {
        return !!this._loadeeForRep(e)
    },
    unloadImageForRep: function(e) {
        var t = this._loadeeForRep(e);
        if (!t)
            return;
        t.unload && t.unload()
    },
    _loadeeForRep: function(e) {
        if (!e)
            return !1;
        var t = parseInt(e._key, 10);
        return t ? this.loadednesses[t] : null
    },
    handleRepUnload: function(e) {
        var t = this.reps[e];
        this.loadednesses[e] = null, this.loadees[e] = null, this.unloadObservers[e] = null;
        var n = this.get("delegateValue");
        t && n.imageViewDidUnloadImageForRep(this, t), this.trigger("assetRequestDidComplete")
    },
    closeReqOnImageReceipt: function() {
        this.closeReq()
    }.observes("assetRequestDidComplete", "currentSrc"),
    getCustomOptionsForRequests: function(
    e) {
        return null
    },
    _establishIsLoading: function() {
        if (!this.preferredRep)
            return this.setIfChanged("isLoading", NO);
        var e = this.loadednesses[this.preferredRep._key];
        this.setIfChanged("isLoading", !e || e.loaded===!1)
    }.observes("preferredRep", "assetRequestDidComplete"),
    _establishCurrentSrcAndExampleImage: function() {
        this.suspendTriggers();
        if (!this.currentRep)
            this.setIfChanged("currentSrc", null), this.setIfChanged("currentImageExample", null), this.setIfChanged("currentAdditionalImages", null);
        else {
            var e = this.loadednesses[this.currentRep._key];
            this.setIfChanged("currentSrc", this.currentRep.url || this.currentRep.urls && this.currentRep.urls[0] || null), this.setIfChanged("currentImageExample", e && e.isRequest ? e.image : e), this.setIfChanged("currentAdditionalImages", e && e.additionalImages || null)
        }
        this.resumeTriggers()
    }.observes("currentRep"),
    applyZIndex: YES,
    applyTop: YES,
    applyLeft: YES,
    applyWidth: YES,
    applyHeight: YES,
    _doApplyZIndex: function() {
        if (!this.applyZIndex)
            return;
        this.layer.style.zIndex = Math.round(this.zIndex)
    }.observes("zIndex"),
    _doApplyTop: function() {
        if (!this.applyTop)
            return;
        this.layer.style.top = Math.round(this.top) + "px"
    }.observes("top"),
    _doApplyLeft: function() {
        if (!this.applyLeft)
            return;
        this.layer.style.left = Math.round(this.left) + "px"
    }.observes("left"),
    _doApplyWidth: function() {
        if (!this.applyWidth)
            return;
        this.layer.style.width = Math.round(this.width) + "px"
    }.observes("width"),
    _doApplyHeight: function() {
        if (!this.applyHeight)
            return;
        this.layer.style.height = Math.round(this.height) + "px"
    }.observes("height")
})), CoreImage.define("EasyDomImageView", CoreImage.AbstractImageView.extend({
    shouldFade: YES&&!B.mobile&&!B
    .msie <= 8,
    useGPU: NO,
    isImageOpaque: NO,
    imageAccessoryElement: null,
    MINIMUM_FADE_DELAY: 100,
    _renderImageAccessoryElement: function() {
        if (!this.layer)
            return;
        var e = this.get("imageAccessoryElement");
        if (e) {
            e.style.display = "none";
            var t = this.layer;
            this.appendInto && (t = this.owner[this.appendInto]), t.appendChild(e)
        }
    }.observes("imageAccessoryElement", "render"),
    Anim: Anim.Fader.extend({
        elementBinding: ".owner.image",
        accessoryBinding: ".owner.imageAccessoryElement",
        hide: function() {
            if (this.to === 0) {
                this.element.style.display = "none";
                var e = this.accessory;
                e && (e.style.display = "none")
            }
            this.to === 1 && this.owner.setIfChanged("isImageOpaque", YES)
        }.observes("finish"),
        update: function() {
            arguments.callee.base.apply(this, arguments);
            var e = this.accessory;
            e && Anim.setOpacity(e, this.current)
        },
        show: function() {
            if (this.to === 1) {
                this.element.style.display = "";
                var e = this.accessory;
                e && (e.style.display = "")
            }
            this.to === 0 && this.owner.setIfChanged("isImageOpaque", NO)
        }.observes("start")
    }),
    generateImage: function() {
        var e = this.image = new Image;
        e.style.position = "absolute", e.style.width = "100%", e.style.height = "100%", e.style.top = e.style.left = "0px", e.style.zIndex = 2, this.layer.appendChild(e)
    },
    hideImage: function() {
        if (this._isImageShowing === (this._isImageShowing = NO))
            return;
        if (this.shouldFade&&!this.isInitting)
            return (this.anim || (this.anim = this.Anim.create({
                owner: this
            }))).redirectTo(0).redirectFrom(1).start();
        Anim.tellStop(this.anim), this.image.style.display = "none", this.setIfChanged("isImageOpaque", NO)
    },
    showImage: function() {
        if (this._isImageShowing === (this._isImageShowing = YES))
            return;
        var e = this._firstShowImageDate ? Infinity: this._firstShowImageDate = new 
        Date * 1;
        if (e > this._initDate + this.MINIMUM_FADE_DELAY && this.shouldFade&&!this.isInitting)
            return (this.anim || (this.anim = this.Anim.create({
                owner: this
            }))).redirectTo(1).redirectFrom(0).start();
        Anim.tellStop(this.anim), this.image.style.display = "";
        var t = this.get("imageAccessoryElement");
        t && (t.style.display = ""), this.setIfChanged("isImageOpaque", YES)
    },
    updateToCurrentSrc: function() {
        var e = this.currentSrc;
        if (!e)
            return this.image ? this.hideImage() : undefined;
        this.image || this.generateImage(), this.showImage(), this.image.src = this.currentSrc
    }.observes("currentSrc"),
    markFadeGuardDate: function() {
        this._initDate = new Date * 1
    }.observes("reps")
})), CoreImage.define("ConstructedImageView", CoreImage.AbstractImageView.extend({
    layoutWidth: 1,
    layoutHeight: 1,
    reps: null,
    useCanvasBackgrounds: B.safari || B.chrome || B.iOS || B.android,
    ignoreHeightInRepDecision: YES,
    spriteReps: null,
    constructRepsFromSpriteReps: function() {
        if (!this.spriteReps)
            return;
        var e = {}, t = this.spriteReps, n, r, i;
        for (var s in t) {
            if (s === "_savedRepClones")
                continue;
            if (!t[s])
                continue;
            i = parseInt(s, 10), r = t[s], r.pixelsPerLayoutUnit = i / r.layoutWidth, n = r.pixelsPerLayoutUnit * this.get("layoutWidth"), n += r.extraPixelWidth || 0, n += r._hackKeyBump || 0, n = Math.floor(n);
            var o = t._savedRepClones || (t._savedRepClones = {}), u = r.pixelsPerLayoutUnit + "_for_" + n, a = o[u] || (o[u] = Core.cloneHash(r, YES));
            e[n] = a
        }
        this.set("reps", e)
    }.observes("init", "spriteReps")
})), CoreImage.define("CanvasConstructedImageView", CoreImage.ConstructedImageView.extend({
    bitmapCacheKey: function() {
        return this.get("layoutWidth") + "by" + this.get("layoutHeight")
    }.property(),
    paint: function(e, t, n) {
        var r = this.currentRep, i = this.currentImageExample
        ;
        e.drawImage(i, 0, 0, r.left, r.top, 0, 0, r.left, r.top), e.drawImage(i, r.width - r.right, 0, r.right, r.top, t - r.right, 0, r.right, r.top), e.drawImage(i, 0, r.height - r.bottom, r.left, r.bottom, 0, n - r.bottom, r.left, r.bottom), e.drawImage(i, r.width - r.right, r.height - r.bottom, r.right, r.bottom, t - r.right, n - r.bottom, r.right, r.bottom), e.drawImage(i, r.left, 0, r.width - r.left - r.right, r.top, r.left, 0, t - r.left - r.right, r.top), e.drawImage(i, r.left, r.height - r.bottom, r.width - r.left - r.right, r.bottom, r.left, n - r.bottom, t - r.left - r.right, r.bottom), e.drawImage(i, 0, r.top, r.left, r.height - r.top - r.bottom, 0, r.top, r.left, n - r.top - r.bottom), e.drawImage(i, r.width - r.right, r.top, r.right, r.height - r.top - r.bottom, t - r.right, r.top, r.right, n - r.top - r.bottom), e.drawImage(i, r.left, r.top, r.width - r.left - r.right, r.height - r.top - r.bottom, r.left, r.top, t - r.left - r.right, n - r.top - r.bottom)
    },
    maintainElement: function() {
        if (!this.isAppendedInWindow ||!this.currentRep)
            return;
        var e = this.useCanvasBackgrounds, t = this.get("bitmapCacheKey"), n = this.get("layoutWidth"), r = this.get("layoutHeight"), i = this.currentRep, s = "spriteRep" + Core.guidFor(i) + "at" + t, o = i.knownBitmaps || (i.knownBitmaps = {}), u = o[t], a, f, l, c, h, p = this.currentBitmap;
        u || (f = Math.ceil(i.pixelsPerLayoutUnit * n + (i.extraPixelWidth || 0)), l = Math.ceil(i.pixelsPerLayoutUnit * r + (i.extraPixelHeight || 0)), e ? u = o[t] = {
            width: f,
            height: l,
            context: a = document.getCSSCanvasContext("2d", s, f, l),
            getContext: function() {
                return this.context
            }
        } : (u = o[t] = document.createElement("canvas"), u.width = f, u.height = l, u.context = a = u.getContext("2d")), this.paint(a, f, l)), e ? (c = this.carrierElement, c || (c = this.carrierElement = document.createElement("div"), c.style.
        cssText = "position:absolute; left:0px; top:0px; width:100%; height:100%; z-index:2; background-size:100% 100%; -webkit-background-size:100% 100%;", this.layer.appendChild(c)), c.setAttribute("bitmap_width", u.width), c.setAttribute("bitmap_height", u.height), c.style.background = "-webkit-canvas(" + s + ")") : (c = (this._bitmaps || (this._bitmaps = {}))[i._key], c || (c = this._bitmaps[i._key] = document.createElement("canvas"), c.width = u.width, c.height = u.height, c.context = h = c.getContext("2d"), h.drawImage(u, 0, 0), c.style.cssText = "position:absolute; left:0px; top:0px; width:100%; height:100%; z-index:2;"), p !== c && (p && p.parentNode && p.parentNode.removeChild(p), this.layer.appendChild(c), p = this.currentBitmap = c))
    }.observes("isAppendedInWindow", "currentRep")
})), CoreImage.define("ClassicDOMConstructedImageView", CoreImage.ConstructedImageView.extend({
    rendererViewClass: Core.View.extend({
        rep: null,
        classNames: "full-width full-height".w(),
        rootHTML: "<div><div></div><img><div></div><img><img><img><div></div><img><div></div></div>",
        tlElement: "layer.firstChild",
        tElement: "tl.nextSibling",
        trElement: "t.nextSibling",
        lElement: "tr.nextSibling",
        cElement: "l.nextSibling",
        rElement: "c.nextSibling",
        blElement: "r.nextSibling",
        bElement: "bl.nextSibling",
        brElement: "b.nextSibling",
        initialRender: function() {
            if (!this.rep)
                return;
            var e = this.rep, t = e.url, n = e.additionalUrls, r = e.top, i = e.bottom, s = e.right, o = e.left;
            if (!n)
                return;
            this.tl.style.cssText = "background: url(" + t + ") top left; left:0px; top:0px; width:" + o + "px; height:" + r + "px;", this.t.src = n[0], this.t.style.cssText = "left:" + o + "px; top:0px; height:" + r + "px;", this.tr.style.cssText = "background: url(" + t + ") top right; right:0px; top:0px; width:" +
            s + "px; height:" + r + "px;", this.l.src = n[1], this.l.style.cssText = "left:0px; top:" + r + "px; width:" + o + "px;", this.c.src = n[2], this.c.style.cssText = "left:" + o + "px; top:" + r + "px;", this.r.src = n[3], this.r.style.cssText = "right:0px; top:" + r + "px; width:" + s + "px;", this.bl.style.cssText = "background: url(" + t + ") bottom left; bottom:0px; left:0px; width:" + o + "px; height:" + i + "px;", this.b.src = n[4], this.b.style.cssText = "bottom:0px; left:" + o + "px; height:" + i + "px;", this.br.style.cssText = "background: url(" + t + ") bottom right; bottom:0px; right:0px; width:" + s + "px; height:" + i + "px;";
            for (var u = 0; u < this.initialElements.length; u++)
                this[this.initialElements[u]].style.position = "absolute"
        }.observes("render"),
        update: function() {
            if (!this.isAppendedInWindow ||!this.rep)
                return;
            var e = this.owner, t = this.rep, n, r, i, s;
            if (isNaN(t.left) || isNaN(t.right) || isNaN(t.top) || isNaN(t.bottom))
                return;
            this.t.style.width = this.b.style.width = this.c.style.width = Math.max(0, e.width - t.left - t.right) + "px", this.l.style.height = this.r.style.height = this.c.style.height = Math.max(0, e.height - t.top - t.bottom) + "px", this.tl.style.width = this.bl.style.width = Math.max(0, n = Math.min(t.left, Math.ceil(e.width / 2))) + "px", this.tr.style.width = this.br.style.width = Math.max(0, i = Math.min(t.right, e.width - n)) + "px", this.tl.style.height = this.tr.style.height = Math.max(0, s = Math.min(t.top, Math.ceil(e.height / 2))) + "px", this.bl.style.height = this.br.style.height = Math.max(0, r = Math.min(t.bottom, e.height - s)) + "px", this.t.style.left = this.b.style.left = this.c.style.left = n + "px", this.t.style.display = this.b.style.display = n + i === e.width ? "none" : "block", this.l.style.top = this.r.style.top = this.c.style.top =
            s + "px", this.l.style.display = this.r.style.display = s + r === e.height ? "none" : "block", this.c.style.display = s + r === e.height && n + i === e.width ? "none" : "block"
        }.observes("isAppendedInWindow", ".owner.sizeDidChange")
    }),
    maintainChild: function() {
        if (!this.isAppendedInWindow ||!this.currentRep)
            return;
        var e = this.currentRep, t = this._repChildren || (this._repChildren = {}), n = t[Core.guidFor(e)] || (t[e.coreGuid] = this.rendererViewClass.create({
            owner: this,
            rep: e
        })), r = this._currentChild;
        n !== r && r && r.remove(), n && n.append(), this._currentChild = n
    }.observes("isAppendedInWindow", "currentRep")
})), require("views/image"), CoreImage.GridItemMixin = {
    isMixin: YES,
    cellSizeBinding: "from:.owner.cellSize",
    displayWidthBinding: "from:cellSize",
    cellSize: undefined,
    top: undefined,
    left: undefined,
    width: undefined,
    height: undefined,
    performLayout: function() {
        if (!this.cellSize ||!this.layer)
            return;
        var e = this.cellSize, t = this.layer.style, n = this.layout || (this.layout = {});
        t.top = (n.top = Math.round(this.top * e)) + "px", t.left = (n.left = Math.round(this.left * e)) + "px", t.width = (n.width = Math.round(this.width * e)) + "px", t.height = (n.height = Math.round(this.height * e)) + "px", isNaN(this.zIndex) || (t.zIndex = this.zIndex), this.trigger("layout")
    }.observes("cellSize", "render")
}, CoreImage.define("PhotoGridItemMixin", {
    isMixin: YES,
    cropMetricsEl: "imageContainer",
    imageMetricsEl: "imageView.layer",
    imageView: CoreImage.EasyDomImageView.extend({
        appendInto: "imageContainer",
        downerGroupBinding: "from:.owner.downerGroup",
        currentSrcBinding: "to:.owner.currentSrc",
        isImageOpaqueBinding: "to:.owner.isImageOpaque"
    }),
    cropLeft: .5,
    cropTop: .5,
    zoom: 1,
    fallBackOnMissingImage: function() {
        if (!this.isAppendedInWindow
        )
            return;
        if (this.imageView && this.imageView.currentSrc)
            return;
        this.set("isShowingMissingImage", YES)
    }.observes("isAppendedInWindow"),
    removeMissingImage: function() {
        if (!this.isImageOpaque)
            return;
        this.set("isShowingMissingImage", NO)
    }.observes("isImageOpaque"),
    doImageLayout: function() {
        if (this.imageView.isClass ||!this.value)
            return;
        var e = this.value;
        if (!e.width ||!e.height)
            e.width = e.height = 1;
        var t = this.cellSize, n = this.getInset(), r = this.get("cropLeft"), i = this.get("cropTop"), s = this.zoom, o = t * this.width - 2 * n, u = t * this.height - 2 * n, a = o / u, f = e.width, l = e.height, c = f / l, h = c > a, p = s * (h ? u * c : o), d = s * (h ? u : o / c), v = o - p, m = u - d, g = r * v, y = i * m;
        this.imageView.setLayout(g, y, p, d)
    }.observes("cellSize", "render", "value"),
    saveZoomImageInfoToPageView: function() {
        if (!this.currentSrc) {
            this.pageView && this.pageView.set("zoomImageInfo", null);
            return 
        }
        var e = this.getPath(this.cropMetricsEl), t = this.getPath(this.imageMetricsEl), n = Core.positionOfElement(e), r = Core.positionOfElement(t);
        this.pageView && this.pageView.set("zoomImageInfo", {
            src: this.currentSrc,
            cropL: n.left,
            cropT: n.top - Core.lastScrollTop,
            cropW: e.offsetWidth,
            cropH: e.offsetHeight,
            imageL: r.left,
            imageT: r.top - Core.lastScrollTop,
            imageW: t.offsetWidth,
            imageH: t.offsetHeight
        })
    }.observes("action")
}), function() {
    CoreImage.define("MissingImageSupport", {
        isMixin: YES,
        isShowingMissingImage: NO,
        ICON_ASPECT: 512 / 464,
        missingImageIconScale: .75,
        maximumImageIconSize: 512,
        missingImageParent: "",
        missingImageLayout: null,
        _missing_image_iconReps: null,
        _missing_image_backgroundSrc: "",
        fadeInMissingImage: NO,
        computeMissingImageLayout: function() {
            Core.cloneHash(this.layout, this.missingImageLayout || (this.missingImageLayout =
            {})), this.missingImageLayout.top = this.missingImageLayout.left = 0, this.trigger("missingImageLayout")
        }.observes("layout"),
        _missing_image_showHide: function() {
            var t, n, r, i, s, o = this;
            if (this.isShowingMissingImage) {
                if (!(t = this.missingImageLayout) ||!t.width ||!t.height)
                    return;
                (n = this._missingImage) || ((n = this._missingImage = document.createElement("div")).className = "missing-image-container", r = this._missingImageBg = new Image, e ? (r.src = this._missing_image_backgroundSrc, this._handleBgImageLoaded()) : (r.style.display = "none", r.onload = function() {
                    o._handleBgImageLoaded()
                }, r.src = this._missing_image_backgroundSrc, B.msie <= 8 && setTimeout(r.onload, 500)), n.appendChild(r), this._missingImageIconView = i = CoreImage.EasyDomImageView.create({
                    reps: this._missing_image_iconReps,
                    owner: this,
                    downerGroup: CoreImage.imageLoader.essentialGroup,
                    shouldFade: NO,
                    doneBinding: "to:.owner._iconImageDoneLoading"
                }), i.appendTo(n)), this._missing_image_doLayout(), this._showMissingImageElement()
            } else (n = this._missingImage) 
                && (s = n.parentNode) && (this._missingImageVisible=!1, s.removeChild(n))
        }.observes("render", "isShowingMissingImage", "missingImageLayout"),
        _showMissingImageElement: function() {
            if (this._missingImageVisible ||!this.hasDownloadedBg ||!this._iconImageDoneLoading)
                return;
            this._missingImageVisible=!0, (this[this.missingImageParent] || this.layer).appendChild(this._missingImage);
            if (!this.fadeInMissingImage || B.mobile || B.msie <= 8)
                return;
            Anim.Fader.go({
                from: 0,
                to: 1,
                element: this._missingImage
            })
        }.observes("hasDownloadedBg", "_iconImageDoneLoading"),
        _missing_image_doLayout: function() {
            var e = this.missingImageLayout, t = this._missingImage, n = this._missingImageIconView
            , r, i;
            if (!n ||!e ||!(r = e.width) ||!(i = e.height))
                return;
            var s = YES;
            s = this._mis_w_ !== (this._mis_w_ = r) && s, s = this._mis_h_ !== (this._mis_h_ = i) && s;
            if (!s)
                return;
            t.style.left = e.left + "px", t.style.top = e.top + "px", t.style.width = e.width + "px", t.style.height = e.height + "px";
            var o = this.missingImageIconScale, u = this.maximumImageIconSize, a = this.ICON_ASPECT, f = r / i, l = a > f, c = o * (l ? r : i * a), h = o * (l ? r / a : i);
            c > u && (c = u, h = c / a), h > u && (h = u, c = h * a), n.setLayout((r - c) / 2, (i - h) / 2, c, h)
        }.observes("missingImageLayout"),
        _handleBgImageLoaded: function() {
            this._missingImageBg.style.display = "", e = YES, this.setIfChanged("hasDownloadedBg", YES)
        }
    });
    var e = NO
}(), require("views/image"), CoreImage.define("SlideshowItemMixin", {
    isMixin: YES,
    allowsHudToHide: YES,
    resetState: function() {},
    sizeHashConvenience: function() {
        this.size = {}
    }.observes("init"),
    setAvailableSize: function() {
        var e = this.availableSize || (this.availableSize = {}), t = this.owner.availableRect;
        if (!t)
            return;
        e.width = t.width, e.height = t.height;
        var n = this._lastsw_ !== (this._lastsw_ = e.width);
        n = n || this._lastsh_ !== (this._lastsh_ = e.height);
        if (!n)
            return;
        this.trigger("availableSize")
    }.observes(".owner.availableRect", "render"),
    doLayoutFromSize: function() {
        if (!this.size)
            return;
        var e = this.owner.availableRect, t = Math.round(this.size.width), n = Math.round(this.size.height), r = this.layer.style, i = this.layout || (this.layout = {});
        if (!t ||!n)
            return;
        r.width = (i.width = t) + "px", r.height = (i.height = n) + "px", r.left = (i.left = Math.round((e.width - t) / 2 + e.left)) + "px", r.top = (i.top = Math.round((e.height - n) / 2 + e.top) + (this.size.offsetTop || 0)) + "px", this.trigger("layout")
    }.observes("size")
}), CoreImage.SlideshowPhotoMixin = {
    isMixin: YES,
    shouldAttemptToFillScreen
    : NO,
    shouldAvoidUpscaling: YES,
    canAllowZoom: !!B.mobile,
    allowZoom: NO,
    enableOwnerSwipability: YES,
    maxTextureSize: {
        width: Core.maxGPUTextureSize,
        height: Core.maxGPUTextureSize
    },
    imageView: CoreImage.EasyDomImageView.extend({
        shouldFade: NO,
        shouldHoldOffBinding: "from:.owner.owner.transitioner",
        shouldHoldOffBindingTransform: function(e) {
            return !!e
        },
        currentSrcBinding: "to:.owner.currentSrc",
        downerGroupBinding: "from:.owner.downerGroup",
        isImageOpaqueBinding: "to:.owner.isImageOpaque",
        biggestSizeBinding: "to:.owner.biggestSize",
        discoverBiggestSize: function() {
            for (var e = 0, t = 0; e < this.sizes.length; e++)
                t < this.sizes[e] && (t = this.sizes[e]);
            this.setIfChanged("biggestSize", t)
        }.observes("sizes")
    }),
    enableZoomOnLoad: function() {
        if (!this.canAllowZoom)
            return;
        !this.currentSrc || this.setIfChanged("allowZoom", YES)
    }.observes("currentSrc"),
    fallBackOnMissingImage: function() {
        if (!this.isAppendedInWindow)
            return;
        if (this.currentSrc)
            return;
        this.set("isShowingMissingImage", YES)
    }.observes("isAppendedInWindow"),
    removeMissingImage: function() {
        if (!this.isImageOpaque)
            return;
        this.set("isShowingMissingImage", NO)
    }.observes("isImageOpaque"),
    doLayout: function() {
        if (!this.value ||!this.layer)
            return;
        var e = this.value;
        if (!e.width ||!e.height)
            e.width = e.height = 1;
        var t = this.availableSize, n = this.size || (this.size = {}), r = this.zoomContentSize || (this.zoomContentSize = {}), i = e.width, s = e.height, o = i / s, u = t.width, a = t.height, f = u / a, l = this.shouldAttemptToFillScreen && Math.max(o / f, f / o) < 1.15, c = l ? o < f: o > f, h = Math.round(c ? u : a * o), p = Math.round(c ? u / o : a), d = this.biggestSize / Math.max(h, p);
        this.shouldAvoidUpscaling && d < 1 && (h*=d, p*=d), this.canAllowZoom ? (n.width = u, n.height = a) : (n.
        width = Math.min(u, h), n.height = Math.min(a, p)), r.width = h, r.height = p, this.zoomContainerSize = this.size, this.zoomState || this.resetState(YES), this.trigger("size"), this.trigger("imageLayout")
    }.observes("availableSize", "value"),
    resetState: function(e) {
        Anim.tellStop(this._pinchZoomAnimation);
        var t = this.size, n = this.zoomContentSize;
        if (!t ||!n)
            return;
        this.resetZoom(YES), this._hasRenderedZoomSinceReset = NO, e || this.trigger("imageLayout")
    },
    getBigZoomInfo: function() {
        var e = this.layout, t = this.imageView;
        return !e ||!t ? null : this._bigZoomInfo || (this._bigZoomInfo = {
            src: this.currentSrc,
            left: t.left + e.left,
            top: t.top + e.top,
            width: t.width,
            height: t.height
        })
    },
    computeMissingImageLayout: function() {
        var e = this.missingImageLayout || (this.missingImageLayout = {}), t = this.size, n = this.zoomContentSize;
        if (!t ||!n)
            return;
        e.left = t.width / 2 - n.width / 2, e.top = t.height / 2 - n.height / 2, e.width = n.width, e.height = n.height, this.trigger("missingImageLayout")
    }.observes("imageLayout"),
    _updateBigZoomInfoSrc: function() {
        this._bigZoomInfo && (this._bigZoomInfo.src = this.currentSrc)
    }.observes("currentSrc"),
    clearBigZoomInfo: function() {
        this._bigZoomInfo = null
    }.observes("layout"),
    doImageLayout: function() {
        if (!this.value ||!this.imageView ||!this.zoomContentSize ||!this.zoomState)
            return;
        var e = this.value, t = this.size, n = this.zoomContentSize, r = this.maxTextureSize, i = this.zoomState;
        if (!this.canAllowZoom || i.zoom === 1 && i.y === 0 && i.x === 0&&!this._hasRenderedZoomSinceReset)
            return this.imageView.layer.style.webkitTransform = "", this.imageView.setLayout(t.width / 2 - n.width / 2, t.height / 2 - n.height / 2, n.width, n.height);
        this._hasRenderedZoomSinceReset = YES;
        var s = Core.innerSizeInOuter(e,
        r);
        this.imageView.setLayout(t.width / 2 - s.width / 2, t.height / 2 - s.height / 2, s.width, s.height);
        var o = n.width * i.zoom, u = n.height * i.zoom, a = Math.max(o, u) / r.width;
        this.imageView.layer.style.webkitTransform = "translate3d(" + i.x + "px," + i.y + "px,0) scale(" + a + ")"
    }.observes("imageLayout", "zoomState"),
    touchStart: function() {
        if (!this.isImageOpaque)
            return;
        return arguments.callee.base.apply(this, arguments)
    }
}, CoreImage.define("ThemeSupport", {
    isMixin: YES,
    themeOverride: function(e, t, n) {
        return e ? e.isTheme ? e : CoreImage.Theme.create(e) : e
    },
    _themeSupport_updateToDisplayWidth: function() {
        if (!this.layer ||!this.theme ||!this.displayWidth)
            return;
        this.theme.applyToView(this)
    }.observes("displayWidth", "render", "theme"),
    _themeSupport_getThemeFromOwner: function() {
        var e;
        if (!(e = this.owner) ||!(e = e.theme) ||!(e = e[this.className + ".theme"]))
            return;
        this.setIfChanged("theme", e)
    }.observes(".owner.theme", "init")
}), CoreImage.ImageRequestDelegate = {
    imageRequestValid: function(e) {
        return !0
    }
}, CoreImage.define("ImageRequest", Core.Object.extend({
    imageLoader: null,
    done: !1,
    loaded: !1,
    erred: !1,
    group: null,
    importance: 0,
    importanceAdjust: 0,
    isRequest: !0,
    served: !1,
    onload: null,
    onerror: null,
    onloading: null,
    onabort: null,
    loadee: null,
    shouldIgnoreForLoading: NO,
    pending: NO,
    loading: NO,
    aborted: NO,
    delegateValue: null,
    customLoadeeMixin: {},
    getAdditionalCustomLoadeeProperties: function() {
        return null
    },
    init: function() {
        this.saveTo && (this.saveTo[this.saveKey] = this), arguments.callee.base.apply(this, arguments), this._isInitting=!0, this.group || (this.group = this.imageLoader.group), this.passive && (this.group = this.imageLoader.passiveGroup), (this.urls && this.urls.length || this.url) &&
        this.joinLoadee(), (!this.loadee ||!this.loadee.started) && this.enter(this.group), this.loadee&&!this.loadee.started && this.imageLoader.startThreads(), this._isInitting=!1
    },
    ensureCorrectLoadeeMembership: function() {
        !this.url&&!this.urls ? this.leaveLoadee() : this.joinLoadee()
    }.observes("urls", "url"),
    joinLoadee: function() {
        if (this.loadee ||!this.group)
            return;
        var e = this.url || this.urls;
        if (!e)
            return;
        e = e.toString();
        var t = this.imageLoader.loadees[e], n = this;
        t || (t = CoreImage.Loadee.create(this.customLoadeeMixin, this.getAdditionalCustomLoadeeProperties(), {
            urls: this.urls,
            url: this.url,
            debug: this.debug,
            globalKey: e
        }), this.imageLoader.loadees[e] = t), t.listen("willUnload", this._willUnloadHandler || (this._willUnloadHandler = function() {
            n.trigger("loadeeWillUnload")
        })), t.listen("didUnload", this._didUnloadHandler || (this._didUnloadHandler = function() {
            n.trigger("loadeeDidUnload")
        })), this.requestNumber = t.requests.length + 1, this.setIfChanged("loadee", t), t.accommodate(this), !this._isInitting&&!this.loadee.started && this.imageLoader.startThreads()
    },
    leaveLoadee: function() {
        if (!this.loadee)
            return;
        var e = this.loadee;
        e.unaccommodate(this), e.unlisten("willUnload", this._willUnloadHandler), e.unlisten("didUnload", this._didUnloadHandler), this.loadee = null
    },
    didSatisfyAnyAdditionalUrls: function() {
        this.set("loaded", !0), this.trigger("success"), this.set("done", !0)
    },
    didStartLoading: function() {
        this.set("loading", !0), this.onloading instanceof Function && this.onloading()
    },
    didLoad: function(e) {
        this.set("loading", !1), this.leaveGroup();
        if (this.done)
            return;
        this.setIfChanged("url", e), this.image = this.loadee.image;
        var t = this.additionalUrls, n, r;
        if (!
        t)
            this.didSatisfyAnyAdditionalUrls();
        else {
            this.additionalImages = this.image.additionalImages = [], this.image.additionalUrls = this.additionalUrls, this.additionalImageLoadedCount = 0, n = function() {
                this.owner.additionalImageLoadedCount++, this.owner.additionalImageLoadedCount === this.owner.additionalUrls.length && this.owner.didSatisfyAnyAdditionalUrls()
            }, r = function() {
                this.owner.didErr()
            };
            for (var i = 0, s, o; o = t[i]; i++)
                this.additionalImages.push(s = new Image), s.onload = n, s.onerror = r, s.owner = this, s.src = o
        }
    },
    didErr: function() {
        this.set("loading", !1), this.leaveGroup();
        if (this.done || this.erred)
            return;
        this.setIfChanged("erred", !0), this.loadee && (this.image = this.loadee.image), this.trigger("error"), this.setIfChanged("done", !0)
    },
    _runOnLoadAPIGlue: function() {
        this.onload instanceof Function && this.onload()
    }.observes("success"),
    _runOnErrorAPIGlue: function() {
        this.onerror instanceof Function && this.onerror()
    }.observes("error"),
    needsAttention: function() {
        return !!this.loadee&&!this.done
    },
    enter: function(e) {
        if (!e)
            return;
        if (this.served)
            return;
        return this.group = e, e.accept(this), this
    },
    calmDown: function() {
        return this.setIfChanged("served", !0), this.leaveGroup(), this
    },
    leaveGroup: function() {
        return this.group && this.group.reject(this), this.group = null, this
    },
    abort: function() {
        if (this.done)
            return;
        this.set("done", !0), this.set("aborted", !0), this.leaveGroup(), this.loadee && this.loadee.unaccommodate(this), this.saveTo && delete this.saveTo[this.saveKey], this.onabort instanceof Function && this.onabort()
    },
    toString: function(e) {
        e = e || this.parent && this.parent._string_indent || this.group && this.group._string_indent || 0;
        var t = "";
        for (var n = 0; n < e; n++)
            t += " ";
        return this._string_indent = e + 2, t + "[ImageRequest:" + this.coreGuid + "; importance=" + this.importance + "; served=" + this.served + "; done=" + this.done + "]"
    },
    unload: function() {
        this.loadee && this.loadee.unload && this.loadee.unload()
    },
    valid: function() {
        var e = this.delegateValue;
        return e ? e.imageRequestValid(this) : !0
    },
    _shouldIgnoreForLoadingDidChange: function() {
        if (this.done)
            return;
        var e = this.get("shouldIgnoreForLoading");
        e || this.imageLoader.startThreads()
    }.observes("shouldIgnoreForLoading")
})), CoreImage.define("Loadee", Core.Object.extend({
    imageLoader: null,
    done: !1,
    loaded: !1,
    erred: !1,
    loading: !1,
    started: !1,
    url: null,
    requests: null,
    image: null,
    thread: null,
    init: function() {
        arguments.callee.base.call(this), this.requests = []
    },
    unload: function() {
        this._isUnloading=!0, this.trigger("willUnload");
        var e = this.requests.concat([]), t, n;
        for (t = 0; n = e[t]; t++)
            n.abort(), n.leaveGroup();
        this.image && (this.image.src = Core.emptyImageSrc, this.image.onload = this.image.onerror = null), this.image = null;
        var r = this.imageLoader.loadees;
        if (r) {
            r[this.url] = null;
            try {
                delete r[this.url]
            } catch (i) {}
            if (this.globalKey) {
                r[this.globalKey] = null;
                try {
                    delete r[this.globalKey]
                } catch (i) {}
            }
        }
        this.stopLoading(), this.trigger("didUnload"), this._isUnloaded=!0, this._isUnloading=!1
    },
    didLoad: function() {
        this.image && (this.image.onload = null, this.image.onerror = null);
        if (this.done)
            return;
        this.thread && this.thread.loadeeDidFinish(), this.thread = null, this._downloadTime = new Date * 1 - this._lastUrlSetTime || NaN, this.set("loaded", !0), this.set("loading", !1), this.imageLoader.loadees[this.url] = this;
        for (var e = 0; e < this.requests.length; e++)
            this.requests[e].didLoad(this.url);
        this.set
        ("done", !0)
    },
    didErr: function() {
        if (this.done)
            return;
        this.thread && this.thread.loadeeDidFinish(), this.thread = null, this.set("erred", !0), this.set("loading", !1);
        for (var e = 0; e < this.requests.length; e++)
            this.requests[e].didErr();
        this.set("done", !0)
    },
    didHalfLoad: function() {
        delete this.image.onload, delete this.image.onerror;
        var e = this;
        this.image = new Image, this.image.onload = function() {
            e.didLoad()
        }, this.image.onerror = function() {
            e.didErr()
        }, this.image.src = this.url, this._lastUrlSetTime = new Date * 1
    },
    didHalfErr: function() {
        if (!this.urls)
            return this.didErr();
        this.url = this.urls[++this._currentlyAttemptingUrlIndex];
        if (!this.url)
            return this.didErr();
        this.image.src = this.url, this._lastUrlSetTime = new Date * 1
    },
    load: function(e, t) {
        if (this.done || this.loading&&!t)
            return;
        var n = this, r = this.imageLoader.simulatedLatency;
        if (!r || r&&!t)
            this.calmRequests(), this.thread = e, this.setIfChanged("loading", !0), this.setIfChanged("started", !0), this._currentlyAttemptingUrlIndex =- 1, !this.url && this.urls && (this._currentlyAttemptingUrlIndex = 0, this.url = this.urls[0]);
        if (r&&!t) {
            clearTimeout(this._latencyTimeout), this._latencyTimeout = setTimeout(function() {
                n.load(e, !0)
            }, r);
            return 
        }
        for (var i = 0; i < this.requests.length; i++)
            this.requests[i].didStartLoading();
        this._kickOffLoadingProcess()
    },
    _kickOffLoadingProcess: function() {
        var e = this;
        if (!this.url)
            return this.didErr();
        this.image = new Image, this.image.onload = B.s.safari < 5 ? function() {
            e.didHalfLoad()
        } : function() {
            e.didLoad()
        }, this.image.onerror = function() {
            e.didHalfErr()
        }, this.image.src = this.url, this._lastUrlSetTime = new Date * 1
    },
    calmRequests: function() {
        if (this.done || this.loading)
            return;
        if (!this.requests ||!
        this.requests.length)
            return;
        for (var e = 0; e < this.requests.length; e++)
            this.requests[e].calmDown();
        return this
    },
    accommodate: function(e) {
        if (!e)
            return;
        return this.loaded ? e.didLoad(this.url) : this.erred && e.didErr(), this.requests.push(e), this
    },
    unaccommodate: function(e) {
        if (!e)
            return;
        if (this.done)
            return;
        this.requests.remove(e), this.requests.length || this.stopLoading()
    },
    stopLoading: function() {
        if (!this.loading)
            return;
        clearTimeout(this._latencyTimeout), this.thread && this.thread.loadeeDidFinish(), this.setIfChanged("started", !1), this.setIfChanged("loading", !1);
        if (!this.image)
            return;
        this.image.onload = this.image.onerror = null, this.image.src = Core.emptyImageSrc, this.image = null
    },
    updateToUrls: function(e) {
        this.urls !== e && (this.url = null), this.setIfChanged("urls", e)
    },
    updateToUrl: function(e) {
        this.url !== e && (this.urls = null), this.setIfChanged("url", e)
    },
    updateToUrlOrUrls: function() {
        this.globalKey = this.url || this.urls || "", this.globalKey && (this.imageLoader.loadees[this.globalKey] = this);
        for (var e, t = 0; e = this.requests[t]; t++)
            e.url = this.url, e.urls = this.urls
    }.observes("url", "urls"),
    tearDown: function() {
        delete this.tearDown, delete this.image;
        for (var e = 0; e < this.requests.length; e++)
            this.requests[e] && this.requests[e].tearDown && this.requests[e].tearDown(), delete this.requests[e];
        delete this.requests, delete this.group, delete this.thread
    }
})), CoreImage.define("ImageGroup", Core.Object.extend({
    isGroup: YES,
    parent: null,
    importance: 0,
    importanceAdjust: 0,
    pending: null,
    target: Math.pow(2, 32) - 1,
    needsAttention: function() {
        for (var e = 0; e < this.pending.length; e++)
            if (this.pending[e].needsAttention())
                return !0;
        return !1
    },
    accept: function(e) {
        if (e ==
        this)
            return;
        return e.isRequest && e.set("pending", !0), this.pending.push(e), this
    },
    reject: function(e) {
        return e.set("pending", !1), this.pending.remove(e), this
    },
    enter: function(e) {
        if (!e)
            return;
        return e.accept(this), this.parent = e, this
    },
    getNext: function(e) {
        if (!this.pending.length)
            return null;
        var t = Infinity, n = null, r =- 1, i=!1;
        for (var s = 0, o; (o = this.pending[s])&&!i; s++) {
            if (e && e(o) || o.get("shouldIgnoreForLoading"))
                continue;
            o.importance || (o.importance = 0);
            var u = Math.abs(o.importance - this.target) - o.importanceAdjust;
            o.needsAttention() && (o.isEssential && (n = o, i=!0), u < t && (n = o, t = u, r = s))
        }
        return n ? n && n.isRequest ? n.valid() ? n : (n.abort(), this.getNext(e)) : n ? n.getNext(e) : null : null
    },
    manyNextAnswerArray: [],
    getManyNext: function(e, t, n) {
        var r = this.manyNextAnswerArray, i = this._tempUseArray;
        n || (r.length = 0), i.length = 0;
        if (!this.pending.length)
            return r;
        var s = r.length, o, u, a;
        this.pending.sort(this._importanceVsTargetSorter);
        for (o = 0; (u = this.pending[o]) && s < e; o++) {
            if (u.isGroup)
                continue;
            if (t && t(u))
                continue;
            i.push(u), s++
        }
        for (o = 0; u = i[o]; o++)
            r.push(u);
        if (s < e)
            for (o = 0; (a = this.pending[o]) && r.length <= e; o++)
                a.isGroup && a.getManyNext(e, t, !0);
        return r
    },
    init: function() {
        arguments.callee.base.call(this), this.pending = [], this._tempUseArray = [];
        var e = this;
        this._importanceVsTargetSorter = function(t, n) {
            return t.isEssential?-1 : n.isEssential ? 1 : Math.abs(t.importance - e.target) - t.importanceAdjust - (Math.abs(n.importance - e.target) - n.importanceAdjust)
        }
    },
    becomeMostImportant: function() {
        if (!this.parent)
            return;
        for (var e = 0, t =- Infinity, n, r = this.parent.pending; n = r[e]; e++)
            n.isEssential || (t = Math.max(t, n.importance));
        this.importance = t + 1
    },
    tearDown: function() {
        delete 
        this.tearDown;
        for (var e = 0; e < this.pending.length; e++)
            this.pending[e] && this.pending[e].tearDown && this.pending[e].tearDown(), delete this.pending[e]
    },
    toString: function(e) {
        e = e || this.parent && this.parent._string_indent || this.group && this.group._string_indent || 0;
        var t = "";
        for (var n = 0; n < e; n++)
            t += " ";
        return this._string_indent = e + 2, t + "[ImageGroup:" + this.coreGuid + "; " + (this.isEssential ? "essential" : "importance=" + this.importance) + "; pending=[\n" + this.pending.join(t + "\n") + "\n" + t + "]]"
    }
})), CoreImage.define("ImageLoader", Core.Object.extend({
    numThreads: 4,
    delay: 0,
    threads: null,
    group: null,
    loadees: null,
    init: function() {
        arguments.callee.base.call(this), this.group = CoreImage.ImageGroup.create({
            parent: this
        }), this.essentialGroup = CoreImage.ImageGroup.create({
            isEssential: !0
        }).enter(this.group), this.passiveGroup = CoreImage.ImageGroup.create({
            parent: this
        }), this.threads = [];
        for (var e = 0; e < this.numThreads; e++)
            this.threads[e] = CoreImage.ImageThread.create({
                loader: this
            });
        this.loadees = {}
    },
    getNext: function() {
        return this.group.getNext.apply(this.group, arguments)
    },
    getManyNext: function() {
        return this.group.getManyNext.apply(this.group, arguments)
    },
    startThreads: function() {
        var e = this;
        this._startTimeout || (this._startTimeout = setTimeout(this._starter || (this._starter = function() {
            e._startThreads(), e._startTimeout = undefined
        }), 0))
    },
    _startThreads: function() {
        for (var e = 0; e < this.threads.length; e++)
            this.threads[e].startIfNecessary();
        return this
    },
    stopThreads: function() {
        for (var e = 0, t; t = this.threads[e]; e += 1)
            t.stop()
    },
    requestsForSRC: function(e) {
        var t = this.loadees[e];
        return t ? t.requests : []
    },
    isSRCLoaded: function(e) {
        return !!this.imageForSRC(e)
    },
    imageForSRC: function(e) {
        var t = this.loadees[e];
        return t ? t.loaded ? t.image : !1 : !1
    },
    loadeeForSRC: function(e) {
        var t = this.loadees[e];
        return t ? t : !1
    },
    loadedLoadeeForSRC: function(e) {
        var t = this.loadees[e];
        return t ? t.loaded ? t : !1 : !1
    },
    isSRCRequested: function(e) {
        var t = this.loadees[e];
        if (!t)
            return !1;
        if (t.started)
            return !0;
        for (var n = 0; n < t.requests; n++)
            if (t.requests[n].group)
                return !0;
        return !1
    },
    isSRCErred: function(e) {
        var t = this.loadees[e];
        return t ? t.erred : !1
    },
    tearDown: function() {
        delete this.tearDown;
        var e, t;
        for (e = 0; e < this.threads.length; e++)
            this.threads[e] && this.threads[e].tearDown && this.threads[e].tearDown();
        for (e in this.loadees)
            t = this.loadees[e], t && t.tearDown && t.tearDown();
        this.group && this.group.tearDown && this.group.tearDown(), this.passiveGroup && this.passiveGroup.tearDown && this.passiveGroup.tearDown(), delete this.group, delete this.passiveGroup
    },
    toString: function() {
        return this._string_indent = 2, "[ImageLoader:" + this.coreGuid + ";\nthreads=[\n" + this.threads.join("\n") + "\n]\ngroup=\n" + this.group + "\n]"
    }
})), CoreImage.define("ImageThread", Core.Object.extend({
    loader: null,
    loading: !1,
    delayed: !1,
    idle: !0,
    loadee: null,
    ignoreTester: null,
    executing: !1,
    startIfNecessary: function() {
        return this.set("executing", !0), this.idle && this.startNextLoad(), this
    },
    stop: function() {
        this.set("executing", !1), this.set("idle", !0), this._delayTimeoutHandle && clearTimeout(this._delayTimeoutHandle)
    },
    startNextLoad: function() {
        if (this.loading)
            return;
        var e = this.loader.getNext(this.ignoreTester);
        if (!e) {
            this.set("idle", !0), this.set("loading", !1), this.loadee = null;
            return 
        }
        if (!e.loadee)
            return;
        return this.set("delayed", !1), this.set("loading", !0), this
        .set("idle", !1), this.loadee = e.loadee, this.loadee.load(this), this
    },
    loadeeDidFinish: function() {
        var e = this;
        this.loadee = null, this.set("loading", !1);
        if (!this.executing)
            return;
        !this.loader.delay && B.msie !== 8 ? this.startNextLoad() : (this.set("delayed", !0), this._delayTimeoutHandle = setTimeout(function() {
            e.startNextLoad()
        }, this.loader.delay || 5))
    },
    toString: function() {
        return "[ImageThread:" + this.coreGuid + "; loadee=" + this.loadee + "]"
    }
})), CoreImage.imageLoader = Anim.extraStatus["CoreImage.imageLoader"] = CoreImage.ImageLoader.create({
    numThreads: 6,
    simulatedLatency: 0,
    delay: 0
}), CoreImage.ImageRequest.reopen({
    imageLoader: CoreImage.imageLoader
}), CoreImage.Loadee.reopen({
    imageLoader: CoreImage.imageLoader
}), CoreImage.FileDownloader = Core.Object.extend({
    queue: [],
    QUEUE_DRAIN_INTERVAL: 500,
    shouldPostponeRecentDownloads: B.msie <= 8,
    downloadMultiple: function(e) {
        for (var t = 0, n; n = e && e[t]; t++)
            this.downloadFile(n)
    },
    downloadFile: function(e, t) {
        if (!e)
            return;
        this.ensureFrameExistence(), this.queue.push(e), this._timeout ? this.ensureScheduled() : this.dequeueAndDownload(), !t && this.shouldPostponeRecentDownloads && this.postponeDownloadForNextLoad(e)
    },
    ensureScheduled: function() {
        if (this._timeout)
            return;
        var e = this;
        this._timeout = setTimeout(function() {
            e._timeout = undefined, e.dequeueAndDownload()
        }, this.QUEUE_DRAIN_INTERVAL)
    },
    dequeueAndDownload: function() {
        var e = this.queue[0];
        this.queue.remove(e), Core.debug("Downloading a file."), B.s.safari < 6.1 && B.s.safari >= 6 && (e += e.indexOf("?")===-1 ? "?" : "&", e += "uniqifier=" + Math.round(Math.random() * 1e9)), this.frame.src = e, this.queue.length && this.ensureScheduled()
    },
    ensureFrameExistence: function() {
        if (this.frame
        )
            return;
        var e = this.frame = document.createElement("iframe");
        e.style.cssText = "position:absolute; left:-1000px; top:-1000px; width:0px; height:0px; z-index:-1000;", document.body.appendChild(e)
    },
    postponeDownloadForNextLoad: function(e) {
        if (!window.sessionStorage)
            return;
        try {
            window.sessionStorage.setItem("_iPhotoJournalPostponedDownload", new Date * 1 + ":" + e)
        } catch (t) {
            Core.debug("Failed to use session storage to postpone download. Download will not be triggered upon reload.")
        }
    },
    triggerPostponedDownloadIfNeeded: function() {
        if (!this.shouldPostponeRecentDownloads)
            return;
        if (!window.sessionStorage)
            return;
        try {
            var e = window.sessionStorage.getItem("_iPhotoJournalPostponedDownload") + "", t = parseInt(e.substring(0, e.indexOf(":")), 10), n = e.substring(e.indexOf(":") + 1), r = this;
            t + 1e4 >= (window.pageLoadTime || new Date * 1) && this.setIfChanged("autoDownloadURL", n);
            try {
                window.sessionStorage.removeItem("_iPhotoJournalPostponedDownload")
            } catch (i) {}
        } catch (s) {
            Core.debug("Failed to use session storage to auto-trigger postponed download.")
        }
    }.observes("init"),
    handleAutoDownloadURL: function() {
        if (!document.body ||!this.autoDownloadURL)
            return;
        var e = this, t = e.autoDownloadURL;
        setTimeout(function() {
            e.downloadFile(t, YES)
        }, 150), this.set("autoDownloadURL", undefined)
    }.observes("Core.windowDidLoad")
}), CoreImage.mixin({
    isFullScreen: NO,
    fullScreenSupported: function() {
        var e = document.documentElement;
        return (!!e.webkitRequestFullScreen||!!e.mozRequestFullScreen)&&!(B.s.safari < 6)
    }.property(),
    requestFullScreen: function() {
        if (this.isFullScreen)
            return;
        var e = document.documentElement, t = e.webkitRequestFullScreen || e.mozRequestFullScreen;
        if (!t)
            return;
        this
        .trigger("requestingFullScreenMode"), t.call(e), this.setIfChanged("isFullScreen", YES), this.trigger("requestedFullScreenMode")
    },
    cancelFullScreen: function() {
        if (!this.isFullScreen)
            return;
        var e = document, t = e.webkitCancelFullScreen || e.mozCancelFullScreen;
        if (!t)
            return;
        this.trigger("cancellingFullScreenMode"), t.call(e), this.setIfChanged("isFullScreen", NO), this.trigger("cancelledFullScreenMode")
    },
    setupFullscreenEventHandling: function() {
        if (!this.fullScreenSupported())
            return;
        var e = document.documentElement, t = this;
        e.webkitRequestFullScreen ? Core.addEvent(e, "webkitfullscreenchange", function() {
            t.setIfChanged("isFullScreen", document.webkitIsFullScreen)
        }) : e.mozRequestFullScreen && Core.addEvent(document, "mozfullscreenchange", function() {
            t.setIfChanged("isFullScreen", document.mozFullScreen)
        })
    }.observes("Core.windowDidLoad"),
    isFullScreenDidChange: function() {
        this.trigger(this.isFullScreen ? "enteredFullScreenMode" : "exitedFullScreenMode")
    }.observes("isFullScreen")
}), CoreImage.Theme = Core.Object.extend({
    isTheme: YES,
    "*.themeOverride": function(e, t, n) {
        for (var r in e)
            e[r] = this.parseIfNeeded(e[r]);
        return t && t.prototype && t.prototype.isTheme ? t.extend(e) : (e = CoreImage.Theme.extend(e), (this.ensureOwn("_themeList") || (this._themeList = [])).push(n), e)
    },
    "*.stylesOverride": function(e, t, n) {
        if (!e)
            return e;
        (this.ensureOwn("_stylesList") || (this._stylesList = [])).push(n);
        var r = [], i = [];
        for (var s in e)
            r.push(s), i.push(e[s] = this.parseIfNeeded(e[s]));
        return e._keys = r, e._values = i, e
    },
    applyToView: function(e) {
        if (!e)
            return;
        for (var t = 0, n, r, i = this._stylesList, s; i && (n = i[t]) && (r = this[n]); t++)
            if ((s = e[n.slice(0, - 7)]) && s instanceof Element)
                for (
                var o = 0, u = r._keys, a = r._values, f, l; f = u[o]; o++)
                    s.style[f] !== (l = this.evaluate(a[o], e)) && (s.style[f] = l + "px")
    },
    buildChildThemes: function() {
        for (var e = 0, t, n = this._themeList; t = n && n[e]; e++)
            this[t] = this[t].create();
        delete this._themeList
    }.observes("init"),
    valueFor: function(e, t) {
        var n = e.indexOf(".");
        return n!==-1 ? this.evaluate(this[e.substring(0, n) + ".styles"][e.substring(n + 1)], t) : this.evaluate(this[e], t)
    },
    evaluate: function(e, t, n) {
        var r, i, s, o, u, a, f;
        if (!e)
            return e;
        t instanceof Object && (n = t, t = t.displayWidth);
        if (e instanceof Function)
            return Math.round(e.apply(n || this));
        t || (t = this.displayWidth);
        if (!e.input)
            return e>-1 && e < 1 ? Math.round(e * t) : e;
        r = e, u = r.input, o = CoreImage.Theme._cache || (CoreImage.Theme._cache = {}), a = o[u] || (o[u] = {});
        if (f = a[t])
            return f;
        e = r.fraction * t + r.constant, ((i = r.min) || i === 0) && e < i && (e = i), ((s = r.max) || s === 0) && e > s && (e = s);
        var l = a[t] = Math.round(e);
        return l
    },
    parseIfNeeded: function(e) {
        if (typeof e != "string" || e.indexOf("+")===-1)
            return e;
        var t = e;
        e = e.split(" ").join("");
        var n = {}, r;
        return (r = e.lastIndexOf("<", e.indexOf("+")))!==-1 && (n.min = parseFloat(e.substring(0, r))), e = e.substring(r + 1), r = e.indexOf("+"), n.fraction = parseFloat(e.substring(0, r)), e = e.substring(r + 1), r = e.indexOf("<"), r===-1 ? n.constant = parseFloat(e) : (n.constant = parseFloat(e.substring(0, r)), n.max = parseFloat(e.substring(r + 1))), n.input = t, n
    }
}), CoreImage.URLResolver = Core.JSONProcessor.extend({
    computeUrlSetHash: function(e, t) {
        var n = t.items, r = t.locations, i = {}, s, o, u, a, f = new Date * 1;
        if (e.url_location) {
            o = r[e.url_location], u = o.scheme ? o.scheme + "://" : "", a = o.hosts.length, i.urls = [];
            for (s = 0; s < a; s++)
                i.urls.push(u + o.hosts[s] + e.url_path);
            i.expiry = this
            .parseUrlExpiry(e.url_expiry, f), i.birth = f
        } else 
            i.error = e.error_code;
        return i
    },
    parseUrlExpiry: function(e, t) {
        var n = isNaN(e) ? this.parseJSONDate(e): e;
        return n < t && (Core.debug("Now is " + t + " but expiry is " + n + ". Overriding to 20 minutes from now."), n = t + 12e5), n || Infinity
    },
    parseJSONDate: function(e) {
        e = e.split("T");
        var t = e[0], n = e[1];
        if (!t ||!n)
            return;
        t = t.split("-"), n = n.slice(0, - 1), n = n.split(":");
        if (t.length !== 3)
            return Infinity;
        if (n.length !== 3)
            return Infinity;
        var r = new Date;
        return r.setMilliseconds(0), r.setUTCFullYear(parseInt(t[0], 10)), r.setUTCDate(parseInt(t[2], 10)), r.setUTCMonth(parseInt(t[1], 10) - 1), r.setUTCHours(parseInt(n[0], 10)), r.setUTCMinutes(parseInt(n[1], 10)), r.setUTCSeconds(parseInt(n[2], 10)), r * 1 || Infinity
    }
}), CoreImage.VideoDetector = Core.Object.extend({
    makeDecisions: function() {
        var e = this.hasQT = this.isValidQTAvailable(), t = this.canHazQT = this.doesQTExistForPlatform(), n = this.hasHTML5MOV = this.canUseHTML5("mov"), r = this.hasHTML5MP4 = this.canUseHTML5("mp4"), i = this.abilities = {}, s = this.choices = {};
        i.mp4=!!r||!!e, i.mov=!(!n&&!e||!!B.android), s.mp4 = r ? "html5" : NO, s.mp4 || (s.mp4 = e ? "quicktime" : NO), s.mov = n ? "html5" : NO, s.mov || (s.mov = e ? "quicktime" : NO)
    }.observes("Core.windowDidLoad"),
    canUseHTML5: function(e) {
        if (B.windows && B.safari&&!B.chrome&&!this.isValidQTAvailable())
            return NO;
        try {
            if ((B.silk || B.android) && e === "mov")
                return NO;
            if (this["__dCUH5" + e + "__"] === (this["__dCUH5" + e + "__"] = YES))
                return this._canUseHTML5;
            var t = document.createElement("video"), n = this._canUseHTML5 = t.canPlayType instanceof Function && t.canPlayType(e === "mov" ? "video/x-m4v" : "video/mp4");
            if (n === "no" ||!n)
                n = NO;
            return n
        } catch (r) {
            return NO
        }
    },
    _isQTInstalled
    : undefined,
    isQTInstalled: function() {
        if (B.msie >= 9)
            return NO;
        if (this._isQTInstalled === undefined) {
            var e=!1;
            if (navigator.plugins && navigator.plugins.length)
                for (var t = 0; t < navigator.plugins.length; t++) {
                    var n = navigator.plugins[t];
                    n.name.indexOf("QuickTime")>-1 && (e=!0)
                } else 
                    typeof execScript != "undefined" && (qtObj=!1, execScript('on error resume next: qtObj = IsObject(CreateObject("QuickTimeCheckObject.QuickTimeCheck.1"))', "VBScript"), e = qtObj);
            this._isQTInstalled = e
        }
        return this._isQTInstalled
    },
    getQTVersion: function() {
        if (this._qtVersion)
            return this._qtVersion;
        var e = "0";
        if (navigator.plugins && navigator.plugins.length)
            for (var t = 0; t < navigator.plugins.length; t++) {
                var n = navigator.plugins[t], r = n.name.match(/quicktime\D*([\.\d]*)/i);
                r && r[1] && (e = r[1])
            } else 
                typeof execScript != "undefined" && (ieQTVersion = null, execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion', "VBScript"), ieQTVersion && (e = ieQTVersion.toString(16), e = [e.charAt(0), e.charAt(1), e.charAt(2)].join(".")));
        return this._qtVersion = e
    },
    isQT772: function() {
        return this.getQTVersion() === "7.7.2"
    },
    isQTCompatible: function(e, t) {
        var n = this._compatTest || (this._compatTest = function(e, t) {
            var r = parseInt(e[0], 10);
            isNaN(r) && (r = 0);
            var i = parseInt(t[0], 10);
            return isNaN(i) && (i = 0), r === i ? e.length > 1 ? n(e.slice(1), t.slice(1)) : !0 : r < i?!0 : !1
        }), r = e.split(/\./), i = t ? t.split(/\./): this.getQTVersion().split(/\./);
        return n(r, i)
    },
    isValidQTAvailable: function(e) {
        return this.isQTInstalled() && this.isQTCompatible(e || CoreImage.MIN_QUICKTIME_VERSION) && (!B.windows ||!this.isQT772())&&!(B.msie >= 9)
    },
    doesQTExistForPlatform: function(
    ) {
        return !B.mobile&&!(B.msie >= 9)
    }
}), CoreImage.MIN_QUICKTIME_VERSION = "7.7", CoreImage.SlideshowViewDelegate = {
    isMixin: YES,
    isSlideshowViewDelegate: YES,
    slideshowViewWillChangeCurrentItemView: function(e) {},
    slideshowViewDidChangeCurrentItemView: function(e) {},
    slideshowViewWillUpdateItemViewsInScope: function(e) {},
    slideshowViewDidUpdateItemViewsInScope: function(e) {},
    slideshowViewDidAddItemViewToScopeForItem: function(e, t, n) {},
    slideshowViewDidRemoveItemViewFromScopeForItem: function(e, t, n) {},
    slideshowViewCreateItemViewForItem: function(e, t) {
        return Core.error("When using SlideshowView, you must implement slideshowViewCreateItemViewForItem. Otherwise, the slideshow is unable to render any item records."), null
    }
}, CoreImage.define("SlideshowView", Core.TransitionerView.extend(CoreImage.SlideshowViewDelegate, {
    itemSet: null,
    currentItem: null,
    currentView: null,
    leftTransitioners: null,
    rightTransitioners: null,
    isHudShowing: NO,
    hudLifespan: 4e3,
    canHudHide: YES,
    steadyStateOverflow: "hidden",
    shouldMaintainPreviousAndNextItemViews: Core.useGPUForBigs,
    delegate: null,
    itemViewsScopeLookAheadCount: 0,
    itemViewsScopeLookBehindCount: 0,
    itemViewsScopeSize: function() {
        var e = this.itemViewsScopeLookAheadCount, t = this.itemViewsScopeLookBehindCount;
        return e + t + 1
    }.property(),
    delegateValue: function() {
        return this.delegate || this
    }.property(),
    init: function() {
        this._scopedItemViews = {}, this.shouldMaintainPreviousAndNextItemViews && (this.viewsToPreserveInDOM = [], this.lastViewsPreservedInDOM = []), arguments.callee.base.apply(this, arguments)
    },
    hudViewOverride: function(e) {
        return e.extend({
            touchStart: function(e) {
                return clearTimeout(this.owner._touchShowHudTimeout
                ), e.stopPropagation && e.stopPropagation(), this.owner.scheduleHudHide(), arguments.callee.base.apply(this, arguments)
            }
        })
    },
    touchStart: function(e, t) {
        B.mobile && Core.scrollTop(0);
        var n = this;
        return this.isHudShowing ? e._doNotHideHud ? this.showHud() : this._touchHideHudTimeout = setTimeout(function() {
            n.hideHud()
        }, 200) : this._touchShowHudTimeout = setTimeout(function() {
            n.showHud()
        }, 300), arguments.callee.base.apply(this, arguments)
    },
    touchMove: function(e) {
        return e && e.preventDefault && e.preventDefault(), clearTimeout(this._touchShowHudTimeout), this.hideHud(), arguments.callee.base.apply(this, arguments)
    },
    mouseDown: function(e) {
        return this.touchStart(e, YES), !0
    },
    mousePositionChange: function(e) {
        if (B.mobile)
            return;
        if (!this.isAppendedInWindow)
            return;
        this.showHud()
    }.observes("Core.mousePosition"),
    viewForItem: function(e) {
        var t = this.get("delegateValue");
        return t.slideshowViewCreateItemViewForItem(this, e)
    },
    setCurrentViewFromCurrentItem: function() {
        var e = this.currentItem, t = this.itemSet.indexOf(e), n = this.currentView, r = this.itemSet.indexOf(n && n.originalItem), i = t > r, s = this.itemSet.length, o, u, a, f = this.get("delegateValue");
        Math.abs(t - r) === s - 1 && (i=!i), this.set("transitionDirection", i ? "left" : "right"), Core.guidFor(this.currentItem), this._updateItemViewsScopeRelativeToCurrentItem();
        var l = this._itemViewForCurrentItem();
        f.slideshowViewWillChangeCurrentItemView(this);
        if (this.shouldMaintainPreviousAndNextItemViews) {
            o = this.viewsToPreserveInDOM, (u = this.lastViewsPreservedInDOM).length = 0;
            for (a = 0; a < o.length; a++)
                u.push(o[a]);
            o.length = 0, o.push(this._itemViewForNextItem()), o.push(this._itemViewForPreviousItem()), this.trigger("lastViewsPreservedInDOM"
            ), this.trigger("viewsToPreserveInDOM")
        }
        this.setIfChanged("currentView", l), f.slideshowViewDidChangeCurrentItemView(this), l && l.trigger("didBecomeCurrent")
    }.observes("currentItem"),
    decideTransitioners: function() {
        this._currentlySwiping ? this.transitioners = this[this.transitionDirection + "SwipeTransitioners"] || this[this.transitionDirection + "Transitioners"] : this.transitioners = this[this.transitionDirection + "Transitioners"]
    }.observes("transitionDirection"),
    _updateItemViewsScopeRelativeToCurrentItem: function() {
        var e = this.currentItem;
        e && this._updateItemViewsScopeRelativeToItem(e)
    },
    _updateItemViewsScopeRelativeToItem: function(e) {
        if (!e)
            return;
        var t = this.get("delegateValue"), n = this.get("itemSet"), r = this.itemViewsScopeLookAheadCount, i = this.itemViewsScopeLookBehindCount, s = n.indexOf(e), o = n.length;
        t.slideshowViewWillUpdateItemViewsInScope(this);
        var u = {}, a, f, l;
        u[e.coreGuid] = e;
        for (a = 1; a <= r; a += 1)
            f = (s + a)%o, l = n[f%o], u[l.coreGuid] || (u[l.coreGuid] = l);
        for (a = 1; a <= i; a += 1)
            f = s + a*-1, f < 0 && (f = o + f), l = f < 0 ? null : n[f], l&&!u[l.coreGuid] && (u[l.coreGuid] = l);
        var c = this._scopedItemViews, h = [], p, d;
        for (p in c)
            u[p] || this._removeItemViewFromScopeForItemKey(p);
        for (p in u)
            l = u[p], this.hasItemViewInScopeForItem(l) || this._addItemViewToScopeForItem(l);
        t.slideshowViewDidUpdateItemViewsInScope(this)
    },
    _itemViewForCurrentItem: function() {
        var e = this.currentItem;
        return e ? this.scopedItemViewForItem(e) : null
    },
    _itemViewForNextItem: function() {
        var e = this.itemSet.indexOf(this.currentItem);
        if (e===-1)
            return null;
        var t = this.itemSet[(e + 1)%this.itemSet.length];
        return t === this.currentItem ? null : t ? this.scopedItemViewForItem(t) : null
    },
    _itemViewForPreviousItem
    : function() {
        var e = this.itemSet.indexOf(this.currentItem);
        if (e===-1)
            return null;
        var t = this.itemSet[(e - 1 + this.itemSet.length)%this.itemSet.length];
        return t === this.currentItem ? null : t ? this.scopedItemViewForItem(t) : null
    },
    scopedItemViewForItem: function(e) {
        var t = this._scopedItemViews[e.coreGuid];
        return t ? t.view : null
    },
    hasItemViewInScopeForItem: function(e) {
        return !!this.scopedItemViewForItem(e)
    },
    hasItemViewInScope: function(e) {
        var t = this._scopedItemViews;
        for (var n in t)
            if (t[n].view === e)
                return !0;
        return !1
    },
    positionOfItemRelativeToCurrentItem: function(e) {
        var t = this.itemSet, n = this.currentItem;
        if (!t ||!n)
            return null;
        var r = t.indexOf(n), i = t.indexOf(e);
        return i < 0 ? null : i - r
    },
    positionOfItemViewInScope: function(e) {
        var t = this._scopedItemViews, n;
        for (var r in t) {
            n = t[r];
            if (n.view === e)
                return this.positionOfItemRelativeToCurrentItem(n.item)
        }
        return null
    },
    itemViewsInScope: function() {
        var e = [], t = this._scopedItemViews;
        for (var n in t)
            e.push(t[n].view);
        return e
    }.property(),
    _addItemViewToScopeForItem: function(e) {
        var t = this.get("delegateValue"), n = this._scopedItemViews, r = this.viewForItem(e);
        return r ? (n[e.coreGuid] = {
            view: r,
            item: e
        }, t.slideshowViewDidAddItemViewToScopeForItem(this, r, e), r) : null
    },
    _removeItemViewFromScopeForItemKey: function(e) {
        var t = this.get("delegateValue"), n = this._scopedItemViews, r, i, s;
        return s = n[e], s ? (r = n[e].view, i = n[e].item, delete n[e], t.slideshowViewDidRemoveItemViewFromScopeForItem(this, r, i), r) : null
    },
    chainObserveIsLoading: function() {
        var e = this._isLoadingWatcher;
        if (!e) {
            var t = this;
            e = this._isLoadingWatcher = function() {
                t._watchIsLoading()
            }
        }
        this._lastIsLoadingWatcherView && this._lastIsLoadingWatcherView.
        unlisten("isLoading", e), this.currentView && this.currentView.listen("isLoading", e), this._lastIsLoadingWatcherView = this.currentView, e()
    }.observes("currentView"),
    allowOrDisallowHudHide: function() {
        this.setIfChanged("canHudHide", this.currentView && this.currentView.allowsHudToHide)
    }.observes("currentView"),
    _watchIsLoading: function() {
        this.setIfChanged("isLoading", this.currentView && this.currentView.isLoading)
    },
    showHud: function(e) {
        if (this.isTransitioning)
            return;
        this.setIfChanged("isHudShowing", YES), clearTimeout(this._hudHideTimeout);
        if (!this.canHudHide)
            return;
        e!==!0&&!this.isMouseOverHud&&!B.silk && this.scheduleHudHide(e)
    }.observes("isMouseOverHud", "canHudHide"),
    hideHud: function(e) {
        if (!this.canHudHide)
            return;
        this.setIfChanged("isHudShowing", NO), (e || this.isTransitioning) && this.hudView && this.hudView.finishTransition && this.hudView.finishTransition()
    },
    scheduleHudHide: function(e) {
        var t = this;
        clearTimeout(this._hudHideTimeout), this._hudHideTimeout = setTimeout(function() {
            t.hideHud()
        }, e || this.hudLifespan)
    },
    resetOldViewOnFinish: function(e, t, n) {
        e && e.resetState()
    }.observes("didFinishRunningTransition"),
    computeAvailableRectFromWindow: function() {
        var e = this.availableRect || (this.availableRect = {});
        e.top = 0, e.left = 0, e.width = Core.windowSize.width, e.height = Core.windowSize.height, this.trigger("availableRect")
    }.observes("Core.windowSize", "init"),
    setSelfLayout: function() {
        if (!this.shouldLayoutSelf)
            return;
        var e = Core.windowSize, t = this.layer.style;
        t.width = e.width + "px", t.height = e.height + "px"
    }.observes("Core.windowSize", "render")
})), require("views/slideshow"), CoreImage.SlideshowView.reopen({
    _MAKE_TMP_POINTER: function(
    ) {
        window.sv = this
    }.observes("init"),
    swipeToOffset: function(e) {
        if (this.isCommittingSwipe)
            return 1;
        if (!this.itemSet || this.itemSet.length <= 1)
            return 1;
        if (!e)
            return this.cancelSwipe(YES), 0;
        var t = e < 0, n = t ? "left": "right";
        n !== this._currentlySwiping && this._currentlySwiping && this.cancelSwipe(YES), this._currentlySwiping || this._initiateSwipe(t);
        var r = this.victimTransitioner;
        return r.current = e / Core.windowSize.width / r.direction, r.update(), this._previousSwipeOffset = this.currentSwipeOffset, this._previousSwipeTime = this._currentSwipeTime, this.setIfChanged("currentSwipeOffset", e), this._currentSwipeTime = new Date * 1, 0
    },
    swipeTouchDidEnd: function() {
        var e = (this.currentSwipeOffset - this._previousSwipeOffset) / ((this._currentSwipeTime - this._previousSwipeTime) / 1e3) || 0;
        Math.abs(this.currentSwipeOffset + e) >= Core.windowSize.width / 2 ? this.finishSwipe() : this.cancelSwipe()
    },
    _initiateSwipe: function(e) {
        if (this._currentlySwiping)
            return;
        this._currentlySwiping = e ? "left" : "right", e ? this.controller.selectNext() : this.controller.selectPrevious();
        var t = this.transitioner;
        this.setIfChanged("victimTransitioner", t), t.paused = YES
    },
    cancelSwipe: function(e) {
        var t = this.victimTransitioner;
        if (!t)
            return;
        t.redirectTo(0), t.redirectFrom(t.current), t.reset(), t.listen("finish", function() {
            this.unlisten("finish", arguments.callee), this.owner.swipeDidFinishCanceling()
        }), t.paused = NO, this.setIfChanged("isCommittingSwipe", YES), e && t.finish()
    },
    finishSwipe: function(e) {
        var t = this.victimTransitioner;
        if (!t)
            return;
        t.redirectTo(1), t.redirectFrom(t.current), t.reset(), t.listen("finish", function() {
            this.unlisten("finish", arguments.callee), this.owner.swipeDidFinishFinishing
            ()
        }), t.paused = NO, this.setIfChanged("isCommittingSwipe", YES), e && t.finish()
    },
    forceFinishCurrentSwipeCommittal: function() {
        if (!this.isCommittingSwipe)
            return;
        this.victimTransitioner.finish()
    },
    swipeDidFinishCanceling: function() {
        var e = this._currentlySwiping;
        if (!e)
            return;
        e === "right" && this.controller.selectNext(), e === "left" && this.controller.selectPrevious(), this.swipeDidFinish()
    },
    swipeDidFinishFinishing: function() {
        this.swipeDidFinish()
    },
    swipeDidFinish: function() {
        this._currentlySwiping = NO, this.setIfChanged("victimTransitioner", null), this.setIfChanged("isCommittingSwipe", NO), this._previousSwipeOffset = NaN, this._previousSwipeTime = NaN, this._currentSwipeTime = NaN
    },
    getNextView: function() {
        return this.viewForItem(this.itemSet[(this.itemSet.indexOf(this.currentView.originalItem) + 1)%this.itemSet.length])
    },
    getPreviousView: function() {
        return this.viewForItem(this.itemSet[(this.itemSet.indexOf(this.currentView.originalItem) + this.itemSet.length - 1)%this.itemSet.length])
    }
}), CoreImage.SlideshowView.reopen({
    touchStart: function(e) {
        if (this.currentView && this.currentView.hasPinchZoomability && this.currentView.allowZoom)
            return arguments.callee.base.apply(this, arguments);
        if (e && e.touches && e.touches.length > 1)
            return;
        var t = e && e.touches && e.touches[0] && e.touches[0].clientX;
        return t ? (this._initialSwipeTouchX = t, this._isTouchReadyToSwipe = YES, arguments.callee.base.apply(this, arguments)) : arguments.callee.base.apply(this, arguments)
    },
    touchMove: function(e) {
        var t = e && e.touches && e.touches[0] && e.touches[0].clientX;
        return t ? this._isTouchReadyToSwipe ? (this.swipeToOffset(t - this._initialSwipeTouchX), this._isTouchSwiping = YES, arguments
        .callee.base.apply(this, arguments)) : arguments.callee.base.apply(this, arguments) : arguments.callee.base.apply(this, arguments)
    },
    touchEnd: function(e) {
        return this._isTouchSwiping ? (this._isTouchSwiping = this._isTouchReadyToSwipe = NO, this._initialSwipeTouchX = undefined, this.swipeTouchDidEnd(), arguments.callee.base.apply(this, arguments)) : arguments.callee.base.apply(this, arguments)
    }
}), CoreImage.BasicDialogView = Core.View.extend({
    className: "Journal.BasicDialogView",
    rootHTML: '<div class="basic-dialog"><div class="background"><div class="middle"></div><div class="right"></div><div class="left"></div></div><div class="caption"></div></div>',
    captionElement: "layer.lastChild",
    title: null,
    widthPadding: 0,
    leftPadding: 0,
    titleDidChange: function() {
        this.caption.innerHTML = this.title || "&nbsp;", this.doLayerAdjustments()
    }.observes("title", "render"),
    doLayerAdjustments: function() {
        if (!this.isAppendedInWindow)
            return;
        this.adjustLayerWidth(), this.centerLayerHorizontally(), this.centerLayerVertically()
    }.observes("isAppendedInWindow", ".owner.size"),
    adjustLayerWidth: function() {
        if (this._adjustedLayerWidth)
            return;
        this.caption.style.marginLeft = this.leftPadding - 1 + "px";
        var e = this.caption.offsetWidth + this.widthPadding;
        if (isNaN(e))
            return;
        this.layer.style.width = Math.round(e) + "px", this._adjustedLayerWidth=!0
    },
    centerLayerHorizontally: function() {
        var e = this.layer, t = Math.round(this.owner.size.height / 2), n = t - Math.round(e.clientHeight / 2);
        if (isNaN(n))
            return;
        this.layer.style.top = Math.round(n) + "px"
    },
    centerLayerVertically: function() {
        var e = this.layer, t = Math.round(this.owner.size.width / 2), n = t - Math.round(e.clientWidth / 2);
        if (isNaN(n))
            return;
        this.layer.style.left = Math.round(n) + "px"
    }
}), CoreImage.QuickTimeErrorView = CoreImage.BasicDialogView.extend({
    widthPadding: B.rightToLeft ? 70: 75,
    leftPadding: B.rightToLeft ? 25: 0,
    dlButtonView: Core.ButtonView.extend({
        rootHTML: '<div><div class="crazy-extender eye-transparent-mouse-opaque"></div><div>',
        crazyExtenderElement: "layer.firstChild",
        action: function() {
            window.location.href = "_URL.DownloadQuicktime".loc()
        },
        getLinkAndSizeExtender: function() {
            if (!this.isAppended)
                return;
            this.link = this.getPath(B.leftToRight ? "layer.previousSibling.lastChild" : "layer.previousSibling.firstChild");
            if (!this.link)
                return;
            (this.link.tagName || "").toLowerCase() !== "a" && (this.link = null);
            if (!this.link)
                return;
            this.crazyExtender.style[B.leftToRight ? "left": "right"] =- this.link.offsetWidth - 12 + "px"
        }.observes("isAppendedInWindow"),
        brightenLinkText: function() {
            if (!this.link)
                return;
            this.isOver ? $(this.link).addClass("hover") : $(this.link).removeClass("hover")
        }.observes("isOver"),
        brightenLinkTextMore: function() {
            if (!this.link)
                return;
            this.isActive ? $(this.link).addClass("active") : $(this.link).removeClass("active")
        }.observes("isActive")
    })
}), CoreImage.FadingTextSwapperView = Core.TransitionerView.extend({
    allowInterruption: YES,
    defaultTransition: Core.transitionBank.xFade || Core.TransitionerView.prototype.defaultTransition,
    minLeft: 0,
    minLeftPadding: 10,
    align: "center",
    textLeft: null,
    textWidth: null,
    showText: YES,
    currentView: CoreImage.MeasuredTextLabelView = Core.View.extend({
        classNames: "measured-label".w(),
        value: "",
        rootHTML: '<div><div class="text"></div></div>',
        escapeHTMLBinding: "from:.owner.escapeHTML",
        textElement: "layer.firstChild",
        alignBinding: "from:.owner.align"
        ,
        minLeftBinding: "from:.owner.minLeft",
        minLeftPaddingBinding: "from:.owner.minLeftPadding",
        leftBinding: "to:.owner.textLeft",
        widthBinding: "to:.owner.textWidth",
        showTextBinding: "from:.owner.showText",
        showTextDidChange: function() {
            this.showText ||!this.isAppendedInWindow ? this.owner.transitioner || $(this.text).addClass("show").removeClass("hide") : $(this.text).addClass("hide").removeClass("show")
        },
        __runShowTextDidChange__: function() {
            var e = this;
            setTimeout(function() {
                e.showTextDidChange()
            }, 0)
        }.observes("showText", ".owner.transitioner", "isAppendedInWindow"),
        writeValue: function() {
            if (!this.isAppendedInWindow)
                return;
            this.text.style.left = "", this.text.style.right = "";
            var e = this.value + "";
            this.escapeHTML && (e = Core.escapeHTML(e)), this.text.innerHTML = e, this.set("width", this.text.offsetWidth)
        }.observes("value", "isAppendedInWindow"),
        hideSurroundingDOMEntranceForIOS6AndUp: B.iOS >= 6 ? function() {
            this.layer.style.visibility = "hidden", this.layer.style.top = "-300px";
            var e = this, t = this._visRestorer || (this._visRestorer = function() {
                e.layer.style.visibility = "", e.layer.style.top = ""
            });
            Anim.listen("nextFrame", t)
        }.observes("willAppend"): undefined,
        positionLayer: function() {
            var e = this.align;
            e !== "right" ? this.layer.style.left = e === "center" ? "50%" : "0px" : this.layer.style.right = this.width + "px", this.trigger("layerPositioned")
        }.observes("width"),
        positionText: function() {
            if (!this.width ||!this.isAppended ||!this.isAppendedInWindow)
                return;
            this.align === "center" ? this.centerText() : (this.text.style.left = "0px", this.set("left", this.owner.layer.offsetLeft + this.layer.offsetLeft))
        }.observes("layerPositioned", "minLeft", "Core.windowSize"),
        centerText
        : function() {
            var e = Math.round(this.width / 2), t = e*-1, n = this.layer.offsetLeft;
            this.text.style.left = t + "px";
            var r = t + n - (this.minLeft + this.minLeftPadding);
            r < 0 && (t -= r, this.text.style.left = t + "px"), e + (r < 0 ? r*-1 : 0) > n ? this.text.style.right = n*-1 + "px" : this.text.style.right = "", this.set("left", n + t)
        }
    }).extend({
        initiallyAppended: NO
    }),
    _previousView: CoreImage.MeasuredTextLabelView.extend({
        initiallyAppended: NO
    }),
    updateToValue: function() {
        if (!this.layer)
            return;
        this._previousView.set("value", this.value);
        var e = this.currentView;
        this.set("currentView", this._previousView), this._previousView = e
    }.observes("value", "render")
}), function() {
    var e, t, n;
    CoreImage.transitionBank = B.android ? {} : {
        zoomImageIn: Core.transitionBank.liftTo.superclass.extend(e = {
            isMixin: YES,
            zoomMaskContainerLayout: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            removeZoomImage: function() {
                if (!this.isUsingZoomImage)
                    return;
                var e = this.zoomMask, t = this.zoomMaskContainer;
                this.bigView.unhideZoomImageItem && this.bigView.unhideZoomImageItem(), e && (this._zoomImageFader = Anim.Fader.go({
                    element: e,
                    to: 0,
                    duration: B.chrome ? 0: 1e3 * (!(B.msie <= 8)&&!B.mozilla),
                    finalize: function() {
                        !B.iOS && t && t.parentNode && t.parentNode.removeChild(t), B.iOS && (t.style.webkitTransform = "translate3d(-10000px,-10000px,0)"), Anim.setOpacity(e, 1), B.mozilla && (e.firstChild.src = Core.emptyImageSrc)
                    }.observes("finish")
                }))
            }.observes("finish"),
            initializeZoomImage: function() {
                Anim.tellFinish(this._zoomImageFader);
                var e = this.bigView, t = this.smallView;
                if (!e ||!e.getBigZoomInfo ||!t ||!t.getSmallZoomInfo)
                    return;
                var n = t.getSmallZoomInfo(), r = e.getBigZoomInfo();
                if (!n ||!r)
                    return;
                this.isUsingZoomImage = YES;
                var i = this.zoomMaskContainer
                , s, o;
                if (!i) {
                    i = this.zoomMaskContainer = document.createElement("div"), i.style.cssText = "position:fixed; overflow:hidden; z-index:1701; pointer-events:none;";
                    for (var u in this.zoomMaskContainerLayout)
                        i.style[u] = this.zoomMaskContainerLayout[u] + "px";
                    o = this.zoomMask = document.createElement("div"), o.style.cssText = "position:absolute; z-index:1701; overflow:hidden; pointer-events:none; opacity:0;", o.appendChild(s = new Image), s.style.cssText = "position:absolute; z-index:1; pointer-events:none;", i.appendChild(o)
                }
                o = this.zoomMask = i.firstChild, s = this.zoomImage = o.firstChild, s.src = r.src || n.src, o.style.opacity = 0, B.iOS && (i.style.webkitTransform = "translate3d(0,0,0)"), document.body.appendChild(i), this.bigView.hideZoomImageItem && this.bigView.hideZoomImageItem()
            }.observes("start"),
            renderZoomImage: function() {
                if (!this.isUsingZoomImage)
                    return;
                var e = this.smallView.getSmallZoomInfo && this.smallView.getSmallZoomInfo(), t = this.bigView.getBigZoomInfo && this.bigView.getBigZoomInfo(), n = this.getProgress(), r = 1 - n, i = Math.round;
                if (!e ||!t)
                    return;
                var s = e.cropT, o = e.cropL, u = e.cropW, a = e.cropH, f = e.imageT, l = e.imageL, c = e.imageW, h = e.imageH, p = t.top, d = t.left, v = t.width, m = t.height, g = n * p + r * s, y = n * d + r * o, b = n * v + r * u, w = n * m + r * a, E = n * p + r * f - g, S = n * d + r * l - y, x = n * v + r * c, T = n * m + r * h, N = this.zoomMask.style, C = this.zoomImage.style;
                if (!B.chrome && Core.useGPUForBigs && Core.windowSize.width <= Core.maxGPUTextureSize) {
                    C.top = "0px", C.left = "0px", N.top = p + "px", N.left = d + "px", N.width = C.width = v + "px", N.height = C.height = m + "px";
                    var k = (o - l) / (c - u || Infinity), L = (s - f) / (h - a || Infinity);
                    N.webkitTransform = "translateX(" + (y + b / 2 - (d + v / 2)) + "px) " + "translateY(" + (g + w / 2 - (p + m / 2)) + "px) " + "scaleX(" +
                    b / v + ") scaleY(" + w / m + ") " + "translateZ(0px)", C.webkitTransform = "translateX(" + (l - o + c / 2 - (r * u / 2 + n * ((u + u - c) * k + (1 - k) * c) / 2)) * (v / b) + "px) " + "translateY(" + (f - s + h / 2 - (r * a / 2 + n * ((a + a - h) * L + (1 - L) * h) / 2)) * (m / w) + "px) " + "scaleX(" + x / b + ") " + "scaleY(" + T / w + ") " + "translateZ(0px)"
                } else 
                    N.top = i(g) + "px", N.left = i(y) + "px", N.width = i(b) + "px", N.height = i(w) + "px", C.top = i(E) + "px", C.left = i(S) + "px", C.width = i(x) + "px", C.height = i(T) + "px", C.webkitTransform = N.webkitTransform = "";
                N.opacity = ""
            }.observes("frame")
        }, t = {
            isMixin: YES,
            getProgress: function() {
                return (this.current - this.from) / (this.to - this.from)
            },
            start: function() {
                return this.smallView = this.frView, this.bigView = this.toView, arguments.callee.base.apply(this, arguments)
            }
        }),
        zoomImageOut: Core.transitionBank.dropFrom.superclass.extend(e, n),
        xFadeToZoomImageIn: Core.transitionBank.xFadeTo.extend(e, t, {
            duration: 500
        })
    }
}(), CoreImage.VideoPlayerView = Core.View.extend({
    classNames: "video-player",
    shouldAutoPlay: YES,
    format: "mp4",
    mimes: {
        mov: "video/x-m4v",
        mp4: "video/mp4"
    },
    establishMimeType: function() {
        this.mimeType = this.mimes[this.format]
    }.observes("init"),
    updateToVideo: function() {
        window.player = this;
        if (!this.layer)
            return;
        if (!this.value)
            return;
        var e = this.reps = this.value.videoDerivatives;
        if (!e)
            return;
        var t, n, r = [];
        for (n in e)
            r.push(n);
        r.sort(), B.mobile && Math.max(Core.windowSize.width, Core.windowSize.height) <= 1e3 ? t = e[r[0]] : t = e[r[r.length - 1]], Core.debug("Playing video: the preferred representation is ", t);
        if (!t)
            return;
        var i = t.url ? t.urls = [t.url]: t.urls, s = this, o = t.fileInfo, u = function() {
            s.didGetUrls(t)
        }, a = function() {
            s.trigger("videoNotFound")
        };
        i ? u() : Photos.getUrlsForSingleAssetRecord(this.value, u, a
        , "video")
    }.observes("value", "render"),
    didGetUrls: function(e) {
        if (!e)
            return;
        var t = e.urls, n = this, r = Photos.videoDetector.choices[this.format], i, s, o;
        if (B.chrome)
            for (s = 0; s < t.length; s++)
                t[s] += "&chrome_unique=" + Math.round(Math.random() * 1e9);
        Core.debug("Initializing " + r + " video player for " + this.format + " video with URLs " + t), r === "quicktime" && (B.msie ? (this.layer.innerHTML = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="https://www.apple.com/qtactivex/qtplugin.cab#version=7,3,0,0" playerType="quicktime"><param name="src" value="' + t[0] + '" />' + '<param name="controller" value="true" />' + '<param name="wmode" value="window" />' + '<param name="showlogo" value="false" />' + '<param name="scale" value="tofit" />' + '<param name="bgcolor" value="black" />' + '<param name="kioskmode" value="true" />' + '<param name="autoplay" value="'+!!this.shouldAutoPlay + '" />' + '<param name="enablejavascript" value="true" />' + '<param name="postdomevents" value="true" />' + '<param name="cache" value="true" />' + "</object>", i = this.video = this.layer.firstChild, i.isQT = YES, i._urls = t, i._currentUrl = 0, this._addQTDOMEvents()) : (this.layer.innerHTML = '<EMBED SRC="' + t[0] + '"' + 'CONTROLLER="true" ' + 'TYPE="video/quicktime" ' + 'PLUGINSPAGE="www.apple.com/quicktime/download" ' + 'EnableJavaScript="true" ' + 'postdomevents="true" ' + 'BGCOLOR="000000" ' + 'SHOWLOGO="false" ' + 'SCALE="TOFIT" ' + 'AUTOPLAY="'+!!this.shouldAutoPlay + '" ' + 'KIOSKMODE="true" ' + 'CACHE="true" ' + 'NAME="qtMovie' + this.coreGuid + '" ' + "/>", i = this.video = this.layer.firstChild, i.isQT = YES, i.isQTEmbed = YES, i._urls = t, i._currentUrl = 0, this._addQTDOMEvents()));
        if (r === "html5"
        ) {
            this.video = i = document.createElement("video"), i.setAttribute("controls", "controls"), i.setAttribute("autoplay", this.shouldAutoPlay);
            if (B.onlyiOS)
                i.src = t[0], i.style.opacity = 0, Core.addEvent(i, "play", function() {
                    this.style.opacity = "", n.owner.trigger("ios_videoDidBeginPlaying")
                }), i._urls = t, i._currentlyAttemptingUrlIndex = 0;
            else {
                o = t.length;
                for (s = 0; s < o; s++) {
                    var u = t[s], a = document.createElement("source");
                    a.setAttribute("type", this.mimeType), a.setAttribute("src", t[s]), a.onerror = function() {
                        Core.debug("Failed to load video resource at " + this.src + ". Attempting fallback if possible.")
                    }, i.appendChild(i._lastSource = a)
                }
            }
            i.isHTML5 = YES, this.layer.appendChild(i), this._addHTML5DOMEvents()
        }
        this.trigger("didRenderVideo"), this.forceDebugErrorDisplay && setTimeout(function() {
            n.trigger("playbackDidErr")
        }, 200)
    },
    _addQTDOMEvents: function() {
        var e = this.video, t = this;
        Core.addEvent(e, "qt_ended", function(e) {
            t.trigger("playbackDidEnd", e)
        }), Core.addEvent(e, "qt_error", function(e) {
            var n = this._urls, r;
            if (!n)
                return t.trigger("playbackDidErr", e);
            this._currentUrl++;
            if (!n[r = this._currentUrl])
                return t.trigger("playbackDidErr", e);
            this.src = n[r]
        })
    },
    _addHTML5DOMEvents: function() {
        var e = this.video, t = this;
        Core.addEvent(e, "ended", function(e) {
            t.trigger("playbackDidEnd", e)
        }), Core.addEvent(e._lastSource || e, "error", function(e) {
            var n;
            if (B.onlyiOS)
                if (n = this._urls[++this._currentlyAttemptingUrlIndex]) {
                    this.src = n;
                    return 
                }
            t.trigger("playbackDidErr", e)
        })
    },
    play: function() {
        var e = this.video;
        e ? e.isHTML5 && e.play() : this.setIfChanged("shouldAutoPlay", YES)
    },
    pause: function() {
        var e = this.video;
        if (!e)
            this.setIfChanged("shouldAutoPlay", NO);
        else if (e.isHTML5
        )
            try {
                e.pause()
        } catch (t) {
            return 1
        } else 
            try {
                e.Stop()
        } catch (t) {
            return 1
        }
        return 0
    },
    absolutelyStopVideoIfNotInDOM: function() {
        this.isAppendedInWindow || this.pause()
    }.observes("isAppendedInWindow")
}), SC.stringsFor("en-us", {
    _iCloud: "iCloud",
    _Projects: "Projects",
    _Favorites: "Favorites",
    _Journals: "Journals",
    _Slideshows: "Slideshows",
    "_Footer.PrivacyPolicy": "Privacy Policy",
    "_Footer.TermsOfService": "Terms of Service",
    "_Error.JournalNotAvailable": "This journal is not available.",
    "_Error.MontageNotAvailable": "This slideshow is not available.",
    "_Error.ProjectNotAvailable": "This project is not available.",
    "_Error.NoPublicJournalsAvailable": "No public journals are available.",
    "_Error.NoPublicProjectsAvailable": "No public projects are available.",
    "_Error.JournalBeingUpdated": "This journal is being updated. Please try again later.",
    "_Error.MontageBeingUpdated": "This slideshow is being updated. Please try again later.",
    "_Error.ProjectBeingUpdated": "This project is being updated. Please try again later.",
    "_Error.JournalBandwidthLimitExceeded": "This journal cannot be loaded right now. Please try again later.",
    "_Error.MontageBandwidthLimitExceeded": "This slideshow cannot be loaded right now. Please try again later.",
    "_Error.ProjectBandwidthLimitExceeded": "This project cannot be loaded right now. Please try again later.",
    "_Error.ProjectsBandwidthLimitExceeded": "These projects cannot be loaded right now. Please try again later.",
    "_Error.MissingQuicktime": 'Your browser cannot play this video without QuickTime. <a href="%@">Download QuickTime</a>',
    "_Error.CanNotPlayVideo": "Your browser cannot play this video."
    ,
    "_Error.FailureTryingToPlayVideo": "An error occurred while playing this video. Please try again later.",
    "_Error.VideoStillBeingPublished": "This video is still being published. Please try again later.",
    "_Landing.IPhotoJournals": "iPhoto Journals",
    "_Landing.TellAStory": "Tell a story with your photos and share it on the web using iCloud.",
    "_Landing.LearnMore": "Learn More",
    "_Landing.GetIPhoto": "Get iPhoto for iOS",
    "_URL.PrivacyPolicy": "http://www.apple.com/privacy/",
    "_URL.TermsOfService": "http://www.apple.com/legal/icloud/ww/",
    "_URL.Marketing": "http://www.apple.com/apps/iphoto/",
    "_URL.GetIPhoto": "http://itunes.apple.com/us/app/iphoto/id497786065",
    "_URL.DownloadQuicktime": "http://www.apple.com/quicktime/download/",
    "_Date.Format": "MM/DD/YYYY, HH:mm:SS p",
    "_Date.AM": "AM",
    "_Date.PM": "PM",
    "_Accessibility.Food": "Food",
    "_Accessibility.Weather.Unknown": "Weather: Unknown",
    "_Accessibility.Weather.Clear": "Weather: Clear",
    "_Accessibility.Weather.Cloudy": "Weather: Cloudy",
    "_Accessibility.Weather.Flurries": "Weather: Flurries",
    "_Accessibility.Weather.Fog": "Weather: Fog",
    "_Accessibility.Weather.Haze": "Weather: Haze",
    "_Accessibility.Weather.MostlyCloudy": "Weather: Mostly Cloudy",
    "_Accessibility.Weather.MostlySunny": "Weather: Mostly Sunny",
    "_Accessibility.Weather.PartlyCloudy": "Weather: Partly Cloudy",
    "_Accessibility.Weather.PartlySunny": "Weather: Partly Sunny",
    "_Accessibility.Weather.FreezingRain": "Weather: Freezing Rain",
    "_Accessibility.Weather.Rain": "Weather: Rain",
    "_Accessibility.Weather.Sleet": "Weather: Sleet",
    "_Accessibility.Weather.Snow": "Weather: Snow",
    "_Accessibility.Weather.Sunny": "Weather: Sunny"
    ,
    "_Accessibility.Weather.Thunderstorms": "Weather: Thunderstorms",
    "_Accessibility.Weather.Thunderstorm": "Weather: Thunderstorm",
    "_Accessibility.Weather.Overcast": "Weather: Overcast",
    "_Accessibility.Weather.ScatteredClouds": "Weather: Scattered Clouds"
}), Journal = Core.Namespace.create({
    NOWHERE: 0,
    BOOKSHELF: 1,
    JOURNAL: 2,
    SLIDESHOW: 3,
    ERROR: 4,
    LANDING: 5,
    MONTAGE: 6,
    tabNames: "nowhere bookshelf journal slideshow error landing montage".w(),
    isOnAppleServer: location.hostname.indexOf("icloud.com")!==-1 || location.hostname.indexOf("apple.com")!==-1,
    DEFAULT_THEME: "cotton",
    MIN_QUICKTIME_VERSION: "7.6",
    StandaloneOptions: {
        Enable_Download_Button: null,
        Enable_Back_Button: null,
        Back_Button_Destination: null,
        Back_Button_Title: null
    },
    standaloneOptions: Core.Object.create(),
    isBrowserCompatible: function() {
        if (B.s.msie >= 8)
            return !0;
        if (B.desktop)
            return B.s.safari >= 4 || B.s.chrome >= 17 || B.s.opera >= 11 || B.s.mozilla >= 17;
        if (B.mobile) {
            if (B.iOS >= 5)
                return !0;
            if (B.android && (B.s.chrome >= 18 || B.s.safari >= 4 || B.mozilla >= 24))
                return !0;
            if (B.silk)
                return !0
        }
        return !1
    },
    isBrowserSupported: function() {
        if (B.s.msie >= 9)
            return !0;
        if (B.desktop)
            return B.s.safari >= 5 || B.s.chrome >= 25 || B.s.mozilla >= 20;
        if (B.mobile) {
            if (B.iOS >= 5)
                return !0;
            if (B.android && (B.s.chrome >= 18 || B.s.safari >= 4))
                return !0;
            if (B.silk)
                return !0
        }
        return !1
    },
    prewrapify: function(e) {
        return (e + "").split("↵").join("\n").split("\n ").join("\n&nbsp;").split("\n").join("<br>").split("  ").join("&nbsp; ")
    },
    pruneAllButSimpleFormatting: function(e) {
        return e ? (e = e.replace(/<(\/?)(b|B|u|U|i|I|br|BR|p|P)>/g, "###NOXSS_$1$2###"), e = Core.escapeHTML(e), e = e.replace(/###NOXSS_(b|B|u|U|i|I|br|BR|p|P)###/g, "<$1>"), e = e.replace
        (/###NOXSS_&#47;(b|B|u|U|i|I|br|BR|p|P)###/g, "</$1>"), e) : ""
    },
    didReceiveStandaloneOptions: function() {
        for (var e in Journal.StandaloneOptions)
            Journal.standaloneOptions.setIfChanged(e, Journal.StandaloneOptions[e])
    },
    imageDownloadTimes: [],
    imageDownloadSizes: [],
    estimateAvailableBandwidth: function() {
        var e = this.imageDownloadTimes, t = this.imageDownloadSizes, n = e.length, r = t.length, i, s = 0, o = 0, u = 0, a = 0, f = 0, l, c, h, p, d;
        if (!n)
            return 0;
        if (n === 1)
            return t[0] / (e[0] - 500 * (!!Journal.URLResolver&&!!Journal.URLResolver.isUbiquityMode));
        for (i = 0; i < n; i++)
            s += e[i];
        s/=n;
        for (i = 0; i < r; i++)
            o += t[i];
        o/=r;
        for (i = 0; i < n; i++)
            u += (l = (c = e[i]) - s) * l, a += (l = (h = t[i]) - o) * l, f += (c - s) * (h - o);
        return p = f / u, p
    },
    receiveRelativePath: function(e) {
        Journal.journalController.receiveRelativePath(e)
    },
    interfaceOrientationChanged: function(e) {
        e === "portrait" && (e = 0), e === "landscape" && (e = 90), (Core.windowSizeOverride || (Core.windowSizeOverride = {})).orientation = isNaN(e) ? undefined : e, Core._windowDidResize()
    },
    configureAnimator: function() {
        Anim.enableOldIE = NO
    }.observes("init"),
    configureDowner: function() {
        var e = CoreImage.imageLoader.threads;
        if (e.length < 6)
            return;
        e[0].ignoreTester = function(e) {
            return e.isRequest && e.isUbiquityRequest
        }, e[1].ignoreTester = function(e) {
            return e.isRequest && e.rep && e.rep._key && parseInt(e.rep._key, 0) >= 1e3
        }
    }.observes("init"),
    configureMinimumWindowWidth: function() {
        Core.set("minWindowWidth", 768)
    }.observes("init"),
    _cont: "eGxhWEJvYjNSdk9ESktPVE5ZTjFReU5YNWpiMjErWVhCd2JHVitiVzlpYVc",
    INITIAL_IMAGES: window.devicePixelRatio > 1 ? []: [],
    prefetchInitialImages: function() {
        if (this._prefetched === (this._prefetched = YES))
            return;
        var e = this;
        setTimeout(function() {
            for (
            var t = 0, n = e.INITIAL_IMAGES.length, r; t < n; t++)(r = (r = e.INITIAL_IMAGES[t])instanceof Function ? r() : r) 
                && CoreImage.ImageRequest.create({
                    url: r,
                    importance: - 1e5
                })
        }, 4e3)
    }.observes("Core.windowDidLoad")
}), function() {
    var e = Core.debase64(Journal._cont);
    Journal._cont = Core.debase64(e.substring(10) + e.substring(0, 10))
}(), function() {
    Journal.isOnAppleServer || Core.errorCatcher.detach()
}(), Journal.bookshelfController = window.jlc = Core.Object.create({
    JSON_TRANSFORM: {
        selfPath: "craftBookshelfVisitUrl > selfVisitUrl",
        _ensureExists_type: "bookshelf",
        journals: function(e, t) {
            return e&&!t.projects && (t.projects = e, Core.debug('Moved old "journals" array to "projects" to make old bookshelf JSON feed match new schema.')), undefined
        },
        projects_jsontransform2: function(e) {
            for (var t = 0, n; n = e[t]; t++)
                n.hasOwnProperty("includeOnIndexPage")&&!n.includeOnIndexPage && (e.splice(t, 1), t--);
            return e
        },
        projects_jsontransform1: function(e) {
            for (var t = 0, n = NO, r; r = e[t]; t++)(r.timeIntervalSinceReferenceDate = parseFloat(r.timeIntervalSinceReferenceDate)
                ) ? n = YES : r.timeIntervalSinceReferenceDate = Infinity;
            return n && e.sort(function(e, t) {
                return t.timeIntervalSinceReferenceDate - e.timeIntervalSinceReferenceDate || 0
            }), e
        },
        projects: [{
            filePath: "craftPublicJSONUrl > url",
            _ensureExists_type: "journal",
            _ensureExists_isFavorite: !1,
            isFavorite: function(e) {
                return !!e
            },
            _ensureExists_toString: function() {
                return "[" + this.type + ":" + Core.guidFor(this) + "]"
            },
            appearance: Journal.APPEARANCE_TRANSFORM = {
                keyPhoto_jsontransform1: function(e, t) {
                    return e.photoReps ? e : (e.photoReps = {}, e.photoReps[Math.max(e.width, e.height)] = {
                        filePath: e.filePath,
                        fileSize: e.fileSize
                    }, !isNaN(t.cropLeft) ||
                    (t.cropLeft = .5), !isNaN(t.cropTop) || (t.cropTop = 0), t.zoom >= 1 || (t.zoom = 1), e)
                },
                keyPhoto: {
                    filePath: "remove",
                    fileSize: "remove",
                    photoReps: {
                        "*": {
                            filePath: "createFileInfoObj > fileInfo"
                        }
                    }
                }
            }
        }
        ]
    },
    fetchInitialList: function(e, t) {
        var n = Journal.initialStateController, r = Journal.URLResolver;
        if (r.isUbiquityMode&&!n.ubiquityPath)
            return Core.warn("No file path was provided. Cannot retrieve bookshelf feed.");
        this.fetchList(n.localFeed || r.craftPublicJSONUrl(n.ubiquityPath), n.ubiquityPath, e, t)
    },
    fetchListFromProject: function(e, t, n) {
        this.fetchList(e.listUrl, e.listPath, t, n)
    },
    fetchList: function(e, t, n, r) {
        if (this.hasFetchedList)
            return n && n();
        if (this.listRequest) {
            this.listRequest.listen("success", n), this.listRequest.listen("error", r);
            return 
        }
        if ((!e ||!(this.url = e))&&!(e = this.url))
            return r && r();
        this.set("listRequest", Core.Request.send({
            url: e,
            owner: this,
            gotcha: function(e) {
                var i = e.responseObject;
                i.selfPath || (i.selfPath = t), this.owner.didReceiveList(i) ? n && n() : (this.owner.didFailToReceiveList(e && e.status), r && r())
            }.observes("success"),
            failed: function(e) {
                this.owner.didFailToReceiveList(e && e.status), r && r()
            }.observes("error"),
            partitionRedirection: function(e) {
                if (!e.responseObject)
                    return;
                var n = parseInt((e.responseObject["X-Apple-MMe-Host"] + "").substring(1), 10);
                if (!n)
                    return;
                this.stopError(), Journal.initialStateController.partition = n, window.location = Journal.URLResolver.craftBookshelfVisitUrl(t), window.location.reload()
            }.observes("error330"),
            logMe: function() {
                Core.debug("Requesting feed for bookshelf.")
            }.observes("willSend")
        }))
    },
    didReceiveList: function(e) {
        try {
            e.title || (e.title = "_Projects".loc()), Journal.URLResolver.processJSONObject
            (e, this.JSON_TRANSFORM);
            var t = e.projects, n, r, i, s, o, u = NO;
            if (!t ||!t.length)
                return Core.debug("Successfully received a bookshelf, but there are no projects."), NO;
            if ((n = Journal.journalController.journal) && (r = n.uuid))
                for (i = 0; !u && (s = t[i]); i++)
                    if (s.type === "journal" && s.uuid === r) {
                        for (o in s)
                            n.hasOwnProperty(o) || (n[o] = s[o]);
                            t[i] = n, u = YES
                    }
            return Core.debug("Received bookshelf feed."), this.set("hasFetchedList", !0), this.set("list", e), YES
        } catch (a) {
            return Core.debug("Error while processing bookshelf feed JSON.\nError:", a), NO
        }
    },
    didFailToReceiveList: function(e) {
        Core.debug("Failed to receive bookshelf feed.");
        var t = "\n" + "_Error.NoPublicProjectsAvailable".loc(), n;
        e === 509 && (n = "_Error.ProjectsBandwidthLimitExceeded".loc(), n.indexOf("_Error")===-1 && (t = n)), Journal.errorController.set("errorMessage", t), Journal.workspaceController.set("nowShowing", Journal.ERROR)
    }
}), Journal.define("errorController", Core.Object.create({
    errorMessage: "",
    setDocumentTitle: function() {
        document.title = this.errorMessage
    }.observes("errorMessage")
})), Journal.define("URLResolver", window.urlr = CoreImage.URLResolver.create({
    isLocalMode: window.RELATIVE_URLS,
    isRelativeMode: window.RELATIVE_URLS,
    isUbiquityMode: YES,
    _determineRemainingModeProperties: function() {
        this.setIfChanged("modeName", this.isLocalMode ? this.isRelativeMode ? "relative" : "local" : "ubiquity"), this.setIfChanged("isUbiquityMode", !this.isLocalMode&&!this.isRelativeMode)
    }.observes("init", "isLocalMode", "isRelativeMode"),
    getThemeInfo: function(e) {
        return Journal.THEME_INFOS[e] || Journal.THEME_INFOS[Journal.DEFAULT_THEME]
    },
    resolveValuePath: function(e, t, n, r) {
        return t.value = Core.Object.prototype
        .resolvePropertyPath.call(r[1].assets, "." + e), t.value === undefined ? e : undefined
    },
    localUrlTransform: function(e) {
        return "/journal_fixtures/" + e
    },
    relativeUrlTransform: function(e) {
        return e.substring(e.lastIndexOf("/") + 1)
    },
    craftPublicJSONUrl: function(e) {
        if (!this.isUbiquityMode)
            return this[this.modeName + "UrlTransform"](e);
        var t = Journal.initialStateController;
        return "https://p" + t.partition + "-ubiquityws.icloud.com/ws/public/file?path=/" + Journal._cont + "/Public/" + e.split("/").remove(Journal._cont).remove("Public").remove("").join("/") + "&token=" + t.token + "&salt=" + (new Date * 1 + "" + new Date * 1).substring(0, 13)
    },
    craftProjectVisitUrl: function(e) {
        return this._craftVisitUrl(e, "journal")
    },
    craftBookshelfVisitUrl: function(e) {
        return this._craftVisitUrl(e, "bookshelf")
    },
    _craftVisitUrl: function(e) {
        if (!e)
            return window.location + "";
        var t = Journal.initialStateController, n = {
            p: (t.getPath("_unmodifiedParams.p.0") === "0" ? "0" : "") + parseInt(t.partition, 10),
            t: (t.token || "").split("=").join(""),
            f: e.split("/").remove(Journal._cont).remove("Public").remove("").join("/")
        }, r = t.params, i = t.semicolonDelimitedKeys, s = "", o, u, a;
        n.f = n.f.split(".jb/index.json").join(""), n.f = n.f.split("index.json").join("");
        for (o in r) {
            if (n.hasOwnProperty(o) ||!r.hasOwnProperty(o))
                continue;
            n[o] = r[o]
        }
        n.tab === "journal" && delete n.tab;
        for (o = 0; (u = i[o]) && (a = n[u]); o++)
            s += (n[u] || "") + ";";
        return s[s.length - 1] === ";" && (s = s.slice(0, - 1)), t.baseUrl + s
    },
    createFileInfoObj: function(e) {
        return new this.FileInfoItem(e)
    },
    FileInfoItem: function() {
        var e = function(e) {
            this.filePath = e
        };
        return e.prototype = {
            requestSingleUrlSet: function(e, t, n) {
                this.urlSet && this.urlSet.expiry < new Date * 1 &&
                this.clearExpiredUrlInfo(), this.urlSet&&!this.urlSet.urls && this.clearExpiredUrlInfo();
                if (!n && this.urlSet)
                    return e && e(this.urlSet.urls);
                if (!n && this.isUrlSetReqFailed)
                    return t && t();
                var r = this.urlSetRequest;
                return n && r && r.resolution && this.clearCallbacks(), n && r && r.ignoreFileInfo(this), e && (this._singleSuccesses || (this._singleSuccesses = [])).push(e), t && (this._singleFailures || (this._singleFailures = [])).push(t), (!r || n) && Journal.URLResolver.requestSinglePublicUrlSet(this), null
            },
            clearExpiredUrlInfo: function() {
                this.urlSet = this.urlSetRequest = this.isUrlSetReqFailed = null, this.clearCallbacks()
            },
            didFailToReceiveUrlSet: function(e) {
                this.isUrlSetReqFailed = YES, this.urlSet = null;
                var t = this.imageRequests, n, r, i;
                for (n = 0; r = t && t[n]; n++)
                    r.didErr();
                for (n = 0; i = this._singleFailures && this._singleFailures[n]; n++)
                    i();
                this.clearCallbacks()
            },
            didReceiveUrlSet: function(e) {
                this.isUrlSetReqFailed = NO, this.urlSet = e, Core.guidFor(this);
                var t = this.imageRequests, n = this._singleSuccesses, r = this._singleFailures, i = e && e.urls, s, o, u;
                if (i) {
                    for (s = 0; o = t && t[s]; s++)
                        o.set("urls", i);
                    for (s = 0; u = this._singleSuccesses && this._singleSuccesses[s]; s++)
                        u(i)
                } else 
                    this.didFailToReceiveUrlSet();
                this.clearCallbacks()
            },
            clearCallbacks: function() {
                this._singleSuccesses && (this._singleSuccesses.length = 0), this._singleFailures && (this._singleFailures.length = 0)
            },
            registerSuccessfulURL: function(e) {
                if (!this.urlSet)
                    return;
                var t = this.urlSet.urls || (this.urlSet.urls = []);
                t.length = 0, t[0] = e, t = this.urls, t && (t.length = 0, t[0] = e)
            }
        }, e
    }(),
    scheduleBatchCreateURLPickup: function() {
        if (this._batchPickupTimeout)
            return;
        var e = this;
        this._batchPickupTimeout = setTimeout(function() {
            e.performBatchCreateURLPickup
            ()
        }, 20)
    },
    performBatchCreateURLPickup: function() {
        this._batchPickupTimeout = null;
        var e, t, n = this, r = CoreImage.imageLoader.getManyNext(25, function(e) {
            return e.url || e.urls ||!e.rep ||!e.rep.fileInfo || e.rep.fileInfo.urlSetRequest
        });
        if (!r ||!r.length)
            return;
        Core.debug("Performing batch create_url request for " + r.length + " fileInfos from the ImageLoader.");
        for (e = 0; t = r[e]; e++)
            r[e] = t.rep.fileInfo;
        this.createCreatePublicUrlRequestForArray((r || Core.emptyArray).concat([]), function() {
            n.scheduleBatchCreateURLPickup()
        }, function() {
            n.scheduleBatchCreateURLPickup(), Core.warn("Warning: create_url call failed. Some photos may appear missing or pixelated when viewed.")
        })
    },
    scheduleBatchRequestSinglePublicUrlSetPickup: function() {
        if (this._singleRequestBatchPickupTimeout)
            return;
        var e = this;
        this._singleRequestBatchPickupTimeout = setTimeout(function() {
            e.performBatchRequestSinglePublicUrlSetPickup()
        }, 20)
    },
    requestSinglePublicUrlSet: function(e, t) {
        if (!e)
            return;
        if (t) {
            Core.debug("Performing single create_url request."), this.createCreatePublicUrlRequestForArray([e]);
            return 
        }
        var n = this._singlePublicUrlSetRequestQueue || (this._singlePublicUrlSetRequestQueue = []);
        n.remove(e), n.push(e), this.scheduleBatchRequestSinglePublicUrlSetPickup()
    },
    performBatchRequestSinglePublicUrlSetPickup: function() {
        this._singleRequestBatchPickupTimeout = null;
        var e = this._singlePublicUrlSetRequestQueue, t = this;
        if (!e ||!e.length)
            return;
        Core.debug("Performing batch create_url request for " + e.length + " standalone fileInfos.");
        var n = e.splice(0, 25);
        this.createCreatePublicUrlRequestForArray(n, function() {
            t.scheduleBatchRequestSinglePublicUrlSetPickup()
        }, function(
        ) {
            t.scheduleBatchRequestSinglePublicUrlSetPickup(), Core.warn("Warning: create_public_url call failed for standalone fileInfos. Some photos or assets may be missing.")
        })
    },
    createCreatePublicUrlRequestForArray: function(e, t, n) {
        if (!e ||!e.length)
            return;
        var r = this, i = Journal.initialStateController, s = this._tempHash || (this._tempHash = {}), o = this._tempArray || (this._tempArray = []), u, a, f, l, c, h;
        o.length = 0;
        for (u = 0; (l = e[u]) || l === null; u++)
            for (a = u + 1; (c = e[a]) || c === null; a++)
                a !== u && l === c && (e[a] = null);
        e.remove(null);
        for (u = 0; f = e[u]; u++)
            s[f.filePath] = f, o.push(f.filePath);
        h = Core.Request.create({
            type: "POST",
            url: "https://p" + i.partition + "-ubiquityws.icloud.com/ws/public/create_url?token=" + Journal.initialStateController.token,
            body: {
                container: Journal._cont,
                item_paths: o
            },
            localFakedResponseObj: this.isUbiquityMode ? null: this.generateLocalFakedCreatePublicUrlResponse(o),
            gotcha: function(n) {
                var i, o = this.localFakedResponseObj || n.responseObject, u;
                for (u = 0; i = o.items[u]; u++) {
                    i.path = i.path.split("/").join("/"), f = s[i.path];
                    if (!f || this._ignore && this._ignore[f.coreGuid])
                        continue;
                    f.didReceiveUrlSet(r.computeUrlSetHash(i, o)), f.__wasMentionedInThisResponse__ = YES
                }
                for (u = 0; f = e[u]; u++) {
                    if (this._ignore && this._ignore[f.coreGuid])
                        continue;
                    f.__wasMentionedInThisResponse__ ? delete f.__wasMentionedInThisResponse__ : f.didFailToReceiveUrlSet()
                }
                t && t(o)
            }.observes("success"),
            failed: function() {
                for (u = 0; f = e[u]; u++)
                    f.didFailToReceiveUrlSet();
                n && n()
            }.observes("error"),
            partitionRedirection: function(e) {
                if (!e.responseObject)
                    return;
                var t = parseInt((e.responseObject["X-Apple-MMe-Host"] + "").substring(1), 10);
                if (!t)
                    return;
                this.stopError(), Journal.initialStateController
                .partition = t;
                var n;
                Journal.workspaceController.nowShowing === Journal.BOOKSHELF ? (n = Journal.bookshelfController.getPath("list.selfPath"), n = n && Journal.URLResolver.craftBookshelfVisitUrl(n) || null) : Journal.workspaceController.nowShowing === Journal.JOURNAL ? (n = Journal.journalController.getPath("journal.selfPath"), n = n && Journal.URLResolver.craftProjectVisitUrl(n) || null) : Journal.workspaceController.nowShowing === Journal.MONTAGE && (n = Journal.montageController.getPath("montage.selfPath"), n = n && Journal.URLResolver.craftProjectVisitUrl(n) || null);
                if (!n)
                    return;
                window.location = n, window.location.reload()
            }.observes("error330"),
            ignoreFileInfo: function(e) {
                (this._ignore || (this._ignore = {}))[Core.guidFor(e)] = YES
            }
        }), this.isUbiquityMode ? h.send() : h.gotcha();
        for (u = 0; f = e[u]; u++)
            f.urlSetRequest = h
    },
    generateLocalFakedCreatePublicUrlResponse: function(e) {
        var t, n;
        for (t = 0; n = e[t]; t++)
            e[t] = {
                path: n,
                url_path: this[this.modeName + "UrlTransform"](n),
                url_expiry: Infinity,
                url_location: this.modeName
            };
        return {
            items: e,
            locations: {
                local: {
                    scheme: location.protocol.slice(0, - 1),
                    hosts: Journal.initialStateController.params.badUrls ? ["BAD_DOMAIN_1", "BAD_DOMAIN_2", "BAD_DOMAIN_3", location.hostname]: [location.hostname]
                },
                relative: {
                    scheme: "",
                    hosts: [""]
                }
            }
        }
    }
})), require("utilities/url_resolver"), Journal.define("initialStateController", window.isc = CoreImage.InitialStateController.create({
    localFeed: undefined,
    partition: undefined,
    token: undefined,
    ubiquityPath: undefined,
    showAllItemsInSlideshow: undefined,
    semicolonDelimitedKeys: "p t f".w(),
    removeInitialParamsPossiblyAddedByApp: function() {
        var e = this.initiallyKnownWindowLocation, t = "view=local orientation=portrait orientation=landscape tab=bookshelf no_qt=1 no_html5_video=1 never_qt=1 video_error=playbackDidErr video_error=videoNotFound"
        .w(), n = this._paramsAddedByApp = {}, r, i, s;
        for (i = 0; s = t[i]; i++) {
            r = s.split("="), s = "&" + s;
            if (e.indexOf(s)===-1)
                continue;
            e = e.split(s).join(""), n[r[0]] = r[1]
        }
        this.initiallyKnownWindowLocation = e
    }.observes("didDiscoverInitiallyKnownWindowLocation"),
    reinstateAppParams: function() {
        for (var e in this._paramsAddedByApp)
            this.params[e] = this._paramsAddedByApp[e]
    }.observes("params"),
    paramTransform_f: function(e, t) {
        return !e ||!e.length || e === "index.json" ? "index.json" : e.indexOf(".jb")!==-1 ? e : e.indexOf("index.json")!==-1 ? e : e + ".jb/index.json"
    },
    retrieveInitialState: function(e, t) {
        window.RELATIVE_URLS && (this.params.localFeed = "index.json", this.paramKeys.contains("localFeed") || this.paramKeys.push("localFeed"));
        if (this.params.localFeed)
            this.handleLocalFeed();
        else if (this.handleUbiquityParams() === 1)
            return;
        this.params.tab === "list" && (this.params.tab = "bookshelf"), this.set("initialTab", this.params.tab || "project"), this.set("loadEnvironment", this.params.view === "local" ? "iphoto" : this.params.view || "web"), this.set("loadOrientation", this.params.orientation || null), this.set("showAllItemsInSlideshow", this.params.full_slideshow || NO), this.params.appid && Journal.set("_cont", Journal._cont.substring(0, Journal._cont.lastIndexOf("~") + 1) + this.params.appid)
    }.observes("params"),
    redirectToMarketingPageWithoutParams: function() {
        if (Journal.URLResolver.isRelativeMode||!!this.paramKeys.length)
            return;
        this.setIfChanged("hadNoParams", YES), window.location = "_URL.Marketing".loc()
    }.observes("Core.windowDidLoad"),
    appendOptionsFileIfNeeded: function() {
        if (!Journal.URLResolver.isRelativeMode)
            return;
        var e = document.createElement("script");
        e.setAttribute("type"
        , "text/javascript"), e.setAttribute("src", "options.txt"), document.body.appendChild(e)
    }.observes("Core.windowDidLoad"),
    goToErrorWithErroneousParams: function() {
        if (!this.params.error)
            return;
        if (this.hadNoParams) {
            if (B.android)
                return;
            Journal.workspaceController.set("nowShowing", Journal.LANDING)
        } else 
            Journal.journalController.didFailToReceiveProject()
    }.observes("Core.windowDidLoad"),
    handleLocalFeed: function() {
        Journal.URLResolver.set("isLocalMode", YES), this.set("localFeed", Journal.URLResolver[Journal.URLResolver.modeName + "UrlTransform"](this.params.localFeed))
    },
    handleUbiquityParams: function() {
        try {
            var e = this.params, t = e.p, n = e.t, r = e.f, i = "";
            isNaN(t) && (i += "No partition specified. "), n || (i += "No token specified. ");
            if (i)
                return this.params.error = YES, Core.warn(i + "Cannot continue. Marking params erroneous so as to invoke journal error UI on window load."), 1;
            t = (t >= 10 ? "" : "0") + t;
            if (!r || r === "index.json")
                this.params.tab = "bookshelf", r = "index.json";
            return r = "/Public/" + r.split("/").remove(Journal._cont).remove("Public").remove("").join("/"), this.set("partition", t), this.set("token", n), this.set("ubiquityPath", r), 0
        } catch (s) {
            return this.params.error = YES, Core.warn("Error in handling Ubiquity params: " + s), 1
        }
    },
    loadOrientationObserver: function() {
        if (!this.loadOrientation ||!B.iOS)
            return;
        Journal.interfaceOrientationChanged(this.loadOrientation)
    }.observes("loadOrientation"),
    killSpinnerIfInIPhoto: function() {
        this.loadEnvironment === "iphoto" && window._removeRHTMLSpinner && window._removeRHTMLSpinner()
    }.observes("loadEnvironment"),
    ensureWindowSizeBelievesStandaloneModeIfInIPhoto: function() {
        if (this.loadEnvironment !== "iphoto"
        )
            return;
        (Core.windowSizeOverride || (Core.windowSizeOverride = {})).standalone = YES
    }.observes("loadEnvironment"),
    applyBodyLoadEnvironmentClassName: function() {
        if (!this.loadEnvironment)
            return;
        document.body.className += " load-environment-" + this.loadEnvironment
    }.observes("Core.windowDidLoad"),
    _retrieveOldHashForIE8: function() {
        Core.debug("Attempting to redirect to a saved URL path to rescue the session from IE8's URL hash removal behavior.");
        if (!Journal.URLResolver.isUbiquityMode)
            return NO;
        if (B.msie !== 8)
            return NO;
        if (!window.sessionStorage)
            return NO;
        try {
            var e = window.sessionStorage.getItem("_iPhotoJournalLastURL"), t = parseInt(e.substring(0, e.indexOf(":")), 10), n = e.substring(e.indexOf(":") + 1);
            return t + 864e5 > new Date * 1 ? n : NO
        } catch (r) {
            return NO
        }
    },
    attemptToAddBackHashForIE8: function() {
        if (B.msie !== 8)
            return;
        var e = this.initiallyKnownWindowLocation || "";
        if (e.indexOf("#")!==-1)
            return;
        var t = this._retrieveOldHashForIE8();
        if (t.indexOf(e) !== 0)
            return;
        Core.debug("Restoring location hash for IE8: overriding intitially known window location."), this.initiallyKnownWindowLocation = t
    }.observes("didDiscoverInitiallyKnownWindowLocation")
})), Journal.ProjectController = Core.Object.extend({
    static_instances: [],
    static_handlers: {},
    trackInstances: function() {
        Journal.ProjectController.instances.push(this), Journal.ProjectController.handlers[this.handlesType] = this
    }.observes("init"),
    static_shiftToAndDisplayInitialProject: function() {
        if (Journal.URLResolver.isRelativeMode) {
            var e;
            return Journal.journalController.fetchRelativeJournal(e = {
                url: "index.json"
            }, "/Public/index.json", function() {
                Journal.journalController.shiftToProject(e), Journal
                .workspaceController.setIfChanged("nowShowing", Journal.JOURNAL)
            }, function() {
                Journal.journalController.didFailToReceiveProject()
            })
        }
        if (Journal.URLResolver.isUbiquityMode&&!Journal.initialStateController.ubiquityPath)
            return Core.warn("No file path was provided. Cannot retrieve project.");
        Journal.ProjectController.RequestTemplate.send({
            preknownProject: Journal.URLResolver.isUbiquityMode ? {
                url: Journal.URLResolver.craftPublicJSONUrl(Journal.initialStateController.ubiquityPath),
                filePath: Journal.initialStateController.ubiquityPath
            }
            : {
                url: Journal.initialStateController.localFeed,
                filePath: Journal.initialStateController.localFeed
            },
            success: function() {
                var e = this;
                this.ownerController.shiftToProject(this.preknownProject, function() {
                    Journal.workspaceController.setIfChanged("nowShowing", Journal[e.ownerController.handlesType.toUpperCase()])
                })
            },
            failure: function() {
                this.ownerController || Journal.ProjectController.didFailToReceiveProject(this.preknownProject)
            },
            init: function() {
                return this.url = this.preknownProject.url, this.ubiquityPath = this.preknownProject.filePath, arguments.callee.base.apply(this, arguments)
            }
        })
    },
    static_RequestTemplate: Core.Request.extend({
        success: null,
        failure: null,
        ownerController: null,
        preknownProject: null,
        url: null,
        ubiquityPath: null,
        gotcha: function(e) {
            this.ownerController || (this.ownerController = this.determineOwnerControllerFromResponse(e.responseObject));
            if (!this.ownerController) {
                Core.debug("Received a project but could not determine its type. Treating as a failure."), this.failure && this.failure();
                return 
            }
            this.ownerController.didReceiveProject(this.preknownProject, e.responseObject, this.ubiquityPath
            ) ? this.success && this.success() : this.failure && this.failure()
        }.observes("success"),
        facepalm: function(e) {
            this.ownerController && this.ownerController.didFailToReceiveProject(this.preknownProject, e && e.status), this.failure && this.failure()
        }.observes("error"),
        accountLocked: function() {}.observes("error503"),
        partitionRedirection: function(e) {
            if (!e.responseObject)
                return;
            var t = parseInt((e.responseObject["X-Apple-MMe-Host"] + "").substring(1), 10);
            if (!t)
                return;
            this.stopError(), Journal.initialStateController.partition = t, window.location = Journal.URLResolver.craftProjectVisitUrl(this.ubiquityPath), window.location.reload()
        }.observes("error330"),
        logMe: function() {
            Core.debug("Requesting feed for project " + this.preknownProject)
        }.observes("willSend"),
        determineOwnerControllerFromResponse: function(e) {
            if (!e)
                return null;
            if (e.type)
                return Journal.ProjectController.handlers[e.type];
            if (e.assetInfo)
                return Journal.montageController;
            if (e.pages)
                return Journal.journalController
        }
    }),
    static_didFailToReceiveProject: function(e, t) {
        Core.debug("Failed to receive project feed for " + e);
        var n = "\n" + "_Error.ProjectNotAvailable".loc(), r;
        t === 409 && (r = "_Error.ProjectBeingUpdated".loc(), r.indexOf("_Error")===-1 && (n = r)), t === 509 && (r = "_Error.ProjectBandwidthLimitExceeded".loc(), r.indexOf("_Error")===-1 && (n = r)), Journal.errorController.setIfChanged("errorMessage", n), Journal.workspaceController.setIfChanged("nowShowing", Journal.ERROR)
    }
}), require("controllers/project"), require("controllers/bookshelf"), Journal.journalController = window.jc = Journal.ProjectController.create({
    handlesType: "journal",
    JSON_TRANSFORM: {
        _ensureExists_appVersion: "0",
        _ensureExists_type
        : "journal",
        _ensureExists_listPath: "/Public/index.json",
        includeOnIndexPage: function(e) {
            return !!e
        },
        appVersion: function(e, t) {
            return e || (e = "0"), t.allowVideoDownloads = Core.compareVersions(e, "1.0.0.1") >= 0, t.shouldUseOldMOVApproach = Core.compareVersions(e, "1.0.1.1b247") <= 0, e
        },
        selfPath: "craftProjectVisitUrl > selfVisitUrl",
        listPath: "craftPublicJSONUrl > listUrl",
        theme: "toLowerCase > themeName",
        _ensureExists_themeName: Journal.DEFAULT_THEME,
        themeName_jsontransform1: function(e) {
            var t = Journal.initialStateController.params.themeOverride;
            return t ? t : e
        },
        themeName: "getThemeInfo > themeInfo",
        appearance: Journal.APPEARANCE_TRANSFORM,
        pages: function(e, t) {
            return t.entries = e, undefined
        },
        pageCount: function() {
            return undefined
        },
        entries: [{
            assets: {
                Photo: [{
                    photoReps: {
                        "*": {
                            filePath: "createFileInfoObj > fileInfo"
                        }
                    },
                    fontFamily: Journal.coalesceFont = function(e, t) {
                        if (!e ||!e.toLowerCase)
                            return e;
                        var n = Journal.fonts || (Journal.fonts = "typewriter marker helvetica noteworthy chalkduster".w());
                        e = e.toLowerCase();
                        for (var r = 0, i; i = n[r]; r++)
                            if (e.indexOf(i)!==-1) {
                                t.font = i;
                                break
                            }
                        return t.font ? undefined : e
                    },
                    _ensureExists_fontSize: Journal.DEFAULT_CAPTION_FONT_SIZE = 12
                }
                ],
                Video: [{
                    photoReps: {
                        "*": {
                            filePath: "createFileInfoObj > fileInfo"
                        }
                    },
                    fontFamily: Journal.coalesceFont,
                    _ensureExists_fontSize: Journal.DEFAULT_CAPTION_FONT_SIZE,
                    _ensureExists_videoReps: null,
                    videoReps: {
                        "*": {
                            filePath: "createFileInfoObj > fileInfo"
                        }
                    },
                    videoReps_jsontransform1: function(e, t, n) {
                        var r = NO;
                        e || (e = {});
                        for (var i in e) {
                            if (!e.hasOwnProperty(i))
                                continue;
                            r = YES, t.format = e[i].filePath.slice( - 3), t.format !== "mp4" && (t.format = "mov"), t.format === "mov" && n.shouldUseOldMOVApproach &&
                            (t.format = "oldmov");
                            break
                        }
                        return r || (t.noVideoReps = YES), e
                    }
                }
                ],
                Map: [{
                    mapReps: "copy > photoReps",
                    photoReps: {
                        "*": {
                            filePath: "createFileInfoObj > fileInfo"
                        }
                    }
                }
                ],
                "*": [{
                    photoReps: function(e) {
                        if (!e || typeof e == "string")
                            return e;
                        var t, n, r, i = this._repsByFilePath || (this._repsByFilePath = {});
                        for (n in e) {
                            if (!e.hasOwnProperty(n))
                                continue;
                            t = e[n], (r = i[t.filePath]) ? t = e[n] = r : i[t.filePath] = t
                        }
                        return e
                    }
                }
                ]
            },
            layouts: [{
                items_jsontransform1: [{
                    valuePath: "resolveValuePath",
                    items: [{
                        valuePath: "resolveValuePath",
                        temperature: "parseInt",
                        condition: "parseInt"
                    }
                    ],
                    numColumns: function(e, t, n, r) {
                        var i = r[r.length - 2];
                        return t.type.toLowerCase() === "grid" && i && (i.numColumnsForGridsInThisLayout = e), e
                    },
                    items_jsontransform1: function(e) {
                        for (var t = 0, n; n = e[t]; t++) {
                            if (n.type !== "Video")
                                continue;
                            if (!n.value)
                                continue;
                            n.value.noVideoReps && (n.type = "Photo")
                        }
                        return e
                    }
                }
                ],
                items_jsontransform2: function(e, t) {
                    var n = t.numColumnsForGridsInThisLayout || 5, r, i;
                    for (var s = 0; r = e[s]; s++) {
                        if (r.type.toLowerCase() !== "photo" && r.type.toLowerCase() !== "video")
                            continue;
                        i = {
                            type: "Grid",
                            numColumns: n,
                            items: [{
                                valuePath: r.valuePath,
                                value: r.value,
                                top: 0,
                                left: 0,
                                width: n,
                                height: n * r.value.height / r.value.width,
                                zoom: 1,
                                cropLeft: .5,
                                cropTop: .5,
                                type: r.type || "Photo"
                            }
                            ]
                        }, e[s] = i
                    }
                    return e
                },
                items_jsontransform3: function(e) {
                    var t, n, r, i, s;
                    for (var o = 1, u, a, f; (u = e[o - 1]) && (a = e[o]); o++) {
                        f = e[o + 1], s = YES;
                        if (!u || u.type.toLowerCase() !== "grid" ||!u.items)
                            continue;
                        if (!a || a.type.toLowerCase() !== "divider" ||!a.hidden) {
                            if (!a || a.type.toLowerCase() !== "grid" ||!a.items)
                                continue;
                            f = a, s = NO
                        }
                        if (!f || f.type.toLowerCase() !== "grid" ||!f.items)
                            continue;
                        if (f.numColumns !== u.numColumns)
                            continue;
                        r =- 1;
                        for (t = 0; n = u.items[t]
                        ; t++)
                            i = parseFloat(n.height) + parseFloat(n.top), i > r && (r = i);
                        for (t = 0; n = f.items[t]; t++)
                            n.top = parseFloat(n.top) + r, u.items.push(n);
                        s && e.remove(a), e.remove(f), o--
                    }
                    return e
                }
            }
            ]
        }
        ]
    },
    journal: null,
    shiftToProject: function(e, t, n) {
        if (!e)
            return;
        var r = this, i = function() {
            var n = r.journal;
            r.journal = e, e !== n && r.trigger("journal"), t && t()
        };
        if (e.isFetched)
            return i();
        this.fetchJournal(e, e.filePath, i, n)
    },
    fetchJournal: function(e, t, n, r) {
        if (!e)
            return;
        if (e.isFetched)
            return n && n();
        Journal.ProjectController.RequestTemplate.send({
            ownerController: this,
            preknownProject: e,
            url: e.url,
            ubiquityPath: t,
            success: n,
            failure: r
        })
    },
    fetchRelativeJournal: function(e, t, n, r) {
        if (!Journal.URLResolver.isRelativeMode)
            return;
        this.set("relativeModeFeedExpectationInfo", {
            success: n,
            failure: r,
            ubiquityPath: t,
            journal: e
        });
        var i = document.createElement("script");
        i.setAttribute("type", "text/javascript"), i.setAttribute("src", e.url), document.body.appendChild(i)
    },
    receiveRelativePath: function(e) {
        var t = this.relativeModeFeedExpectationInfo;
        this.set("relativeModeFeedExpectationInfo", null);
        if (!t)
            return;
        var n = t.success, r = t.ubiquityPath, i = t.journal;
        this.didReceiveProject(i, e, r), n && n()
    },
    didReceiveProject: function(e, t, n) {
        try {
            var r;
            t.selfPath || (t.selfPath = n), Journal.URLResolver.processJSONObject(t, this.JSON_TRANSFORM);
            if (!(r = t))
                throw "Journal does not exist. A parse error may have occurred.";
            if (!(r = r.entries) ||!r.length ||!(r = r[0]))
                throw "Journal does not have any entries (pages).";
            if (!r.assets ||!r.layouts)
                throw "Journal page is missing assets and/or layouts.";
            if (!(r = r.layouts[0]) ||!(r = r.items) ||!r.length)
                throw "Journal page layout is missing or is missing items.";
            for (
            var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i]);
            return e.isFetched = YES, e.toString = function() {
                return "[Journal:" + Core.guidFor(this) + "]"
            }, Core.debug("Received feed for journal " + e), YES
        } catch (s) {
            return Core.debug("Error while processing journal JSON.\nError:", s), this.didFailToReceiveProject(t), NO
        }
    },
    didFailToReceiveProject: function(e, t) {
        Core.debug("Failed to receive journal feed for " + e);
        var n = "\n" + "_Error.JournalNotAvailable".loc(), r;
        t === 409 && (r = "_Error.JournalBeingUpdated".loc(), r.indexOf("_Error")===-1 && (n = r)), t === 509 && (r = "_Error.JournalBandwidthLimitExceeded".loc(), r.indexOf("_Error")===-1 && (n = r)), Journal.errorController.setIfChanged("errorMessage", n), Journal.workspaceController.setIfChanged("nowShowing", Journal.ERROR)
    },
    decideIsJournalPublic: function() {
        this.setIfChanged("isJournalPublic", !!this.journal.listUrl && this.journal.includeOnIndexPage!==!1)
    }.observes("journal"),
    logJournal: function() {
        if (!this.journal)
            return Core.debug("journalController now has no journal.");
        Core.debug("journalController now has journal " + this.journal)
    }.observes("journal")
}), require("controllers/project"), Journal.montageController = window.mc = Journal.ProjectController.create({
    handlesType: "montage",
    JSON_TRANSFORM: {
        _ensureExists_listPath: "/Public/index.json",
        includeOnIndexPage: function(e) {
            return !!e
        },
        selfPath: "craftProjectVisitUrl > selfVisitUrl",
        listPath: "craftPublicJSONUrl > listUrl",
        _ensureExists_type: "montage",
        assetInfo: {
            "*": {
                _ensureExists_isForBlinkWeb: YES,
                _ensureExists_blinkWebPathHeader: YES,
                blinkWebPathHeader: function(e, t, n) {
                    return n.selfPath.substring(0, n.selfPath.lastIndexOf("/") + 1) + "Media/"
                }
            }
        }
    },
    MONTAGE_SIZES
    : "256 384 512 768 1024 2048".w(),
    montage: null,
    isPageReady: NO,
    shouldPageBeReady: NO,
    shiftToProject: function(e, t, n) {
        if (!e)
            return;
        this.set("shouldPageBeReady", YES);
        var r = this, i = function() {
            r.setIfChanged("montage", e), r.showMontageInPageIfAble(t)
        };
        if (e.isFetched)
            return i();
        this.fetchMontage(e, e.filePath, i, n)
    },
    fetchMontage: function(e, t, n, r) {
        if (!e)
            return;
        if (e.isFetched)
            return n && n();
        Journal.ProjectController.RequestTemplate.send({
            ownerController: this,
            preknownProject: e,
            url: e.url,
            ubiquityPath: t,
            success: n,
            failure: r
        })
    },
    didReceiveProject: function(e, t, n) {
        try {
            t.selfPath || (t.selfPath = n), Journal.URLResolver.processJSONObject(t, this.JSON_TRANSFORM);
            for (var r in t)
                t.hasOwnProperty(r) && (e[r] = t[r]);
            return e.isFetched = YES, e.toString = function() {
                return "[montage:" + Core.guidFor(this) + "]"
            }, Core.debug("Received feed for montage " + e), YES
        } catch (i) {
            return Core.debug("Error while processing montage JSON.\nError:", i), this.didFailToReceiveProject(t), NO
        }
    },
    didFailToReceiveProject: function(e, t) {
        Core.debug("Failed to receive feed for montage " + e);
        var n = "\n" + "_Error.MontageNotAvailable".loc(), r;
        t === 409 && (r = "_Error.MontageBeingUpdated".loc(), r.indexOf("_Error")===-1 && (n = r)), t === 509 && (r = "_Error.MontageBandwidthLimitExceeded".loc(), r.indexOf("_Error")===-1 && (n = r)), Journal.errorController.set("errorMessage", n), Journal.workspaceController.set("nowShowing", Journal.ERROR)
    },
    showMontageInPageIfAble: function(e) {
        if (!this.isPageReady) {
            e && (this._successMethodForWhenContainerReady = e);
            return 
        }
        e || (e = this._successMethodForWhenContainerReady), this._successMethodForWhenContainerReady = undefined, e && e()
    },
    handlePageHavingBecomeReady: function(
    ) {
        this.showMontageInPageIfAble()
    }.observes("isPageReady"),
    decideIsMontagePublic: function() {
        if (!this.montage)
            return;
        this.setIfChanged("isMontagePublic", !!this.montage.listUrl && this.montage.includeOnIndexPage!==!1)
    }.observes("montage")
}), require("controllers/bookshelf"), require("controllers/journal"), Journal.define("workspaceController", Core.Object.create({
    nowShowing: Journal.NOWHERE,
    hasBeenAtBookshelfOnce: NO,
    allowProjectBackButton: NO,
    allowErrorBackButton: NO,
    logNowShowing: function() {
        Core.debug("The workspace controller is now showing the " + Journal.tabNames[this.nowShowing] + ".")
    }.observes("nowShowing"),
    showJournal: function(e) {
        Journal.journalController.shiftToProject(e, function() {
            Journal.workspaceController.set("nowShowing", Journal.JOURNAL)
        })
    },
    showMontage: function(e) {
        Journal.montageController.shiftToProject(e, function() {
            Journal.workspaceController.set("nowShowing", Journal.MONTAGE)
        })
    },
    computeDisplayWidth: function() {
        var e = Core.windowSize.width;
        if (B.mobile)
            return this.set("displayWidth", e);
        e -= 34;
        var t = 800, n = B.msie <= 8 ? 2048: Infinity;
        e >= t && (e = Math.round(t + Math.pow(e - t, .9))), e > n && (e = n), this.set("displayWidth", e)
    }.observes("init", "Core.windowSize"),
    decideAllowProjectBackButton: function() {
        if (Journal.URLResolver.isRelativeMode)
            return this.setIfChanged("allowProjectBackButton", Journal.standaloneOptions.Enable_Back_Button);
        this.setIfChanged("allowProjectBackButton", Journal.workspaceController.hasBeenAtBookshelfOnce || Journal.initialStateController.loadEnvironment === "iphoto" || Journal.journalController.isJournalPublic || Journal.montageController.isMontagePublic)
    }.observes("Journal.journalController.isJournalPublic"
    , "Journal.montageController.isMontagePublic", "hasBeenAtBookshelfOnce", "Journal.standaloneOptions.Enable_Back_Button"),
    decideAllowErrorBackButton: function() {
        var e = this.hasBeenAtBookshelfOnce || Journal.initialStateController.params.allowErrorBackButton || Journal.initialStateController.loadEnvironment === "iphoto" || Journal.standaloneOptions.Enable_Back_Button;
        this.setIfChanged("allowErrorBackButton", !!e)
    }.observes("hasBeenAtBookshelfOnce", "Core.windowDidLoad", "Journal.standaloneOptions.Enable_Back_Button"),
    setBodyClassNameToNowShowings: function() {
        var e = this._lastClassNS, t = this.nowShowing;
        if (this._lastClassNS === (this._lastClassNS = t))
            return;
        if (!Journal.tabNames)
            return;
        $(document.body).removeClass(Journal.tabNames[e]), $(document.body).addClass(Journal.tabNames[t])
    }.observes("nowShowing"),
    addURLModeBodyClassName: function() {
        var e = Journal.URLResolver, t = document.body;
        e.isUbiquityMode && (t.className += " ubiquity-mode"), e.isRelativeMode && (t.className += " relative-mode"), e.isLocalMode && (t.className += " local-mode")
    }.observes("Core.windowDidLoad"),
    cancelFullScreenWhenNotSlideshow: function() {
        if (!CoreImage.isFullScreen)
            return;
        this.nowShowing !== Journal.SLIDESHOW && CoreImage.cancelFullScreen()
    }.observes("nowShowing"),
    updateDocumentTitle: function() {
        var e = this.nowShowing;
        if (e === Journal.ERROR)
            return;
        return e === Journal.BOOKSHELF ? document.title = "_iCloud".loc() : e === Journal.MONTAGE ? document.title = Journal.montageController.getPath("montage.title") || "_iCloud".loc() : document.title = Journal.journalController.getPath("journal.title") || "_iCloud".loc()
    }.observes("nowShowing"),
    bumpHasBeenAtBookshelfOnce: function() {
        this
        .nowShowing === Journal.BOOKSHELF && this.setIfChanged("hasBeenAtBookshelfOnce", YES)
    }.observes("nowShowing"),
    changeKeyEventResponder: function() {
        var e = Journal.page.slideshowView, t = Core.keyEventRootResponder, n = this.nowShowing === Journal.SLIDESHOW ? e: null;
        t.set("responder", n)
    }.observes("nowShowing"),
    maintainIsBookshelfViewShowing: function() {
        this.setIfChanged("isBookshelfViewShowing", this.nowShowing === Journal.BOOKSHELF)
    }.observes("nowShowing")
})), require("controllers/journal"), require("controllers/workspace"), Journal.slideshowController = CoreImage.SlideshowController.create({
    journalBinding: "from:Journal.journalController.journal",
    entryBinding: "from:Journal.journalController.entry",
    itemSetForLayoutItems: function(e) {
        if (!e)
            return [];
        var t = e.slideshowItemSet;
        if (t)
            return t;
        t = [];
        for (var n = 0, r = e.items, i; i = r[n]; n++)
            if (i.type === "Grid")
                for (var s = 0, o = i.items, u; u = o[s]; s++)
                    this.shouldExcludeItem(u) || t.push(u);
            else 
                this.shouldExcludeItem(i) || t.push(i);
        return e.slideshowItemSet = t, t
    },
    itemSetForJournal: function(e) {
        if (!e)
            return Core.emptyArray;
        var t = e.__slideshowItemSet__;
        if (t)
            return t;
        t = [];
        for (var n = 0, r, i, s, o; s = e.entries[n]; n++) {
            o = this.itemSetForLayoutItems(s.layouts[0]) || Core.emptyArray;
            for (r = 0; i = o[r]; r++)
                t.push(i)
        }
        return t
    },
    shouldExcludeItem: function(e) {
        return !e ||!e.type ||!Journal.initialStateController.showAllItemsInSlideshow && e.type !== "Photo" && e.type !== "Video"
    },
    establishItemSet: function() {
        this.set("itemSet", this.itemSetForJournal(this.journal))
    }.observes("journal"),
    stopShowOnEnterExit: function() {
        this.stopShow()
    }.observes("Journal.workspaceController.nowShowing")
}), require("controllers/workspace"), Journal
.define("urlHashController", Core.Object.create({
    recordsByUrl: {},
    updateHashOnURL: function() {
        if (!Journal.URLResolver.isUbiquityMode)
            return;
        var e = Journal.workspaceController.nowShowing, t;
        e === Journal.BOOKSHELF && (t = Journal.bookshelfController.list), e === Journal.JOURNAL && (t = Journal.journalController.journal), e === Journal.MONTAGE && (t = Journal.montageController.montage);
        if (!t)
            return;
        var n = t.selfVisitUrl;
        if (n && n.substring(0, n.indexOf("#") + 1) !== Journal.initialStateController.baseUrl) {
            Core.debug("A visit URL was about to be applied, but did not match up through its pound sign.");
            return 
        }
        this.recordsByUrl[n] = t, this.carefullySetLocationTo(n), this.setIfChanged("lastChosenURL", n)
    }.observes("Journal.workspaceController.nowShowing"),
    initializeHashWatch: function() {
        var e = function() {
            Journal.urlHashController.testUrl()
        };
        this._lastLoc = window.location.toString(), B.msie <= 8 || window.hasOwnProperty("onhashchange") ? window.onhashchange = e : setInterval(e, 150)
    }.observes("init"),
    testUrl: function() {
        var e = location.toString();
        if (this._lastLoc === (this._lastLoc = e) ||!Journal.URLResolver.isUbiquityMode)
            return;
        if (this._shouldIgnoreNextChange) {
            this._shouldIgnoreNextChange = NO;
            return 
        }
        var t = this.recordsByUrl[e];
        t ? t.type === "bookshelf" ? (Core.debug("The URL changed to the last one associated with a bookshelf record. Switching to bookshelf if necessary."), Journal.workspaceController.setIfChanged("nowShowing", Journal.BOOKSHELF)) : t.type === "journal" ? (Core.debug("The URL changed to the last one associated with journal " + t + ". Switching if necessary."), Journal.journalController.setIfChanged("journal", t), Journal.workspaceController.setIfChanged
        ("nowShowing", Journal.JOURNAL)) : t.type === "montage" ? (Core.debug("The URL changed to the last one associated with montage " + t + ". Switching if necessary."), Journal.montageController.setIfChanged("montage", t), Journal.workspaceController.setIfChanged("nowShowing", Journal.MONTAGE)) : (Core.debug("The URL changed to one the hash controller has seen before, but the resulting object is of an unknown type. Reloading in order to navigate to the URL."), window.location.reload()) : (Core.debug("The URL changed to one the hash controller does not recognize. Reloading in order to navigate to the URL."), window.location.reload())
    },
    carefullySetLocationTo: function(e) {
        if (e === location.toString())
            return;
        this._shouldIgnoreNextChange = YES, window.location = e
    },
    preserveURLInSessionStorageForIE8: function() {
        if (B.msie !== 8)
            return;
        if (!window.sessionStorage)
            return;
        try {
            window.sessionStorage.setItem("_iPhotoJournalLastURL", new Date * 1 + ":" + this.lastChosenURL)
        } catch (e) {}
    }.observes("lastChosenURL")
})), CoreImage.Theme = CoreImage.Theme.extend({
    displayWidthBinding: "from:Journal.workspaceController.displayWidth"
}), function() {
    var e, t, n, r, i, s, o, u, a, f, l = B.mobile && window.innerWidth <= 600, c = B.mobile&&!l;
    Journal.BaseTheme = CoreImage.Theme.extend({
        "JournalEntryView.theme": {
            "InlineItems.FooterView.theme": {
                "privacyButtonView.theme": e = {
                    "layer.styles": {
                        top: function() {
                            return 5 / 1024 * Math.pow(this.displayWidth, .5) / Math.pow(1024, .5) * this.displayWidth
                        },
                        fontSize: function() {
                            return Math.max(11, 11 / Core.windowSize.width * this.displayWidth)
                        }
                    }
                },
                "tosButtonView.theme": e
            },
            "InlineItems.TextView.theme": {
                "container.styles": {
                    fontSize: .122 / 7,
                    lineHeight: .165 / 7
                },
                "layer.styles": {
                    paddingTop: function() {
                        var e;
                        return this.getPath("prevOriginalItem.type") === "Grid" ? e = .01 * this.displayWidth : e = .05 * this.displayWidth, e
                    },
                    paddingBottom: .0055
                }
            },
            "InlineItems.HeadingView.theme": {
                "container.styles": {
                    fontSize: (l ? 45 : 34) / 1024,
                    lineHeight: (l ? 54 : 41) / 1024
                },
                "layer.styles": {
                    paddingTop: function() {
                        var e;
                        return this.getPath("prevOriginalItem.type") === "Grid" ? e = .005 * this.displayWidth : e = 34 / 1024 * this.displayWidth, e
                    },
                    paddingBottom: function() {
                        var e;
                        return this.getPath("nextOriginalItem.type") === "Text" ? e = 0 : e = 5 / 1024 * this.displayWidth, e
                    }
                }
            },
            "InlineItems.GridView.theme": {
                "layer.styles": {
                    marginTop: B.mobile ? .02: "1 < 0.02 + 0 < 30",
                    marginBottom: function() {
                        return l && this.getPath("nextOriginalItem.type") === "Divider"?-0.04 * this.displayWidth : 0
                    }
                },
                "GridItems.TextView.theme": t = {
                    "container.styles": {
                        fontSize: .122,
                        lineHeight: .131
                    }
                },
                "GridItems.HeadingView.theme": n = {
                    "container.styles": {
                        fontSize: (l ? 45 : 34) / (1024 / 7),
                        lineHeight: (l ? 52 : 39) / (1024 / 7)
                    }
                },
                "GridItems.PhotoView.theme": r = {
                    "container.styles": {
                        top: B.mobile ? .056: "4 < 0.056 + 0 < 15",
                        left: B.mobile ? .056: "4 < 0.056 + 0 < 15",
                        right: B.mobile ? .056: "4 < 0.056 + 0 < 15",
                        bottom: B.mobile ? .056: "4 < 0.056 + 0 < 15"
                    },
                    "caption.styles": {
                        fontSize: function() {
                            return l ? this.height === 1 || this.width <= 2 ? .175 * this.displayWidth * (this.value && this.value.fontSize || 12) / 12 : .240625 * this.displayWidth * (this.value && this.value.fontSize || 12) / 12 : .08203125 * this.displayWidth * (this.value && this.value.fontSize || 12) / 12
                        },
                        bottom: .013
                    },
                    "chromeInner.styles": {
                        top: "-6 < -0.04 + -1 < -2",
                        left: "-8 < -0.04 + -3 < -4",
                        right: "-8 < -0.04 + -3 < -4",
                        bottom: "-10 < -0.04 + -5 < -6"
                    },
                    inset: B.mobile ? .056
                    : "4 < 0.056 + 0 < 15"
                },
                "GridItems.WeatherView.theme": i = {
                    "temperatureText.styles": {
                        fontSize: B.mobile ? .231: ".210 + 3",
                        lineHeight: B.mobile ? .958: "1 + -6"
                    }
                },
                "GridItems.CalendarView.theme": s = {
                    "yearDiv.styles": {
                        fontSize: 17 / 146,
                        height: 17 / 146,
                        bottom: 13 / 146
                    },
                    "dayDiv.styles": {
                        fontSize: 70 / 146,
                        height: 70 / 146,
                        bottom: 33 / 146 + (B.mozilla && B.windows?-4 / 146 : 0)
                    },
                    "monthDiv.styles": {
                        fontSize: 19 / 146,
                        height: 19 / 146,
                        bottom: 100 / 146 + (B.mozilla && B.windows?-2 / 146 : 0)
                    }
                },
                "GridItems.QuoteView.theme": a = {
                    "textDiv.styles": {
                        fontSize: 17.2 / 146,
                        left: .1,
                        right: .1,
                        lineHeight: .16
                    }
                },
                "GridItems.FoodView.theme": f = {
                    "textDiv.styles": {
                        left: .25,
                        right: .25,
                        fontSize: .118,
                        lineHeight: .131
                    }
                }
            }
        },
        "SlideshowGridItemWrapperView.theme": {
            "GridItems.TextView.theme": t,
            "GridItems.HeadingView.theme": n,
            "GridItems.PhotoView.theme": r,
            "GridItems.WeatherView.theme": i,
            "GridItems.CalendarView.theme": s,
            "GridItems.MemoryView.theme": o,
            "GridItems.NoteView.theme": u,
            "GridItems.QuoteView.theme": a,
            "GridItems.FoodView.theme": f
        }
    }), Journal.borderTheme = Journal.BaseTheme.create(), Journal.insetTheme = Journal.BaseTheme.create({
        "JournalEntryView.theme": {
            "InlineItems.GridView.theme": {
                "GridItems.PhotoView.theme": {
                    "container.styles": {
                        top: "2 < 0.056 + -2 < 13",
                        left: "2 < 0.056 + -2 < 13",
                        right: "2 < 0.056 + -2 < 13",
                        bottom: "2 < 0.056 + -2 < 13"
                    },
                    inset: "2 < 0.056 + -2 < 13"
                }
            }
        }
    }), Journal.gaplessTheme = Journal.BaseTheme.create({
        "JournalEntryView.theme": {
            "InlineItems.GridView.theme": {
                "GridItems.PhotoView.theme": {
                    "container.styles": {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    inset: 0
                }
            }
        }
    })
}(), Journal.mixin({
    THEME_INFOS: {
        border: {
            classNames: "border-theme light-theme".w(),
            theme: Journal.borderTheme
            ,
            itemViewVariant: "Border",
            isDark: NO
        },
        cotton: {
            classNames: "cotton-theme light-theme".w(),
            theme: Journal.insetTheme,
            itemViewVariant: "Borderless",
            isDark: NO
        },
        denim: {
            classNames: "denim-theme dark-theme".w(),
            theme: Journal.insetTheme,
            itemViewVariant: "Borderless",
            isDark: YES
        },
        dark: {
            classNames: "dark-theme dark-theme".w(),
            theme: Journal.insetTheme,
            itemViewVariant: "Borderless",
            isDark: YES
        },
        light: {
            classNames: "light-theme light-theme".w(),
            theme: Journal.insetTheme,
            itemViewVariant: "Borderless",
            isDark: NO
        },
        mosaic: {
            classNames: "mosaic-theme dark-theme".w(),
            theme: Journal.gaplessTheme,
            itemViewVariant: "Chromeless",
            isDark: YES
        }
    }
}), CoreImage.MissingImageSupport._missing_image_iconReps = {
    64: {
        url: "/applications/journal/16CProject51/en-us/source/resources/images/missing_image_64.png"
    },
    128: {
        url: "/applications/journal/16CProject51/en-us/source/resources/images/missing_image_128.png"
    },
    256: {
        url: "/applications/journal/16CProject51/en-us/source/resources/images/missing_image_256.png"
    },
    512: {
        url: "/applications/journal/16CProject51/en-us/source/resources/images/missing_image_512.png"
    }
}, CoreImage.MissingImageSupport._missing_image_backgroundSrc = "/applications/journal/16CProject51/en-us/source/resources/images/missing_image_bg_128.png", Journal.define("RepBasedImageRequest", CoreImage.ImageRequest.extend({
    className: "RepBasedImageRequest",
    saveUrlAndExpiryToRepWhenKnown: function() {
        if (!this.url ||!this.rep)
            return;
        this.rep.url = this.url
    }.observes("url"),
    recordTimeIfNeeded: function() {
        var e = this.loadee && this.loadee._downloadTime, t = this.rep && this.rep.fileSize;
        if (!e ||!t)
            return;
        if (e <= 50)
            return;
        Journal.imageDownloadTimes.push(e), Journal
        .imageDownloadSizes.push(t)
    }.observes("success"),
    init: function() {
        var e = this.rep;
        if (!e)
            return arguments.callee.base.apply(this, arguments);
        e.fileInfo && e.fileInfo.urlSet && e.fileInfo.urlSet.expiry < new Date * 1 && (e.url = e.urls = null, e.fileInfo.clearExpiredUrlInfo());
        if (e.url)
            return this.url = e.url, arguments.callee.base.apply(this, arguments);
        if (e.urls)
            return this.urls = e.urls, arguments.callee.base.apply(this, arguments);
        this.set("isUbiquityRequest", YES);
        var t = this.rep.fileInfo;
        if (!t)
            return arguments.callee.base.apply(this, arguments);
        (t.imageRequests || (t.imageRequests = [])).push(this), t.urlSet && this.set("urls", t.urlSet.urls), !t.urlSet&&!t.urlSetRequest && Journal.URLResolver.scheduleBatchCreateURLPickup(), arguments.callee.base.apply(this, arguments)
    },
    customLoadeeMixin: {
        isMixin: YES,
        _kickOffLoadingProcess: function() {
            var e, t, n = this, r, i, s = arguments;
            if (this.getPath("rep.fileInfo.urlSet.expiry") < new Date * 1) {
                Core.debug("While beginning to load Loadee:" + Core.guidFor(this) + ", encountered expired URLs. Requesting new URLs."), t = this.rep, e = t.fileInfo, r = arguments.callee.base, i = function() {
                    t.urls = e.urlSet && e.urlSet.urls, t.urls ? Core.debug("Received new URLs for Loadee:" + Core.guidFor(n) + ", which had previously encountered expired URLs.") : Core.debug("Failed to receive new URLs for Loadee:" + Core.guidFor(n) + ", which had previously encountered expired URLs. Conventional error handling will continue."), t.urls && n.updateToUrls(t.urls), n.url = n.urls[0], r.apply(n, s)
                }, t.url = t.urls = this.url = this.urls = null, e.clearExpiredUrlInfo(), e.requestSingleUrlSet(i, function() {
                    i()
                });
                return 
            }
            return arguments.callee.base.apply(this, arguments
            )
        }
    },
    getAdditionalCustomLoadeeProperties: function() {
        return {
            rep: this.rep
        }
    }
})), Journal.define("UrlResolutionForImages", {
    isMixin: YES,
    CustomImageRequestClass: Journal.RepBasedImageRequest
}), Journal.transitionBank = {
    slideList: null
}, Journal.define("ClassBank", Core.Namespace.extend({
    suffix: "",
    Default: undefined,
    findAndCreate: function(e) {
        var t = this[e.type + (e.variant || "") + this.suffix] || this[e.type + this.suffix] || this.Default;
        return t ? t.create.apply(t, arguments) : null
    }
})), Journal.ClassBank.reopen({
    ownerNamespace: Journal
}), Journal.define("fileDownloader", CoreImage.FileDownloader.create({
    downloadVideo: function(e) {
        if (!e ||!e.videoReps)
            return;
        var t = this._knownVideos || (this._knownVideos = {}), n = t[Core.guidFor(e)] || (t[e.coreGuid] = {}), r = e.videoReps[960] || e.videoReps[640], i = this;
        if (!r)
            return;
        if (!r.fileInfo)
            return;
        var s = n.haveUrlSet || (n.haveUrlSet = function() {
            var e = r.fileInfo.urlSet;
            e && e.expiry > new Date * 1 && (n.urls = e.urls, n.birth = e.birth);
            if (!n.urls)
                return;
            i.downloadFile(n.urls[n.currentIndex]), n.currentIndex = (n.currentIndex + 1)%n.urls.length
        });
        if (n.urls && n.birth > new Date * 1 - 6e4)
            return s();
        n.currentIndex = 0, r.fileInfo.requestSingleUrlSet(s, s, YES)
    },
    downloadPhoto: function(e) {
        if (!e ||!e.photoReps)
            return;
        var t = e.photoReps, n =- Infinity, r, i, s, o;
        for (s in t)
            r = parseInt(s, 10), s === "original" && (r = Infinity), n < r && (n = r, i = s);
        o = t[i];
        if (!i ||!o) {
            Core.debug('Attempting to download photo "' + ("photo:" + Core.guidFor(e)) + "\": The photo has no available image assets, and can't be downloaded.");
            return 
        }
        Core.debug("Downloading version " + i + " (rep:" + Core.guidFor(o) + ") of " + ("photo:" + Core.guidFor(e)) + "."), Journal.RepBasedImageUrlProbe.create
        ({
            rep: o,
            repKey: i,
            photo: e
        })
    }
})), Journal.define("RepBasedImageUrlProbe", Journal.RepBasedImageRequest.extend({
    fileDownloader: Journal.fileDownloader,
    group: CoreImage.imageLoader.essentialGroup,
    importance: 2e9,
    requestGuessDelay: 2e3,
    mixinNotifiersToLoadee: function() {
        if (!this.loadee)
            return;
        this.loadee.mixin({
            load: function(e, t) {
                return t || this.rescheduleURLProbeGuesses("our loadee was told to begin loading"), arguments.callee.base.apply(this, arguments)
            },
            didHalfErr: function() {
                return this.rescheduleURLProbeGuesses("we discovered an invalid URL"), arguments.callee.base.apply(this, arguments)
            },
            rescheduleURLProbeGuesses: function(e) {
                for (var t = 0, n = this.__urlProbes__, r; r = n[t]; t++)
                    r.rescheduleGuess(e)
            }
        }), (this.loadee.__urlProbes__ || (this.loadee.__urlProbes__ = [])).push(this)
    }.observes("loadee"),
    joinLoadee: function() {
        var e = arguments.callee.base.apply(this, arguments);
        return this.loadee.loading && this.rescheduleGuess("we just joined a loadee"), e
    }.observes("urls", "url"),
    rescheduleGuess: function(e) {
        var t = new Date * 1;
        if (this._lastRescheduleTime >= t - 20)
            return;
        this._lastRescheduleTime = t, clearTimeout(this._guessTimeout);
        if (this._guessedAlready)
            return;
        Core.debug("Downloading Photo rep:" + Core.guidFor(this.rep) + ": Because " + e + ", we now schedule to guess the URL " + this.requestGuessDelay / 1e3 + " seconds from now. Time is " + new Date%1e5 + ".");
        var n = this;
        this._guessTimeout = setTimeout(function() {
            n.guess()
        }, this.requestGuessDelay)
    },
    guess: function() {
        this._guessedAlready = YES, Core.debug("Downloading Photo rep:" + Core.guidFor(this.rep) + ": Currently attempted URL is taking a long time: it is likely to be correct. Downloading it. Time is now " + new 
        Date%1e5 + ".");
        var e = this._alreadyAttemptedUrl = this.getPath("loadee.url");
        this.fileDownloader.downloadFile(e)
    },
    onload: function() {
        var e;
        clearTimeout(this._guessTimeout);
        if (e = this._alreadyAttemptedUrl) {
            e === this.url ? Core.debug("Downloading Photo rep:" + Core.guidFor(this.rep) + ": The URL Probe successfully fully loaded the image, and the URL was as predicted. Time is now " + new Date%1e5 + ".") : (Core.debug("Downloading Photo rep:" + Core.guidFor(this.rep) + ": The URL Probe successfully fully loaded the image, and the final URL was different than the one predicted. Downloading the new, known-successful URL. Time is now " + new Date%1e5 + "."), this.fileDownloader.downloadFile(this.url));
            return 
        }
        Core.debug("Downloading Photo rep:" + Core.guidFor(this.rep) + ": The URL Probe successfully fully loaded the image, and is now downloading the known-successful URL. Time is now " + new Date%1e5 + "."), this.fileDownloader.downloadFile(this.url)
    },
    onerror: function() {
        Core.debug("Downloading Photo rep:" + Core.guidFor(this.rep) + ": The rep could not be downloaded, because none of its URLs were valid. Deleting the representation and trying the download again."), delete this.photo.photoReps[this.repKey], this.fileDownloader.downloadPhoto(this.photo)
    }
})), Journal.localizeDate = function(e, t, n, r) {
    var i = e.hours, s = e.minutes, o = e.seconds, u = t.match(/p/);
    u && (u = e.hours >= 12 ? r : n, i%=12, i === 0 && (i = 12));
    var a = t.replace("YYYY", e.year).replace("MM", e.month).replace("DD", e.day).replace("HH", i).replace("mm", s < 10 ? "0" + ("" + s) : s).replace("SS", o < 10 ? "0" + ("" + o) : o).replace("p", u);
    return a
}, Journal.VideoDetection = Core.Object.create({
    makeDecisions: function(
    ) {
        var e = this.hasQT = this.isValidQTAvailable(), t = this.canHazQT = this.doesQTExistForPlatform(), n = this.hasHTML5MOV = this.canUseHTML5("mov"), r = this.hasHTML5MP4 = this.canUseHTML5("mp4"), i = this.abilities = {}, s = this.choices = {};
        i.mp4=!!r||!!e, i.mov=!(!n&&!e||!!B.android), i.oldmov = i.mov, s.mp4 = r ? "html5" : NO, s.mp4 || (s.mp4 = e ? "quicktime" : NO), s.mov = n ? "html5" : NO, s.mov || (s.mov = e ? "quicktime" : NO), s.oldmov = s.mov, s.oldmov === "html5" && e && (!B.safari||!!B.chrome) && (s.oldmov = "quicktime"), (B.chrome&&!B.snowLeopard || B.snowLeopard&&!B.chrome) && e && (s.oldmov = s.mov = s.mp4 = "quicktime")
    }.observes("Core.windowDidLoad"),
    canUseHTML5: function(e) {
        if (Journal.initialStateController.params.no_html5_video)
            return NO;
        if (B.windows && B.safari&&!B.chrome&&!this.isValidQTAvailable())
            return NO;
        B.s.mozilla >= 25 && (e = "mp4");
        try {
            if ((B.silk || B.android) && e === "mov")
                return NO;
            if (this["__dCUH5" + e + "__"] === (this["__dCUH5" + e + "__"] = YES))
                return this._canUseHTML5;
            var t = document.createElement("video"), n = this._canUseHTML5 = t.canPlayType instanceof Function && t.canPlayType(e === "mov" ? "video/x-m4v" : "video/mp4");
            if (n === "no" ||!n)
                n = NO;
            return n
        } catch (r) {
            return NO
        }
    },
    _isQTInstalled: undefined,
    isQTInstalled: function() {
        if (Journal.initialStateController.params.no_qt)
            return NO;
        if (B.msie >= 9)
            return NO;
        if (this._isQTInstalled === undefined) {
            var e=!1;
            if (navigator.plugins && navigator.plugins.length)
                for (var t = 0; t < navigator.plugins.length; t++) {
                    var n = navigator.plugins[t];
                    n.name.indexOf("QuickTime")>-1 && (e=!0)
                } else 
                    typeof execScript != "undefined" && (qtObj=!1, execScript('on error resume next: qtObj = IsObject(CreateObject("QuickTimeCheckObject.QuickTimeCheck.1"))', "VBScript"), e = qtObj
                    );
            this._isQTInstalled = e
        }
        return this._isQTInstalled
    },
    getQTVersion: function() {
        if (this._qtVersion)
            return this._qtVersion;
        var e = "0";
        if (navigator.plugins && navigator.plugins.length)
            for (var t = 0; t < navigator.plugins.length; t++) {
                var n = navigator.plugins[t], r = n.name.match(/quicktime\D*([\.\d]*)/i);
                r && r[1] && (e = r[1])
            } else 
                typeof execScript != "undefined" && (ieQTVersion = null, execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion', "VBScript"), ieQTVersion && (e = ieQTVersion.toString(16), e = [e.charAt(0), e.charAt(1), e.charAt(2)].join(".")));
        return this._qtVersion = e
    },
    isQT772: function() {
        return this.getQTVersion() === "7.7.2"
    },
    isQTCompatible: function(e, t) {
        var n = this._compatTest || (this._compatTest = function(e, t) {
            var r = parseInt(e[0], 10);
            isNaN(r) && (r = 0);
            var i = parseInt(t[0], 10);
            return isNaN(i) && (i = 0), r === i ? e.length > 1 ? n(e.slice(1), t.slice(1)) : !0 : r < i?!0 : !1
        }), r = e.split(/\./), i = t ? t.split(/\./): this.getQTVersion().split(/\./);
        return n(r, i)
    },
    isValidQTAvailable: function(e) {
        return this.isQTInstalled() && this.isQTCompatible(e || Journal.MIN_QUICKTIME_VERSION) && (!B.windows ||!this.isQT772())&&!(B.msie >= 9)
    },
    doesQTExistForPlatform: function() {
        return Journal.initialStateController.params.never_qt ? NO : !B.mobile&&!(B.msie >= 9)
    }
}), Journal.define("GridItemBackgroundImageSupport", {
    isMixin: YES,
    leftOffset: 0,
    topOffset: 0,
    widthOffset: 0,
    heightOffset: 0,
    layoutWidth: function() {
        return this.owner.width
    }.property(),
    layoutHeight: function() {
        return this.owner.height
    }.property(),
    doLayout: function() {
        if (!this.isAppendedInWindow ||!this.owner.layout)
            return;
        var e = this.owner.layout, t = this.owner
        .cellSize, n = t / 100, r = this.leftOffset, i = this.topOffset, s = this.widthOffset, o = this.heightOffset;
        - 1 < r && r < 1 ? r*=t : r*=n, - 1 < i && i < 1 ? i*=t : i*=n, - 1 < s && s < 1 ? s*=t : s*=n, - 1 < o && o < 1 ? o*=t : o*=n, this.setLayout(r, i, e.width + s, e.height + o)
    }.observes(".owner.layout", "isAppendedInWindow", "currentRep")
}), Journal.define("TopBarView", Core.View.extend({
    classNames: "top-bar full-width".w(),
    initialTabBinding: "Journal.initialStateController.initialTab",
    shouldDrop: YES,
    HEIGHT: 44,
    Dropper: Anim.Animation.extend({
        layerBinding: ".owner.layer",
        from: - 72,
        to: 0,
        duration: 350,
        tween: Anim.tweens.QUADRATIC_OUT,
        update: function() {
            this.layer.style.top = this.current + "px"
        }
    }),
    readyDrop: function() {
        if (!this.shouldDrop)
            return;
        this.initialTab === this.desiredInitialTab && (this.layer.style.top = "-72px")
    }.observes("render"),
    drop: function() {
        if (!this.shouldDrop)
            return;
        if (!this.layer || this._dropped)
            return;
        this.layer.style.top && this.Dropper.create({
            owner: this
        }).start(), this._dropped = YES
    }.observes("dropTrigger")
})), Journal.TopBarButtonView = Core.ButtonView.extend({
    classNames: "top-bar-button".w(),
    allowsScrolling: YES,
    title: "",
    left: function() {
        var e = this.layer;
        return e ? e.offsetLeft : 0
    }.property(),
    width: function() {
        var e = this.layer;
        return e ? e.offsetWidth : 0
    }.property(),
    updateToTitle: function() {
        if (!this.layer)
            return;
        this.layer.innerHTML = Core.escapeHTML(this.title) || "&nbsp;"
    }.observes("title", "render"),
    updateFrameProperties: function() {
        if (!this.isAppendedInWindow)
            return;
        this.trigger("left"), this.trigger("width")
    }.observes("isAppendedInWindow")
}), require("views/top_bar"), require("views/top_bar_button"), function() {
    var e=!!B.android, t;
    Journal.JournalEntrySelectorView =
    Core.View.extend({
        rootHTML: '<div class="journal-entry-selector full-width" role="tablist"><div class="track-mask" role="presentation"><div class="track-container" role="presentation"><div class="track" role="presentation"><div class="buttons" role="presentation"></div>' + (t ? '<div class="hovers" aria-hidden="true"></div>' : "") + "</div>" + "</div>" + "</div>" + "</div>",
        _trackMaskElement: "layer.firstChild",
        _trackContainerElement: "_trackMask.firstChild",
        _trackElement: "_trackContainer.firstChild",
        _buttonsTrackElement: "_track.firstChild",
        _hoversTrackElement: "_track.childNodes.1",
        displayWidthBinding: "from:.owner.displayWidth",
        journal: null,
        selectedEntry: null,
        dropTriggerBinding: "journal",
        desiredInitialTab: "journal",
        minLeft: 0,
        minLeftPadding: 10,
        minRight: NaN,
        minRightPadding: 7,
        maxMouseAutoScrollSpeed: 1.3,
        mouseAutoScrollBoundary: 50,
        trackCoverLeftView: (Journal.JournalEntrySelectorTrackCoverView = e ? Core.ButtonView.extend({
            direction: null,
            appendInto: "_trackMask",
            classNames: "track-cover".w(),
            rootHTML: '<div style="opacity:0;"><div class="image"></div><div class="cover"></div><div class="gradient"></div></div>',
            giveSomeDirection: function() {
                this.layer.className += " " + this.direction
            }.observes("render"),
            action: function() {
                this.owner.scrollTo(this.getPath("owner.scroller.to") + (this.direction === "left"?-1 : 1) * (.8 * this.getPath("owner._trackMask.offsetWidth") || .7 * Core.windowSize.width))
            }
        }) : Core.View.extend({
            appendInto: "_trackMask",
            classNames: "track-cover gradient".w(),
            giveSomeDirection: function() {
                this.layer.className += " " + this.direction
            }.observes("render")
        })).extend({
            direction: "left"
        }),
        trackCoverRightView: Journal.JournalEntrySelectorTrackCoverView
        .extend({
            direction: "right"
        }),
        chooseMinRight: function() {
            this.minRight = B.desktop ? 17 : 0, Journal.initialStateController.loadEnvironment === "iphoto" && (this.minRight = 53)
        }.observes("init"),
        _showHideGradient: function(e, t) {
            if (!e)
                return;
            if (e._isShowing === (e._isShowing = t))
                return;
            Anim.Fader.go(Anim.DisplayNoneAtZero, {
                element: e,
                duration: 350,
                to: 0 + t
            })
        },
        showHideLeftGradient: function() {
            this._showHideGradient(this.trackCoverLeftView.layer, this.isShowingLeftGradient)
        }.observes("isShowingLeftGradient"),
        showHideRightGradient: function() {
            this._showHideGradient(this.trackCoverRightView.layer, this.isShowingRightGradient)
        }.observes("isShowingRightGradient"),
        refocusScroll: function() {
            if (!this.journal)
                return;
            this.scrollTo(this.selectedEntry)
        }.observes("selectedEntry"),
        windowSizeChangeRefocusScroll: function() {
            if (!this.isAppendedInWindow ||!B.mobile)
                return;
            var e = this;
            this._wscfs_handle && clearTimeout(this._wscfs_handle), this._wscfs_handle = setTimeout(function() {
                e.refocusScroll()
            }, 100)
        }.observes("Core.windowSize"),
        positionMaskAndContainerForMinLeftAndMinRight: function() {
            if (!this.layer)
                return;
            var e = this.minLeft + this.minLeftPadding;
            this._trackMask.style.left = e + "px", this._trackContainer.style.left =- e + "px", this._trackMask.style.right = this.minRight + "px"
        }.observes("minLeft", "render"),
        computeSmallMobileScreenScrollOffset: function() {
            this.smallMobileScreenScrollOffset = Math.max(Core.windowSize.width, Core.windowSize.height) > 600 ? 0 : (this.minLeft + this.minLeftPadding - this.minRight - this.minRightPadding) / 2
        }.observes("minLeft"),
        guaranteeContainerWidth: function() {
            if (!this._trackContainer)
                return;
            this._trackContainer.style.width = Core
            .windowSize.width + "px"
        }.observes("Core.windowSize", "render"),
        watchMouseForScroll: function() {
            if (!this.isAppendedInWindow || B.mobile || e)
                return;
            var t = Core.mousePosition.x;
            if (isNaN(t))
                return;
            var n = this.mouseAutoScrollBoundary, r = this.maxMouseAutoScrollSpeed, i = this.minLeft + 2, s = Core.windowSize.width - this.minRight - this.minRightPadding;
            Core.mousePosition.y > 44 ? this._scrollSpeed = 0 : t < i + n && t >= i ? (this._scrollSpeed =- r * (n - (t - i)) / n, this.scroller.start()) : t > Core.windowSize.width - this.minRight - this.minRightPadding - n ? (this._scrollSpeed = r * (t - s + n) / n, this.scroller.start()) : this._scrollSpeed = 0
        }.observes("Core.mousePosition"),
        touchStart: function(e) {
            if (!B.onlyiOS)
                return;
            if (this._isDragging)
                return;
            if (!e ||!e.touches ||!e.touches.length)
                return;
            e.preventDefault && e.preventDefault(), Anim.tellStop(this._inertiaAnimation), this._preTouchScroll = this.scroller.current + this.smallMobileScreenScrollOffset, this._initialTouchX = e.touches[0].clientX, this._isReadyForDrag = YES
        },
        touchEnd: function(e) {
            if (!B.onlyiOS)
                return;
            if (!this._isDragging)
                return;
            e.preventDefault && e.preventDefault(), this._preTouchScroll = this._initialTouchX = undefined, this._isReadyForDrag = NO, this._isDragging = NO, this._inertiaAnimation = this.InertiaAnimation.go({
                owner: this
            }), this._ppTouchX = this._ppTouchDate = this._previousTouchX = this._previousTouchDate = NaN
        },
        touchMove: function(e) {
            if (!B.onlyiOS)
                return;
            if (!e ||!e.touches ||!e.touches.length)
                return;
            if (!this._isReadyForDrag)
                return;
            var t = e && e.touches && e.touches[0] && e.touches[0].clientX;
            if (isNaN(t))
                return;
            e.preventDefault && e.preventDefault(), this._isDragging = YES, this._ppTouchX = this._previousTouchX, this._previousTouchX = t, this
            ._ppTouchDate = this._previousTouchDate, this._previousTouchDate = new Date * 1;
            var n =- (t - this._initialTouchX) + this._preTouchScroll;
            this.scrollTo(n, YES)
        },
        InertiaAnimation: Anim.Task.extend({
            ticked: 2,
            speedFractionPerTick: .995,
            speedAsymptoteBoost: .1,
            computeInitialSpeed: function() {
                var e = this.owner, t = (e._previousTouchDate - e._ppTouchDate) / (this.ticked || 16) || Infinity;
                this.speed =- (e._previousTouchX - e._ppTouchX || 0) / t, this.current = e.scroller.current
            }.observes("start"),
            run: function(e, t) {
                var n = this.speed > 0, r = n ? 1: - 1;
                if (this.speed) {
                    this.speed += r * this.speedAsymptoteBoost, this.speed*=this.speedFractionPerTick, this.speed -= r * this.speedAsymptoteBoost;
                    if (n && this.speed <= 0 ||!n && this.speed >= 0)
                        this.speed = 0
                }
                this.current += this.speed;
                if (t)
                    return;
                isNaN(this.current) || this.owner.scrollTo(this.current + this.owner.smallMobileScreenScrollOffset, YES);
                if (Math.abs(this.speed || 0) < .001 || this.frameCount >= 5 && this._lastOSC === (this._lastOSC = this.owner.scroller.current))
                    this.trigger("finish"), this.stop()
                }
        }),
        scroller: Anim.Animation.extend({
            inertia: 3,
            speed: 10 + 2 * B.mobile,
            ticked: 2,
            headStart: 1,
            from: 0,
            to: 0,
            update: function() {
                var e = this.current, t = window.devicePixelRatio || 1;
                Core.useGPU ? this.view._track.style.webkitTransform = "translate3d(" + Math.round( - e * t) / t + "px,0,0)" : !isNaN(this.view.trackWidth)&&!isNaN(e) && (this.view._track.style.marginLeft = Math.round(this.view.trackWidth/-2 - e) + "px"), this.view.setIfChanged("isShowingLeftGradient", this.current !== this.maxOffsetLeft), this.view.setIfChanged("isShowingRightGradient", this.current !== this.maxOffsetRight)
            },
            adjustTargetScroll: function() {
                var e = this.view._scrollSpeed, t = this.to, n = this.maxOffsetLeft
                , r = this.maxOffsetRight;
                if (!e)
                    return;
                t += e, t < n && (t = n), t > r && (t = r), this.to = t
            }.observes("pretick")
        }),
        scrollTo: function(e, t) {
            if (!this.isAppendedInWindow)
                return;
            if (typeof e == "object") {
                var n = this.getPath("_buttons." + this.indexForEntry(e) + ".layer");
                if (!n)
                    return;
                e = n.offsetLeft + n.offsetWidth / 2 - this.trackWidth / 2
            }
            if (isNaN(e))
                return this.scroller.update();
            e -= this.smallMobileScreenScrollOffset;
            var r = this._buttons[this._buttons.length - 1], i = r.layer, s = r.get("left") + r.get("width"), o = s - (this.trackWidth - s), u = Core.windowSize.width, a = u / 2 - o / 2, f = this.minLeft + this.minLeftPadding, l = f - a, c =- Math.max(0, l), h = u / 2 + o / 2, p = u - this.minRight - this.minRightPadding, d = h - p, v = Math.max(0, d);
            e < c && (e = c), e > v && (e = v), this.scroller.maxOffsetLeft = c, this.scroller.maxOffsetRight = v, this.scroller.redirectTo(e);
            if (t)
                this.scroller.start(), this.scroller.finish();
            else {
                var m = this;
                clearTimeout(this._timer), this._timer = setTimeout(function() {
                    m.scroller.start()
                }, B.iOS ? 200 : 1)
            }
        }.observes("trackWidth"),
        fixScrollOnResize: function() {
            if (!this.layer ||!this.isAppendedInWindow)
                return;
            this.scrollTo(this.selectedEntry, YES)
        }.observes("displayWidth", "isAppendedInWindow"),
        instantiateScroller: function() {
            this.scroller = this.scroller.create({
                view: this,
                animateOldIE: YES
            })
        }.observes("render"),
        selectNextEntry: function() {
            if (!this.journal.entries)
                return;
            var e = this.indexForEntry();
            if (e === this.journal.entries.length - 1)
                return;
            if (e===-1 || e > this.journal.entries.length - 1)
                return this.set("selectedEntry", this.journal.entries[this.journal.entries.length - 1]);
            this.set("selectedEntry", this.journal.entries[e + 1])
        },
        selectPreviousEntry: function() {
            if (!this.journal.entries)
                return;
            var e = this.indexForEntry();
            if (e === 0)
                return;
            if (e < 1 || e > this.journal.entries.length - 1)
                return this.set("selectedEntry", this.journal.entries[this.journal.entries.length - 1]);
            this.set("selectedEntry", this.journal.entries[e - 1])
        },
        indexForEntry: function(e) {
            e || (e = this.selectedEntry);
            for (var t = 0, n; n = this.journal.entries[t]; t++)
                if (e === n)
                    return t;
            return - 1
        },
        ButtonViewExample: Journal.TopBarButtonView.extend({
            actionDelay: 0,
            entry: null,
            ariaRole: "tab",
            establishTitle: function() {
                this.setIfChanged("title", this.entry && this.entry.title)
            }.observes("entry", "render"),
            action: function() {
                this.owner && this.owner.setIfChanged("selectedEntry", this.entry)
            },
            layerFocused: function(e) {
                if (!this.isAppendedInWindow || this.isActive)
                    return;
                this.owner.layer.scrollLeft = 0, this.owner.scrollTo(this.entry)
            },
            maintainAriaSelectedness: function() {
                if (!this.layer)
                    return;
                this.layer.setAttribute("aria-selected", this.isSelected)
            }.observes("isSelected")
        }),
        regenerateButtons: function() {
            if (!this.isAppendedInWindow)
                return;
            var e = this._buttonsTrack, t = this._hoversTrack, n;
            if (!this.journal) {
                e.innerHTML = "", t && (t.innerHTML = ""), !this._buttons || (this._buttons.length = 0);
                return 
            }
            if (this._lastEntries === (this._lastEntries = Core.guidFor(this.journal.entries)))
                return;
            e.innerHTML = "", t && (t.innerHTML = ""), (n = this._buttons || (this._buttons = [])).length = 0;
            var r = this.journal.entries.length;
            for (var i = 0, s, o, u; s = this.journal.entries[i]; i++)
                n.push(o = this.ButtonViewExample.create({
                    classNames: ((i === 0 ? " left" : "") + (i === r - 1 ? " right" : "")).substring(1).w(),
                    setSelected: function() {
                        this.setIfChanged("isSelected", this.owner.selectedEntry === this.entry)
                    }.observes(".owner.selectedEntry"
                    , "render"),
                    owner: this,
                    entry: s
                }).appendTo(e)), t && (u = o.layer.cloneNode(!0), u.id += "Hoverer", Anim.setOpacity(u, 0), u.style.visibility = "hidden", u.className += " external-hoverer", $(u).removeClass("sel"), u.setAttribute("role", ""), u.setAttribute("aria-hidden", "true"), t.appendChild(u), o.setIfChanged("hoverer", u));
            this.sizeContainersToContents(), this.adjustMaxButtonWidth(), this.scrollTo(this.selectedEntry, YES)
        }.observes("journal", "isAppendedInWindow"),
        maxButtonWidth: 270,
        maxButtonWidthPadding: 50,
        adjustMaxButtonWidth: function() {
            var e = this._buttons;
            if (!this.isAppendedInWindow ||!e)
                return;
            var t = Core.windowSize.width - this.minLeft - this.minLeftPadding - this.minRight - this.minRightPadding - this.maxButtonWidthPadding - 40;
            t = Math.round(Math.min(t, this.maxButtonWidth)) + "px";
            for (var n = 0, r, i = e.length; r = e[n]; n += 1)
                r.layer.style.maxWidth = t, r.hoverer && (r.hoverer.style.maxWidth = t)
        }.observes("Core.windowSize"),
        sizeContainersToContents: function() {
            var e = 18, t = 30, n = 0;
            for (var r = 0, i; i = this.journal.entries[r]; r++)
                n += (i.title || "").length;
            var s = r, o = e * n + s * t, u = this._buttonsTrack, a = this._hoversTrack;
            u.style.width = o + "px", a && (a.style.width = o + "px"), Core.useGPU && (u.style.marginLeft = Math.round(o/-2) + "px", a && (a.style.marginLeft = Math.round(o/-2) + "px")), this.set("trackWidth", o)
        }
    })
}(), Journal.define("ArtificialIPadBackgroundView", Core.View.extend({
    initiallyAppended: NO,
    classNames: "artificial-ipad-background".w(),
    size: null,
    TILE_WIDTH: 512,
    TILE_HEIGHT: 512,
    imageCSS: function() {
        this.imageCSS = "position:absolute; width:" + this.TILE_WIDTH + "px; height:" + this.TILE_HEIGHT + "px; pointer-events:none; z-index:1;"
    }.observes("init"),
    srcsByTheme: window
    .devicePixelRatio === 2 ? {
        denim: "/applications/journal/16CProject51/en-us/source/resources/images/journal_background_denim_1024.jpg",
        cotton: "/applications/journal/16CProject51/en-us/source/resources/images/journal_background_cotton_1024.jpg",
        border: "/applications/journal/16CProject51/en-us/source/resources/images/journal_background_cotton_1024.jpg"
    }
    : {
        denim: "/applications/journal/16CProject51/en-us/source/resources/images/journal_background_denim_512.jpg",
        cotton: "/applications/journal/16CProject51/en-us/source/resources/images/journal_background_cotton_512.jpg",
        border: "/applications/journal/16CProject51/en-us/source/resources/images/journal_background_cotton_512.jpg"
    },
    themeName: null,
    updateToSize: function() {
        if (!this.isAppendedInWindow)
            return;
        if (!this.size)
            return;
        var e = this.size.width, t = this.size.height, n = Math.ceil(e / this.TILE_WIDTH), r = Math.ceil(t / this.TILE_HEIGHT), i = n * r, s = this.images || (this.images = []), o, u;
        for (o = 0; o < i; o++)(u = s[o]) 
            || ((u = s[o] = new Image).style.cssText = this.imageCSS), u._isAppended || this.layer.appendChild(u), u._isAppended = YES, u.style.left = o%n * this.TILE_WIDTH + "px", u.style.top = Math.floor(o / n) * this.TILE_HEIGHT + "px";
        for (o = i; u = s[o]; o++)
            u._isAppended && this.layer.removeChild(u), u._isAppended = NO;
        this.layer.style.width = this.size.width + "px", this.layer.style.height = this.size.height + "px", this.updateToThemeName()
    }.observes("size", "isAppendedInWindow"),
    updateToThemeName: function() {
        if (!this.layer)
            return;
        var e = this.srcsByTheme[this.themeName];
        if (!e)
            return this.remove();
        for (var t = 0, n; n = this.images && this.images[t]; t++)
            n.src = e;
        $(this.layer).removeClass(this._lastThemeName), $(this.layer).
        addClass(this._lastThemeName = this.themeName), this.append()
    }.observes("themeName", "render")
})), Journal.TopBarBackButtonView = Core.ButtonView.extend({
    classNames: "top-bar-back-button left back right".w(),
    actionDelay: 0,
    rootHTML: '<div><div class="back-chevron"></div><div class="inner"></div></div>',
    innerElement: "layer.lastChild",
    title: "",
    init: function() {
        window.it = this, arguments.callee.base.apply(this, arguments)
    },
    updateToTitle: function() {
        if (!this.layer)
            return;
        this.layer.innerHTML = Core.escapeHTML(this.title) || "&nbsp;"
    }.observes("title", "render"),
    updateFrameProperties: function() {
        if (!this.isAppendedInWindow ||!this.inner)
            return;
        this.set("left", 15), this.set("width", this.inner.offsetWidth + 12 + 15)
    }.observes("isAppendedInWindow", "render"),
    updateToTitle: function() {
        if (!this.inner)
            return;
        this.inner.innerHTML = Core.escapeHTML(this.title) || ""
    }.observes("title", "render")
}), Journal.TopBarBackToProjectsButtonView = Journal.TopBarBackButtonView.extend({
    computeTitle: function() {
        var e = Journal.standaloneOptions.Back_Button_Title || "_Projects".loc();
        this.alwaysShowTitle ? this.setIfChanged("title", e) : this.setIfChanged("title", Journal.initialStateController.loadEnvironment === "iphoto" || B.mobile && window.innerWidth < 600 ? "" : e)
    }.observes("Journal.standaloneOptions.Back_Button_Title", "alwaysShowTitle", "init"),
    ariaLabel: function() {
        this.set("ariaLabel", this.title)
    }.observes("init"),
    action: function() {
        if (Journal.initialStateController.loadEnvironment === "iphoto") {
            window.location = "http://back-to-journals/";
            return 
        }
        if (Journal.standaloneOptions.Enable_Back_Button) {
            window.location = Journal.standaloneOptions.Back_Button_Destination
            ;
            return 
        }
        Journal.workspaceController.hasBeenAtBookshelfOnce ? Journal.workspaceController.set("nowShowing", Journal.BOOKSHELF) : Journal.bookshelfController.fetchListFromProject(this.owner.journal || this.owner.montage, function() {
            Journal.workspaceController.set("nowShowing", Journal.BOOKSHELF)
        }, function() {
            Journal.journalController.setIfChanged("isJournalPublic", NO), Journal.journalController.setIfChanged("isMontagePublic", NO)
        })
    }
}), require("views/top_bar"), require("views/top_bar_button"), require("views/top_bar_back_button"), Journal.JournalTopBarView = Journal.TopBarView.extend(CoreImage.ThemeSupport, {
    classNames: "journal-top-bar".w(),
    displayWidth: undefined,
    journal: null,
    selectedEntry: null,
    _selectorMinLeft: 0,
    requiredTypeInt: Journal.JOURNAL,
    choosePosition: function() {
        if (!this.layer)
            return;
        var e = Journal.workspaceController.allowProjectBackButton ||!this.isUsingEmptySingleEntryTitle;
        e ? this.append() : this.remove(), this.set("isCollapsed", !e)
    }.observes("Journal.workspaceController.allowProjectBackButton", "isUsingEmptySingleEntryTitle", "render"),
    backButtonView: Journal.TopBarBackToProjectsButtonView.extend({
        initiallyAppended: NO,
        isAppendedBinding: "from:Journal.workspaceController.allowProjectBackButton",
        leftBinding: "to:.owner._backButtonViewLeft",
        widthBinding: "to:.owner._backButtonViewWidth",
        requiredTypeIntBinding: "from:.owner.requiredTypeInt",
        alwaysShowTitleBinding: "from:.owner.isUsingEmptySingleEntryTitle",
        action: function() {
            if (Journal.workspaceController.nowShowing !== this.requiredTypeInt)
                return;
            return arguments.callee.base.apply(this, arguments)
        }
    }),
    entrySelectorView: Journal.JournalEntrySelectorView.extend
    ({
        journalBinding: "from:.owner.journal",
        selectedEntryBinding: ".owner.selectedEntry",
        minLeftBinding: "hard:from:.owner._selectorMinLeft",
        isAppendedSetter: function() {
            this.setIfChanged("isAppended", this.getPath("journal.entries.length") !== 1)
        }.observes("journal")
    }),
    singleEntryTitleView: Core.View.extend({
        journalBinding: "from:.owner.journal",
        minLeftBinding: "hard:from:.owner._selectorMinLeft",
        isAppendedSetter: function() {
            this.setIfChanged("isAppended", this.getPath("journal.entries.length") === 1&&!!this.getPath("journal.entries.0.title"))
        }.observes("journal"),
        classNames: "single-page-title fancy-top-bar-title".w(),
        rootHTML: '<div><div class="title full-width"></div></div>',
        titleElement: "layer.firstChild",
        backShadowElement: "layer.lastChild",
        frontShadowElement: "backShadow.previousSibling",
        writeTitle: function() {
            if (!this.layer)
                return;
            this.title.innerHTML = Core.escapeHTML(this.getPath("journal.entries.0.title") || "")
        }.observes("journal"),
        fixLeft: function() {
            if (!this.layer)
                return;
            var e = (this.minLeft + 5 || 0) + "px";
            this.layer.style.left = e;
            if (B.mobile && Core.windowSize.width < 600)
                return;
            this.layer.style.right = e
        }.observes("minLeft", "render"),
        tellOwnerMyState: function() {
            this.owner.setIfChanged("isUsingEmptySingleEntryTitle", this.getPath("journal.entries.length") === 1&&!this.getPath("journal.entries.0.title"))
        }.observes("journal")
    }),
    backButtonViewFrameChanged: function() {
        var e = this._backButtonViewLeft || 0, t = this._backButtonViewWidth || 0;
        if (!t)
            return;
        this.set("_selectorMinLeft", e + t)
    }.observes("_backButtonViewLeft", "_backButtonViewWidth")
}), Journal.ThreePieceButtonView = Core.ButtonView.extend({
    classNames: "three-piece"
    .w(),
    rootHTML: '<div><div class="title"></div><div class="background"><div class="left"></div><div class="middle"></div><div class="right"></div></div></div>',
    titleDivElement: "layer.firstChild",
    autoResize: NO,
    autoResizePadding: 40,
    minAutoWidth: - Infinity,
    maxAutoWidth: Infinity,
    shouldEscapeHTML: YES,
    updateTitle: function() {
        if (!this.layer)
            return;
        var e = this.title;
        this.shouldEscapeHTML && (e = Core.escapeHTML(e)), this.titleDiv.innerHTML = e, this.recomputeTitleStringWidth()
    }.observes("title", "render"),
    recomputeTitleStringWidth: function() {
        if (!this.isAppendedInWindow ||!this.autoResize)
            return;
        if (this._lastTitle === (this._lastTitle = this.title))
            return;
        var e = this.titleDiv.style.width, t;
        this.titleDiv.style.width = "auto", t = this.titleDiv.offsetWidth, this.titleDiv.style.width = e, this.setIfChanged("titleStringWidth", t)
    }.observes("isAppendedInWindow"),
    computeWidth: function() {
        if (!this.autoResize ||!this.layer || isNaN(this.titleStringWidth))
            return;
        var e = Math.min(this.maxAutoWidth, Math.max(this.minAutoWidth, this.titleStringWidth + this.autoResizePadding));
        this.setIfChanged("computedWidth", e)
    }.observes("titleStringWidth", "minAutoWidth", "maxAutoWidth"),
    doLayout: function() {
        if (!this.layer)
            return;
        this.layer.style.width = this.computedWidth + "px"
    }.observes("computedWidth")
}), function() {
    var e;
    Journal.define("AppleLogoView", CoreImage.EasyDomImageView.extend(Core.ButtonnessMixin, {
        themeName: null,
        classNames: "apple-logo-view".w(),
        downerGroup: CoreImage.imageLoader.essentialGroup,
        rootHTML: '<div style="cursor:pointer"></div>',
        actionDelay: 0,
        aspectRatio: .85,
        action: function() {
            window.open("_URL.Marketing".loc())
        },
        establishReps: function(
        ) {
            if (!this.isAppendedInWindow)
                return;
            var e = this.isActive ? "ActiveReps": this.isOver ? "OverReps": "Reps";
            this._currentSuffix = e, this.setIfChanged("reps", this[this.themeName + e])
        }.observes("isOver", "isActive", "themeName", "isAppendedInWindow"),
        requestPeers: function() {
            if (!this.currentRep || this._currentSuffix !== "Reps")
                return;
            if (this.currentRep.__hasRequestedPeers__ === (this.currentRep.__hasRequestedPeers__ = YES))
                return;
            CoreImage.ImageRequest.create({
                downerGroup: this.downerGroup,
                url: this.getPath(this.themeName + "ActiveReps." + this.currentRep._key + ".url")
            });
            if (B.mobile)
                return;
            CoreImage.ImageRequest.create({
                downerGroup: this.downerGroup,
                url: this.getPath(this.themeName + "OverReps." + this.currentRep._key + ".url")
            })
        }.observes("currentRep"),
        shelfReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_200.png"
            }
        },
        darkReps: e = {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_200.png"
            }
        },
        mosaicReps: e,
        denimReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_200.png"
            }
        },
        lightReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_200.png"
            }
        },
        cottonReps: e = {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_200.png"
            }
        },
        borderReps: e,
        shelfOverReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_hover_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_hover_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_hover_200.png"
            }
        },
        darkOverReps: e = {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_hover_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_hover_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_hover_200.png"
            }
        },
        mosaicOverReps: e,
        denimOverReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_hover_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_hover_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_hover_200.png"
            }
        },
        lightOverReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_hover_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_hover_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_hover_200.png"
            }
        },
        cottonOverReps: e = {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_hover_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_hover_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_hover_200.png"
            }
        },
        borderOverReps: e,
        shelfActiveReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_active_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_active_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/shelf_active_200.png"
            }
        },
        darkActiveReps: e = {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_active_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_active_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/dark_mosaic_active_200.png"
            }
        },
        mosaicActiveReps: e,
        denimActiveReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_active_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_active_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/denim_active_200.png"
            }
        },
        lightActiveReps: {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_active_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_active_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/light_active_200.png"
            }
        },
        cottonActiveReps: e = {
            20: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_active_20.png"
            },
            40: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_active_40.png"
            },
            200: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/footer_apples/cotton_border_active_200.png"
            }
        },
        borderActiveReps: e
    }))
}(), require("views/three_piece_button"), require("views/apple_logo"), Journal.FooterEntryButtonView = Journal.ThreePieceButtonView.extend({
    classNames: "footer-entry-button font-helvetica".w(),
    entryBinding: "from:.owner.owner.selectedEntry",
    journalBinding: "from:.owner.owner.journal",
    pageViewBinding: ".owner.owner",
    autoResize: YES,
    actionDelay: 0,
    autoResizePadding: 24,
    extraArrowRoom: 16,
    action: function() {
        this.titleEntry && this.pageView && this.pageView.setIfChanged("selectedEntry", this.titleEntry
        ), Core.scrollTop(0)
    },
    establishTitleEntryAndAppendedness: function() {
        if (!this.layer)
            return;
        var e = this.entry, t = this.journal, n = this.journal && this.journal.entries;
        if (!e ||!t ||!n) {
            this.setIfChanged("isAppended", this.initiallyAppended = NO), this.setIfChanged("titleEntry", null);
            return 
        }
        var r = n.indexOf(e);
        if (r===-1)
            return;
        var i = n[r + this.delta];
        this.setIfChanged("isAppended", !!i), this.setIfChanged("titleEntry", i || null)
    }.observes("entry", "journal", "render"),
    establishTitle: function() {
        this.setIfChanged("title", this.getPath("titleEntry.title"))
    }.observes("titleEntry"),
    doLayout: function() {
        if (!this.layer)
            return;
        this.layer.style.width = this.computedWidth + this.extraArrowRoom + "px";
        var e = this.titleDiv.style, t = this.computedWidth + this.extraArrowRoom <= 40;
        e.width = this.computedWidth - this.autoResizePadding + 1 + "px", e[this.delta > 0 ? "right": "left"] = Math.round(this.autoResizePadding / 2 + this.extraArrowRoom) + "px", e[this.delta < 0 ? "right": "left"] = "auto", e.visibility = t ? "hidden" : "", t ? this.titleDiv.setAttribute("aria-hidden", "true") : this.titleDiv.removeAttribute("aria-hidden")
    }.observes("computedWidth"),
    addArrow: function() {
        this.layer.appendChild(this.arrow = document.createElement("div")), this.arrow.className = "arrow"
    }.observes("render")
}), Journal.FooterTextLinkButtonView = Core.ButtonView.extend({
    classNames: "footer-text-button".w(),
    title: "_Footer.PrivacyPolicy".loc(),
    actionDelay: 0,
    render: function(e) {
        e.innerHTML = this.title, this.set("aria-label", this.title)
    },
    measuredWidth: function() {
        return this.isAppendedInWindow ? this._lastTitle === (this._lastTitle = this.title) && this._measuredWidth ? this._measuredWidth : this._measuredWidth = this.layer
        .offsetWidth : this._measuredWidth || 0
    }.property()
}), Journal.PageFooterView = Core.View.extend({
    classNames: "page-footer-view".w(),
    displayWidth: NaN,
    height: 0,
    top: - 1e4,
    appleLogoView: Journal.AppleLogoView.extend({
        themeNameBinding: ".owner.themeName",
        height: 20
    }),
    privacyButtonView: Journal.FooterTextLinkButtonView.extend({
        classNames: "left".w(),
        title: "_Footer.PrivacyPolicy".loc(),
        action: function() {
            window.open("_URL.PrivacyPolicy".loc())
        },
        isAppendedInWindowBinding: "to:.owner.isPrivacyButtonMeasurable"
    }),
    tosButtonView: Journal.FooterTextLinkButtonView.extend({
        classNames: "right".w(),
        title: "_Footer.TermsOfService".loc(),
        action: function() {
            window.open("_URL.TermsOfService".loc())
        },
        isAppendedInWindowBinding: "to:.owner.isTOSButtonMeasurable"
    }),
    nextEntryButtonView: Journal.FooterEntryButtonView.extend({
        classNames: "next right".w(),
        delta: 1
    }),
    prevEntryButtonView: Journal.FooterEntryButtonView.extend({
        classNames: "prev left".w(),
        delta: - 1
    }),
    css: function() {
        this.layer.style.position = "absolute", this.layer.style.zIndex = 100
    }.observes("render"),
    repositionTop: function() {
        if (!this.layer)
            return;
        this.layer.style.top = Math.round(this.top) + "px"
    }.observes("top", "render"),
    resizeToNewHeight: function() {
        if (!this.layer)
            return;
        this.layer.style.height = Math.round(this.height) + "px"
    }.observes("height", "render"),
    doLayout: function() {
        if (!this.isAppendedInWindow || this._doingLayout ||!this.isTOSButtonMeasurable ||!this.isPrivacyButtonMeasurable)
            return;
        this._doingLayout = YES;
        var e = this.displayWidth, t = this.layer, n = this.privacyButtonView.layer, r = this.tosButtonView.layer, i = this.prevEntryButtonView.layer, s = this.nextEntryButtonView.layer, o = this
        .prevEntryButtonView.isAppended, u = this.nextEntryButtonView.isAppended, a = Core.windowSize.width >= 1024 && (o || u), f = a ? 60: 100, l = 20, c, h;
        t.style.width = e + "px", t.style.left = Math.round(Core.windowSize.width / 2 - e / 2) + "px", n.style.bottom = r.style.bottom = l + 10 + "px", this.appleLogoView.setLayout(e / 2 - 8.5, f - 20 - l - 8, 17, 20), a ? (c = Math.round(e / 2 - 70 - this.privacyButtonView.get("measuredWidth") - 40), h = Math.round(e / 2 - 70 - this.tosButtonView.get("measuredWidth") - 40), s.style.bottom = i.style.bottom = l + "px", n.style.right = r.style.left = "50%", n.style.textAlign = "right", r.style.textAlign = "left", n.style.marginRight = r.style.marginLeft = "40px", r.style.maxWidth = n.style.maxWidth = Math.round(e / 2) - 117 + "px", n.style.left = r.style.right = "auto") : (c = h = Math.round(e / 2 - 70), s.style.bottom = i.style.bottom = l + 40 + "px", n.style.textAlign = "left", r.style.textAlign = "right", r.style.maxWidth = n.style.maxWidth = Math.round(e / 2) - 60 + "px", n.style.right = r.style.left = n.style.left = r.style.right = n.style.marginRight = r.style.marginLeft = ""), c < 100 && (c = 15), h < 100 && (h = 15), this.nextEntryButtonView.setIfChanged("maxAutoWidth", h), this.prevEntryButtonView.setIfChanged("maxAutoWidth", c), this.setIfChanged("height", f), this._doingLayout = NO
    }.observes("isAppendedInWindow", "displayWidth", "isTOSButtonMeasurable", "isPrivacyButtonMeasurable")
}), require("views/journal_entry_selector"), require("views/artificial_ipad_background"), require("views/journal_top_bar"), require("views/top_bar_back_button"), require("views/page_footer"), Journal.define("JournalPageView", Core.View.extend({
    typeInteger: Journal.JOURNAL,
    shouldPersistAfterTransitionTo: function() {
        var e = {};
        return e[Journal.SLIDESHOW]=!B
        .chrome && B.s.safari >= 6, e
    }(),
    initiallyAppended: !1,
    classNames: "journal-page full-width full-height".w(),
    displayWidth: undefined,
    journal: null,
    selectedEntry: null,
    zoomImageInfo: null,
    themeName: null,
    footerView: Journal.PageFooterView.extend({
        themeNameBinding: "from:.owner.themeName",
        displayWidthBinding: "from:.owner.displayWidth",
        heightBinding: "to:.owner.footerHeight",
        exportHeight: function() {
            this.trigger("height")
        }.observes("init"),
        ownerLayoutBinding: "hard:from:.owner.layout",
        setTop: function() {
            var e = this.ownerLayout;
            if (!e)
                return;
            this.setIfChanged("top", e && e.height - this.height||-1e4)
        }.observes("ownerLayout", "height")
    }),
    bodyBackgroundColor: function() {
        return this.isDark ? "black" : "white"
    }.property("isDark"),
    makeDownerGroup: function() {
        this.set("downerGroup", CoreImage.ImageGroup.create({
            coreGuid: "JOURNAL_GROUP:" + this.coreGuid,
            importance: 1
        }).enter(CoreImage.imageLoader.group))
    }.observes("init"),
    bumpDownerGroup: function() {
        this.isShowing && this.downerGroup.becomeMostImportant()
    }.observes("isShowing"),
    establishThemeFromJournal: function() {
        this.setIfChanged("themeName", (this.journal && this.journal.themeName || this.themeName || Journal.DEFAULT_THEME).toLowerCase()), this.setIfChanged("journalDeferrer", this.journal)
    }.observes("journal"),
    autoselectEntry: function() {
        var e = this.journal;
        e || this.set("selectedEntry", null), this.setIfChanged("selectedEntry", e.entries[0])
    }.observes("journal"),
    topbarView: Journal.JournalTopBarView.extend({
        displayWidthBinding: "from:.owner.displayWidth",
        journalBinding: "from:.owner.journal",
        selectedEntryBinding: ".owner.selectedEntry",
        isCollapsedBinding: "to:.owner.isTopBarCollapsed"
    }),
    addSlideAnimStyling
    : function(e, t, n) {
        if (Journal.page.bookshelfView === e || Journal.page.bookshelfView === t)
            this.set("isGPUFriendly", YES), $(this.layer).addClass("is-sliding")
    }.observes("willEnterTransition"),
    removeSlideAnimStyling: function(e, t, n) {
        if (Journal.page.bookshelfView === e || Journal.page.bookshelfView === t)
            this.set("isGPUFriendly", NO), $(this.layer).removeClass("is-sliding")
    }.observes("didFinishTransition"),
    bumpIsTransitioning: function() {
        this.setIfChanged("isTransitioning", YES)
    }.observes("willEnterTransition"),
    killIsTransitioning: function() {
        this.setIfChanged("isTransitioning", NO)
    }.observes("didFinishTransition"),
    getSmallZoomInfo: function() {
        return this.zoomImageInfo
    },
    artificialIPadBackgroundView: B.iPad ? Journal.ArtificialIPadBackgroundView.extend({
        themeNameBinding: "from:.owner.themeName",
        sizeBinding: "hard:from:.owner.layout"
    }): null
})), require("views/journal_page"), Journal.JournalPageView.reopen(CoreImage.ThemeSupport, {
    updateToThemeName: function() {
        var e = this.journal.themeInfo, t = this._currentThemeClasses, n = this._currentThemeClasses = e.classNames, r, i;
        for (r = 0; i = t && t[r]; r++)
            $(this.layer).removeClass(i);
        for (r = 0; i = n && n[r]; r++)
            $(this.layer).addClass(i);
        this.setIfChanged("theme", e.theme), this.setIfChanged("themeInfo", e), this.setIfChanged("isDark", e.isDark)
    }.observes("themeName")
}), require("views/journal_page"), Journal.JournalPageView.reopen(Core.PinchZoomability, {
    rootHTML: '<div><div style="z-index:50000; top:41px; position:absolute; left:0px;"></div></div>',
    logElement: "layer.firstChild",
    maximumZoom: 4,
    speedFractionPerTick: .994,
    speedAsymptoteBoost: .03,
    shouldSnapToTop: YES,
    neverLockYAxis: YES,
    defendAgainstAbnormallyFastFlicks
    : YES,
    allowZoom: function() {
        this.allowZoom=!B.android && B.iOS&&!!Journal.initialStateController.params.zoom
    }.observes("init"),
    touchIgnoreTest: function(e) {
        return !e ||!e.touches ||!e.touches.length ? YES : e.touches[0].clientY < 43 ? YES : NO
    },
    defaultZoomState: {
        zoom: 1,
        y: Infinity,
        x: 0
    },
    addZoomableClass: function() {
        this.allowZoom && this.classNames.push("zoomable")
    }.observes("init"),
    computeLayoutForNonZoom: function() {
        if (this.allowZoom ||!this.isAppendedInWindow ||!this.footerHeight)
            return;
        var e = this.isTopBarCollapsed ? 0: 41, t = this.currentEntryHeight + e + this.footerHeight || 0;
        t = Math.max(Core.windowSize.height, t);
        var n = this.layout || (this.layout = {
            top: 0,
            left: 0
        }), r = NO;
        n.width !== (n.width = Core.windowSize.width) && (r = YES), n.height !== (n.height = t) && (r = YES), r && this.trigger("layout")
    }.observes("render", "currentEntryHeight", "Core.windowSize", "isAppendedInWindow", "footerHeight"),
    computeLayoutAndProvideZoomContainerSizeForZoom: function() {
        if (!this.allowZoom)
            return;
        var e = this.zoomContainerSize || (this.zoomContainerSize = {});
        e.width = Core.windowSize.width, e.height = Core.windowSize.height - 41, e.top = 41, e.left = 0, Core.cloneHash(e, this.layout || (this.layout = {})), this.layout.height += 41, this.layout.top = 0, this.trigger("layout"), this.resetZoom(), this.resetZoom(YES), this.trigger("zoomContainerSize")
    }.observes("init", "Core.windowSize"),
    setLayerHeightForNonZoom: function() {
        if (this.allowZoom)
            return;
        var e = Math.ceil(this.layout.height) + "px";
        this.layer.style.height === e || (this.layer.style.height = e)
    }.observes("layout"),
    updateToEntry: function() {
        if (!this.selectedEntry ||!this.isAppendedInWindow)
            return;
        var e = this.selectedEntry, t = this.viewForEntry(e), n =
        this.currentEntryView;
        n && n !== t && n.remove();
        if (n === t)
            return;
        t.appendTo(this), this.resetZoom(YES), this.setIfChanged("currentEntryView", t), this.resetZoom();
        if (!this.allowZoom)
            return;
        var r = this;
        clearTimeout(this._dupeTimeout), this._dupeTimeout = setTimeout(function() {
            r.ensureDupeExistence()
        }, 200)
    }.observes("selectedEntry", "isAppendedInWindow"),
    ensureDupeExistence: function() {
        if (!this.allowZoom ||!this.currentEntryView)
            return;
        this.gpuDupeForView(this.currentEntryView)
    },
    gpuDupeForView: function(e) {
        if (!e)
            return;
        var t = e.gpuDupe || (e.gpuDupe = Journal.JournalEntryView.create({
            isDupe: YES,
            isGPUFriendly: YES,
            isHidden: NO,
            isOnscreenBinding: ".owner.isZoomHappening",
            appendTo: function() {
                return this.original.isAppended ? arguments.callee.base.apply(this, arguments) : this.remove()
            },
            removeWithOriginal: function() {
                this.original.isAppended || this.remove()
            }.observes(".original.isAppended"),
            journal: this.journal,
            entry: e.entry,
            layoutItems: e.layoutItems,
            owner: this,
            pageView: this,
            original: e,
            downerGroup: CoreImage.imageLoader.passiveGroup
        }));
        t.append()
    },
    viewForEntry: function(e) {
        if (!e)
            return null;
        var t = e.layouts, n = Core.windowSize.width, r;
        for (var i = 0, s; s = t[i]; i++)
            n <= (s.maxWidth || Infinity) && (r = s);
        return !r&&!(r = t[t.length - 1]) ? null : r.view || (r.view = Journal.JournalEntryView.create({
            isGPUFriendly: NO,
            isOnscreen: YES,
            isHiddenBinding: ".owner.isZoomHappening",
            journal: this.journal,
            entry: e,
            layoutItems: r,
            owner: this,
            pageView: this,
            downerGroup: this.downerGroup
        }))
    },
    provideZoomTriggers: function() {
        this.trigger(this.isZoomHappening ? "zoomDidStart" : "zoomDidFinish")
    }.observes("isZoomHappening"),
    touchStart: function(e) {
        return this.allowZoom ? (Core.
        hideIOSAddressBar(), e && e.preventDefault && e.preventDefault(), arguments.callee.base.apply(this, arguments)) : arguments.callee.base.apply(this, arguments)
    },
    killAddressBarOnEnter: B.mobile ? function() {
        if (!this.isShowing)
            return;
        Core.hideIOSAddressBar()
    }.observes("isShowing"): null
}), Anim.speedMultiplier = 1, Journal.define("BasicDialogView", Core.View.extend({
    className: "Journal.BasicDialogView",
    rootHTML: '<div class="basic-dialog"><div class="background"><div class="middle"></div><div class="right"></div><div class="left"></div></div><div class="caption"></div></div>',
    captionElement: "layer.lastChild",
    title: null,
    widthPadding: 0,
    leftPadding: 0,
    titleDidChange: function() {
        this.caption.innerHTML = this.title || "&nbsp;", this.doLayerAdjustments()
    }.observes("title", "render"),
    doLayerAdjustments: function() {
        if (!this.isAppendedInWindow)
            return;
        this.adjustLayerWidth(), this.centerLayerHorizontally(), this.centerLayerVertically()
    }.observes("isAppendedInWindow", ".owner.size"),
    adjustLayerWidth: function() {
        if (this._adjustedLayerWidth)
            return;
        this.caption.style.marginLeft = this.leftPadding - 1 + "px";
        var e = this.caption.offsetWidth + this.widthPadding;
        if (isNaN(e))
            return;
        this.layer.style.width = Math.round(e) + "px", this._adjustedLayerWidth=!0
    },
    centerLayerHorizontally: function() {
        var e = this.layer, t = Math.round(this.owner.size.height / 2), n = t - Math.round(e.clientHeight / 2);
        if (isNaN(n))
            return;
        this.layer.style.top = Math.round(n) + "px"
    },
    centerLayerVertically: function() {
        var e = this.layer, t = Math.round(this.owner.size.width / 2), n = t - Math.round(e.clientWidth / 2);
        if (isNaN(n))
            return;
        this.layer.style.left = Math.round(n) + "px"
    }
})), Journal.BookshelfView = Core
.View.extend({
    classNames: "bookshelf-view full-width".w(),
    displayWidthBinding: "from:.owner.displayWidth",
    downerGroupBinding: "from:.owner.downerGroup",
    gnames: "favorite journal montage".w(),
    favoriteGroupName: function() {
        var e = "_Favorites", t = e.loc();
        return t === e ? e.substring(1) : t
    }(),
    journalGroupName: function() {
        var e = "_Journals", t = e.loc();
        return t === e ? e.substring(1) : t
    }(),
    montageGroupName: function() {
        var e = "_Slideshows", t = e.loc();
        return t === e ? e.substring(1) : t
    }(),
    defaultConstants: {
        LAYER_TOP: 41,
        HORZ_SPACING: 10,
        HORZ_INSET: 30,
        VERT_SPACING: 70,
        HEADER_MARGIN_TOP: 0,
        HEADER_MARGIN_BOTTOM: 20,
        HEADER_SIZE: 24-!!B.msie,
        TOP_INSET: 20,
        BOTTOM_INSET: 20
    },
    smallConstants: {
        HORZ_SPACING: 5,
        HORZ_INSET: 3,
        VERT_SPACING: 55,
        HEADER_MARGIN_TOP: 0,
        HEADER_MARGIN_BOTTOM: 10,
        HEADER_SIZE: 20-!!B.msie,
        TOP_INSET: 10,
        BOTTOM_INSET: 10
    },
    iPadConstants: {},
    decideIsSmallAndApplyConstants: function() {
        this.isSmall = Math.max(Core.windowSize.width, Core.windowSize.height) <= 600, this.ensureOwn("classNames").push(this.isSmall ? "small" : "big");
        var e, t = this.defaultConstants;
        for (e in t)
            t.hasOwnProperty(e) && (this[e] = t[e]);
        if (this.isSmall) {
            t = this.smallConstants;
            for (e in t)
                t.hasOwnProperty(e) && (this[e] = t[e])
        }
        if (B.iPad) {
            t = this.iPadConstants;
            for (e in t)
                t.hasOwnProperty(e) && (this[e] = t[e])
        }
    }.observes("init"),
    computeGroupsFromList: function() {
        var e = this.list.projects, t = this.favorites = [], n = this.journals = [], r = this.montages = [], i, s;
        for (i = 0; s = e[i]; i++)
            s.isFavorite || s.isFavourite ? t.push(s) : s.type === "montage" ? r.push(s) : n.push(s)
    },
    generateItemViewsFromGroups: function() {
        if (!this.layer ||!this.list)
            return;
        this.layer.innerHTML = "", this.computeGroupsFromList(), this.exportTopBarTitle
        (), this.shouldRenderHeaders=!this.topBarTitle, this.favoriteItemViews = [], this.journalItemViews = [], this.montageItemViews = [];
        var e = {
            owner: this,
            isSmall: this.isSmall
        }, t, n, r, i, s, o, u;
        for (i = 0; t = this.gnames[i]; i++) {
            n = this[t + "s"], r = this[t + "ItemViews"];
            for (s = 0; o = n[s]; s++)
                r[s] = u = Journal.BookshelfItemView.create(e, {
                    downerImportance: - s - 1e3 * i,
                    item: o
                }).appendTo(this)
        }
        u && (this._oneItemView = u)
    }.observes("list", "render"),
    doLayout: function() {
        if (!this.layer)
            return;
        if (!this._oneItemView)
            return;
        var e = this.displayWidth - 2 * this.HORZ_INSET, t = this._oneItemView, n = t.width + this.HORZ_SPACING, r = t.height + this.VERT_SPACING, i = (e + this.HORZ_SPACING) / n | 0, s = this.favoriteItemViews.length, o = this.journalItemViews.length, u = this.montageItemViews.length, a = Math.ceil(s / i), f = Math.ceil(o / i), l = Math.ceil(u / i);
        i = Math.max(Math.ceil(s / (a || Infinity)), Math.ceil(o / (f || Infinity)), Math.ceil(u / (l || Infinity)));
        var c = Math.min(i, s), h = Math.min(i, o), p = Math.min(i, u), d = Math.max(c, h, p), v = d <= 2, m = this.HORZ_INSET + e / 2 - (c * n - this.HORZ_SPACING) / 2 | 0, g = this.HORZ_INSET + e / 2 - (h * n - this.HORZ_SPACING) / 2 | 0, y = this.HORZ_INSET + e / 2 - (p * n - this.HORZ_SPACING) / 2 | 0, b = Math.min(m, g, y), w = this.TOP_INSET - (this.shouldRenderHeaders ? this.HEADER_MARGIN_TOP : 0), E, S, x, T, N, C, k, L;
        $(this.layer).setClass("center-headers", v), this.favoriteInset = m, this.journalInset = g, this.montageInset = y;
        for (x = 0; E = this.gnames[x]; x++) {
            S = this[E + "ItemViews"];
            if (!S.length) {
                (C = this[E + "Header"]) && C.parentNode && C.parentNode.removeChild(C);
                continue
            }
            this.shouldRenderHeaders && (C = this.getHeaderForGroupName(E), w += this.HEADER_MARGIN_TOP, C.style.top = w + "px", C.style.left = v ? 0 : b + "px", w += this.HEADER_SIZE + this.HEADER_MARGIN_BOTTOM
            ), k = L = 0;
            for (T = 0; N = S[T]; T++)
                L = (T / i | 0) * r, k = T%i * n, N.layer.style.top = w + L + "px", N.layer.style.left = (v ? this[E + "Inset"] || b : b) + k + "px";
            w += L + r
        }
        w += this.BOTTOM_INSET, this._finalItemBottom = w, this.computeHeight()
    }.observes("displayWidth", "list", "render"),
    getHeaderForGroupName: function(e) {
        var t = this[e + "Header"];
        return t || (t = this[e + "Header"] = document.createElement("div"), t.className = "header", t.style.right = "0px", t.style.height = t.style.fontSize = this.HEADER_SIZE + "px", t.innerHTML = this[e + "GroupName"], this.layer.appendChild(t)), t
    },
    computeHeight: function() {
        var e = this.layer, t = Core.windowSize.height;
        if (!e ||!t)
            return;
        this.setIfChanged("height", Math.max(t - this.LAYER_TOP, (this._finalItemBottom | 0) + 40))
    }.observes("Core.windowSize"),
    setLayerHeight: function() {
        if (!this.layer && isNaN(this.height))
            return;
        this.layer.style.height = this.height + "px"
    }.observes("height"),
    exportTopBarTitle: function() {
        var e = this.favorites.length, t = this.journals.length, n = this.montages.length, r = undefined;
        e?!t&&!n && (r = this.favoriteGroupName) : t?!e&&!n && (r = this.journalGroupName) : n&&!e&&!t && (r = this.montageGroupName), this.setIfChanged("topBarTitle", r)
    }
}), Journal.SpinnerView = Core.View.extend({
    rootHTML: '<div><div class="inner"></div></div>',
    innerElement: "layer.firstChild",
    initiallyAppended: NO,
    width: 35,
    height: 35,
    spinDelay: 0,
    spinDuration: 750,
    hasSpin: NO,
    _spinnerAnim: Anim.Animation.extend({
        from: 0,
        to: 11,
        discreteness: 1,
        repeat: Infinity,
        tween: Anim.tweens.LINEAR,
        update: function() {
            this.view.inner.style.top =- this.current * this.view.height + "px"
        }
    }),
    render: function(e) {
        e.style.width = this.width + "px", e.style.height = this.height + "px", this.inner.style.width = this.width + "px"
        , this.inner.style.height = this.height * 12 + "px"
    },
    instantiateAnim: function() {
        this._spinnerAnim = this._spinnerAnim.create({
            view: this,
            duration: this.spinDuration
        })
    }.observes("render"),
    spinDidChange: function() {
        var e = this._spinnerAnim;
        this.hasSpin ? (e.start(), this.append()) : (this.remove(), e.stop())
    }.observes("hasSpin"),
    scheduleHasSpin: function() {
        var e = this;
        this.wantsSpin ? this._hasSpinTimeout || (this._hasSpinTimeout = setTimeout(function() {
            e.setIfChanged("hasSpin", YES)
        }, this.spinDelay)) : (clearTimeout(this._hasSpinTimeout), this._hasSpinTimeout = undefined, this.setIfChanged("hasSpin", NO))
    }.observes("wantsSpin")
}), require("views/spinner"), Journal.BookshelfItemView = Core.ButtonView.extend(CoreImage.MissingImageSupport, {
    rootHTML: '<div class="bookshelf-item"><div class="decor"></div><div class="title selectable"></div><div class="photo-mask"></div><div class="click-mask full-width full-height"></div></div>',
    decorElement: "layer.firstChild",
    titleElement: "decor.nextSibling",
    photoMaskElement: "title.nextSibling",
    downerGroupBinding: ".owner.downerGroup",
    allowsScrolling: YES,
    item: null,
    isSmall: NO,
    actionDelay: 0,
    decideSmallnessDependentValues: function() {
        this.ensureOwn("classNames").push(this.isSmall ? "small" : "big")
    }.observes("init"),
    fetchingItem: NO,
    spinnerView: Journal.SpinnerView.extend({
        classNames: "journal-item-spinner".w(),
        wantsSpinBinding: "from:.owner.fetchingItem",
        doLayout: function() {
            var e = (this.owner.width - this.width) / 2, t = (this.owner.height - this.height) / 2;
            this.layer.style.top = Math.round(t) + "px", this.layer.style.left = Math.round(e) + "px"
        }.observes("isAppended")
    }),
    keyPhotoView: CoreImage.EasyDomImageView.extend
    (Journal.UrlResolutionForImages, {
        classNames: "photo".w(),
        appendInto: "photoMask",
        downerGroupBinding: ".owner.downerGroup",
        importanceBinding: ".owner.downerImportance",
        getReps: function() {
            this.setIfChanged("reps", this.owner.getPath("item.appearance.keyPhoto.photoReps"))
        }.observes(".owner.item", "init")
    }),
    missingImageParent: "photoMask",
    computeMissingImageLayout: function() {
        var e = this.missingImageLayout || (this.missingImageLayout = {});
        e.top = 0, e.left = 0, e.width = this.photoMaskWidth, e.height = this.photoMaskHeight, this.trigger("missingImageLayout")
    },
    fallBackOnMissingImage: function() {
        if (!this.isAppendedInWindow)
            return;
        if (!this.missingImageLayout)
            return;
        if (this.currentSrc)
            return;
        this.set("isShowingMissingImage", YES)
    }.observes("isAppendedInWindow", "missingImageLayout"),
    removeMissingImage: function() {
        if (!this.isImageOpaque)
            return;
        this.set("isShowingMissingImage", NO)
    }.observes("isImageOpaque"),
    action: function() {
        if (Journal.workspaceController.nowShowing !== Journal.BOOKSHELF)
            return;
        this.mouseExited(), this.setIfChanged("fetchingItem", YES), this.item.type === "montage" ? Journal.workspaceController.showMontage(this.item) : Journal.workspaceController.showJournal(this.item)
    },
    noLongerFetchingItem: function() {
        this.setIfChanged("fetchingItem", NO)
    }.observes("Journal.workspaceController.nowShowing"),
    manageFetchingItemName: function() {
        $(this.layer).setClass("spinning", !!this.fetchingItem)
    }.observes("fetchingItem"),
    updateToItem: function() {
        if (!this.layer ||!this.item ||!this.item.appearance)
            return;
        var e = Core.escapeHTML(this.item.title || "");
        this.title.innerHTML = e.replace("\n", "<br>"), this.setIfChanged("ariaLabel", this.item.
        title), this._lastTypeClass && $(this.layer).removeClass(this._lastTypeClass), $(this.layer).addClass(this._lastTypeClass = this.item.type), this.doPhotoLayout(), this.computeMissingImageLayout()
    }.observes("item", "render"),
    decideMetricsForItemAndSize: function() {
        this.isSmall ? (this.width = this.height = 88, this.item.type === "montage" ? (this.photoMaskWidth = 82, this.photoMaskHeight = 56) : (this.photoMaskWidth = 86, this.photoMaskHeight = 86)) : (this.width = this.height = 125, this.item.type === "montage" ? (this.photoMaskWidth = 117, this.photoMaskHeight = 77) : (this.photoMaskWidth = 121, this.photoMaskHeight = 121))
    },
    doPhotoLayout: function() {
        this.decideMetricsForItemAndSize();
        var e = this.item.appearance, t = e.keyPhoto, n = t.width, r = t.height, i = n / r, s = this.photoMaskWidth, o = this.photoMaskHeight, u = s / o, a = i > u, f = e.zoom, l = f * (a ? i / u : 1), c = f * (a ? 1 : 1 / i * u), h = e.cropLeft, p = e.cropTop, d = 1 - l, v = 1 - c, m = h * d, g = p * v;
        this.photoMask.style.width = s + "px", this.photoMask.style.height = o + "px", this.keyPhotoView.setLayout(Math.round(m * s), Math.round(g * o), Math.round(l * s), Math.round(c * o))
    }
}), require("views/journal_entry_selector"), require("views/bookshelf"), require("views/top_bar"), require("views/page_footer"), Journal.BookshelfPageView = Core.View.extend({
    typeInteger: Journal.BOOKSHELF,
    isShowingBinding: "to:Journal.workspaceController.isBookshelfShowing",
    initiallyAppended: NO,
    classNames: "bookshelf-page full-width dark-theme".w(),
    displayWidth: undefined,
    topBarTitle: undefined,
    topBarView: Journal.TopBarView.extend({
        titleBinding: "from:.owner.topBarTitle",
        desiredInitialTab: "bookshelf",
        shouldDrop: NO,
        rootHTML: '<div class="fancy-top-bar-title"><div class="title full-width"></div></div>'
        ,
        titleElementElement: "layer.firstChild",
        writeTitle: function() {
            if (!this.layer)
                return;
            this.titleElement.innerHTML = this.get("title") || "_Projects".loc()
        }.observes("title", "render")
    }),
    bookshelfView: Journal.BookshelfView.extend({
        listBinding: "from:.owner.list",
        downerGroupBinding: "from:.owner.downerGroup",
        heightBinding: "to:.owner.bookshelfHeight",
        topBarTitleBinding: "to:.owner.topBarTitle"
    }),
    footerView: Journal.PageFooterView.extend({
        themeName: "dark",
        displayWidthBinding: "from:.owner.bookshelfView.displayWidth",
        displayWidthIncomingTransform: function(e) {
            return e - 40
        },
        ensureTriggerOnWindowResize: function() {
            this.trigger("displayWidth")
        }.observes("Core.windowSize"),
        computeTop: function() {
            var e = this.owner.bookshelfHeight;
            this.setIfChanged("top", e - 60)
        }.observes(".owner.bookshelfHeight")
    }),
    makeDownerGroup: function() {
        this.set("downerGroup", CoreImage.ImageGroup.create({
            coreGuid: "BOOKSHELF_GROUP:" + this.coreGuid,
            importance: 1
        }).enter(CoreImage.imageLoader.group))
    }.observes("init"),
    bumpDownerGroup: function() {
        this.isShowing && this.downerGroup.becomeMostImportant()
    }.observes("isShowing")
}), require("views/basic_dialog"), Journal.define("CanNotPlayVideoErrorView", Journal.BasicDialogView.extend({
    title: "_Error.CanNotPlayVideo".loc(),
    widthPadding: 41
})), Journal.GridItems = Journal.ClassBank.create({
    suffix: "View",
    Default: Journal.define("GridItemView", Core.ButtonView.extend(CoreImage.GridItemMixin, CoreImage.ThemeSupport, {
        classNames: "grid-item".w(),
        downerGroupBinding: "from:.owner.downerGroup",
        shouldHoldOffBinding: "from:.pageView.isTransitioning",
        allowsScrolling: YES,
        maxWaitDelay: 15e3,
        init: function() {
            this.isPurelyDecorative =
            Journal.slideshowController.shouldExcludeItem(this.originalItem), arguments.callee.base.apply(this, arguments)
        },
        initiallyAppended: function() {
            this.initiallyAppended=!this.hasWaitSupport;
            if (!this.hasWaitSupport)
                return;
            var e = this;
            setTimeout(function() {
                e.forceWaitCompletion()
            }, this.maxWaitDelay)
        }.observes("init"),
        entry: undefined,
        action: function() {
            var e = this;
            if (this.pageView && this.pageView.isZoomHappening)
                return;
            this.pageView && this.pageView.set("zoomImageInfo", null), setTimeout(function() {
                Journal.slideshowController.set("currentItem", e.originalItem), Journal.workspaceController.set("nowShowing", Journal.SLIDESHOW), e.mouseExited()
            }, 150)
        },
        appendWhenReady: function() {
            if (this.isAppended)
                return;
            this.append();
            if (B.iOS || B.msie <= 8)
                return;
            var e = Anim.tasks.length <= 12 && Core.useGPU && this.pageView && this.owner && this.owner.isAppendedInWindow;
            Anim.Fader.go({
                element: this.layer,
                from: 0,
                to: 1,
                duration: 350,
                owner: this,
                notifyDone: function() {
                    this.owner.trigger("appendFadeDidFinish")
                }.observes("finish"),
                applyGPU: e ? function() {
                    this._oldTransform = this.element.style.webkitTransform, this.element.style.webkitTransform = "translate3d(0,0,0)"
                }.observes("start"): null,
                scaleIt: e ? function() {
                    var e = this.current * .1 + .9;
                    this.element.style.webkitTransform = "scale3d(" + e + "," + e + ",1)"
                }.observes("frame"): null,
                removeGPU: e ? function() {
                    this.element.style.webkitTransform = this._oldTransform || ""
                }.observes("stop"): null
            })
        }.observes("waitDidComplete")
    })).extend({
        isPurelyDecorative: YES
    })
}), Journal.define("ImageBasedGridItemView", Journal.GridItemView.extend(Core.WaitSupport, {
    classNames: "image-based-grid-item".w(),
    numReqs: 1,
    imageInset: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    imageView: CoreImage.EasyDomImageView.extend({
        repsBinding: "from:.owner.reps",
        shouldHoldOffBinding: "from:.owner.shouldHoldOff",
        downerGroup: CoreImage.imageLoader.essentialGroup,
        establishLayout: function() {
            var e = this.owner.layout;
            if (!e)
                return;
            var t = this.owner.maxImageWidth, n = this.owner.maxImageHeight;
            if (!t ||!n)
                return this.setSize(e.width, e.height);
            var r = this.owner.imageInset, i = this.owner.cellSize, s = t / n, o = e.width - r.left * i - r.right * i, u = e.height - r.top * i - r.bottom * i, a = o / u, f = s > a, l = f ? o: u * s, c = f ? o / s: u, h = Math.round((o - l) / 2) + r.left * i, p = Math.round((u - c) / 2) + r.top * i;
            this.setLayout(h, p, l, c)
        }.observes(".owner.layout"),
        notifyReady: function() {
            this.owner.closeReq()
        }.observes("waitDidComplete")
    }),
    establishSlideshowSize: function() {
        this.setIfChanged("maxSlideshowSize", Math.max(this.maxImageHeight, this.maxImageWidth) || Infinity)
    }.observes("init", "maxImageHeight", "maxImageWidth")
})), require("views/grid_items/_bank"), require("views/top_bar_back_button"), Journal.ErrorPageView = Core.View.extend({
    typeInteger: Journal.ERROR,
    classNames: "error-page full-width full-height dark-theme".w(),
    initiallyAppended: NO,
    topBinding: "from:Journal.workspaceController.allowErrorBackButton",
    topIncomingTransform: function(e) {
        return e ? 64 : 20
    },
    bottom: 60,
    messageHeight: 0,
    errorHeightIncludingBottomSpacing: 121,
    killAddressBar: B.iOS ? function(e, t, n) {
        this === t && Core.hideIOSAddressBar()
    }.observes("didEndTransition"): null,
    doLayout: function() {
        if (!this.isAppendedInWindow)
            return;
        var e = Core.windowSize.height - this.top - this.bottom, t = this.message.offsetHeight, n = t + this.errorHeightIncludingBottomSpacing;
        e = Math.max(e, n);
        var r = this.top + e / 2.5 -
        n / 2.5 | 0, i = r + this.errorHeightIncludingBottomSpacing;
        this.icon.style.top = r + "px", this.message.style.top = i + "px", this.layer.style.height = Math.max(Core.windowSize.height, n + this.top + this.bottom) + "px", this.setIfChanged("contentHeight", n)
    }.observes("Core.windowSize", "isAppendedInWindow", "top"),
    rootHTML: '<div><div class="error-icon"></div><span style="position:absolute; text-align:center; left:10%; width:80%; color:#BBBDBF; font-size:' + (B.mobile && window.innerWidth <= 600 ? "15" : "22") + 'px;"></span></div>',
    iconElement: "layer.firstChild",
    messageElement: "layer.lastChild",
    topBarView: Journal.TopBarView.extend({
        initiallyAppended: NO,
        isAppendedBinding: "from:Journal.workspaceController.allowErrorBackButton",
        shouldDrop: NO,
        backButtonView: Journal.TopBarBackToProjectsButtonView.extend({
            alwaysShowTitle: YES
        })
    }),
    footerView: Journal.PageFooterView.extend({
        themeName: "dark",
        getValuesFromWindowSize: function() {
            if (!this.owner.contentHeight)
                return;
            this.setIfChanged("displayWidth", Core.windowSize.width - 40), this.setIfChanged("top", Math.max(this.owner.contentHeight + this.owner.top - 38, Core.windowSize.height - 100))
        }.observes("Core.windowSize", "init", ".owner.contentHeight", ".owner.top")
    }),
    writeError: function() {
        if (!this.message)
            return;
        var e = (Journal.initialStateController.params.testError || "").loc() || this.get("errorMessage");
        this.message.innerHTML = e
    }.observes("errorMessage", "render")
}), Journal.GridItems.define("CalendarView", Journal.ImageBasedGridItemView.extend({
    className: "GridItems.CalendarView",
    classNames: "calendar",
    maxImageWidth: 552,
    maxImageHeight: 584,
    imageInset: {
        left: .01,
        right: - 0.002,
        top: .02,
        bottom: - 0.02
    },
    reps: {
        146: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/calendar_146.png"
        },
        292: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/calendar_292.png"
        },
        584: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/calendar_584.png"
        }
    },
    rootHTML: '<div><div class="month"></div><div class="day"></div><div class="year"></div></div>',
    monthDivElement: "layer.firstChild",
    dayDivElement: "monthDiv.nextSibling",
    yearDivElement: "dayDiv.nextSibling",
    computeValues: function() {
        this.monthDiv.innerHTML = this.month || "1", this.dayDiv.innerHTML = this.day || "", this.yearDiv.innerHTML = this.year || ""
    }.observes("render", "day", "month", "year")
})), Journal.GridItems.CurrencyView = Journal.ImageBasedGridItemView.extend({
    country: "US",
    REPSETS: {
        AR: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_AR.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_AR@2x.png"
        },
        AU: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_AU.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_AU@2x.png"
        },
        BR: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_BR.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_BR@2x.png"
        },
        CA: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_CA.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_CA@2x.png"
        },
        CH: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_CH.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_CH@2x.png"
        },
        EG: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_EG.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_EG@2x.png"
        },
        EU: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_EU.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_EU@2x.png"
        },
        JP: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_JP.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_JP@2x.png"
        },
        KR: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_KR.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_KR@2x.png"
        },
        NZ: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_NZ.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_NZ@2x.png"
        },
        RU: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_RU.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_RU@2x.png"
        },
        SE: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_SE.png"
            ,
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_SE@2x.png"
        },
        US: {
            289: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_US.png",
            578: "/applications/journal/16CProject51/en-us/source/resources/images/currency/journal_currency_US@2x.png"
        }
    },
    FIX_MAP: {
        AR: "AR",
        AG: "AR",
        AU: "AU",
        BR: "BR",
        CA: "CA",
        EG: "EG",
        EU: "EU",
        JP: "JP",
        NZ: "NZ",
        RU: "RU",
        KR: "KR",
        SE: "SE",
        SW: "SE",
        CH: "CH",
        US: "US",
        AT: "EU",
        BE: "EU",
        CY: "EU",
        EE: "EU",
        FI: "EU",
        FR: "EU",
        DE: "EU",
        GR: "EU",
        IE: "EU",
        IT: "EU",
        LU: "EU",
        MT: "EU",
        NL: "EU",
        PT: "EU",
        SK: "EU",
        SI: "EU",
        ES: "EU",
        EC: "US",
        PA: "US",
        VG: "US",
        BQ: "US",
        TC: "US",
        SV: "US"
    },
    establishReps: function() {
        this.set("reps", this.REPSETS[this.country.toUpperCase()] || this.REPSETS[this.FIX_MAP[this.country.toUpperCase()]] || this.REPSETS.US)
    }.observes("init")
}), Journal.GridItems.define("PhotoView", Journal.GridItemView.extend(Core.WaitSupport, CoreImage.PhotoGridItemMixin, CoreImage.MissingImageSupport, {
    className: "GridItems.PhotoView",
    classNames: "photo".w(),
    rootHTML: '<div><div class="container"><div class="image-container full-width full-height"><div class="caption-container"><span class="caption"></span><img src="/applications/journal/16CProject51/en-us/source/resources/images/caption_shadow.png"></div></div><div class="chrome full-width full-height"><div class="chrome-inner"><div class=top-left></div><div class=top></div><div class=top-right></div><div class=nonsliced-left></div><div class=nonsliced-right></div><div class=bottom-left></div><div class=bottom></div><div class=bottom-right></div></div></div></div></div>',
    containerElement
    : "layer.firstChild",
    imageContainerElement: "container.firstChild",
    captionContainerElement: "imageContainer.firstChild",
    captionElement: "captionContainer.firstChild",
    captionShadowElement: "captionContainer.lastChild",
    chromeInnerElement: "imageContainer.nextSibling.firstChild",
    missingImageParent: "imageContainer",
    numReqs: 1,
    computeMissingImageLayout: function() {
        var e = this.layout;
        if (!e)
            return;
        var t = this.missingImageLayout || (this.missingImageLayout = {}), n = this.getInset();
        t.left = 0, t.top = 0, t.width = e.width - 2 * n, t.height = e.height - 2 * n, this.trigger("missingImageLayout")
    }.observes("layout"),
    getInset: function() {
        return this.theme.valueFor("inset", this)
    },
    imageView: CoreImage.PhotoGridItemMixin.imageView.extend(Journal.UrlResolutionForImages, {
        shouldFade: NO,
        importanceBinding: ".owner.downerImportance",
        shouldHoldOffBinding: "from:.owner.shouldHoldOff",
        currentSrcBinding: "to:.owner.currentSrc",
        establishReps: function() {
            this.set("reps", this.owner.getPath("value.photoReps"))
        }.observes(".owner.value", "init"),
        notifyReady: function() {
            this.owner.closeReq()
        }.observes("waitDidComplete")
    }),
    reenableImageFadingOnSelfAppendFinish: function() {
        this.imageView.shouldFade = YES
    }.observes("appendFadeDidFinish"),
    handleCaption: function() {
        if (!this.layer)
            return;
        var e = this.value, t = this.captionContainer.style, n = this.caption;
        !e ||!e.caption ? t.display = "none" : (t.display = "", n.innerHTML = (e.caption + "").split(" ").join("&nbsp;"), n._takenClassName || (n._takenClassName = YES, e.font ? n.className += " custom-font font-" + e.font : n.className += " no-custom-font"))
    }.observes("render", "value"),
    sizeCaptionShadow: function() {
        if (!this.layer ||!this.value ||!this.value
        .caption)
            return;
        var e = this.height === 1 ? 31 / 137 * this.cellSize: 46 / 137 * this.cellSize;
        this.captionShadow.style.height = Math.round(e) + "px"
    }.observes("cellSize", "render")
})), Journal.GridItems.PhotoChromelessView = Journal.GridItems.PhotoView.extend(Journal.GridItems.PhotoView.chromelessModification = {
    classNames: "chromeless".w(),
    rootHTML: '<div><div class="container"><div class="image-container full-width full-height"><div class="caption-container"><span class="caption light"></span><img src="/applications/journal/16CProject51/en-us/source/resources/images/caption_shadow.png"></div></div></div></div>'
}), Journal.GridItems.PhotoBorderlessView = Journal.GridItems.PhotoView.extend(Journal.GridItems.PhotoView.borderlessModification = {
    classNames: "borderless".w(),
    chromeInnerElement: null
}), Journal.GridItems.MapView = Journal.GridItems.MapBorderlessView = Journal.GridItems.PhotoBorderlessView.extend({
    classNames: "map".w()
}), Journal.GridItems.MapChromelessView = Journal.GridItems.PhotoChromelessView.extend({
    classNames: "map".w()
}), require("views/grid_items/photo"), Journal.GridItems.FlagView = Journal.GridItems.PhotoBorderlessView.extend({
    country: "US",
    classNames: "flag".w(),
    isPurelyDecorative: YES,
    REPSETS: {
        AR: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_AR.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_AR@2x.png"
        },
        AT: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_AT.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_AT@2x.png"
        },
        AU: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_AU.png"
            ,
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_AU@2x.png"
        },
        BE: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_BE.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_BE@2x.png"
        },
        BR: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_BR.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_BR@2x.png"
        },
        CA: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CA.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CA@2x.png"
        },
        CH: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CH.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CH@2x.png"
        },
        CN: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CN.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CN@2x.png"
        },
        CZ: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CZ.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_CZ@2x.png"
        },
        DE: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_DE.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_DE@2x.png"
        },
        DK: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_DK.png"
            ,
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_DK@2x.png"
        },
        EG: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_EG.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_EG@2x.png"
        },
        ES: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_ES.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_ES@2x.png"
        },
        FI: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_FI.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_FI@2x.png"
        },
        FR: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_FR.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_FR@2x.png"
        },
        GB: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_GB.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_GB@2x.png"
        },
        GR: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_GR.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_GR@2x.png"
        },
        IE: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_IE.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_IE@2x.png"
        },
        IT: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_IT.png"
            ,
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_IT@2x.png"
        },
        JP: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_JP.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_JP@2x.png"
        },
        KR: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_KR.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_KR@2x.png"
        },
        MX: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_MX.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_MX@2x.png"
        },
        MY: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_MY.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_MY@2x.png"
        },
        NL: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_NL.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_NL@2x.png"
        },
        NO: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_NO.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_NO@2x.png"
        },
        NZ: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_NZ.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_NZ@2x.png"
        },
        PL: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_PL.png"
            ,
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_PL@2x.png"
        },
        PT: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_PT.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_PT@2x.png"
        },
        RU: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_RU.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_RU@2x.png"
        },
        SE: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_SE.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_SE@2x.png"
        },
        TR: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_TR.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_TR@2x.png"
        },
        TW: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_TW.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_TW@2x.png"
        },
        US: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_US.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_US@2x.png"
        },
        ZA: {
            260: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_ZA.png",
            580: "/applications/journal/16CProject51/en-us/source/resources/images/flags/journal_flag_ZA@2x.png"
        }
    },
    FIX_MAP: {
        AG: "AR",
        UK: "GB",
        SW: "SE"
    },
    preinit: function() {
        return this.value = {
            photoReps: this
            .REPSETS[this.country.toUpperCase()] || this.REPSETS[this.FIX_MAP[this.country.toUpperCase()]] || this.REPSETS.US
        }, arguments.callee.base.apply(this, arguments)
    }
}), Journal.GridItems.define("TextView", Journal.GridItemView.extend({
    className: "GridItems.TextView",
    rootHTML: '<div class="content"><div class="text selectable"></div></div>',
    containerElement: "layer.firstChild",
    value: "",
    alignment: "justify",
    font: "helvetica",
    update: function() {
        var e = Journal.pruneAllButSimpleFormatting(this.value);
        this.container.innerHTML = Journal.prewrapify(e)
    }.observes("value", "render"),
    addAlignmentClass: function() {
        $(this.layer).addClass("align-" + this.alignment)
    }.observes("render"),
    addFontClass: function() {
        $(this.layer).addClass("font-" + this.font)
    }.observes("render"),
    addPadding: function() {
        if (!this.container || isNaN(this.cellSize))
            return;
        this.container.style.padding = Math.round(this.cellSize * .05) + "px"
    }.observes("render", "cellSize")
})), Journal.GridItems.define("HeadingView", Journal.GridItems.TextView.extend({
    className: "GridItems.HeadingView",
    classNames: "heading".w(),
    alignment: "center",
    ariaRole: "heading",
    addAriaLevel: function() {
        this.layer.setAttribute("aria-level", "1")
    }.observes("render")
})), require("views/grid_items/_bank"), function() {
    var e = B.msie <= 8, t = e ? CoreImage.ClassicDOMConstructedImageView: CoreImage.CanvasConstructedImageView, n, r;
    Journal.GridItems.define("MemoryView", Journal.GridItemView.extend({
        className: "GridItems.NewMemoryView",
        classNames: "memory".w(),
        style: "paper",
        defaultStyle: "paper",
        ruleInterval: NaN,
        ruleOffset: NaN,
        ruleInset: null,
        LINE_HEIGHT_OFFSETS: {
            noteworthy: .77,
            helvetica: .687,
            _default: .68
        },
        rootHTML: '<div><div class="text selectable"></div></div>'
        ,
        textDivElement: "layer.firstChild",
        alignment: "center",
        font: "noteworthy",
        addAlignmentClass: function() {
            $(this.layer).addClass("align-" + this.alignment)
        }.observes("render"),
        addFontClass: function() {
            $(this.layer).addClass("font-" + this.font)
        }.observes("render"),
        writeText: function() {
            if (!this.layer)
                return;
            var e = Journal.pruneAllButSimpleFormatting(this.value);
            this.textDiv.innerHTML = Journal.prewrapify(e)
        }.observes("render", "value"),
        maxLinesOfText: function() {
            return this.height * 5 - 1 - 1 * (this.style === "paper")
        }.property(),
        doTextLayout: function(e) {
            if (!e&&!this.isAppendedInWindow)
                return;
            if (!this.layout)
                return;
            var t = this.textDiv.style, n, r, i, s, o, u, a;
            t.fontSize === (n = Math.round(36 / 290 * this.displayWidth) + "px") || (t.fontSize = n), t.lineHeight === (n = (r = Math.round(60 / 290 * this.displayWidth)) + "px") || (t.lineHeight = n), t.left === (n = 60 / 290 * this.displayWidth + "px") || (t.left = n), t.right === n || (t.right = n), !t.height || (t.height = ""), i = this.textDiv.offsetHeight, o = Math.round(i / r), s = this.get("maxLinesOfText"), o = Math.min(s, o), u = (o + .05) * r, a = Math.round((this.layout.height - u) / 2) - this.cellSize * .01 + (B.msie <= 8?-0.01 : 0), finalHeight = u + Math.floor((this.layout.height - a - u) / r) * r, t.height = finalHeight + "px", t.top = a + "px", this.set("ruleOffset", a + r * (this.LINE_HEIGHT_OFFSETS[this.font] || this.LINE_HEIGHT_OFFSETS._default) + (B.msie <= 8?-0.02 * this.cellSize : 0)), this.set("ruleInterval", r)
        }.observes("value", "isAppendedInWindow", "layout", ".entryView.remeasurementForFonts"),
        ensureValidStyle: function() {
            this[this.style + "ImageClass"] || (this.style = this.defaultStyle)
        }.observes("init"),
        createAppropriateImage: function() {
            this.imageView = this[this.style + "ImageClass"
            ].create({
                owner: this
            }).append(), e || this.imageView.ruleInset && this.setIfChanged("ruleInset", this.imageView.ruleInset)
        }.observes("render"),
        decideRules: function() {
            var t;
            this.style === "graph" && (this.vertRulesViewClass.create({
                owner: this,
                ruleColor: t = e ? Anim.encodeColor(210, 210, 210): "rgba(0,0,0,0.07)"
            }).append(), this.horzRulesViewClass.create({
                owner: this,
                ruleColor: t
            }).append()), this.style === "ruled" && this.horzRulesViewClass.create({
                owner: this,
                ruleColor: e ? Anim.encodeColor(203.125, 221.25, 251.875): "rgba(0,128,255,0.15)"
            }).append()
        }.observes("render"),
        horzRulesViewClass: (n = Core.View.extend({
            ruleIntervalBinding: "from:.owner.ruleInterval",
            cellSizeBinding: "from:.owner.cellSize",
            widthBinding: "from:.owner.width",
            heightBinding: "from:.owner.height",
            insetBinding: "from:.owner.ruleInset",
            offsetBinding: "from:.owner.ruleOffset",
            isHorizontal: YES,
            ruleThickness: B.iPhone && window.innerWidth <= 600 ? 1: 2,
            ruleColor: "black",
            zIndex: 2,
            _avoidCSS: function() {
                this.layer.style.cssText = "position:absolute; overflow:hidden;"
            }.observes("render"),
            doLayout: function() {
                if (!this.layer ||!this.cellSize ||!this.inset)
                    return;
                var t = this.layer.style, n = this.cellSize, r = this.inset, i = e ? 1: n;
                t.top = Math.round(r.top * i) + "px", t.left = Math.round(r.left * i) + "px", t.right = Math.round(r.right * i) + "px", t.bottom = Math.round(r.bottom * i) + "px"
            }.observes("inset", "render", "cellSize"),
            _zIndex: function() {
                this.layer && (this.layer.style.zIndex = this.zIndex)
            }.observes("zIndex", "render"),
            drawRules: function() {
                if (!this.layer ||!this.inset || isNaN(this.offset) ||!this.ruleInterval)
                    return;
                var t = this.isHorizontal, n = t ? "height": "width", r = t ? "top": "left", i = t ? "bottom": "right", s = t ? "left"
                : "top", o = t ? "right": "bottom", u = t ? "top": "left", a = this._divs || (this._divs = []), f = this.ruleInterval, l = this.cellSize, c = e ? 1: l, h = this.inset, p = Math.ceil(this[n] * l / f), d = Math.round((this.offset - h[r] * c)%f), v, m;
                for (v = 0; v < p; v++)
                    m = this._divs[v], m || (m = this._divs[v] = document.createElement("div"), m.style.cssText = "position:absolute; " + s + ":0; " + o + ":0;"), m.style.backgroundColor === this.ruleColor || (m.style.backgroundColor = this.ruleColor), m.style[n] === this.ruleThickness + "px" || (m.style[n] = this.ruleThickness + "px"), m.style[u] === d + "px" || (m.style[u] = d + "px"), m.parentNode&&!B.msie || this.layer.appendChild(m), m._isInUse = YES, d += this.ruleInterval;
                for (; m = this._divs[v]; v++) {
                    if (!m._isInUse)
                        continue;
                    m.parentNode && m.parentNode.removeChild(m), m._isInUse = NO
                }
            }.observes("width", "height", "ruleThickness", "ruleColor", "__TEMP_REMOVING_THIS_KEY_offset", "render", "cellSize", "ruleInterval", "inset")
        })).extend({}),
        vertRulesViewClass: n.extend({
            isHorizontal: NO
        }),
        graphImageClass: r = t.extend(Journal.GridItemBackgroundImageSupport, {
            ruleInset: {
                left: .0425,
                right: .05 - .02,
                top: .038,
                bottom: .04
            },
            zIndex: 1,
            leftOffset: 2,
            widthOffset: - 4,
            topOffset: 2,
            heightOffset: - 3.5,
            spriteReps: {
                566: {
                    url: "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_graph@2x.png",
                    additionalUrls: e ? ["/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_left@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_center@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_right@2x.png"
                    , "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_bottom@2x.png"]: undefined,
                    layoutWidth: 2,
                    layoutHeight: 2,
                    width: 566,
                    height: 566,
                    extraPixelWidth: - 5,
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                    classicDOMOnlyRuleInset: {
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12
                    }
                },
                283: {
                    url: "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_graph.png",
                    additionalUrls: e ? ["/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_left.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_right.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_graph_bottom.png"]: undefined,
                    layoutWidth: 2,
                    layoutHeight: 2,
                    width: 283,
                    height: 283,
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                    classicDOMOnlyRuleInset: {
                        left: 6,
                        right: 6,
                        top: 6,
                        bottom: 6
                    }
                }
            },
            currentClassicDOMRuleInsetBinding: "to:.owner.ruleInset",
            sendClassicDOMRuleInset: function() {
                if (!e)
                    return;
                this.setIfChanged("currentClassicDOMRuleInset", this.getPath("currentRep.classicDOMOnlyRuleInset"))
            }.observes("currentRep")
        }),
        ruledImageClass: r,
        roundedImageClass: t.extend(Journal.GridItemBackgroundImageSupport, {
            zIndex: 1,
            leftOffset: 2,
            widthOffset: - 4,
            topOffset: 2,
            heightOffset: - 3.5,
            spriteReps: {
                566: {
                    url: "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_round_rect@2x.png"
                    ,
                    additionalUrls: e ? ["/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_left@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_center@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_right@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_bottom@2x.png"]: undefined,
                    _hackKeyBump: e ? 150: undefined,
                    layoutWidth: 2,
                    layoutHeight: 2,
                    width: 566,
                    height: 566,
                    extraPixelWidth: - 5,
                    left: 70,
                    right: 70,
                    top: 70,
                    bottom: 70
                },
                283: {
                    url: "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_round_rect.png",
                    additionalUrls: e ? ["/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_left.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_right.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/ie8/journal_memory_round_rect_bottom.png"]: undefined,
                    _hackKeyBump: e ? 75: undefined,
                    layoutWidth: 2,
                    layoutHeight: 2,
                    width: 283,
                    height: 283,
                    left: 35,
                    right: 35,
                    top: 35,
                    bottom: 35
                }
            }
        }),
        paperImageClass: t.extend(Journal
        .GridItemBackgroundImageSupport, {
            zIndex: 1,
            leftOffset: - 8 / 256,
            widthOffset: .0625,
            spriteReps: {
                1024: {
                    url: "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_middle.png",
                    additionalUrls: ["/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_bottom.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_side@2x.png"],
                    layoutWidth: 8,
                    topHeight: 23,
                    bottomHeight: 23,
                    sideWidth: 10,
                    extraPixelWidth: 8,
                    width: 1024,
                    shadowInsets: [10, 4, 4, 0, 10, 4, 4, 0, 10, 4, 13, 2, 10, 4, 5, 7, 10, 4, 5, 4, 10, 4, 1, 8, 10, 4, 5, 7, 10, 4, 7, 4],
                    _hackKeyBump: e ? 300: undefined
                },
                2048: {
                    url: "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_middle@2x.png",
                    additionalUrls: ["/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_bottom@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/memory/journal_memory_side@2x.png"],
                    layoutWidth: 8,
                    topHeight: 46,
                    bottomHeight: 46,
                    sideWidth: 20,
                    extraPixelWidth: 16,
                    width: 2048,
                    shadowInsets: [25, 13, 12, 4, 25, 13, 12, 4, 25, 13, 32, 9, 25, 13, 16, 19, 25, 13, 14, 12, 25, 13, 8, 23, 25, 13, 14, 19, 25, 13, 22, 16],
                    _hackKeyBump: e ? 300: undefined
                }
            },
            rendererViewClass: e ? Core.View.extend({
                rootHTML: "<div><div></div><img><div></div></div>",
                classNames: "full-height",
                tElement: "layer.firstChild",
                mElement: "t.nextSibling",
                bElement: "m.nextSibling",
                initialRender: function() {
                    if (!this.
                    rep ||!this.rep.additionalUrls)
                        return;
                    var e = this.rep;
                    this.layer.style.overflow = "hidden", this.t.style.cssText = "background: url(" + e.additionalUrls[0] + ") top left; left:0px; top:0px; right:0px; height:" + e.topHeight + "px;", this.b.style.cssText = "background: url(" + e.additionalUrls[1] + ") top left; left:0px; bottom:0px; right:0px; height:" + e.bottomHeight + "px;", this.m.style.cssText = "left:0px; top:" + e.topHeight + "px;", this.m.src = e.url || e.src;
                    for (var t = 0; t < this.initialElements.length; t++)
                        this[this.initialElements[t]].style.position = "absolute"
                }.observes("render"),
                update: function() {
                    if (!this.isAppendedInWindow ||!this.rep)
                        return;
                    var e = this.getPath("owner.owner.cellSize") || 0;
                    this.layer.style.left = this.layer.style.right = Math.round(e * .08) + "px", this.m.style.width = Math.max(0, this.owner.width) + "px", this.m.style.height = Math.max(0, this.owner.height - this.rep.topHeight - this.rep.bottomHeight) + "px"
                }.observes("isAppendedInWindow", ".owner.sizeDidChange")
            }): undefined,
            paint: function(t, n, r, i) {
                if (e)
                    return;
                var s = this.currentRep, o, u = n - 2 * s.sideWidth, a = this.get("layoutWidth") * 4 - 4, f = s.shadowInsets[a + 0], l = s.shadowInsets[a + 1], c = s.shadowInsets[a + 2], h = s.shadowInsets[a + 3];
                try {
                    (o = this.currentAdditionalImages[0]) && t.drawImage(o, 0, 0, u, s.topHeight, s.sideWidth, 0, u, s.topHeight), (o = this.currentImageExample) && t.drawImage(o, s.sideWidth, s.topHeight, u, r - s.topHeight - s.bottomHeight), (o = this.currentAdditionalImages[1]) && t.drawImage(o, 0, 0, u, s.bottomHeight, s.sideWidth, r - s.bottomHeight, u, s.bottomHeight);
                    if (o = this.currentAdditionalImages[2])
                        t.drawImage(o, 0, 0, s.sideWidth, s.topHeight, n - s.sideWidth, c, s.sideWidth, s.topHeight), t.drawImage(o, 0
                        , s.topHeight, s.sideWidth, 1, n - s.sideWidth, c + s.topHeight, s.sideWidth, r - s.topHeight - c - s.bottomHeight - h), t.drawImage(o, 0, o.height - s.bottomHeight, s.sideWidth, s.bottomHeight, n - s.sideWidth, r - h - s.bottomHeight, s.sideWidth, s.bottomHeight), t.save(), t.translate(n, 0), t.scale( - 1, 1), t.drawImage(o, 0, 0, s.sideWidth, s.topHeight, n - s.sideWidth, f, s.sideWidth, s.topHeight), t.drawImage(o, 0, s.topHeight, s.sideWidth, 1, n - s.sideWidth, f + s.topHeight, s.sideWidth, r - s.topHeight - f - s.bottomHeight - l), t.drawImage(o, 0, o.height - s.bottomHeight, s.sideWidth, s.bottomHeight, n - s.sideWidth, r - l - s.bottomHeight, s.sideWidth, s.bottomHeight), t.restore()
                } catch (p) {
                    Core.debug("Error during drawImage for Memory element " + this + ": " + p)
                }
            }
        }),
        openAll: function() {
            return;
            var e
        }.observes("render")
    }))
}(), require("views/grid_items/_bank"), function() {
    var e = B.msie <= 8, t = {
        602: {
            layoutWidth: 2,
            layoutHeight: 1,
            extraPixelWidth: 0,
            extraPixelHeight: 13,
            width: 602,
            height: 314,
            left: 300,
            right: 300,
            top: 150,
            bottom: 163,
            _hackKeyBump: e ? 100: undefined
        },
        301: {
            layoutWidth: 2,
            layoutHeight: 1,
            extraPixelWidth: 0,
            extraPixelHeight: 6,
            width: 301,
            height: 157,
            left: 150,
            right: 150,
            top: 75,
            bottom: 81,
            _hackKeyBump: e ? 50: undefined
        },
        260: {
            layoutWidth: 2,
            layoutHeight: 1,
            extraPixelWidth: 0,
            extraPixelHeight: 6,
            width: 260,
            height: 136,
            left: 129,
            right: 129,
            top: 64,
            bottom: 71
        },
        130: {
            layoutWidth: 2,
            layoutHeight: 1,
            extraPixelWidth: 0,
            extraPixelHeight: 3,
            width: 130,
            height: 68,
            left: 64,
            right: 64,
            top: 32,
            bottom: 35
        }
    }, n = Core.cloneHash(t, YES);
    n[602].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_green@2x.png", n[301].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_green.png"
    , n[260].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_green-iphone@2x.png", n[130].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_green-iphone.png", e && (n[602].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_left@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_right@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_bottom@2x.png"], n[301].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_left.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_right.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_green_bottom.png"], n[260] = undefined, n[130] = undefined);
    var r = Core.cloneHash(t, YES);
    r[602].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_yellow@2x.png", r[301].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_yellow.png"
    , r[260].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_yellow-iphone@2x.png", r[130].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_yellow-iphone.png", e && (r[602].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_left@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_right@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_bottom@2x.png"], r[301].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_left.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_right.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_yellow_bottom.png"], r[260] = undefined, r[130] = undefined);
    var i = Core.cloneHash(t, YES);
    i[602].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_blue@2x.png", i[301].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_blue.png"
    , i[260].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_blue-iphone@2x.png", i[130].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_blue-iphone.png", e && (i[602].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_left@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_right@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_bottom@2x.png"], i[301].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_left.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_right.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_blue_bottom.png"], i[260] = undefined, i[130] = undefined);
    var s = Core.cloneHash(t, YES);
    s[602].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_gray@2x.png", s[301].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_gray.png"
    , s[260].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_gray-iphone@2x.png", s[130].url = "/applications/journal/16CProject51/en-us/source/resources/images/note/journal_note_gray-iphone.png", e && (s[602].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_top@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_left@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_right@2x.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_bottom@2x.png"], s[301].additionalUrls = ["/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_top.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_left.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_center.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_right.png", "/applications/journal/16CProject51/en-us/source/resources/images/note/ie8/journal_note_gray_bottom.png"], s[260] = undefined, s[130] = undefined);
    var o = (e ? CoreImage.ClassicDOMConstructedImageView : CoreImage.CanvasConstructedImageView).extend(Journal.GridItemBackgroundImageSupport, {
        heightOffset: 6 / 109,
        topOffset: 4 / 109
    });
    Journal.GridItems.define("NoteView", Journal.GridItems.MemoryView
    .extend({
        className: "GridItems.NoteView",
        alignment: "center",
        font: "chalkduster",
        style: "yellow",
        defaultStyle: "yellow",
        ariaRole: "note",
        maxLinesOfText: function() {
            return this.height * 5 - 2
        }.property(),
        greenImageClass: o.extend({
            spriteReps: n
        }),
        yellowImageClass: o.extend({
            spriteReps: r
        }),
        greyImageClass: o.extend({
            spriteReps: s
        }),
        grayImageClass: o.extend({
            spriteReps: s
        }),
        silverImageClass: o.extend({
            spriteReps: s
        }),
        blueImageClass: o.extend({
            spriteReps: i
        })
    }))
}(), Journal.define("DarknessAwareImageView", CoreImage.EasyDomImageView.extend({
    isAriaHidden: NO,
    downerGroup: CoreImage.imageLoader.essentialGroup,
    establishReps: function() {
        this.set("reps", this.getPath("owner.pageView.isDark") ? this.DARK_REPS : this.LIGHT_REPS)
    }.observes("init"),
    ariaHideMe: function() {
        if (!this.isAriaHidden)
            return;
        this.layer.setAttribute("aria-hidden", "true")
    }.observes("render")
})), Journal.define("TextLayoutDependentGridItemView", Journal.GridItemView.extend({
    classNames: "text-layout-dependent selectable".w(),
    rootHTML: '<div><div class="text"></div></div>',
    textDivElement: "layer.firstChild",
    textVerticalOffset: 0,
    alignment: "center",
    font: "helvetica",
    addAlignmentClass: function() {
        $(this.layer).addClass("align-" + this.alignment)
    }.observes("render"),
    addFontClass: function() {
        $(this.layer).addClass("font-" + this.font)
    }.observes("render"),
    writeText: function() {
        this.textDiv.innerHTML = Journal.prewrapify(Journal.pruneAllButSimpleFormatting(this.value)), this.trigger("cellSize")
    }.observes("render", "value"),
    positionTextVertically: function() {
        if (!this.isAppendedInWindow)
            return;
        var e = this.textDiv.offsetHeight, t = (this.layout.height - e) / 2 + this.textVerticalOffset * this
        .cellSize, n = this.theme.valueFor("textDiv.lineHeight", this);
        this.textDiv.style.top = t + "px", this.suspendTriggers(), this.setIfChanged("textTop", t), this.setIfChanged("textBottom", t + e), this.resumeTriggers()
    }.observes("cellSize", "isAppendedInWindow", ".entryView.remeasurementForFonts")
})), Journal.GridItems.define("QuoteView", Journal.TextLayoutDependentGridItemView.extend({
    className: "GridItems.QuoteView",
    classNames: "quote".w(),
    startQuoteView: Journal.DarknessAwareImageView.extend({
        isAriaHidden: YES,
        shouldHoldOffBinding: "from:.owner.shouldHoldOff",
        DARK_REPS: {
            18: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_dark_18.png"
            },
            36: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_dark_36.png"
            },
            72: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_dark_72.png"
            },
            144: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_dark_144.png"
            }
        },
        LIGHT_REPS: {
            18: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_light_18.png"
            },
            36: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_light_36.png"
            },
            72: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_light_72.png"
            },
            144: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_start_light_144.png"
            }
        },
        doLayout: function() {
            var e = this.owner.textTop, t = this.owner.cellSize, n = .15 * t, r = 8 / 9 * n;
            this.setLayout(.1 * t, e - .02 * t - r, n, r)
        }.observes(".owner.textTop")
    }),
    endQuoteView: Journal.DarknessAwareImageView.extend({
        isAriaHidden: YES,
        shouldHoldOffBinding
        : "from:.owner.shouldHoldOff",
        DARK_REPS: {
            18: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_dark_18.png"
            },
            36: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_dark_36.png"
            },
            72: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_dark_72.png"
            },
            144: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_dark_144.png"
            }
        },
        LIGHT_REPS: {
            18: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_light_18.png"
            },
            36: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_light_36.png"
            },
            72: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_light_72.png"
            },
            144: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/quote_end_light_144.png"
            }
        },
        doLayout: function() {
            var e = this.owner.textBottom, t = this.owner.cellSize, n = this.owner.width, r = .15 * t, i = 8 / 9 * r;
            this.setLayout((n - .1) * t - r, e, r, i)
        }.observes(".owner.textBottom")
    })
})), Journal.GridItems.define("FoodView", Journal.TextLayoutDependentGridItemView.extend({
    className: "GridItems.FoodView",
    classNames: "food".w(),
    textVerticalOffset: .235,
    iconView: Journal.DarknessAwareImageView.extend({
        ariaLabel: "_Accessibility.Food".loc(),
        ariaRole: "img",
        shouldHoldOffBinding: "from:.owner.shouldHoldOff",
        DARK_REPS: {
            41: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_dark_41.png"
            },
            82: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_dark_82.png"
            },
            164: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_dark_164.png"
            },
            328: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_dark_328.png"
            }
        },
        LIGHT_REPS: {
            41: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_light_41.png"
            },
            82: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_light_82.png"
            },
            164: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_light_164.png"
            },
            328: {
                url: "/applications/journal/16CProject51/en-us/source/resources/images/food_light_328.png"
            }
        },
        doLayout: function() {
            var e = this.owner.textTop, t = this.owner.cellSize, n = this.owner.width * t, r = .3 * t, i = r * 28 / 41;
            this.setLayout(n / 2 - i / 2, e - r - .135 * t, i, r)
        }.observes(".owner.textTop")
    })
})), require("views/play_button"), Journal.GridItems.define("VideoView", Journal.GridItems.PhotoView.extend({
    classNames: "video".w(),
    appendVideoEmblemIfNeeded: function() {
        if (!Journal.VideoDetection.abilities[this.getPath("value.format")])
            return;
        this.videoEmblemView.append()
    }.observes("render"),
    videoEmblemView: CoreImage.EasyDomImageView.extend({
        classNames: "video-emblem".w(),
        zIndex: 50,
        downerGroup: CoreImage.imageLoader.essentialGroup,
        initiallyAppended: NO,
        aspectRatio: 19 / 14,
        reps: {
            19: "/applications/journal/16CProject51/en-us/source/resources/images/video_emblem_19.png",
            38: "/applications/journal/16CProject51/en-us/source/resources/images/video_emblem_38.png"
        },
        doLayout: function() {
            if (!this.isAppendedInWindow)
                return;
            if (B.mobile) {
                var e = this.owner.cellSize, t = this.getPath("owner.owner.displayWidth") || e * 7;
                this.setLayout(e * .05, e * .05, 19 * t / Core.windowSize.width)
            } else 
                this.setLayout(8, 8, 19)
        }.observes("isAppendedInWindow", ".owner.cellSize")
    })
})), Journal
.GridItems.VideoChromelessView = Journal.GridItems.VideoView.extend(Journal.GridItems.VideoView.chromelessModification), Journal.GridItems.VideoBorderlessView = Journal.GridItems.VideoView.extend(Journal.GridItems.VideoView.borderlessModification), Journal.GridItems.define("WeatherView", Journal.ImageBasedGridItemView.extend({
    className: "GridItems.WeatherView",
    classNames: "weather".w(),
    maxImageWidth: 574,
    maxImageHeight: 284,
    imageInset: {
        left: .011,
        right: .011,
        top: .014,
        bottom: - 0.014
    },
    rootHTML: '<div><div class="temperature"></div></div>',
    temperatureTextElement: "layer.firstChild",
    condition: 0,
    temperature: NaN,
    temperatureType: null,
    fixConditionFirst: function() {
        this.condition = (this.condition || 0)%this.CONDITION_REPSETS.length
    }.observes("init", "condition"),
    updateToCondition: function() {
        this.set("reps", this.CONDITION_REPSETS[this.condition]), this.set("ariaLabel", this.CONDITION_STRINGS[this.condition])
    }.observes("init", "condition"),
    writeTemp: function() {
        if (isNaN(this.temperature) ||!this.condition)
            return;
        this.temperatureText.innerHTML = parseInt(this.temperature, 10) + "" + (this.TEMPTYPE_STRINGS[this.temperatureType] || "")
    }.observes("render", "temperature", "temperatureType"),
    TEMPTYPE_STRINGS: {
        fahrenheit: "°F",
        celcius: "°C",
        kelvin: "K"
    },
    CONDITION_STRINGS: function() {
        var e = "Unknown Clear Cloudy Flurries Fog Haze MostlyCloudy MostlySunny PartlyCloudy PartlySunny FreezingRain Rain Sleet Snow Sunny Thunderstorms Thunderstorm Overcast ScatteredClouds".w();
        for (var t = 0, n; n = e[t]; t++)
            e[t] = ("_Accessibility.Weather." + n).loc();
        return e
    }(),
    CONDITION_REPSETS: [{
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherUnknown_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherUnknown_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherClear_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherClear_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherCloudy_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherCloudy_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherFlurries_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherFlurries_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherFog_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherFog_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherHaze_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherHaze_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherMostlyCloudy_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherMostlyCloudy_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherMostlySunny_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherMostlySunny_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherPartlyCloudy_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherPartlyCloudy_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherPartlySunny_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherPartlySunny_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherFreezingRain_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherFreezingRain_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherRain_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherRain_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherSleet_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherSleet_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherSnow_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherSnow_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherSunny_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherSunny_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherThunderstorms_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherThunderstorms_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherThunderstorm_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherThunderstorm_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherOvercast_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherOvercast_287.png"
        }
    }, {
        574: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherScatteredClouds_574.png"
        },
        287: {
            url: "/applications/journal/16CProject51/en-us/source/resources/images/weather/weatherScatteredClouds_287.png"
        }
    }
    ]
})), Journal.InlineItems = Journal.ClassBank.create({
    suffix: "View",
    Default: Journal.define("InlineItemView", Core.View.extend(CoreImage.ThemeSupport, {
        classNames: "inline inline-item".w(),
        entry: undefined,
        entryView: undefined,
        displayWidthBinding: "from:.owner.displayWidthDeferrer",
        downerGroupBinding: "from:.owner.downerGroup",
        static_currentRunningTabIndex: 0,
        addClassForPrevAndNext: function() {
            var e = (this.getPath("prevOriginalItem.type") || "beginning").toString().toLowerCase();
            this.layer.className += " after-" + e;
            var t = (this.getPath("nextOriginalItem.type") || "end").toString().toLowerCase();
            this.layer.className += " before-" + t
        }.observes("render")
    }))
}), Journal.InlineItems.define("TextView", Journal.InlineItemView.extend({
    className: "InlineItems.TextView",
    rootHTML: '<div class="text"><div class="text selectable"></div></div>'
    ,
    containerElement: "layer.firstChild",
    value: "",
    alignment: "justify",
    font: "helvetica",
    addAlignmentClass: function() {
        $(this.layer).addClass("align-" + this.alignment)
    }.observes("render"),
    addFontClass: function() {
        $(this.layer).addClass("font-" + this.font)
    }.observes("render"),
    update: function() {
        if (!this.layer)
            return;
        this.container.innerHTML = Journal.prewrapify(Journal.pruneAllButSimpleFormatting(this.value))
    }.observes("value", "text", "render")
})), Journal.InlineItems.define("HeadingView", Journal.InlineItems.TextView.extend({
    className: "InlineItems.HeadingView",
    classNames: "heading".w(),
    alignment: "center",
    ariaRole: "heading",
    addAriaLevel: function() {
        this.layer.setAttribute("aria-level", "1")
    }.observes("render")
})), Journal.InlineItems.define("GridView", Journal.InlineItemView.extend(Core.WaitSupport, {
    className: "InlineItems.GridView",
    rootHTML: '<div class="grid"><div class="container full-height"></div></div>',
    containerElement: "layer.firstChild",
    numColumns: 7,
    children: null,
    generateNewItemViews: function() {
        var e = this.items, t = this.pageView;
        if (!e)
            return;
        this.computeLayout();
        var n = this.gridItemViews || (this.gridItemViews = []);
        n.length = 0, this.container.innerHTML && (this.container.innerHTML = "");
        var r = function() {
            this.owner.closeReq()
        }.observes("waitDidComplete");
        this.openReq();
        for (var i = 0, s = 0, o, u, a; u = e[s]; s++)
            this.openReq(), u.variant = t && t.themeInfo && t.themeInfo.itemViewVariant, o = Journal.GridItems.findAndCreate(u, {
                journal: this.journal,
                indexInGrid: s,
                downerImportance: - s - 1e3 * this.indexInEntry,
                entry: this.entry,
                entryView: this.entryView,
                owner: this,
                originalItem: u,
                notifyReady: r,
                pageView: t
            }), o && (i > (a = o.top + o.height) || (i =
            a), o.initiallyAppended && o.appendTo(this), n.push(o)), (!o ||!o.hasWaitSupport) && this.closeReq();
        this.closeReq(), this.setIfChanged("numRows", i)
    }.observes("items", "render"),
    computeLayout: function() {
        if (!this.layer)
            return;
        var e = this.displayWidth, t = this.numColumns, n = Math.floor(e / t), r = n * t, i = Math.round((e - r) / 2);
        this.suspendTriggers(), this.setIfChanged("usedWidth", r), this.setIfChanged("cellSize", n), this.setIfChanged("leftInset", i), this.resumeTriggers()
    }.observes("displayWidth"),
    positionContainer: function() {
        this.container.style.left = this.leftInset + "px"
    }.observes("leftInset"),
    sizeContainer: function() {
        this.container.style.width = this.usedWidth + "px"
    }.observes("usedWidth"),
    computeHeight: function() {
        if (!this.numRows)
            return;
        this.setIfChanged("height", Math.floor((this.numRows + .1) * this.cellSize))
    }.observes("numRows", "cellSize"),
    sizeLayer: function() {
        this.layer.style.height = this.height + "px"
    }.observes("height")
})), Journal.InlineItems.define("DividerView", Journal.InlineItemView.extend({
    hidden: YES,
    COTTON_REPS: {
        1024: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_cotton.png",
        2048: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_cotton@2x.png"
    },
    DARK_REPS: {
        1024: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_dark.png",
        2048: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_dark@2x.png"
    },
    DENIM_REPS: {
        1024: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_denim.png",
        2048: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_denim@2x.png"
    },
    LIGHT_REPS: {
        1024: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_light.png",
        2048: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_light@2x.png"
    },
    COTTON_IPHONE_REPS: {
        480: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_cotton-iphone.png",
        960: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_cotton-iphone@2x.png"
    },
    DARK_IPHONE_REPS: {
        480: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_dark-iphone.png",
        960: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_dark-iphone@2x.png"
    },
    DENIM_IPHONE_REPS: {
        480: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_denim-iphone.png",
        960: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_denim-iphone@2x.png"
    },
    LIGHT_IPHONE_REPS: {
        480: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_light-iphone.png",
        960: "/applications/journal/16CProject51/en-us/source/resources/images/divider/journal_divider_light-iphone@2x.png"
    },
    renderImage: function() {
        if (this.hidden)
            return;
        var e = (this.getPath("journal.theme") + "").toLowerCase(), t = this.isSmallPhone = B.mobile && Core.windowSize.windowWidth < 600;
        this.imageView = CoreImage.EasyDomImageView.create({
            owner: this,
            reps: (t ? {
                cotton: this.COTTON_IPHONE_REPS,
                border: this.COTTON_IPHONE_REPS,
                dark: this.DARK_IPHONE_REPS,
                mosaic: this.DARK_IPHONE_REPS,
                denim: this.DENIM_IPHONE_REPS,
                light
                : this.LIGHT_IPHONE_REPS
            } : {
                cotton: this.COTTON_REPS,
                border: this.COTTON_REPS,
                dark: this.DARK_REPS,
                mosaic: this.DARK_REPS,
                denim: this.DENIM_REPS,
                light: this.LIGHT_REPS
            })[e]
        }), this.imageView.appendTo(this)
    }.observes("render"),
    resizeImage: function() {
        if (!this.layer)
            return;
        if (!this.imageView) {
            this.layer.style.width = this.displayWidth + "px", this.layer.style.height = "0px", this.layer.style.display = "none";
            return 
        }
        var e = this.isSmallPhone ? Math.round(this.displayWidth * 50 / 480): Math.round(this.displayWidth * 50 / 1024), t = e / 3;
        this.imageView.setLayout(0, (t - e) / 2.4, this.displayWidth, e), this.layer.style.height = t + "px", this.layer.style.width = this.displayWidth + "px", this.layer.style.overflow = "visible"
    }.observes("render", "displayWidth")
})), require("views/apple_logo"), Journal.InlineItems.define("FooterView", Journal.InlineItemView.extend({
    className: "InlineItems.FooterView",
    classNames: "footer".w(),
    appleLogoView: Journal.AppleLogoView.extend({
        themeNameBinding: ".owner.pageView.themeName"
    }),
    privacyButtonView: Core.ButtonView.extend(CoreImage.ThemeSupport, {
        classNames: "footer-text-button left".w(),
        className: "privacyButtonView",
        displayWidthBinding: ".owner.displayWidth",
        title: "_Footer.PrivacyPolicy".loc(),
        actionDelay: 0,
        action: function() {
            window.open("_URL.PrivacyPolicy".loc())
        },
        render: function(e) {
            e.innerHTML = this.title, this.set("aria-label", this.title)
        }
    }),
    tosButtonView: Core.ButtonView.extend(CoreImage.ThemeSupport, {
        classNames: "footer-text-button right".w(),
        className: "tosButtonView",
        displayWidthBinding: ".owner.displayWidth",
        title: "_Footer.TermsOfService".loc(),
        actionDelay: 0,
        action: function() {
            window.open("_URL.TermsOfService".loc
            ())
        },
        render: function(e) {
            e.innerHTML = this.title, this.set("aria-label", this.title)
        }
    }),
    doLayout: function() {
        if (!this.layer ||!this.displayWidth)
            return;
        var e = this.displayWidth, t = 20;
        B.iPhone&&!B.android ? t = 20 * e / Core.windowSize.width : B.iPad && (t = 20 * e / Core.windowSize.width), this.appleLogoView.setLayout((e - t * this.appleLogoView.aspectRatio) / 2, 0, NaN, t), this.layer.style.height = t + "px", this.layer.style.marginTop = Math.round(.04 * e) + "px", this.layer.style.width = e + "px"
    }.observes("displayWidth", "render")
})), require("views/inline_items/_bank"), require("views/inline_items/text"), require("views/inline_items/grid"), require("views/inline_items/divider"), require("views/inline_items/footer"), Journal.define("JournalEntryView", Core.View.extend(Core.GPUFriendliness, CoreImage.ThemeSupport, Core.WaitSupport, {
    className: "JournalEntryView",
    classNames: "journal-entry".w(),
    journal: undefined,
    entry: undefined,
    layoutItems: undefined,
    displayWidthBinding: ".owner.displayWidth",
    selfHeightBinding: "to:.owner.currentEntryHeight",
    unzoomedSizeBinding: "hard:to:.owner.zoomContentSize",
    downerGroup: undefined,
    rootHTML: '<div><div class="container full-width"><div class="height-measurer"></div></div></div>',
    containerElement: "layer.firstChild",
    heightMeasurerElement: "container.firstChild",
    updateToLayoutItems: function() {
        var e = this.layoutItems;
        if (!e ||!this.layer)
            return;
        var t = this.inlineItemViews || (this.inlineItemViews = []), n = this.pageView;
        t.length = 0;
        var r = function() {
            this.owner.closeReq()
        }.observes("waitDidComplete");
        this.openReq(), this.setIfChanged("displayWidthDeferrer", this.displayWidth);
        for (var i = 0, s = e.items, o, u; u = s[i]; i++)
            this.openReq(),
            u.variant = n && n.themeInfo && n.themeInfo.itemViewVariant, o = Journal.InlineItems.findAndCreate(u, {
                indexInEntry: i,
                owner: this,
                entryView: this,
                pageView: n,
                entry: this.entry,
                journal: this.journal,
                originalItem: u,
                nextOriginalItem: s[i + 1],
                prevOriginalItem: s[i - 1],
                notifyReady: r
            }).appendTo(this.heightMeasurer), (!o ||!o.hasWaitSupport) && this.closeReq(), o && t.push(o);
        this.closeReq()
    }.observes("render"),
    measuredHeight: function() {
        return Math.ceil((this.heightMeasurer.offsetHeight || NaN) + this.displayWidth / 30 || this.layout.height)
    }.property(),
    updateLayoutNonZoom: function() {
        if (!this.owner.isShowing)
            return;
        if (this.owner.allowZoom)
            return;
        if (!this.isAppendedInWindow) {
            this.__lIAIW__ = NO;
            return 
        }
        var e = Core.windowSize, t = this.layout;
        this.layer.style.width = this.container.style.width = this.displayWidth + "px", this.setIfChanged("displayWidthDeferrer", this.displayWidth), t.height = this.get("measuredHeight"), t.width = this.displayWidth, t.left = Math.round(e.width / 2 - t.width / 2), t.top = this.getPath("owner.isTopBarCollapsed") ? 0 : 41, this.trigger("layout"), this.__lIAIW__ !== (this.__lIAIW__ = YES) && (this.selfHeight = NaN), this.setIfChanged("selfHeight", t.height)
    }.observes("displayWidth", "isAppendedInWindow", ".owner.isShowing", ".owner.isTopBarCollapsed"),
    updateToDisplayNone: function() {
        if (!this.layer)
            return;
        this.layer.style.visibility = this.isHidden ? "hidden" : ""
    }.observes("isHidden", "render"),
    updateToOnscreen: function() {
        if (!this.layer)
            return;
        this.layer.style.marginLeft = this.layer.style.marginTop = this.isOnscreen ? "0px" : "-10000px"
    }.observes("isOnscreen", "render"),
    updateLayoutForFullResInstance: function() {
        if (!this.owner.allowZoom || this.isGPUFriendly ||!
        this.isAppendedInWindow || this.isHidden)
            return;
        var e = this.owner.zoomState, t = this.owner.zoomContainerSize, n = e.zoom * this.displayWidth;
        this.setIfChanged("displayWidthDeferrer", n);
        var r = this.layout;
        r.scale = 1, r.translateX = r.translateY = 0, r.height = this.get("measuredHeight"), r.width = n, r.left = Math.round(t.width / 2 - n / 2) + e.x + (t.left || 0), r.top = Math.round(t.height / 2 - r.height / 2) + e.y + (t.top || 0), e.zoom === 1 && (Core.cloneHash(r, this.unzoomedSize || (this.unzoomedSize = {})), this.trigger("unzoomedSize")), this.trigger("layout")
    }.observes(".owner.zoomContainerSize", ".owner.zoomState", "isAppendedInWindow", "isHidden"),
    updateLayoutForZoomInstance: function() {
        if (!this.owner.allowZoom ||!this.isGPUFriendly ||!this.isAppendedInWindow)
            return;
        var e = this.owner.zoomState, t = this.owner.zoomContainerSize, n = this.displayWidth, r = this.setIfChanged("displayWidthDeferrer", n), i = this.layout;
        i.scale = e.zoom, i.translateX = e.x, i.translateY = e.y, i.translateY += (e.zoom - 1) * 23 * Core.windowSize.width / 768, i.height = r ? this.get("measuredHeight") : i.height || this.get("measuredHeight"), i.width = n, i.left = Math.round(t.width / 2 - n / 2) + (t.left || 0), i.top = Math.round(t.height / 2 - i.height / 2) + (t.top || 0), this.trigger("layout")
    }.observes(".owner.zoomContainerSize", ".owner.zoomState", "isAppendedInWindow", "isOnscreen"),
    remeasurePeriodicallyAfterFirstAppend: function() {
        if (B.mac || B.onlyiOS)
            return;
        if (!this.isAppendedInWindow)
            return;
        if (this._hasRemeasuredOnce === (this._hasRemeasuredOnce = YES))
            return;
        var e = function() {
            t.trigger("remeasurementForFonts")
        }, t = this, n = 2 / 3 * 100;
        setTimeout(e, 3 * n | 0), setTimeout(e, 8 * n | 0), setTimeout(e, 21 * n | 0), setTimeout(e, 55 * n | 0), setTimeout(e, 141 * n | 0)
    }.observes("isAppendedInWindow")
})), require("views/three_piece_button"), Journal.define("LandingPageView", Core.View.extend({
    typeInteger: Journal.LANDING,
    classNames: "landing-page full-width full-height".w(),
    initiallyAppended: NO,
    rootHTML: '<div><div class="centerer"><div class="iphoto-journals">' + "_Landing.IPhotoJournals".loc() + "</div>" + '<div class="tell-a-story">' + "_Landing.TellAStory".loc() + "</div>" + "</div>" + '<div class="clipper"></div>' + "</div>",
    containerElement: "layer.firstChild",
    clipperElement: "container.nextSibling",
    titleDivElement: "layer.firstChild.firstChild",
    blurbDivElement: "titleDiv.nextSibling",
    iDevicesImageView: CoreImage.EasyDomImageView.extend({
        reps: {
            630: "/applications/journal/16CProject51/en-us/source/resources/images/landing_devices.png",
            1260: "/applications/journal/16CProject51/en-us/source/resources/images/landing_devices@2x.png"
        },
        sizePreferenceBias: CoreImage.AbstractImageView.prototype.sizePreferenceBias / (B.iPhone ? 2 : 1),
        shouldHoldOffBinding: "from:.owner.isAppendedInWindow",
        shouldHoldOffIncomingTransform: Core.NOT,
        width: 630,
        height: 480,
        top: 187,
        left: 17,
        zIndex: 2,
        doLayout: B.iPhone ? function() {
            window.Core.windowOrientation%180 ? this.setLayout(17) : this.setLayout(69)
        }.observes("Core.windowSize"): undefined
    }),
    backgroundView: CoreImage.EasyDomImageView.extend({
        appendInto: "clipper",
        classNames: "landing-bg".w(),
        reps: {
            1230: "/applications/journal/16CProject51/en-us/source/resources/images/landing_background.jpg"
        },
        shouldHoldOffBinding: "from:.owner.isAppendedInWindow",
        shouldHoldOffIncomingTransform: Core.NOT,
        width: 1230,
        height: 991,
        zIndex: 1
    }),
    learnMoreButtonView: Journal.ThreePieceButtonView
    .extend({
        classNames: "learn-more".w(),
        title: "_Landing.LearnMore".loc(),
        action: function() {
            location = "_URL.Marketing".loc()
        },
        autoResize: YES,
        computedWidthBinding: "to:.owner.buttonLayoutDidChange",
        minAutoWidth: 250
    }),
    getIPhotoButtonView: Journal.ThreePieceButtonView.extend({
        classNames: "get-iphoto".w(),
        title: "_Landing.GetIPhoto".loc(),
        action: function() {
            location = "_URL.GetIPhoto".loc()
        },
        autoResize: YES,
        computedWidthBinding: "to:.owner.buttonLayoutDidChange",
        minAutoWidth: 250
    }),
    doButtonLayout: function() {
        var e = this.learnMoreButtonView.computedWidth, t = this.getIPhotoButtonView.computedWidth;
        if (!e ||!t)
            return;
        var n = e + t + 20 <= 750;
        if (!n || Math.abs(e - t) <= 150)
            e = t = Math.max(e, t);
        var r = e + t + 20;
        n = r <= 750;
        var i = this.getIPhotoButtonView.layer, s = this.learnMoreButtonView.layer, o = e + t + 20;
        n ? (s.style.marginRight = Math.round(o / 2 - e) + "px", i.style.marginLeft = Math.round(o / 2 - t) + "px", i.style.marginTop = "0px") : (s.style.marginRight = e/-2 + "px", i.style.marginLeft = t/-2 + "px", i.style.marginTop = "69px"), s.style.width = e + "px", i.style.width = t + "px"
    }.observes("buttonLayoutDidChange"),
    doTitleLayouts: function() {
        if (!this.isAppendedInWindow)
            return;
        var e = this.titleDiv.offsetHeight, t = Math.round(41.5 - e / 2);
        this.titleDiv.style.top = t + "px", this.blurbDiv.style.top = 89 - t + "px"
    }.observes("isAppendedInWindow")
})), function() {
    var e = NO, t=!NO, n = "";
    Journal.MontageContainerView = Core.View.extend({
        montage: null,
        shouldBeReady: NO,
        isReady: NO,
        fileInfoByPath: function() {
            this.fileInfoByPath = {}
        }.observes("init"),
        init: function() {
            var r;
            return e ? (r = location.protocol + "//" + location.host + n + "/", t && (r += "tmp/build/")) : r = location.protocol + "//" + location.host + "/applications/journal/" +
            Core.getPathFrom(window, "BUILD_INFO.buildNumber") + "/mwrenderer/", this._mwURLBase = r, MW.gBasePath = r, MW.gRendererPath = r + "Renderer/", MW.parentView = this, arguments.callee.base.apply(this, arguments)
        },
        passBackButtonVisibilityBeforeMWLoads: function() {
            MW.isLoaded ? Journal.workspaceController.allowProjectBackButton ? MW.showBackButton() : MW.hideBackButton() : MW.backButtonVisible = Journal.workspaceController.allowProjectBackButton
        }.observes("Journal.workspaceController.allowProjectBackButton"),
        render: function() {
            this.layer.id = "globalContainer"
        },
        preloadMontageCode: function() {
            var e = document.createElement("script");
            e.setAttribute("type", "text/javascript"), e.setAttribute("src", this._mwURLBase + "mwrenderer-packed.js"), e.onload = function() {
                Core.debug("Loaded mwrenderer from " + this.src)
            }, document.body.appendChild(e)
        }.observes("shouldBeReady"),
        montageCodeDidLoad: function() {
            MW.isLoaded = YES, this.set("isReady", YES)
        },
        updateToMontage: function() {
            if (!this.montage ||!this.isReady)
                return;
            this.doLayout("regardless"), MW.showProject(this.montage)
        }.observes("montage", "isReady"),
        doLayout: function(e) {
            if (Journal.workspaceController.nowShowing !== Journal.MONTAGE && e !== "regardless")
                return;
            this.set("size", Core.windowSize)
        }.observes("Core.windowSize", "montage", ".owner.willEnterTransition"),
        handleFullScreenForMWCode: function() {
            if (!MW.isLoaded)
                return;
            MW.onFullscreenChange(CoreImage.isFullScreen)
        }.observes("CoreImage.isFullScreen"),
        getUrlsForPath: function(e, t, n) {
            var r = this.fileInfoByPath[e];
            return r || (r = this.fileInfoByPath[e] = Journal.URLResolver.createFileInfoObj(e)), r.requestSingleUrlSet(t, n) || null
        },
        registerSuccessfulURLForPath
        : function(e, t) {
            var n = this.fileInfoByPath[t];
            n && n.registerSuccessfulURL(e)
        },
        backButtonAction: function() {
            return Journal.TopBarBackToProjectsButtonView.prototype.action.apply(this, arguments)
        }
    }), window.MW = {
        isLoaded: NO
    }
}(), require("views/montage_container"), Journal.MontagePageView = Core.View.extend({
    montage: null,
    typeInteger: Journal.MONTAGE,
    classNames: "montage-page full-width full-height dark-theme".w(),
    isReady: NO,
    isReadyBinding: "to:Journal.montageController.isPageReady",
    shouldBeReady: NO,
    shouldBeReadyBinding: "hard:from:Journal.montageController.shouldPageBeReady",
    initiallyAppended: NO,
    containerView: Journal.MontageContainerView.extend({
        montageBinding: "from:.owner.montage",
        shouldBeReadyBinding: "from:.owner.shouldBeReady",
        isReadyBinding: "to:.owner.isReady"
    }),
    shouldPersistAfterTransitionTo: function() {
        var e = {
            _default: YES
        };
        return e[Journal.BOOKSHELF] = YES, e
    }(),
    getReadyWhenSignalledFromController: function() {
        if (!this.shouldBeReady)
            return;
        this.append(), this.hideSelfOnceVisuallyGone(this)
    }.observes("shouldBeReady"),
    hideSelfOnceVisuallyGone: function(e, t, n) {
        if (e !== this)
            return;
        if (!this.layer)
            return;
        this.layer.style.visibility = "hidden", this.layer.style.left = this.layer.style.top = "-10000px", this.layer.style.zIndex =- 100, this.layer.style.webkitTransform = "", this.layer.style.position = "absolute", this.layer.style.pointerEvents = "none", $(this.layer).addClass("force-no-accelerated-layers")
    }.observes("didFinishTransition"),
    restoreSelfWhenNeeded: function(e, t, n) {
        if (t !== this)
            return;
        if (!this.layer)
            return;
        this.layer.style.visibility = "", this.layer.style.left = this.layer.style.top = "", this.layer.style.position = "fixed"
        , this.layer.style.pointerEvents = "", $(this.layer).removeClass("force-no-accelerated-layers")
    }.observes("willEnterTransition"),
    tellMWAboutExit: function(e, t, n) {
        if (e !== this)
            return;
        MW.willExitSlideshowPlayer && MW.willExitSlideshowPlayer()
    }.observes("willEnterTransition"),
    tellMWAboutEnter: function(e, t, n) {
        if (t !== this)
            return;
        MW.didEnterSlideshowPlayer && MW.didEnterSlideshowPlayer()
    }.observes("didFinishTransition"),
    fightWindowSizeCodeToTheDeath: function() {
        if (Journal.workspaceController.nowShowing !== Journal.MONTAGE)
            return;
        document.body.scrollLeft = 0, Core.scrollTop(0), document.body.style.overflowX = document.body.style.overflowY = document.body.style.overflow = "hidden"
    }.observes("Core.windowSize", "Journal.workspaceController.nowShowing"),
    reenableScrollingWhenGoAway: function(e) {
        if (this !== e)
            return;
        document.body.style.overflowX = document.body.style.overflowY = document.body.style.overflow = ""
    }.observes("didFinishTransition"),
    pauseSlideshowOnceExited: function(e, t, n) {
        MW.isLoaded && MW.pause()
    }.observes("didFinishTransition")
}), require("views/basic_dialog"), Journal.define("QuickTimeErrorView", Journal.BasicDialogView.extend({
    title: "_Error.MissingQuicktime".loc(),
    widthPadding: B.rightToLeft ? 70: 75,
    leftPadding: B.rightToLeft ? 25: 0,
    dlButtonView: Core.ButtonView.extend({
        rootHTML: '<div><div class="crazy-extender eye-transparent-mouse-opaque"></div><div>',
        crazyExtenderElement: "layer.firstChild",
        action: function() {
            window.location.href = "_URL.DownloadQuicktime".loc()
        },
        getLinkAndSizeExtender: function() {
            if (!this.isAppended)
                return;
            this.link = this.getPath(B.leftToRight ? "layer.previousSibling.lastChild" : "layer.previousSibling.firstChild"
            );
            if (!this.link)
                return;
            (this.link.tagName || "").toLowerCase() !== "a" && (this.link = null);
            if (!this.link)
                return;
            this.crazyExtender.style[B.leftToRight ? "left": "right"] =- this.link.offsetWidth - 12 + "px"
        }.observes("isAppendedInWindow"),
        brightenLinkText: function() {
            if (!this.link)
                return;
            this.isOver ? $(this.link).addClass("hover") : $(this.link).removeClass("hover")
        }.observes("isOver"),
        brightenLinkTextMore: function() {
            if (!this.link)
                return;
            this.isActive ? $(this.link).addClass("active") : $(this.link).removeClass("active")
        }.observes("isActive")
    })
})), Journal.define("HudButtonView", Core.ButtonView.extend({
    outerHeight: 74,
    rightMargin: 0,
    innerShift: 0,
    rootHTML: '<div><div class="icon"></div></div>',
    iconElement: "layer.firstChild",
    renderEverythingButLeftness: function() {
        var e = this.icon.style, t = this.layer.style;
        e.width = this.width + "px", e.height = this.height + "px", e.left = (this.outerWidth / 2 - this.width / 2 + this.innerShift | 0) + "px", e.top = (this.outerHeight / 2 - this.height / 2 | 0) + "px", t.width = this.outerWidth + "px", t.height = this.outerHeight + "px"
    }.observes("render")
})), Journal.define("SlideshowHudView", Core.View.extend(Core.FadeShowHide, {
    classNames: "hud".w(),
    isMouseOverMe: NO,
    mouseEntered: function() {
        this.set("isMouseOverMe", YES)
    },
    mouseExited: function() {
        this.set("isMouseOverMe", NO)
    },
    showHUDDownloadView: NO,
    establishWhetherToShowHUDDownloadView: function() {
        this.setIfChanged("showHUDDownloadView", (!!Journal.URLResolver.isUbiquityMode||!!Journal.standaloneOptions.Enable_Download_Button)&&!B.mobile)
    }.observes("init", "Journal.standaloneOptions.Enable_Download_Button"),
    chooseClassName: function() {
        if (!this.layer)
            return;
        $(this.layer).setClass
        ("extra-left", !!this.showHUDDownloadView), $(this.layer).setClass("extra-right", !!CoreImage.fullScreenSupported())
    }.observes("render", "showHUDDownloadView"),
    touchStart: function(e) {
        this.owner && clearTimeout(this.owner._touchHideHudTimeout), e._doNotHideHud = YES
    },
    doLayout: function() {
        if (!this.layer)
            return;
        for (var e = 0, t, n = this.initialChildViews, r = 0, i, s; i = this[n[e]]; e++) {
            i.isDownload && i.setIfChanged("isAppended", this.showHUDDownloadView);
            if (!i.isAppended)
                continue;
            i.layer.style.left = r + "px", r += i.outerWidth + i.rightMargin, t = i.rightMargin
        }
        r -= t, this.layer.style.width = r + "px", this.layer.style.left = Math.round((Core.windowSize.width - r) / 2) + "px"
    }.observes("render", "Core.windowSize", "showHUDDownloadView"),
    downloadView: Journal.HudButtonView.extend({
        classNames: "download".w(),
        isDownload: YES,
        width: 28,
        height: 28,
        outerWidth: 80,
        rightMargin: 1,
        currentItemBinding: "from:Journal.slideshowController.currentItem",
        currentJournalBinding: "from:Journal.journalController.journal",
        initiallyAppendedBinding: "from:.owner.showHUDDownloadView",
        isEnabledBinding: "from:value",
        establishPhoto: function() {
            var e = this.getPath("currentItem._slideshowItemView.value");
            this.currentJournal && this.currentJournal.allowVideoDownloads ? this.setIfChanged("value", e && (e.photoReps || e.videoReps) ? e : null) : this.setIfChanged("value", e&&!e.videoReps && e.photoReps ? e : null)
        }.observes("currentItem"),
        action: function() {
            if (!this.value)
                return;
            this.value.videoReps ? Journal.fileDownloader.downloadVideo(this.value) : Journal.fileDownloader.downloadPhoto(this.value)
        }
    }),
    prevView: Journal.HudButtonView.extend({
        classNames: "prev".w(),
        isEnabledBinding: ".owner.shouldEnableControls"
        ,
        width: 17,
        height: 28,
        outerWidth: 73,
        innerShift: 6,
        action: function() {
            Journal.slideshowController.selectPrevious()
        }
    }),
    playView: Journal.HudButtonView.extend({
        width: 25,
        height: 28,
        outerWidth: 73,
        isPauseBinding: "from:Journal.slideshowController.isPlaying",
        isEnabledBinding: ".owner.shouldEnableControls",
        watchState: function() {
            var e = this.isPause;
            $(this.layer).addClass(e ? "pause" : "play"), $(this.layer).removeClass(e ? "play" : "pause")
        }.observes("isPause", "render"),
        action: function() {
            Journal.slideshowController.toggleShow()
        }
    }),
    nextView: Journal.HudButtonView.extend({
        classNames: "next".w(),
        isEnabledBinding: ".owner.shouldEnableControls",
        width: 17,
        height: 28,
        outerWidth: 73,
        rightMargin: 1,
        innerShift: - 6,
        action: function() {
            Journal.slideshowController.selectNext()
        }
    }),
    fullscreenView: Journal.HudButtonView.extend({
        width: 28,
        height: 28,
        outerWidth: 80,
        actionDelay: 0,
        isFullScreenBinding: "from:window.CoreImage.isFullScreen",
        initiallyAppended: function() {
            this.initiallyAppended = CoreImage.fullScreenSupported()
        }.observes("init"),
        action: function() {
            CoreImage.isFullScreen ? CoreImage.cancelFullScreen() : CoreImage.requestFullScreen()
        },
        watchState: function() {
            var e = this.isFullScreen;
            $(this.layer).addClass(e ? "collapse" : "full"), $(this.layer).removeClass(e ? "full" : "collapse")
        }.observes("isFullScreen", "render")
    }),
    hackFixWebkitImageBuffers: B.safari >= 535&&!B.mobile ? function(e, t) {
        if (!this.isAppendedInWindow)
            return;
        e || (e = this.layer);
        for (var n = 0, r, i; r = e.childNodes && e.childNodes[n]; n++)
            t ? (i = r.__HFWBG__ || (r.__HFWBG__ = Core.getStyle(r, "background-image")), r.style.backgroundImage = "none ! important") : r.__HFWBG__ && (r.style.backgroundImage = r.__HFWBG__), this
            .hackFixWebkitImageBuffers(r, t)
    }
    : function() {},
    showHideAnimationExample: Anim.Fader.extend({
        recordIt: function() {
            this.to === 1 && this.owner.hackFixWebkitImageBuffers(undefined, YES)
        }.observes("frame1"),
        restoreIt: function() {
            this.to === 1 && this.owner.hackFixWebkitImageBuffers(undefined, NO)
        }.observes("frame2")
    })
})), Journal.SlideshowItems = Journal.ClassBank.create({
    suffix: "View"
}), Journal.define("SlideshowItemView", Core.View.extend(CoreImage.SlideshowItemMixin, {
    typeInteger: Journal.SLIDESHOW_ITEM = 2,
    classNames: "slideshow-item".w(),
    entry: undefined,
    downerGroupBinding: "from:.owner.downerGroup",
    touchStart: function() {
        this.owner && this.owner.reshowHud && this.owner.reshowHud()
    }
})), Journal.SlideshowItems.Default = Journal.define("SlideshowGridItemWrapperView", Journal.SlideshowItemView.extend(CoreImage.ThemeSupport, {
    className: "SlideshowGridItemWrapperView",
    initializeAndAppendGridItem: function() {
        var e = Journal.GridItems.findAndCreate(this.originalItem, {
            isPurelyDecorative: NO,
            originalItem: this.originalItem,
            owner: this,
            top: 0,
            left: 0,
            entry: this.entry,
            journal: this.journal,
            pageView: this.pageView,
            action: function() {},
            imageInset: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        });
        if (!e)
            return;
        this.setIfChanged("gridItemView", e.appendTo(this))
    }.observes("render"),
    computeSize: function() {
        if (!this.layer ||!this.gridItemView)
            return;
        var e = this.availableSize, t = e.width, n = e.height, r = t / n, i = this.gridItemView, s = i.width, o = i.height, u = s / o, a = u > r, f = a ? t: n * u, l = a ? t / u: n, c = i.maxSlideshowSize;
        c < f && (f = c, l = f / u), c < l && (l = c, f*=u), this.size.width = f, this.size.height = l, this.setIfChanged("cellSize", f / s), this.trigger("size")
    }.observes("render", "availableSize")
})), Journal
.SlideshowItems.define("TextView", Journal.SlideshowItemView.extend({
    classNames: "text".w(),
    rootHTML: '<div><table cellspacing=0 cellpadding=0 border=0 width=100% height=100%><tbody><tr><td valign=center align=center><span class="selectable"></span></td></tbody></div>',
    containerElement: "layer.firstChild.firstChild.firstChild.firstChild",
    spanElement: "container.firstChild",
    sizeFactor: .035,
    value: "",
    align: "center",
    color: "#cccccc",
    update: function() {
        this.span.innerHTML = this.value, this.span.style.color = this.color, this.container.setAttribute("align", this.align)
    }.observes("value", "align", "render", "color"),
    doLayout: function() {
        var e = this.availableSize;
        this.set("size", {
            width: e.width * .9,
            height: e.height * .9
        }), this.span.style.fontSize = Math.round(this.sizeFactor * (e.width + e.height) / 2) + "px"
    }.observes("availableSize")
})), Journal.SlideshowItems.define("HeadingView", Journal.SlideshowItems.TextView.extend({
    classNames: "heading".w(),
    sizeFactor: .1
})), Journal.SlideshowItems.define("PhotoView", Journal.SlideshowItemView.extend(CoreImage.MissingImageSupport, Core.PinchZoomability, CoreImage.SlideshowPhotoMixin, {
    className: "SlideshowItems.PhotoView",
    typeInteger: Journal.SLIDESHOW_PHOTO = 2,
    classNames: "photo".w(),
    imageView: CoreImage.SlideshowPhotoMixin.imageView.extend(Journal.UrlResolutionForImages, {
        establishReps: function() {
            this.set("reps", this.owner.getPath("value.photoReps"))
        }.observes(".owner.value", "init"),
        isLoadingBinding: "to:.owner.isLoading",
        downerImportanceBinding: ".owner.downerImportance"
    }),
    establishTitle: function() {
        this.setIfChanged("title", this.getPath("value.caption"))
    }.observes("init", "value")
})), require
("views/slideshow_items/photo"), require("views/qt_error"), function() {
    var e = "_Error.FailureTryingToPlayVideo".loc(), t = "_Error.VideoStillBeingPublished".loc();
    B.iPhone && (e = e.split(". ")[0] + ".", t = t.split(". ")[0] + ".");
    var n = B.onlyiOS && NO;
    Journal.SlideshowItems.define("VideoView", Journal.SlideshowItems.PhotoView.extend({
        classNames: ["video", n ? " alt-ios-imp": "ios-normal-imp"],
        shouldAttemptToFillScreen: NO,
        shouldAvoidUpscaling: NO,
        allowsHudToHide: !B.mobile,
        canAllowZoom: NO,
        playButtonView: Core.ButtonView.extend({
            initiallyAppended: NO,
            actionDelay: 0,
            classNames: "play-button".w(),
            action: function() {
                this.owner.playVideo()
            },
            disableWhenFetchingURLs: function() {
                if (!B.onlyiOS)
                    return;
                this.setIfChanged("isEnabled", !!this.owner.knownAdvanceURLsForVideo)
            }.observes("render", ".owner.knownAdvanceURLsForVideo")
        }),
        qtErrorView: Journal.QuickTimeErrorView.extend({
            initiallyAppended: NO
        }),
        canNotPlayVideoView: Journal.BasicDialogView.extend({
            initiallyAppended: NO,
            title: "_Error.CanNotPlayVideo".loc(),
            widthPadding: 41
        }),
        failedToPlayVideoView: Journal.BasicDialogView.extend({
            initiallyAppended: NO,
            title: e,
            widthPadding: 41
        }),
        videoBeingPublishedView: Journal.BasicDialogView.extend({
            initiallyAppended: NO,
            title: t,
            widthPadding: 41
        }),
        isShowingVideo: NO,
        discoverFormat: function() {
            this.setIfChanged("format", this.getPath("value.format"))
        }.observes("init", "value"),
        playVideo: function() {
            if (!this.isAppendedInWindow)
                return;
            if (!Journal.VideoDetection.abilities[this.format])
                return;
            this.setIfChanged("isShowingVideo", YES), this.videoPlayerView.play();
            var e = this.getPath("owner.controller");
            this._wasSlideshowPlaying = e && e.isPlaying, e && e.stopShow()
        },
        stopSlideshowOnVideoPlayForIOS: function() {
            if (!B.onlyiOS)
                return;
            var e = this.getPath("owner.controller");
            this._wasSlideshowPlaying = e && e.isPlaying, e.stopShow()
        }.observes("ios_videoDidBeginPlaying"),
        resetState: function() {
            this.failedToPlayVideoView.remove(), this.videoBeingPublishedView.remove(), this.canNotPlayVideoView.remove(), this.qtErrorView.remove(), this.set("isShowingVideo", NO)
        },
        pauseVideoOnSlideshowStart: function() {
            if (!this.getPath("owner.controller.isPlaying"))
                return;
            if (!this.videoPlayerView)
                return;
            this.videoPlayerView.pause() && this.set("isShowingVideo", NO)
        }.observes(".owner.controller.isPlaying"),
        startVideoOnEntranceDuringSlideshow: B.onlyiOS ? null: function() {
            if (!Journal.VideoDetection.abilities[this.format])
                return;
            if (!this.getPath("owner.controller.isPlaying"))
                return;
            if (this.getPath("owner.currentView") !== this)
                return;
            var e = this;
            setTimeout(function() {
                if (e.getPath("owner.currentView") !== e)
                    return;
                e.playVideo()
            }, 200)
        }.observes("didFinishTransition"),
        resetOnEnterForQTBrowsers: function(e, t, n) {
            if (!this.isAppendedInWindow || e !== this && e !== this.owner ||!this.getPath("videoPlayerView.video.isQT"))
                return;
            this.resetState()
        }.observes("willEnterTransition", ".owner.willEnterTransition"),
        showVideo: function() {
            if (n)
                return;
            if (!this.isShowingVideo)
                return;
            this.videoPlayerView || (this.videoPlayerView = Journal.VideoPlayerView.create(this.originalItem, {
                owner: this,
                originalItem: this.originalItem,
                entry: this.entry,
                playbackDidEndBinding: "hard:.owner.playbackDidEnd",
                playbackDidErrBinding: "hard:.owner.playbackDidErr",
                videoNotFoundBinding: "hard:.owner.videoNotFound"
            })), (this.videoPlayerView.implementation !== "html5" ||
            B.snowLeopard) && this.imageView.remove(), this.playButtonView.remove(), this.videoPlayerView.appendTo(this)
        }.observes("isShowingVideo"),
        hideVideo: function() {
            if (n)
                return;
            if (this.isShowingVideo)
                return;
            Anim.tellStop(this._videoFader), this.videoPlayerView && (this.videoPlayerView.pause(), this.videoPlayerView.remove(), this.videoPlayerView = null), this.imageView.append(), this.playButtonView.append()
        }.observes("isShowingVideo"),
        appendErrorDialogIfNeeded: function() {
            if (Journal.VideoDetection.abilities[this.format])
                return;
            Journal.VideoDetection.canHazQT ? this.qtErrorView.appendTo(this) : this.canNotPlayVideoView.appendTo(this)
        }.observes("render"),
        appendPlayButtonIfNeeded: function() {
            if (n)
                return;
            Journal.VideoDetection.abilities[this.format] && this.playButtonView.appendTo(this)
        }.observes("render"),
        _iOSVideoHack: function() {
            if (!n ||!this.isAppendedInWindow)
                return;
            this.imageView.remove(), this.playButtonView.append(), this.failedToPlayVideoView.remove(), this.videoBeingPublishedView.remove(), this.canNotPlayVideoView.remove(), this.qtErrorView.remove(), this.videoPlayerView && this.videoPlayerView.remove(), this.videoPlayerView = Journal.VideoPlayerView.create(this.originalItem, {
                owner: this,
                originalItem: this.originalItem,
                entry: this.entry,
                playbackDidEndBinding: "hard:.owner.playbackDidEnd",
                playbackDidErrBinding: "hard:.owner.playbackDidErr",
                videoNotFoundBinding: "hard:.owner.videoNotFound"
            }), this.imageView.append(), this.videoPlayerView.appendTo(this)
        }.observes("isAppendedInWindow"),
        _advanceRequestURLsForiOS: function() {
            if (!this.isAppendedInWindow)
                return;
            var e = Journal.VideoPlayerView.create(this.originalItem, {
                owner: this
                ,
                isInUrlProbeMode: YES,
                originalItem: this.originalItem,
                entry: this.entry,
                foundUrlsBinding: "to:.owner.knownAdvanceURLsForVideo"
            })
        }.observes("isAppendedInWindow"),
        notifiediOSVideoDidBeginPlaying: function() {
            this.playButtonView.remove()
        }.observes("ios_videoDidBeginPlaying"),
        resetStateOnPlaybackEnd: function() {
            this.resetState()
        }.observes("playbackDidEnd"),
        resetStateOnPlaybackError: function() {
            n || this.resetState(), this.playButtonView.remove(), this.failedToPlayVideoView.appendTo(this)
        }.observes("playbackDidErr"),
        resetStateOnVideoNotFound: function() {
            n || this.resetState(), this.playButtonView.remove(), this.videoBeingPublishedView.appendTo(this)
        }.observes("videoNotFound"),
        possiblyContinueSlideshowOnEndAndError: function() {
            if (B.onlyiOS && B.iPhone)
                return;
            var e = this.getPath("owner.controller");
            this._wasSlideshowPlaying && e && e.startShow(), this._wasSlideshowPlaying = NO
        }.observes("playbackDidEnd", "playbackDidErr", "videoNotFound"),
        possiblyContinueSlideshowOnExit: function(e, t) {
            if (B.iPhone && B.onlyiOS)
                return;
            if (e !== this)
                return;
            var n = this.getPath("owner.controller");
            this._wasSlideshowPlaying && n && n.startShow(), this._wasSlideshowPlaying = NO
        }.observes("willEnterTransition"),
        doLayout: function() {
            if (!this.value ||!this.layer)
                return;
            var e = this.value;
            if (!e.width ||!e.height)
                e.width = e.height = 1;
            var t = this.availableSize, n = B.iPad ? .04: B.mobile ? .01: .07, r = t.height * (1 - n) - (this.getPath("owner.hudHeight") || 74) - 57, i = this.size || (this.size = {}), s = this.zoomContentSize || (this.zoomContentSize = {});
            Core.cloneHash(Core.innerSizeInOuter(e.width, e.height, t.width, r), i), Core.cloneHash(i, s), this.zoomContainerSize = this.size, this.zoomState || this
            .resetState(YES), i.offsetTop =- (t.height - i.height) / 2 + 41 + 10 + (r - i.height) / 2, this.trigger("size"), this.trigger("imageLayout")
        }.observes("availableSize", "value"),
        _notifiedRequestingFullScreenMode: function() {
            if (!B.safari||!!B.chrome ||!this.isAppendedInWindow)
                return;
            this._didRequestFullScreenMode=!0
        }.observes("CoreImage.requestingFullScreenMode"),
        _notifiedEnteredFullScreenMode: function() {
            if (!B.safari||!!B.chrome ||!this.isAppendedInWindow)
                return;
            this._didRequestFullScreenMode || $(document.body).addClass("safari").addClass("accidental-fullscreen")
        }.observes("CoreImage.enteredFullScreenMode"),
        _notifiedExitedFullScreenMode: function() {
            if (!B.safari||!!B.chrome ||!this.isAppendedInWindow)
                return;
            $(document.body).removeClass("safari").removeClass("accidental-fullscreen"), this._didRequestFullScreenMode=!1
        }.observes("CoreImage.exitedFullScreenMode")
    }))
}(), Journal.SlideshowTopBarView = Journal.TopBarView.extend(Core.FadeShowHide, {
    shouldShowBinding: "from:.owner.isHudShowing",
    journalBinding: "from:.owner.journal",
    transitionDirectionBinding: "from:.owner.transitionDirection",
    dateTextPadding: 10,
    showBackShadow: NO,
    isMouseOverMe: NO,
    mouseEntered: function() {
        this.set("isMouseOverMe", YES)
    },
    mouseExited: function() {
        this.set("isMouseOverMe", NO)
    },
    backButtonView: Journal.TopBarBackButtonView.extend({
        classNames: "back-button left back right".w(),
        leftBinding: "to:.owner._backButtonViewLeft",
        widthBinding: "to:.owner._backButtonViewWidth",
        actionDelay: 0,
        updateToJournal: function() {
            var e = this.getPath("owner.journal.title");
            this.setIfChanged("ariaLabel", e), e = Journal.initialStateController.loadEnvironment === "iphoto" || B.mobile && window
            .innerWidth < 600 ? "" : e, this.setIfChanged("title", e)
        }.observes(".owner.journal"),
        action: function() {
            Journal.workspaceController.set("nowShowing", Journal.JOURNAL)
        }
    }),
    leftSlider: Core.transitionBank.xFadeSlideLeft && Core.transitionBank.xFadeSlideLeft.extend({
        direction: - 0.05
    }) || null,
    rightSlider: Core.transitionBank.xFadeSlideRight && Core.transitionBank.xFadeSlideRight.extend({
        direction: .05
    }) || null,
    decideTransition: function() {
        this.titleSwapperView.defaultTransition = this.dateTextView.defaultTransition = this[this.transitionDirection + "Slider"]
    }.observes("transitionDirection"),
    titleSwapperView: CoreImage.FadingTextSwapperView.extend({
        classNames: "title-swapper full-width full-height".w(),
        valueBinding: "from:.owner.titleText",
        valueIncomingTransform: function(e) {
            return Journal.pruneAllButSimpleFormatting(e)
        },
        minLeftBinding: "from:.owner.titleMinLeft",
        textWidthBinding: "to:.owner._titleTextWidth",
        textLeftBinding: "to:.owner._titleTextLeft"
    }),
    dateTextView: CoreImage.FadingTextSwapperView.extend({
        classNames: "date-swapper",
        align: "right",
        escapeHTML: YES,
        valueBinding: "from:.owner.dateText",
        showTextBinding: "from:.owner.showDateText",
        textLeftBinding: "to:.owner._dateTextLeft"
    }),
    backButtonViewFrameChanged: function() {
        var e = this._backButtonViewLeft || 0, t = this._backButtonViewWidth || 0;
        if (!t)
            return;
        this.setIfChanged("titleMinLeft", e + t)
    }.observes("_backButtonViewLeft", "_backButtonViewWidth"),
    titleAndDateTextFrameChanged: function() {
        var e = this._titleTextLeft || 0, t = this._titleTextWidth || 0, n = this._dateTextLeft || 0, r = this.dateTextPadding;
        this.setIfChanged("showDateText", e + t < n - r)
    }.observes("_titleTextWidth", "_titleTextLeft", "_dateTextLeft"
    ),
    explicitlySetInlinePixelWidth: function() {
        if (!this.isAppendedInWindow)
            return;
        this.layer.style.width = Core.windowSize.width + "px"
    }.observes("isAppendedInWindow", "Core.windowSize")
}), require("views/slideshow_hud"), require("views/slideshow_top_bar"), function() {
    var e = Core.transitionBank, t = e.slideLeft && e.slideLeft.extend({
        tween: Anim.tweens.QUADRATIC_OUT,
        duration: 200
    }) || null, n = e.slideRight && e.slideRight.extend({
        tween: Anim.tweens.QUADRATIC_OUT,
        duration: 200
    }) || null;
    Journal.define("SlideshowPageView", CoreImage.SlideshowView.extend({
        typeInteger: Journal.SLIDESHOW,
        isLoading: NO,
        initiallyAppended: NO,
        shouldHideBodyOverflow: YES,
        classNames: "slideshow-page full-width full-height dark-theme".w(),
        entry: null,
        journal: null,
        isDark: YES,
        initialHudLifespan: 4e3,
        preserveUpSlideGPULayers: B.iOS || B.safari,
        itemViewsScopeLookAheadCount: 0,
        itemViewsScopeLookBehindCount: 0,
        rootHTML: '<div><div class="container full-width full-height"></div></div>',
        containerElement: "layer.lastChild",
        viewForItem: function(e, t) {
            return e ? e._slideshowItemView ? e._slideshowItemView : e._slideshowItemView = Journal.SlideshowItems.findAndCreate(e, {
                owner: this,
                downerImportance: t,
                entry: this.entry,
                journal: this.journal,
                originalItem: e,
                pageView: this
            }) : null
        },
        exitSlideshow: function() {
            Journal.workspaceController.set("nowShowing", Journal.JOURNAL)
        },
        makeDownerGroup: function() {
            this.set("downerGroup", CoreImage.ImageGroup.create({
                coreGuid: "SLIDESHOW_GROUP:" + this.coreGuid,
                importance: 1
            }).enter(CoreImage.imageLoader.group))
        }.observes("init"),
        bumpDownerGroup: function() {
            this.isShowing && this.downerGroup.becomeMostImportant()
        }.observes("isShowing"),
        rewriteDownerImportances
        : function() {
            if (!this.currentItem ||!this.itemSet)
                return;
            var e = this.itemSet && this.itemSet.indexOf(this.currentItem);
            if (isNaN(e) || e===-1)
                return;
            this.downerGroup.target = e
        }.observes("currentItem"),
        leftTransitioners: [[null, null, null], [null, e.xFadeSlideLeft, e.xFadeSlideLeft], [null, e.xFadeSlideLeft, e.xFadeSlideLeft]],
        rightTransitioners: [[null, null, null], [null, e.xFadeSlideRight, e.xFadeSlideRight], [null, e.xFadeSlideRight, e.xFadeSlideRight]],
        leftSwipeTransitioners: [[null, null, null], [null, t, t], [null, t, t]],
        rightSwipeTransitioners: [[null, null, null], [null, n, n], [null, n, n]],
        hideZoomImageItem: function() {
            if (!this.currentView)
                return;
            this.currentView.layer.style.visibility = "hidden", (this._hiddenZoomImageItems || (this._hiddenZoomImageItems = [])).push(this.currentView)
        },
        unhideZoomImageItem: function() {
            if (!this._hiddenZoomImageItems)
                return;
            for (var e = 0, t; t = this._hiddenZoomImageItems[e]; e++)
                t && t.layer && (t.layer.style.visibility = "");
            this._hiddenZoomImageItems.length = 0
        },
        getBigZoomInfo: function() {
            var e = this.currentView;
            return !e ||!e.getBigZoomInfo ? null : e.getBigZoomInfo()
        },
        bumpIsTransitioning: function() {
            this.setIfChanged("isTransitioning", YES)
        }.observes("willEnterTransition"),
        killIsTransitioning: function() {
            this.setIfChanged("isTransitioning", NO)
        }.observes("didFinishTransition"),
        preventHudOnEnterBegin: function(e, t, n) {
            if (!this.isShowing)
                return;
            this !== e && this.hideHud(YES)
        }.observes("willEnterTransition"),
        preventHudOnExitBegin: function(e, t, n) {
            if (!this.isShowing)
                return;
            if (this !== e)
                return;
            clearTimeout(this._touchHideHudTimeout), this.showHud(!0)
        }.observes("willEnterTransition"),
        unpreventHudOnEnterFinish: function() {
            if (!this.isShowing)
                return;
            this.showHud(this.initialHudLifespan || undefined)
        }.observes("didFinishTransition"),
        rememberCurrentItemAsOfExitBegin: function(e, t, n) {
            if (this !== e)
                return;
            this._currentItemAsOfExitBeginning = this.currentItem
        }.observes("willEnterTransition"),
        pokeRememberedExitCurrentItem: function() {
            if (Journal.workspaceController.nowShowing !== Journal.SLIDESHOW)
                return;
            this._currentItemAsOfExitBeginning = null
        }.observes("Journal.workspaceController.nowShowing"),
        clearSelfOnExit: function() {
            if (this.isShowing)
                return;
            if (this._currentItemAsOfExitBeginning !== this.currentItem)
                return;
            this.set("currentItem", null)
        }.observes("didFinishTransition"),
        notifyNewlyEnteredViewOfClickedStatus: function() {
            if (!this.isShowing)
                return;
            this.currentView && this.currentView.trigger("didEnterViaUserClick")
        }.observes("didFinishTransition"),
        hideOverflowOnEnter: function(e, t) {
            t === this && this.shouldHideBodyOverflow && Core.bodyOverflowArbitrator.requestHidden(this)
        }.observes("didFinishTransition"),
        unhideOverflowOnExit: function(e, t) {
            e === this && this.shouldHideBodyOverflow && Core.bodyOverflowArbitrator.withdrawRequest(this)
        }.observes("willEnterTransition"),
        hudView: Journal.SlideshowHudView.extend({
            shouldShowBinding: "from:.owner.isHudShowing",
            isMouseOverMeBinding: "to:.owner.isMouseOverHud",
            selfHeightBinding: "to:.owner.hudHeight",
            establishShouldEnableControls: function() {
                this.setIfChanged("shouldEnableControls", this.getPath("owner.itemSet.length") > 1)
            }.observes(".owner.itemSet"),
            rescale: function() {
                var e = Math.min((Core.windowSize.width + Core.windowSize.height) / 2 / 600, 1);
                this.layer.style.webkitTransform = e >= 1 ? "" : "scale3d(" + e + "," + e + ",1)"
                , this.layer.style.webkitTransformOrigin = e >= 1 ? "" : "50% 100%", this.set("selfHeight", 74 * e)
            }.observes("Core.windowSize", "Journal.workspaceController.nowShowing")
        }),
        topBarView: Journal.SlideshowTopBarView.extend({
            shouldShowBinding: "from:.owner.isHudShowing",
            isMouseOverMeBinding: "to:.owner.isMouseOverHud",
            itemSetBinding: "from:.owner.itemSet",
            currentSlideshowItemViewBinding: "from:.owner.currentView",
            establishTitleAndDate: function() {
                if (!this.layer)
                    return;
                var e = this.currentSlideshowItemView, t = e && (e.caption || e.title) || "", n = "", r = e && e.getPath("value.date") || "";
                if (r)
                    try {
                        r = r.split("-");
                        var i = {
                            year: parseInt(r[0], 10),
                            month: parseInt(r[1], 10),
                            day: parseInt(r[2], 10),
                            hours: parseInt(r[3], 10),
                            minutes: parseInt(r[4], 10),
                            seconds: parseInt(r[5], 10)
                        };
                        r = Journal.localizeDate(i, "_Date.Format".loc(), "_Date.AM".loc(), "_Date.PM".loc())
                } catch (s) {
                    r = ""
                }
                t ? n = r : t = r, this.setIfChanged("titleText", t), this.setIfChanged("dateText", n)
            }.observes("render", "currentSlideshowItemView")
        }),
        keydownForArrowLeft: function(e) {
            Journal.slideshowController.selectPrevious()
        },
        keydownForArrowRight: function(e) {
            Journal.slideshowController.selectNext()
        },
        keydownForEscape: function() {
            Journal.workspaceController.set("nowShowing", Journal.JOURNAL)
        }
    }))
}(), function() {
    var e = B.onlyiOS && NO;
    Journal.VideoPlayerView = Core.View.extend({
        classNames: "video-player",
        shouldAutoPlay: YES,
        mimes: {
            mov: "video/x-m4v",
            oldmov: "video/x-m4v",
            mp4: "video/mp4"
        },
        spinnerCoverView: e ? undefined: Core.View.extend(Core.FadeShowHide, {
            classNames: "full-width full-height".w(),
            rootHTML: '<div style="pointer-events:none; -webkit-transform: translate3d(0,0,0); background-color:rgba(0,0,0,0.65); z-index:1000;"></div>'
            ,
            shouldShow: NO,
            showDuration: 0,
            render: function(e) {
                B.msie <= 8 && (e.style.background = "black", e.style.filter = "alpha(opacity=65)")
            },
            spinnerView: Journal.SpinnerView.extend({
                classNames: "video-player-spinner".w(),
                wantsSpinBinding: "from:.owner.owner.shouldSpin",
                isAppendedBinding: "to:.owner.shouldShow",
                width: 35,
                height: 35,
                spinDuration: 2250,
                spinDelay: 250,
                doLayout: function() {
                    if (!this.layer)
                        return;
                    var e = this.getPath("owner.owner.owner.layout"), t = this.layer;
                    if (!e) {
                        Core.warn("Couldn't show video spinner because layout wasn't accessible in great grandparent."), t.style.display = "none";
                        return 
                    }
                    t.style.display = "", t.style.left = Math.round(e.width / 2 - this.width / 2) + "px", t.style.top = Math.round(e.height / 2 - this.height / 2) + "px"
                }.observes(".owner.owner.owner.imageLayout", "render")
            })
        }),
        init: function() {
            return this.isInUrlProbeMode && (this.initialChildViews = undefined), arguments.callee.base.apply(this, arguments)
        },
        establishFormatAndMimeType: function() {
            this.format = this.getPath("value.format"), this.implementation = Journal.VideoDetection.choices[this.format], this.mimeType = this.mimes[B.mozilla >= 25 ? "mp4": this.format]
        }.observes("init"),
        processReps: function(e) {
            if (!e)
                return;
            var t;
            for (t in e) {
                if (!e.hasOwnProperty(t))
                    continue;
                if (!e[t])
                    continue;
                e[t]._key = t
            }
        },
        _loadVideo: function(e) {
            window.player = this;
            if (!this.value)
                return;
            var t = e || this.getPath("value.videoReps");
            if (!t)
                return;
            this.processReps(t);
            var n = Journal.estimateAvailableBandwidth(), r = n < 500 ? t[640] || t[960]: t[960] || t[640];
            Math.max(Core.windowSize.width, Core.windowSize.height) * (window.devicePixelRatio || 1) <= 640 && (r = t[640] || t[960]), Core.debug("Getting URLs for video: Estimated available bandwidth was " +
            n + ", and the preferred size is", r._key);
            if (!r)
                return;
            e || (e = Core.cloneHash(t));
            var i = r.url, s = this, o = r.fileInfo;
            s.setIfChanged("shouldSpin", YES), o.requestSingleUrlSet(function() {
                s.didGetUrls(r)
            }, function() {
                Core.debug("Error requesting video URLs for rep of size " + r._key + ". Will try again if additional untried reps remain."), e[r._key] = undefined, !e[960]&&!e[640] ? (Core.debug("All video reps are exhausted. No URLs could be obtained for any of them."), s.setIfChanged("shouldSpin", NO), s.trigger("videoNotFound")) : setTimeout(function() {
                    s._loadVideo(e)
                }, 0)
            }, B.onlyiOS?!o.urlSet || o.urlSet.birth < new Date * 1 - 6e4 : YES)
        },
        updateToVideo: function() {
            this._loadVideo()
        }.observes("value", "render"),
        didGetUrls: function(t) {
            if (!t)
                return;
            var n = t.fileInfo.urlSet.urls, r = this, i = this.implementation, s;
            if (this.isInUrlProbeMode) {
                this.setIfChanged("foundUrls", t.fileInfo.urlSet.urls);
                return 
            }
            Core.debug("Initializing " + i + " video player for " + this.format + " with URLs " + n), i === "quicktime" && (B.msie ? (this.layer.innerHTML = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="https://www.apple.com/qtactivex/qtplugin.cab#version=7,3,0,0" playerType="quicktime"><param name="src" value="' + n[0] + '" />' + '<param name="controller" value="true" />' + '<param name="wmode" value="window" />' + '<param name="showlogo" value="false" />' + '<param name="scale" value="tofit" />' + '<param name="bgcolor" value="black" />' + '<param name="kioskmode" value="true" />' + '<param name="autoplay" value="'+!!this.shouldAutoPlay + '" />' + '<param name="enablejavascript" value="true" />' + '<param name="postdomevents" value="true" />' + '<param name="cache" value="true" />' + "</object>"
            , s = this.video = this.layer.firstChild, s.isQT = YES, s._urls = n, s._currentUrl = 0, this._addQTDOMEvents()) : (this.layer.innerHTML = '<EMBED SRC="' + n[0] + '"' + 'CONTROLLER="true" ' + 'TYPE="video/quicktime" ' + 'PLUGINSPAGE="www.apple.com/quicktime/download" ' + 'EnableJavaScript="true" ' + 'postdomevents="true" ' + 'BGCOLOR="000000" ' + 'SHOWLOGO="false" ' + 'SCALE="TOFIT" ' + 'AUTOPLAY="'+!!this.shouldAutoPlay + '" ' + 'KIOSKMODE="true" ' + 'CACHE="true" ' + 'NAME="qtMovie' + this.coreGuid + '" ' + "/>", s = this.video = this.layer.firstChild, s.isQT = YES, s.isQTEmbed = YES, s._urls = n, s._currentUrl = 0, this._addQTDOMEvents()));
            if (i === "html5") {
                this.video = s = document.createElement("video"), s.setAttribute("controls", "controls"), s.setAttribute("autoplay", this.shouldAutoPlay);
                if (e)
                    s.src = n[0], s.style.opacity = 0, s._urls = n, s._currentlyAttemptingUrlIndex = 0;
                else 
                    for (var o = 0, u = n.length; o < u; o++) {
                        var a = n[o], f = document.createElement("source");
                        f.setAttribute("type", this.mimeType), f.setAttribute("src", n[o]), f.onerror = function() {
                            Core.debug("Failed to load video resource. Attempting fallback if possible.")
                        }, s.appendChild(s._lastSource = f)
                    }
                s.isHTML5 = YES, this.layer.appendChild(s), this._addHTML5DOMEvents()
            }
            this.trigger("didRenderVideo"), Journal.initialStateController.params.video_error && setTimeout(function() {
                r.trigger(Journal.initialStateController.params.video_error)
            }, 200)
        },
        _addQTDOMEvents: function() {
            var e = this.video, t = this;
            Core.addEvent(e, "qt_ended", function(e) {
                t.trigger("playbackDidEnd", e)
            }), Core.addEvent(e, "qt_error", function(e) {
                var n = this._urls, r;
                if (!n)
                    return t.trigger("playbackDidErr", e);
                this._currentUrl++;
                if (!n[r = this._currentUrl])
                    return t.trigger("playbackDidErr"
                    , e);
                this.src = n[r]
            }), Core.addEvent(e, "qt_play", function() {
                t.trigger("videoDidBeginPlaying")
            }), Core.addEvent(e, "qt_canplay", function() {
                t.trigger("videoCanPlay")
            })
        },
        _addHTML5DOMEvents: function() {
            var t = this.video, n = this;
            Core.addEvent(t, "ended", function(e) {
                n.trigger("playbackDidEnd", e)
            }), Core.addEvent(t._lastSource || t, "error", function(t) {
                var r;
                if (e)
                    if (r = this._urls[++this._currentlyAttemptingUrlIndex]) {
                        this.src = r;
                        return 
                    }
                n.trigger("playbackDidErr", t)
            }), Core.addEvent(t, "play", function() {
                n.trigger("videoDidBeginPlaying")
            }), Core.addEvent(t, "canplay", function() {
                n.trigger("videoCanPlay")
            })
        },
        play: function() {
            var e = this.video;
            e ? e.isHTML5 && e.play() : this.setIfChanged("shouldAutoPlay", YES)
        },
        pause: function() {
            var e = this.video;
            if (!e)
                this.setIfChanged("shouldAutoPlay", NO);
            else if (e.isHTML5)
                try {
                    e.pause()
            } catch (t) {
                return 1
            } else 
                try {
                    e.Stop()
            } catch (t) {
                return 1
            }
            return 0
        },
        absolutelyStopVideoIfNotInDOM: function() {
            this.isAppendedInWindow || this.pause()
        }.observes("isAppendedInWindow"),
        handlePlayBeginForIOS: e ? function() {
            this.video.style.opacity = "", this.owner.trigger("ios_videoDidBeginPlaying")
        }.observes("videoDidBeginPlaying"): undefined,
        removeSpinnerWhenCanPlay: function() {
            this.setIfChanged("shouldSpin", NO)
        }.observes("videoDidBeginPlaying", "videoCanPlay")
    })
}(), function() {
    var e = Journal.transitionBank, t = CoreImage.transitionBank, n = Core.transitionBank;
    Journal.page = Core.WorkspaceView.extend({
        classNames: "wrapper".w(),
        allowInterruption: NO,
        transitioningOverflow: "",
        nowShowingBinding: "from:Journal.workspaceController.nowShowing",
        isBookshelfViewShowingBinding: "from:Journal.workspaceController.isBookshelfViewShowing",
        tabNames
        : Journal.tabNames,
        transitioners: [[null, null, null, null, null, null, null], [e.slideList, null, n.dropFrom, n.dropFrom, n.dropFrom, n.dropFrom, n.dropFrom], [null, n.liftTo, null, n.dropFrom, n.liftTo, n.dropFrom, n.liftTo], [null, n.liftTo, t.zoomImageIn, null, n.liftTo, n.dropFrom, n.liftTo], [null, n.liftTo, n.liftTo, n.liftTo, null, n.dropFrom, n.liftTo], [null, n.liftTo, n.liftTo, n.liftTo, n.liftTo, null, n.liftTo], [null, n.liftTo, n.liftTo, n.dropFrom, n.liftTo, n.dropFrom, null]],
        bookshelfView: Journal.BookshelfPageView.extend({
            listBinding: "from:Journal.bookshelfController.list",
            establishDisplayWidth: function() {
                this.setIfChanged("displayWidth", Core.windowSize.width)
            }.observes("init", "Core.windowSize")
        }),
        journalView: Journal.JournalPageView.extend({
            journalBinding: "from:Journal.journalController.journal",
            selectedEntryBinding: "Journal.journalController.entry",
            displayWidthBinding: "from:Journal.workspaceController.displayWidth",
            themeBinding: "to:Journal.slideshowController.theme"
        }),
        slideshowView: Journal.SlideshowPageView.extend({
            controller: Journal.slideshowController,
            journalBinding: "from:.controller.journal",
            entryBinding: "from:.controller.entry",
            itemSetBinding: "from:.controller.itemSet",
            currentItemBinding: ".controller.currentItem",
            isLoadingBinding: "to:.controller.isLoading",
            themeBinding: "from:.controller.theme"
        }),
        errorView: Journal.ErrorPageView.extend({
            errorMessageBinding: "from:Journal.errorController.errorMessage",
            displayWidthBinding: "from:Journal.workspaceController.displayWidth",
            isShowingBinding: "to:.owner.isErrorViewShowing"
        }),
        landingView: Journal.LandingPageView.extend({}),
        montageView: Journal.MontagePageView.extend(
        {
            montageBinding: "from:Journal.montageController.montage"
        }),
        updateBGColorForCurrentView: function() {
            document.body.style.backgroundColor = this.getPath("currentView.bodyBackgroundColor") || "#1e1e1e"
        }.observes("currentView"),
        fixSizeForIOS: B.iOS ? function() {
            this.layer.style.width = Core.windowSize.width + "px", this.layer.style.height = Core.windowSize.height + "px"
        }.observes("Core.windowSize"): null,
        touchStart: function() {}
    })
}(), require("core"), Journal.mixin({
    main: function() {
        if (!Journal.isBrowserCompatible() && Journal.isOnAppleServer) {
            window.location = B.mobile ? "https://www.icloud.com/unsupported_mobile/" : "https://www.icloud.com/unsupported_browser/";
            return 
        }
        var e = document.getElementById("loading");
        e && e.parentNode.removeChild(e), Browser.addBodyClassNames(), Core.useGPU && (document.body.className += " gpu-enabled"), Journal.isOnAppleServer && (document.body.className += " on-apple-server"), (Journal.page = Journal.page.create()).append(), Journal.initialStateController.initialTab === "bookshelf" && Journal.bookshelfController.fetchInitialList(function() {
            Journal.workspaceController.set("nowShowing", Journal.BOOKSHELF)
        }), Journal.initialStateController.initialTab === "project" && Journal.ProjectController.shiftToAndDisplayInitialProject()
    }.observes("Core.windowDidLoad")
});

