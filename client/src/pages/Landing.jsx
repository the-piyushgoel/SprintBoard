import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants.js';
import Button from '../components/ui/Button.jsx';

/* ═══════════════════════════════════════════════
   SHARED LAYOUT CONSTANT
   Every section uses the same centred container.
   ═══════════════════════════════════════════════ */
const cx = 'max-w-7xl mx-auto px-6 lg:px-8';

/* ═══════════════════════════════════════════════
   HERO — DASHBOARD MOCKUP  (HTML + CSS only)
   ═══════════════════════════════════════════════ */

const MiniBar = ({ h, color = 'bg-primary-500' }) => (
  <div className="flex-1 flex flex-col justify-end h-full">
    <div
      className={`w-full rounded-sm ${color} transition-all duration-500`}
      style={{ height: `${h}%` }}
    />
  </div>
);

const HeroDashboard = () => (
  <div className="shadow-mockup rounded-2xl border border-surface-200/70 overflow-hidden bg-white text-left">
    {/* ── Window chrome ── */}
    <div className="flex items-center gap-6 px-6 py-3.5 bg-surface-50 border-b border-surface-200/80">
      <div className="flex gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-surface-300" />
      </div>
      <div className="flex-1 flex justify-center min-w-0">
        <div className="px-4 py-1 rounded-md bg-white border border-surface-200 text-[10px] text-surface-400 font-medium w-56 text-center truncate">
          app.sprintboard.dev/dashboard
        </div>
      </div>
      <div className="w-14 shrink-0 hidden sm:block" />
    </div>

    {/* ── App shell ── */}
    <div className="flex min-h-[360px] sm:min-h-[420px] bg-surface-50/30">
      {/* Sidebar */}
      <div className="hidden md:flex w-[200px] shrink-0 bg-surface-950 flex-col p-4 gap-6">
        <div className="flex items-center gap-2.5 px-1 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-[10px] font-black shadow">S</div>
          <span className="text-[13px] font-bold text-white tracking-tight">SprintBoard</span>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {[
            { label: 'Dashboard', active: true },
            { label: 'My Tasks' },
            { label: 'Projects' },
            { label: 'Calendar' },
            { label: 'Analytics' },
          ].map((nav) => (
            <div
              key={nav.label}
              className={`px-3 py-[7px] rounded-md text-[11px] font-medium transition-colors ${
                nav.active
                  ? 'bg-white/10 text-white'
                  : 'text-surface-500 hover:text-surface-300 cursor-pointer'
              }`}
            >
              {nav.label}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2 px-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-[8px] font-bold text-white shrink-0">JD</div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-surface-300 font-semibold leading-none truncate">Jane Doe</span>
              <span className="text-[9px] text-surface-600 leading-none mt-1">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="px-6 py-3.5 border-b border-surface-100 bg-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[13px] font-bold text-surface-900 truncate">Dashboard</span>
            <span className="text-[10px] bg-primary-50 text-primary-600 border border-primary-100 px-2 py-0.5 rounded-full font-semibold shrink-0">Sprint 14</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-7 px-3 rounded-md bg-surface-50 border border-surface-200 flex items-center hidden sm:flex">
              <span className="text-[10px] text-surface-400">Search…</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-surface-100 border border-surface-200 shrink-0" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
            {[
              { label: 'Total Tasks',  value: '128', change: '+12%', positive: true },
              { label: 'Completed',    value: '94',  change: '73%',  positive: true },
              { label: 'In Progress',  value: '26',  change: '+3',   positive: true },
              { label: 'Overdue',      value: '8',   change: '-2',   positive: false },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-surface-100 p-4 flex flex-col gap-1 shadow-sm">
                <span className="text-[10px] text-surface-400 font-semibold tracking-wide uppercase">{s.label}</span>
                <div className="flex items-end justify-between gap-2">
                  <span className="text-[22px] font-extrabold text-surface-900 leading-none">{s.value}</span>
                  <span className={`text-[10px] font-bold ${s.positive ? 'text-success-600' : 'text-danger-500'}`}>{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + tasks row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
            {/* Mini bar chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-surface-100 p-4 flex flex-col gap-6 shadow-sm min-h-0">
              <div className="flex items-center justify-between shrink-0">
                <span className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">Weekly Velocity</span>
                <span className="text-[10px] text-primary-600 font-semibold">This Week</span>
              </div>
              <div className="flex-1 flex items-end gap-[5px] h-28 min-h-0">
                {[35, 55, 45, 72, 50, 85, 62, 78, 58, 90, 68, 82].map((h, i) => (
                  <MiniBar key={i} h={h} color={i >= 10 ? 'bg-primary-400' : 'bg-primary-500/80'} />
                ))}
              </div>
              <div className="flex items-center justify-between text-[9px] text-surface-400 font-medium shrink-0">
                <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
              </div>
            </div>

            {/* Recent tasks */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-surface-100 overflow-hidden flex flex-col shadow-sm min-h-0">
              <div className="px-4 py-2.5 border-b border-surface-100 flex items-center justify-between bg-white shrink-0">
                <span className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">Recent Tasks</span>
                <span className="text-[10px] text-primary-600 font-semibold cursor-pointer">+ New Task</span>
              </div>
              <div className="flex-1 divide-y divide-surface-55 overflow-y-auto min-h-0">
                {[
                  { title: 'Implement authentication flow',  status: 'Done',        priority: 'High' },
                  { title: 'Redesign dashboard layout',      status: 'In Progress', priority: 'Medium' },
                  { title: 'Build REST API endpoints',       status: 'In Progress', priority: 'High' },
                  { title: 'Write integration tests',        status: 'Todo',        priority: 'Medium' },
                  { title: 'Configure CI/CD pipeline',       status: 'Todo',        priority: 'Low' },
                ].map((t) => {
                  const sc = { Done: 'bg-success-500', 'In Progress': 'bg-primary-500', Todo: 'bg-surface-300' };
                  return (
                    <div key={t.title} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-50/60 transition-colors">
                      <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${sc[t.status]}`} />
                      <span className="text-[11px] font-semibold text-surface-800 flex-1 truncate">{t.title}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold border shrink-0 ${
                        t.status === 'Done' ? 'bg-success-50 text-success-700 border-success-100'
                        : t.status === 'In Progress' ? 'bg-primary-50 text-primary-700 border-primary-100'
                        : 'bg-surface-50 text-surface-600 border-surface-200'
                      }`}>{t.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   TRUSTED-BY LOGO STRIP
   ═══════════════════════════════════════════════ */

const logos = ['Acme Corp', 'NovaTech', 'Orion Labs', 'Helix AI', 'Nimbus', 'Quantum'];

const LogoStrip = () => (
  <div className="py-20 bg-white">
    <div className={cx}>
      <p className="text-center text-[11px] font-semibold text-surface-400 uppercase tracking-[0.2em] mb-8">
        Trusted by teams at
      </p>
      <div className="flex flex-wrap items-center justify-center gap-12">
        {logos.map((name) => (
          <span key={name} className="text-surface-300 text-lg sm:text-xl font-extrabold tracking-tight select-none">
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   FEATURES DATA + CARD
   ═══════════════════════════════════════════════ */

const featuresList = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
    ),
    title: 'Instant Interactions',
    desc: 'Optimistic UI updates deliver sub-100ms feedback. No spinners, no lag — status changes and edits feel instantaneous.',
    gradient: 'from-primary-500 to-violet-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
    ),
    title: 'Enterprise Security',
    desc: 'httpOnly cookies, bcrypt password hashing, JWT auth, and sanitized inputs protect every request end to end.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
    ),
    title: 'Live Analytics',
    desc: 'Completion rates, overdue counts, velocity charts, and sprint progress — all derived in real time as your team works.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
    ),
    title: 'Smart Filtering',
    desc: 'Debounced search, status & priority dropdowns, category tags, and multi-field sort — find any task in milliseconds.',
    gradient: 'from-sky-500 to-indigo-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
    ),
    title: 'Pixel-Perfect Responsive',
    desc: 'Every layout, modal, and interaction is designed mobile-first and scales flawlessly to ultrawide monitors.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
    ),
    title: 'Developer-First Stack',
    desc: 'React 19, Vite, Node.js, Express, MongoDB — clean architecture with modular services and zero tech debt.',
    gradient: 'from-violet-500 to-purple-700',
  },
];

const FeatureCard = ({ icon, title, desc, gradient }) => (
  <div className="group bg-white rounded-2xl border border-surface-200/70 p-8 flex flex-col gap-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm shrink-0`}>
      {icon}
    </div>
    <div className="flex flex-col gap-4 flex-1">
      <h3 className="text-lg font-bold text-surface-900 leading-snug">{title}</h3>
      <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   PRODUCT SECTION — KANBAN ILLUSTRATION
   ═══════════════════════════════════════════════ */

const KanbanColumn = ({ title, dot, cards }) => (
  <div className="flex flex-col gap-6 min-w-0">
    <div className="flex items-center gap-1.5 px-1 shrink-0">
      <div className={`w-2 h-2 rounded-full ${dot}`} />
      <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">{title}</span>
      <span className="text-[10px] text-surface-400 font-medium ml-auto">{cards.length}</span>
    </div>
    <div className="flex flex-col gap-6">
      {cards.map((c) => (
        <div key={c.text} className={`rounded-lg p-2.5 border ${c.bg} transition-colors`}>
          <span className={`text-[10px] font-semibold block leading-snug ${c.strike ? 'line-through opacity-60 text-surface-500' : 'text-surface-700'}`}>{c.text}</span>
          {c.tag && (
            <div className="flex items-center gap-1 mt-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${c.tagDot}`} />
              <span className={`text-[8px] font-medium ${c.tagColor}`}>{c.tag}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ProductIllustration = () => (
  <div className="bg-white rounded-2xl border border-surface-200/70 shadow-card p-6 flex flex-col gap-6 w-full max-w-md animate-float">
    {/* Header */}
    <div className="flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-[8px] text-white font-black">S</div>
        <span className="text-[11px] font-bold text-surface-800">Sprint Board</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-success-500" />
        <span className="text-[9px] text-surface-400 font-medium">Live</span>
      </div>
    </div>

    {/* Kanban columns */}
    <div className="grid grid-cols-3 gap-6 flex-1">
      <KanbanColumn
        title="Todo" dot="bg-surface-300"
        cards={[
          { text: 'Setup CI/CD pipeline', bg: 'bg-surface-50 border-surface-100', tag: 'Low', tagDot: 'bg-surface-300', tagColor: 'text-surface-400' },
          { text: 'Write documentation', bg: 'bg-surface-50 border-surface-100', tag: 'Medium', tagDot: 'bg-warning-400', tagColor: 'text-warning-600' },
        ]}
      />
      <KanbanColumn
        title="Active" dot="bg-primary-500"
        cards={[
          { text: 'Build dashboard UI', bg: 'bg-primary-50/60 border-primary-100', tag: 'High', tagDot: 'bg-danger-400', tagColor: 'text-danger-600' },
          { text: 'API integration', bg: 'bg-primary-50/60 border-primary-100', tag: 'Medium', tagDot: 'bg-warning-400', tagColor: 'text-warning-600' },
        ]}
      />
      <KanbanColumn
        title="Done" dot="bg-success-500"
        cards={[
          { text: 'Auth system', bg: 'bg-success-50/60 border-success-100', tag: 'Complete', tagDot: 'bg-success-500', tagColor: 'text-success-600', strike: true },
          { text: 'Database design', bg: 'bg-success-50/60 border-success-100', tag: 'Complete', tagDot: 'bg-success-500', tagColor: 'text-success-600', strike: true },
        ]}
      />
    </div>

    {/* Progress bar */}
    <div className="pt-3 border-t border-surface-100 shrink-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-bold text-surface-500">Sprint Progress</span>
        <span className="text-[10px] font-bold text-primary-600">68%</span>
      </div>
      <div className="w-full bg-surface-100 rounded-full h-1.5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 w-[68%]" />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   STATISTICS SECTION
   ═══════════════════════════════════════════════ */

const statsList = [
  {
    value: '50K+',
    label: 'Active Users',
    sub: '+18% this quarter',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
    ),
    bars: [30, 45, 40, 55, 65, 60, 78],
  },
  {
    value: '99.9%',
    label: 'Uptime SLA',
    sub: 'Last 90 days',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    bars: [95, 98, 96, 99, 97, 100, 99],
  },
  {
    value: '1.2M',
    label: 'Tasks Managed',
    sub: '+24K this week',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
    ),
    bars: [50, 58, 63, 55, 70, 80, 88],
  },
  {
    value: '150+',
    label: 'Teams Onboarded',
    sub: '+12 this month',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" /></svg>
    ),
    bars: [20, 30, 42, 55, 48, 65, 72],
  },
];

const StatCard = ({ value, label, sub, positive, icon, bars }) => (
  <div className="group bg-white rounded-2xl border border-surface-200/70 p-8 flex flex-col gap-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 h-full">
    {/* Icon + Trend */}
    <div className="flex items-start justify-between shrink-0">
      <div className="w-12 h-12 rounded-xl bg-surface-50 border border-surface-200/80 flex items-center justify-center text-surface-500 group-hover:text-primary-600 transition-colors shrink-0">
        {icon}
      </div>
      <span className={`text-[11px] font-bold ${positive ? 'text-success-600' : 'text-danger-500'}`}>
        {sub}
      </span>
    </div>

    {/* Value */}
    <div className="mt-2 flex-1">
      <div className="text-3xl font-extrabold text-surface-900 tracking-tight leading-none">{value}</div>
      <span className="text-[13px] font-medium text-surface-500 mt-2 block">{label}</span>
    </div>

    {/* Micro chart */}
    <div className="flex items-end gap-[3px] h-8 mt-6 shrink-0">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-[2px] bg-primary-500/15 group-hover:bg-primary-500/30 transition-colors"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   FOOTER DATA
   ═══════════════════════════════════════════════ */

const footerCols = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Resources: ['Documentation', 'API Reference', 'Status', 'Blog'],
  Company: ['About', 'Careers', 'Privacy', 'Terms'],
};

/* ═══════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════ */

const Landing = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-primary-200 overflow-x-hidden">

      {/* ────────────────── NAVBAR ────────────────── */}
      <header className="sticky top-0 z-50 border-b border-surface-200/50 bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.LANDING} className="flex items-center gap-6" aria-label="SprintBoard Home">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
              S
            </div>
            <span className="text-[17px] font-extrabold tracking-tight text-surface-900 shrink-0">SprintBoard</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Product',  href: '#product' },
              { label: 'Stats',    href: '#stats' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-surface-500 hover:text-surface-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ────────────────── HERO ────────────────── */}
        <section className="relative overflow-hidden pt-20 pb-28">
          {/* Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary-100/50 via-violet-50/30 to-transparent rounded-full blur-[80px]" />
            <div className="absolute top-[200px] left-[8%] w-[280px] h-[280px] bg-primary-200/20 rounded-full blur-[80px] animate-pulse-glow" />
            <div className="absolute top-[100px] right-[8%] w-[240px] h-[240px] bg-violet-200/20 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className={`${cx} text-center flex flex-col items-center`}>
            {/* Pill badge */}
            <div className="animate-hero">
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-surface-200/80 shadow-sm text-[12px] font-semibold text-surface-600">
                <span className="flex h-2 w-2 rounded-full bg-success-500 animate-pulse shrink-0" />
                Now in Public Beta — Free for teams
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-[40px] sm:text-[52px] md:text-[60px] lg:text-[72px] font-extrabold tracking-tight text-surface-900 leading-[1.06] max-w-4xl animate-hero stagger-1">
              Ship projects at{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-600 via-violet-500 to-primary-500">
                lightning speed
              </span>
            </h1>

            {/* Sub-heading */}
            <p className="mt-8 text-[16px] sm:text-[18px] md:text-[20px] text-surface-500 max-w-2xl leading-[1.7] animate-hero stagger-2">
              The modern task management platform built for developers. Plan sprints, track velocity, and ship faster — all from one clean interface.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto animate-hero stagger-3">
              <Link to={ROUTES.REGISTER} className="w-full sm:w-auto shrink-0">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 transition-shadow">
                  Get Started for Free
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN} className="w-full sm:w-auto shrink-0">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In to Workspace
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-[12px] text-surface-400 font-medium animate-hero stagger-4">
              No credit card required · Free forever for individuals
            </p>

            {/* Dashboard mockup */}
            <div className="mt-16 w-full animate-hero stagger-5">
              <HeroDashboard />
            </div>
          </div>
        </section>

        {/* ────────────────── LOGO STRIP ────────────────── */}
        <LogoStrip />

        {/* ────────────────── FEATURES ────────────────── */}
        <section id="features" className="py-24 bg-surface-50/40 border-y border-surface-100">
          <div className={cx}>
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-6">
              <span className="text-[12px] font-bold text-primary-600 uppercase tracking-[0.2em] shrink-0">Features</span>
              <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-surface-900 leading-tight">
                Everything you need to ship faster
              </h2>
              <p className="text-[16px] text-surface-500 leading-relaxed">
                A complete toolkit that eliminates busywork and keeps your team focused on building great software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresList.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────── PRODUCT ────────────────── */}
        <section id="product" className="py-24 bg-white">
          <div className={cx}>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
              {/* Left — copy */}
              <div className="flex flex-col gap-6 max-w-xl">
                <span className="text-[12px] font-bold text-primary-600 uppercase tracking-[0.2em] shrink-0">Product</span>
                <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-surface-900 leading-tight">
                  Everything your team needs.
                </h2>
                <p className="text-[16px] text-surface-500 leading-relaxed">
                  From sprint planning to deployment tracking, SprintBoard gives your team one unified workspace to organise, prioritise, and execute work.
                </p>
                <ul className="flex flex-col gap-6 mt-2">
                  {[
                    'Optimistic UI for zero-latency task updates',
                    'Debounced search with regex-safe queries',
                    'Real-time sprint statistics & overdue tracking',
                    'Soft delete with archived task recovery',
                    'Role-based access control & session security',
                    'Paginated views with configurable sort orders',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[14px] text-surface-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to={ROUTES.REGISTER}>
                    <Button variant="primary" size="md" className="shadow-md shadow-primary-600/15">
                      Start Building Today
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right — illustration */}
              <div className="flex justify-center lg:justify-end">
                <ProductIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────── STATISTICS ────────────────── */}
        <section id="stats" className="py-24 bg-surface-50/40 border-y border-surface-100">
          <div className={cx}>
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-6">
              <span className="text-[12px] font-bold text-primary-600 uppercase tracking-[0.2em] shrink-0">Traction</span>
              <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-surface-900 leading-tight">
                Trusted by developers worldwide
              </h2>
              <p className="text-[16px] text-surface-500 leading-relaxed">
                Teams of all sizes rely on SprintBoard to manage their most important work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {statsList.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────── CTA ────────────────── */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className={`${cx} text-center flex flex-col items-center gap-8`}>
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-white tracking-tight leading-tight max-w-3xl">
              Ready to accelerate your sprints?
            </h2>
            <p className="text-[16px] sm:text-[18px] text-surface-400 max-w-2xl leading-relaxed">
              Join thousands of developers who replaced clunky project tools with SprintBoard. Set up your workspace in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 w-full sm:w-auto">
              <Link to={ROUTES.REGISTER} className="w-full sm:w-auto shrink-0">
                <Button size="lg" className="w-full sm:w-auto bg-white text-surface-900 hover:bg-surface-100 font-bold shadow-lg cursor-pointer">
                  Get Started for Free
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN} className="w-full sm:w-auto shrink-0">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-surface-300 hover:text-white hover:bg-white/10 border border-surface-750 cursor-pointer">
                  Sign In to Workspace
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="bg-surface-950 border-t border-surface-800/50">
        <div className={`${cx} pt-28 pb-16`}>
          {/* Top grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 sm:gap-16 pb-12 border-b border-surface-800/50">
            {/* Brand col */}
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-black text-[10px] shadow shrink-0">
                  S
                </div>
                <span className="text-[15px] font-bold text-white shrink-0">SprintBoard</span>
              </div>
              <p className="text-[13px] text-surface-500 leading-relaxed max-w-[220px]">
                Modern project management for teams who ship fast.
              </p>
              <div className="flex items-center gap-6 mt-1">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-white transition-colors" aria-label="GitHub">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerCols).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-6">
                <span className="text-[11px] font-bold text-surface-500 uppercase tracking-[0.12em] shrink-0">{heading}</span>
                {links.map((link) => (
                  <a key={link} href="#" className="text-[13px] text-surface-500 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[12px] text-surface-600">© {new Date().getFullYear()} SprintBoard. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Contact'].map((t) => (
                <a key={t} href="#" className="text-[12px] text-surface-600 hover:text-surface-300 transition-colors">{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
