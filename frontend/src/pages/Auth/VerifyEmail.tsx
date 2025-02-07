import Lottie from "lottie-react";
import peopleAnimation from "../../lotties/people.json";
import VerifyEmailForm from "./VerifyEmailForm";

export default function VerifyEmail() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-x-20 justify-center md:justify-start px-2 md:px-10 items-center h-screen">
      <Lottie
        animationData={peopleAnimation}
        loop
        className=" mt-52 hidden md:block w-[40%]"
      />
      <div className="py-28 rounded-md md:ms-20 md:border shadow-md px-2 md:px-20 w-full md:w-[40%]">
        <section className="">
          <h2 className="text-4xl text-black font-semibold text-center">
            Verify your email address
          </h2>
          <p className="text-center text-base">
            Enter the six digit otp sent to your email
          </p>
          <VerifyEmailForm />
        </section>
      </div>
    </div>
  );
}
