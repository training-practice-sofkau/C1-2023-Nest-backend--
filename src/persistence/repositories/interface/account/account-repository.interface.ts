import { AccountEntity } from "src/persistence/entities";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface AccountRepositoryInterface extends BodyRepositoryInterface<AccountEntity>{}
