import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';

@Injectable()
export class AccountTypeRepository {
    private readonly database: Array<AccountTypeEntity>;

    constructor() {
        this.database = new Array<AccountTypeEntity>();
    }
}