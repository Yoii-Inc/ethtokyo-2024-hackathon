"use client";

import QRCodeGenerator from "@/components/QRCodeGenerator";
import Link from "next/link";
import { ConnectButton, TransactionButton } from "thirdweb/react";
import { client } from "../client";
import { registerReservationSlot } from "@/utils/store/service";
import RegisterStorePopup from "@/components/RegisterStore";
import { useState } from "react";
import NewService from "./new-service";
import ServiceList from "./service-list";
import LoyaltyProgram from "./LoyaltyProgram";
export default function StorePage() {
  const [activeTab, setActiveTab] = useState("newService");

  const renderTabContent = () => {
    switch (activeTab) {
      case "newService":
        return <NewService />;
      case "serviceList":
        return <ServiceList />;
      case "loyaltyProgram":
        return <LoyaltyProgram />;
      default:
        return null;
    }
  };
  return (
    <main className="p-4 container mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">ストア管理ページ</h1>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
      />
      <RegisterStorePopup />
      <div className="flex space-x-4 border-b mb-4">
        <div className="tabs flex justify-around border-b-2 mb-4">
          <button
            onClick={() => setActiveTab("newService")}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "newService"
                ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            新規サービス登録画面
          </button>
          <button
            onClick={() => setActiveTab("serviceList")}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "serviceList"
                ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            サービス一覧画面
          </button>
          <button
            onClick={() => setActiveTab("loyaltyProgram")}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "loyaltyProgram"
                ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            ロイヤリティプログラム設定画面
          </button>
        </div>
      </div>
      <div className="tab-content mt-4">{renderTabContent()}</div>
      <div className="mt-8">
        <QRCodeGenerator />
      </div>
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
