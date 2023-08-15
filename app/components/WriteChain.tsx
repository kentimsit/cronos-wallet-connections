"use client";
import { Signer, ethers } from "ethers";
import { Button, useToast, VStack } from "@chakra-ui/react";
import useStore, { IReadData } from "@/app/store/store";
import { currentWallet } from "../wallets";
import { useCallback, useState } from "react";
import { Crc20__factory } from "@/contracts/types";
import { Loading } from "./Loading";
import { TransactionLink } from "./TransactionLink";
import { useContractAddress } from "../hooks/useContractAddress";

const { useIsConnected, useAccount, useProvider } = currentWallet;

export function WriteChain() {
    const readData = useStore((state) => state.readData);
    const readDataAction = useStore((state) => state.setReadData);
    const lastTransactionHash = useStore((state) => state.lastTransactionHash);
    const lastTransactionHashAction = useStore(
        (state) => state.setLastTransactionHash,
    );
    const isConnected = useIsConnected();
    const account = useAccount();
    const web3Provider = useProvider();
    const [isSigLoading, setIsSigLoading] = useState(false);
    const [isCroTxLoading, setIsCroTxLoading] = useState(false);
    const [isUsdcTxLoading, setIsUsdcTxLoading] = useState(false);
    const usdcAddress = useContractAddress("USDC");
    const isLoading = isCroTxLoading || isUsdcTxLoading;
    const toast = useToast();

    const createRandomMessageId = (): string => {
        const randomNumber: number = Math.floor(Math.random() * 1000000000);
        return randomNumber.toString().padStart(9, "0");
    };

    // Creates a Message signature
    // No on-chain action
    const handleSig = useCallback(async () => {
        const signer = web3Provider?.getSigner() as Signer;
        const readDataOriginal: IReadData = { ...readData};    
        try {
            setIsSigLoading(true);
            const msg = "I am signing this message in order to security certify ownership of my wallet address. This signature is not used to authorize any transactions. (Msg ID: " +
            createRandomMessageId() +
            ")"
            const signedMessage = await signer.signMessage(msg);
            const verifiedSigningAddress = ethers.utils.verifyMessage(msg, signedMessage);
            const newReadData = { ...readDataOriginal,
                verifiedAddress: verifiedSigningAddress
            };
            readDataAction(newReadData);

        } catch (e: unknown) {
            toast({
                position: "top",
                status: "error",
                description: (e as Error).message ?? "Signature failed",
            });
        } finally {
            setIsSigLoading(false);
        }
    }, [readData, readDataAction, toast, web3Provider]);

    // Creates a CRO transfer transaction.
    // Transactionx can only be triggered after wallet connected.
    // We first make sure that web3Provider, signer, and account is
    // available after wallet connected.
    // The data field 0x is required, according to DeFi Wallet specification.
    const handleCroTx = useCallback(async () => {
        const signer = web3Provider?.getSigner() as Signer;
        try {
            setIsCroTxLoading(true);

            const txResponse = await signer.sendTransaction({
                to: account as string,
                value: ethers.utils.parseEther("1"),
                data: "0x",
            });

            const receipt = await txResponse.wait();

            toast({
                position: "top",
                status: "success",
                description: "You just sent 1 CRO to yourself",
            });

            lastTransactionHashAction(receipt.transactionHash);
        } catch (e: unknown) {
            toast({
                position: "top",
                status: "error",
                description: (e as Error).message ?? "Transaction failed",
            });
        } finally {
            setIsCroTxLoading(false);
        }
    }, [web3Provider, account, toast, lastTransactionHashAction]);

    // Creates a USDC transfer transaction.
    const handleUsdcTx = useCallback(async () => {
        const signer = web3Provider?.getSigner() as Signer;
        try {
            setIsUsdcTxLoading(true);

            // Connect to the usdc(crc20) contract.
            // Once connected, you can interact with usdc through the connected contract.
            const usdcContractWithSigner = Crc20__factory.connect(
                usdcAddress,
                signer,
            );

            const txResponse = await usdcContractWithSigner.transfer(
                account as string,
                ethers.utils.parseUnits("1", 6),
            );

            const receipt = await txResponse.wait();

            toast({
                position: "top",
                status: "success",
                description: "You just sent 1 USDC to yourself",
            });

            lastTransactionHashAction(receipt.transactionHash);
        } catch (e: unknown) {
            toast({
                position: "top",
                status: "error",
                description: (e as Error).message ?? "Transaction failed",
            });
        } finally {
            setIsUsdcTxLoading(false);
        }
    }, [web3Provider, account, usdcAddress, toast, lastTransactionHashAction]);

    // return early if not connected to wallet
    if (!isConnected) return null;

    return (
        <VStack gap={3} alignItems="flex-start">
            <Button
                colorScheme="blue"
                size="md"
                isLoading={isSigLoading}
                onClick={handleSig}
            >
                Sign a log-in message
            </Button>
            <Button
                colorScheme="blue"
                size="md"
                isLoading={isCroTxLoading}
                onClick={handleCroTx}
            >
                Transfer 1 CRO to myself
            </Button>
            <Button
                size="md"
                isLoading={isUsdcTxLoading}
                onClick={handleUsdcTx}
                colorScheme="blue"
            >
                Transfer 1 USDC to myself
            </Button>
            {lastTransactionHash && (
                <TransactionLink txHash={lastTransactionHash} />
            )}
            {isLoading && <Loading />}
        </VStack>
    );
}
