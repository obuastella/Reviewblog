import Lottie from "lottie-react";
import readingAnimation from "../../lotties/reading-book.json";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-x-20 justify-center md:justify-start px-2 md:px-10 items-center h-screen border">
      <Lottie
        animationData={readingAnimation}
        loop
        className="hidden md:block h-[90%] w-[40%]"
      />
      <div className="p-40 rounded-md md:ms-20 border shadow-md px-2 md:px-20 w-full md:w-[40%]">
        <section className="">
          <h2 className="text-4xl text-black font-semibold text-center">
            Log into your account
          </h2>
          <p className="text-center text-base">Lorem ipsum dolor suit</p>
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
