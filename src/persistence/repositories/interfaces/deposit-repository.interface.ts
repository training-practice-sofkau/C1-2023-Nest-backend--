import { BaseRepositoryInterface } from './base/base-repository.interface';
import { CustomerEntity, DepositEntity } from 'src/persistence/entities';

export interface DepositInterface
extends BaseRepositoryInterface<DepositEntity>{}
