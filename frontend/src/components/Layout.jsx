import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? "80px" : "280px";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside
        className="fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </aside>

      <div
        className="min-h-screen flex flex-col transition-all duration-300"
        style={{ paddingLeft: sidebarWidth }}
      >
        <header className="sticky top-0 z-20 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Navbar onMenuToggle={() => setSidebarCollapsed((v) => !v)} />
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
            <span>© 2025 SupportFlow. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;