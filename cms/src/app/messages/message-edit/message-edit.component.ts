import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  currentSender = 'Men Do';

  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(
      '1',
      subject,
      msgText,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
