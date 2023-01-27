import {base} from

export astract class base<T> implements base<T> {
    private readonly database: Array<T>;

  constructor(repository: Array<T> ) {
    this._repository = repository;

  }


  register(entity: depositEntity): depositEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: depositEntity): depositEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }

  findAll(): depositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): depositEntity {
    throw new Error('This method is not implemented');
  }
}