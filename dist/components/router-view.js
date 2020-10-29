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
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function(o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                  enumerable: true,
                  get: function() {
                      return m[k];
                  }
              });
          }
        : function(o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function(o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v
              });
          }
        : function(o, v) {
              o['default'] = v;
          });
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
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RouterView = void 0;
var React = __importStar(require('react'));
var mobx_react_1 = require('mobx-react');
/**
 * Watches the router state and instantiates the associated UI component.
 * It expects two props: the `routerStore` and a `viewMap`. The `viewMap`
 * is a simple mapping from `routeNames` to React components.
 */
var RouterView = /** @class */ (function(_super) {
    __extends(RouterView, _super);
    function RouterView() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    RouterView.prototype.render = function() {
        var _a = this.props,
            routerState = _a.routerStore.routerState,
            viewMap = _a.viewMap;
        // if (process.env.NODE_ENV === 'development') {
        //     console.log(`RouterView.render() - ${JSON.stringify(routerState)}`);
        // }
        var view = viewMap[routerState.routeName];
        return view ? view : null;
    };
    RouterView = __decorate([mobx_react_1.observer], RouterView);
    return RouterView;
})(React.Component);
exports.RouterView = RouterView;
//# sourceMappingURL=router-view.js.map
