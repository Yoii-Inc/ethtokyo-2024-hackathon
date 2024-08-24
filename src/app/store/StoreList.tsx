import { useEffect, useState } from "react";

import { Store } from "@/utils/type";
import { listStores } from "@/utils/store/management";
import { useActiveAccount } from "thirdweb/react";
import RegisterStorePopup from "@/components/RegisterStore";

export default function StoreList({
  setStore,
}: {
  setStore: (store: Store) => void;
}) {
  const [stores, setStores] = useState<Store[]>([]);
  const account = useActiveAccount();

  useEffect(() => {
    if (!account) return;
    listStores().then((stores) => {
      const filteredStores = stores.filter(
        (store) => store.storeAdmin === account.address
      );
      setStores(filteredStores);
    });
  }, [account]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        List of Stores
      </h2>
      {stores.length > 0 ? (
        <ul className="space-y-4">
          {stores.map((store, index) => (
            <li
              key={index}
              className="p-4 bg-blue-50 rounded-lg shadow-sm text-gray-800 cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => setStore(store)}
            >
              <div className="font-bold text-lg mb-2">{store.storeName}</div>
              <div className="text-sm text-gray-600">
                Store ID: {store.storeId.toString()}
              </div>
              <div className="text-sm text-gray-600">
                Store Admin: {store.storeAdmin}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No stores managed.</p>
      )}
      <div className="mt-6">
        <RegisterStorePopup />
      </div>
    </div>
  );
}
