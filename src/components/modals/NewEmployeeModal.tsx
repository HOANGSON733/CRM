import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, ChevronDown, CheckCircle2, Image as ImageIcon, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewEmployeeModalProps {
  onClose: () => void;
}

export function NewEmployeeModal({ onClose }: NewEmployeeModalProps) {
  const [specialties, setSpecialties] = useState(['Cắt tóc', 'Nhuộm']);
  const availableSpecialties = ['Uốn', 'Duỗi', 'Phục hồi'];

  const toggleSpecialty = (spec: string) => {
    if (specialties.includes(spec)) {
      setSpecialties(specialties.filter(s => s !== spec));
    } else {
      setSpecialties([...specialties, spec]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex min-h-[700px]"
      >
        {/* Left Side - Info */}
        <div className="w-2/5 bg-primary p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl font-serif leading-tight">Thêm Nhân Viên Mới</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Chào mừng thành viên mới gia nhập không gian nghệ thuật Atelier Salon. Hãy hoàn tất hồ sơ để bắt đầu hành trình sáng tạo.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-white/20 transition-all">
              <div className="text-center">
                <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Tải ảnh lên</p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Kích thước khuyên dùng: 500x500px</p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-16 space-y-10 overflow-y-auto">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 hover:text-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">HỌ VÀ TÊN</label>
              <input 
                type="text" 
                placeholder="Nguyễn Văn A"
                className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SỐ ĐIỆN THOẠI</label>
              <input 
                type="text" 
                placeholder="0901 234 567"
                className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">EMAIL LIÊN HỆ</label>
            <input 
              type="email" 
              placeholder="artist@atelier.com"
              className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">CẤP BẬC (ROLE)</label>
              <div className="relative">
                <select className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                  <option>Senior Stylist</option>
                  <option>Master Stylist</option>
                  <option>Junior Artist</option>
                  <option>Barber</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỶ LỆ HOA HỒNG (%)</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="15"
                  className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 font-bold">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">CHUYÊN MÔN</label>
            <div className="flex flex-wrap gap-3">
              {specialties.map((spec) => (
                <button 
                  key={spec}
                  onClick={() => toggleSpecialty(spec)}
                  className="px-5 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-bold flex items-center gap-2 border border-secondary/20"
                >
                  {spec} <X size={14} />
                </button>
              ))}
              {availableSpecialties.map((spec) => (
                <button 
                  key={spec}
                  onClick={() => toggleSpecialty(spec)}
                  className="px-5 py-2 bg-stone-50 text-stone-400 rounded-full text-xs font-bold flex items-center gap-2 border border-stone-100 hover:bg-stone-100 transition-colors"
                >
                  <Plus size={14} /> {spec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">NGÀY BẮT ĐẦU</label>
              <div className="relative">
                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">CA MẶC ĐỊNH</label>
              <div className="relative">
                <Clock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <select className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                  <option>Ca Sáng (08:00 - 16:00)</option>
                  <option>Ca Chiều (14:00 - 22:00)</option>
                  <option>Ca Gãy (Linh hoạt)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6 pt-6">
            <button 
              onClick={onClose}
              className="text-sm font-bold text-stone-400 hover:text-stone-600 transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              onClick={onClose}
              className="bg-primary text-white px-10 py-5 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-2xl hover:bg-primary-light transition-all active:scale-95"
            >
              <CheckCircle2 size={20} />
              Lưu nhân viên
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
