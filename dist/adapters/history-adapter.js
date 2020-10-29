'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HistoryAdapter = void 0;
var mobx_1 = require('mobx');
var router_store_1 = require('../router-store');
var generate_url_1 = require('./generate-url');
var find_matching_route_1 = require('./find-matching-route');
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
            var matchingRoute = find_matching_route_1.findMatchingRoute(
                location,
                _this.routerStore.routes
            );
            if (matchingRoute) {
                return _this.routerStore.goTo(
                    router_store_1.RouterState.create(matchingRoute)
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
