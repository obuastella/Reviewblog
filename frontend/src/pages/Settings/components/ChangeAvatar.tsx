import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function ChangeAvatar() {
  const { changeAvatar, isLoading, user }: any = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setSelectedImage(imageUrl);

      try {
        const formData = new FormData();
        formData.append("image", file);

        await changeAvatar(formData); // Upload to backend

        toast.success("Avatar updated successfully");
      } catch (error) {
        console.error("Error updating avatar:", error);
        toast.error("Failed to update avatar");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-y-4 justify-start items-end">
      <img
        src={selectedImage || user?.profileImage || "/no-profile.webp"}
        alt="profile"
        className="w-40 h-40 rounded-full border-2"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        id="profileInput"
        className="hidden"
        onChange={handleImageChange}
      />

      <Button
        className="bg-secondary"
        onClick={() => document.getElementById("profileInput")?.click()}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Change Avatar"}
      </Button>
    </div>
  );
}
