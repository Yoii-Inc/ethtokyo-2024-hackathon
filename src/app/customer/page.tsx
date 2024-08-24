"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton, TransactionButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "../client";
import StoreSelector from "../../components/StoreSelector";
import TimeSlotSelector from "../../components/TimeSlotSelector";
import { bookReservation } from "@/utils/customer/reservation";

export default function CustomerPage() {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("契約アドレスが設定されていません");
  }

  return (
    <main className="p-4 container mx-auto ">
      <h1 className="text-2xl font-bold mb-4">お客様ページ</h1>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
      />
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
          ストア管理ページへ
        </Link>
      </div>
    </main>
  );
}

// export default function Home() {
//   return (
//     <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
//       <div className="py-20">
//         <Header />

//         <div className="flex justify-center mb-20">
//           <ConnectButton
//             client={client}
//             appMetadata={{
//               name: "Example App",
//               url: "https://example.com",
//             }}
//           />
//         </div>

//         <ThirdwebResources />
//       </div>
//     </main>
//   );
// }

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>

      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}