//@ts-nocheck
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { login, isLoading, error }: any = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/discover");
      // setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8" action="#">
        <div className="mt-10 flex justify-start items-center gap-x-10">
          <div className="w-full">
            <label className="font-semibold" htmlFor="">
              Email <span className="text-red-400">*</span>
            </label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="ps-2 w-[100%] rounded-md py-2"
              type="password"
            />
          </div>
        </div>
        <Button
          disabled={isLoading}
          className="p-5 mt-10 w-full bg-black hover:bg-primary"
        >
          {isLoading ? "Loading..." : "Sign Up"}
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
    </>
  );
}
