<script setup lang="ts">
import { computed } from 'vue';
import Intercept from './intercept.vue';
import { useChiragStore } from '../../../store';

// States
const store = useChiragStore();

// Getters
const interceptsArr = computed(() => (Object.entries(store.intercepts).map(([interceptUrl, intercept]) => (
    {
        interceptUrl,
        ...intercept
    }
))));
</script>

<template>
    <v-list class="intercepts">
        <Intercept v-for="intercept in interceptsArr" :key="intercept.interceptUrl" :intercept="intercept" />
    </v-list>
</template>

<style scoped lang="scss">
.intercepts {
    height: 420px;
    overflow-y: scroll;
}
</style>