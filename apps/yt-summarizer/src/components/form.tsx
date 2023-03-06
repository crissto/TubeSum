"use client";

import { FormEvent, useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import { useBoundStore } from "../store";

export default function Form() {
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>();
  const urlRef = useRef<HTMLInputElement>(null);

  const apiKey = useBoundStore((store) => store.apiKey);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const url = urlRef.current?.value;

    if (url) {
      const id = url.split("v=")[1];

      const apiUrl = new URL("/api/summary", window.location.href);
      apiUrl.searchParams.set("videoID", id);
      apiUrl.searchParams.set("lang", "en");
      apiUrl.searchParams.set("apiKey", apiKey);

      const response = await fetch(apiUrl.toString());
      const data = await response.json();

      setSummary(data.summary);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            disabled={!apiKey}
            placeholder={
              apiKey
                ? "Enter a youtube video url"
                : "You need to set an OpenAI API key in the gear above"
            }
            className="w-full h-12 pl-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 pr-[10rem]"
            pattern="https://www.youtube.com/watch\?v=[a-zA-Z0-9_-]{11}"
            required
            ref={urlRef}
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

      {loading && <div className="mt-4 text-center">Loading...</div>}

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
