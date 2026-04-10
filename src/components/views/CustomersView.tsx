import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronDown, 
  Phone, 
  X, 
  Star, 
  Clock, 
  CheckCircle2, 
  PlayCircle, 
  Calendar as CalendarIcon,
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { KPICard } from '../KPICard';
import { cn } from '../../lib/utils';
import { Customer } from '../../types';

interface CustomersViewProps {
  customers: Customer[];
  onNewCustomer: () => void;
  onDeleteCustomer: (customer: any) => void;
  key?: string;
}

export function CustomersView({ customers, onNewCustomer, onDeleteCustomer }: CustomersViewProps) {
  const [filterType, setFilterType] = useState<'all' | 'member' | 'walkin'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const filteredCustomers = customers.filter((customer) => {
    if (filterType === 'member') return !customer.isWalkIn;
    if (filterType === 'walkin') return Boolean(customer.isWalkIn);
    return true;
  });

  React.useEffect(() => {
    if (!filteredCustomers.length) {
      setSelectedCustomer(null);
      return;
    }

    setSelectedCustomer((prev: any) => {
      if (!prev) return null;
      const matched = filteredCustomers.find((item) => item.id === prev.id);
      return matched || null;
    });
  }, [filteredCustomers]);

  const spendingChartData = React.useMemo(() => {
    if (!selectedCustomer) return [];
    const existing = Array.isArray(selectedCustomer.spendingData) ? selectedCustomer.spendingData : [];
    if (existing.length) return existing;

    const now = new Date();
    const buckets: { key: string; month: string; value: number }[] = [];
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        month: `T${d.getMonth() + 1}`,
        value: 0,
      });
    }
    const bucketIndex = new Map(buckets.map((b, idx) => [b.key, idx]));

    const history = Array.isArray(selectedCustomer.history) ? selectedCustomer.history : [];
    history.forEach((visit: any) => {
      const dateRaw = String(visit?.date || '').trim();
      const [dd, mm, yyyy] = dateRaw.split('/');
      const month = Number(mm);
      const year = Number(yyyy);
      if (!Number.isFinite(month) || !Number.isFinite(year)) return;
      const key = `${year}-${String(month).padStart(2, '0')}`;
      const idx = bucketIndex.get(key);
      if (idx === undefined) return;
      const priceRaw = String(visit?.price || '').replace(/[^\d]/g, '');
      const price = Number(priceRaw);
      if (!Number.isFinite(price)) return;
      buckets[idx].value += price;
    });

    return buckets.map(({ month, value }) => ({ month, value }));
  }, [selectedCustomer]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-10"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-serif text-primary mb-2">Danh sách khách hàng</h2>
          <p className="text-stone-500">Quản lý hồ sơ và lịch sử làm đẹp của khách hàng</p>
        </div>
        <button 
          onClick={onNewCustomer}
          className="bg-primary text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-primary-light transition-all active:scale-95"
        >
          <Plus size={18} />
          Thêm khách hàng mới
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <KPICard title="Tổng khách hàng" value={String(customers.length)} trend="+5.2%" color="primary" />
        <KPICard title="Khách hàng mới" value="156" subtitle="Tháng này" color="secondary" />
        <KPICard title="Tỷ lệ quay lại" value="78%" trend="+2.1%" color="stone" />
        <KPICard title="Giá trị TB/Khách" value="1.450.000₫" color="secondary-light" />
      </div>

      <div className="relative">
        {/* Customer Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/30">
            <div className="relative w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm khách hàng..." 
                className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button className="p-3 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-colors">
                <Filter size={18} />
              </button>
              <button
                onClick={() => setFilterType('all')}
                className={cn(
                  "px-4 py-3 border rounded-xl text-xs font-bold transition-colors",
                  filterType === 'all'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                )}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterType('member')}
                className={cn(
                  "px-4 py-3 border rounded-xl text-xs font-bold transition-colors",
                  filterType === 'member'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                )}
              >
                Thành viên
              </button>
              <button
                onClick={() => setFilterType('walkin')}
                className={cn(
                  "px-4 py-3 border rounded-xl text-xs font-bold transition-colors",
                  filterType === 'walkin'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                )}
              >
                Khách vãng lai
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Khách hàng</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Liên hệ</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Lần cuối ghé</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className={cn(
                      "group transition-colors",
                      selectedCustomer?.id === customer.id ? "bg-secondary/5" : "hover:bg-stone-50"
                    )}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={customer.avatar} alt={customer.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                        <div>
                          <p className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">{customer.name}</p>
                          <div className="flex gap-1 mt-1">
                            {customer.tags.map(tag => (
                              <span key={tag} className="text-[9px] font-bold text-stone-400">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs font-medium text-stone-600">{customer.phone}</p>
                      <p className="text-[10px] text-stone-400">{customer.email}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs font-medium text-stone-600">{customer.lastVisit}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 text-stone-300 hover:text-secondary transition-colors"
                      >
                        <ChevronDown size={20} className="-rotate-90" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detail Side Panel */}
        <AnimatePresence>
          {selectedCustomer ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCustomer(null)}
                className="absolute inset-0 z-10 bg-black/10"
              />
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ type: 'tween', duration: 0.2 }}
                className="absolute top-0 right-0 z-20 w-[450px] h-full bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden flex flex-col"
              >
              <div className="p-8 flex-1 overflow-y-auto space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase rounded-full",
                      selectedCustomer?.isWalkIn ? "bg-stone-100 text-stone-500" : "bg-secondary/10 text-secondary"
                    )}>
                      {selectedCustomer?.isWalkIn ? 'KHÁCH VÃNG LAI' : 'KHÁCH HÀNG VIP'}
                    </span>
                    <button className="px-3 py-1 bg-stone-100 text-stone-500 text-[10px] font-bold uppercase rounded-full hover:bg-stone-200 transition-colors">Sửa</button>
                    <button 
                      onClick={() => onDeleteCustomer(selectedCustomer)}
                      className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold uppercase rounded-full hover:bg-red-100 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                  <button onClick={() => setSelectedCustomer(null)} className="text-stone-300 hover:text-stone-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl ring-4 ring-white" />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <Star size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif text-primary">{selectedCustomer.name}</h3>
                    <p className="text-stone-400 text-sm font-medium">Thành viên từ {selectedCustomer.memberSince || 'N/A'}</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button className="w-12 h-12 bg-stone-100 text-stone-600 rounded-2xl flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                      <Phone size={20} />
                    </button>
                    <button className="px-6 h-12 bg-primary text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-primary-light transition-all">
                      <CalendarIcon size={16} /> Đặt lịch mới
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-5 rounded-3xl space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">ĐIỂM TÍCH LŨY</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-serif text-primary">{selectedCustomer.points?.toLocaleString() || 0}</span>
                      <span className="text-[10px] text-stone-400 font-bold mb-1">/ {selectedCustomer.maxPoints?.toLocaleString() || 0} pts</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: `${((selectedCustomer.points || 0) / (selectedCustomer.maxPoints || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-stone-50 p-5 rounded-3xl space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỔNG CHI TIÊU</p>
                    <p className="text-2xl font-serif text-primary">48.5M ₫</p>
                    <p className="text-[10px] text-green-600 font-bold">+15% so với tháng trước</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-primary">Biểu đồ chi tiêu</h4>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">6 THÁNG GẦN NHẤT</span>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spendingChartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 8, fontWeight: 700 }} />
                        <YAxis hide />
                        <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }} />
                        <Bar dataKey="value" fill="#4d0216" radius={[2, 2, 0, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4 pb-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-primary">Lịch sử làm đẹp</h4>
                    <button className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline">Xem tất cả</button>
                  </div>
                  <div className="space-y-4">
                    {(selectedCustomer.history || []).map((visit: any, idx: number) => (
                      <div key={idx} className="flex gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100 group hover:border-secondary/20 transition-all">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
                          <Clock size={20} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-xs font-bold text-primary">{visit.service}</p>
                            <p className="text-xs font-bold text-primary">{visit.price}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[10px] text-stone-400 font-medium">{visit.date} • Thợ: {visit.stylist}</p>
                            <CheckCircle2 size={14} className="text-green-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-stone-50 border-t border-stone-100">
                <button className="w-full py-4 bg-stone-900 text-white rounded-2xl text-sm font-bold shadow-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2">
                  <PlayCircle size={18} /> Xem ghi chú kỹ thuật (Color Formula)
                </button>
              </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
