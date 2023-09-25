<template>

    <form class="px-20 py-2" @submit.prevent="submitCat">
        <div class="mb-6">
            <label for="cat_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cat Name</label>
            <input type="text"
                   v-model="catInfo.name"
                   id="cat_name"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required>
        </div>

        <fieldset>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>

            <legend class="sr-only">Gender</legend>

            <div class="flex items-center mb-4">
                <input id="gender-male" type="radio" name="gender" v-model="catInfo.gender" value="male"
                       class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                       checked>
                <label for="gender-male" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Male
                </label>
            </div>

            <div class="flex items-center mb-4">
                <input id="gender-female" type="radio" name="gender" value="female" v-model="catInfo.gender"
                       class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                <label for="gender-female" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Female
                </label>
            </div>
        </fieldset>

        <div class="mb-6">
            <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
            <input type="text" id="age" v-model="catInfo.age"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="1 year 4 months" required>
        </div>

        <div class="mb-6">
            <VMultiLineTextArea id="likes"
                                label="Likes"
                                v-model="catInfo.likes"></VMultiLineTextArea>
        </div>

        <div class="mb-6">
            <VMultiLineTextArea id="personality"
                                label="Personality"
                                v-model="catInfo.personality"></VMultiLineTextArea>
        </div>

        <div class="mb-6">
            <VMultiLineTextArea id="adoptionInformation"
                                label="Re-homing Information"
                                v-model="catInfo.adoption_information"></VMultiLineTextArea>
        </div>

        <div class="flex justify-end mb-6">
            <button v-if="readyToSubmit" type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Save Cat
            </button>
            <button v-else
                    type="button"
                    class="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled>
                <span>Save Cat</span>
            </button>
        </div>
    </form>


</template>

<script setup lang="ts">
import {computed, defineEmits, ref, defineProps, onMounted, watch} from 'vue';
import type {TCatInfo} from "@/types/maker";
import VModal from "@/components/atoms/VModal.vue";
import VMultiLineTextArea from "@/components/atoms/VMultiLineTextArea.vue";

const props = defineProps<{
    preInfo?: TCatInfo | null;
}>();

// Change here for changing cat info fields, as well as the TCatInfo type
const catInfo = ref<TCatInfo>({
    name: null,
    gender: 'male',
    age: null,
    likes: [],
    personality: [],
    adoption_information: []
});

const copyPreInfoToCat = (preinfo: TCatInfo) => {
    catInfo.value.name = preinfo.name;
    catInfo.value.gender = preinfo.gender;
    catInfo.value.age = preinfo.age;
    catInfo.value.likes = preinfo.likes;
    catInfo.value.personality = preinfo.personality;
    catInfo.value.adoption_information = preinfo.adoption_information;
}

const resetCatInfo = () => {
    catInfo.value = {
        name: null,
        gender: 'male',
        age: null,
        likes: [],
        personality: [],
        adoption_information: []
    }
}


onMounted(() => {
    if (props.preInfo) {
        copyPreInfoToCat(props.preInfo)
    }
});

watch(() => props.preInfo, (val: TCatInfo | null) => {
    if (val && val !== null) {
        copyPreInfoToCat(val)
    }
}, {
    deep: true
})


const readyToSubmit = computed<boolean>(() => {
    return catInfo.value.name !== null;
});

const emit = defineEmits<{
    (e: 'catAdded', cat: TCatInfo): void;
}>();


const submitCat = () => {
    if (!readyToSubmit.value) {
        alert('Please fill in all the cat details');
    } else {
        emit('catAdded', catInfo.value);
        resetCatInfo();
    }
}


</script>

<style scoped>

</style>
