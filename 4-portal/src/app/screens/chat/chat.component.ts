import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chatSubscription!: Subscription;
  messagesReceived: Array<MessageInterface> = [];
  fcMessage = new FormControl();
  constructor(private afDb: AngularFirestore, private api: ApiService, private auth: AuthService) {}

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
          console.log(payload);
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
      uid: this.auth.user?.id,
      userName: this.auth.user?.name,
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
