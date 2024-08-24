import { useEffect, useState } from "react";

import { Store } from "@/utils/type";
import { listStores } from "@/utils/store/management";
import { useActiveAccount } from "thirdweb/react";

export default function StoreList() {
  const [stores, setStores] = useState<Store[]>([]);
  const account = useActiveAccount();

  useEffect(() => {
    if (!account) return;
    listStores().then((stores) => {
      const filteredStores = stores.filter(store => store.storeAdmin === account.address);
      setStores(filteredStores);
    });
  }, [account]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">ストア一覧</h2>
      {stores.length > 0 ? (
        <ul className="space-y-2">
          {stores.map(({ storeId, storeName, storeAdmin }, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-sm text-black"
            >
              <div className="font-bold">{storeName}</div>
              <div>ストアID: {storeId.toString()}</div>
              <div>ストア管理者: {storeAdmin}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">管理しているストアがありません。</p>
      )}
    </div>
  );
}