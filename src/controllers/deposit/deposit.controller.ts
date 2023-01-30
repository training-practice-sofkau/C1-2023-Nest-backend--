import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { NewDepositDTO } from "src/dtos/deposit/deposit.dto";
import { DepositEntity } from "src/persistence/entities";
import { DepositService } from "src/services";

@Controller("deposit")
export class DepositController {
    constructor(private readonly depositService: DepositService) {
    }
    @Get(":id")
    getDeposit(@Param("id", new ParseUUIDPipe()) id: string): DepositEntity {
        return this.depositService.findOneById(id)
    }

    @Post()
    createDeposit(@Body() deposit: NewDepositDTO): DepositEntity {
        return this.depositService.createDeposit(deposit)
    }

    @Put(":id")
    updateDeposit(@Param("id", new ParseUUIDPipe()) id: string, @Body() deposit: NewDepositDTO): DepositEntity {
        return this.depositService.updateDeposit(id, deposit)
    }
}