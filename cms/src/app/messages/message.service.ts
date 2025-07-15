import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();


  private messages: Message[] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach(message => {
      const id = parseInt(message.id)

      if (id > maxId) {
        maxId = id;
      }
    });

    return maxId;
  }

  fetchMessages() {
    this.http
      .get<Message[]>('https://cms-application-db-default-rtdb.firebaseio.com/messages.json')
      .subscribe((contacts: Message[]) => {
        this.messages = contacts;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      },);
  }

  storeMessages() {
    const messages = JSON.parse(JSON.stringify(this.getMessages()));
    this.http.put('https://cms-application-db-default-rtdb.firebaseio.com/messages.json', messages)
      .subscribe((response) => {
        console.log(response);
        this.messageListChangedEvent.next(this.messages.slice());
      })
  }

  addMessage(message: Message) {
    if (!message || message.msgText === '') return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
}
