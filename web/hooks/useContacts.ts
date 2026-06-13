'use client';

import useSWR from 'swr';
import { api } from '@/lib/api';
import type { Contact } from '@/lib/types';

export function useContacts() {
  const { data, error, isLoading, mutate } = useSWR<Contact[]>('/contacts', api.getContacts);

  async function verify(id: string) {
    await api.updateContact(id, { verified: true });
    mutate();
  }

  async function remove(id: string) {
    await api.deleteContact(id);
    mutate();
  }

  return { contacts: data ?? [], error, isLoading, verify, remove };
}
