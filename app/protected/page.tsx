// THIS IS UNUSED AT THE MOMNENT

"use client";
import { signOut } from "next-auth/react";
import React from "react";

import { Flex, Stack, Text, Box, Button } from "@chakra-ui/react";

export default function ProtectedPage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    if (!mounted) return <></>;

    const handleSignout = async () => {
        signOut({ callbackUrl: "/" });
    };
    return (
        <div>
            <Flex color="black" m={10}>
                <Stack spacing={3}>
                    <Text fontSize="4xl" color="black">
                        User Account page
                    </Text>
                </Stack>
            </Flex>
        </div>
    );
}
