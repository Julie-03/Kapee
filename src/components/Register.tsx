import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onRegister = async (data: FormData) => {
    try {
      await axios.post(
        "http://localhost:5000/api_v1/user/userRegistration",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      Notify.success("Registration Successful");
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
      Notify.failure("Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-[22rem] flex flex-col gap-4"
        onSubmit={handleSubmit(onRegister)}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
          {...register("username", { required: true, minLength: 3, maxLength: 20 })}
        />
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
          className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
        >
          Register
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
