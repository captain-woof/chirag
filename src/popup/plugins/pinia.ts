import { createPinia } from "pinia";
import { Plugin } from "vue";
import { getStorage } from "../../service_worker/helpers/storage";
import { useChiragStore } from "../store";

export const pinia: Plugin = {
    install(app, options) {
        // Install original plugin
        app.use(createPinia());

        // Store
        const store = useChiragStore();

        // Function to perform sync
        function performSync() {
            getStorage().then((chiragStorage) => {
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