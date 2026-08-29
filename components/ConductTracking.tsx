
import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Stars, ListTodo } from 'lucide-react';
import { storage } from '../services/storage';
import { Student, Conduct } from '../types';

const ConductTracking: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [formData, setFormData] = useState<Omit<Conduct, 'id' | 'studentId'>>({
    type: 'Vi phạm',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    const data = storage.getStudents();
    setStudents(data);
    if (data.length > 0) setSelectedStudentId(data[0].id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    const newConduct: Conduct = {
      ...formData,
      id: crypto.randomUUID(),
      studentId: selectedStudentId
    };

    storage.saveConduct(newConduct);
    setFormData(prev => ({ ...prev, description: '' }));
    alert('Đã cập nhật sổ đầu bài điện tử!');
  };

  const types = [
    { label: 'Chuyên cần (Vắng)', value: 'Chuyên cần', icon: Bell, color: 'text-blue-500 bg-blue-50' },
    { label: 'Vi phạm nội quy', value: 'Vi phạm', icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
    { label: 'Tiến bộ / Tuyên dương', value: 'Tiến bộ', icon: Stars, color: 'text-amber-500 bg-amber-50' }
  ];

  if (students.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 italic">Vui lòng thêm học sinh trước khi ghi nhận nề nếp.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="block text-lg font-bold text-slate-800">Chọn loại ghi nhận</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {types.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({...formData, type: type.value as any})}
                className={`
                  flex flex-col items-center p-4 rounded-xl border-2 transition-all
                  ${formData.type === type.value ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-100 hover:border-indigo-200 bg-white'}
                `}
              >
                <div className={`p-3 rounded-full mb-3 ${type.color}`}>
                  <type.icon size={24} />
                </div>
                <span className={`text-sm font-bold ${formData.type === type.value ? 'text-indigo-900' : 'text-slate-600'}`}>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Học sinh</label>
              <select 
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.className})</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Ngày ghi nhận</label>
              <input 
                required
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Chi tiết sự việc</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Lỗi vi phạm, lý do khen thưởng hoặc nguyên nhân vắng học..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full sm:w-auto bg-slate-900 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
        >
          <CheckCircle2 size={20} />
          <span>Ghi nhận vào hệ thống</span>
        </button>
      </form>
    </div>
  );
};

export default ConductTracking;
