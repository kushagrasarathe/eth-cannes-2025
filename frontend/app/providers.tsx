"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
// import { createConfig, http, WagmiProvider } from "wagmi";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  baseSepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { porto } from "porto/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { privyConfig } from "@/hooks/privy";
import { http } from "viem";
// import { config } from "@/config";
import { AuthGuard } from "@/components/auth-guard";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const config = createConfig({
  chains: [base],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
const PRIVY_APP_CLIENT_ID = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!;
const PRIVY_APP_SECRET = process.env.NEXT_PUBLIC_PRIVY_APP_SECRET!;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_APP_CLIENT_ID}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config as any}>
          <RainbowKitProvider theme={darkTheme()}>
            {/* <AuthGuard> */}
              {children}
            {/* </AuthGuard> */}
          </RainbowKitProvider>
      </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
