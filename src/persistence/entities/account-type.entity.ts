import { AccountEntity, AccountTypeModel} from './account.entity';
import { v4 as uuid } from 'uuid';
import { CustomerModel } from 'src/models';
import { AccountModel } from 'src/models/account.model';

export class AccountEntity implements AccountModel{
    
    id = uuid();
    customer_id: CustomerModel;
    acount_type_id: AccountTypeModel;
    balance:number;
    state = true;
    deleted_at: Date | number;
}