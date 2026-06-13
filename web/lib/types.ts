export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string | null;
  verified: boolean;
  createdAt: string;
}

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note?: string;
}
