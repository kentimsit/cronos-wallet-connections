"use client";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, LinkProps, Text } from "@chakra-ui/react";
import { currentWallet } from "../wallets";
import { getChainConfig } from "../chains";

type TransactionLinkProps = Omit<LinkProps, "href"> & {
    txHash: string;
};

const { useChainId } = currentWallet;
export function TransactionLink({
    txHash,
    ...linkProps
}: TransactionLinkProps) {
    const { blockExplorerUrls } = getChainConfig(useChainId());
    const blockExplorerUrl = blockExplorerUrls?.[0];
    const txLink = `${blockExplorerUrl}/tx/${txHash}`;

    return (
        <Link
            href={txLink}
            gap={1}
            isExternal
            display="flex"
            alignItems="center"
            {...linkProps}
        >
            <Text>Last transaction: {txHash}</Text>
            <ExternalLinkIcon />
        </Link>
    );
}
