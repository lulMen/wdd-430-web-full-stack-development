import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id: string = params['id'];
          if (!id || null) {
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(id);
          if (!this.originalContact || null) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.contact.group) {
            this.contact.group = JSON.parse(JSON.stringify(this.originalContact.group));
            this.groupContacts = this.contact.group ? [...this.contact.group] : [];
          }

          this.contactService.contactSelectedEvent.next(this.contact);
        }
      );
  }

  onSubmit(form: FormGroup) {
    let id = this.contactService.getMaxId() + 1;

    const value = form.value;
    const newContact = new Contact(
      id.toString(),
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts.slice()
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact)
      return true;
    if (this.contact && newContact.id === this.contact.id)
      return true;

    for (let contact of this.groupContacts) {
      if (newContact.id === contact.id) {
        return true;
      }
    }

    return false;
  }

  addToGroup(event: CdkDragDrop<Contact[]> | any) {
    const selectedContact: Contact =
      event.dragData != null
        ? event.dragData : event.item?.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    if (this.isInvalidContact(selectedContact))
      return;

    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    this.groupContacts.splice(index, 1);
  }
}
