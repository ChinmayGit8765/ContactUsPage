'use client';

import { Card } from '@/components/ui/Card';
import type { Contact } from '@/lib/types';

interface ContactCardProps {
  contact: Contact;
  onVerify: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ContactCard({ contact, onVerify, onDelete }: ContactCardProps) {
  const name = `${contact.firstName} ${contact.lastName}`;
  const date = new Date(contact.createdAt).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {contact.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-0.5">{contact.email}</p>
          <p className="text-sm text-gray-600">{contact.phone}</p>
          {contact.note && (
            <p className="text-sm text-gray-500 mt-2 italic">{contact.note}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">{date}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onVerify(contact.id)}
            disabled={contact.verified}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              contact.verified
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-blue-300 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {contact.verified ? 'Verified' : 'Mark verified'}
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="text-sm px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
}
