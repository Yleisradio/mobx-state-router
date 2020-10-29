'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StaticAdapter = void 0;
var router_store_1 = require('../router-store');
var find_matching_route_1 = require('./find-matching-route');
/**
 * Responsible for driving `RouterState` programmatically instead of the
 * Browser bar. This is useful in server-side rendering scenarios where
 * the user isn’t actually clicking around, so the location never actually
 * changes. Hence, the name `static`.
 */
var StaticAdapter = /** @class */ (function() {
    function StaticAdapter(routerStore) {
        var _this = this;
        this.goToLocation = function(location) {
            // /* istanbul ignore if */
            // if (process.env.NODE_ENV === 'development') {
            //     console.log(
            //         `StaticAdapter.goToLocation(${JSON.stringify(location)})`
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
        this.routerStore = routerStore;
    }
    return StaticAdapter;
})();
exports.StaticAdapter = StaticAdapter;
//# sourceMappingURL=static-adapter.js.map
