import { AccountEntity } from "src/persistence/entities/account.entity";
import { BaseRepositoryInterface } from "../base/base-repository.interface";

export interface AccountRepositoryInterface extends BaseRepositoryInterface<AccountEntity> {
    findByState(state: boolean): AccountEntity[];
    findByCustomer(customerId: string): AccountEntity[];
    findByAccountType(accountTypeId: string): AccountEntity[];
}