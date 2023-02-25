<script setup lang="ts">

const props = defineProps<{
    modelValue: number
}>();

const emits = defineEmits<{
    (event: "update:modelValue", value: number): void
}>();
</script>

<template>
    <v-text-field clearable label="Status code" placeholder="200" hint="HTTP response status code" color="primary"
        variant="filled" :model-value="props.modelValue" @update:model-value="emits('update:modelValue', parseInt($event))"
        class="mt-2" type="number"></v-text-field>
</template>

<style scoped lang="scss"></style>