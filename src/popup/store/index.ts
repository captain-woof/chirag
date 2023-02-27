import { defineStore } from "pinia";
import { Status } from "../../service_worker/enums";
import { ChiragStorage } from "../../service_worker/types";
import { switchExtension, addIntercept, enableDisableIntercept, removeIntercept, removeAllIntercepts } from "../../service_worker/helpers/storage";

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
        },
        async addOrUpdateIntercept(interceptUrl: string, intercept: ChiragStorage["intercepts"][""]) {
            await addIntercept(interceptUrl, intercept);
        },
        async enableDisableIntercept(interceptUrl: string) {
            await enableDisableIntercept(interceptUrl);
        },
        async removeIntercept(interceptUrl: string) {
            await removeIntercept(interceptUrl);
        },
        async removeAllIntercepts() {
            await removeAllIntercepts();
        }
    }
});
