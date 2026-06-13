import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto): Promise<Contact> {
    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  findAll(): Promise<Contact[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: string, dto: UpdateContactDto): Promise<Contact> {
    const contact = await this.repo.findOneBy({ id });
    if (!contact) throw new NotFoundException(`Contact ${id} not found`);
    Object.assign(contact, dto);
    return this.repo.save(contact);
  }

  async remove(id: string): Promise<void> {
    const contact = await this.repo.findOneBy({ id });
    if (!contact) throw new NotFoundException(`Contact ${id} not found`);
    await this.repo.remove(contact);
  }
}
