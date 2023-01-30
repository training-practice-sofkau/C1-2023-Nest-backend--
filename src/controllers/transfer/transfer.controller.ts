import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { NewTransferDTO } from "src/dtos/transfer/new-transfer.dto";
import { TransferEntity } from "src/persistence/entities";
import { TransferService } from "src/services";

@Controller("transfer")
export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @Get()
    findAll(){
        return this.transferService.findAll()
    }

    @Get(":id")
    findOneById(@Param("id", new ParseUUIDPipe()) id:string){
        return this.transferService.findOneById(id)
    }

    @Post()
    createTransfer(@Body() transfer: NewTransferDTO): TransferEntity {
        return this.transferService.createTransfer(transfer)
    }
}