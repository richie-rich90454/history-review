import type { ApiService } from "./ApiService";

/**
 * Generic CRUD service over a REST resource path (e.g. "civilizations").
 * All requests go through the shared {@link ApiService} ky instance, which
 * handles JWT injection and 401 redirection.
 */
export class EntityService<T> {
    private readonly api: ApiService;
    private readonly resourcePath: string;

    constructor(api: ApiService, resourcePath: string) {
        this.api = api;
        this.resourcePath = resourcePath;
    }

    async list(): Promise<T[]> {
        return this.api.getKy().get(this.resourcePath).json<T[]>();
    }

    async get(id: string | number): Promise<T> {
        return this.api.getKy().get(`${this.resourcePath}/${id}`).json<T>();
    }

    async create(payload: Partial<T>): Promise<T> {
        return this.api
            .getKy()
            .post(this.resourcePath, { json: payload })
            .json<T>();
    }

    async update(id: string | number, payload: Partial<T>): Promise<T> {
        return this.api
            .getKy()
            .put(`${this.resourcePath}/${id}`, { json: payload })
            .json<T>();
    }

    async remove(id: string | number): Promise<void> {
        await this.api.getKy().delete(`${this.resourcePath}/${id}`);
    }
}
