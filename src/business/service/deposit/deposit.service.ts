import { Injectable, NotFoundException } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { DepositEntity } from 'src/data/persistence/entities';
import {
  DepositRepository,
  AccountRepository,
} from 'src/data/persistence/repository';
import { NewDepositDTO } from '../../dtos/new-deposit.dto';
import { AccountService } from '../account';
@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService,
  ) {}

  mapDeposit(deposit: NewDepositDTO): DepositEntity {
    const depos = new DepositEntity(); // declarar la entidad
    const account = this.accountRepository.findOneById(deposit.accountId); //se crea atributo y se ingresa al repositorio a buscar el id
    depos.account = account; // se iguala el atributo a lo que busca en este caso seria el id
    depos.amount = deposit.amount; // se iguala el atributo en la busqueda del amount
    return depos;
  }
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: NewDepositDTO): DepositEntity {
    const newDeposit = new DepositEntity();
    const newAccount = this.accountService.findOneById(deposit.accountId);
    if (this.accountService.getState(deposit.accountId)) {
      newDeposit.amount = deposit.amount;
      newDeposit.dateTime = Date.now();
      newAccount.id = deposit.accountId;
      newDeposit.account = newAccount;
      this.accountService.addBalance(deposit.accountId, deposit.amount);
      return this.depositRepository.register(newDeposit);
    } else {
      throw new NotFoundException('La cuenta no se encuentra activa');
    }
  }
  findAll(): DepositEntity[] {
    return this.depositRepository.findAll();
  }

  findOneById(id: string): DepositEntity {
    return this.depositRepository.findOneById(id);
  }
  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    const deposit = this.depositRepository.findOneById(depositId);
    if (deposit.deletedAt === undefined) {
      this.depositRepository.delete(depositId, true);
    } else {
      this.depositRepository.delete(depositId, false);
    }
  }
  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dateRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    const arrayTransfer = this.depositRepository.findByDateRange(
      accountId,
      0,
      Date.now(),
    );
    const arrayTransferReturn: DepositEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }
  getByCustomerId(id: string): DepositEntity[] {
    return this.depositRepository.getByCustomerId(id);
  }
}
