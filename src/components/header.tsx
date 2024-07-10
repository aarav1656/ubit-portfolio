'use client';

import React from 'react';
import { ConnectButton } from 'thirdweb/react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from 'thirdweb';
 
const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
  });

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className=" bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">UBIT Portfolio Tracker</span>
          </Link>
        </div>

        <div className="hidden md:block">
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={"dark"}
          connectModal={{ size: "wide" }}
        />
        </div>
      </div>
    </div>
  );
};

export default Header;
