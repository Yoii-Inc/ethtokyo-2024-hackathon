import { prepareContractCall } from "thirdweb";
import { Store } from "../type";
import { contract } from "../../app/client";

export async function registerStore(storeId: number, walletAddress: string) {
  const transaction = prepareContractCall({
    contract,
    method: "addStore",
    params: [BigInt(storeId), walletAddress],
  });
  return transaction;
}

export async function getStore(userId: string) {
  throw new Error("Not yet implemented");
}

export function updateStore(
  userId: string,
  newUserName: string,
  newWalletAddress: string
) {
  throw new Error("Not yet implemented");
}

export function deleteStore(userId: string) {
  throw new Error("Not implemented");
}
