import { DocumentTypeEntity } from "src/persistence/entities/document-type.entity";
import { BaseRepositoryInterface } from "../base/base-repository.interface";

export interface DocumentTypeRepositoryInterface extends BaseRepositoryInterface<DocumentTypeEntity> {
    findByName(name: string): DocumentTypeEntity[];
    findByState(state: boolean): DocumentTypeEntity[];
  }
  