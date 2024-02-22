import type {
    Chain,
    GetAddressActivityQueryParamOpts,
    GetAllTransactionsForAddressQueryParamOpts,
    GetBlockHeightsQueryParamOpts,
    GetChainCollectionsQueryParamOpts,
    GetErc20TransfersForWalletAddressQueryParamOpts,
    GetGasPricesQueryParamOpts,
    GetHistoricalPortfolioForWalletAddressQueryParamOpts,
    GetHistoricalTokenBalancesForWalletAddressQueryParamOpts,
    GetLogEventsByAddressQueryParamOpts,
    GetLogEventsByTopicHashQueryParamOpts,
    GetLogsQueryParamOpts,
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
    GetTokenPricesQueryParamOpts,
    GetTransactionQueryParamOpts,
    GetTransactionSummaryQueryParamOpts,
    GetTransactionsForBlockQueryParamOpts,
    Quote,
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

export interface IGetATransaction {
    chainName: Chain;
    txHash: string;
    options?: GetTransactionQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetTransactionSummaryForAddress {
    chainName: Chain;
    walletAddress: string;
    options?: GetTransactionSummaryQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetRecentTransactionForAddress {
    chainName: Chain;
    walletAddress: string;
    options?: GetAllTransactionsForAddressQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetAllTransactionsInABlock {
    chainName: Chain;
    blockHeight: string;
    options?: GetTransactionsForBlockQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetApproval {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
}

export interface IGetABlock {
    chainName: Chain;
    blockHeight: string;
    revalidate?: boolean;
}

export interface IGetBlockHeight {
    chainName: Chain;
    startDate: string;
    endDate: string;
    options?: GetBlockHeightsQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetLogs {
    chainName: Chain;
    options?: GetLogsQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetLogEventsByContractAddress {
    chainName: Chain;
    contractAddress: string;
    options?: GetLogEventsByAddressQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetLogEventsByTopicHashes {
    chainName: Chain;
    topicHash: string;
    options?: GetLogEventsByTopicHashQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetResolveAddressForRegisterAddress {
    chainName: Chain;
    walletAddress: string;
    revalidate?: boolean;
}

export interface IGetGasPrice {
    chainName: Chain;
    eventType: string;
    revalidate?: boolean;
    options?: GetGasPricesQueryParamOpts;
}

export interface IGetCrossChainActivityForAddress {
    walletAddress: string;
    options?: GetAddressActivityQueryParamOpts;
    revalidate?: boolean;
}

export interface IGetHistoricalTokenPrices {
    chainName: Chain;
    quoteCurrency: Quote;
    contractAddress: string;
    options?: GetTokenPricesQueryParamOpts;
    revalidate?: boolean;
}
