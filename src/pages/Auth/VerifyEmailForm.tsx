import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "./ValidatePassword";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyEmailForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      fullName: fullName,
      email: email,
      password: password,
    };
    try {
      console.log("sending payload:", payload);
      // Simulate an API request with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Navigate to the /discover page upon success
      navigate("/verify");
    } catch (error) {
      console.log("Error submitting the form:", error);
    } finally {
      setIsLoading(false); // Reset loading state
      setTimeout(() => {
        setFullName("");
        setEmail("");
        setPassword("");
      }, 2000);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8" action="#">
        <div className="mt-10 flex justify-center items-center gap-x-10">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSeparator />
              <InputOTPSlot index={1} />
              <InputOTPSeparator />

              <InputOTPSlot index={2} />
              <InputOTPSeparator />
              <InputOTPSlot index={3} />
              <InputOTPSeparator />
              <InputOTPSlot index={4} />
              <InputOTPSeparator />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          disabled={isLoading}
          className="p-5 mt-10 w-full bg-black hover:bg-primary"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </>
  );
}
