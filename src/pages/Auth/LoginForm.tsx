import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      email: email,
      password: password,
    };
    try {
      console.log("sending payload:", payload);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      console.log("Success!");
      navigate("/discover");
    } catch (error) {
      console.log("An error occurred", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setEmail("");
        setPassword("");
      }, 2000); // reset the form
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
