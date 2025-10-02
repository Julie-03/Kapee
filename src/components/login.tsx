// Updated LoginModal.tsx with Forgot Password integration and Cart Loading
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";
import { X, User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext'; // ADD THIS
import ForgotPasswordModal from './ForgotPasswordModal';

interface FormData {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenRegister?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen = true, onClose = () => {}, onOpenRegister }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { login } = useAuth();
  const { loadCart } = useCart(); // ADD THIS
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const onLogin = async (data: FormData) => {
    try {
      console.log('🔍 Login attempt for:', data.email);
      
      const res = await axios.post(
        "http://localhost:7000/api_v1/user/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Login response:", res.data);

      const userData = res?.data?.user;
      const token = res?.data?.token;

      if (!userData || !token) {
        console.log("❌ Missing user data or token");
        return Notify.failure("Login failed - Invalid response");
      }

      // Create consistent user object for AuthContext
      const authUser = {
        _id: userData.id,
        email: userData.email,
        role: userData.userRole || 'user',
        userRole: userData.userRole || 'user',
        username: userData.username
      };

      // Use AuthContext login function (this handles all storage)
      login(token, authUser);

      // ✅ LOAD USER'S CART FROM BACKEND AFTER LOGIN
      try {
        await loadCart();
        console.log('✅ Cart loaded successfully after login');
      } catch (cartError) {
        console.error('⚠️ Could not load cart:', cartError);
        // Don't fail login if cart loading fails
      }

      console.log("✅ User role:", userData.userRole);
      console.log("✅ Authentication complete");

      // Close modal and redirect based on user role
      onClose();
      
      if (userData.userRole === "admin") {
        navigate("/dashboard");
        Notify.success("Welcome Admin! You are now in Admin Access Level");
      } else {
        navigate("/");
        Notify.info("Login successful! Welcome back.");
      }

      reset();
    } catch (error: any) {
      console.error("❌ Login error:", error);
      
      const errorMessage = error?.response?.data?.message || "Login Failed";
      Notify.failure(errorMessage);
    }
  };

  const handleRegisterClick = () => {
    if (onOpenRegister) {
      onOpenRegister();
    } else {
      onClose();
      navigate("/signup");
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Login Modal */}
      {!showForgotPassword && (
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

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <span
                  onClick={handleForgotPasswordClick}
                  className="text-sm text-yellow-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </span>
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
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBackToLogin={handleBackToLogin}
      />
    </>
  );
};

export default LoginModal;