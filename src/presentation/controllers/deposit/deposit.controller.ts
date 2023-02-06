import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { DataRangeModel, PaginationModel } from "src/business/models";
import { DepositEntity } from "src/business/persistence";
import { DataRangeEntity } from "src/business/persistence/entities/data-range.entity";
import { PaginationEntity } from "src/business/persistence/entities/pagination.entity";
import { DepositService, NewDepositDTO } from "src/data";

@Controller("deposit")
export class DepositController {
    constructor(private readonly depositService: DepositService) {
    }

    @Get()
    findAll() {
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

    @Post("/getHistory/:id")
    getHistory(@Param("id", new ParseUUIDPipe()) id: string, @Body() data: { actualPage: number, range: number }): DepositEntity[] {
        const newPagination = new PaginationEntity()
        newPagination.actualPage = data.actualPage;
        const newDataRange = new DataRangeEntity()
        newDataRange.range = data.range;
        return this.depositService.getHistory(id, newPagination, newDataRange)
    }

    @Put(":id")
    updateDeposit(@Param("id", new ParseUUIDPipe()) id: string, @Body() deposit: NewDepositDTO): DepositEntity {
        return this.depositService.updateDeposit(id, deposit)
    }

    @Delete(":id")
    deleteDeposit(@Param("id", new ParseUUIDPipe()) id: string): void {
        return this.depositService.deleteDeposit(id)
    }
}