import { v4 as uuid } from 'uuid';
import { Account } from 'src/models/account.model';
import { AccountTypeModel } from 'src/models/account-type.model';
import { CustomerEntity } from './customer.entity';
import { CustomerModel, DocumentTypeModel } from 'src/models';

export class AccountEntity implements Account {
  id: string;
  customerId: CustomerModel;
  typeId: DocumentTypeModel;
  balance: number;
  state: boolean;
  delatedAd?: number | Date | undefined;
}
