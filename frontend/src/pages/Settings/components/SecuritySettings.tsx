import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { validatePassword } from "@/pages/Auth/ValidatePassword";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { changePassword, isLoading }: any = useAuthStore();
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordError(validatePassword(password));
  };

  const isFormValid =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    newPassword === confirmPassword &&
    passwordError === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(currentPassword, confirmPassword);
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  };

  return (
    <>
      <h3 className="text-xl mt-8 mb-4 font-semibold">Change Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <label htmlFor="current-password">Current Password</label>
          <PasswordInput
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label htmlFor="new-password">New Password</label>
          <PasswordInput
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <label htmlFor="confirm-password">Confirm Password</label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
        </div>
        <div className="w-full flex">
          <Button
            type="submit"
            disabled={!isFormValid}
            className={`ml-auto mt-6 ${
              isFormValid
                ? "bg-secondary hover:bg-primary"
                : "bg-secondary/90 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
