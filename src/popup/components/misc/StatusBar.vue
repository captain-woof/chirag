<script lang="ts" setup>

</script>

<template>
    <v-system-bar class="status-bar d-flex-row justify-end align-center ">
        <!-- Requests intercepted num -->
        <div class="text-body-2 d-flex-row align-center">
            <span>Requests intercepted:</span>
            <span class="ml-1">3</span>
        </div>

        <!-- On/off button -->
        <v-switch color="purple-lighten-1" hide-details density="compact" flat class="switch"></v-switch>
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