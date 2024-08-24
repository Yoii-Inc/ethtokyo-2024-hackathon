import Link from 'next/link';
import OpenBooking from '../assets/openbooking.svg';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full">
                <div className="mt-8 text-center">
                    <OpenBooking
                        alt="OpenBooking"
                        width={500}
                        height={300}
                        className="mx-auto mb-8 text-blue-600"
                    />
                </div>
                <div className="flex flex-col space-y-6">
                    <Link href="/customer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
                        Customer Page
                    </Link>
                    <Link href="/store" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
                        Store Management Page
                    </Link>
                </div>

            </div>
        </main>
    );
}