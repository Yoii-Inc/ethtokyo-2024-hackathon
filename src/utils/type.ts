export interface User {
  id: number;
  name: string;
  walletAddress: string;
}

export interface Store {
  storeId: bigint;
  storeName: string;
  storeAdmin: string;
}

export interface Reservation {
  reservationId: bigint;
  storeId: bigint;
  datetime: bigint;
  customer: string;
  requiredDeposit: bigint;
  currentDeposit: bigint;
  serviceFee: bigint;
  paid: boolean;
}
