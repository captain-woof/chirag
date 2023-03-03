import { getIntercept, isInterceptEnabled, isInterceptPresent, isTabActive } from "../helpers/storage";

/**
 * @dev Sets up event handlers for interceptor
 */
export const setupInterceptor = () => {

    // How to intercept requests
    chrome.debugger.onEvent.addListener(async (debugee, method, params) => {
        if (await isTabActive(debugee.tabId) && method === "Fetch.requestPaused") {

            // If intercept url exists and it is enabled, intercept and send stored response
            const interceptUrl = (params as any).request?.url as string ?? "";
            if ((await isInterceptPresent(interceptUrl)) && (await isInterceptEnabled(interceptUrl))) {
                const intercept = await getIntercept((params as any).request?.url);

                await chrome.debugger.sendCommand(debugee, 'Fetch.fulfillRequest', {
                    requestId: (params as any).requestId,
                    responseCode: intercept.responseStatusCode,
                    responseHeaders: Object.entries(intercept.responseHeaders).map(([index, { name, value }]) => ({ name, value })),
                    body: btoa(intercept.responseBody)
                });

                // Increase intercepted requests number by 1
                const badgeTextCurrent = await chrome.action.getBadgeText({ tabId: debugee.tabId });
                let interceptedRequestsNumPrev = parseInt(badgeTextCurrent);
                await chrome.action.setBadgeText({ tabId: debugee.tabId, text: (isNaN(interceptedRequestsNumPrev)) ? "1" : (++interceptedRequestsNumPrev).toString() });
                await chrome.action.setBadgeBackgroundColor({ tabId: debugee.tabId, color: "#AB47BC" });
            } else { // If intercept does not exist OR is not enabled, forward request as originally intended
                await chrome.debugger.sendCommand(debugee, "Fetch.continueRequest", {
                    requestId: (params as any).requestId,
                    ...(params as any).request,
                    headers: Object.entries((params as any).request.headers).map(([name, value]) => ({ name, value }))
                });
            }
        }
    });
}