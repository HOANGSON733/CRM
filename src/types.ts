export type View = 'dashboard' | 'appointments' | 'customers' | 'employees' | 'employee-profile' | 'services' | 'reports' | 'pos' | 'settings' | 'login';

export interface Customer {
  id: number;
  name: string;
  tags: string[];
  phone: string;
  email: string;
  lastVisit: string;
  avatar: string;
  memberSince?: string;
  points?: number;
  maxPoints?: number;
  spendingData?: { month: string; value: number }[];
  history?: { date: string; service: string; stylist: string; price: string }[];
}

export interface Appointment {
  id: number;
  time: string;
  stylist: string;
  customer: string;
  service: string;
  status: 'confirmed' | 'in-progress' | 'completed';
  avatar: string;
}

export interface ScheduleItem {
  id: number;
  start: string;
  end: string;
  customer: string;
  service: string;
  stylist: string;
  top: number;
  height: number;
  color: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  status: 'available' | 'busy';
  specialties: string[];
  bio?: string;
  monthlyRevenue?: string;
  rebookingRate?: string;
  certificates?: { title: string; location: string; icon: string }[];
  weeklySchedule?: { day: string; shift: string; time: string; type?: string }[];
  commissions?: { service: string; count: number; amount: string }[];
}

export interface ServiceCategory {
  id: number;
  name: string;
  icon: string;
  services: Service[];
}

export interface Service {
  id: number;
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  category: string;
  popularity?: number;
}
