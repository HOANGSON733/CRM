import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Upload, Clock, ChevronDown, Check, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewServiceModalProps {
  onClose: () => void;
}

export function NewServiceModal({ onClose }: NewServiceModalProps) {
  const [isActive, setIsActive] = useState(true);
  const [addons, setAddons] = useState(['Sấy kiểu']);
  const availableAddons = ['Massage cổ vai gáy', 'Hấp tinh dầu'];

  const toggleAddon = (addon: string) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter(a => a !== addon));
    } else {
      setAddons([...addons, addon]);
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
        className="relative w-full max-w-5xl bg-[#f8f5f0] rounded-[2.5rem] shadow-2xl overflow-hidden flex min-h-[650px]"
      >
        {/* Left Side - Info & Image */}
        <div className="w-[40%] p-12 flex flex-col space-y-8">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
              <Plus size={24} />
            </div>
            <h2 className="text-4xl font-serif text-primary leading-tight">Thêm dịch vụ mới</h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              Vui lòng điền thông tin chi tiết để thiết lập dịch vụ mới trong danh mục thượng lưu của bạn.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TRẠNG THÁI HIỆN TẠI</span>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative p-1",
                  isActive ? "bg-secondary" : "bg-stone-200"
                )}
              >
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full transition-all",
                  isActive ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>
            <p className="text-sm font-bold text-primary">{isActive ? 'Đang hoạt động' : 'Tạm ngưng'}</p>
          </div>

          <div className="flex-1 relative group cursor-pointer">
            <div className="absolute inset-0 bg-stone-200/50 rounded-[2rem] border-2 border-dashed border-stone-300 flex flex-col items-center justify-center space-y-4 group-hover:bg-stone-200/80 transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                <Upload size={20} />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">TẢI ẢNH MINH HỌA</p>
                <p className="text-[10px] text-stone-400 mt-1">JPG, PNG tối đa 5MB</p>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800" 
              alt="placeholder" 
              className="w-full h-full object-cover rounded-[2rem] opacity-20 grayscale"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 bg-white p-12 space-y-8 overflow-y-auto">
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
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TÊN DỊCH VỤ</label>
              <input 
                type="text" 
                placeholder="VD: Gội đầu thảo mộc chuyên sâu"
                className="w-full border-b border-stone-100 py-3 text-sm font-bold text-primary focus:border-primary transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">DANH MỤC</label>
              <div className="relative">
                <select className="w-full border-b border-stone-100 py-3 text-sm font-bold text-primary focus:border-primary transition-all outline-none appearance-none cursor-pointer pr-8">
                  <option>Dịch vụ Tóc</option>
                  <option>Chăm sóc Da</option>
                  <option>Nail & Spa</option>
                  <option>Combo Đặc biệt</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">MÔ TẢ NGẮN</label>
            <textarea 
              placeholder="Nêu bật sự khác biệt và giá trị của dịch vụ..."
              rows={2}
              className="w-full border-b border-stone-100 py-3 text-sm font-medium text-stone-600 focus:border-primary transition-all outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">THỜI LƯỢNG (PHÚT)</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="45"
                  className="w-full border-b border-stone-100 py-3 text-sm font-bold text-primary focus:border-primary transition-all outline-none"
                />
                <Clock size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">GIÁ CƠ BẢN (đ)</label>
              <input 
                type="text" 
                defaultValue="1.200.000"
                className="w-full border-b border-stone-100 py-3 text-sm font-bold text-primary focus:border-primary transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">GIÁ TỐI ĐA</label>
              <input 
                type="text" 
                defaultValue="2.000.000"
                className="w-full border-b border-stone-100 py-3 text-sm font-bold text-primary focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">DỊCH VỤ ĐI KÈM TÙY CHỌN</label>
            <div className="flex flex-wrap gap-3">
              {availableAddons.map((addon) => (
                <button 
                  key={addon}
                  onClick={() => toggleAddon(addon)}
                  className={cn(
                    "px-5 py-2 rounded-full text-[11px] font-bold flex items-center gap-2 border transition-all",
                    addons.includes(addon) 
                      ? "bg-secondary/10 border-secondary text-secondary" 
                      : "bg-stone-50 border-stone-100 text-stone-400 hover:bg-stone-100"
                  )}
                >
                  {addon} <Plus size={14} />
                </button>
              ))}
              {addons.map((addon) => !availableAddons.includes(addon) && (
                <button 
                  key={addon}
                  onClick={() => toggleAddon(addon)}
                  className="px-5 py-2 bg-secondary text-white rounded-full text-[11px] font-bold flex items-center gap-2 shadow-md"
                >
                  {addon} <Check size={14} />
                </button>
              ))}
              <button className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1">
                + THÊM MỚI
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button 
              onClick={onClose}
              className="flex-1 bg-primary text-white py-5 rounded-2xl text-sm font-bold shadow-2xl hover:bg-primary-light transition-all active:scale-95"
            >
              LƯU DỊCH VỤ
            </button>
            <button 
              onClick={onClose}
              className="px-10 py-5 bg-stone-50 text-stone-400 rounded-2xl text-sm font-bold hover:bg-stone-100 transition-all"
            >
              HỦY BỎ
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
