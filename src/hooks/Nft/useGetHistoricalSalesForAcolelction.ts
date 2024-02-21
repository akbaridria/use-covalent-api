import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { NftMarketSaleCountResponse } from "@covalenthq/client-sdk";
import type { IGetHistoricalSalesForACollection } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useGetHistoricalSalesForAcolelction = ({
    chainName,
    contractAddress,
    options,
    revalidate = true,
}: IGetHistoricalSalesForACollection) => {
    const [data, setData] = useState<NftMarketSaleCountResponse>();
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
            await apiService.NftService.getNftMarketSaleCount(
                chainName,
                contractAddress,
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
        [options, chainName, contractAddress]
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
    }, [options, chainName, contractAddress]);

    return {
        data,
        loading,
        isError,
        errorDetail,
        refetch,
    };
};

export default useGetHistoricalSalesForAcolelction;
