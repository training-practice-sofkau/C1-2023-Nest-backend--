export interface BaseRepositoryInterface<E> {
  register(entity: E): E;

  update(id: string, entity: E): E;

  delete(id: string, soft?: boolean): void;

  findAll(): E[];

  findOneById(id: string): E;
}
