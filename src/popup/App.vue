<script setup lang="ts">
import Toast from "./components/misc/toast.vue";
</script>

<template>
    <v-layout>
        <!-- Route component -->
        <router-view></router-view>

        <!-- Toast -->
        <Toast />
    </v-layout>
</template>
