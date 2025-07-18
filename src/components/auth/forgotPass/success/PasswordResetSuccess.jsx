import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { CheckCircle } from "lucide-react";

export default function PasswordResetSuccess() {
  const { signOut } = useClerk();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex flex-col items-center space-y-6">
            {/* Success Icon with Animation */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <CheckCircle className="w-20 h-20 text-green-500 relative z-10 animate-bounce-once" />
            </div>

            {/* Text Content */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Password Reset Completed!
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Your password has been updated successfully. You can now log in with
                your new password.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => signOut({ redirectUrl: "/login" })}
              className="w-full bg-[#313deb] text-white py-4 px-6 rounded-xl font-semibold
                transform transition-all duration-200 hover:bg-indigo-700 hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
