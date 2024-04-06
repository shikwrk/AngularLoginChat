import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chatService = inject(ChatService);
  inputMessage = '';
  messages: any[] = [];
  router = inject(Router);
  loggedInUserName = sessionStorage.getItem('name');
  roomName = sessionStorage.getItem('room');

  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

  ngOnInit(): void {
    this.restoreSession();

    this.chatService.messages$.subscribe((res) => {
      this.messages = res;
      console.log(this.messages);
    });

    this.chatService.connectedUsers$.subscribe((res) => {
      console.log(res);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  restoreSession() {
    const user = sessionStorage.getItem('user');
    const room = sessionStorage.getItem('room');

    if (user && room) {
      this.chatService.startConnection().then(() => {
        this.chatService
          .joinRoom(user, room)
          .then(() => {
            this.router.navigate(['/chat']);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      this.loggedInUserName = user;
      this.roomName = room;
    } else {
      this.router.navigate(['joinchat']);
    }
  }

  sendMessage() {
    this.chatService
      .sendMessage(this.inputMessage)
      .then(() => {
        this.inputMessage = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  leaveChat() {
    this.chatService
      .leaveChat()
      .then(() => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('room');

        this.router.navigate(['joinchat']).then(() => {
          location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
