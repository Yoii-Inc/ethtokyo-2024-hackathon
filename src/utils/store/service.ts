import { contract } from "@/app/client";
import { prepareContractCall } from "thirdweb";

export async function registerReservationSlot(
  storeId: number,
  deposits: number
) {
  const transaction = prepareContractCall({
    contract,
    method: "addReservationSlot",
    params: [BigInt(storeId), BigInt(deposits)],
  });
  return transaction;
}
