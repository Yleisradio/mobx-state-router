/**
 * A map from string to string (key-value pairs). Based on:
 * https://stackoverflow.com/questions/13631557/typescript-objects-as-dictionary-types-as-in-c-sharp
 *
 * Example:
 * {
 *     id: 'electronics',
 *     category: 'computers'
 * }
 */
export interface StringMap {
    [key: string]: string;
}
/**
 * Holds a serialized version of the router state.
 */
export interface JsRouterState {
    routeName: string;
    params?: StringMap;
    queryParams?: {
        [key: string]: any;
    };
}
/**
 * Options for a RouterState instance, provide access to History replace instead of a new entry
 * on each navigation.
 */
export interface RouterStateOptions {
    replace?: boolean;
}
/**
 * Holds the state of the router. Always use the constructor to create
 * an instance. Once an instance is created, don't mutate it - create a
 * fresh instance instead.
 */
export declare class RouterState {
    readonly routeName: string;
    readonly params: StringMap;
    readonly queryParams: {
        [key: string]: any;
    };
    readonly options: RouterStateOptions;
    /**
     * Creates RouterState
     * @param {string} routeName, e.g. 'department'
     * @param {StringMap} params, e.g. { id: 'electronics' }
     * @param {[key: string]: any} queryParams, e.g. { q: 'apple' } or { items: ['E1', 'E2'] }
     * @param {RouterStateOptions} options, e.g. { replace: true } to replace History entry
     */
    constructor(
        routeName: string,
        params?: StringMap,
        queryParams?: {
            [key: string]: any;
        },
        options?: RouterStateOptions
    );
    static create(jsRouterState: JsRouterState): RouterState;
    isEqual(other: RouterState): boolean;
}
export interface TransitionHook {
    (
        fromState: RouterState,
        toState: RouterState,
        routerStore: RouterStore
    ): Promise<void>;
}
export interface ErrorHook {
    (err: Error): any;
}
/**
 * A `Route` consists of a name, a URL matching pattern and optional
 * enter/exit hooks. The `RouterStore` is initialized with an array
 * of routes which it uses to transition between states.
 */
export interface Route {
    name: string;
    pattern: string;
    beforeExit?: TransitionHook;
    beforeEnter?: TransitionHook;
    onExit?: TransitionHook;
    onEnter?: TransitionHook;
}
/**
 * Holds the router state. It allows transitioning between states using
 * the `goTo()` method.
 */
export declare class RouterStore {
    rootStore: any;
    routes: Route[];
    notFoundState: RouterState;
    onError?: ErrorHook;
    routerState: RouterState;
    isTransitioning: boolean;
    constructor(
        rootStore: any,
        routes: Route[],
        notFoundState: RouterState,
        initialState?: JsRouterState
    );
    hydrate(state: JsRouterState): void;
    serialize(): JsRouterState;
    setErrorHook(onError: ErrorHook): void;
    /**
     * Requests a transition to a new state. Note that the actual transition
     * may be different from the requested one based on enter and exit hooks.
     */
    goTo(toState: RouterState): Promise<RouterState>;
    goTo(
        routeName: string,
        params?: StringMap,
        queryParams?: {
            [key: string]: any;
        },
        options?: RouterStateOptions
    ): Promise<RouterState>;
    goToNotFound(): Promise<RouterState>;
    getRoute(routeName: string): Route;
    getCurrentRoute(): Route;
    /**
     * Requests a transition from fromState to toState. Note that the
     * actual transition may be different from the requested one
     * based on enter and exit hooks.
     */
    private transition;
    private setRouterState;
}
