<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <footer class="d-flex flex-row align-center justify-center mt-8">
        <!-- Cancel -->
        <v-btn variant="outlined" class="w-50" @click="router.back">
            Cancel
        </v-btn>

        <!-- Save -->
        <v-btn color="primary" variant="elevated" class="ml-2 w-50" type="submit">
            Save
        </v-btn>
    </footer>
</template>

<style scoped lang="scss"></style>