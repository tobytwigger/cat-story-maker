<template>
    <v-carousel :items="items" v-model="selectedItem"></v-carousel>
    <!--    -->
    <!--    <div>-->
    <!--        <p :key="index" class="mb-2" v-for="(story, index) in stories">-->
    <!--            {{story}}-->
    <!--        </p>-->
    <!--    </div>-->
</template>

<script setup lang="ts">
import {computed, defineProps, defineEmits} from "vue";
import VCarousel from "@/components/atoms/VCarousel.vue";
import {CarouselItem} from "@/types/carousel";
import TStory from "@/ai/TStory";
import TStoryResponse from "@/ai/TStoryResponse";

const props = defineProps<{
    stories: TStory[],
    modelValue: number
}>();

const items = computed<CarouselItem[]>(() => {
    return props.stories
      .map((s: TStory): CarouselItem => {
          let response: TStoryResponse|undefined = s.responses[s.responses.length - 1];
          return {
              text: response?.story ?? ''
          };
      })
      .filter((s: CarouselItem): boolean => {
        return s.text !== '';
    });
});

const selectedItem = computed<number>({
    get() {
        return props.modelValue;
    },
    set(value: number) {
        emit('update:modelValue', value);
    }
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

</script>

<style scoped>

</style>
