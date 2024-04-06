import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-joinchat',
  templateUrl: './joinchat.component.html',
  styleUrls: ['./joinchat.component.css'],
})
export class JoinchatComponent implements OnInit {
  joinRoomForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);
  user = sessionStorage.getItem('name');

  ngOnInit(): void {
    this.joinRoomForm = this.fb.group({
      user: [this.user, Validators.required],
      room: ['', Validators.required],
    });
  }

  joinRoom() {
    const { user, room } = this.joinRoomForm.value;
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('room', room);

    this.router.navigate(['/chat']);
  }
}
