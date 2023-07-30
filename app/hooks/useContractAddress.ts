import { useMemo } from "react";
import { ChainId, getChainId } from "../chains";
import { currentWallet } from "../wallets";

type ContractAddressList = {
    USDC: string;
};

type ContractName = keyof ContractAddressList;

const contractAddressListByChain: Record<ChainId, ContractAddressList> = {
    [ChainId.CronosMainnet]: {
        USDC: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    },
    [ChainId.CronosTestnet]: {
        USDC: "0xf0307093f23311fe6776a7742db619eb3df62969",
    },
};

export const useContractAddress = (contractName: ContractName): string => {
    const walletChainId = currentWallet.useChainId();
    const chainId = getChainId(walletChainId);

    return useMemo(() => {
        return contractAddressListByChain[chainId][contractName];
    }, [chainId, contractName]);
};
