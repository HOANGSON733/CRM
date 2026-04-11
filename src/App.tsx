/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Scissors, 
  Package,
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
import { Customer, View } from './types';

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
import { MarketingView } from './components/views/MarketingView';
import { LoginView } from './components/views/LoginView';
import { ProductsView } from './components/views/ProductsView';
import { NewAppointmentModal } from './components/modals/NewAppointmentModal';
import { NewCustomerModal } from './components/modals/NewCustomerModal';
import { DeleteCustomerModal } from './components/modals/DeleteCustomerModal';
import { AddShiftModal } from './components/modals/AddShiftModal';
import { NewEmployeeModal } from './components/modals/NewEmployeeModal';
import { TerminateEmployeeModal } from './components/modals/TerminateEmployeeModal';
import { NewServiceModal } from './components/modals/NewServiceModal';
import { NewProductModal } from './components/modals/NewProductModal';
import { DeleteProductModal } from './components/modals/DeleteProductModal';
import { EditServiceModal } from './components/modals/EditServiceModal';
import { DeleteServiceModal } from './components/modals/DeleteServiceModal';
import { ServiceDetailsModal } from './components/modals/ServiceDetailsModal';
import { NewPromoCodeModal } from './components/modals/NewPromoCodeModal';
import { Employee, Product, ProductCategoryConfig, Service, ServiceCategoryConfig } from './types';

const TAB_PATHS: Partial<Record<View, string>> = {
  dashboard: '/dashboard',
  appointments: '/appointments',
  customers: '/customers',
  employees: '/employees',
  'employee-profile': '/employees/profile',
  services: '/services',
  products: '/products',
  reports: '/reports',
  pos: '/pos',
  settings: '/settings',
  marketing: '/marketing',
  login: '/login',
};

function getTabFromPath(pathname: string): View {
  switch (pathname) {
    case '/':
    case '/dashboard':
      return 'dashboard';
    case '/appointments':
      return 'appointments';
    case '/customers':
      return 'customers';
    case '/employees':
      return 'employees';
    case '/employees/profile':
      return 'employee-profile';
    case '/services':
      return 'services';
    case '/products':
      return 'products';
    case '/reports':
      return 'reports';
    case '/pos':
      return 'pos';
    case '/settings':
      return 'settings';
    case '/marketing':
      return 'marketing';
    case '/login':
      return 'login';
    default:
      return 'dashboard';
  }
}

export default function App() {
  const [authChecking, setAuthChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [activeTab, setActiveTab] = useState<View>(() => getTabFromPath(window.location.pathname));
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isNewPromoCodeModalOpen, setIsNewPromoCodeModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [serviceToView, setServiceToView] = useState<Service | null>(null);
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [isAddShiftModalOpen, setIsAddShiftModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersTotal, setCustomersTotal] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryConfig[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategoryConfig[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productsPage, setProductsPage] = useState(1);
  const [productsTotalPages, setProductsTotalPages] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);

  const loadCustomers = async (token: string) => {
    const response = await fetch('/api/customers?page=1&pageSize=500', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tải danh sách khách hàng.');
    }
    const data = await response.json();
    setCustomers(Array.isArray(data?.customers) ? data.customers : []);
    setCustomersTotal(Number(data?.pagination?.total ?? data?.customers?.length ?? 0));
  };

  const loadEmployees = async (token: string) => {
    const response = await fetch('/api/employees', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tải danh sách nhân viên.');
    }
    const data = await response.json();
    setEmployees(Array.isArray(data?.employees) ? data.employees : []);
  };

  const loadServices = async (token: string) => {
    const response = await fetch('/api/services', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tải danh sách dịch vụ.');
    }
    const data = await response.json();
    setServices(Array.isArray(data?.services) ? data.services : []);
  };

  const loadServiceCategories = async (token: string) => {
    const response = await fetch('/api/service-categories', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tải danh mục dịch vụ.');
    }
    const data = await response.json();
    setServiceCategories(Array.isArray(data?.categories) ? data.categories : []);
  };

  const loadProducts = async (token: string, page = 1) => {
    const response = await fetch(`/api/products?page=${page}&pageSize=15`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tải danh sách sản phẩm.');
    }
    const data = await response.json();
    setProducts(Array.isArray(data?.products) ? data.products : []);
    setProductsPage(Number(data?.pagination?.page || page));
    setProductsTotalPages(Number(data?.pagination?.totalPages || 1));
    setProductsTotal(Number(data?.pagination?.total || 0));
  };

  const loadProductCategories = async (token: string) => {
    const response = await fetch('/api/product-categories', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tải danh mục sản phẩm.');
    }
    const data = await response.json();
    setProductCategories(Array.isArray(data?.categories) ? data.categories : []);
  };

  const reloadAfterPosCheckout = async () => {
    if (!authToken) return;
    try {
      await loadCustomers(authToken);
      await loadProducts(authToken, productsPage);
    } catch {
      // best-effort refresh; POS already succeeded
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      if (!authToken) {
        setIsLoggedIn(false);
        setAuthChecking(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) throw new Error('Invalid token');
        setIsLoggedIn(true);
        await loadCustomers(authToken);
        await loadEmployees(authToken);
        await loadServices(authToken);
        await loadServiceCategories(authToken);
        await loadProductCategories(authToken);
        await loadProducts(authToken, productsPage);
      } catch (_error) {
        localStorage.removeItem('auth_token');
        setAuthToken(null);
        setIsLoggedIn(false);
        setCustomers([]);
        setCustomersTotal(0);
        setEmployees([]);
        setServices([]);
        setServiceCategories([]);
        setProductCategories([]);
        setProducts([]);
        setProductsPage(1);
        setProductsTotalPages(1);
        setProductsTotal(0);
      } finally {
        setAuthChecking(false);
      }
    };

    verifyAuth();
  }, [authToken]);

  useEffect(() => {
    if (!isLoggedIn || !authToken || activeTab !== 'products') return;
    loadProducts(authToken, productsPage).catch(() => undefined);
  }, [productsPage, isLoggedIn, authToken, activeTab]);

  const handleLogin = (token: string) => {
    localStorage.setItem('auth_token', token);
    setAuthToken(token);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    if (window.location.pathname !== '/dashboard') {
      window.history.replaceState({}, '', '/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setAuthToken(null);
    setIsLoggedIn(false);
    setCustomers([]);
    setCustomersTotal(0);
    setEmployees([]);
    setServices([]);
    setServiceCategories([]);
    setProductCategories([]);
    setProducts([]);
    setProductsPage(1);
    setProductsTotalPages(1);
    setProductsTotal(0);
  };

  const handleCreateService = async (payload: Omit<Service, 'id'>) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tạo dịch vụ mới.');
    }

    await loadServices(authToken);
  };

  const handleCreateServiceCategory = async (payload: {
    name: string;
    selectedIcon: string;
    selectedColor: string;
    description: string;
    isVisible: boolean;
  }) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch('/api/service-categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tạo danh mục dịch vụ.');
    }

    await loadServiceCategories(authToken);
  };

  const handleCreateProductCategory = async (payload: {
    name: string;
    selectedIcon: string;
    selectedColor: string;
    description: string;
    isVisible: boolean;
  }) => {
    if (!authToken) throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    const response = await fetch('/api/product-categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tạo danh mục sản phẩm.');
    }
    await loadProductCategories(authToken);
  };

  const handleUpdateServiceCategory = async (
    id: string | number,
    payload: {
      name: string;
      selectedIcon: string;
      selectedColor: string;
      description: string;
      isVisible: boolean;
    }
  ) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }
    const response = await fetch(`/api/service-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể cập nhật danh mục dịch vụ.');
    }
    await loadServiceCategories(authToken);
    await loadServices(authToken);
  };

  const handleDeleteServiceCategory = async (id: string | number, replacementCategoryName?: string) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }
    const response = await fetch(`/api/service-categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ replacementCategoryName }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể xóa danh mục dịch vụ.');
    }
    await loadServiceCategories(authToken);
    await loadServices(authToken);
  };

  const handleUpdateProductCategory = async (
    id: string | number,
    payload: {
      name: string;
      selectedIcon: string;
      selectedColor: string;
      description: string;
      isVisible: boolean;
    }
  ) => {
    if (!authToken) throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    const response = await fetch(`/api/product-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể cập nhật danh mục sản phẩm.');
    }
    await loadProductCategories(authToken);
    await loadProducts(authToken, productsPage);
  };

  const handleDeleteProductCategory = async (id: string | number, replacementCategoryName?: string) => {
    if (!authToken) throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    const response = await fetch(`/api/product-categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ replacementCategoryName }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể xóa danh mục sản phẩm.');
    }
    await loadProductCategories(authToken);
    await loadProducts(authToken, productsPage);
  };

  const handleUpdateService = async (updated: Service) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch(`/api/services/${updated.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updated),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể cập nhật dịch vụ.');
    }

    await loadServices(authToken);
  };

  const handleDeleteService = async (id: string | number) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch(`/api/services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể xóa dịch vụ.');
    }

    await loadServices(authToken);
  };

  const handleCreateProduct = async (payload: Omit<Product, 'id'>) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tạo sản phẩm mới.');
    }

    await loadProducts(authToken, 1);
    setProductsPage(1);
  };

  const handleUpdateProduct = async (id: string | number, payload: Omit<Product, 'id'>) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể cập nhật sản phẩm.');
    }
    await loadProducts(authToken, productsPage);
  };

  const handleDeleteProduct = async (id: string | number) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể xóa sản phẩm.');
    }
    await loadProducts(authToken, productsPage);
  };

  const handleRestockProduct = async (id: string | number, amount: number) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }
    const response = await fetch(`/api/products/${id}/restock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể nhập kho sản phẩm.');
    }
    await loadProducts(authToken, productsPage);
  };

  const navigateToTab = (tab: View) => {
    setActiveTab(tab);
  };

  const handleCreateCustomer = async (payload: {
    name: string;
    phone: string;
    email: string;
    birthday: string;
    gender: string;
    assignedEmployee: string;
    source: string;
    notes: string;
    avatar?: string;
  }) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tạo khách hàng mới.');
    }

    await loadCustomers(authToken);
    window.dispatchEvent(new Event('customers:changed'));
  };

  const handleCreateEmployee = async (payload: {
    name: string;
    phone: string;
    email: string;
    role: string;
    commissionRate: number;
    specialties: string[];
    birthday?: string;
    startDate: string;
    defaultShift: string;
    avatar?: string;
  }) => {
    if (!authToken) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể tạo nhân viên mới.');
    }

    await loadEmployees(authToken);
  };

  const handleUpdateEmployee = async (payload: {
    name: string;
    phone: string;
    email: string;
    role: string;
    commissionRate: number;
    specialties: string[];
    birthday?: string;
    startDate: string;
    defaultShift: string;
    avatar?: string;
    status?: string;
  }) => {
    if (!authToken || !selectedEmployee) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể cập nhật nhân viên.');
    }

    await loadEmployees(authToken);
    setSelectedEmployee((prev) => (prev ? { ...prev, ...payload } : prev));
  };

  const handleTerminateEmployee = async (payload: {
    type: 'temporary' | 'permanent';
    effectiveDate: string;
    reason: string;
  }) => {
    if (!authToken || !selectedEmployee) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch(`/api/employees/${selectedEmployee.id}/terminate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể cập nhật trạng thái nghỉ việc.');
    }

    await loadEmployees(authToken);
    navigateToTab('employees');
    setIsTerminateModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async () => {
    if (!authToken || !selectedEmployee) {
      throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    }

    const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Không thể xóa nhân viên.');
    }

    await loadEmployees(authToken);
    navigateToTab('employees');
    setIsTerminateModalOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    const onPopState = () => {
      const tabFromPath = getTabFromPath(window.location.pathname);
      setActiveTab(tabFromPath);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const nextPath = TAB_PATHS[activeTab] || '/dashboard';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
  }, [activeTab, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (activeTab === 'employee-profile' && !selectedEmployee) {
      setActiveTab('employees');
    }
  }, [activeTab, selectedEmployee, isLoggedIn]);

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-500 text-sm font-bold tracking-wider">
        ĐANG KIỂM TRA PHIÊN ĐĂNG NHẬP...
      </div>
    );
  }

  if (!isLoggedIn) {
    if (window.location.pathname !== '/login') {
      window.history.replaceState({}, '', '/login');
    }
    return <LoginView onLogin={handleLogin} />;
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
            onClick={() => navigateToTab('dashboard')}
          />
          <SidebarItem 
            icon={<CalendarDays size={20} />} 
            label="Lịch hẹn" 
            active={activeTab === 'appointments'} 
            onClick={() => navigateToTab('appointments')}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Khách hàng" 
            active={activeTab === 'customers'} 
            onClick={() => navigateToTab('customers')}
          />
          <SidebarItem 
            icon={<Scissors size={20} />} 
            label="Nhân viên" 
            active={activeTab === 'employees' || activeTab === 'employee-profile'}
            onClick={() => navigateToTab('employees')}
          />
          <SidebarItem 
            icon={<ClipboardList size={20} />} 
            label="Dịch vụ & Giá" 
            active={activeTab === 'services'}
            onClick={() => navigateToTab('services')}
          />
          <SidebarItem
            icon={<Package size={20} />}
            label="Sản phẩm"
            active={activeTab === 'products'}
            onClick={() => navigateToTab('products')}
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Báo cáo" 
            active={activeTab === 'reports'}
            onClick={() => navigateToTab('reports')}
          />
          <SidebarItem 
            icon={<Megaphone size={20} />} 
            label="Tích điểm & Marketing" 
            active={activeTab === 'marketing'}
            onClick={() => navigateToTab('marketing')}
          />
          <SidebarItem 
            icon={<CreditCard size={20} />} 
            label="POS & Thanh toán" 
            active={activeTab === 'pos'}
            onClick={() => navigateToTab('pos')}
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Hệ thống" 
            active={activeTab === 'settings'}
            onClick={() => navigateToTab('settings')}
          />
        </nav>

        <div className="p-8 border-t border-stone-50 space-y-4">
          <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif">A</div>
            <div className="flex-1">
              <p className="text-xs font-bold text-primary">Admin Atelier</p>
              <p className="text-[10px] text-stone-400">Quản lý hệ thống</p>
            </div>
            <LogOut 
              size={16} 
              className="text-stone-300 hover:text-red-500 cursor-pointer transition-colors" 
              onClick={handleLogout}
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
            <DashboardView
              key="dashboard"
              authToken={authToken}
              onNewCustomer={() => setIsNewCustomerModalOpen(true)}
            />
          ) : activeTab === 'appointments' ? (
            <AppointmentsView
              key="appointments"
              authToken={authToken}
              onNewAppointment={() => setIsNewAppointmentModalOpen(true)}
              services={services}
              employees={employees}
            />
          ) : activeTab === 'customers' ? (
            <CustomersView
              key="customers"
              authToken={authToken}
              onNewCustomer={() => setIsNewCustomerModalOpen(true)}
              onDeleteCustomer={(customer) => setCustomerToDelete(customer)}
            />
          ) : activeTab === 'employees' ? (
            <EmployeesView 
              key="employees" 
              authToken={authToken}
              employees={employees}
              onNewEmployee={() => setIsNewEmployeeModalOpen(true)} 
              onViewProfile={(emp) => {
                setSelectedEmployee(emp);
                navigateToTab('employee-profile');
              }} 
            />
          ) : activeTab === 'employee-profile' && selectedEmployee ? (
            <EmployeeProfileView 
              key="employee-profile"
              employee={selectedEmployee}
              onBack={() => navigateToTab('employees')}
              onAddShift={() => setIsAddShiftModalOpen(true)}
              onEdit={() => setIsEditEmployeeModalOpen(true)}
              onTerminate={() => setIsTerminateModalOpen(true)}
            />
          ) : activeTab === 'services' ? (
            <ServicesView 
              key="services" 
              services={services}
              serviceCategories={serviceCategories.map((c) => c.name)}
              onNewService={() => setIsNewServiceModalOpen(true)} 
              onEditService={(service) => setServiceToEdit(service)}
              onDeleteService={(service) => setServiceToDelete(service)}
              onViewService={(service) => setServiceToView(service)}
            />
          ) : activeTab === 'products' ? (
            <ProductsView
              key="products"
              products={products}
              onNewProduct={() => setIsNewProductModalOpen(true)}
              onEditProduct={(product) => setProductToEdit(product)}
              onDeleteProduct={(product) => setProductToDelete(product)}
              onRestockProduct={(product) => {
                const value = window.prompt(`Nhập số lượng cần nhập kho cho "${product.name}"`, '1');
                if (!value) return;
                const amount = Number(value);
                if (!Number.isFinite(amount) || amount <= 0) {
                  alert('Số lượng nhập kho phải lớn hơn 0.');
                  return;
                }
                (async () => {
                  try {
                    await handleRestockProduct(product.id, amount);
                  } catch (e) {
                    const message = e instanceof Error ? e.message : 'Không thể nhập kho sản phẩm.';
                    alert(message);
                  }
                })();
              }}
              page={productsPage}
              totalPages={productsTotalPages}
              total={productsTotal}
              onPageChange={(nextPage) => setProductsPage(nextPage)}
            />
          ) : activeTab === 'reports' ? (
            <ReportsView key="reports" authToken={authToken} />
          ) : activeTab === 'pos' ? (
            <POSView
              authToken={authToken}
              customers={customers}
              employees={employees}
              services={services}
              onCheckoutSuccess={() => {
                reloadAfterPosCheckout().catch(() => undefined);
              }}
            />
          ) : activeTab === 'settings' ? (
            <SettingsView
              authToken={authToken}
              services={services}
              products={products}
              serviceCategories={serviceCategories}
              productCategories={productCategories}
              onCreateCategory={handleCreateServiceCategory}
              onUpdateCategory={handleUpdateServiceCategory}
              onDeleteCategory={handleDeleteServiceCategory}
              onCreateProductCategory={handleCreateProductCategory}
              onUpdateProductCategory={handleUpdateProductCategory}
              onDeleteProductCategory={handleDeleteProductCategory}
            />
          ) : activeTab === 'marketing' ? (
            <MarketingView 
              key="marketing" 
              authToken={authToken}
              customersCount={customersTotal}
              onNewPromoCode={() => setIsNewPromoCodeModalOpen(true)} 
            />
          ) : null}
        </AnimatePresence>
      </main>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {isNewAppointmentModalOpen && (
          <NewAppointmentModal
            authToken={authToken}
            services={services}
            employees={employees}
            onClose={() => setIsNewAppointmentModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* New Customer Modal */}
      <AnimatePresence>
        {isNewCustomerModalOpen && (
          <NewCustomerModal
            authToken={authToken}
            onClose={() => setIsNewCustomerModalOpen(false)}
            onSave={handleCreateCustomer}
            employees={employees}
          />
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
          <NewEmployeeModal
            onClose={() => setIsNewEmployeeModalOpen(false)}
            onSave={handleCreateEmployee}
          />
        )}
      </AnimatePresence>

      {/* Edit Employee Modal */}
      <AnimatePresence>
        {isEditEmployeeModalOpen && selectedEmployee && (
          <NewEmployeeModal
            onClose={() => setIsEditEmployeeModalOpen(false)}
            onSave={handleUpdateEmployee}
            title="Cập Nhật Nhân Viên"
            description="Điều chỉnh hồ sơ nhân viên để thông tin luôn chính xác cho vận hành và chăm sóc khách hàng."
            saveLabel="Cập nhật nhân viên"
            initialData={{
              name: selectedEmployee.name || '',
              phone: selectedEmployee.phone || '',
              email: selectedEmployee.email || '',
              role: selectedEmployee.role || 'Senior Stylist',
              commissionRate: Number(selectedEmployee.commissionRate || 0),
              specialties: selectedEmployee.specialties || [],
              startDate: selectedEmployee.startDate || '',
              defaultShift: selectedEmployee.defaultShift || 'Ca Sáng (08:00 - 16:00)',
              avatar: selectedEmployee.avatar || '',
            }}
          />
        )}
      </AnimatePresence>

      {/* Terminate Employee Modal */}
      <AnimatePresence>
        {isTerminateModalOpen && selectedEmployee && (
          <TerminateEmployeeModal 
            employee={selectedEmployee}
            onClose={() => setIsTerminateModalOpen(false)}
            onConfirm={handleTerminateEmployee}
            onDelete={handleDeleteEmployee}
          />
        )}
      </AnimatePresence>

      {/* New Service Modal */}
      <AnimatePresence>
        {isNewServiceModalOpen && (
          <NewServiceModal
            onClose={() => setIsNewServiceModalOpen(false)}
            onSave={handleCreateService}
            categories={serviceCategories.map((c) => c.name)}
          />
        )}
      </AnimatePresence>

      {/* New Product Modal */}
      <AnimatePresence>
        {isNewProductModalOpen && (
          <NewProductModal
            onClose={() => setIsNewProductModalOpen(false)}
            onSave={handleCreateProduct}
            categories={productCategories.map((c) => c.name)}
          />
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {productToEdit && (
          <NewProductModal
            onClose={() => setProductToEdit(null)}
            onSave={(payload) => handleUpdateProduct(productToEdit.id, payload)}
            categories={productCategories.map((c) => c.name)}
            initialData={productToEdit}
            title="Cập Nhật Sản Phẩm"
            saveLabel="CẬP NHẬT SẢN PHẨM"
          />
        )}
      </AnimatePresence>

      {/* Delete Product Modal */}
      <AnimatePresence>
        {productToDelete && (
          <DeleteProductModal
            product={productToDelete}
            onClose={() => setProductToDelete(null)}
            onConfirm={() => {
              (async () => {
                try {
                  await handleDeleteProduct(productToDelete.id);
                  setProductToDelete(null);
                } catch (e) {
                  const message = e instanceof Error ? e.message : 'Không thể xóa sản phẩm.';
                  alert(message);
                }
              })();
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {serviceToEdit && (
          <EditServiceModal 
            service={serviceToEdit}
            onClose={() => setServiceToEdit(null)}
            categories={serviceCategories.map((c) => c.name)}
            onConfirm={(updated) => {
              (async () => {
                try {
                  await handleUpdateService(updated);
                  setServiceToEdit(null);
                } catch (e) {
                  const message = e instanceof Error ? e.message : 'Không thể cập nhật dịch vụ.';
                  alert(message);
                }
              })();
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
              (async () => {
                try {
                  await handleDeleteService(serviceToDelete.id);
                  setServiceToDelete(null);
                } catch (e) {
                  const message = e instanceof Error ? e.message : 'Không thể xóa dịch vụ.';
                  alert(message);
                }
              })();
            }}
          />
        )}
      </AnimatePresence>

      {/* Service Details Modal */}
      <AnimatePresence>
        {serviceToView && (
          <ServiceDetailsModal
            service={serviceToView}
            onClose={() => setServiceToView(null)}
          />
        )}
      </AnimatePresence>

      {/* New Promo Code Modal */}
      <AnimatePresence>
        {isNewPromoCodeModalOpen && (
          <NewPromoCodeModal onClose={() => setIsNewPromoCodeModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
