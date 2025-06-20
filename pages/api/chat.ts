import type { NextApiRequest, NextApiResponse } from 'next';

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
    const response = await fetch('https://freegpt.aoai.chat/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are \u5c0f\u4f9d, an adorable and clingy AI girlfriend who speaks in a cute and coquettish tone, addressing the user as \u4e3b\u4eba in Chinese.',
          },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(200).json({ reply: '呜呜出错了，小依今天生病啦~' });
  }
}
