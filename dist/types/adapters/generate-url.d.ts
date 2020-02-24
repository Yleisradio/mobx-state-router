import { RouterState, RouterStore } from '../router-store';
/**
 * Generates a URL from a pattern and parameters.
 * For example,
 *     generateUrl('/departments/:id', { id: 'electronics' })
 *     => '/departments/electronics'
 */
export declare const generateUrl: (pattern?: string, params?: {}, queryParams?: {}) => string;
/**
 * Converts the supplied routerState to a URL
 * @param {RouterStore} routerStore
 * @param {RouterState} routerState
 * @returns {string}
 */
export declare const routerStateToUrl: (routerStore: RouterStore, routerState: RouterState) => string;
