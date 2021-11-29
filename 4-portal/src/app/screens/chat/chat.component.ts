import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chatSubscription!: Subscription;
  messagesReceived: Array<MessageInterface> = [];
  fcMessage = new FormControl();
  fcUsername = new FormControl('User001');
  constructor(private afDb: AngularFirestore, private api: ApiService) {}

  ngOnInit(): void {
    this.chatSubscription = this.afDb
      .collection('chats')
      .valueChanges()
      .subscribe((col) => {
        this.messagesReceived = [];
        col.forEach((doc: any) => {
          var payload: MessageInterface = {
            message: doc.message,
            uid: doc.uid,
            userName: doc.userName,
            sent: doc.sent.toDate(),
          };
          this.messagesReceived.push(payload);
        });
        this.messagesReceived.sort((a, b) => {
          if (a.sent.valueOf() < b.sent.valueOf()) return -1;
          else if (a.sent.valueOf() > b.sent.valueOf()) return 1;
          else return 0;
        });
      });
  }
  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }

  async send() {
    var payload = {
      message: this.fcMessage.value,
      uid: 'someRandomUID',
      userName: this.fcUsername.value,
    };
    await this.api.post('/chat/send', payload);
    this.fcMessage.setValue('');
  }
}

interface MessageInterface {
  message: string;
  sent: Date;
  uid: string;
  userName: string;
}
