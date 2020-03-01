import { History, Location } from 'history';
import { reaction } from 'mobx';
import { parse } from 'query-string';
import { RouterState, RouterStore } from '../router-store';
import { routerStateToUrl } from './generate-url';
import { matchUrl } from './match-url';

/**
 * Responsible for keeping the browser address bar and the `RouterState`
 * in sync. It also provides a `goBack()` method to go back in history.
 */
export class HistoryAdapter {
    routerStore: RouterStore;
    history: History;

    constructor(routerStore: RouterStore, history: History) {
        this.routerStore = routerStore;
        this.history = history;

        // console.log('initial stuff for funz', routerStore.routerState);
        // const targetSearchThingie = stringify(routerStore.routerState.queryParams)
        // console.log('mooo', targetSearchThingie)

        // console.log('initial window location', JSON.stringify(window.history.state))

        const initialRouterStateUrl = routerStateToUrl(
            routerStore, routerStore.routerState
        )

        // @ts-ignore
        window.history.replaceState({}, '', initialRouterStateUrl)
        // console.log('history location before,', JSON.stringify(this.history.location, null, 2))
        // console.log('initialrsurl', initialRouterStateUrl)
        // this.history.replace(initialRouterStateUrl);

        // console.log('history location after', JSON.stringify(this.history.location, null, 2))

        // Go to current history location
        // tslint:disable-next-line:no-floating-promises
        this.goToLocation(this.history.location);

        // Listen for history changes
        this.history.listen(location => this.goToLocation(location));

        // @ts-ignore
        window.libHistory = History
        // @ts-ignore
        window.libLocation = Location
    }

    goToLocation = (
        location: Location
    ): Promise<RouterState> => {
        // if (process.env.NODE_ENV === 'development') {
        //     console.log(
        //         `HistoryAdapter.goToLocation(${JSON.stringify(location)})`
        //     );
        // }

        // Find the matching route
        const routes = this.routerStore.routes;
        let matchingRoute = null;
        let params = undefined;
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            params = matchUrl(location.pathname, route.pattern);
            if (params) {
                matchingRoute = route;
                break;
            }
        }

        if (matchingRoute) {
            return this.routerStore.goTo(
                new RouterState(
                    matchingRoute.name,
                    params,
                    parse(location.search)
                )
            );
        } else {
            return this.routerStore.goToNotFound();
        }
    };

    goBack = () => {
        this.history.goBack();
    };

    observeRouterStateChanges = () => {
        reaction(
            () => this.routerStore.routerState,
            (routerState: RouterState) => {
                const location = this.history.location;
                const currentUrl = `${location.pathname}${location.search}`;
                const routerStateUrl = routerStateToUrl(
                    this.routerStore,
                    routerState
                );
                if (currentUrl !== routerStateUrl) {
                    if (routerState.options.replace) {
                        this.history.replace(routerStateUrl);
                    } else {
                        this.history.push(routerStateUrl);
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
}
