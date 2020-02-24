'use strict';
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __rest =
    (this && this.__rest) ||
    function(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
            ) {
                if (
                    e.indexOf(p[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result['default'] = mod;
        return result;
    };
Object.defineProperty(exports, '__esModule', { value: true });
var React = __importStar(require('react'));
var mobx_react_1 = require('mobx-react');
var router_store_1 = require('../router-store');
var generate_url_1 = require('../adapters/generate-url');
function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}
/**
 * Creates an anchor tag that links to a router state. Redirects to the target
 * state without reloading the entire app, thus avoiding potential flickers.
 *
 * Example:
 *     <RouterLink routeName="home">
 *         Home
 *     </RouterLink>
 *
 * Note that `rootStore` is injected directly into the RouterLink, there
 * is no need to pass it as prop.
 *
 * The target state is specified by the `routeName`, `params` and `queryParams`
 * properties.
 *
 * RouterLink accepts `className` and `activeClassName` as optional
 * properties. `className` is always applied to the anchor tag.
 * `activeClassName` is applied in addition if the current `routerState`
 * matches the state specified by the `RouterLink`. This feature is
 * useful for highlighting the active link in a navbar.
 *
 * Note that you can pass other anchor tag attributes (such as onClick
 * and onBlur) to this component. They will be passed through to the
 * child anchor tag except for `href`, which is fully computed by this
 * component.
 */
var RouterLink = /** @class */ (function(_super) {
    __extends(RouterLink, _super);
    function RouterLink() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.handleClick = function(event) {
            // Ignore if link is clicked using a modifier key or not left-clicked
            if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
                return undefined;
            }
            // Prevent default action which reloads the app
            event.preventDefault();
            var _a = _this.props,
                rootStore = _a.rootStore,
                routeName = _a.routeName,
                params = _a.params,
                queryParams = _a.queryParams,
                onClick = _a.onClick;
            var routerStore = rootStore.routerStore;
            // Call onClick hook if present
            if (onClick) onClick(event);
            // Change the router state to trigger a refresh
            return routerStore.goTo(routeName, params, queryParams);
        };
        return _this;
    }
    RouterLink.prototype.render = function() {
        var _a = this.props,
            routerStore = _a.rootStore.routerStore,
            routeName = _a.routeName,
            params = _a.params,
            queryParams = _a.queryParams,
            className = _a.className,
            activeClassName = _a.activeClassName,
            options = _a.options,
            children = _a.children,
            href = _a.href, // remove from `...others`
            onClick = _a.onClick, // remove from `...others`
            others = __rest(_a, [
                'rootStore',
                'routeName',
                'params',
                'queryParams',
                'className',
                'activeClassName',
                'options',
                'children',
                'href',
                'onClick'
            ]);
        var toState = new router_store_1.RouterState(
            routeName,
            params,
            queryParams
        );
        var isActive = routerStore.routerState.isEqual(toState);
        var joinedClassName =
            (className ? className : '') +
            (isActive && activeClassName ? ' ' + activeClassName : '');
        return React.createElement(
            'a',
            __assign(
                {
                    className: joinedClassName,
                    href: generate_url_1.routerStateToUrl(routerStore, toState),
                    onClick: this.handleClick
                },
                others
            ),
            children
        );
    };
    RouterLink = __decorate(
        [mobx_react_1.inject('rootStore'), mobx_react_1.observer],
        RouterLink
    );
    return RouterLink;
})(React.Component);
exports.RouterLink = RouterLink;
//# sourceMappingURL=router-link.js.map
