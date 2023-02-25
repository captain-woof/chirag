<script setup lang="ts">

const props = defineProps<{
    modelValue: string
}>();

const emits = defineEmits<{
    (event: "update:modelValue", value: string): void
}>();
</script>

<template>
    <h2 class="mt-4 text-h6">
        Response
    </h2>
    <v-textarea clearable label="Response" placeholder="{'key': 'value'}" hint="Mock response to receive" auto-grow
        color="primary" variant="filled" :model-value="props.modelValue"
        @update:model-value="emits('update:modelValue', $event)" class="mt-4"></v-textarea>
</template>

<style scoped lang="scss"></style>