import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  UserPlus, 
  Trash2, 
  Plus, 
  Package, 
  Scissors, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Ticket, 
  CheckCircle2, 
  ChevronDown,
  Info
} from 'lucide-react';
import { WalkInCustomerModal } from '../modals/WalkInCustomerModal';
import { PaymentSuccessModal } from '../modals/PaymentSuccessModal';
import { cn } from '../../lib/utils';

interface OrderItem {
  id: number;
  name: string;
  subtitle?: string;
  staff?: string;
  quantity: number;
  price: number;
  type: 'service' | 'product';
}

const initialOrderItems: OrderItem[] = [
  { id: 1, name: 'Cắt tóc nữ', subtitle: '45m | 150.000đ', staff: 'Minh Châu', quantity: 1, price: 150000, type: 'service' },
  { id: 2, name: 'Nhuộm Balayage', subtitle: '120m | 850.000đ', staff: 'Lệ Hằng', quantity: 1, price: 850000, type: 'service' },
  { id: 3, name: 'Dầu gội Wella Repair', subtitle: 'Sản phẩm | 220.000đ', quantity: 1, price: 220000, type: 'product' },
];

export function POSView() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialOrderItems);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr' | 'voucher'>('cash');
  const [receivedAmount, setReceivedAmount] = useState('1500000');
  const [isVatEnabled, setIsVatEnabled] = useState(false);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [isWalkIn, setIsWalkIn] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const walkInItems: OrderItem[] = [
    { id: 1, name: 'Cắt tóc nữ', subtitle: '45m | 150.000đ', staff: 'Minh Châu', quantity: 1, price: 150000, type: 'service' },
    { id: 2, name: 'Gội đầu', subtitle: '30m | 80.000đ', staff: 'Anh Tuấn', quantity: 1, price: 80000, type: 'service' },
  ];

  const subtotal = isWalkIn 
    ? walkInItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    : orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discount = isWalkIn ? 0 : subtotal * 0.1; // 10% Gold Member
  const vat = isVatEnabled ? (subtotal - discount) * 0.1 : 0;
  const total = subtotal - discount + vat;
  const currentReceivedAmount = isWalkIn && receivedAmount === '1500000' ? total.toString() : receivedAmount;
  const change = parseInt(currentReceivedAmount) - total;

  const handleNumberClick = (num: string) => {
    setReceivedAmount(prev => prev === '0' ? num : prev + num);
  };

  const handleClear = () => setReceivedAmount('0');

  const handleQuickAmount = (amount: number) => {
    setReceivedAmount(amount.toString());
  };

  return (
    <div className="flex h-full bg-[#f8f5f0] overflow-hidden">
      {/* Left Column - Order Details */}
      <div className="flex-1 flex flex-col p-8 space-y-6 overflow-y-auto">
        {/* Top Search & Action */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm theo tên hoặc số điện thoại..."
              className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
          <button 
            onClick={() => {
              setIsWalkIn(!isWalkIn);
              if (!isWalkIn) setReceivedAmount('230000');
            }}
            className={cn(
              "px-8 py-4 rounded-2xl text-sm font-bold shadow-sm transition-all flex items-center gap-2",
              isWalkIn ? "bg-primary text-white" : "bg-white text-stone-600 hover:bg-stone-50"
            )}
          >
            KHÁCH VÃNG LAI
          </button>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 flex items-center gap-6">
          <div className="w-16 h-16 bg-stone-100 rounded-full overflow-hidden flex items-center justify-center text-stone-400">
            {isWalkIn ? (
              <UserPlus size={24} />
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                alt="Customer" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-serif text-primary">
                {isWalkIn ? 'Khách vãng lai' : 'Nguyễn Thị Lan'}
              </h3>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                isWalkIn ? "bg-stone-100 text-stone-400" : "bg-secondary/10 text-secondary"
              )}>
                {isWalkIn ? 'CHƯA TÍCH ĐIỂM' : 'VIP'}
              </span>
              {!isWalkIn && <span className="text-stone-400 text-xs ml-2">090xxxx123</span>}
            </div>
            <p className="text-xs text-stone-400">
              {isWalkIn 
                ? 'Khách vãng lai không được tích điểm thành viên' 
                : 'Ghé thăm gần nhất: 15 ngày trước'}
            </p>
          </div>
          {!isWalkIn && (
            <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-4 border border-stone-100">
              <div className="text-right">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">LỊCH HẸN HÔM NAY (14:00)</p>
                <p className="text-sm font-bold text-primary">Cắt + Nhuộm Balayage</p>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-primary-light transition-all">
                TỰ ĐỘNG ĐIỀN
              </button>
            </div>
          )}
          {isWalkIn && (
            <button 
              onClick={() => setIsWalkInModalOpen(true)}
              className="bg-stone-50 text-stone-400 p-4 rounded-2xl border border-stone-100 hover:text-primary transition-all"
            >
              <UserPlus size={20} />
            </button>
          )}
        </div>

        {/* Order Items Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between items-center border-b border-stone-50">
            <h3 className="text-lg font-serif text-primary">Chi tiết đơn hàng</h3>
            <div className="flex gap-3">
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:bg-primary-light transition-all">
                <Scissors size={14} /> + Dịch vụ
              </button>
              <button className="bg-white border border-stone-200 text-stone-600 px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-stone-50 transition-all">
                <Package size={14} /> + Sản phẩm
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest w-16">STT</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">TÊN</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">THỢ PHỤ TRÁCH</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest w-16">SL</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">THÀNH TIỀN</th>
                  <th className="px-6 py-4 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {(isWalkIn ? walkInItems : orderItems).map((item, index) => (
                  <tr key={item.id} className="hover:bg-stone-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-stone-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-primary">{item.name}</p>
                        <p className="text-[10px] text-stone-400">{item.subtitle}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.staff ? (
                        <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-[10px] font-bold">{item.staff}</span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-stone-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary text-right">{item.price.toLocaleString()}đ</td>
                    <td className="px-6 py-4">
                      <button className="text-stone-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary Footer */}
          <div className="p-8 bg-stone-50/50 border-t border-stone-50 grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Tạm tính</span>
                <span className="text-sm font-bold text-primary">{subtotal.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Khuyến mãi</span>
                <span className={cn(
                  "text-sm font-bold uppercase tracking-wider",
                  isWalkIn ? "text-stone-300" : "text-secondary"
                )}>
                  {isWalkIn ? 'KHÔNG ÁP DỤNG' : 'GOLD MEMBER (-10%)'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-500">VAT (10%)</span>
                  <button 
                    onClick={() => setIsVatEnabled(!isVatEnabled)}
                    className={cn(
                      "w-10 h-5 rounded-full transition-all relative p-1",
                      isVatEnabled ? "bg-secondary" : "bg-stone-200"
                    )}
                  >
                    <div className={cn(
                      "w-3 h-3 bg-white rounded-full transition-all",
                      isVatEnabled ? "translate-x-5" : "translate-x-0"
                    )} />
                  </button>
                </div>
                <span className="text-sm font-bold text-primary">{vat.toLocaleString()} đ</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Tiền Tip</span>
                <div className="flex gap-2">
                  {[0, 5, 10].map(p => (
                    <button 
                      key={p}
                      onClick={() => setTipPercent(p)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-bold border transition-all",
                        tipPercent === p ? "bg-primary text-white border-primary" : "bg-white text-stone-400 border-stone-200"
                      )}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-stone-400 text-right italic">Stylist nhận Tip: <span className="font-bold text-primary">{isWalkIn ? 'Minh Châu' : 'Lệ Hằng'}</span></p>
              <div className="h-px bg-stone-200 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">ĐIỂM TÍCH LŨY</span>
                {isWalkIn ? (
                  <span className="text-xs font-bold text-stone-300 italic">Không áp dụng cho khách vãng lai</span>
                ) : (
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">1250 <span className="text-green-500">+134</span> = 1384 pts</p>
                    <div className="w-48 h-1 bg-stone-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-secondary w-[80%]" />
                    </div>
                    <p className="text-[9px] text-stone-400 mt-1">Cần thêm 116 điểm để đạt hạng PLATINUM</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Payment Sidebar */}
      <div className="w-[450px] bg-white border-l border-stone-100 flex flex-col shadow-2xl z-10">
        <div className="p-10 space-y-10 flex-1 overflow-y-auto">
          {/* Total Section */}
          <div className="text-center space-y-2 py-8 bg-stone-50 rounded-[2.5rem] border border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TỔNG CỘNG THANH TOÁN</p>
            <h2 className="text-4xl font-serif text-primary">{total.toLocaleString()} đ</h2>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">HÌNH THỨC THANH TOÁN</h4>
              <button className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-widest">
                <RefreshCcw size={12} /> CHIA ĐÔI THANH TOÁN
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <PaymentMethodButton 
                active={paymentMethod === 'cash'} 
                onClick={() => setPaymentMethod('cash')}
                icon={<Banknote size={24} />}
                label="TIỀN MẶT"
              />
              <PaymentMethodButton 
                active={paymentMethod === 'card'} 
                onClick={() => setPaymentMethod('card')}
                icon={<CreditCard size={24} />}
                label="THẺ NGÂN HÀNG"
              />
              <PaymentMethodButton 
                active={paymentMethod === 'qr'} 
                onClick={() => setPaymentMethod('qr')}
                icon={<QrCode size={24} />}
                label="QR CODE"
              />
              <PaymentMethodButton 
                active={paymentMethod === 'voucher'} 
                onClick={() => setPaymentMethod('voucher')}
                icon={<Ticket size={24} />}
                label="VOUCHER"
              />
            </div>
          </div>

          {/* Amount Received & Change */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SỐ TIỀN NHẬN</span>
              <span className="text-3xl font-serif text-primary">{parseInt(currentReceivedAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TIỀN THỐI</span>
              <span className={cn(
                "text-2xl font-serif",
                change >= 0 ? "text-green-600" : "text-red-500"
              )}>
                {change.toLocaleString()} đ
              </span>
            </div>
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3].map(n => <NumberButton key={n} label={n.toString()} onClick={() => handleNumberClick(n.toString())} />)}
            <button 
              onClick={() => handleQuickAmount(total)}
              className="row-span-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-2xl text-xs font-bold hover:bg-secondary/20 transition-all"
            >
              CHẴN TIỀN
            </button>
            {[4, 5, 6].map(n => <NumberButton key={n} label={n.toString()} onClick={() => handleNumberClick(n.toString())} />)}
            <button 
              onClick={() => handleQuickAmount(500000)}
              className="bg-stone-50 text-stone-600 rounded-2xl text-xs font-bold hover:bg-stone-100 transition-all"
            >
              500.000
            </button>
            {[7, 8, 9].map(n => <NumberButton key={n} label={n.toString()} onClick={() => handleNumberClick(n.toString())} />)}
            <button 
              onClick={() => handleQuickAmount(200000)}
              className="bg-stone-50 text-stone-600 rounded-2xl text-xs font-bold hover:bg-stone-100 transition-all"
            >
              200.000
            </button>
            <div />
            <NumberButton label="0" onClick={() => handleNumberClick('0')} />
            <NumberButton label="C" onClick={handleClear} />
            <div />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-10 pt-0 space-y-6">
          <button 
            onClick={() => setIsSuccessModalOpen(true)}
            className="w-full bg-primary text-white py-6 rounded-[2rem] text-sm font-bold shadow-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <CheckCircle2 size={20} />
            XÁC NHẬN THANH TOÁN
          </button>
          <button className="w-full text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors">
            HỦY GIAO DỊCH
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isWalkInModalOpen && (
          <WalkInCustomerModal 
            onClose={() => setIsWalkInModalOpen(false)}
            onSave={async (data) => {
              console.log('Saving walk-in customer:', data);
              setIsWalkInModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuccessModalOpen && (
          <PaymentSuccessModal 
            onClose={() => setIsSuccessModalOpen(false)}
            amount={total.toLocaleString()}
            customerName={isWalkIn ? 'Khách vãng lai' : 'Nguyễn Thị Lan'}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentMethodButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center justify-center gap-3",
        active 
          ? "bg-white border-primary text-primary shadow-xl scale-105" 
          : "bg-stone-50 border-transparent text-stone-400 hover:bg-white hover:border-stone-200"
      )}
    >
      {icon}
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function NumberButton({ label, onClick, key }: { label: string, onClick: () => void, key?: string | number }) {
  return (
    <button 
      onClick={onClick}
      className="h-14 bg-stone-50 text-stone-600 rounded-2xl text-lg font-bold hover:bg-stone-100 transition-all active:scale-95"
    >
      {label}
    </button>
  );
}

function RefreshCcw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
