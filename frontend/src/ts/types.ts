import {store} from "../redux/store";
import {ContextState} from "./interfaces";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ToastStatusOptions = "info" | "warning" | "success" | "error" | "loading" | undefined;


export type User = {
    Id: number,
    Name: string,
    Email: string,
    CreatedAt: Date
}

export type AuthenticationToken = {
    token: string,
    expiry: Date
}

export type ActiveStock = {
    symbol: string,
    name: string,
    exchange: string,
    assetType: string
}

export type TopStock = {
    ticker: string;
    price: number;
    change_amount: number;
    change_percentage: number;
    volume: number;
}


export type AuthContextType = {
    contextState: ContextState,
    handleLogin: (token: string) => void,
    handleLogout: () => void
}

export type TopStocksInfo = {
    metadata: string
    last_updated: string
    top_gainers: TopStock[]
    top_losers: TopStock[]
    most_actively_traded: TopStock[]
}

export type StockNewsInfo = {
    items: string
    sentiment_score_definition: string
    relevance_score_definition: string
    feed: Feed[]
}


export type Feed = {
    title: string
    url: string
    time_published: string
    authors: string[]
    summary: string
    banner_image: string
    source: string
    category_within_source: string
    source_domain: string
    topics: Topic[]
    overall_sentiment_score: number
    overall_sentiment_label: string
    ticker_sentiment: TickerSentiment[]
}

export type Topic = {
    topic: string
    relevance_score: string
}

export type TickerSentiment = {
    ticker: string
    relevance_score: string
    ticker_sentiment_score: string
    ticker_sentiment_label: string
}

export type SearchBarOption = {
    label: string
    value: string
}
export type DailyAdjustedData = {
    metaData: MetaData
    dailyAdjustedTimeSeries: DailyAdjustedTimeSeries
}

export type MetaData = {
    information: string
    symbol: string
    lastRefreshed: string
}

export type DailyAdjustedTimeSeries = {
    adjustedTimeSeriesStockArray: AdjustedTimeSeriesStock[]
}

export type AdjustedTimeSeriesStock = {
    date: string
    open: number
    high: number
    low: number
    close: number
    adjustedClose: number
    volume: number
    dividendAmount: number
}