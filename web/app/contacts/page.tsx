import { ContactsList } from '@/components/contacts/ContactsList';

export default function ContactsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contacts</h1>
      <ContactsList />
    </div>
  );
}
