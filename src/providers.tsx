import React, { createContext } from "react";
import type { IProvider } from "./types";

export const CovalentAPIContext = createContext<{ apiKey: string | undefined }>(
    {} as { apiKey: string | undefined }
);

export const CovalentProvider: React.FC<IProvider> = ({ apiKey, children }) => {
    return (
        <CovalentAPIContext.Provider value={{ apiKey }}>
            {children}
        </CovalentAPIContext.Provider>
    );
};
