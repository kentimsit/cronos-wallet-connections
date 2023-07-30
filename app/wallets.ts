import { rpcMap } from "./chains";
import { MetaMask } from "@web3-wallet/metamask";
import { DeFiWallet } from "@web3-wallet/defiwallet";
import { TrustWallet } from "@web3-wallet/trust-wallet";
import { WalletConnect } from "@web3-wallet/walletconnect";
import type { Connector, WalletName } from "@web3-wallet/react";
import { createCurrentWallet } from "@web3-wallet/react";

export type WalletConfig = {
    walletName: WalletName;
    icon: string;
    connector: Connector;
    label?: string;
};

export const walletConfigs: WalletConfig[] = [
    {
        walletName: MetaMask.walletName,
        label: `${MetaMask.walletName} / Rabby`,
        icon: MetaMask.walletIcon,
        connector: new MetaMask(),
    },
    {
        walletName: DeFiWallet.walletName,
        icon: DeFiWallet.walletIcon,
        connector: new DeFiWallet(),
    },
    {
        walletName: WalletConnect.walletName,
        icon: WalletConnect.walletIcon,
        connector: new WalletConnect({
            providerOptions: {
                projectId: "f30b7f87c783bab76df3a66876f2a67f",
                rpcMap,
                /**
                 * @note Chains that your app intents to use and the peer MUST support.
                 *  If the peer does not support these chains, the connection will be rejected.
                 * @default [1]
                 * @example [1, 3, 4, 5, 42]
                 */
                chains: [25],
                /**
                 * @note Optional chains that your app MAY attempt to use and the peer MAY support.
                 *  If the peer does not support these chains, the connection will still be established.
                 * @default [1]
                 * @example [1, 3, 4, 5, 42]
                 */
                // optionalChains: [25],
                showQrModal: true,
                optionalMethods: [
                    "eth_signTypedData",
                    "eth_signTypedData_v4",
                    "eth_sign",
                ],
            },
        }),
    },
    {
        walletName: TrustWallet.walletName,
        icon: TrustWallet.walletIcon,
        connector: new TrustWallet(),
    },
];

export const getWalletConfig = (walletName: WalletName): WalletConfig => {
    return walletConfigs.find(
        (v) => v.walletName === walletName,
    ) as WalletConfig;
};

export const currentWallet = createCurrentWallet(
    walletConfigs.map((v) => v.connector),
);
