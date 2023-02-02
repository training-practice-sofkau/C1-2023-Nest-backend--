import { AccountTypeEntity } from 'src/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface AccountTypeRepositoryInterface
  extends BodyRepositoryInterface<AccountTypeEntity> {
  findByState(state: boolean): AccountTypeEntity[];
  findByName(name: string): AccountTypeEntity[];
  findByStateId(id: string): boolean
}
