import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="w-full flex gap-x-10 justify-center items-center h-screen border">
      <div className="border border-yellow-400 h-[90%] w-[50%]"></div>
      <div className=" justify-center items-center border border-yellow-400 h-[90%] w-[50%]">
        <section className="mt-40">
          <h2 className="text-4xl text-black font-semibold text-center">
            Create an account
          </h2>
          <p className="text-center text-xl">Lore ipsum dolor suit</p>
          <form className="mt-8" action="#">
            <div className="flex justify-start items-center gap-x-10">
              <div className="w-[50%]">
                <label className="font-semibold" htmlFor="">
                  First Name
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="text" />
              </div>
              <div className="w-[50%]">
                <label className="font-semibold" htmlFor="">
                  Last Name
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="text" />
              </div>
            </div>
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-[50%]">
                <label className="font-semibold" htmlFor="">
                  Email
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="emil" />
              </div>
              <div className="w-[50%]">
                <label className="font-semibold" htmlFor="">
                  Username
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="text" />
              </div>
            </div>
            <div className="mt-10 flex justify-start items-center gap-x-10">
              <div className="w-[50%]">
                <label className="font-semibold" htmlFor="">
                  Password
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="emil" />
              </div>
              <div className="w-[50%]">
                <label className="font-semibold" htmlFor="">
                  Confirm Password
                </label>
                <br />
                <input className="ps-2 w-[100%] rounded-md py-2" type="text" />
              </div>
            </div>
            <Button className="p-5 mt-10 w-full bg-black">Sign Up</Button>
            <div className="mt-4 px-2 flex justify-between items-center">
              <div>
                <Link className="" to="/login">
                  Already have an account?{" "}
                  <span className="text-yellow-400 hover:underline">
                    Log in
                  </span>
                </Link>
              </div>
              <Link className="hover:underline" to="/forgot-password">
                forgot password?
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
