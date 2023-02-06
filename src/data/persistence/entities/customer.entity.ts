import { v4 as uuid  } from "uuid";
import { DocumentTypeEntity } from "./document-type.entity";
import { CustomerModel, DocumentTypeModel } from "src/data/models";

export class CustomerEntity implements CustomerModel {
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state: boolean;
    deletedAt?: Date| number;
    
}