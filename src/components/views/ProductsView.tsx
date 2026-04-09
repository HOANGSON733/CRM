import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Filter, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { productsData } from '../../data/mockData';
import { Product } from '../../types';

interface ProductsViewProps {
  key?: string;
  onNewProduct?: () => void;
}

export function ProductsView({ onNewProduct }: ProductsViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (product: Product) => {
    switch (product.status) {
      case 'in-stock':
        return (
          <div className="bg-amber-100/80 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            Còn {product.stock} sản phẩm
          </div>
        );
      case 'low-stock':
        return (
          <div className="bg-red-100/80 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Sắp hết ({product.stock} sp)
          </div>
        );
      case 'out-of-stock':
        return (
          <div className="bg-stone-200/80 text-stone-500 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
            Hết hàng (0 sp)
          </div>
        );
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif text-primary leading-tight">
            Sản phẩm bán lẻ
          </h1>
          <p className="text-stone-500 max-w-xl text-sm leading-relaxed">
            Quản lý sản phẩm bán kèm tại salon cao cấp
          </p>
        </div>
        <button 
          onClick={onNewProduct}
          className="bg-primary text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-xl hover:bg-primary-light transition-all flex items-center gap-3 active:scale-95"
        >
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Filters & Controls */}
      <div className="bg-stone-50/50 p-6 rounded-[2.5rem] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="bg-white border-none rounded-2xl px-8 py-3.5 pr-12 text-sm font-medium text-primary appearance-none cursor-pointer focus:ring-2 ring-primary/5 outline-none shadow-sm min-w-[200px]">
              <option>Tất cả danh mục</option>
              <option>Serum & Tinh dầu</option>
              <option>Dầu gội</option>
              <option>Mặt nạ tóc</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          <button className="bg-white px-6 py-3.5 rounded-2xl text-sm font-medium text-primary flex items-center gap-3 shadow-sm hover:bg-stone-50 transition-all">
            <Filter size={18} className="text-stone-400" />
            Trạng thái
            <div className="w-5 h-5 bg-stone-100 rounded-lg flex items-center justify-center text-[10px] font-bold">
              3
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm">
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              viewMode === 'grid' ? "bg-primary text-white shadow-md" : "text-stone-400 hover:text-primary"
            )}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              viewMode === 'list' ? "bg-primary text-white shadow-md" : "text-stone-400 hover:text-primary"
            )}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-8">
        {productsData.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-100 group hover:shadow-xl transition-all duration-500"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                {product.category}
              </div>

              {/* More Button */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-white transition-all">
                <MoreVertical size={18} />
              </button>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-4">
                {getStatusBadge(product)}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.brand}</p>
                <h3 className="text-xl font-bold text-primary truncate leading-tight">{product.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">GIÁ BÁN</p>
                  <p className="text-lg font-bold text-primary">{product.sellingPrice}đ</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">GIÁ NHẬP</p>
                  <p className="text-sm font-bold text-stone-400">{product.costPrice}đ</p>
                </div>
              </div>

              {/* Stock Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-stone-400">TỒN KHO</span>
                  <span className="text-primary">{Math.round((product.stock / product.maxStock) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(product.stock / product.maxStock) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      product.status === 'in-stock' ? "bg-amber-800" : 
                      product.status === 'low-stock' ? "bg-red-500" : "bg-stone-300"
                    )}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="py-3.5 bg-white border border-stone-100 text-primary rounded-2xl text-xs font-bold hover:bg-stone-50 transition-all">
                  Sửa
                </button>
                <button className="py-3.5 bg-stone-100 text-primary rounded-2xl text-xs font-bold hover:bg-stone-200 transition-all">
                  Nhập kho
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-8 border-t border-stone-100">
        <p className="text-xs font-medium text-stone-400">Hiển thị 8 trong số 42 sản phẩm</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-sm font-bold shadow-lg">
            1
          </button>
          <button className="w-10 h-10 rounded-xl border border-stone-100 flex items-center justify-center text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all">
            2
          </button>
          <button className="w-10 h-10 rounded-xl border border-stone-100 flex items-center justify-center text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all">
            3
          </button>
          <button className="w-10 h-10 rounded-xl border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
