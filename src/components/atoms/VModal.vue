<template>

    <slot name="activator" v-bind:show="show"></slot>

    <div
      :class="{'overflow-y-hidden opacity-0 invisible': !isShowing, 'opacity-100 visible': isShowing}"
      class="fixed inset-0 w-full h-full z-20 outline-none overflow-x-hidden overflow-y-auto transition-all"
      style="transition-duration: 500ms;"
    >
        <div
          @click="isShowing = false"
          class="fixed inset-0 w-full h-full bg-black bg-opacity-50"
        ></div>
        <div
          :class="{'-translate-y-full': !isShowing, 'translate-y-0': isShowing}"
          class="modal relative w-auto my-8 mx-4 pointer-events-none transition-all duration-300 transform"
        >
            <div class="relative shadow-lg rounded-md w-full pointer-events-auto bg-white text-gray-800 max-w-screen-xl mx-auto">
                <header class="flex items-center justify-between p-2">
                    <span></span>
                    <h2 class="font-bold" id="exampleHeader">{{props.header}}</h2>
                    <button
                      @click="isShowing = false"
                      class="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                    >
                        <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18">
                            <path
                              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                            ></path>
                        </svg>
                    </button>
                </header>
                <main class="">
                    <slot></slot>
                </main>
                <footer class="flex justify-end p-2">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, watch, withDefaults, defineProps, defineExpose} from "vue";
import {v4} from "uuid";

const props = defineProps<{
    header: string;
}>();

const isShowing = ref<boolean>(false);

watch(isShowing, (val: boolean) => {
    let body: HTMLBodyElement|null = document.querySelector('body');
    if(body !== null) {
        if(val) {
            body.classList.add('overflow-y-hidden');
        } else {
            body.classList.remove('overflow-y-hidden');
        }
    }
})

const show = function() {
    isShowing.value = true;
}

const close = function() {
    isShowing.value = false;
}

defineExpose({
    close
});

</script>

<style scoped>

</style>
