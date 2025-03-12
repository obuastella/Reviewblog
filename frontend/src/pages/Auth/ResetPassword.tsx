import Lottie from "lottie-react";
import readingAnimation from "../../lotties/reading-book.json";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
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
            Reset Password
          </h2>
          <p className="text-center text-base">
            Please enter your new password
          </p>
          <ResetPasswordForm />
        </section>
      </div>
    </div>
  );
}
