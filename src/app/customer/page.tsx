"use client";

import { useEffect, useState } from "react";
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
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);

  useEffect(() => {
    setSelectedReservationId(null);
  }, [selectedStore]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-6xl w-full">
        <div className="absolute top-4 right-4">
          <MyConnectButton />
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">Customer Page</h1>
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Select a store</h2>

        <StoreSelector
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
        {selectedStore !== null && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Time Slot</h2>
            <TimeSlotSelector
              storeId={selectedStore}
              onSelectTimeSlot={(reservationId: number) => {
                setSelectedReservationId(reservationId);
              }}
            />
          </div>
        )}
        {selectedStore !== null && selectedReservationId !== null && (
          <div className="mb-8 flex justify-center">
            <TransactionButton
              transaction={() => {
                // TODO: replace with actual reservation ID
                const tx = bookReservation(selectedReservationId);
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
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Link
            href="/store"
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
            To Store Page
          </Link>
        </div>
      </div>
    </main>
  );
}