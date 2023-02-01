import { Module } from "@nestjs/common";
import { AccountRepository, AccountTypeRepository, TransferRespository } from "src/data/persistence";
import { AccountService, TransferService } from "src/business/services";
import { TransferController } from "src/presentation/controllers";

@Module({
    controllers:[TransferController],
    providers:[TransferService,AccountService,TransferRespository, AccountRepository, AccountTypeRepository]
})
export class TransferModule{}