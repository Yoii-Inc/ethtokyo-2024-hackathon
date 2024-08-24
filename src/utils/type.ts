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
