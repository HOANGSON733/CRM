import { Customer, Appointment, ScheduleItem, Employee, ServiceCategory, Product } from '../types';
export const productsData: Product[] = [
  {
    id: 1,
    name: 'Serum Keratin Phục Hồi',
    brand: 'Bella Luxury Care',
    category: 'SERUM & TINH DẦU',
    sellingPrice: '450.000',
    costPrice: '310.000',
    stock: 12,
    maxStock: 20,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400',
    status: 'in-stock'
  },
  {
    id: 2,
    name: 'Gội Xả Thảo Mộc',
    brand: 'Botanical Care',
    category: 'TINH DẦU',
    sellingPrice: '320.000',
    costPrice: '220.000',
    stock: 5,
    maxStock: 10,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400',
    status: 'in-stock'
  }
];
export const servicesData: ServiceCategory[] = [
  {
    id: 1,
    name: "Cắt & Tạo Kiểu",
    icon: "Scissors",
    services: [
      {
        id: 101,
        name: "Cắt Tóc Thiết Kế (Nữ)",
        duration: "60 phút",
        price: "850.000",
        description: "Tư vấn kiểu tóc phù hợp khuôn mặt, gội đầu thư giãn và sấy tạo kiểu.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400",
        category: "Cắt & Tạo Kiểu",
        popularity: 95
      },
      {
        id: 102,
        name: "Cắt Tóc Nam (Barber Style)",
        duration: "45 phút",
        price: "450.000",
        description: "Cắt tóc nam phong cách hiện đại, tỉa râu và gội đầu.",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400",
        category: "Cắt & Tạo Kiểu",
        popularity: 88
      },
      {
        id: 103,
        name: "Sấy Tạo Kiểu Sự Kiện",
        duration: "45 phút",
        price: "350.000",
        description: "Sấy phồng, uốn giả hoặc tạo kiểu tóc cho các buổi tiệc.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
        category: "Cắt & Tạo Kiểu",
        popularity: 82
      },
      {
        id: 104,
        name: "Cắt Tóc Trẻ Em",
        duration: "30 phút",
        price: "250.000",
        cost: "80.000",
        commissionRate: 20,
        description: "Cắt tóc cho bé với không gian thân thiện.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
        category: "Cắt & Tạo Kiểu",
        popularity: 75,
        tags: ["#kids", "#nhanh"],
        gender: "unisex"
      }
    ]
  },
  {
    id: 2,
    name: "Hóa Chất (Nhuộm/Uốn)",
    icon: "Droplets",
    services: [
      {
        id: 201,
        name: "Nhuộm Balayage/Ombre",
        duration: "180 phút",
        price: "2.500.000",
        description: "Kỹ thuật nhuộm loang màu tự nhiên, bao gồm tẩy tóc nhẹ và dưỡng phục hồi.",
        image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=400",
        category: "Hóa Chất",
        popularity: 92
      },
      {
        id: 202,
        name: "Uốn Sóng Nước Organic",
        duration: "150 phút",
        price: "1.800.000",
        description: "Sử dụng thuốc uốn organic không gây hại tóc, tạo sóng tự nhiên.",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=400",
        category: "Hóa Chất",
        popularity: 85
      }
    ]
  },
  {
    id: 3,
    name: "Phục Hồi & Chăm Sóc",
    icon: "Sparkles",
    services: [
      {
        id: 301,
        name: "Phục Hồi Keratin Chuyên Sâu",
        duration: "90 phút",
        price: "1.200.000",
        description: "Bổ sung keratin giúp tóc bóng mượt, giảm xơ rối ngay lập tức.",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=400",
        category: "Phục Hồi",
        popularity: 90
      },
      {
        id: 302,
        name: "Gội Đầu Dưỡng Sinh",
        duration: "60 phút",
        price: "450.000",
        description: "Gội đầu kết hợp massage bấm huyệt, giúp giảm căng thẳng.",
        image: "https://images.unsplash.com/photo-1519415510236-8559b1985602?auto=format&fit=crop&q=80&w=400",
        category: "Phục Hồi",
        popularity: 98
      }
    ]
  }
];

export const customersData: Customer[] = [
  {
    id: 1,
    name: 'Lê Thảo Nhi',
    tags: ['#VIP', '#Sinh nhật tháng này'],
    phone: '090 1234 567',
    email: 'nhi.le@gmail.com',
    lastVisit: '14/10/2023',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    memberSince: '01/2021',
    points: 4250,
    maxPoints: 5000,
    spendingData: [
      { month: 'MAY', value: 1200000 },
      { month: 'JUN', value: 1800000 },
      { month: 'JUL', value: 2500000 },
      { month: 'AUG', value: 1500000 },
      { month: 'SEP', value: 2100000 },
      { month: 'OCT', value: 2800000 },
    ],
    history: [
      { date: '14/10/2023', service: 'Nhuộm Balayage & Phục hồi Olaplex', stylist: 'Hoàng Nam', price: '3.850.000₫' },
      { date: '05/09/2023', service: 'Cắt tóc Layer & Gội đầu thảo dược', stylist: 'Hoàng Nam', price: '650.000₫' },
    ]
  },
  {
    id: 2,
    name: 'Nguyễn Minh Anh',
    tags: ['#Khách thường'],
    phone: '098 7654 321',
    email: 'minhanh.ng@hotmail.com',
    lastVisit: '02/11/2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Trần Kim Cương',
    tags: ['#Lâu không ghé'],
    phone: '091 2233 445',
    email: 'cuong.tran@gmail.com',
    lastVisit: '21/05/2023',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  }
];

export const weeklyRevenueData = [
  { name: 'T2', value: 4000000 },
  { name: 'T3', value: 6500000 },
  { name: 'T4', value: 5000000 },
  { name: 'T5', value: 8500000 },
  { name: 'T6', value: 9500000 },
  { name: 'T7', value: 7000000 },
  { name: 'CN', value: 4500000 },
];

export const serviceAllocationData = [
  { name: 'Cắt tóc', value: 45, color: '#4d0216' },
  { name: 'Nhuộm', value: 30, color: '#755b00' },
  { name: 'Uốn', value: 15, color: '#ffb2b9' },
  { name: 'Hấp', value: 10, color: '#d1d5db' },
];

export const dashboardAppointments: Appointment[] = [
  {
    id: 1,
    time: '09:00',
    stylist: 'Minh Tú',
    customer: 'Lan Hương',
    service: 'Cắt tóc & Gội đầu',
    status: 'confirmed',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    time: '10:30',
    stylist: 'Hoàng Anh',
    customer: 'Quốc Cường',
    service: 'Nhuộm Balayage',
    status: 'in-progress',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    time: '13:00',
    stylist: 'Minh Tú',
    customer: 'Diễm My',
    service: 'Uốn sóng nước',
    status: 'confirmed',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop'
  }
];

export const scheduleData: ScheduleItem[] = [
  {
    id: 102,
    start: '14:00',
    end: '15:00',
    customer: 'Lê Tú Anh',
    service: 'Thợ Hoàng',
    stylist: 'Hoàng Anh',
    top: 600,
    height: 100,
    color: 'bg-primary/10 border-primary/20 text-primary'
  }
];

export const employeesData: Employee[] = [
  {
    id: 1,
    name: 'Lê Hoàng Nam',
    role: 'Master Stylist',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    status: 'available',
    specialties: ['Chuyên Cắt & Tạo Kiểu'],
    bio: 'Chuyên gia với 8 năm kinh nghiệm trong nghệ thuật tạo hình tóc đương đại. Nam nổi tiếng với kỹ thuật cắt Layer và nhuộm Balayage chuẩn Âu, mang lại vẻ đẹp tinh tế và sang trọng cho khách hàng.',
    monthlyRevenue: '128.5M',
    rebookingRate: '82%',
    certificates: [
      { title: 'Vidal Sassoon Academy', location: 'London, 2018 - Master Haircutting', icon: 'award' },
      { title: "L'Oréal Professionnel", location: 'Color Degree - Specialist Level', icon: 'award' },
      { title: 'Toni & Guy Advanced', location: 'Singapore, 2021 - Creative Styling', icon: 'award' }
    ],
    weeklySchedule: [
      { day: 'T2', shift: 'CA SÁNG', time: '09:00 - 14:00' },
      { day: 'T3', shift: 'CA CHIỀU', time: '14:00 - 21:00' },
      { day: 'T4', shift: 'CA SÁNG', time: '09:00 - 14:00' },
      { day: 'T5', shift: 'NGHỈ PHÉP', time: '' },
      { day: 'T6', shift: 'CA CHIỀU', time: '14:00 - 21:00' },
      { day: 'T7', shift: 'CA GÃY', time: 'FULL DAY', type: 'danger' },
      { day: 'CN', shift: 'CA GÃY', time: 'FULL DAY', type: 'danger' }
    ],
    commissions: [
      { service: 'Cắt Tóc Design', count: 15, amount: '2.250k' },
      { service: 'Nhuộm Phức Tạp', count: 8, amount: '4.800k' },
      { service: 'Uốn Setting', count: 12, amount: '3.450k' }
    ]
  },
  {
    id: 2,
    name: 'Nguyễn Thu Thảo',
    role: 'Senior Artist',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    status: 'busy',
    specialties: ['Chuyên Nhuộm Balayage']
  },
  {
    id: 3,
    name: 'Trần Minh Quân',
    role: 'Master Barber',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    status: 'available',
    specialties: ['Chuyên Cắt Fade']
  },
  {
    id: 4,
    name: 'Phạm Mỹ Linh',
    role: 'Senior Stylist',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    status: 'available',
    specialties: ['Chuyên Uốn Phồng']
  }
];

export const staffPerformanceData = [
  { name: 'Lê Hoàng Nam', value: 85, customers: 42 },
  { name: 'Nguyễn Thu Thảo', value: 92, customers: 38 },
  { name: 'Trần Minh Quân', value: 70, customers: 31 },
];
