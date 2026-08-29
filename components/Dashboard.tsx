
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { storage } from '../services/storage';

const Dashboard: React.FC = () => {
  const students = useMemo(() => storage.getStudents(), []);
  const scores = useMemo(() => storage.getScores(), []);
  const conducts = useMemo(() => storage.getConducts(), []);

  const genderData = useMemo(() => {
    const counts = students.reduce((acc, s) => {
      acc[s.gender] = (acc[s.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [students]);

  const conductData = useMemo(() => {
    const counts = conducts.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [conducts]);

  const scoreStats = useMemo(() => {
    const subjs = ['Toán', 'Ngữ văn', 'Tiếng Anh', 'KHTN'];
    return subjs.map(s => {
      const filtered = scores.filter(sc => sc.subject === s);
      const avg = filtered.length > 0 
        ? (filtered.reduce((sum, current) => sum + current.score, 0) / filtered.length).toFixed(1)
        : 0;
      return { subject: s, average: parseFloat(avg as string) };
    });
  }, [scores]);

  const COLORS = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981'];

  if (students.length === 0) {
    return <div className="text-center py-20 text-slate-400 italic">Chưa có đủ dữ liệu để tạo báo cáo.</div>;
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Tổng số học sinh', value: students.length, sub: 'Em' },
          { label: 'Số lượt đánh giá', value: scores.length, sub: 'Lượt' },
          { label: 'Ghi nhận nề nếp', value: conducts.length, sub: 'Sự việc' },
          { label: 'Số lớp học', value: new Set(students.map(s => s.className)).size, sub: 'Lớp' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-black text-slate-900">{stat.value}</span>
              <span className="text-slate-400 text-xs font-bold uppercase">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Phân bố Giới tính</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Trung bình môn (Top môn chính)</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="average" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Thống kê Nề nếp & Kỷ luật</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conductData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fill: '#64748b'}} />
                <Tooltip />
                <Bar dataKey="value" fill="#fbbf24" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
