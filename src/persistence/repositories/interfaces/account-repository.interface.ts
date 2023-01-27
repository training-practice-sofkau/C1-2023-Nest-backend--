import { AccountEntity } from 'src/persistence/entities/account.entity';
import { BaseRepositoryInterface } from './base/base-repository.interface';

export type AccountRepositoryInterface = BaseRepositoryInterface<AccountEntity>;
