import { Controller, Get } from '@nestjs/common';
import { Contact } from '../contact.entity';
import { ContactsService } from './contacts.service';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('contacts')
export class ContactsController {
    constructor(private contactService: ContactsService){}

    @Get()
    index(): Promise<Contact[]> {
        return this.contactService.findAll();
    }

    @Post('create')
    async create(@Body() contactData: Contact): Promise<any> {
        if (!contactData.phone || !contactData.firstName) {
            return "First Name or Phone cannot be blank."
        }
        this.contactService.create(contactData);
        return "Successfully saved contact with name: " + contactData.firstName +" "+contactData.lastName;
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
        contactData.id = Number(id);
        this.contactService.update(contactData);
        return "Successfully updated contact with id#" + contactData.id
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        this.contactService.delete(id);
        return "Delete contact with id #"+id
    }
}
