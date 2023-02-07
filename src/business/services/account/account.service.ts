import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from 'src/business/dtos';
import { PaginationModel } from 'src/data';
import {
  AccountEntity,
  AccountTypeEntity,
} from 'src/data/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  TransferRepository,
} from 'src/data/persistence/repositories';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly transferRepository: TransferRepository,
    private readonly depositRepository: DepositRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}
  //Retorna el liestado de todas las cuentas, este metodo solo se usaria para administradores pero por ahora todos
  getAllAccounts(paginationModel: PaginationModel): AccountEntity[] {
    const accounts = this.accountRepository.findAll();
    return this.historyPagination(accounts, paginationModel);
  }

  //Retorna la cuenta segun el id
  getAccountById(accountId: string): AccountEntity {
    return this.accountRepository.findOneById(accountId);
  }

  //Creacion de cuentas
  createAccount(account: CreateAccountDto): AccountEntity {
    const currentAccountType = this.getAccountType(account.accountTypeId);
    const currentCustomer = this.customerRepository.findOneById(
      account.customerId,
    );
    const newAccount = new AccountEntity();
    newAccount.accountType = currentAccountType;
    newAccount.customer = currentCustomer;
    newAccount.balance = 0;
    this.accountRepository.register(newAccount);
    return newAccount;
  }

  //Consultar solo cuentas activas
  private getOneActiveState(accountId: string): AccountEntity {
    if (!this.getState(accountId)) {
      throw new ConflictException('Cuenta inactiva');
    }
    const currentAccount = this.accountRepository.findOneById(accountId);
    return currentAccount;
  }

  //Obtención del balance por cuenta
  getBalance(accountId: string): number {
    const currentAccount = this.getOneActiveState(accountId);
    return currentAccount.balance;
  }

  //Agrega balance a la cuenta -- actualiza el balance
  addBalance(accountId: string, amount: number): void {
    const currentAccount = this.getOneActiveState(accountId);
    currentAccount.balance += amount;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Remueve o elimina balance de la cuenta -- resta valor a la cuenta
  removeBalance(accountId: string, amount: number): void {
    const currentAccount = this.getOneActiveState(accountId);
    if (this.verifyAmountToRemoveBalance(accountId, amount)) {
      throw new ConflictException('Saldo insuficiente');
    }
    currentAccount.balance -= amount;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Validar la disponibilidad del monto a retirar o a reducir
  verifyAmountToRemoveBalance(accountId: string, amount: number): boolean {
    return this.getBalance(accountId) < amount;
  }

  //Obtener el estado de una cuenta
  getState(accountId: string): boolean {
    const currentAccount = this.accountRepository.findOneById(accountId);
    return currentAccount.state;
  }

  //Actualiza o cambia el estado de una cuenta
  changeState(accountId: string, newState: boolean): void {
    const currentAccount = this.accountRepository.findOneById(accountId);
    if (this.accountRepository.findOneById(accountId).balance != 0) {
      throw new ConflictException('No se puede inactivar una cuenta con saldo');
    }
    currentAccount.state = newState;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Obtiene el tipo de cuenta de la cuenta informada
  getAccountType(accountTypeId: string): AccountTypeEntity {
    return this.accountTypeRepository.findOneById(accountTypeId);
  }

  //Cambiar el tipo de cuenta
  changeAccountType(accountId: string, accountTypeId: string): AccountEntity {
    const currentAccount = this.accountRepository.findOneById(accountId);
    const currentAccountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    currentAccount.accountType = currentAccountType;
    return this.accountRepository.upate(accountId, currentAccount);
  }

  //Eliminar una cuenta
  deleteAccount(accountId: string): void {
    const currentAccount = this.accountRepository.findOneById(accountId);
    const balance = currentAccount.balance;
    if (balance === 0) {
      const currentDeposits = this.depositRepository.findByAccountId(accountId);
      currentDeposits.forEach((d) => this.depositRepository.delete(d.id, true));
      const currentTransfersIncome =
        this.transferRepository.findByIncomeAccount(accountId);
      const currentTransfersOutcome =
        this.transferRepository.findByOutcomeAccount(accountId);
      const totalTransfers = {
        ...currentTransfersIncome,
        ...currentTransfersOutcome,
      };
      if (totalTransfers.length > 0) {
        for (const transfer of totalTransfers) {
          this.transferRepository.delete(transfer.id, true);
        }
      }
      this.accountRepository.delete(accountId, true);
      const totalAccounts = this.accountRepository.findByCustomer(
        currentAccount.customer.id,
      ).length;
      if (totalAccounts === 0)
        this.customerRepository.delete(currentAccount.customer.id);
    } else {
      throw new ConflictException(
        `No se puede eliminar la cuenta con el id ${accountId} ya que tiene saldo!`,
      );
    }
  }

  //Trae todas las cuentas relacionadas al cliente
  getAccountsByCustomer(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }

  private historyPagination(
    accountsList: AccountEntity[],
    pagination: PaginationModel,
  ): AccountEntity[] {
    const currentPage = pagination?.currentPage ?? 1;
    const range = pagination?.range ?? 10;
    const accounts: AccountEntity[] = [];
    const start = currentPage * range - range;
    const end = start + range;
    for (let i = start; i < end; i++) {
      accountsList[i] ? accounts.push(accountsList[i]) : (i = end);
    }
    return accounts;
  }
}
