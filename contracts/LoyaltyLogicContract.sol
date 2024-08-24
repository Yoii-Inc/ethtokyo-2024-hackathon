// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IBookingContract.sol";

contract LoyaltyLogicContract is Ownable {
    IERC20 public loyaltyToken;
    IBookingContract public bookingContract;

    constructor(address _loyaltyTokenAddress, address _bookingContractAddress) {
        loyaltyToken = IERC20(_loyaltyTokenAddress);
        bookingContract = IBookingContract(_bookingContractAddress);
    }

    // Function to award loyalty points (only owner can call)
    function awardPoints(address _user, uint256 _amount) external onlyOwner {
        require(
            loyaltyToken.transfer(_user, _amount),
            "Failed to award points"
        );
    }

    // Function to use loyalty points
    function usePoints(address _user, uint256 _amount) external {
        require(
            loyaltyToken.transferFrom(_user, address(this), _amount),
            "Failed to use points"
        );
    }

    // Function to check the balance of loyalty points
    function checkBalance(address _user) external view returns (uint256) {
        return loyaltyToken.balanceOf(_user);
    }

    // Function to finalize payment and award loyalty points (1/20 of the service fee)
    // This function should be called only from customer who booked that reservation
    function finalizePaymentAndAwardPoints(
        uint256 reservationId
    ) external payable {
        // Get reservation details from BookingContract
        IBookingContract.Reservation memory reservation = bookingContract
            .reservations(reservationId);

        require(
            msg.sender == reservation.customer,
            "Only the customer who booked the reservation can call this function"
        );

        // Ensure the correct amount is sent
        require(
            msg.value + reservation.currentDeposit == reservation.serviceFee,
            "Incorrect payment amount"
        );

        // Call finalizePayment on BookingContract
        bookingContract.finalizePayment{value: msg.value}(reservationId);

        // Calculate loyalty points (1/20 of the service fee)
        uint256 loyaltyPoints = reservation.serviceFee / 20;

        // Award loyalty points to the customer
        require(
            loyaltyToken.transfer(reservation.customer, loyaltyPoints),
            "Failed to award loyalty points"
        );

        // Emit an event for loyalty points awarded
        emit LoyaltyPointsAwarded(
            reservation.customer,
            reservationId,
            loyaltyPoints
        );
    }

    // Event to emit when loyalty points are awarded
    event LoyaltyPointsAwarded(
        address indexed customer,
        uint256 reservationId,
        uint256 amount
    );
}
