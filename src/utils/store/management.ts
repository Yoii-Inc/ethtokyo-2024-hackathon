import { prepareContractCall, readContract } from "thirdweb";
import { Reservation, Store } from "../type";
import { contract } from "../../app/client";

export async function addStore(storeName: string) {
  const transaction = prepareContractCall({
    contract,
    method: "addStore",
    params: [storeName],
  });
  return transaction;
}

export async function listStores() {
  let stores: Store[] = [];
  let i = 0;

  while (true) {
    try {
      const store = await readContract({
        contract,
        method: "stores",
        params: [BigInt(i)],
      });

      if (!store) {
        break;
      }

      stores.push({
        storeId: store[0],
        storeName: store[1],
        storeAdmin: store[2],
      });
      i++;
    } catch (error) {
      // TODO: Better way to handle this
      console.error(`ストア${i}の取得中にエラーが発生しました:`, error);
      break;
    }
  }

  return stores;
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

export async function listReservations(storeId: bigint) {
  console.log("storeId: ", storeId);
  let reservations: Reservation[] = [];
  let i = 0;

  while (true) {
    try {
      console.log("i: ", i);
      const reservation = await readContract({
        contract,
        method: "reservations",
        params: [BigInt(i)],
      });

      if (!reservation) {
        break;
      }

      i++;
      if (reservation[0] !== storeId) {
        continue;
      }
      reservations.push({
        reservationId: BigInt(i),
        storeId: reservation[0],
        customer: reservation[1],
        datetime: reservation[2],
        requiredDeposit: reservation[3],
        currentDeposit: reservation[4],
        serviceFee: reservation[5],
        paid: reservation[6],
      });
    } catch (error) {
      // TODO: Better way to handle this
      console.error(`error occurred while fetching reservations: ${error}`);
      break;
    }
  }

  return reservations;
}
