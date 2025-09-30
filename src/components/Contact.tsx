// src/components/Contact.tsx
import React, { useState } from "react";
import type { FormEvent } from "react";
import { contactService } from "./services/apiService";
import type { ContactFormData } from "./services/apiService";

function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      await contactService.submitContact(formData);
      
      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setError(
        err.message || "Failed to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Contact Us
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center font-medium">
              ✓ Message sent successfully! We'll get back to you soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center font-medium">
              ✗ {error}
            </p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="bg-white w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="bg-white w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className="bg-white text-black w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              placeholder="+250 xxx xxx xxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              rows={5}
              className="bg-white text-black w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;