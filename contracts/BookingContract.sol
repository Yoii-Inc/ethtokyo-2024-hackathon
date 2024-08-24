// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BookingContract {
    Store[] public stores;
    Reservation[] public reservations;

    struct Store {
        uint256 storeId;
        string storeName;
        address storeAdmin;
        address loyaltyLogicContract;
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

    modifier onlyStoreAdmin(uint256 storeId) {
        require(
            msg.sender == stores[storeId].storeAdmin ||
                msg.sender == stores[storeId].loyaltyLogicContract,
            "Only store admin can call this function"
        );
        _;
    }

    modifier onlyStoreAdminByReservation(uint256 reservationId) {
        require(
            msg.sender ==
                stores[reservations[reservationId].storeId].storeAdmin ||
                msg.sender ==
                stores[reservations[reservationId].storeId]
                    .loyaltyLogicContract,
            "Only store admin can call this function"
        );
        _;
    }

    function addStore(
        string calldata storeName,
        address loyaltyLogicContract
    ) external {
        uint256 len = stores.length;
        stores.push(Store(len, storeName, msg.sender, loyaltyLogicContract));
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
            Reservation(
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

    function updateReservation(
        uint256 _reservationId,
        uint256 _storeId,
        address _customer,
        uint256 _datetime,
        uint256 _requiredDeposit,
        uint256 _currentDeposit,
        uint256 _serviceFee,
        bool _paid
    ) external onlyStoreAdminByReservation(_reservationId) {
        reservations[_reservationId] = Reservation({
            storeId: _storeId,
            customer: _customer,
            datetime: _datetime,
            requiredDeposit: _requiredDeposit,
            currentDeposit: _currentDeposit,
            serviceFee: _serviceFee,
            paid: _paid
        });
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
        require(msg.value + deposit == serviceFee, "Incorrect amount");
        reservations[reservationId].paid = true;
        reservations[reservationId].currentDeposit = 0;
        address storeAdmin = stores[reservations[reservationId].storeId]
            .storeAdmin;
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
