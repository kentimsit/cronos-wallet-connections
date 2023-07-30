import type { Network } from "@ethersproject/providers";
import type { AddEthereumChainParameter } from "@web3-wallet/react";

/**
 * Add the chains supported by your dApp to this enum and
 * update the chainConfigs array below accordingly.
 */
export enum ChainId {
    CronosMainnet = 25,
    CronosTestnet = 338,
}

/**
 * Collect all the supported chains as an array and export it.
 */
export const supportedChainIds = Object.values(ChainId).filter(
    (v) => !Number.isNaN(Number(v)),
);

export type ChainConfig = AddEthereumChainParameter & {
    ensAddress: string;
};

export const isSupportedChainId = (chainId?: ChainId): chainId is ChainId => {
    if (!chainId) return false;

    return supportedChainIds.some(
        (supportedChainId) => Number(chainId) === supportedChainId,
    );
};

/**
 * getChainId should always returns a supported chainId
 *
 * @param chainId
 * @returns a supported chainId
 */
export const getChainId = (chainId?: ChainId): ChainId => {
    // if the passed chainId is supported, return it directly
    if (isSupportedChainId(chainId)) return chainId;

    // if the passed chainId is not supported, uses the fallback chainId
    const network = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK;

    switch (network) {
        case "cronosMainnet":
            return ChainId.CronosMainnet;
        case "cronosTestnet":
            return ChainId.CronosTestnet;
        default:
            return ChainId.CronosMainnet;
    }
};

export const chainConfigs: ChainConfig[] = [
    {
        chainId: ChainId.CronosMainnet,
        chainName: "Cronos",
        nativeCurrency: {
            name: "CRO",
            symbol: "CRO",
            decimals: 18,
        },
        ensAddress: "0x7F4C61116729d5b27E5f180062Fdfbf32E9283E5",
        rpcUrls: [process.env.NEXT_PUBLIC_CRONOS_MAINNET_RPC_URL],
        blockExplorerUrls: ["https://cronoscan.com/"],
    },
    {
        chainId: ChainId.CronosTestnet,
        chainName: "Cronos Testnet",
        nativeCurrency: {
            name: "TCRO",
            symbol: "TCRO",
            decimals: 18,
        },
        ensAddress: "0x16a23bFBcE9c53998c90201629E4cDB40B81B127",
        rpcUrls: [process.env.NEXT_PUBLIC_CRONOS_TESTNET_RPC_URL],
        blockExplorerUrls: ["https://testnet.cronoscan.com/"],
    },
];

export const getChainRpcUrl = (chainId?: ChainId): string => {
    return getAddChainParameters(getChainId(chainId)).rpcUrls[0];
};

export const getNetwork = (chainId?: ChainId): Network => {
    chainId = getChainId(chainId);

    const { chainName, ensAddress } = chainConfigs.find(
        (v) => v.chainId === chainId,
    ) as ChainConfig;

    return {
        chainId,
        name: chainName,
        ensAddress,
    };
};

export const getChainConfig = (chainId?: ChainId): ChainConfig => {
    return chainConfigs.find(
        (v) => v.chainId === getChainId(chainId),
    ) as ChainConfig;
};

export const getAddChainParameters = (
    chainId?: ChainId,
): AddEthereumChainParameter => {
    chainId = getChainId(chainId);

    return chainConfigs.find(
        (v) => v.chainId === chainId,
    ) as AddEthereumChainParameter;
};

export const rpcMap: Record<number, string> = chainConfigs.reduce<{
    [chainId: number]: string;
}>((acc, params) => {
    acc[params.chainId] = params.rpcUrls[0];
    return acc;
}, {});
