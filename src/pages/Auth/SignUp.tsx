import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import peopleAnimation from "../../lotties/people.json";

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/welcome");
  };
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
            Create an account
          </h2>
          <p className="text-center text-base">Lorem ipsum dolor suit</p>
          <form onSubmit={handleSubmit} className="mt-8" action="#">
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-full">
                <label className="font-semibold" htmlFor="">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <br />
                <input
                  className="ps-2 w-[100%] rounded-md py-2"
                  type="text"
                  required
                />
              </div>
            </div>
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
                  required
                />
              </div>
            </div>
            <Button className="p-5 mt-10 w-full bg-black hover:bg-primary">
              Sign Up
            </Button>
            <div className="sm:text-sm mt-4 px-2 flex justify-between items-center">
              <Link className="text-sm " to="/login">
                Already have an account?{" "}
                <span className="text-primary hover:underline">Log in</span>
              </Link>
              <Link className="text-sm hover:underline" to="/forgot-password">
                forgot password?
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
