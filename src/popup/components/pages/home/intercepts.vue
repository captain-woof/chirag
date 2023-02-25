<script setup lang="ts">
import { computed } from 'vue';
import Intercept from './intercept.vue';
import { useChiragStore } from '../../../store';
import AddNewIntercept from './addNewIntercept.vue';

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
    <div class="bg-grey-darken-4">

        <!-- List of intercepts -->
        <v-list class="intercepts">
            <Intercept v-for="intercept in interceptsArr" :key="intercept.interceptUrl" :intercept="intercept" />
        </v-list>

        <footer class="py-5">
            <!-- Add new intercept button -->
            <AddNewIntercept />
        </footer>
    </div>
</template>

<style scoped lang="scss">
.intercepts {
    height: 420px;
    overflow-y: scroll;
}
</style>