'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/Card';
import { useCreateContact } from '@/hooks/useCreateContact';

// Kept identical to the backend DTO (api/src/contacts/dto/create-contact.dto.ts).
const AU_PHONE = /^(\+?61|0)[2-578]\d{8}$/;
// Accept what people actually type — "0412 345 678", "(04) 1234 5678" — then
// normalise before validating and before sending, so the API gets a clean value.
const normalizePhone = (v: string) => v.replace(/[\s()-]/g, '');

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .refine((v) => v.includes('@'), { message: 'Email needs an @ symbol — e.g. name@example.com' })
    .refine((v) => z.string().email().safeParse(v).success, {
      message: 'Enter a valid email — e.g. name@example.com',
    }),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .refine((v) => /^(\+?61|0)/.test(normalizePhone(v)), {
      message: 'Australian numbers start with 04, 02, 03, 07, 08 or +61',
    })
    .refine((v) => AU_PHONE.test(normalizePhone(v)), {
      message: 'Enter a valid Australian number — e.g. 0412 345 678 or +61 412 345 678',
    }),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-sm font-medium ${error ? 'text-red-600' : 'text-gray-700'}`}>{label}</label>
      {children}
      {error ? (
        <p className="text-xs text-red-600 mt-0.5">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
      ) : null}
    </div>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const { createContact, isLoading, error } = useCreateContact();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    try {
      const contact = await createContact({
        ...data,
        email: data.email.trim(),
        phone: normalizePhone(data.phone),
      });
      router.push(`/thank-you?name=${encodeURIComponent(contact.firstName)}`);
    } catch {
      // The message is surfaced to the user via the `error` banner below.
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Company details */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Lumen & Co.</h2>
        <dl className="space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Phone</dt>
            <dd className="mt-0.5">1300 555 012</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Email</dt>
            <dd className="mt-0.5">
              <a href="mailto:hello@lumenco.example" className="text-blue-600 hover:underline">
                hello@lumenco.example
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Postal Address</dt>
            <dd className="mt-0.5">PO Box 100<br />Melbourne VIC 3000</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Contact Centre Hours</dt>
            <dd className="mt-0.5">Monday – Friday 8:30am – 5:00pm</dd>
          </div>
        </dl>
      </Card>

      {/* Contact form */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" error={errors.firstName?.message}>
              <input {...register('firstName')} className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName?.message ? 'border-red-400' : 'border-gray-300'}`} />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input {...register('lastName')} className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName?.message ? 'border-red-400' : 'border-gray-300'}`} />
            </Field>
          </div>
          <Field label="Email" error={errors.email?.message} hint="Include an @ symbol, e.g. name@example.com">
            <input type="email" {...register('email')} placeholder="name@example.com" className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email?.message ? 'border-red-400' : 'border-gray-300'}`} />
          </Field>
          <Field label="Phone" error={errors.phone?.message} hint="Australian number — start with 04, 02, 03, 07, 08 or +61">
            <input type="tel" {...register('phone')} placeholder="0412 345 678" className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone?.message ? 'border-red-400' : 'border-gray-300'}`} />
          </Field>
          <Field label="Additional info / Note" error={errors.note?.message}>
            <textarea {...register('note')} rows={3} className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.note?.message ? 'border-red-400' : 'border-gray-300'}`} />
          </Field>
          {error && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              Couldn’t send your message: {error}. Please try again.
            </p>
          )}
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
