export abstract class BaseRepository<Entity> {
  register(entity: Entity): Entity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: Entity): Entity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): Entity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): Entity {
    throw new Error('This method is not implemented');
  }
}
