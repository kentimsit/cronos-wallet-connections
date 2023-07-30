"use client";
import { Box, BoxProps, Image } from "@chakra-ui/react";

export function Loading(props: BoxProps) {
    return (
        <Box boxSize="100px" {...props}>
            <Image src="loading.gif" alt="Loading" />
        </Box>
    );
}
