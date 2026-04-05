import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  GripVertical, 
  Scissors, 
  Palette, 
  Sparkles, 
  Coffee, 
  Smile, 
  ChevronDown, 
  Sun, 
  Moon, 
  ShoppingBag, 
  Users, 
  Clock, 
  XCircle, 
  Share2,
  Check,
  UserPlus,
  FileText,
  History,
  Shield,
  BarChart3
} from 'lucide-react';
import { NewCategoryModal } from '../modals/NewCategoryModal';
import { cn } from '../../lib/utils';

const categories = [
  { id: 1, name: 'Cắt & Tạo kiểu', count: 12, status: 'Đang hiện', icon: <Scissors size={20} />, color: 'bg-red-50 text-red-500' },
  { id: 2, name: 'Nhuộm màu kỹ thuật', count: 8, status: 'Đang hiện', icon: <Palette size={20} />, color: 'bg-amber-50 text-amber-500' },
  { id: 3, name: 'Chăm sóc & Phục hồi', count: 15, status: 'Đang ẩn', icon: <Sparkles size={20} />, color: 'bg-stone-100 text-stone-500' },
];

const detailedCategories = [
  { id: 4, name: 'Trang điểm & Makeup', count: 5, status: 'Hiện', icon: <Smile size={18} /> },
  { id: 5, name: 'Gội đầu dưỡng sinh', count: 4, status: 'Hiện', icon: <Coffee size={18} /> },
];

const roles = [
  { 
    id: 1, 
    name: 'Stylist Cao Cấp', 
    roleId: 'ROLE #01', 
    commission: '15%', 
    staffCount: 8, 
    color: '#4a0e0e', 
    permissions: [
      { module: 'Lịch hẹn', actions: ['Xem', 'Thêm'] },
      { module: 'Khách hàng', actions: ['Xem', 'Sửa'] },
    ]
  },
  { 
    id: 2, 
    name: 'Kỹ Thuật Viên', 
    roleId: 'ROLE #02', 
    commission: '10%', 
    staffCount: 12, 
    color: '#c5a059', 
    permissions: [
      { module: 'Doanh thu', actions: ['Xem'] },
      { module: 'Kho hàng', actions: ['Xem'] },
    ]
  },
];

const products = [
  { id: 1, name: 'Serum Phục Hồi Keratin', brand: "L'Atelier Professional", price: '450.000đ', stock: 24, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'Gội Xả Thảo Mộc', brand: 'Botanical Care', price: '320.000đ', stock: 5, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200' },
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('Danh mục dịch vụ');
  const [activeSubTab, setActiveSubTab] = useState('Cấp bậc nhân viên');
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  const tabs = [
    'Danh mục dịch vụ', 'Cấp bậc nhân viên', 'Thợ mặc định', 
    'Nguồn khách', 'Lý do hủy', 'Sản phẩm bán lẻ', 'Thời lượng'
  ];

  const staffLevels = [
    {
      id: 1,
      name: 'Stylist Cao Cấp',
      level: 'BẬC 5',
      tier: 'LUXURY TIER',
      staffCount: 8,
      serviceCommission: '15% - 20%',
      productCommission: '5%',
      permissions: ['Quản lý lịch hẹn', 'Xem hồ sơ khách hàng VIP', 'Phê duyệt voucher', 'Đào tạo nhân sự mới'],
      extraPermissions: 3,
      icon: <Scissors size={24} />,
      color: 'bg-stone-900 text-white'
    },
    {
      id: 2,
      name: 'Kỹ Thuật Viên',
      level: 'BẬC 2',
      tier: 'PROFESSIONAL',
      staffCount: 14,
      serviceCommission: '8% - 12%',
      productCommission: '3%',
      permissions: ['Thực hiện dịch vụ', 'Xem lịch cá nhân', 'Yêu cầu kho vật tư'],
      extraPermissions: 1,
      icon: <Sparkles size={24} />,
      color: 'bg-stone-100 text-stone-600'
    }
  ];

  const renderStaffLevels = () => (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h3 className="text-4xl font-serif text-primary">Cấp bậc & Phân quyền</h3>
          <p className="text-stone-400 text-sm">Quản lý các cấp bậc nhân sự và thiết lập quyền truy cập cho từng vai trò trong hệ thống Atelier.</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-xl hover:bg-primary-light transition-all">
          <UserPlus size={20} /> + Thêm cấp bậc
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-8 border-b border-stone-100 pb-1">
        {['Cấp bậc nhân viên', 'Quyền hạn chung', 'Lịch sử thay đổi'].map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSubTab(sub)}
            className={cn(
              "pb-4 text-sm font-bold transition-all relative",
              activeSubTab === sub ? "text-primary" : "text-stone-300 hover:text-stone-400"
            )}
          >
            {sub}
            {activeSubTab === sub && (
              <motion.div 
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staff Level Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {staffLevels.map((level) => (
            <div key={level.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 space-y-8 relative group">
              <div className="flex items-center gap-6">
                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg", level.color)}>
                  {level.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-2xl font-serif text-primary">{level.name}</h4>
                    <span className="bg-stone-50 text-stone-400 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Users size={10} /> {level.staffCount.toString().padStart(2, '0')} Nhân viên
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    {level.level} • <span className="text-stone-300">{level.tier}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50/50 p-6 rounded-3xl space-y-2 border border-stone-50">
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">HOA HỒNG DỊCH VỤ</p>
                  <p className="text-xl font-serif text-primary">{level.serviceCommission}</p>
                </div>
                <div className="bg-stone-50/50 p-6 rounded-3xl space-y-2 border border-stone-50">
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">HOA HỒNG SẢN PHẨM</p>
                  <p className="text-xl font-serif text-primary">{level.productCommission}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">QUYỀN HẠN ĐẶC TRƯNG</p>
                <div className="flex flex-wrap gap-2">
                  {level.permissions.map(p => (
                    <span key={p} className="bg-amber-50/50 text-amber-700 px-4 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap">
                      {p}
                    </span>
                  ))}
                  {level.extraPermissions > 0 && (
                    <span className="bg-stone-50 text-stone-400 px-4 py-2 rounded-xl text-[10px] font-bold">
                      +{level.extraPermissions} Quyền khác
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-6 pt-4">
                <button className="text-[11px] font-bold text-stone-400 hover:text-primary transition-colors">Chi tiết</button>
                <button className="text-[11px] font-bold text-primary hover:text-primary-light transition-colors">Chỉnh sửa</button>
              </div>
            </div>
          ))}

          {/* Add New Level Card */}
          <button className="bg-stone-50/30 border-2 border-dashed border-stone-200 rounded-[3rem] flex flex-col items-center justify-center p-12 space-y-4 group hover:border-primary/30 transition-all">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-stone-300 group-hover:text-primary shadow-sm transition-colors">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <h4 className="text-xl font-serif text-stone-400 group-hover:text-primary transition-colors">Thêm cấp bậc mới</h4>
              <p className="text-xs text-stone-300 mt-1">Thiết lập lộ trình thăng tiến cho salon của bạn</p>
            </div>
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <BarChart3 size={240} />
          </div>
          <div className="space-y-8 relative z-10">
            <h4 className="text-2xl font-serif">Tổng quan Nhân sự</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm text-white/60">Tổng số cấp bậc</span>
                <span className="text-2xl font-serif">06</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm text-white/60">Nhân viên hoạt động</span>
                <span className="text-2xl font-serif">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Yêu cầu quyền hạn chờ duyệt</span>
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-md">03</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-white text-primary py-5 rounded-2xl text-sm font-bold shadow-xl hover:bg-stone-50 transition-all relative z-10 mt-12">
            Báo cáo phân quyền chi tiết
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10 space-y-12 bg-[#fdfcfb] min-h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif text-primary">Hệ thống & Cấu hình</h2>
          <p className="text-stone-400 text-sm">Thiết lập tham số vận hành cho salon</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm cài đặt..."
              className="bg-stone-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
              <Users size={20} />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="User" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-stone-100/50 p-1.5 rounded-[2rem] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-3 rounded-2xl text-[11px] font-bold transition-all whitespace-nowrap uppercase tracking-wider",
              activeTab === tab 
                ? "bg-primary text-white shadow-lg" 
                : "text-stone-400 hover:text-stone-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Service Categories Section */}
      {activeTab === 'Danh mục dịch vụ' && (
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif text-primary">Danh mục dịch vụ</h3>
              <p className="text-stone-400 text-sm">Phân nhóm các dịch vụ làm đẹp tại Salon</p>
            </div>
            <button 
              onClick={() => setIsNewCategoryModalOpen(true)}
              className="bg-primary text-white px-8 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-primary-light transition-all"
            >
              <Plus size={16} /> Thêm danh mục
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-6 relative group">
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-stone-400 hover:text-primary transition-colors"><Edit2 size={14} /></button>
                  <button className="p-2 text-stone-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  <button className="p-2 text-stone-300 cursor-grab"><GripVertical size={14} /></button>
                </div>
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", cat.color)}>
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-primary">{cat.name}</h4>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">{cat.count} dịch vụ</span>
                    <span className={cn(cat.status === 'Đang hiện' ? "text-green-500" : "text-stone-300")}>
                      {cat.status === 'Đang hiện' ? '● Đang hiện' : '○ Đang ẩn'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed List */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-50 flex justify-between items-center">
              <h4 className="text-sm font-bold text-primary">Danh sách chi tiết</h4>
              <span className="text-[10px] text-stone-400 italic">Kéo thả các dòng để thay đổi thứ tự hiển thị trên Menu</span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50/50">
                  <th className="px-10 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">BIỂU TƯỢNG</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">TÊN DANH MỤC</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">SỐ DỊCH VỤ</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">TRẠNG THÁI</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {detailedCategories.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <div className="w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm font-bold text-primary">{item.name}</td>
                    <td className="px-10 py-6 text-sm font-bold text-stone-600 text-center">{item.count}</td>
                    <td className="px-10 py-6 text-center">
                      <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button className="text-stone-300 hover:text-primary transition-colors"><GripVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Grid: Staff & Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Default Staff */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-primary">
                <Users size={24} />
                <h3 className="text-xl font-serif">Thợ mặc định theo ca</h3>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 space-y-8">
                <div className="relative">
                  <select className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 px-6 text-sm font-bold text-primary appearance-none outline-none">
                    <option>Dịch vụ: Cắt tóc Nam (60 phút)</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-stone-50/50 rounded-2xl border border-stone-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 text-red-400 rounded-full flex items-center justify-center">
                        <Sun size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">Ca Sáng</p>
                        <p className="text-[10px] text-stone-400">08:00 - 14:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">THỢ CHÍNH:</span>
                      <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-bold text-primary border border-stone-100 shadow-sm">Trần Văn A</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-stone-50/50 rounded-2xl border border-stone-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-400 rounded-full flex items-center justify-center">
                        <Moon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">Ca Tối</p>
                        <p className="text-[10px] text-stone-400">14:00 - 21:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">THỢ CHÍNH:</span>
                      <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-bold text-primary border border-stone-100 shadow-sm">Lê Thị B</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retail Products */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-primary">
                <ShoppingBag size={24} />
                <h3 className="text-xl font-serif">Sản phẩm bán lẻ nổi bật</h3>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 space-y-6">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-6 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-bold text-primary">{product.name}</h4>
                      <p className="text-[10px] text-stone-400 italic">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{product.price}</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỒN: <span className={cn(product.stock < 10 ? "text-red-500" : "text-stone-600")}>{product.stock.toString().padStart(2, '0')}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Levels Tab */}
      {activeTab === 'Cấp bậc nhân viên' && renderStaffLevels()}

      {/* Other Tabs Fallback */}
      {activeTab !== 'Danh mục dịch vụ' && activeTab !== 'Cấp bậc nhân viên' && (
        <div className="bg-white p-20 rounded-[3rem] shadow-sm border border-stone-100 text-center space-y-4">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mx-auto">
            <Shield size={40} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-serif text-primary">Đang phát triển</h4>
            <p className="text-stone-400 text-sm">Tính năng {activeTab} đang được hoàn thiện.</p>
          </div>
        </div>
      )}

      {/* Footer Config Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-stone-100">
        <div className="space-y-6">
          <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <Share2 size={12} /> NGUỒN KHÁCH HÀNG
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Facebook', 'Zalo', 'Walk-in', 'Referral'].map(source => (
              <span key={source} className="bg-white border border-stone-100 px-4 py-2 rounded-xl text-[10px] font-bold text-stone-600 shadow-sm">
                {source}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <XCircle size={12} /> LÝ DO HỦY LỊCH
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] font-bold text-stone-600">Khách quên lịch (Lỗi khách)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[10px] font-bold text-stone-600">Trùng lịch thợ (Lỗi Salon)</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <Clock size={12} /> ĐƠN VỊ THỜI GIAN
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-stone-400">Tối thiểu:</span>
              <span className="text-[10px] font-bold text-stone-600">15 phút</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-stone-400">Thời gian đệm:</span>
              <span className="text-[10px] font-bold text-stone-600">5 phút</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.2em]">
          © 2024 L'ATELIER SALON PREMIUM CRM — ALL RIGHTS RESERVED
        </p>
      </div>

      <AnimatePresence>
        {isNewCategoryModalOpen && (
          <NewCategoryModal 
            onClose={() => setIsNewCategoryModalOpen(false)}
            onSave={(data) => {
              console.log('Saving new category:', data);
              setIsNewCategoryModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
