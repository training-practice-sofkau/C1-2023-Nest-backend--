import { DocumentTypeEntity } from 'src/data/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface DocumentTypeRepositoryInterface
  extends BodyRepositoryInterface<DocumentTypeEntity> {
  findByState(state: boolean): DocumentTypeEntity[];
  findByName(name: string): DocumentTypeEntity[]
}
