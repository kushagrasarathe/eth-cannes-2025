import type { Hex } from "viem";
import {
  createWalletClient,
  custom,
  http
} from "viem";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { getEntryPoint, KERNEL_V3_3_BETA } from "@zerodev/sdk/constants";
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { sepolia } from "viem/chains";
import { useWallets } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

import { publicClient } from "@/services/wagmi";

const bundlerRpc = process.env.NEXT_PUBLIC_BUNDLER_RPC;
const paymasterRpc = process.env.NEXT_PUBLIC_PAYMASTER_RPC;

const chain = sepolia;
const kernelVersion = KERNEL_V3_3_BETA;
const entryPoint = getEntryPoint("0.7");

const useKernelClient = () => {
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  if(!embeddedWallet) {
    throw new Error("No embedded wallet found");
  }

  const queryResult = useQuery({
    queryKey: ["kernel-client", embeddedWallet.address],
    staleTime: Infinity,
    queryFn: async () => {
      const walletClient = createWalletClient({
        account: embeddedWallet.address as Hex,
        chain,
        transport: custom(await embeddedWallet.getEthereumProvider()),
      });

      const ecdsaValidator = await signerToEcdsaValidator(
        publicClient,
        {
          signer: walletClient,
          entryPoint,
          kernelVersion,
        }
      );

      const account = await createKernelAccount(publicClient, {
        plugins: { sudo: ecdsaValidator, },
        entryPoint,
        kernelVersion,
        // Set the address of the smart account to the EOA address
        address: walletClient.account.address,
      });

      const paymasterClient = createZeroDevPaymasterClient({
        chain,
        transport: http(paymasterRpc),
      });

      const kernelClient = createKernelAccountClient({
        account,
        chain,
        bundlerTransport: http(bundlerRpc),
        paymaster: paymasterClient,
        client: publicClient,
      });

      return kernelClient;
    },
    enabled: !!embeddedWallet,
  })

  return queryResult;
}

export default useKernelClient;