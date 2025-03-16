import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="w-full md:w-[90%]">
        <div className="flex flex-wrap gap-y-4 justify-start items-end">
          <img
            src="/no-profile.webp"
            alt="profile"
            className="w-40 h-40 rounded-full border-2"
          />
          <Button className="bg-secondary">Change your Profile</Button>
        </div>
        <form action="">
          <div className="mt-8 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="fullName"
              >
                Full name<span className="text-red-600">*</span>
              </label>
              <input
                id="fullName"
                className="block p-2.5 w-full rounded-md bg-gray-50 border border-gray-300"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="email">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                className="block p-2.5 w-full rounded-md bg-gray-50 border border-gray-300"
                type="text"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              className="block p-2.5 w-full rounded-md bg-gray-50 border border-gray-300"
              type="tel"
            />
          </div>
          <Button className="bg-secondary hover:bg-primary">
            Update Profile
          </Button>
        </form>
        <h3 className="text-xl mt-8 mb-4 font-semibold">Change Password</h3>
        <form action="">
          <div className="grid gap-3">
            <label htmlFor="current-password">Current Password</label>
            <PasswordInput
              value={currentPassword}
              onChange={(e: any) => setCurrentPassword(e.target.value)}
            />
            <label htmlFor="new-password">New Password</label>

            <PasswordInput
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
            />
            <label htmlFor="confirm-password">Confirm Password</label>

            <PasswordInput
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex">
            <Button className="ml-auto mt-6 bg-secondary hover:bg-primary">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
