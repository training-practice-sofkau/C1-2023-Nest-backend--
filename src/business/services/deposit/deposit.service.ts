import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService, CreateDepositDto } from 'src/business';
import { DateRangeModel, PaginationModel } from 'src/data/models';
import { DepositEntity } from 'src/data/persistence/entities';
import { DepositRepository } from 'src/data/persistence/repositories';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class DepositService {
  constructor(
    private readonly accountService: AccountService,
    private readonly depositRepository: DepositRepository,
  ) {}

  //Retorna todos los depositos registrados a la fecha
  getAll(
    customerId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): DepositEntity[] {
    return this.getHistoryByCustomer(customerId, pagination, dateRange);
  }

  //Creacion de un deposito y actualiza el balance de la cuenta afectada
  createDeposit(customerId: string, deposit: CreateDepositDto): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = this.accountService.getAccountById(
      customerId,
      deposit.accountId,
    );
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = Date.now();
    this.depositRepository.register(newDeposit);
    this.accountService.addBalance(newDeposit.account.id, newDeposit.amount);
    return newDeposit;
  }

  //Eliminacion de un deposito
  deleteDeposit(customerId: string, depositId: string): void {
    const account = this.depositRepository.findOneById(depositId).account;
    this.accountService.getAccountById(customerId, account.id);
    this.depositRepository.delete(depositId, true);
  }

  //Retorna el listado de depositos relacionados a la cuenta de acuerdo a la paginacion solicitada
  getHistory(
    customerId: string,
    accountId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): DepositEntity[] {
    if (!pagination) {
      throw new BadRequestException(`Se debe paginar la solicitud`);
    }
    this.accountService.getAccountById(customerId, accountId);
    let currentDeposits: DepositEntity[];
    if (dateRange) {
      const dateInit = dateRange.dateInit ?? new Date('1999-01-01').getTime();
      const dateEnd = dateRange.dateEnd ?? Date.now();
      const deposits = this.depositRepository.findByAccountId(accountId);
      currentDeposits = deposits.filter(
        ({ dateTime }) => dateTime >= dateInit && dateTime <= dateEnd,
      );
    } else {
      currentDeposits = this.depositRepository.findByAccountId(accountId);
    }
    return this.historyPagination(currentDeposits, pagination);
  }

  getHistoryByCustomer(
    customerId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): DepositEntity[] {
    const accounts = this.accountService.getAccountsByCustomer(customerId);
    const totalDeposits: DepositEntity[] = [];
    for (const account of accounts) {
      totalDeposits.push(
        ...this.getHistory(customerId, account.id, pagination, dateRange),
      );
    }
    return totalDeposits;
  }

  private historyPagination(
    depositsList: DepositEntity[],
    pagination: PaginationModel,
  ): DepositEntity[] {
    const currentPage = pagination?.currentPage ?? 1;
    const range = pagination?.range ?? 10;
    const deposits: DepositEntity[] = [];
    const start = currentPage * range - range;
    const end = start + range;
    for (let i = start; i < end; i++) {
      depositsList[i] ? deposits.push(depositsList[i]) : (i = end);
    }
    return deposits;
  }
}
