import { useEffect, useState } from "react";
import Image from "next/image";
import { Store } from "@/utils/type";
import { useActiveAccount } from "thirdweb/react";
import { listReservations, listStores } from "@/utils/store/management";
import { getContract, readContract } from "thirdweb";
import { chain, client, erc20Abi, loyaltyLogicContractAbi } from "@/app/client";

export default function StoreSelector({
  selectedStore,
  setSelectedStore,
}: {
  selectedStore: number | null;
  setSelectedStore: (storeId: number) => void;
}) {
  const [stores, setStores] = useState<Store[]>([]);
  const account = useActiveAccount();

  useEffect(() => {
    if (!account) return;

    const fetchStoresAndReservations = async () => {
      const fetchedStores = await listStores();
      const updatedStores = await Promise.all(
        fetchedStores.map(async (store) => {
          store.storeImage = `/store-a.jpg`;
          const reservations = await listReservations(store.storeId);
          const fees = reservations.map((reservation) => Number(reservation.serviceFee));
          store.maxFee = fees.length ? Math.max(...fees) : 0;
          store.minFee = fees.length ? Math.min(...fees) : 0;

          // TODO: Do this in listStores
          // get loyalty logic contract address
          const loyaltyLogicContract = getContract({
            client,
            address: store.loyaltyLogicContractAddress,
            chain: chain,
            abi: loyaltyLogicContractAbi,
          });
          const loyaltyTokenContractAddress = await readContract({
            contract: loyaltyLogicContract,
            method: "loyaltyToken",
          });
          store.loyaltyTokenContractAddress = loyaltyTokenContractAddress;

          const loyaltyTokenContract = getContract({
            client,
            address: loyaltyTokenContractAddress,
            chain: chain,
            abi: erc20Abi,
          });
          store.loyaltyTokenContractAddress = loyaltyTokenContractAddress;

          const loyaltyTokenName = await readContract({
            contract: loyaltyTokenContract,
            method: "name",
          });
          store.loyaltyTokenName = loyaltyTokenName;

          const loyalyTokenAmount = await readContract({
            contract: loyaltyTokenContract,
            method: "balanceOf",
            params: [account.address],
          });
          store.loyaltyTokenAmount = loyalyTokenAmount;
          return store;
        })
      );
      setStores(updatedStores);
    };

    fetchStoresAndReservations();
  }, [account]);

  const handleStoreSelect = (storeId: number) => {
    setSelectedStore(storeId);
  };

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store) => (
          <div
            key={store.storeId}
            onClick={() => handleStoreSelect(Number(store.storeId))}
            className={`cursor-pointer p-6 rounded-xl shadow-lg transition-all flex flex-col h-full ${selectedStore === Number(store.storeId)
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src={store.storeImage}
                alt={store.storeName}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{store.storeName}</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Service Fee Range:</span>
              <span className="text-lg font-bold">{store.minFee} ~ {store.maxFee}</span>
            </div>
            <p className="text-sm flex-grow mb-4">{store.description}</p>
            <div className={`${selectedStore === Number(store.storeId) ? "bg-blue-400" : "bg-gray-200"} rounded-lg p-3 mb-4`}>
              <p className="text-sm font-medium mb-1">Loyality Token Name:</p>
              <p className="text-base font-bold">{store.loyaltyTokenName}</p>
              <p className="text-sm mt-2">Amount: <span className="font-bold">{store.loyaltyTokenAmount.toString()}</span></p>
            </div>
            <button
              className={`mt-auto w-full px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-300 ${selectedStore === Number(store.storeId)
                ? "bg-white text-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              {selectedStore === Number(store.storeId) ? "Selected" : "Select?"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}