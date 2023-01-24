export interface BodyRepositoryInterface {
    register(entity: any): any;
    update(id: string, entity: any): any;
    delete(id: string, soft?: boolean): void;
    findAll(): [];
    findOneById(id: string): any;
}