import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'hello', 'how are you?', 'John'),
    new Message('2', 'goodbye', 'have a nice day!', 'John'),
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
