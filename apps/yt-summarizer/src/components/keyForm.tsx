"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { useBoundStore, useSetBoundStore } from "../store";
import { Check, Gear } from "./icons";

export default function KeyForm() {
  const [inputOpen, setInputOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = useBoundStore((store) => store.apiKey);
  const setApiKey = useSetBoundStore((state) => state.setApiKey);

  const check = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (inputRef.current) {
      setApiKey(inputRef.current.value);
    }

    setInputOpen(false);
  };

  return (
    <div
      className={clsx("flex space-x-2 z-50 relative rounded-full", {
        "bg-white": inputOpen,
        "bg-white/50": !inputOpen,
      })}
    >
      <AnimatePresence>
        {inputOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <form onSubmit={check}>
              <input
                type="text"
                placeholder="Enter your OpenAI API key"
                className="w-full h-8 px-2 border-2 border-slate-100/50 rounded-full focus:outline-none focus:border-slate-200 bg-white z-50 my-1 ml-1 text-sm"
                defaultValue={apiKey}
                name="openai_key"
                ref={inputRef}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={clsx(
          {
            "text-slate-500": apiKey,
            "text-green-500/75": inputOpen,
            "text-orange-500/75": !apiKey && !inputOpen,
          },
          "self-center h-10 flex flex-col justify-center px-2 cursor-pointer"
        )}
      >
        {inputOpen ? (
          <div onClick={() => check()}>
            <Check />
          </div>
        ) : (
          <div onClick={() => setInputOpen(true)}>
            <Gear />
          </div>
        )}
      </div>
    </div>
  );
}
