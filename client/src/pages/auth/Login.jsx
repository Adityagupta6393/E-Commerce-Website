import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;