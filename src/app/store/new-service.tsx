import RegisterStorePopup from "@/components/RegisterStore";
import { registerReservationSlot } from "@/utils/store/service";
import { TransactionButton } from "thirdweb/react";

export default function NewService(props: { storeId: number, deposit: number, serviceFee: number, datetime: number }) {
  return (
    <div>
      <TransactionButton
        transaction={() => {
          const tx = registerReservationSlot(props.storeId, props.datetime, props.deposit, props.serviceFee);
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
