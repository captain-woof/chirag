import { Message } from "../enums";
import { addIntercept, isTabActive, removeAllIntercepts, removeIntercept, switchExtension } from "../helpers/storage";
import { ChiragMessageAddOrModifyIntercept, ChiragMessageRemoveAllIntercepts, ChiragMessageRemoveIntercept, ChiragMessageSwitch } from "../types";

/**
 * @dev Sets up listeners for incoming messages
 */
export const setupMessageListeners = () => {

    // Switch
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        return _switch(sender.tab, message as ChiragMessageSwitch, sendResponse);
    });

    // Add/edit intercept
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        return _addOrModifyIntercept(sender.tab, message as ChiragMessageAddOrModifyIntercept, sendResponse);
    });

    // Remove intercept
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        return _removeIntercept(sender.tab, message as ChiragMessageRemoveIntercept, sendResponse);
    });

    // Remove all intercepts
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        return _removeAllIntercepts(sender.tab, message as ChiragMessageRemoveAllIntercepts, sendResponse);
    });
}

/**
 * @dev Removes listeners for incoming messages
 */
export const removeMessageListeners = () => {

    // Switch
    chrome.runtime.onMessage.removeListener((message, sender, sendResponse) => {
        return _switch(sender.tab, message as ChiragMessageSwitch, sendResponse);
    });

    // Add/edit intercept
    chrome.runtime.onMessage.removeListener(async (message, sender, sendResponse) => {
        return _addOrModifyIntercept(sender.tab, message as ChiragMessageAddOrModifyIntercept, sendResponse);
    });

    // Remove intercept
    chrome.runtime.onMessage.removeListener(async (message, sender, sendResponse) => {
        return _removeIntercept(sender.tab, message as ChiragMessageRemoveIntercept, sendResponse);
    });

    // Remove all intercepts
    chrome.runtime.onMessage.removeListener(async (message, sender, sendResponse) => {
        return _removeAllIntercepts(sender.tab, message as ChiragMessageRemoveAllIntercepts, sendResponse);
    });
}

////////////////////
// INTERNALS ///////
////////////////////

const _switch = async (tab: chrome.runtime.MessageSender["tab"], message: ChiragMessageSwitch, sendResponse: (response: any) => void) => {
    if (tab && await isTabActive(tab.id) && message?.type === Message.SWITCH) {
        await switchExtension();
        sendResponse("DONE");
    }
}

const _addOrModifyIntercept = async (tab: chrome.runtime.MessageSender["tab"], message: ChiragMessageAddOrModifyIntercept, sendResponse: (response: any) => void) => {
    if (tab && await isTabActive(tab.id) && message?.type === Message.ADD_OR_MODIFY_INTERCEPT) {
        await addIntercept(message.payload.interceptUrl, message.payload.intercept);
        sendResponse("DONE");
    }
}

const _removeIntercept = async (tab: chrome.runtime.MessageSender["tab"], message: ChiragMessageRemoveIntercept, sendResponse: (response: any) => void) => {
    if (tab && await isTabActive(tab.id) && message?.type === Message.REMOVE_INTERCEPT) {
        await removeIntercept(message.payload.interceptUrl);
        sendResponse("DONE");
    }
}

const _removeAllIntercepts = async (tab: chrome.runtime.MessageSender["tab"], message: ChiragMessageRemoveAllIntercepts, sendResponse: (response: any) => void) => {
    if (tab && await isTabActive(tab.id) && message?.type === Message.REMOVE_ALL_INTERCEPTS) {
        await removeAllIntercepts();
        sendResponse("DONE");
    }
}