import { BaseRepositoryInterface } from './base/base-repository.interface';
import { AccountEntity } from 'src/persistence/entities';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountEntity> {}
