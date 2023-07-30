import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers }  from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cronos Wallet Connections",
    description: "Cronos Web3 Dapp",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <Providers>
                {children}
            </Providers>
            </body>
        </html>
    );
}
