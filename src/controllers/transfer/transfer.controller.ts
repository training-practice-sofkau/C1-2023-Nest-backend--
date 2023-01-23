import { Body, Controller, Get, Post } from "@nestjs/common";
import { TransferDTO } from "src/dtos/transfer/transfer.dto";

@Controller("transfer")
export class TransferController {
    @Get()
    getTransfers(): string {
        return "Devuelve todas las transferencias"
    }

    @Post()
    createTransfer(@Body() transfer: TransferDTO): string {
        return "Se crea un transferencia de: " + transfer.trf_outcome + "a :" + transfer.trf_income + "";
    }
}