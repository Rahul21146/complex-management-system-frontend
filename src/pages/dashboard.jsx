import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-paper-white border border-rule shadow-sm p-8 text-center">
        <h1 className="font-serif text-2xl mb-2">You're signed in</h1>
        <p className="text-ink-soft text-sm mb-6">
          This is a placeholder dashboard route. Build out the owner/tenant
          views here.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-5 py-2.5 border border-rule text-sm font-semibold hover:border-ink transition-colors"
        >
          Back to login
        </button>
      </div>
    </div>
  )
}

export default Dashboard
