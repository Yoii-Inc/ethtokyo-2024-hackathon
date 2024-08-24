import { useState } from "react";
import Image from "next/image";

const stores = [
  {
    id: 1,
    name: "Store A",
    description:
      //   "ストアAの説明文がここに入ります。より長い説明文を追加して、カードを縦長にします。",
      "The description for Store A goes here. Add a longer description and make the card vertical.",
    image: "/store-a.jpg",
    price: 5000,
  },
  {
    id: 2,
    name: "Store B",
    description:
      //   "ストアBの説明文がここに入ります。各ストアの特徴や提供するサービスについて詳しく説明することができます。",
      "A description of Store B will go here. You can describe in detail the features and services offered by each store.",
    image: "/store-b.jpg",
    price: 7500,
  },
  {
    id: 3,
    name: "Store C",
    description:
      //   "ストアCの説明文がここに入ります。お客様にとって魅力的な情報を提供し、選択の助けとなるような内容を記載します。",
      "The description of Store C will go here. The description should provide information that is attractive to customers and help them make a choice.",
    image: "/store-c.jpg",
    price: 6000,
  },
];

export default function StoreSelector({
  onSelectStore,
}: {
  onSelectStore: (storeId: number) => void;
}) {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const handleStoreSelect = (storeId: number) => {
    setSelectedStore(storeId);
    onSelectStore(storeId);
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-6">Select a store</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store) => (
          <div
            key={store.id}
            onClick={() => handleStoreSelect(store.id)}
            className={`cursor-pointer p-6 rounded-xl shadow-lg transition-all flex flex-col h-full ${
              selectedStore === store.id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className="relative w-full h-56 mb-4">
              <Image
                src={store.image}
                alt={store.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{store.name}</h3>
            <p className="text-lg font-bold mb-2">
              ¥{store.price.toLocaleString()}
            </p>
            <p className="text-base flex-grow mb-4">{store.description}</p>
            <button
              className={`mt-auto px-6 py-3 rounded-lg text-lg font-medium ${
                selectedStore === store.id
                  ? "bg-white text-blue-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {selectedStore === store.id ? "Selected" : "Select?"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
