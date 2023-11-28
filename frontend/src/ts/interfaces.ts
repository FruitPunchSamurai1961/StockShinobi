import {
    ActiveStock,
    AuthenticationToken,
    Feed, DailyAdjustedData,
    SearchBarOption,
    StockNewsInfo,
    TopStock,
    TopStocksInfo,
    User, LineChartDataPoint
} from "./types";
import {selectionOptions} from "./enums";

export interface SignupState {
    showPassword: boolean,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export interface UserState {
    user: User | undefined
}

export interface LoginState {
    email: string
    password: string
}

export interface ContextState {
    isLoading: boolean
    isLoggedIn: boolean
    token: string
}

export interface HomeState {
    symbol: string
    name: string
}

export interface LineChartState {
    selection: selectionOptions
    data: LineChartDataPoint[]
}

export interface NotesState {
    content: string
}

export interface LoginResponse {
    authentication_token: AuthenticationToken
    user: User
}

export interface SignupResponse {
    user: User
}

export interface ActiveListingResponse {
    listings: ActiveStock[]
}

export interface TopStocksResponse {
    ranking: TopStocksInfo
}

export interface StocksNewsResponse {
    news: StockNewsInfo
}

export interface DailyAdjustedResponse {
    dailyAdjustedData: DailyAdjustedData
}



export interface TopStockListProps {
    title: string,
    stocks: TopStock[]
}

export interface SearchBarProps {
    options: SearchBarOption[]
    isMulti: boolean
    name: string
    placeholder: string
    windowThreshold: number
    handleSingleSelectOptionChange?: (value: SearchBarOption | null) => void
    handleMultiSelectOptionsChange?: (value: SearchBarOption[] | null) => void
}

export interface NewsProps {
    feed: Feed[]
}

export interface NotesProps {
    name: string
    placeholder: string
}

export interface LineChartProps {
    allData: LineChartDataPoint[]
    oneYearData: LineChartDataPoint[]
    oneMonthData: LineChartDataPoint[]
    sixMonthData: LineChartDataPoint[]
    ytdData: LineChartDataPoint[]
    name: string
}