"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ConnectButton, TransactionButton, useActiveAccount } from 'thirdweb/react';
import { client, contract } from '../../../app/client';
import { prepareContractCall } from 'thirdweb';

function ConfirmServiceInnerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [reservationId, setReservationId] = useState<string | null>(null);
    const address = useActiveAccount();

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setReservationId(id);
            console.log(id);
        }
    }, [searchParams]);

    const handleFinalizePayment = async () => {
        if (!reservationId) throw new Error('予約IDが見つかりません');

        return prepareContractCall({
            contract,
            method: 'finalizePayment',
            params: [BigInt(reservationId)],
        });
    };

    if (!reservationId) {
        return <div>ローディング中...</div>;
    }

    return (
        <main className="p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">サービス確認</h1>
            <p className="mb-4">予約ID: {reservationId}</p>
            <div className="flex flex-col items-center space-y-4">
                <ConnectButton
                    client={client}
                    appMetadata={{
                        name: "Example App",
                        url: "https://example.com",
                    }}
                />
                {address && (
                    <TransactionButton
                        transaction={handleFinalizePayment}
                        onTransactionSent={(result) => {
                            console.log('トランザクション送信:', result.transactionHash);
                        }}
                        onTransactionConfirmed={(receipt) => {
                            console.log('トランザクション確認:', receipt.transactionHash);
                            router.push('/customer');
                        }}
                        onError={(error) => {
                            console.error('トランザクションエラー:', error);
                        }}
                    >
                        サービスを確認する
                    </TransactionButton>
                )}
            </div>
        </main>
    );
}

export default function ConfirmServicePage() {
    return (
        <Suspense>
            <ConfirmServiceInnerPage />
        </Suspense>
    );
}