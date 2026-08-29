
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  ClipboardList, 
  ShieldCheck, 
  BarChart3, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { MenuType } from './types';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import ScoreEntry from './components/ScoreEntry';
import ConductTracking from './components/ConductTracking';
import HomePage from './components/HomePage';

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('Trang chủ');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Trang chủ', icon: Home },
    { name: 'Quản lý Học sinh', icon: Users },
    { name: 'Nhập Điểm & Nhận xét', icon: ClipboardList },
    { name: 'Nề nếp & Kỷ luật', icon: ShieldCheck },
    { name: 'Báo cáo', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'Trang chủ': return <HomePage onNavigate={(m) => setActiveMenu(m)} />;
      case 'Quản lý Học sinh': return <StudentManagement />;
      case 'Nhập Điểm & Nhận xét': return <ScoreEntry />;
      case 'Nề nếp & Kỷ luật': return <ConductTracking />;
      case 'Báo cáo': return <Dashboard />;
      default: return <HomePage onNavigate={(m) => setActiveMenu(m)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-indigo-700 text-white shadow-md">
        <div className="flex items-center space-x-2">
          <GraduationCap size={24} />
          <span className="font-bold">Quản Lý THCS</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 transition duration-200 ease-in-out
        w-64 bg-slate-900 text-slate-300 z-50 flex flex-col shadow-xl
      `}>
        <div className="p-6 border-b border-slate-800 hidden md:flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <GraduationCap size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Hệ Thống THCS</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveMenu(item.name as MenuType);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                ${activeMenu === item.name 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 bg-slate-800/50 text-xs text-center border-t border-slate-800">
          © 2024 - Quản lý Giáo dục THCS
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto p-4 md:p-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">{activeMenu}</h2>
            <p className="text-slate-500 mt-1">Chào mừng thầy cô quay trở lại hệ thống.</p>
          </header>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
