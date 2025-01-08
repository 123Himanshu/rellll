import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    // Test the API key with a simple request
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('OpenAI API Test Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 