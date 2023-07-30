"use client";
import React from "react";
import {
    Box,
    Button,
    Flex,
    useDisclosure,
    HStack,
    Image,
} from "@chakra-ui/react";
import { getNetwork } from "@/app/chains";
import { currentWallet } from "@/app/wallets";
import { ShortAddress } from "./ShortAddress";
import { WalletModal } from "./WalletModal";

const { disconnect, useChainId, useIsConnected, useAccount, useEnsName } =
    currentWallet;

export function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isConnected = useIsConnected();
    const account = useAccount();
    const chainId = useChainId();
    const ensName = useEnsName(getNetwork(chainId));

    return (
        <>
            <WalletModal isOpen={isOpen} onClose={onClose} />
            <Flex
                bg="gray.300"
                px={8}
                py={4}
                alignItems="center"
                justifyContent="space-between"
            >
                <HStack gap={6}>
                    <Box>
                        <Image
                            width={10}
                            height={10}
                            src="/cronos.svg"
                            alt="Logo"
                        />
                    </Box>
                    {isConnected && (
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                disconnect();
                            }}
                        >
                            Log out
                        </Button>
                    )}
                </HStack>
                <Button onClick={onOpen} colorScheme="blue">
                    {isConnected &&
                        (ensName || (
                            <ShortAddress address={account as string} />
                        ))}
                    {!isConnected && "Login"}
                </Button>
            </Flex>
        </>
    );
}
