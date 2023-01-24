import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../entities";
import { BodyRepositoryAbstract } from "./abstract/abstrac-repository.abstract";

@Injectable()
export class AccountRepository extends BodyRepositoryAbstract<AccountEntity>{


    
    register(entity: AccountEntity): AccountEntity {
        throw new Error('This method is not implemented');
    }
    update(id: string, entity: AccountEntity): AccountEntity {
        throw new Error('This method is not implemented');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('This method is not implemented');
    }
    findAll(): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
    findOneById(id: string): AccountEntity {
        throw new Error('This method is not implemented');
    }
}