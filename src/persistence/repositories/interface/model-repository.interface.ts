export interface BodyRepositoryInterface<Entity> {
    register(entity: Entity): Entity;
    update(id: string, entity: Entity): Entity;
    delete(id: string, soft?: boolean): void;
    findAll(): Entity[];
    findOneById(id: string): Entity;
}