import { bscTestnet } from "thirdweb/chains";
import { createThirdwebClient, getContract } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error("No contract address provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = bscTestnet;

export const contract = getContract({
  client,
  address: contractAddress,
  chain,
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "deposit",
          type: "uint256",
        },
      ],
      name: "DepositForfeited",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "PaymentFinalized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "deposit",
          type: "uint256",
        },
      ],
      name: "ReservationMade",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
      ],
      name: "ServiceConfirmed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "storeId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "storeAddress",
          type: "address",
        },
      ],
      name: "StoreAdded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "storeId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "storeAddress",
          type: "address",
        },
      ],
      name: "addStore",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
      ],
      name: "confirmService",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "finalizePayment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
      ],
      name: "forfeitDeposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "reservationId",
          type: "uint256",
        },
      ],
      name: "makeReservation",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "reservations",
      outputs: [
        {
          internalType: "uint256",
          name: "storeId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deposits",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "serviceConfirmed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "storeAddresses",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
});
