
import React, { useState, useEffect } from 'react';
import { Save, UserCircle } from 'lucide-react';
import { storage } from '../services/storage';
import { Student, Score } from '../types';

const ScoreEntry: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [formData, setFormData] = useState<Omit<Score, 'id' | 'studentId' | 'date'>>({
    subject: 'Toán',
    term: 'HK1',
    score: 0,
    comment: ''
  });

  useEffect(() => {
    const data = storage.getStudents();
    setStudents(data);
    if (data.length > 0) setSelectedStudentId(data[0].id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    const newScore: Score = {
      ...formData,
      id: crypto.randomUUID(),
      studentId: selectedStudentId,
      date: new Date().toISOString().split('T')[0]
    };

    storage.saveScore(newScore);
    setFormData(prev => ({ ...prev, score: 0, comment: '' }));
    alert('Đã lưu điểm thành công!');
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 italic">Vui lòng thêm học sinh trước khi nhập điểm.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
        <UserCircle className="text-amber-600 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-amber-900">Hướng dẫn nhập điểm</h4>
          <p className="text-sm text-amber-800">Chọn học sinh tương ứng từ danh sách, sau đó nhập điểm và nhận xét về năng lực cũng như phẩm chất của học sinh.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Chọn Học sinh</label>
            <select 
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.className}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Môn học</label>
            <select 
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {['Toán', 'Ngữ văn', 'Tiếng Anh', 'KHTN', 'Lịch sử & Địa lý', 'GDCD', 'Tin học', 'Công nghệ', 'Nghệ thuật'].map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Học kỳ</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  checked={formData.term === 'HK1'} 
                  onChange={() => setFormData({...formData, term: 'HK1'})}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Học kỳ 1</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  checked={formData.term === 'HK2'} 
                  onChange={() => setFormData({...formData, term: 'HK2'})}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Học kỳ 2</span>
              </label>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Điểm số</label>
            <input 
              required
              type="number" 
              step="0.1"
              min="0"
              max="10"
              value={formData.score}
              onChange={e => setFormData({...formData, score: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Nhận xét chi tiết</label>
          <textarea 
            rows={4}
            value={formData.comment}
            onChange={e => setFormData({...formData, comment: e.target.value})}
            placeholder="Đánh giá thái độ học tập, điểm mạnh và mặt cần cố gắng..."
            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Lưu Kết Quả</span>
        </button>
      </form>
    </div>
  );
};

export default ScoreEntry;
