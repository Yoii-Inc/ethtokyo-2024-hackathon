import { useEffect, useState } from "react";

export default function ServiceList() {
  const [services, setServices] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // ここでAPIリクエストを行い、サービス一覧を取得する
    // 仮のサービス一覧を設定しています
    setServices({
      "2024-04-20": ["10:00", "11:00", "14:00", "15:00"],
      "2024-04-21": ["09:00", "10:00", "11:00", "13:00", "14:00"],
    });
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">サービス一覧</h2>
      <ul className="space-y-2">
        {Object.entries(services).map(([date, times], index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-sm text-black"
          >
            <div className="font-bold">{date}</div>
            <div>{times.join(", ")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
