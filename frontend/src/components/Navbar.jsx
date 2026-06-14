import {
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ onMenuToggle }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${e.target.value}`);
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-6">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="h-11 w-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50"
        >
          <Menu size={18} />
        </button>

        <div className="relative hidden md:block flex-1 max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tickets..."
            onKeyDown={handleSearch}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-11
              pr-20
              text-sm
              outline-none
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500">
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Admin User */}
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-slate-100 transition"
        >
          <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
            A
          </div>

          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-slate-900">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-400"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;