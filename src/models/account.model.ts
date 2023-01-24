import { CustomerModel } from './';
import { DocumentTypeModel } from './';

export interface AccountModel {
  id: string;
  customer: CustomerModel;
  documentType: DocumentTypeModel;
  balance: number;
  state: boolean;
  deletedAt?: Date | number;
}
