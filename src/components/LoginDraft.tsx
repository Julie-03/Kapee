import React from "react";
import axios from "axios";

function Login() {
  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/login", {
        email: "example@example.com",
        password: "password123",
      });

      const userData = res?.data?.existingUser;
      if (userData) {
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
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <div onClick={handleLogin}>Logi</div>;
}

export default Login;
