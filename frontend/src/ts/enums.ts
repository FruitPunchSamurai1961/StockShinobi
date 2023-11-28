export enum requestMethod {
    POST = "POST",
    GET = "GET",
    DELETE = "DELETE",
    PUT = "PUT"
}

export enum selectionOptions {
    ONE_YEAR = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime(),
    ONE_MONTH = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime(),
    SIX_MONTHS = new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime(),
    YTD = new Date(new Date().getFullYear(), 0, 1).getTime(),
    ALL = new Date('30 Dec 1999').getTime()
}
