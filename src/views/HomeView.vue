<script setup lang="ts">

import SetupCats from '@/components/SetupCats.vue'
import {ref} from "vue";
import {TCatInfo} from "@/types/maker";
import GenerateStory from "@/components/GenerateStory.vue";

const cats = ref<TCatInfo[]>([{
    likes: ['Whiskas', 'Playing with toys', 'Cuddles', 'Attention'],
    age: '4 months',
    gender: 'female',
    name: 'Oreo',
    adoption_information: ['To be rehomed with her brother Spot'],
    personality: ['Friendly', 'Cuddly', 'Loving', 'Gentle', 'Playful']
}]);

</script>

<template>
    <main>
        <SetupCats v-model:cats="cats"></SetupCats>
        <div :key="index"
             v-for="(cat, index) in cats">
            <GenerateStory
              :cat="cat"
              v-model:cat="cats[index]"
            ></GenerateStory>
        </div>
    </main>
</template>
