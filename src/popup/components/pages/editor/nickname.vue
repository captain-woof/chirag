<script setup lang="ts">

const props = defineProps<{
    modelValue: string
}>();

const emit = defineEmits<{
    (event: "update:modelValue", value: string): void
}>();
</script>

<template>
    <v-text-field clearable label="Nickname" placeholder="My API" hint="A name to identify this endpoint" color="primary"
        variant="filled" :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"></v-text-field>
</template>

<style scoped lang="scss"></style>