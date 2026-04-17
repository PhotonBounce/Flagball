"use client";

import { useState } from "react";

const sidebarLinks = [
  { label: "Overview", icon: "📊", key: "overview" },
  { label: "Users", icon: "👥", key: "users" },
  { label: "Teams", icon: "🏈", key: "teams" },
  { label: "NFTs", icon: "💎", key: "nfts" },
  { label: "Tokens", icon: "🪙", key: "tokens" },
  { label: "Events", icon: "📅", key: "events" },
  { label: "Tournaments", icon: "🏆", key: "tournaments" },
  { label: "Marketplace", icon: "🛒", key: "marketplace" },
  { label: "Fantasy", icon: "🎯", key: "fantasy" },
  { label: "Subscriptions", icon: "💳", key: "subscriptions" },
  { label: "Affiliates", icon: "🤝", key: "affiliates" },
  { label: "Contracts", icon: "📜", key: "contracts" },
  { label: "Settings", icon: "⚙️", key: "settings" },
];

const overviewStats = [
  { label: "Total Users", value: "12,847", change: "+324", direction: "up", icon: "👥" },
  { label: "Active Teams", value: "486", change: "+18", direction: "up", icon: "🏈" },
  { label: "NFTs Minted", value: "58,320", change: "+1,247", direction: "up", icon: "💎" },
  { label: "Tokens Circulating", value: "2.45M", change: "+48K", direction: "up", icon: "🪙" },
  { label: "Daily Revenue", value: "$8,420", change: "+12%", direction: "up", icon: "💰" },
  { label: "Monthly Active", value: "9,234", change: "-2%", direction: "down", icon: "📈" },
];

const recentActivity = [
  { action: "New user registered", user: "sarah_chen_42", time: "2m ago", type: "user" },
  { action: "NFT minted — Golden Touchdown", user: "FlashThompson", time: "5m ago", type: "nft" },
  { action: "Tournament created — Spring Showdown", user: "Admin", time: "12m ago", type: "tournament" },
  { action: "Marketplace sale — 8,400 FLAG", user: "ATLLightning", time: "18m ago", type: "sale" },
  { action: "Team approved — Boston Bolts", user: "Admin", time: "25m ago", type: "team" },
  { action: "Smart contract deployed — NFT Collection", user: "Admin", time: "1h ago", type: "contract" },
  { action: "Quiz passed — Rules Expert NFT awarded", user: "DeAndre_W", time: "1h ago", type: "nft" },
  { action: "Subscription upgrade — PRO tier", user: "JessP_Creates", time: "2h ago", type: "subscription" },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-64 flex flex-col overflow-y-auto"
        style={{
          background: "var(--admin-sidebar)",
          borderRight: "1px solid var(--admin-border)",
        }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <span className="text-2xl">🏈</span>
          <div>
            <span className="text-lg font-black">
              <span className="text-white">Only</span>
              <span style={{ color: "var(--admin-accent)" }}>Flags</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase" style={{ color: "var(--admin-muted)" }}>
              Admin Panel
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => setActiveSection(link.key)}
              className={`admin-sidebar-link w-full text-left ${activeSection === link.key ? "active" : ""}`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Credits */}
        <div className="p-4 text-center" style={{ borderTop: "1px solid var(--admin-border)" }}>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--admin-muted)" }}>
            by Photon-Bounce
          </span>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">{activeSection}</h1>
            <p className="text-sm mt-1" style={{ color: "var(--admin-muted)" }}>
              OnlyFlags platform management dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-64 px-4 py-2.5 rounded-lg text-sm"
                style={{
                  background: "var(--admin-card)",
                  border: "1px solid var(--admin-border)",
                  color: "var(--admin-text)",
                  outline: "none",
                }}
              />
            </div>
            <button className="admin-btn admin-btn-primary">
              🔔 <span className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 -right-0.5" />
            </button>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: "var(--admin-card)", border: "1px solid var(--admin-border)" }}
            >
              👤
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {overviewStats.map((stat) => (
            <div key={stat.label} className="admin-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: stat.direction === "up" ? "var(--admin-green)" : "var(--admin-red)",
                    background: stat.direction === "up" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  }}
                >
                  {stat.direction === "up" ? "↑" : "↓"} {stat.change}
                </span>
              </div>
              <div className="text-xl font-black text-white">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--admin-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 admin-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <span className="text-xs" style={{ color: "var(--admin-accent)" }}>View all →</span>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg transition-colors duration-200"
                  style={{ background: "rgba(255, 255, 255, 0.02)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        item.type === "nft" ? "var(--admin-purple)" :
                        item.type === "sale" ? "var(--admin-green)" :
                        item.type === "contract" ? "var(--admin-accent)" :
                        "var(--admin-blue)",
                    }}
                  />
                  <div className="flex-1">
                    <span className="text-sm text-white">{item.action}</span>
                    <span className="text-xs ml-2" style={{ color: "var(--admin-muted)" }}>
                      @{item.user}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--admin-muted)" }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Platform Health */}
          <div className="admin-card p-6">
            <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: "Approve Pending Teams", count: 3, color: "var(--admin-blue)" },
                { label: "Review Reported NFTs", count: 0, color: "var(--admin-purple)" },
                { label: "Process Withdrawals", count: 7, color: "var(--admin-green)" },
                { label: "Deploy Smart Contract", count: null, color: "var(--admin-accent)" },
                { label: "Send Push Notification", count: null, color: "var(--admin-blue)" },
                { label: "Update Platform Config", count: null, color: "var(--admin-muted)" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--admin-border)",
                    color: "var(--admin-text)",
                  }}
                >
                  <span>{action.label}</span>
                  {action.count !== null && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${action.color}20`,
                        color: action.color,
                      }}
                    >
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Platform health */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-white mb-4">Platform Health</h3>
              {[
                { label: "API", status: "Operational", color: "var(--admin-green)" },
                { label: "Database", status: "Operational", color: "var(--admin-green)" },
                { label: "Blockchain RPC", status: "Operational", color: "var(--admin-green)" },
                { label: "Redis Cache", status: "Operational", color: "var(--admin-green)" },
              ].map((service) => (
                <div key={service.label} className="flex items-center justify-between py-2">
                  <span className="text-xs" style={{ color: "var(--admin-muted)" }}>{service.label}</span>
                  <span className="flex items-center gap-2 text-xs font-medium" style={{ color: service.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: service.color }} />
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
