import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { DepositEntity } from "src/business/persistence";
import { DepositService, NewDepositDTO } from "src/data";

@Controller("deposit")
export class DepositController {
    constructor(private readonly depositService: DepositService) {
    }

    @Get()
    findAll(){
        return this.depositService.findAll()
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

    @Delete(":id")
    deleteDeposit(@Param("id", new ParseUUIDPipe()) id:string):void{
        return this.depositService.deleteDeposit(id)
    }
}