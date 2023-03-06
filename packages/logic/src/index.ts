import { getSubtitles, lang } from "./subtitles";
import { createSummary } from "./openai";

const getSummaryFromVideo = async (
  videoID: string,
  lang: lang,
  apiKey: string
) => {
  const subtitles = await getSubtitles({ videoID, lang });
  const summary = await createSummary({
    text: subtitles.join(" "),
    apiKey,
  });
  return { summary: summary?.trim() };
};

export { getSubtitles, createSummary, getSummaryFromVideo };
