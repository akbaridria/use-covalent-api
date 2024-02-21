import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { BalancesResponse } from "@covalenthq/client-sdk";
import type { IGetTokenBalanceForAddress } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useGetTokenBalanceForAddress = ({
    chainName,
    walletAddress,
    options,
    revalidate,
}: IGetTokenBalanceForAddress) => {
    const [data, setData] = useState<BalancesResponse | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorDetail, setErrorDetail] = useState<{
        errorCode: number | string;
        errorMessage: string;
    }>();

    const { apiKey } = useContext(CovalentAPIContext);
    const apiService = useMemo(
        () => new CovalentClient(apiKey ?? ""),
        [apiKey]
    );

    const refetch = useCallback(
        async (isRevalidate = false) => {
            setLoading(!isRevalidate);
            await apiService.BalanceService.getTokenBalancesForWalletAddress(
                chainName,
                walletAddress,
                options
            ).then((data) => {
                setData(data.data);
                setIsError(data.error);
                setErrorDetail({
                    errorCode: data.error_code,
                    errorMessage: data.error_message,
                });
                setLoading(false);
            });
        },
        [chainName, walletAddress, options]
    );

    useEffect(() => {
        const abortController = new AbortController();
        let revalidateId: NodeJS.Timeout;
        refetch(false);
        if (revalidate) {
            revalidateId = setInterval(() => refetch(true), revalidateTime);
        }
        return () => {
            abortController.abort();
            if (revalidate) {
                clearInterval(revalidateId);
            }
        };
    }, [chainName, walletAddress, options]);

    return {
        data,
        loading,
        isError,
        errorDetail,
        refetch,
    };
};

export default useGetTokenBalanceForAddress;
