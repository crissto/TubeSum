import { z } from "zod";
import { getSummaryFromVideo } from "summarizer-logic";

const requestSchema = z.object({
  videoID: z.string(),
  lang: z.enum(["en", "es"]).default("en"),
  apiKey: z.string(),
});

export async function GET(req: Request) {
  // Get the video ID from the request
  const url = new URL(req.url);

  // Validate the request
  const result = requestSchema.safeParse(
    Object.fromEntries(url.searchParams.entries())
  );

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
    const summary = await getSummaryFromVideo(videoID, lang, apiKey);
    return new Response(JSON.stringify(summary));
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: (e as Error).message,
      }),
      { status: 500 }
    );
  }
}
