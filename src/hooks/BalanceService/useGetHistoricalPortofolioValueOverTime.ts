import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PortfolioResponse } from "@covalenthq/client-sdk";
import type { IGetHistoricalPortofolioValueOverTime } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useGetHistoricalPortofolioValueOverTime = ({
    chainName,
    walletAddress,
    options,
    revalidate,
}: IGetHistoricalPortofolioValueOverTime) => {
    const [data, setData] = useState<PortfolioResponse>();
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
            await apiService.BalanceService.getHistoricalPortfolioForWalletAddress(
                chainName,
                walletAddress,
                options
            ).then((data) => {
                if (isRevalidate && data.error) {
                    return;
                }
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

export default useGetHistoricalPortofolioValueOverTime;
