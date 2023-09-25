import {ref} from "vue";
import type {TCatInfo} from "@/types/maker";
import TStory from "@/ai/TStory";

const stories = ref<TStory[]>([]);

/**
 * Returns the index of the new story
 *
 * @param catInfo
 */
const newStory = (catInfo: TCatInfo): number => {
    const story: TStory = new TStory(catInfo);
    story.send();
    return (stories.value.push(story) - 1);
};

export {stories, newStory};
