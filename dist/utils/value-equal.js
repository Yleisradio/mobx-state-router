"use strict";
// Based on https://github.com/mjackson/value-equal
// Applied fix for https://github.com/mjackson/value-equal/issues/10
Object.defineProperty(exports, "__esModule", { value: true });
function valueEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (Array.isArray(a)) {
        return (Array.isArray(b) &&
            a.length === b.length &&
            a.every(function (item, index) {
                return valueEqual(item, b[index]);
            }));
    }
    var aType = typeof a;
    var bType = typeof b;
    if (aType !== bType)
        return false;
    if (aType === 'object') {
        var aValue = a.valueOf
            ? a.valueOf()
            : Object.prototype.valueOf.call(a);
        var bValue = b.valueOf
            ? b.valueOf()
            : Object.prototype.valueOf.call(b);
        if (aValue !== a || bValue !== b)
            return valueEqual(aValue, bValue);
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length)
            return false;
        return aKeys.every(function (key) {
            return valueEqual(a[key], b[key]);
        });
    }
    return false;
}
exports.valueEqual = valueEqual;
//# sourceMappingURL=value-equal.js.map