"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import SuccessAnimation from "@/components/success-animation";
import { useStablecoinBalances } from "@/hooks/use-stablecoin-balances";
import { Skeleton } from "@/components/ui/skeleton";

export default function ZenModePage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { data: balances, isLoading } = useStablecoinBalances();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
        router.push("/");
    }, 4500); // Wait for animation to complete before redirecting
  };

  if (!isConnected) {
    return router.push("/");
  }

  return (
    <>
      {showSuccess && <SuccessAnimation />}
      <div className="w-full text-black px-3 space-y-6 relative">
        <Link href="/" className="flex items-center gap-1 text-sm mb-4">
          <ChevronLeft size={16} />
          Back
        </Link>
        <div className="text-start space-y-1 mt-6 px-2">
          <h1 className="text-2xl font-bold text-black">Select Assets</h1>
          <p className="text-black text-xs">
            Select the assets you want to put to work.
          </p>
        </div>
        <Card className="bg-transparent text-black shadow-none w-full p-0 pb-20">
          <CardContent className="p-0 w-full ">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="space-y-6 w-full">
                {isLoading && (
                    <>
                        <Skeleton className="h-[150px] w-full rounded-2xl bg-gray-300" />
                        <Skeleton className="h-[150px] w-full rounded-2xl bg-gray-300" />
                    </>
                )}
                {!isLoading && balances && balances.map((asset) => (
                  <div
                    key={asset.address}
                    className="relative p-4 flex flex-col bg-gradient-to-l py-6 w-full from-[#714bcd] via-[#8f5bd9] to-[#a567e3] border-white border-2 text-white min-w-fit shadow-[0px_10px_1px_rgba(165,_103,_227,_0.3),_0_10px_20px_rgba(204,_204,_204,_1)] rounded-2xl"
                  >
                    <Image
                      src="/alien.png"
                      alt="alice"
                      width={100}
                      height={100}
                      className="absolute right-0 w-auto top-0 h-[90%] mt-2 opacity-80"
                    />
                    <div className="flex items-start space-x-3 text-white cursor-pointer">
                      <Checkbox id={asset.address} className="border-white" />
                      <Label
                        htmlFor={asset.address}
                        className="text-base -mt-0.5 space-y-0 flex flex-col items-start justify-start"
                      >
                        <div className="font-semibold cursor-pointer">{asset.name} ({asset.symbol})</div>
                      </Label>
                    </div>
                    <span className="text-xs text-white py-2.5">
                      Balance: {asset.balance}
                    </span>
                    <div className="w-3/5">
                      <Input
                        type="text"
                        placeholder="Amount"
                        className="bg-white dark:bg-white/80 text-black rounded-sm border border-white"
                      />
                    </div>
                  </div>
                ))}
                {!isLoading && balances?.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        <p>No stablecoins found on Base.</p>
                        <p className="text-sm">Make sure your wallet is connected to the Base network.</p>
                    </div>
                )}
              </div>
              <div className="px-6 fixed bottom-0 rounded-b-3xl left-0 right-0 bg-white py-5 shadow-lg">
                <Button 
                    type="submit"
                    className="rounded-md text-xs h-12 w-full border-2 border-dashed border-black bg-white px-2 cursor-pointer py-2.5 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-md active:shadow-none">
                    Confirm
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
 