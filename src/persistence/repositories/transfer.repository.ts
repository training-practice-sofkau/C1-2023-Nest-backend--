import { Injectable } from "@nestjs/common";
import { TransferEntity } from "../entities";

@Injectable()
export class TransferRespository {
    private readonly database: Array<TransferEntity>;

    constructor() {
        this.database = new Array<TransferEntity>();
    }
}