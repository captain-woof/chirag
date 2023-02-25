<script lang="ts" setup>
import { Status } from "../../../../service_worker/enums";
import { useChiragStore } from '../../../store';

// States
const store = useChiragStore();

</script>

<template>
    <v-system-bar class="status-bar d-flex-row justify-end align-center ">
        <!-- Requests intercepted num -->
        <div class="text-body-2 d-flex-row align-center">
            <span>Requests intercepted:</span>
            <span class="ml-1">3</span>
        </div>

        <!-- On/off button -->
        <v-switch color="primary" hide-details density="compact" flat class="switch" :model-value="Status.OFF"
            @update:model-value="store.switchChirag" :true-value="Status.ON" :false-value="Status.OFF"></v-switch>
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