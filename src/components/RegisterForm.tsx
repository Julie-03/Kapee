// src/components/RegistrationModal.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";
import { X, User, Mail, Lock } from 'lucide-react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin?: () => void; // Add this prop
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onOpenLogin }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onRegister = async (data: FormData) => {
    setLoading(true); 
    try {
      console.log('Form submitted with data:', data);
      const response = await axios.post(
        "http://localhost:7000/api_v1/user/userRegistration", // Changed to match your controller
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log('Server response:', response);

      Notify.success("Registration Successful");
      reset();
      onClose();
      // After successful registration, you might want to open the login modal
      if (onOpenLogin) {
        onOpenLogin();
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      Notify.failure(`Registration Failed: ${error.response?.data?.message || 'Unknown error'}`);
    }
    finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (onOpenLogin) {
      onOpenLogin(); // Use the modal switching function instead of navigation
    } else {
      // Fallback to navigation if prop not provided
      onClose();
      navigate("/login");
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600 text-sm">Join kapee. today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onRegister)} className="px-8 pb-8 space-y-5">
          {/* Username Field */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                className={`bg-white text-black w-full pl-10 pr-4 py-3 border ${
                  errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                {...register("username", { 
                  required: "Username is required", 
                  minLength: { value: 3, message: "Username must be at least 3 characters" },
                  maxLength: { value: 20, message: "Username must be less than 20 characters" }
                })}
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-sm mt-1 block">{errors.username.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                className={`bg-white text-black w-full pl-10 pr-4 py-3 border ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className={`bg-white text-black w-full pl-10 pr-4 py-3 border ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 6, message: "Password must be at least 6 characters" } 
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
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

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={handleLoginClick}
              className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline transition-colors cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;