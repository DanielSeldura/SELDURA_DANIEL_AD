import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
@Injectable()
export class ChatService {
  private DB = admin.firestore();

  async sendMessage(message: string, uid: string, userName: string) {
    try {
      return await this.DB.collection("chats").add({
        message,
        uid,
        userName,
        sent: new Date(),
      });
    //   return await this.DB.collection("chats").add({
    //     message: message,
    //     uid: uid,
    //     userName: userName,
    //     sent: new Date(),
    //   });
    } catch (error) {
      return null;
    }
  }
}
