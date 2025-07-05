import type { PrivyClientConfig } from '@privy-io/react-auth';
import { base } from 'wagmi/chains';

// Replace this with your Privy config
export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'all-users',
    showWalletUIs: false
  },
  loginMethods: ['passkey'],
  defaultChain: base,
  appearance: {
    walletList: [],
    showWalletLoginFirst: true
  }
  // appearance: { showWalletLoginFirst: true }
};
