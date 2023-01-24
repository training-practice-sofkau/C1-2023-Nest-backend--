import { DocumentTypeEntity } from "src/persistence/entities";

interface IDocumentTypeRepository {
    register(entity: DocumentTypeEntity): DocumentTypeEntity;
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity;
    delete(id: string, soft?: boolean): void;
    findAll(): DocumentTypeEntity[];
    findOneById(id: string): DocumentTypeEntity;
  }
  