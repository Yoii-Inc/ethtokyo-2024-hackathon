import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Reservation System</h1>
        <div className="flex flex-col space-y-6">
          <Link href="/customer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
            Customer Page
          </Link>
          <Link href="/store" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
            Store Management Page
          </Link>
        </div>
        <div className="mt-12 text-center">
          <Image
            src="/thirdweb.svg"
            alt="Thirdweb Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <p className="text-gray-600">Powered by Thirdweb</p>
        </div>
      </div>
    </main>
  );
}