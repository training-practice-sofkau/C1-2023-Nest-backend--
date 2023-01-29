import { Module } from "@nestjs/common";
import { DepositController } from "src/controllers/deposit/deposit.controller";
import { DepositService } from "src/services/deposit/deposit.service";

@Module({
    imports:[DepositModule],
    controllers: [DepositController],
    providers: [DepositService]
})
export class DepositModule { }