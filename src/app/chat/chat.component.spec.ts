import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages = [
    { user: 'John Doe', text: 'Hello! How are you?', time: '12:00 PM', self: false },
    { user: 'You', text: 'I\'m good, thanks! How about you?', time: '12:01 PM', self: true }
  ];

  sendMessage(message: string) {
    if (message.trim()) {
      this.messages.push({
        user: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        self: true
      });
    }
  }
}
