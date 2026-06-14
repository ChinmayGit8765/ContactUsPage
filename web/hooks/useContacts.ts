'use client';

import useSWR from 'swr';
import { api } from '@/lib/api';
import type { Contact } from '@/lib/types';

export function useContacts() {
  const { data, error, isLoading, mutate } = useSWR<Contact[]>('/contacts', api.getContacts);

  async function verify(id: string) {
    try {
      await api.updateContact(id, { verified: true });
    } catch (err) {
      console.error('Failed to verify contact', err);
    } finally {
      mutate(); // resync with server truth whether or not the call succeeded
    }
  }

  async function remove(id: string) {
    try {
      await api.deleteContact(id);
    } catch (err) {
      console.error('Failed to delete contact', err);
    } finally {
      mutate();
    }
  }

  return { contacts: data ?? [], error, isLoading, verify, remove };
}
