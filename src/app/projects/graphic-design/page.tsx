"use client"
import React, { useState, useEffect } from 'react';

const GraphicDesignPage = () => {
  const [address, setAddress] = useState('0x5fdF6c1954Fe15327278AcD45696cD7Eb514AFd3');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    fetch(`https://ubitscan.io/api?module=account&action=tokentx&address=${address}`)
      .then(response => response.json())
      .then(result => {
        if (result && Array.isArray(result.result) && result.result.length > 0) {
          setData(result.result);
          setNoDataMessage('');
        } else {
          setData([]);
          setNoDataMessage('There are no token transactions found for this address.');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setData([]);
        setNoDataMessage('Error fetching data.');
      });
  }, [address]);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = () => {
    return currentItems.map((item, index) => {
      const { hash, from, to, tokenName, tokenSymbol, value } = item;
      return (
        <tr key={index} className="border-b border-gray-300">
          <td className="py-2">{hash}</td>
          <td className="py-2">{from}</td>
          <td className="py-2">{to}</td>
          <td className="py-2">{tokenName}</td>
          <td className="py-2">{tokenSymbol}</td>
          <td className="py-2">{value}</td>
        </tr>
      );
    });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <span className="font-bold text-4xl">Tokens</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg mb-4"></div>
      <div className="border-dashed border border-zinc-500 w-full h-full rounded-lg overflow-auto">
        <input 
          type="text" 
          value={address} 
          onChange={handleChange} 
          placeholder="Enter address" 
          className="border rounded p-2 mb-4 w-full"
        />
        {data.length > 0 ? (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="py-2">Hash</th>
                <th className="py-2">From</th>
                <th className="py-2">To</th>
                <th className="py-2">Token Name</th>
                <th className="py-2">Token Symbol</th>
                <th className="py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {renderTableData()}
            </tbody>
          </table>
        ) : (
          <div className="mt-4 text-center">{noDataMessage}</div>
        )}
        {data.length > 0 && (
          <div className="flex justify-center mt-4">
            {pageNumbers.map(number => (
              <button 
                key={number} 
                onClick={() => handlePageChange(number)} 
                className={`px-3 py-1 mx-1 border ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GraphicDesignPage;
