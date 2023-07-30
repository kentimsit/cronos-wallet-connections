"use client";
import { Signer, ethers } from "ethers";
import { Button, useToast, VStack } from "@chakra-ui/react";
import useStore from "@/app/store/store";
import { currentWallet } from "../wallets";
import { useCallback, useState } from "react";
import { Crc20__factory } from "@/contracts/types";
import { Loading } from "./Loading";
import { TransactionLink } from "./TransactionLink";
import { useContractAddress } from "../hooks/useContractAddress";

const { useIsConnected, useAccount, useProvider } = currentWallet;

export function WriteChain() {
    const lastTransactionHash = useStore((state) => state.lastTransactionHash);
    const lastTransactionHashAction = useStore(
        (state) => state.setLastTransactionHash,
    );
    const isConnected = useIsConnected();
    const account = useAccount();
    const web3Provider = useProvider();
    const [isCroTxLoading, setIsCroTxLoading] = useState(false);
    const [isUsdcTxLoading, setIsUsdcTxLoading] = useState(false);
    const usdcAddress = useContractAddress("USDC");
    const isLoading = isCroTxLoading || isUsdcTxLoading;
    const toast = useToast();

    // `handleCro` tx can only be triggered when you are connected to wallet.
    // And we can web3Provider, signer, and account is for sure available.
    const handleCroTx = useCallback(async () => {
        const signer = web3Provider?.getSigner() as Signer;
        try {
            setIsCroTxLoading(true);

            const txResponse = await signer.sendTransaction({
                to: account as string,
                value: ethers.utils.parseEther("1"),
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

    const handleUsdcTx = useCallback(async () => {
        const signer = web3Provider?.getSigner() as Signer;
        try {
            setIsUsdcTxLoading(true);

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
