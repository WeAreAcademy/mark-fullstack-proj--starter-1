interface IErrorData {
    errorMsg: string;
    errorObj?: Error;
    stackTrace?: string;
}

/**
 * Take an unknown caught error and return a more descriptive object from it, depending on its type.
 *
 * @param error - pass in what you get from catch().
 *
 * Note: To be more secure we shouldn't expose internal error messages and stack traces in API responses.
 * However, in early development it's very useful for beginners to have this info available in the relevant response.
 */
export function prepareErrorForClient(error: unknown): IErrorData {
    if (error instanceof Error) {
        return {
            errorMsg: error.message,
            errorObj: error,
            stackTrace: error.stack,
        };
    } else {
        return { errorMsg: "unknown server error: " + error };
    }
}
