"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";
import { BalanceCard } from "@/components/balance-card";
import { PerformanceChart } from "@/components/performance-chart";
import Image from "next/image";
import React from "react";
import SpotlightButton from "@/components/ui/animated-btn";
import { createClient } from "viem";
import { http } from "viem";
import { Chains } from "porto";
import { Key, ServerActions } from "porto/viem";
import { CustomConnectButton } from "@/components/custom-connect-button";

const balances = [{ token: "USDC", amount: "10,430", apy: "4.5" }];


export default function HomePage() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
    }
  };

  const connector = connectors.find(
    (connector) => connector.id === "xyz.ithaca.porto"
  );

  if (!account.isConnected) {
    return (
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        className="mouse-cursor-gradient-tracking flex flex-col gap-4 items-center justify-center text-center min-h-[74vh] mt-2"
      >
        <Image src="/alien.png" alt="Zen Yield Logo" width={160} height={100} />
        <Image
          src="/banner.png"
          alt="Zen Yield Logo"
          width={400}
          height={200}
        />
        {/* 
        <button
          onClick={async () => {
            const base = {
              ...Chains.base,
              contracts: {
                ...Chains.base.contracts,
                portoAccount: "0x883ac1afd6bf920755ccee253669515683634930",
              },
            };


            const client = createClient({
              chain: base as any,
              transport: http(),
            });

            const account = await ServerActions.createAccount(client, {
              authorizeKeys: [Key.createSecp256k1()],
            });
            console.log(account);
          }}
          type="button"
          // disabled={!connector}
          className="rounded-md w-fit border-2 border-dashed border-black bg-white px-6 cursor-pointer py-2.5 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-md active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get started
        </button> */}

        <CustomConnectButton />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-black pt-6 px-4 relative">
      <div className="flex justify-between items-center fixed top-12 left-0 w-full px-4">
        <h1 className="text-xl font-bold">
          <Image
            src="/logo.png"
            alt="Zen Yield Logo"
            width={100}
            height={100}
          />
        </h1>
        {/* <button
          onClick={() => disconnect()}
          type="button"
          className="rounded-md w-fit border-2 border-dashed border-black bg-white px-6 cursor-pointer py-2.5 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-md active:shadow-none"
        >
          Sign out
        </button> */}
        <CustomConnectButton />
      </div>

      <div className="mt-16 space-y-3">
        <p className="text-xs text-center font-mono">
          Connected: {account.address?.slice(0, 6)}...
          {account.address?.slice(-4)}
        </p>
        {balances.map((balance) => (
          <BalanceCard key={balance.token} {...balance} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <PerformanceChart />

        <Link href="/zen">
          <SpotlightButton text="Go Zen Mode ⚡️" />
        </Link>
        {/* <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-neutral-700 rounded-md">
              <p className="text-muted-foreground text-sm">
                Activity feed coming soon
              </p>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
