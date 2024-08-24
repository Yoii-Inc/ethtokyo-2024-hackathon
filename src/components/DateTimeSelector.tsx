import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimeSelectorProps {
    onSelectDateTime: (date: Date) => void;
}

export default function DateTimeSelector({ onSelectDateTime }: DateTimeSelectorProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            onSelectDateTime(date);
        }
    };

    return (
        <div className="mt-2 mb-2">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="時間"
                dateFormat="yyyy/MM/dd HH:mm"
                className="w-full px-3 py-2 border rounded text-black"
                placeholderText="Select Date & Time"
            />
        </div>
    );
}