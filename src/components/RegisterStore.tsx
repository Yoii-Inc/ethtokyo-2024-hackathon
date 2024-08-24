import React, { useState } from "react";

import { registerStore } from "@/utils/store/management";

function RegisterStorePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleRegisterStore = () => {
    registerStore(10, walletAddress);
    setShowPopup(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Register Store
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="font-bold mb-4 text-black">Register User</h2>

            <div className="mb-4">
              <label className="block mb-2 text-black">User Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-black">Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterStore}
                className="px-4 py-2 rounded bg-green-500 text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterStorePopup;