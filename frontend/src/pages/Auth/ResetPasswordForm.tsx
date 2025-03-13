import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const { resetPassword, isLoading }: any = useAuthStore();
  const params = useParams();
  const token = params.id;
  const navigate = useNavigate();

  // ✅ Password validation function
  const isValidPassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    return hasUpperCase && hasNumber && hasSpecialChar;
  };

  // ✅ Run validation when password fields change
  useEffect(() => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Both password fields are required.");
      setIsPasswordValid(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setIsPasswordValid(false);
      return;
    }

    if (!isValidPassword(newPassword)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one number, and one special character."
      );
      setIsPasswordValid(false);
      return;
    }

    // ✅ If everything is valid
    setPasswordError("");
    setIsPasswordValid(true);
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) return;

    try {
      await resetPassword(token, newPassword);
      toast.success("Password has been updated successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="mt-10 flex justify-start items-center gap-x-10">
        <div className="w-full">
          <label className="font-semibold">
            New Password <span className="text-red-400">*</span>
          </label>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className="w-full">
        <label className="font-semibold">
          Confirm Password <span className="text-red-400">*</span>
        </label>
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {passwordError && (
        <p className="text-red-500 text-sm mt-2">{passwordError}</p>
      )}

      <Button
        disabled={isLoading || !isPasswordValid}
        className={`p-5 mt-10 w-full ${
          isLoading || !isPasswordValid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-primary"
        }`}
      >
        {isLoading ? (
          <Loader className="animate-spin mx-auto" size={24} />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
