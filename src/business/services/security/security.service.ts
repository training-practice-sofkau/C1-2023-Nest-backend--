// Libraries
import { Injectable } from '@nestjs/common';
import { NewCustomerDTO } from '../../dtos';

/**
 * Servicio para el sistema de seguridad del aplicativo
 *
 * @export
 * @class SecurityService
 */
@Injectable()
export class SecurityService {
  /**
   * Identificarse en el sistema
   *
   * @param {NewCustomerDTO} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: NewCustomerDTO): string {
    throw new Error('This method is not implemented');
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {NewCustomerDTO} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: NewCustomerDTO): string {
    throw new Error('This method is not implemented');
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    throw new Error('Method not implemented.');
  }
}
