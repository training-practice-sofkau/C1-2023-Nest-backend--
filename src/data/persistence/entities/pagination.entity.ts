import { PaginationModel } from '../../models/pagination.model';
export class PaginationEntity implements PaginationModel {
  size: number ;
  numberPages: number;
  actualPage: number;
}