import OpenAI from 'openai';

const {
  OPENAI_API_KEY,
  OPENAI_TEXT_MODEL = 'gpt-4.1-mini',
  OPENAI_IMAGE_MODEL = 'gpt-image-1',
} = process.env;

let openaiClient = null;

if (OPENAI_API_KEY) {
  openaiClient = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
} else {
  console.warn('[openai] OPENAI_API_KEY not configured. AI endpoints will be disabled.');
}

const ensureClient = () => {
  if (!openaiClient) {
    const error = new Error('OpenAI API is not configured. Please set OPENAI_API_KEY.');
    error.status = 503;
    throw error;
  }
  return openaiClient;
};

const extractJson = (text) => {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) return null;
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
};

export const generateArticleDraft = async ({
  topic,
  tone,
  length,
  outline,
  keywords,
}) => {
  const client = ensureClient();

  const prompt = [
    `You are an expert content strategist writing a long-form article outline and draft.`,
    `Topic: ${topic}`,
    `Tone: ${tone}`,
    `Desired length: ${length}`,
    `Outline preference: ${outline}`,
    `Keywords to include: ${keywords || 'none provided'}`,
    '',
    'Return a polished Markdown article with clear headings, short paragraphs, and bullet lists where useful.',
  ].join('\n');

  const response = await client.responses.create({
    model: OPENAI_TEXT_MODEL,
    input: prompt,
  });

  return response.output_text?.trim() ?? '';
};

export const generateBlogTitles = async ({ topic, category, vibe }) => {
  const client = ensureClient();

  const prompt = [
    'Generate five compelling blog post titles.',
    `Topic: ${topic}`,
    `Category: ${category}`,
    `Desired vibe: ${vibe}`,
    '',
    'Return ONLY valid JSON matching this schema:',
    '{ "titles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"] }',
  ].join('\n');

  const response = await client.responses.create({
    model: OPENAI_TEXT_MODEL,
    input: prompt,
  });

  const raw = response.output_text ?? '';
  const parsed = extractJson(raw);

  if (!parsed?.titles) {
    const fallback = raw
      .split('\n')
      .map((line) => line.replace(/^[\d•\-\*]+\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 5);

    return fallback.length > 0 ? fallback : [];
  }

  return parsed.titles;
};

export const generateImagesFromPrompt = async ({ prompt, style, ratio }) => {
  const client = ensureClient();

  const sizeMap = {
    'Square 1:1': '1024x1024',
    'Portrait 4:5': '832x1024',
    'Landscape 16:9': '1344x768',
  };

  const size = sizeMap[ratio] ?? '1024x1024';

  const styledPrompt = `${prompt}\n\nVisual style: ${style}.`;

  const { data } = await client.images.generate({
    model: OPENAI_IMAGE_MODEL,
    prompt: styledPrompt,
    size,
  });

  return data.map((item) => {
    if (item.url) return item.url;
    if (item.b64_json) {
      return `data:image/png;base64,${item.b64_json}`;
    }
    return null;
  }).filter(Boolean);
};

export const reviewResumeWithAI = async ({ resumeText, roleNotes }) => {
  const client = ensureClient();

  const prompt = [
    'You are an executive career coach reviewing a resume.',
    'Provide concise feedback with two sections: highlights and improvements.',
    '',
    'Resume content:',
    resumeText,
    '',
    'Additional notes or target role context:',
    roleNotes || 'None provided.',
    '',
    'Return ONLY valid JSON with this structure:',
    '{ "highlights": ["..."], "improvements": ["..."] }',
  ].join('\n');

  const response = await client.responses.create({
    model: OPENAI_TEXT_MODEL,
    input: prompt,
  });

  const raw = response.output_text ?? '';
  const parsed = extractJson(raw);

  if (parsed?.highlights && parsed?.improvements) {
    return parsed;
  }

  const fallbackHighlights = raw
    .split('\n')
    .filter((line) => /highlight/i.test(line))
    .map((line) => line.replace(/^[\d•\-\*]+\s*/i, '').trim());

  const fallbackImprovements = raw
    .split('\n')
    .filter((line) => /improve|suggestion|opportunit/i.test(line))
    .map((line) => line.replace(/^[\d•\-\*]+\s*/i, '').trim());

  return {
    highlights: fallbackHighlights.slice(0, 5),
    improvements: fallbackImprovements.slice(0, 5),
  };
};

