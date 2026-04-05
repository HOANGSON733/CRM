import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign, 
  RefreshCcw, 
  FileText, 
  Download, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  UserX,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../../lib/utils';

const revenueData = [
  { name: '01 TH12', actual: 4000, target: 4500 },
  { name: '07 TH12', actual: 3000, target: 4200 },
  { name: '14 TH12', actual: 5000, target: 4800 },
  { name: '21 TH12', actual: 4500, target: 5000 },
  { name: '28 TH12', actual: 6000, target: 5500 },
  { name: '31 TH12', actual: 7500, target: 6000 },
];

const customerData = [
  { name: 'Khách quay lại', value: 65, color: '#4a0e0e' },
  { name: 'Khách mới', value: 35, color: '#c5a059' },
];

const serviceReports = [
  { 
    id: 1, 
    name: 'Nhuộm Balayage Cao Cấp', 
    quantity: 142, 
    revenue: '42.600.000', 
    growth: 18.5, 
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 2, 
    name: 'Cắt & Tạo Kiểu Nghệ Thuật', 
    quantity: 328, 
    revenue: '31.160.000', 
    growth: 5.2, 
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 3, 
    name: 'Gội Đầu Dưỡng Sinh & Massage', 
    quantity: 456, 
    revenue: '27.360.000', 
    growth: 24.1, 
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 4, 
    name: 'Uốn/Duỗi Keratin Phục Hồi', 
    quantity: 95, 
    revenue: '28.500.000', 
    growth: -2.4, 
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=200' 
  },
];

export function ReportsView() {
  const [timeFilter, setTimeFilter] = useState('Tháng này');
  const [reportTab, setReportTab] = useState('Theo dịch vụ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10 space-y-10 bg-[#fdfcfb]"
    >
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-serif text-primary">Báo Cáo Kinh Doanh</h2>
          <p className="text-stone-500">Theo dõi hiệu suất salon của bạn theo thời gian thực.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-stone-100">
          {['Hôm nay', 'Tuần này', 'Tháng này', 'Tùy chỉnh'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                timeFilter === filter 
                  ? "bg-primary text-white shadow-md" 
                  : "text-stone-400 hover:text-primary hover:bg-stone-50"
              )}
            >
              {filter === 'Tùy chỉnh' && <Calendar size={14} className="inline mr-2" />}
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="TỔNG DOANH THU" 
          value="158.420.000 đ" 
          trend="+12.5% so với tháng trước" 
          trendUp={true}
          icon={<DollarSign size={20} />}
        />
        <KPICard 
          label="KHÁCH PHỤC VỤ" 
          value="1.248" 
          trend="+4.2% so với tháng trước" 
          trendUp={true}
          icon={<Users size={20} />}
        />
        <KPICard 
          label="TỶ LỆ QUAY LẠI" 
          value="68.5%" 
          trend="Ổn định mục tiêu tháng" 
          trendUp={null}
          icon={<RefreshCcw size={20} />}
        />
        <KPICard 
          label="TỶ LỆ HỦY LỊCH" 
          value="3.2%" 
          trend="-1.5% Giảm đáng kể" 
          trendUp={true}
          icon={<Calendar size={20} />}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-serif text-primary">Doanh thu theo thời gian</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">THỰC TẾ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">MỤC TIÊU</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a0e0e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4a0e0e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#a8a29e', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#a8a29e', fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '1rem', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '1rem'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#4a0e0e" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorActual)" 
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#c5a059" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Classification */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 space-y-8">
          <h3 className="text-xl font-serif text-primary">Phân loại khách hàng</h3>
          <div className="flex items-center justify-between gap-8">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-serif text-primary">1.2k</span>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỔNG CỘNG</span>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              {customerData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-stone-600">{item.name}</span>
                    <span className="text-sm font-bold text-primary">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Status */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 space-y-8">
          <h3 className="text-xl font-serif text-primary">Trạng thái lịch hẹn</h3>
          <div className="space-y-8">
            <StatusProgress 
              icon={<CheckCircle2 size={20} className="text-green-500" />}
              label="Đã hoàn thành"
              value={842}
              percentage={82}
              color="bg-green-500"
            />
            <StatusProgress 
              icon={<XCircle size={20} className="text-red-500" />}
              label="Đã hủy"
              value={156}
              percentage={15}
              color="bg-red-500"
            />
            <StatusProgress 
              icon={<UserX size={20} className="text-amber-500" />}
              label="Khách vắng mặt"
              value={32}
              percentage={3}
              color="bg-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Detailed Table Section */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-10 flex justify-between items-center border-b border-stone-50">
          <div className="flex gap-8">
            {['Theo dịch vụ', 'Theo nhân viên'].map((tab) => (
              <button
                key={tab}
                onClick={() => setReportTab(tab)}
                className={cn(
                  "text-sm font-bold transition-all relative pb-2",
                  reportTab === tab 
                    ? "text-primary" 
                    : "text-stone-400 hover:text-stone-600"
                )}
              >
                {tab}
                {reportTab === tab && (
                  <motion.div 
                    layoutId="tabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-light transition-all">
              <FileText size={16} /> Tải PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-600 rounded-xl text-xs font-bold hover:bg-stone-50 transition-all">
              <Download size={16} /> Xuất CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-10 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest">TÊN DỊCH VỤ</th>
                <th className="px-10 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest">SỐ LƯỢNG</th>
                <th className="px-10 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest">DOANH THU</th>
                <th className="px-10 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest">% TĂNG TRƯỞNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {serviceReports.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/30 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-primary">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm font-bold text-stone-600">{item.quantity}</td>
                  <td className="px-10 py-6 text-sm font-bold text-primary">{item.revenue} đ</td>
                  <td className="px-10 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold",
                      item.growth > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {item.growth > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(item.growth)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 text-center border-t border-stone-50">
          <button className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 mx-auto">
            XEM TẤT CẢ BÁO CÁO CHI TIẾT <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function KPICard({ label, value, trend, trendUp, icon }: { label: string, value: string, trend: string, trendUp: boolean | null, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-4">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</span>
        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-2xl font-serif text-primary">{value}</h4>
        <div className="flex items-center gap-1">
          {trendUp !== null && (
            trendUp ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />
          )}
          <span className={cn(
            "text-[10px] font-bold",
            trendUp === null ? "text-stone-400" : trendUp ? "text-green-500" : "text-red-500"
          )}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusProgress({ icon, label, value, percentage, color }: { icon: React.ReactNode, label: string, value: number, percentage: number, color: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-bold text-stone-600">{label}</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-primary">{value}</span>
          <span className="text-[10px] font-bold text-stone-400 ml-1">({percentage}%)</span>
        </div>
      </div>
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}
