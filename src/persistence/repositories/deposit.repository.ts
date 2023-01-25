import { Injectable } from "@nestjs/common";
import { DepositEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { DepositRepositoryInterface } from "./interface/deposit/deposit-repository.interface";

@Injectable()
export class DepositRepository extends BodyRepositoryAbstract<DepositEntity> implements DepositRepositoryInterface {
  register(entity: DepositEntity): DepositEntity {
    throw new Error('This method is not implemented');
  }
  update(id: string, entity: DepositEntity): DepositEntity {
    throw new Error('This method is not implemented');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }
  findAll(): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
  findOneById(id: string): DepositEntity {
    throw new Error('This method is not implemented');
  }
}