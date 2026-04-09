import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  RefreshCw, 
  Save, 
  CheckCircle2,
  ChevronDown,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewProductModalProps {
  onClose: () => void;
}

export function NewProductModal({ onClose }: NewProductModalProps) {
  const [sku, setSku] = useState('ORB-GL-01');
  const [costPrice, setCostPrice] = useState('450.000');
  const [sellingPrice, setSellingPrice] = useState('620.000');
  const [showSuccess, setShowSuccess] = useState(false);

  const generateSku = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSku(`PROD-${result}`);
  };

  const calculateProfit = () => {
    const cost = parseInt(costPrice.replace(/\./g, '')) || 0;
    const sell = parseInt(sellingPrice.replace(/\./g, '')) || 0;
    const profit = sell - cost;
    const margin = sell > 0 ? (profit / sell) * 100 : 0;
    return { profit, margin };
  };

  const { profit, margin } = calculateProfit();

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-10 border-b border-stone-100 flex justify-between items-start bg-stone-50/30">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif text-primary">Thêm Sản Phẩm Mới</h2>
            <p className="text-stone-500 text-sm">Cập nhật danh mục hàng hóa vào hệ thống Bella Hair Salon</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto flex">
          {/* Left Column: Form */}
          <div className="flex-[1.2] p-10 space-y-8 border-r border-stone-100">
            <div className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TÊN SẢN PHẨM</label>
                <input 
                  type="text" 
                  placeholder="Vd: Tinh dầu dưỡng tóc Oribe Gold Lust"
                  className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 ring-primary/10 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">THƯƠNG HIỆU</label>
                  <input 
                    type="text" 
                    placeholder="Oribe, Kerastase..."
                    className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 ring-primary/10 outline-none transition-all"
                  />
                </div>
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">DANH MỤC</label>
                  <div className="relative">
                    <select className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 ring-primary/10 outline-none transition-all appearance-none cursor-pointer">
                      <option>Dưỡng tóc & Phục hồi</option>
                      <option>Dầu gội & Dầu xả</option>
                      <option>Tạo kiểu</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* SKU */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">MÃ SKU</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="flex-1 bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 ring-primary/10 outline-none transition-all"
                    />
                    <button 
                      onClick={generateSku}
                      className="p-4 bg-stone-100 text-stone-500 rounded-2xl hover:bg-stone-200 transition-all"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>
                {/* Volume */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">DUNG TÍCH</label>
                  <input 
                    type="text" 
                    placeholder="Vd: 100ml, 500g"
                    className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 ring-primary/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">MÔ TẢ NGẮN</label>
                <textarea 
                  rows={4}
                  placeholder="Nhập tóm tắt công dụng và thành phần chính..."
                  className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 ring-primary/10 outline-none transition-all resize-none"
                />
              </div>

              {/* Pricing Section */}
              <div className="bg-stone-50/80 p-8 rounded-[2rem] space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">GIÁ NHẬP (đ)</label>
                    <input 
                      type="text" 
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      className="w-full bg-white border-none rounded-2xl px-6 py-4 text-lg font-bold text-primary focus:ring-2 ring-primary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">GIÁ BÁN (đ)</label>
                    <input 
                      type="text" 
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="w-full bg-white border-none rounded-2xl px-6 py-4 text-lg font-bold text-primary focus:ring-2 ring-primary/10 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                  <RefreshCw size={14} className="animate-spin-slow" />
                  Lợi nhuận: +{profit.toLocaleString()}đ ({margin.toFixed(1)}%)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Images */}
          <div className="flex-1 p-10 space-y-10 bg-stone-50/10">
            {/* Main Image */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">HÌNH ẢNH CHÍNH</label>
              <div className="aspect-square border-2 border-dashed border-stone-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 bg-white group hover:border-primary/30 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  <Upload size={28} />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-primary">Kéo thả ảnh tại đây</p>
                  <p className="text-xs text-stone-400">Hoặc nhấp để chọn từ máy tính</p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">THƯ VIỆN ẢNH PHỤ</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex items-center justify-center text-stone-300">
                  <ImageIcon size={24} />
                </div>
                <div className="aspect-square bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex items-center justify-center text-stone-300">
                  <ImageIcon size={24} />
                </div>
                <button className="aspect-square bg-stone-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-stone-400 hover:bg-stone-200 transition-all">
                  <Plus size={20} />
                  <span className="text-[10px] font-bold">THÊM</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 border-t border-stone-100 flex justify-end gap-4 bg-stone-50/30">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-white border border-stone-200 text-stone-500 rounded-2xl text-sm font-bold hover:bg-stone-50 transition-all"
          >
            HỦY BỎ
          </button>
          <button 
            onClick={handleSave}
            className="px-10 py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-xl hover:bg-primary-light transition-all flex items-center gap-3"
          >
            <Save size={18} />
            LƯU SẢN PHẨM
          </button>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-8 right-8 bg-white shadow-2xl rounded-2xl p-6 flex items-center gap-4 border border-green-100 z-[110]"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Thành công</p>
                <p className="text-xs text-stone-500">Đã thêm sản phẩm thành công</p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="ml-4 text-stone-300 hover:text-stone-500"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
