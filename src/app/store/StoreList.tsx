import { useEffect, useState } from "react";

export default function StoreList() {
  const [stores, setStores] = useState<Record<number, string>>({});

  useEffect(() => {
    // ここでAPIリクエストを行い、サービス一覧を取得する
    // 仮のサービス一覧を設定しています
    setStores({
      1: "store1",
      3: "store3",
      4: "storeD",
    });
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">ストア一覧</h2>
      <ul className="space-y-2">
        {Object.entries(stores).map(([storeId, storeName], index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-sm text-black"
          >
            <div className="font-bold">{storeName}</div>
            <div>ストアID: {storeId}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
