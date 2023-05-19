import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import ApiKeyNotice from "../components/apiKeyNotice";
import Form from "../components/form";
import KeyForm from "../components/keyForm";
import style from "./title.module.css";

export default function Home() {
  return (
    <div className="z-20">
      <div className="flex justify-center w-full">
        <KeyForm />
      </div>
      <ApiKeyNotice />

      <div className="w-full flex flex-col justify-center my-8 space-y-6 text-center">
        <h1
          className={clsx(
            style.titleWrapper,
            "font-bold text-3xl m-auto lg:text-7xl"
          )}
        >
          <span>Youtube</span>
          <br />
          <span data-title="summarizer" className={style.titleBlur}></span>
          <span className={style.title}>summarizer</span>
        </h1>
        <h2 className="text-xl self-center max-w-xl lg:text-3xl">
          <Balancer ratio={0.25}>
            Use the power of AI to summarize your favorite youtube videos in a
            matter of seconds.
          </Balancer>
        </h2>
      </div>

      <Form />
    </div>
  );
}
