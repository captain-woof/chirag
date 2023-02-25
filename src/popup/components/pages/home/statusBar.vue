<script lang="ts" setup>
import { Status } from "../../../../service_worker/enums";
import { useChiragStore } from '../../../store';
import { useToast } from "../../../plugins/toast";

// States
const store = useChiragStore();
const toast = useToast();

// Methods
const handleSwitch = async () => {
    try {
        await store.switchChirag();
    } catch {
        toast.show(`Could not switch ${store.status === Status.OFF ? 'on' : 'off'} Chirag`, "error");
    }
}

</script>

<template>
    <v-system-bar class="status-bar d-flex-row justify-end align-center ">
        <!-- Requests intercepted num -->
        <div class="text-body-2 d-flex-row align-center">
            <span>Requests intercepted:</span>
            <span class="ml-1">3</span>
        </div>

        <!-- On/off button -->
        <v-switch color="primary" hide-details density="compact" flat class="switch" :model-value="store.status"
            @update:model-value="handleSwitch" :true-value="Status.ON" :false-value="Status.OFF"></v-switch>
    </v-system-bar>
</template>

<style scoped lang="scss">
.status-bar {
    position: relative !important;
    gap: 12px;

    .switch {
        flex: unset;
    }
}
</style>