<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChiragStore } from "../../../store";
import { getInterceptForEditing, getInterceptForSaving } from "./utils";
import { useToast } from "../../../plugins/toast";
import InterceptUrl from "./interceptUrl.vue";
import SaveAndCancel from "./saveAndCancel.vue";
import Nickname from "./nickname.vue";
import StatusCode from "./statusCode.vue";
import Headers from "./headers.vue";
import Content from "./content.vue";

const route = useRoute();
const store = useChiragStore();
const router = useRouter();
const toast = useToast();

// Getters
const interceptUrlInitial = computed(() => (route.params.interceptUrl as string));

const heading = computed(() => (
    store.intercepts[interceptUrlInitial.value]
        ? "Edit intercept"
        : "Add intercept"
));

// States
const interceptForEditing = ref(getInterceptForEditing({
    interceptUrl: interceptUrlInitial.value,
    ...store.intercepts[interceptUrlInitial.value]
}));

// Methods
const handleSaveIntercept = async () => {
    try {
        const { interceptUrl, ...intercept } = getInterceptForSaving(interceptForEditing.value);

        // If intercept URL changed, delete previous one
        if (interceptUrlInitial.value !== interceptUrl) {
            await store.removeIntercept(interceptUrlInitial.value);
        }

        // Add new/updated intercept
        await store.addOrUpdateIntercept(interceptUrl, intercept);
        router.back();
    } catch {
        toast.show("Failed to save intercept", "error");
    }
}
</script>

<template>
    <v-form @submit.prevent="handleSaveIntercept" class="editor pa-8 bg-grey-darken-4 rounded-xl">
        <h1 class="text-h5 mb-5">
            {{ heading }}
        </h1>

        <div class="editor__fields">
            <!-- Nickname -->
            <Nickname v-model="interceptForEditing.nickname" />

            <!-- Intercept URL -->
            <InterceptUrl v-model="interceptForEditing.interceptUrl" />

            <!-- Status code -->
            <StatusCode v-model="interceptForEditing.statusCode" />

            <!-- Headers -->
            <Headers v-model="interceptForEditing.headers" />

            <!-- Content -->
            <Content v-model="interceptForEditing.content" />
        </div>

        <!-- Save and Cancel -->
        <SaveAndCancel />
    </v-form>
</template>

<style scoped lang="scss">
.editor {
    width: 500px;

    .editor__fields {
        height: 55vh;
        overflow-y: scroll;
    }
}
</style>