import { CustomerEntity } from "src/persistence/entities";
import { BaseRepositoryInterface } from "../base/base-repository.interface";


export interface CustomerRepositoryInterface extends BaseRepositoryInterface<CustomerEntity> {
    
}