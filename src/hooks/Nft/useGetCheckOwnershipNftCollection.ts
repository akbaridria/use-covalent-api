import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { NftOwnershipForCollectionResponse } from "@covalenthq/client-sdk";
import type { IGetCheckOwnershipNftCollection } from "../../types";
import { CovalentClient } from "@covalenthq/client-sdk";
import { CovalentAPIContext } from "../../providers";
import { revalidateTime } from "../../helpers";

export const useCheckOwnershipNftCollection = ({
    chainName,
    walletAddress,
    collectionContract,
    revalidate = true,
}: IGetCheckOwnershipNftCollection) => {
    const [data, setData] = useState<NftOwnershipForCollectionResponse>();
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
            await apiService.NftService.checkOwnershipInNft(
                chainName,
                walletAddress,
                collectionContract
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
        [chainName, collectionContract, walletAddress]
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
    }, [chainName, collectionContract, walletAddress]);

    return {
        data,
        loading,
        isError,
        errorDetail,
        refetch,
    };
};

export default useCheckOwnershipNftCollection;
