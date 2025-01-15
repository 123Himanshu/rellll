// import { NextResponse } from 'next/server'
// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: messages.map((message: any) => ({
//         content: message.content,
//         role: message.role,
//       })),
//     })

//     return NextResponse.json({ message: completion.choices[0].message.content })
//   } catch (error: any) {
//     console.error('Chat error:', error)
//     return NextResponse.json(
//       { error: error.message || 'Error processing chat' },
//       { status: 500 }
//     )
//   }
// } 