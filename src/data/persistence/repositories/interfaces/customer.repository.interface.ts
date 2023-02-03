import { CustomerEntity } from "../../entities";
import { BaseRepositoryInterface } from "../base/base-repository.interface";


export interface CustomerRepositoryInterface extends BaseRepositoryInterface<CustomerEntity> {
    findOneByEmailAndPassword(email: string, password: string): boolean;
    findOneByDocumentTypeAndDocument(documentTypeId: string,document: string,): CustomerEntity;
    findOneByEmail(email: string): CustomerEntity;
    findOneByPhone(phone: string): CustomerEntity;
    findByState(state: boolean): CustomerEntity[];
    findByFullName(fullName: string): CustomerEntity[];
}