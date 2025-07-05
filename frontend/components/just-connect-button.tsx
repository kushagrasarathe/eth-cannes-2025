"use client";

import { useConnectOrCreateWallet, useLogout } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";

export const CustomConnectButton = () => {
  const { connectOrCreateWallet } = useConnectOrCreateWallet();

  return (
    <button
      className="rounded-md text-xs w-fit border-2 border-dashed border-black bg-white px-2 cursor-pointer py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-md active:shadow-none"
      onClick={() => connectOrCreateWallet()}
    >
      Connect
    </button>
  );
};
