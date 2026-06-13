'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import type { CreateContactInput } from '@/lib/types';

export function useCreateContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createContact(data: CreateContactInput) {
    setIsLoading(true);
    setError(null);
    try {
      const contact = await api.createContact(data);
      return contact;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { createContact, isLoading, error };
}
