import { Injectable } from "@nestjs/common";
import { DepositEntity } from "../entities";

@Injectable()
export class DepositRepository{
    private readonly database: Array<DepositEntity>;

  constructor() {
    this.database = new Array<DepositEntity>();
  }
}