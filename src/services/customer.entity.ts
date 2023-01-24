import { v4 as uuid  } from "uuid";
import { DocumentTypeEntity } from "./document-type.entity";
import { CustomerModel, DocumentTypeModel } from "src/models";

export class CustomeEntity implements CustomerModel {
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state: true;
    deletedAt?: number | Date;
    
}