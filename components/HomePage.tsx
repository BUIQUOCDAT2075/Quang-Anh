
import React from 'react';
import { Users, ClipboardList, ShieldCheck, ArrowRight } from 'lucide-react';
import { MenuType } from '../types';

interface HomePageProps {
  onNavigate: (menu: MenuType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const cards = [
    {
      title: 'Quản lý Hồ sơ',
      desc: 'Thêm, sửa, xóa thông tin học sinh và sơ yếu lý lịch.',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      action: 'Quản lý Học sinh' as MenuType
    },
    {
      title: 'Theo dõi học tập',
      desc: 'Nhập điểm chi tiết, đánh giá năng lực và phẩm chất học kỳ.',
      icon: ClipboardList,
      color: 'bg-indigo-50 text-indigo-600',
      action: 'Nhập Điểm & Nhận xét' as MenuType
    },
    {
      title: 'Quản lý nề nếp',
      desc: 'Ghi nhận chuyên cần, vi phạm nội quy hoặc tuyên dương tiến bộ.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
      action: 'Nề nếp & Kỷ luật' as MenuType
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-indigo-600 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Hệ Thống Quản Lý Toàn Diện</h3>
          <p className="text-indigo-100 max-w-lg mb-4">
            Giải pháp số hóa hồ sơ học sinh, giúp thầy cô dễ dàng theo dõi quá trình học tập và rèn luyện của các em trong môi trường giáo dục THCS.
          </p>
          <button 
            onClick={() => onNavigate('Quản lý Học sinh')}
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center space-x-2"
          >
            <span>Bắt đầu ngay</span>
            <ArrowRight size={18} />
          </button>
        </div>
        {/* Abstract background shape */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500 rounded-full opacity-20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onNavigate(card.action)}>
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
            <h4 className="text-lg font-bold mb-2 text-slate-800">{card.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">{card.desc}</p>
            <div className="text-indigo-600 text-sm font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Truy cập</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
