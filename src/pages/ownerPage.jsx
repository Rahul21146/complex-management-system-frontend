import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ---------- Mock data — replace with API calls ----------
const STATS = {
  totalRooms: 42,
  occupied: 38,
  vacant: 4,
  rentCollected: '₹3.6L',
  rentDue: '₹4.1L',
  openComplaints: 3,
}

const FLOORS = [
  {
    name: 'Floor 1',
    rooms: [
      { number: '101', tenant: 'Aman Verma', status: 'Occupied' },
      { number: '102', tenant: 'Priya Nair', status: 'Occupied' },
      { number: '103', tenant: null, status: 'Vacant' },
    ],
  },
  {
    name: 'Floor 2',
    rooms: [
      { number: '204', tenant: 'Rohit Sen', status: 'Occupied' },
      { number: '205', tenant: null, status: 'Vacant' },
    ],
  },
]

const PAYMENTS = [
  { tenant: 'Aman Verma', room: '101', amount: '₹9,500', dueDate: '5 Sep', status: 'Paid' },
  { tenant: 'Priya Nair', room: '102', amount: '₹9,500', dueDate: '5 Sep', status: 'Paid' },
  { tenant: 'Rohit Sen', room: '204', amount: '₹11,000', dueDate: '5 Sep', status: 'Pending' },
  { tenant: 'Karan Mehta', room: '206', amount: '₹9,500', dueDate: '5 Sep', status: 'Overdue' },
]

const MAINTENANCE = [
  { id: 1, issue: 'Leaking bathroom tap', room: '204', tenant: 'Rohit Sen', date: '8 Sep', status: 'Open' },
  { id: 2, issue: 'AC not cooling', room: '101', tenant: 'Aman Verma', date: '6 Sep', status: 'In-Progress' },
  { id: 3, issue: 'Broken window latch', room: '102', tenant: 'Priya Nair', date: '2 Sep', status: 'Resolved' },
]

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview' },
  { key: 'properties', label: 'Properties & Rooms' },
  { key: 'rent', label: 'Rent Collection' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'tenants', label: 'Tenants' },
]

const TITLES = {
  overview: 'Overview',
  properties: 'Properties & Rooms',
  rent: 'Rent Collection',
  maintenance: 'Maintenance',
  tenants: 'Tenants',
}

const BADGE_STYLES = {
  paid: 'bg-teal-soft text-teal',
  occupied: 'bg-teal-soft text-teal',
  resolved: 'bg-teal-soft text-teal',
  pending: 'bg-ochre-soft text-ochre',
  vacant: 'bg-ochre-soft text-ochre',
  'in-progress': 'bg-ochre-soft text-ochre',
  overdue: 'bg-stamp-soft text-stamp',
  open: 'bg-stamp-soft text-stamp',
}

// ---------- Small inline helpers (kept local to this file) ----------
function StatusBadge({ status }) {
  const style = BADGE_STYLES[status.toLowerCase()] || 'bg-paper-2 text-ink-soft'
  return (
    <span className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded-sm uppercase ${style}`}>
      {status}
    </span>
  )
}

function StatCard({ label, value, accent = 'ink', sub }) {
  const accentMap = {
    ink: 'text-ink',
    stamp: 'text-stamp',
    teal: 'text-teal',
    ochre: 'text-ochre',
  }
  return (
    <div className="border border-rule bg-paper-white px-5 py-4">
      <div className="text-[11px] uppercase tracking-wide text-ink-soft mb-1.5">{label}</div>
      <div className={`font-mono text-2xl font-semibold ${accentMap[accent]}`}>{value}</div>
      {sub && <div className="text-[11.5px] text-ink-soft mt-1">{sub}</div>}
    </div>
  )
}

function OwnerPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [openFloors, setOpenFloors] = useState(() =>
    Object.fromEntries(FLOORS.map((f) => [f.name, true]))
  )

  function toggleFloor(name) {
    setOpenFloors((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="min-h-screen flex bg-paper">
      {/* ---------- Sidebar ---------- */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-paper-2 border-r border-rule px-5 py-6">
        <div className="flex items-center gap-2 mb-8 px-1">
          <div className="w-7 h-7 bg-ink text-paper-white flex items-center justify-center font-serif font-bold text-xs">
            DC
          </div>
          <span className="font-mono text-[11px] text-ink-soft">OWNER PORTAL</span>
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
            <p className="text-[11.5px] text-ink-soft font-mono mt-0.5">SUNRISE RESIDENCY</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium leading-tight">Rahul Sharma</div>
              <div className="text-[11px] text-ink-soft leading-tight">Owner</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-ink text-paper-white flex items-center justify-center font-serif text-sm">
              R
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Rooms" value={STATS.totalRooms} accent="ink" />
            <StatCard label="Occupied" value={STATS.occupied} accent="teal" sub={`${STATS.vacant} vacant`} />
            <StatCard
              label="Rent Collected"
              value={STATS.rentCollected}
              accent="teal"
              sub={`of ${STATS.rentDue} due`}
            />
            <StatCard label="Open Complaints" value={STATS.openComplaints} accent="stamp" />
          </div>

          {/* Property tree */}
          {(activeTab === 'overview' || activeTab === 'properties') && (
            <div className="border border-rule bg-paper-white mb-6">
              <div className="px-5 py-3.5 border-b border-rule flex items-center justify-between">
                <h2 className="font-serif text-lg">Properties &amp; Rooms</h2>
                <span className="font-mono text-[11px] text-ink-soft">
                  {FLOORS.reduce((sum, f) => sum + f.rooms.length, 0)} rooms
                </span>
              </div>

              {FLOORS.map((floor) => (
                <div key={floor.name} className="border-b border-rule last:border-b-0">
                  <button
                    onClick={() => toggleFloor(floor.name)}
                    className="w-full flex items-center justify-between px-5 py-2.5 bg-paper-2 text-left"
                  >
                    <span className="font-mono text-xs text-ink-soft">{floor.name.toUpperCase()}</span>
                    <span className="text-ink-soft text-xs">{openFloors[floor.name] ? '−' : '+'}</span>
                  </button>

                  {openFloors[floor.name] &&
                    floor.rooms.map((room) => (
                      <div
                        key={room.number}
                        className="flex items-center justify-between px-5 py-2.5 pl-8 border-t border-dashed border-rule-soft text-[13.5px]"
                      >
                        <div>
                          <span className="text-ink">Room {room.number}</span>
                          {room.tenant && <span className="text-ink-soft"> — {room.tenant}</span>}
                        </div>
                        <StatusBadge status={room.status} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}

          {/* Rent collection */}
          {(activeTab === 'overview' || activeTab === 'rent') && (
            <div className="border border-rule bg-paper-white mb-6">
              <div className="px-5 py-3.5 border-b border-rule">
                <h2 className="font-serif text-lg">Rent Collection — This Month</h2>
              </div>
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="border-b border-rule text-left">
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">TENANT</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">ROOM</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">AMOUNT</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">DUE DATE</th>
                    <th className="px-5 py-2.5 font-mono text-[11px] text-ink-soft font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENTS.map((p) => (
                    <tr key={p.room} className="border-b border-dashed border-rule-soft last:border-b-0">
                      <td className="px-5 py-2.5">{p.tenant}</td>
                      <td className="px-5 py-2.5 text-ink-soft">{p.room}</td>
                      <td className="px-5 py-2.5 font-mono">{p.amount}</td>
                      <td className="px-5 py-2.5 text-ink-soft">{p.dueDate}</td>
                      <td className="px-5 py-2.5">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Maintenance */}
          {(activeTab === 'overview' || activeTab === 'maintenance') && (
            <div className="border border-rule bg-paper-white mb-6">
              <div className="px-5 py-3.5 border-b border-rule flex items-center justify-between">
                <h2 className="font-serif text-lg">Maintenance Requests</h2>
                <span className="font-mono text-[11px] text-ink-soft">
                  {MAINTENANCE.filter((r) => r.status !== 'Resolved').length} open
                </span>
              </div>
              {MAINTENANCE.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between px-5 py-3 border-b border-dashed border-rule-soft last:border-b-0"
                >
                  <div>
                    <div className="text-[13.5px] text-ink">{req.issue}</div>
                    <div className="text-[11.5px] text-ink-soft font-mono mt-0.5">
                      Room {req.room} · {req.tenant} · {req.date}
                    </div>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default OwnerPage