'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var mobx_1 = require('mobx');
var query_string_1 = require('query-string');
var router_store_1 = require('../router-store');
var generate_url_1 = require('./generate-url');
var match_url_1 = require('./match-url');
/**
 * Responsible for keeping the browser address bar and the `RouterState`
 * in sync. It also provides a `goBack()` method to go back in history.
 */
var HistoryAdapter = /** @class */ (function() {
    function HistoryAdapter(routerStore, history) {
        var _this = this;
        this.goToLocation = function(location) {
            // if (process.env.NODE_ENV === 'development') {
            //     console.log(
            //         `HistoryAdapter.goToLocation(${JSON.stringify(location)})`
            //     );
            // }
            // Find the matching route
            var routes = _this.routerStore.routes;
            var matchingRoute = null;
            var params = undefined;
            for (var i = 0; i < routes.length; i++) {
                var route = routes[i];
                params = match_url_1.matchUrl(location.pathname, route.pattern);
                if (params) {
                    matchingRoute = route;
                    break;
                }
            }
            if (matchingRoute) {
                return _this.routerStore.goTo(
                    new router_store_1.RouterState(
                        matchingRoute.name,
                        params,
                        query_string_1.parse(location.search)
                    )
                );
            } else {
                return _this.routerStore.goToNotFound();
            }
        };
        this.goBack = function() {
            _this.history.goBack();
        };
        this.observeRouterStateChanges = function() {
            mobx_1.reaction(
                function() {
                    return _this.routerStore.routerState;
                },
                function(routerState) {
                    var location = _this.history.location;
                    var currentUrl = '' + location.pathname + location.search;
                    var routerStateUrl = generate_url_1.routerStateToUrl(
                        _this.routerStore,
                        routerState
                    );
                    if (currentUrl !== routerStateUrl) {
                        if (
                            routerState.options &&
                            routerState.options.replace
                        ) {
                            _this.history.replace(routerStateUrl);
                        } else {
                            _this.history.push(routerStateUrl);
                        }
                        // if (process.env.NODE_ENV === 'development') {
                        //     console.log(
                        //         `HistoryAdapter: history.push(${routerStateUrl}),`,
                        //         `history.length=${this.history.length}`
                        //     );
                        // }
                    }
                }
            );
        };
        this.routerStore = routerStore;
        this.history = history;
        // Go to current history location
        // tslint:disable-next-line:no-floating-promises
        this.goToLocation(this.history.location);
        // Listen for history changes
        this.history.listen(function(location) {
            return _this.goToLocation(location);
        });
    }
    return HistoryAdapter;
})();
exports.HistoryAdapter = HistoryAdapter;
//# sourceMappingURL=history-adapter.js.map
