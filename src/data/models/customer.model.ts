import { DocumentTypeModel } from './document-type.model';

export interface CustomerModel {
  id: string;
  documentType: DocumentTypeModel;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  state: boolean;
  deletedAt?: Date | number; //? me indica que no es obligatorio el dato
}
