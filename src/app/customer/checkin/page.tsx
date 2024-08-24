"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
    TransactionButton,
    useActiveAccount,
} from "thirdweb/react";
import { bookingContract } from "../../client";
import { prepareContractCall } from "thirdweb";
import MyConnectButton from "@/components/MyConnectButton";

function CheckInInnerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [reservationId, setReservationId] = useState<string | null>(null);
    const address = useActiveAccount();

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            setReservationId(id);
            console.log(id);
        }
    }, [searchParams]);

    const handleFinalizePayment = async () => {
        if (!reservationId) throw new Error("Reservation ID is not found.");

        return prepareContractCall({
            contract: bookingContract,
            method: "finalizePayment",
            params: [BigInt(reservationId)],
        });
    };

    if (!reservationId) {
        return <div>Now Loading...</div>;
    }

    return (
        <main className="p-4 container mx-auto relative">
            <div className="absolute top-4 right-4">
                <MyConnectButton />
            </div>
            <h1 className="text-2xl font-bold mb-4">Check In & Payment</h1>
            <p className="mb-4">Reservation ID: {reservationId}</p>
            <div className="flex flex-col items-center space-y-4">
                {address && (
                    <TransactionButton
                        transaction={handleFinalizePayment}
                        onTransactionSent={(result) => {
                            console.log("Sent Transaction:", result.transactionHash);
                        }}
                        onTransactionConfirmed={(receipt) => {
                            console.log("Confirmed Transaction:", receipt.transactionHash);
                            router.push("/customer");
                        }}
                        onError={(error) => {
                            console.error("Transaction Error has occured:", error);
                        }}
                    >
                        Check In & Payment
                    </TransactionButton>
                )}
            </div>
        </main>
    );
}

export default function CheckInPage() {
    return (
        <Suspense>
            <CheckInInnerPage />
        </Suspense>
    );
}