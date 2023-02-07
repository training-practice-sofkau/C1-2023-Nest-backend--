import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { DataRangeEntity, PaginationEntity, TransferEntity } from "src/data/persistence";
import { NewTransferDTO } from "src/business/dtos";
import { TransferService } from "src/business/services";

@Controller("transfer")
export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @Get()
    findAll() {
        return this.transferService.findAll()
    }

    @Get(":id")
    findOneById(@Param("id", new ParseUUIDPipe()) id: string) {
        return this.transferService.findOneById(id)
    }

    @Post()
    createTransfer(@Body() transfer: NewTransferDTO): TransferEntity {
        return this.transferService.createTransfer(transfer)
    }

    @Post("/historyOut/:id")
    getHistoryOut(@Param("id", new ParseUUIDPipe()) id: string, @Body() data: { actualPage: number, range: number }) {
        const newPagination = new PaginationEntity()
        newPagination.actualPage = data.actualPage;
        const newDataRange = new DataRangeEntity()
        newDataRange.range = data.range;
        return this.transferService.getHistoryOut(id, newPagination, newDataRange)
    }

    @Post("/historyIncome/:id")
    getHistoryIncome(@Param("id", new ParseUUIDPipe()) id: string, @Body() data: { actualPage: number, range: number }) {
        const newPagination = new PaginationEntity()
        newPagination.actualPage = data.actualPage;
        const newDataRange = new DataRangeEntity()
        newDataRange.range = data.range;
        return this.transferService.getHistoryIn(id, newPagination, newDataRange)
    }
}