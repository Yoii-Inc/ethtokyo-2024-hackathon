// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    address public storeAddress;
    reservation[] public reservations;
    uint[] public reservationDeposit;

    struct reservation {
        address store;
        mapping(address => uint256) deposits;
        bool serviceConfirmed;
    }

    function makeReservation(uint reservationId) external payable {
        require(
            msg.value == reservationDeposit[reservationId],
            "Incorrect deposit amount"
        );
        reservations[reservationId].deposits[msg.sender] = msg.value;
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
        uint256 deposit = reservations[reservationId].deposits[msg.sender];
        require(amount >= deposit, "Amount less than deposit");
        payable(storeAddress).transfer(amount);
        emit PaymentFinalized(msg.sender, reservationId, amount);
    }

    function forfeitDeposit(uint256 reservationId) external {
        require(
            !reservations[reservationId].serviceConfirmed,
            "Service already confirmed"
        );
        uint256 deposit = reservations[reservationId].deposits[msg.sender];
        require(deposit > 0, "No deposit to forfeit");
        delete reservations[reservationId].deposits[msg.sender];
        payable(storeAddress).transfer(deposit);
        emit DepositForfeited(msg.sender, reservationId, deposit);
    }

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
