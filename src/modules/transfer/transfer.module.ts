import { Module } from "@nestjs/common";
import { TransferController } from "src/controllers/transfer/transfer.controller";
import { AccountTypeRepository } from "src/persistence/repositories/account-type.repository";
import { AccountRepository } from "src/persistence/repositories/account.repository";
import { TransferRespository } from "src/persistence/repositories/transfer.repository";
import { AccountService, TransferService } from "src/services";

@Module({
    controllers:[TransferController],
    providers:[TransferService,AccountService,TransferRespository, AccountRepository, AccountTypeRepository]
})
export class TransferModule{}