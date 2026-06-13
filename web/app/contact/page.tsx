'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/Card';
import { useCreateContact } from '@/hooks/useCreateContact';

const AU_PHONE = /^(\+?61|0)[2-578]\d{8}$/;

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(AU_PHONE, 'Enter a valid Australian phone number'),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    err ? 'border-red-400' : 'border-gray-300'
  }`;

export default function ContactPage() {
  const router = useRouter();
  const { createContact, isLoading } = useCreateContact();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    const contact = await createContact(data);
    router.push(`/thank-you?name=${encodeURIComponent(contact.firstName)}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Company details */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">OpenAgent</h2>
        <dl className="space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Phone</dt>
            <dd className="mt-0.5">1300 765 030</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Email</dt>
            <dd className="mt-0.5">
              <a href="mailto:support@openagent.com.au" className="text-blue-600 hover:underline">
                support@openagent.com.au
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Address</dt>
            <dd className="mt-0.5">Level 10, 222 Pitt St<br />Sydney NSW 2000</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Hours</dt>
            <dd className="mt-0.5">Mon–Fri 8:30am–5:30pm AEST</dd>
          </div>
        </dl>
      </Card>

      {/* Contact form */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" error={errors.firstName?.message}>
              <input {...register('firstName')} className={inputCls(errors.firstName?.message)} />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input {...register('lastName')} className={inputCls(errors.lastName?.message)} />
            </Field>
          </div>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register('email')} className={inputCls(errors.email?.message)} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input type="tel" {...register('phone')} placeholder="0412 345 678" className={inputCls(errors.phone?.message)} />
          </Field>
          <Field label="Additional info / Note" error={errors.note?.message}>
            <textarea {...register('note')} rows={3} className={inputCls(errors.note?.message)} />
          </Field>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {isLoading ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </Card>
    </div>
  );
}
