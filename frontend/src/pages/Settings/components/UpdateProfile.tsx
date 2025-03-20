import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
export default function UpdateProfile() {
  const { user, updateUser, isLoading }: any = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();
    try {
      await updateUser(formData.email, formData.fullName, formData.phone);
      toast.success("Profile info updated successfully!");
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  };
  return (
    <form action="">
      <div className="mt-8 grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="fullName">
            Full name<span className="text-red-600">*</span>
          </label>
          <input
            id="fullName"
            className="block p-2.5 w-full rounded-md bg-gray-50 border border-gray-300"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <Button onClick={updateProfile} className="bg-secondary hover:bg-primary">
        {isLoading ? (
          <Loader size={24} className="mx-auto animate-spin" />
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
}
