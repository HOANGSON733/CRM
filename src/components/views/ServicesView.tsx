import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  Tag, 
  ChevronRight, 
  Star,
  Scissors,
  Droplets,
  Sparkles,
  MoreVertical,
  Edit3,
  Trash2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Service } from '../../types';

interface ServicesViewProps {
  services: Service[];
  serviceCategories?: string[];
  onNewService: () => void;
  onEditService: (service: Service) => void;
  onDeleteService: (service: Service) => void;
  onViewService: (service: Service) => void;
  key?: string;
}

function getInitials(name: string) {
  const cleaned = String(name || '').trim();
  if (!cleaned) return 'S';
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return (words[0].slice(0, 1) + words[words.length - 1].slice(0, 1)).toUpperCase();
}

export function ServicesView({
  services,
  serviceCategories = [],
  onNewService,
  onEditService,
  onDeleteService,
  onViewService,
}: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [failedImages, setFailedImages] = useState<Record<string, true>>({});

  const categories = [
    "Tất cả",
    ...Array.from(new Set([...serviceCategories, ...services.map((s) => s.category)])).sort((a, b) => a.localeCompare(b, 'vi')),
  ];
  
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === "Tất cả" || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Cắt & Tạo Kiểu": return <Scissors size={18} />;
      case "Hóa Chất": return <Droplets size={18} />;
      case "Phục Hồi": return <Sparkles size={18} />;
      default: return <Tag size={18} />;
    }
  };

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
          <h2 className="text-4xl font-serif text-primary mb-2">Dịch vụ & Bảng giá</h2>
          <p className="text-stone-500">Quản lý danh mục dịch vụ và thiết lập giá chuyên nghiệp</p>
        </div>
        <button 
          onClick={onNewService}
          className="bg-primary text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-primary-light transition-all active:scale-95"
        >
          <Plus size={18} />
          Thêm dịch vụ mới
        </button>
      </div>

      {/* Categories & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-stone-100 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2",
                activeCategory === cat 
                  ? "bg-primary text-white shadow-md" 
                  : "text-stone-400 hover:text-primary hover:bg-stone-50"
              )}
            >
              {cat !== "Tất cả" && getIcon(cat)}
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Tìm tên dịch vụ..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold hover:bg-stone-200 transition-colors">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <motion.div 
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                {service.image && !failedImages[String(service.id)] ? (
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    onError={() => setFailedImages((prev) => ({ ...prev, [String(service.id)]: true }))}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-sm border border-stone-100">
                      <span className="text-4xl font-serif text-primary">{getInitials(service.name)}</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-xs leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => onEditService(service)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white/40 transition-all"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => onDeleteService(service)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-red-500/40 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {service.popularity && service.popularity > 90 && (
                  <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <Star size={10} fill="currentColor" /> PHỔ BIẾN
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{service.category}</p>
                      <h4 className="text-xl font-serif text-primary leading-tight">{service.name}</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2 text-stone-400">
                      <Clock size={16} />
                      <span className="text-xs font-bold">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400">
                      <Tag size={16} />
                      <span className="text-xs font-bold">{service.price}₫</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="stylist" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-50 flex items-center justify-center text-[8px] font-bold text-stone-400">+5</div>
                  </div>
                  <button
                    onClick={() => onViewService(service)}
                    className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2 group-hover:text-secondary transition-colors"
                  >
                    Chi tiết <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pricing Policy / Info */}
      <div className="bg-primary p-12 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-xl">
          <h3 className="text-3xl font-serif">Chính sách giá & Ưu đãi</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Tất cả dịch vụ tại Atelier Salon đều bao gồm gội đầu thư giãn và sấy tạo kiểu cơ bản. Khách hàng VIP được giảm 10-20% tùy hạng thẻ thành viên.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <Star size={16} className="text-secondary" fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Giảm 10% cho lần đầu</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <Tag size={16} className="text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Combo tiết kiệm 15%</span>
            </div>
          </div>
        </div>
        <button className="relative z-10 bg-white text-primary px-10 py-5 rounded-2xl text-sm font-bold shadow-2xl hover:bg-stone-100 transition-all active:scale-95 shrink-0">
          Tải bảng giá PDF
        </button>
        <div className="absolute -right-20 -bottom-20 opacity-10">
          <Scissors size={300} />
        </div>
      </div>
    </motion.div>
  );
}
