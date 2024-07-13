"use client";
import React, { useState, useEffect } from "react";

const ProjectsPage = () => {
  const [address, setAddress] = useState("0xb1a87cD6C0C1e5C6E5044111014C61A603CD4974");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://ubitscan.io/api?module=account&action=txlist&address=${address}`)
      .then((response) => response.json())
      .then((result) => {
        if (result && Array.isArray(result.result)) {
          setData(result.result);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [address]);

  const handleChange = (e: any) => {
    setAddress(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = () => {
    return currentItems.map((item, index) => {
      const { gas, hash, from, to } = item;
      return (
        <tr key={index} className="border-b border-gray-300 hover:bg-blue-100 transition-colors">
          <td className="py-2 px-4">{hash}</td>
          <td className="py-2 px-4">{from}</td>
          <td className="py-2 px-4">{to}</td>
          <td className="py-2 px-4">{gas}</td>
        </tr>
      );
    });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
      <h1 className="font-bold text-4xl text-center text-white mb-4">Transactions from Searched Address</h1>
      <div className="border-dashed border-2 border-white w-full h-12 rounded-lg mb-4 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <div className="border-dashed border-2 border-white w-full h-full rounded-lg overflow-auto p-6 bg-white shadow-inner">
        <input
          type="text"
          value={address}
          onChange={handleChange}
          placeholder="Enter address"
          className="border border-blue-300 rounded-full p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <table className="table-auto w-full mt-4 bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <th className="py-2 px-4">Hash</th>
              <th className="py-2 px-4">From</th>
              <th className="py-2 px-4">To</th>
              <th className="py-2 px-4">Gas</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        <div className="flex justify-center mt-4 space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 mx-1 border-2 border-transparent rounded-full transition-colors ${
                currentPage === number
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
