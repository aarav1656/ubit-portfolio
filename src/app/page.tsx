import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="font-bold text-6xl mb-4">UBIT Portfolio Tracker</h1>
        <p className="text-2xl text-gray-700">Track your UBIT assets and transactions all in one place</p>
      </header>
      <main className="max-w-6xl mx-auto">
        <section className="mb-16">
          <h2 className="font-bold text-4xl mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src="path/to/image1.jpg" alt="Token Transfers" className="w-full h-48 object-cover mb-4 rounded-lg"/>
              <h3 className="font-bold text-2xl mb-2">Token Transfers</h3>
              <p className="text-gray-600">View all your token transfers in one place with detailed information.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src="path/to/image2.jpg" alt="Internal Transactions" className="w-full h-48 object-cover mb-4 rounded-lg"/>
              <h3 className="font-bold text-2xl mb-2">Internal Transactions</h3>
              <p className="text-gray-600">Get a comprehensive view of all internal transactions associated with your address.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src="path/to/image3.jpg" alt="Token Balances" className="w-full h-48 object-cover mb-4 rounded-lg"/>
              <h3 className="font-bold text-2xl mb-2">Token Balances</h3>
              <p className="text-gray-600">Monitor your token balances and stay updated with your holdings.</p>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="font-bold text-4xl mb-8 text-center">Get Started</h2>
          <div className="text-center">
            <input 
              type="text" 
              placeholder="Enter your address" 
              className="border rounded p-3 mb-4 w-full md:w-1/2"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">Track Portfolio</button>
          </div>
        </section>
        <section className="mb-16 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-8 rounded-lg shadow-lg">
          <h2 className="font-bold text-4xl mb-8 text-center text-gray-800">About UBIT Ecosystem</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-800 mb-4">
              The UBIT ecosystem is designed to provide seamless and efficient transaction solutions. With our portfolio tracker, you can easily monitor your assets, transactions, and token balances. Stay informed and manage your digital assets with confidence.
            </p>
            <p className="text-gray-800">
              Our platform offers a user-friendly interface and comprehensive data analysis to help you make informed decisions. Join the UBIT ecosystem and take control of your digital portfolio today.
            </p>
          </div>
        </section>
      </main>
      <footer className="text-center mt-16">
        <p className="text-gray-600">&copy; 2024 UBIT Portfolio Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
