'use client';

import { useContacts } from '@/hooks/useContacts';
import { ContactCard } from './ContactCard';

export function ContactsList() {
  const { contacts, isLoading, error, verify, remove } = useContacts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16 text-gray-500">Loading contacts…</div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm">
        Failed to load contacts. Is the API running?
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No contacts yet</p>
        <p className="text-sm mt-1">Submit the contact form to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {contacts.map((c) => (
        <ContactCard key={c.id} contact={c} onVerify={verify} onDelete={remove} />
      ))}
    </div>
  );
}
