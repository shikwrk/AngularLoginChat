import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5228/chat')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.registerListeners();
  }

  private registerListeners() {
    this.connection.on(
      'ReceiveMessage',
      (user: string, message: string, messageTime: string) => {
        this.messages = [...this.messages, { user, message, messageTime }]; //複製舊數組中的內容加上新資料後重新賦予給變數
        this.messages$.next(this.messages);
      }
    );

    this.connection.on('ConnectedUser', (users: any) => {
      this.connectedUsers$.next(users);
    });
  }

  public async startConnection() {
    try {
      await this.connection.start();
      console.log('Connection is established!');
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  }

  // Join Room
  public async joinRoom(user: string, room: string) {
    return this.connection.invoke('JoinRoom', { user, room });
  }

  // Send Messages
  public async sendMessage(message: string) {
    return this.connection.invoke('SendMessage', message);
  }

  // Leave Chat
  public async leaveChat() {
    return this.connection.stop();
  }
}
