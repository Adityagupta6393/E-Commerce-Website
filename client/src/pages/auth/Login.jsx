import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock } from "lucide-react";

import { signinUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await signinUser(values);

      if (res.error) {
        return toast.error(res.error);
      }

      login(res.token, res.user);

      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-100 px-4 py-8 sm:px-6">

      <div className="bg-white w-full max-w-md p-5 sm:p-8 rounded-2xl shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">

          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
            <LogIn size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your ShopHub account
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

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
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
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
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded-lg font-semibold transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-sm sm:text-base mt-6 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;