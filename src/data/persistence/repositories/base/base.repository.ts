export abstract class BaseRepository<E> {
  protected readonly database: Array<E>;

  constructor() {
    this.database = new Array<E>();
  }
}
