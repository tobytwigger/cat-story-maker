<template>
    <StepItem>
        <template #icon>
            <PlusIcon></PlusIcon>
        </template>
        <template #heading>
            Add your cats
        </template>

        <div class="flex flex-col">
          <span>
              <span v-if="dynamicCats.length === 0">Add a new cat to get started</span>
              <VModal header="Add a cat" ref="newCatModal">
                  <template #activator="{show}">
                      <button @click="show" class="ml-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full">
                          New Cat
                      </button>
                  </template>
                  <NewCatDetails @catAdded="appendCat"></NewCatDetails>
              </VModal>
          </span>
<!--            <div class="flex flex-row">-->
<!--                <VModal :header="editCatModalHeader" ref="editCatModal">-->
<!--                    <template #activator="{show}">-->
<!--                        <button type="button"-->
<!--                                v-for="(cat, index) in dynamicCats"-->
<!--                                @click="showEditCatModal(cat, index, show)"-->
<!--                                :key="index"-->
<!--                                class="text-xs text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">-->
<!--                            {{ cat.name }}-->
<!--                        </button>-->
<!--                    </template>-->
<!--                    <NewCatDetails @catAdded="editCat" :pre-info="editingCat"></NewCatDetails>-->
<!--                </VModal>-->


<!--            </div>-->
        </div>

    </StepItem>
</template>

<script setup lang="ts">
import StepItem from '@/components/atoms/StepItem.vue'
import CatIcon from '@/components/icons/CatIcon.vue'
import type {TCatInfo} from "@/types/maker";
import {ref, defineProps, computed, defineEmits} from "vue";
import VModal from "@/components/atoms/VModal.vue";
import NewCatDetails from "@/components/molecules/NewCatDetails.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import VCarousel from "@/components/atoms/VCarousel.vue";

const props = defineProps<{
    cats: TCatInfo[]
}>();

const dynamicCats = computed({
    get() {
        return props.cats;
    },
    set(value: TCatInfo[]) {
        emit('update:catsValue', value);
    }
});

const newCatModal = ref<VModal|null>(null);

const appendCat = (cat: TCatInfo) => {
    dynamicCats.value.push(cat);
    newCatModal.value?.close();
}

const editCatModal = ref<VModal|null>(null);

const editCat = (cat: TCatInfo) => {
    if(editingCatIndex.value !== null) {
        dynamicCats.value[editingCatIndex.value as number] = cat;
        editCatModal.value?.close();
        editingCat.value = null;
        editingCatIndex.value = null;
    }
}

const editingCat = ref<TCatInfo|null>(null);
const editingCatIndex = ref<number|null>(null);

const showEditCatModal = (cat: TCatInfo, index: number, show: () => void) => {
    editingCat.value = cat;
    editingCatIndex.value = index;
    show();
}

const editCatModalHeader = computed<string>(() => {
    if(editingCat.value) {
        return `Edit ${editingCat.value?.name}`;
    }
    return 'Edit Cat';
});

const emit = defineEmits<{
    (e: 'update:cats', cats: TCatInfo[]): void;
}>();

</script>

<style scoped></style>
