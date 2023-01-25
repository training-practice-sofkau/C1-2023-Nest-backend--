import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { TransferRepositoryInterface } from './interface/transfer/transfer-repository.interface';

@Injectable()
export class TransferRespository
  extends BodyRepositoryAbstract<TransferEntity>
  implements TransferRepositoryInterface {
    register(entity: TransferEntity): TransferEntity {
        throw new Error('This method is not implemented');
    }
    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error('This method is not implemented');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('This method is not implemented');
    }
    findAll(): TransferEntity[] {
        throw new Error('This method is not implemented');
    }
    findOneById(id: string): TransferEntity {
        throw new Error('This method is not implemented');
    }
  }
