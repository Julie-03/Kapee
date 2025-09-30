// ForgotPasswordModal.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";
import { X, Mail, Lock, Key } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

interface RequestOTPData {
  email: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin?: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ 
  isOpen, 
  onClose,
  onBackToLogin 
}) => {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register: registerEmail, handleSubmit: handleSubmitEmail, reset: resetEmailForm } = 
    useForm<RequestOTPData>();
  
  const { register: registerReset, handleSubmit: handleSubmitReset, reset: resetPasswordForm, watch, formState: { errors } } = 
    useForm<ResetPasswordData>();

  const newPassword = watch('newPassword');

  // Step 1: Request OTP
  const onRequestOTP = async (data: RequestOTPData) => {
    setIsSubmitting(true);
    try {
      console.log('🔍 Requesting OTP for:', data.email);
      
      const res = await axios.post(
        `${API_BASE_URL}/api_v1/user/send-otp`,
        { email: data.email },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ OTP sent:", res.data);
      setEmail(data.email);
      setStep('reset');
      Notify.success("OTP sent to your email! Check your inbox.");
    } catch (error: any) {
      console.error("❌ Error sending OTP:", error);
      const errorMessage = error?.response?.data?.message || "Failed to send OTP";
      Notify.failure(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Reset Password with OTP
  const onResetPassword = async (data: ResetPasswordData) => {
    if (data.newPassword !== data.confirmPassword) {
      Notify.failure("Passwords do not match!");
      return;
    }

    if (data.newPassword.length < 6) {
      Notify.failure("Password must be at least 6 characters long!");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('🔍 Resetting password for:', email);
      
      const res = await axios.post(
        `${API_BASE_URL}/api_v1/user/reset-password`,
        { 
          email, 
          otp: data.otp,
          newPassword: data.newPassword 
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Password reset:", res.data);
      Notify.success("Password reset successful! You can now login.");
      handleClose();
      
      // Optionally redirect to login
      if (onBackToLogin) {
        setTimeout(() => onBackToLogin(), 500);
      }
    } catch (error: any) {
      console.error("❌ Error resetting password:", error);
      const errorMessage = error?.response?.data?.message || "Failed to reset password";
      Notify.failure(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('request');
    setEmail('');
    resetEmailForm();
    resetPasswordForm();
    onClose();
  };

  const handleBackToRequest = () => {
    setStep('request');
    setEmail('');
    resetPasswordForm();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all scale-100 animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Step 1: Request OTP */}
        {step === 'request' && (
          <>
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
              <p className="text-gray-600 text-sm">Enter your email to receive an OTP code</p>
            </div>

            <form onSubmit={handleSubmitEmail(onRequestOTP)} className="px-8 pb-8 space-y-5">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  {...registerEmail("email", { required: true })}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send OTP"}
              </button>

              <p className="mt-4 text-sm text-center text-black">
                Remember your password?{" "}
                <span
                  onClick={onBackToLogin || handleClose}
                  className="text-yellow-600 hover:underline cursor-pointer"
                >
                  Back to Login
                </span>
              </p>
            </form>
          </>
        )}

        {/* Step 2: Reset Password with OTP */}
        {step === 'reset' && (
          <>
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
              <p className="text-gray-600 text-sm">Enter the OTP sent to {email}</p>
            </div>

            <form onSubmit={handleSubmitReset(onResetPassword)} className="px-8 pb-8 space-y-4">
              {/* OTP Field */}
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="bg-white text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-center tracking-widest text-lg font-semibold"
                  {...registerReset("otp", { 
                    required: true,
                    pattern: /^[0-9]{6}$/
                  })}
                  disabled={isSubmitting}
                />
              </div>

              {/* New Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="New Password"
                  className="bg-white text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  {...registerReset("newPassword", { 
                    required: true,
                    minLength: 6
                  })}
                  disabled={isSubmitting}
                />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="bg-white text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  {...registerReset("confirmPassword", { 
                    required: true,
                    validate: value => value === newPassword || "Passwords do not match"
                  })}
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>

              <div className="flex justify-between text-sm">
                <span
                  onClick={handleBackToRequest}
                  className="text-yellow-600 hover:underline cursor-pointer"
                >
                  Didn't receive OTP?
                </span>
                <span
                  onClick={onBackToLogin || handleClose}
                  className="text-gray-600 hover:underline cursor-pointer"
                >
                  Back to Login
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;