import { contract } from "@/app/client";
import { prepareContractCall } from "thirdweb";

export async function registerReservationSlot(
  shopId: number,
  deposits: number
) {
  const transaction = prepareContractCall({
    contract,
    method: "addReservationSlot",
    params: [BigInt(shopId), BigInt(deposits)],
  });
  return transaction;
}
