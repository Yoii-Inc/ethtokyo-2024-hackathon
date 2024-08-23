import { prepareContractCall } from "thirdweb";
import { contract } from "../../app/client";

export function makeReservation(
  userId: number,
  storeId: number,
  reservationDate: string,
  depositAmount: number
) {
  const transaction = prepareContractCall({
    contract,
    method: "makeReservation", // <- this gets inferred from the contract
    params: [BigInt(depositAmount)],
  });
  return transaction;
}

export function getReservation(reservationId: number) {
  throw new Error("Not yet implemented");
}

export function cancelReservation(reservationId: number, userId: number) {
  throw new Error("Not yet implemented");
}
