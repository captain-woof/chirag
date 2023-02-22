<script setup lang="ts">
import { defineProps, computed, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import { ChiragStorage } from "../../../../service_worker/types";

// Props
const { intercept } = defineProps<{
    intercept: ChiragStorage["intercepts"][""] & { interceptUrl: string }
}>();

// States
const enabled = ref(intercept.enabled);
const router = useRouter();

// Methods
const handleInterceptClick = () => {
    router.push({ name: "editor", params: { interceptUrl: intercept.interceptUrl } });
}
</script>

<template>
    <v-list-item :title="intercept.nickname" append-icon="mdi-chevron-right" @click="handleInterceptClick" class="intercept"
        :class="{ 'intercept--disabled': !enabled }" v-ripple>
        <!-- Checkbox - enable/disable -->
        <template #prepend>
            <v-checkbox color="primary" v-model="enabled"></v-checkbox>
        </template>

        <!-- Subtitle -->
        <template #subtitle>
            <v-tooltip :text="intercept.interceptUrl" location="top">
                <template #activator="{ props }">
                    <h2 class="text-caption" v-bind="props">
                        {{ intercept.interceptUrl }}
                    </h2>
                </template>
            </v-tooltip>
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