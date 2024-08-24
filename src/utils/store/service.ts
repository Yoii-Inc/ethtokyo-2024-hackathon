import { bookingContract } from "@/app/client";
import { prepareContractCall } from "thirdweb";

export async function registerReservationSlot(
  storeId: number,
  datetime: number,
  deposit: number,
  serviceFee: number
) {
  const transaction = prepareContractCall({
    contract: bookingContract,
    method: "addReservationSlot",
    params: [
      BigInt(storeId),
      BigInt(datetime),
      BigInt(deposit),
      BigInt(serviceFee),
    ],
  });
  return transaction;
}
