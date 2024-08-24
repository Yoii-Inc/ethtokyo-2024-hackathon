import React, { useState } from "react";

import { addStore } from "@/utils/store/management";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

function RegisterStorePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const activeAccount = useActiveAccount();

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(true);
          console.log("address", activeAccount?.address);
        }}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        ストア登録
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="font-bold mb-4 text-black">ストア登録</h2>

            <div className="mb-4">
              <label className="block mb-2 text-black">ストア名</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-black">
                ウォレットアドレス
              </label>
              <input
                type="text"
                value={activeAccount?.address || "ウォレット接続をしてください"}
                disabled
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded text-gray-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 mr-2"
              >
                Cancel
              </button>
              <TransactionButton
                unstyled
                className="px-4 py-2 rounded bg-green-500 text-white"
                transaction={() => {
                  const tx = addStore(storeName);
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
                OK
              </TransactionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterStorePopup;
