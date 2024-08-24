"use client";

import Link from "next/link";
import { client } from "../client";
import { useState } from "react";
import NewService from "./new-service";
import ServiceList from "./service-list";
import LoyaltyProgram from "./LoyaltyProgram";
import StoreList from "./StoreList";
import { Store } from "@/utils/type";
import MyConnectButton from "@/components/MyConnectButton";

export default function StorePage() {
  const [activeTab, setActiveTab] = useState("storeList");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "storeList":
        return <StoreList setStore={setSelectedStore} />;
      case "newService":
        return selectedStore ? (
          <NewService storeId={Number(selectedStore.storeId)} />
        ) : (
          <p className="text-red-500">Select a store</p>
        );
      case "serviceList":
        return <ServiceList storeId={selectedStore?.storeId} />;
      case "loyaltyProgram":
        return <LoyaltyProgram />;
      default:
        return null;
    }
  };

  return (
    <main className="p-8 container mx-auto relative">
      <div className="absolute top-4 right-4">
        <MyConnectButton />
      </div>

      <h1 className="text-3xl font-bold mb-8">Store Page</h1>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          Store of choice
        </h2>
        {selectedStore ? (
          <>
            <p className="text-blue-600 text-base mb-1">
              Store Name: {selectedStore.storeName}
            </p>
            <p className="text-blue-600 text-base">
              Store ID: {selectedStore.storeId.toString()}
            </p>
          </>
        ) : (
          <p className="text-gray-600 text-base">Store is not selected.</p>
        )}
      </div>

      <div className="mb-8">
        <div className="tabs flex justify-around border-b-2">
          <button
            onClick={() => setActiveTab("storeList")}
            className={`py-3 px-6 focus:outline-none text-lg ${activeTab === "storeList"
              ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            List of owned stores
          </button>
          <button
            onClick={() => setActiveTab("newService")}
            disabled={!selectedStore}
            className={`py-3 px-6 focus:outline-none text-lg ${activeTab === "newService"
              ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Create new Services
          </button>
          <button
            onClick={() => setActiveTab("serviceList")}
            disabled={!selectedStore}
            className={`py-3 px-6 focus:outline-none text-lg ${activeTab === "serviceList"
              ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            List of Services
          </button>
          <button
            onClick={() => setActiveTab("loyaltyProgram")}
            className={`py-3 px-6 focus:outline-none text-lg ${activeTab === "loyaltyProgram"
              ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Loyalty Program Setting
          </button>
        </div>
      </div>

      <div className="tab-content mt-8">{renderTabContent()}</div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/customer"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          To Customer Page
        </Link>
      </div>
    </main>
  );
}
