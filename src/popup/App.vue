<script setup lang="ts">
import { onBeforeMount } from "vue";
import { syncChiragStore } from './store';
import Toast from "./components/misc/toast.vue";

// Initialise store
onBeforeMount(syncChiragStore);
</script>

<template>
    <v-layout>
        <!-- Route component -->
        <router-view></router-view>

        <!-- Toast -->
        <Toast />
    </v-layout>
</template>
