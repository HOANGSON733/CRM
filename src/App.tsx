/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Scissors, 
  ClipboardList, 
  BarChart3, 
  Megaphone, 
  CreditCard, 
  Settings, 
  Search,
  Bell,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { View } from './types';

// Components
import { SidebarItem } from './components/SidebarItem';
import { DashboardView } from './components/views/DashboardView';
import { AppointmentsView } from './components/views/AppointmentsView';
import { CustomersView } from './components/views/CustomersView';
import { EmployeesView } from './components/views/EmployeesView';
import { EmployeeProfileView } from './components/views/EmployeeProfileView';
import { ServicesView } from './components/views/ServicesView';
import { ReportsView } from './components/views/ReportsView';
import { POSView } from './components/views/POSView';
import { SettingsView } from './components/views/SettingsView';
import { LoginView } from './components/views/LoginView';
import { NewAppointmentModal } from './components/modals/NewAppointmentModal';
import { NewCustomerModal } from './components/modals/NewCustomerModal';
import { DeleteCustomerModal } from './components/modals/DeleteCustomerModal';
import { AddShiftModal } from './components/modals/AddShiftModal';
import { NewEmployeeModal } from './components/modals/NewEmployeeModal';
import { TerminateEmployeeModal } from './components/modals/TerminateEmployeeModal';
import { NewServiceModal } from './components/modals/NewServiceModal';
import { EditServiceModal } from './components/modals/EditServiceModal';
import { DeleteServiceModal } from './components/modals/DeleteServiceModal';
import { Employee, Service } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ role: 'admin' | 'manager' | 'stylist' | 'cashier'; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<View>('dashboard');
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [isAddShiftModalOpen, setIsAddShiftModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  if (!isLoggedIn) {
    return (
      <LoginView
        onLogin={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-stone-100 flex flex-col sticky top-0 h-screen">
        <div className="p-10">
          <h1 className="text-2xl font-serif tracking-tighter text-primary leading-none">THE EDITORIAL<br/>ATELIER</h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-3 font-bold">LUXURY HAIR SALON CRM</p>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Tổng quan" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem 
            icon={<CalendarDays size={20} />} 
            label="Lịch hẹn" 
            active={activeTab === 'appointments'} 
            onClick={() => setActiveTab('appointments')}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Khách hàng" 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')}
          />
          <SidebarItem 
            icon={<Scissors size={20} />} 
            label="Nhân viên" 
            active={activeTab === 'employees' || activeTab === 'employee-profile'}
            onClick={() => setActiveTab('employees')}
          />
          <SidebarItem 
            icon={<ClipboardList size={20} />} 
            label="Dịch vụ & Giá" 
            active={activeTab === 'services'}
            onClick={() => setActiveTab('services')}
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Báo cáo" 
            active={activeTab === 'reports'}
            onClick={() => setActiveTab('reports')}
          />
          <SidebarItem icon={<Megaphone size={20} />} label="Tích điểm & Marketing" />
          <SidebarItem 
            icon={<CreditCard size={20} />} 
            label="POS & Thanh toán" 
            active={activeTab === 'pos'}
            onClick={() => setActiveTab('pos')}
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Hệ thống" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="p-8 border-t border-stone-50 space-y-4">
          <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif">A</div>
            <div className="flex-1">
              <p className="text-xs font-bold text-primary">{currentUser?.name || 'Người dùng'}</p>
              <p className="text-[10px] text-stone-400 uppercase">
                {currentUser?.role === 'admin'
                  ? 'Quản trị hệ thống'
                  : currentUser?.role === 'manager'
                  ? 'Quản lý'
                  : currentUser?.role === 'stylist'
                  ? 'Stylist'
                  : 'Thu ngân'}
              </p>
            </div>
            <LogOut 
              size={16} 
              className="text-stone-300 hover:text-red-500 cursor-pointer transition-colors" 
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
              }}
            />
          </div>
          <button 
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="w-full bg-primary text-white py-4 rounded-2xl text-xs font-bold shadow-xl hover:bg-primary-light transition-all active:scale-95"
          >
            Đặt lịch mới
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-stone-50/30 overflow-y-auto">
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-stone-100 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm nhanh (Cmd + K)..." 
              className="w-full bg-stone-100/50 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Hệ thống ổn định</span>
            </div>
            <button className="relative p-2 text-stone-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-stone-400 hover:text-primary transition-colors">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <DashboardView key="dashboard" onNewCustomer={() => setIsNewCustomerModalOpen(true)} />
          ) : activeTab === 'appointments' ? (
            <AppointmentsView key="appointments" onNewAppointment={() => setIsNewAppointmentModalOpen(true)} />
          ) : activeTab === 'customers' ? (
            <CustomersView 
              key="customers" 
              onNewCustomer={() => setIsNewCustomerModalOpen(true)} 
              onDeleteCustomer={(customer) => setCustomerToDelete(customer)}
            />
          ) : activeTab === 'employees' ? (
            <EmployeesView 
              key="employees" 
              onNewEmployee={() => setIsNewEmployeeModalOpen(true)} 
              onViewProfile={(emp) => {
                setSelectedEmployee(emp);
                setActiveTab('employee-profile');
              }} 
            />
          ) : activeTab === 'employee-profile' && selectedEmployee ? (
            <EmployeeProfileView 
              key="employee-profile"
              employee={selectedEmployee}
              onBack={() => setActiveTab('employees')}
              onAddShift={() => setIsAddShiftModalOpen(true)}
              onTerminate={() => setIsTerminateModalOpen(true)}
            />
          ) : activeTab === 'services' ? (
            <ServicesView 
              key="services" 
              onNewService={() => setIsNewServiceModalOpen(true)} 
              onEditService={(service) => setServiceToEdit(service)}
              onDeleteService={(service) => setServiceToDelete(service)}
            />
          ) : activeTab === 'reports' ? (
            <ReportsView key="reports" />
          ) : activeTab === 'pos' ? (
            <POSView key="pos" />
          ) : activeTab === 'settings' ? (
            <SettingsView key="settings" />
          ) : null}
        </AnimatePresence>
      </main>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {isNewAppointmentModalOpen && (
          <NewAppointmentModal onClose={() => setIsNewAppointmentModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* New Customer Modal */}
      <AnimatePresence>
        {isNewCustomerModalOpen && (
          <NewCustomerModal onClose={() => setIsNewCustomerModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Delete Customer Modal */}
      <AnimatePresence>
        {customerToDelete && (
          <DeleteCustomerModal 
            customer={customerToDelete} 
            onClose={() => setCustomerToDelete(null)} 
          />
        )}
      </AnimatePresence>

      {/* Add Shift Modal */}
      <AnimatePresence>
        {isAddShiftModalOpen && selectedEmployee && (
          <AddShiftModal 
            isOpen={isAddShiftModalOpen}
            onClose={() => setIsAddShiftModalOpen(false)}
            employeeName={selectedEmployee.name}
          />
        )}
      </AnimatePresence>

      {/* New Employee Modal */}
      <AnimatePresence>
        {isNewEmployeeModalOpen && (
          <NewEmployeeModal onClose={() => setIsNewEmployeeModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Terminate Employee Modal */}
      <AnimatePresence>
        {isTerminateModalOpen && selectedEmployee && (
          <TerminateEmployeeModal 
            employee={selectedEmployee}
            onClose={() => setIsTerminateModalOpen(false)}
            onConfirm={(type) => {
              console.log('Terminating employee:', selectedEmployee.name, 'Type:', type);
              setIsTerminateModalOpen(false);
              setActiveTab('employees');
            }}
          />
        )}
      </AnimatePresence>

      {/* New Service Modal */}
      <AnimatePresence>
        {isNewServiceModalOpen && (
          <NewServiceModal onClose={() => setIsNewServiceModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {serviceToEdit && (
          <EditServiceModal 
            service={serviceToEdit}
            onClose={() => setServiceToEdit(null)}
            onConfirm={(updated) => {
              console.log('Updating service:', updated.name);
              setServiceToEdit(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Service Modal */}
      <AnimatePresence>
        {serviceToDelete && (
          <DeleteServiceModal 
            service={serviceToDelete}
            onClose={() => setServiceToDelete(null)}
            onConfirm={() => {
              console.log('Deleting service:', serviceToDelete.name);
              setServiceToDelete(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
