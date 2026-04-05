import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, UserPlus, ShieldCheck, Calendar, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WalkInCustomerModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  pointsToEarn?: number;
}

export function WalkInCustomerModal({ onClose, onSave, pointsToEarn = 230 }: WalkInCustomerModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [addPoints, setAddPoints] = useState(true);

  const handleSave = () => {
    onSave({ name, phone, birthday, addPoints });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#f8f5f0] rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <div className="p-12 space-y-10">
          {/* Header Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
              <UserPlus size={32} />
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif text-primary leading-tight">
              Tạo khách hàng từ giao dịch vãng lai
            </h2>
            <p className="text-stone-500 text-sm italic">
              Ghi lại thông tin để nâng cao chất lượng phục vụ và tích lũy ưu đãi.
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                HỌ VÀ TÊN <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                SỐ ĐIỆN THOẠI <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="090 1234 567"
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 pr-12 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                />
                <ShieldCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              NGÀY SINH <span className="text-stone-300 font-normal">(không bắt buộc)</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="mm/dd/yyyy"
                className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
              <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>

          {/* Points Info Box */}
          <div 
            onClick={() => setAddPoints(!addPoints)}
            className={cn(
              "p-6 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border",
              addPoints ? "bg-secondary/10 border-secondary/20" : "bg-stone-50 border-stone-100"
            )}
          >
            <div className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center transition-all",
              addPoints ? "bg-primary text-white" : "bg-white border border-stone-200"
            )}>
              {addPoints && <Check size={14} />}
            </div>
            <p className="text-sm text-stone-600">
              Cộng <span className="font-bold text-primary">{pointsToEarn} điểm</span> từ giao dịch vừa rồi vào tài khoản mới
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <button 
              onClick={onClose}
              className="w-full py-5 border border-stone-200 text-stone-400 rounded-2xl text-sm font-bold hover:bg-stone-50 transition-all uppercase tracking-widest"
            >
              BỎ QUA
            </button>
            <button 
              onClick={handleSave}
              className="w-full py-5 bg-primary text-white rounded-2xl text-sm font-bold shadow-2xl hover:bg-primary-light transition-all uppercase tracking-widest active:scale-95"
            >
              LƯU KHÁCH HÀNG
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
