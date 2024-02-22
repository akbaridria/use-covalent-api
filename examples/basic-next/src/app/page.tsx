"use client";

import { useState } from "react";
import type {
    GetTokenBalancesForWalletAddressQueryParamOpts,
    Quote,
} from "@akbaridria/use-covalent-api";
import { useGetTokenBalanceForAddress } from "@akbaridria/use-covalent-api";

export default function Home() {
    const [options, setOption] = useState<
        GetTokenBalancesForWalletAddressQueryParamOpts | undefined
    >({ noSpam: true, quoteCurrency: "USD" });
    const { data, errorDetail, loading, isError } =
        useGetTokenBalanceForAddress({
            chainName: "eth-mainnet",
            walletAddress: "vatalik.eth",
            options,
        });

    const handleChange = () => {
        setOption((prev) => {
            return {
                ...prev,
                noSpam: !prev?.noSpam,
            };
        });
    };
    const handleCurrency = (d: Quote) => {
        setOption((prev) => {
            return {
                ...prev,
                quoteCurrency: d,
            };
        });
    };

    return (
        <div>
            <div>isLoading: {String(loading)}</div>
            <div>isError: {String(isError)}</div>
            <div>errordetail : {errorDetail?.errorMessage}</div>
            <div>noSpam: {String(options?.noSpam)}</div>
            <div>wallet address: {data?.address}</div>
            <div>
                noSpam{" "}
                <input
                    type="checkbox"
                    id="noSpam"
                    name="noSpam"
                    value={String(options?.noSpam)}
                    onChange={handleChange}
                    checked={options?.noSpam}
                />
            </div>
            <form>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="option1"
                            onChange={() => handleCurrency("USD")}
                            checked={options?.quoteCurrency === "USD"}
                        />
                        USD
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="option2"
                            onChange={() => handleCurrency("CAD")}
                            checked={options?.quoteCurrency === "CAD"}
                        />
                        CAD
                    </label>
                </div>
            </form>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "1rem",
                    marginTop: "2rem",
                }}
            >
                <div>No</div>
                <div>Contract Name</div>
                <div>Logo URL</div>
                <div>Balance</div>
                <div>Balance USd</div>
            </div>
            {data?.items?.map((item, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <div>{index + 1}</div>
                        <div>{item.contract_name}</div>
                        <div>
                            <img
                                src={item?.logo_url}
                                width={50}
                                height={50}
                                style={{ borderRadius: "1rem" }}
                                alt=""
                            />
                        </div>
                        <div>
                            {new Intl.NumberFormat().format(
                                Number(item.balance) /
                                    10 ** item.contract_decimals
                            )}
                        </div>
                        <div>{item.pretty_quote}</div>
                    </div>
                );
            })}
        </div>
    );
}
