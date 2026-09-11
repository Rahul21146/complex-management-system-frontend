import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ---------- Mock data — replace with API calls ----------
const RENT = {
  month: 'September',
  amount: '₹11,000',
  dueDate: '5 Sep',
  status: 'Pending',
}

const PAYMENT_HISTORY = [
  { month: 'August', amount: '₹11,000', paidOn: '3 Aug', status: 'Paid' },
  { month: 'July', amount: '₹11,000', paidOn: '4 Jul', status: 'Paid' },
  { month: 'June', amount: '₹11,000', paidOn: '9 Jun', status: 'Paid' },
]

const UTILITY_BILLS = [
  { type: 'Electricity', period: 'August 2026', amount: '₹840', status: 'Pending' },
  { type: 'Water', period: 'August 2026', amount: '₹250', status: 'Paid' },
  { type: 'Wi-Fi', period: 'August 2026', amount: '₹500', status: 'Paid' },
]

const INITIAL_COMPLAINTS = [
  { id: 1, category: 'Plumbing', description: 'Leaking bathroom tap', date: '8 Sep', status: 'Open' },
  { id: 2, category: 'Electrical', description: 'Flickering tube light', date: '1 Sep', status: 'Resolved' },
]

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview' },
  { key: 'payments', label: 'Payment History' },
  { key: 'utilities', label: 'Utility Bills' },
  { key: 'complaints', label: 'Complaints' },
]

const TITLES = {
  overview: 'Overview',
  payments: 'Payment History',
  utilities: 'Utility Bills',
  complaints: 'Complaints',
}

const BADGE_STYLES = {
  paid: 'bg-teal-soft text-teal',
  resolved: 'bg-teal-soft text-teal',
  pending: 'bg-ochre-soft text-ochre',
  'in-progress': 'bg-ochre-soft text-ochre',
  overdue: 'bg-stamp-soft text-stamp',
  open: 'bg-stamp-soft text-stamp',
}

// ---------- Small inline helper (kept local to this file) ----------
function StatusBadge({ status }) {
  const style = BADGE_STYLES[status.toLowerCase()] || 'bg-paper-2 text-ink-soft'
  return (
    <span className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded-sm uppercase ${style}`}>
      {status}
    </span>
  )
}

function TenantPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS)
  const [category, setCategory] = useState('Plumbing')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleComplaintSubmit(e) {
    e.preventDefault()
    if (!description.trim()) return
    setComplaints((prev) => [
      { id: Date.now(), category, description, date: 'Today', status: 'Open' },
      ...prev,
    ])
    setDescription('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  function handlePay() {
    // Prototype only — wire up real payment gateway here.
    alert('Redirecting to payment gateway…')
  }

  return (
    <div className="min-h-screen flex bg-paper">
      {/* ---------- Sidebar ---------- */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-paper-2 border-r border-rule px-5 py-6">
        <div className="flex items-center gap-2 mb-8 px-1">
          <div className="w-7 h-7 bg-ink text-paper-white flex items-center justify-center font-serif font-bold text-xs">
            DC
          </div>
          <span className="font-mono text-[11px] text-ink-soft">TENANT PORTAL</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`text-left px-3 py-2 text-sm border-l-2 transition-colors ${
                activeTab === item.key
                  ? 'border-stamp bg-paper-white text-ink font-medium'
                  : 'border-transparent text-ink-soft hover:bg-paper-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate('/')}
          className="mt-auto text-left px-3 py-2 text-xs text-ink-soft underline hover:text-stamp"
        >
          Sign out
        </button>
      </aside>

      {/* ---------- Main column ---------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-rule bg-paper-white px-6 py-4">
          <div>
            <h1 className="font-serif text-xl">{TITLES[activeTab]}</h1>
            <p className="text-[11.5px] text-ink-soft font-mono mt-0.5">SUNRISE RESIDENCY · ROOM 204</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium leading-tight">Rohit Sen</div>
              <div className="text-[11px] text-ink-soft leading-tight">Tenant</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-ink text-paper-white flex items-center justify-center font-serif text-sm">
              R
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {/* Rent summary — shown on overview + payments */}
          {(activeTab === 'overview' || activeTab === 'payments') && (
            <div className="border border-rule bg-paper-white border-t-[3px] border-t-stamp px-6 py-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-soft mb-1.5">
                    Rent Due — {RENT.month}
                  </div>
                  <div className="font-mono text-3xl font-semibold text-ink">{RENT.amount}</div>
                  <div className="text-[12.5px] text-ink-soft mt-1">Due on {RENT.dueDate}</div>
                </div>
                <StatusBadge status={RENT.status} />
              </div>
              <button
                onClick={handlePay}
                disabled={RENT.status === 'Paid'}
                className="w-full sm:w-auto px-6 py-2.5 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {RENT.status === 'Paid' ? 'Rent Paid' : 'Pay Rent Now'}
              </button>
            </div>
          )}

          {/* Overview: utility summary + complaint summary side by side */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-rule bg-paper-white">
                <div className="px-5 py-3.5 border-b border-rule">
                  <h2 className="font-serif text-lg">Utility Bills</h2>
                </div>
                {UTILITY_BILLS.map((bill) => (
                  <div
                    key={bill.type}
                    className="flex items-center justify-between px-5 py-3 border-b border-dashed border-rule-soft last:border-b-0"
                  >
                    <div>
                      <div className="text-[13.5px] text-ink">{bill.type}</div>
                      <div className="text-[11.5px] text-ink-soft font-mono mt-0.5">{bill.period}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm">{bill.amount}</span>
                      <StatusBadge status={bill.status} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-rule bg-paper-white">
                <div className="px-5 py-3.5 border-b border-rule">
                  <h2 className="font-serif text-lg">My Complaints</h2>
                </div>
                {complaints.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-ink-soft">No complaints raised yet.</p>
                ) : (
                  complaints.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between px-5 py-3 border-b border-dashed border-rule-soft last:border-b-0"
                    >
                      <div>
                        <div className="text-[13.5px] text-ink">{c.description}</div>
                        <div className="text-[11.5px] text-ink-soft font-mono mt-0.5">
                          {c.category} · {c.date}
                        </div>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Payments tab: full history table */}
          {activeTab === 'payments' && (
            <div className="border border-rule bg-paper-white">
              <div className="px-5 py-3.5 border-b border-rule">
                <h2 className="font-serif text-lg">Payment History</h2>
              </div>
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="border-b border-rule text-left">
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">MONTH</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">AMOUNT</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">PAID ON</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">STATUS</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">RECEIPT</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT_HISTORY.map((h) => (
                    <tr key={h.month} className="border-b border-dashed border-rule-soft last:border-b-0">
                      <td className="px-5 py-2.5">{h.month}</td>
                      <td className="px-5 py-2.5 font-mono">{h.amount}</td>
                      <td className="px-5 py-2.5 text-ink-soft">{h.paidOn || '—'}</td>
                      <td className="px-5 py-2.5">
                        <StatusBadge status={h.status} />
                      </td>
                      <td className="px-5 py-2.5">
                        {h.status === 'Paid' ? (
                          <button className="text-ink-soft underline text-xs hover:text-stamp">Download</button>
                        ) : (
                          <span className="text-ink-soft text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Utilities tab */}
          {activeTab === 'utilities' && (
            <div className="border border-rule bg-paper-white">
              <div className="px-5 py-3.5 border-b border-rule">
                <h2 className="font-serif text-lg">Utility Bills</h2>
              </div>
              {UTILITY_BILLS.map((bill) => (
                <div
                  key={bill.type}
                  className="flex items-center justify-between px-5 py-3 border-b border-dashed border-rule-soft last:border-b-0"
                >
                  <div>
                    <div className="text-[13.5px] text-ink">{bill.type}</div>
                    <div className="text-[11.5px] text-ink-soft font-mono mt-0.5">{bill.period}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">{bill.amount}</span>
                    <StatusBadge status={bill.status} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Complaints tab: form + list */}
          {activeTab === 'complaints' && (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="border border-rule bg-paper-white">
                <div className="px-5 py-3.5 border-b border-rule">
                  <h2 className="font-serif text-lg">Raise a Complaint</h2>
                </div>
                <form onSubmit={handleComplaintSubmit} className="p-5">
                  <div className="mb-4">
                    <label className="block text-xs text-ink-soft mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1"
                    >
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>Appliance</option>
                      <option>Cleaning</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs text-ink-soft mb-1.5">Describe the issue</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="E.g. Bathroom tap has been leaking since yesterday"
                      className="w-full px-3 py-2.5 border border-rule bg-paper-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:-outline-offset-1 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 border border-stamp bg-stamp text-paper-white text-sm font-semibold hover:bg-[#742525] transition-colors"
                  >
                    Submit Complaint
                  </button>

                  {submitted && (
                    <p className="text-xs text-teal mt-3">
                      Complaint submitted — you'll be notified on updates.
                    </p>
                  )}
                </form>
              </div>

              <div className="border border-rule bg-paper-white">
                <div className="px-5 py-3.5 border-b border-rule">
                  <h2 className="font-serif text-lg">My Complaints</h2>
                </div>
                {complaints.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-ink-soft">No complaints raised yet.</p>
                ) : (
                  complaints.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between px-5 py-3 border-b border-dashed border-rule-soft last:border-b-0"
                    >
                      <div>
                        <div className="text-[13.5px] text-ink">{c.description}</div>
                        <div className="text-[11.5px] text-ink-soft font-mono mt-0.5">
                          {c.category} · {c.date}
                        </div>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default TenantPage