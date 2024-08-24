import { prepareContractCall } from "thirdweb";
import { contract } from "../../app/client";

export function bookReservation(
  storeId: number,
  reservationId: number,
  reservationDate: string
) {
  const transaction = prepareContractCall({
    contract,
    method: "bookReservation", // <- this gets inferred from the contract
    params: [BigInt(reservationId)],
  });
  return transaction;
}

export function getReservation(reservationId: number) {
  throw new Error("Not yet implemented");
}

export function cancelReservation(reservationId: number, userId: number) {
  throw new Error("Not yet implemented");
}
