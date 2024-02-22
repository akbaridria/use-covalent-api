import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { BlockResponse } from "@covalenthq/client-sdk";
import type { IGetABlock } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useGetABlock = ({
    chainName,
    blockHeight,
    revalidate = true,
}: IGetABlock) => {
    const [data, setData] = useState<BlockResponse>();
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
            await apiService.BaseService.getBlock(chainName, blockHeight).then(
                (data) => {
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
                }
            );
        },
        [chainName, blockHeight]
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
    }, [chainName, blockHeight]);

    return {
        data,
        loading,
        isError,
        errorDetail,
        refetch,
    };
};

export default useGetABlock;
