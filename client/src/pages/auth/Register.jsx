import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserPlus, User, Mail, Lock } from "lucide-react";

import { signupUser } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await signupUser(values);

      if (res.error) {
        const firstError =
          typeof res.error === "object"
            ? Object.values(res.error).find(Boolean)
            : res.error;

        return toast.error(
          firstError || "Signup failed"
        );
      }

      toast.success(res.success);

      navigate("/login");

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-100 px-4 py-8 sm:px-6">

      <div className="bg-white w-full max-w-md p-5 sm:p-8 rounded-2xl shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">

          <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-4">
            <UserPlus size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join ShopHub today
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <User size={17} />
              Full Name
            </label>

            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Enter your full name"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}

          </div>

          {/* Email */}
          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <Mail size={17} />
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}
          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <Lock size={17} />
              Password
            </label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Create a password"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Confirm Password */}
          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <Lock size={17} />
              Confirm Password
            </label>

            <input
              type="password"
              {...register("cPassword", {
                required: "Please confirm your password",
              })}
              placeholder="Confirm your password"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 ${
                errors.cPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.cPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cPassword.message}
              </p>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white p-3 rounded-lg font-semibold transition"
          >
            {isSubmitting
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-sm sm:text-base mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;