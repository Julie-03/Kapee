// src/components/LoginModal.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";
import { X, User, Lock } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister?: () => void; // Add this prop
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenRegister }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onLogin = async (data: FormData) => {
    try {
      // Fixed: Changed endpoint to match your backend route
      const res = await axios.post(
        "http://localhost:7000/api_v1/user/login", // Changed from /userLogin to /login
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login response:", res.data); // Debug log

      // Fixed: Match the actual response structure from your backend
      const userData = res?.data?.user; // Changed from existingUser to user
      const token = res?.data?.token; // Get token from the correct location

      if (!userData || !token) {
        console.log("Missing user data or token");
        return Notify.failure("Login failed - Invalid response");
      }

      // Save user data in localStorage
      localStorage.setItem(
        "userKey",
        JSON.stringify({
          _id: userData.id, // Your backend returns 'id', not '_id'
          username: userData.username,
          email: userData.email,
          userRole: userData.userRole, // Make sure this exists in your user model
        })
      );
      localStorage.setItem("accessToken", token); // Use token from response

      console.log("User role:", userData.userRole); // Debug log

      // Close modal and redirect based on user role
      onClose();
      if (userData.userRole === "admin") {
        navigate("/dashboard");
        Notify.success("Welcome Admin! You are now in Admin Access Level");
      } else {
        navigate("/");
        Notify.info("You are not admin. User Access Level granted.");
      }

      reset();
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Better error handling
      const errorMessage = error?.response?.data?.message || "Login Failed";
      Notify.failure(errorMessage);
    }
  };

  const handleRegisterClick = () => {
    if (onOpenRegister) {
      onOpenRegister(); // Use the modal switching function instead of navigation
    } else {
      // Fallback to navigation if prop not provided
      onClose();
      navigate("/signup");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all scale-100 animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to continue to kapee.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onLogin)} className="px-8 pb-8 space-y-5">
          {/* Email Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              className="bg-white text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="bg-white text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-4 text-sm text-center text-black">
            Don't have an account?{" "}
            <span
              onClick={handleRegisterClick}
              className="text-yellow-600 hover:underline cursor-pointer"
            >
              Create Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;