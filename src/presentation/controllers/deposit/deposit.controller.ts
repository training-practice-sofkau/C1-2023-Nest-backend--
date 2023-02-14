import { DepositService } from 'src/business/services/deposit/deposit.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { DepositEntity } from 'src/data/persistence/entities/deposite.entity';
import { NewDepositDTO } from 'src/business/dtos/deposit.dro';
import { PaginationEntity } from 'src/data/persistence/entities/pagination.entity';
import { DataRangeEntity } from 'src/data/persistence/entities/data_range.entity';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) { }

    /**
     * Crear un deposito
     *
     * @param {DepositModel} deposit
     * @return {*}  {DepositEntity}
     * @memberof DepositController
     */
    @Post('create')
    createDeposit(@Body() deposit: NewDepositDTO): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

    /**
     * Borrar un deposito
     *
     * @param {string} depositId
     * @memberof DepositController
     */
    @Delete('delete/:id')
    deleteDeposit(@Param('id') depositId: string): void {
        this.depositService.deleteDeposit(depositId);
    }

    /**
     * 
     *
     * @param {string} accountId
     * @param {PaginationModel} pagination
     * @param {DataRangeModel} [dataRange]
     * @return {*}  {DepositEntity[]}
     * @memberof DepositController
     */
    @Post('/gethistory/:id')
    getHistory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ): DepositEntity[] {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    newPagination.numberPages = data.range;
    return this.depositService.getHistory(id, newPagination);
  }
}
