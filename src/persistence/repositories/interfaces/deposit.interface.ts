export interface DepositInterface<T> {
  register(entity: T): T;
  upate(id: string, entity: T): T;
  delete(id: string, soft?: boolean): void;
  findAll(): Array<T>;
  findOneById(id: string): T;
}
