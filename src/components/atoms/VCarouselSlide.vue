<template>
    <input class="carousel-open" type="radio" :id="'carousel-' + index" name="carousel" aria-hidden="true" hidden=""
           checked="checked">
    <div class="carousel-item absolute opacity-0" style="height:50vh;">
        <div class="block h-full w-full bg-indigo-500 text-white text-5xl text-center">Slide 1</div>
    </div>
    <label :for="'carousel-' + nextIndex"
           class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
    <label :for="'carousel-' + prevIndex"
           class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

</template>

<script setup lang="ts">

import {CarouselItem} from "@/types/carousel";
import {defineProps} from 'vue';
const props = defineProps<{
    item: CarouselItem,
    totalItems: number,
}>();

</script>

<style scoped>

</style>
