"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TransactionButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "../client";
import StoreSelector from "../../components/StoreSelector";
import TimeSlotSelector from "../../components/TimeSlotSelector";
import { bookReservation } from "@/utils/customer/reservation";
import MyConnectButton from "@/components/MyConnectButton";

export default function CustomerPage() {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  return (
    <main className="p-4 container mx-auto relative">
      <div className="absolute top-4 right-4">
        <MyConnectButton />
      </div>

      <h1 className="text-2xl font-bold mb-4">Customer Page</h1>
      <h2 className="text-xl font-semibold mb-6">Select a store</h2>

      <StoreSelector
        onSelectStore={(storeId: number) => setSelectedStore(storeId)}
      />
      {selectedStore && (
        <TimeSlotSelector
          storeId={selectedStore}
          onSelectTimeSlot={(date: string, timeSlot: string) => {
            setSelectedDate(date);
            setSelectedTimeSlot(timeSlot);
          }}
        />
      )}
      {selectedStore && selectedTimeSlot && (
        <TransactionButton
          transaction={() => {
            // TODO: replace with actual reservation ID
            const tx = bookReservation(selectedStore, 10, selectedTimeSlot);
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
      )}
      <div className="mt-8 flex justify-center">
        <Link
          href="/store"
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
          To Store Page
        </Link>
      </div>
    </main>
  );
}