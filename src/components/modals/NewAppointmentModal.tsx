import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Search, 
  Plus, 
  CheckCircle2, 
  Users, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Employee, Service } from '../../types';

interface NewAppointmentModalProps {
  onClose: () => void;
  authToken: string | null;
  services: Service[];
  employees: Employee[];
}

export function NewAppointmentModal({ onClose, services, employees }: NewAppointmentModalProps) {
  const [selectedService, setSelectedService] = useState<string>(() => String(services[0]?.id || ''));
  const [selectedStylist, setSelectedStylist] = useState<string>(() => String(employees[0]?.id || 'any'));
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [smsReminder, setSmsReminder] = useState(true);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:30', '14:00',
    '14:30', '15:00', '15:30', '16:00'
  ];

  const selectedServiceObj = services.find((s) => String(s.id) === String(selectedService));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-10 pb-6 flex justify-between items-center">
          <h2 className="text-3xl font-serif text-primary">Đặt Lịch Hẹn Mới</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 pt-0 space-y-10">
          {/* Customer Search */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">KHÁCH HÀNG</label>
              <button className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline">
                <Plus size={12} /> Tạo khách mới nhanh
              </button>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input 
                type="text" 
                placeholder="Tìm theo tên hoặc số điện thoại..." 
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Service Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">DỊCH VỤ</label>
              <div className="space-y-3">
                {services.map((s) => (
                  <div 
                    key={String(s.id)}
                    onClick={() => setSelectedService(String(s.id))}
                    className={cn(
                      "p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center group",
                      String(selectedService) === String(s.id) ? "border-primary bg-primary/[0.02]" : "border-stone-50 bg-stone-50 hover:border-stone-200"
                    )}
                  >
                    <div>
                      <p className="text-sm font-bold text-primary mb-1">{s.name}</p>
                      <p className="text-[11px] text-stone-400">{s.duration} • {s.price}₫</p>
                    </div>
                    {String(selectedService) === String(s.id) ? (
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 size={14} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-stone-200 rounded-full flex items-center justify-center text-stone-300 group-hover:border-stone-400">
                        <Plus size={14} />
                      </div>
                    )}
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-stone-200 rounded-2xl text-[11px] font-bold text-stone-400 uppercase tracking-widest hover:border-stone-400 hover:text-stone-600 transition-all">
                  + Thêm dịch vụ khác
                </button>
                {!services.length && (
                  <p className="text-sm text-stone-400">Chưa có dịch vụ trong hệ thống.</p>
                )}
              </div>
            </div>

            {/* Stylist Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">CHUYÊN VIÊN</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ...employees.map((e) => ({
                    id: String(e.id),
                    name: e.name,
                    role: e.role || 'STAFF',
                    avatar: e.avatar || '',
                    icon: null as any,
                  })),
                  { id: 'any', name: 'Bất kỳ', role: 'TÙY CHỌN', avatar: '', icon: <Users size={18} /> },
                ].map((st) => (
                  <div 
                    key={st.id}
                    onClick={() => setSelectedStylist(st.id)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3",
                      selectedStylist === st.id ? "border-primary bg-primary/[0.02]" : "border-stone-50 bg-stone-50 hover:border-stone-200"
                    )}
                  >
                    {st.avatar ? (
                      <img src={st.avatar} alt={st.name} className="w-10 h-10 rounded-xl object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-stone-200 rounded-xl flex items-center justify-center text-stone-500">
                        {st.icon}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-primary leading-tight">{st.name}</p>
                      <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{st.role}</p>
                    </div>
                  </div>
                ))}
                {!employees.length && (
                  <p className="text-sm text-stone-400 col-span-2">Chưa có nhân viên trong hệ thống.</p>
                )}
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">THỜI GIAN</label>
            <div className="flex gap-8">
              {/* Mini Calendar */}
              <div className="bg-stone-50 p-6 rounded-2xl w-64">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-xs font-bold text-primary">Tháng 10, 2023</h6>
                  <div className="flex gap-1">
                    <button className="p-1 text-stone-400 hover:text-stone-600"><ChevronLeft size={14} /></button>
                    <button className="p-1 text-stone-400 hover:text-stone-600"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-[9px] font-bold text-stone-400 mb-3">
                  <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center text-[11px]">
                  {[28, 29, 30, 1, 2, 3, 4].map((d, i) => (
                    <button 
                      key={i} 
                      className={cn(
                        "w-7 h-7 flex items-center justify-center rounded-lg mx-auto transition-all",
                        d === 3 ? "bg-primary text-white shadow-md" : (d < 5 ? "text-stone-700 hover:bg-stone-200" : "text-stone-300")
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="flex-1 grid grid-cols-4 gap-3">
                {timeSlots.map((t) => (
                  <button 
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={cn(
                      "py-3.5 rounded-xl text-sm font-bold transition-all border-2",
                      selectedTime === t 
                        ? "bg-primary text-white border-primary shadow-md" 
                        : (t === '14:30' ? "bg-stone-100 text-stone-300 border-stone-100 cursor-not-allowed" : "bg-white text-stone-700 border-stone-50 hover:border-stone-200")
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Notes */}
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">GHI CHÚ ĐẶC BIỆT</label>
              <textarea 
                placeholder="Yêu cầu riêng của khách, công thức màu nhuộm..."
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-sm h-24 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none"
              />
            </div>

            {/* Reminders */}
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">THÔNG BÁO NHẮC NHỞ</label>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-5 rounded-full relative transition-all cursor-pointer",
                      smsReminder ? "bg-primary" : "bg-stone-300"
                    )} onClick={() => setSmsReminder(!smsReminder)}>
                      <div className={cn(
                        "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                        smsReminder ? "left-6" : "left-1"
                      )} />
                    </div>
                    <span className="text-xs font-bold text-stone-700">Gửi SMS nhắc trước 2 giờ</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-5 bg-stone-300 rounded-full relative cursor-not-allowed">
                      <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full" />
                    </div>
                    <span className="text-xs font-bold text-stone-400">Gửi Zalo nhắc trước 1 ngày</span>
                  </div>
                  <span className="text-[9px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full uppercase">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-10 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỔNG THỜI GIAN</p>
              <p className="text-sm font-bold text-primary">{selectedServiceObj?.duration || '—'}</p>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỔNG CHI PHÍ</p>
              <p className="text-sm font-bold text-secondary">{selectedServiceObj?.price ? `${selectedServiceObj.price}₫` : '—'}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 text-sm font-bold text-stone-400 hover:text-stone-600 transition-colors"
            >
              Hủy bỏ
            </button>
            <button className="px-10 py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-xl hover:bg-primary-light transition-all active:scale-95">
              Xác nhận đặt lịch
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
