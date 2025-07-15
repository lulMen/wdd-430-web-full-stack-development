import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.fetchContacts();
  }
}
