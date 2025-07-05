import type { Hex, SignAuthorizationReturnType } from "viem";
import {
  createPublicClient,
  http,
  createWalletClient,
  custom,
  zeroAddress,
} from "viem";
import {
  getEntryPoint,
  KERNEL_V3_3_BETA,
  KernelVersionToAddressesMap,
} from "@zerodev/sdk/constants";
import { base } from "viem/chains";
import type { ConnectedWallet } from "@privy-io/react-auth";
import {
  usePrivy, useSign7702Authorization, useWallets
} from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { Loader } from "lucide-react";
import React from "react";

import { CustomConnectButton } from "./just-connect-button";

const bundlerRpc = process.env.NEXT_PUBLIC_BUNDLER_RPC;
const paymasterRpc = process.env.NEXT_PUBLIC_PAYMASTER_RPC;

const chain = base;
const kernelVersion = KERNEL_V3_3_BETA;
const entryPoint = getEntryPoint("0.7");
const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const useAuthMutation = ({
  signAuthFn,
  embeddedWallet,
}: {
  signAuthFn: (args: {
    contractAddress: `0x${string}`,
    chainId: number,
  }) => Promise<SignAuthorizationReturnType>
  embeddedWallet: ConnectedWallet,
}) => {
  const authMutation = useMutation({
    mutationFn: async ({
      embeddedWallet,
      signAuthFn,
    }: {
      embeddedWallet: ConnectedWallet | undefined,
      signAuthFn: (args: {
        contractAddress: `0x${string}`,
        chainId: number,
      }) => Promise<SignAuthorizationReturnType>
    }) => {
      if(!embeddedWallet) {
        return;
      }

      try {
        const bytecode = await publicClient.getBytecode({ address: embeddedWallet.address as `0x${string}` });

        if(!bytecode) {
          const authorization = await signAuthFn({
            contractAddress:
            KernelVersionToAddressesMap[kernelVersion]
              .accountImplementationAddress,
            chainId: chain.id,
          });

          const walletClient = createWalletClient({
            // Use any Viem-compatible EOA account
            account: embeddedWallet.address as Hex,
            // We use the Odyssey testnet here, but you can use any network that
            // supports EIP-7702.
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
            // Set the 7702 authorization
            eip7702Auth: authorization,
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

          const userOpHash = await kernelClient.sendUserOperation({
            calls: [{
              to: zeroAddress,
              value: BigInt(0),
              data: "0x"
            }],
          });

          const { receipt } =
            await kernelClient.waitForUserOperationReceipt({ hash: userOpHash, });

          console.log('authorization', authorization);
          console.log('receipt', receipt);

          const bytecode = await publicClient.getBytecode({ address: embeddedWallet.address as `0x${string}` });
          console.log('new bytecode', bytecode);

          return bytecode;
        }

        return bytecode; 
      } catch (error) {
        console.log('error', error);
        return null;
      }
    },
  });

  useEffect(() => {
    if(embeddedWallet?.address) {
      authMutation.mutate({
        embeddedWallet,
        signAuthFn,
      });
    }
  }, [embeddedWallet?.address]);

  return authMutation;
}

export const AuthGuardInner = ({
  children,
  embeddedWallet
}: {
  children: React.ReactNode,
  embeddedWallet: ConnectedWallet
}) => {
  const { ready, authenticated } = usePrivy();

  const { signAuthorization } = useSign7702Authorization();

  const authorisationGuardResult = useAuthMutation({
    signAuthFn: signAuthorization,
    embeddedWallet,
  });

  if(!ready || !authenticated) {
    return (
      <div className="flex flex-1 h-fullitems-center justify-center">
        <CustomConnectButton />
      </div>
    );
  }

  if(authorisationGuardResult.isSuccess && !authorisationGuardResult.data) {
    console.log('no bytecode found');
    console.log('authorisationGuardResult', authorisationGuardResult.error);

    return (
      <div>
        <p>No bytecode found</p>
      </div>
    )
  }

  return children;
};

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated } = usePrivy();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  const MemoisedAuthGuardInner = React.useMemo(() => {
    if(!embeddedWallet) {
      return null;
    }

    return <AuthGuardInner embeddedWallet={embeddedWallet}>{children}</AuthGuardInner>;
  }, [embeddedWallet, children]);

  if(!ready) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }

  if(!authenticated) {
    return (
      <div className="flex flex-1 h-full items-center justify-center">
        <CustomConnectButton />
      </div>
    );
  }

  if(!embeddedWallet) {
    return (
      <div>
        <p>No embedded wallet found</p>
      </div>
    )
  }

  return MemoisedAuthGuardInner;
}
