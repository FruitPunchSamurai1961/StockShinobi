import {isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {HandleServerSideError, HandleUnexpectedError} from "../utils/errors";
import {LOCAL_STORAGE_AUTH_TOKEN_KEY} from "../utils/authConstants";

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!');
            if (Number.isFinite(action.payload.status)) {
                if (action.payload.status === 401) {
                    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
                    window.location.reload();
                } else {
                    HandleServerSideError(action.payload.data.error)
                }
            } else {
                HandleUnexpectedError();
            }
        }
        return next(action)
    }

