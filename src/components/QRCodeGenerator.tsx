import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator: React.FC = () => {
    const [reservationId, setReservationId] = useState('');
    const [showQR, setShowQR] = useState(false);

    const handleGenerateQR = () => {
        if (reservationId) {
            setShowQR(true);
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowQR(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                QRコード生成
            </button>

            {showQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">予約確認用QRコード</h2>
                        <input
                            type="text"
                            value={reservationId}
                            onChange={(e) => setReservationId(e.target.value)}
                            placeholder="予約ID"
                            className="border rounded px-2 py-1 mb-4 w-full"
                        />
                        <button
                            onClick={handleGenerateQR}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                        >
                            QRコード生成
                        </button>
                        {reservationId && (
                            <div className="mt-4">
                                <QRCode value={`http://localhost:3000/customer/confirm-service?id=${reservationId}`} />
                            </div>
                        )}
                        <button
                            onClick={() => setShowQR(false)}
                            className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;