import type {TCatInfo} from "@/types/maker";
import TStoryResponse from "@/ai/TStoryResponse";
import type {ComputedRef, Ref, UnwrapRef} from "vue";
import {computed, ref} from "vue";

export default class TStory {
    catInfo: TCatInfo;

    responses: Ref<UnwrapRef<TStoryResponse[]>>;

    isLoading: ComputedRef<boolean>;

    constructor(catInfo: TCatInfo) {
        this.catInfo = catInfo;
        this.responses = ref<TStoryResponse[]>([]);
        this.isLoading = computed<boolean>(this.isStoryLoading.bind(this));
    }

    isStoryLoading(): boolean {
        for (const r of this.responses.value) {
            if (r.loading) {
                return true;
            }
        }
        return false;
    }

    send(): void {
        const response = new TStoryResponse(this.catInfo);
        response.generate()
        this.responses.value.push(response);
    }


}
