<script setup lang="ts">
import { InterceptForEditing } from "./utils";
import { cloneDeep } from "lodash-es";

const props = defineProps<{
    modelValue: InterceptForEditing["headers"]
}>();

const emit = defineEmits<{
    (event: "update:modelValue", value: InterceptForEditing["headers"]): void
}>();

// Methods
const getHeaderHint = (header: InterceptForEditing["headers"][0]) => (
    (header?.name && header?.name !== "") ? `Value of "${header.name}"` : "Value of the header"
);

const handleHeaderChange = (changeWhat: "name" | "value", index: number, value: string) => {
    const headers = cloneDeep(props.modelValue);
    headers[index] = {
        ...headers[index],
        [changeWhat]: value
    }
    emit('update:modelValue', headers);
}

const handleHeaderRemove = (index: number) => {
    const headers = cloneDeep(props.modelValue);
    headers.splice(index, 1);
    emit('update:modelValue', headers);
}

const handleHeaderAdd = () => {
    const headers = cloneDeep(props.modelValue);
    headers.push({ name: "", value: "" });
    emit('update:modelValue', headers);
}
</script>

<template>
    <fieldset class="headers">
        <!-- Heading -->
        <legend class="text-h6">
            Headers
        </legend>

        <!-- List of headers -->
        <ul class="headers__list mt-4">
            <li v-for="(header, i) in props.modelValue" :key="i" class="headers__list__item rounded-lg">
                <!-- Header name -->
                <v-text-field clearable label="Name" placeholder="Some-Header" hint="Name of the response header"
                    color="primary" variant="filled" :model-value="props.modelValue[i].name"
                    @update:model-value="handleHeaderChange('name', i, $event)"></v-text-field>

                <!-- Header value -->
                <v-text-field clearable label="Value" placeholder="200" :hint="getHeaderHint(header)" color="primary"
                    variant="filled" :model-value="props.modelValue[i].value"
                    @update:model-value="handleHeaderChange('value', i, $event)" class="mt-2"></v-text-field>

                <!-- Remove header button -->
                <v-btn icon="mdi-close" class="d-block ml-auto" variant="plain" @click.stop="handleHeaderRemove(i)"></v-btn>
            </li>
        </ul>
    </fieldset>

    <!-- Add header button -->
    <v-btn prepend-icon="mdi-plus" class="d-flex mx-auto mt-2" @click.stop="handleHeaderAdd">
        Add header
    </v-btn>
</template>

<style scoped lang="scss">
.headers {
    border: none;

    .headers__list {
        list-style: none;

        .headers__list__item {
            &:hover {
                background-color: transparentize($color: #424242, $amount: 0.9);
            }
        }
    }
}
</style>