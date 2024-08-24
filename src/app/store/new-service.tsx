import RegisterStorePopup from "@/components/RegisterStore";
import { registerReservationSlot } from "@/utils/store/service";
import { TransactionButton } from "thirdweb/react";

export default function NewService() {
  return (
    <div>
      <TransactionButton
        transaction={() => {
          // TODO: replace with actual reservation ID
          const storeId = 1;
          const deposits = 10;
          const tx = registerReservationSlot(storeId, deposits);
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
        サービス新規登録
      </TransactionButton>
    </div>
  );
}
