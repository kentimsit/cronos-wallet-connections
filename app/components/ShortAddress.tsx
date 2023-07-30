"use client";
import type { TextProps } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

/**
 * @param param.address the address to display
 * @param param.leadingChars how many leading chars to display, default to 6
 * @param param.tailingChars how many leading chars to display, default to 4
 * @param param.isExpanded if true, will display the full address, default to false
 */
export type ShortAddressProps = {
    address: string;
    leadingChars?: number;
    tailingChars?: number;
    isExpanded?: boolean;
} & TextProps;

export function ShortAddress({
    address,
    leadingChars = 6,
    tailingChars = 4,
    isExpanded = false,
    ...rest
}: ShortAddressProps) {
    if (!address) return null;
    if (isExpanded) return <Text {...rest}>{address}</Text>;

    return (
        <Text {...rest}>
            {address.slice(0, leadingChars)}...{address.slice(-tailingChars)}
        </Text>
    );
}
