import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2, Mail, Phone, User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import '../i18n';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, isUpdatingName, updateName } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser.fullName,
  });

  const { t } = useTranslation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateName(formData);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">{t("Profile")}</h1>
            <p className="mt-2">{t("Your profile information")}</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? t("Uploading..." ): t("Click the camera icon to update your photo")}
            </p>
          </div>
          <div className="space-y-6">
          <form onSubmit={handleSubmit} className="edit-name">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("Full Name")}
                <button type="submit" className="text-green-500" disabled={isUpdatingName}>
                  {isUpdatingName ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /></>
                  ) : (
                    t("Edit")
                  )}
                </button>
              </div>
                <input
                  className="px-4 py-2.5 bg-base-200 rounded-lg border"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              
            </div>
            </form>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t("Email Address")}
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t("Number Phone")}
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.numberPhone}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">{t("Account Information")}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>{t("Member Since")}</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>{t("Account Status")}</span>
                <span className="text-green-500">{t("Active")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
