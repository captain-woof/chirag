import { defineStore } from "pinia";
import { Status } from "../../service_worker/enums";
import { ChiragStorage } from "../../service_worker/types";
import { getStorage, switchExtension, addIntercept, enableDisableIntercept, removeIntercept, removeAllIntercepts } from "../../service_worker/helpers/storage";

// Create store
export const useChiragStore = defineStore("chirag", {
    state: (): ChiragStorage => ({
        status: Status.OFF,
        tabs: {},
        intercepts: {}
    }),
    actions: {
        async switchChirag() {
            await switchExtension();
            await this.syncChiragStore();
        },
        async addOrUpdateIntercept(interceptUrl: string, intercept: ChiragStorage["intercepts"][""]) {
            await addIntercept(interceptUrl, intercept);
            await this.syncChiragStore();
        },
        async enableDisableIntercept(interceptUrl: string) {
            await enableDisableIntercept(interceptUrl);
            await this.syncChiragStore();
        },
        async removeIntercept(interceptUrl: string) {
            await removeIntercept(interceptUrl);
            await this.syncChiragStore();
        },
        async removeAllIntercepts() {
            await removeAllIntercepts();
            await this.syncChiragStore();
        },
        async syncChiragStore() {
            const chiragStorage = await getStorage();
            this.$patch(chiragStorage);
        }
    }
});

/**
 * @dev Syncs Chirag store with actual stored data
 */
export const syncChiragStore = async () => {
    const chiragStorage = await getStorage();
    const store = useChiragStore();
    store.$patch(chiragStorage);
}
