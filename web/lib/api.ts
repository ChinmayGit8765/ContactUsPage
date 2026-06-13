import type { Contact, CreateContactInput } from './types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw Object.assign(new Error(body.message ?? res.statusText), { status: res.status, body });
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getContacts: () => request<Contact[]>('/contacts'),
  createContact: (data: CreateContactInput) =>
    request<Contact>('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  updateContact: (id: string, data: Partial<Contact>) =>
    request<Contact>(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteContact: (id: string) => request<void>(`/contacts/${id}`, { method: 'DELETE' }),
};
