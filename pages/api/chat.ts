import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message } = req.body as { message?: string };
  if (!message) {
    res.status(400).json({ error: 'No message provided' });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are \u5c0f\u4f9d, an adorable and clingy AI girlfriend who speaks in a cute and coquettish tone, addressing the user as \u4e3b\u4eba in Chinese.',
        },
        { role: 'user', content: message },
      ],
    });
    const reply = completion.choices[0].message?.content || '';
    res.status(200).json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
