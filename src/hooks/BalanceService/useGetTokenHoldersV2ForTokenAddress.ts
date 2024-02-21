import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { TokenHoldersResponse } from "@covalenthq/client-sdk";
import type { IGetTokenHoldersV2ForTokenAddress } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useGetTokenHoldersV2ForTokenAddress = ({
    chainName,
    tokenAddress,
    options,
    revalidate,
}: IGetTokenHoldersV2ForTokenAddress) => {
    const [data, setData] = useState<TokenHoldersResponse>();
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
            await apiService.BalanceService.getTokenHoldersV2ForTokenAddressByPage(
                chainName,
                tokenAddress,
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
        [options, chainName, tokenAddress]
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
    }, [options, chainName, tokenAddress]);

    return {
        data,
        loading,
        isError,
        errorDetail,
        refetch,
    };
};

export default useGetTokenHoldersV2ForTokenAddress;
