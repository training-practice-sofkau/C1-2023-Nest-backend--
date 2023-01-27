import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity } from 'src/persistence/entities';
import { AccountRepository } from 'src/persistence/repositories/account.repository';
import { AccountTypeRepository } from 'src/persistence/repositories/account-type.repository';

@Injectable()
export class AccountService {
    constructor(private readonly accountRepository: AccountRepository, private readonly accountTypeRepository: AccountTypeRepository) { }
    /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
    createAccount(account: AccountModel): AccountEntity {
        const newAccount = new AccountEntity();
        newAccount.customer = account.customer;
        newAccount.accountType = account.accountType;
        return this.accountRepository.register(newAccount);
    }

    /**
     * Obtener el balance de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {number}
     * @memberof AccountService
     */
    getBalance(accountId: string): number {
        const account = this.accountRepository.findOneById(accountId)
        if (account) {
            if (account.state) {
                return account.balance;
            }
            else {
                throw new NotFoundException("La cuenta no se encuentra activa")
            }
        }
        else {
            throw new NotFoundException("No se encontro ninguna cuenta con ese ID")
        }
    }

    /**
     * Agregar balance a una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    addBalance(accountId: string, amount: number): void {
        const balance = this.getBalance(accountId);
        if (balance) {
            const account = this.accountRepository.findOneById(accountId)
            account.balance = account.balance + amount;
            this.accountRepository.update(accountId, account)
        }
    }

    /**
     * Remover balance de una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    removeBalance(accountId: string, amount: number): void {
        const balance = this.getBalance(accountId);
        if (balance) {
            const account = this.accountRepository.findOneById(accountId)
            if (account.balance >= amount) {
                account.balance = account.balance - amount;
            }
            else {
                throw new NotFoundException("No se puede realizar esta operacion")
            }

            this.accountRepository.update(accountId, account)
        }
    }

    /**
     * Verificar la disponibilidad de un monto a retirar en una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @return {*}  {boolean}
     * @memberof AccountService
     */
    verifyAmountIntoBalance(accountId: string, amount: number): boolean {
        const balance = this.getBalance(accountId);
        if (balance && balance >= amount) {
            return true
        }
        else {
            return false
        }
    }

    /**
     * Obtener el estado de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {boolean}
     * @memberof AccountService
     */
    getState(accountId: string): boolean {
        const accountState = this.accountRepository.findByStateId(accountId)
        if (accountState != undefined) {
            return accountState
        }
        else {
            throw new NotFoundException("No se encontro cuenta con ese ID")
        }
    }

    /**
     * Cambiar el estado de una cuenta
     *
     * @param {string} accountId
     * @param {boolean} state
     * @memberof AccountService
     */
    changeState(accountId: string, state: boolean): void {
        const account = this.accountRepository.findOneById(accountId)
        if (account) {
            const accountTypeState = this.accountTypeRepository.findByStateId(account.accountType.id)
            if (accountTypeState) {
                account.state = state
            }
            else {
                throw new NotFoundException("No se puede cambiar de estado, ya que el tipo de cuenta esta en " + accountTypeState)
            }
        }

    }

    /**
     * Obtener el tipo de cuenta de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    getAccountType(accountId: string): AccountTypeEntity {
        const account = this.accountRepository.findOneById(accountId)
        return account.accountType
    }

    /**
     * Cambiar el tipo de cuenta a una cuenta
     *
     * @param {string} accountId
     * @param {string} accountTypeId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    changeAccountType(
        accountId: string,
        accountTypeId: string,
    ): AccountTypeEntity {
        const account = this.accountRepository.findOneById(accountId)
        const accountType = this.accountTypeRepository.findOneById(accountTypeId)
    }

    /**
     * Borrar una cuenta
     *
     * @param {string} accountId
     * @memberof AccountService
     */
    deleteAccount(accountId: string): void {
        throw new Error('This method is not implemented');
    }
}
