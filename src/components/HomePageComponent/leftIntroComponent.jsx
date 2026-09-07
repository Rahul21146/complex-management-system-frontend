function LeftIntroComponent() {
  return (
    <div className="hidden md:flex flex-col justify-between flex-[1.15] bg-paper-2 border-r border-rule px-14 py-14 gap-8">
      {/* Brand / Intro */}
      <div>
        <div className="w-8 h-8 bg-ink text-paper-white flex items-center justify-center font-serif font-bold text-sm mb-6">
          DC
        </div>

        <div className="font-mono text-xs text-stamp mb-4">
          OWNER &amp; TENANT PORTAL
        </div>

        <h1 className="font-serif text-4xl leading-tight max-w-md mb-3">
          One ledger for every room, rent and receipt.
        </h1>

        <p className="max-w-sm text-ink-soft text-[15.5px]">
          Track occupancy, collect rent, and settle utility bills across
          your entire complex from a single sign-in.
        </p>
      </div>

      {/* Ledger Preview Card */}
      <div className="max-w-md border border-rule bg-paper-white shadow-sm">
        <div className="p-5 pb-3.5">
          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-rule-soft font-serif font-semibold">
            Sunrise Residency
          </div>

          <div className="flex items-center justify-between py-1.5 pl-5 border-b border-dashed border-rule-soft text-[13.5px] text-ink-soft">
            <span>Room 204</span>

            <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded-sm bg-teal-soft text-teal">
              OCCUPIED
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 pl-5 text-[13.5px] text-ink-soft">
            <span>Room 205</span>

            <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded-sm bg-ochre-soft text-ochre">
              VACANT
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex border-t border-dashed border-rule-soft">
          <div className="flex-1 px-5 py-3 border-r border-dashed border-rule-soft">
            <div className="font-mono text-base font-semibold">
              42
            </div>

            <div className="text-[10.5px] text-ink-soft mt-0.5">
              Rooms
            </div>
          </div>

          <div className="flex-1 px-5 py-3 border-r border-dashed border-rule-soft">
            <div className="font-mono text-base font-semibold">
              38
            </div>

            <div className="text-[10.5px] text-ink-soft mt-0.5">
              Occupied
            </div>
          </div>

          <div className="flex-1 px-5 py-3">
            <div className="font-mono text-base font-semibold">
              ₹4.1L
            </div>

            <div className="text-[10.5px] text-ink-soft mt-0.5">
              This month
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="max-w-md pl-4 border-l-2 border-rule">
        <p className="font-serif italic text-sm text-ink leading-relaxed">
          Rent day used to mean three spreadsheets and a stack of
          receipts. Now it's one screen.
        </p>

        <div className="font-mono text-[11px] text-ink-soft mt-2">
          — Property owner, Pune
        </div>
      </div>
    </div>
  )
}

export default LeftIntroComponent