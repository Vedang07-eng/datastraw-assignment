import {
  LayoutDashboard,
  PlusCircle,
  Ticket,
  Users,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ collapsed, onToggle }) {
const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Create Ticket", icon: PlusCircle, path: "/create" },
  { name: "All Tickets", icon: Ticket, path: "/tickets" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

  return (
    <aside className="h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Logo Section */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-200">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              SupportFlow
            </h1>
            <p className="text-xs text-slate-500">
              Customer Support CRM
            </p>
          </div>
        )}

        <button
          onClick={onToggle}
          className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-xs uppercase font-semibold text-slate-400 mb-4">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom User Card */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                A
              </div>

              <div>
                <p className="font-semibold">
                  Admin User
                </p>
                <p className="text-xs text-blue-100">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;