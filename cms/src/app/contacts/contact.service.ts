import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  sortAndSend() {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  fetchContacts() {
    this.http
      .get<{ contactList: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(responseData => {
        this.contacts = responseData.contactList;
        this.maxContactId = this.getMaxId();
        this.sortAndSend();
      },);
  }

  addContact(newContact: Contact): void {
    if (!newContact) { return };

    newContact.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string, newContact: Contact }>(
        'http://localhost:3000/contacts', newContact, { headers: headers }
      )
      .subscribe(responseData => {
        this.contacts.push(responseData.newContact);
        this.sortAndSend();
        this.fetchContacts();
      })
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) { return };

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers }
      )
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  deleteContact(contact: Contact): void {
    if (!contact) { return };

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) { return };

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
