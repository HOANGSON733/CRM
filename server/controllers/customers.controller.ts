import { Request, Response } from 'express';
import { getTokenFromHeader, verifyAuthToken } from '../lib/auth';
import { currentDb } from '../lib/db';

function formatDateVi(date: Date) {
  return new Intl.DateTimeFormat('vi-VN').format(date);
}

export async function createCustomer(req: Request, res: Response) {
  try {
    const token = getTokenFromHeader(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: 'Thiếu token xác thực.' });
    }

    verifyAuthToken(token);

    const name = String(req.body?.name || '').trim();
    const phone = String(req.body?.phone || '').trim();
    const email = String(req.body?.email || '').trim();
    const birthday = String(req.body?.birthday || '').trim();
    const gender = String(req.body?.gender || '').trim();
    const source = String(req.body?.source || '').trim();
    const notes = String(req.body?.notes || '').trim();

    if (!name || !phone) {
      return res.status(400).json({ message: 'Vui lòng nhập họ tên và số điện thoại.' });
    }

    const now = new Date();
    const customer = {
      name,
      phone,
      email,
      birthday,
      gender,
      source,
      notes,
      tags: ['#Khách mới'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
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
      .sort({ createdAt: -1 })
      .toArray();

    return res.json({
      ok: true,
      customers: customers.map((customer) => ({
        id: String(customer._id),
        name: customer.name || '',
        tags: Array.isArray(customer.tags) ? customer.tags : [],
        phone: customer.phone || '',
        email: customer.email || '',
        lastVisit: customer.lastVisit || '',
        avatar:
          customer.avatar ||
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        memberSince: customer.memberSince,
        points: customer.points,
        maxPoints: customer.maxPoints,
        spendingData: customer.spendingData || [],
        history: customer.history || [],
      })),
    });
  } catch (_error) {
    return res.status(401).json({ message: 'Không thể tải danh sách khách hàng.' });
  }
}
