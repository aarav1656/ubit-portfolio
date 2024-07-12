'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThirdwebProvider } from 'thirdweb/react';


const queryClient = new QueryClient();  

export function Providers({ children }: { children: React.ReactNode }) {

  const ubitscan = {
    "chain": "UBIT SMART CHAIN",
    "chainId": 44433,
    "explorers": [],
    "faucets": [],
    "infoURL": "https://www.ubchain.site",
    "name": "UBIT Smart Chain(testnet)",
    "nativeCurrency": {
      "name": "USC",
      "symbol": "USC",
      "decimals": 18
    },
    "networkId": 44433,
    "rpc": [
      "https://testnet-rpc.ubitscan.io/"
    ],
    "shortName": "ubit-smart-chain",
    "slip44": 1,
    "slug": "ubit-smart-chain-testnet",
    "testnet": true
  };

  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
      </ThirdwebProvider>
  );
}
