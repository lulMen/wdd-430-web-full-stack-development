import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    if (this.contacts.length === 0) {
      this.fetchContacts();
    }

    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach(contact => {
      const id = parseInt(contact.id)

      if (id > maxId) {
        maxId = id;
      }
    });

    return maxId;
  }

  fetchContacts() {
    this.http
      .get<Contact[]>('https://cms-application-db-default-rtdb.firebaseio.com/contacts.json')
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      },);
  }

  storeContacts() {
    const contacts = JSON.parse(JSON.stringify(this.getContacts()));
    this.http.put('https://cms-application-db-default-rtdb.firebaseio.com/contacts.json', contacts)
      .subscribe((response) => {
        console.log(response);
        this.contactListChangedEvent.next(this.contacts.slice());
      })
  }

  addContact(newContact: Contact): void {
    if (!newContact || null) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(
    originalContact: Contact,
    newContact: Contact
  ): void {
    if (!originalContact || !newContact || null) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact || null) return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
