import { createContext, useContext } from "solid-js";
import type { JSX } from "solid-js";
import { ApiService } from "../services/ApiService";
import { AuthService } from "../services/AuthService";
import { AnimationService } from "../services/AnimationService";
import { EntityService } from "../services/EntityService";

interface Services {
    api: ApiService;
    auth: AuthService;
    animation: AnimationService;
    /** Factory for typed CRUD services over a given resource path. */
    createEntityService: <T>(path: string) => EntityService<T>;
}

const ServicesContext = createContext<Services>();

/**
 * Creates the service singletons once and provides them via context.
 * `EntityService<T>` is exposed through a `createEntityService` factory so
 * consumers can bind it to whatever entity type they need.
 */
export function ServicesProvider(props: { children: JSX.Element }): JSX.Element {
    const api = new ApiService();
    const auth = new AuthService(api);
    const animation = new AnimationService();
    const createEntityService = <T,>(path: string): EntityService<T> =>
        new EntityService<T>(api, path);

    const services: Services = { api, auth, animation, createEntityService };

    return (
        <ServicesContext.Provider value={services}>
            {props.children}
        </ServicesContext.Provider>
    );
}

function useServices(): Services {
    const ctx = useContext(ServicesContext);
    if (!ctx) {
        throw new Error("Service hooks must be used within a ServicesProvider");
    }
    return ctx;
}

export function useApi(): ApiService {
    return useServices().api;
}

export function useAuth(): AuthService {
    return useServices().auth;
}

export function useAnimation(): AnimationService {
    return useServices().animation;
}

export function useEntity<T>(path: string): EntityService<T> {
    return useServices().createEntityService<T>(path);
}
