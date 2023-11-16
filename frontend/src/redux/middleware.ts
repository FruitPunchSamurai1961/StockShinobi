import {isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {HandleServerSideError, HandleUnexpectedError} from "../utils/errors";

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!');
            if (Number.isFinite(action.payload.status)) {
                HandleServerSideError(action.payload.data.error)
            } else {
                HandleUnexpectedError();
            }
        }
        return next(action)
    }

