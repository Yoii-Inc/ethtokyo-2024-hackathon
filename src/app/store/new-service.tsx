import RegisterStorePopup from "@/components/RegisterStore";
import { registerReservationSlot } from "@/utils/store/service";
import { TransactionButton } from "thirdweb/react";

export default function NewService() {
  return (
    <div>
      <TransactionButton
        transaction={() => {
          // TODO: replace with actual info
          const storeId = 1;
          const deposit = 1000;
          const serviceFee = 2000;
          const datetime = new Date().getTime();
          const tx = registerReservationSlot(storeId, datetime, deposit, serviceFee);
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
