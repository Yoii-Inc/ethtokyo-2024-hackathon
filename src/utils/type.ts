export interface User {
  id: number;
  name: string;
  walletAddress: string;
}

export interface Store {
  storeId: bigint;
  storeName: string;
  storeAdmin: string;
  loyaltyLogicContractAddress: string;
  loyaltyTokenContractAddress: string;
  loyaltyTokenName: string;
  loyaltyTokenAmount: bigint;
  storeImage: string;
  description: string;
  maxFee: number;
  minFee: number;
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
