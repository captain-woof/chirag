import { Status } from "../enums";
import { ChiragStorage } from "../types";

/**
 * @dev Gets the entire storage
 * @returns Entire Chirag storage, all objects in a map
 */
export const getStorage = () => {
    return (chrome.storage.local.get(null)) as unknown as Promise<ChiragStorage>;
}

/**
 * @dev Resets storage
 */
export const resetStorage = async () => {
    await chrome.storage.local.set({
        status: Status.OFF,
        tabs: {},
        intercepts: {}
    } as ChiragStorage);
}

/**
 * @dev Checks if extension is running
 * @returns True, if extension is running
 */
export const isExtensionOn = async () => {
    const existingStatus = (await chrome.storage.local.get("status")).status as Status;
    return existingStatus === Status.ON;
}

/**
 * @dev Switches extension from running to stopped or vice-versa
 * @param statusToSet New status to set
 */
export const switchExtension = async (statusToSet?: Status) => {
    const existingStatus = (await chrome.storage.local.get("status")).status as Status;
    const newStatus = statusToSet ?? (existingStatus === Status.OFF ? Status.ON : Status.OFF);
    await chrome.storage.local.set({
        status: newStatus
    });
}

/**
 * @dev Gets tabs that Chirag is working in
 */
export const getActiveTabs = async () => {
    const tabs: ChiragStorage["tabs"] = (await chrome.storage.local.get("tabs")).tabs;
    return tabs;
}

/**
 * @dev Checks if Chirag is working in a tab
 */
export const isTabActive = async (tabId: number | string | undefined) => {
    if (tabId) {
        const tabs: ChiragStorage["tabs"] = (await chrome.storage.local.get("tabs")).tabs;
        return tabs[tabId];
    }
}

/**
 * @dev Adds tab to active tabs list
 * @param tabId Tab id to add
 */
export const setTabToActive = async (tabId: number | string | undefined) => {
    if (tabId) {
        const tabs: ChiragStorage["tabs"] = (await chrome.storage.local.get("tabs")).tabs;
        tabs[tabId] = true;
        await chrome.storage.local.set({
            tabs
        });
    }
}

/**
 * @dev Removes tab from active tabs list
 * @param tabId Tab id to remove
 */
export const setTabToInactive = async (tabId: number | string | undefined) => {
    if (tabId) {
        const tabs: ChiragStorage["tabs"] = (await chrome.storage.local.get("tabs")).tabs;
        delete tabs[tabId];
        await chrome.storage.local.set({
            tabs
        });
    }
}

/**
 * @dev Removes all tab from active tabs list
 */
export const setAllTabsToInactive = async () => {
    await chrome.storage.local.set({
        tabs: {}
    });
}

/**
 * @dev Checks if an intercept is present
 * @param interceptUrl Intercept url
 * @returns True, if it is present
 */
export const isInterceptPresent = async (interceptUrl: string) => {
    const intercepts: ChiragStorage["intercepts"] = (await chrome.storage.local.get("intercepts")).intercepts;
    return interceptUrl in intercepts;
}

/**
 * @dev Gets intercept corresponding to a url
 * @param interceptUrl Intercepting url
 * @returns Intercept
 */
export const getIntercept = async (interceptUrl: string) => {
    const intercepts: ChiragStorage["intercepts"] = (await chrome.storage.local.get("intercepts")).intercepts;
    return intercepts[interceptUrl];
}

/**
 * @dev Adds an intercept
 * @param interceptUrl Intercept url to add
 * @param intercept Intercept to add
 */
export const addIntercept = async (interceptUrl: string, intercept: ChiragStorage["intercepts"][string]) => {
    const intercepts: ChiragStorage["intercepts"] = (await chrome.storage.local.get("intercepts")).intercepts;
    intercepts[interceptUrl] = intercept;
    await chrome.storage.local.set({
        intercepts
    });
}

/**
 * @dev Removes an intercept
 * @param interceptUrl Intercept url to add
 */
export const removeIntercept = async (interceptUrl: string) => {
    const intercepts: ChiragStorage["intercepts"] = (await chrome.storage.local.get("intercepts")).intercepts;
    delete intercepts[interceptUrl];
    await chrome.storage.local.set({
        intercepts
    });
}

/**
 * @dev Enable/disable intercept
 * @param interceptUrl Intercept url to enable/disable
 */
export const enableDisableIntercept = async (interceptUrl: string) => {
    const intercepts: ChiragStorage["intercepts"] = (await chrome.storage.local.get("intercepts")).intercepts;
    intercepts[interceptUrl] = {
        ...intercepts[interceptUrl],
        enabled: !intercepts[interceptUrl].enabled
    };
    await chrome.storage.local.set({
        intercepts
    });
}

/**
 * @dev Removes all intercepts
 */
export const removeAllIntercepts = async () => {
    await chrome.storage.local.set({
        intercepts: {}
    });
}