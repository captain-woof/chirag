<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { ChiragStorage } from "../../../../service_worker/types";
import { useChiragStore } from "../../../store";

// Props
const { intercept } = defineProps<{
    intercept: ChiragStorage["intercepts"][""] & { interceptUrl: string }
}>();

// States
const router = useRouter();
const store = useChiragStore();

// Methods
const handleInterceptClick = async () => {
    await router.push({ name: "editor", params: { interceptUrl: intercept.interceptUrl } });
}

const handleInterceptDelete = async () => {
    await store.removeIntercept(intercept.interceptUrl);
}
</script>

<template>
    <v-list-item @click="handleInterceptClick" class="intercept" :class="{ 'intercept--disabled': !intercept.enabled }"
        v-ripple>
        <!-- Checkbox - enable/disable -->
        <template #prepend>
            <v-checkbox color="primary" :model-value="intercept.enabled"
                @click.stop="store.enableDisableIntercept(intercept.interceptUrl)"></v-checkbox>
        </template>

        <!-- Title -->
        <template #title>
            <h1 class="text-body-1">
                {{ intercept.nickname }}
            </h1>
        </template>

        <!-- Subtitle -->
        <template #subtitle>
            <v-tooltip :text="intercept.interceptUrl" location="top">
                <template #activator="{ props }">
                    <h2 class="text-body-2" v-bind="props">
                        {{ intercept.interceptUrl }}
                    </h2>
                </template>
            </v-tooltip>
        </template>

        <!-- Delete intercept -->
        <template #append>
            <v-btn icon="mdi-close" @click.stop="handleInterceptDelete" variant="flat"></v-btn>
        </template>
    </v-list-item>
</template>

<style lang="scss" scoped>
.intercept {
    cursor: pointer;

    &.intercept--disabled {
        opacity: 0.5;
    }

    ::v-deep .v-list-item-subtitle {
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        white-space: nowrap !important;
    }
}
</style>