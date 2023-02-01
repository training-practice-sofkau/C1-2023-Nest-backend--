import { BodyRepositoryInterface } from '../interface/model-repository.interface';

export abstract class BodyRepositoryAbstract<entity>
  implements BodyRepositoryInterface<entity>
{
  protected readonly database: Array<entity>;
  
  constructor() {
    this.database = new Array<entity>();
  }
  register(entity: entity): entity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: entity): entity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): entity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): entity {
    throw new Error('Method not implemented.');
  }
}
