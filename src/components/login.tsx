import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onLogin = async (data: FormData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api_v1/user/userLogin",
        data, // sending JSON directly
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = res?.data?.existingUser;
      if (!userData) return Notify.failure("Login failed");

      // Save user data in localStorage
      localStorage.setItem(
        "userKey",
        JSON.stringify({
          _id: userData._id,
          username: userData.username,
          email: userData.email,
          userRole: userData.userRole,
        })
      );
      localStorage.setItem("accessToken", userData.accessToken);

      // Redirect based on user role
      if (userData.userRole === "admin") {
        navigate("/dashboard");
        Notify.success("Welcome Admin! You are now in Admin Access Level");
      } else {
        navigate("/home");
        Notify.info("You are not admin. User Access Level granted.");
      }

      reset();
    } catch (error) {
      console.log(error);
      Notify.failure("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-[22rem] flex flex-col gap-4"
        onSubmit={handleSubmit(onLogin)}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("password", { required: true, minLength: 6 })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
