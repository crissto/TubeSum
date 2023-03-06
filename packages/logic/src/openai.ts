import { Configuration, OpenAIApi } from "openai";

const PROMPT_PREFIX = "Summarize this on couple of phrases:\n\n";

export const createSummary = async ({
  text,
  apiKey,
  prefix,
}: {
  text: string;
  apiKey: string;
  prefix?: string;
}) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey,
    })
  );

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prefix ?? PROMPT_PREFIX + text,
      },
    ],
  });

  if (data.choices.length === 0) {
    throw new Error("No summary found");
  }

  return data.choices[0].message?.content;
};
