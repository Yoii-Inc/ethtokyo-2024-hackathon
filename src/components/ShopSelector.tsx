import { useState } from 'react';
import Image from 'next/image';

const shops = [
    { id: 1, name: 'ショップA', description: 'ショップAの説明文がここに入ります。より長い説明文を追加して、カードを縦長にします。', image: '/shop-a.jpg', price: 5000 },
    { id: 2, name: 'ショップB', description: 'ショップBの説明文がここに入ります。各ショップの特徴や提供するサービスについて詳しく説明することができます。', image: '/shop-b.jpg', price: 7500 },
    { id: 3, name: 'ショップC', description: 'ショップCの説明文がここに入ります。お客様にとって魅力的な情報を提供し、選択の助けとなるような内容を記載します。', image: '/shop-c.jpg', price: 6000 },
];

export default function ShopSelector({ onSelectShop }: { onSelectShop: (shopId: number) => void }) {
    const [selectedShop, setSelectedShop] = useState<number | null>(null);

    const handleShopSelect = (shopId: number) => {
        setSelectedShop(shopId);
        onSelectShop(shopId);
    };

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">ショップを選択してください</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shops.map((shop) => (
                    <div
                        key={shop.id}
                        onClick={() => handleShopSelect(shop.id)}
                        className={`cursor-pointer p-6 rounded-xl shadow-lg transition-all flex flex-col h-full ${selectedShop === shop.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                    >
                        <div className="relative w-full h-56 mb-4">
                            <Image
                                src={shop.image}
                                alt={shop.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">{shop.name}</h3>
                        <p className="text-lg font-bold mb-2">¥{shop.price.toLocaleString()}</p>
                        <p className="text-base flex-grow mb-4">{shop.description}</p>
                        <button
                            className={`mt-auto px-6 py-3 rounded-lg text-lg font-medium ${selectedShop === shop.id
                                ? 'bg-white text-blue-500'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {selectedShop === shop.id ? '選択中' : '選択する'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}