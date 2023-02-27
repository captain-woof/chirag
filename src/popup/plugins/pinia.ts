import { createPinia } from "pinia";
import { Plugin } from "vue";
import { ChiragStorage } from "../../service_worker/types";
import { useChiragStore } from "../store";

export const pinia: Plugin = {
    install(app, options) {
        // Install original plugin
        app.use(createPinia());

        // Store
        const store = useChiragStore();

        // Function to perform sync
        function performSync() {
            _getStorage().then((chiragStorage) => {
                const { intercepts, status, tabs } = chiragStorage;
                store.status = status;
                store.tabs = tabs;
                store.intercepts = intercepts;
            });
        }

        // Perform first-time sync
        performSync();

        // Setup storage sync listener
        chrome.storage.local.onChanged.addListener(performSync);
    },
}

// HELPERS
/**
 * @dev Gets the entire storage, with intercepts converted to array type
 * @returns Entire Chirag storage, all objects in a map
 */
const _getStorage = async () => {
    const storage = await (chrome.storage.local.get(null) as unknown as Promise<ChiragStorage>);

    // Convert headers from map to array
    for (let [interceptUrl, intercept] of Object.entries(storage.intercepts)) {
        const headersArr: Array<{ name: string; value: string }> = [];
        for (let [index, value] of Object.entries(intercept.responseHeaders)) {
            headersArr[index] = value;
        }
        storage.intercepts[interceptUrl].responseHeaders = headersArr;
    }

    return storage;
}