// import { Injectable, NotFoundException } from '@nestjs/common';
// import { DepositModel } from 'src/models';
// import { DepositEntity } from 'src/persistence/entities/deposite.entity';
// import { DepositeRepository } from 'src/persistence/repositories/deposite.repository';
// import { AccountService } from '../account/account.service';

// @Injectable()
// export class DepositService {
//     constructor(private readonly depositRepository: DepositeRepository, private readonly accountService: AccountService) { }
//     /**
//    * Crear un deposito
//    *
//    * @param {DepositModel} deposit
//    * @return {*}  {DepositEntity}
//    * @memberof DepositService
//    */
//     // createDeposit(deposit: DepositModel): DepositEntity {
//     //     if (this.accountService.getState(deposit.account.id)) {
//     //         deposit.dateTime = deposit.dateTime = new Date() 
//     //         return this.depositRepository.register(transfer)
//     //     }
//     //     else {
//     //         throw new NotFoundException("La cuenta no se encuentra activa")
//     //     }
//     // }

//     /**
//      * Borrar un deposito
//      *
//      * @param {string} depositId
//      * @memberof DepositService
//      */
//     deleteDeposit(depositId: string): void {
//         const deposit = this.depositRepository.findOneById(depositId)
//         if (deposit.deletedAt === undefined) {
//             this.depositRepository.delete(depositId, true)
//         }
//         else {
//             this.depositRepository.delete(depositId, false)
//         }
//     }

//     /**
//      * Obtener el historial de los depósitos en una cuenta
//      *
//      * @param {string} accountId
//      * @param {PaginationModel} pagination
//      * @param {DataRangeModel} [dataRange]
//      * @return {*}  {DepositEntity[]}
//      * @memberof DepositService
//      */
// //     getHistory(
// //         accountId: string,
// //         pagination: PaginationModel,
// //         dataRange?: DataRangeModel,
// //     ): DepositEntity[] {
// //         const arrayTransfer = this.depositRepository.findByDateRange(accountId, 0, Date.now())
// //         const arrayTransferReturn: DepositEntity[] = []
// //         let range = 0
// //         pagination.size = arrayTransfer.length;
// //         if (dataRange?.range === undefined) {
// //             range = 10
// //         }
// //         else {
// //             range = dataRange.range
// //         }
// //         pagination.numberPages = Math.round(pagination.size / range)
// //         for (let x = 1 + range * (pagination.actualPage - 1); x < 1 + range + (range * (pagination.actualPage - 1)); x++) {
// //             arrayTransferReturn.push(arrayTransfer[x-1])
// //         }
// //         return arrayTransferReturn
// //     }
// // }
// }