"use client";

import Link from "next/link";
import { ConnectButton, TransactionButton } from "thirdweb/react";
import { client } from "../client";
import { registerReservationSlot } from "@/utils/shop/service";
import RegisterShopPopup from "@/components/RegisterShop";
export default function ShopPage() {
  return (
    <main className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">ショップ管理ページ</h1>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
      />
      <RegisterShopPopup />
      <TransactionButton
        transaction={() => {
          // TODO: replace with actual reservation ID
          const shopId = 1;
          const deposits = 10;
          const tx = registerReservationSlot(shopId, deposits);
          return tx;
        }}
        onTransactionSent={(result) => {
          console.log("Transaction submitted", result.transactionHash);
        }}
        onTransactionConfirmed={(receipt) => {
          console.log("Transaction confirmed", receipt.transactionHash);
          window.location.reload();
        }}
        onError={(error) => {
          console.error("Transaction error", error);
        }}
      >
        Make a Reservatinon
      </TransactionButton>
      <div className="mt-8 flex justify-center">
        <Link
          href="/customer"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          お客様管理ページへ
        </Link>
      </div>
    </main>
  );
}
