import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Spinner } from "../components/spinner";
import { resetPassword } from "../api/opeartions/authOpeartions";

function ResetPassword() {
  const navigate = useNavigate();

  // Get token from:
  // /reset-password?token=xxxxxxxx
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    // ----------------------------------
    // Token validation
    // ----------------------------------
    if (!token) {
      setErrorMsg(
        "This password reset link is invalid or missing the token."
      );
      return;
    }

    // ----------------------------------
    // New password validation
    // ----------------------------------
    if (!newPassword.trim()) {
      setErrorMsg("Please enter your new password.");
      return;
    }

    // ----------------------------------
    // Password length
    // ----------------------------------
    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    // ----------------------------------
    // Confirm password validation
    // ----------------------------------
    if (!confirmPassword.trim()) {
      setErrorMsg("Please confirm your new password.");
      return;
    }

    // ----------------------------------
    // Password matching
    // ----------------------------------
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      // ----------------------------------
      // Call backend API
      // ----------------------------------
      const response = await resetPassword(
        {
          token: token,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        setLoading
      );

      console.log(
        "Reset password response:",
        response.data
      );

      // ----------------------------------
      // Check backend response
      // ----------------------------------
      if (response.data?.success === false) {
        setErrorMsg(
          response.data?.message ||
            "Unable to reset password."
        );

        return;
      }

      // ----------------------------------
      // Success
      // ----------------------------------
      setSuccess(true);
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setErrorMsg(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to reset password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper">

      {/* =====================================
          MAIN
      ====================================== */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[380px] bg-paper-white border border-rule border-t-[3px] border-t-stamp shadow-sm px-8 py-9">

          {/* =====================================
              HEADER
          ====================================== */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-ink-soft">
              RESET PASSWORD
            </span>

            <span className="font-mono text-[10px] text-ink-soft border border-rule-soft bg-paper-2 px-2 py-0.5">
              v1.0
            </span>
          </div>

          {/* =====================================
              SUCCESS STATE
          ====================================== */}
          {success ? (
            <>
              <h1 className="font-serif text-2xl mb-2">
                Password changed
              </h1>

              <p className="text-ink-soft text-sm mb-6">
                Your password has been updated successfully.
                You can now sign in using your new password.
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center py-3 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors"
              >
                Back to sign in
              </button>
            </>
          ) : !token ? (
            /* =====================================
               INVALID TOKEN
            ====================================== */
            <>
              <h1 className="font-serif text-2xl mb-2">
                Invalid reset link
              </h1>

              <p className="text-ink-soft text-sm mb-6">
                This password reset link is invalid or
                missing its token. Please request a new
                password reset link.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/forgot-password")
                }
                className="w-full flex items-center justify-center py-3 border border-rule text-sm font-semibold hover:border-ink transition-colors"
              >
                Request new link
              </button>
            </>
          ) : (
            /* =====================================
               RESET PASSWORD FORM
            ====================================== */
            <>
              <h1 className="font-serif text-2xl mb-2">
                Set a new password
              </h1>

              <p className="text-ink-soft text-sm mb-6">
                Choose a new password for your account.
              </p>

              {/* =====================================
                  ERROR
              ====================================== */}
              {errorMsg && (
                <div className="mb-4 border border-stamp-soft bg-stamp-soft px-3 py-2 text-sm text-stamp">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* =====================================
                    NEW PASSWORD
                ====================================== */}
                <div className="mb-4">
                  <label className="block text-xs text-ink-soft mb-1.5">
                    New password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={loading}
                    required
                    className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* =====================================
                    CONFIRM PASSWORD
                ====================================== */}
                <div className="mb-2">
                  <label className="block text-xs text-ink-soft mb-1.5">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={loading}
                    required
                    className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* =====================================
                    RESET BUTTON
                ====================================== */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    "Reset password"
                  )}
                </button>
              </form>
            </>
          )}

          {/* =====================================
              BACK TO LOGIN
          ====================================== */}
          {!success && (
            <button
              type="button"
              onClick={() => navigate("/")}
              disabled={loading}
              className="w-full text-center text-xs text-ink-soft underline mt-5 hover:text-stamp disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>

      {/* =====================================
          FOOTER
      ====================================== */}
      <div className="flex items-center justify-center gap-5 flex-wrap px-8 py-4 border-t border-rule bg-paper-2 text-[11.5px] text-ink-soft">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="hover:text-stamp"
        >
          Help
        </a>

        <span className="text-rule">•</span>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="hover:text-stamp"
        >
          Privacy
        </a>

        <span className="text-rule">•</span>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="hover:text-stamp"
        >
          Terms
        </a>
      </div>
    </div>
  );
}

export default ResetPassword;