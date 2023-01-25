import { DocumentTypeEntity } from 'src/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface DocumentTypeRepositoryInterface
  extends BodyRepositoryInterface<DocumentTypeEntity> {
  findByState(state: boolean): DocumentTypeEntity[];
}
