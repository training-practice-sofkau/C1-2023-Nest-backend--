import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from 'src/data/persistence/entities';
import {
  DepositRepository,
  AccountRepository,
} from 'src/data/persistence/repository';
import { NewDepositDTO } from '../../dtos/new-deposit.dto';
@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository,
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
    const depositNew = this.mapDeposit(deposit);
    return this.depositRepository.register(depositNew);
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
  // getHistory(
  //   accountId: string,
  //   pagination?: Pagination,
  //   dataRange?: DateRange,
  // ): DepositEntity[] {
  //   if (dataRange) {
  //     return this.depositRepository.findByDataRange(
  //       accountId,
  //       dataRange?.dateInit,
  //       dataRange?.dateEnd,
  //       pagination,
  //     );
  //   } else return this.depositRepository.findByAccountId(accountId, pagination);
  // }
}
