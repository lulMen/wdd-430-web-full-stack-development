import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message: Message;
  messageSender: string;
  private subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.fetchContacts();

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        const contact = contacts.find(contact => contact.id === this.message.sender);
        this.messageSender = contact.name;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
