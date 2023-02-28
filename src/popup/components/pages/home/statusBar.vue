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
    <v-system-bar class="status-bar bg-primary">
        <!-- Title -->
        <h1 class="title text-body-2">Chirag</h1>

        <!-- On/off button -->
        <v-switch color="white" hide-details density="compact" flat class="switch" :model-value="store.status"
            @update:model-value="handleSwitch" :true-value="Status.ON" :false-value="Status.OFF"></v-switch>
    </v-system-bar>
</template>

<style scoped lang="scss">
.status-bar {
    position: relative !important;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .title {
        grid-column: 2/3;
        justify-self: center;
    }

    .switch {
        grid-column: 3/4;
        justify-self: end;

        & ::v-deep .v-selection-control {
            height: 24px;
        }
    }


}
</style>