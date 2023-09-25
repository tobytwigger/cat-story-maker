import {TCatInfo} from "@/types/maker";
import TStoryResponse from "@/ai/TStoryResponse";

export default class TStory {
    catInfo: TCatInfo;

    responses: TStoryResponse[] = [];

    constructor(catInfo: TCatInfo) {
        this.catInfo = catInfo;
    }

    generate(): TStoryResponse {
        const response = new TStoryResponse(this.catInfo);
        // Set any history from previous responses
        return response;
    }


}
