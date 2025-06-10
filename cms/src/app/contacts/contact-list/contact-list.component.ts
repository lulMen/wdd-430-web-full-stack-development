import { Component, Injectable, OnInit, } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.ContactService.getContacts()
  }

  onSelected(contact: Contact) {
    this.ContactService.contactSelectedEvent.emit(contact);
  }
}
