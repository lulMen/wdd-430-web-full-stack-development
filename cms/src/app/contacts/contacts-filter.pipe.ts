import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';
import { isEmpty } from 'rxjs';

@Pipe({
  name: 'contactsFilter',
  standalone: false,
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    if (term.length === 0 || term === '') return contacts;

    const resultArray = [];
    for (const contact of contacts) {
      if (contact.name.toLowerCase().includes(term.toLowerCase())) {
        resultArray.push(contact);
      }
    }

    if (resultArray.length === 0) return contacts;

    return resultArray;
  }

}
