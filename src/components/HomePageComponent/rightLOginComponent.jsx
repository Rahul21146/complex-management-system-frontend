import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/opeartions/authOpeartions";
import { Spinner } from "../spinner";

function RightLoginComponent({
  role,
  setRole,
  email,
  setEmail,
  password,
  setPassword,
  remember,
  setRemember,
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!email.trim() || !password.trim()) {
    setError("Email and password are required.");
    return;
  }

  try {
    const response = await login(
      {
        email: email.trim(),
        password,
      },
      setLoading
    );

    console.log("Login response:", response.data);

    const token = response.data.token;

    if (!token) {
      setError("Token was not received from server.");
      return;
    }

    // Store JWT token
    localStorage.setItem("token", token);

    // Navigate after successful login
    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);

    setError(
      error.response?.data?.message ||
        "Login failed. Please check your credentials."
    );
  }
};

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[380px] bg-paper-white border border-rule border-t-[3px] border-t-stamp shadow-sm px-8 py-9">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-ink-soft">
            SIGN IN
          </span>

          <span className="font-mono text-[10px] text-ink-soft border border-rule-soft bg-paper-2 px-2 py-0.5">
            v1.0
          </span>
        </div>

        {/* Owner / Tenant */}
        <div className="flex border border-rule mb-7">
          <button
            type="button"
            disabled={loading}
            onClick={() => setRole("owner")}
            className={`flex-1 py-3 text-[13.5px] font-semibold border-r border-rule transition-colors ${
              role === "owner"
                ? "bg-ink text-paper-white"
                : "bg-paper-2 text-ink-soft"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Owner
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => setRole("tenant")}
            className={`flex-1 py-3 text-[13.5px] font-semibold transition-colors ${
              role === "tenant"
                ? "bg-ink text-paper-white"
                : "bg-paper-2 text-ink-soft"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Tenant
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 border border-stamp-soft bg-stamp-soft px-3 py-2 text-sm text-stamp">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs text-ink-soft mb-1.5">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              disabled={loading}
              autoComplete="email"
              className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-xs text-ink-soft mb-1.5">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
              className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-xs mb-5 -mt-1">
            <label
              className={`flex items-center gap-1.5 text-ink-soft ${
                loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
                className="w-3.5 h-3.5 accent-ink"
              />

              Remember me
            </label>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                if (!loading) {
                  console.log("Forgot password clicked");
                }
              }}
              className={`text-ink-soft underline hover:text-stamp ${
                loading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Spinner />
            ) : (
              `Sign in as ${role === "owner" ? "Owner" : "Tenant"}`
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-ink-soft mt-4">
          New here{" "}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-ink underline"
          >
            Contact your property owner
          </a>{" "}
          to get set up.
        </p>
      </div>
    </div>
  );
}

export default RightLoginComponent;