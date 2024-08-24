import QRCodeGenerator from "@/components/QRCodeGenerator";
import { listReservations } from "@/utils/store/management";
import { Reservation } from "@/utils/type";
import { useEffect, useState } from "react";

export default function ServiceList(props: { storeId: bigint | undefined }) {
  const [services, setServices] = useState<Record<string, { time: string; reservation: Reservation }[]>>({});
  useEffect(() => {
    const fetchServices = async () => {
      if (props.storeId === undefined) {
        return;
      }
      const reservations = await listReservations(props.storeId);
      const dictionary: Record<string, { time: string; reservation: Reservation }[]> = {};

      reservations.forEach((reservation) => {
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

        dictionary[date].push({
          time: time,
          reservation: reservation,
        });
      });

      setServices(dictionary);
    };
    fetchServices();
  }, [props.storeId]);
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">
        List of services
      </h2>
      <div className="space-y-4">
        {Object.entries(services).map(([date, times]) => (
          <div
            key={date}
            className="p-4 bg-gray-100 rounded-lg shadow-sm text-black"
          >
            <div className="font-bold mb-2">{date}</div>
            <ul className="list-disc list-inside space-y-2">
              {times.map(({ time, reservation }, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-200 rounded-lg shadow-sm text-black flex items-center justify-between group"
                >
                  <div className="center">{time}</div>
                  <div className="opacity-0 group-hover:opacity-100">
                    <QRCodeGenerator />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
