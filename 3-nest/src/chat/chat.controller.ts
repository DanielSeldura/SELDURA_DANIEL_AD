import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/send")
  async send(
    @Body("message") message: string,
    @Body("uid") uid: string,
    @Body("userName") userName: string
  ) {
    return await this.chatService.sendMessage(message, uid, userName);
  }
}
