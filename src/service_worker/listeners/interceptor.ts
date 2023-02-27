import { getIntercept, isInterceptPresent, isTabActive } from "../helpers/storage";

/**
 * @dev Sets up event handlers for interceptor
 */
export const setupInterceptor = () => {

    // How to intercept requests
    chrome.debugger.onEvent.addListener(async (debugee, method, params) => {
        if (await isTabActive(debugee.tabId) && method === "Fetch.requestPaused") {

            // If intercept url exists, intercept and send stored response
            if (await isInterceptPresent((params as any).request?.url)) {
                const intercept = await getIntercept((params as any).request?.url);

                await chrome.debugger.sendCommand(debugee, 'Fetch.fulfillRequest', {
                    requestId: (params as any).requestId,
                    responseCode: intercept.responseStatusCode,
                    responseHeaders: Object.entries(intercept.responseHeaders).map(([index, { name, value }]) => ({ name, value })),
                    body: btoa(intercept.responseBody)
                });
            } else { // If intercept does not exist, forward request as originally intended
                await chrome.debugger.sendCommand(debugee, "Fetch.continueRequest", {
                    requestId: (params as any).requestId,
                    ...(params as any).request,
                    headers: Object.entries((params as any).request.headers).map(([name, value]) => ({ name, value }))
                });
            }
        }
    });
}