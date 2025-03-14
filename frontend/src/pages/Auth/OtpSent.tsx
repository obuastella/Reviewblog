import Lottie from "lottie-react";
import readingAnimation from "../../lotties/reading-book.json";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function OtpSent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
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
            Reset link Sent
          </h2>
          <p className="text-center mb-4">Please check your email</p>

          <div className="mt-8 m-auto flex justify-center items-center w-24 h-24 rounded-full bg-primary">
            <Check size={40} color="white" className="m-auto text-white" />
          </div>
          <div className="mt-8 m-auto flex justify-center items-center">
            <Button
              onClick={handleClick}
              className="w-11/12 py-6 bg-black m-auto hover:bg-primary"
            >
              Back to Login
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
