"use client";
import { useEffect, useState } from "react";
import "./styling.login.css";
import Homee from "./features/homee/page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../lib/paaswordhasher";

const API_URL = "http://localhost:5000/api/users";

export default function Login() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check session
  useEffect(() => {
    if (sessionStorage.getItem("user")) { 
      setIsLoggedIn(true);
    }
  }, []);

  // Get next available ID (only for signup)
  const getNextId = async (): Promise<number | null> => {
    try {
      const { data } = await axios.get(`${API_URL}/nextid`);
      return data;
    } catch {
      toast.error("Unable to create ID");
      return null;
    }
  };

  // Login handler
  const handleLogin = async () => {
    setIsSignup(false);
    if (isSignup) {
      return;
    }
    if (!email || !password)
      return toast.error("Please enter email and password");

    setLoading(true);
    try {
      const { data, status } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (status === 200 && data?.message === "Login successful") {
        const userId = data.user?.id;
        if (!userId) {
          toast.error("User ID not found");
          return;
        }

        const user = { email, id: userId };
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Signup handler
  const handleSignup = async () => {
    setIsSignup(true);
    if (!isSignup) {
      return;
    }
    if (!fname || !email || !password)
      return toast.error("Please enter name, email, and password");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Invalid email address");

    setLoading(true);
    try {
      const newId = await getNextId();
      if (!newId) return;

      const { data } = await axios.post(`${API_URL}/signup`, {
        fname,
        email,
        password,
        id: newId,
      });

      if (data?.message === "User inserted successfully") {
        const user = { email, id: newId };
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        toast.success(`Signup successful! Your ID: ${newId}`);
      } else {
        toast.error("Signup failed");
      }
    } catch {
      toast.error("Insert failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoggedIn ? (
        <Homee />
      ) : (
        <div
          className="containe"
          style={{
            borderRadius: "9%",
            border: "2px solid #ccc",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="Header">
            <div className="text">{isSignup ? "Sign Up" : "Login"}</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            {isSignup && (
              <div className="input">
                <input
                  type="text"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div className="submit-container">
              <div
                className={`submit ${loading ? "loading" : "active"}`}
                onClick={!loading ? handleLogin : undefined}
              >
                {loading ? "Logging in..." : "Login"}
              </div>
              <div
                className={`submit ${loading ? "loading" : "active"}`}
                onClick={!loading ? handleSignup : undefined}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
