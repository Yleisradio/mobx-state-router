"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = require("path-to-regexp");
var query_string_1 = require("query-string");
var generatorCache = {};
var getGenerator = function (pattern) {
    var generator = generatorCache[pattern];
    if (generator) {
        return generator;
    }
    var compiledGenerator = path_to_regexp_1.compile(pattern);
    generatorCache[pattern] = compiledGenerator;
    return compiledGenerator;
};
/**
 * Generates a URL from a pattern and parameters.
 * For example,
 *     generateUrl('/departments/:id', { id: 'electronics' })
 *     => '/departments/electronics'
 */
exports.generateUrl = function (pattern, params, queryParams) {
    if (pattern === void 0) { pattern = '/'; }
    if (params === void 0) { params = {}; }
    if (queryParams === void 0) { queryParams = {}; }
    // inject params
    var generator = getGenerator(pattern);
    var url = generator(params);
    // inject queryParams (remember to insert the question mark)
    if (Object.keys(queryParams).length > 0) {
        url = url + "?" + query_string_1.stringify(queryParams);
    }
    return url;
};
/**
 * Converts the supplied routerState to a URL
 * @param {RouterStore} routerStore
 * @param {RouterState} routerState
 * @returns {string}
 */
exports.routerStateToUrl = function (routerStore, routerState) {
    var routeName = routerState.routeName, params = routerState.params, queryParams = routerState.queryParams;
    var route = routerStore.getRoute(routeName);
    return exports.generateUrl(route.pattern, params, queryParams);
};
//# sourceMappingURL=generate-url.js.map