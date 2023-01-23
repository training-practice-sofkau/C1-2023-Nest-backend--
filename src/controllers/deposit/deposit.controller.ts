import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DepositDTO } from "src/dtos/deposit/deposit.dto";

@Controller("deposit")
export class DepositController {
    @Get(":id")
    getDeposit(@Param("id") id: string): string {
        return "Devuelve el deposito con ID: " + id
    }

    @Post()
    createDeposit(@Body() deposit: DepositDTO): string {
        return "Se crea un deposito con ID " + deposit.dep_id + " en la cuenta " + deposit.account_id
    }
}