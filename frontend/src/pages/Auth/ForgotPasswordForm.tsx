import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>();
  const { forgotPassword, isLoading, error }: any = useAuthStore();
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Otp has been sent to your mail!");
      // navigate("/update-password");
    } catch (e: any) {
      console.log(error);
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
        <Button
          disabled={isLoading}
          className="p-5 mt-10 w-full bg-black hover:bg-primary"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "Request OTP"
          )}
        </Button>
        <div className="text-sm mt-4 px-2 flex justify-between items-center">
          <Link className="text-sm " to="/register">
            Don't have an account?
            <span className="ms-1 text-primary hover:underline">Sign Up</span>
          </Link>
        </div>
      </form>
    </>
  );
}
