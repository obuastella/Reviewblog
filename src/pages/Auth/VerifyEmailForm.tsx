import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailForm() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const { error, isLoading, verifyEmail } = useAuthStore();
  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move focus to the next input if not empty
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-slot-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "" && index > 0) {
        const prevInput = document.getElementById(`otp-slot-${index - 1}`);
        prevInput?.focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{1,6}$/.test(pastedData)) return;

    const newOtp = Array(6)
      .fill("")
      .map((_, i) => pastedData[i] || "");
    setOtp(newOtp);

    // Automatically focus on the last filled input
    const lastFilledIndex = newOtp.findIndex((value) => value === "") - 1;
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : 5;
    const lastInput = document.getElementById(`otp-slot-${focusIndex}`);
    lastInput?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Entered OTP:", code);
    try {
      await verifyEmail(code);
      console.log("Code", code);
      toast.success("Email verified successfully");
      navigate("/discover");
    } catch (e: any) {
      console.log("Error verifying email:", error);
      toast.error(e.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8" action="#">
        <div
          className="mt-10 flex justify-center items-center gap-x-10"
          onPaste={handlePaste}
        >
          <div className="flex space-x-2">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-slot-${index}`}
                value={value}
                className="w-14 h-14 text-center text-lg border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={1}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>

        <Button
          disabled={isLoading}
          className="p-5 mt-10 w-full bg-black hover:bg-primary"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </>
  );
}
