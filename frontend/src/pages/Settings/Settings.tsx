import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import SecuritySettings from "./components/SecuritySettings";
import toast from "react-hot-toast";

export default function Settings() {
  const { user }: any = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  console.log("Logged in user", user);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  //set inital values if user exist
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile info updated successfully!");

    console.log("button clicked");
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="w-full md:w-[90%]">
        <div className="flex flex-wrap gap-y-4 justify-start items-end">
          <img
            src={selectedImage || "/no-profile.webp"}
            alt="profile"
            className="w-40 h-40 rounded-full border-2"
          />
          <input
            type="file"
            accept="image/*"
            id="profileInput"
            className="hidden"
            onChange={handleImageChange}
          />

          <Button
            className="bg-secondary"
            onClick={() => document.getElementById("profileInput")?.click()}
          >
            Change your Profile
          </Button>
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
          <Button
            onClick={updateProfile}
            className="bg-secondary hover:bg-primary"
          >
            Update Profile
          </Button>
        </form>
        <SecuritySettings />
      </div>
    </div>
  );
}
