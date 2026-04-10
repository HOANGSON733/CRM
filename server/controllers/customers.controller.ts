import { Request, Response } from 'express';
import { getTokenFromHeader, verifyAuthToken } from '../lib/auth';
import { currentDb } from '../lib/db';

function formatDateVi(date: Date) {
  return new Intl.DateTimeFormat('vi-VN').format(date);
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, '');
}

export async function createCustomer(req: Request, res: Response) {
  try {
    const token = getTokenFromHeader(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: 'Thiếu token xác thực.' });
    }

    verifyAuthToken(token);

    const name = String(req.body?.name || '').trim();
    const phone = normalizePhone(String(req.body?.phone || '').trim());
    const email = String(req.body?.email || '').trim();
    const birthday = String(req.body?.birthday || '').trim();
    const gender = String(req.body?.gender || '').trim();
    const assignedEmployee = String(req.body?.assignedEmployee || '').trim();
    const source = String(req.body?.source || '').trim();
    const notes = String(req.body?.notes || '').trim();
    const avatar = String(req.body?.avatar || '').trim();

    if (!name || !phone) {
      return res.status(400).json({ message: 'Vui lòng nhập họ tên và số điện thoại.' });
    }

    const existingCustomer = await currentDb().collection('customers').findOne({ phone });
    if (existingCustomer) {
      return res.status(409).json({ message: 'Số điện thoại này đã là khách thành viên.' });
    }

    const now = new Date();
    const customer = {
      name,
      phone,
      email,
      birthday,
      gender,
      assignedEmployee,
      source,
      notes,
      tags: ['#Khách mới'],
      avatar: avatar || 'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
      lastVisit: formatDateVi(now),
      memberSince: `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`,
      points: 0,
      maxPoints: 5000,
      spendingData: [],
      history: [],
      createdAt: now,
      updatedAt: now,
    };

    const result = await currentDb().collection('customers').insertOne(customer);

    return res.status(201).json({
      ok: true,
      customer: {
        id: String(result.insertedId),
        ...customer,
      },
    });
  } catch (_error) {
    return res.status(401).json({ message: 'Không thể tạo khách hàng. Vui lòng đăng nhập lại.' });
  }
}

export async function listCustomers(req: Request, res: Response) {
  try {
    const token = getTokenFromHeader(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: 'Thiếu token xác thực.' });
    }

    verifyAuthToken(token);

    const customers = await currentDb()
      .collection('customers')
      .find({})
      .toArray();
    const merged = [
      ...customers.map((customer) => ({
        id: String(customer._id),
        name: customer.name || '',
        tags: Array.isArray(customer.tags) ? customer.tags : [],
        phone: customer.phone || '',
        email: customer.email || '',
        lastVisit: customer.lastVisit || '',
        avatar:
          customer.avatar ||
          'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
        memberSince: customer.memberSince,
        points: customer.points,
        maxPoints: customer.maxPoints,
        spendingData: customer.spendingData || [],
        history: customer.history || [],
        isWalkIn: false,
        createdAt: customer.createdAt || new Date(0),
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.json({
      ok: true,
      customers: merged.map(({ createdAt, ...rest }) => rest),
    });
  } catch (_error) {
    return res.status(401).json({ message: 'Không thể tải danh sách khách hàng.' });
  }
}
