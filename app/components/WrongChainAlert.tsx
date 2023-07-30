import { Alert, Button, Divider, Text, VStack } from "@chakra-ui/react";
import { currentWallet } from "../wallets";
import { ChainId, getAddChainParameters } from "../chains";

const { connect } = currentWallet;
export const WrongChainAlert = () => {
    return (
        <Alert
            display="flex"
            flexDirection="column"
            maxW={400}
            status="error"
            borderRadius="4px"
        >
            <Text>
                Your wallet app is connected to a chain that this dApp is
                intended to run on.
            </Text>
            <Divider my={8} borderColor="red.500" />
            <VStack gap={4} alignItems="flex-start" justifyContent="flex-start">
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        connect(getAddChainParameters(ChainId.CronosMainnet));
                    }}
                >
                    Switch to Cronos Mainnet
                </Button>
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        connect(getAddChainParameters(ChainId.CronosMainnet));
                    }}
                >
                    Switch to Cronos Testnet
                </Button>
            </VStack>
        </Alert>
    );
};
