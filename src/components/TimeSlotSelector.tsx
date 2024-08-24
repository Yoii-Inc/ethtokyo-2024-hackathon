import { listReservations } from "@/utils/store/management";
import { Reservation } from "@/utils/type";
import { useState, useEffect } from "react";

type EasyReservation = {
  reservationId: number;
  date: string;
  time: string;
};

export default function TimeSlotSelector({
  storeId,
  onSelectTimeSlot,
}: {
  storeId: number;
  onSelectTimeSlot: (
    /*date: string, timeSlot: string*/
    reservationId: number
  ) => void;
}) {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);
  const [mockTimeSlots, setmockTimeSlots] = useState<
    Record<string, EasyReservation[]>
  >({});

  useEffect(() => {
    // In the actual application, API requests are made here
    // const dates = Object.keys(mockTimeSlots[storeId] || {});
    const dates = Object.keys(mockTimeSlots || {});
    setAvailableDates(dates);
    setSelectedDate(null);
    setTimeSlots([]);
    setSelectedTimeSlot(null);
    setSelectedReservationId(null);

    listReservations(BigInt(storeId)).then((reservations) => {
      const dictionary: Record<string, EasyReservation[]> = {};

      reservations.forEach((reservation) => {
        console.log("reservation is ", reservation);
        const dt = new Date(Number(reservation.datetime));
        // transform to JST (JST: UTC+9)
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Tokyo",
        };

        const localeDate = dt.toLocaleString("ja-JP", options).split(" ");
        const date = localeDate[0].replace(/\//g, "-"); // key yyyy-mm-dd
        const time = localeDate[1]; // value hh:mm

        if (!dictionary[date]) {
          dictionary[date] = [];
        }
        const val: EasyReservation = {
          reservationId: Number(reservation.reservationId),
          date,
          time,
        };
        dictionary[date].push(val);
      });

      setmockTimeSlots(dictionary);
      setAvailableDates(Object.keys(dictionary));
    });
  }, [storeId]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setTimeSlots(
      mockTimeSlots[date].map((resrvation) => resrvation.time) || []
    );
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    if (selectedDate) {
      const reservation = mockTimeSlots[selectedDate].find(
        (r) => r.time === slot
      );
      setSelectedReservationId(reservation?.reservationId || null);
      if (selectedReservationId !== null) {
        onSelectTimeSlot(selectedReservationId);
      }
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select a date</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {availableDates.map((date) => (
          <button
            key={date}
            onClick={() => handleDateSelect(date)}
            className={`px-4 py-2 rounded ${
              selectedDate === date
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {date}
          </button>
        ))}
      </div>
      {selectedDate && (
        <>
          <h2 className="text-xl font-semibold mb-2">Select a time</h2>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleTimeSlotSelect(slot)}
                className={`px-4 py-2 rounded ${
                  selectedTimeSlot === slot
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
