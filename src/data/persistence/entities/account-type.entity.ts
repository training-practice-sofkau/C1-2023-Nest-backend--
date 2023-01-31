import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from 'src/data/models/account-type.model';

export class AccountTypeEntity implements AccountTypeModel {
  id = uuid();
  name: string;
  state: boolean;
}
