import { CustomerModel } from './customer.model';
import { DocumentTypeModel } from './document-type.model';

export interface Account {
  id: string;
  customerId: CustomerModel;
  typeId: DocumentTypeModel;
  balance: number;
  state: boolean;
  delatedAd?: Date | number;
}
