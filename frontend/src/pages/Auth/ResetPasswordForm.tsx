import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { validatePassword } from "./ValidatePassword";
export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const { resetPassword, isLoading, error }: any = useAuthStore();
  const [passwordError, setPasswordError] = useState<any>();

  const params = useParams();
  const token = params.id;
  const navigate = useNavigate();

  const validatePassword = (newPassword: string, confirmPassword: string) => {
    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(newPassword)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/\d/.test(newPassword)) {
      return "Password must include at least one number.";
    }
    if (newPassword !== confirmPassword) {
      return "Password does not match";
    }
    return "";
  };
  // const password = validatePassword(newPassword, confirmPassword);
  const validationError = validatePassword(newPassword, confirmPassword);
  if (validationError) {
    setPasswordError(validationError);
    // return;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // await resetPassword(token, password);
      toast.success("Password has been updated sucesfully!");
      // navigate("/login");
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
              New Password <span className="text-red-400">*</span>
            </label>
            <br />
            <PasswordInput
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <label className="font-semibold" htmlFor="">
            Confirm Password <span className="text-red-400">*</span>
          </label>
          <br />
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>

          // <h3 className="text-red-600">Password does not match</h3>
        )}
        <Button
          disabled={isLoading}
          className="p-5 mt-10 w-full bg-black hover:bg-primary"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </>
  );
}
