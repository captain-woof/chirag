<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleAddNewIntercept = async () => {
    await router.push({
        name: "editor"
    });
}
</script>

<template>
    <v-btn prepend-icon="mdi-plus" class="d-flex mx-auto" variant="flat" color="primary" @click="handleAddNewIntercept">
        Add new intercept
    </v-btn>
</template>
