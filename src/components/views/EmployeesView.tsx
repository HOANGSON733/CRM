import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  Filter, 
  Star, 
  ChevronRight, 
  Lightbulb, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { KPICard } from '../KPICard';
import { employeesData, staffPerformanceData } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Employee } from '../../types';

interface EmployeesViewProps {
  onNewEmployee: () => void;
  onViewProfile: (employee: Employee) => void;
  key?: string;
}

export function EmployeesView({ onNewEmployee, onViewProfile }: EmployeesViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif text-primary mb-2">Đội ngũ nhân sự</h2>
          <p className="text-stone-500">Quản lý hiệu suất và lịch làm việc của chuyên viên</p>
        </div>
        <button 
          onClick={onNewEmployee}
          className="bg-primary text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-primary-light transition-all active:scale-95"
        >
          <Plus size={18} />
          Thêm nhân viên mới
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 flex items-center gap-6">
          <div className="flex-1 space-y-2">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">ĐỘI NGŨ HIỆN TẠI</p>
            <h3 className="text-4xl font-serif text-primary">24 Nhân Sự</h3>
            <div className="flex -space-x-3">
              {employeesData.map((emp, i) => (
                <img key={i} src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary/10 flex items-center justify-center text-[10px] font-bold text-secondary">+12</div>
            </div>
          </div>
          <div className="w-px h-20 bg-stone-100" />
          <div className="w-20 h-20 rounded-full border-4 border-secondary/20 border-t-secondary flex items-center justify-center">
            <span className="text-xl font-serif text-primary">92%</span>
          </div>
        </div>

        <div className="bg-primary p-8 rounded-[2rem] shadow-lg text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10 space-y-1">
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest">ĐANG LÀM VIỆC</p>
            <h3 className="text-5xl font-serif">18</h3>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Plus size={120} />
          </div>
        </div>

        <KPICard title="ĐÁNH GIÁ TB" value="4.9" rating color="secondary" />
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-serif text-primary">Danh Sách Nhân Viên</h3>
        <div className="flex gap-4">
          <div className="relative w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Tìm tên nhân viên..." 
              className="w-full bg-white border border-stone-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold hover:bg-stone-200 transition-colors">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-4 gap-8">
        {employeesData.map((employee) => (
          <motion.div 
            key={employee.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden group"
          >
            <div className="relative h-64 overflow-hidden">
              <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                  employee.status === 'available' ? "bg-secondary text-white" : "bg-primary text-white"
                )}>
                  {employee.status === 'available' ? 'RẢNH' : 'ĐANG BẬN'}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-serif text-primary">{employee.name}</h4>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{employee.role}</p>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{employee.rating}</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                {employee.specialties.join(' • ')}
              </p>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => onViewProfile(employee)}
                  className="flex-1 py-3 border border-stone-200 rounded-xl text-[10px] font-bold text-stone-500 uppercase tracking-widest hover:bg-stone-50 transition-colors"
                >
                  Hồ Sơ
                </button>
                <button className="flex-1 py-3 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary-light transition-colors shadow-md">
                  Đặt Lịch
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Dashboard */}
      <div className="bg-stone-50 rounded-[3rem] p-12 space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h3 className="text-3xl font-serif text-primary">Bảng Điều Khiển Nhân Sự</h3>
            <p className="text-stone-500 text-sm">Theo dõi hiệu suất và phân bổ ca làm việc tối ưu cho đội ngũ nghệ nhân tại Atelier Salon.</p>
          </div>
          <button className="bg-secondary text-white px-8 py-3 rounded-xl text-xs font-bold shadow-lg hover:bg-secondary-light transition-all">
            Phân Ca Ngay
          </button>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {/* Weekly Performance */}
          <div className="col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-8">
            <h4 className="text-lg font-serif text-primary">Hiệu Suất Tuần Này</h4>
            <div className="space-y-8">
              {staffPerformanceData.map((staff, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {staff.name.split(' ').map(n => n[0]).join('').slice(-2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{staff.name}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase">{staff.customers} KHÁCH HÀNG</p>
                      </div>
                    </div>
                    <span className="text-sm font-serif text-primary">{staff.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${staff.value}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Management Tips & Activity */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6">
              <div className="flex items-center gap-3 text-secondary">
                <Lightbulb size={24} />
                <h4 className="text-sm font-bold uppercase tracking-widest">Gợi ý Quản lý</h4>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Dựa trên lịch hẹn ngày mai, bạn nên điều động thêm 2 nhân viên hỗ trợ cho khung giờ 14:00 - 16:00.
              </p>
              <button className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2 hover:underline">
                Xem chi tiết <ArrowRight size={12} />
              </button>
            </div>

            <div className="bg-stone-100/50 p-8 rounded-[2.5rem] space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400">Hoạt động mới</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <span className="font-bold text-primary">Mỹ Linh</span> vừa hoàn thành ca nhuộm lúc 10:45.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <span className="font-bold text-primary">Hoàng Nam</span> được đánh giá 5 sao từ khách hàng Minh Anh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
