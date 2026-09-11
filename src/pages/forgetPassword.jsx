import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../components/spinner'
import { forgotPassword } from '../api/opeartions/authOpeartions'

function ForgetPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    try {
      const response = await forgotPassword(
        {
          email: email.trim(),
        },
        setLoading
      )

      console.log('Forgot password response:', response.data)

      // Show success section
      setSent(true)
    } catch (error) {
      console.error('Forgot password failed:', error)

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          'Unable to send reset link. Please try again.'
      )
    }
  }

  const handleUseDifferentEmail = () => {
    setSent(false)
    setEmail('')
    setError('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[380px] bg-paper-white border border-rule border-t-[3px] border-t-stamp shadow-sm px-8 py-9">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-ink-soft">
              RESET PASSWORD
            </span>

            <span className="font-mono text-[10px] text-ink-soft border border-rule-soft bg-paper-2 px-2 py-0.5">
              v1.0
            </span>
          </div>

          {!sent ? (
            <>
              {/* Heading */}
              <h1 className="font-serif text-2xl mb-2">
                Forgot your password?
              </h1>

              <p className="text-ink-soft text-sm mb-6">
                Enter the email linked to your account and we'll send
                you a link to reset your password.
              </p>

              {/* Error */}
              {error && (
                <div className="mb-4 border border-stamp-soft bg-stamp-soft px-3 py-2 text-sm text-stamp">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-xs text-ink-soft mb-1.5">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    autoComplete="email"
                    className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success */}
              <h1 className="font-serif text-2xl mb-2">
                Check your inbox
              </h1>

              <p className="text-ink-soft text-sm mb-6">
                If an account exists for{' '}
                <span className="text-ink font-medium">
                  {email}
                </span>
                , a reset link is on its way.
              </p>

              <button
                type="button"
                onClick={handleUseDifferentEmail}
                disabled={loading}
                className="w-full py-3 border border-rule text-sm font-semibold hover:border-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Use a different email
              </button>
            </>
          )}

          {/* Back to login */}
          <button
            type="button"
            onClick={() => navigate('/')}
            disabled={loading}
            className="w-full text-center text-xs text-ink-soft underline mt-5 hover:text-stamp disabled:opacity-60"
          >
            Back to sign in
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-5 flex-wrap px-8 py-4 border-t border-rule bg-paper-2 text-[11.5px] text-ink-soft">
        <a href="#" className="hover:text-stamp">
          Help
        </a>

        <span className="text-rule">•</span>

        <a href="#" className="hover:text-stamp">
          Privacy
        </a>

        <span className="text-rule">•</span>

        <a href="#" className="hover:text-stamp">
          Terms
        </a>
      </div>
    </div>
  )
}

export default ForgetPassword