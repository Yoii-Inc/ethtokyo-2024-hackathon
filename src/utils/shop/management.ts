import { prepareContractCall } from "thirdweb";
import { Shop } from "../type";
import { contract } from "../../app/client";

export async function registerShop(shopId: number, walletAddress: string) {
  const transaction = prepareContractCall({
    contract,
    method: "addStore",
    params: [BigInt(shopId), walletAddress],
  });
  return transaction;
}

export async function getShop(userId: string) {
  throw new Error("Not yet implemented");
}

export function updateShop(
  userId: string,
  newUserName: string,
  newWalletAddress: string
) {
  throw new Error("Not yet implemented");
}

export function deleteShop(userId: string) {
  throw new Error("Not implemented");
}
