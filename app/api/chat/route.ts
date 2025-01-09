// api/chat/route.ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Remove baseURL and only keep essential configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages) {
      return new Response('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'You are MindfulAI, a compassionate mental health support assistant.',
        },
        ...messages,
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
    
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(error.message || 'An error occurred', { status: 500 });
  }
}