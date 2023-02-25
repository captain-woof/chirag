<script setup lang="ts">
import { computed } from 'vue';
import { useToast } from "../../plugins/toast";

const { data } = useToast();

const color = computed(() => {
    switch (data.type) {
        case "success":
            return "success";
        case "error":
            return "error";
        case "info":
            return "primary";
    }
});

const icon = computed(() => {
    switch (data.type) {
        case "success":
            return "mdi-check";
        case "error":
            return "mdi-exclamation";
        case "info":
            return "mdi-information-outline";
    }
});
</script>

<template>
    <v-snackbar v-model="$toast.data.visible" :color="color" :timeout="3000" close-on-content-click contained>
        <div class="d-flex align-center justify-center">
            <v-icon :icon="icon" size="large"></v-icon>
            <span>{{ data.message }}</span>
        </div>
    </v-snackbar>
</template>

<style lang="scss" scoped></style>