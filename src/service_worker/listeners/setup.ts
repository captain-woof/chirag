/**
 * Contains event handlers to set up extension
 */

import { Status } from "../enums";
import { resetStorage, setAllTabsToInactive, setTabToActive, setTabToInactive, switchExtension } from "../helpers/storage";
import { getCurrentTab } from "../helpers/tabs";

/**
 * @dev Sets up event handlers to setup Chirag
 */
export const setupChirag = () => {
    // On install, clear storage
    chrome.runtime.onInstalled.addListener(resetStorage);

    // On startup, switch extension to OFF, and delete all active tabs in storage
    chrome.runtime.onStartup.addListener(async () => {
        await Promise.all([
            switchExtension(Status.OFF),
            setAllTabsToInactive()
        ]);
    });

    // On switching, intercepting should start/stop
    chrome.storage.local.onChanged.addListener(async (storage) => {
        const currentTab = await getCurrentTab();
        const debugee = { tabId: currentTab.id }

        switch (storage.status.newValue as Status) {
            case Status.OFF:
                await chrome.debugger.sendCommand(debugee, "Fetch.disable");
                await chrome.debugger.detach(debugee);
                await setTabToInactive(currentTab.id);
                break;
            case Status.ON:
                await chrome.debugger.attach(debugee, "1.0");
                await chrome.debugger.sendCommand(debugee, "Fetch.enable", { urlPattern: "*" });
                await setTabToActive(currentTab.id);
                break;
        }
    });

    // On switching, change status indicators
    chrome.storage.local.onChanged.addListener(async (storage) => {
        switch (storage.status.newValue as Status) {
            case Status.OFF:
                await chrome.action.setBadgeText({ text: "OFF" });
                await chrome.action.setBadgeBackgroundColor({ color: "#ff0000" });
                break;
            case Status.ON:
                await chrome.action.setBadgeText({ text: "ON" });
                await chrome.action.setBadgeBackgroundColor({ color: "#0000ff" });
                break;
        }
    });
}