<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue';
import { ChiragStorage } from "../../../../service_worker/types";
import Intercept from './intercept.vue';

const interceptsMap: Ref<ChiragStorage["intercepts"]> = ref({
    "https://some-big.domain/api/some-api/param/1": {
        enabled: true,
        responseStatusCode: 200,
        responseHeaders: {
            "Content-type": "application/json"
        },
        nickname: "API 1",
        responseBody: "{ 'key1': 'value1' }"
    },
    "https://some-big.domain/api/some-api/param/3": {
        enabled: true,
        responseStatusCode: 200,
        responseHeaders: {
            "Content-type": "application/json"
        },
        nickname: "API 3",
        responseBody: "{ 'key3': 'value3' }"
    },
    "https://some-big.domain/api/some-api-2/param/2": {
        enabled: false,
        responseStatusCode: 200,
        responseHeaders: {
            "Content-type": "application/json"
        },
        nickname: "API 2",
        responseBody: "{ 'key2': 'value2' }"
    },
    "https://some-big.domain/api/some-api-2/param/7": {
        enabled: false,
        responseStatusCode: 200,
        responseHeaders: {
            "Content-type": "application/json"
        },
        nickname: "API 7",
        responseBody: "{ 'key7': 'value7' }"
    },
    "https://some-big.domain/api/some-api/param/8": {
        enabled: true,
        responseStatusCode: 200,
        responseHeaders: {
            "Content-type": "application/json"
        },
        nickname: "API 8",
        responseBody: "{ 'key8': 'value8' }"
    },
    "https://some-big.domain/api/some-api/param/9": {
        enabled: true,
        responseStatusCode: 200,
        responseHeaders: {
            "Content-type": "application/json"
        },
        nickname: "API 9",
        responseBody: "{ 'key9': 'value9' }"
    },
});

const interceptsArr = computed(() => (Object.entries(interceptsMap.value).map(([interceptUrl, intercept]) => (
    {
        interceptUrl,
        ...intercept
    }
))));


</script>

<template>
    <v-list nav>
        <Intercept v-for="intercept in interceptsArr" :key="intercept.interceptUrl" :intercept="intercept" />
    </v-list>
</template>

<style scoped lang="scss"></style>