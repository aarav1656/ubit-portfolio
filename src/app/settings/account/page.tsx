"use client"
import React, { useState, useEffect } from 'react';

type Token = {
  name: string;
  symbol: string;
  balance: string;
  decimals: string;
};

const AccountPage = () => {
  const [address, setAddress] = useState('0x5fdF6c1954Fe15327278AcD45696cD7Eb514AFd3');
  const [balance, setBalance] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [noDataMessage, setNoDataMessage] = useState('');
  const [noTokenMessage, setNoTokenMessage] = useState('');

  useEffect(() => {
    fetch(`https://ubitscan.io/api?module=account&action=balance&address=${address}`)
      .then(response => response.json())
      .then(result => {
        if (result && result.status === '1') {
          const balanceInUsdc = (Number(result.result) / 1e18).toFixed(2); // Convert balance to USDC
          setBalance(balanceInUsdc);
          setNoDataMessage('');
        } else {
          setBalance(null);
          setNoDataMessage('No account balance found for this address.');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setBalance(null);
        setNoDataMessage('Error fetching data.');
      });

    fetch(`https://ubitscan.io/api?module=account&action=tokenlist&address=${address}`)
      .then(response => response.json())
      .then(result => {
        if (result && result.status === '1') {
          setTokens(result.result);
          setNoTokenMessage('');
        } else {
          setTokens([]);
          setNoTokenMessage('No tokens found for this address.');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setTokens([]);
        setNoTokenMessage('Error fetching data.');
      });
  }, [address]);

  const handleChange = (e : any) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <span className="font-bold text-4xl">Account</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg mb-4"></div>
      <div className="border-dashed border border-zinc-500 w-full h-full rounded-lg overflow-auto p-4">
        <input 
          type="text" 
          value={address} 
          onChange={handleChange} 
          placeholder="Enter address" 
          className="border rounded p-2 mb-4 w-full"
        />
        {balance !== null ? (
          <div className="mt-4 text-center">
            <span className="font-bold text-2xl">Account Balance: {balance} USDC</span>
          </div>
        ) : (
          <div className="mt-4 text-center">{noDataMessage}</div>
        )}
        {tokens.length > 0 ? (
          <div className="mt-4">
            <span className="font-bold text-2xl">Tokens Owned:</span>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="py-2">Token Name</th>
                  <th className="py-2">Token Symbol</th>
                  <th className="py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-2">{token.name}</td>
                    <td className="py-2">{token.symbol}</td>
                    <td className="py-2">{(Number(token.balance) / 10 ** Number(token.decimals)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 text-center">{noTokenMessage}</div>
        )}
      </div>
    </>
  );
};

export default AccountPage;
