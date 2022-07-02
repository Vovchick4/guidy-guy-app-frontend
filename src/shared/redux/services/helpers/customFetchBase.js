import { Mutex } from "async-mutex";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

import { logout } from "../../features/authSlice";
import { baseUrlApi } from "../../../constants";

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({ baseUrl: `${baseUrlApi}` })

const customFetchBase = async (args, api, extraOptions) => {
    // Refresh Token Interception 401
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshToken = await baseQuery({ url: 'auth/refresh', credentials: 'include' }, api, extraOptions)
                if (refreshToken.data) {
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }

            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result
}

export default customFetchBase