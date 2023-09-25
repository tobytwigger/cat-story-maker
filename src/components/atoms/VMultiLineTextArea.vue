<template>
    <label :for="props.id"
           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
    <textarea v-model="dynamicModelValue" :id="props.id" rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </textarea>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';

const props = defineProps<{
    modelValue: string[],
    label: string,
    id: string
}>();

const dynamicModelValue = computed<string>({
    get() {
        return props.modelValue.join('\n')
    },
    set(value: string) {
        emit('update:modelValue', value.split('\n'));
    }
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
}>();

</script>

<style scoped>

</style>
