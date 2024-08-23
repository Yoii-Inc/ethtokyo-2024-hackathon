import { useState, useEffect } from 'react';

const mockTimeSlots: Record<number, string[]> = {
    1: ['10:00', '11:00', '14:00', '15:00'],
    2: ['09:00', '10:00', '11:00', '13:00', '14:00'],
    3: ['11:00', '13:00', '15:00', '16:00'],
};

export default function TimeSlotSelector({ shopId, onSelectTimeSlot }: { shopId: number, onSelectTimeSlot: (timeSlot: string) => void }) {
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

    useEffect(() => {
        // 実際のアプリケーションでは、ここでAPIリクエストを行います
        setTimeSlots(mockTimeSlots[shopId] || []);
    }, [shopId]);

    const handleTimeSlotSelect = (slot: string) => {
        setSelectedTimeSlot(slot);
        onSelectTimeSlot(slot);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">予約可能な時間</h2>
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
        </div>
    );
}