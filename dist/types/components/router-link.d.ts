import * as React from 'react';
import { StringMap, RouterStateOptions } from '../router-store';
export interface RouterLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    rootStore?: any;
    routeName: string;
    params?: StringMap;
    queryParams?: {
        [key: string]: any;
    };
    className?: string;
    activeClassName?: string;
    options?: RouterStateOptions;
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
export declare class RouterLink extends React.Component<RouterLinkProps, {}> {
    render(): JSX.Element;
    handleClick: (event: React.MouseEvent<HTMLAnchorElement>) => any;
}
