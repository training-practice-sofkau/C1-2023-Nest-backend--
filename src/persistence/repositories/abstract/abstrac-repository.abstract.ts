import { BodyRepositoryInterface } from "../interface/model-repository.interface";

export abstract class RepositoryBodyAbstract implements BodyRepositoryInterface {
    private readonly database: [];
    constructor(entity: []) {
        this.database = entity
    }
    register(entity: any) {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: any) {
        throw new Error("Method not implemented.");
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    findAll(): [] {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string) {
        throw new Error("Method not implemented.");
    }

}