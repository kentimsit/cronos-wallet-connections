import { useMemo } from "react";
import { getChainConfig } from "../chains";
import { currentWallet } from "../wallets";
import { providers } from "ethers";

export const useJsonRpcProvider = (): providers.StaticJsonRpcProvider => {
    const walletChainId = currentWallet.useChainId();
    const { chainName, ensAddress, rpcUrls, chainId } =
        getChainConfig(walletChainId);
    const rpcUrl = rpcUrls[0];

    return useMemo(() => {
        return new providers.StaticJsonRpcProvider(rpcUrl, {
            name: chainName,
            chainId,
            ensAddress,
        });
    }, [chainName, chainId, rpcUrl, ensAddress]);
};
