import { Outlet, Link, useLocation } from "react-router";
import { Activity, FileText } from "lucide-react";
import logo from "../../imports/لوجو_عين-1.png";

export function Root() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#B8B68F' }} dir="rtl">
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(42, 42, 42, 0.15)', backgroundColor: '#D0C0A7' }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="شعار عين" className="h-12 w-12" />
            <div>
              <h1 className="text-xl" style={{ color: '#2A2A2A', fontWeight: 600 }}>عَيْن</h1>
              <p className="text-sm" style={{ color: '#5A5A5A' }}>لوحة التحكم الذكية للحج</p>
            </div>
          </div>

          <nav className="flex gap-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: location.pathname === '/' ? '#DECCA6' : 'transparent',
                color: '#2A2A2A'
              }}
            >
              <Activity className="h-4 w-4" />
              لوحة التحكم
            </Link>
            <Link
              to="/reports"
              className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: location.pathname === '/reports' ? '#DECCA6' : 'transparent',
                color: '#2A2A2A'
              }}
            >
              <FileText className="h-4 w-4" />
              التقارير
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
