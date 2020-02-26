import * as React from 'react';
import { RouterStore } from '../router-store';
export interface ViewMap {
    [routeName: string]: React.ReactNode;
}
export interface RouterViewProps {
    routerStore: RouterStore;
    viewMap: ViewMap;
}
/**
 * Watches the router state and instantiates the associated UI component.
 * It expects two props: the `routerStore` and a `viewMap`. The `viewMap`
 * is a simple mapping from `routeNames` to React components.
 */
export declare class RouterView extends React.Component<RouterViewProps, {}> {
    render(): {} | null;
}
