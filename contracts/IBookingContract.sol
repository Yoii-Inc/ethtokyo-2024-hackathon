// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IBookingContract {
    struct Store {
        uint256 storeId;
        string storeName;
        address storeAdmin;
    }

    struct Reservation {
        uint256 storeId;
        address customer;
        uint256 datetime;
        uint256 requiredDeposit;
        uint256 currentDeposit;
        uint256 serviceFee;
        bool paid;
    }

    function addStore(string calldata storeName) external;

    function addReservationSlot(
        uint256 storeId,
        uint256 datetime,
        uint256 deposit,
        uint256 serviceFee
    ) external;

    function updateReservation(
        uint256 _resertvationId,
        uint256 _storeId,
        address _customer,
        uint256 _datetime,
        uint256 _requiredDeposit,
        uint256 _currentDeposit,
        uint256 _serviceFee,
        bool _paid
    ) external;

    function bookReservation(uint256 reservationId) external payable;

    function finalizePayment(uint256 reservationId) external payable;

    function forfeitDeposit(uint256 reservationId) external;

    function stores(uint256) external view returns (Store memory);

    function reservations(uint256) external view returns (Reservation memory);

    event StoreAdded(uint256 storeId, string storeName, address storeAdmin);
    event ReservationSlotAdded(
        uint256 reservationId,
        uint256 storeId,
        uint256 datetime,
        uint256 deposit,
        uint256 serviceFee
    );
    event ReservationBooked(
        address indexed user,
        uint256 reservationId,
        uint256 deposit
    );
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
