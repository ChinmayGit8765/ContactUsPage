import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

type RepoMock = {
  create: jest.Mock;
  save: jest.Mock;
  find: jest.Mock;
  findOneBy: jest.Mock;
  remove: jest.Mock;
};

const sample: Contact = {
  id: 'uuid-1',
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '0412345678',
  note: null,
  verified: false,
  createdAt: new Date('2026-01-01T00:00:00Z'),
};

describe('ContactsService', () => {
  let service: ContactsService;
  let repo: RepoMock;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: getRepositoryToken(Contact), useValue: repo },
      ],
    }).compile();

    service = module.get(ContactsService);
  });

  describe('create', () => {
    it('builds and persists a new contact', async () => {
      const dto: CreateContactDto = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        phone: '0412345678',
      };
      repo.create.mockReturnValue(sample);
      repo.save.mockResolvedValue(sample);

      const result = await service.create(dto);

      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(sample);
      expect(result).toBe(sample);
    });
  });

  describe('findAll', () => {
    it('lists contacts newest first', async () => {
      repo.find.mockResolvedValue([sample]);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
      expect(result).toEqual([sample]);
    });
  });

  describe('update', () => {
    it('merges the changes onto the existing contact and saves', async () => {
      repo.findOneBy.mockResolvedValue({ ...sample });
      repo.save.mockImplementation(async (c: Contact) => c);

      const result = await service.update('uuid-1', { verified: true });

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 'uuid-1' });
      expect(result.verified).toBe(true);
    });

    it('throws NotFoundException for an unknown id', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.update('missing', { verified: true })).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deletes an existing contact', async () => {
      repo.findOneBy.mockResolvedValue(sample);
      repo.remove.mockResolvedValue(sample);

      await service.remove('uuid-1');

      expect(repo.remove).toHaveBeenCalledWith(sample);
    });

    it('throws NotFoundException for an unknown id', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.remove('missing')).rejects.toBeInstanceOf(NotFoundException);
      expect(repo.remove).not.toHaveBeenCalled();
    });
  });
});
