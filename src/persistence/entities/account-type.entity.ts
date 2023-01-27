import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from 'src/models/account-type.model';

export class AccountTypeEntity implements AccountTypeModel {
  idTyPe: string;
  name: string;
  state: boolean;
  id = uuid();
}
