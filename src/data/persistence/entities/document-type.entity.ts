import { v4 as uuid } from 'uuid';
import { DocumentTypeModel } from 'src/data/models';

export class DocumentTypeEntity implements DocumentTypeModel {
    id = uuid();
    name: string;
    state = true;
}