// api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
 
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
 
const mentalHealthKeywords = [
  'mental health', 'anxiety', 'depression', 'stress', 'therapy', 'counseling',
  'mood', 'emotions', 'feelings', 'well-being', 'self-care', 'mindfulness',
  'psychology', 'psychiatry', 'trauma', 'coping', 'mental illness', 'disorder',
  'panic', 'phobia', 'ocd', 'ptsd', 'bipolar', 'schizophrenia', 'addiction',
  'substance abuse', 'eating disorder', 'self-esteem', 'grief', 'loss',
  'relationship issues', 'family problems', 'work stress', 'burnout',
  'sleep issues', 'relaxation', 'meditation', 'cognitive behavioral therapy',
  'psychotherapy', 'mental wellness', 'emotional support', 'crisis',
  'suicide prevention', 'self-harm', 'recovery', 'resilience', 'mental fitness'
];
 
function isMentalHealthRelated(input: string): boolean {
  const lowercaseInput = input.toLowerCase();
  return mentalHealthKeywords.some(keyword => lowercaseInput.includes(keyword));
}
 
export async function POST(req: Request) {
  const { messages } = await req.json();
  const userMessage = messages[messages.length - 1].content;
 
  if (!isMentalHealthRelated(userMessage)) {
    return new Response(JSON.stringify({
      role: 'assistant',
      content: "I'm sorry, but I'm specifically designed to assist with mental health-related questions. If you have any concerns about mental health, well-being, or emotional support, please feel free to ask and I'll do my best to help."
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant focused on mental health support. Provide empathetic, informative responses to mental health-related questions. Do not diagnose or prescribe medication, but offer general guidance and suggest professional help when appropriate.'
      },
      ...messages
    ],
  });
  return result.toDataStreamResponse();
}