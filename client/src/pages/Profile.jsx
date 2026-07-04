import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      <div className="bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border p-3 rounded bg-gray-100"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <form
          onSubmit={handlePasswordChange}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Change Password
          </button>
        </form>
      </div>

    </div>
  );
}

export default Profile;