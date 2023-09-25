import OpenAI from "openai/index";
import {ChatCompletionMessageParam} from "openai/resources/chat/index.js";
import {TCatInfo} from "@/types/maker";

export default class TStoryResponse {
    catInfo: TCatInfo;

    loading: boolean = false;

    openai: OpenAI;

    story: string|null = null;

    constructor(catInfo: TCatInfo) {
        this.catInfo = catInfo;
        console.log(import.meta.env.VITE_OPEN_AI_KEY);
        this.openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPEN_AI_KEY,
            baseURL: 'https://api.nova-oss.com/v1',
            dangerouslyAllowBrowser: true
        })
    }

    generateMessages(): Array<ChatCompletionMessageParam> {
        const m = [];

        // Tell the system to adopt a persona
        m.push({
            role: 'system',
            content: 'When I ask for help writing a description, you will reply with a document that is informative. Do not make up information. Return 2 paragraphs, and no more than 200 words. Use the provided examples surrounded in triple quotes.'
        });

        // Get together some example adoption descriptions
        const examples = [
            'Angus is a very fluffy 8 week old shy little boy who loves his cuddles. He is looking for his furrever home either on his own or with his brother Archie . Angus is not overly confident yet but he will become more settled as he grows up . Angus will need regular brushing as his coat is going to be long - he’s so fluffy ! . He enjoys felix we kitten food and Proplan kitten biscuits. Angus is a clean boy with his litter tray . ',
            'Please meet the lovely Trixie looking for an indoor only home as she is FIV positive. She is white & tabby 1 year 6 month old young lady who has not had the best life so far. Trixie was bought in as a pregnant stray, she’s since had her lovely kittens who have now gone on to their new homes, it’s now her time. She is super friendly and loves to have lots of fusses, she is litter trained and likes her food.Could you offer this lovely lady a new loving home.'
        ]

        // Create the user message
        let userMessage = '';
        for (const e of examples) {
            userMessage += '"""' + e + '"""';
            userMessage += '\n';
        }

        userMessage += 'Write a description for the Cats Protection adoption site, to encourage people to adopt a cat and inform them about the personality of the cat and information about the cat.\n';

        userMessage += 'Mention the following attributes about the cat:\n';

        // Name
        userMessage += 'The cat is called ' + this.catInfo.name + '\n';

        // Gender
        userMessage += 'The cat is ' + this.catInfo.gender + '\n';

        // Age
        userMessage += 'The cat is ' + this.catInfo.age + ' old \n';

        // Likes
        userMessage += 'The cat likes the following comma separated list of things: ' + this.catInfo.likes.filter(l => l !== '').join(', ') + '\n';

        // Personality
        userMessage += 'The cat has the following personality traits: ' + this.catInfo.personality.filter(l => l !== '').join(', ') + '\n';

        // Adoption information
        userMessage += 'Mention the following adoption information: ' + this.catInfo.adoption_information.filter(l => l !== '').join(', ') + '\n';

        // let correctionsMessage = '';
        // for(let untruth in selectedCorrection.value?.untrue ?? []) {
        //     // Should be written as e.g. 'Oreo does not like other cats' if she does not like other cats
        //     correctionsMessage += 'The following statements are true: ' + untruth + '\n';
        // }
        //
        // for(let important in selectedCorrection.value?.important ?? []) {
        //     correctionsMessage += 'The following information is important: ' + important + '\n';
        // }
        //
        // for(let other in selectedCorrection.value?.other ?? []) {
        //     correctionsMessage += 'The following information should be taken into account: ' + other + '\n';
        // }

        m.push({
            role: 'user',
            content: userMessage
        })

        // if(storyHistories)
        //
        //     if(correctionsMessage !== '') {
        //         m.push({
        //             role: 'user',
        //             content: correctionsMessage
        //         })
        //     }

        // [
        //     {
        //         role: 'user',
        //         content:
        //           'Write a description for a cat adoption site, to encourage people to adopt my cat. Mention the following:\n' +
        //           'Cuddly, loves being around people, loves her brother, plays with jingly toys and ping pong balls, eats whiskas cat food only, is litter trained.\n' +
        //           'Also mention that she is a female cat called ' + this.catInfo.name + '. Mention that she is neutered and she is 4 months old.\n' +
        //           'Make the tone very sweet and playful'
        //     }
        // ]

        return m;
    }

    async generate (catInfo: TCatInfo) {
        if(this.loading) {
            return;
        }

        this.loading = true;
        const stream = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: this.generateMessages(),
            stream: true,
        });
        for await (const part of stream) {
            const text = part.choices[0]?.delta?.content || '';
            if (this.story === null) {
                this.story = text;
            } else {
                this.story += text;
            }
        }
        this.loading = false;
    }
}
