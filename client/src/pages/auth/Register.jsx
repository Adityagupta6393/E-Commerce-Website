import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

        return toast.error(firstError || "Signup failed");
      }

      toast.success(res.success);
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            {...register("cPassword", { required: true })}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg"
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;