import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../entities";
import { RepositoryBodyAbstract } from "./abstract/abstrac-repository.abstract";

@Injectable()
export class AccountRepository extends RepositoryBodyAbstract{ 
    constructor(entity:[]){
        super(entity)
    }
}