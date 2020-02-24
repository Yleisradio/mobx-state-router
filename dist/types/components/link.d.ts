import * as React from 'react';
import { RouterState, RouterStore } from '../router-store';
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    routerStore: RouterStore;
    toState: RouterState;
    className?: string;
    activeClassName?: string;
}
/**
 * Creates an anchor tag that links to a router state. Redirects to the target
 * state without reloading the entire app, thus avoiding potential flickers.
 *
 * Example:
 *     const home = new RouterState('home');
 *     ...
 *     <Link routerStore={routerStore} toState={home}>
 *         Home
 *     </Link>
 *
 * Link accepts `className` and `activeClassName` as optional
 * properties. `className` is always applied to the anchor tag.
 * `activeClassName` is applied in addition if the current `routerState`
 * matches the state specified by the `Link`. This feature is
 * useful for highlighting the active link in a navbar.
 *
 * Note that you can pass other anchor tag attributes (such as onClick
 * and onBlur) to this component. They will be passed through to the
 * child anchor tag except for `href`, which is fully computed by this
 * component.
 *
 * @see RouterLink for simpler way to create anchor tags.
 */
export declare class Link extends React.Component<LinkProps, {}> {
    render(): JSX.Element;
    handleClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => Promise<RouterState> | undefined;
}
