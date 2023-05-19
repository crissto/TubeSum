"use client";

import { FormEvent, useState } from "react";
import Balancer from "react-wrap-balancer";
import { useBoundStore } from "../store";

export default function Form() {
  const [summaryState, setSummaryState] = useState<{
    loading: boolean;
    summary: string;
    error: string;
  }>({
    loading: false,
    summary: "",
    error: "",
  });
  const [summary, setSummary] = useState<string>();

  const apiKey = useBoundStore((store) => store.apiKey);

  const getIdFromUrl = (url: string) => {
    const id = url.split("v=")[1];
    const ampersandPosition = id.indexOf("&");
    if (ampersandPosition !== -1) {
      return id.substring(0, ampersandPosition);
    }
    return id;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setSummaryState((state) => ({ ...state, loading: true }));
    e.preventDefault();

    const target = e.target as typeof e.target & {
      url: { value: string };
    };

    const url = target?.url?.value;
    if (url) {
      const id = getIdFromUrl(url);

      const response = await fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify({
          videoID: id,
          lang: "en",
          apiKey,
        }),
      });

      if (!response.ok) {
        console.error(response);
        setSummaryState((state) => ({
          ...state,
          loading: false,
        }));
        throw new Error("Failed to fetch summary");
      }
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        setSummaryState((state) => ({
          ...state,
          loading: false,
          error: data.error,
        }));
        throw new Error("Failed to fetch summary");
      }

      setSummaryState((state) => ({
        ...state,
        loading: false,
        summary: data.summary,
      }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-16">
        <div className="relative">
          <input
            type="text"
            name="url"
            disabled={!apiKey}
            placeholder={
              apiKey
                ? "Enter a youtube video url"
                : "You need to set an OpenAI API key in the gear above"
            }
            className="w-full h-12 pl-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 pr-[8rem]"
            pattern="https://www.youtube.com/watch\?v=[a-zA-Z0-9_-]{11}"
            required
          />
          <div className="absolute top-2 right-2 bottom-2">
            <button
              type="submit"
              className="abosulute top-0 right-0 w-full h-8 px-2 text-lg text-white rounded-lg focus:outline-none bg-black disabled:bg-slate-500"
              disabled={!apiKey}
            >
              Summarize
            </button>
          </div>
        </div>
      </form>

      {summaryState.loading && (
        <div className="mt-4 text-center">Loading...</div>
      )}

      {summary && (
        <div className="mt-12 text-center p-4 bg-slate-100/30 border border-slate-200 rounded-xl">
          <h3 className="text-2xl font-bold">Here is your summary</h3>
          <p className="mt-2 text-xl">
            <Balancer ratio={0.5}>{summary}</Balancer>
          </p>
        </div>
      )}
    </>
  );
}
