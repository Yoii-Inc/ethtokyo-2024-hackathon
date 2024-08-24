import { useState, useEffect } from 'react';

const mockTimeSlots: Record<number, Record<string, string[]>> = {
    1: {
        '2024-04-20': ['10:00', '11:00', '14:00', '15:00'],
        '2024-04-21': ['09:00', '10:00', '11:00', '13:00', '14:00'],
    },
    2: {
        '2024-04-20': ['09:00', '10:00', '11:00', '13:00', '14:00'],
        '2024-04-21': ['10:00', '11:00', '14:00', '15:00'],
    },
    3: {
        '2024-04-20': ['11:00', '13:00', '15:00', '16:00'],
        '2024-04-21': ['09:00', '10:00', '11:00', '13:00'],
    },
};

export default function TimeSlotSelector({ storeId, onSelectTimeSlot }: { storeId: number, onSelectTimeSlot: (date: string, timeSlot: string) => void }) {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

    useEffect(() => {
        // 実際のアプリケーションでは、ここでAPIリクエストを行います
        const dates = Object.keys(mockTimeSlots[storeId] || {});
        setAvailableDates(dates);
        setSelectedDate(null);
        setTimeSlots([]);
        setSelectedTimeSlot(null);
    }, [storeId]);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setTimeSlots(mockTimeSlots[storeId][date] || []);
        setSelectedTimeSlot(null);
    };

    const handleTimeSlotSelect = (slot: string) => {
        setSelectedTimeSlot(slot);
        if (selectedDate) {
            onSelectTimeSlot(selectedDate, slot);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">日付を選択してください</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {availableDates.map((date) => (
                    <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`px-4 py-2 rounded ${selectedDate === date
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {date}
                    </button>
                ))}
            </div>
            {selectedDate && (
                <>
                    <h2 className="text-xl font-semibold mb-2">時間帯を選択してください</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => handleTimeSlotSelect(slot)}
                                className={`px-4 py-2 rounded ${selectedTimeSlot === slot
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
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