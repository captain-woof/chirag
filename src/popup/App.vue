<script setup lang="ts">
import StatusBar from './components/misc/StatusBar.vue';
</script>

<template>
    <v-layout>
        <StatusBar />
        <router-view></router-view>
    </v-layout>
</template>
