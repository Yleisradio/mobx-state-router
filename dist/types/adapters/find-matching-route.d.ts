import { JsRouterState, Route } from '../router-store';
import { Location } from 'history';
export declare const findMatchingRoute: (
    location: Location,
    routes: Route[]
) => JsRouterState | undefined;
