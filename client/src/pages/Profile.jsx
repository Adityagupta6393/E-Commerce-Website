import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Lock, Mail, Phone } from "lucide-react";

import {
  getSingleUser,
  editUser,
  changePassword,
} from "../api/userApi";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user?._id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    const res = await getSingleUser(user._id);

    if (res.User) {
      setProfile(res.User);
      setName(res.User.name);
      setPhoneNumber(res.User.phoneNumber || "");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await editUser(
      user._id,
      name,
      phoneNumber
    );

    if (res.success) {
      toast.success(res.success);
      loadProfile();
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const res = await changePassword(
      user._id,
      oldPassword,
      newPassword
    );

    if (res.error) {
      return toast.error(res.error);
    }

    toast.success(res.success);

    setOldPassword("");
    setNewPassword("");
  };

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Header */}
      <div className="mb-6 sm:mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <User size={24} />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-500 text-sm sm:text-base">
              Manage your account information
            </p>
          </div>

        </div>

      </div>

      <div className="space-y-6">

        {/* Profile Information */}
        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm">

          <div className="flex items-center gap-2 mb-6">

            <User size={21} />

            <h2 className="text-xl sm:text-2xl font-bold">
              Personal Information
            </h2>

          </div>

          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="block font-medium mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="block font-medium mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full border border-gray-300 p-3 pl-10 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />

              </div>

            </div>

            {/* Phone */}
            <div>

              <label className="block font-medium mb-2">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Update Profile
            </button>

          </form>

        </div>

        {/* Change Password */}
        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm">

          <div className="flex items-center gap-2 mb-6">

            <Lock size={21} />

            <h2 className="text-xl sm:text-2xl font-bold">
              Change Password
            </h2>

          </div>

          <form
            onSubmit={handlePasswordChange}
            className="space-y-5"
          >

            {/* Old Password */}
            <div>

              <label className="block font-medium mb-2">
                Old Password
              </label>

              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            {/* New Password */}
            <div>

              <label className="block font-medium mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Change Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;