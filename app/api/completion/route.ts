import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();
        const { text } = await generateText({
            model: openai('gpt-5-nano'),
            prompt: prompt,
        });
        return Response.json({ text });
    } catch (error) {
        console.error('Error generating text:', error);
        return Response.json({ error: 'Failed to generate text' }, { status: 500 });
    }

}
