<template>
    <div class="mb-6">
        <VMultiLineTextArea id="corrections"
                            label="Untrue Statements"
                            v-model="dynamicCorrection.untrue"></VMultiLineTextArea>
    </div>

    <div class="mb-6">
        <VMultiLineTextArea id="important"
                            label="Important Statements"
                            v-model="dynamicCorrection.untrue"></VMultiLineTextArea>
    </div>

    <div class="mb-6">
        <VMultiLineTextArea id="other"
                            label="Other Corrections"
                            v-model="dynamicCorrection.other"></VMultiLineTextArea>
    </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';
import {TResponseCorrections} from "@/types/maker";
import VMultiLineTextArea from "@/components/atoms/VMultiLineTextArea.vue";

const props = defineProps<{
    correction: TResponseCorrections
}>();

const dynamicCorrection = computed<TResponseCorrections>({
    get() {
        return props.correction;
    },
    set(value: TResponseCorrections) {
        emit('update:correction', value);
    }
});

const emit = defineEmits<{
    (e: 'update:correction', value: TResponseCorrections): void;
}>();


</script>

<style scoped>

</style>
