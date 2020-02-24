"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var value_equal_1 = require("./utils/value-equal");
var mobx_1 = require("mobx");
/**
 * Holds the state of the router. Always use the constructor to create
 * an instance. Once an instance is created, don't mutate it - create a
 * fresh instance instead.
 */
var RouterState = /** @class */ (function () {
    /**
     * Creates RouterState
     * @param {string} routeName, e.g. 'department'
     * @param {StringMap} params, e.g. { id: 'electronics' }
     * @param {[key: string]: any} queryParams, e.g. { q: 'apple' } or { items: ['E1', 'E2'] }
     * @param {RouterStateOptions} options, e.g. { replace: true } to replace History entry
     */
    function RouterState(routeName, params, queryParams, options) {
        if (params === void 0) { params = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        if (options === void 0) { options = {}; }
        this.routeName = routeName;
        this.params = params;
        this.queryParams = queryParams;
        this.options = options;
    }
    RouterState.create = function (jsRouterState) {
        var routeName = jsRouterState.routeName, params = jsRouterState.params, queryParams = jsRouterState.queryParams;
        return new RouterState(routeName, params, queryParams);
    };
    RouterState.prototype.isEqual = function (other) {
        return value_equal_1.valueEqual(this, other);
    };
    return RouterState;
}());
exports.RouterState = RouterState;
var INITIAL_ROUTE = {
    name: '__initial__',
    pattern: ''
};
/**
 * Holds the router state. It allows transitioning between states using
 * the `goTo()` method.
 */
var RouterStore = /** @class */ (function () {
    function RouterStore(rootStore, routes, notFoundState, initialState) {
        this.isTransitioning = false;
        this.rootStore = rootStore;
        this.routes = routes;
        this.notFoundState = notFoundState;
        // Set the initial state
        if (initialState) {
            this.routerState = RouterState.create(initialState);
        }
        else {
            // Create an artificial route and set initial state to it
            this.routes.push(INITIAL_ROUTE);
            this.routerState = new RouterState(INITIAL_ROUTE.name);
        }
    }
    RouterStore.prototype.hydrate = function (state) {
        this.routerState = RouterState.create(state);
    };
    RouterStore.prototype.serialize = function () {
        return __assign({}, this.routerState);
    };
    RouterStore.prototype.setErrorHook = function (onError) {
        this.onError = onError;
    };
    RouterStore.prototype.goTo = function (toStateOrRouteName, params, queryParams, options) {
        if (params === void 0) { params = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        if (options === void 0) { options = {}; }
        var toState = typeof toStateOrRouteName === 'string'
            ? new RouterState(toStateOrRouteName, params, queryParams, options)
            : toStateOrRouteName;
        var fromState = this.routerState;
        return this.transition(fromState, toState);
    };
    RouterStore.prototype.goToNotFound = function () {
        this.setRouterState(this.notFoundState);
        return Promise.resolve(this.notFoundState);
    };
    RouterStore.prototype.getRoute = function (routeName) {
        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            if (route.name === routeName) {
                return route;
            }
        }
        throw new Error("Route " + routeName + " does not exist");
    };
    RouterStore.prototype.getCurrentRoute = function () {
        return this.getRoute(this.routerState.routeName);
    };
    /**
     * Requests a transition from fromState to toState. Note that the
     * actual transition may be different from the requested one
     * based on enter and exit hooks.
     */
    RouterStore.prototype.transition = function (fromState, toState) {
        return __awaiter(this, void 0, void 0, function () {
            var fromStateStr, _a, beforeExit, onExit, _b, beforeEnter, onEnter, err_1, redirectState;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // If fromState = toState, do nothing
                        // This is important to avoid infinite loops caused by RouterStore.goTo()
                        // triggering a change in history, which in turn causes HistoryAdapter
                        // to call RouterStore.goTo().
                        if (fromState.isEqual(toState)) {
                            /* istanbul ignore if */
                            if (process.env.NODE_ENV === 'development') {
                                fromStateStr = JSON.stringify(fromState);
                                // console.log(
                                //     `RouterStore.transition(${fromStateStr}):`,
                                //     'states are equal, skipping'
                                // );
                            }
                            return [2 /*return*/, toState];
                        }
                        _a = this.getRoute(fromState.routeName), beforeExit = _a.beforeExit, onExit = _a.onExit;
                        _b = this.getRoute(toState.routeName), beforeEnter = _b.beforeEnter, onEnter = _b.onEnter;
                        if (toState.options && toState.options.skipTransitions) {
                            console.log('skippy transitions');
                            this.setRouterState(toState);
                            return [2 /*return*/, toState];
                        }
                        // Call the transition hook chain
                        this.isTransitioning = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, 11, 12]);
                        if (!beforeExit) return [3 /*break*/, 3];
                        return [4 /*yield*/, beforeExit(fromState, toState, this)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!beforeEnter) return [3 /*break*/, 5];
                        return [4 /*yield*/, beforeEnter(fromState, toState, this)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (!onExit) return [3 /*break*/, 7];
                        return [4 /*yield*/, onExit(fromState, toState, this)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        if (!onEnter) return [3 /*break*/, 9];
                        return [4 /*yield*/, onEnter(fromState, toState, this)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        this.setRouterState(toState);
                        return [2 /*return*/, toState];
                    case 10:
                        err_1 = _c.sent();
                        // If error is an instance of RouterState then go to that state
                        if (err_1 instanceof RouterState) {
                            redirectState = err_1;
                            if (redirectState.isEqual(toState)) {
                                this.setRouterState(redirectState);
                                return [2 /*return*/, redirectState];
                            }
                            else {
                                return [2 /*return*/, this.goTo(redirectState)];
                            }
                        }
                        // Else if error hook is specified, call it
                        if (this.onError) {
                            return [2 /*return*/, this.onError(err_1)];
                        }
                        // Else handle the error internally
                        throw new Error('toState is undefined');
                    case 11:
                        this.isTransitioning = false;
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    RouterStore.prototype.setRouterState = function (routerState) {
        this.routerState = routerState;
        this.isTransitioning = false;
    };
    __decorate([
        mobx_1.observable.ref
    ], RouterStore.prototype, "routerState", void 0);
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "isTransitioning", void 0);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "hydrate", null);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "setRouterState", null);
    return RouterStore;
}());
exports.RouterStore = RouterStore;
//# sourceMappingURL=router-store.js.map