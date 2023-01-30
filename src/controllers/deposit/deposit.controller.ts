import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DepositModel } from 'src/models';
import { DataRangeModel } from 'src/models/data-range.model';
import { PaginationModel } from 'src/models/pagination.model';
import { DepositEntity } from 'src/persistence/entities/deposite.entity';
import { DepositService } from 'src/services/deposit/deposit.service';

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
    @Post()
    async createDeposit(@Body() deposit: DepositModel): Promise<DepositEntity> {
        try {
            return await this.depositService.createDeposit(deposit);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    /**
     * Borrar un deposito
     *
     * @param {string} depositId
     * @memberof DepositController
     */
    @Delete(':id')
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
    @Get('/history/:accountId')
    async getHistory(
        @Param('accountId') accountId: string,
        @Body() pagination: PaginationModel,
        @Body() dataRange?: DataRangeModel,
    ): Promise<DepositEntity[]> {
        return await this.depositService.getHistory(accountId, pagination, dataRange);
    }
}
