import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

const base = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '0412345678',
};

async function errorsFor(payload: Record<string, unknown>) {
  const dto = plainToInstance(CreateContactDto, payload);
  return validate(dto);
}

function hasError(errors: Awaited<ReturnType<typeof errorsFor>>, property: string) {
  return errors.some((e) => e.property === property);
}

describe('CreateContactDto validation', () => {
  it('accepts a fully valid payload', async () => {
    expect(await errorsFor(base)).toHaveLength(0);
  });

  it('accepts an optional note', async () => {
    expect(await errorsFor({ ...base, note: 'Please call me back' })).toHaveLength(0);
  });

  it('rejects an empty first name', async () => {
    expect(hasError(await errorsFor({ ...base, firstName: '' }), 'firstName')).toBe(true);
  });

  it('rejects an empty last name', async () => {
    expect(hasError(await errorsFor({ ...base, lastName: '' }), 'lastName')).toBe(true);
  });

  it.each(['', 'not-an-email', 'foo@', 'foo@bar'])(
    'rejects invalid email %p',
    async (email) => {
      expect(hasError(await errorsFor({ ...base, email }), 'email')).toBe(true);
    },
  );

  describe('Australian phone number', () => {
    it.each([
      '0412345678', // mobile
      '+61412345678', // mobile, international format
      '0298765432', // Sydney landline (02)
      '0712345678', // Brisbane landline (07)
      '0812345678', // Adelaide landline (08)
    ])('accepts %p', async (phone) => {
      expect(hasError(await errorsFor({ ...base, phone }), 'phone')).toBe(false);
    });

    it.each([
      '0612345678', // 06 is not a valid AU area prefix
      '0912345678', // 09 is not a valid AU area prefix
      '041234567', // too short
      '04123456789', // too long
      '1300765030', // 13 service number, not a personal contact
      'not-a-number',
      '',
    ])('rejects %p', async (phone) => {
      expect(hasError(await errorsFor({ ...base, phone }), 'phone')).toBe(true);
    });
  });
});
