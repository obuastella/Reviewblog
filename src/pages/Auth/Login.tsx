import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import readingAnimation from "../../lotties/reading-book.json";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/welcome");
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
            Log into your account
          </h2>
          <p className="text-center text-base">Lorem ipsum dolor suit</p>
          <form onSubmit={handleSubmit} className="mt-8" action="#">
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-full">
                <label className="font-semibold" htmlFor="">
                  Email <span className="text-red-400">*</span>
                </label>
                <br />
                <input
                  className="ps-2 w-[100%] rounded-md py-2"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-full">
                <label className="font-semibold" htmlFor="">
                  Password <span className="text-red-400">*</span>
                </label>
                <br />
                <input
                  className="ps-2 w-[100%] rounded-md py-2"
                  type="password"
                />
              </div>
            </div>
            <Button className="p-5 mt-10 w-full bg-black hover:bg-primary">
              Sign Up
            </Button>
            <div className="text-sm mt-4 px-2 flex justify-between items-center">
              <div className="flex justify-start items-center">
                <input className="me-1" type="checkbox" name="" id="" />
                Keep me signed in
              </div>
              <Link className="text-sm " to="/register">
                Don't have an account?{" "}
                <span className="text-primary hover:underline">Sign Up</span>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
