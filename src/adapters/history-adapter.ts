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

        // Go to current history location
        // tslint:disable-next-line:no-floating-promises
        this.goToLocation(this.history.location);

        // Listen for history changes
        this.history.listen(location => {
            console.log('history listen', location);
            // tslint:disable-next-line: no-floating-promises
            this.goToLocation(location);
        });
    }

    goToLocation = (location: Location): Promise<RouterState> => {
        // if (process.env.NODE_ENV === 'development') {
        //     console.log(
        //         `HistoryAdapter.goToLocation(${JSON.stringify(location)})`
        //     );
        // }
        console.log('gotoLocation', location);
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
            console.log('found matchingroute', matchingRoute);
            return this.routerStore.goTo(
                new RouterState(
                    matchingRoute.name,
                    params,
                    parse(location.search)
                )
            );
        } else {
            console.log('notfound');
            return this.routerStore.goToNotFound();
        }
    };

    goBack = () => {
        console.log('goback');
        this.history.goBack();
    };

    observeRouterStateChanges = () => {
        reaction(
            () => this.routerStore.routerState,
            (routerState: RouterState) => {
                console.log('observerouterstatechanges');
                const location = this.history.location;
                const currentUrl = `${location.pathname}${location.search}`;
                const routerStateUrl = routerStateToUrl(
                    this.routerStore,
                    routerState
                );
                if (currentUrl !== routerStateUrl) {
                    console.log(
                        'currenturl mishmash',
                        currentUrl,
                        routerStateUrl
                    );
                    if (routerState.options && routerState.options.replace) {
                        console.log('replace');
                        this.history.replace(routerStateUrl);
                    } else {
                        console.log('push');
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
