"use client";
import React, { useMemo } from "react";
import { HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";

import { getNetwork, isSupportedChainId } from "@/app/chains";
import { currentWallet, getWalletConfig } from "@/app/wallets";
import { ReadChain } from "./ReadChain";
import { WriteChain } from "./WriteChain";
import { ShortAddress } from "./ShortAddress";
import { WrongChainAlert } from "./WrongChainAlert";

const { useWalletName, useIsConnected, useAccount, useChainId, useEnsName } =
    currentWallet;

export function Welcome() {
    const walletName = useWalletName();
    const isConnected = useIsConnected();
    const chainId = useChainId();
    const account = useAccount();
    const ensName = useEnsName(getNetwork(chainId));
    // check if wallet connected to a supported chain
    const isSupportedChain = useMemo(
        () => isSupportedChainId(chainId),
        [chainId],
    );

    const walletStatus = useMemo(() => {
        if (isConnected) {
            const walletConfig = getWalletConfig(walletName);

            return (
                <VStack
                    gap={3}
                    fontSize="xl"
                    color="black"
                    alignItems="flex-start"
                >
                    <HStack gap={2} fontSize="xl">
                        <Image
                            w={6}
                            h={6}
                            src={walletConfig.icon}
                            alt={walletName}
                        />
                        <Text>{walletName}</Text>
                    </HStack>
                    <Text>Chain ID: {chainId}</Text>
                    <HStack>
                        <Text>Wallet address:</Text>
                        <ShortAddress address={account as string} />
                        <Text>{ensName && `(${ensName})`}</Text>
                    </HStack>
                </VStack>
            );
        }

        return (
            <VStack gap={3} alignItems="flex-start" fontSize="xl" color="black">
                <Text>No wallet information yet.</Text>
                <Text>Please log in.</Text>
            </VStack>
        );
    }, [isConnected, account, chainId, ensName, walletName]);

    return (
        <VStack m={5} gap={5} alignItems="flex-start">
            <Text as="h1" fontSize="4xl" color="black">
                Web3 Wallet Connection Demo
            </Text>
            {walletStatus}
            {isSupportedChain && (
                <>
                    <ReadChain />
                    <Spacer />
                    <WriteChain />
                </>
            )}
            {isConnected && !isSupportedChain && <WrongChainAlert />}
        </VStack>
    );
}
