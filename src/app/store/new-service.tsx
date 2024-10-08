import { registerReservationSlot } from "@/utils/store/service";
import { useState } from "react";
import { TransactionButton } from "thirdweb/react";
import DateTimeSelector from "@/components/DateTimeSelector";

export default function NewService(props: { storeId: number }) {
  const [showPopup, setShowPopup] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleDateTimeSelect = (date: Date) => {
    setSelectedDateTime(date);
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(true);
        }}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Register New Service
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="font-bold mb-4 text-black">Register New Service</h2>

            <div className="mb-4">
              <label className="block mb-2 text-black">Deposit Amount</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-black">Service Fee</label>
              <input
                type="number"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                className="w-full px-3 py-2 border rounded text-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-black">Date & Time</label>
              <DateTimeSelector onSelectDateTime={handleDateTimeSelect} />
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
                  if (!selectedDateTime) {
                    throw new Error("Datetime is not selected.");
                  }
                  const tx = registerReservationSlot(
                    props.storeId,
                    selectedDateTime.getTime(),
                    Number(deposit),
                    Number(serviceFee)
                  );
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
