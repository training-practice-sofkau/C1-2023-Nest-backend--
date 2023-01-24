export interface account {
    accId: string;
    customerId: string;
    typeId: string;
    balance: number;
    state: boolean;
    deletedAt: Date | number;
  }