import Balancer from "react-wrap-balancer";
import Background from "../components/background";
import Form from "../components/form";
import KeyForm from "../components/keyForm";
import style from "./title.module.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="max-w-5xl flex justify-between mt-5 self-center">
        <div></div>
        <KeyForm />
      </div>
      <div className="z-20 max-w-2xl mx-auto">
        <div className="w-full flex flex-col justify-center mt-8 space-y-6 text-center">
          <h1
            className={`${style.titleWrapper} font-bold text-3xl m-auto lg:text-7xl`}
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

        <div className="m-12">
          <Form />
        </div>
      </div>

      <Background />
    </main>
  );
}
