import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "./ValidatePassword";
export default function SignUpForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

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
        <div className="mt-10 flex justify-start items-center gap-x-10">
          <div className="w-full">
            <label className="font-semibold" htmlFor="">
              Full Name <span className="text-red-400">*</span>
            </label>
            <br />
            <input
              onChange={(e) => setFullName(e.target.value)}
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
              id="password"
              onChange={handlePasswordChange}
              value={password}
              className={`ps-2 w-[100%] rounded-md py-2 ${
                passwordError
                  ? "border-red-500 border"
                  : "border-gray-300 border"
              }`}
              type="password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>
        </div>
        <Button
          disabled={isLoading}
          className="p-5 mt-10 w-full bg-black hover:bg-primary"
        >
          {isLoading ? "Loading..." : "Sign Up"}
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
    </>
  );
}
