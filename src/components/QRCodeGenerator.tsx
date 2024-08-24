import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator: React.FC<{ reservationId: bigint | null }> = ({ reservationId }) => {
    const [showQR, setShowQR] = useState(false);
    const [baseUrl, setBaseUrl] = useState(process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(`${window.location.protocol}//${window.location.host}`);
        }
    }, []);

    return (
        <div>
            <button
                onClick={() => setShowQR(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                QR code generation
            </button>

            {showQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            QR code for Reservation Confirmation
                        </h2>
                        {
                            (() => {
                                if (reservationId != null) {
                                    let url = `${baseUrl}/customer/checkin?id=${reservationId.toString()}`
                                    return (
                                        <div className="mt-4 flex flex-col items-center">
                                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mb-2">
                                                {url}
                                            </a>
                                            <div className="border-4 border-gray-200 p-2 rounded-lg">
                                                <QRCode
                                                    value={url}
                                                    size={200}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            })()
                        }
                        <button
                            onClick={() => setShowQR(false)}
                            className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div >
                </div >
            )}
        </div >
    );
};

export default QRCodeGenerator;