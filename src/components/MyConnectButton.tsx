import { chain, client } from "@/app/client";
import { ConnectButton, ConnectButtonProps } from "thirdweb/react";

type MyConnectButtonProps = Omit<ConnectButtonProps, 'client'>
export default function MyConnectButton(props: MyConnectButtonProps) {

    return (
        <ConnectButton
            {...props}
            client={client}
            chain={chain}
            appMetadata={{
                name: "OpenBooking",
                url: "https://openbooking.vercel.app",
            }}
        />
    );
}