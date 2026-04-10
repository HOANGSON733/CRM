import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Filter, 
  Printer, 
  Plus, 
  Users, 
  X, 
  Phone, 
  Trash2 
} from 'lucide-react';
import { FilterCheckbox } from '../FilterCheckbox';
import { cn } from '../../lib/utils';

interface AppointmentsViewProps {
  authToken: string | null;
  onNewAppointment: () => void;
  key?: string;
}

export function AppointmentsView({ onNewAppointment }: AppointmentsViewProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const scheduleData: any[] = [];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-10 flex gap-8"
    >
      {/* Left Panel: Calendar & Filters */}
      <div className="w-80 space-y-8">
        {/* Mini Calendar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-6">
            <h5 className="font-serif text-primary">Tháng 10, 2023</h5>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-stone-100 rounded"><ChevronLeft size={16} /></button>
              <button className="p-1 hover:bg-stone-100 rounded"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-stone-400 mb-4">
            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
          </div>
          <div className="grid grid-cols-7 gap-y-4 text-center text-xs">
            {[25, 26, 27, 28, 29, 30, 1].map((d, i) => (
              <span key={i} className="text-stone-300">{d}</span>
            ))}
            {[12, 13, 14, 15, 16, 17, 18].map((d, i) => (
              <button 
                key={i} 
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg transition-all relative mx-auto",
                  d === 13 ? "bg-primary text-white shadow-md" : "hover:bg-stone-100 text-stone-700",
                  d === 12 && "after:content-[''] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full after:left-1/2 after:-translate-x-1/2",
                  d === 14 && "after:content-[''] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full after:left-1/2 after:-translate-x-1/2"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-stone-100/50 p-8 rounded-2xl space-y-6">
          <h5 className="text-[11px] font-bold uppercase tracking-widest text-stone-400">BỘ LỌC LỊCH HẸN</h5>
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-stone-500">NHÂN VIÊN THỰC HIỆN</label>
            <div className="bg-white border border-stone-200 rounded-lg px-4 py-2 flex justify-between items-center text-sm cursor-pointer">
              <span>Tất cả thợ</span>
              <ChevronDown size={16} className="text-stone-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-stone-500">LOẠI DỊCH VỤ</label>
            <div className="bg-white border border-stone-200 rounded-lg px-4 py-2 flex justify-between items-center text-sm cursor-pointer">
              <span>Tất cả dịch vụ</span>
              <ChevronDown size={16} className="text-stone-400" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-stone-500">TRẠNG THÁI</label>
            <div className="space-y-3">
              <FilterCheckbox label="Đã xác nhận" checked color="bg-secondary" />
              <FilterCheckbox label="Đang chờ" checked color="bg-primary" />
              <FilterCheckbox label="Hoàn thành" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Schedule */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-stone-100 flex justify-between items-center">
          <h3 className="text-2xl font-serif text-primary">Thứ Sáu, 13 Tháng 10</h3>
          <div className="flex items-center gap-4">
            <div className="bg-stone-100 p-1 rounded-lg flex gap-1">
              <button className="px-4 py-1.5 bg-white rounded-md text-xs font-bold shadow-sm">Ngày</button>
              <button className="px-4 py-1.5 text-xs font-bold text-stone-400">Tuần</button>
            </div>
            <button className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:bg-stone-50"><Filter size={18} /></button>
            <button className="bg-primary text-white px-6 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md">
              <Printer size={16} /> In lịch biểu
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative p-8">
          {/* Timeline Grid */}
          <div className="relative h-[800px]">
            {[8, 9, 10, 11, 12, 13, 14, 15].map((hour) => (
              <div key={hour} className="h-[100px] border-t border-stone-100 flex gap-4">
                <span className="text-[11px] font-bold text-stone-300 -mt-2.5 w-10">{hour.toString().padStart(2, '0')}:00</span>
                <div className="flex-1" />
              </div>
            ))}

            {/* Appointment Blocks */}
            {scheduleData.map((apt) => (
              <motion.div 
                key={apt.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedAppointment(apt)}
                className={cn(
                  "absolute left-16 right-8 rounded-xl border-l-4 p-4 cursor-pointer shadow-sm transition-all",
                  apt.color
                )}
                style={{ top: apt.top, height: apt.height }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={14} />
                      <p className="text-sm font-bold">{apt.customer}</p>
                    </div>
                    <p className="text-xs opacity-80">{apt.service} • {apt.stylist}</p>
                  </div>
                  <span className="text-[10px] font-bold opacity-60">{apt.start} - {apt.end}</span>
                </div>
              </motion.div>
            ))}
            {!scheduleData.length && (
              <div className="text-sm text-stone-400 pt-6 pl-16">
                Chưa có lịch hẹn nào (module lịch hẹn đang chờ kết nối dữ liệu thật).
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={onNewAppointment}
          className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-600"
              >
                <X size={20} />
              </button>

              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-full">ĐÃ XÁC NHẬN</span>
                  <h3 className="text-3xl font-serif text-primary">Phạm Thanh Tâm</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SỐ ĐIỆN THOẠI</p>
                      <p className="text-sm font-bold text-stone-700">090 123 4567</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 bg-stone-50 p-6 rounded-2xl">
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">DỊCH VỤ</p>
                    <p className="text-sm font-bold text-stone-700">Nhuộm highlight</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">THỜI CHÍNH</p>
                    <p className="text-sm font-bold text-stone-700">Chị Lan</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">THỜI LƯỢNG</p>
                    <p className="text-sm font-bold text-stone-700">120 phút</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">GIÁ DỰ KIẾN</p>
                    <p className="text-sm font-bold text-stone-700">1.200.000₫</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-primary-light transition-colors">
                    Sửa lịch hẹn
                  </button>
                  <button className="w-14 h-14 bg-stone-100 text-stone-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
