import { Module } from "@nestjs/common";
import { TransferController } from "src/controllers/transfer/transfer.controller";
import { TransferService } from "src/services/transfer/transfer.service";

@Module({
    imports:[TransferModule],
    controllers:[TransferController],
    providers:[TransferService]
})
export class TransferModule{}