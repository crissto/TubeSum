import { z } from "zod";
import { createSummary, getSubtitles } from "summarizer-logic";

const requestSchema = z.object({
  videoID: z.string(),
  lang: z.enum(["en", "es"]).default("en"),
  apiKey: z.string(),
});

export async function POST(req: Request) {
  // Validate the request
  const result = requestSchema.safeParse((await req.json()) || {});

  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: result.error.issues.map((issue) => issue.message).join(", "),
      }),
      { status: 400 }
    );
  }

  const { videoID, lang, apiKey } = result.data;

  try {
    const subtitles = await getSubtitles({ videoID, lang }).catch((e) => {
      console.error(e);
      return [];
    });

    const summary = await createSummary({
      text: subtitles.join(" "),
      apiKey,
    }).catch((e) => {
      console.error(e);
      return { error: (e as Error).message };
    });

    return new Response(JSON.stringify(summary));
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: (e as Error).message,
      }),
      { status: 500 }
    );
  }
}
