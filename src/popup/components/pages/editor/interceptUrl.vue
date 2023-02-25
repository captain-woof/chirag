<script setup lang="ts">

const props = defineProps<{
    modelValue: string
}>();

const emits = defineEmits<{
    (event: "update:modelValue", value: string): void
}>();
</script>

<template>
    <v-text-field clearable label="URL" prepend-inner-icon="mdi-link-variant"
        placeholder="https://api-origin.com/api/v1/users" type="url" hint="Endpoint which is to be intercepted"
        color="primary" variant="filled" :model-value="props.modelValue"
        @update:model-value="emits('update:modelValue', $event)" class="mt-2"></v-text-field>
</template>

<style scoped lang="scss"></style>