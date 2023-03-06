import he from "he";
import find from "lodash/find";
import striptags from "striptags";

export type lang = "en" | "de" | "fr" | "es" | void;

export async function getSubtitles({
  videoID,
  lang = "en",
}: {
  videoID: string;
  lang: lang;
}) {
  const res = await fetch(`https://youtube.com/watch?v=${videoID}`);

  if (!res.ok) {
    throw new Error(`Could not fetch video: ${videoID}`);
  }

  const data = await res.text();
  // * ensure we have access to captions data
  if (!data.includes("captionTracks")) {
    throw new Error(`Could not find captions for video: ${videoID}`);
  }

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
  if (!regex.test(data)) {
    throw new Error(`Could not find captions for video: ${videoID}`);
  }
  const match = regex.exec(data)?.at(0);
  const { captionTracks } = JSON.parse(`${match}}`);

  const subtitle =
    find(captionTracks, {
      vssId: `.${lang}`,
    }) ||
    find(captionTracks, {
      vssId: `a.${lang}`,
    }) ||
    find(captionTracks, ({ vssId }) => vssId && vssId.match(`.${lang}`));

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl)) {
    throw new Error(`Could not find ${lang} captions for ${videoID}`);
  }

  const transcriptRes = await fetch(subtitle.baseUrl);
  const transcript = await transcriptRes.text();

  return transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', "")
    .replace("</transcript>", "")
    .split("</text>")
    .filter((line) => line && line.trim())
    .map((line) => {
      const htmlText = line
        .replace(/<text.+>/, "")
        .replace(/&amp;/gi, "&")
        .replace(/<\/?[^>]+(>|$)/g, "");

      const decodedText = he.decode(htmlText);
      return striptags(decodedText);
    });
}
