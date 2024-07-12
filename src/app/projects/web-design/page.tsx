"use client"
import React, { useState, useEffect } from 'react';

const WebDesignPage = () => {
  const [txhash, setTxhash] = useState('0xb1a87cD6C0C1e5C6E5044111014C61A603CD4974');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    fetch(`https://ubitscan.io/api?module=account&action=txlistinternal&txhash=${txhash}`)
      .then(response => response.json())
      .then(result => {
        // Assuming the actual data is in result.result
        if (result && Array.isArray(result.result) && result.result.length > 0) {
          setData(result.result);
          setNoDataMessage('');
        } else {
          setData([]);
          setNoDataMessage('There are no internal transactions found for this address.');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setData([]);
        setNoDataMessage('Error fetching data.');
      });
  }, [txhash]);

  const handleChange = (e) => {
    setTxhash(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = () => {
    return currentItems.map((item, index) => {
      const { gas, hash, from, to } = item;
      return (
        <tr key={index} className="border-b border-gray-300">
          <td className="py-2">{hash}</td>
          <td className="py-2">{from}</td>
          <td className="py-2">{to}</td>
          <td className="py-2">{gas}</td>
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
      <span className="font-bold text-4xl">Internal Transactions</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg mb-4"></div>
      <div className="border-dashed border border-zinc-500 w-full h-full rounded-lg overflow-auto">
        <input 
          type="text" 
          value={txhash} 
          onChange={handleChange} 
          placeholder="Enter transaction hash" 
          className="border rounded p-2 mb-4 w-full"
        />
        {data.length > 0 ? (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="py-2">Hash</th>
                <th className="py-2">From</th>
                <th className="py-2">To</th>
                <th className="py-2">Gas</th>
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

export default WebDesignPage;
