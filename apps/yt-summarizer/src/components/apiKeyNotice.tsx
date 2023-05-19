"use client";
import Balancer from "react-wrap-balancer";
import { Warning } from "./icons";
import { useBoundStore } from "../store";
import Link from "next/link";

export default function ApiKeyNotice() {
  const apiKey = useBoundStore((store) => store.apiKey);

  return apiKey ? null : (
    <div className="bg-orange-100 max-w-lg mx-auto py-2 px-2 rounded flex relative mt-4">
      <div className="w-full">
        <div className="flex space-x-2 justify-center">
          <div className="text-orange-700 self-center">
            <Warning />
          </div>
          <div className="text-lg text-slate-700 font-semibold">
            You need to provide an Open AI api key
          </div>
        </div>
        <p className="text-center">
          <Balancer ratio={0.5}>
            To run this service we use OpenAI's chatGPT api. You need to either
            provide your own api key or{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              login
            </Link>
            . You can get one for free at{" "}
            <a
              href="https://platform.openai.com/account/api-keys"
              target={"_blank"}
              className="text-blue-500 hover:text-blue-700"
            >
              OpenAI.com
            </a>
            .<br /> You can read more and find a tutorial{" "}
            <Link href="/about" className="text-blue-500 hover:text-blue-700">
              here
            </Link>
            .
          </Balancer>
        </p>
      </div>
    </div>
  );
}
