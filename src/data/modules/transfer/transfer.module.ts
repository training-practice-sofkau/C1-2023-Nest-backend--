import { Module } from "@nestjs/common";
import { AccountRepository, AccountTypeRepository, TransferRespository } from "src/business/persistence";
import { AccountService, TransferService } from "src/data/services";
import { TransferController } from "src/presentation";

@Module({
    controllers:[TransferController],
    providers:[TransferService,AccountService,TransferRespository, AccountRepository, AccountTypeRepository]
})
export class TransferModule{}