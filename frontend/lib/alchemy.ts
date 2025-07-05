import { Alchemy, Network, TokenBalance } from "alchemy-sdk";

// TODO: Replace with your Alchemy API key
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "demo";

const config = {
  apiKey: alchemyApiKey,
  network: Network.BASE_MAINNET,
};

const alchemy = new Alchemy(config);

export const STABLECOIN_ADDRESSES = {
    'USDC': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    'DAI': '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    'USDT': '0xf334a13876e537d721b53295b9a701465e976606', 
};

export interface FormattedTokenBalance {
    name: string;
    symbol: string;
    logo?: string | null;
    balance: string;
    address: string;
}

export const getStablecoinBalances = async (ownerAddress: string): Promise<FormattedTokenBalance[]> => {
    try {
        const tokenAddresses = Object.values(STABLECOIN_ADDRESSES);
        const balances = await alchemy.core.getTokenBalances(ownerAddress, tokenAddresses);

        const formattedBalances = await Promise.all(
            balances.tokenBalances.map(async (token: TokenBalance) => {
                const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
                const balance = token.tokenBalance
                ? (parseInt(token.tokenBalance) / Math.pow(10, metadata.decimals || 18)).toFixed(2)
                : "0.00";
                
                return {
                    name: metadata.name || '',
                    symbol: metadata.symbol || '',
                    logo: metadata.logo,
                    balance: balance,
                    address: token.contractAddress
                };
            })
        );

        return formattedBalances.filter(token => parseFloat(token.balance) > 0);

    } catch(error) {
        console.error("Error fetching stablecoin balances:", error);
        return [];
    }
} 