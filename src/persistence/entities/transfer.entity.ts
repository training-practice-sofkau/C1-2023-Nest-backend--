import { AccountEntity } from './account-type.entity';



export class transferntity implements Transfermodels {
    id: string;
    outcome_id: AccountEntity;
    income_id: AccountEntity;
    amount:number;
    reason:string;
    date_time: Date | number;
    deleted_at: Date | number;

}
    