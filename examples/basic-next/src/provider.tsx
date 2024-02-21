"use client";

import { CovalentProvider } from "@akbaridria/use-covalent-api";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <CovalentProvider
            apiKey={process.env.NEXT_PUBLIC_COVALENT_KEY as string}
        >
            {children}
        </CovalentProvider>
    );
}
