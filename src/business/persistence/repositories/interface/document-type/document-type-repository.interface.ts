import { DocumentTypeEntity } from 'src/business/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface DocumentTypeRepositoryInterface
  extends BodyRepositoryInterface<DocumentTypeEntity> {
  findByState(state: boolean): DocumentTypeEntity[];
  findByName(name: string): DocumentTypeEntity[]
}
