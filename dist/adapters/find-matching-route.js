'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findMatchingRoute = void 0;
var match_url_1 = require('./match-url');
var query_string_1 = require('query-string');
/*
 * Find a route that matches the URL to a pattern and extracts the components.
 *
 * Can be used to generate the initial routerState when initialising the RouterStore.
 *  e.g.
 *    const history = createBrowserHistory();
      routerStore = new RouterStore(
        rootStore,
        routes,
        notFound,
        findMatchingRoute(history.location, routes)
    );
 */
exports.findMatchingRoute = function(location, routes) {
    // Find the matching route
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
        return {
            routeName: matchingRoute.name,
            params: params,
            queryParams: query_string_1.parse(location.search)
        };
    }
};
//# sourceMappingURL=find-matching-route.js.map
