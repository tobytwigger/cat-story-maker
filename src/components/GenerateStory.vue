<template>
    <StepItem>
        <template #icon>
            <CatIcon></CatIcon>
        </template>
        <template #heading>
            <div class="flex">
                <span>
                    {{ cat.name }}'s Story
                </span>
                <div class="ml-auto mr-6 flex flex-row">
                    <VModal :header="'Edit ' + cat.name" ref="editCatModal">
                        <template #activator="{show}">
                            <button type="button"
                                    @click="show"
                                    class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                                Edit Cat
                            </button>
                        </template>
                        <NewCatDetails @catAdded="editCat" :pre-info="cat"></NewCatDetails>
                    </VModal>


                    <button type="button"
                            @click="createNewStory"
                            class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                        Generate a new story <span v-if="isLoading">LOADING</span>
                    </button>
                    <VModal :header="'Refine ' + cat.name + '\'s story'" ref="refineCatModal">
                        <template #activator="{show}">
                            <button type="button"
                                    class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                    @click="show">
                                Refine story
                            </button>
                        </template>
<!--                        <CorrectionDetails v-model:correction="selectedCorrection"></CorrectionDetails>-->
                        <button type="button"
                                @click="refineResults"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update response
                        </button>
                    </VModal>


                </div>
            </div>
        </template>

        <div>
            <div class="flex justify-center">
                <StoryViewer v-model="selectedStory" :stories="stories"></StoryViewer>
            </div>
<!--            <div v-if="story && !loadingCatStory">-->
<!--                Review-->
<!--            </div>-->
        </div>

    </StepItem>
</template>

<script setup lang="ts">
import StepItem from '@/components/atoms/StepItem.vue';
import CatIcon from '@/components/icons/CatIcon.vue';
import {TCatInfo, TResponseCorrections} from "@/types/maker";
import {defineProps, ref, computed, onMounted, watch, defineEmits} from "vue";
import StoryViewer from "@/components/molecules/StoryViewer.vue";
import VModal from "@/components/atoms/VModal.vue";
import NewCatDetails from "@/components/molecules/NewCatDetails.vue";
import CorrectionDetails from "@/components/molecules/CorrectionDetails.vue";
import {stories, newStory} from "@/ai/StoryManager";
import TStory from "@/ai/TStory";

const props = defineProps<{
    cat: TCatInfo,
}>();

const selectedStory = ref<number>(0);

const createNewStory = () => {
    let index = newStory(props.cat);
    selectedStory.value = index;
}

const isLoading = computed<boolean>(() => {
    return stories.value.filter(s => s.isLoading).length > 0;
});

watch(() => props.cat, (val: TCatInfo) => {
    if (val && val !== null) {
        createNewStory();
    }
}, {
    deep: true
});

onMounted(() => {
    createNewStory();
});






const refineResults = () => {
    alert('TODO');
}







// const corrections = ref<{[key: number]: TResponseCorrections}>({})
//
// const selectedCorrection = computed<TResponseCorrections>({
//     get: () => {
//         return corrections.value[selectedStory.value] || {
//             important: [],
//             untrue: [],
//             other: []
//         };
//     },
//     set(val: TResponseCorrections) {
//         corrections.value[selectedStory.value] = val;
//     }
// });



// const loadingCatStory = ref<boolean>(false);
// const stories = ref<(string|null)[]>([]);
// const storyHistories = ref<{[key: number]: string[]}>({});





const editCatModal = ref<VModal|null>(null);
const editCat = (cat: TCatInfo) => {
    emit('update:cat', cat);
    editCatModal.value?.close();
}

const emit = defineEmits<{
    (e: 'update:cat', cat: TCatInfo): void;
}>();

</script>

<style scoped>

</style>
