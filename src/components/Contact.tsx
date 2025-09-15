import React from "react";

function ContactPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Contact Us
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              placeholder="Write your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
