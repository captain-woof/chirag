/**
 * @dev Gets current tab
 * @returns Current tab
 */
export const getCurrentTab = async () => {
    const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return currentTab;
}