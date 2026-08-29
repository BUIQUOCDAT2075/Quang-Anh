
export interface Student {
  id: string;
  code: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  dob: string;
  className: string;
  parentPhone: string;
  note: string;
}

export interface Score {
  id: string;
  studentId: string;
  subject: string;
  term: 'HK1' | 'HK2';
  score: number;
  comment: string;
  date: string;
}

export interface Conduct {
  id: string;
  studentId: string;
  type: 'Chuyên cần' | 'Vi phạm' | 'Tiến bộ';
  date: string;
  description: string;
}

export type MenuType = 'Trang chủ' | 'Quản lý Học sinh' | 'Nhập Điểm & Nhận xét' | 'Nề nếp & Kỷ luật' | 'Báo cáo';
