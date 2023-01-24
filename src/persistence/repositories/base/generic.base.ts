export abstract class IGenericRepository<T> implements generic<T> {
  register(t: T): T {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: T): T {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): T[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): T {
    throw new Error('Method not implemented.');
  }
}
