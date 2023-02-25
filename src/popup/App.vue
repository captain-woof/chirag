<script setup lang="ts">
import { onBeforeMount } from "vue";
import { syncChiragStore } from './store';

// Initialise store
onBeforeMount(syncChiragStore);
</script>

<template>
    <v-layout>
        <router-view></router-view>
    </v-layout>
</template>
