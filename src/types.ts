import type {
    Chain,
    GetChainCollectionsQueryParamOpts,
    GetErc20TransfersForWalletAddressQueryParamOpts,
    GetHistoricalPortfolioForWalletAddressQueryParamOpts,
    GetHistoricalTokenBalancesForWalletAddressQueryParamOpts,
    GetNativeTokenBalanceQueryParamOpts,
    GetNftMarketFloorPriceQueryParamOpts,
    GetNftMarketSaleCountQueryParamOpts,
    GetNftMarketVolumeQueryParamOpts,
    GetNftMetadataForGivenTokenIdForContractQueryParamOpts,
    GetNftTransactionsForContractTokenIdQueryParamOpts,
    GetNftsForAddressQueryParamOpts,
    GetTokenBalancesForWalletAddressQueryParamOpts,
    GetTokenHoldersV2ForTokenAddressQueryParamOpts,
    GetTokenIdsForContractWithMetadataQueryParamOpts,
} from "@covalenthq/client-sdk";
import type { ReactNode } from "react";

export interface IProvider {
    apiKey: string;
    children: ReactNode;
}

export interface IGetTokenBalanceForAddress {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
    options?: GetTokenBalancesForWalletAddressQueryParamOpts;
}

export interface IGetHistoricalTokenBalanceForAddress {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
    options?: GetHistoricalTokenBalancesForWalletAddressQueryParamOpts;
}

export interface IGetNativeTokenBalanceForAddress {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
    options?: GetNativeTokenBalanceQueryParamOpts;
}

export interface IGetHistoricalPortofolioValueOverTime {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
    options?: GetHistoricalPortfolioForWalletAddressQueryParamOpts;
}

export interface IGetErc20TokenTransfersForAddress {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
    options?: GetErc20TransfersForWalletAddressQueryParamOpts;
}

export interface IGetTokenHoldersV2ForTokenAddress {
    chainName: Chain;
    tokenAddress: string;
    revalidate?: boolean;
    options?: GetTokenHoldersV2ForTokenAddressQueryParamOpts;
}

export interface IGetNftForAddress {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
    options?: GetNftsForAddressQueryParamOpts;
}

export interface IGetNftFromContractWithMetadata {
    chainName: Chain;
    contractAddress: string;
    revalidate?: boolean;
    options?: GetTokenIdsForContractWithMetadataQueryParamOpts;
}

export interface IGetSingleNftWithCachedMetadataFromContract {
    chainName: Chain;
    contractAddress: string;
    tokenId: string;
    revalidate?: boolean;
    options?: GetNftMetadataForGivenTokenIdForContractQueryParamOpts;
}

export interface IGetNftTransactionsFromContract {
    chainName: Chain;
    contractAddress: string;
    tokenId: string;
    revalidate?: boolean;
    options?: GetNftTransactionsForContractTokenIdQueryParamOpts;
}

export interface IGetTraitsForACollection {
    chainName: Chain;
    collectionContract: string;
    revalidate?: boolean;
}

export interface IGetTraitSummaryForACollection {
    chainName: Chain;
    collectionContract: string;
    revalidate?: boolean;
}

export interface IGetAttributesForACollectionTrait {
    chainName: Chain;
    collectionContract: string;
    trait: string;
    revalidate?: boolean;
}

export interface IGetChainCollections {
    chainName: Chain;
    options?: GetChainCollectionsQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetHistoricalFloorPriceForAColelction {
    chainName: Chain;
    contractAddress: string;
    options?: GetNftMarketFloorPriceQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetHIstoricalVolumeForACollection {
    chainName: Chain;
    contractAddress: string;
    options?: GetNftMarketVolumeQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetHistoricalSalesForACollection {
    chainName: Chain;
    contractAddress: string;
    options?: GetNftMarketSaleCountQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetCheckOwnershipNftCollection {
    chainName: Chain;
    walletAddress: string;
    collectionContract: string;
    revalidate?: boolean;
}

export interface IGetCheckOwnershipInNftCollectionForSpecificTokenId {
    chainName: Chain;
    walletAddress: string;
    collectionContract: string;
    tokenId: string;
    revalidate?: boolean;
}
