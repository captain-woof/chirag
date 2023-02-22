<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// States
const route = useRoute();

// Getters
const contentType = computed(() => (
    intercept?.responseHeaders?.["Content-type"] ?? intercept?.responseHeaders?.["content-type"] ?? "Unknown content type"
));

onMounted(() => {
    console.log("ROUTE PARAMS", route.params);
});
</script>

<template></template>

<style scoped lang="scss"></style>