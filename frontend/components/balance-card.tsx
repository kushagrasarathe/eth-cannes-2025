import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface BalanceCardProps {
  token: string;
  amount: string;
  apy: string;
}

export function BalanceCard({ token, amount, apy }: BalanceCardProps) {
  return (
    <Card className="min-h-[180px] relative bg-gradient-to-l w-full from-[#714bcd] via-[#8f5bd9] to-[#a567e3] border-white border-2 text-white min-w-fit shadow-[0px_10px_1px_rgba(165,_103,_227,_0.3),_0_10px_20px_rgba(204,_204,_204,_1)]">
      <Image
        src="/alien.png"
        alt="alice"
        width={100}
        height={100}
        className="absolute right-0 w-auto top-0 h-[90%] mt-2 opacity-80"
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0">
        <CardTitle className="text-sm font-medium py-0">{token}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 items-start py-0">
        <div className="text-3xl -mt-2 font-bold">${amount}</div>
        <p className="text-xs text-white mt-2">+{apy}% APY from Aave</p>
      </CardContent>
    </Card>
  );
}
