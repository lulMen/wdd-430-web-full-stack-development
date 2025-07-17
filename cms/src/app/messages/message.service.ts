import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      .get<{ messageList: Message[] }>('http://localhost:3000/messages')
      .subscribe(responseData => {
        this.messages = responseData.messageList;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      },);
  }

  addMessage(newMessage: Message) {
    if (!newMessage) { return };

    newMessage.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string, newMessage: Message }>(
        'http://localhost:3000/messages', newMessage, { headers: headers }
      )
      .subscribe(responseData => {
        this.messages.push(responseData.newMessage);
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }
}
