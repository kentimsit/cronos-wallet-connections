import { create } from "zustand";

export interface IReadData {
    blockNumber: number;
    croBalance: string;
    usdcBalance: string;
}

export interface IState {
    context: string;
    setContext: (context: string) => void;
    readData: IReadData;
    setReadData: (readData: IReadData) => void;
    lastTransactionHash: string;
    setLastTransactionHash: (lastTransactionHash: string) => void;
}

const useStore = create<IState>()((set) => ({
    context: "welcome",
    setContext: (context: string) => set({ context }),
    readData: {
        blockNumber: 0,
        croBalance: "0",
        usdcBalance: "0",
    },
    setReadData: (readData: IReadData) => set({ readData }),
    lastTransactionHash: "",
    setLastTransactionHash: (lastTransactionHash: string) =>
        set({ lastTransactionHash }),
}));

export default useStore;
