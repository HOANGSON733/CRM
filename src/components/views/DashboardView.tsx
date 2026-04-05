import React from 'react';
import { motion } from 'motion/react';
import { Plus, ChevronDown } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { KPICard } from '../KPICard';
import { StatusBadge } from '../StatusBadge';
import { weeklyRevenueData, serviceAllocationData, dashboardAppointments } from '../../data/mockData';
import { cn } from '../../lib/utils';

interface DashboardViewProps {
  onNewCustomer: () => void;
  key?: string;
}

export function DashboardView({ onNewCustomer }: DashboardViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-serif text-primary mb-2">Chào buổi sáng, Admin</h2>
          <p className="text-stone-500">Hôm nay là Thứ Ba, ngày 24 tháng 10 năm 2023</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onNewCustomer}
            className="bg-white border border-secondary text-secondary px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-secondary/5 transition-colors"
          >
            <Plus size={16} />
            Thêm khách hàng
          </button>
          <button className="bg-stone-100 text-primary px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-stone-200 transition-colors">
            <Plus size={16} />
            Khách vãng lai
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <KPICard title="Doanh thu hôm nay" value="15.000.000 ₫" trend="+12%" color="primary" />
        <KPICard title="Tổng lịch hẹn" value="24" subtitle="Hôm nay" color="secondary" />
        <KPICard title="Khách mới" value="42" subtitle="Tháng này" color="stone" />
        <KPICard title="Đánh giá trung bình" value="4.9/5" rating color="secondary-light" />
      </div>

      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="col-span-2 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-serif text-xl text-primary">Doanh thu theo tuần</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-stone-400 cursor-pointer">
              7 ngày qua <ChevronDown size={14} />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#4d0216" radius={[4, 4, 0, 0]} barSize={40} className="opacity-20 hover:opacity-100 transition-opacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col">
          <h4 className="font-serif text-xl text-primary mb-8">Phân bổ dịch vụ</h4>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceAllocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {serviceAllocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif text-primary">45%</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Cắt tóc</span>
            </div>
          </div>
          <div className="mt-auto space-y-3">
            {serviceAllocationData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-stone-600">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-serif text-xl text-primary">Lịch hẹn hôm nay</h4>
            <button className="text-secondary text-xs font-bold uppercase tracking-widest hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-6">
            {dashboardAppointments.map((apt) => (
              <div key={apt.id} className={cn("flex items-center gap-6 p-4 rounded-lg transition-colors", apt.status === 'in-progress' ? "bg-secondary/5" : "hover:bg-stone-50")}>
                <span className={cn("text-xs font-bold w-12", apt.status === 'in-progress' ? "text-secondary" : "text-stone-400")}>{apt.time}</span>
                <div className="flex flex-1 items-center gap-4">
                  <img src={apt.avatar} alt={apt.stylist} className={cn("w-10 h-10 rounded-full object-cover", apt.status === 'completed' && "grayscale")} />
                  <div>
                    <p className="text-sm font-bold text-primary">Thợ: {apt.stylist}</p>
                    <p className="text-xs text-stone-500">Khách: {apt.customer}</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-stone-600 flex-1">{apt.service}</p>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary p-8 rounded-xl text-white text-center shadow-lg relative overflow-hidden flex flex-col justify-center">
          <p className="font-serif italic text-lg mb-4">"Cái đẹp bắt đầu từ khoảnh khắc bạn quyết định là chính mình."</p>
          <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">COCO CHANEL</p>
        </div>
      </div>
    </motion.div>
  );
}
