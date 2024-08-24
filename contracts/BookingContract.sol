// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BookingContract {
    store[] public stores;
    reservation[] public reservations;

    struct store {
        uint256 storeId;
        string storeName;
        address storeAdmin;
    }

    struct reservation {
        uint256 storeId;
        address customer;
        uint256 datetime;
        uint256 requiredDeposit;
        uint256 currentDeposit;
        uint256 serviceFee;
        bool paid;
    }

    modifier onlyStoreAdmin(uint256 storeId) {
        require(
            msg.sender == stores[storeId].storeAdmin,
            "Only store admin can call this function"
        );
        _;
    }

    modifier onlyStoreAdminByReservation(uint256 reservationId) {
        require(
            msg.sender ==
                stores[reservations[reservationId].storeId].storeAdmin,
            "Only store admin can call this function"
        );
        _;
    }

    function addStore(string calldata storeName) external {
        uint256 len = stores.length;
        stores.push(store(len, storeName, msg.sender));
        emit StoreAdded(len, storeName, msg.sender);
    }

    function addReservationSlot(
        uint256 storeId,
        uint256 datetime,
        uint256 deposit,
        uint256 serviceFee
    ) external onlyStoreAdmin(storeId) {
        uint256 len = reservations.length;
        reservations.push(
            reservation(
                storeId,
                address(0),
                datetime,
                deposit,
                0,
                serviceFee,
                false
            )
        );
        emit ReservationSlotAdded(len, storeId, datetime, deposit, serviceFee);
    }

    // deposit to the contract
    function bookReservation(uint256 reservationId) external payable {
        uint256 deposit = reservations[reservationId].requiredDeposit;
        require(msg.value >= deposit, "Deposit amount is less than required");
        require(
            reservations[reservationId].customer == address(0),
            "Already booked"
        );
        reservations[reservationId].customer = msg.sender;
        reservations[reservationId].currentDeposit = deposit;
        payable(address(this)).transfer(deposit);
        emit ReservationBooked(msg.sender, reservationId, deposit);
    }

    function finalizePayment(uint256 reservationId) external payable {
        require(!reservations[reservationId].paid, "Reservation already paid");
        uint256 deposit = reservations[reservationId].currentDeposit;
        uint256 serviceFee = reservations[reservationId].serviceFee;
        address storeAdmin = stores[reservations[reservationId].storeId]
            .storeAdmin;
        require(msg.value + deposit == serviceFee, "Incorrect amount");
        reservations[reservationId].paid = true;
        payable(storeAdmin).transfer(serviceFee);
        emit PaymentFinalized(msg.sender, reservationId, serviceFee);
    }

    function forfeitDeposit(
        uint256 reservationId
    ) external onlyStoreAdminByReservation(reservationId) {
        require(!reservations[reservationId].paid, "Reservation already paid");
        uint256 deposit = reservations[reservationId].currentDeposit;
        require(deposit > 0, "No deposit to forfeit");
        reservations[reservationId].currentDeposit = 0;
        reservations[reservationId].customer = address(0);
        payable(msg.sender).transfer(deposit);
        emit DepositForfeited(msg.sender, reservationId, deposit);
    }

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
