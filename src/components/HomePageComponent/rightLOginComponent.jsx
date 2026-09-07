function RightLoginComponent({
  role,
  setRole,
  email,
  setEmail,
  password,
  setPassword,
  remember,
  setRemember,
  handleSubmit,
}) {
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
            onClick={() => setRole('owner')}
            className={`flex-1 py-3 text-[13.5px] font-semibold border-r border-rule transition-colors ${
              role === 'owner'
                ? 'bg-ink text-paper-white'
                : 'bg-paper-2 text-ink-soft'
            }`}
          >
            Owner
          </button>

          <button
            type="button"
            onClick={() => setRole('tenant')}
            className={`flex-1 py-3 text-[13.5px] font-semibold transition-colors ${
              role === 'tenant'
                ? 'bg-ink text-paper-white'
                : 'bg-paper-2 text-ink-soft'
            }`}
          >
            Tenant
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email / Phone */}
          <div className="mb-4">
            <label className="block text-xs text-ink-soft mb-1.5">
              Email or phone
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                role === 'owner'
                  ? 'you@example.com'
                  : 'Registered phone number'
              }
              className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1"
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1"
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-xs mb-5 -mt-1">
            <label className="flex items-center gap-1.5 text-ink-soft">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 accent-ink"
              />

              Remember me
            </label>

            <a
              href="#"
              className="text-ink-soft underline hover:text-stamp"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors"
          >
            Sign in as {role === 'owner' ? 'Owner' : 'Tenant'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-ink-soft mt-4">
          New here?{' '}
          <a href="#" className="text-ink underline">
            Contact your property owner
          </a>{' '}
          to get set up.
        </p>
      </div>
    </div>
  )
}

export default RightLoginComponent