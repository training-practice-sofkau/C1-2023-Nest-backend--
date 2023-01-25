import { CustomerEntity } from "src/persistence/entities";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface CustomerRepositoryInterface extends BodyRepositoryInterface<CustomerEntity>{}