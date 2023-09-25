<template>
    <div class="carousel relative shadow-2xl bg-white w-full">
        <div class="carousel-inner relative overflow-hidden w-full">
            <div v-for="(item, index) in props.items" :key="index">
                <input class="carousel-open" type="radio" :id="'carousel-' + index" name="carousel" aria-hidden="true"
                       hidden="" :value="index" v-model="selectedItem">
                <div class="carousel-item opacity-0 p-5" v-show="index === selectedItem">
                    <div class="block h-full w-full text-black text-sm text-left">{{ item.text }}</div>
                </div>
            </div>

                <div class="flex justify-between" v-if="props.items.length > 1">
                <button type="button"
                        @click="goBy(-1)"
                        class="m-2 text-white bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 320 512">
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                    <span class="sr-only">Previous Story</span>
                </button>

                <div>
                    <ol class="list-none z-10">
                        <li class="inline-block mr-2" v-for="(item, index) in props.items" :key="index">
                            <label :for="'carousel-' + index"
                                   class="carousel-bullet cursor-pointer block text-4xl text-black hover:text-blue-700">•</label>
                        </li>
                    </ol>
                </div>
                <button type="button"
                        @click="goBy(1)"
                        class="m-2 text-white bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 320 512">
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                    </svg>
                    <span class="sr-only">Next Story</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

import {CarouselItem} from "@/types/carousel";
import {defineProps, ref, defineEmits, computed} from 'vue';

const props = defineProps<{
    items: CarouselItem[],
    modelValue: number
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const selectedItem = computed({
    get() {
        return props.modelValue;
    },
    set(value: number) {
        emit('update:modelValue', value);
    }
});

const goBy = (by: number) => {
    let newIndex = selectedItem.value + by;
    if (newIndex < 0) {
        newIndex = props.items.length - 1;
    } else if (newIndex >= props.items.length) {
        newIndex = 0;
    }
    selectedItem.value = newIndex;
}

</script>

<style scoped>
.carousel-open:checked + .carousel-item {
    position: static;
    opacity: 100;
}

.carousel-item {
    -webkit-transition: opacity 0.6s ease-out;
    transition: opacity 0.6s ease-out;
}

.carousel-indicators {
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 2%;
    left: 0;
    right: 0;
}

</style>
