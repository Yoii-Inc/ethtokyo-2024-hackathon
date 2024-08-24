// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    mapping(uint256 => address) public storeAddresses;
    reservation[] public reservations;

    uint256 public reservationLastId;

    struct reservation {
        uint256 storeId;
        uint256 deposits;
        bool serviceConfirmed;
    }

    function addStore(uint256 storeId, address storeAddress) external {
        storeAddresses[storeId] = storeAddress;
    }

    function addReservationSlot(uint256 storeId, uint256 deposits) external {
        reservationLastId += 1;
        reservations[reservationLastId] = reservation(storeId, deposits, false);
        emit ReservationSlotAdded(reservationLastId, storeId, deposits);
    }

    function makeReservation(uint256 reservationId) external payable {
        require(
            msg.value == reservations[reservationId].deposits,
            "Incorrect deposit amount"
        );
        reservations[reservationId].deposits = msg.value;
        emit ReservationMade(msg.sender, reservationId, msg.value);
    }

    function confirmService(uint256 reservationId) external {
        require(
            !reservations[reservationId].serviceConfirmed,
            "Service already confirmed"
        );
        reservations[reservationId].serviceConfirmed = true;
        emit ServiceConfirmed(reservationId);
    }

    function finalizePayment(uint256 reservationId, uint256 amount) external {
        require(
            reservations[reservationId].serviceConfirmed,
            "Service not confirmed"
        );
        uint256 deposit = reservations[reservationId].deposits;
        require(amount >= deposit, "Amount less than deposit");
        payable(storeAddresses[reservations[reservationId].storeId]).transfer(
            amount
        );
        emit PaymentFinalized(msg.sender, reservationId, amount);
    }

    function forfeitDeposit(uint256 reservationId) external {
        require(
            !reservations[reservationId].serviceConfirmed,
            "Service already confirmed"
        );
        uint256 deposit = reservations[reservationId].deposits;
        require(deposit > 0, "No deposit to forfeit");
        delete reservations[reservationId].deposits;
        payable(storeAddresses[reservations[reservationId].storeId]).transfer(
            deposit
        );
        emit DepositForfeited(msg.sender, reservationId, deposit);
    }

    event StoreAdded(uint256 storeId, address storeAddress);

    event ReservationSlotAdded(
        uint256 reservationId,
        uint256 storeId,
        uint256 deposits
    );

    event ReservationMade(
        address indexed user,
        uint256 reservationId,
        uint256 deposit
    );

    event ServiceConfirmed(uint256 reservationId);

    event PaymentFinalized(
        address indexed user,
        uint256 reservationId,
        uint256 amount
    );

    event DepositForfeited(
        address indexed user,
        uint256 reservationId,
        uint256 deposit
    );
}
