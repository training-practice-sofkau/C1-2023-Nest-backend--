
import { AccountTypeEntity } from "src/persistence/entities/account-type.entity";
import { BaseRepositoryInterface } from "../base/base-repository.interface";

export interface AccountTypeRepositoryInterface extends  BaseRepositoryInterface<AccountTypeEntity> {
    findByState(state: boolean): AccountTypeEntity[];
    findByName(name: string): AccountTypeEntity[];
    register(entity: AccountTypeEntity): AccountTypeEntity
}