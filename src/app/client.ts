import { bscTestnet } from "thirdweb/chains";
import { createThirdwebClient, getContract } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

const bookingContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!bookingContractAddress) {
  throw new Error("No contract address provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = bscTestnet;

export const bookingContract = getContract({
  client,
  address: bookingContractAddress,
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
      name: "ReservationBooked",
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
        {
          indexed: false,
          internalType: "uint256",
          name: "storeId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "datetime",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "deposit",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "serviceFee",
          type: "uint256",
        },
      ],
      name: "ReservationSlotAdded",
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
          internalType: "string",
          name: "storeName",
          type: "string",
        },
        {
          indexed: false,
          internalType: "address",
          name: "storeAdmin",
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
          internalType: "uint256",
          name: "datetime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deposit",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "serviceFee",
          type: "uint256",
        },
      ],
      name: "addReservationSlot",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "storeName",
          type: "string",
        },
        {
          internalType: "address",
          name: "loyaltyLogicContract",
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
      name: "bookReservation",
      outputs: [],
      stateMutability: "payable",
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
      name: "finalizePayment",
      outputs: [],
      stateMutability: "payable",
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
          internalType: "address",
          name: "customer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "datetime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "requiredDeposit",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "currentDeposit",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "serviceFee",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "paid",
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
      name: "stores",
      outputs: [
        {
          internalType: "uint256",
          name: "storeId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "storeName",
          type: "string",
        },
        {
          internalType: "address",
          name: "storeAdmin",
          type: "address",
        },
        {
          internalType: "address",
          name: "loyaltyLogicContract",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_reservationId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_storeId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_customer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_datetime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_requiredDeposit",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_currentDeposit",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_serviceFee",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_paid",
          type: "bool",
        },
      ],
      name: "updateReservation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});

export const erc20Abi = [
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const loyaltyLogicContractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_loyaltyTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bookingContractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "customer",
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
    name: "LoyaltyPointsAwarded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "awardPoints",
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
        name: "consumeLoyaltyPoints",
        type: "uint256",
      },
    ],
    name: "bookReservationDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bookingContract",
    outputs: [
      {
        internalType: "contract IBookingContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "checkBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "finalizePaymentAndAwardPoints",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "loyaltyToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "usePoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
