
import React, { useState, useEffect } from 'react';
import { Plus, Search, FileDown, Trash2, UserPlus, List } from 'lucide-react';
import { storage } from '../services/storage';
import { Student } from '../types';

const StudentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    code: '',
    name: '',
    gender: 'Nam',
    dob: '',
    className: '',
    parentPhone: '',
    note: ''
  });

  useEffect(() => {
    setStudents(storage.getStudents());
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      ...formData,
      id: crypto.randomUUID()
    };
    storage.saveStudent(newStudent);
    setStudents([...students, newStudent]);
    setFormData({
      code: '',
      name: '',
      gender: 'Nam',
      dob: '',
      className: '',
      parentPhone: '',
      note: ''
    });
    setActiveTab('list');
    alert(`Đã thêm học sinh ${newStudent.name} thành công!`);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Mã HS', 'Tên', 'Giới tính', 'Ngày sinh', 'Lớp', 'SĐT Phụ huynh', 'Ghi chú'];
    const rows = filteredStudents.map(s => [s.code, s.name, s.gender, s.dob, s.className, s.parentPhone, s.note]);
    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "danh_sach_hoc_sinh.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-100">
        <button 
          onClick={() => setActiveTab('add')}
          className={`px-6 py-3 font-medium text-sm flex items-center space-x-2 border-b-2 transition-colors ${activeTab === 'add' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <UserPlus size={18} />
          <span>Thêm mới</span>
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 font-medium text-sm flex items-center space-x-2 border-b-2 transition-colors ${activeTab === 'list' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <List size={18} />
          <span>Danh sách & Tìm kiếm</span>
        </button>
      </div>

      {activeTab === 'add' ? (
        <form onSubmit={handleAddStudent} className="max-w-4xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Mã Học sinh</label>
              <input 
                required
                type="text" 
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value})}
                placeholder="Ví dụ: HS001"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Họ và Tên</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập họ tên đầy đủ"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Giới tính</label>
              <select 
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value as 'Nam' | 'Nữ'})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Ngày sinh</label>
              <input 
                required
                type="date" 
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Lớp</label>
              <input 
                required
                type="text" 
                value={formData.className}
                onChange={e => setFormData({...formData, className: e.target.value})}
                placeholder="Ví dụ: 6A"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">SĐT Phụ huynh</label>
              <input 
                required
                type="tel" 
                value={formData.parentPhone}
                onChange={e => setFormData({...formData, parentPhone: e.target.value})}
                placeholder="09xx xxx xxx"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Ghi chú</label>
            <textarea 
              rows={3}
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Thông tin bổ sung (năng khiếu, sức khỏe...)"
            />
          </div>
          <button 
            type="submit" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Lưu Hồ Sơ</span>
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo tên hoặc mã HS..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button 
              onClick={exportToCSV}
              className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
            >
              <FileDown size={18} />
              <span>Xuất CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Mã HS</th>
                  <th className="px-6 py-4 font-bold">Tên Học sinh</th>
                  <th className="px-6 py-4 font-bold">Lớp</th>
                  <th className="px-6 py-4 font-bold">Giới tính</th>
                  <th className="px-6 py-4 font-bold">Ngày sinh</th>
                  <th className="px-6 py-4 font-bold">Liên hệ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-indigo-600 font-medium">{student.code}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{student.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold uppercase">{student.className}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.gender === 'Nam' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{student.dob}</td>
                    <td className="px-6 py-4 text-slate-500">{student.parentPhone}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                      Không tìm thấy dữ liệu học sinh.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
