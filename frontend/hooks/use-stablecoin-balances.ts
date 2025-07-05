import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { getStablecoinBalances, FormattedTokenBalance } from '@/lib/alchemy';

export const useStablecoinBalances = () => {
    const { address, isConnected } = useAccount();

    return useQuery<FormattedTokenBalance[], Error>({
        queryKey: ['stablecoinBalances', address],
        queryFn: () => {
            if (!address) {
                return Promise.resolve([]);
            }
            return getStablecoinBalances(address);
        },
        enabled: isConnected && !!address,
        refetchInterval: 15000, // Refetch every 15 seconds
    });
}; 