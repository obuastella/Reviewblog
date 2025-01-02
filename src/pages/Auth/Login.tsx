import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="w-full flex gap-x-10 justify-center items-center h-screen border">
      <div className="border border-yellow-400 h-[90%] w-[50%]"></div>
      <div className=" justify-center items-center  h-[90%] w-[50%]">
        <section className="mt-40">
          <h2 className="text-4xl text-black font-semibold text-center">
            Log into your account
          </h2>
          <p className="text-center text-xl">Lore ipsum dolor suit</p>
          <form className="mt-8" action="#">
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-full">
                <label className="font-semibold" htmlFor="">
                  Email
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="emil" />
              </div>
            </div>
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-full">
                <label className="font-semibold" htmlFor="">
                  Password
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="emil" />
              </div>
            </div>
            <Button className="p-5 mt-10 w-full bg-black">Sign Up</Button>
            <div className="mt-4 px-2 flex justify-between items-center">
              <div>
                <input className="me-1" type="checkbox" name="" id="" />
                Keep me signed in
              </div>
              <Link className="" to="/register">
                Don't have an account?{" "}
                <span className="text-yellow-400 hover:underline">
                  Sign Up now
                </span>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
