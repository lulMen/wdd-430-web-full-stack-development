import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  selectedContactId: string;
  private subscription: Subscription;
  private event: Subscription;

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.ContactService.getContacts();


    this.event = this.ContactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => this.selectedContactId = contact?.id
      );

    this.subscription = this.ContactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )

  }

  ngOnDestroy(): void {
    this.event.unsubscribe();
    this.subscription.unsubscribe();
  }
}
