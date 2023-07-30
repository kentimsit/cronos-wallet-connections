declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_CRONOS_MAINNET_RPC_URL: string;
            readonly NEXT_PUBLIC_CRONOS_TESTNET_RPC_URL: string;
            readonly NEXT_PUBLIC_BLOCKCHAIN_NETWORK:
                | "cronosMainnet"
                | "cronosTestnet";
            readonly NEXT_PUBLIC_SIGNIN_MESSAGE: string;
        }
    }
}

// don't remove the empty export
export {};
