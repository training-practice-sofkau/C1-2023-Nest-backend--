interface generic<T> {
  register(t: T): T;
  update(id: string, entity: T): T;
  delete(id: string, soft?: boolean): void;
  findAll(): T[];
  findOneById(id: string): T;
}
