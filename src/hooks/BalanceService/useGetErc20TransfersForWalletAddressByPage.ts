import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Erc20TransfersResponse } from "@covalenthq/client-sdk";
import type { IGetErc20TokenTransfersForAddress } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useGetErc20TransfersForWalletAddressByPage = ({
    chainName,
    walletAddress,
    options,
    revalidate,
}: IGetErc20TokenTransfersForAddress) => {
    const [data, setData] = useState<Erc20TransfersResponse>();
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
            await apiService.BalanceService.getErc20TransfersForWalletAddressByPage(
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
        [options, chainName, walletAddress]
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
    }, [options, chainName, walletAddress]);

    return {
        data,
        loading,
        isError,
        errorDetail,
        refetch,
    };
};

export default useGetErc20TransfersForWalletAddressByPage;
